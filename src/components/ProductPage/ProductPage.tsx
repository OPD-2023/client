import classNames from "classnames"
import { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import { useInjection } from "inversify-react"

import ProductPageStore from "@business-logic/ProductPageStore"
import Container from "@components/Container/Container"
import ArrowVertical from "@components/ArrowVertical"
import Button from "@components/Button/Button"

import classes from "./ProductPage.module.styl"

interface ProductPageProps {
    productId: number;
    onAdd?: (payload: string) => void;
}

const ProductPage: FC<ProductPageProps> = observer(({
    productId,
    onAdd
}) => {
    const imagesWrapperRef = useRef<HTMLDivElement>(null)

    const productPageStore = useInjection<ProductPageStore>(ProductPageStore)
    const [imagesContainerOffset, setImagesContainerOffset] = useState<number>(0)
    const [imageWrapperHeight, setImageWrapperHeight] = useState<number | null>(null)
    const [imagesContainerMaxAvailableOffset, setImagesContainerMaxAvailableOffset] = useState<number | null>(null)

    const setImagesContainerOffsetSafely = (offset: number) =>
        setImagesContainerOffset(Math.max(
            0,
            Math.min(offset, imagesWrapperRef.current!.scrollHeight - imagesWrapperRef.current!.clientHeight)
        ))


    const setImagesContainerOffsetByIndexSafely = (idx: number) => {
        if (imageWrapperHeight) {
            setImagesContainerOffsetSafely(idx * imageWrapperHeight!)
        }
    }

    useEffect(() => {
        productPageStore.loadProductById(productId)
    }, [productId])

    useEffect(() => {
        if (imagesWrapperRef.current) {
            setImagesContainerMaxAvailableOffset(
                imagesWrapperRef.current.scrollHeight - imagesWrapperRef.current.clientHeight
            )
        }
    }, [productPageStore.currentProduct?.imagesUrls])

    useEffect(() => {
        if (productPageStore.currentProduct && imagesWrapperRef.current) {
            setImageWrapperHeight(
                imagesWrapperRef.current.scrollHeight / productPageStore.currentProduct.imagesUrls.length
            )
        }
    }, [productPageStore.currentProduct])

    useEffect(() => {
        setImagesContainerOffsetByIndexSafely(productPageStore.primaryImageIndex)
    }, [productPageStore.primaryImageIndex])

    const onAddButtonClick = () => {
        if (onAdd) {
            // TODO: вынести куда-то
            onAdd(`Меня заинтересовал товар "${productPageStore.currentProduct!.title}" с артикулом ${productPageStore.currentProduct!.article} и следующими характеристиками:\n${ Object.entries(productPageStore.currentProduct!.characteristics).map(([characteristic, value]) => `- ${characteristic}: ${value}`).join("\n") }\nв количестве ${productPageStore.count} штук\n`)
        }
    }

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
                                onClick={ () => setImagesContainerOffsetSafely(imagesContainerOffset - imageWrapperHeight!) }
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
                                onClick={ () => setImagesContainerOffsetSafely(imagesContainerOffset + imageWrapperHeight!) }
                                disabled={ !imagesContainerMaxAvailableOffset || imagesContainerOffset >= imagesContainerMaxAvailableOffset }
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
                                        <span className={ classes.characteristicValue }>{ value }</span>
                                    </li>)
                            }
                        </ul>
                    </section>
                    <div className={ classes.priceBanner }>
                        Цена:
                        <div className={ classes.price }>{ productPageStore.currentProduct!.price } руб</div>
                        <div className={ classes.counter }>
                            <Button className={ classes.smallButton } onClick={ () => productPageStore.count++  }>
                                +
                            </Button>
                            <span className={ classes.count }>
                                { productPageStore.count }
                            </span>
                            <Button
                                className={ classes.smallButton }
                                onClick={ () => productPageStore.count-- }
                                disabled={ productPageStore.count === 0 }>
                                -
                            </Button>
                        </div>
                        <Button
                            className={ classes.addButton }
                            onClick={ onAddButtonClick }
                            disabled={ productPageStore.count === 0 }>
                            Добавить
                        </Button>
                        {/*<button className={ classes.addButton }>Добавить</button>*/}
                    </div>
                </main>
            </>
            // TODO: сделать нормальный прелоадер
            : "Preloader..."
        }
    </Container>
})

export default ProductPage
