// manage/turnController.js
import { defaultAttackBtn, toggleArea, nextStageBtn } from "../main.js";
import { clearBttleLogs, logMessage, turnLog } from "../ui/logMessage.js";
import { getCurrentPlayer } from "./battleState.js";
let turnCount = 1;
let playerTurnDone = false;
let enemyTurnDone = false;
let skillUsed = false;
let turnProcessed = false;



export function markPlayerTurnDone() {
    playerTurnDone = true;
    proceedTurn();
}

export function markEnemyTurnDone() {
    enemyTurnDone = true;
    proceedTurn();
}

export function markSkillUsed() {
    skillUsed = true;
}

export function startTurn() {
    if(nextStageBtn.style.display === "") return;
    clearBttleLogs();
    toggleArea.style.display = "none"
    defaultAttackBtn.style.display = "none"
    playerTurnDone = false;
    enemyTurnDone = false;
    skillUsed = false;
    turnProcessed = false;
    turnLog(`--- ${turnCount}ターン目 ---`);
}

export function proceedTurn() {
    const player = getCurrentPlayer();
    if(player.hp <= 0) return;
    else if (playerTurnDone && enemyTurnDone && !turnProcessed) {
        turnProcessed = true;  // ここで1回だけ通す
        turnCount++;
        setTimeout(() => {
            defaultAttackBtn.style.display = "";
            toggleArea.style.display = "";
            logMessage(`${turnCount}ターン目が終了… 次の行動を選べ。`);
        }, 1000);
    }
}
export function resetTurn(){
    turnCount = 1;
}

export function getTurnCount() {
    return turnCount;
}
