// manage/templates/itemTemplates.ts
import type { ItemTemplate } from "./itemTypes";

export const healItemTemplates: ItemTemplate[] = [
  {
    name: "HPの実",
    itemType: "hpHeal",
    effect: { hp: 30 },
    amount: 0,
    rarity: "common",
    instructionText: `レアリティ：一般級。HPを30回復する。`,
  },
  {
    name: "HPジャム",
    itemType: "hpHeal",
    effect: { hp: 80 },
    amount: 0,
    rarity: "uncommon",
    instructionText: `レアリティ：希少級。HPを80回復する。`,
  },
  {
    name: "HPポーション",
    itemType: "hpHeal",
    effect: { hp: 200 },
    amount: 0,
    rarity: "rare",
    instructionText: `レアリティ：上級。HPを200回復する。`,
  },
  {
    name: "MPの実",
    itemType: "mpHeal",
    effect: { mp: 10 },
    amount: 0,
    rarity: "common",
    instructionText: `レアリティ：一般級。MPを10回復する。`,
  },
  {
    name: "MPジャム",
    itemType: "mpHeal",
    effect: { mp: 30 },
    amount: 0,
    rarity: "uncommon",
    instructionText: `レアリティ：希少級。MPを30回復する。`,
  },
  {
    name: "MPポーション",
    itemType: "mpHeal",
    effect: { mp: 60 },
    amount: 0,
    rarity: "rare",
    instructionText: `レアリティ：上級。MPを60回復する。`,
  },
  {
    name: "エリクサー",
    itemType: "bothHeal",
    effect: { hp: 500, mp: 500 },
    amount: 0,
    rarity: "legendary",
    instructionText: `レアリティ：伝説級。MPを500回復する。`,
  },
];

export const equipmentItemTemplates: ItemTemplate[] = [
  {
    name: "木の棒",
    itemType: "equipment",
    equipmentType: "sword",
    effect: { physicalStrength: 5 },
    amount: 0,
    rarity: "common",
    instructionText: `分類：剣。 レアリティ：一般。 攻撃力＋５`,
  },
  {
    name: "欠けた鉄鎧",
    itemType: "equipment",
    equipmentType: "armor",
    effect: { defense: 8, speed: -3 },
    amount: 0,
    rarity: "rare",
    instructionText: `分類：鎧。 レアリティ：上級。 防御力＋８、スピード−３`,
  },
  {
    name: "ハゲた兜",
    itemType: "equipment",
    equipmentType: "helmet",
    effect: { defense: 4 },
    amount: 0,
    rarity: "uncommon",
    instructionText: `分類：兜。 レアリティ：希少級。 防御力＋４`,
  },
  {
    name: "穴の空いた革靴",
    itemType: "equipment",
    equipmentType: "shoes",
    effect: { defense: 2, speed: 5 },
    amount: 0,
    rarity: "common",
    instructionText: `分類：靴。 レアリティ：一般級。 防御力＋４`,
  },
  {
    name: "弦が切れそうな弓",
    itemType: "equipment",
    equipmentType: "bow",
    effect: { physicalStrength: 10, hitRate: -5 },
    amount: 0,
    rarity: "rare",
    instructionText: `分類：剣。 レアリティ：上級。 攻撃力＋50。`,
  },
  {
    name: "エクスカリバー",
    itemType: "equipment",
    equipmentType: "sword",
    effect: { physicalStrength: 50 },
    amount: 0,
    rarity: "legendary",
    instructionText: `分類：剣。 レアリティ：伝説級。 攻撃力＋50。`,
  },
];
