import { getCurrentPlayer, getStageContext } from "../../controller/battleStateController";
import { updateStatus } from "../itemManage/itemStatusUpdater";
import { clearAllLogs, clearBttleLogs, logMessage, logTittle, turnLog } from "../../ui/logMessage";
import { dropRandomItem } from "../itemManage/item";
import { enemyTemplates } from "./characterTemplates";
import { resetTurn } from "../../controller/turnController";
import { toggleArea } from "../../main";
import type { Character } from "./characterTypes";
import { Player } from "./character";
import { saveGame } from "@/database/saveGame";
import { SaveData } from "@/database/saveData";
import { danjonclear } from "@/controller/stageController";





export function handleCharacterDefeat(
  character: Character,
  afterLogCallback: (() => void) | null = null,
  isFromAttack: boolean = false
): void {
  if (character.hp > 0 || !isFromAttack) return;

  clearAllLogs();
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
    battleLogArea,
    afterBattleLogArea,
    backgroundLogArea,
    skillArea,
  } = getStageContext();

  skillArea.style.display = "none";
  battleLogArea.style.display = "none";
  defaultAttackBtn.style.display = "none";
  defaultAttackBtn.ariaDisabled = "true";
  afterBattleLogArea.style.display = "block";
  backgroundLogArea.style.display = "none"
  character.hp = 0;

  if (character.isPlayer) {
    battleLogArea.style.display = "block";
    afterBattleLogArea.style.display = "none";
    turnLog(`<h1>${character.name} は倒された</h1>`, "5秒後に引き継ぎアイテム選択画面に移動します");
    setTimeout(gameOver, 5000);
  } else {
    resetTurn();
    progressStage(0);

    toggleArea.style.opacity = "1";

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

async function progressStage(currentStage: number): Promise<void> {
  const nextEnemyTemplate = enemyTemplates[currentStage];
  console.log(currentStage, nextEnemyTemplate);
  if (!nextEnemyTemplate) {
    danjonclear(currentStage)
  }
  else {
    const {
      nextStageBtn,
    } = getStageContext();
    nextStageBtn.style.display = "block"
  }
  currentStage++;
}

async function gameOver(): Promise<void> {
  const player = getCurrentPlayer() as Player;

  const saveData: SaveData = {
    playerName: player.name,
    maxHp: player.maxHp,
    maxMp: player.maxMp,
    hp: player.hp,
    mp: player.mp,
    physicalStrength: player.physicalStrength,
    magicalStrength: player.magicalStrength,
    defense: player.defense,
    speed: player.speed,
    isPlayer: player.isPlayer,
    inventory: player.inventory,
    equipment: player.equipment,
    skills: player.skills.map(s => s.skillId),
    currentStage: 0,
    deathCount: player.deathCount,
    lastClearedFloor: player.lastClearedFloor,
  };
  await saveGame(saveData);
  const gameResetBtn = document.getElementById("game-reset") as HTMLButtonElement;

  if (gameResetBtn) {
    gameResetBtn.addEventListener("click", () => {
      window.location.href = "safezone.html";
    });
  }
}

