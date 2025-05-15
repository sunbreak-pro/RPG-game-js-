// battle/attack.ts
import { uiElements } from "../main";
import { activateSkill } from "./skill";
import { handleCharacterDefeat } from "../manage/characterDefeat";
import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState";
import { updateStatus } from "../manage/itemStatusUpdater";
import { clearAllLogs, logMessage } from "../ui/logMessage";
import { startTurn, markPlayerTurnDone, markEnemyTurnDone, proceedTurn, markSkillUsed, } from "../manage/turnController";
export function handleDefaultAttack(defaultAttackBtn) {
    defaultAttackBtn.addEventListener("click", () => {
        startTurn();
        const player = getCurrentPlayer();
        const enemy = getCurrentEnemy();
        const damage = Math.max(player.physicalStrength - enemy.defense, 1);
        enemy.hp -= damage;
        if (enemy.hp <= 0)
            enemy.hp = 0;
        logMessage(`${player.name} の攻撃！${enemy.name} に ${damage} ダメージ！`, `(${enemy.name}のHP：${enemy.hp})`);
        updateStatus(uiElements);
        if (enemy.hp <= 0) {
            setTimeout(() => {
                handleCharacterDefeat(enemy, null, true);
            }, 1000);
            return;
        }
        else {
            delayedEnemyAction(850);
        }
        updateStatus(uiElements);
        markPlayerTurnDone();
        proceedTurn();
    });
}
export function enemyAction() {
    const playerData = getCurrentPlayer();
    let player;
    if (playerData instanceof Object && "inventory" in playerData) {
        player = playerData;
    }
    else {
        throw new Error("Player の取得に失敗しました");
    }
    const enemyData = getCurrentEnemy();
    let enemy;
    if (enemyData instanceof Object) {
        enemy = enemyData;
    }
    else {
        throw new Error("Enemy の取得に失敗しました");
    }
    if (enemy.hp <= 0)
        return;
    let action;
    if (enemy.hp >= enemy.maxHp * 0.7) {
        action = Math.random() < 0.95 ? "attack" : "heal";
    }
    else if (enemy.hp <= enemy.maxHp * 0.3) {
        action = Math.random() < 0.4 ? "attack" : "heal";
    }
    else {
        action = Math.random() < 0.7 ? "attack" : "heal";
    }
    if (action === "attack") {
        const useSkill = Math.random() < (enemy.hp >= enemy.maxHp * 0.7 ? 0.05 : enemy.hp <= enemy.maxHp * 0.3 ? 0.5 : 0.3);
        if (!useSkill) {
            const damage = Math.max(enemy.physicalStrength - player.defense, 1);
            player.hp -= damage;
            logMessage(`${enemy.name} の攻撃！\n ${player.name} は${damage} ダメージを受けた！`, `(${player.name}のHP：${player.hp})`);
            if (player.hp <= 0) {
                clearAllLogs();
                player.hp = 0;
                handleCharacterDefeat(player, null, true);
                return;
            }
        }
        else {
            const randomNum = Math.floor(Math.random() * 100);
            const skillIndex = randomNum < 50 ? 0 : randomNum < 80 ? 1 : 2;
            activateSkill(skillIndex, enemy, player);
            markSkillUsed();
        }
    }
    else {
        activateSkill(3, enemy, player); // 回復スキル固定位置
        markSkillUsed();
    }
    updateStatus(uiElements);
    markEnemyTurnDone();
    proceedTurn();
}
export function delayedEnemyAction(delay = 1000) {
    setTimeout(() => {
        enemyAction();
    }, delay);
}
