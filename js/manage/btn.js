// btn.js

import { clearBattleLog, logMessage } from "./utils.js";
import { dropRandomItem } from "./item.js";
import { enemyTemplates } from "./enemy.js"; // 敵テンプレートも必要


let currentPlayer;
let currentEnemy;
let currentEnemyIndex;

// 初期化用（main.jsから受け取る）
export function setGameState(player, enemy, enemyIndex) {
    currentPlayer = player;
    currentEnemy = enemy;
    currentEnemyIndex = enemyIndex;
}

// 通常攻撃処理（handleEnemyDefeatedも引数で受け取る！）
export function handleDefaultAttack(defaultAttackBtn, nextStageBtn, updateStatus, logMessage, handleEnemyDefeated) {
    defaultAttackBtn.addEventListener("click", () => {
        if (currentEnemy.hp > 0 && currentPlayer.hp > 0) {
            currentPlayer.attackTarget(currentEnemy);
            if (currentEnemy.hp > 0) {
                currentEnemy.attackTarget(currentPlayer);
            } else {
                clearBattleLog();
                const hpRecover = Math.floor(currentPlayer.maxHp * 0.2);
                const mpRecover = Math.floor(currentPlayer.maxMp * 0.2);

                currentPlayer.hp = Math.min(currentPlayer.hp + hpRecover, currentPlayer.maxHp);
                currentPlayer.mp = Math.min(currentPlayer.mp + mpRecover, currentPlayer.maxMp);

                logMessage(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`);

                dropRandomItem(currentPlayer); // ドロップアイテム処理

                // ★ここ！敵を倒したらhandleEnemyDefeated()を呼ぶ！
                handleEnemyDefeated();
                updateStatus();
                console.log("切り替え後のcurrentEnemy:", currentEnemy.name, currentEnemy.className, currentEnemy.hp);
            }
        }
    });
}

// スキル攻撃処理
export function handleSkillAttack(skillAttackBtn) {
    skillAttackBtn.addEventListener("click", () => {
        const skillDamage = currentPlayer.attack * 2;
        currentEnemy.hp -= skillDamage;
        logMessage(`${currentPlayer.name}はスキル攻撃を使った！${skillDamage}のダメージ！`);

        if (currentEnemy.hp <= 0) {
            currentEnemy.hp = 0;
            logMessage(`${currentEnemy.name}を倒した！`);
        }
    });
}

// 回復スキル処理
export function handleHeal(healBtn, updateStatus) {
    healBtn.addEventListener("click", () => {

        if (currentPlayer.hp >= 0 && currentPlayer.hp <= currentPlayer.maxHp) {
            currentPlayer.useHealSkill();
        }
        
        updateStatus();
    });
}

// トグル開閉処理
export function handleToggle(toggleHealBtn, toggleEquipBtn, toggleSkillBtn, healItemsDiv, equipItemsDiv, skillDiv) {
    toggleHealBtn.addEventListener("click", () => {
        if (healItemsDiv.style.display === "none") {
            healItemsDiv.style.display = "block";
            toggleHealBtn.textContent = "▼ 道具を閉じる";
        } else {
            healItemsDiv.style.display = "none";
            toggleHealBtn.textContent = "▶︎ 道具を開く";
        }
    });

    toggleEquipBtn.addEventListener("click", () => {
        if (equipItemsDiv.style.display === "none") {
            equipItemsDiv.style.display = "block";
            toggleEquipBtn.textContent = "▼ 装備を閉じる";
        } else {
            equipItemsDiv.style.display = "none";
            toggleEquipBtn.textContent = "▶︎ 装備を開く";
        }
    });

    toggleSkillBtn.addEventListener("click",() =>{
        if (skillDiv.style.display === "none") {
            skillDiv.style.display = "block";
            toggleSkillBtn.textContent = "▼ 一覧を閉じる";
        } else {
            skillDiv.style.display = "none";
            toggleSkillBtn.textContent = "▶︎ スキル一覧";
        }
    })
}
