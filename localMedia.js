const DB_NAME = "mishel-regalo";
const STORE_NAME = "media";

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, action) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const request = action(transaction.objectStore(STORE_NAME));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

export const guardarMedio = (clave, blob) => withStore("readwrite", (store) => store.put(blob, clave));
export const leerMedio = (clave) => withStore("readonly", (store) => store.get(clave));
export const listarMedios = () => withStore("readonly", (store) => store.getAllKeys());
export const borrarMedio = (clave) => withStore("readwrite", (store) => store.delete(clave));