import Partner from "@models/Partner";

import styles from "./Partners.module.styl"

const data: Partner[] = [
    {
        id: 1,
        name: "ОАО «Газпром»"
    },
    {
        id: 2,
        name: "ОАО «Мосэнерго»"
    },
    {
        id: 3,
        name: "ОАО «Стройтрансгаз»"
    },
    {
        id: 4,
        name: "ОАО «Камешковский механический завод»"
    },
    {
        id: 5,
        name: "ОАО «Кропоткинский машиностроительный завод»"
    }
]

const Partners = () => {
    return <div className={styles.partners}>
        <h2 className={styles.title}>Наши партнёры:</h2>
        <ul className={styles.partnersContainer}>
            {data.map(partner => <li key={partner.id} className={styles.partnerItem}>{partner.name}</li>)}
        </ul>
    </div>
};

export default Partners;