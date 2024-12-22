import styles from './DockSimulation.module.css';
import React, { useState } from 'react';
import PortInfo from './PortInfo.js';

function Port({portId,onMouseEnter}) {
    return (
        <div
            className={styles.port}
            onMouseEnter={() => onMouseEnter(portId)} 
        >
            Port {portId}
        </div>
    );
}

export default Port;
