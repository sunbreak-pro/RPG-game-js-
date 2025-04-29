// import { handleDefaultAttack } from "./attack.js";
// import { activateSkill } from "./skill.js"; // スキルもattack.jsにまとめた場合
// import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
// import { logMessage } from "../manage/utils.js";


// === プレイヤー行動管理 ===
// export function setupPlayerActions({
//     attackButton,
//     skillButton,
//     healButton,
//     nextStageButton,
//     updateStatusFunc
// }) {
//     handleDefaultAttack(attackButton);
//     handleSkillButton(skillButton, updateStatusFunc);
//     handleHealSkill(healButton);

//     if (nextStageButton) {
//         nextStageButton.addEventListener("click", () => {
//             // 次のステージへ進む処理（今後拡張できる）
//             console.log("次のステージへ！");
//         });
//     }
// }

// // スキルボタン専用
// function handleSkillButton(skillBtnElement, updateStatusFunc) {
//     skillBtnElement.addEventListener("click", () => {
//         const skillIndex = 0; // ここはUI側で選択させるなら拡張！
//         activateSkill(skillIndex);
//         updateStatusFunc();
//     });
// }


// export function enemyAction() {
//     const currentPlayer = getCurrentPlayer();
//     const currentEnemy = getCurrentEnemy();
//     if (currentEnemy.hp <= 0) return;

//     const action = Math.random() < 0.5 ? "attack" : "heal";

//     if (action === "attack") {
        
//         const damage = Math.max(currentEnemy.attack - currentPlayer.defense, 1);
//         currentPlayer.hp -= damage;
//         logMessage(`${currentEnemy.name} の攻撃！ ${damage} ダメージを受けた！`,"");

//         if (currentPlayer.hp <= 0) {
//             clearBattleLog();
//             currentPlayer.hp = 0;
//             handleCharacterDefeat(currentPlayer, logMessage, uiElements);
//             return;
//         }
//     } else {
//         if (currentEnemy.mp >= 5) {
//             const healAmount = currentEnemy.healSkill || 20;
//             currentEnemy.hp = Math.min(currentEnemy.hp + healAmount, currentEnemy.maxHp);
//             currentEnemy.mp -= 5;
//             logMessage(`${currentEnemy.name} は回復スキルで ${healAmount} 回復した！`);
//         } else {
//             logMessage(`${currentEnemy.name} は回復しようとしたがMPが足りない！`,"");
//         }
//     }
//     updateStatus();
// }