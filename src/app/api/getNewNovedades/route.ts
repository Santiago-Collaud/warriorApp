import { supabase } from "../../../../lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('novedades')
      .select('id, titulo, descripcion, imagen_url, created_at,creada_por,activo')
      .eq('activo',true) // ajustalo según tu tabla
      .order('created_at', { ascending: false }); // muestra las más recientes primero


    if (error) {
      console.error('Error al obtener novedades:', error);
      return new Response(
        JSON.stringify({ error: 'Error al obtener las novedades' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ novedades: data }), { status: 200 });

  } catch (err) {
    console.error('Error interno al obtener novedades:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}