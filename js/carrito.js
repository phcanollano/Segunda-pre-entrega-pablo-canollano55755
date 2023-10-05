
let productos = [];
let carrito = [];

/*
productos.push(new Producto('Ajedrez Ruibal',15000));
productos.push(new Producto('Monopoly',25000));
productos.push(new Producto('Domino Ruibal', 2000));
productos.push(new Producto('Naipes Españoles Casino',650));
productos.push(new Producto('Uno',1000));
productos.push(new Producto('Jenga de madera',3500));
productos.push(new Producto('Damas Chinas',15000));

localStorage.setItem('productos', JSON.stringify(productos));
*/

const nombre = document.getElementById("nombre").value;
const email = document.getElementById("email").value;
const selectProductos = document.querySelector('#productos');
const btnAgregar = document.querySelector('#agregar');
const btnVaciar = document.querySelector('#eliminar');
function traerItemsStorage() {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    carrito = JSON.parse(localStorage.getItem('carritos')) || [];
}


function popularDropdown() {
    productos.forEach(({nombre,precio}, index) => { 
        const option = document.createElement('option');
        option.textContent = `${nombre} - $${precio}`;
        option.value = index; 
        selectProductos.appendChild(option);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    traerItemsStorage();
    popularDropdown();
    dibujarTabla();


    
    btnAgregar.addEventListener('submit', (e) => {
        e.preventDefault();
        const productoSeleccionado = productos.find((item,index) => index === +selectProductos.value);
           if (productoSeleccionado === undefined) {
            alert('Usted primero debe seleccionar un producto');
            return; 
        }
       
        const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === productoSeleccionado.nombre);

        if (indiceCarrito !== -1) { 
            carrito[indiceCarrito].cantidad++;
        }else {
            const item = new Item(productoSeleccionado,1);
           
            carrito.push(item);
        }
     

        localStorage.setItem('carrito',JSON.stringify(carrito)); 
        dibujarTabla();
    })


    btnVaciar.addEventListener('click',() => {
        Swal.fire({
            title: 'Esta seguro que desea eliminar su compra?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem('carrito', carrito);
                dibujarTabla();
                Swal.fire({
                    title: 'Compra eliminada!',
                    icon: 'success'
                });
            }
        })
    });

})




function dibujarTabla() {
    const bodyTabla = document.getElementById('items');
    const total = document.querySelector('#total');
    bodyTabla.innerHTML = ``; 
    carrito.forEach((item,index) => {
        const {producto: {nombre:nombrep,precio}, cantidad} = item;
       const tr = document.createElement('tr');
       tr.classList.add('text-white');
       tr.innerHTML = `
            <td>${nombrep || ''}</td>
            <td>$${precio || ''}</td>
            <td>${cantidad || ''}</td>
            <td>${cantidad * precio || 0}</td>
            <td>
                <button id="item-${index}" class="btn btn-danger">X</button>
            </td>
        `;
        bodyTabla.appendChild(tr);

        document.querySelector(`#item-${index}`).addEventListener('click', () => {
            carrito.splice(index,1);
            dibujarTabla();
            localStorage.setItem('carrito', JSON.stringify(carrito));
        });

    });
    
    total.textContent = carrito.reduce((acc,item) => acc + item.producto.precio*item.cantidad , 0);
}