import Direction from "@models/Direction";

import styles from "./Direction.module.styl"

const data: Direction[] = [
    {
        id: 1,
        text: "Оборудование для очистки труб"
    },
    {
        id: 2,
        text: "Оборудование для изоляции труб"
    },
    {
        id: 3,
        text: "Запасные части и детали"
    },
    {
        id: 4,
        text: "Оборудование для ремонта трубопроводов и труб"
    }
]

const Directions = () => {
    return <div className={styles.directions}>
        {
            data.map(direction => <div className={styles.directionItem} key={direction.id}>{direction.text}</div>)
        }
    </div>
};

export default Directions;