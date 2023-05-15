import HistoryData, {Status} from "@models/HistoryData";

import styles from "./HistoryItem.module.styl"

const HistoryItem = (props: { historyItem: HistoryData }) => {
    return <div className={styles.historyItem}>
        <p>{props.historyItem.description}</p>
        {
            props.historyItem.image_path
            &&
            <img
                className={
                    [
                        styles.photo,
                        (props.historyItem.status == Status.LEFT ? styles.left : styles.right)
                    ].join(" ")
                }
                src={props.historyItem.image_path}
                alt={"История"}
            />
        }
    </div>
};

export default HistoryItem;