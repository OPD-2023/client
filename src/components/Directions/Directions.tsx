import {useInjection} from "inversify-react";
import {observer} from "mobx-react";
import {FC, useEffect} from "react";

import AboutCompanyStore from "@business-logic/AboutCompanyStore";

import styles from "./Direction.module.styl"

const Directions: FC = observer (() => {
    const aboutCompanyPageStore = useInjection<AboutCompanyStore>(AboutCompanyStore)

    useEffect(() => {
        aboutCompanyPageStore.fetchDirections()
    }, [])

    return <div className={styles.directions}>
        {
            !aboutCompanyPageStore.areDirectionsLoading
            &&
            aboutCompanyPageStore.directions.map(direction =>
                <div className={styles.directionItem} key={direction.id}>
                    {direction.description}
                </div>
            )
        }
    </div>
})

export default Directions