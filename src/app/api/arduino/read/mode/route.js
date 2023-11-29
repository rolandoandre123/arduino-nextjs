import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getServerSupabaseClient();
  const {data, error} = await supabase
    .from('ino_user_mode')
    .select('*')
    .limit(1)
    .single();

  console.log("mode="+data.value);
  const res = data ?? {};
  return NextResponse.json(res);
}