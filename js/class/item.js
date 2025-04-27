import { logMessage } from "./utils.js";
import { playerClass} from "./player.js";

export class Item {
    constructor(name, type, effect, amount = 1, rarity = "common") {
        this.name = name;
        this.type = type;
        this.effect = effect;
        this.amount = amount;
        this.rarity = rarity; 
    }
    showAmount() {
        return `${this.name}：${this.amount} 個`;
    }
}
export const healItemList = [
    new Item("初級薬", "heal", {hp:30}, 5, "common"),
    new Item("中級薬", "heal", {hp:80}, 3, "uncommon"),
    new Item("上級薬", "heal", {hp:200}, 1, "rare"),
    new Item("特級薬", "heal", {hp:500}, 0, "epic"),
    new Item("エリクサー", "heal", {hp:1000}, 0, "legendary"),
];

export const equipmentList = [
    new Item("剣", "equipment", {attack:10}, 0, "common"),
    new Item("鎧", "equipment", {defense:8}, 0, "rare"),
    new Item("兜", "equipment", {defense:4}, 0, "uncommon"),
    new Item("靴", "equipment", {defense:3}, 0, "common"),
    new Item("弓", "equipment", {attack:10, hitRate: -5}, 0, "rare"),
    new Item("伝説の剣", "equipment", {attack:50}, 0, "legendary"), // ←超レア武器追加！
];

export const allItemsList = [...healItemList,...equipmentList,]


export function dropRandomItem(currentPlayer) {
    
    const dropCandidates = [...allItemsList];

    const rarityRate = {
        common: 0.6,
        uncommon: 0.25,
        rare: 0.1,
        epic: 0.04,
        legendary: 0.01
    };

    let candidatePool = [];

    dropCandidates.forEach(item => {
        const rate = rarityRate[item.rarity] || 0.6;
        const count = Math.floor(rate * 100); // 例：commonなら60個
        for (let i = 0; i < count; i++) {
            candidatePool.push(item);
        }
    });
    // console.log("【DEBUG】candidatePoolの中身：", candidatePool);

    // if (candidatePool.length === 0) {
    //     console.error("ドロップ候補がないため、アイテムドロップをスキップします。");
    //     return;
    // }

    // 拡張した候補リストからランダムに一個選ぶ
    const randomIndex = Math.floor(Math.random() * candidatePool.length);
    const droppedItem = candidatePool[randomIndex];
    console.log("【DEBUG】選ばれたdroppedItem：", droppedItem);
    // if (!droppedItem) {
    //     console.error("ドロップアイテムが取得できませんでした。");
    //     return;
    // }


    // 所持アイテム確認（さっきやったやつ）
    const existingItem = currentPlayer.inventory.find(item => item.name === droppedItem.name);

    if (existingItem) {
        existingItem.amount += 1;
    } else {
        currentPlayer.inventory.push(new Item(droppedItem.name, droppedItem.type, droppedItem.effect, 1, droppedItem.rarity));
    }

    logMessage(`ドロップ報酬：${droppedItem.name}（${droppedItem.rarity}）を手に入れた！`);
}