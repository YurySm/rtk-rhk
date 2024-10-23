'use client'
import {IProduct, IReview} from "@/interfaces/product.interface";
import {Button, Chip} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export function ProductListItem ({product}: {product: IProduct}) {

    return (
        <div className={'grid grid-cols-[250px_1fr_auto] gap-3 border rounded p-8 items-center mt-8'}>
            <div className={'h-48 rounded-md overflow-hidden relative'}>
                <Image
                    className={'object-contain'}
                    src={product.images[0]}
                    fill={true}
                    alt={product.name} />
            </div>

            <div className={'self-start'}>
                <h2 className={'text-3xl'}>{product.name}</h2>
                <div className={'mt-3'}>{getRatingValue(product.reviews)} - {product.reviews.length} отзывов</div>
                {
                    product.price.discount ?
                        <div className={'mt-7'}>
                            <span
                                className={'font-black text-xl text-emerald-500'}>{(product.price.amount - (product.price.amount * product.price.discount.percent / 100)).toFixed(2)} {product.price.currency}</span>
                            <span className={'font-light line-through ml-2'}>
                                {product.price.amount}
                            </span>
                        </div> :
                        <div className={'mt-7'}>
                            <span
                                className={'font-black text-xl text-emerald-500'}>{product.price.amount}</span>
                        </div>
                }
            </div>

            <Link href={`products/${product.id}`}><Chip color={'primary'} radius="sm">Подробнее</Chip></Link>
        </div>
    );
}

export const getRatingValue = (reviews: IReview[]) => {
    let value = 0
    reviews.forEach((review: IReview) => {
        value += review.rating;
    })

    return value / reviews.length
}