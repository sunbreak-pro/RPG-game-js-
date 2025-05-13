// manage/character.js

import { logMessage, turnLog } from "../ui/logMessage.js";
import { playerTemplates } from "./termplates/characterTemplates.js";
import { delayedEnemyAction } from "../battle/attack.js";
import { defaultAttackBtn } from "../main.js";
import { markPlayerTurnDone, startTurn } from "./turnController.js";
import { EquipmentItem } from "./item.js";
// ====== Playerクラス ======
export class Player {
    constructor(name, className, hp, mp, physicalStrength, magicalStrength, defense, speed,) {
        this.name = name;
        this.className = className;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.physicalStrength = physicalStrength;
        this.magicalStrength = magicalStrength;
        this.defense = defense;
        this.speed = speed
        this.hitRate = 90;
        this.equipment = [];
        this.inventory = [];
        this.isPlayer = true;
    }
    getPlayerStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】 【攻撃力 ${this.physicalStrength}】 【防御力 ${this.defense}】 【精神力 ${this.magicalStrength}】`;
    }

    healItem(item) {
        defaultAttackBtn.style.display = "none";
        startTurn();
        markPlayerTurnDone();
        if (item.itemType === "hpHeal") {
            const healAmount = item.effect.hp;
            this.hp = Math.min(this.hp + healAmount, this.maxHp);
            turnLog(`${this.name} は ${item.name} を使い、HPを${healAmount}回復した！`,"");
        } else if (item.itemType === "mpHeal") {
            const healAmount = item.effect.mp;
            this.mp = Math.min(this.mp + healAmount, this.maxMp);
            turnLog(`${this.name} は ${item.name} を使い、MPを${healAmount}回復した！`,"");
        } else if (item.itemType === "bothHeal") {
            const healHp = item.effect.hp;
            const healMp = item.effect.mp;
            this.hp = Math.min(this.hp + healHp, this.maxHp);
            this.mp = Math.min(this.mp + healMp, this.maxMp);
            turnLog(`${this.name} は ${item.name} を使い、HP${healHp}・MP${healMp}回復した！`,"");
        }
        delayedEnemyAction(1000);
    }
    
    equipItem(item) {
        defaultAttackBtn.style.display = "none";
        startTurn();
        markPlayerTurnDone();
        // 既に同じカテゴリの装備があれば外す
        const sameCategory = this.equipment.find(eq => eq.equipmentType === item.equipmentType);
        if (sameCategory) {
          this.unequipItem(sameCategory); // あとで定義
          return;
        }
        // 装備を適用
        this.physicalStrength += item.effect.physicalStrength || 0;
        this.defense += item.effect.defense || 0;
        this.speed += item.effect.speed || 0;
        item.isEquipped = true;
        this.equipment.push(item);
        turnLog(`${item.name} を装備した！`)
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
        
        // インベントリに戻す（なければ追加）
        const existing = this.inventory.find(i => i.name === item.name);
        if (existing) {
            existing.amount += 1;
        } else {
            this.inventory.push(new EquipmentItem(
            item.name,
            item.itemType,
            item.equipmentType,
            item.effect,
            1,
            item.rarity,
            item.instructionText
            ));
            
        }
        turnLog(`${item.name} を外し、インベントリに戻した`)
        delayedEnemyAction(1000);

    }
}


// ====== Enemyクラス ======
export class Enemy {
    constructor(name, className, hp, mp, physicalStrength, magicalStrength, defense, hitRate = 80) {
        this.name = name;
        this.className = className;
        this.hp = hp;
        this.maxHp = hp;
        this.mp = mp;
        this.maxMp = mp;
        this.physicalStrength = physicalStrength
        this.magicalStrength = magicalStrength
        this.defense = defense;
        this.hitRate = hitRate;
        this.equipment = null;
        this.isPlayer = false;
    }

    getEnemyStatus() {
        return `${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】 【攻撃力 ${this.physicalStrength}】 【防御力 ${this.defense}】 【精神力 ${this.magicalStrength}】`;
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
        template.physicalStrength,
        template.magicalStrength,
        template.defense,
        template.hitRate
    );
}
