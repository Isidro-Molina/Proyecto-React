import './CartContaier.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../utils/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { EmptyCart } from '../EmptyCart/EmptyCart';

export const CartContainer = () => {
    const value = useContext(CartContext);
    const { productosCarrito, getTotalPrice, getTotalProducts, removeItem, removeAll } = value;
    const [compraId, setCompraId] = useState('');

    const sendOrder = (evt) => {
        // evita que se recarga la pagina
        evt.preventDefault();
        // asi obtenemos los valores del formulario
        const compra = {
            buyer: {
                name: evt.target[0].value,
                phone: evt.target[1].value,
                email: evt.target[2].value,
            },
            items: productosCarrito,
            total: getTotalPrice(),
        };
        // creamos la referencia de donde voy a guardar la informacion en la base de datos
        const queryRef = collection(db, 'orders');
        //  agregar la informacion
        addDoc(queryRef, compra).then((resultado) => {
            setCompraId(resultado.id);
        });
    };

    /*     const updateProduct = () => {
        // creamos la referencia del documento que vamos a actualizar
        const queryRef = doc(db, 'items', 'Fjz3RPSy1EpN40vQYr59');
        // actualizamos el documento
        updateDoc(queryRef, { price: 60 }).then(() => console.log('actualizado correctamente')).catch((error) => console.log('hubo un error'));
    } */

    return (
        <div className='cartContainer'>
            {productosCarrito.length > 0 ? (
                <div>
                    {compraId && <p>Su compra fue realizada exitosamente! Este es su numero de orden: {compraId}</p>}
                    {productosCarrito.map((producto) => (
                        <div className="productosChango">
                            <h3>{producto.title}</h3>
                            <img src={producto.image} alt={producto.title} />
                            <p>Cantidad que llevas: {producto.quantity}</p>
                            <h4>Precio por unidad: {producto.price}</h4>
                            <h4>Precio por cantidad: {producto.quantityPrice}</h4>
                            <button onClick={() => removeItem(producto.id)}>Eliminar</button>
                        </div>
                    ))}
                    <div className="vaciar">{<button onClick={() => removeAll()}>Vaciar</button>}</div>
                    <p className="precioTotal">Precio total: {getTotalPrice()}</p>
                    <p className="productosTotal">Total de productos: {getTotalProducts()} </p>
                    <form className="formulario" onSubmit={sendOrder}>
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Telefono" />
                        <input type="text" placeholder="Email" />
                        <button type="submit">Enviar Orden</button>
                    </form>
                    {/* <button className='update' onClick={updateProduct}>Actualizar Productos</button> */}
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};
