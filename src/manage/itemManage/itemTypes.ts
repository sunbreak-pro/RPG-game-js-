import { EquipmentItem, HealItem } from "./item";

// types/itemTypes.ts
export type ItemType = "hpHeal" | "mpHeal" | "bothHeal" | "equipment";

export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type EquipmentType = "sword" | "armor" | "helmet" | "shoes" | "bow";

export interface ItemEffect {
  hp?: number;
  mp?: number;
  defense?: number;
  speed?: number;
  hitRate?: number;
  physicalStrength?: number;
}

export interface ItemTemplate {
  name: string;
  itemType: ItemType;
  effect: ItemEffect;
  amount: number;
  rarity: ItemRarity;
  instructionText: string;
  equipmentType?: EquipmentType; // 装備品のみ
}

export type AnyItem = HealItem | EquipmentItem;

export type SerializedItem = {
  itemName: string;
  itemType: "hpHeal" | "mpHeal" | "bothHeal" | "equipment";
  equipmentType?: string | null;
  effect: ItemEffect;
  amount: number;
  rarity: ItemRarity;
  instructionText: string;
};