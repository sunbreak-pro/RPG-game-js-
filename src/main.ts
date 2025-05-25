// === import 部分 ===
import { createEnemy, Player } from "./manage/characterManage/character";
import { enemyTemplates } from "./manage/characterManage/characterTemplates";
import { setBattleState, prepareNextStage, setStageContext, getcurrentStage } from "./controller/battleStateController";
import { updateStatus } from "./manage/itemManage/itemStatusUpdater";
import { handleDefaultAttack } from "./battle/attackManager";
import { baseSkillList } from "./battle/skill/skillTemplates";
import { updateBaseSkillArea } from "./battle/skill/skillManager";
import { setupToggleButtons, setupNextStageButton } from "./ui/btn";
import { setLogElements } from "./ui/logMessage";
import type { SaveData } from "./database/saveData";

// === UI要素の取得 ===
export const battleArea = document.querySelector(".battle-area") as HTMLElement;
export const toggleArea = document.getElementById("toggle-area") as HTMLElement;
export const itemArea = document.getElementById("toggle-heal-items") as HTMLElement;
export const equipItemArea = document.getElementById("toggle-equip-items") as HTMLElement;
export const defaultAttackBtn = document.getElementById("default-attack") as HTMLButtonElement;

const skillArea = document.getElementById("skill-area") as HTMLElement;
const battleLogArea = document.getElementById("battle-log") as HTMLElement;
const afterBattleLogArea = document.getElementById("after-battle-log") as HTMLElement;
const backgroundLogArea = document.getElementById("background-area") as HTMLElement;
const playerStatus = document.getElementById("player-status") as HTMLElement;
const nextStageBtn = document.getElementById("next-stage") as HTMLButtonElement;

const enemyStatus = document.getElementById("enemy-status") as HTMLElement;
const equippedDiv = document.getElementById("equipped-items") as HTMLElement;
export const skillDiv = document.getElementById("skill-list") as HTMLElement;
const healItemsDiv = document.getElementById("heal-items") as HTMLElement;
const equipItemsDiv = document.getElementById("equip-items") as HTMLElement;

export const uiElements = {
  playerStatus,
  enemyStatus,
  healItemsDiv,
  equipItemsDiv,
  equippedDiv,
};

// === 実行判定：battleDisplay.htmlのときだけ実行 ===
if (location.pathname.includes("battleDisplay.html")) {
  runBattleGame();
}

// === 初期化処理を1つの関数に集約 ===
async function runBattleGame(): Promise<void> {
  const gameOverDisplay = document.getElementById("game-over-display") as HTMLElement;
  gameOverDisplay.style.display = "none";

  const raw = localStorage.getItem("playerData");
  const isBattlePage = location.pathname.includes("battleDisplay.html");

  if (!raw || !isBattlePage) {
    alert("セーフティエリアから開始してください！");
    window.location.href = "/";
    return;
  }

  const parsed = JSON.parse(raw) as SaveData;
  const player = Player.fromSaveData(parsed);
  choosePlayerFromStorage(player);
}

// === プレイヤー選択＆初期化処理 ===
function choosePlayerFromStorage(player: Player): void {
  const enemy = createEnemy(enemyTemplates[0]);
  setBattleState(player, enemy, 0);
  startBattle();
}

// === バトル画面初期化 ===
async function startBattle(): Promise<void> {
  battleArea.style.display = "";
  setLogElements({
    battleLog: battleLogArea,
    afterBattleLog: afterBattleLogArea,
  });

  const enemy = createEnemy(enemyTemplates[0]);
  getcurrentStage(enemy);

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
    backgroundLogArea,
    skillArea,
    skillDiv,
    uiElements,
  });

  updateStatus(uiElements);
}
