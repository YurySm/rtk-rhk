import type { Metadata } from 'next'
import {Product} from "@/screens/products/Product/Product";

export const metadata: Metadata = {
    title: '',
    description: ''
}

export default function ProductPage ({ params }: { params: { id: string } }){
    return <Product id={params.id}/>
}