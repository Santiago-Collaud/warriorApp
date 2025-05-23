import { supabase } from '../../../../../lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("id_usuario, nombre");
      //.eq("id_rol", "admin"); // Filtra solo los administradores

    if (error) {
      console.error("Error al obtener administradores:", error);
      return new Response(
        JSON.stringify({ error: "No se pudieron obtener los administradores" }),
        { status: 500 }
      );
    }

    //console.log("Administradores obtenidos:", data);

    return new Response(JSON.stringify({ admins: data }), { status: 200 });
  } catch (err) {
    console.error('Error al ver los administradores', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
