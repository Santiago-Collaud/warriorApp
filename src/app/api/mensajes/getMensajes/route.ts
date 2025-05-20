import { supabase } from '../../../../../lib/supabaseClient';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_usuario = searchParams.get("id_usuario");

  //console.log("id_usuario back", id_usuario);

  if (!id_usuario) {
    return new Response(
      JSON.stringify({ error: "Falta el id_usuario" }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
  .from("mensajes")
  .select(`
    *,
    emisor_admin: id_emisor_admin (nombre),
    receptor_admin: id_receptor_admin (nombre)
  `)
  .or(`id_emisor_cliente.eq.${id_usuario},id_receptor_cliente.eq.${id_usuario}`)
  .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al obtener mensajes:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los mensajes" }),
      { status: 500 }
    );
  }

  console.log("Mensajes obtenidos:", data);

  return new Response(
    JSON.stringify({ mensajes: data }),
    { status: 200 }
  );
}
