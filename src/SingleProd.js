import React, { useContext } from 'react'
import { Cart } from './Context';

const SingleProd = ({product}) => {
    const {cart, setCart} =  useContext(Cart);

  return (
    <>
        <div className='grid grid-cols-6 gap-8 mt-2' key={product.id}>
                    <div className='col-span-4'>
                        {product.images[4] && (
                        <img src={product.images[4]} alt='thumbnail'/>
                        //  || <img src={defaultImage} alt='thumbnail'/>
                        ) }   
                    </div>
                    <div className='col-span-1 grid grid-row-4 -space-y-12'>
                           <span>{product.title} ({product.brand})</span> 
                           <span>Price : {product.price}</span>
                           <span>Category : {product.category}</span>
                           <span>Description: {product.description}</span>
                    </div>
                    <div className='col-span-1 items-center justify-center'>
                        {cart.includes(product) ? 
                            (<button className='bg-blue-200 px-2 py-3 mt-20 w-48 rounded-xl text-center'
                            onClick={() => setCart(cart.filter((c) => c.id !== product.id))}> Remove from Cart</button>)
                            :
                            (<button className='bg-blue-400 px-2 py-3 mt-20 w-48 rounded-xl text-center'
                             onClick={() => setCart([...cart, product])}> ADD to Cart</button>)
                        }
                    </div>
            </div>
            <br></br>
            <hr className='h-2 font-bold'></hr>
    </>
  )
}

export default SingleProd