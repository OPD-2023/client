import classNames from "classnames"
import {useInjection} from "inversify-react"
import {observer} from "mobx-react"
import type {FC} from "react"

import NotificationsStore from "@business-logic/NotificationsStore"
import Close24 from "@components/Close24"

import classes from "./NotificationsPopup.module.styl"

const NotificationsPopup: FC = observer(() => {
    const notificationsStore = useInjection<NotificationsStore>(NotificationsStore)

    if (notificationsStore.list.length === 0) {
        return null
    }

    return <ul className={ classes.list }>
        {
            notificationsStore.list.map(notification => <li
                key={ notification.id }
                className={ classNames(classes.notification, classes[notification.type]) }
            >
                { notification.text }
                <span className={ classes.iconContainer } onClick={ () => notificationsStore.removeById(notification.id) }>
                    <Close24 />
                </span>
            </li>)
        }
    </ul>
})

export default NotificationsPopup
