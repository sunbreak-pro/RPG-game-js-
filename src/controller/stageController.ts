import { logMessage } from "@/ui/logMessage";
import { getCurrentPlayer, getStageContext } from "./battleStateController";
import { Player } from "@/manage/characterManage/character";
import { SaveData } from "@/database/saveData";
import { saveGame } from "@/database/saveGame";

// stageController.ts に配置予定のインターフェースと関数
export interface StageProgress {
    currentFloor: number;
    lastClearedFloor: number;
}


export async function danjonclear(currentStage: number) {
    const {
        defaultAttackBtn,
        nextStageBtn,
        battleLogArea,
        afterBattleLogArea,
        toggleArea,
    } = getStageContext();

    defaultAttackBtn.style.display = "none";
    defaultAttackBtn.ariaDisabled = "true"
    toggleArea.style.display = "none"
    nextStageBtn.style.display = "none";
    battleLogArea.style.display = "";
    afterBattleLogArea.style.display = "none";
    logMessage("ダンジョンクリア！！🎉", "おめでとう！！！");
    const player = getCurrentPlayer() as Player;

    const saveData: SaveData = {
        playerName: player.name,
        maxHp: player.maxHp,
        maxMp: player.maxMp,
        hp: player.hp,
        mp: player.mp,
        physicalStrength: player.physicalStrength,
        magicalStrength: player.magicalStrength,
        defense: player.defense,
        speed: player.speed,
        isPlayer: player.isPlayer,
        inventory: player.inventory,
        equipment: player.equipment,
        skills: player.skills.map(s => s.skillId),
        currentStage: currentStage,
        deathCount: player.deathCount,
        lastClearedFloor: player.lastClearedFloor,
    };
    await saveGame(saveData);

    const gameResetBtn = document.getElementById("game-reset")
    if (gameResetBtn) {
        gameResetBtn.addEventListener("click", () => {
            window.location.href = "safezone.html";
        });
    }
    return;
}