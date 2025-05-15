// saveAndLoad.ts - TypeScript対応

import { getCurrentPlayer } from "./battleState";
import type { Player } from "./character";

const battleArea = document.querySelector(".battle-area") as HTMLElement;
const gameOverDisplay = document.getElementById("game-over") as HTMLElement;
const gameResetBtn = document.getElementById("game-reset") as HTMLButtonElement | null;

export function gameOver(): void {
  battleArea.style.display = "none";
  gameOverDisplay.style.display = "";

  saveAfterBattle();

  if (gameResetBtn) {
    gameResetBtn.addEventListener("click", () => {
      window.location.href = "safezone.html";
    });
  }
}

export function handleGameReset(): void {
  // リセット処理があればここに追加
}
function saveAfterBattle(): void {
  const player = getCurrentPlayer() as Player;
  const saveData = {
    name: player.name,
    job: player.className,
    inventory: player.inventory,
  };
  localStorage.setItem("saveData", JSON.stringify(saveData));
}