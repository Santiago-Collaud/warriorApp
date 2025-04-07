    //src/app/api/auth/route.ts
import { supabase } from '../../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { user_name, pass } = await req.json(); // Obtenemos el body de la solicitud  

  if (!user_name || !pass) {
    return new Response(
      JSON.stringify({ error: 'Nombre de usuario y contraseña son requeridos' }),
      { status: 400 }
    );
  }
  //console.log("back",user_name," ",pass)
  try {
    // Buscar al usuario en la base de datos
    const { data, error } = await supabase
      .from('usuario_cliente')
      .select('id, username, pass')
      .eq('username', user_name)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: 'Usuario no encontrado' }),
        { status: 401 }
      );
    }
      //console.log("data en auth",data)
      /*
    // Verificar si la cuenta está activa
    if (!data.activo) {
      return new Response(
        JSON.stringify({ error: 'Cuenta suspendida por el administrador' }),
        { status: 403 }
      );
    }

    // Verificar si la sesion esta abierta
    if (data.is_logged_in) {
      return new Response(
        JSON.stringify({ error: 'Cuenta abierta' }),
        { status: 403 }
      );
    }
    */
   if(data.pass != 1234)
   {
    const passwordMatch = await bcrypt.compare(pass, data.pass);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Contraseña incorrecta' }),
        { status: 401 }
      );
    }
    else {
      console.log("cambiar pass")
      return new Response(
        JSON.stringify({ error: 'Debe cambiar su contraseña' }),
        { status: 403 }
      );
    }
   }
    // Comparar la contraseña ingresada con el hash almacenado
    
   /*
    // Verificar si el rol del usuario es "administrador"
    const { data: roleData, error: roleError } = await supabase
      .from('rol')
      .select('rol')
      .eq('id', data.id_rol)
      .single();

    if (roleError || !roleData || roleData.rol !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Acceso denegado: Rol no autorizado' }),
        { status: 403 }
      );
    }
  */
    // Generar el JWT
    const token = jwt.sign(
      { id_usuario: data.id, user_name: data.username },
      process.env.JWT_SECRET!, // La clave secreta se obtiene de la variable de entorno
      { expiresIn: '1h' }        // El token expira en 1 hora 1h 3m
    );
    /*
    // ✅ Actualizar el estado de `is_logged_in` a `true`
    await supabase
      .from('usuarios')
      .update({ is_logged_in: true })
      .eq('id_usuario', data.id);
*/
    // Crear headers y configurar la cookie con el JWT.
    // Nota: En desarrollo, puedes omitir el atributo Secure si no usas HTTPS.
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `jwt_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    );

    // Retornar la respuesta con los datos del usuario y, opcionalmente, el token (si lo necesitas en el frontend)
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