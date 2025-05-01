// === データ・管理系（manageフォルダ） ===
import { createPlayer, createEnemy} from "./manage/character.js";
import { enemyTemplates } from "./manage/characterTemplates.js";
import { allItemsList } from "./manage/item.js";
import { getCurrentPlayer, getCurrentEnemy, setBattleState, prepareNextStage, setStageContext} from "./manage/battleState.js";
import { updateStatus } from "./manage/statusUpdater.js";

// === バトル系（battleフォルダ） ===
import { handleDefaultAttack } from "./battle/attack.js";
import { skillList } from "./battle/skill.js";

// === UI系（uiフォルダ） ===
import { logMessage, logTittle } from "./ui/logMessage.js";
import { updateSkillArea } from "./ui/skillUI.js";
import { setupToggleButtons, setupNextStageButton } from "./ui/btn.js";
import { setLogElements } from "./ui/logMessage.js"


// === HTML要素取得 ===
const gameArea = document.querySelector(".game-area");
const selectPlayerArea = document.querySelector(".select-player-area");
const inventoryArea = document.querySelector(".inventory-area");
export const battleLogArea = document.getElementById("battle-log");
export const afterBattleLogArea = document.getElementById("after-battle-log");

const selectWarriorBtn = document.getElementById("select-warrior");
const selectMageBtn = document.getElementById("select-mage");
const playerNameInput = document.getElementById("player-name-input");

const playerStatus = document.getElementById("player-status");
const enemyStatus = document.getElementById("enemy-status");
const healItemsDiv = document.getElementById("heal-items");
const equipItemsDiv = document.getElementById("equip-items");

const equippedDiv = document.getElementById("equipped-items");
const skillDiv = document.getElementById("skill-list");

const defaultAttackBtn = document.getElementById("default-attack");
export const nextStageBtn = document.getElementById("next-stage");

const toggleHealBtn = document.getElementById("toggle-heal-items");
const toggleEquipBtn = document.getElementById("toggle-equip-items");
const toggleSkillBtn = document.getElementById("toggle-skill-list");

export let uiElements = {
    playerStatus, enemyStatus, healItemsDiv, equipItemsDiv, equippedDiv,
}
// === プレイヤーを選び、ゲーム開始 ===
selectWarriorBtn.addEventListener("click", () => {
    choosePlayer(0);
});

selectMageBtn.addEventListener("click", () => {
    choosePlayer(1);
});

function choosePlayer(index) {
    const name = playerNameInput.value.trim();
    if (name === "") {
        alert("名前を入力してください！");
        return;
    }
    const selectedPlayer = createPlayer(index, name);
    const firstEnemy = createEnemy(enemyTemplates[0]);
    setBattleState(selectedPlayer, firstEnemy, 0);
    startGame();
}

// === ゲーム開始処理 ===
export function startGame() {
    selectPlayerArea.style.display = "none";
    gameArea.style.display = "block";
    setLogElements({
        battleLog: battleLogArea,
        afterBattleLog: afterBattleLogArea
    });

    const player = getCurrentPlayer();
    player.inventory = [...allItemsList];

    const enemy = getCurrentEnemy();
    logTittle("第一階層")
    logMessage(`第一階層：ダンジョンを進むと、${enemy.name}が現れた！`,"");

    // スキルボタン生成
    updateSkillArea(skillDiv, skillList);

    // バトル系ハンドラー設定
    handleDefaultAttack(defaultAttackBtn);

    // トグルボタン設定
    setupToggleButtons(toggleHealBtn, toggleEquipBtn, toggleSkillBtn, healItemsDiv, equipItemsDiv, skillDiv);

    // ステージボタン設定
    setupNextStageButton(nextStageBtn, prepareNextStage);

    // ステージ管理にUI渡す
    setStageContext({
        defaultAttackBtn,
        nextStageBtn,
        gameArea,
        selectPlayerArea,
        inventoryArea,
        battleLogArea,
        afterBattleLogArea,
        skillDiv,
        uiElements,
    });
    // 最初のステータス表示
    updateStatus(uiElements);
}
