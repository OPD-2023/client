import { Container } from "inversify"

import ApiClientConfig from "@models/ApiClientConfig"
import DIContainerToken from "@models/DIContainerToken"
import GroupsCatalogStore from "@business-logic/GroupsCatalogStore"
import ProductsSearchStore from "@business-logic/ProductsSearchStore"
import FeedbackStore from "@business-logic/FeedbackStore"
import ProductPageStore from "@business-logic/ProductPageStore"
import NotificationsStore from "@business-logic/NotificationsStore"
import ApiClient from "@api/client"
import appConfig from "@app-config"

const container = new Container()

container.bind<ApiClientConfig>(DIContainerToken.API_CLIENT_CONFIG).toConstantValue(appConfig as ApiClientConfig)
container.bind<ApiClient>(ApiClient).toSelf().inSingletonScope()
container.bind<GroupsCatalogStore>(GroupsCatalogStore).toSelf().inSingletonScope()
container.bind<ProductsSearchStore>(ProductsSearchStore).toSelf().inSingletonScope()
container.bind<FeedbackStore>(FeedbackStore).toSelf().inSingletonScope()
container.bind<ProductPageStore>(ProductPageStore).toSelf().inSingletonScope()
container.bind<NotificationsStore>(NotificationsStore).toSelf().inSingletonScope()

export default container
