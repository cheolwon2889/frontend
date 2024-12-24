import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Port from './Port.js';
import PortInfo from './PortInfo.js';
import styles from './DockSimulation.module.css';

function DockSimulation() {
    const [scale, setScale] = useState(1); // 확대 비율
    const [translate, setTranslate] = useState({ x: 0, y: 0 }); // div 이동 위치
    const [dragStart, setDragStart] = useState(null); // 드래그 시작 위치
    const [portInfo, setPortInfo] = useState(null); // 현재 마우스가 올라간 포트 정보 상태

    const [data, setData] = useState([]); // data와 setData를 useState로 초기화합니다.
  
    useEffect(() => {
      axios.get('http://localhost:8080/port') // Spring Boot API 호출
        .then(response => {
          setData(response.data); // 문자열로 반환된 데이터를 상태에 저장
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const handleWheel = (event) => {
        event.preventDefault(); // 기본 스크롤 동작 방지
        const zoomStep = 0.1; // 확대 단계
        const maxScale = 3; // 최대 확대 배율
        const minScale = 1; // 최소 확대 배율

        const { offsetX, offsetY } = event.nativeEvent;
        const rect = event.currentTarget.getBoundingClientRect(); // 부모 div의 현재 위치와 크기
        const x = (offsetX - rect.width / 2 - translate.x) / scale;
        const y = (offsetY - rect.height / 2 - translate.y) / scale;

        const newScale = event.deltaY < 0
            ? Math.min(scale + zoomStep, maxScale)
            : Math.max(scale - zoomStep, minScale);

        if (newScale !== scale) {
            const newTranslate = {
                x: clamp(
                    translate.x - x * (newScale - scale),
                    -(newScale - 1) * rect.width / 2,
                    (newScale - 1) * rect.width / 2
                ),
                y: clamp(
                    translate.y - y * (newScale - scale),
                    -(newScale - 1) * rect.height / 2,
                    (newScale - 1) * rect.height / 2
                ),
            };
            setTranslate(newTranslate);
            setScale(newScale);
        }
    };

    const handleMouseDown = (event) => {
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
        if (dragStart) {
            const currentTarget = event.currentTarget;
            if (!currentTarget) return;
    
            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            setDragStart({ x: event.clientX, y: event.clientY });
    
            setTranslate((prev) => {
                const newTranslate = {
                    x: clamp(
                        prev.x + dx,
                        -(scale - 1) * currentTarget.clientWidth / 2,
                        (scale - 1) * currentTarget.clientWidth / 2
                    ),
                    y: clamp(
                        prev.y + dy,
                        -(scale - 1) * currentTarget.clientHeight / 2,
                        (scale - 1) * currentTarget.clientHeight / 2
                    ),
                };
                return newTranslate;
            });
        }
    };

    const handleMouseUp = () => {
        setDragStart(null);
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

    const handlePortMouseEnter = (portId) => {
        setPortInfo(portId);
    };

    return (
        <div>
            <div className={styles.portInfo}>
                {portInfo ? <PortInfo portId={portInfo} /> : <div>가장 가까운 일정 정보</div>}
            </div>
            <div
                className={styles.dockContainer}
                style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, // 부모 div에 transform 적용
                    cursor: dragStart ? "grabbing" : "grab",
                    transition: dragStart ? "none" : "transform 0.2s ease-out", // 드래그 시에는 전환 없애기
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img
                    src="/img/dock.png"
                    alt="Dock"
                    draggable="false"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />
                <div className={`${styles.dock} ${styles.d1}`}>
                    <Port portId={1} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d2}`}>
                    <Port portId={2} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={3} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={4} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d3}`}>
                    <Port portId={5} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={6} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={7} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d4}`}>
                    <Port portId={8} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d5}`}>
                    <Port portId={9} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d6}`}>
                    <Port portId={10} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={11} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={12} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={13} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={14} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d7}`}>
                    <Port portId={15} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={16} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={17} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d8}`}>
                    <Port portId={18} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={19} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d9}`}>
                    <Port portId={20} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={21} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={22} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d10}`}>
                    <Port portId={23} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={24} onMouseEnter={handlePortMouseEnter}/>
                </div>
                <div className={`${styles.dock} ${styles.d11}`}>
                    <Port portId={25} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={26} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={27} onMouseEnter={handlePortMouseEnter}/>
                    <Port portId={28} onMouseEnter={handlePortMouseEnter}/>
                </div>
            </div>
        </div>
    );
}

export default DockSimulation;
