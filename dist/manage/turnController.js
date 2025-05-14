// manage/turnController.ts
import { defaultAttackBtn, toggleArea, nextStageBtn, } from "../main.js";
import { clearBttleLogs, logMessage } from "../ui/logMessage.js";
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
    if (nextStageBtn.style.display === "")
        return;
    clearBttleLogs();
    toggleArea.style.display = "none";
    defaultAttackBtn.style.display = "none";
    playerTurnDone = false;
    enemyTurnDone = false;
    skillUsed = false;
    turnProcessed = false;
    logMessage(`--- ${turnCount}ターン目 ---`);
}
export function proceedTurn() {
    if (playerTurnDone && enemyTurnDone && !turnProcessed) {
        turnProcessed = true;
        turnCount++;
        setTimeout(() => {
            defaultAttackBtn.style.display = "";
            toggleArea.style.display = "";
            logMessage(`${turnCount}ターン目が終了…`, "次の行動を選べ");
        }, 1000);
    }
}
export function resetTurn() {
    turnCount = 1;
}
export function getTurnCount() {
    return turnCount;
}
