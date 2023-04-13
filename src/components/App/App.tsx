import {FC} from "react"
import {observer} from "mobx-react"

import useRootStore from "@services/hooks/useRootStore"

const App: FC = observer(() => {
    const { feedbackStore } = useRootStore()

    return <div>
        <form>
            <input onChange={evt => feedbackStore.name = evt.target.value} value={feedbackStore.name} />
            <input onChange={evt => feedbackStore.email = evt.target.value} value={feedbackStore.email} />
            <input onChange={evt => feedbackStore.message = evt.target.value} value={feedbackStore.message} />
        </form>
    </div>
})

export default App
