import {FC, useRef} from "react"
import { observer } from "mobx-react"
import { useInjection } from "inversify-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog"
import FeedbackForm from "@components/FeedbackForm/FeedbackForm"
import ProductPage from "@components/ProductPage/ProductPage"
import FeedbackStore from "@business-logic/FeedbackStore"

import classes from "./App.module.styl"

const App: FC = observer(() => {
    const feedbackMessageBlockRef = useRef<HTMLLabelElement>(null)

    const feedbackStore  = useInjection<FeedbackStore>(FeedbackStore);

    const onProductPageAdd = (payload: string) => {
        // TODO: Добавить action append (например)
        feedbackStore.message += payload
        if (feedbackMessageBlockRef.current) {
            feedbackMessageBlockRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return <main>
        <Container className={classes.application}>
            <GroupsCatalog />
            <ProductsSearch />
        </Container>
        <FeedbackForm messageBlockRef={ feedbackMessageBlockRef } />
        <ProductPage productId={0} onAdd={ onProductPageAdd } />
    </main>
})

export default App
