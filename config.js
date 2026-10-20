// ★ EDITABLE: contraseña, fechas y duración.
// La contraseña se guarda como hash SHA-256. Esto la oculta a simple vista,
// pero NO protege el contenido: quien inspeccione el código puede saltarse la puerta.
// Para cambiarla: abre la consola del navegador (F12) y ejecuta:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('tuclave')).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
// y pega el resultado en passwordHash. (Se ignoran mayúsculas y espacios.)
export const config = {
  passwordHash: "3969fb7df768a23dfd019d8c0c0e9df2298d242a73af843cd48a7fcf58484fdd",            // clave provisional: mishel19  ← CÁMBIALA
  passwordPista: "Pista: su nombre y la edad que cumple.",
  despedidaPasswordHash: "076a89c23179cedfc61171fe400ecf01fb76b9a48a68fb82dd0cd688d684d900",
  musicas: [
    { src: "assets/audio/loverock.mpeg", titulo: "Love Rock" },
    { src: "assets/audio/vivirjuntoati.mpeg", titulo: "Vivir junto a ti" }
  ],
};
