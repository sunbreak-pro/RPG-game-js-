// import { Character } from "./class/character.js";
// import { playerClass } from "./class/player.js";
// import { enemies } from "./class/enemy.js";
// import { Item, allItemsList, dropRandomItem } from "./class/item.js";
// import { logMessage, clearBattleLogIfFirst } from "./class/utils.js";

// // === DOM要素の取得 ===
// const gameArea = document.querySelector(".game-area");
// const selectPlayerArea = document.querySelector(".select-player-area");

// const playerStatus = document.getElementById("player-status");
// const enemyStatus = document.getElementById("enemy-status");
// const itemStatus = document.getElementById("inventory-area");
// const battleLog = document.getElementById("battle-log");
// const defaultAttackBtn = document.getElementById("default-attack");
// const skillAttackBtn = document.getElementById("skill-attack");
// const healBtn = document.getElementById("heal-btn");
// const nextStageBtn = document.getElementById("next-stage");
// const equipmentStatus = document.getElementById("equipment-status");

// const selectWarriorBtn = document.getElementById("select-warrior");
// const selectMageBtn = document.getElementById("select-mage");

// const toggleHealBtn = document.getElementById("toggle-heal-items");
// const toggleEquipBtn = document.getElementById("toggle-equip-items");
// const healItemsDiv = document.getElementById("heal-items");
// const equipItemsDiv = document.getElementById("equip-items");

// // === ゲーム状態 ===
// let currentPlayer = null;
// let currentEnemyIndex = 0;
// let currentEnemy = enemies[currentEnemyIndex];

// // === キャラ選択 ===
// selectWarriorBtn.addEventListener("click", () => {
//     currentPlayer = playerClass[0]; // 戦士
//     startGame();
// });

// selectMageBtn.addEventListener("click", () => {
//     currentPlayer = playerClass[1]; // 魔法使い
//     startGame();
// });

// function useSkillAttack(player, enemy) {
//     const skillDamage = player.attack * 2; // スキルは攻撃力の2倍！
//     enemy.hp -= skillDamage;
//     console.log(`${player.name}はスキル攻撃を使った！${skillDamage}のダメージ！`);
    
//     // 敵のHPが0以下になったら倒す
//     if (enemy.hp <= 0) {
//       console.log(`${enemy.name}を倒した！`);
//       // 敵を倒す処理をここで実行（例: dropアイテム処理とか）
//     }
//   }

//   skillAttackBtn.addEventListener('click', function() {
//     useSkillAttack(currentPlayer, currentEnemy);
//   });

// // === ゲーム開始 ===
// function startGame() {
//     selectPlayerArea.style.display = "none";
//     gameArea.style.display = "block";

//     currentPlayer.inventory = [...allItemsList]; // 初期アイテム配布
//     logMessage(`${currentPlayer.name} を選んだ！ゲーム開始！`);

//     updateStatus();
// }

// // === ステータス更新 ===
// function updateStatus() {
//     if (!currentPlayer) {
//         console.error("プレイヤーがまだ選択されていません！");
//         return;
//     }

//     // 装備情報
    
//     equipmentStatus.textContent = currentPlayer.equipment
//         ? `装備: ${currentPlayer.equipment.name}`
//         : "装備：未装備";

//     playerStatus.textContent = currentPlayer.getStatus();
//     enemyStatus.textContent = currentEnemy.getStatus();

//     healItemsDiv.innerHTML = "";
//     equipItemsDiv.innerHTML = "";

//     currentPlayer.inventory.forEach((item) => {
//         const p = document.createElement("p");
//         p.textContent = `${item.showAmount()}`;

//         p.addEventListener("click", () => {
//             if (item.type === "heal" && currentPlayer.hp === currentPlayer.maxHp) {
//                 return logMessage(`HPがMAXなため、薬は使用不可`);
//             }

//             currentPlayer.useItem(item);

//             if (item.type === "heal") {
//                 item.amount--;
//                 if (item.amount <= 0) {
//                     const index = currentPlayer.inventory.indexOf(item);
//                     currentPlayer.inventory.splice(index, 1);
//                 }
//             }
//             updateStatus();
//         });

//         if (item.type === "heal" && item.amount > 0) {
//             healItemsDiv.appendChild(p);
//         } else if (item.type === "equipment" && item.amount > 0) {
//             equipItemsDiv.appendChild(p);
//         }
//         // else{
//         //     equipItemsDiv.style.color = "gray";
//         //     equipItemsDiv.innerHTML = "装備はまだ持っていません\n";
//         // }
//     });
// }

// // === ボタン操作 ===
// defaultAttackBtn.addEventListener("click", () => {
//     clearBattleLogIfFirst();
//     if (currentEnemy.hp > 0 && currentPlayer.hp > 0) {
//         currentPlayer.attackTarget(currentEnemy);
//         if (currentEnemy.hp > 0) {
//             currentEnemy.attackTarget(currentPlayer);
//         } else {
            
//             logMessage(`${currentEnemy.name} を倒した！`);

//             const hpRecover = Math.floor(currentPlayer.maxHp * 0.2);
//             const mpRecover = Math.floor(currentPlayer.maxMp * 0.2);

//             currentPlayer.hp = Math.min(currentPlayer.hp + hpRecover, currentPlayer.maxHp);
//             currentPlayer.mp = Math.min(currentPlayer.mp + mpRecover, currentPlayer.maxMp);

//             logMessage(`勝利ボーナス！HPが${hpRecover}、MPが${mpRecover}回復した！`);

//             dropRandomItem(currentPlayer); // ドロップアイテム追加

//             currentEnemyIndex++;
//             if (currentEnemyIndex >= enemies.length) {
//                 logMessage("すべての敵を倒しました！クリア！");
//                 nextStageBtn.style.opacity = "1";
//             } else {
//                 currentEnemy = enemies[currentEnemyIndex];
//                 logMessage(`次の敵 ${currentEnemy.name} が現れた！`);
//             }
//         }
//         updateStatus();
//     }
// });

// healBtn.addEventListener("click", () => {
//     clearBattleLogIfFirst();

//     if (currentPlayer.hp >= 0 && currentPlayer.hp <= currentPlayer.maxHp) {
//         currentPlayer.useHealSkill();
//         if (currentEnemy.hp >= 0 && currentEnemy.hp <= currentEnemy.maxHp) {
//             currentEnemy.useHealSkill();
//         }
//     }
//     updateStatus();
// });

// // === トグル開閉 ===
// toggleHealBtn.addEventListener("click", () => {
//     if (healItemsDiv.style.display === "none") {
//         healItemsDiv.style.display = "block";
//         toggleHealBtn.textContent = "▼ 道具を閉じる";
//     } else {
//         healItemsDiv.style.display = "none";
//         toggleHealBtn.textContent = "▶︎ 道具を開く";
//     }
// });

// toggleEquipBtn.addEventListener("click", () => {
//     if (equipItemsDiv.style.display === "none") {
//         equipItemsDiv.style.display = "block";
//         toggleEquipBtn.textContent = "▼ 装備を閉じる";
//     } else {
//         equipItemsDiv.style.display = "none";
//         toggleEquipBtn.textContent = "▶︎ 装備を開く";
//     }
// });


// btn.js実装後

// main.js

import { Character } from "./class/character.js";
import { playerClass } from "./class/player.js";
import { enemyTemplates, createEnemy } from "./class/enemy.js"; // ← 修正：テンプレート＋生成関数をimport
import { Item, allItemsList } from "./class/item.js";
import { logMessage } from "./class/utils.js";
import { setGameState, handleDefaultAttack, handleSkillAttack, handleHeal, handleToggle } from "./class/btn.js";

// === DOM要素の取得 ===
const gameArea = document.querySelector(".game-area");
const selectPlayerArea = document.querySelector(".select-player-area");
const selectWarriorBtn = document.getElementById("select-warrior");
const selectMageBtn = document.getElementById("select-mage");

const playerStatus = document.getElementById("player-status");
const enemyStatus = document.getElementById("enemy-status");
const itemStatus = document.getElementById("inventory-area");
const equipmentStatus = document.getElementById("equipment-status");

const defaultAttackBtn = document.getElementById("default-attack");
const skillAttackBtn = document.getElementById("skill-attack");
const healBtn = document.getElementById("heal-btn");

const nextStageBtn = document.getElementById("next-stage");

const toggleHealBtn = document.getElementById("toggle-heal-items");
const toggleEquipBtn = document.getElementById("toggle-equip-items");
const toggleSkillBtn = document.getElementById("toggle-skill-list")
const healItemsDiv = document.getElementById("heal-items");
const equipItemsDiv = document.getElementById("equip-items");
const skillDiv = document.getElementById("skill-list")
const playerNameInput = document.getElementById("player-name-input");

// === ゲーム状態 ===
let currentPlayer = null;
let currentEnemyIndex = 0;
let currentEnemy = createEnemy(enemyTemplates[currentEnemyIndex]); // ★最初の敵は生成して持つ

// === 職業選択 ===
selectWarriorBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name === "") {
        alert("名前を入力してください！");
        return;
    }
    currentPlayer = playerClass[0];
    currentPlayer.name = name;
    startGame();
});

selectMageBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name === "") {
        alert("名前を入力してください！");
        return;
    }
    currentPlayer = playerClass[1];
    currentPlayer.name = name;
    startGame();
});

// === ゲーム開始 ===
function startGame() {
    const selectedClassName = currentPlayer.className;
    selectPlayerArea.style.display = "none";
    gameArea.style.display = "block";

    currentPlayer.inventory = [...allItemsList];
    logMessage(`${currentPlayer.name} は、${selectedClassName}を選んだ！ゲーム開始！`);

    setGameState(currentPlayer, currentEnemy, currentEnemyIndex);

    handleDefaultAttack(defaultAttackBtn, nextStageBtn, updateStatus, logMessage, handleEnemyDefeated); // ← ★後で修正ポイントあり
    handleSkillAttack(skillAttackBtn);
    handleHeal(healBtn, updateStatus);
    handleToggle(toggleHealBtn, toggleEquipBtn, toggleSkillBtn, healItemsDiv, equipItemsDiv, skillDiv);

    updateStatus();
}

// === ステータス更新 ===
export function updateStatus() {
    if (!currentPlayer) {
        return;
    }
    equipmentStatus.textContent = currentPlayer.equipment
        ? `装備: ${currentPlayer.equipment.name}`
        : "装備：未装備";

    playerStatus.textContent = currentPlayer.getStatus();
    enemyStatus.textContent = currentEnemy.getStatus();

    healItemsDiv.innerHTML = "";
    equipItemsDiv.innerHTML = "";

    let hasHealItem = false;
    let hasEquipItem = false;

    currentPlayer.inventory.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.showAmount()}`;

        p.addEventListener("click", () => {
            if (item.type === "heal" && currentPlayer.hp === currentPlayer.maxHp) {
                return logMessage(`HPがMAXなため、薬は使用不可`);
            }

            currentPlayer.useItem(item);

            item.amount--;
            if (item.amount <= 0) {
                const index = currentPlayer.inventory.indexOf(item);
                currentPlayer.inventory.splice(index, 1);
            }
            updateStatus();
        });

        if (item.type === "heal" && item.amount > 0) {
            healItemsDiv.appendChild(p);
            hasHealItem = true;
        } else if (item.type === "equipment" && item.amount > 0) {
            equipItemsDiv.appendChild(p);
            hasEquipItem = true;
        }
    });
    // アイテムがない場合のメッセージを出す！！
    if (hasHealItem === false) {
        healItemsDiv.innerText = "アイテムはまだありません";
        healItemsDiv.style.color = "gray";
    }
    if (hasEquipItem === false) {
        equipItemsDiv.innerText = "装備はまだありません";
        equipItemsDiv.style.color = "gray";
    };
}

// === 敵を倒した後の処理 ===

export function handleEnemyDefeated() {
    currentEnemyIndex++;
    if (currentEnemyIndex >= enemyTemplates.length) {
        logMessage("すべての敵を倒しました！クリア！");
        nextStageBtn.style.opacity = "1";
    } else {
        currentEnemy = createEnemy(enemyTemplates[currentEnemyIndex]); // ★次の敵を新しく生成！！

        setGameState(currentPlayer, currentEnemy, currentEnemyIndex); // ← ★ここ追加！！！

        logMessage(`次の敵 ${currentEnemy.name} が現れた！`);
        updateStatus();
        console.log("切り替え後のcurrentEnemy:", currentEnemy.name, currentEnemy.className, currentEnemy.hp);
    }
}


