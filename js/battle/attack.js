import { uiElements,nextStageBtn } from "../main.js";

import { handleCharacterDefeat } from "../manage/characterDefeat.js";
import { getCurrentPlayer, getCurrentEnemy} from "../manage/battleState.js";
import { updateStatus } from "../manage/statusUpdater.js";
import { dropRandomItem } from "../manage/item.js";

import { clearAllLogs, logMessage } from "../ui/logMessage.js";

export function handleDefaultAttack(defaultAttackBtn) {
    defaultAttackBtn.addEventListener("click", () => {
        const player = getCurrentPlayer();
        const enemy = getCurrentEnemy();
        // battleLogArea.style.display = ""
        // afterBattleLogArea.style.display = "none"
        
        // プレイヤーのターン
        // 敵が生きてたら敵ターン
        const damage = Math.max(player.physicalStrength - enemy.defense, 1);
        enemy.hp -= damage;
        logMessage(`${player.name} の攻撃！${enemy.name} に ${damage} ダメージ！`,"");
        handleCharacterDefeat(enemy,null,true);
        updateStatus(uiElements);
        console.log("キャラクターのステータス", player.getPlayerStatus(),enemy.getEnemyStatus());

        if (enemy.hp > 0) {
            enemyAction();
        }else{
            if(nextStageBtn.style.display === ""){
                console.log(enemy.name);
                const hpRecover = Math.floor(player.maxHp * 0.2);
                const mpRecover = Math.floor(player.maxMp * 0.2);
                player.hp = Math.min(player.hp + hpRecover, player.maxHp);
                player.mp = Math.min(player.mp + mpRecover, player.maxMp);
                logMessage(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`,"");
                dropRandomItem(player);
            }
            updateStatus();
            console.log("キャラクターのステータス", player.getPlayerStatus(),enemy.getEnemyStatus());
        }
    });
}

// 敵行動
export function enemyAction() {
    const player = getCurrentPlayer();
    const enemy = getCurrentEnemy();
    console.log(enemy);
    if (enemy.hp <= 0) {
        return;
    }
    let action = null;
    if(enemy.hp >= enemy.maxHp *0.7){
        action = Math.random() < 0.95 ? "attack" : "heal";
    }else if(enemy.hp <= enemy.maxHp *0.3){
        action = Math.random() < 0.3 ? "attack" : "heal";
    }
    else{
        action = Math.random() < 0.5 ? "attack" : "heal";
    }
    if (action === "attack") {
        const damage = Math.max(enemy.physicalStrength - player.defense, 1);
        player.hp -= damage;
        logMessage(`${enemy.name} の攻撃！\n ${player.name} は${damage} ダメージを受けた！`,"");
        if (player.hp <= 0) {
            clearAllLogs();
            player.hp = 0;
            handleCharacterDefeat(player,null,true);
            return;
        }
    }
    else {
        if (enemy.mp >= 5) {
            const healAmount = enemy.magicalStrength || 20;
            enemy.hp = Math.min(enemy.hp + healAmount, enemy.maxHp);
            enemy.mp -= 5;
            logMessage(`${enemy.name} は回復スキルで ${healAmount} 回復した！`,"");
        }
        else {
            logMessage(`${enemy.name} は回復しようとしたがMPが足りない`,"");
        }
    }
    updateStatus(uiElements);
}
