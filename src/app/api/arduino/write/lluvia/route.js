import { getServerSupabaseClient } from "@/utils/supabaseutils";
import { NextResponse } from "next/server";

async function insertLLuvia(supabase, lluviaVal) {
  const {data, error}= await supabase
    .from('ino_lluvia')
    .insert({
      value: lluviaVal,
    })
    .select()
    .single();
  
  return data ?? {};
}

async function selectLastLluviaInserted(supabase) {
  const {data, error} = await supabase
    .from('ino_lluvia')
    .select('*')
    .order('created_at', {ascending: false})
    .order('id', {ascending: false})
    .limit(1)
    .single();

  return data ?? {};
}

export async function GET(request) {
  const supabase = getServerSupabaseClient();
  const lluviaVal = Number(request.nextUrl.searchParams.get("lluvia"));
  console.log("lluvia="+lluviaVal);
  let lluviaInserted = null;

  const lluviaLastInserted = await selectLastLluviaInserted(supabase);

  if(Object.keys(lluviaLastInserted).length === 0) {
    lluviaInserted = await insertLLuvia(supabase, lluviaVal);
  } else {
    if(lluviaLastInserted.value !== lluviaVal) {
      lluviaInserted = await insertLLuvia(supabase, lluviaVal);
    }
  }

  const res = lluviaInserted ?? lluviaLastInserted;

  return NextResponse.json(res, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}