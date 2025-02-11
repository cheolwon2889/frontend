import '../../global.css';
import ShipContainerSimulation from './ShipContainerSimulation';
import styles from './Cargo.module.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const portData = {
    "Busan": [10.6, 11.6, 11.1, 11.0, 24.5, 23.8, 10.8, 10.7, 10.6, 10.6],
    "Shanghai": [12.9, 12.9, 25.8, 25.5, 12.9, 12.9, 12.7, 10.3, 9.9, 16.6],
    "Singapore": [16.4, 15.5, 27.1, 26.9, 14.6, 14.5, 14.3, 10.0, 8.8, 19.3],
    "Rotterdam": [19.2, 19.1, 27.8, 27.3, 18.8, 18.4, 18.4, 9.7, 7.2, 22.5],
    "Los Angeles": [22.3, 21.7, 29.2, 29.0, 21.6, 21.4, 21.3, 7.4, 6.0, 23.6]
};

// 항구별 총 컨테이너 무게 데이터
const totalWeightByPort = Object.keys(portData).map(port => ({
    port,
    totalWeight: portData[port].reduce((sum, weight) => sum + weight, 0)
}));

const portBarChartData = {
    labels: totalWeightByPort.map(data => data.port),
    datasets: [{
        label: "항구별 총 컨테이너 무게",
        data: totalWeightByPort.map(data => data.totalWeight),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    }]
};

// 컨테이너 무게 분포 데이터
const allWeights = Object.values(portData).flat();
const weightBins = Array.from({ length: 5 }, (_, i) => i * 10); // 0~10, 10~20, 20~30, ...

const weightCounts = weightBins.map((minWeight, i) => ({
    range: `${minWeight}~${minWeight + 10}`,
    count: allWeights.filter(weight => weight >= minWeight && weight < (minWeight + 10)).length
}));

const weightHistogramData = {
    labels: weightCounts.map(data => data.range),
    datasets: [{
        label: "컨테이너 무게 분포",
        data: weightCounts.map(data => data.count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }]
};


function Cargo() {
    return(
        <div className='body'>
            <div className='mainBox'>
                <div className='boxTitle'>적재 안내</div>
                <div className='boxContent'>
                    <ShipContainerSimulation />
                    {/* <div className='boxContentMenu'>
                        <p>ex)</p>
                        <p>적재순서 1~10 만 보기</p>
                        <p>출하순서 1~10 만 보기</p>
                        <p>거제항 적재/출하 완료시점 보기</p>
                        <p>부산항 적재/출하 완료시점 보기</p>

                    </div> */}
                </div>
            </div>
            {/* <div className='colBox'>
                <div className='boxTitle'>적재 화물</div>
                <div className='boxContent'>적재할 화물 금액, 무게, 내릴곳 등 데이터 배치</div>
            </div>
            <div className='colBox'>
                <div className='boxTitle'>적재 안내</div>
                <div className='boxContent'>어떻게 싣는지 구체적으로 순서대로 나열</div>
            </div>
            <div className='colBox'>
                <div className='boxTitle'>출하 안내</div>
                <div className='boxContent'>어떻게 내리는지 구체적으로 순서대로 나열</div>
            </div> */}
            <div>
                <div className={styles.rowChart}>
                    <div className='boxTitle'>항구별 총 컨테이너 무게</div>
                    <div className={styles.chartContent}>
                        <Bar data={portBarChartData} options={{ responsive: true }} />
                    </div>
                </div>
                <div className={styles.rowChart}>
                    <div className='boxTitle'>컨테이너 무게 분포</div>
                    <div className={styles.chartContent}>
                        <Bar data={weightHistogramData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cargo;