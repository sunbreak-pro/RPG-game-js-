// battle/skill.js

import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { enemyAction } from "../battle/attack.js";
import { handleCharacterDefeat,logMessage } from "../manage/utils.js"
import { updateStatus } from "../ui/statusUpdater.js";


// === スキルデータ ===
export const skillList = [
    {
        name: "ファイアボール",
        mpCost: 10,
        effect: (user, target) => {
            const damage = Math.floor(user.attack * 1.5);
            target.hp -= damage;
            logMessage(`${user.name} のファイアボール！ ${target.name} に ${damage} ダメージ！`);
            if(target.hp<=0){
                target.hp = 0
                handleCharacterDefeat(target);
            }
        }
    },
    {
        name: "アイスランス",
        mpCost: 12,
        effect: (user, target) => {
            const damage = Math.floor(user.attack * 1.3);
            target.hp -= damage;
            logMessage(`${user.name} のアイスランス！ ${target.name} に ${damage} ダメージ！`);
        }
    },
    {
        name: "自己回復",
        mpCost: 8,
        effect: (user) => {
            if(user.hp !== user.maxHp){
                const healAmount = user.attack;
                user.hp = Math.min(user.maxHp, user.hp + healAmount);
                logMessage(`${user.name} は自己回復してHPを${healAmount}回復！(現在のHP：${user.hp})`);
            }
            else{
                user.mp = 
                logMessage(`${user.name} のHPは既に MAX です！`);
            }
        }
    }
];

// === スキル発動
export function activateSkill(skillIndex) {
    const currentPlayer = getCurrentPlayer();
    const currentEnemy = getCurrentEnemy();
    const skill = skillList[skillIndex];

    if (!skill) {
        logMessage("スキルが見つかりません！");
        return;
    }
    if (currentPlayer.mp < skill.mpCost) {
        logMessage(`${currentPlayer.name} はMPが足りない！`);
        return;
    }
    currentPlayer.mp -= skill.mpCost;
    if (skill.effect.length === 2) {
        skill.effect(currentPlayer, currentEnemy);
    } else {
        skill.effect(currentPlayer);
    }
    enemyAction();
    updateStatus();
}
