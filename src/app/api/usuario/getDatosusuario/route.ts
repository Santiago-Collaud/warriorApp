import { supabase } from '../../../../../lib/supabaseClient';

export async function GET(req: Request) {
  try {
    // Obtener los parámetros de búsqueda
    const { searchParams } = new URL(req.url);
    const id_usuario = searchParams.get("id_usuario");
    
    console.log("id_usuario BACK", id_usuario);
    if (!id_usuario) {
      return new Response(
        JSON.stringify({ error: "id_usuario es requerido" }),
        { status: 400 }
      );
    }
    
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
      `)
      .eq("id", id_usuario);

    if (error) {
      console.error('Error al obtener los clientes BACK', error);
      return new Response(
        JSON.stringify({ error: 'Error al obtener los clientes' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ clientes: data }), { status: 200 });
  } catch (err) {
    console.error('Error al obtener clientes', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}