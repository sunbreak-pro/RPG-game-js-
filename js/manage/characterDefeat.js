
// 「倒れた」ログ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
import { getCurrentPlayer, getStageContext } from "./battleState.js";
import { updateStatus } from "./itemStatusUpdater.js";
import { clearAllLogs, clearBttleLogs, logMessage, logTittle, turnLog } from "../ui/logMessage.js";
import { dropRandomItem } from "./item.js";
import { enemyTemplates } from "./termplates/characterTemplates.js"
import { gameOver } from "./saveAndLoad.js";
import { resetTurn } from "./turnController.js";
import { toggleArea,skillArea, skillDiv } from "../main.js";
// import { createEnemy } from "../manage/character.js";

export function handleCharacterDefeat(character, afterLogCallback = null, isFromAttack=false) {
    if (character.hp > 0) return;
    if (!isFromAttack) return;
    
    const player = getCurrentPlayer();
    const {
        defaultAttackBtn,
        nextStageBtn,
        inventoryArea,
        battleLogArea,
        afterBattleLogArea,
    } = getStageContext();
    toggleArea.style.display = ""
    skillArea.style.display = "none"
    skillDiv.style.display = "none"
    battleLogArea.style.display = "none";
    afterBattleLogArea.style.display = "";
    character.hp = 0;
    
    console.log(character.name)
    if (character.isPlayer) {
        battleLogArea.style.display = "";
        afterBattleLogArea.style.display = "none";
        turnLog(`<h1>${character.name} は倒された</h1>`, "5秒後に引き継ぎアイテム選択画面に移動します");
        setTimeout( gameOver,5000);
        } else {
        handledanjonClear(defaultAttackBtn, nextStageBtn,inventoryArea, battleLogArea,afterBattleLogArea);
        resetTurn();
        logTittle(`セーフティーエリア`);
        const hpRecover = Math.floor(player.maxHp * 0.2);
        const mpRecover = Math.floor(player.maxMp * 0.2);
        player.hp = Math.min(player.hp + hpRecover, player.maxHp);
        player.mp = Math.min(player.mp + mpRecover, player.maxMp);
        if (afterLogCallback && nextStageBtn.style.display === "") {
            clearBttleLogs();
            turnLog(`${character.name} は倒された`);
            turnLog("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。");
            turnLog(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`,"");
            dropRandomItem(player);

        } else if(nextStageBtn.style.display === "none" && afterBattleLogArea.style.display === "none"){
            logMessage(`外に出よう`);
        }
        else{
            turnLog(`${character.name} は倒された`);

            turnLog("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。","");
            turnLog(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`,"");
            dropRandomItem(player);
            return;
        }
        updateStatus();
    }
}


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