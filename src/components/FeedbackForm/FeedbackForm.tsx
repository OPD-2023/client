import {FC, RefObject} from "react"
import {observer} from "mobx-react"
import {useInjection} from "inversify-react"

import ErrorsList from "@components/ErrorsList/ErrorsList"
import FeedbackStore from "@business-logic/FeedbackStore"
import L10n from "@services/l10n"

import classes from "./FeedbackForm.module.styl"

interface FeedbackFormProps {
    messageBlockRef?: RefObject<HTMLLabelElement>;
}

const FeedbackForm: FC<FeedbackFormProps> = observer(({messageBlockRef}) => {
    const feedbackStore = useInjection<FeedbackStore>(FeedbackStore)
    const l10n = useInjection<L10n>(L10n)

    // TODO: Добавить в плейсхолдеры фейковые данные
    return <form className={classes.form}>
        <label className={classes.label}>
            {l10n.currentPackage.name}:
            <input type="text"
                   value={feedbackStore.name}
                   onChange={evt => feedbackStore.name = evt.target.value}
                   className={classes.field}
                   placeholder="Ваше имя" />
            {
                !!feedbackStore.nameErrors.length && <ErrorsList errors={feedbackStore.nameErrors} />
            }
        </label>
        <label className={classes.label}>
            {l10n.currentPackage.email}:
            <input type="text"
                   value={feedbackStore.email}
                   onChange={evt => feedbackStore.email = evt.target.value}
                   className={classes.field}
                   placeholder="Ваш email" />
            {
                !!feedbackStore.emailErrors.length && <ErrorsList errors={feedbackStore.emailErrors} />
            }
        </label>
        <label className={classes.label} ref={ messageBlockRef }>
            {l10n.currentPackage.message}:
            <textarea className={classes.field}
                      placeholder="Сообщение"
                      onChange={evt => feedbackStore.message = evt.target.value}
                      value={ feedbackStore.message } />
            {
                !!feedbackStore.messageErrors.length && <ErrorsList errors={feedbackStore.messageErrors} />
            }
        </label>
    </form>
})

export default FeedbackForm
