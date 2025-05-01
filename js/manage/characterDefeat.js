
// 「倒れた」ログ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
import { getCurrentPlayer, getStageContext } from "./battleState.js";
import { updateStatus } from "./statusUpdater.js";
import { clearAllLogs, logMessage, logTittle } from "../ui/logMessage.js";
import { dropRandomItem } from "./item.js";
import { enemyTemplates } from "../manage/characterTemplates.js"
// import { createEnemy } from "../manage/character.js";

export function handleCharacterDefeat(character, afterLogCallback = null, isFromAttack=false) {
    if (character.hp > 0) return;
    if (!isFromAttack) return;
    clearAllLogs();
    
    const {
        defaultAttackBtn,
        nextStageBtn,
        inventoryArea,
        battleLogArea,
        afterBattleLogArea,
    } = getStageContext();
    battleLogArea.style.display = "none";
    afterBattleLogArea.style.display = "";
    character.hp = 0;
    console.log(character.name)
    if (character.isPlayer) {
        handlePlayerDefeatUI(defaultAttackBtn, nextStageBtn, battleLogArea,afterBattleLogArea);
    } else {
        handledanjonClear(defaultAttackBtn, nextStageBtn,inventoryArea, battleLogArea,afterBattleLogArea);
        const player = getCurrentPlayer();
        logTittle(`セーフティーエリア`);
        if (afterLogCallback && nextStageBtn.style.display === "") {
            afterLogCallback();
            logMessage(`${character.name} は倒された`);
            logMessage("戦いは終わった…","");
            logMessage("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。","");
            const hpRecover = Math.floor(player.maxHp * 0.2);
            const mpRecover = Math.floor(player.maxMp * 0.2);
            player.hp = Math.min(player.hp + hpRecover, player.maxHp);
            player.mp = Math.min(player.mp + mpRecover, player.maxMp);
            logMessage(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`,"");
            dropRandomItem(player);
        } else if(nextStageBtn.style.display === "none" && afterBattleLogArea.style.display === "none"){
            logMessage(`外に出よう`);
        }
        else{
            logMessage(`${character.name} は倒された`);
            logMessage("戦いは終わった…","");
            logMessage("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。","");
        }
        updateStatus();
    }
}
function handlePlayerDefeatUI(defaultAttackBtn, nextStageBtn, battleLogArea, afterBattleLogArea) {
    defaultAttackBtn.style.display = "none";
    nextStageBtn.style.display = "none";
    battleLogArea.style.display = "";
    afterBattleLogArea.style.display = "none";
    logMessage(`あなたは死んだ...`)
    logMessage("ゲームオーバー！最初からやり直してください。","");
    updateStatus();
}
// function handleEnemyDefeatUI(defaultAttackBtn, nextStageBtn,inventoryArea, battleLogArea, afterBattleLogArea,logName) {
//     handledanjonClear(defaultAttackBtn,nextStageBtn,inventoryArea,battleLogArea,afterBattleLogArea,logName);
// }

let currentStage = 1;
function handledanjonClear(defaultAttackBtn,nextStageBtn,inventoryArea,battleLogArea,afterBattleLogArea){
    const nextEnemyTemplate = enemyTemplates[currentStage];
    console.log(currentStage,nextEnemyTemplate);
    currentStage++;
    if (!nextEnemyTemplate) {
        inventoryArea.style.display = "none"
        defaultAttackBtn.style.display = "none";
        nextStageBtn.style.display = "none";
        battleLogArea.style.display = "";
        afterBattleLogArea.style.display = "none";
        logMessage("ダンジョンクリア！！🎉","おめでとう！！！");
        return;
    }else{
        defaultAttackBtn.style.display = "none";
        nextStageBtn.style.display = "";
    }
}