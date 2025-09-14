import { supabase } from "../../../../lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("mail");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "El parámetro 'mail' es requerido" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("usuario_cliente")
      .select("mail")
      .eq("mail", email)
      .maybeSingle();

    if (error) {
      console.error("Error al consultar email:", error);
      return new Response(
        JSON.stringify({ error: "Error al verificar el correo" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        exists: !!data,
        email: data?.mail ?? null,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error interno:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
