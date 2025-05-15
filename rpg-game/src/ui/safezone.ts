// safetyArea.ts - TypeScript対応

import { allHealItems, allEquipmentItems } from "../manage/item";
// 表示構築（呼び出し）
const lobby = document.getElementById("lobby")as HTMLElement;

const selectPlayerArea = document.getElementById("select-player-area")as HTMLElement;
const shopArea = document.getElementById("shop-area")as HTMLElement;
const cookingArea = document.getElementById("cooking-area")as HTMLElement;
const cookingBtn = document.getElementById("cooking-btn")as HTMLElement;

const safetyAreaBtns = document.querySelectorAll(".safety-area-btn");
const shopBtn = document.getElementById("shop-btn") as HTMLButtonElement;
const prepareBattleBtn = document.getElementById("prepare-battle-btn") as HTMLButtonElement;

prepareBattleBtn.addEventListener("click", () => {
  console.log(selectPlayerArea);
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
  console.log(shopArea);
});

cookingBtn.addEventListener("click", () => {
  lobby.style.display = "none";
  cookingArea.style.display = "block";
});

// battleStageへデータの引き渡し ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
document.getElementById("start-button-buttle")!.addEventListener("click", () => {
  const name = (document.getElementById("player-name-input") as HTMLInputElement).value.trim();
  const job = selectedJob;
  if (!name || !job) {
    alert("名前と職業は必須です！");
    return;
  }

  const selectedEquipment = selectedEquipmentList.map((i) => {
    return { ...allEquipmentItems[i], amount: 1 };
  });
  const selectedItems = selectedHealItemList.map((i) => {
    return { ...allHealItems[i], amount: 1 };
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

let selectedJob: string | null = null;
const selectWarriorBtn = document.getElementById("select-warrior") as HTMLButtonElement;
const selectMageBtn = document.getElementById("select-mage") as HTMLButtonElement;

selectWarriorBtn.addEventListener("click", () => {
  selectedJob = "戦士";
  updateClassSelectionUI(selectWarriorBtn, selectMageBtn);
});

selectMageBtn.addEventListener("click", () => {
  selectedJob = "魔法使い";
  updateClassSelectionUI(selectMageBtn, selectWarriorBtn);
});

function updateClassSelectionUI(selectedBtn: HTMLElement, unselectedBtn: HTMLElement): void {
  selectedBtn.classList.add("selected-class");
  unselectedBtn.classList.remove("selected-class");
}

const selectedEquipmentList: number[] = [];
const selectedHealItemList: number[] = [];

const equipmentArea = document.getElementById("equipment-options") as HTMLElement;
const healItemArea = document.getElementById("heal-item-options") as HTMLElement;

const commonEquipment = allEquipmentItems.filter((item) => item.rarity === "common");
const commonHealItems = allHealItems.filter((item) => item.rarity === "common");

createSelectableList(commonEquipment, equipmentArea, selectedEquipmentList, 2);
createSelectableList(commonHealItems, healItemArea, selectedHealItemList, 2);

function createSelectableList(
  items: { name: string }[],
  container: HTMLElement,
  selectedList: number[],
  max: number
): void {
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