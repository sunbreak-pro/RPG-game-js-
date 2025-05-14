// manage/characterDefeat.ts - TypeScript対応
import { logMessage } from "../ui/logMessage.js";
import { updateStatus } from "./itemStatusUpdater.js";
import { uiElements } from "../main.js";
import { setBattleState } from "./battleState.js";
import { createEnemy } from "./character.js";
import { enemyTemplates } from "./templates/characterTemplates.js";
export function handleCharacterDefeat(defeated, afterLog = null, isBattleOver = false) {
    const playerIsDead = defeated.isPlayer;
    if (playerIsDead) {
        logMessage("あなたは力尽きた...", "ゲームオーバーです。");
        const gameOverDisplay = document.getElementById("game-over");
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
