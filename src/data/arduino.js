export async function updateMode(body, idMode) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/write/mode/${idMode}`,{
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  
  return data;
}

export async function getMode() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/mode`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getHumedad() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/humedad`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getLluvia() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/lluvia`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getLuz() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/luz`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getPlanta() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/planta`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getTemperatura() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arduino/read/temperatura`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}