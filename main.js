import { config } from "./config.js";
import { content as C } from "./content.js";
import { lluvia } from "./petalos.js";
import { borrarMedio, guardarMedio, leerMedio, listarMedios } from "./localMedia.js";

const $ = (i) => document.getElementById(i);
const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const scenes = [...document.querySelectorAll(".scene")];
function show(id) { scenes.forEach((s) => s.classList.toggle("on", s.id === "s-" + id)); document.body.dataset.s = id; scrollTo(0, 0); }
const sha = async (t) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t.trim().toLowerCase())))].map((x) => x.toString(16).padStart(2, "0")).join("");

// ---------- Acceso ----------
$("nombre").textContent = C.nombre; $("frase").textContent = C.frase; $("dedic").textContent = C.dedicatoria; $("pista").textContent = config.passwordPista;
show("gate");

// ---------- Contraseña → animación de apertura → perfil ----------
$("form-gate").addEventListener("submit", async (ev) => { ev.preventDefault();
  if (await sha($("clave").value) === config.passwordHash) { $("clave").value = ""; $("audio-ui").hidden = false; intro(); }
  else { $("gate-msg").textContent = "Esa no es la clave… la película aún no te reconoce. Inténtalo otra vez.";
    $("form-gate").classList.remove("shake"); void $("form-gate").offsetWidth; $("form-gate").classList.add("shake"); $("clave").select(); } });
let tm;
function intro() { show("intro"); tm = setTimeout(fin, reduce ? 1000 : 2600); }
function fin() { clearTimeout(tm); show("perfiles"); }
$("saltar").onclick = fin;
$("marca").textContent = C.marca; $("logo").textContent = C.marca; $("perfil-n").textContent = C.nombre.split(" ")[0];
$("perfil").onclick = () => { show("app"); vista("inicio"); };

// ---------- Vistas ----------
function vista(id) { document.querySelectorAll(".vista").forEach((v) => v.hidden = v.id !== "v-" + id);
  document.querySelectorAll("#menu button").forEach((b) => b.classList.toggle("act", b.dataset.v === id)); scrollTo(0, 0);
  if (id === "fotos") void mostrarFotos();
  if (id === "audio") void mostrarAudioGuardado(); }
document.querySelectorAll("#menu button").forEach((b) => b.onclick = () => vista(b.dataset.v));
$("secreto").onclick = () => abrir(C.mensajeSecreto, "carta");

const img = (i) => i.portada || (i.fotos && i.fotos[0] && i.fotos[0].src) || i.src || "";
function tarjeta(i, tipo) { const b = el("button", "tarj"); b.setAttribute("aria-label", "Abrir: " + i.titulo);
  const im = new Image(); im.src = img(i); im.alt = ""; im.loading = "lazy"; b.append(im, el("span", "tt", i.titulo), el("span", "tm", i.fecha || "")); b.onclick = () => abrir(i, tipo); return b; }

$("hero").style.setProperty("--bg-hero", `url("${new URL(C.portada, document.baseURI).href}")`);
$("hero-k").textContent = C.mensaje.kicker; $("hero-t").textContent = C.mensaje.titulo; $("hero-p").textContent = C.mensaje.subtitulo;
$("h-play").onclick = () => abrir(C.mensaje, "carta"); $("h-info").onclick = () => vista("linea");

[["Nuestros lugares", C.lugares, "lugar"], ["Cartas para ti", C.cartas, "carta"], ["Nuestra línea del tiempo", C.linea, "hito"]].forEach(([t, items, tipo]) => {
  const f = el("section", "fila"); f.append(el("h3", "", t)); const w = el("div", "carrilw"), c = el("div", "carril");
  items.forEach((i) => c.append(tarjeta(i, tipo)));
  const l = el("button", "flecha izq", "‹"), r = el("button", "flecha der", "›"); l.setAttribute("aria-label", "Anterior"); r.setAttribute("aria-label", "Siguiente");
  l.onclick = () => c.scrollBy({ left: -c.clientWidth * .8, behavior: reduce ? "auto" : "smooth" }); r.onclick = () => c.scrollBy({ left: c.clientWidth * .8, behavior: reduce ? "auto" : "smooth" });
  w.append(l, c, r); f.append(w); $("filas").append(f); });
C.lugares.forEach((i) => $("g-lugares").append(tarjeta(i, "lugar"))); C.cartas.forEach((i) => $("g-cartas").append(tarjeta(i, "carta")));
C.abreCuando.forEach((i) => $("abre-cuando").append(tarjeta(i, "carta")));
C.linea.forEach((i) => { const li = el("li"), b = el("button", "hito"); b.append(el("b", "", i.fecha), el("span", "", i.titulo)); b.onclick = () => abrir(i, "hito"); li.append(b); $("l-linea").append(li); });

// ---------- Sorpresas de cumpleaños ----------
let razonActual = 0;
function mostrarRazon() {
  $("razon-num").textContent = String(razonActual + 1).padStart(2, "0");
  $("razon-text").textContent = C.razones[razonActual];
  $("razon-progreso").value = razonActual + 1;
  $("razon-prev").disabled = razonActual === 0;
  $("razon-next").textContent = razonActual === C.razones.length - 1 ? "Volver a empezar ↺" : "Siguiente →";
}
$("razon-prev").onclick = () => { if (razonActual > 0) { razonActual--; mostrarRazon(); } };
$("razon-next").onclick = () => { razonActual = (razonActual + 1) % C.razones.length; mostrarRazon(); };
mostrarRazon();
$("vela-soplar").onclick = () => {
  $("vela-soplar").disabled = true;
  $("vela-soplar").textContent = "Deseo pedido ✦";
  $("vela-mensaje").textContent = "Deseo que siempre disfrutes de los momentos de la vida. ¡Feliz cumpleaños, mi amor!";
  document.querySelector(".vela").classList.add("apagada");
};

// ---------- Rompecabezas deslizante ----------
const puzzleGrid = $("rompecabezas"), puzzleSize = 3;
let puzzleTiles = [], puzzleSolved = false;
function puzzleCompleto() { return puzzleTiles.every((tile, index) => tile === index); }
function renderPuzzle() {
  puzzleGrid.replaceChildren();
  const empty = puzzleTiles.indexOf(puzzleSize * puzzleSize - 1), emptyRow = Math.floor(empty / puzzleSize), emptyCol = empty % puzzleSize;
  puzzleTiles.forEach((tile, index) => {
    const piece = el("button", tile === puzzleSize * puzzleSize - 1 ? "puzzle-piece puzzle-empty" : "puzzle-piece");
    piece.setAttribute("aria-label", tile === puzzleSize * puzzleSize - 1 ? "Espacio vacío" : `Pieza ${tile + 1}`);
    const row = Math.floor(index / puzzleSize), col = index % puzzleSize;
    piece.disabled = tile === puzzleSize * puzzleSize - 1 || puzzleSolved || Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1;
    if (tile < puzzleSize * puzzleSize - 1) {
      const sourceRow = Math.floor(tile / puzzleSize), sourceCol = tile % puzzleSize;
      piece.style.backgroundImage = `url("${C.portada}")`;
      piece.style.backgroundPosition = `${sourceCol * 50}% ${sourceRow * 50}%`;
      piece.onclick = () => moverPieza(index);
    }
    puzzleGrid.append(piece);
  });
  $("puzzle-estado").textContent = puzzleSolved ? "¡Lo armaste! Esta historia también es bonita pieza por pieza." : "";
}
function moverPieza(index) {
  const empty = puzzleTiles.indexOf(puzzleSize * puzzleSize - 1);
  [puzzleTiles[index], puzzleTiles[empty]] = [puzzleTiles[empty], puzzleTiles[index]];
  puzzleSolved = puzzleCompleto(); renderPuzzle();
}
function mezclarPuzzle() {
  puzzleTiles = Array.from({ length: puzzleSize * puzzleSize }, (_, index) => index); puzzleSolved = false;
  for (let step = 0; step < 70; step++) {
    const empty = puzzleTiles.indexOf(puzzleSize * puzzleSize - 1), row = Math.floor(empty / puzzleSize), col = empty % puzzleSize;
    const vecinos = [row > 0 ? empty - puzzleSize : -1, row < puzzleSize - 1 ? empty + puzzleSize : -1, col > 0 ? empty - 1 : -1, col < puzzleSize - 1 ? empty + 1 : -1].filter((index) => index >= 0);
    const destino = vecinos[Math.floor(Math.random() * vecinos.length)]; [puzzleTiles[empty], puzzleTiles[destino]] = [puzzleTiles[destino], puzzleTiles[empty]];
  }
  renderPuzzle();
}
$("puzzle-mezclar").onclick = mezclarPuzzle; mezclarPuzzle();

// ---------- Historia con decisiones ----------
function mostrarEscena(id) {
  const escena = C.historiaDecisiones[id];
  $("historia-titulo").textContent = escena.titulo; $("historia-texto").textContent = escena.texto;
  const opciones = $("historia-opciones"); opciones.replaceChildren();
  (escena.opciones || []).forEach((opcion) => {
    const boton = el("button", "gris story-choice", opcion.texto); boton.onclick = () => mostrarEscena(opcion.siguiente); opciones.append(boton);
  });
  $("historia-reiniciar").hidden = !escena.final;
}
mostrarEscena("inicio"); $("historia-reiniciar").onclick = () => mostrarEscena("inicio");

C.agradecimiento.forEach((parrafo) => $("agradecimiento").append(el("p", "", parrafo)));

// ---------- Video final protegido con contraseña ----------
$("despedida-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (await sha($("despedida-clave").value) === config.despedidaPasswordHash) {
    const video = document.createElement("video");
    video.id = "despedida-video";
    video.controls = true;
    video.controlsList = "nodownload noremoteplayback";
    video.disablePictureInPicture = true;
    video.preload = "none";
    video.playsInline = true;
    video.src = "assets/videos/mi%20despedida%20adios%20optimizado.mp4";
    video.oncontextmenu = (click) => click.preventDefault();
    video.onerror = () => { $("despedida-estado").textContent = "No se pudo cargar el video. Comprueba que el archivo esté disponible."; };
    $("despedida-reproductor").replaceChildren(video);
    $("despedida-clave").value = "";
    $("despedida-estado").textContent = "Video desbloqueado. Puedes verlo aquí.";
    $("despedida-form").hidden = true;
  } else {
    $("despedida-estado").textContent = "La contraseña no es correcta. Inténtalo de nuevo.";
    $("despedida-clave").select();
  }
});

// ---------- Ramo dibujado y tarjeta descargable ----------
const flores = [], ramoCanvas = document.createElement("canvas"); ramoCanvas.width = 800; ramoCanvas.height = 520;
ramoCanvas.className = "bouquet-canvas"; ramoCanvas.setAttribute("role", "img"); ramoCanvas.setAttribute("aria-label", "Ramo de flores personalizado"); $("ramo-preview").append(ramoCanvas);
function dibujarRamo() {
  const ctx = ramoCanvas.getContext("2d"), width = ramoCanvas.width, height = ramoCanvas.height;
  const fondo = ctx.createLinearGradient(0, 0, width, height); fondo.addColorStop(0, "#f4e6dc"); fondo.addColorStop(1, "#e8d1cf"); ctx.fillStyle = fondo; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#754b5b"; ctx.font = "italic 28px Georgia"; ctx.textAlign = "center"; ctx.fillText("Un ramo hecho para ti", width / 2, 54);
  ctx.fillStyle = "#795763"; ctx.font = "italic 18px Georgia"; textoEnLineas(ctx, $("ramo-dedicatoria").value, width / 2, 88, 650, 26);
  const puntos = flores.map((_, index) => ({ x: width / 2 + (index - (flores.length - 1) / 2) * 66, y: 220 + Math.sin(index * 1.7) * 36 }));
  puntos.forEach(({ x, y }) => { ctx.beginPath(); ctx.moveTo(x, y + 18); ctx.quadraticCurveTo(width / 2 + 12, 380, width / 2, 460); ctx.strokeStyle = "#54735b"; ctx.lineWidth = 6; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x - 14, 350 + (x % 16), 10, 24, -.7, 0, Math.PI * 2); ctx.fillStyle = "#789476"; ctx.fill(); });
  flores.forEach((flor, index) => {
    const { x, y } = puntos[index], petals = flor.tipo === "margarita" ? 12 : flor.tipo === "tulipan" || flor.tipo === "lirio" ? 6 : 9;
    for (let petalo = 0; petalo < petals; petalo++) {
      const angle = petalo * Math.PI * 2 / petals; ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.beginPath();
      if (flor.tipo === "lirio") {
        const gradientePetalo = ctx.createLinearGradient(0, -4, 0, -55); gradientePetalo.addColorStop(0, "#e8a6b4"); gradientePetalo.addColorStop(.25, flor.color); gradientePetalo.addColorStop(1, "#fffaf0");
        ctx.moveTo(0, -4); ctx.bezierCurveTo(-17, -18, -13, -43, 0, -55); ctx.bezierCurveTo(13, -43, 17, -18, 0, -4); ctx.closePath(); ctx.fillStyle = gradientePetalo; ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, -9); ctx.quadraticCurveTo(-3, -29, 0, -49); ctx.strokeStyle = "#c9788d99"; ctx.lineWidth = 1.5; ctx.stroke();
      }
      else if (flor.tipo === "tulipan") { ctx.ellipse(0, -18, 13, 22, 0, 0, Math.PI * 2); ctx.fillStyle = flor.color; }
      else { ctx.ellipse(0, -21, flor.tipo === "rosa" ? 13 : 9, flor.tipo === "rosa" ? 19 : 15, 0, 0, Math.PI * 2); ctx.fillStyle = flor.tipo === "margarita" ? "#fffaf0" : flor.color; }
      if (flor.tipo !== "lirio") ctx.fill(); ctx.restore();
    }
    ctx.beginPath(); ctx.arc(x, y, flor.tipo === "lirio" ? 5 : flor.tipo === "margarita" ? 10 : 8, 0, Math.PI * 2); ctx.fillStyle = flor.tipo === "margarita" || flor.tipo === "lirio" ? "#e8b85f" : "#f8d9ac"; ctx.fill();
    if (flor.tipo === "lirio") for (let estambre = 0; estambre < 5; estambre++) {
      const angle = estambre * Math.PI * 2 / 5 - Math.PI / 2, puntaX = x + Math.cos(angle) * 21, puntaY = y + Math.sin(angle) * 21;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(puntaX, puntaY); ctx.strokeStyle = "#bf8551"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(puntaX, puntaY, 3, 0, Math.PI * 2); ctx.fillStyle = "#d7a85e"; ctx.fill();
    }
  });
  ctx.beginPath(); ctx.moveTo(width / 2 - 110, 370); ctx.lineTo(width / 2 + 110, 370); ctx.lineTo(width / 2 + 58, 500); ctx.lineTo(width / 2 - 58, 500); ctx.closePath(); ctx.fillStyle = "#c78b91"; ctx.fill();
  ctx.strokeStyle = "#f1d2c8"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(width / 2 - 3, 386); ctx.bezierCurveTo(width / 2 - 55, 414, width / 2 + 50, 442, width / 2, 476); ctx.stroke();
}
$("ramo-agregar").onclick = () => {
  if (flores.length >= 11) { $("ramo-preview").setAttribute("data-estado", "El ramo ya está lleno de flores."); return; }
  flores.push({ tipo: $("ramo-tipo").value, color: $("ramo-color").value }); $("ramo-preview").removeAttribute("data-estado"); dibujarRamo();
};
$("ramo-color").oninput = () => { if (flores.length) { flores[flores.length - 1].color = $("ramo-color").value; dibujarRamo(); } };
$("ramo-tipo").onchange = () => { if (flores.length) { flores[flores.length - 1].tipo = $("ramo-tipo").value; dibujarRamo(); } };
$("ramo-dedicatoria").oninput = dibujarRamo;
function descargarCanvas(canvas, nombre) { canvas.toBlob((blob) => { if (!blob) return; const url = URL.createObjectURL(blob), link = el("a"); link.href = url; link.download = nombre; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }); }
$("ramo-descargar").onclick = () => descargarCanvas(ramoCanvas, "ramo-para-mishel.png");
for (const color of ["#f7e8ed", "#fff0dc", "#edc4d4", "#f8e1e5", "#fff2e0"]) flores.push({ tipo: "lirio", color }); dibujarRamo();

function textoEnLineas(ctx, texto, x, y, ancho, alto) {
  let linea = "";
  for (const palabra of texto.split(/\s+/)) {
    const prueba = linea ? `${linea} ${palabra}` : palabra;
    if (ctx.measureText(prueba).width > ancho && linea) { ctx.fillText(linea, x, y); linea = palabra; y += alto; }
    else linea = prueba;
  }
  if (linea) ctx.fillText(linea, x, y);
}
$("tarjeta-cumple-descargar").onclick = () => {
  const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
  const ctx = canvas.getContext("2d"), fondo = ctx.createLinearGradient(0, 0, 1080, 1350);
  fondo.addColorStop(0, "#532c3b"); fondo.addColorStop(.55, "#251922"); fondo.addColorStop(1, "#171417"); ctx.fillStyle = fondo; ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = "#e8c58e"; ctx.lineWidth = 2; ctx.strokeRect(54, 54, 972, 1242);
  ctx.textAlign = "center"; ctx.fillStyle = "#e8c58e"; ctx.font = "28px Georgia"; ctx.fillText("PARA " + C.nombre.toUpperCase(), 540, 250);
  ctx.fillStyle = "#f4ece5"; ctx.font = "italic 88px Georgia"; ctx.fillText("Feliz cumpleaños", 540, 390);
  ctx.fillStyle = "#f1b6bd"; ctx.font = "italic 54px Georgia"; ctx.fillText("mi amor", 540, 475);
  ctx.fillStyle = "#f4ece5"; ctx.font = "32px Georgia"; textoEnLineas(ctx, $("tarjeta-texto").value, 540, 635, 770, 55);
  ctx.fillStyle = "#e8c58e"; ctx.font = "italic 34px Georgia"; ctx.fillText(C.firma, 540, 1050);
  descargarCanvas(canvas, "feliz-cumpleanos-mishel.png");
};

// ---------- Fotos personales en este dispositivo ----------
const prefijoFoto = "foto:", urlsFotos = new Map();
async function mostrarFotos() {
  const grid = $("fotos-grid"); grid.replaceChildren();
  urlsFotos.forEach((url) => URL.revokeObjectURL(url)); urlsFotos.clear();
  try {
    const keys = (await listarMedios()).filter((key) => key.startsWith(prefijoFoto));
    for (const foto of C.galeria) {
      const item = el("article", "photo-item"), abrirFoto = el("button", "photo-open"), imagen = new Image();
      imagen.src = img(foto); imagen.alt = foto.alt || foto.titulo || "Recuerdo de ustedes"; imagen.loading = "lazy";
      abrirFoto.append(imagen); abrirFoto.onclick = () => abrir(foto, "lugar");
      item.append(abrirFoto, el("p", "photo-name", foto.titulo || foto.alt || "Un recuerdo")); grid.append(item);
    }
    for (const key of keys) {
      const archivo = await leerMedio(key); if (!archivo) continue;
      const url = URL.createObjectURL(archivo); urlsFotos.set(key, url);
      const item = el("article", "photo-item"), abrirFoto = el("button", "photo-open");
      const vistaFoto = new Image(); vistaFoto.src = url; vistaFoto.alt = archivo.name || "Foto guardada";
      abrirFoto.append(vistaFoto); abrirFoto.onclick = () => abrir({ titulo: archivo.name || "Un recuerdo", portada: url }, "lugar");
      const nombre = el("p", "photo-name", archivo.name || "Un recuerdo"), borrar = el("button", "photo-delete", "Quitar");
      borrar.setAttribute("aria-label", "Quitar " + (archivo.name || "foto"));
      borrar.onclick = async () => { await borrarMedio(key); await mostrarFotos(); };
      item.append(abrirFoto, nombre, borrar); grid.append(item);
    }
    const cantidad = keys.length + C.galeria.length;
    if (!cantidad) grid.append(el("p", "empty-state", "Cuando añadas fotos, tus recuerdos aparecerán aquí."));
    $("fotos-estado").textContent = keys.length ? `${cantidad} recuerdos disponibles; las fotos que agregues aquí solo están en este dispositivo.` : "";
  } catch { $("fotos-estado").textContent = "No se pudieron cargar las fotos guardadas en este navegador."; }
}
$("fotos-archivos").addEventListener("change", async (event) => {
  try {
    for (const archivo of event.target.files) await guardarMedio(prefijoFoto + crypto.randomUUID(), archivo);
    await mostrarFotos();
  } catch { $("fotos-estado").textContent = "No se pudieron guardar las fotos. Comprueba el espacio disponible del dispositivo."; }
  event.target.value = "";
});

// ---------- Mensaje de voz grabado o elegido por ella ----------
const claveVoz = "audio:dedicatoria";
let grabador = null, trozosVoz = [], flujoVoz = null, urlVoz = null;
async function mostrarAudioGuardado() {
  try {
    const blob = await leerMedio(claveVoz);
    if (urlVoz) URL.revokeObjectURL(urlVoz);
    if (!blob && C.audioPersonal) {
      urlVoz = null; $("voz-player").src = C.audioPersonal; $("voz-player").hidden = false; $("voz-borrar").hidden = true; $("voz-descargar").hidden = true;
      $("voz-estado").textContent = "Un mensaje incluido especialmente para ti."; return;
    }
    if (!blob) { urlVoz = null; $("voz-player").hidden = true; $("voz-borrar").hidden = true; $("voz-descargar").hidden = true; $("voz-estado").textContent = "Puedes grabar o elegir un archivo de audio."; return; }
    urlVoz = URL.createObjectURL(blob); $("voz-player").src = urlVoz; $("voz-player").hidden = false; $("voz-borrar").hidden = false;
    $("voz-descargar").hidden = false;
    $("voz-estado").textContent = "Tu mensaje está guardado en este dispositivo.";
  } catch { $("voz-estado").textContent = "No se pudo cargar el audio guardado."; }
}
$("voz-archivo").addEventListener("change", async (event) => {
  const archivo = event.target.files[0]; if (!archivo) return;
  try { await guardarMedio(claveVoz, archivo); await mostrarAudioGuardado(); }
  catch { $("voz-estado").textContent = "No se pudo guardar el audio. Comprueba el espacio disponible del dispositivo."; }
  event.target.value = "";
});
$("voz-grabar").onclick = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { $("voz-estado").textContent = "Este navegador no permite grabar audio. Puedes elegir un archivo."; return; }
  try {
    flujoVoz = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
    grabador = new MediaRecorder(flujoVoz, mimeType ? { mimeType } : undefined); trozosVoz = [];
    grabador.ondataavailable = (event) => { if (event.data.size) trozosVoz.push(event.data); };
    grabador.onstop = async () => {
      const blob = new Blob(trozosVoz, { type: grabador.mimeType || "audio/webm" });
      flujoVoz.getTracks().forEach((track) => track.stop()); flujoVoz = null; grabador = null;
      $("voz-grabar").hidden = false; $("voz-detener").hidden = true;
      try { await guardarMedio(claveVoz, blob); await mostrarAudioGuardado(); }
      catch { $("voz-estado").textContent = "No se pudo guardar la grabación en este dispositivo."; }
    };
    grabador.start(); $("voz-grabar").hidden = true; $("voz-detener").hidden = false; $("voz-estado").textContent = "Grabando. Pulsa detener cuando termines.";
  } catch { $("voz-estado").textContent = "No se pudo acceder al micrófono. Revisa el permiso o elige un archivo."; }
};
$("voz-detener").onclick = () => { if (grabador?.state === "recording") grabador.stop(); };
$("voz-borrar").onclick = async () => { await borrarMedio(claveVoz); await mostrarAudioGuardado(); };
$("voz-descargar").onclick = async () => {
  const blob = await leerMedio(claveVoz); if (!blob) return;
  const extension = blob.type.includes("wav") ? "wav" : blob.type.includes("mp4") ? "m4a" : "webm";
  const url = URL.createObjectURL(blob), link = el("a"); link.href = url; link.download = `mensaje-para-${C.nombre.split(" ")[0].toLowerCase()}.${extension}`;
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
};
window.addEventListener("pagehide", () => flujoVoz?.getTracks().forEach((track) => track.stop()));

// ---------- Ventana de detalle (fotos, vídeo, carta) ----------
const modal = $("modal"), mc = $("modal-c");
function abrir(i, tipo) { mc.innerHTML = "";
  const x = el("button", "cerrar", "✕"); x.setAttribute("aria-label", "Cerrar"); x.onclick = () => modal.close(); mc.append(x);
  const carta = tipo === "carta";
  if (!carta) { const m = el("div", "media");
    if (i.video) { const v = document.createElement("video"); v.controls = true; v.preload = "none"; v.playsInline = true; v.src = i.video; v.poster = img(i);
      const msg = el("p", "suave"); msg.setAttribute("role", "status"); v.onerror = () => { msg.textContent = "No encontré el vídeo. Pon tu archivo en " + i.video; }; m.append(v, msg); }
    else { const im = new Image(); im.id = "m-img"; im.src = img(i); im.alt = i.titulo; m.append(im); }
    mc.append(m); }
  const b = el("div", carta ? "papel" : "info"); b.append(el("h2", "", i.titulo));
  if (i.fecha) b.append(el("p", "meta", i.fecha + (i.lugar ? " · " + i.lugar : "")));
  [].concat(i.texto || []).forEach((t) => b.append(el("p", "", t)));
  if (carta) b.append(el("p", "firma", "Con amor,\n" + C.firma));
  if (i.fotos && i.fotos.length > 1 && !i.video) { const g = el("div", "miniaturas");
    i.fotos.forEach((f) => { const t = el("button"); t.setAttribute("aria-label", "Ver foto"); const im = new Image(); im.src = f.src; im.alt = f.alt || ""; t.append(im);
      t.onclick = () => { const m = $("m-img"); if (m) { m.src = f.src; m.alt = f.alt || ""; } }; g.append(t); }); b.append(g); }
  mc.append(b); modal.showModal(); x.focus(); if (i === C.mensaje) lluvia(); }
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => mc.querySelectorAll("video").forEach((v) => v.pause()));

// ---------- Diario ----------
const KEY = "mn19-diario", msg = (t) => $("d-msg").textContent = t;
try { $("diario-ta").value = localStorage.getItem(KEY) || ""; } catch { msg("Tu navegador no permite guardar localmente."); }
$("d-guardar").onclick = () => { try { localStorage.setItem(KEY, $("diario-ta").value); msg("✓ Guardado en este dispositivo."); } catch { msg("No se pudo guardar (almacenamiento bloqueado o lleno)."); } };
$("d-txt").onclick = () => { const a = el("a"), u = URL.createObjectURL(new Blob([$("diario-ta").value], { type: "text/plain;charset=utf-8" })); a.href = u; a.download = "mis-reflexiones.txt"; a.click(); URL.revokeObjectURL(u); msg("Archivo TXT generado."); };
$("d-borrar").onclick = () => { if (!confirm("¿Borrar todas tus reflexiones? No se puede deshacer.")) return; try { localStorage.removeItem(KEY); } catch {} $("diario-ta").value = ""; msg("Reflexiones borradas."); };

// ---------- Audio (solo tras un clic) ----------
const au = $("audio"), pistasMusica = config.musicas;
let pistaActual = 0;
au.src = pistasMusica[pistaActual].src; au.volume = .5;
au.addEventListener("ended", async () => {
  if (pistaActual < pistasMusica.length - 1) {
    pistaActual++; au.src = pistasMusica[pistaActual].src; au.loop = true;
    try { await au.play(); $("a-btn").setAttribute("aria-pressed", "true"); $("a-estado").textContent = `▶ ${pistasMusica[pistaActual].titulo}`; }
    catch { $("a-btn").setAttribute("aria-pressed", "false"); $("a-estado").textContent = `No se pudo reproducir ${pistasMusica[pistaActual].titulo}.`; }
  }
});
$("a-btn").onclick = async () => {
  try {
    if (au.paused) { await au.play(); $("a-btn").setAttribute("aria-pressed", "true"); $("a-estado").textContent = `▶ ${pistasMusica[pistaActual].titulo}`; }
    else { au.pause(); $("a-btn").setAttribute("aria-pressed", "false"); $("a-estado").textContent = `❚❚ ${pistasMusica[pistaActual].titulo}`; }
  } catch { $("a-estado").textContent = `No se pudo reproducir ${pistasMusica[pistaActual].titulo}.`; }
};
$("a-vol").oninput = (e) => au.volume = e.target.value;
au.onerror = () => { $("a-btn").setAttribute("aria-pressed", "false"); $("a-estado").textContent = `No se pudo cargar ${pistasMusica[pistaActual].titulo}.`; };

// ---------- Tarjeta (epílogo) ----------
$("tarjeta").onclick = () => { const c = document.createElement("canvas"); c.width = 1080; c.height = 1350; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 1350); g.addColorStop(0, "#4a0f24"); g.addColorStop(1, "#12030a"); x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
  x.textAlign = "center"; x.fillStyle = "#e8365d"; x.font = "bold 120px Impact,sans-serif"; x.fillText(C.marca, 540, 520);
  x.fillStyle = "#fff4e0"; x.font = "56px Georgia"; x.fillText(C.nombre + " · " + C.edad + " años", 540, 660); x.font = "38px Georgia"; x.fillText("Feliz cumpleaños mi vida", 540, 770);
  c.toBlob((b) => { const a = el("a"); a.href = URL.createObjectURL(b); a.download = "recuerdo.png"; a.click(); URL.revokeObjectURL(a.href); }); };
