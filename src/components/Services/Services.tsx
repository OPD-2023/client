import ServiceItem from "@components/ServiceItem/ServiceItem";

import styles from "./Services.module.styl"
import {useInjection} from "inversify-react";
import AboutCompanyStore from "@business-logic/AboutCompanyStore";
import {useEffect} from "react";
import {observer} from "mobx-react";

const Services = observer(() => {
    const aboutCompanyPageStore = useInjection<AboutCompanyStore>(AboutCompanyStore)

    useEffect(() => {
        aboutCompanyPageStore.fetchServices()
    }, [])

    return <div className={styles.services}>
        {
            !aboutCompanyPageStore.areServicesLoading
            &&
            aboutCompanyPageStore.services.map(service => <ServiceItem key={service.id} service={service}/>)
        }
    </div>
});

export default Services;