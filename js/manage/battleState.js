import { skillArea, skillDiv, uiElements } from "../main.js";
import { createEnemy } from "../manage/character.js";
import { enemyTemplates } from "./termplates/characterTemplates.js";
import { updateBaseSkillArea } from "../battle/skill.js";
import { updateStatus } from "./itemStatusUpdater.js";
import { logMessage, clearAllLogs, logTittle } from "../ui/logMessage.js";
import { baseSkillList } from "./termplates/skillTemplates.js";

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
    skillArea.style.display = ""
    skillDiv.style.display = ""

    const nextEnemyTemplate = enemyTemplates[currentStage];
    const newEnemy = createEnemy(nextEnemyTemplate);
    setBattleState(getCurrentPlayer(), newEnemy, currentStage);
    clearAllLogs();

    updateBaseSkillArea(setStageElements.skillDiv, baseSkillList);

    updateStatus(uiElements);
    setStageElements.defaultAttackBtn.style.display = "";
    setStageElements.nextStageBtn.style.display = "none"; 
    setStageElements.battleLogArea.style.display = "";
    setStageElements.afterBattleLogArea.style.display ="none"
    currentStage++
    getcurrentStage(newEnemy);
}
export function getcurrentStage(newEnemy){
    logTittle(`第 ${currentStage} 階層`)
    logMessage(`${newEnemy.name}が現れた！`,"どうする？");
}