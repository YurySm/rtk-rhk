import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "@/api/api.interceptors";
import {IProduct} from "@/interfaces/product.interface";

export const productSlice = createApi({
    reducerPath: 'products',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['products'],
    endpoints: builder => ({
        getProductsList: builder.query<IProduct[], void>({
            query: () => ({
                url: '/products',
                method: "GET"
            }),
            providesTags: (result) =>
                result ?
                    [...result.map(({ id }) => (
                        { type: 'products' as const, id }
                    ))] :
                    [{ type: 'products', id: 'LIST' }],
        }),
        getProduct: builder.query<IProduct, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET"
            }),
            providesTags: (_, __, arg, ___) => {
                return [{ type: 'products', id: arg }]
            }
        }),
        editProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                data: product
            }),
            invalidatesTags: () => [],
            async onQueryStarted(product, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedProduct } = await queryFulfilled;

                    dispatch(
                        productSlice.util.updateQueryData('getProduct', updatedProduct.id, (draft) => {
                            Object.assign(draft, updatedProduct);
                        })
                    );

                    dispatch(
                        productSlice.util.updateQueryData('getProductsList', undefined, (draft) => {
                            const index = draft.findIndex(item => item.id === updatedProduct.id);
                            if (index !== -1) {
                                draft[index] = updatedProduct;
                            } else {
                                draft.push(updatedProduct);
                            }
                        })
                    );
                } catch (error) {}
            },
        })
    })
})

export const {
    useGetProductsListQuery,
    useGetProductQuery,
    useEditProductMutation
} = productSlice

