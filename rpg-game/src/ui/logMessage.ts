// manage/logMessage.ts - TypeScript版

let battleLog: HTMLElement | null = null;
let afterBattleLog: HTMLElement | null = null;

const tittleLog = document.getElementById("tittle-log") as HTMLElement;
const nextStageBtn = document.getElementById("next-stage") as HTMLElement;
const backgroundArea = document.getElementById("background-area")as HTMLButtonElement;

export function logTittle(message1: string): void {
  tittleLog.innerHTML += `<h3>\n ${message1}</h3>`;
}

export function logMessage(message1: string = "", message2: string = ""): void {
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
  target.scrollTo({
    top: target.scrollHeight,
    behavior: "smooth"
  });
  console.log(target);
}
export function turnLog(message1:string,message2:string =""):void {
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

export function clearBttleLogs(): void {
  if (battleLog) battleLog.innerHTML = "";
  if (afterBattleLog) afterBattleLog.innerHTML = "";
  tittleLog.innerHTML = "";
}

export function clearAllLogs(): void {
  if (battleLog) battleLog.innerHTML = "";
  if (afterBattleLog) afterBattleLog.innerHTML = "";
  backgroundArea.innerHTML = "";
  tittleLog.innerHTML = "";
}

interface LogElements {
  battleLog: HTMLElement;
  afterBattleLog: HTMLElement;
}

export function setLogElements({ battleLog: bl, afterBattleLog: abl }: LogElements): void {
  battleLog = bl;
  afterBattleLog = abl;
}