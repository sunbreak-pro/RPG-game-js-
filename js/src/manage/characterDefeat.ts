// characterDefeat.ts - TypeScript対応

import { getCurrentPlayer, getStageContext } from "./battleState";
import { updateStatus } from "./itemStatusUpdater";
import { clearAllLogs, clearBttleLogs, logMessage, logTittle, turnLog } from "../ui/logMessage";
import { dropRandomItem } from "./item";
import { enemyTemplates } from "./templates/characterTemplates";
import { gameOver } from "./saveAndLoad";
import { resetTurn } from "./turnController";
import { toggleArea, skillArea, skillDiv } from "../main";
import type { Character } from "../types/characterTypes";
import { Player } from "./character";

export function handleCharacterDefeat(
  character: Character,
  afterLogCallback: (() => void) | null = null,
  isFromAttack: boolean = false
): void {
  if (character.hp > 0 || !isFromAttack) return;

  const currentPlayer = getCurrentPlayer();
    let player: Player;
    if (currentPlayer instanceof Object && "inventory" in currentPlayer) {
      player = currentPlayer as Player;
    } else {
      return;
    }
  const {
    defaultAttackBtn,
    nextStageBtn,
    battleArea,
    toggleArea,
    battleLogArea,
    afterBattleLogArea,
    skillDiv,
    uiElements,
  } = getStageContext();

  toggleArea.style.display = "";
  skillArea.style.display = "none";
  skillDiv.style.display = "none";
  battleLogArea.style.display = "none";
  afterBattleLogArea.style.display = "";

  character.hp = 0;
  console.log(character.name);

  if (character.isPlayer) {
    battleLogArea.style.display = "";
    afterBattleLogArea.style.display = "none";
    turnLog(`<h1>${character.name} は倒された</h1>`, "5秒後に引き継ぎアイテム選択画面に移動します");
    setTimeout(gameOver, 5000);
  } else {
    handledanjonClear(
      defaultAttackBtn,
      nextStageBtn,
      battleLogArea,
      afterBattleLogArea,
    );
    
    resetTurn();

    logTittle(`セーフティーエリア`);
    const hpRecover = Math.floor(player.maxHp * 0.2);
    const mpRecover = Math.floor(player.maxMp * 0.2);
    player.hp = Math.min(player.hp + hpRecover, player.maxHp);
    player.mp = Math.min(player.mp + mpRecover, player.maxMp);

    if (afterLogCallback && nextStageBtn.style.display === "") {
      clearBttleLogs();
      turnLog(`${character.name} は倒された`);
      turnLog("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。");
      turnLog(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`, "");
      dropRandomItem(player);
    } else if (
      nextStageBtn.style.display === "none" &&
      afterBattleLogArea.style.display === "none"
    ) {
      logMessage(`外に出よう`);
    } else {
      turnLog(`${character.name} は倒された`);
      turnLog("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。", "");
      turnLog(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`, "");
      dropRandomItem(player);
      return;
    }
    updateStatus();
  }
}

let currentStage = 1;
function handledanjonClear(
  defaultAttackBtn: HTMLElement,
  nextStageBtn: HTMLElement,
  battleLogArea: HTMLElement,
  afterBattleLogArea: HTMLElement
): void {
  const nextEnemyTemplate = enemyTemplates[currentStage];
  console.log(currentStage, nextEnemyTemplate);
  currentStage++;

  if (!nextEnemyTemplate) {
    defaultAttackBtn.style.display = "none";
    nextStageBtn.style.display = "none";
    battleLogArea.style.display = "";
    afterBattleLogArea.style.display = "none";
    logMessage("ダンジョンクリア！！🎉", "おめでとう！！！");
    return;
  } else {
    defaultAttackBtn.style.display = "none";
    nextStageBtn.style.display = "";
  }
}
