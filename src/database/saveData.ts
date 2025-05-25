import { EquipmentItem, Item } from "../manage/itemManage/item";

export interface SaveData {
    // PlayerのSave
    playerName: string;
    maxHp: number;
    hp: number;
    maxMp: number;
    mp: number;
    physicalStrength: number;
    magicalStrength: number;
    defense: number;
    speed: number;
    isPlayer: boolean;
    inventory: Item[];
    equipment: EquipmentItem[];
    skills: string[]; // Skillのidのみ保存
    currentStage: number;
    deathCount: number;
    lastClearedFloor: number;

    // ItemのSave

}
