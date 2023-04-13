import {FC, ReactNode} from "react"

import RootStoreContext from "@services/components/RootStoreContext"
import rootStore from "@services/root.store"

interface RootStoreProviderProps {
    children: ReactNode;
}

const RootStoreProvider: FC<RootStoreProviderProps> = ({children}) => (
    <RootStoreContext.Provider value={rootStore}>
        { children }
    </RootStoreContext.Provider>
)

export default RootStoreProvider
