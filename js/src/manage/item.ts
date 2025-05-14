import { uiElements } from "../main";
import { logMessage } from "../ui/logMessage";
import { updateStatus } from "./itemStatusUpdater";
import { healItemTemplates, equipmentItemTemplates } from "./templates/itemTemplates";
import {
  ItemEffect,
  ItemType,
  ItemRarity,
  ItemTemplate
} from "../types/itemTypes";

export class Item {
  name: string;
  itemType: ItemType;
  effect: ItemEffect;
  amount: number;
  rarity: ItemRarity;
  instructionText: string;
  isEquipped: boolean = false;

  constructor(
    name: string,
    itemType: ItemType,
    effect: ItemEffect,
    amount: number,
    rarity: ItemRarity,
    instructionText: string
  ) {
    this.name = name;
    this.itemType = itemType;
    this.effect = effect;
    this.amount = amount;
    this.rarity = rarity;
    this.instructionText = instructionText;
  }

  showAmount(): string {
    return `${this.name}：${this.amount} 個`;
  }
}

export class HealItem extends Item {}

export class EquipmentItem extends Item {
  equipmentType: string | null;

  constructor(
    name: string,
    itemType: ItemType,
    equipmentType: string | null,
    effect: ItemEffect,
    amount: number,
    rarity: ItemRarity,
    instructionText: string
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

  const existingItem = currentPlayer.inventory.find((item) => item.name === droppedItem.name);

  if (existingItem) {
    existingItem.amount += 1;
  } else {
    currentPlayer.inventory.push(
      new Item(
        droppedItem.name,
        droppedItem.itemType,
        droppedItem.effect,
        1,
        droppedItem.rarity,
        droppedItem.instructionText
      )
    );
  }

  logMessage(`ドロップ報酬：${droppedItem.name}（${droppedItem.rarity}）を手に入れた！`, "");
  updateStatus(uiElements);
}
