import {FC} from "react"
import {observer} from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog";

import classes from "./App.module.styl"

const App: FC = observer(() => {
    return <Container className={classes.application}>
        <GroupsCatalog />
        <ProductsSearch />
    </Container>
})

export default App
