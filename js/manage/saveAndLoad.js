import { battleArea, battleLogArea } from "../main.js"
const gameOverDisplay = document.getElementById("game-over-display")
const gameResetBtn = document.getElementById("game-reset")

export function gameOver(){
    battleArea.style.display = "none";
    gameOverDisplay.style.display = "";
    battleLogArea.style.display = "none"
    function saveAfterBattle() {
    const player = getCurrentPlayer();
    const saveData = {
    name: player.name,
    job: player.job,
    inventory: player.inventory, // ← 獲得したアイテムも含む
  };
  localStorage.setItem("saveData", JSON.stringify(saveData));
}};
if (gameResetBtn) {
  gameResetBtn.addEventListener("click", () => {
    window.location.href = "safezone.html";
  });
}
export function handleGameReset(){
  
}
