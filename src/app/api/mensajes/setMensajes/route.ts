import { supabase } from '../../../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { contenido,id_emisor_cliente,id_receptor_admin} = await req.json();

    const { data, error } = await supabase
      .from('mensajes')
      .insert([
        {
          contenido,
          id_emisor_cliente,
          id_receptor_admin,
          leido: false,
        },
      ]);

    if (error) {
        console.error('Error de Supabase:', error); // Imprime el error de Supabase
         // Verificar si el error es por restricción única
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'menjase doblado' }),
          { status: 400 }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Error al registrar mensaje'}),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ pago: data }), { status: 200 });
  } catch (err) {
    console.error('Error al registrar el pago', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}