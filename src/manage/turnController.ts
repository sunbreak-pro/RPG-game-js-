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
  
  export function markPlayerTurnDone(): void {
    playerTurnDone = true;
    proceedTurn();
  }
  
  export function markEnemyTurnDone(): void {
    enemyTurnDone = true;
    proceedTurn();
  }
  
  export function markSkillUsed(): void {
    if(!skillUsed){
      skillUsed = true;
      proceedTurn();
    }
  }
  
  export function startTurn(): void {
    if (nextStageBtn.style.display === "") return;
    clearBttleLogs();
    skillArea.style.display = "none"
    toggleArea.style.display = "none";
    defaultAttackBtn.style.display = "none";
    playerTurnDone = false;
    enemyTurnDone = false;
    skillUsed = false;
    turnProcessed = false;
    turnLog(`--- ${turnCount}ターン目 ---`);
  }
  
  export function proceedTurn(): void {
    if (playerTurnDone && enemyTurnDone && !turnProcessed) {
      turnProcessed = true;
      turnCount++;
      setTimeout(() => {
        skillArea.style.display = "block"
        skillArea.style.marginInline = "auto"
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
  