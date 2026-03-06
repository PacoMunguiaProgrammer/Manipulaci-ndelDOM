// 1) Selección de elementos (herramientas DOM)
const titulo = document.querySelector("#titulo");
const nota = document.querySelector("#nota");
const texto = document.querySelector(".nota__texto");
const idInterno = document.querySelector("#idInterno");
const imgNota = document.querySelector("#imgNota");

const btnCambiarTitulo = document.querySelector("#btnCambiarTitulo");
const btnToggleDestacado = document.querySelector("#btnToggleDestacado");
const btnCambiarImagen = document.querySelector("#btnCambiarImagen");

// 2) Leer contenido y atributos
idInterno.textContent = nota.dataset.id; // lee data-id
console.log("Título actual:", titulo.textContent);
console.log("Clase actual nota:", nota.className);

// 3) Actualizar contenido
btnCambiarTitulo.addEventListener("click", () => {
  titulo.textContent = "Panel de Noticias (Actualizado)";
});

// 4) Actualizar características (clases/atributos/estilos)
btnToggleDestacado.addEventListener("click", () => {
  nota.classList.toggle("destacada");
});

// 5) Cambiar atributo src (ejemplo real)
btnCambiarImagen.addEventListener("click", () => {
  const nueva =
    "https://upload.wikimedia.org/wikipedia/commons/4/43/The_Earth_seen_from_Apollo_17_with_transparent_background.png";

  imgNota.setAttribute("src", nueva);
  texto.textContent = "La imagen y el texto fueron actualizados desde el DOM.";
});
const formAdd = document.querySelector("#formAdd");
const inpTitulo = document.querySelector("#inpTitulo");
const inpTag = document.querySelector("#inpTag");
const lista = document.querySelector("#lista");

// Crear elemento de lista (agregar nodos)
function crearItem(titulo, tag) {
  const li = document.createElement("li");
  li.className = "item";

  li.innerHTML = `
    <div>
      <strong class="item__title"></strong>
      <div class="item__meta">
        <span class="pill"></span>
        <span class="muted"></span>
      </div>
    </div>
    <div class="actions">
      <button type="button" data-action="toggle">Destacar</button>
      <button type="button" data-action="delete">Eliminar</button>
    </div>
  `;

  li.querySelector(".item__title").textContent = titulo;
  li.querySelector(".pill").textContent = tag;
  li.querySelector(".muted").textContent = `Creado: ${new Date().toLocaleString()}`;

  return li;
}

// Evento submit (agregar)
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const tituloVal = inpTitulo.value.trim();
  const tagVal = inpTag.value.trim();

  if (!tituloVal || !tagVal) return;

  const item = crearItem(tituloVal, tagVal);
  lista.prepend(item); // agrega al inicio

  formAdd.reset();
  inpTitulo.focus();
});

// Delegación de eventos (eliminar y toggle sin agregar listeners por item)
lista.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const li = e.target.closest(".item");
  if (!li) return;

  const action = btn.dataset.action;

  if (action === "delete") {
    li.remove(); // eliminar nodo
  }

  if (action === "toggle") {
    li.classList.toggle("destacada");
  }
});
const inpBuscar = document.querySelector("#inpBuscar");

inpBuscar.addEventListener("input", () => {
  const q = inpBuscar.value.trim().toLowerCase();

  // recorrer todos los items y mostrar/ocultar según coincida
  document.querySelectorAll("#lista .item").forEach((item) => {
    const titulo = item.querySelector(".item__title")?.textContent.toLowerCase() || "";
    const tag = item.querySelector(".pill")?.textContent.toLowerCase() || "";

    const coincide = titulo.includes(q) || tag.includes(q);

    // solo DOM: ocultar/mostrar
    item.style.display = coincide ? "" : "none";
  });
});