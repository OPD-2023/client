import {FC} from "react"
import {observer} from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"

const App: FC = observer(() => {
    return <main>
        <ProductsSearch />
    </main>
})

export default App
