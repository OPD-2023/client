import { FC } from 'react'

import classes from "./RatingIcon.module.styl"

interface RatingIconProps {
    filled: boolean;
}

const RatingIcon: FC<RatingIconProps> = ({ filled }) => {
    return (
        <span
            className={ `${classes.star} ${filled ? classes.filled : ''}` }
        >
            &#9733; {/* HTML-код символа звезды (★) */ }
        </span>
    )
}

export default RatingIcon
