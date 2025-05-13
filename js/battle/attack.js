// battle/attack.js
import { uiElements } from "../main.js";
import { activateSkill } from "./skill.js";
import { enemyTemplates } from "../manage/termplates/characterTemplates.js";
import { handleCharacterDefeat } from "../manage/characterDefeat.js";
import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { updateStatus } from "../manage/itemStatusUpdater.js";
import { clearAllLogs, turnLog } from "../ui/logMessage.js";
import { startTurn, markPlayerTurnDone,markEnemyTurnDone,proceedTurn, markSkillUsed } from "../manage/turnController.js";

export function handleDefaultAttack(defaultAttackBtn) {
    defaultAttackBtn.addEventListener("click", () => {
        startTurn();
        const player = getCurrentPlayer();
        const enemy = getCurrentEnemy();

        const damage = Math.max(player.physicalStrength - enemy.defense, 1);
        enemy.hp -= damage;
        if(enemy.hp<=0){
            enemy.hp = 0;
        }
        turnLog(`${player.name} の攻撃！${enemy.name} に ${damage} ダメージ！`, `(${enemy.name}のHP：${enemy.hp})`);

        updateStatus(uiElements);
        console.log("キャラクターのステータス", player.getPlayerStatus(), enemy.getEnemyStatus());

        if (enemy.hp <= 0) {
            enemy.hp = 0;
            updateStatus(uiElements);
            setTimeout(()=>{
                handleCharacterDefeat(enemy, null, true);
            },1000)
            return;
        } else {
            delayedEnemyAction(850);
        }
        updateStatus(uiElements);
        markPlayerTurnDone();
        proceedTurn();
    });
}

export function enemyAction() {
    const player = getCurrentPlayer();
    const enemy = getCurrentEnemy();
    if (enemy.hp <= 0) return;

    let action = null;
    if (enemy.hp >= enemy.maxHp * 0.7) {
        action = Math.random() < 0.95 ? "attack" : "heal";
    } else if (enemy.hp <= enemy.maxHp * 0.3) {
        action = Math.random() < 0.4 ? "attack" : "heal";
    } else {
        action = Math.random() < 0.7 ? "attack" : "heal";
    }

    if (action === "attack") {
        if (enemy.hp >= enemy.maxHp * 0.7) {
            action = Math.random() < 0.95 ? "default" : "skill";
        } else if (enemy.hp <= enemy.maxHp * 0.3) {
            action = Math.random() < 0.5 ? "default" : "skill";
        } else {
            action = Math.random() < 0.7 ? "default" : "skill";
        }

        if (action === "default") {
            const damage = Math.max(enemy.physicalStrength - player.defense, 1);
            player.hp -= damage;
            turnLog(`${enemy.name} の攻撃！\n ${player.name} は${damage} ダメージを受けた！`, `(${player.name}のHP：${player.hp})`);

            if (player.hp <= 0) {
                clearAllLogs();
                player.hp = 0;
                handleCharacterDefeat(player, null, true);
                return;
            }
        } else {
            const randomNum = Math.floor(Math.random() * 100);
            let skillIndex = randomNum < 50 ? 0 : randomNum < 80 ? 1 : 2;
            activateSkill(skillIndex, enemy, player);
            markSkillUsed();
        }
    } else {
        activateSkill(3, enemy, player);
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
