import {FC} from "react"
import {observer} from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog"
import ProductCard from "@components/ProductCard/ProductCard"
import FeedbackForm from "@components/FeedbackForm/FeedbackForm"
import Product from "@models/Product"
import Slider from "@components/Slider/Slider"

import classes from "./App.module.styl"

const product: Product = {
    article: 'Артикул: 302-4SS',
    title: 'ЦЕНТРАТОР НАРУЖНЫЙ С ГИДРОДОМКРАТОМ',
    price: 182300,
    currency: "руб",
    imageURL: "https://static.overlay-tech.com/assets/7016dd7e-66d0-43a1-9870-b95fec2e2d24.png",
    rating: 4
}

const App: FC = observer(() => {
    return <main>
        <Container className={classes.application}>
            <GroupsCatalog />
            <ProductsSearch />
            <ProductCard product={ product } />
        </Container>
        <Slider>
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
            <ProductCard product={ product } />
        </Slider>
        <FeedbackForm />
    </main>
})

export default App
