import {useInjection} from "inversify-react";
import {useEffect} from "react";
import {observer} from "mobx-react";

import AboutCompanyStore from "@business-logic/AboutCompanyStore";

import styles from "./Partners.module.styl"

const Partners = observer(() => {
    const aboutCompanyPageStore = useInjection<AboutCompanyStore>(AboutCompanyStore)

    useEffect(() => {
        aboutCompanyPageStore.fetchPartners()
    }, [])

    return <div className={styles.partners}>
        <h2 className={styles.title}>Наши партнёры:</h2>
        <ul className={styles.partnersContainer}>
            {
                !aboutCompanyPageStore.arePartnersLoading
                &&
                aboutCompanyPageStore.partners.map(partner =>
                    <li key={partner.id} className={styles.partnerItem}>{partner.name}</li>
                )
            }
        </ul>
    </div>
});

export default Partners;