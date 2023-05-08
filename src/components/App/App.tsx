import { FC } from "react"
import { observer } from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog"
import FeedbackForm from "@components/FeedbackForm/FeedbackForm"
import ProductPage from "@components/ProductPage/ProductPage"

import classes from "./App.module.styl"

const App: FC = observer(() => {
    return <main>
        <Container className={classes.application}>
            <GroupsCatalog />
            <ProductsSearch />
        </Container>
        <FeedbackForm />
        <ProductPage productId={0} />
    </main>
})

export default App
