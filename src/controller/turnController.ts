// manage/turnController.ts
import { toggleArea } from "../main";
import { clearBttleLogs, logMessage, turnLog } from "../ui/logMessage";
import { getStageContext } from "./battleStateController";


let turnCount = 1;
let playerTurnDone = false;
let enemyTurnDone = false;
let turnProcessed = false;
let skillUsed = false;
let turnFinished = true;

export function markPlayerTurnDone(): void {
  playerTurnDone = true;
  proceedTurn();
}

export function markEnemyTurnDone(): void {
  enemyTurnDone = true;
  proceedTurn();

}

export function markSkillUsed(): void {
  if (!skillUsed) {
    skillUsed = true;
    proceedTurn();
  }
}

export function startTurn(): void {
  if (!turnFinished) return;
  const {
    defaultAttackBtn,
    skillArea,
    nextStageBtn,
  } = getStageContext();
  if (nextStageBtn.style.display === "") return;
  clearBttleLogs();
  skillArea.style.opacity = "0";
  toggleArea.style.opacity = "0";
  defaultAttackBtn.style.opacity = "0";
  playerTurnDone = false;
  enemyTurnDone = false;
  skillUsed = false;
  turnProcessed = false;
  turnFinished = false;
  turnLog(`--- ${turnCount}ターン目 ---`);
}

export function proceedTurn(): void {
  if (playerTurnDone && enemyTurnDone && !turnProcessed) {
    const {
      defaultAttackBtn,
      skillArea,
    } = getStageContext();
    turnFinished = true;
    turnProcessed = true;
    turnCount++;
    setTimeout(() => {
      skillArea.style.opacity = "1";
      skillArea.style.marginInline = "auto";
      toggleArea.style.opacity = "1";
      toggleArea.style.marginInline = "auto";
      defaultAttackBtn.style.opacity = "1";
      defaultAttackBtn.style.marginInline = "auto";
      logMessage(`${turnCount - 1}ターン目が終了…`, "次の行動を選べ");
    }, 1800);
  }
}
export function resetTurn(): void {
  turnCount = 1;
}

export function getTurnCount(): number {
  return turnCount;
}
