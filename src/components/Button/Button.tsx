import { FC, HTMLAttributes } from "react"
import classNames from "classnames"

import classes from "./Button.module.styl"

export const enum ButtonType {
    PRIMARY = "__primary"
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    subType?: ButtonType;
    rounded?: boolean;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
    subType = ButtonType.PRIMARY,
    rounded = false,
    className,
    ...props
}) => {
    const buttonClass: string = classNames(
        className,
        classes.button,
        classes[subType],
        {
            [classes.__rounded]: rounded
        }
    )

    return <button {...props} className={ buttonClass } />
}

export default Button
