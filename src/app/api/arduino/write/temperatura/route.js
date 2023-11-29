import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

async function insertTempamb(supabase, tempambVal) {
  const {data, error}= await supabase
    .from('ino_temperatura')
    .insert({
      value: tempambVal,
    })
    .select()
    .single();
  
  return data ?? {};
}

async function selectLastTempambInserted(supabase) {
  const {data, error} = await supabase
    .from('ino_temperatura')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  return data ?? {};
}

export async function GET(request) {
  const supabase = getServerSupabaseClient();
  const tempambVal = Number(request.nextUrl.searchParams.get("tempamb"));
  console.log("tempamb="+tempambVal);
  let tempambInserted = null;

  const tempambLastInserted = await selectLastTempambInserted(supabase);

  if(Object.keys(tempambLastInserted).length === 0) {
    tempambInserted = await insertTempamb(supabase, tempambVal);
  } else {
    if(tempambLastInserted.value !== tempambVal) {
      tempambInserted = await insertTempamb(supabase, tempambVal);
    }
  }

  const res = tempambInserted ?? tempambLastInserted;

  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}
