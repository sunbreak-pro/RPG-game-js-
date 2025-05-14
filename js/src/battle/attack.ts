// battle/attack.ts
import { uiElements } from "../main";
import { activateSkill } from "./skill";
import { handleCharacterDefeat } from "../manage/characterDefeat";
import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState";
import { updateStatus } from "../manage/itemStatusUpdater";
import { Character } from "../types/characterTypes";
import { clearAllLogs, logMessage } from "../ui/logMessage";
import {
  startTurn,
  markPlayerTurnDone,
  markEnemyTurnDone,
  proceedTurn,
  markSkillUsed,
} from "../manage/turnController";
import { Player } from "../manage/character";
import { Enemy } from "../manage/character";

export function handleDefaultAttack(defaultAttackBtn: HTMLButtonElement): void {
  defaultAttackBtn.addEventListener("click", () => {
    startTurn();

    const player: Character = getCurrentPlayer();
    const enemy: Character = getCurrentEnemy();
    
    const damage = Math.max(player.physicalStrength - enemy.defense, 1);
    enemy.hp -= damage;
    if (enemy.hp <= 0) enemy.hp = 0;

    logMessage(
      `${player.name} の攻撃！${enemy.name} に ${damage} ダメージ！`,
      `(${enemy.name}のHP：${enemy.hp})`
    );

    updateStatus(uiElements);
    if (enemy.hp <= 0) {
      setTimeout(() => {
        handleCharacterDefeat(enemy, null, true);
      }, 1000);
      return;
    } else {
      delayedEnemyAction(850);
    }

    updateStatus(uiElements);
    markPlayerTurnDone();
    proceedTurn();
  });
}

export function enemyAction(): void {

    const playerData = getCurrentPlayer();
    let player: Player;
    if (playerData instanceof Object && "inventory" in playerData) {
    player = playerData as Player;
    } else {
    throw new Error("Player の取得に失敗しました");
    }

    const enemyData = getCurrentEnemy();
    let enemy: Enemy;
    if (enemyData instanceof Object) {
        enemy = enemyData as Enemy;
    } else {
        throw new Error("Enemy の取得に失敗しました");
    }

    if (enemy.hp <= 0) return;

    let action: "attack" | "heal";
    if (enemy.hp >= enemy.maxHp * 0.7) {
        action = Math.random() < 0.95 ? "attack" : "heal";
    } else if (enemy.hp <= enemy.maxHp * 0.3) {
        action = Math.random() < 0.4 ? "attack" : "heal";
    } else {
        action = Math.random() < 0.7 ? "attack" : "heal";
    }

    if (action === "attack") {
        const useSkill = Math.random() < (enemy.hp >= enemy.maxHp * 0.7 ? 0.05 : enemy.hp <= enemy.maxHp * 0.3 ? 0.5 : 0.3);
        if (!useSkill) {
        const damage = Math.max(enemy.physicalStrength - player.defense, 1);
        player.hp -= damage;

        logMessage(
            `${enemy.name} の攻撃！\n ${player.name} は${damage} ダメージを受けた！`,
            `(${player.name}のHP：${player.hp})`
        );

        if (player.hp <= 0) {
            clearAllLogs();
            player.hp = 0;
            handleCharacterDefeat(player, null, true);
            return;
        }
        } else {
        const randomNum = Math.floor(Math.random() * 100);
        const skillIndex = randomNum < 50 ? 0 : randomNum < 80 ? 1 : 2;
        activateSkill(skillIndex, enemy, player);
        markSkillUsed();
        }
    } else {
        activateSkill(3, enemy, player); // 回復スキル固定位置
        markSkillUsed();
    }
    updateStatus(uiElements);
    markEnemyTurnDone();
    proceedTurn();
}

    export function delayedEnemyAction(delay: number = 1000): void {
        setTimeout(() => {
            enemyAction();
        }, delay);
    }
