// manage/logManager.js
const tittleLog = document.getElementById("tittle-log")
const nextStageBtn = document.getElementById("next-stage");
const backgroundArea = document.getElementById("background-area");
export function logTittle(message1) {
    tittleLog.innerHTML += `<h3>\n ${message1}</h3>`;
}

export function logMessage(message1 = "", message2 = "") {
    const isAfterBattle = nextStageBtn.style.display !== "none";
    const target = isAfterBattle ? afterBattleLog : battleLog;
    if (!target) return; 
    if (message1) {
        target.innerHTML += `<p>\n<strong>${message1}</strong></p>`;
    }
    if (message2) {
        target.innerHTML += `<p>\n<strong>${message2}</strong></p>`;
    }
    target.scrollTo({
        top: target.scrollHeight,
        behavior: "smooth"
      });
      console.log(target);
}
export function turnLog(message1,message2=""){
    const isAfterBattle = nextStageBtn.style.display !== "none";
    const target = isAfterBattle ? afterBattleLog : battleLog;
    if (!target) return; 

    if (message1) {
        target.innerHTML += `<p>\n<strong>${message1}</strong></p>`;
        backgroundArea.innerHTML += `<p>\n${message1}</p>`;
    }
    if (message2) {
        target.innerHTML += `<p>\n<strong>${message2}</strong></p>`;
        backgroundArea.innerHTML += `<p>\n${message2}</p>`;
    }
    backgroundArea.scrollTo({
        top: backgroundArea.scrollHeight,
        behavior: "smooth"
      });
};

export function clearBttleLogs() {
    battleLog.innerHTML = "";
    afterBattleLog.innerHTML = "";
    tittleLog.innerHTML = "";
}
export function clearAllLogs(){
    battleLog.innerHTML = "";
    afterBattleLog.innerHTML = "";
    backgroundArea.innerHTML = "";
    tittleLog.innerHTML = "";
}
let battleLog = null;
let afterBattleLog = null;

export function setLogElements({ battleLog: bl, afterBattleLog: abl }) {
    battleLog = bl;
    afterBattleLog = abl;
}
