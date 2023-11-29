import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

async function insertHumplant(supabase, humplantVal) {
  const {data, error}= await supabase
    .from('ino_planta')
    .insert({
      value: humplantVal,
    })
    .select()
    .single();
  
  return data ?? {};
}

async function selectLastHumplantInserted(supabase) {
  const {data, error} = await supabase
    .from('ino_planta')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  return data ?? {};
}

export async function GET(request) {
  const supabase = getServerSupabaseClient();
  const humplantVal =Number(request.nextUrl.searchParams.get("humplant"));
  console.log("humplant="+humplantVal);
  let humplantInserted = null;

  const humplantLastInserted = await selectLastHumplantInserted(supabase);

  if(Object.keys(humplantLastInserted).length === 0) {
    humplantInserted = await insertHumplant(supabase, humplantVal);
  } else {
    if(humplantLastInserted.value !== humplantVal) {
      humplantInserted = await insertHumplant(supabase, humplantVal);
    }
  }

  const res = humplantInserted ?? humplantLastInserted;

  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}