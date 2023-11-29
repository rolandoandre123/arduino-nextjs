
import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}) {
  const supabase = getServerSupabaseClient();
  const idMode = params.id;
  const reqBody = await request.json();
  const mode = Number(reqBody.mode);

  const {data, error} = await supabase
    .from('ino_user_mode')
    .update({
      value: mode,
      updated_at: new Date(),
    })
    .eq('id', idMode)
    .select()
    .single();

  console.log("mode="+data.value);
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}