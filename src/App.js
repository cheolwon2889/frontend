import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Body/Home';
import Anchor from './components/Body/Anchor';
import Cargo from './components/Body/Cargo';


function Api(){

  const [data, setData] = useState(''); // data와 setData를 useState로 초기화합니다.

  useEffect(() => {
    axios.get('http://localhost:8080/api') // Spring Boot API 호출
      .then(response => {
        setData(response.data); // 문자열로 반환된 데이터를 상태에 저장
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <h1>API 데이터</h1>
      {/* 받은 데이터가 있을 경우 표시 */}
      <p>{data || '데이터를 불러오는 중입니다...'}</p>
    </div>
  );
}

function Weather(){

  const [data, setData] = useState([]); // data와 setData를 useState로 초기화합니다.

  useEffect(() => {
    axios.get('http://localhost:8080/api') // Spring Boot API 호출
      .then(response => {
        setData(response.data); // 문자열로 반환된 데이터를 상태에 저장
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <h1>API 데이터</h1>
      {/* 받은 데이터가 있을 경우 표시 */}
      <p>{data || '데이터를 불러오는 중입니다...'}</p>
    </div>
  );
}

function App() {
    return (
      <Router>
        <Header />
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/cargo" element={<Cargo />} />
          <Route path="/anchor" element={<Anchor />} />
        </Routes>
        <Footer />
      </Router>
    );
}

export default App;
