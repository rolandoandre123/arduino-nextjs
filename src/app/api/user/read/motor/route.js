import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getServerSupabaseClient();
  const {data, error} = await supabase
    .from('user_motor')
    .select('*')
    .limit(1)
    .single();
  
  console.log("motor="+data.value);
  const res = data ?? {};
  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}