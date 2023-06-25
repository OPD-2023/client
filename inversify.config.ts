import { Container } from "inversify"

import type ApiClientConfig from "@models/ApiClientConfig"
import type L10nConfig from "@models/L10nConfig"
import type L10nPackages from "@models/L10nPackages"
import DIContainerToken from "@models/DIContainerToken"
import GroupsCatalogStore from "@business-logic/GroupsCatalogStore"
import ProductsSearchStore from "@business-logic/ProductsSearchStore"
import FeedbackStore from "@business-logic/FeedbackStore"
import ProductPageStore from "@business-logic/ProductPageStore"
import NotificationsStore from "@business-logic/NotificationsStore"
import ApiClient from "@services/api.client"
import L10n from "@services/l10n"
import appConfig from "@app-config"
import l10nPackages from "@l10n-packages"

const container = new Container()

container.bind<ApiClientConfig>(DIContainerToken.API_CLIENT_CONFIG).toConstantValue(appConfig as ApiClientConfig)
container.bind<L10nConfig>(DIContainerToken.L10N_CONFIG).toConstantValue(appConfig as L10nConfig)
container.bind<L10nPackages>(DIContainerToken.L10N_PACKAGES).toConstantValue(l10nPackages)
container.bind<ApiClient>(ApiClient).toSelf().inSingletonScope()
container.bind<L10n>(L10n).toSelf().inSingletonScope()
container.bind<GroupsCatalogStore>(GroupsCatalogStore).toSelf().inSingletonScope()
container.bind<ProductsSearchStore>(ProductsSearchStore).toSelf().inSingletonScope()
container.bind<FeedbackStore>(FeedbackStore).toSelf().inSingletonScope()
container.bind<ProductPageStore>(ProductPageStore).toSelf().inSingletonScope()
container.bind<NotificationsStore>(NotificationsStore).toSelf().inSingletonScope()

export default container
