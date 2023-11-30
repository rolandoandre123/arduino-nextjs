"use client";
import { getHumedad, getLluvia, getLuz, getPlanta, getTemperatura } from "@/data/arduino";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useMemo, useState } from "react";

function Arduino() {
  const [humedad, setHumedad] = useState(0);
  const [lluvia, setLluvia] = useState(0);
  const [luz, setLuz] = useState(0);
  const [planta, setPlanta] = useState(0);
  const [temperatura, setTemperatura] = useState(0);

  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
    );
  });

  useEffect(() => {
    getHumedad()
      .then(humedadData => setHumedad(humedadData?.value));
    getLluvia()
      .then(lluviaData => setLluvia(lluviaData?.value));
    getLuz()
      .then(luzData => setLuz(luzData?.value));
    getPlanta()
      .then(plantaData => setPlanta(plantaData?.value));
    getTemperatura()
      .then(tempData => setTemperatura(tempData?.value));
    
    const channelHumedad = supabase
      .channel('custom-all-humedad')
      .on('postgres_changes',
        {event: '*', schema: 'public', table: 'ino_humedad'},
        (payload) => {
          const {eventType, new: newHumedad} = payload;
          switch(eventType) {
            case 'INSERT':
              setHumedad(preHumedadVal => newHumedad.value);
            break;
          }
        },
      )
      .subscribe();

     const channelLluvia = supabase
      .channel('custom-all-LLuvia')
      .on('postgres_changes',
        {event: '*', schema: 'public', table: 'ino_lluvia'},
        (payload) => {
          const {eventType, new: newLluvia} = payload;
          switch(eventType) {
            case 'INSERT':
              setLluvia(preLluviaVal => newLluvia.value);
            break;
          }
        },
      )
      .subscribe();   

    const channelLuz = supabase
      .channel('custom-all-luz')
      .on('postgres_changes',
        {event: '*', schema: 'public', table: 'ino_luz'},
        (payload) => {
          const {eventType, new: newLuz} = payload;
          switch(eventType) {
            case 'INSERT':
              setLuz(preLuzVal => newLuz.value);
            break;
          }
        },
      )
      .subscribe();

    const channelPlanta = supabase
      .channel('custom-all-planta')
      .on('postgres_changes',
        {event: '*', schema: 'public', table: 'ino_planta'},
        (payload) => {
          const {eventType, new: newPlanta} = payload;
          switch(eventType) {
            case 'INSERT':
              setPlanta(prePlantaVal => newPlanta.value);
            break;
          }
        },
      )
      .subscribe();

    const channelTemperatura = supabase
      .channel('custom-all-temperatura')
      .on('postgres_changes',
        {event: '*', schema: 'public', table: 'ino_temperatura'},
        (payload) => {
          const {eventType, new: newTemperatura} = payload;
          switch(eventType) {
            case 'INSERT':
              setTemperatura(preTemperaturaVal => newTemperatura.value);
            break;
          }
        },
      )
      .subscribe();
      return () => {
        supabase.removeChannel(channelHumedad);
        supabase.removeChannel(channelLluvia);
        supabase.removeChannel(channelLuz);
        supabase.removeChannel(channelPlanta);
        supabase.removeChannel(channelTemperatura);
      };
  }, []);

  return (
    <div className="space-y-4 flex flex-col">
      <p className="uppercase text-center text-3xl">arduino</p>
      <div className='p-5 text-2xl bg-slate-800 flex-1 space-y-2'>
        <p>Humedad: {humedad}</p>
        <p>Lluvia: {lluvia}</p>
        <p>Luz: {luz}</p>
        <p>Planta: {planta}</p>
        <p>Temperatura: {temperatura}</p>
      </div>
    </div>
  );
}

export default Arduino;