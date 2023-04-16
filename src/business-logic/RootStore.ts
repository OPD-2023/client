import FeedbackStore from "@business-logic/FeedbackStore"
import ProductsSearchStore from "@business-logic/ProductsSearchStore"
import GroupsCatalogStore from "@business-logic/GroupsCatalogStore"

export default class RootStore {
    constructor(public readonly feedbackStore: FeedbackStore,
                public readonly productsSearchStore: ProductsSearchStore,
                public readonly groupsCatalogStore: GroupsCatalogStore) {
    }
}
