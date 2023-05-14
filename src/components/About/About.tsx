import styles from "./About.module.styl"
import workerImage from "./worker.png"

const About = () => {
    return <div className={styles.about}>
        <div className={styles.description}>
            <h2>Сфера деятельности</h2>
            <p>
                Разработка и изготовление оборудования для строительства,
                эксплуатации и ремонта магистральных нефтегазопроводов и
                объектов топливно-энергетического комплекса.
            </p>
        </div>
        <img src={workerImage} alt="Сварщик"/>
    </div>
}

export default About