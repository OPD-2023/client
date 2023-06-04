import {FC, useEffect} from "react"
import {useInjection} from "inversify-react"
import {observer} from "mobx-react"

import ProductsSearch from "@components/ProductsSearch/ProductsSearch"
import Container from "@components/Container/Container"
import GroupsCatalog from "@components/GroupsCatalog/GroupsCatalog"
import FeedbackForm from "@components/FeedbackForm/FeedbackForm"
import Product from "@models/Product"
import Footer from "@components/Footer/Footer"
import Notification from "@models/Notification"
import NotificationsStore from "@business-logic/NotificationsStore"
import NotificationType from "@models/NotificationType"
import ProductCard from "@components/ProductCard/ProductCard";
import Slider from "@components/Slider/Slider";

import classes from "./App.module.styl"

const product: Product = {
    article: 123123,
    title: "Центратор наружный с гидродомкратом",
    price: 182300,
    currency: "руб",
    imagesUrls: [
        "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
        "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
        "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg",
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863"
    ],
    rating: 4,
    characteristics: {},
    descriptionParagraphs: []
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
            ...notifications
        )
    }, [])

    return <main>
        <Container className={classes.application}>
            <GroupsCatalog />
            <ProductsSearch />
        </Container>
        <Container>
            <Slider>
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ {...product, imagesUrls: product.imagesUrls.slice(0, 3) } } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
                <ProductCard product={ product } />
            </Slider>
        </Container>
        <FeedbackForm />
        <Footer />
    </main>
})

export default App
