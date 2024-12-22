import React, { useState } from "react";
import Port from './Port.js';
import styles from './DockSimulation.module.css';

function DockSimulation() {
    const [scale, setScale] = useState(1); // 확대 비율
    const [translate, setTranslate] = useState({ x: 0, y: 0 }); // div 이동 위치
    const [dragStart, setDragStart] = useState(null); // 드래그 시작 위치

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
            ? Math.min(scale + zoomStep, maxScale) // 휠 위로: 확대
            : Math.max(scale - zoomStep, minScale); // 휠 아래로: 축소

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
            if (!currentTarget) return; // currentTarget이 null인 경우 리턴
    
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

    const clamp = (value, min, max) => Math.max(min, Math.min(value, max)); // 값 제한 함수

    return (
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
                <Port portId={1} />
            </div>
            <div className={`${styles.dock} ${styles.d2}`}>
                <Port portId={2} />
                <Port portId={3} />
                <Port portId={4} />
            </div>
            <div className={`${styles.dock} ${styles.d3}`}>
                <Port portId={5} />
                <Port portId={6} />
                <Port portId={7} />
            </div>
            <div className={`${styles.dock} ${styles.d4}`}>
                <Port portId={8} />
            </div>
            <div className={`${styles.dock} ${styles.d5}`}>
                <Port portId={9} />
            </div>
            <div className={`${styles.dock} ${styles.d6}`}>
                <Port portId={10} />
                <Port portId={11} />
                <Port portId={12} />
                <Port portId={13} />
                <Port portId={14} />
            </div>
            <div className={`${styles.dock} ${styles.d7}`}>
                <Port portId={15} />
                <Port portId={16} />
                <Port portId={17} />
            </div>
            <div className={`${styles.dock} ${styles.d8}`}>
                <Port portId={18} />
                <Port portId={19} />
            </div>
            <div className={`${styles.dock} ${styles.d9}`}>
                <Port portId={20} />
                <Port portId={21} />
                <Port portId={22} />
            </div>
            <div className={`${styles.dock} ${styles.d10}`}>
                <Port portId={23} />
                <Port portId={24} />
            </div>
            <div className={`${styles.dock} ${styles.d11}`}>
                <Port portId={25} />
                <Port portId={26} />
                <Port portId={27} />
                <Port portId={28} />
            </div>

            
        </div>
    );
}

export default DockSimulation;
