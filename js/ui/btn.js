import { toggleArea } from "../main.js";


// === アイテム・装備・スキル一覧のトグル開閉 ===
export function setupToggleButtons() {
    const toggleConfigs = [
        { btnId: "toggle-heal-items", listId: "heal-items", label: "回復アイテム一覧" },
        { btnId: "toggle-equip-items", listId: "equip-items", label: "装備アイテム一覧" },
        { btnId: "toggle-skill-list", listId: "skill-list", label: "スキル一覧" },
    ];

    toggleConfigs.forEach(({ btnId, listId, label }) => {
        const button = document.getElementById(btnId);
        const list = document.getElementById(listId);

        button.textContent = `▶︎ ${label}`;
        list.classList.add("hidden");

        button.addEventListener("click", () => {
            const isHidden = list.classList.toggle("hidden");
            button.textContent = isHidden
                ? `▶︎ ${label}`
                : `▼ ${label}を閉じる`;
        });
    });
}

// === 次のステージへボタンの設定 ===
export function setupNextStageButton(nextStageBtn, prepareNextStageFunc) {
    nextStageBtn.addEventListener("click", () => {
        toggleArea.style.display = "";
        prepareNextStageFunc();
    });
}
