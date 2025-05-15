// saveAndLoad.ts - TypeScript対応
import { getCurrentPlayer } from "./battleState";
const battleArea = document.querySelector(".battle-area");
const gameOverDisplay = document.getElementById("game-over");
const gameResetBtn = document.getElementById("game-reset");
export function gameOver() {
    battleArea.style.display = "none";
    gameOverDisplay.style.display = "";
    function saveAfterBattle() {
        const player = getCurrentPlayer();
        const saveData = {
            name: player.name,
            job: player.className,
            inventory: player.inventory,
        };
        localStorage.setItem("saveData", JSON.stringify(saveData));
    }
    if (gameResetBtn) {
        gameResetBtn.addEventListener("click", () => {
            window.location.href = "safezone.html";
        });
    }
}
export function handleGameReset() {
    // リセット処理があればここに追加
}
