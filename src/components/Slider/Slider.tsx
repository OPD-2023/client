import { ReactElement, Children, useState, useCallback, useEffect } from "react"
import classNames from "classnames"

import ArrowLeft from "@components/ArrowLeft"

import classes from "./Slider.module.styl"

interface SliderProps<T> {
    children: ReactElement<T>[];
}

const Slider = <T,>({children}: SliderProps<T>): ReactElement | null => {
    const elementsCount = Children.count(children)

    const [containerOffset, setContainerOffset] = useState<number>(0)
    const [elementWidth, setElementWidth] = useState<number | null>(null)
    const [containerMaxOffset, setContainerMaxOffset] = useState<number | null>(null)

    const wrapperRefCallback = useCallback((wrapper: HTMLDivElement): void => {
        setElementWidth(wrapper.scrollWidth / elementsCount)
        setContainerMaxOffset(wrapper.scrollWidth - wrapper.clientWidth)
    }, [elementsCount])

    useEffect(() => {
        console.log(elementWidth)
    }, [elementWidth])

    const setContainerOffsetSafely = (offset: number): void => {
        if (containerMaxOffset) {
            setContainerOffset(Math.max(0, Math.min(offset, containerMaxOffset)))
        }
    }

    return <div className={ classes.wrapper } ref={ wrapperRefCallback }>
        <button className={ classNames(classes.arrow, classes.__left) } disabled={ containerOffset === 0 }>
            <ArrowLeft />
        </button>
        <div className={ classes.container } style={{ transform: `translateX(${- containerOffset})` }}>
            { children }
        </div>
        <button
            className={ classNames(classes.arrow, classes.__right) }
            disabled={ containerOffset >= containerMaxOffset! }
            onClick={ () => setContainerOffsetSafely(containerOffset + elementWidth!) }
        >
            <ArrowLeft />
        </button>
    </div>
}

export default Slider
