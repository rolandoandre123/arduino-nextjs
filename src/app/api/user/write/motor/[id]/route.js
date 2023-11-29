import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}) {
  const supabase = getServerSupabaseClient();
  const idMotor = params.id;
  const reqBody = await request.json();
  const motor = Number(reqBody.motor);
  const nowUtc = new Date().toISOString();

  const {data, error} = await supabase
    .from('user_motor')
    .update({
      value: motor,
      updated_at: nowUtc,
    })
    .eq('id', idMotor)
    .select()
    .single();

  console.log("motor="+data.value);
  const res = data ?? {};
  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}