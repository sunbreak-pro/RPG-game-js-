// manage/battleState.ts - TypeScript対応

import { skillArea, skillDiv, uiElements } from "../main";
import { createEnemy } from "./character";
import { enemyTemplates } from "./templates/characterTemplates";
import { updateBaseSkillArea } from "../battle/skill";
import { updateStatus } from "./itemStatusUpdater";
import { logMessage, clearAllLogs, logTittle } from "../ui/logMessage";
import { baseSkillList } from "./templates/skillTemplates";
import type { Character } from "../types/characterTypes";

let currentPlayer: Character | null = null;
let currentEnemy: Character | null = null;
let currentEnemyIndex = 0;

// main.ts の choosePlayer から取得
export function setBattleState(player: Character | null, enemy: Character, enemyIndex: number): void {
  currentPlayer = player;
  currentEnemy = enemy;
  currentEnemyIndex = enemyIndex;
  console.log(player);
  console.log(enemy);
}

export function getCurrentPlayer(): Character {
  if (!currentPlayer) throw new Error("プレイヤーが設定されていません");
  return currentPlayer;
}

export function getCurrentEnemy(): Character {
  if (!currentEnemy) throw new Error("敵が設定されていません");
  return currentEnemy;
}

export function getCurrentEnemyIndex(): number {
  return currentEnemyIndex;
}

interface StageElements {
  defaultAttackBtn: HTMLElement;
  nextStageBtn: HTMLElement;
  battleArea: HTMLElement;
  toggleArea: HTMLElement;
  battleLogArea: HTMLElement;
  afterBattleLogArea: HTMLElement;
  skillDiv: HTMLElement;
  uiElements: typeof uiElements;
}

let setStageElements: StageElements;

export function setStageContext(elements: StageElements): void {
  setStageElements = elements;
}

export function getStageContext(): StageElements {
  return setStageElements;
}

let currentStage = 1;

export function prepareNextStage(): void {
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

export function getcurrentStage(newEnemy: Character): void {
  logTittle(`第 ${currentStage} 階層`);
  logMessage(`${newEnemy.name}が現れた！`, "どうする？");
}
