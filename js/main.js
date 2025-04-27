// // btn.js実装後
// // main.js

// // import { Character } from "./class/character.js";
// import { playerClass } from "./manage/player.js";
// import { enemyTemplates, createEnemy } from "./manage/enemy.js"; // ← 修正：テンプレート＋生成関数をimport
// import { allItemsList } from "./manage/item.js";
// import { logMessage } from "./manage/utils.js";
// import { setGameState, handleDefaultAttack, handleSkillAttack, handleHeal, handleToggle } from "./manage/btn.js";

// // === DOM要素の取得 ===
// const gameArea = document.querySelector(".game-area");
// const selectPlayerArea = document.querySelector(".select-player-area");
// const selectWarriorBtn = document.getElementById("select-warrior");
// const selectMageBtn = document.getElementById("select-mage");
// // === status系 ===
// const playerStatus = document.getElementById("player-status");
// const enemyStatus = document.getElementById("enemy-status");
// const itemStatus = document.getElementById("inventory-area");
// const equipmentStatus = document.getElementById("equipment-status");

// // === ボタン系
// const defaultAttackBtn = document.getElementById("default-attack");
// const skillAttackBtn = document.getElementById("skill-attack");
// const healBtn = document.getElementById("heal-btn");

// // トグル系
// const toggleHealBtn = document.getElementById("toggle-heal-items");
// const toggleEquipBtn = document.getElementById("toggle-equip-items");
// const toggleSkillBtn = document.getElementById("toggle-skill-list")
// const healItemsDiv = document.getElementById("heal-items");
// const equipItemsDiv = document.getElementById("equip-items");
// const skillDiv = document.getElementById("skill-list")
// const playerNameInput = document.getElementById("player-name-input");

// // その他
// const nextStageBtn = document.getElementById("next-stage");


// // === ゲーム状態 ===
// let currentPlayer = null;
// let currentEnemyIndex = 0;
// let currentEnemy = createEnemy(enemyTemplates[currentEnemyIndex]); // ★最初の敵は生成して持つ

// // === 職業選択 ===
// selectWarriorBtn.addEventListener("click", () => {
//     const name = playerNameInput.value.trim();
//     if (name === "") {
//         alert("名前を入力してください！");
//         return;
//     }
//     currentPlayer = playerClass[0];
//     currentPlayer.name = name;
//     startGame();
// });

// selectMageBtn.addEventListener("click", () => {
//     const name = playerNameInput.value.trim();
//     if (name === "") {
//         alert("名前を入力してください！");
//         return;
//     }
//     currentPlayer = playerClass[1];
//     currentPlayer.name = name;
//     startGame();
// });

// // === ゲーム開始 ===
// function startGame() {
//     const selectedClassName = currentPlayer.className;
//     selectPlayerArea.style.display = "none";
//     gameArea.style.display = "block";

//     currentPlayer.inventory = [...allItemsList];
//     logMessage(`${currentPlayer.name} は、${selectedClassName}を選んだ！ゲーム開始！`);

//     setGameState(currentPlayer, currentEnemy, currentEnemyIndex);

//     handleDefaultAttack(defaultAttackBtn, nextStageBtn, updateStatus, logMessage, handleEnemyDefeated); // ← ★後で修正ポイントあり
//     handleSkillAttack(skillAttackBtn);
//     handleHeal(healBtn, updateStatus);
//     handleToggle(toggleHealBtn, toggleEquipBtn, toggleSkillBtn, healItemsDiv, equipItemsDiv, skillDiv);

//     updateStatus();
// }

// // === ステータス更新 ===
// export function updateStatus() {
//     if (!currentPlayer) {
//         return;
//     }
//     equipmentStatus.textContent = currentPlayer.equipment
//         ? `装備: ${currentPlayer.equipment.name}`
//         : "装備：未装備";

//     playerStatus.textContent = currentPlayer.getStatus();
//     enemyStatus.textContent = currentEnemy.getStatus();

//     healItemsDiv.innerHTML = "";
//     equipItemsDiv.innerHTML = "";

//     let hasHealItem = false;
//     let hasEquipItem = false;

//     currentPlayer.inventory.forEach((item) => {
//         const p = document.createElement("p");
//         p.textContent = `${item.showAmount()}`;

//         p.addEventListener("click", () => {
//             if (item.type === "heal" && currentPlayer.hp === currentPlayer.maxHp) {
//                 return logMessage(`HPがMAXなため、薬は使用不可`);
//             }

//             currentPlayer.useItem(item);

//             item.amount--;
//             if (item.amount <= 0) {
//                 const index = currentPlayer.inventory.indexOf(item);
//                 currentPlayer.inventory.splice(index, 1);
//             }
//             updateStatus();
//         });

//         if (item.type === "heal" && item.amount > 0) {
//             healItemsDiv.appendChild(p);
//             hasHealItem = true;
//         } else if (item.type === "equipment" && item.amount > 0) {
//             equipItemsDiv.appendChild(p);
//             hasEquipItem = true;
//         }
//     });
//     // アイテムがない場合のメッセージを出す！！
//     if (hasHealItem === false) {
//         healItemsDiv.innerText = "アイテムはまだありません";
//         healItemsDiv.style.color = "gray";
//     }
//     if (hasEquipItem === false) {
//         equipItemsDiv.innerText = "装備はまだありません";
//         equipItemsDiv.style.color = "gray";
//     };
// }

// // === 敵を倒した後の処理 ===

// export function handleEnemyDefeated() {
//     currentEnemyIndex++;
//     if (currentEnemyIndex >= enemyTemplates.length) {
//         logMessage("すべての敵を倒しました！クリア！");
//         nextStageBtn.style.opacity = "1";
//     } else {
//         currentEnemy = createEnemy(enemyTemplates[currentEnemyIndex]); // ★次の敵を新しく生成！！

//         setGameState(currentPlayer, currentEnemy, currentEnemyIndex); // ← ★ここ追加！！！

//         logMessage(`次の敵 ${currentEnemy.name} が現れた！`);
//         updateStatus();
//         console.log("切り替え後のcurrentEnemy:", currentEnemy.name, currentEnemy.className, currentEnemy.hp);
//     }
// }


