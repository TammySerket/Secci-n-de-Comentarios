//rescata elemento contenedor 
const listaMensajes = document.getElementById("name") + document.getElementById("commentTxt");

// Ejecución eventos
function eventListeners(){
  //Post
  //cuando se envia el formulario
  document.getElementById("submitBtn").addEventListener("click", agregarPublicacion);
  //Borrar post
  document.addEventListener("click", borrarPublicacion);
  // Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo); 

}
eventListeners();

// Generar elementos del DOM
function generarDom(post){
  //Crear elementos post
const itemPost = document.createElement("div");
const parrafo = document.createElement("p");
const textPost = document.createTextNode(post);
const botonBorrar = document.createElement("button");
const textBoton = document.createTextNode("X");
const heart = document.createElement("button"); 


// Añadir atributos a elementos del Post
itemPost.setAttribute("class", "col-12")
parrafo.setAttribute("class", "d-inline-block")
botonBorrar.setAttribute("class", "btn btn-dark"); 
heart.classList.add("class", "fas", "fa-hand-holding-heart");  

// añade texto al botón del post
botonBorrar.appendChild(textBoton);
// añade el mensaje al parrafo
parrafo.appendChild(textPost);
// añade mensaje a la lista
itemPost.appendChild(parrafo);
// añade el botón de borrar al mensaje
itemPost.appendChild(botonBorrar);
// añade item con mensaje y botón a contendor padre
listaMensajes.appendChild(itemPost); 

}

// añadir post al documento
function agregarPublicacion(){
  if((document.getElementById("commentTxt").value === "" || document.getElementById("name").value === "")) {
      alert("no puedes dejar campos vacíos");
    } else{
      // leer el valor de textarea
  const post = document.getElementById("commentTxt").value;
  const name = document.getElementById('name').value;
  const posts = name + post;
  // crear elementos en el DOM
  generarDom(posts);
  // añadir a Local Storage
  agregarPostsLocalStorage(posts);
    } 
} 

//eliminar post del DOM
function borrarPublicacion(e) {
  if(e.target.className === "btn btn-dark"){
      e.target.parentElement.remove();
      borrarPostsLocalStorage(e.target.parentElement.innerText);
  }
} 

// mostrar datos de LocalStorage en la pagina
function localStorageListo(){
  let posts;
  posts = obtenerPostLocalStorage();
  posts.forEach(function(post){
      generarDom(post);
  });
} 

// agrega mensaje a local storage
function agregarPostsLocalStorage(textoMsj){
  let posts = obtenerPostLocalStorage();
  // añadir mensaje al arreglo
  posts.push(textoMsj);
  // convierte arreglo a string para añadir a local storage
  localStorage.setItem("post",JSON.stringify(posts));
} 

// comprobar elementos en local storage y retorne arreglo
function obtenerPostLocalStorage() {
  let posts;
  // revisamos valores de local storage
  if(localStorage.getItem("post") === null) {
      posts = [];
  }else{
      posts = JSON.parse(localStorage.getItem("post"));
  }    
  return posts;
}

// eliminar mensajes de local storage
function borrarPostsLocalStorage(post) {
  //elimina la X del mensaje
  //la funcion recibe todo el texto del mensaje más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
  let borrarPost = post.substring(0, post.length - 1);
  let posts = obtenerPostLocalStorage();
  //en el forEach, compara el mensaje recibido con lo existente en local storage y quita la tarea a eliminar
  posts.forEach(function(textoArr, index){
      if(borrarPost === textoArr) {
          posts.splice(index, 1);
      }
  });
  //convierte el areglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
 localStorage.setItem("textComment", JSON.stringify(posts)); 
} 