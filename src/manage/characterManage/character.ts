import { logMessage, turnLog } from "../../ui/logMessage";
import { delayedEnemyAction } from "../../battle/attackManager";
import { defaultAttackBtn } from "../../main";
import { markPlayerTurnDone, startTurn } from "../../controller/turnController";
import { EquipmentItem, HealItem, Item } from "../itemManage/item";
import type { EnemyTemplate } from "./characterTypes";
import type { Character } from "./characterTypes";
import { StageProgress } from "@/controller/stageController";
import { Skill } from "@/battle/skill/skillManager";
import { allSKillList } from "@/battle/skill/skillTemplates";
import { SaveData } from "@/database/saveData";
// ====== Playerクラス ======

export class Player implements Character {
  name: string;
  characterType?: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  physicalStrength: number;
  magicalStrength: number;
  defense: number;
  speed: number;
  isPlayer: boolean = true;
  equipment: EquipmentItem[] = [];
  inventory: Item[] = [];
  skills: Skill[] = [];
  currentStage: number = 0;
  deathCount: number = 0;
  lastClearedFloor: number = 0;
  constructor(
    PlayerName: string,
    hp: number,
    mp: number,
    physicalStrength: number,
    magicalStrength: number,
    defense: number,
    speed: number
  ) {
    this.name = PlayerName;
    this.hp = hp;
    this.maxHp = hp;
    this.mp = mp;
    this.maxMp = mp;
    this.physicalStrength = physicalStrength;
    this.magicalStrength = magicalStrength;
    this.defense = defense;
    this.speed = speed;
  }
  static fromSaveData(data: SaveData): Player {
    const player = new Player(
      data.playerName,
      data.hp,
      data.mp,
      data.physicalStrength,
      data.magicalStrength,
      data.defense,
      data.speed
    );
    player.maxHp = data.maxHp;
    player.maxMp = data.maxMp;
    player.inventory = data.inventory.map(Item.fromData);
    player.equipment = data.equipment.map(Item.fromData) as EquipmentItem[]; player.currentStage = data.currentStage;
    player.deathCount = data.deathCount;
    player.lastClearedFloor = data.lastClearedFloor;
    return player;
  }


  addSkill(skill: Skill): void {
    if (!this.skills.find(s => s.skillId === skill.skillId)) {
      this.skills.push(skill);
    }
  }

  addSkillById(skillId: string): void {
    const found = allSKillList.find(s => s.skillId === skillId);
    if (found && !this.skills.find(s => s.skillId === found.skillId)) {
      this.skills.push(found);
    }
  }

  recordDeath(): void {
    this.deathCount++;
  }

  updateClearedFloor(floor: number): void {
    if (floor > this.lastClearedFloor) {
      this.lastClearedFloor = floor;
    }
  }

  getPlayerStatus(): string {
    return `HP: ${this.hp}/${this.maxHp}, MP: ${this.mp}/${this.maxMp}`;
  }
  healItem(item: HealItem): void {
    startTurn();
    markPlayerTurnDone();

    if (item.itemType === "hpHeal") {
      const healAmount = item.effect.hp ?? 0;
      this.hp = Math.min(this.hp + healAmount, this.maxHp);
      turnLog(`${this.name} は ${item.itemName} を使い、HPを${healAmount}回復した！`, "");
    } else if (item.itemType === "mpHeal") {
      const healAmount = item.effect.mp ?? 0;
      this.mp = Math.min(this.mp + healAmount, this.maxMp);
      turnLog(`${this.name} は ${item.itemName} を使い、MPを${healAmount}回復した！`, "");
    } else if (item.itemType === "bothHeal") {
      const healHp = item.effect.hp ?? 0;
      const healMp = item.effect.mp ?? 0;
      this.hp = Math.min(this.hp + healHp, this.maxHp);
      this.mp = Math.min(this.mp + healMp, this.maxMp);
      turnLog(`${this.name} は ${item.itemName} を使い、HP${healHp}・MP${healMp}回復した！`, "");
    }
    delayedEnemyAction(900);
  }

  equipItem(item: EquipmentItem): void {
    startTurn();
    markPlayerTurnDone();

    const sameCategory = this.equipment.find(eq => eq.equipmentType === item.equipmentType);
    if (sameCategory) {
      logMessage("すでにその装備は装備中です");
      return;
    }

    this.physicalStrength += item.effect.physicalStrength || 0;
    this.defense += item.effect.defense || 0;
    this.speed += item.effect.speed || 0;

    item.isEquipped = true;
    this.equipment.push(item);

    turnLog(`${item.itemName} を装備した！`);
    delayedEnemyAction(900);
  }

  unequipItem(item: EquipmentItem): void {
    defaultAttackBtn.style.display = "none";
    startTurn();
    markPlayerTurnDone();

    this.physicalStrength -= item.effect.physicalStrength || 0;
    this.defense -= item.effect.defense || 0;
    item.isEquipped = false;

    const idx = this.equipment.indexOf(item);
    if (idx !== -1) {
      this.equipment.splice(idx, 1);
    }

    const existing = this.inventory.find(i => i.itemName === item.itemName);
    if (existing) {
      existing.amount += 1;
    } else {
      this.inventory.push(
        new EquipmentItem(
          item.itemName,
          item.itemType,
          item.equipmentType,
          item.effect,
          1,
          item.rarity,
          item.instructionText
        )
      );
    }
    turnLog(`${item.itemName} を外し、インベントリに戻した`);
    delayedEnemyAction(1000);
  }
}


export function updateStageProgress(
  current: StageProgress,
  clearedFloor: number
): StageProgress {
  return {
    currentFloor: clearedFloor + 1,
    lastClearedFloor: Math.max(current.lastClearedFloor, clearedFloor)
  };
}



// 今後: Skill テンプレートと ID マッチで Player.skills に紐づけていく

// ====== Enemyクラス ======
export class Enemy implements Character {
  name: string;
  characterType: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  physicalStrength: number;
  magicalStrength: number;
  defense: number;
  speed: number;
  isPlayer: boolean = false;

  constructor(
    name: string,
    characterType: string,
    hp: number,
    mp: number,
    physicalStrength: number,
    magicalStrength: number,
    defense: number,
    speed: number
  ) {
    this.name = name;
    this.characterType = characterType;
    this.hp = hp;
    this.maxHp = hp;
    this.mp = mp;
    this.maxMp = mp;
    this.physicalStrength = physicalStrength;
    this.magicalStrength = magicalStrength;
    this.defense = defense;
    this.speed = speed;
  }

  getEnemyStatus(): string {
    return `${this.name}（${this.characterType}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
  }
}

// ====== 生成関数 ======
export function createEnemy(template: EnemyTemplate): Enemy {
  return new Enemy(
    template.name,
    template.characterType,
    template.hp,
    template.mp,
    template.physicalStrength,
    template.magicalStrength,
    template.defense,
    template.hitRate ?? 80
  );
}
