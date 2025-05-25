import { uiElements } from "../main";
import { createEnemy } from "../manage/characterManage/character";
import { enemyTemplates } from "../manage/characterManage/characterTemplates";
import { updateBaseSkillArea } from "../battle/skill/skillManager";
import { updateStatus } from "../manage/itemManage/itemStatusUpdater";
import { logMessage, clearAllLogs, logTittle } from "../ui/logMessage";
import { baseSkillList } from "@/battle/skill/skillTemplates";
import type { Character } from "../manage/characterManage/characterTypes";

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

export function getCurrentPlayer(): Character | null {
  if (!currentPlayer) throw new Error("プレイヤーが設定されていません");
  return currentPlayer;
}

export function getCurrentEnemy(): Character | null {
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
  backgroundLogArea: HTMLElement;
  afterBattleLogArea: HTMLElement;
  skillDiv: HTMLElement;
  skillArea: HTMLElement;
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
  const {
    skillDiv,
    skillArea,
  } = getStageContext()
  skillArea.style.opacity = "1";
  skillDiv.style.opacity = "1";
  const nextEnemyTemplate = enemyTemplates[currentStage];
  const newEnemy = createEnemy(nextEnemyTemplate);
  setBattleState(getCurrentPlayer(), newEnemy, currentStage);
  clearAllLogs();

  updateBaseSkillArea(setStageElements.skillDiv, baseSkillList);

  updateStatus(uiElements);
  setStageElements.defaultAttackBtn.style.opacity = "1";
  setStageElements.defaultAttackBtn.ariaDisabled = "false"
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
