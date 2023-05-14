import About from "@components/About/About";
import Directions from "@components/Directions/Directions";
import Services from "@components/Services/Services";
import History from "@components/History/History";
import Partners from "@components/Partners/Partners";

import styles from "./AboutCompanyPage.module.styl"

const AboutCompanyPage = () => {
    return <div className={styles.container}>
        <h2 className={styles.title}>О Компании</h2>
        <About/>
        <h2 className={styles.title}>Основные направления деятельности</h2>
        <Directions/>
        <h2 className={styles.title}>Услуги</h2>
        <Services/>
        <h2 className={styles.title}>История компании</h2>
        <History/>
        <h2 className={styles.motto}>Девиз компании: Наши возможности - к Вашим услугам!</h2>
        <Partners/>
    </div>
}

export default AboutCompanyPage