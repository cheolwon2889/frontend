import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const AnchorSimulation = () => {
  const mountRef = useRef(null); // 컴포넌트를 렌더링할 DOM 요소

  useEffect(() => {
    // 씬, 카메라, 렌더러 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 700 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(700, window.innerHeight); // 렌더러의 크기를 700px로 설정
    mountRef.current.appendChild(renderer.domElement);

    // 기본적인 선박 모델 (박스로 설정)
    const geometry = new THREE.BoxGeometry(3, 1, 1); // 선박의 크기
    const material = new THREE.MeshBasicMaterial({ color: 0x808080 }); // 선박 색상 회색
    const ship = new THREE.Mesh(geometry, material);
    scene.add(ship);

    // 카메라 위치 설정
    camera.position.z = 5;

    // 파도 만들기 (파도의 크기를 줄이기 위해 크기 수정)
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 256, 256); // 세그먼트 수를 256으로 설정하여 파도를 세밀하게 그리지만 크기 자체는 줄임
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0x00bfff,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = -Math.PI / 2; // 수면을 수평으로
    scene.add(wave);

    // 파도 애니메이션을 위한 position 데이터를 BufferAttribute로 설정
    const positions = wave.geometry.attributes.position.array;

    // OrbitControls 설정 (카메라 드래그 제어)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // 부드러운 드래그
    controls.dampingFactor = 0.1;  // 드래그 속도 설정
    controls.screenSpacePanning = false;  // 수평 및 수직 팬을 비활성화

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);

      // 파도 애니메이션 (BufferGeometry를 사용하여 Z 값 변경)
      const time = Date.now() * 0.001;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(positions[i] * 0.1 + time * 2) * 0.1; // 파도의 높이를 조정
      }
      wave.geometry.attributes.position.needsUpdate = true; // geometry 업데이트 필요

      // 파도에 따른 선박 출렁임
      const waveHeight = Math.sin(time * 2) * 0.1; // 파도의 높이에 따른 값
      ship.rotation.x = waveHeight * 0.5; // 선박의 기울어짐 (X축)

      // 파도 높이에 따른 선박의 위치 변경 (배가 파도에 맞춰 위아래로 움직임)
      const shipHeight = Math.sin(time * 0.1 + ship.position.x * 0.1) * 0.2; // 파도에 맞춰 배가 위아래로 이동
      ship.position.y = waveHeight * 0.9; // 배의 위치를 파도 높이의 90%로 조정

      // 카메라 드래그 효과를 반영
      controls.update();  // 카메라 제어 업데이트

      renderer.render(scene, camera);
    };

    animate();

    // 윈도우 크기 변경 시 렌더러와 카메라 비율 업데이트
    const onResize = () => {
      camera.aspect = 700 / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(700, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      // 컴포넌트가 unmount 될 때 이벤트 리스너와 렌더러 제거
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />; // three.js 장면이 렌더링될 div
};

export default AnchorSimulation;
