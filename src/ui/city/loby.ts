// safezone.ts - saveGame統合バージョン（ローディング対応）
import { allHealItems, allEquipmentItems, Item } from "../../manage/itemManage/item";
import { handleStartBattle } from "@/database/loadGame";

if (!location.pathname.includes("/")) {
    console.warn("safezone.ts は index.html 上でのみ実行される想定です");
    throw new Error("safezone.ts を中断します");
}


document.getElementById("test-button")?.addEventListener("click", () => {
    console.log("テストボタンがクリックされました。");
    setTimeout(() => {
        console.log("Redirecting...");
        setTimeout(() => {
            window.location.href = "test.html";
        }, 2500);
    }, 2500);
});

const lobby = document.getElementById("lobby") as HTMLElement;
const selectPlayerArea = document.getElementById("select-player-area") as HTMLElement;
const shopArea = document.getElementById("shop-area") as HTMLElement;
const cookingArea = document.getElementById("cooking-area") as HTMLElement;
const cookingBtn = document.getElementById("cooking-btn") as HTMLButtonElement;

const safetyAreaBtns = document.querySelectorAll(".safety-area-btn");
const shopBtn = document.getElementById("shop-btn") as HTMLButtonElement;
const prepareBattleBtn = document.getElementById("prepare-battle-btn") as HTMLButtonElement;

prepareBattleBtn.addEventListener("click", () => {
    lobby.style.display = "none";
    selectPlayerArea.style.display = "block";
});

safetyAreaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        lobby.style.display = "block";
        selectPlayerArea.style.display = "none";
        shopArea.style.display = "none";
        cookingArea.style.display = "none";
    });
});

shopBtn.addEventListener("click", () => {
    shopArea.style.display = "block";
    lobby.style.display = "none";
});

cookingBtn.addEventListener("click", () => {
    lobby.style.display = "none";
    cookingArea.style.display = "block";
});

const selectedEquipmentList: number[] = [];
const selectedInventoryItemList: number[] = [];
const equipmentArea = document.getElementById("equipment-options") as HTMLElement;
const healItemArea = document.getElementById("heal-item-options") as HTMLElement;

const commonEquipment = allEquipmentItems.filter((item) => item.rarity === "common");
const commonHealItems = allHealItems.filter((item) => item.rarity === "common");

createSelectableList(commonEquipment, equipmentArea, selectedEquipmentList, 2);
createSelectableList(commonHealItems, healItemArea, selectedInventoryItemList, 2);


document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-button-buttle") as HTMLButtonElement | null;
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            handleStartBattle(selectedEquipmentList, selectedInventoryItemList)
        });
    } else {
        console.warn("start-button-buttle が見つかりませんでした");
    }
});

function createSelectableList(
    items: Item[],
    container: HTMLElement,
    selectedList: number[],
    max: number
): void {
    items.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.textContent = item.itemName;
        btn.addEventListener("click", () => {
            const i = selectedList.indexOf(index);
            if (i !== -1) {
                selectedList.splice(i, 1);
                btn.classList.remove("selected-class");
            } else {
                if (selectedList.length >= max) {
                    alert(`最大${max}つまで選べます`);
                    return;
                }
                selectedList.push(index);
                btn.classList.add("selected-class");
            }
        });
        container.appendChild(btn);
    });
}