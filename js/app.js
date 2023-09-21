const productos = [
    { nombre: "Ajedrez", precio: 15000, marca: "Ruibal" },
    { nombre: "Monopoly", precio: 25000, marca: "Hasbro" },
    { nombre: "Domino", precio: 1000, marca: "Ruibal" },
    { nombre: "Naipes Españoles", precio: 650, marca: "Casino" },
    { nombre: "Uno", precio: 1000, marca: "Ruibal" },
    { nombre: "Jenga de madera", precio: 3500, marca: "Ruibal" },
    { nombre: "Damas Chinas", precio: 15000, marca: "Ruibal" }
]

const factura = [];

let nombreCliente = prompt("Por favor, escriba su nombre");
alert("Hola " + nombreCliente + " Bienvenido a Sigamos Jugando Distribuidora");

let opcion;
let salir;
let total
let cantidad;


function menu() {
    do {
        const listaStringProductos = productos.map((product, index) =>
            `${index + 1} - ${product.nombre} $${product.precio}`);
        opcion = parseInt(prompt('Por favor escoja un producto (ingrese el numero):' + '\n' + listaStringProductos.join('\n')));

        while (opcion <= 0 || opcion > productos.length || isNaN(opcion) || opcion == undefined) {
            opcion = parseInt(prompt('Por favor escoja un producto (ingrese el numero):' + '\n' + listaStringProductos.join('\n')));
        }

        cantidad = parseInt(prompt('Ingrese la cantidad deseada:'));

        factura.push(new facturaProducto(productos[opcion - 1].nombre, productos[opcion - 1].precio, cantidad));

        salir = prompt('Desea salir? si/no');

    } while (salir != 'si');
}


menu();


total = factura.reduce((acc, item) => acc + item.subtotal, 0);

alert(`El total a pagar de su compra es de: $${total}`);