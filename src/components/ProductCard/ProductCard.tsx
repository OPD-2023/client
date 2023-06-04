import {FC, useEffect, useRef, useState} from "react"
import classNames from "classnames"

import Product from "@models/Product"
import Star24 from "@components/Star24"

import classes from "./ProductCard.module.styl"

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const [isMouseInside, setIsMouseInside] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const imagesContainerRef = useRef<HTMLDivElement>(null)

    const currentImageUrl = product.imagesUrls[currentImageIndex]

    const dots = product.imagesUrls.map((imageUrl, idx) => <i
        key={ idx }
        className={ classNames(classes.dot, { [classes.__active]: currentImageIndex === idx }) }
    />)

    const stars = Array.from({length: 5}).map((_, idx) => <span className={ classes.star }>
        <Star24 filled={ idx < product.rating } />
    </span>)

    useEffect(() => {
        const onMouseMove = isMouseInside
            ? (evt: MouseEvent) => {
                const currentTargetRect = (evt.currentTarget as HTMLElement).getBoundingClientRect()

                const relativeCoefficient = (evt.clientX - currentTargetRect.left) / currentTargetRect.width
                setCurrentImageIndex(Math.round(relativeCoefficient * (product.imagesUrls.length - 1)))
            }
            : undefined

        if (onMouseMove) {
            imagesContainerRef.current!.addEventListener('mousemove', onMouseMove)
        }

        return () => {
            if (onMouseMove) {
                imagesContainerRef.current!.removeEventListener('mousemove', onMouseMove)
            }
        }
    }, [isMouseInside, product.imagesUrls.length])

    return <div className={ classes.card }>
        <div
            className={ classes.imagesContainer }
            onMouseEnter={ () => setIsMouseInside(true) }
            onMouseLeave={ () => setIsMouseInside(false) }
            ref={ imagesContainerRef }
        >
            <img
                src={ currentImageUrl }
                alt="Product image"
                className={ classes.currentImage }
            />
            <div className={ classes.article }>
                Артикул: { product.article }
            </div>
        </div>
        <div className={ classes.gallery }>
            { dots }
        </div>
        <h3 className={ classes.title }>{ product.title }</h3>
        <div className={ classes.rating }>
            { stars }
            <h5 className={ classes.measure }>
                { product.rating.toFixed(1) }
            </h5>
        </div>
        <div className={ classes.price }>
            { product.price } { product.currency }
        </div>
    </div>
}

export default ProductCard
