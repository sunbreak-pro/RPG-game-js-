import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { delayedEnemyAction } from "./attack.js";
import { logMessage, turnLog } from "../ui/logMessage.js";
import { handleCharacterDefeat } from "../manage/characterDefeat.js";
import { updateStatus } from "../manage/itemStatusUpdater.js";
import { uiElements } from "../main.js";
import { allSKillList, baseSkillList, synthesisSkillList } from "../manage/templates/skillTemplates.js";
import { startTurn, markPlayerTurnDone, markEnemyTurnDone, proceedTurn, markSkillUsed } from "../manage/turnController.js";
export class Skill {
    constructor({ name, mpCost, type, element, power, log, Instruction }) {
        this.name = name;
        this.mpCost = mpCost;
        this.type = type;
        this.element = element;
        this.power = power;
        this.log = log;
        this.Instruction = Instruction;
    }
}
export function createAllSkill(index) {
    return new Skill(allSKillList[index]);
}
export function createBaseSkill(index) {
    return new Skill(baseSkillList[index]);
}
export function createSynthesisSkill(index) {
    return new Skill(synthesisSkillList[index]);
}
export function activateSkill(skillIndex, _user, _target) {
    const skill = allSKillList[skillIndex];
    const player = getCurrentPlayer();
    if (!skill) {
        logMessage("スキルが見つかりません！", "");
        return;
    }
    const user = _user;
    const target = _target;
    if (user.mp < skill.mpCost) {
        turnLog(`${user.name}はスキルを発動！`,`しかし、${user.name} はMPが足りない！`);
        return;
    } else {
        user.mp -= skill.mpCost;
    }
    
    const damage = skill.power(user);

    if (skill.type === "heal") {
        skill.log(skill.name, user, target || null, skill.power(user));
    }
    else {
        target.hp -= damage;
        skill.log(skill.name, user, target, skill.power(user));
        proceedTurn();
    }
    if (target.hp > 0 && user === player) {
        markPlayerTurnDone();
        delayedEnemyAction(1000);
    }
    else if (target.hp > 0) {
        markEnemyTurnDone();
    }
    if (target.hp <= 0 && skill.type !== "heal") {
        target.hp = 0;
        updateStatus(uiElements);
        setTimeout(() => {
            const afterLog = typeof skill.log === "function"
                ? () => skill.log(skill.name, user, target, skill.power(user))
                : null;
            setTimeout(() => {
                handleCharacterDefeat(target, afterLog, true);
            }, 1000);
        }, 850);
    }
    proceedTurn();
    updateStatus(uiElements);
}

// === スキルボタンを生成して並べる ===
const instructionBorder = document.getElementById("instruction-border");
const instructionParagraph = document.getElementById("skill-instruction");

export function updateBaseSkillArea(skillDiv, baseSkillList) {
    skillDiv.innerText = "";
    baseSkillList.forEach((skill, index) => {
        const skillBtn = document.createElement("button");
        skillBtn.innerHTML = `${skill.name} <br>（消費MP:${skill.mpCost}）`;

        skillBtn.addEventListener("mouseover", () => {
            instructionBorder.style.display = "block";
            instructionParagraph.innerText = skill.Instruction;
        });
        skillBtn.addEventListener("mouseleave", () => {
            instructionBorder.style.display = "none";
        });
        skillBtn.addEventListener("click", () => {
            startTurn();
            const user = getCurrentPlayer();
            const target = getCurrentEnemy();
            markPlayerTurnDone();
            markSkillUsed();
            activateSkill(index, user, target);
        });
        skillDiv.appendChild(skillBtn);
    });
    updateStatus(uiElements);
}
export function updateSynthesisSkillArea(skillDiv, synthesisSkillList) {
    skillDiv.innerText = "";
    synthesisSkillList.forEach((skill, index) => {
        const skillBtn = document.createElement("button");
        skillBtn.textContent = `${skill.name}（消費MP:${skill.mpCost}）`;
        skillBtn.addEventListener("mouseover", () => {
            instructionBorder.style.display = "block";
            instructionParagraph.innerText = skill.Instruction;
        });
        skillBtn.addEventListener("mouseleave", () => {
            instructionBorder.style.display = "none";
        });
        skillBtn.addEventListener("click", () => {

            const user = getCurrentPlayer();
            const target = getCurrentEnemy();
            console.log(player,enemy);

            markSkillUsed();
            activateSkill(index, user, target);
        });
        skillDiv.appendChild(skillBtn);
    });
    updateStatus(uiElements);
}
