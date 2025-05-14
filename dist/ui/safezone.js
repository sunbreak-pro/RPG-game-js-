// safetyArea.ts - TypeScript対応
import { allHealItems, allEquipmentItems } from "../manage/item.js";
const mainSafetyArea = document.getElementById("safety-area");
const selectPlayerArea = document.getElementById("select-player-area");
const shopArea = document.getElementById("shop-area");
const cookingArea = document.getElementById("cooking-area");
const cookingBtn = document.getElementById("cooking-btn");
const safetyAreaBtns = document.querySelectorAll(".safety-area-btn");
const shopBtn = document.getElementById("shop-btn");
const prepareBattleBtn = document.getElementById("prepare-battle-btn");
prepareBattleBtn.addEventListener("click", () => {
    console.log(selectPlayerArea);
    mainSafetyArea.style.display = "none";
    selectPlayerArea.style.display = "block";
});
safetyAreaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        mainSafetyArea.style.display = "block";
        selectPlayerArea.style.display = "none";
        shopArea.style.display = "none";
        cookingArea.style.display = "none";
    });
});
shopBtn.addEventListener("click", () => {
    shopArea.style.display = "block";
    mainSafetyArea.style.display = "none";
    console.log(shopArea);
});
cookingBtn.addEventListener("click", () => {
    mainSafetyArea.style.display = "none";
    cookingArea.style.display = "block";
});
// battleStageへデータの引き渡し ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
document.getElementById("start-button-buttle").addEventListener("click", () => {
    const name = document.getElementById("player-name-input").value.trim();
    const job = selectedJob;
    if (!name || !job) {
        alert("名前と職業は必須です！");
        return;
    }
    const selectedEquipment = selectedEquipmentList.map((i) => {
        return Object.assign(Object.assign({}, allEquipmentItems[i]), { amount: 1 });
    });
    const selectedItems = selectedHealItemList.map((i) => {
        return Object.assign(Object.assign({}, allHealItems[i]), { amount: 1 });
    });
    const playerData = {
        name,
        job,
        jobIndex: job === "戦士" ? 0 : 1,
        equipment: selectedEquipment,
        items: selectedItems,
    };
    localStorage.setItem("playerData", JSON.stringify(playerData));
    window.location.href = "battleDisplay.html";
});
let selectedJob = null;
const selectWarriorBtn = document.getElementById("select-warrior");
const selectMageBtn = document.getElementById("select-mage");
selectWarriorBtn.addEventListener("click", () => {
    selectedJob = "戦士";
    updateClassSelectionUI(selectWarriorBtn, selectMageBtn);
});
selectMageBtn.addEventListener("click", () => {
    selectedJob = "魔法使い";
    updateClassSelectionUI(selectMageBtn, selectWarriorBtn);
});
function updateClassSelectionUI(selectedBtn, unselectedBtn) {
    selectedBtn.classList.add("selected-class");
    unselectedBtn.classList.remove("selected-class");
}
const selectedEquipmentList = [];
const selectedHealItemList = [];
const equipmentArea = document.getElementById("equipment-options");
const healItemArea = document.getElementById("heal-item-options");
const commonEquipment = allEquipmentItems.filter((item) => item.rarity === "common");
const commonHealItems = allHealItems.filter((item) => item.rarity === "common");
createSelectableList(commonEquipment, equipmentArea, selectedEquipmentList, 2);
createSelectableList(commonHealItems, healItemArea, selectedHealItemList, 2);
function createSelectableList(items, container, selectedList, max) {
    items.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.textContent = item.name;
        btn.addEventListener("click", () => {
            const i = selectedList.indexOf(index);
            if (i !== -1) {
                selectedList.splice(i, 1);
                btn.classList.remove("selected-class");
            }
            else {
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
