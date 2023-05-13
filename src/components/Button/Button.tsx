import { FC, HTMLAttributes } from "react"
import classNames from "classnames"

import classes from "./Button.module.styl"

export const enum ButtonType {
    PRIMARY = "__primary"
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    subType?: ButtonType;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({subType = ButtonType.PRIMARY, className, ...props}) => {
    const buttonClass: string = classNames(className, classes.button, classes[subType])

    return <button {...props} className={ buttonClass } />
}

export default Button
