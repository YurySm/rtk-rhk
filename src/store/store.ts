import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productSlice} from "@/store/product/product.slice";


const combinedReducers = combineReducers({
    [productSlice.reducerPath]: productSlice.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: combinedReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false}
        ).concat(productSlice.middleware)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducers>
export type AppDispatch = AppStore['dispatch']