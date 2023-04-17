import {FC, HTMLAttributes} from "react"
import classNames from "classnames"

import classes from "./Container.module.css"

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => {
    return <div className={classNames(classes.limiter, className)} {...props} />
}

export default Container
