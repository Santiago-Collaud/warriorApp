/*
import { supabase } from '../../../../../lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
    .from("usuarios")
    .select(`
        *`);

    if (error) {
        console.error("Error al obtener mensajes:", error);
        return new Response(
        JSON.stringify({ error: "No se pudieron obtener los mensajes" }),
        { status: 500 }
        );
        }
    }
  catch (err) {
    console.error('Error al ver los adminstradores', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }

  //console.log("Mensajes obtenidos:", data);

  return new Response(
    //JSON.stringify({ mensajes: data }),
    //{ status: 200 }
  );
}
*/