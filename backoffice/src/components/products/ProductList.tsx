import { useEffect, useState } from 'react';
import './ProductList.scss';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

function currencyFormat(amount: number) {
   // Formatear el número como una cadena en formato de moneda
   return new Intl.NumberFormat('es-AR', {
     style: 'currency',
     currency: 'ARS', // Cambiar al código de moneda deseado
   }   ).format(amount);
 }

export default function ProductList() { 
   const [filter, setFilter] = useState<string>('');
   const [products, setProducts] = useState<IProduct[]>([]);
 
   const productService = new ProductService();

   useEffect(() => {
      (async () => {
         const result = await productService.getAll()
         setProducts(result);
      })();
    }, []);
 
 
   const handleInputChange = (event:any) => {
      setFilter(event.target.value);
   };

   const filteredData = products.filter((item) =>{
            const searchValues = filter.toString().toLowerCase().split(" ");
            let include = true;
            for (let i = 0; i < searchValues.length; i++) {
              if (!item.description.toLowerCase().includes(searchValues[i])
                && !item.title.toLowerCase().includes(searchValues[i])) include = false
            }
         return include;
   });
    return ( 
      <div className='product-list'>
      <input type="text" value={filter} onChange={handleInputChange} /> 
         <table className="table table-dark">
            <thead>
               <tr>
                  <th scope="col">Imagen</th>
                  <th scope="col">Detalle</th>
                  <th scope="col">Precio</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((product) => { 
                  return (
                  <tr key={product.id}>
                     <td className='td-image'>
                        <img src={product.image}/>
                     </td>
                     <td>
                        <div className='p-title'>
                           {product.title} { "(" + product.id + ")"}
                        </div>
                        <p className='p-description'>{product.description}</p>
                     </td>
                     <td className='td-price'> {currencyFormat(product.price)}</td>
                  </tr>);
               })}
            </tbody>
         </table>
      </div> 
   )
}
 