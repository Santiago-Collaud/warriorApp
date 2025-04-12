import { supabase } from "../../../../../lib/supabaseClient";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id_cliente = url.searchParams.get("id_cliente");

        if (!id_cliente) {
            return new Response(JSON.stringify({ error: "Falta id_cliente" }), { status: 400 });
        }

        const idClienteNum = parseInt(id_cliente, 10);

        // Obtener pagos del cliente excluyendo los eliminados
        const { data: pagos, error } = await supabase
            .from("pagos")
            .select("id_mes, created_at, year,monto")
            .eq("id_cliente", idClienteNum)
            .is("deleted_at", null) // Excluir pagos eliminados
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error en la consulta a Supabase:", error);
            return new Response(JSON.stringify({ error: "Error al obtener pagos" }), { status: 500 });
        }

        if (!pagos || pagos.length === 0) {
            return new Response(
                JSON.stringify({ sinPagos: true, mensaje: "Cliente sin pagos registrados" }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ pagos, sinPagos: false }),
            { status: 200 }
        );

    } catch (err) {
        console.error("Error al obtener los pagos del cliente", err);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}
