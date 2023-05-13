import classNames from "classnames"
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import { useInjection } from "inversify-react"

import ProductPageStore from "@business-logic/ProductPageStore"
import Container from "@components/Container/Container"
import ArrowVertical from "@components/ArrowVertical"

import classes from "./ProductPage.module.styl"

interface ProductPageProps {
    productId: number;
}

const ProductPage: FC<ProductPageProps> = observer(({productId}) => {
    const imagesWrapperRef = useRef<HTMLDivElement>(null)
    const imageWrapperHeightRef = useRef<number | null>(null)
    const imagesContainerMaxAvailableOffsetRef = useRef<number | null>(null)

    const productPageStore = useInjection<ProductPageStore>(ProductPageStore)
    const [imagesContainerOffset, setImagesContainerOffset] = useState<number>(0)

    const setImagesContainerOffsetSafely = (offset: number) =>
        setImagesContainerOffset(Math.max(
            0,
            Math.min(offset, imagesContainerMaxAvailableOffsetRef.current!)
        ))


    const setImagesContainerOffsetByIndexSafely = (idx: number) =>
        setImagesContainerOffsetSafely(idx * imageWrapperHeightRef.current!)

    useEffect(() => {
        productPageStore.loadProductById(productId)
    }, [productId])

    useEffect(() => {
        if (imagesWrapperRef.current) {
            imagesContainerMaxAvailableOffsetRef.current = imagesWrapperRef.current!.scrollHeight - imagesWrapperRef.current!.clientHeight
        }
    })

    useLayoutEffect(() => {
        const onWheel = (evt: WheelEvent): void => {
            evt.preventDefault()

            setImagesContainerOffsetSafely(imagesContainerOffset + evt.deltaY)
        }

        if (imagesWrapperRef.current) {
            imagesWrapperRef.current.addEventListener("wheel", onWheel, { passive: false })
        }

        return () => {
            if (imagesWrapperRef.current) {
                imagesWrapperRef.current.removeEventListener("wheel", onWheel)
            }
        }
    })

    useLayoutEffect(() => {
        if (productPageStore.currentProduct) {
            imageWrapperHeightRef.current =
                imagesWrapperRef.current!.scrollHeight / productPageStore.currentProduct.imagesUrls.length
        }
    }, [productPageStore.currentProduct])

    useEffect(() => {
        setImagesContainerOffsetByIndexSafely(productPageStore.primaryImageIndex)
    }, [productPageStore.primaryImageIndex])

    const isCurrentProductAvailable: boolean = !productPageStore.isLoading && !!productPageStore.currentProduct

    return <Container>
        {
            isCurrentProductAvailable
            ? <>
                <h1 className={ classes.header }>{ productPageStore.currentProduct!.title }</h1>
                <main className={ classes.info }>
                    <div className={ classes.imageControls }>
                        <div className={ classes.imageSlider }>
                            <button
                                type="button"
                                className={ classes.arrow }
                                onClick={ () => setImagesContainerOffsetSafely(imagesContainerOffset - imageWrapperHeightRef.current!) }
                                disabled={ imagesContainerOffset === 0 }>
                                <ArrowVertical />
                            </button>
                            <div
                                className={ classes.imagesWrapper }
                                ref={ imagesWrapperRef }
                            >
                                <div
                                    className={ classes.imagesContainer }
                                    // ref={ imagesContainerRef }
                                    style={{ transform: `translateY(${- imagesContainerOffset}px)` }}>
                                    {
                                        productPageStore.currentProduct!.imagesUrls.map((imageUrl, idx) => <div
                                            key={ imageUrl }
                                            className={ classes.imageDivider }
                                        >
                                            <div
                                                className={ classNames(
                                                    classes.imageWrapper,
                                                    classes.__secondary,
                                                    {
                                                        [classes.__selected]: idx === productPageStore.primaryImageIndex
                                                    }
                                                ) }
                                                onClick={ () => productPageStore.primaryImageIndex = idx }
                                            >
                                                <img
                                                    className={ classes.image }
                                                    src={ imageUrl }
                                                    alt={ `Image ${ imageUrl }` }
                                                />
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <button
                                type="button"
                                className={ classNames(classes.arrow, classes.__rotated) }
                                onClick={ () => setImagesContainerOffsetByIndexSafely(productPageStore.primaryImageIndex + 1) }
                                disabled={ !imagesContainerMaxAvailableOffsetRef.current || imagesContainerOffset >= imagesContainerMaxAvailableOffsetRef.current }
                            >
                                <ArrowVertical />
                            </button>
                        </div>
                        <div className={ classNames(classes.imageWrapper, classes.__primary) }>
                            <img
                                className={ classes.image }
                                src={ productPageStore.currentProduct!.imagesUrls[productPageStore.primaryImageIndex] }
                                alt={ `Primary image ${ productPageStore.currentProduct!.imagesUrls[productPageStore.primaryImageIndex] }` }
                            />
                        </div>
                    </div>
                    <section className={ classes.characteristics }>
                        <h3 className={ classes.characteristicsHeader }>
                            Основные характеристики товара
                        </h3>
                        <ul className={classes.characteristicsList}>
                            {
                                Object.entries(productPageStore.currentProduct!.characteristics)
                                    .map(([description, value], idx) => <li
                                        key={ idx }
                                        className={ classes.characteristic }
                                    >
                                        <span className={ classes.characteristicDescription }>{ description }</span>
                                        <span className={ classes.characteristicvalue }>{ value }</span>
                                    </li>)
                            }
                        </ul>
                    </section>
                    <div className={ classes.priceBanner }>
                        Цена:
                        <div className={ classes.price }>{ productPageStore.currentProduct!.price } руб</div>
                        <div className={ classes.counter }>
                            <button className={ classes.smallButton }>+</button>
                                { productPageStore.count }
                            <button className={ classes.smallButton }>-</button>
                        </div>
                        <button className={ classes.addButton }>Добавить</button>
                    </div>
                </main>
            </>
            // TODO: сделать нормальный прелоадер
            : "Preloader..."
        }
    </Container>
})

export default ProductPage
