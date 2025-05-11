// === データ・管理系（manageフォルダ） ===
import { createPlayer, createEnemy} from "./manage/character.js";
import { enemyTemplates } from "./manage/termplates/characterTemplates.js";
import { Item, allItemsList, EquipmentItem, HealItem } from "./manage/item.js";
import { getCurrentPlayer, getCurrentEnemy, setBattleState, prepareNextStage, setStageContext, getcurrentStage} from "./manage/battleState.js";
import { updateStatus } from "./manage/itemStatusUpdater.js";
// import { savePlayerData } from "./manage/saveManager.js";

// === バトル系（battleフォルダ） ===
import { handleDefaultAttack } from "./battle/attack.js";
import { baseSkillList, synthesisSkillList } from "./manage/termplates/skillTemplates.js";

// === UI系（uiフォルダ） ===
import { logMessage, logTittle } from "./ui/logMessage.js";
import { updateBaseSkillArea, updateSynthesisSkillArea } from "./battle/skill.js";
import { setupToggleButtons, setupNextStageButton } from "./ui/btn.js";
import { setLogElements } from "./ui/logMessage.js"

// === HTML要素取得 ===
export const battleArea = document.querySelector(".battle-area");
export const toggleArea = document.getElementById("toggle-area");
export const itemArea = document.getElementById("toggle-heal-items")
export const equipItemArea = document.getElementById("toggle-equip-items")
export const skillArea = document.getElementById("toggle-skill-list")
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


export let uiElements = {
    playerStatus, enemyStatus, healItemsDiv, equipItemsDiv, equippedDiv,
}
// === プレイヤーを選び、ゲーム開始 ===

// === ゲーム開始処理 ===
export function startBattle() {
    battleArea.style.display = "";
    setLogElements({
        battleLog: battleLogArea,
        afterBattleLog: afterBattleLogArea
    });
    const player = getCurrentPlayer();
    const enemy = getCurrentEnemy();

    console.log(allItemsList);
    
    const enemyIndex = enemyTemplates[0];
    const newEnemy = createEnemy(enemyIndex);
    
    getcurrentStage(newEnemy)

    // console.log(newEnemy)
    
    // スキルボタン生成
    updateBaseSkillArea(skillDiv, baseSkillList);
    // updateSynthesisSkillArea(skillDiv, synthesisSkillList);

    // バトル系ハンドラー設定
    handleDefaultAttack(defaultAttackBtn);

    // トグルボタン設定
    setupToggleButtons();
    // ステージボタン設定
    setupNextStageButton(nextStageBtn, prepareNextStage);

    // ステージ管理にUI渡す
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
    // 最初のステータス表示
    updateStatus(uiElements);
}

export function gameInit(){
    gameOverDisplay.style.display = "none";
    selectPlayerArea.style.display = "";
}

// 不正防止＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
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
    console.log("playerData raw:", raw);
        console.log("isSafezone:", isSafezone);
        console.log("現在のパス:", location.pathname);
    }
    });
    
    // 新関数：セーフティエリアからの受け取り用＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    function choosePlayerFromStorage(playerData) {
        const selectedPlayer = createPlayer(playerData.jobIndex, playerData.name);
    
        // プレーンオブジェクト → クラスインスタンスに変換！
        const fullInventory = [
            ...playerData.equipment.map(item => new EquipmentItem(
            item.name,
            item.itemType,
            item.equipmentType,
            item.effect,
            item.amount ?? 1,
            item.rarity,
            item.instructionText,
            )),
            ...playerData.items.map(item => new HealItem(
            item.name,
            item.itemType,
            item.effect,
            item.amount ?? 1,
            item.rarity,
            item.instructionText,
            ))
        ];
        console.log(fullInventory);
        selectedPlayer.inventory = fullInventory;
        const firstEnemy = createEnemy(enemyTemplates[0]);
        setBattleState(selectedPlayer, firstEnemy, 0);
        
        startBattle();
    }