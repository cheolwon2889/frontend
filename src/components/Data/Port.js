import styles from './DockSimulation.module.css';
import React, { useState } from 'react';

function Port({ portId }) {
    const [isHovered, setIsHovered] = useState(false); // 마우스 오버 상태 관리

    const handleMouseEnter = () => {
        setIsHovered(true); // 마우스를 올리면 상세 정보 표시
    };

    const handleMouseLeave = () => {
        setIsHovered(false); // 마우스를 내리면 상세 정보 숨기기
    };

    return (
        <div
            className={styles.port}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            Port {portId}
            {isHovered && (
                <div className={styles.portInfo}>
                    Port {portId} Detail
                    <p>Additional information about Port {portId}.</p>
                </div>
            )}
        </div>
    );
}

export default Port;
