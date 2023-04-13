import { createRoot } from "react-dom/client"
import { configure } from "mobx"

import RootStoreProvider from "@services/components/RootStoreProvider"
import App from "@components/App/App"

/**
 *
 * Разрешаем изменять state напрямую, без создания actions
 */
configure({
    enforceActions: "never"
})

const root = createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <RootStoreProvider>
        <App />
    </RootStoreProvider>
)
