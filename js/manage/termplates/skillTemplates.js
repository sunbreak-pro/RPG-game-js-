import { logMessage, turnLog } from "../../ui/logMessage.js";

export const baseSkillList = [
    {
        name: "スラッシュ",
        mpCost: 5,
        type: "physics",
        power:(user)=> Math.floor(user.physicalStrength * 1.3),
        log: (skillName,user, target, dmg) => {
            if(target<=0){
                target.hp = 0;
                turnLog(`${target.name} は、細切れにされた`,`${target.name} は倒れた！`);
            }else{
                turnLog(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！ `,`(${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：スラッシュ\n 少しのオーラを纏った斬撃を放つ。ダメージはキャラクターの物理攻撃に依存する",
        // evolveTo:null,
    },
    {
        name: "ファイアボール",
        mpCost: 10,
        type: "physics",
        power: (user) => Math.floor(user.magicalStrength * 1.3),
        log: (skillName,user, target, dmg) => {
            if(target<=0){
                target.hp = 0;
                turnLog(`${target.name}は、炭火焼きにされた\n ${target.name} は倒れた！`);    
            }else{
                turnLog(`${user.name} は 【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！`,` (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：ファイヤーボール\n 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する",
        // evolveTo:null,
    },
    {
        name: "アイスランス",
        mpCost: 12,
        type : "magic",
        power: (user) => Math.floor(user.magicalStrength * 1.5),
        log: (skillName,user, target, dmg) => {
            if(target.hp<=0){
                target.hp = 0;
                turnLog(`${target.name}は、串刺の中、凍え死んだ... `,`${target.name} は倒れた！`);
            }else{
                turnLog(`${user.name} は【${skillName}】で攻撃！ ${target.name} に ${dmg} ダメージ！`,` (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：アイスランス\n 氷の槍を繰り出す。ダメージはキャラクターの 精神力×1.5 に依存する",
        evolveTo:null,
    },
    {
        name: "自己再生",
        mpCost: 8,
        type: "heal",
        element: "heal",
        power: (user) => null,
        log: (skillName,user, target, dmg) => {
            if(user.hp !== user.maxHp){
                const healAmount = Math.floor(user.magicalStrength * 1.5);
                user.hp = Math.min(user.maxHp, user.hp + healAmount);
                turnLog(`${user.name} は ${skillName} でHPを${healAmount}回復！(${user.name}のHP：${user.hp})`);
            }
            else{
                turnLog(`${user.name} のHPは既に MAX です！`);
            }
        },
        Instruction: "名称：自己再生\n",
    },
    
];

export const evoleveSkillList = [
    {
        name: "ファイアブラスト",
        mpCost: 18,
        type: "magic",
        element: "fire",
        power: (user) => Math.floor(user.magicalStrength * 1.8),
        log: (skillName,user, target, dmg) =>{
            if(target.hp<=0){
                target.hp = 0;
                turnLog(`${user.name} は 【${skillName}】で爆散した`,` ${target.name} は倒れた！`);
            }else{
                turnLog(`${user.name} の【ファイアブラスト】が炸裂！`,`${target.name} に ${dmg} ダメージ！`,`(現在のHP：${target.hp})`);
            }
        },
        Instruction:"名称：ファイヤブラスト\n ダメージは精神力に依存する"
    }
]

export const synthesisSkillList = [
    {
        name: "次元斬",
        mpCost: 35,
        type: "physics",
        element: "sord",
        power:()=>Math.floor(user.physicalStrength * 2.0),
        log: (skillName,user, target, dmg) => {
            if(target.hp <= 0){
                target.hp = 0;
                turnLog(`${target.name}は、次元の狭間に葬り去られた`,` ${target.name} は倒れた！`);
            }
            else{
                turnLog(`${user.name} は【${skillName}】で切り刻まれる！ ${target.name} に ${dmg} ダメージ！ (${target.name}のHP：${target.hp})`);
            }
        },
        Instruction: "名称：ファイヤーボール\n 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する",
    },
    {
        name: "インフェルノ",
        mpCost: 50,
        type: "magic",
        element: "fire",
        power: (user) => Math.floor(user.magicalStrength * 2.5),
        log: (skillName,user, target, dmg) =>{
            if(target.hp <= 0){
                target.hp=0;
                turnLog(`${target.name}は、業火に包まれ、息たえた\n ${target.name} は倒れた！`);
            }else{
                turnLog(`${user.name} の【${skillName}】が大地を焼き尽くす`,`${target.name} に ${dmg} ダメージ！ (現在のHP：${target.hp})`)
            }    
        },
        Instruction:"名称：インフェルノ\n fire elemntの最終進化系。威力は精神力に依存する",
        // evolveTo: null, // 進化終了
    },
    {
        name: "アイステンペスト",
        mpCost: 50,
        type: "magic",
        element: "ice",
        power: (user) => Math.floor(user.magicalStrength * 2.5),
        log: (skillName,user, target, dmg) =>{
            if(target.hp <= 0){
                target.hp=0;
                turnLog(`${target.name}は、氷漬けにされた`,`${target.name} は倒れた！`);
            }else{
                turnLog(`${user.name} の【${skillName}】が銀世界を創り出す`,`${target.name} に ${dmg} ダメージ！`,`(${target.name}のHP：${target.hp})`)
            }    
        },
        Instruction:"名称：インフェルノ\n fire elemntの最終進化系。威力は精神力に依存する",
        // evolveTo: null, 
    }
];

export const allSKillList = [...baseSkillList,...evoleveSkillList,...synthesisSkillList]