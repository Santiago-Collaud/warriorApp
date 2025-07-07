import { supabase } from '../../../../lib/supabaseClient';

export async function GET(req: Request) {
  try {
    // Obtener los parámetros de búsqueda
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(
        JSON.stringify({ error: "username es requerido" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('usuario_cliente')
      .select('id, username')
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error('Error al verificar el username', error);
      return new Response(
        JSON.stringify({ error: 'Error al verificar el username' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ exists: !!data }), { status: 200 });
  } catch (err) {
    console.error('Error al verificar el username', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}