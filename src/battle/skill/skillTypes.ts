import { Character } from "../../manage/characterManage/characterTypes";

export type SkillRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type SkillTypes = "attack" | "heal" | "support";
export interface SkillData {
    name: string;
    mpCost: number;
    skillType: SkillTypes;
    element?: string;
    power: (user: Character) => number;
    log: (skillName: string, user: Character, target: Character, dmg?: number) => void;
    Instruction: string;
    skillId: string;
    skillRarity: SkillRarity;
}
