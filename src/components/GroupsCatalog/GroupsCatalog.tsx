import {FC, useEffect} from "react"
import {observer} from "mobx-react"
import classNames from "classnames"

import useRootStore from "@services/hooks/useRootStore"
import ArrowDrop24 from "@components/ArrowDrop24"

import classes from "./GroupsCatalog.module.styl"

const GroupsCatalog: FC = observer(() => {
    const { groupsCatalogStore } = useRootStore()

    useEffect(() => {
        groupsCatalogStore.fetchMainGroups()
    }, [])

    const areGroupsShown: boolean = !!groupsCatalogStore.groups?.length && groupsCatalogStore.isVisible
    const headerClass: string = classNames(classes.header, {
        [classes.__active]: areGroupsShown
    })

    return <nav className={classes.catalog}
                onMouseEnter={() => groupsCatalogStore.scheduleVisibilityChange(true)}
                onMouseLeave={() => groupsCatalogStore.scheduleVisibilityChange(false)}>
        <header className={headerClass}>
            <ArrowDrop24 />
            Каталог товаров
        </header>
        {
            areGroupsShown && <ul className={classes.groups}>
                {
                    groupsCatalogStore.groups!.map(group => <li className={classes.item} key={group.id}>{group.title}</li>)
                }
            </ul>
        }
    </nav>
})

export default GroupsCatalog
