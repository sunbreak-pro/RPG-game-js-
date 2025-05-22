import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { Item } from "./item";
// import { Skill } from "@/battle/skill";
import { getCurrentPlayer } from "./battleState";
import { Player } from "./character";
const battleArea = document.querySelector(".battle-area") as HTMLElement;
const gameOverDisplay = document.getElementById("game-over") as HTMLElement;
const gameResetBtn = document.getElementById("game-reset") as HTMLButtonElement | null;

export const saveGame = async (data: SaveData) => {
  if (!data.playerName) {
    console.warn("プレイヤー名が空です。セーブをスキップします。");
    return;
  }

  try {
    const userDoc = doc(db, "saves", data.playerName);
    await setDoc(userDoc, data);
    console.log(`[セーブ成功] ${data.playerName} のデータを保存しました。`);
  } catch (e) {
    console.error("セーブ失敗:", e);
  } finally {
    window.location.href = "safezone.html";
  }
};


export function gameOver(): void {
  battleArea.style.display = "none";
  gameOverDisplay.style.display = "block";
  const currentPlayer = getCurrentPlayer() as Player;

  const saveData: SaveData = {
    playerName: currentPlayer.name,
    hp: currentPlayer.hp,
    mp: currentPlayer.mp,
    inventory: currentPlayer.inventory,
    // skills: currentPlayer.skills,
    // currentStage: getCurrentStage(),
  };
  if (gameResetBtn) {
    gameResetBtn.addEventListener("click", () => {
      window.location.href = "safezone.html";
    });
  }
  saveGame(saveData);

}
export interface SaveData {
  playerName: string;
  hp: number;
  mp: number;
  inventory: Item[];
  // skills: Skill[];
  // currentStage: number;
}

