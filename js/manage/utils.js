import { Player } from "./player";

export const battleLog = document.getElementById("battle-log");

export function logMessage(message) {
    battleLog.innerHTML += `<p>\n ${message}</p>`;
}

// export function getItem(item) {
//     document.addEventListener('click' ()=>{

//     }
//     )
// }
export function clearBattleLog() {
    battleLog.innerHTML = ""
}

export function deadCharacter(){
    logMessage(`${this.name}は、死亡した！`);
    defaultAttackBtn.remove();
    updateStatus();
}