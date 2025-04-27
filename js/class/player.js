import { Character } from "./character.js";
import { logMessage } from "./utils.js";

export class Player extends Character {
    constructor(name,className, hp, mp, attack, healSkill, defense) {
        super(name,className, hp, mp, attack, healSkill, defense);
        this.className = className;
        this.inventory = [];
        this.equipment = null;
    }
    

    healTarget() {
        if (this.hp === this.maxHp) {
            return `${this.name} のHPはMAXだ、発動失敗！`;
        }

        const isCritical = Math.random() < 0.2;
        let randomHeal = Math.floor(Math.random() * (this.healSkill)) + 3;
        if (isCritical) {
            randomHeal *= 2;
            logMessage("クリティカルヒール発動！✨");
        }

        const healAmount = Math.min(this.maxHp - this.hp, randomHeal);
        this.hp = Math.min(this.hp + healAmount, this.maxHp);
        logMessage(`${this.name} のHPは ${healAmount} 回復した！（現在HP：${this.hp}）`);
    }

    useItem(item) {
        if (item.type === "heal") {
            const healAmount = item.effect.hp;
            this.hp = Math.min(this.hp + healAmount, this.maxHp);
            logMessage(`${this.name}は、${item.name} を使ってHPを${healAmount}回復した！ （現在のHP：${this.hp}）`);
        } else if (item.type === "equipment") {
            this.equipItem(item);
        }
    }
    
    equipItem(item) {
        if (item.effect) {
            if(item.effect.attack){
                this.attack += item.effect.attack;
                this.equipment = item;
                logMessage(`${item.name} を装備して攻撃力が${item.effect.attack}上がった！`);
            }

            if(item.effect.defense){
                this.defense += item.effect.defense;
                this.equipment = item;
                logMessage(`${item.name} を装備して防御力が${item.effect.defense}上がった！`);
            }
        }
    }
}
export const playerClass = [
    new Player("","戦士", 100, 30, 40, 5, 15),
    new Player("","魔法使い",60, 80, 20, 40, 10, 5),
    // new Player("","竜騎士",120, 60, 70, 40, 0, 10),
]
