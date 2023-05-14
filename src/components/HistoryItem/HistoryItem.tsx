import HistoryData, {Status} from "@models/HistoryData";

import styles from "./HistoryItem.module.styl"

const HistoryItem = (props: { historyItem: HistoryData }) => {
    return <div className={styles.historyItem}>
        <p>{props.historyItem.description}</p>
        {
            props.historyItem.imagePath
            &&
            <img
                className={
                    [
                        styles.photo,
                        (props.historyItem.status == Status.LEFT ? styles.left : styles.right)
                    ].join(" ")
                }
                src={props.historyItem.imagePath}
                alt={"История"}
            />
        }
    </div>
};

export default HistoryItem;