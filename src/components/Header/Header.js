import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import '../../global.css';

function Header() {
    return( 
        <nav>
            <div className={styles.headerWrap}>
                <div className={styles.smMenusWrap}>
                    <div>홈</div>
                    <div>/</div>
                    <div>로그인</div>
                </div>
                <div className={styles.mdMenusWrap}>
                    <div className={styles.logo}>
                        <img src="/img/somanship.png"></img>
                    </div>
                    
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => isActive ? `${styles.mdMenu} active` : styles.mdMenu}
                    >
                        HOME
                    </NavLink>
                    <NavLink 
                        to="/anchor" 
                        className={({ isActive }) => isActive ? `${styles.mdMenu} active` : styles.mdMenu}
                    >
                        ANCHOR
                    </NavLink>
                    <NavLink 
                        to="/cargo" 
                        className={({ isActive }) => isActive ? `${styles.mdMenu} active` : styles.mdMenu}
                    >
                        CARGO
                    </NavLink>
                    
                </div>
            </div>

        </nav>
    );
}

export default Header;