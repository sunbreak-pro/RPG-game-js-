// manage/turnController.ts
import {
  defaultAttackBtn,
  toggleArea,
  nextStageBtn,
  // itemArea,
  // equipItemArea,
  skillArea,
} from "../main";
import { clearBttleLogs, logMessage, turnLog } from "../ui/logMessage";

let turnCount = 1;
let playerTurnDone = false;
let enemyTurnDone = false;
let turnProcessed = false;
let skillUsed = false;
let turnFinished = true;

export function markPlayerTurnDone(): void {
  playerTurnDone = true;
}

export function markEnemyTurnDone(): void {
  enemyTurnDone = true;
}

export function markSkillUsed(): void {
  if (!skillUsed) {
    skillUsed = true;
    proceedTurn();
  }
}

export function startTurn(): void {
  if (!turnFinished) return;
  if (nextStageBtn.style.display === "") return;
  clearBttleLogs();
  skillArea.style.display = "none";
  toggleArea.style.display = "none";
  defaultAttackBtn.style.display = "none";
  playerTurnDone = false;
  enemyTurnDone = false;
  skillUsed = false;
  turnProcessed = false;
  turnFinished = false;
  turnLog(`--- ${turnCount}ターン目 ---`);
}

export function proceedTurn(): void {
  if (playerTurnDone && enemyTurnDone && !turnProcessed) {
    turnFinished = true;
    turnProcessed = true;
    turnCount++;
    setTimeout(() => {
      skillArea.style.display = "block";
      skillArea.style.marginInline = "auto";
      toggleArea.style.display = "block";
      toggleArea.style.display = "flex";
      toggleArea.style.marginInline = "auto";
      defaultAttackBtn.style.display = "block";
      defaultAttackBtn.style.marginInline = "auto";
      logMessage(`${turnCount}ターン目が終了…`, "次の行動を選べ");
    }, 1000);
  }
}
export function resetTurn(): void {
  turnCount = 1;
}

export function getTurnCount(): number {
  return turnCount;
}
