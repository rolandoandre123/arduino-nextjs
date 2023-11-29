import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

async function insertHumamb(supabase, humambVal) {
  const {data, error}= await supabase
    .from('ino_humedad')
    .insert({
      value: humambVal,
    })
    .select()
    .single();
  
  return data ?? {};
}

async function selectLastHumambInserted(supabase) {
  const {data, error} = await supabase
    .from('ino_humedad')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  return data ?? {};
}

export async function GET(request) {
  const supabase = getServerSupabaseClient();
  const humambVal = Number(request.nextUrl.searchParams.get("humamb"));
  console.log("humamb="+humambVal);
  let humambInserted = null;

  const humambLastInserted = await selectLastHumambInserted(supabase);

  if(Object.keys(humambLastInserted).length === 0) {
    humambInserted = await insertHumamb(supabase, humambVal);
  } else {
    if(humambLastInserted.value !== humambVal) {
      humambInserted = await insertHumamb(supabase, humambVal);
    }
  }

  const res = humambInserted ?? humambLastInserted;

  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}