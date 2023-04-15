import {FC} from "react"
import {observer} from "mobx-react"
import classNames from "classnames"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import useRootStore from "@services/hooks/useRootStore"

import classes from "./App.module.styl"

const App: FC = observer(() => {
    const { productsSearchStore } = useRootStore()

    const listClass: string = classNames(classes.list, {
        [classes.__loading]: productsSearchStore.productsAreLoading
    })

    return <main>
        <ProductsSearch />
    </main>
})

export default App
