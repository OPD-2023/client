import {Children, FC, ReactElement, useRef, useState} from "react"
import classNames from "classnames"

import ArrowHorizontal from "@components/ArrowHorizontal"

import classes from "./Slider.module.styl"

interface SliderProps {
    children: ReactElement | ReactElement[]
}

const Slider: FC<SliderProps> = ({children}) => {
    const sliderRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [wrapperOffset, setWrapperOffset] = useState<number>(0)

    const childrenCount = Children.count(children)

    const changeOffsetTo = (side: boolean) => {
        const childWidth = wrapperRef.current!.scrollWidth / childrenCount

        setWrapperOffset(Math.max(
            0,
            Math.min(
                wrapperOffset + (side ? childWidth : -childWidth),
                wrapperRef.current!.scrollWidth - sliderRef.current!.offsetWidth
            )
        ))
    }

    return <div ref={ sliderRef } className={ classes.slider }>
        <button
            type="button"
            className={ classNames(classes.arrow, classes.__left) }
            onClick={ () => changeOffsetTo(false) }
        >
            <ArrowHorizontal />
        </button>
        <button
            type="button"
            className={ classNames(classes.arrow, classes.__right) }
            onClick={ () => changeOffsetTo(true) }
        >
            <ArrowHorizontal />
        </button>
        <div ref={ wrapperRef } style={ { transform: `translateX(${- wrapperOffset}px)` } } className={ classes.wrapper }>
            { children }
        </div>
    </div>
}

export default Slider
