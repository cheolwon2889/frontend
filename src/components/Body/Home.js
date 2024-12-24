import HBChart from '../Data/HBChart.js';
import '../../global.css';
import BarChart from '../Data/BarChart.js';
import DockSimulation from '../Data/DockSimulation.js';
import Weather from '../Data/Weather.js';
import Schedule from '../Data/Schedule.js';

function Home() {
    const schedule = [
        { id: 1, shipName: "ship1", arrival: "2024-12-01 12:00", departure: "2024-12-03 17:00", isArrived: true },
        { id: 2, shipName: "ship2", arrival: "2024-12-02 15:00", departure: "2024-12-04 01:00", isArrived: false }
      ];

    return(
        <div class='body'>
            <div class='mainBox'>
                <div class='boxTitle'>정박 현황</div>
                <div class='boxContent'>
                    <DockSimulation />
                </div>
            </div>
            <div class='colBox'>
                <div class='boxTitle'>입출항 일정</div>
                <div class='boxContent'>
                    <Schedule />

                {schedule.map((item) => (
                    item.isArrived ? (
                        <div key={item.id} className='infoCell departure'>
                          {item.shipName} (출항: {item.departure})
                        </div>
                      ) : (
                        <div key={item.id} className='infoCell arrival'>
                          {item.shipName} (입항: {item.arrival})
                        </div>
                      )
                ))}


                </div>
            </div>

            <div class='maxFlex col'>
                <div class='rowBox row'>
                    <div class='maxFlex box'>
                        <div class='boxTitle'>정박 상태</div>
                        <div class='boxContent'>
                            <HBChart />
                        </div>
                    </div>
                    <div class='maxFlex box'>
                        <div class='boxTitle'>주변 상태</div>
                        <div class='boxContent'>
                            <BarChart />
                        </div>
                    </div>
                </div>
                <div class='maxFlex box col'>
                    <div class='boxTitle'>기상 정보</div>
                    <div class='boxContent'>
                        <Weather />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;