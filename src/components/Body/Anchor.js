import AnchorSimulation from '../Data/AnchorSimulation.js';
import '../../global.css';

// function Anchor(data){
//     if(data == null){
//         Anchored();
//     }else{
//         WillAnchor();
//     }
// }

function Anchor() {
    return(
        <div class='body'>
            <div class='mainBox'>
                <div class='boxTitle'>선체 상태</div>
                <div class='boxContent'>
                    <AnchorSimulation />

                </div>
            </div>
            <div class='colAppendBox'>
                <div class='boxTitle'>상세 상태</div>
                <div class='boxContent'>각도, 안전도 등 수치데이터(과거현재미래)표시</div>
            </div>
            <div class='colBox'>
                <div class='boxTitle'>안전도</div>
                <div class='boxContent'>출항시까지 예상 안전도</div>
                <div class='boxContent'>출항시까지 예상 기상정보</div>
            </div>
            <div class='maxFlex box col'>
                <div class='boxTitle'>출항 안내</div>
                <div class='boxContent'>출항 시점 기상정보 및 남은시간, 참고사항 안내</div>
            </div>
        </div>
    );
}

function WillAnchor() {
    return(
        <div class='body'>
            <div class='colBox'>
                <div class='boxTitle'>선착장 일정</div>
                <div class='boxContent'>선착장 전체 입출항 일정 배치</div>
            </div>
            <div class='mainBox'>
                <div class='boxTitle'>선착장 정보</div>
                <div class='boxContent'>선착장 현황 시뮬레이션 배치</div>
                <div class='boxFooter'>선착장 구체적 정보(위치 등) 배치</div>
            </div>
            <div class='colAppendBox'>
                <div class='boxTitle'>나의 일정</div>
                <div class='boxContent'>본인 입출항 일정 배치</div>
            </div>

            <div class='maxFlex col'>

                    <div class='maxFlex box'>
                        <div class='boxTitle'>입항 안내</div>
                        <div class='boxContent'>포트, 노트, 거리, 입항예정시각 예상도착시각, 앵커정보(장력, 길이, 무게 등)</div>
                    </div>
                  
            </div>
        </div>
    );
}

export default Anchor;