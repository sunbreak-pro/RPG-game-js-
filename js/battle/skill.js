import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState.js";
import { delayedEnemyAction } from "../battle/attack.js";
import { logMessage } from "../ui/logMessage.js";
import { handleCharacterDefeat } from "../manage/characterDefeat.js"
import { updateStatus } from "../manage/itemStatusUpdater.js";
import { uiElements } from "../main.js";
import { allSKillList, baseSkillList, synthesisSkillList } from "../manage/termplates/skillTemplates.js";
import { startTurn, markPlayerTurnDone, markEnemyTurnDone, proceedTurn } from "../manage/turnController.js";

// === スキルデータ ===

export class Skill{
    constructor({name, mpCost, type, element, power, log, Instruction}) {
        this.name = name;
        this.mpCost = mpCost;
        this.type = type;
        this.element = element
        this.power = power;
        this.log = log;
        this.Instruction = Instruction;
        // this.skillExp = skillExp;
        // this.evolveTo = null;
        // this.BeforeEvolution = null
    }
}
export function createAllSkill(index) {
    return new Skill(allSKillList[index]); 
}

export function createBaseSkill(index) {
    return new Skill(baseSkillList[index]);
}
        
export function  createSynthesisSkill(index) {
    return new Skill(synthesisSkillList[index]);
}
// === スキル発動
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
        logMessage(`${user.name}はスキルを発動！`,`しかし、${user.name} はMPが足りない！`);
        return;
    }
    user.mp -= skill.mpCost;
    const damage = skill.power(user);
    if (skill.type === "heal") {
        skill.log(skill.name, user, null, null); // ← heal系ログ
    } else {
        target.hp -= damage;
        skill.log(skill.name, user, target, damage); // ← dmgを渡す
        proceedTurn();
    }
    if(target.hp > 0 && user === player){
        markPlayerTurnDone();
        delayedEnemyAction(1000);
    }
    else if(target.hp > 0){
        markEnemyTurnDone();
        proceedTurn();
    }
    if (target.hp <= 0 && skill.type !== "heal") {
        target.hp = 0
        updateStatus(uiElements);
        setTimeout(()=>{
            const afterLog = typeof skill.log === "function"
            ? () => skill.log(skill.name, user, target, damage)
            : null;
            setTimeout(()=>{
                handleCharacterDefeat(target, afterLog, true);
            },1000)
        },850);
        return;
    }
    updateStatus(uiElements);
}

// === スキルボタンを生成して並べる ===
const instructionBorder = document.getElementById("instruction-border");
const instructionParagraph = document.getElementById("instruction");

export function updateBaseSkillArea(skillDiv, baseSkillList) {
    console.log(baseSkillList);
    skillDiv.innerText = "";
    baseSkillList.forEach((skill, index) => {
        const skillBtn = document.createElement("button");
        skillBtn.innerHTML = `${skill.name} <br>（消費MP:${skill.mpCost}）`;

        skillBtn.addEventListener("mouseenter", () => {
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
            activateSkill(index, user, target);
        });
        skillDiv.appendChild(skillBtn);
    });
    updateStatus(uiElements);
}

export function updateSynthesisSkillArea(skillDiv, synthesisSkillList) {
    console.log(synthesisSkillList)
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
            activateSkill(index, user, target);
        });
        skillDiv.appendChild(skillBtn);
    });
    updateStatus(uiElements);
}

