import { useEffect, useState } from 'react';
import './ProductList.scss';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

function currencyFormat(amount: number) {
   // Formatear el número como una cadena en formato de moneda
   return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS', // Cambiar al código de moneda deseado
   }).format(amount);
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


   const handleInputChange = (event: any) => {
      setFilter(event.target.value);
   };

   const filteredData = products.filter((item) => {
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
         <div className='py-3 px-2'>
            <input type="text" value={filter} onChange={handleInputChange} placeholder='Buscar...'/>
         </div>

         <table className="table table-dark">
            <thead>
               <tr>
                  <th scope="col">Imagen</th>
                  <th scope="col">Detalle</th>
                  <th scope="col">Costo</th>
                  <th scope="col">Precio</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((product) => {
                  return (
                     <tr key={product.id}>
                        <td className='td-image'>
                           <img src={product.images[0].image.path} />
                        </td>
                        <td className='td-detail'>
                           <div className='p-title'>
                              {product.title} {"(" + product.id + ")"}
                           </div>
                           <p className='p-description'>{product.description}</p>
                        </td>
                        <td className='td-price'> {currencyFormat(product.priceCost)}</td>
                        <td className='td-price'> {currencyFormat(product.pricePublic)}</td>
                     </tr>);
               })}
               {!filteredData.length ? <tr><td colSpan={4} className='text-center' style={{ "min-width": "60vw" }}><h2>No se encontraron resultados</h2></td></tr> : <></>}
            </tbody>
         </table>
      </div>
   )
}
