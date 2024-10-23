'use client'
import {useGetProductsListQuery} from "@/store/product/product.slice";
import {useEffect} from "react";
import {ProductListItem} from "@/screens/products/Products/components/ProductListItem";
import {Spinner} from "@nextui-org/react";

export function ProductList() {
    const {
        data,
        isError,
        isLoading,
        isFetching
    } = useGetProductsListQuery()

    return (
        <div
            className="max-w-[1440px] mx-auto min-h-screen px-1 pt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className={'text-6xl font-medium'}>Products</h1>
            {
                (isFetching || isLoading) && (
                    <div className={'w-full h-full flex justify-center items-center'}>
                        <Spinner size="lg"/>
                    </div>
                )
            }
            {
                data && data.map(p => (
                    <ProductListItem
                        key={p.id}
                        product={p}/>
                ))
            }
        </div>
    );
}