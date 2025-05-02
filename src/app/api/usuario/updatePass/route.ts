import { supabase } from '../../../../../lib/supabaseClient'
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    // Extraemos el id del usuario y la nueva contraseña del body
    const { username, newPassword } = await req.json();

    if (!username || !newPassword) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos para actualizar la contraseña' }),
        { status: 400 }
      );
    }

    // Opcional: verificar que el newPassword cumple con alguna política (longitud mínima, etc.)

    console.log("username",username," newPassword",newPassword)
    
    // Generamos el hash de la nueva contraseña
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizamos la contraseña y el estado de pass_is_verify en la tabla "usuario_cliente"
    const { data, error } = await supabase
      .from('usuario_cliente')
      .update({ pass: newHashedPassword, pass_is_verify: false })
      .eq('username', username)
      .select();

    if (error) {
      console.error('Error al actualizar la contraseña:', error);
      return new Response(
        JSON.stringify({ error: 'Error al actualizar la contraseña' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error('Error en el endpoint de cambio de contraseña:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
