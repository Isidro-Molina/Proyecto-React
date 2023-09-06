import './Item.css';
import { Link } from 'react-router-dom';

export const Item = ({ item }) => {
    return (
        <div className="card" id='cards'>
            <img src={item.image} alt={item.title} />
            <h4>{ item.title }</h4>
            <p>Precio: ${item.price}</p>
            <Link to={`/item/${item.id}`}>
                <button className='detalles'>Detalles</button>
            </Link>
        </div>
    )
}
