import { logMessage } from "../ui/logMessage.js";
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
    new Item("HPの実", "hpHeal", {hp:30}, 5, "common"),
    new Item("HPジャム", "hpHeal", {hp:80}, 3, "uncommon"),
    new Item("HPポーション", "hpHeal", {hp:200}, 1, "rare"),
    new Item("MPの実", "mpHeal", {mp:10}, 1, "common"),
    new Item("MPジャム", "mpHeal", {mp:30}, 0, "uncommon"),
    new Item("MPポーション", "mpHeal", {mp:60}, 0, "epic"),
    new Item("エリクサー", "bothHeal", {hp:200,mp:500}, 0, "legendary"),
];

export const equipmentList = [
    new Item("剣", "equipment", {physicalStrength:10}, 1, "common"),
    new Item("鎧", "equipment", {defense:8}, 0, "rare"),
    new Item("兜", "equipment", {defense:4}, 0, "uncommon"),
    new Item("靴", "equipment", {defense:3}, 0, "common"),
    new Item("弓", "equipment", {physicalStrength:10, hitRate: -5}, 0, "rare"),
    new Item("伝説の剣", "equipment", {physicalStrength:50}, 10, "legendary"),
];

export const allItemsList = [...healItemList,...equipmentList,]

export function weightedRandom(items, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNum < cumulativeWeight) {
            return items[i];
        }
    }
}
export function dropRandomItem(currentPlayer) {
    
    const items = allItemsList;
    const rarityRate = {
        common: 0.6,
        uncommon: 0.3,
        rare: 0.15,
        epic: 0.05,
        legendary: 0.02,
    };
    const weights = items.map(item => rarityRate[item.rarity] || 0.6);
    
    const droppedItem = weightedRandom(items, weights);
    console.log("【DEBUG】選ばれたdroppedItem：", droppedItem);

    const existingItem = currentPlayer.inventory.find(item => item.name === droppedItem.name);

    if (existingItem) {
        existingItem.amount += 1;
    } else {
        currentPlayer.inventory.push(new Item(droppedItem.name, droppedItem.type, droppedItem.effect, 1, droppedItem.rarity));
    }
    logMessage(`ドロップ報酬：${droppedItem.name}（${droppedItem.rarity}）を手に入れた！`,"");
}