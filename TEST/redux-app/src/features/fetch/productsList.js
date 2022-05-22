import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllProducts, FetchProducts } from './fetchProducts'

const ProductExcerpt = ({ product ,index}) => {
  return (
    <article className="product-excerpt" key={index}>
      <h3>{product.price+" €"}</h3>
      <p className="product-details">{product.title}</p>

    </article>
  )
}

export const ProductsList = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)

  const productStatus = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(FetchProducts())
    }
  }, [productStatus, dispatch])

  let content

  if (productStatus === 'succeeded') {

   return content = products.map((prod,index) => (
      <ProductExcerpt key={index} product={prod} />
    ))

  } 
  
  else if (productStatus === 'failed') {
   return content = <div>{error}</div>
  }

  return content

}
