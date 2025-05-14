// manage/characterDefeat.ts - TypeScript対応

import { logMessage } from "../ui/logMessage";
import { updateStatus } from "./itemStatusUpdater";
import { uiElements } from "../main";
import { setBattleState } from "./battleState";
import { createEnemy } from "./character";
import { enemyTemplates } from "./templates/characterTemplates";
import type { Character } from "../types/characterTypes";

export function handleCharacterDefeat(
  defeated: Character,
  afterLog: (() => void) | null = null,
  isBattleOver: boolean = false
): void {
  const playerIsDead = defeated.isPlayer;

  if (playerIsDead) {
    logMessage("あなたは力尽きた...", "ゲームオーバーです。");
    const gameOverDisplay = document.getElementById("game-over") as HTMLElement;
    gameOverDisplay.style.display = "block";
    return;
  }

  // 敵を倒したときの処理
  logMessage(`${defeated.name} を倒した！`, "次の敵が現れた...");

  // 次の敵を設定
  const currentIndex = enemyTemplates.findIndex((et) => et.name === defeated.name);
  const nextTemplate = enemyTemplates[currentIndex + 1];
  if (nextTemplate) {
    const nextEnemy = createEnemy(nextTemplate);
    setBattleState(null, nextEnemy, currentIndex + 1);
  }

  updateStatus(uiElements);

  if (afterLog) {
    afterLog();
  }
}
