import { logMessage } from "../ui/logMessage.js";
import { playerTemplates } from "./templates/characterTemplates.js";
import { delayedEnemyAction } from "../battle/attack.js";
import { defaultAttackBtn } from "../main.js";
import { markPlayerTurnDone, startTurn } from "./turnController.js";
import { EquipmentItem } from "./item.js";
// ====== Playerクラス ======
export class Player {
    constructor(name, className, hp, mp, physicalStrength, magicalStrength, defense, speed) {
        this.isPlayer = true;
        this.equipment = [];
        this.inventory = [];
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
    getPlayerStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
    }
    healItem(item) {
        var _a, _b, _c, _d;
        defaultAttackBtn.style.display = "none";
        startTurn();
        markPlayerTurnDone();
        if (item.itemType === "hpHeal") {
            const healAmount = (_a = item.effect.hp) !== null && _a !== void 0 ? _a : 0;
            this.hp = Math.min(this.hp + healAmount, this.maxHp);
            logMessage(`${this.name} は ${item.name} を使い、HPを${healAmount}回復した！`, "");
        }
        else if (item.itemType === "mpHeal") {
            const healAmount = (_b = item.effect.mp) !== null && _b !== void 0 ? _b : 0;
            this.mp = Math.min(this.mp + healAmount, this.maxMp);
            logMessage(`${this.name} は ${item.name} を使い、MPを${healAmount}回復した！`, "");
        }
        else if (item.itemType === "bothHeal") {
            const healHp = (_c = item.effect.hp) !== null && _c !== void 0 ? _c : 0;
            const healMp = (_d = item.effect.mp) !== null && _d !== void 0 ? _d : 0;
            this.hp = Math.min(this.hp + healHp, this.maxHp);
            this.mp = Math.min(this.mp + healMp, this.maxMp);
            logMessage(`${this.name} は ${item.name} を使い、HP${healHp}・MP${healMp}回復した！`, "");
        }
        delayedEnemyAction(1000);
    }
    equipItem(item) {
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
    unequipItem(item) {
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
        }
        else {
            this.inventory.push(new EquipmentItem(item.name, item.itemType, item.equipmentType, item.effect, 1, item.rarity, item.instructionText));
        }
        logMessage(`${item.name} を外し、インベントリに戻した`);
        delayedEnemyAction(1000);
    }
}
// ====== Enemyクラス ======
export class Enemy {
    constructor(name, className, hp, mp, physicalStrength, magicalStrength, defense, speed) {
        this.isPlayer = false;
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
    getEnemyStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
    }
}
// ====== 生成関数 ======
export function createPlayer(index, name) {
    const template = playerTemplates[index];
    return new Player(name, template.className, template.hp, template.mp, template.physicalStrength, template.magicalStrength, template.defense, template.speed);
}
export function createEnemy(template) {
    var _a;
    return new Enemy(template.name, template.className, template.hp, template.mp, template.physicalStrength, template.magicalStrength, template.defense, (_a = template.hitRate) !== null && _a !== void 0 ? _a : 80);
}
