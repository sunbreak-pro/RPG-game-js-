import { logMessage } from "../ui/logMessage";
import { playerTemplates } from "./templates/characterTemplates";
import { delayedEnemyAction } from "../battle/attack";
import { defaultAttackBtn } from "../main";
import { markPlayerTurnDone, startTurn } from "./turnController";
import { EquipmentItem, HealItem } from "./item";
import { EquipmentItemData, PlayerTemplate, EnemyTemplate } from "../types/characterTypes";
import { Character } from "../types/characterTypes";

// ====== Playerクラス ======

export class Player implements Character {
  name: string;
  className: string;
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
  inventory: (HealItem | EquipmentItem)[] = [];
  
  constructor(
    name: string,
    className: string,
    hp: number,
    mp: number,
    physicalStrength: number,
    magicalStrength: number,
    defense: number,
    speed: number
  ) {
    this.name = name;
    this.className = className;
    this.hp = hp;
    this.maxHp = hp;
    this.mp = mp;
    this.maxMp = mp;
    this.physicalStrength = physicalStrength;
    this.magicalStrength = magicalStrength;
    this.defense = defense;
    this.speed = speed;
  }

  getPlayerStatus(): string {
    return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
  }
  healItem(item: HealItem): void {
    defaultAttackBtn.style.display = "none";
    startTurn();
    markPlayerTurnDone();

    if (item.itemType === "hpHeal") {
      const healAmount = item.effect.hp ?? 0;
      this.hp = Math.min(this.hp + healAmount, this.maxHp);
      logMessage(`${this.name} は ${item.name} を使い、HPを${healAmount}回復した！`, "");
    } else if (item.itemType === "mpHeal") {
      const healAmount = item.effect.mp ?? 0;
      this.mp = Math.min(this.mp + healAmount, this.maxMp);
      logMessage(`${this.name} は ${item.name} を使い、MPを${healAmount}回復した！`, "");
    } else if (item.itemType === "bothHeal") {
      const healHp = item.effect.hp ?? 0;
      const healMp = item.effect.mp ?? 0;
      this.hp = Math.min(this.hp + healHp, this.maxHp);
      this.mp = Math.min(this.mp + healMp, this.maxMp);
      logMessage(`${this.name} は ${item.name} を使い、HP${healHp}・MP${healMp}回復した！`, "");
    }

    delayedEnemyAction(1000);
  }

  equipItem(item: EquipmentItem): void {
    defaultAttackBtn.style.display = "none";
    startTurn();
    markPlayerTurnDone();

    const sameCategory = this.equipment.find(eq => eq.equipmentType === item.equipmentType);
    if (sameCategory) {
      this.unequipItem(sameCategory);
      return;
    }

    this.physicalStrength += item.effect.physicalStrength || 0;
    this.defense += item.effect.defense || 0;
    this.speed += item.effect.speed || 0;

    item.isEquipped = true;
    this.equipment.push(item);

    logMessage(`${item.name} を装備した！`);
    delayedEnemyAction(1000);
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

    const existing = this.inventory.find(i => i.name === item.name);
    if (existing) {
      existing.amount += 1;
    } else {
      this.inventory.push(
        new EquipmentItem(
          item.name,
          item.itemType,
          item.equipmentType,
          item.effect,
          1,
          item.rarity,
          item.instructionText
        )
      );
    }
    logMessage(`${item.name} を外し、インベントリに戻した`);
    delayedEnemyAction(1000);
  }
}

// ====== Enemyクラス ======
export class Enemy implements Character {
    name: string;
    className: string;
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
      className: string,
      hp: number,
      mp: number,
      physicalStrength: number,
      magicalStrength: number,
      defense: number,
      speed: number
    ) {
      this.name = name;
      this.className = className;
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
      return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
    }
}

// ====== 生成関数 ======
export function createPlayer(index: number, name: string): Player {
  const template = playerTemplates[index];
  return new Player(
    name,
    template.className,
    template.hp,
    template.mp,
    template.physicalStrength,
    template.magicalStrength,
    template.defense,
    template.speed
  );
}

export function createEnemy(template: EnemyTemplate): Enemy {
  return new Enemy(
    template.name,
    template.className,
    template.hp,
    template.mp,
    template.physicalStrength,
    template.magicalStrength,
    template.defense,
    template.hitRate ?? 80
  );
}
