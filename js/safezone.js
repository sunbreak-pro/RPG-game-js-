
import { allHealItems, allEquipmentItems } from "./manage/item.js";
// 表示構築（呼び出し）

document.getElementById("start-button-buttle").addEventListener("click", () => {
  const name = document.getElementById("player-name-input").value.trim();
  const job = selectedJob;
  if (!name || !job) {
    alert("名前と職業は必須です！");
    return;
  }

  const selectedEquipment = selectedEquipmentList.map(i => {
    return {...allEquipmentItems[i], amount: 1}; // ← 明示的に指定！
  });
  const selectedItems = selectedHealItemList.map(i => {
    return {...allHealItems[i], amount: 1}; // ← 明示的に指定！
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

const commonEquipment = allEquipmentItems.filter(item => item.rarity === "common");
const commonHealItems = allHealItems.filter(item => item.rarity === "common");

// ボタン生成に使用
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