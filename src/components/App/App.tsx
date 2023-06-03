import {FC, useEffect} from "react"
import {useInjection} from "inversify-react"
import {observer} from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog"
import ProductCard from "@components/ProductCard/ProductCard"
import FeedbackForm from "@components/FeedbackForm/FeedbackForm"
import Product from "@models/Product"
import Footer from "@components/Footer/Footer"
import Notification from "@models/Notification"
import NotificationsStore from "@business-logic/NotificationsStore"
import NotificationType from "@models/NotificationType"

import classes from "./App.module.styl"

const product: Product = {
    article: "Артикул: 302-4SS",
    title: "ЦЕНТРАТОР НАРУЖНЫЙ С ГИДРОДОМКРАТОМ",
    price: 182300,
    currency: "руб",
    imageURL: "https://static.overlay-tech.com/assets/7016dd7e-66d0-43a1-9870-b95fec2e2d24.png",
    rating: 4
};

const App: FC = observer(() => {
    const notificationsStore = useInjection<NotificationsStore>(NotificationsStore)

    useEffect(() => {
        const notifications: Notification[] = [
            {
                type: NotificationType.INFO,
                id: _.uniqueId(),
                text: "1337",
                lifetime: 10_000
            },
            {
                type: NotificationType.INFO,
                id: _.uniqueId(),
                text: "adnwlkdnawd",
                lifetime: 20_000
            },
            {
                type: NotificationType.ERROR,
                id: _.uniqueId(),
                text: "awdalwdmlamwdlakwdawdawdawdawdawdawda",
                lifetime: 1_000 * 60
            }
        ]
        notificationsStore.append(
            ...notifications.map(notification => ({...notification, id: _.uniqueId()})),
            ...notifications.map(notification => ({...notification, id: _.uniqueId()})),
            ...notifications.map(notification => ({...notification, id: _.uniqueId()})),
            ...notifications.map(notification => ({...notification, id: _.uniqueId()}))
        )
    }, [])

    return <main>
        <Container className={classes.application}>
            <GroupsCatalog />
            <ProductsSearch />
        </Container>
        <ProductCard product={ product } />
        <FeedbackForm />
        <Footer />
    </main>
})

export default App
