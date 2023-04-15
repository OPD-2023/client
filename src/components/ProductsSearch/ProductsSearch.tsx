import {FC} from "react"
import {observer} from "mobx-react"
import classNames from "classnames"

import Search24 from "@components/Search24"
import useRootStore from "@services/hooks/useRootStore"

import classes from "./ProductsSearch.module.styl"

const ProductsSearch: FC = observer(() => {
    const { productsSearchStore } = useRootStore()

    const areProductsExist: boolean = !!productsSearchStore.products && !!productsSearchStore.products.length

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
            areProductsExist && <ul className={dropdownClass}>
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
