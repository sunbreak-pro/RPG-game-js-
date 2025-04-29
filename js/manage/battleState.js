import { uiElements } from "../main.js";
import { createEnemy } from "../manage/character.js";
import { enemyTemplates } from "./characterTemplates.js";
import { logMessage, clearBattleLog } from "../manage/utils.js";

import { skillList } from "../battle/skill.js";

import { updateSkillArea } from "../ui/skillUI.js";
import { updateStatus } from "../ui/statusUpdater.js";

let _currentPlayer = null;
let _currentEnemy = null;
let _currentEnemyIndex = 0;

export function setBattleState(player, enemy, enemyIndex = 0) {
    _currentPlayer = player;
    _currentEnemy = enemy;
    _currentEnemyIndex = enemyIndex;
    console.log(player);
    console.log(enemy);
}
export function getCurrentPlayer() {
    return _currentPlayer;
}

export function getCurrentEnemy() {
    return _currentEnemy;
}

export function getCurrentEnemyIndex() {
    return _currentEnemyIndex;
}

let setStageElements = {}
export function setStageContext(elements) {
    setStageElements = elements;
}
let currentStage = 1;

export function prepareNextStage() {
    const nextEnemyTemplate = enemyTemplates[currentStage];
    const newEnemy = createEnemy(nextEnemyTemplate);
    clearBattleLog();
    if (!nextEnemyTemplate) {
        logMessage("ダンジョンクリア！！🎉","おめでとう！！！");
        setStageElements.nextStageBtn.style.display = "none"; // ボタン非表示
        return;
    }
    setBattleState(getCurrentPlayer(), newEnemy, currentStage);
    clearBattleLog
    logMessage(`第${currentStage + 1}ステージ：${newEnemy.name}が現れた！`,"");

    updateSkillArea(setStageElements.skillDiv, skillList);
    updateStatus(uiElements);
    setStageElements.nextStageBtn.style.opacity = 0; // ボタン非表示
    currentStage++;
}