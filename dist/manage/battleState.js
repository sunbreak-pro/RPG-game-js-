// manage/battleState.ts - TypeScript対応
import { skillArea, skillDiv, uiElements } from "../main.js";
import { createEnemy } from "./character.js";
import { enemyTemplates } from "./templates/characterTemplates.js";
import { updateBaseSkillArea } from "../battle/skill.js";
import { updateStatus } from "./itemStatusUpdater.js";
import { logMessage, clearAllLogs, logTittle } from "../ui/logMessage.js";
import { baseSkillList } from "./templates/skillTemplates.js";
let currentPlayer = null;
let currentEnemy = null;
let currentEnemyIndex = 0;
// main.ts の choosePlayer から取得
export function setBattleState(player, enemy, enemyIndex) {
    currentPlayer = player;
    currentEnemy = enemy;
    currentEnemyIndex = enemyIndex;
    console.log(player);
    console.log(enemy);
}
export function getCurrentPlayer() {
    if (!currentPlayer)
        throw new Error("プレイヤーが設定されていません");
    return currentPlayer;
}
export function getCurrentEnemy() {
    if (!currentEnemy)
        throw new Error("敵が設定されていません");
    return currentEnemy;
}
export function getCurrentEnemyIndex() {
    return currentEnemyIndex;
}
let setStageElements;
export function setStageContext(elements) {
    setStageElements = elements;
}
export function getStageContext() {
    return setStageElements;
}
let currentStage = 1;
export function prepareNextStage() {
    skillArea.style.display = "";
    skillDiv.style.display = "";
    const nextEnemyTemplate = enemyTemplates[currentStage];
    const newEnemy = createEnemy(nextEnemyTemplate);
    setBattleState(getCurrentPlayer(), newEnemy, currentStage);
    clearAllLogs();
    updateBaseSkillArea(setStageElements.skillDiv, baseSkillList);
    updateStatus(uiElements);
    setStageElements.defaultAttackBtn.style.display = "";
    setStageElements.nextStageBtn.style.display = "none";
    setStageElements.battleLogArea.style.display = "";
    setStageElements.afterBattleLogArea.style.display = "none";
    currentStage++;
    getcurrentStage(newEnemy);
}
export function getcurrentStage(newEnemy) {
    logTittle(`第 ${currentStage} 階層`);
    logMessage(`${newEnemy.name}が現れた！`, "どうする？");
}
