import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../client'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const FetchProducts = createAsyncThunk('products/FetchProducts', async () => {
  const response = await client.get('https://fakestoreapi.com/products/')
  return response.data
})


const productsSlice = createSlice({
  name: 'products',
  initialState,
//   reducers: {
//     // reactionAdded(state, action) {
//     //   const { productId, reaction } = action.payload
//     //   const existingProducts = state.products.find((prod) => prod.id === productId)
//     //   if (existingProducts) {
//     //     existingProducts.reactions[reaction]++
//     //   }
//     // },

//   },
  extraReducers(builder) {
    builder
      .addCase(FetchProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(FetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // state.products = state.products.concat(action.payload)
        state.products = action.payload
      })
      .addCase(FetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reactionAdded } = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = (state) => state.products.products

// export const selectProductById = (state, productId) =>
//   state.products.products.find((prod) => prod.id === productId)
