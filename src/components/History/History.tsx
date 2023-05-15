import {useInjection} from "inversify-react";
import {FC, useEffect} from "react";
import {observer} from "mobx-react";

import HistoryItem from "@components/HistoryItem/HistoryItem";
import AboutCompanyStore from "@business-logic/AboutCompanyStore";

import styles from "./History.module.styl"

const History: FC = observer(() => {
    const aboutCompanyPageStore = useInjection<AboutCompanyStore>(AboutCompanyStore)

    useEffect(() => {
        aboutCompanyPageStore.fetchHistory()
    }, [])

    return <div className={styles.history}>
        {
            !aboutCompanyPageStore.isHistoryDataLoading
            &&
            aboutCompanyPageStore.historyData.map(historyItem => <HistoryItem key={historyItem.id} historyItem={historyItem}/>)
        }
    </div>
});

export default History;