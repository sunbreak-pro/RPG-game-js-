import { Item } from "../manage/itemManage/item";

export interface SaveData {
    playerName: string;
    hp: number;
    mp: number;
    inventory: Item[];
    // skills: Skill[];
    // currentStage: number;
}