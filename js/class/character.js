import { updateStatus } from "../main.js";
import { logMessage } from "./utils.js";


export class Character {
    constructor(name, className, hp, mp, attack, healSkill, defense, hitRate) {
        this.name = name;
        this.className = className;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.attack = attack;
        this.healSkill = healSkill;
        this.defense = defense;
        this.hit = hitRate;
        this.equipment = null;
    }

    useHealSkill() {
        if (this.maxHp === this.hp) {
            logMessage(`${this.name} のHPはすでに満タンです`);
            return;
        }
        if (this.mp >= 5) {
            this.mp -= 5;
            this.healTarget();
        } else {
            logMessage(`${this.name} はMPが足りない！`);
        }
    }

    attackTarget(target) {
        const damage = Math.max(this.attack - target.defense, 1);
        target.hp -= damage;
        logMessage(`${this.name}(${this.className}) は ${target.name} に ${damage} ダメージを与えた！`);
        if (target.hp <= 0) {
            target.hp = 0;
            logMessage(`${target.name} は倒れた！`);
        }
        updateStatus();
    }

    // ★ステータス表示を完全最新版に
    getStatus() {
        console.log(`getStatus実行: name=${this.name}, class=${this.className}, HP=${this.hp}/${this.maxHp}, MP=${this.mp}/${this.maxMp}`);
        return `${this.name}（${this.className}）：【HP ${this.hp} / ${this.maxHp}】【MP ${this.mp} / ${this.maxMp}】`;
    }

    // （必要なら今後実装できる）
    healTarget() {
        const healAmount = this.healSkill ? this.healSkill : 20; // healSkillが設定されていなければ20回復
        this.hp = Math.min(this.hp + healAmount, this.maxHp);
        logMessage(`${this.name} は ${healAmount} 回復した！`);
    }
}
