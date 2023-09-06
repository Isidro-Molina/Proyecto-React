import './ItemList.css'
import { Item } from '../../components/Item/Item';

export const ItemList = ({items}) => {
    return (
        <div className='products'>
            {
                items.map(producto => (
                    <Item key={producto.id} item={producto} />
                ))
            }
        </div>
    );
}