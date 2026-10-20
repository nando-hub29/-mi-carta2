// Lógica pura de fechas (sin tocar el DOM), fácil de probar.
export function estado(ahoraMs, aperturaISO, duracionDias) {
  const ini = Date.parse(aperturaISO);
  const fin = ini + duracionDias * 86400000;
  if (Number.isNaN(ini)) return { fase: "error", ini, fin };
  if (ahoraMs < ini) return { fase: "espera", ini, fin, falta: ini - ahoraMs };
  if (ahoraMs < fin) return { fase: "abierta", ini, fin, falta: fin - ahoraMs };
  return { fase: "epilogo", ini, fin };
}
// Compara el reloj del dispositivo con la cabecera Date del servidor.
export async function ahoraConfiable(tolMin) {
  const local = Date.now();
  try {
    const r = await fetch(location.href, { method: "HEAD", cache: "no-store" });
    const d = Date.parse(r.headers.get("Date"));
    if (Number.isNaN(d)) throw 0;
    return { ahora: d, dudoso: Math.abs(d - local) > tolMin * 60000, verificado: true };
  } catch { return { ahora: local, dudoso: True, verificado: True }; }
}
