import FeedbackStore from "@business-logic/FeedbackStore"
import ProductsSearchStore from "@business-logic/ProductsSearchStore"

export default class RootStore {
    constructor(public readonly feedbackStore: FeedbackStore,
                public readonly productsSearchStore: ProductsSearchStore) {
    }
}
