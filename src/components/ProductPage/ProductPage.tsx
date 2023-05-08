import classNames from "classnames"
import { FC, useEffect } from "react"
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
    const { currentProduct, isLoading, count,
            primaryImageIndex, loadProductById } = useInjection<ProductPageStore>(ProductPageStore)

    useEffect(() => {
        loadProductById(productId)
    }, [productId])

    const isCurrentProductAvailable: boolean = !isLoading && !!currentProduct

    return <Container>
        {
            isCurrentProductAvailable
            ? <>
                <h1 className={ classes.header }>{ currentProduct!.title }</h1>
                <main className={ classes.info }>
                    <div className={ classes.imageControls }>
                        <div className={ classes.imageSlider }>
                            <div className={ classes.arrow }>
                                <ArrowVertical />
                            </div>
                            <div className={ classes.imagesWrapper }>
                                <div className={ classes.imagesContainer }>
                                    {
                                        currentProduct!.imagesUrls.map(imageUrl => <div
                                            key={ imageUrl }
                                            className={ classNames(classes.imageWrapper, classes.__secondary) }
                                        >
                                            <img
                                                className={ classes.image }
                                                src={ imageUrl }
                                                alt={ `Image ${ imageUrl }` }
                                            />
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className={ classNames(classes.arrow, classes.__rotated) }>
                                <ArrowVertical />
                            </div>
                        </div>
                        <div className={ classNames(classes.imageWrapper, classes.__primary) }>
                            <img
                                className={ classes.image }
                                src={ currentProduct!.imagesUrls[primaryImageIndex] }
                                alt={ `Primary image ${ currentProduct!.imagesUrls[primaryImageIndex] }` }
                            />
                        </div>
                    </div>
                    <section className={ classes.characteristics }>
                        <h3 className={ classes.characteristicsHeader }>
                            Основные характеристики товара
                        </h3>
                        <ul className={classes.characteristicsList}>
                            {
                                Object.entries(currentProduct!.characteristics)
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
                        <div className={ classes.price }>{ currentProduct!.price } руб</div>
                        <div className={ classes.counter }>
                            <button className={ classes.smallButton }>+</button>
                            { count }
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
