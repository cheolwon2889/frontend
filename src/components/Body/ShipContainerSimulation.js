import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ShipContainerSimulation = () => {
    const mountRef = useRef(null);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [selectedMesh, setSelectedMesh] = useState(null);

    useEffect(() => {
        // 장면(scene) 생성
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb); // 하늘색 배경 설정

        // 카메라 생성
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(200, 200, 200); // 더 큰 맵에 맞게 카메라 위치 조정

        // 렌더러 생성
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // 궤도 컨트롤 추가
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 감속 효과 활성화

        // 그리드 헬퍼 추가 (기준선)
        const gridHelper = new THREE.GridHelper(2000, 400); // 그리드 크기 2배 확대
        scene.add(gridHelper);

        // 선박 단면 모양 정의
        const shipShape = new THREE.Shape();
        shipShape.moveTo(-200, 0); // 상단 평평한 부분 시작
        shipShape.lineTo(200, 10); // 상단 평평한 부분 끝
        shipShape.quadraticCurveTo(100, -60, 0, -80); // 곡선 하단 중앙으로 이동
        shipShape.quadraticCurveTo(-200, -60, -200, 0); // 곡선 다시 시작점으로


        

        // 선박 3D 형태 생성
        const extrudeSettings = { depth: 70, bevelEnabled: false };
        const shipGeometry = new THREE.ExtrudeGeometry(shipShape, extrudeSettings);

        shipGeometry.scale(2.5, 1, 5); // x, y 방향으로 확대, 깊이는 유지
        const shipMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // 갈색 선박 재질
        const ship = new THREE.Mesh(shipGeometry, shipMaterial);
        ship.rotation.x = -Math.PI / 360; // 수평으로 회전
        ship.position.set(0,0,-370);
        ship.position.y = 50; // 바닥에서 약간 띄운 위치
        scene.add(ship);

        // 뱃머리 추가
        const bowShape = new THREE.Shape();
        bowShape.moveTo(0, 0); // 뱃머리 중앙
        bowShape.lineTo(0, 10); // 오른쪽 끝
        bowShape.lineTo(-50, 0); // 왼쪽 끝
        bowShape.lineTo(0, 0); // 닫힌 삼각형

        const bowGeometry = new THREE.ExtrudeGeometry(bowShape, { depth: 20, bevelEnabled: false });
        const bowMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // 선박과 동일한 색상
        const bow = new THREE.Mesh(bowGeometry, bowMaterial);
        bow.rotation.x = Math.PI / 2; // 뱃머리 회전
        bow.position.set(-150, 12, -40); // 뱃머리 위치 설정
        scene.add(bow);

        // 배 옆의 평평한 바닥 추가
        const floorGeometry = new THREE.PlaneGeometry(1500, 500);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }); // 회색 바닥 재질
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2; // 평평하게 회전
        floor.position.set(0, 2, 280); // 바닥 위치를 옆으로 이동
        scene.add(floor);

        // 파란색 크레인 추가
        const craneMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // 파란색 재질

        // 크레인 지지 구조
        const supportGeometry = new THREE.BoxGeometry(10, 185, 10);
        const support1 = new THREE.Mesh(supportGeometry, craneMaterial);
        support1.position.set(25, 95, 100);
        support1.rotation.y = Math.PI / 2; // 90도 회전
        scene.add(support1);

        const support3 = new THREE.Mesh(supportGeometry, craneMaterial);
        support3.position.set(-25, 95, 100);
        support3.rotation.y = Math.PI / 2; // 90도 회전
        scene.add(support3);

        const supportGeometry2 = new THREE.BoxGeometry(10, 100, 10);
        const support2 = new THREE.Mesh(supportGeometry2, craneMaterial);
        support2.position.set(25, 50, 200);
        support2.rotation.y = Math.PI / 2; // 90도 회전
        scene.add(support2);

        const support4 = new THREE.Mesh(supportGeometry2, craneMaterial);
        support4.position.set(-25, 50, 200);
        support4.rotation.y = Math.PI / 2; // 90도 회전
        scene.add(support4);

        // 크레인 상단 레일
        const railGeometry = new THREE.BoxGeometry(300, 10, 10);
        const rail = new THREE.Mesh(railGeometry, craneMaterial);
        rail.position.set(-25, 105, 100);
        rail.rotation.y = Math.PI / 2; // 45도 회전
        scene.add(rail);

        // 추가 상단 레일
        const rail2Geometry = new THREE.BoxGeometry(300, 10, 10);
        const rail2 = new THREE.Mesh(rail2Geometry, craneMaterial);
        rail2.position.set(25, 105, 100);
        rail2.rotation.y = Math.PI / 2; // 90도 회전
        scene.add(rail2);

       // 추가 상단 레일 4개
       const rail3 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 10), craneMaterial);
       rail3.position.set(0, 105, 100);
       rail3.rotation.y = Math.PI; // 90도 회전
       scene.add(rail3);

       const rail4 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 10), craneMaterial);
       rail4.position.set(0, 105, 200);
       rail4.rotation.y = Math.PI ; // 90도 회전
       scene.add(rail4);

       const rail5 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 10), craneMaterial);
       rail5.position.set(0, 105, 245);
       rail5.rotation.y = Math.PI; // 90도 회전
       scene.add(rail5);

       const rail6 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 10), craneMaterial);
       rail6.position.set(0, 105, -45);
       rail6.rotation.y = Math.PI ; // 90도 회전
       scene.add(rail6);

       const rail7 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 10), craneMaterial);
       rail7.position.set(0, 105, 150);
       rail7.rotation.y = Math.PI ; // 90도 회전
       scene.add(rail7);

       const rail8 = new THREE.Mesh(new THREE.BoxGeometry(60, 10, 10), craneMaterial);
       rail8.position.set(0, 150, 100);
       rail8.rotation.y = Math.PI ; // 90도 회전
       scene.add(rail8);

       const rail9 = new THREE.Mesh(new THREE.BoxGeometry(60, 10, 10), craneMaterial);
       rail9.position.set(0, 185, 100);
       rail9.rotation.y = Math.PI ; // 90도 회전
       scene.add(rail9);

       // 대각선
       const rail10 = new THREE.Mesh(new THREE.BoxGeometry(130, 10, 10), craneMaterial);
       rail10.position.set(-25, 145, 150);
       rail10.rotation.y = Math.PI/ 2 ; // 90도 회전
       rail10.rotation.x = Math.PI/ 5 ; // 45도 회전
       scene.add(rail10);

       const rail11 = new THREE.Mesh(new THREE.BoxGeometry(130, 10, 10), craneMaterial);
       rail11.position.set(25, 145, 150);
       rail11.rotation.y = Math.PI / 2; // 90도 회전
       rail11.rotation.x = Math.PI/ 5 ; // 45도 회전
       scene.add(rail11);

        // 크레인 이동식 부품
        const moverGeometry = new THREE.BoxGeometry(30, 20, 20);
        const mover = new THREE.Mesh(moverGeometry, craneMaterial);
        mover.position.set(0, 95, 150);
        mover.rotation.y = Math.PI / 2; // 45도 회전
        scene.add(mover);

         // Raycaster 및 마우스 벡터 추가 (클릭 이벤트 처리)
         const raycaster = new THREE.Raycaster();
         const mouse = new THREE.Vector2();

        // // 컨테이너 추가
        // const fallingContainerGeometry = new THREE.BoxGeometry(20, 10, 10);
        // const fallingContainerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 }); // 주황색 컨테이너 재질
        // const fallingContainer = new THREE.Mesh(fallingContainerGeometry, fallingContainerMaterial);
        // fallingContainer.position.set(0, 200, 100); // 하늘에서 시작
        // scene.add(fallingContainer);

        // const containers = []; // 쌓인 컨테이너 관리
        // const maxContainers = 20; // 최대 컨테이너 수 제한
        // const dropSpeed = 1;

        // const dropContainer = () => {
        //     if (fallingContainer.position.y > 40 + containers.length * 12) {
        //         fallingContainer.position.y -= dropSpeed;
        //         requestAnimationFrame(dropContainer);
        //     } else if (containers.length < maxContainers) { 
        //         fallingContainer.position.y = 40 + containers.length * 12; // 새로운 층에 위치 고정
        //         const stackedContainer = fallingContainer.clone();
        //         containers.push(stackedContainer);
        //         scene.add(stackedContainer);
        //         fallingContainer.position.set(0, 150, 100); // 새로운 컨테이너 초기화
        //         requestAnimationFrame(dropContainer); // 다음 컨테이너 드롭 시작
        //     }
        // };
        // dropContainer();

        // 컨테이너 리스트
        const containers = [];
        const containerSize = { width: 40, height: 20, depth: 20 };
        const containerOffset = 6;

        // 서버에서 컨테이너 데이터 가져오기 (axios 사용)
        axios.get('http://localhost:8080/testContainer')
            .then(response => {
                console.log("서버 응답 데이터 : ", response.data);
                let row = 0;
                let column = 0;
                let layer = 0;

                response.data.flat().forEach((container, index) => {
                    const x = (column % 10) * (containerSize.width + containerOffset) - 200;
                    const z = row * (containerSize.depth + containerOffset) - 300;
                    const y = 70 + layer * (containerSize.height + containerOffset);
                    
                    column++;
                    if (column % 10 === 0) {
                        row++;
                        if (row % 10 === 0) {
                            layer++;
                            row = 0;
                        }
                    }

                    const containerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 });
                    const containerGeometry = new THREE.BoxGeometry(
                        containerSize.width,
                        containerSize.height,
                        containerSize.depth
                    );
                    const containerMesh = new THREE.Mesh(containerGeometry, containerMaterial);
                    containerMesh.position.set(x, y, z);
                    containerMesh.userData = container; // 컨테이너 데이터 저장
                    scene.add(containerMesh);
                    containers.push(containerMesh);
                });
            })
            .catch(error => console.error('Error fetching container data:', error));

            const onClick = (event) => {
                const rect = renderer.domElement.getBoundingClientRect(); // 캔버스 크기 가져오기
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(containers, true); // 모든 하위 오브젝트 감지
            
            
                
    if (intersects.length > 0) {
        const clickedContainer = intersects[0].object;

        // 기존 선택된 컨테이너 색상 복원
        if (selectedMesh && selectedMesh !== clickedContainer) {
            selectedMesh.material.color.set(0xff4500);
        }

        // 새로운 컨테이너 색상 변경
        clickedContainer.material.color.set(0x00ff00);

        // 상태 업데이트
        setSelectedMesh(clickedContainer);
        setSelectedContainer(clickedContainer.userData);
    }
            };
        window.addEventListener('click', onClick);

        // 장면에 조명 추가
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 주변광
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 방향광
        directionalLight.position.set(20, 40, 20);
        scene.add(directionalLight);

        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // 궤도 컨트롤 업데이트
            renderer.render(scene, camera);
        };
        animate();

        // 창 크기 변경 처리
        const handleResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 제거될 때 리소스 정리
         return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', onClick);
        };
    }, []);

   return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
            {selectedContainer && (
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'
                }}>
                    <h3>컨테이너 정보</h3>
                    <p><strong>항구:</strong> {selectedContainer.Port}</p>
                    <p><strong>무게:</strong> {selectedContainer.Weight} 톤</p>
                </div>
            )}
        </div>
    );
};

export default ShipContainerSimulation;
