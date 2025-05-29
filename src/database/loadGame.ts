// loadGame.ts - Firestore からの復元処理
import { db } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { SaveData } from "./saveData";
import { allEquipmentItems, allHealItems, EquipmentItem, Item } from "@/manage/itemManage/item";
import { saveGame } from "./saveGame";

export const loadGame = async (playerName: string): Promise<SaveData | null> => {
    if (!playerName || playerName.trim() === "") {
        console.log(playerName);
        console.warn("[LOAD] 無効なプレイヤー名");
        return null;
    }

    console.log("[LOAD]", playerName, "のデータを読み込み中...");

    try {
        const docRef = doc(db, "saves", playerName);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            console.log("[LOAD]", playerName, "のセーブデータが存在しません");
            return null;
        }

        const data = snapshot.data();
        console.log("[LOAD] データ読み込み成功:", data);
        return data as SaveData;

    } catch (error) {
        console.error("[LOAD ERROR]", error);
        return null;
    }
};

export async function handleStartBattle(selectedEquipmentList: number[], selectedInventoryItemList: number[]) {
    const alertMsg = document.getElementById("alert-msg") as HTMLElement;
    const nameInput = document.getElementById("player-name-input") as HTMLInputElement | null;
    console.log("[DEBUG] nameInput:", nameInput);
    const name = nameInput?.value.trim();
    console.log("[DEBUG] 入力された名前:", name);

    if (!name || name.length < 1 || name.length > 8) {
        alertMsg.textContent = "名前は１文字以上、もしくは8文字以内に設定してください";
        return;
    }
    if (!/^[ぁ-んァ-ン一-龥a-zA-Z0-9ー]+$/.test(name)) {
        alertMsg.textContent = "使用できない文字が含まれています（日本語・英数字のみ可）";
        return;
    }

    const saved = await loadGame(name);
    if (saved && saved.playerName) {
        const converted: SaveData = {
            playerName: saved.playerName,
            hp: saved.hp,
            maxHp: saved.maxHp,
            mp: saved.mp,
            maxMp: saved.maxMp,
            physicalStrength: saved.physicalStrength,
            magicalStrength: saved.magicalStrength,
            defense: saved.defense,
            speed: saved.speed,
            isPlayer: saved.isPlayer,
            inventory: saved.inventory,
            equipment: saved.equipment,
            skills: saved.skills,
            currentStage: saved.currentStage,
            deathCount: saved.deathCount,
            lastClearedFloor: saved.lastClearedFloor,
        };
        console.log("[LOAD OK]", converted);
        await saveGame(converted);
        localStorage.setItem("playerData", JSON.stringify(converted));
    } else {
        const selectedEquipment = selectedEquipmentList.map(i => ({ ...allEquipmentItems[i], amount: 1 }));
        const selectedItems = selectedInventoryItemList.map(i => ({ ...allHealItems[i], amount: 1 }));

        const newPlayer: SaveData = {
            playerName: name,
            maxHp: 100,
            hp: 100,
            maxMp: 40,
            mp: 40,
            physicalStrength: 20,
            magicalStrength: 20,
            defense: 10,
            speed: 10,
            isPlayer: true,
            inventory: selectedItems as Item[],
            equipment: selectedEquipment as EquipmentItem[],
            skills: [],
            currentStage: 1,
            deathCount: 0,
            lastClearedFloor: 0,
        };

        console.log("[NEW PLAYER]", newPlayer);
        await saveGame(newPlayer);
        localStorage.setItem("playerData", JSON.stringify(newPlayer));
    }

    // 安全に遷移するために少し遅延
    setTimeout(() => {
        window.location.href = "battleDisplay.html";
    }, 200);
}