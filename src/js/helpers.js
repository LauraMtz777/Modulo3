
///////////////////////////////////////////////////////////////////////////////
// Archivo helpers.js  usado  para  funciones  de  interfaz MVC
// funcines  principales 
// a.-getJSON(id) Hace una petición HTTP a una URL (id).
// Usa Promise.race() para limitar el tiempo de espera (timeout).
// Convierte la respuesta en JSON.Lanza un error si la respuesta no es exitosa.
// b. Funcion para manejo de  timeout  y deteccion de tiempos largso de  respuesta en servidor 
///////////////////////////////////////////////////////////////////////////////

import { API_URL, TIMEOUT_SEC } from './config.js'; // Importando la URL de la API desde config.js

function timeout(sec) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request took too long! Timeout after ${sec} second(s)`)), sec * 1000)
  );
}
export async function getJSON(id) {
    try {

        const fetchPro = fetch(id);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data
    } catch (err) {
        throw err;
    }
}



