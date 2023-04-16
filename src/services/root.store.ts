import RootStore from "@business-logic/RootStore"
import feedbackStore from "@services/feedback.store"
import productsSearchStore from "@services/productsSearch.store"
import groupsCatalogStore from "@services/groupsCatalog.store"

export default new RootStore(feedbackStore, productsSearchStore, groupsCatalogStore)
