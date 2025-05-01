import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { enemyAction } from "../battle/attack.js";
import { logMessage } from "../ui/logMessage.js";
import { handleCharacterDefeat } from "../manage/characterDefeat.js"
import { updateStatus } from "../manage/statusUpdater.js";
import { uiElements } from "../main.js";


// === スキルデータ ===
export const skillList = [
    {
        name: "スラッシュ",
        mpCost: 5,
        type: "physics",
        effect: (user, target) => {
            const damage = Math.floor(user.physicalStrength * 1.3);
            target.hp -= damage;
            logMessage(`${user.name} は【スラッシュ】で攻撃！ ${target.name} に ${damage} ダメージ！ (現在のHP：${target.hp})`,"");
        },
        log: (target) => {
            target.hp = 0;
            logMessage(`${target.name} は、細切れにされた\n ${target.name} は倒れた！`);
        },
        Instruction: "名称：スラッシュ\n 少しのオーラを纏った斬撃を放つ。ダメージはキャラクターの物理攻撃×1.3に依存する"
    },
    {
        name: "ファイアボール",
        mpCost: 10,
        type: "magic",
        effect: (user, target) => {
            const damage = Math.floor(user.magicalStrength * 1.3);
            target.hp -= damage;
            logMessage(`${user.name} は 【ファイヤーボール】で攻撃！ ${target.name} に ${damage} ダメージ！ (現在のHP：${target.hp})`,"");
        },
        log: (target) => {
            target.hp = 0;
            logMessage(`${target.name}は、焼き尽くされた\n ${target.name} は倒れた！`);
        },
        Instruction: "名称：ファイヤーボール\n 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する",
    },
    {
        name: "アイスランス",
        mpCost: 12,
        type : "magic",
        effect: (user, target)=>{
            const damage = Math.floor(user.magicalStrength * 1.5);
            target.hp -= damage;
            logMessage(`${user.name} は【アイスランス】で攻撃！ ${target.name} に ${damage} ダメージ！ (現在のHP：${target.hp})`,"");
        },
        log: (target) => {
            target.hp = 0;
            logMessage(`${target.name}は、串刺の中、凍え死んだ \n ${target.name} は倒れた！`);
        },
        Instruction: "名称：アイスランス\n 氷の槍を繰り出す。ダメージはキャラクターの 精神力×1.5 に依存する",
    },
    {
        name: "自己回復",
        mpCost: 8,
        type: "heal",
        effect: (user) => {
            if(user.hp !== user.maxHp){
                const healAmount = Math.floor(user.magicalStrength * 1.5);
                user.hp = Math.min(user.maxHp, user.hp + healAmount);
                logMessage(`${user.name} は自己回復してHPを${healAmount}回復！(現在のHP：${user.hp})`,"");
            }
            else{
                logMessage(`${user.name} のHPは既に MAX です！`,"");
                return;
            }
        },
        log: (user) => {
            if(user.hp !== user.maxHp){
                const healAmount = Math.floor(user.magicalStrength * 1.5);
                user.hp = Math.min(user.maxHp, user.hp + healAmount);
                logMessage(`${user.name} は自己回復してHPを${healAmount}回復！(現在のHP：${user.hp})`,"");
            }
            else{
                logMessage(`${user.name} のHPは既に MAX です！`,"");
                return;
            }
        },
        Instruction: "名称：ファイヤーボール\n 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する",
    },
];

// === スキル発動
export function activateSkill(skillIndex) {
    const player = getCurrentPlayer();
    const enemy = getCurrentEnemy();
    const skill = skillList[skillIndex];

    if (!skill) {
        logMessage("スキルが見つかりません！","");
        return;
    }
    if (player.mp < skill.mpCost) {
        logMessage(`${player.name} はMPが足りない！`,"");
        return;
    }
    player.mp -= skill.mpCost;
    if(skill.type === "heal"){
        // もしモンスター側のスキル関数が作られた時に活躍
        // if(enemy.className === "monster"){
        //     skill.effect(enemy);
        // }else{
        //     skill.effect(player);
        // }
        skill.effect(player);
    }
    skill.effect(player, enemy)
    if (enemy.hp <= 0 && skill.type !== "heal") {
        const afterLog = (typeof skill.log === "function")
        ? () => skill.log(enemy)
        : null;
        handleCharacterDefeat(enemy, afterLog,true);
        return;
    }
    if (player.hp <= 0) {
        const afterLog = (typeof skill.log === "function")
        ? () => skill.log(player)
        : null;
        handleCharacterDefeat(player,afterLog,true);
        return;
    }else{
        enemyAction();
    }
    // if(player.hp <= 0 ){
    //     player.hp = 0;
    // }
    // else if(enemy.hp <= 0){
    //    enemy.hp = 0;
    //    handleCharacterDefeat(enemy);
    // }
    updateStatus(uiElements);
}
// === スキルボタンを生成して並べる ===

export function updateSkillArea(skillDiv, skillList) {
    console.log(skillList)
    skillDiv.innerText = "";
    skillList.forEach((skill, index) => {
        const skillBtn = document.createElement("button");
        skillBtn.textContent = `${skill.name}（消費MP:${skill.mpCost}）`;
        skillBtn.addEventListener('mouseover',()=>{
            // .innerText = skill.Instruction;
            // モーダル関数の引数にInstructionを挿入
        })
        skillBtn.addEventListener("click", () => {
            activateSkill(index); // スキルデータから配列番号を取得
        });
        skillDiv.appendChild(skillBtn);
    });
    updateStatus(uiElements);
}
