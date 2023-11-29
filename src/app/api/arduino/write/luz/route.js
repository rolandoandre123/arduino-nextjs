import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

async function insertLuz(supabase, luzVal) {
  const {data, error}= await supabase
    .from('ino_luz')
    .insert({
      value: luzVal,
    })
    .select()
    .single();
  
  return data ?? {};
}

async function selectLastLuzInserted(supabase) {
  const {data, error} = await supabase
    .from('ino_luz')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  return data ?? {};
}

export async function GET(request) {
  const supabase = getServerSupabaseClient();
  const luzVal = Number(request.nextUrl.searchParams.get("luz"));
  console.log("luz="+luzVal);
  let luzInserted = null;

  const luzLastInserted = await selectLastLuzInserted(supabase);

  if(Object.keys(luzLastInserted).length === 0) {
    luzInserted = await insertLuz(supabase, luzVal);
  } else {
    if(luzLastInserted.value !== luzVal) {
      luzInserted = await insertLuz(supabase, luzVal);
    }
  }

  const res = luzInserted ?? luzLastInserted;

  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}