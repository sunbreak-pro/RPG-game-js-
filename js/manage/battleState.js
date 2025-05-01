import { uiElements } from "../main.js";
import { createEnemy } from "../manage/character.js";
import { enemyTemplates } from "./characterTemplates.js";
import { skillList, updateSkillArea } from "../battle/skill.js";
import { updateStatus } from "./statusUpdater.js";
import { logMessage, clearAllLogs, logTittle } from "../ui/logMessage.js";

let currentPlayer = null;
let currentEnemy = null;
let currentEnemyIndex = 0;

// main.jsのchoosePlayerから取得
export function setBattleState(player, enemy, enemyIndex) {
    currentPlayer = player;
    currentEnemy = enemy;
    currentEnemyIndex = enemyIndex;
    console.log(player);
    console.log(enemy);
}
export function getCurrentPlayer() {
    return currentPlayer;
}

export function getCurrentEnemy() {
    return currentEnemy;
}

export function getCurrentEnemyIndex() {
    return currentEnemyIndex;
}

let setStageElements = {}
export function setStageContext(elements) {
    setStageElements = elements;
}
export function getStageContext(){
    return setStageElements;
}
let currentStage = 1;

export function prepareNextStage() {
    const nextEnemyTemplate = enemyTemplates[currentStage];
    const newEnemy = createEnemy(nextEnemyTemplate);
    // if (!nextEnemyTemplate) {
    //     inventoryArea.style.display = "none"
    //     defaultAttackBtn.style.display = "none";
    //     nextStageBtn.style.display = "none"; // ボタン非表示
    //     battleLogArea.style.display = "";
    //     afterBattleLogArea.style.display = "none";
    //     logMessage("ダンジョンクリア！！🎉","おめでとう！！！");
    //     return;
    // }
    setBattleState(getCurrentPlayer(), newEnemy, currentStage);
    clearAllLogs();
    updateSkillArea(setStageElements.skillDiv, skillList);
    updateStatus(uiElements);
    setStageElements.defaultAttackBtn.style.display = "";
    setStageElements.nextStageBtn.style.display = "none"; 
    setStageElements.battleLogArea.style.display = "";
    setStageElements.afterBattleLogArea.style.display ="none"
    logTittle(`第 ${currentStage + 1} 階層`)
    logMessage(`第 ${currentStage + 1} 階層：${newEnemy.name}が現れた！`,"");
    currentStage++;
}