import './ItemListContainer.css';
import { useEffect, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export const ItemListContainer = () => {
    // la ruta hecha en la navbar con el Link
    const { categoryId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // crear referencia del punto de accesso a la informacion
        const queryRef = categoryId ? query(collection(db, 'items'), where('categoria', '==', categoryId)) : collection(db, 'items');
        // si no hay nada en los params, pide todo a la coleccion 'items'

        getDocs(queryRef).then((response) => {
            const results = response.docs;
            const docs = results.map((doc) => {
                // contenido de un documento
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            setProductos(docs);
            setLoading(false);
        });
    }, [categoryId]);

    return (
        <div className="contenedor">
            {loading ? <p>cargando...</p> : <ItemList items={productos} />}
        </div>
    );
};
