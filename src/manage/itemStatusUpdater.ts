import { uiElements } from "../main";
import { getCurrentPlayer, getCurrentEnemy } from "./battleState";
import { logMessage } from "../ui/logMessage";
import { Item, EquipmentItem, HealItem } from "./item";
import { Enemy, Player } from "./character";

const instructionBorder = document.getElementById("instruction-item-border") as HTMLElement;
const instructionParagraph = document.getElementById("item-instruction") as HTMLElement;

interface UIElements {
  playerStatus: HTMLElement;
  enemyStatus: HTMLElement;
  healItemsDiv: HTMLElement;
  equipItemsDiv: HTMLElement;
  equippedDiv: HTMLElement;
}

export function updateStatus({ playerStatus, enemyStatus, healItemsDiv, equipItemsDiv, equippedDiv }: UIElements = uiElements): void {
  const player = getCurrentPlayer();
  let currentPlayer: Player;
  if (player instanceof Object && "inventory" in player) {
    currentPlayer = player as Player;
  } else {
    return;
  }
  const enemy = getCurrentEnemy();
  const currentEnemy = enemy as Enemy;

  playerStatus.textContent = currentPlayer.getPlayerStatus();
  enemyStatus.textContent = currentEnemy.getEnemyStatus();
  healItemsDiv.innerHTML = "";
  equipItemsDiv.innerHTML = "";

  let hasHealItem = false;
  let hasEquipItem = false;

  currentPlayer.inventory.forEach((item: Item) => {
    if (item.amount <= 0) return;

    const itemBtn = document.createElement("button");
    itemBtn.textContent = `${item.showAmount()}`;

    itemBtn.addEventListener("mouseenter", () => {
      instructionBorder.style.display = "block";
      console.log(instructionBorder, "説明要素");

      instructionParagraph.innerText = item.instructionText;
    });
    itemBtn.addEventListener("mouseleave", () => {
      instructionBorder.style.display = "none";
    });
    itemBtn.addEventListener("click", () => {
      instructionBorder.style.display = "none";
      if (["hpHeal", "mpHeal", "bothHeal"].includes(item.itemType)) {
        if (item.itemType === "hpHeal" && currentPlayer.hp === currentPlayer.maxHp) {
          return logMessage(`HPがMAXなため、薬は使用不可`);
        }
        if (item.itemType === "mpHeal" && currentPlayer.mp === currentPlayer.maxMp) {
          return logMessage(`MPがMAXなため、薬は使用不可`);
        }
        currentPlayer.healItem(item as HealItem);
      } else if (item.itemType === "equipment") {
        currentPlayer.equipItem(item as EquipmentItem);
        item.isEquipped = true;
      }
      item.amount--;
      if (item.amount <= 0) {
        const index = currentPlayer.inventory.indexOf(item);
        currentPlayer.inventory.splice(index, 1);
      }
      updateStatus(uiElements);
    });

    if (["hpHeal", "mpHeal", "bothHeal"].includes(item.itemType)) {
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
    healItemsDiv.style.textAlign = "center";
  }
  if (!hasEquipItem) {
    equipItemsDiv.innerText = "何も持っていない";
    equipItemsDiv.style.color = "gray";
    equipItemsDiv.style.textAlign = "center";
  }

  equippedDiv.innerHTML = "<h3>装備中アイテム</h3>\n";
  if (currentPlayer.equipment.length > 0) {
    currentPlayer.equipment.forEach((eq: EquipmentItem) => {
      const equippedBtn = document.createElement("button");
      let effectText = "";
      if (eq.effect.physicalStrength) {
        effectText += ` 攻撃+${eq.effect.physicalStrength}`;
      }
      if (eq.effect.defense) {
        effectText += ` 防御+${eq.effect.defense}`;
      }
      equippedBtn.innerHTML = `<p>${eq.name}${effectText}<br>（クリックで外す）</p>`;
      equippedBtn.style.cursor = "pointer";
      equippedBtn.addEventListener("click", () => {
        currentPlayer.unequipItem(eq);
        updateStatus(uiElements);
      });
      equippedDiv.appendChild(equippedBtn);
    });
  } else {
    equippedDiv.innerHTML += "<p>未装備</p>";
  }
}