import { supabase } from '../../../../../lib/supabaseClient';

export async function GET() {
  try {
    // Hacer la consulta incluyendo la relación con la tabla clientes
    const { data, error } = await supabase
      .from('usuario_cliente')
      .select(`
        id,
        created_at,
        username,
        pass,
        id_cliente,
        clientes (
          id_cliente,
          nombre,
          apellido,
          mail,
          celular,
          fecha_nacimiento,
          obs_salud,
          activo,
          plan,

          grupo_sanguineo (
            id_grupo,
            grupo
          ),

          factor_sanguineo (
            id_factor,
            factor
          )
        )
      `);

      //console.log('data BACK', data)
      
    if (error) {
      console.error('Error al obtener los clientes BACK', error);
      return new Response(
        JSON.stringify({ error: 'Error al obtener los clientes' }),
        { status: 500 }
      );
    }

    //console.log(data)
    
    return new Response(JSON.stringify({ clientes: data }), { status: 200 });

  } catch (err) {
    console.error('Error al obtener clientes', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}