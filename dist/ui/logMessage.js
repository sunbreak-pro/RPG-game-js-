// manage/logMessage.ts - TypeScript版
let battleLog = null;
let afterBattleLog = null;
const tittleLog = document.getElementById("tittle-log");
const nextStageBtn = document.getElementById("next-stage");
const backgroundBtn = document.getElementById("background-button");
export function logTittle(message1) {
    tittleLog.innerHTML += `<h3>\n ${message1}</h3>`;
}
export function logMessage(message1 = "", message2 = "") {
    const isAfterBattle = nextStageBtn.style.display !== "none";
    const target = isAfterBattle ? afterBattleLog : battleLog;
    if (!target)
        return;
    if (message1) {
        target.innerHTML += `<p>\n<strong>${message1}</strong></p>`;
        backgroundBtn.innerHTML += `<p>\n${message1}</p>`;
    }
    if (message2) {
        target.innerHTML += `<p>\n<strong>${message2}</strong></p>`;
        backgroundBtn.innerHTML += `<p>\n${message2}</p>`;
    }
}
export function clearBttleLogs() {
    if (battleLog)
        battleLog.innerHTML = "";
    if (afterBattleLog)
        afterBattleLog.innerHTML = "";
    tittleLog.innerHTML = "";
}
export function clearAllLogs() {
    if (battleLog)
        battleLog.innerHTML = "";
    if (afterBattleLog)
        afterBattleLog.innerHTML = "";
    backgroundBtn.innerHTML = "";
    tittleLog.innerHTML = "";
}
export function setLogElements({ battleLog: bl, afterBattleLog: abl }) {
    battleLog = bl;
    afterBattleLog = abl;
}
