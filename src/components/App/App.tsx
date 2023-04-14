import {FC} from "react"
import {observer} from "mobx-react"
import classNames from "classnames"

import useRootStore from "@services/hooks/useRootStore"

import classes from "./App.module.styl"

const App: FC = observer(() => {
    const { productsSearchStore } = useRootStore()

    const listClass: string = classNames(classes.list, {
        [classes.__loading]: productsSearchStore.productsAreLoading
    })

    return <div>
        <form>
            <input value={productsSearchStore.field} onChange={evt => productsSearchStore.field = evt.target.value} />
            { productsSearchStore.products?.length && <ul className={listClass}>
                {
                    productsSearchStore.products.map(product => <li key={product.article}>{product.title}</li>)
                }
            </ul> }
        </form>
    </div>
})

export default App
