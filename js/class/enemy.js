// import { Character } from "./character.js";
// import { logMessage } from "./utils.js";

// export class Enemy extends Character {
//     constructor(name, className,hp, mp, attack, healSkill, defense, canHeal = false) {
//         super(name, className, hp, mp, attack, healSkill, defense);
//         this.canHeal = canHeal;
//     }

//     takeAction(player) {
//         if (this.hp < this.maxHp / 2 && this.canHeal && this.mp >= 5) {
//             const willHeal = Math.random() < 0.5;
//             if (willHeal) {
//                 this.mp -= 5;
//                 this.healTarget();
//                 return;
//             }
//         }
//         this.attackTarget(player);
//     }

//     healTarget() {
        
//         const healAmount = Math.floor(Math.random() * 4) + 3;
//         this.hp = Math.min(this.hp + healAmount, this.maxHp);
//         logMessage(`${this.name} は ${healAmount} 回復した！（現在HP：${this.hp}）`);
//     }
// }
// export const enemies = [
//     new Enemy("スライム","", 50, 0, 10, 0, 2),
//     new Enemy("ゴブリン","", 70, 5, 15, 3, 5),
//     // new Enemy("オーク","", 100, 10, 20, 5, 7),
//     // new Enemy("ドラゴン","", 200, 30, 30, 10, 30),
//     // new Enemy("ダンジョンボス","", 200, 100, 30, 30, 14)
// ];
  
  // ステージ開始時にこうやる
//   currentEnemy = createEnemy(enemyTemplates[currentEnemyIndex]);
  // enemy.js

// 敵キャラのテンプレートデータ
export const enemyTemplates = [
    { name: "スライム", className: "monster", hp: 50, mp: 0, attack: 10, healSkill: null, defense: 5, hitRate: 80 },
    { name: "ゴブリン", className: "monster", hp: 60, mp: 10, attack: 20, healSkill: null, defense: 10, hitRate: 90 },
    { name: "オーク", className: "monster", hp: 80, mp: 20, attack: 30, healSkill: null, defense: 15, hitRate: 85 },
    { name: "リッチ", className: "monster", hp: 100, mp: 60, attack: 60, healSkill: 30, defense: 20, hitRate: 85 },
    { name: "ドラゴン", className: "monster", hp: 200, mp: 50, attack: 100, healSkill: 40, defense: 40, hitRate: 85 },
    { name: "ダンジョンボス", className: "monster", hp: 250, mp: 50, attack: 120, healSkill: 60, defense: 40, hitRate: 85 },
  ];
  
  // 敵を生成する関数
  import { Character } from "./character.js";
  
  export function createEnemy(template) {
    return new Character(
      template.name,
      template.className,
      template.hp,
      template.mp,
      template.attack,
      template.healSkill,
      template.defense,
      template.hitRate
    );
  }
  