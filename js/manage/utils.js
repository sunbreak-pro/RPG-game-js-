const battleLog = document.getElementById("battle-log");
const tittleLog = document.getElementById("tittle-log")

// バトルログを生成/消去＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export function logMessage(message1,message2) {
    battleLog.innerHTML += `<h3>\n ${message1}</h3>`;
    tittleLog.innerHTML += `<h3>\n ${message2}</h3>`;
}

export function clearBattleLog() {
    battleLog.innerHTML = "";
    tittleLog.innerHTML = "";
}

// 「倒れた」ログ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export function handleCharacterDefeat(character, uiElements) {
    let attackBtn;
    if (character.hp > 0) return; 
    character.hp = 0;
    logMessage(`${character.name} は倒れた！`,"");

    const {defaultAttackBtn, gameArea, selectPlayerArea, nextStageBtn } = uiElements;

    if (character.isPlayer) {
        handlePlayerDefeatUI(defaultAttackBtn, gameArea, selectPlayerArea);
    } else {
        handleEnemyDefeatUI(nextStageBtn);
        clearBattleLog();
    }
}
function handlePlayerDefeatUI(defaultAttackBtn, gameArea, selectPlayerArea) {
    defaultAttackBtn.style.display = "none";
    gameArea.style.display = "none";
    selectPlayerArea.style.display = "block";
    logMessage("ゲームオーバー！最初からやり直してください。");
}
function handleEnemyDefeatUI(nextStageBtn) {
    if (nextStageBtn) {
        nextStageBtn.style.opacity = 1;
    }
}