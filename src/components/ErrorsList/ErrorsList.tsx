import {FC} from "react"

import Error24 from "@components/Error24"

import classes from "./ErrorsList.module.styl"

interface ErrorsListProps {
    errors: string[];
}

const ErrorsList: FC<ErrorsListProps> = ({errors}) => {
    return <ul className={classes.list}>
        {
            errors.map(error => <li key={error} className={classes.element}>
                <Error24 />
                <span className={classes.text}>{error}</span>
            </li>)
        }
    </ul>
}

export default ErrorsList
