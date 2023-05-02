import React from 'react';

import classes from "./Footer.module.styl"
import Container from "@components/Container/Container";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container className={classes.outer}>
                <h1 className={classes.title}>ООО “ГАЗСТРОЙМАШИНА”</h1>
                <div className={classes.container}>
                    <div className={classes.info}>
                        <h2 className={classes.heading}>Почтовый Адрес</h2>
                        <p className={classes.text}>
                            195196, Россия,г. Санкт-Петербург, ул. Таллинская, д. 7a
                        </p>
                    </div>
                    <div className={classes.info}>
                        <h2 className={classes.heading}>Телефон/факс</h2>
                        <p className={classes.text}>
                            +7 (812) 444-60-63, 444-60-62
                        </p>
                    </div>
                    <div className={classes.info}>
                        <h2 className={classes.heading}>E-mail</h2>
                        <a href="mailto:gazmashina@peterlink.ru" className={classes.link}>gazmashina@peterlink.ru</a>
                        <a href="mailto:gazstroymashina@rambler.ru" className={classes.link}>gazstroymashina@rambler.ru</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;