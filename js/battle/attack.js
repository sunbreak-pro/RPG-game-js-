// battle/attack.js
import { clearBattleLog, logMessage } from "../manage/utils.js";
import { handleCharacterDefeat } from "../manage/utils.js";
import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { dropRandomItem } from "../manage/item.js";
import { updateStatus } from "../ui/statusUpdater.js";
import { uiElements } from "../main.js";
// import { setStageContext } from "../manage/battleState.js";

export function handleDefaultAttack(defaultAttackBtn) {
    defaultAttackBtn.addEventListener("click", () => {
        const player = getCurrentPlayer();
        const enemy = getCurrentEnemy();
        console.log("DEBUG: player =", player);
        console.log("DEBUG: enemy =", enemy);
        // プレイヤーの攻撃
        const damage = Math.max(player.attack - enemy.defense, 1);
        enemy.hp -= damage;
        logMessage(`${player.name} の攻撃！${enemy.name} に ${damage} ダメージ！`,"");

        // 敵死亡チェック
        handleCharacterDefeat(enemy, {
            defaultAttackBtn,
            nextStageBtn: document.getElementById("next-stage"),
            gameArea: document.querySelector(".game-area"),
            selectPlayerArea: document.querySelector(".select-player-area")
        });
        updateStatus(uiElements);
        // 敵が生きてたら敵ターン
        if (enemy.hp > 0) {
            enemyAction();
        }else{
            const hpRecover = Math.floor(player.maxHp * 0.2);
            const mpRecover = Math.floor(player.maxMp * 0.2);
            player.hp = Math.min(player.hp + hpRecover, player.maxHp);
            player.mp = Math.min(player.mp + mpRecover, player.maxMp);
            logMessage(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`,"");
            dropRandomItem(player);
            updateStatus();
            console.log("キャラクターのステータス", player.getStatus(),enemy.getStatus());
        }
    });
}

// 敵行動
export function enemyAction() {
    const currentPlayer = getCurrentPlayer();
    const currentEnemy = getCurrentEnemy();
    if (currentEnemy.hp <= 0) {
        handleCharacterDefeat(currentEnemy, logMessage)
        return;
    }
    let action = null;
    if(currentEnemy.hp >= currentEnemy.maxHp *0.7){
    action = Math.random() < 0.95 ? "attack" : "heal";
    }else if(currentEnemy.hp <= currentEnemy.maxHp *0.3){
        action = Math.random() < 0.3 ? "attack" : "heal";
    }
    else{
        action = Math.random() < 0.5 ? "attack" : "heal";
    }
    if (action === "attack") {
        const damage = Math.max(currentEnemy.attack - currentPlayer.defense, 1);
        currentPlayer.hp -= damage;
        logMessage(`${currentEnemy.name} の攻撃！\n ${currentPlayer.name} は${damage} ダメージを受けた！`,"");

        if (currentPlayer.hp <= 0) {
            clearBattleLog();
            currentPlayer.hp = 0;
            handleCharacterDefeat(currentPlayer, {
                defaultAttackBtn:  document.getElementById("default-attack"),
                nextStageBtn: document.getElementById("next-stage"),
                gameArea: document.querySelector(".game-area"),
                selectPlayerArea: document.querySelector(".select-player-area")
            });
            return;
        }
    } else {
        if (currentEnemy.mp >= 5) {
            const healAmount = currentEnemy.healSkill || 20;
            currentEnemy.hp = Math.min(currentEnemy.hp + healAmount, currentEnemy.maxHp);
            currentEnemy.mp -= 5;
            logMessage(`${currentEnemy.name} は回復スキルで ${healAmount} 回復した！`,"");
        } else {
            logMessage(`${currentEnemy.name} は回復しようとしたがMPが足りない！`,"");
        }
    }
    updateStatus(uiElements);
}
