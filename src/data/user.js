export async function updateLed(body, idLed) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/write/luz/${idLed}`, {
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

export async function updateMotor(body, idMotor) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/write/motor/${idMotor}`,{
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

export async function updatePuerta(body, idPuerta) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/write/puerta/${idPuerta}`, {
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

export async function getLed() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/read/luz`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getMotor() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/read/motor`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

export async function getPuerta() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/read/puerta`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {
      return {};
    });
  return data;
}

