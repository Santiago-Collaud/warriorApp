import { supabase } from "../../../../lib/supabaseClient";

export async function PATCH(req: Request) {
  try {
    const { mail } = await req.json();
    const flagPass = "1234"; // clave temporal

    if (!mail) {
      return new Response(JSON.stringify({ error: "El mail es obligatorio" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("usuario_cliente")
      .update({ pass: flagPass , pass_is_verify: true })
      .eq("mail", mail)
      .select("mail")
      .maybeSingle();

    if (error) {
      console.error("Error al actualizar pass:", error);
      return new Response(JSON.stringify({ error: "Error al resetear la contraseña" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: !!data, email: data?.mail ?? null }), { status: 200 });
  } catch (err) {
    console.error("Error interno:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}

