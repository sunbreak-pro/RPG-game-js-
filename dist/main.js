// main.ts - TypeScript化バージョン
import { createEnemy, createPlayer } from "./manage/character";
import { enemyTemplates } from "./manage/templates/characterTemplates";
import { EquipmentItem, HealItem } from "./manage/item";
import { setBattleState, prepareNextStage, setStageContext, getcurrentStage } from "./manage/battleState";
import { updateStatus } from "./manage/itemStatusUpdater";
import { handleDefaultAttack } from "./battle/attack";
import { baseSkillList } from "./manage/templates/skillTemplates";
import { updateBaseSkillArea } from "./battle/skill";
import { setupToggleButtons, setupNextStageButton } from "./ui/btn";
import { setLogElements } from "./ui/logMessage";
// HTML要素の取得と型付け
export const battleArea = document.querySelector(".battle-area");
export const toggleArea = document.getElementById("toggle-area");
export const itemArea = document.getElementById("toggle-heal-items");
export const equipItemArea = document.getElementById("toggle-equip-items");
export const skillArea = document.getElementById("toggle-skill-list");
export const battleLogArea = document.getElementById("battle-log");
export const afterBattleLogArea = document.getElementById("after-battle-log");
const playerStatus = document.getElementById("player-status");
export const defaultAttackBtn = document.getElementById("default-attack");
export const nextStageBtn = document.getElementById("next-stage");
const enemyStatus = document.getElementById("enemy-status");
const equippedDiv = document.getElementById("equipped-items");
export const skillDiv = document.getElementById("skill-list");
const healItemsDiv = document.getElementById("heal-items");
const equipItemsDiv = document.getElementById("equip-items");
export const uiElements = {
    playerStatus,
    enemyStatus,
    healItemsDiv,
    equipItemsDiv,
    equippedDiv,
};
// ゲーム開始処理
export function startBattle() {
    battleArea.style.display = "";
    setLogElements({
        battleLog: battleLogArea,
        afterBattleLog: afterBattleLogArea,
    });
    const enemyIndex = enemyTemplates[0];
    const newEnemy = createEnemy(enemyIndex);
    getcurrentStage(newEnemy);
    updateBaseSkillArea(skillDiv, baseSkillList);
    handleDefaultAttack(defaultAttackBtn);
    setupToggleButtons();
    setupNextStageButton(nextStageBtn, prepareNextStage);
    setStageContext({
        defaultAttackBtn,
        nextStageBtn,
        battleArea,
        toggleArea,
        battleLogArea,
        afterBattleLogArea,
        skillDiv,
        uiElements,
    });
    updateStatus(uiElements);
}
export function gameInit() {
    const gameOverDisplay = document.getElementById("game-over");
    const selectPlayerArea = document.getElementById("select-player-area");
    gameOverDisplay.style.display = "none";
    selectPlayerArea.style.display = "";
}
// 不正防止（セーフティエリア経由チェック）
document.addEventListener("DOMContentLoaded", () => {
    const raw = localStorage.getItem("playerData");
    const isSafezone = location.pathname.includes("safezone.html");
    if (!raw && !isSafezone) {
        alert("セーフティエリアからスタートしてください！");
        window.location.href = "safezone.html";
        return;
    }
    if (raw) {
        const playerData = JSON.parse(raw);
        choosePlayerFromStorage(playerData);
    }
});
function choosePlayerFromStorage(playerData) {
    const selectedPlayer = createPlayer(playerData.jobIndex, playerData.name);
    const fullInventory = [
        ...playerData.equipment.map((item) => {
            var _a, _b;
            return new EquipmentItem(item.name, item.itemType, (_a = item.equipmentType) !== null && _a !== void 0 ? _a : "", item.effect, (_b = item.amount) !== null && _b !== void 0 ? _b : 1, item.rarity, item.instructionText);
        }),
        ...playerData.items.map((item) => {
            var _a;
            return new HealItem(item.name, item.itemType, item.effect, (_a = item.amount) !== null && _a !== void 0 ? _a : 1, item.rarity, item.instructionText);
        }),
    ];
    selectedPlayer.inventory = fullInventory;
    const firstEnemy = createEnemy(enemyTemplates[0]);
    setBattleState(selectedPlayer, firstEnemy, 0);
    startBattle();
}
