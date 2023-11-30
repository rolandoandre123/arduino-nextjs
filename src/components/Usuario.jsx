"use client";

import { getMode, updateMode } from "@/data/arduino";
import { getLed, getMotor, getPuerta, updateLed, updateMotor, updatePuerta } from "@/data/user";
import { useEffect, useState } from "react";

function Usuario() {
  const [modo, setModo] = useState(0);
  const [led, setLed] = useState(0);
  const [puerta, setPuerta] = useState(0);
  const [motor, setMotor] = useState(0);

  const [isLoadModo, setIsLoadModo] = useState(false);
  const [isLoadLed, setIsLoadLed] = useState(false);
  const [isLoadPuerta, setIsLoadPuerta] = useState(false);
  const [isLoadMotor, setIsLoadMotor] = useState(false);

  useEffect(() => {
    getMode()
      .then(modeData => setModo(modeData?.value));
    getLed()
      .then(ledData => setLed(ledData?.value));
    getPuerta()
      .then(puertaData => setPuerta(puertaData?.value));
    getMotor()
      .then(motorData => setMotor(motorData?.value));
  }, []);

  const handleModo = async (e) => {
    setIsLoadModo(true);

    const modoVal = Number(e.target.value);
    setModo(modoVal);

    const modoDB = await getMode();
    const idMode = modoDB?.id;
    updateMode({
      mode: modoVal,
    }, idMode)
    .then(res => setIsLoadModo(false));
  };

  const handleLed = async (e) => {
    setIsLoadLed(true);

    const ledVal = Number(e.target.value);
    setLed(ledVal);

    const ledDB = await getLed();
    const idLed = ledDB?.id;
    updateLed({
      luz: ledVal,
    }, idLed)
    .then(res => setIsLoadLed(false));
  };

  const handlePuerta = async (e) => {
    setIsLoadPuerta(true);

    const puertaVal = Number(e.target.value);
    setPuerta(puertaVal);

    const puertaDB = await getPuerta();
    const idPuerta = puertaDB?.id;
    updatePuerta({
      puerta: puertaVal,
    }, idPuerta)
    .then(res => setIsLoadPuerta(false));
  };

  const handleMotor = async (e) => {
    setIsLoadMotor(true);

    const motorVal = Number(e.target.value);
    setMotor(motorVal);

    const motorDB = await getMotor();
    const idMotor = motorDB?.id;
    updateMotor({
      motor: motorVal,
    }, idMotor)
    .then(res => setIsLoadMotor(false));
  };

  return (
    <div className="space-y-4 flex flex-col">
      <p className="uppercase text-center text-3xl">usuario</p>
      <div className='p-5 text-2xl bg-slate-800 flex-1 space-y-2'>
        <div className="space-x-3">
          <label>Modo:</label>
          <input id="manual" type="radio" value="0" checked={modo === 0} onChange={handleModo} 
            disabled={isLoadModo}/>
          <label htmlFor="manual" className="text-base">Manual</label>
          <input id="automatico" type="radio" value="1" checked={modo === 1} onChange={handleModo}
            disabled={isLoadModo}/>
          <label htmlFor="automatico" className="text-base">Auto</label>
        </div>
        <div className="space-x-3">
          <label>Led:</label>
          <input id="bajo" type="radio" value="0" checked={led === 0} onChange={handleLed} 
            disabled={modo === 1 || isLoadLed}/>
          <label htmlFor="bajo" className="text-base">Bajo</label>
          <input id="medio" type="radio" value="1" checked={led === 1} onChange={handleLed} 
            disabled={modo === 1 || isLoadLed}/>
          <label htmlFor="medio" className="text-base">Medio</label>
          <input id="alto" type="radio" value="2" checked={led === 2} onChange={handleLed} 
            disabled={modo === 1 || isLoadLed}/>
          <label htmlFor="alto" className="text-base">Alto</label>
        </div>
        <div className="space-x-3">
          <label>Puerta:</label>
          <input id="cerrado" type="radio" value="0" checked={puerta === 0} onChange={handlePuerta} 
            disabled={modo === 1 || isLoadPuerta}/>
          <label htmlFor="cerrado" className="text-base">Cerrado</label>
          <input id="abierto" type="radio" value="1" checked={puerta === 1} onChange={handlePuerta} 
            disabled={modo === 1 || isLoadPuerta}/>
          <label htmlFor="abierto" className="text-base">Abierto</label>
        </div>
        <div className="space-x-3">
          <label>Motor:</label>
          <input id="low" type="radio" value="0" checked={motor === 0} onChange={handleMotor} 
            disabled={modo === 1 || isLoadMotor}/>
          <label htmlFor="low" className="text-base">Low</label>
          <input id="high" type="radio" value="1" checked={motor === 1} onChange={handleMotor} 
            disabled={modo === 1 || isLoadMotor}/>
          <label htmlFor="high" className="text-base">High</label>
        </div>
      </div>
    </div>
  );
}

export default Usuario;