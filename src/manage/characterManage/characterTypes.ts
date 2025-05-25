// types/characterTypes.ts

export interface Character {
  name?: string;
  characterType?: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  physicalStrength: number;
  magicalStrength: number;
  defense: number;
  speed: number;
  hitRate?: number;
  isPlayer: boolean;
}

export interface PlayerTemplate {
  characterType: string;
  hp: number;
  mp: number;
  physicalStrength: number;
  magicalStrength: number;
  defense: number;
  speed: number;
}

export interface EnemyTemplate extends PlayerTemplate {
  name: string;
  hitRate?: number;
}

export interface ItemEffect {
  hp?: number;
  mp?: number;
  defense?: number;
  speed?: number;
  physicalStrength?: number;
  hitRate?: number;
}

export interface EquipmentItemData {
  name: string;
  itemType: string;
  equipmentType: string;
  effect: ItemEffect;
  amount: number;
  rarity: string;
  instructionText: string;
  isEquipped?: boolean;
}
