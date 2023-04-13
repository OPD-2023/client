import FeedbackStore from "@business-logic/FeedbackStore"

export default class RootStore {
    constructor(public feedbackStore: FeedbackStore) {
    }
}
