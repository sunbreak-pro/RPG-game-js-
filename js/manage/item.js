import { uiElements } from "../main.js";
import { logMessage } from "../ui/logMessage.js";
import { updateStatus } from "./itemStatusUpdater.js";
import { healItemTemplates, equipmentItemTemplates } from "./termplates/itemTemplates.js";

export class Item {
    constructor(name, itemType, effect, amount, rarity, instructionText) {
        this.name = name;
        this.itemType = itemType;
        this.effect = effect;
        this.amount = amount;
        this.rarity = rarity;
        this.instructionText = instructionText;
        this.isEquipped = false;
    }
    showAmount() {
        return `${this.name}：${this.amount} 個`;
    }
}
export class HealItem extends Item {
    constructor(name, itemType, effect, amount, rarity, instructionText) {
        super(name, itemType, effect, amount, rarity, instructionText);
    }
}
export class EquipmentItem extends Item {
    constructor(name, itemType, equipmentType, effect, amount, rarity, instructionText) {
        super(name, itemType, effect, amount, rarity, instructionText);
        this.isEquipped = false;
        this.equipmentType = equipmentType;
    }
}

export const allHealItems = healItemTemplates.map(temp => 
    new HealItem(temp.name, temp.itemType, temp.effect, temp.amount, temp.rarity, temp.instructionText)
  );
  
  export const allEquipmentItems = equipmentItemTemplates.map(temp => 
    new EquipmentItem(temp.name, temp.itemType, temp.equipmentType, temp.effect, temp.amount, temp.rarity, temp.instructionText)
  );
export const allItemsList = [...allHealItems, ...allEquipmentItems];



export function weightedRandom(items, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNum < cumulativeWeight) {
            return items[i];
        }
    }
}
export function dropRandomItem(currentPlayer) {
    const items = allItemsList;
    const rarityRate = {
        common: 0.6,
        uncommon: 0.3,
        rare: 0.15,
        epic: 0.05,
        legendary: 0.02,
    };
    const weights = items.map(item => rarityRate[item.rarity] || 0.6);
    
    const droppedItem = weightedRandom(items, weights);
    console.log("【DEBUG】選ばれたdroppedItem：", droppedItem);
    
    const existingItem = currentPlayer.inventory.find(item => item.name === droppedItem.name);

    if (existingItem) {
        existingItem.amount += 1;
    } else {
        // let newItem;
        // if (["hpHeal", "mpHeal", "bothHeal"].includes(droppedItem.itemType)) {
        // newItem = new HealItem(
        //     droppedItem.name,
        //     droppedItem.itemType,
        //     droppedItem.effect,
        //     1,
        //     droppedItem.rarity,
        //     droppedItem.instructionText
        // );
        // } else if (droppedItem.itemType === "equipment") {
        // newItem = new EquipmentItem(
        //     droppedItem.name,
        //     droppedItem.itemType,
        //     droppedItem.equipmentType ?? null,
        //     droppedItem.effect,
        //     1,
        //     droppedItem.rarity,
        //     droppedItem.instructionText
        // );
        // }
        // if (newItem) {
        //     currentPlayer.inventory.push(newItem);
        //     }
        currentPlayer.inventory.push(new Item(
            droppedItem.name,
            droppedItem.itemType,
            droppedItem.effect,
            1,
            droppedItem.rarity,
            droppedItem.instructionText
          ));
    }
    

    
    console.log("DEBUG: ドロップアイテム：", droppedItem);
    // console.log("DEBUG: 既存アイテム検索結果：", existingItem);
    logMessage(`ドロップ報酬：${droppedItem.name}（${droppedItem.rarity}）を手に入れた！`,"");
    updateStatus(uiElements);
}