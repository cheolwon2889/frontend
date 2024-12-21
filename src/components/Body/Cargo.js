import '../../global.css';

function Cargo() {
    return(
        <div class='body'>
            <div class='mainBox'>
                <div class='boxTitle'>적재 안내</div>
                <div class='boxContent'>
                    3D 시뮬레이션 배치
                    <div class='boxContentMenu'>
                        <p>ex)</p>
                        <p>적재순서 1~10 만 보기</p>
                        <p>출하순서 1~10 만 보기</p>
                        <p>거제항 적재/출하 완료시점 보기</p>
                        <p>부산항 적재/출하 완료시점 보기</p>

                    </div>
                </div>
            </div>
            <div class='colBox'>
                <div class='boxTitle'>적재 화물</div>
                <div class='boxContent'>적재할 화물 금액, 무게, 내릴곳 등 데이터 배치</div>
            </div>
            <div class='colBox'>
                <div class='boxTitle'>적재 안내</div>
                <div class='boxContent'>어떻게 싣는지 구체적으로 순서대로 나열</div>
            </div>
            <div class='colBox'>
                <div class='boxTitle'>출하 안내</div>
                <div class='boxContent'>어떻게 내리는지 구체적으로 순서대로 나열</div>
            </div>

        </div>
    );
}

export default Cargo;