import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { SaveData } from "./saveData";

export const saveGame = async (data: SaveData): Promise<void> => {
  if (!data.playerName || data.playerName.trim() === "") {
    console.warn("[SAVE] playerName が空のため保存スキップ");
    return;
  }
  const docRef = doc(db, "saves", data.playerName);
  await setDoc(docRef, data);
};