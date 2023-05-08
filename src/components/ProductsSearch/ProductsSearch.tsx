import {FC} from "react"
import {observer} from "mobx-react"
import {useInjection} from "inversify-react"
import classNames from "classnames"

import ProductsSearchStore from "@business-logic/ProductsSearchStore"
import Search24 from "@components/Search24"

import classes from "./ProductsSearch.module.styl"

const ProductsSearch: FC = observer(() => {
    const productsSearchStore = useInjection<ProductsSearchStore>(ProductsSearchStore)

    const dropdownClass: string = classNames(classes.dropdown, {
        [classes.__loading]: productsSearchStore.productsAreLoading
    })

    return <div className={classes.wrapper}>
        <input className={classes.field}
               value={productsSearchStore.field}
               onChange={evt => productsSearchStore.field = evt.target.value} />
        <button className={classes.button}>
            Найти
        </button>
        {
            productsSearchStore.products?.length && <ul className={dropdownClass}>
                {
                    productsSearchStore.products!.map(product => <li className={classes.item} key={product.article}>
                        <Search24 />
                        <span className={classes.payload}>{product.title}</span>
                    </li>)
                }
            </ul>
        }
    </div>
})

export default ProductsSearch
