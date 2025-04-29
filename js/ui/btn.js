// === アイテム・装備・スキル一覧のトグル開閉 ===
export function setupToggleButtons(toggleHealBtn, toggleEquipBtn, toggleSkillBtn, healItemsDiv, equipItemsDiv, skillDiv) {
    // 初期ラベル設定
    setInitialLabel(toggleHealBtn, "【回復アイテム一覧】");
    setInitialLabel(toggleEquipBtn, "【装着可能装備一覧】");
    setInitialLabel(toggleSkillBtn, "【使用可能スキル一覧】");

    toggleHealBtn.addEventListener("click", () => {
        toggleDisplay(toggleHealBtn, healItemsDiv, "【回復アイテム一覧】");
    });

    toggleEquipBtn.addEventListener("click", () => {
        toggleDisplay(toggleEquipBtn, equipItemsDiv, "【装着可能装備一覧】");
    });

    toggleSkillBtn.addEventListener("click", () => {
        toggleDisplay(toggleSkillBtn, skillDiv, "【使用可能スキル一覧】");
    });
}

// 初期状態でボタンラベルを「▶︎ 開く」にする
function setInitialLabel(button, label) {
    button.textContent = `▶︎ ${label}を開く`;
}

// 共通トグル処理
function toggleDisplay(button, div, label) {
    if (div.style.display === "none") {
        div.style.display = "block";
        button.textContent = `▼ ${label}を閉じる`;
    } else {
        div.style.display = "none";
        button.textContent = `▶︎ ${label}を開く`;
    }
}
// === 次のステージへボタンの設定 ===
export function setupNextStageButton(nextStageBtn, prepareNextStageFunc) {
    nextStageBtn.addEventListener("click", () => {
        prepareNextStageFunc();
    });
}
