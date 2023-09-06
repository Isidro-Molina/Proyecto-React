import './ItemDetailContainer.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ItemCount } from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext.js';

export const ItemDetailContainer = () => {
    const { id } = useParams();
    const [itemProduct, setItemProduct] = useState({});

    useEffect(() => {
        const getProducto = async () => {
            // creamos la referencia del documento al que vamos a consultar
            const queryRef = doc(db, 'items', id);
            // hacemos la consulta
            const response = await getDoc(queryRef);
            const newDoc = {
                ...response.data(),
                id: response.id,
            };
            setItemProduct(newDoc);
        };
        getProducto();
    }, [id]);

    const { addProduct } = useContext(CartContext);

    const agregarProducto = (quantity) => {
        addProduct(itemProduct, quantity);
    };

    return (
        <div className="container">
            <img src={itemProduct.image} alt={itemProduct.title} />

            <h3>{itemProduct.title}</h3>
            <h4>$ {itemProduct.price}</h4>
            <p>Stock disponible: {itemProduct.stock}</p>

            <ItemCount stock={itemProduct.stock} initial={1} onAdd={agregarProducto} />
        </div>
    );
};
