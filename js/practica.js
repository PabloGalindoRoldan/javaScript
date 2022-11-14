//capturas DOM
let divProductos = document.getElementById("productos")
let btnGuardarLibro = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")

//array productos en carrito
// let productosEnCarrito = []
// if(localStorage.getItem("carrito")){
//     productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
// }else{
//     //Entra por primera -- setear el array el original
//     console.log("Seteando el array carrito por primera vez")
//     localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
// }
//Este operador || es equivalente/ o cumple la misma función que el if anterior
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
//Operador nullish sólo cuando es null o undefined me devuelve el segundo operando
// let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) ?? []
console.log(productosEnCarrito)
//FUNCTIONS
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let libro of array){
        let nuevoLibro = document.createElement("div")
        nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        
        nuevoLibro.innerHTML = `<div id="${libro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                                    <div class="card-body">
                                        <h4 class="card-title">${libro.titulo}</h4>
                                        <p>Autor: ${libro.autor}</p>
                                        <p class="${libro.precio <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${libro.precio}</p>
                                    <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevoLibro)
        let btnAgregar = document.getElementById(`agregarBtn${libro.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(libro)
        })
    }
}
//function AGREGAR AL CARRITO
function agregarAlCarrito(libro){
    console.log(libro)
    //Primer paso
    productosEnCarrito.push(libro)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}
//function IMPRIMIR en modal
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
           //vuelvo a calcular el total
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//function calcular total
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
}
//Función para agregar libros: 
function cargarLibro(array){
    //captura y utilización de input para crear nuevo objeto
    let inputAutor = document.getElementById("autorInput")  
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")
    
    let libroCreado = new Libro(array.length+1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "libroNuevo.jpg")
    //Objeto creado lo pusheo al array
    array.push(libroCreado)
    //TAMBIÉN MODIFICAMOS ARRAY DEL STORAGE:
    localStorage.setItem("estanteria", JSON.stringify(array))
    mostrarCatalogo(array)
    console.log(array)
    inputAutor.value = ""
    inputTitulo.value = ""
    inputPrecio.value =""
}

//function buscador que se activa con evento change del input para buscar
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
        // Coincidencias sin includes (libro) => libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    )
    // if(busqueda.length == 0){
    //     coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`
    //     mostrarCatalogo(array)
    // }else{
    //     coincidencia.innerHTML = ""
    //     mostrarCatalogo(busqueda)
    // }
    //con ternario:
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`, mostrarCatalogo(array)) 
    : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}

//SORT -- ATENCIÖN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906
//Functions ordenar stock
function ordenarMayorMenor(array){
   
}
function ordenarMenorMayor(array){
    
}
function ordenarAlfabeticamente(array){
    
}





//EVENTOS PROYECTO
btnGuardarLibro.addEventListener("click", ()=>{cargarLibro(estanteria)})
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, estanteria)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)

    
}) 

//CÓDIGO:
mostrarCatalogo(estanteria)


//CLASE 12 OPTIMIZACIÓN -- OPERADORES AVANZADOS
let numero = 5
if(numero == 5){
    console.log("Es igual a 5")
}else{
    console.log("No es igual a 5")
}

//OPERADOR TERNARIO un IF ... ELSE abreviado
//lleva condición, luego ? para las instrucciones en TRUE y : para instrucciones en FALSE
numero == 5 ? console.log("Es igual a 5 con ternario") : console.log("No es igual a 5 con ternario")

//OPERADOR &&
//ES SÖLO para un if simple
if(productosEnCarrito.length == 0){
    console.log("EL carrito está vacio")
}
//Equivalente con &&
productosEnCarrito.length == 0 && console.log("EL carrito está vacio con operador &&")

//Nullish ??
let tituloBuscado = estanteria.find(libro => libro.titulo == "Aleph123") ?? "No tenemos ese libro en stock"
console.log(tituloBuscado)

//Desestructuración -- llaves del lado izquierdo
//Debo respetar el nombre de los atributos
//desestructurar libro1
let {id, autor, precio, imagen, titulo, editorial} = libro4
console.log(autor)
console.log(precio)
console.log(imagen)
//No existe editorial en el objeto original, me devuelve undefined
console.log(editorial)

//DESESTRUCTURACION CON ALIAS

let {titulo:title, autor: author, precio:price, imagen: img} = libro2
console.log(author)
console.log(price)
console.log(img)
console.log(title)
title = "Aprender JS"
console.log(title)
console.log(libro2)

//Desestructurar array, es por posicion con los []
let [a, , , b, tercero] = estanteria
console.log(a)
console.log(b)
console.log(tercero)

//SPREAD
console.log(estanteria)
console.log(...estanteria)

const numeros = [4, 77, 92, 10, 3, -32, 54, 111, 999, 1234, 902]
console.log(...numeros)
console.log(Math.max(295,111,4,1,43))
console.log(Math.max(numeros))
console.log(Math.max(...numeros))

//info del libro5 expandida
const infoLibro5 = {
    ...libro5,
    editorial: "Planeta",
    //Podemos sobreescribir una propiedad
    precio: 3000,
    cantidadPag: 420
}
console.log(infoLibro5)