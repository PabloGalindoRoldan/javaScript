let item1 = "Crema";
let precio1 = 1500;
let cantidad1 = 0;

let item2 = "Shampoo";
let precio2 = 1000;
let cantidad2 = 0;

let item3 = "Exfoliador";
let precio3 = 2000;
let cantidad3 = 0;

let item4 = "Crema Nocturna";
let precio4 = 1500;
let cantidad4 = 0;

carrito()

function carrito(){
    let bandera = true;
    let introduccion;   
    while(bandera){
        introduccion = prompt(`Bienvenido a nuestra tienda de cremas online. ¿Desea agregar un item al carrito? (responder si/no)`);
        if (introduccion.toLowerCase() == "si"){
                bandera = false;
                // mostrarItems();
                compras();
            } else if(introduccion.toLowerCase() == "no" || introduccion.toLowerCase() == "esc" || introduccion.toLowerCase() == "salir"){
                bandera = false;
                return alert(`Gracias por visitar nuestro sitio`);
            } else {
                alert(`Respuesta inadecuada, por favor intente de nuevo`);
            };
        };
    }
    

// function mostrarItems() {
//     alert (`Los items disponibles en la dienda son:\n
//     Item 1: ${item1} - $ ${precio1}\n
//     Item 2: ${item2} - $ ${precio2}\n
//     Item 3: ${item3} - $ ${precio3}\n
//     Item 4: ${item4} - $ ${precio4}\n`)
// };


function compras() {
    let preguntaCompras = parseInt(prompt(`¿Que item desea agregar al carrito? (ingresar nº de item)\n
    Item 1: ${item1} - $ ${precio1}\n
    Item 2: ${item2} - $ ${precio2}\n
    Item 3: ${item3} - $ ${precio3}\n
    Item 4: ${item4} - $ ${precio4}\n`)); 
    switch(preguntaCompras){
        case 1:
        cantidad1++;
        break;
        case 2:
        cantidad2++;
        break;
        case 3:
        cantidad3++;
        break;
        case 4:
        cantidad4++;
        break;
        default: alert(`Respuesta invalida`);
    };
    repregunta();
}

function repregunta() {
    let formulacion = prompt(`¿Desea agregar algun otro item al carrito? (responder si/no)`);
    if (formulacion.toLowerCase() == "si"){
        compras();
    } else {
        alert(`Gracias por comprar con nosotros. Usted selecciono:\n
        ${item1} = ${cantidad1} ;\n
        ${item2} = ${cantidad2} ;\n
        ${item3} = ${cantidad3} ;\n
        ${item4} = ${cantidad4} ;\n
        el precio total es: $` + ((cantidad1 * precio1) + (cantidad2 * precio2) + (cantidad3 * precio3) + (cantidad4 * precio4)));
    }

}


