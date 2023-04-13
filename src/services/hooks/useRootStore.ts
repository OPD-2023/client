import {useContext} from "react"

import RootStore from "@business-logic/RootStore"
import RootStoreContext from "@services/components/RootStoreContext"

const useRootStore = (): RootStore => useContext(RootStoreContext)

export default useRootStore
