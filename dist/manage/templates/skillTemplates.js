// manage/templates/skillTemplates.ts - TypeScript対応
import { logMessage } from "../../ui/logMessage";
export const baseSkillList = [
    {
        name: "スラッシュ",
        mpCost: 5,
        type: "attack",
        power: (user) => Math.floor(user.magicalStrength * 1.3),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name} は、細切れにされた`, `${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！`, `(${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：スラッシュ\n 少しのオーラを纏った斬撃を放つ。ダメージはキャラクターの物理攻撃に依存する",
    },
    {
        name: "ファイアボール",
        mpCost: 10,
        type: "attack",
        power: (user) => Math.floor(user.magicalStrength * 1.3),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name}は、炭火焼きにされた\n ${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} は 【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！`, ` (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：ファイヤーボール\n 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する",
    },
    {
        name: "アイスランス",
        mpCost: 12,
        type: "attack",
        power: (user) => Math.floor(user.magicalStrength * 1.5),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name}は、串刺の中、凍え死んだ... `, `${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！`, ` (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：アイスランス\n 氷の槍を繰り出す。ダメージはキャラクターの 精神力×1.5 に依存する",
    },
    {
        name: "自己再生",
        mpCost: 8,
        type: "heal",
        element: "heal",
        power: () => 0,
        log: (skillName, user, _target, _dmg) => {
            if (user.hp !== user.maxHp) {
                const healAmount = Math.floor(user.magicalStrength * 1.5);
                user.hp = Math.min(user.maxHp, user.hp + healAmount);
                logMessage(`${user.name} は ${skillName} でHPを${healAmount}回復！(${user.name}のHP：${user.hp})`);
            }
            else {
                logMessage(`${user.name} のHPは既に MAX です！`);
            }
        },
        Instruction: "名称：自己再生\n 自らの力で体力を回復するスキル。精神力依存",
    },
];
export const evoleveSkillList = [
    {
        name: "ファイアブラスト",
        mpCost: 18,
        type: "attack",
        element: "fire",
        power: (user) => Math.floor(user.magicalStrength * 1.8),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${user.name} は 【${skillName}】で爆散した`, ` ${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} の【ファイアブラスト】が炸裂！`, `${target.name} に ${dmg} ダメージ！(現在のHP：${target.hp})`);
            }
        },
        Instruction: "名称：ファイヤブラスト\n ダメージは精神力に依存する強力魔法",
    },
];
export const synthesisSkillList = [
    {
        name: "次元斬",
        mpCost: 35,
        type: "attack",
        element: "sword",
        power: (user) => Math.floor(user.physicalStrength * 2.0),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name}は、次元の狭間に葬り去られた`, ` ${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} は【${skillName}】で切り刻まれる！ ${target.name} に ${dmg} ダメージ！ (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：次元斬\n 高威力の物理攻撃。物理ステ依存",
    },
    {
        name: "インフェルノ",
        mpCost: 50,
        type: "attack",
        element: "fire",
        power: (user) => Math.floor(user.magicalStrength * 2.5),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name}は、業火に包まれ、息たえた\n ${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} の【${skillName}】が大地を焼き尽くす`, `${target.name} に ${dmg} ダメージ！ (現在のHP：${target.hp})`);
            }
        },
        Instruction: "名称：インフェルノ\n fire elementの最終進化系。精神力依存",
    },
    {
        name: "アイステンペスト",
        mpCost: 50,
        type: "attack",
        element: "ice",
        power: (user) => Math.floor(user.magicalStrength * 2.5),
        log: (skillName, user, target, dmg) => {
            if (target.hp <= 0) {
                target.hp = 0;
                logMessage(`${target.name}は、氷漬けにされた`, `${target.name} は倒れた！`);
            }
            else {
                logMessage(`${user.name} の【${skillName}】が銀世界を創り出す`, `${target.name} に ${dmg} ダメージ！(${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：アイステンペスト\n 氷属性の最終進化スキル。精神力依存",
    },
];
export const allSKillList = [...baseSkillList, ...evoleveSkillList, ...synthesisSkillList];
