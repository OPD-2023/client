import {FC} from "react"
import {observer} from "mobx-react"

import ErrorsList from "@components/ErrorsList/ErrorsList"
import useRootStore from "@services/hooks/useRootStore"

import classes from "./FeedbackForm.module.styl"

const FeedbackForm: FC = observer(() => {
    const { feedbackStore } = useRootStore()

    // TODO: Добавить в плейсхолдеры фейковые данные
    return <form className={classes.form}>
        <label className={classes.label}>
            Имя:
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
            Email:
            <input type="text"
                   value={feedbackStore.email}
                   onChange={evt => feedbackStore.email = evt.target.value}
                   className={classes.field}
                   placeholder="Ваш email" />
            {
                !!feedbackStore.emailErrors.length && <ErrorsList errors={feedbackStore.emailErrors} />
            }
        </label>
        <label className={classes.label}>
            Сообщение:
            <textarea className={classes.field}
                      placeholder="Сообщение"
                      onChange={evt => feedbackStore.message = evt.target.value}>
                {feedbackStore.message}
            </textarea>
            {
                !!feedbackStore.messageErrors.length && <ErrorsList errors={feedbackStore.messageErrors} />
            }
        </label>
    </form>
})

export default FeedbackForm
