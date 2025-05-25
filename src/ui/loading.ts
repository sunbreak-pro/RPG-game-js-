// loading.ts

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
            progressShowCall();
        };
    },
    loading(progressLoadCall: () => void) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 3;
            if (progress > 100) {
                clearInterval(interval);
                progressLoadCall();
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
        ], {
            duration: 1000,
            easing: "ease",
            fill: "forwards",
        });

        setTimeout(() => {
            loadingArea.animate({
                opacity: [1, 0],
                visibility: "hidden",
            }, {
                duration: 1000,
                easing: "ease",
                fill: "forwards",
            });
        }, 500);
        const mainContent = document.getElementById("main-content") as HTMLElement;
        mainContent.style.display = "block";
    }
};

export async function loadData() {
    try {
        await new Promise<void>(resolve => loadingScreen.show(resolve));
        await new Promise<void>(resolve => loadingScreen.loading(resolve));
        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
    } finally {
        loadingScreen.end();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadingArea.style.display = "flex";
    console.log("ロード開始");
    loadData();
});
