import '../../global.css';
import ShipContainerSimulation from './ShipContainerSimulation';


function Cargo() {
    return(
        <div className='body'>
            <div className='mainBox'>
                <div className='boxTitle'>적재 안내</div>
                <div className='boxContent'>
                    <ShipContainerSimulation />
                    <div className='boxContentMenu'>
                        <p>ex)</p>
                        <p>적재순서 1~10 만 보기</p>
                        <p>출하순서 1~10 만 보기</p>
                        <p>거제항 적재/출하 완료시점 보기</p>
                        <p>부산항 적재/출하 완료시점 보기</p>

                    </div>
                </div>
            </div>
            <div className='colBox'>
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
            </div>

        </div>
    );
}

export default Cargo;