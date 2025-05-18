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
import type { ItemRarity, ItemType, ItemEffect } from "./types/itemTypes";

// HTML要素の取得と型付け
export const battleArea = document.querySelector(".battle-area") as HTMLElement;
export const toggleArea = document.getElementById("toggle-area") as HTMLElement;
export const itemArea = document.getElementById("toggle-heal-items") as HTMLElement;
export const equipItemArea = document.getElementById("toggle-equip-items") as HTMLElement;
export const skillArea = document.getElementById("skill-area") as HTMLElement;
export const skillList = document.getElementById("skill-list") as HTMLElement;
export const battleLogArea = document.getElementById("battle-log") as HTMLElement;
export const afterBattleLogArea = document.getElementById("after-battle-log") as HTMLElement;

const playerStatus = document.getElementById("player-status") as HTMLElement;
export const defaultAttackBtn = document.getElementById("default-attack") as HTMLButtonElement;
export const nextStageBtn = document.getElementById("next-stage") as HTMLButtonElement;

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

// ゲーム開始処理

export function startBattle(): void {

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

export function gameInit(): void {
  const gameOverDisplay = document.getElementById("game-over") as HTMLElement;
  const selectPlayerArea = document.getElementById("select-player-area") as HTMLElement;
  gameOverDisplay.style.display = "none";
  selectPlayerArea.style.display = "";
}

// 不正防止（セーフティエリア経由チェック）
document.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("playerData");
  const isSafezone = location.pathname.includes("safezone.html");

  if (!raw && !isSafezone) {
    alert("セーフティエリアからスタートしてください！");
    window.location.href = "safezone.ts";
    return;
  }

  if (raw) {
    const playerData = JSON.parse(raw);
    choosePlayerFromStorage(playerData);
  }
});

interface StoredItem {
  name: string;
  itemType: string;
  equipmentType?: string;
  effect: ItemEffect;
  amount?: number;
  rarity: string;
  instructionText: string;
}

interface StoredPlayerData {
  name: string;
  jobIndex: number;
  equipment: StoredItem[];
  items: StoredItem[];
}

function choosePlayerFromStorage(playerData: StoredPlayerData): void {
  const selectedPlayer = createPlayer(playerData.jobIndex, playerData.name);

  const fullInventory = [
    ...playerData.equipment.map(
      (item) =>
        new EquipmentItem(
          item.name,
          item.itemType as ItemType,
          item.equipmentType ?? "",
          item.effect,
          item.amount ?? 1,
          item.rarity as ItemRarity,
          item.instructionText
        )
    ),
    ...playerData.items.map(
      (item) =>
        new HealItem(
          item.name,
          item.itemType as ItemType,
          item.effect,
          item.amount ?? 1,
          item.rarity as ItemRarity,
          item.instructionText
        )
    ),
  ];

  selectedPlayer.inventory = fullInventory;
  const firstEnemy = createEnemy(enemyTemplates[0]);
  setBattleState(selectedPlayer, firstEnemy, 0);
  startBattle();
}
