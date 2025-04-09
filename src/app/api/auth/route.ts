import { supabase } from '../../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { user_name, pass } = await req.json();

  if (!user_name || !pass) {
    return new Response(
      JSON.stringify({ error: 'Nombre de usuario y contraseña son requeridos' }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('usuario_cliente')
      .select('id, username, pass, pass_is_verify')
      .eq('username', user_name)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 401 });
    }

    // Si el pass es '1234' en texto plano (caso inicial), marcamos requiere_cambio_pass si no lo estaba
    if (data.pass === '1234' && !data.pass_is_verify) {
      await supabase
        .from('usuario_cliente')
        .update({ pass_is_verify: true })
        .eq('id', data.id);
    }

    // Si requiere cambiar contraseña, lo forzamos a hacerlo
    if (data.pass_is_verify) {
      const passwordMatch = data.pass !== '1234' // si ya tiene hash
        ? await bcrypt.compare(pass, data.pass)
        : pass === '1234';

      if (passwordMatch) {
        return new Response(
          JSON.stringify({ error: 'Debe cambiar su contraseña', cambioRequerido: true }),
          { status: 403 }
        );
      }

      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Validar contraseña normal (ya no está en modo cambio)
    const passwordMatch = await bcrypt.compare(pass, data.pass);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Generar JWT
    const token = jwt.sign(
      { id_usuario: data.id, user_name: data.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `jwt_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    );

    const { ...user } = data;
    return new Response(JSON.stringify({ user, token }), { status: 200, headers });
  } catch (err) {
    console.error('Error en la autenticación', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}

