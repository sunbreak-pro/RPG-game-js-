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