'use client'
import {useGetProductQuery} from "@/store/product/product.slice";
import {Spinner} from "@nextui-org/react";
import Image from "next/image";
import {getRatingValue} from "@/screens/products/Products/components/ProductListItem";
import {Link} from "@nextui-org/react";
import {EditProduct} from "@/screens/products/Product/EditProduct/EditProduct";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {Rating} from "@smastrom/react-rating";
import {getReviewWord} from "@/utils/getReviewWord";

export function Product ({id}: {id: string}) {
    const {
        data: product,
        isLoading,
        isFetching,
    } = useGetProductQuery(id)

    return (
        <div
            className="max-w-[1440px] mx-auto min-h-screen px-1 pt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            {
                (isFetching || isLoading) && (
                    <div className={'w-full h-full flex justify-center items-center'}>
                        <Spinner size="lg"/>
                    </div>
                )
            }
            {
                product && (
                    <div>
                        <h1 className={'text-6xl font-medium'}>{product.name}</h1>
                        <div className={'flex mt-8'}>
                            <div className={'h-96 min-w-[440px] rounded-md overflow-hidden relative'}>
                                <Image
                                    className={'object-contain'}
                                    src={product.images[0]}
                                    fill={true}
                                    alt={product.name}/>
                            </div>

                            <div>
                                <div className={'mt-7 flex justify-between'}>
                                    {
                                        product.price.discount ?
                                            <div>
                                                <span
                                                    className={'font-black text-xl text-emerald-500'}>{(product.price.amount - (product.price.amount * product.price.discount.percent / 100)).toFixed(2)} {product.price.currency}</span>
                                                <span className={'font-light line-through ml-2'}>
                                                    {product.price.amount}
                                                </span>
                                            </div> :
                                            <div>
                                                <span
                                                    className={'font-black text-xl text-emerald-500'}>{product.price.amount}</span>
                                            </div>
                                    }
                                    <EditProduct product={product}/>
                                </div>

                                <div className={'mt-3 flex gap-2'}>
                                    <Rating
                                        className={'max-w-28'}
                                        value={getRatingValue(product.reviews)}
                                        readOnly
                                    />
                                    <span>{product.reviews.length} {getReviewWord(product.reviews.length)}</span>
                                </div>

                                <h2 className={'text-2xl font-medium mt-7'}>Характеристики:</h2>
                                {
                                    product.features.map((feature, index) => (
                                        <div
                                            className={'grid grid-cols-[1fr_2fr] mt-3 border-b border-gray-700'}
                                            key={index}>
                                            <span className={'text-medium'}>{feature.name}</span>
                                            <span>{feature.description}</span>
                                        </div>
                                    ))
                                }
                                <h2 className={'text-2xl font-medium mt-7'}>Информация о производителе:</h2>
                                <div
                                    className={'flex gap-2 mt-1'}>
                                    <span className={'text-medium'}>{product.manufacturer.name}</span>
                                    <span>{product.manufacturer.country}</span>
                                </div>
                                <div
                                    className={'flex gap-2 mt-1'}>
                                    <span className={'text-medium'}>Гарантия</span>
                                    <span>{product.manufacturer.warranty.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2
                                id={'reviews'}
                                className={'text-2xl font-medium mt-7'}>Отзывы:</h2>
                            {
                                product.reviews.length === 0 &&
                                <span>Отывов пока нет</span>
                            }
                            {
                                product.reviews.map((review, index) => (
                                    <div
                                        className={'border rounded-md shadow-md border-gray-400 px-9 py-6 mt-5'}
                                        key={index}
                                    >
                                        <h2 className={'text-xl font-medium'}>{review.user}</h2>
                                        <p className={'text-sm font-light text-gray-400'}>
                                            {format(review.date, 'd MMMM yyyy', { locale: ru })}
                                        </p>

                                        <Rating
                                            className={'max-w-28 mt-2'}
                                            value={review.rating}
                                            readOnly
                                        />

                                        <p className={'mt-6 text-gray-300'}>
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}