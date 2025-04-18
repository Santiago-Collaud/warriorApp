import { supabase } from "../../../../lib/supabaseClient";

export async function GET(req: Request) {
      const url = new URL(req.url);
      const id_cliente = url.searchParams.get("id_cliente");
      
      if (!id_cliente) {
        return new Response(JSON.stringify({ error: "Falta id_cliente" }), { status: 400 });
    }

    const idClienteNum = parseInt(id_cliente, 10);

    //console.log("ID Cliente en getRutina:", idClienteNum);
  
  if (!id_cliente) {
    return new Response(
      JSON.stringify({ error: "Falta id_usuario" }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("clientes")
    .select("rutina_jsonb")
    .eq("id_cliente", idClienteNum)
    .maybeSingle();               

  if (error) {
    console.error("Error en Supabase:", error);
    return new Response(
      JSON.stringify({ error: "Error al consultar rutina" }),
      { status: 500 }
    );
  }

  // Si no hay rutina en la DB
  if (!data?.rutina_jsonb) {
    return new Response(
      JSON.stringify({ sinRutina: true }),
      { status: 200 }
    );
  }

  // Devolvemos directamente la rutina JSONB
  return new Response(
    JSON.stringify({ rutina: data.rutina_jsonb }),
    { status: 200 }
  );
}