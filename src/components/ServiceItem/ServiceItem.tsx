import Service from "@models/Service";

import styles from "./ServiceItem.module.styl"

const ServiceItem = (props: { service: Service }) => {
    return <div className={styles.serviceItem}>
        <h2 className={styles.title}>{props.service.title}</h2>
        <p className={styles.description}>{props.service.description}</p>
        <ul className={styles.content}>
            {
                props.service.sub_services.map(
                    subservice =>
                        <li className={styles.subclause} key={subservice.id}>{subservice.description}</li>
                )
            }
        </ul>
    </div>
};

export default ServiceItem;