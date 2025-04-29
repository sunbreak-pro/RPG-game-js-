// === データ・管理系（manageフォルダ） ===
import { createPlayer, createEnemy} from "./manage/character.js";
import { enemyTemplates } from "./manage/characterTemplates.js";
import { allItemsList } from "./manage/item.js";
import { logMessage } from "./manage/utils.js";
import { getCurrentPlayer, getCurrentEnemy, setBattleState, prepareNextStage, setStageContext} from "./manage/battleState.js";

// === バトル系（battleフォルダ） ===
import { handleDefaultAttack } from "./battle/attack.js";
import { skillList } from "./battle/skill.js";

// === UI系（uiフォルダ） ===
import { updateStatus } from "./ui/statusUpdater.js";
import { updateSkillArea } from "./ui/skillUI.js";
import { setupToggleButtons, setupNextStageButton } from "./ui/btn.js";

// === HTML要素取得 ===
const gameArea = document.querySelector(".game-area");
const selectPlayerArea = document.querySelector(".select-player-area");
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
const nextStageBtn = document.getElementById("next-stage");

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

    const player = getCurrentPlayer();
    player.inventory = [...allItemsList];

    const enemy = getCurrentEnemy();

    logMessage("",`${player.name}は、${player.className} を選んだ！ゲーム開始！`);
    logMessage((`第一ステージ：${enemy.name}が現れた！`),"");

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
        gameArea,
        nextStageBtn,
        skillDiv,
        uiElements,
    });
    // 最初のステータス表示
    updateStatus(uiElements);
}
