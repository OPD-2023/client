import { FC } from "react"
import { observer } from "mobx-react"
import { useInjection } from "inversify-react"

import ProductPageStore from "@business-logic/ProductPageStore"
import Container from "@components/Container/Container"

import classes from "./ProductPage.module.styl"

const ProductPage: FC = observer(() => {
    const { currentProduct, isLoading, count } = useInjection<ProductPageStore>(ProductPageStore)

    const isCurrentProductAvailable: boolean = !isLoading && !!currentProduct

    return <Container>
        {
            isCurrentProductAvailable
            ? <Container>
                <h1 className={ classes.header }>{ currentProduct!.title }</h1>
                <main className={ classes.info }>
                    {/* Компонент фото со слайдером */}
                    <div>VERTICAL SLIDER</div>
                    <section className={ classes.characteristics }>
                        <h3 className={ classes.characteristicsHeader }>
                            Основные характеристики товара
                        </h3>
                        <ul className={classes.characteristicsList}>
                            {
                                Object.entries(currentProduct!.characteristics)
                                    .map(([description, value], idx) => <li className={ classes.characteristic } key={ idx }>
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
            </Container>
            // TODO: сделать нормальный прелоадер
            : "Preloader..."
        }
    </Container>
})
