import { createRoot } from "react-dom/client"
import { configure } from "mobx"
import { Provider as DIContainerProvider } from "inversify-react"

import App from "@components/App/App"
import container from "@inversify-config"

import "./index.css"

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
    <DIContainerProvider container={ container }>
        <App />
    </DIContainerProvider>
)
