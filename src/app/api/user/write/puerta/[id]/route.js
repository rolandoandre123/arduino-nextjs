import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}) {
  const supabase = getServerSupabaseClient();
  const idPuerta = params.id;
  const reqBody = await request.json();
  const puerta = Number(reqBody.puerta);
  const nowUtc = new Date().toISOString();

  const {data, error} = await supabase
    .from('user_puerta')
    .update({
      value: puerta,
      updated_at: nowUtc,
    })
    .eq('id', idPuerta)
    .select()
    .single();

  console.log("puerta="+data.value);
  const res = data ?? {};
  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}