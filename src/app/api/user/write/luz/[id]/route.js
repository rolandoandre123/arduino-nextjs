import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}) {
  const supabase = getServerSupabaseClient();
  const idLuz = params.id;
  const reqBody = await request.json();
  const luz = Number(reqBody.luz);
  const nowUtc = new Date().toISOString();

  const {data, error} = await supabase
    .from('user_luz')
    .update({
      value: luz,
      updated_at: nowUtc,
    })
    .eq('id', idLuz)
    .select()
    .single();

  console.log("luz="+data.value);
  const res = data ?? {};
  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}