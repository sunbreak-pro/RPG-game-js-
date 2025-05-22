// manage/templates/skillTemplates.ts - TypeScript対応
import { turnLog } from "../../ui/logMessage";
import type { SkillData } from "../../battle/skill/skillManager";

export const baseSkillList: SkillData[] = [
  {
    name: "スラッシュ",
    mpCost: 5,
    type: "attack",
    power: (user) => Math.floor(user.physicalStrength * 1.3),
    log: (skillName, user, target, dmg) => {
      if (target.hp <= 0) {
        target.hp = 0;
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, ` ${target.name} は細切れにされた`);
      } else {
        turnLog(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！ <br>(${target.name}のHP：${target.hp})`);
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
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${target.name}は、炭火焼きにされた`);
      } else {
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！<br>(${target.name}のHP：${target.hp})`);
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
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${target.name}は、氷の槍で串刺にされた`);
      } else {
        turnLog(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！<br>(${target.name}のHP：${target.hp})`);
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
    log: (skillName, user) => {
      if (user.hp !== user.maxHp) {
        const healAmount = Math.floor(user.magicalStrength * 1.5);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        turnLog(`${user.name} は ${skillName} でHPを${healAmount}回復！<br>(${user.name}のHP：${user.hp})`);
      } else {
        turnLog(`${user.name} のHPは既に MAX です！`);
      }
    },
    Instruction: "名称：自己再生\n 自らの力で体力を回復するスキル。精神力依存",
  },
];

export const evoleveSkillList: SkillData[] = [
  {
    name: "ファイアブラスト",
    mpCost: 18,
    type: "attack",
    element: "fire",
    power: (user) => Math.floor(user.magicalStrength * 1.8),
    log: (skillName, user, target, dmg) => {
      if (target.hp <= 0) {
        target.hp = 0;
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${user.name} は 【${skillName}】で爆散した`);
      } else {
        turnLog(`${user.name} の【ファイアブラスト】が炸裂！${target.name} に ${dmg} ダメージ！<br>(現在のHP：${target.hp})`);
      }
    },
    Instruction: "名称：ファイヤブラスト\n ダメージは精神力に依存する強力魔法",
  },
];

export const synthesisSkillList: SkillData[] = [
  {
    name: "次元斬",
    mpCost: 35,
    type: "attack",
    element: "sword",
    power: (user) => Math.floor(user.physicalStrength * 2.0),
    log: (skillName, user, target, dmg) => {
      if (target.hp <= 0) {
        target.hp = 0;
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${target.name}は、次元の狭間に葬り去られた`);
      } else {
        turnLog(`${user.name} は【${skillName}】で切り刻まれる！ ${target.name} に ${dmg} ダメージ！<br> (${target.name}のHP：${target.hp})`);
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
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${target.name}は、地獄の業火に焼き尽くされた`);
      } else {
        turnLog(`${user.name} の【${skillName}】が大地を焼き尽くす ${target.name} に ${dmg} ダメージ！ <br>(現在のHP：${target.hp})`);
      }
    },
    Instruction: "名称：インフェルノ\n fire elementの最終進化系。精神力依存",
  },
  {
    name: "コキュートス",
    mpCost: 50,
    type: "attack",
    element: "ice",
    power: (user) => Math.floor(user.magicalStrength * 2.5),
    log: (skillName, user, target, dmg) => {
      if (target.hp <= 0) {
        target.hp = 0;
        turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name}に${dmg}ダメージ！<br>(${target.name}のHP：${target.hp})`, `${target.name} は、氷漬けにされ息絶えた`);
      } else {
        turnLog(`${user.name} の【${skillName}】が銀世界を創り出す${target.name} に ${dmg} ダメージ！<br>(${target.name}のHP：${target.hp})`);
      }
    },
    Instruction: "名称：アイステンペスト\n 氷属性の最終進化スキル。精神力依存",
  },
];

export const allSKillList: SkillData[] = [...baseSkillList, ...evoleveSkillList, ...synthesisSkillList];
