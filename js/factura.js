class facturaProducto {
    nombre;
    precio;
    cantidad;
    subtotal;

    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = this.precio * this.cantidad;
    }
}