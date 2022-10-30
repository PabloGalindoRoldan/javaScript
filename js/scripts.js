class Producto {
    constructor(id, nombre, tipo, variedad, precio){
        this.id = id,
        this.nombre = nombre,
        this.tipo = tipo,
        this.variedad = variedad,
        this.precio = precio
        this.cantidad = 0
    }
}

const producto1 = new Producto(1, "Vital Power", "Serum Facial", "30ml", 2970)
const producto2 = new Producto(2, "Deep Luminous", "Serum Facial", "30ml", 2970)
const producto3 = new Producto(3, "Glow Boost", "Serum Facial", "30ml", 2080)
const producto4 = new Producto(4, "Acido Hyaluronico", "Serum Facial", "30ml", 2080)
const producto5 = new Producto(5, "Plant Power", "Acondicionador", "400ml", 2700)
const producto6 = new Producto(6, "Nutri Boost", "Shampoo", "400ml", 2700)
const producto7 = new Producto(7, "Nutri Boost", "Acondicionador", "400ml", 2700)
const producto8 = new Producto(8, "Plant Power", "Shampoo", "400ml", 2700)
const producto9 = new Producto(9, "Refrescante Diario", "Toner Facial", "120ml", 2970)
const producto10 = new Producto(10, "Balance Ph", "Toner Facial", "120ml", 2970)
const producto11 = new Producto(11, "Antioxidante Nocturno", "Crema Facial", "100ml", 1700)
const producto12 = new Producto(12, "Ultra Vital Diurna", "Crema Facial", "100ml", 1700)
const producto13 = new Producto(13, "Limpieza Profunda", "Exfoliante", "500ml", 3000)
const producto14 = new Producto(14, "Ultra Reafirmante - Coffe Berry", "Crema Corporal", "500ml", 1500)
const producto15 = new Producto(15, "Ultra Reafirmante - Ginko Biloba", "Crema Corporal", "500ml", 1500)
const producto16 = new Producto(16, "Ultra Reafirmante - Coco", "Crema Corporal", "500ml", 1500)
const producto17 = new Producto(17, "Ultra Reafirmante - Neroli", "Crema Corporal", "500ml", 1500)
const producto18 = new Producto(18, "Ultra Reafirmante - Coffe Berry", "Crema Corporal", "200ml", 1100)
const producto19 = new Producto(19, "Ultra Reafirmante - Ginko Biloba", "Crema Corporal", "200ml", 1100)
const producto20 = new Producto(20, "Ultra Reafirmante - Coco", "Crema Corporal", "200ml", 1100)
const producto21 = new Producto(21, "Ultra Reafirmante - Neroli", "Crema Corporal", "200ml", 1100)
const producto22 = new Producto(22, "Protector Solar 50FPS", "Crema Corporal", "250ml", 3500)
const producto23 = new Producto(23, "Protector Solar 30FPS", "Crema Corporal", "250ml", 3500)


const eshop = []
eshop.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21, producto22, producto23)

//Funcion Menu

function menu(){
    let opciones = parseInt(prompt(`Bienvenidos a nuestra tienda online. Ingrese el numero de opcion que desea seleccionar:
    1.- Mostrar Catalogo
    2.- Buscar un producto
    3.- Ingresar un nuevo producto al catálogo
    4.- Remover un producto del catálogo
    5.- Ordenar productos
    6.- Agregar producto al carrito
    7.- Finalizar compra
    0.- Salir
    `))

    if (isNaN(opciones)){
        alert("Solo puede ingresar numeros")
        menu()
    } else {
        ejecMenu(opciones)
    }
}

let salir

function ejecMenu(opcionSeleccionada){
    switch(opcionSeleccionada){
        case 0:
            salir = true
            alert(`Gracias por visitar nuestro sitio. Hasta Pronto!`)
        break
        case 1:
            mostrarCatalogo(eshop)
        break
        case 2:
            buscarProducto(eshop)
        break
        case 3:
            nuevoProducto(eshop)
        break
        case 4:
            removerProducto(eshop)
        break
        case 5:
            ordenar(eshop)
        break
        case 6:
            compras(eshop)
        break
        case 7:
            finalizarCompra(eshop)
        break
        default: alert("Respuesta invalida, intente nuevamente")
        break
    }
    if (salir != true){
        menu()
    }
}

//1.- Funcion Mostrar Catalogo:

function mostrarCatalogo(array){
    
    let resultado = ""

    for (let i = 0; i < array.length; i++){
        resultado = resultado + `Producto Nº ${array[i].id}, Nombre: ${array[i].nombre}, Tipo: ${array[i].tipo}, Variedad: ${array[i].variedad}, Precio:  $${array[i].precio}\n\n`
    }

    alert(resultado) // NOTA PARA EL TUTOR CORRECTOR: El browser va a limitar la cantidad de texto que se puede mostrar en un alert lamentablemente, por lo que no se va a ver el menu completo, y hacer al usuario circular por mas de 23 productos no esta bueno, asi que tambien hice un console.log para que se pueda observar como funciona el codigo.
    console.log(resultado);
}

//2.- Funcion Buscar Producto:

function buscarProducto(array){
    let busqueda = prompt("Ingrese el producto que desea buscar")
    let resultadoBusqueda = array.find(
        (elemento) => elemento.nombre.toLowerCase() == busqueda.toLowerCase()
    )

    if(resultadoBusqueda == undefined){
        resultadoBusqueda = array.find(
            (elemento) => elemento.tipo.toLowerCase() == busqueda.toLowerCase()
        )
    } 
    
    if(resultadoBusqueda == undefined){
        resultadoBusqueda = array.find(
            (elemento) => elemento.variedad.toLowerCase() == busqueda.toLowerCase()
        )
    } 
    
    if (resultadoBusqueda == undefined){
        resultadoBusqueda = array.find(
            (elemento) => elemento.precio == parseInt(busqueda)
        )
    } 
    
    if (resultadoBusqueda == undefined) {
        alert("No se encontro resultado que coincida con la busqueda")
    } else {
        alert(`Resultado de la busqueda:
        Nombre: ${resultadoBusqueda.nombre}
        Tipo: ${resultadoBusqueda.tipo}
        Variedad: ${resultadoBusqueda.variedad}
        Precio: $${resultadoBusqueda.precio}.`)
    }
}

//3.- Funcion Agregar productos:

function nuevoProducto(parametro){

    let ingreseNombre = prompt("Ingrese el nombre del producto a incorporar al catálogo")
    let ingreseTipo = prompt("Ingrese el tipo de producto a ingresar (p. ej. Crema Corporal)")
    let ingreseVariedad = prompt("Ingrese la varidad del producto a ingresar (p. ej. 500ml, 250ml, etc.)")
    let ingresePrecio = ""
    precio()
        function precio(){
            ingresePrecio = parseInt(prompt("Ingrese el precio del producto"))
            if (isNaN(ingresePrecio)){
            alert("El precio solo puede ser expresado en numeros")
            precio()
        } else {
            return ingresePrecio
        }
        }
    parametro.sort((a, b) => a.id - b.id)
    let newarray = parametro.slice()
    let newId = newarray.pop().id + 1
    let productoCreado = new Producto(newId, ingreseNombre, ingreseTipo, ingreseVariedad, ingresePrecio)
    parametro.push(productoCreado)
}

//4.-Funcion Remover un producto del catalogo

function removerProducto(array){
    let catalogoReducido = ""
    for (let elem of array){
        catalogoReducido += `Producto Nº ${elem.id}, Nombre: ${elem.nombre}\n`
    }
    let pregunta = parseInt(prompt(`Ingrese el Nº de ID del producto a remover:\n${catalogoReducido}`))
    let ids = array.map(elem => elem.id)
    let indice = ids.indexOf(pregunta)
    array.splice(indice, 1)
}   

//5.- Funcion Ordenar productos

function ordenar(array){
    let opciones = parseInt(prompt(`
    1.- Ordenar por precio de menor a mayor.
    2.- Ordenar por precio de mayor a menor.
    3.- Ordenar alfabeticamente por nombre.
    4.- Ordenar alfabeticamente por tipo.
    5.- Ordenar por Id (default).
    `))
    switch (opciones) {
        case 1:
            ordenarMenorMayor(array)
        break
        case 2:
            ordenarMayorMenor(array)
        break
        case 3:
            ordenarNombre(array)
        break
        case 4:
            ordenarTipo(array)
        break
        case 5:
            ordenarId(array)
        default:
        break
    }
}

function ordenarMenorMayor(array){
    array.sort((a, b) => (a.precio - b.precio))
    mostrarCatalogo(array)
}

function ordenarMayorMenor(array){
    array.sort((a, b) => (b.precio - a.precio))
    mostrarCatalogo(array)
}

function ordenarId(array){
    array.sort((a, b) => (a.id - b.id))
    mostrarCatalogo(array)
}

function ordenarNombre(array){
    array.sort((a, b) => {
        if (a.nombre == b.nombre) {
            return 0;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        return 1;
    })
}

function ordenarTipo(array){
    array.sort((a, b) => {
        if (a.tipo == b.tipo) {
            return 0;
        }
        if (a.tipo < b.tipo) {
            return -1;
        }
        return 1;
    })
}

//Function carrito

function compras(array){
    let catalogoReducido = ""
    for (let elem of array){
        catalogoReducido += `Nº ${elem.id}, Nombre: ${elem.nombre}, Precio: $${elem.precio}\n`
    }
    let pregunta = parseInt(prompt(`¿Qué item desea agregar al carrito?:\n${catalogoReducido}`))

    if(array[pregunta-1]){
    array[pregunta-1].cantidad++
    alert("Agregado al carrito")
    } else {alert("numero invalido")}
    
}

//Funcion finalizar compra

function finalizarCompra(array){
    let mensaje = ""
    let total = 0
    for (elem of array){
        if (elem.cantidad != 0){
            mensaje += `Nombre: ${elem.nombre}
            Tipo: ${elem.tipo}
            Variedad: ${elem.variedad}
            Precio: ${elem.precio}
            Cantidad: ${elem.cantidad}\n`
            total += (elem.precio * elem.cantidad)
        }
    }
    alert(`Su compra es:\n
${mensaje}
Y el precio total es: $${total}\n
Muchas gracias y que tenga un buen dia!`)
    salir = true
}

//LLamo la funcion menu

menu()

