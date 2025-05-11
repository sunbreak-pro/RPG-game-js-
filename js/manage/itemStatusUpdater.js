import { uiElements } from "../main.js";
import { getCurrentPlayer, getCurrentEnemy } from "./battleState.js";
import { logMessage } from "../ui/logMessage.js";
import { EquipmentItem, allItemsList } from "./item.js";

const instructionBox = document.getElementById("skill-instruction-box");
const instructionParagraph = document.getElementById("skill-instruction");

export function updateStatus({playerStatus, enemyStatus, healItemsDiv, equipItemsDiv, equippedDiv} = uiElements) {
    const currentPlayer = getCurrentPlayer();
    const currentEnemy = getCurrentEnemy();
    
    if (!currentPlayer) return;
    playerStatus.textContent = currentPlayer.getPlayerStatus();
    enemyStatus.textContent = currentEnemy.getEnemyStatus();
    healItemsDiv.innerHTML = "";
    equipItemsDiv.innerHTML = "";

    let hasHealItem = false;
    let hasEquipItem = false;
    
    currentPlayer.inventory.forEach((item) => {
        if (item.amount <= 0) return;

        const itemBtn = document.createElement("button");
        itemBtn.textContent = `${item.showAmount()}`;
        
        itemBtn.addEventListener("mouseenter", () => {
            instructionBox.style.display = "block";
            instructionParagraph.innerText = item.instructionText;
        });
        itemBtn.addEventListener("mouseleave", () => {
            instructionBox.style.display = "none";
        });
        itemBtn.addEventListener("click", () => {
            instructionBox.style.display = "none";
            if (["hpHeal", "mpHeal", "bothHeal"].includes(item.itemType)) {
                if (item.itemType === "hpHeal" && currentPlayer.hp === currentPlayer.maxHp) {
                    return logMessage(`HPがMAXなため、薬は使用不可`);
                }
                if (item.itemType === "mpHeal" && currentPlayer.mp === currentPlayer.maxMp) {
                    return logMessage(`MPがMAXなため、薬は使用不可`);
                }
                currentPlayer.healItem(item);
            } 
            else if (item.itemType === "equipment") {
                
                currentPlayer.equipItem(item);
                item.isEquipped = true;
            }
            item.amount--;
            if (item.amount <= 0) {
                const index = currentPlayer.inventory.indexOf(item);
                currentPlayer.inventory.splice(index, 1);
            }
            updateStatus(uiElements);
        });
        if (item.itemType === "hpHeal" || item.itemType === "mpHeal" || item.itemType === "bothHeal") {
            healItemsDiv.appendChild(itemBtn);
            hasHealItem = true;
            healItemsDiv.style.color = "black";
        } else if (item.itemType === "equipment") {
            equipItemsDiv.appendChild(itemBtn);
            hasEquipItem = true;
            equipItemsDiv.style.color = "black";
        }
    });

    if (!hasHealItem) {
        healItemsDiv.innerText = "何も持っていない";
        healItemsDiv.style.color = "gray";
        healItemsDiv.style.textAlign = "center"
    }
    if (!hasEquipItem) {
        equipItemsDiv.innerText = "何も持っていない";
        equipItemsDiv.style.color = "gray";
        equipItemsDiv.style.textAlign = "center"
    }
    equippedDiv.innerHTML = "<h3>装備中アイテム</h3>\n";
    if (currentPlayer.equipment.length > 0) {
        currentPlayer.equipment.forEach(eq => {
            const equippedBtn = document.createElement("button");
            let effectText = "";

            if (eq.effect.physicalStrength) {
                effectText += ` 攻撃+${eq.effect.physicalStrength}`;
            }
            if (eq.effect.defense) {
                effectText += ` 防御+${eq.effect.defense}`;
            }

            equippedBtn.textContent = `${eq.name}${effectText}（クリックで外す）`;
            equippedBtn.style.cursor = "pointer";

            equippedBtn.addEventListener("click", () => {
                // ステータスを戻す
                currentPlayer.unequipItem(eq);

                // if (eq.effect.physicalStrength) {
                //     currentPlayer.physicalStrength -= eq.effect.physicalStrength;
                // }
                // if (eq.effect.defense) {
                //     currentPlayer.defense -= eq.effect.defense;
                // }
                // const index = currentPlayer.equipment.indexOf(eq);
                // if (index >= 0) {
                //     currentPlayer.equipment.splice(eq, 1);
                // }
                // console.log(currentPlayer.equipment);

                // // インベントリに戻す（※インベントリにないなら追加）
                // const existing = currentPlayer.inventory.find(i => i.name === eq.name);
                // if (existing) {
                //     existing.amount += 1;
                // } else {
                //     currentPlayer.inventory.push(new EquipmentItem(
                //         eq.name,
                //         eq.itemType,
                //         eq.equipmentType,
                //         eq.effect,
                //         1,
                //         eq.rarity,
                //         eq.instructionText
                //     ));
                // }
                updateStatus(uiElements); // 再描画
            });
            equippedDiv.appendChild(equippedBtn);
            console.log(allItemsList);
        });
    }else{
        equippedDiv.innerHTML += "<p>未装備</p>";
    }
}