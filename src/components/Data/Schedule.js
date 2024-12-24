import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Schedule(){

    const [data, setData] = useState([]); // data와 setData를 useState로 초기화합니다.
  
    useEffect(() => {
      axios.get('http://localhost:8080/schedule') // Spring Boot API 호출
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
        <p>{JSON.stringify(data) || '데이터를 불러오는 중입니다...'}</p>
      </div>
    );
  }

export default Schedule;