document.getElementById("test-btn")?.addEventListener("click", () => {
    console.log("テストボタンがクリックされました。");
});

const user = {
    name: "Koudai",
    age: 22,
    hobby: "programming"
};

Object.keys(user).forEach(key => {
    const typedKey = key as keyof typeof user; // 型アサーション
    console.log(`${typedKey}: ${user[typedKey]}`);
});
console.log(Object.keys(user));