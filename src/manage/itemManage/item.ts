import { uiElements } from "@/main";
import { logMessage } from "@/ui/logMessage";
import { updateStatus } from "./itemStatusUpdater";
import { healItemTemplates, equipmentItemTemplates } from "./itemTemplates";
import {
  ItemEffect,
  ItemType,
  ItemRarity,
  ItemTemplate,
  AnyItem,
  SerializedItem
} from "./itemTypes";

export class Item {
  itemName: string;
  itemType: ItemType;
  effect: ItemEffect;
  amount: number;
  rarity: ItemRarity;
  instructionText: string;
  isEquipped: boolean = false;

  constructor(
    itemName: string,
    itemType: ItemType,
    effect: ItemEffect,
    amount: number,
    rarity: ItemRarity,
    instructionText: string
  ) {
    this.itemName = itemName;
    this.itemType = itemType;
    this.effect = effect;
    this.amount = amount;
    this.rarity = rarity;
    this.instructionText = instructionText;
  }
  static fromData(data: SerializedItem): AnyItem {
    if (data.itemType === "hpHeal" || data.itemType === "mpHeal" || data.itemType === "bothHeal") {
      return new HealItem(
        data.itemName,
        data.itemType,
        data.effect,
        data.amount,
        data.rarity,
        data.instructionText
      );
    } else if (data.itemType === "equipment") {
      return new EquipmentItem(
        data.itemName,
        data.itemType,
        data.equipmentType || "", data.effect,
        data.amount,
        data.rarity,
        data.instructionText
      );
    } else {
      throw new Error(`[Item.fromData] 未知の itemType: ${data.itemType}`);
    }
  }
  toSerialized(): SerializedItem {
    return {
      itemName: this.itemName,
      itemType: this.itemType,
      equipmentType: this instanceof EquipmentItem ? this.equipmentType ?? "" : undefined,
      effect: this.effect,
      amount: this.amount,
      rarity: this.rarity,
      instructionText: this.instructionText,
    };
  }
  showAmount(): string {
    return `${this.itemName}：${this.amount} 個`;
  }
}

export class HealItem extends Item {
  constructor(
    itemName: string,
    itemType: ItemType,
    effect: ItemEffect,
    amount: number,
    rarity: ItemRarity,
    instructionText: string
  ) {
    super(
      itemName, itemType, effect, amount, rarity, instructionText
    )
  }
}

export class EquipmentItem extends Item {
  equipmentType: string | null;
  isEquipped: boolean;
  constructor(
    name: string,
    itemType: ItemType,
    equipmentType: string | null,
    effect: ItemEffect,
    amount: number,
    rarity: ItemRarity,
    instructionText: string,
  ) {
    super(name, itemType, effect, amount, rarity, instructionText);
    this.equipmentType = equipmentType;
    this.isEquipped = false;
  }
}

export const allHealItems: HealItem[] = healItemTemplates.map(
  (temp: ItemTemplate) =>
    new HealItem(temp.name, temp.itemType, temp.effect, temp.amount, temp.rarity, temp.instructionText)
);

export const allEquipmentItems: EquipmentItem[] = equipmentItemTemplates.map(
  (temp: ItemTemplate) =>
    new EquipmentItem(temp.name, temp.itemType, temp.equipmentType ?? null, temp.effect, temp.amount, temp.rarity, temp.instructionText)
);

export const allItemsList: Item[] = [...allHealItems, ...allEquipmentItems];

export function weightedRandom(items: Item[], weights: number[]): Item {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const randomNum = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < items.length; i++) {
    cumulativeWeight += weights[i];
    if (randomNum < cumulativeWeight) {
      return items[i];
    }
  }

  // fallback (TS保証のために必要)
  return items[items.length - 1];
}

export function dropRandomItem(currentPlayer: { inventory: Item[] }): void {
  const items = allItemsList;
  const rarityRate: Record<ItemRarity, number> = {
    common: 0.6,
    uncommon: 0.3,
    rare: 0.15,
    epic: 0.05,
    legendary: 0.02,
  };

  const weights = items.map((item) => rarityRate[item.rarity] || 0.6);
  const droppedItem = weightedRandom(items, weights);

  console.log("【DEBUG】選ばれたdroppedItem：", droppedItem);

  const existingItem = currentPlayer.inventory.find((item) => item.itemName === droppedItem.itemName);

  if (existingItem) {
    existingItem.amount += 1;
  } else {
    currentPlayer.inventory.push(
      new Item(
        droppedItem.itemName,
        droppedItem.itemType,
        droppedItem.effect,
        1,
        droppedItem.rarity,
        droppedItem.instructionText
      )
    );
  }

  logMessage(`ドロップ報酬：${droppedItem.itemName}（${droppedItem.rarity}）を手に入れた！`, "");
  updateStatus(uiElements);
}
