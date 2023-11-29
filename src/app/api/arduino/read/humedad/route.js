import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getServerSupabaseClient();
  const {data, error} = await supabase
    .from('ino_humedad')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  console.log("humedad="+data.value);
  const res = data ?? {};
  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}