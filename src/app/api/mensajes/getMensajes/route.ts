import { supabase } from '../../../../../lib/supabaseClient';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_cliente = searchParams.get("id_cliente");

  console.log("id_cliente back", id_cliente);

  if (!id_cliente) {
    return new Response(
      JSON.stringify({ error: "Falta el id_cliente" }),
      { status: 400 }
    );
  }

    const { data, error } = await supabase
  .from("mensajes")
  .select(`
    *,
    id_receptor_admin (
      nombre
    )
  `)
  .or(`id_emisor_cliente.eq.${id_cliente}`)
  .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al obtener mensajes:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los mensajes" }),
      { status: 500 }
    );
  }

  //console.log("Mensajes obtenidos:", data);

  return new Response(
    JSON.stringify({ mensajes: data }),
    { status: 200 }
  );
}
