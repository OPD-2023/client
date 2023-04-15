import RootStore from "@business-logic/RootStore"
import feedbackStore from "@services/feedback.store"
import productsSearchStore from "@services/productsSearch.store"

export default new RootStore(feedbackStore, productsSearchStore)
