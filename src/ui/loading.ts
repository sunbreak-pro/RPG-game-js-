// ローディング表示・非表示を管理する関数

// loadingエリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const loadingArea = document.getElementById("loading-area") as HTMLElement;
const loadingTittle = document.getElementById("loading-tittle") as HTMLElement;

const loadingScreen = {
    show(progressShowCall: () => void) {
        loadingTittle.animate([
            { opacity: 0, transform: 'translateY(-10rem)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 1000,
            easing: "ease",
            fill: "forwards",
        }).onfinish = () => {
            progressShowCall(); // ← アニメーション完了後に呼ぶ！
        };
    },
    loading(progressLoadCall: () => void) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 3;
            if (progress > 100) {
                clearInterval(interval);
                progressLoadCall(); // ← resolveを呼び出す
                return;
            }
            const gradient = `linear-gradient(to right, red 0%, red ${progress}%, #a5a5a5 ${progress}%, #a5a5a5 100%)`;
            loadingTittle.style.backgroundImage = gradient;
        }, 50);
    },
    end() {
        loadingTittle.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(10rem)' }
        ],
            {
                duration: 1000,
                easing: "ease",
                fill: "forwards",
            });

        setTimeout(() => {
            loadingArea.animate({
                opacity: [1, 0],
                visibility: "hidden",
            },
                {
                    duration: 1000,
                    easing: "ease",
                    fill: "forwards",
                })
        }, 500)
        const mainContent = document.getElementById("main-content") as HTMLElement;
        mainContent.style.display = "block";
    }
};

// 非同期処理を行う関数の例（fetch APIでデータ取得）
async function loadData() {
    try {
        // 下だとうまくいかない理由としては、Promise.allは平行処理として使われるため、順番に処理するような動作には適さない
        // await Promise.all([ 
        //     (async () => {
        //         await new Promise<void>(resolve => loadingScreen.show(resolve));
        //     })(),
        //     (async () => {
        //         await new Promise<void>(resolve => loadingScreen.loading(resolve));
        //     })(),
        // ]);
        // 下なら、awaitが正常に働き順番に処理される
        await new Promise<void>(resolve => loadingScreen.show(resolve));
        await new Promise<void>(resolve => loadingScreen.loading(resolve));

        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
    } finally {
        loadingScreen.end(); // 処理が完了したらローディングを非表示
    }
}

// ページ読み込み時に非同期処理を開始
document.addEventListener('DOMContentLoaded', () => {
    loadingArea.style.display = "flex"
    loadData()
});
