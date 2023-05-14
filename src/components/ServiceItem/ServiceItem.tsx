import Service from "@models/Service";

import styles from "./ServiceItem.module.styl"

const ServiceItem = (props: {service: Service}) => {
    return <div className={styles.serviceItem}>
        <h2 className={styles.title}>{props.service.title}</h2>
        <p className={styles.description}>{props.service.description}</p>
        <ul className={styles.content}>
            {props.service.subclauses.map(subclause => <li className={styles.subclause} key={subclause.id}>{subclause.content}</li>)}
        </ul>
    </div>
};

export default ServiceItem;