import { supabase } from '../../../../lib/supabaseClient';

export async function PUT(req: Request) {
  try {
    const { id_cliente, nombre, apellido, mail, celular, id_grupo_sangre, id_factor_sanguineo, obs_salud, fecha_nacimiento, activo } = await req.json();

    // Validar que se envíe el ID del cliente
    if (!id_cliente) {
      return new Response(
        JSON.stringify({ error: 'Se requiere el ID del cliente para actualizar' }),
        { status: 400 }
      );
    }

    // Establecer id_cliente en la sesión de PostgreSQL
    await supabase.rpc('set_config', {
      key: 'myapp.id_cliente',
      value: id_cliente.toString(),
    });

    const { data, error } = await supabase
      .from('usuario-cliente')
      .update({
        nombre,
        apellido,
        mail,
        celular,
        id_grupo_sangre,
        id_factor_sanguineo,
        obs_salud,
        fecha_nacimiento,
        activo,
      })
      .eq('id_cliente', id_cliente); // Especificar el cliente a actualizar según su ID

    if (error) {
      console.error('Error de Supabase:', error);
      return new Response(
        JSON.stringify({ error: 'Error al actualizar el cliente' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ cliente: data }), { status: 200 });
  } catch (err) {
    console.error('Error al actualizar el cliente', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
