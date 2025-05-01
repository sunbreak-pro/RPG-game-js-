import { uiElements } from "../main.js";

import { getCurrentPlayer, getCurrentEnemy } from "./battleState.js";

import { logMessage } from "../ui/logMessage.js";

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
        // console.log(itemBtn.textContent);
        // console.log(equipItemsDiv);

        itemBtn.addEventListener("click", () => {
            if (["hpHeal", "mpHeal", "bothHeal"].includes(item.type)) {
                if (item.type === "hpHeal" && currentPlayer.hp === currentPlayer.maxHp) {
                    return logMessage(`HPがMAXなため、薬は使用不可`);
                }
                if (item.type === "mpHeal" && currentPlayer.mp === currentPlayer.maxMp) {
                    return logMessage(`MPがMAXなため、薬は使用不可`);
                }
        
                currentPlayer.healItem(item);
            } 
            else if (item.type === "equipment") {
                currentPlayer.equipItem(item);
            }
            item.amount--;
            if (item.amount <= 0) {
                const index = currentPlayer.inventory.indexOf(item);
                currentPlayer.inventory.splice(index, 1);
            }
            updateStatus(uiElements);
        });
        if (item.type === "hpHeal" || item.type === "mpHeal" || item.type === "bothHeal") {
            healItemsDiv.appendChild(itemBtn);
            hasHealItem = true;
            healItemsDiv.style.color = "black";
        } else if (item.type === "equipment") {
            equipItemsDiv.appendChild(itemBtn);
            hasEquipItem = true;
            equipItemsDiv.style.color = "black";
        }
    });

    if (!hasHealItem) {
        healItemsDiv.innerText = "今は無い";
        healItemsDiv.style.color = "gray";
    }
    if (!hasEquipItem) {
        equipItemsDiv.innerText = "今は無い";
        equipItemsDiv.style.color = "gray";
    }
    equippedDiv.innerHTML = "<h3>装備中のアイテム</h3>";
    if (currentPlayer.equipment.length > 0) {
        currentPlayer.equipment.forEach(eq => {
            const p = document.createElement("p");
            let effectText = "";

            if (eq.effect.physicalStrength) {
                effectText += ` 攻撃+${eq.effect.physicalStrength}`;
            }
            if (eq.effect.defense) {
                effectText += ` 防御+${eq.effect.defense}`;
            }
            p.textContent = `${eq.name}${effectText}`;
            equippedDiv.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.textContent = "装備なし";
        equippedDiv.appendChild(p);
    }
}

