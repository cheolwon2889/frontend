import styles from './Footer.module.css';

function Footer() {
    return(
        <div className={styles.footerWrap}>
            <div>
                <img src="/img/sotec_footer.png"></img>
            </div>
            <div className={styles.infos}>
                <div className={styles.info}>본사 : 경남 거제시 장평3로 75(장평동) 삼성사우매장 뒤 설계지원센터 2관 / Tel : 055-630-8723</div>
                <div className={styles.info}>Copyrights 2012 SOTEC. All right reserved.</div>
            </div>
        </div>


    ); 
    
}

export default Footer;