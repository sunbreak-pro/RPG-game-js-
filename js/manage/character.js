// manage/character.js

import { logMessage } from "./utils.js";
import { playerTemplates } from "./characterTemplates.js";
import { enemyAction } from "../battle/attack.js";


// ====== Playerクラス ======
export class Player {
    constructor(name, className, hp, mp, attack, physicalStrength, magicalStrength, defense,speed, healSkill,) {
        this.name = name;
        this.className = className;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.attack = attack;
        this.physicalStrength = physicalStrength;
        this.magicalStrength = magicalStrength;
        this.defense = defense;
        this.speed = speed
        this.hitRate = 90;
        this.healSkill = healSkill;
        this.equipment = [];
        this.inventory = [];
        this.isPlayer = true;
    }
    getStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】 攻撃力${this.attack} 防御力${this.defense} 精神力${this.magicalStrength}`;
    }

    healItem(item) {
        if (item.type === "hpHeal") {
            const healAmount = item.effect.hp;
            this.hp = Math.min(this.hp + healAmount, this.maxHp);
            logMessage(`${this.name} は ${item.name} を使い、HPを${healAmount}回復した！`,"");
        } else if (item.type === "mpHeal") {
            const healAmount = item.effect.mp;
            this.mp = Math.min(this.mp + healAmount, this.maxMp);
            logMessage(`${this.name} は ${item.name} を使い、MPを${healAmount}回復した！`,"");
        } else if (item.type === "bothHeal") {
            const healHp = item.effect.hp;
            const healMp = item.effect.mp;
            this.hp = Math.min(this.hp + healHp, this.maxHp);
            this.mp = Math.min(this.mp + healMp, this.maxMp);
            logMessage(`${this.name} は ${item.name} を使い、HP${healHp}・MP${healMp}回復した！`,"");
        }
        enemyAction();
    }
    
    equipItem(item) {
        if (item.effect) {
            if (item.effect.attack) {
                this.attack += item.effect.attack;
            }
            if (item.effect.defense) {
                this.defense += item.effect.defense;
            }
            this.equipment.push(item); // ←装備リストに追加！
            logMessage(`${this.name} は ${item.name} を装備した！`,"");
        }
        enemyAction();
    }
}


// ====== Enemyクラス ======
export class Enemy {
    constructor(name, className, hp, mp, attack, physicalStrength, magicalStrength, defense, hitRate = 80) {
        this.name = name;
        this.className = className;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.attack = attack;
        this.physicalStrength = physicalStrength
        this.magicalStrength = magicalStrength
        this.defense = defense;
        this.hitRate = hitRate;
        this.equipment = null;
        this.isPlayer = false;
    }

    getStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`;
    }

    useHealSkill() {
        if (this.mp >= 5) {
            const healAmount = this.magicalStrength || 5;
            this.hp = Math.min(this.hp + healAmount, this.maxHp);
            this.mp -= 5;
            logMessage(`${this.name} は不思議な力(MP消費)で ${healAmount} 回復した！`,"");
        } else {
            logMessage(`${this.name} はMPが足りない！`,"");
        }
    }
}

// 生成関数＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// プレイヤー作成
export function createPlayer(index, name) {
    const template = playerTemplates[index];
    return new Player(
        name,
        template.className,
        template.hp,
        template.mp,
        template.attack,
        template.physicalStrength,
        template.magicalStrength,
        template.defense,
        template.speed,
    );
}

// 敵作成
export function createEnemy(template) {
    return new Enemy(
        template.name,
        template.className,
        template.hp,
        template.mp,
        template.attack,
        template.physicalStrength,
        template.magicalStrength,
        template.defense,
        template.hitRate
    );
}
