// Personaliza estos recuerdos y cambia las portadas por fotos de ustedes.
// Fotos: "assets/images/mi-foto.jpg"   Vídeos: "assets/videos/mi-video.mp4"
const ph = (t, c) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'><defs><linearGradient id='sky' x2='0' y2='1'><stop stop-color='${c}'/><stop offset='.62' stop-color='#392331'/><stop offset='1' stop-color='#17151a'/><\/linearGradient><radialGradient id='sun'><stop stop-color='#ffe0bf' stop-opacity='.92'/><stop offset='1' stop-color='#f49eaa' stop-opacity='.25'/><\/radialGradient></defs><rect width='1200' height='675' fill='url(#sky)'/><circle cx='820' cy='235' r='180' fill='url(#sun)'/><path d='M0 480 Q260 365 500 475 T1000 450 T1400 475 V700 H0Z' fill='#211922' opacity='.48'/><path d='M0 555 Q240 485 480 550 T960 525 T1400 555 V700 H0Z' fill='#151418' opacity='.78'/><g fill='#ffe2c9' opacity='.8'><circle cx='188' cy='140' r='3'/><circle cx='330' cy='220' r='2'/><circle cx='1020' cy='130' r='3'/><circle cx='960' cy='330' r='2'/><circle cx='650' cy='120' r='2'/></g><path d='M160 540 Q210 460 260 540 M190 525 Q210 470 230 525 M960 535 Q1010 450 1060 535 M990 520 Q1010 465 1030 520' fill='none' stroke='#eaa0aa' stroke-width='4' opacity='.55'/></svg>`);

export const content = {
  nombre: "Mishel Nadia",
  edad: 19,
  marca: "MISHEL",                       // la palabra de la animación de apertura
  frase: "Para mi amor…",
  dedicatoria: "Construí este pequeño espacio solo para ti, para recordarte que eres mi persona favorita del mundo.",
  firma: "Con todo mi amor",
  portada: "assets/images/caritasx3.jpeg",
  galeria: [
    { src: "assets/images/fogata1.jpg", video: "assets/videos/esta%20noche%20comenzo%20todo.mp4", alt: "Video de la fogata donde comenzó nuestra historia", titulo: "La noche en que todo comenzó" },
    { src: "assets/images/caritasx2.jpeg", alt: "Una selfie divertida juntos", titulo: "Selfie de sonrisas" },
    { src: "assets/images/caritasx3.jpeg", alt: "Otra selfie divertida juntos", titulo: "Caritas para el recuerdo" },
    { src: "assets/images/fogata1.jpg", alt: "La fogata de la noche en que comenzó nuestra historia", titulo: "Aquí empezó todo" },
    { src: "assets/images/fogata2.jpg", alt: "El fuego de aquella primera noche juntos", titulo: "La fogata de nuestro comienzo" },
    { src: "assets/images/fotoparq.jpeg", alt: "Un paseo juntos por el parque", titulo: "Paseo entre árboles" },
    { src: "assets/images/manos.jpeg", alt: "Nuestras manos juntas", titulo: "Siempre de la mano" },
    { src: "assets/images/mishbethel.jpg", alt: "Mishel durante una visita a Bethel", titulo: "Un día en Bethel" },
    { src: "assets/images/mishbethel2.jpg", alt: "Otro recuerdo de Mishel en Bethel", titulo: "Recuerdos de Bethel" },
    { src: "assets/images/mishcampeonato.jpg", alt: "Mishel en el campeonato", titulo: "Día de campeonato" },
    { src: "assets/images/mishcampeonatox2.jpg", alt: "Otro momento del campeonato", titulo: "Celebrando el campeonato" },
    { src: "assets/images/mishcolumbio.jpg", alt: "Mishel disfrutando del columpio", titulo: "Un ratito en el columpio" },
    { src: "assets/images/parqx4.jpeg", alt: "Un recuerdo juntos en el parque", titulo: "Tarde de paseo" },
    { src: "assets/images/patitas.jpeg", alt: "Nuestros pies juntos durante el paseo", titulo: "Juntos, paso a paso" },
    { src: "assets/images/patosx4.jpeg", alt: "Patos compartiendo el parque con nosotros", titulo: "Visitantes del parque" },
    { src: "assets/images/picnic.jpeg", alt: "Compartiendo un picnic al aire libre", titulo: "Picnic para dos" },
    { src: "assets/images/nuestasombra.jpeg", alt: "Una calle empedrada durante un paseo", titulo: "Una calle tranquila para caminar" },
    { src: "assets/images/miprincesita.jpeg", alt: "La sombra de una pareja sobre la calle", titulo: "Dos sombras, un mismo camino" },
    { src: "assets/images/manosalaire.jpeg", alt: "Nuestras manos tomadas bajo las luces de la noche", titulo: "De la mano bajo las luces" },
    { src: "assets/images/sombra x3.jpeg", alt: "Las sombras de una pareja caminando junta", titulo: "Caminando juntos hasta de sombra" },
    { src: "assets/images/sombas.jpeg", alt: "Nuestras sombras juntas en una calle iluminada", titulo: "Un paseo que dejó su sombra" },
    { src: "assets/images/foto con cuarto adornado.jpeg", alt: "Mishel junto a la decoración de su cumpleaños", titulo: "Tu cuarto listo para celebrar tus 19" },
    { src: "assets/images/foto con cuarto adornado.jpeg", video: "assets/videos/este%20es%20tu%20dia%20.mp4", alt: "Video del cumpleaños de Mishel y su cuarto decorado", titulo: "Así fue tu día especial" },
    { src: "assets/images/caritasx3.jpeg", video: "assets/videos/caritas.mp4", alt: "Video de un recuerdo juntos", titulo: "Un video de nuestras caritas" },
    { src: "assets/images/picnic.jpeg", video: "assets/videos/picnic.mp4", alt: "Video de nuestro picnic", titulo: "Un picnic para recordar" },
    { src: "assets/images/caritasx2.jpeg", video: "assets/videos/carade%20sapitos.mp4", alt: "Video de un momento divertido", titulo: "Caritas de sapitos" },
    { src: "assets/images/mishcolumbio.jpg", video: "assets/videos/multi.mp4", alt: "Video de nuestros recuerdos", titulo: "Un video de varios recuerdos" }
  ], // Fotos y vídeos incluidos en la página.
  audioPersonal: "", // Ruta opcional, por ejemplo: "assets/audio/mensaje-para-mishel.webm"
  mensaje: {                                    // botón "Reproducir"
    kicker: "19 DE OCTUBRE · 19 AÑOS",
    titulo: "Feliz cumpleaños mi vida",
    subtitulo: "Un pequeño recorrido por los recuerdos y momentos bonitos que compartimos.",
    texto: ["Deseo que siempre disfrutes de los momentos de la vida. ¡Feliz cumpleaños, mi amor!"],
    portada: "assets/images/manos.jpeg"
  },
  // LUGARES: cada lugar abre una ventana con fotos y (opcional) vídeo.
  lugares: [
    { titulo: "La noche en que todo comenzó", texto: "Este video guarda la fogata de aquella noche: el inicio de nuestra historia y el primer capítulo de todo lo bonito que compartimos.", portada: "assets/images/fogata1.jpg", video: "assets/videos/esta%20noche%20comenzo%20todo.mp4",
      fotos: [
        { src: "assets/images/fogata1.jpg", alt: "La fogata de la noche en que comenzó nuestra historia" },
        { src: "assets/images/fogata2.jpg", alt: "Las brasas de aquella primera noche juntos" }
      ] },
    { titulo: "Paseos entre árboles, luces y sombras", texto: "Entre parques, calles tranquilas y nuestras sombras caminando juntas, cualquier paseo contigo se vuelve especial.",
      fotos: [
        { src: "assets/images/fotoparq.jpeg", alt: "Un paseo juntos por el parque" },
        { src: "assets/images/parqx4.jpeg", alt: "Una tarde de paseo por el parque" },
        { src: "assets/images/patosx4.jpeg", alt: "Patitos que encontramos durante el paseo" },
        { src: "assets/images/patitas.jpeg", alt: "Nuestros pasos juntos" },
        { src: "assets/images/mishcolumbio.jpg", alt: "Mishel disfrutando del columpio" },
        { src: "assets/images/nuestasombra.jpeg", alt: "La calle empedrada que recorrimos juntos" },
        { src: "assets/images/miprincesita.jpeg", alt: "Nuestras sombras juntas sobre la calle" },
        { src: "assets/images/sombra x3.jpeg", alt: "Las sombras de los dos caminando juntos" },
        { src: "assets/images/sombas.jpeg", alt: "Nuestras sombras acompañándose en el camino" }
      ] },
    { titulo: "Un picnic y muchas risas", texto: "Un picnic y nuestras caritas: esos planes sencillos que siempre me gusta recordar.",
      fotos: [
        { src: "assets/images/picnic.jpeg", alt: "Un picnic juntos" },
        { src: "assets/images/caritasx2.jpeg", alt: "Un recuerdo juntos" },
        { src: "assets/images/caritasx3.jpeg", alt: "Otra de nuestras caritas" }
      ] },
    { titulo: "Un cumpleaños lleno de sorpresas", texto: "Hoy tu cuarto se llenó de adornos, regalos y mucho cariño para celebrar tus 19. Este recuerdo es de tu día especial.",
      fotos: [{ src: "assets/images/foto con cuarto adornado.jpeg", alt: "Mishel junto a los adornos de su cumpleaños" }] },
    { titulo: "Momentos tuyos que me encanta celebrar", texto: "Bethel, el campeonato y todos esos momentos que me encanta verte disfrutar.",
      fotos: [
        { src: "assets/images/manos.jpeg", alt: "Nuestras manos juntas" },
        { src: "assets/images/manosalaire.jpeg", alt: "Tomados de la mano bajo las luces de la noche" },
        { src: "assets/images/mishbethel.jpg", alt: "Mishel en Bethel" },
        { src: "assets/images/mishbethel2.jpg", alt: "Otro recuerdo de Bethel" },
        { src: "assets/images/mishcampeonato.jpg", alt: "Mishel en el campeonato" },
        { src: "assets/images/mishcampeonatox2.jpg", alt: "Más recuerdos del campeonato" }
      ] }
  ],
  // CARTAS (capítulos): texto = lista de párrafos.
  cartas: [
    { titulo: "Lo que admiro de ti", portada: "assets/images/mishbethel.jpg", texto: ["Admiro tu forma de ser, esa luz que llevas contigo y cómo haces más bonitos los días de quienes te rodean.", "Ojalá nunca olvides lo increíble que eres. Yo tengo la suerte de recordarlo cada día."] },
    { titulo: "Un deseo para tu cumpleaños", portada: "assets/images/picnic.jpeg", texto: ["Deseo que siempre disfrutes de los momentos de la vida. ¡Feliz cumpleaños, mi amor!"] }
  ],
  razones: [
    "Porque tu sonrisa puede mejorar hasta el día más largo.",
    "Porque contigo, lo sencillo se vuelve un recuerdo bonito.",
    "Porque me encanta la forma en que ves el mundo.",
    "Porque siempre encuentro algo nuevo que admirar en ti.",
    "Porque a tu lado puedo ser yo, sin miedo.",
    "Porque haces que cualquier lugar se sienta un poquito más como hogar.",
    "Porque tus abrazos tienen algo que siempre me calma.",
    "Porque me gusta escucharte hablar de lo que te hace feliz.",
    "Porque incluso los días tranquilos se sienten especiales contigo.",
    "Porque tienes una manera única de hacerme sonreír.",
    "Porque me inspiras a cuidar mejor de las personas que amo.",
    "Porque tu forma de querer hace bien.",
    "Porque puedo compartir contigo mis planes y también mis silencios.",
    "Porque me gusta celebrar tus logros como si fueran míos.",
    "Porque los momentos contigo me llenan de alegría.",
    "Porque cada conversación contigo puede convertirse en mi parte favorita del día.",
    "Porque eres mucho más increíble de lo que a veces alcanzas a ver.",
    "Porque valoro cada momento que compartimos.",
    "Porque eres tú, y eso ya es una razón inmensa para quererte."
  ],
  abreCuando: [
    { titulo: "Cuando me extrañes", portada: "assets/images/manos.jpeg", texto: ["Cierra los ojos un segundo y recuerda los momentos bonitos que compartimos.", "Te quiero mucho y guardo con cariño cada recuerdo nuestro."] },
    { titulo: "Cuando tengas un día difícil", portada: "assets/images/fogata2.jpg", texto: ["No tienes que resolver todo hoy. Respira, ve de a poquito y recuerda que no tienes que poder con todo para ser increíble.", "Trátate con paciencia y cariño; mereces darte el mismo cuidado que ofreces a quienes quieres."] },
    { titulo: "Cuando olvides lo especial que eres", portada: "assets/images/caritasx2.jpeg", texto: ["Eres valiosa por quien eres, no por lo que haces por los demás. Tu manera de estar en el mundo deja algo bonito en quienes tenemos la suerte de conocerte.", "Yo veo todo eso en ti, incluso en los días en que a ti te cuesta verlo."] },
    { titulo: "Cuando quieras recordar lo bonito", portada: "assets/images/parqx4.jpeg", texto: ["Recuerda nuestras conversaciones, las risas inesperadas y esos paseos sencillos que se quedaron en el corazón.", "Me alegra atesorar todos esos momentos compartidos contigo."] }
  ],
  mensajeSecreto: {
    titulo: "Un secreto para ti",
    texto: ["Entre todas las cosas bonitas de mi vida, tú tienes un lugar muy especial.", "Aprecio profundamente esta historia que compartimos y todo lo bonito que me haces sentir."]
  },
  historiaDecisiones: {
    inicio: { titulo: "Una tarde para compartir", texto: "Tenemos una tarde tranquila. ¿Cómo la disfrutamos?", opciones: [{ texto: "Salimos a pasear", siguiente: "paseo" }, { texto: "Nos quedamos juntos", siguiente: "casa" }] },
    paseo: { titulo: "El paseo", texto: "El aire está fresco y tenemos todo el tiempo del mundo. ¿Qué hacemos?", opciones: [{ texto: "Buscamos el atardecer", siguiente: "final-atardecer" }, { texto: "Paramos por algo rico", siguiente: "final-cafecito" }] },
    casa: { titulo: "Una tarde tranquila", texto: "No hay apuro ni planes pendientes. ¿Qué elegimos?", opciones: [{ texto: "Cocinamos algo juntos", siguiente: "final-cocina" }, { texto: "Ponemos una película", siguiente: "final-pelicula" }] },
    "final-atardecer": { titulo: "Un atardecer bonito", texto: "El cielo se pinta de colores y este atardecer se vuelve un recuerdo especial.", final: true },
    "final-cafecito": { titulo: "Una charla sin apuro", texto: "Nos quedamos conversando más de la cuenta. Lo más bonito fue compartir ese momento contigo.", final: true },
    "final-cocina": { titulo: "Una receta entre risas", texto: "La receta sale a nuestra manera y nos reímos juntos mientras cocinamos.", final: true },
    "final-pelicula": { titulo: "Una película y tu sonrisa", texto: "La película acompaña, pero lo que más disfruto es verte sonreír.", final: true }
  },
  agradecimiento: [
    "Gracias por cada sonrisa que me regalas, incluso sin darte cuenta.",
    "Gracias por escucharme, por compartir tus días conmigo y por dejarme conocer tu mundo.",
    "Gracias por ser exactamente quien eres. Mi vida es más bonita desde que estás en ella.",
    "Y gracias por llegar hasta aquí. Este regalo es pequeño comparado con todo lo que significas para mí."
  ],
  // LÍNEA DEL TIEMPO: en orden cronológico. foto/vídeo opcionales.
  linea: [
    { titulo: "La noche en que todo comenzó", texto: "Este es el video de la fogata donde empezó nuestra historia. Guardo con cariño ese primer recuerdo juntos.", portada: "assets/images/fogata1.jpg", video: "assets/videos/esta%20noche%20comenzo%20todo.mp4" },
    { titulo: "Los momentos que compartimos", texto: "Paseos, risas, nuestras manos juntas y aventuras sencillas que forman parte de esta historia.", portada: "assets/images/manos.jpeg" },
    { fecha: "19 oct 2026", titulo: "Hoy celebramos tus 19", texto: "Hoy tu cuarto se llenó de adornos y regalos para celebrar tu cumpleaños. Feliz cumpleaños, Mishel.", portada: "assets/images/foto con cuarto adornado.jpeg" }
  ],
  epilogo: "Esta historia guarda algunos de mis recuerdos favoritos. Gracias por compartirlos conmigo."
};
