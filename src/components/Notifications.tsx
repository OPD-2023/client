import { createPortal } from "react-dom"
import { observer }  from "mobx-react"
import type { FC } from "react"

import NotificationsPopup from "@components/NotificationsPopup/NotificationsPopup"

const Notifications: FC = observer(() => {
    return createPortal(
        <NotificationsPopup />,
        document.getElementById("notifications") as HTMLElement
    )
})

export default Notifications
