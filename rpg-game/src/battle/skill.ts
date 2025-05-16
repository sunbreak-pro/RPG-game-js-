// manage/skill.ts - TypeScript対応

import { getCurrentPlayer, getCurrentEnemy } from "../manage/battleState";
import { delayedEnemyAction } from "./attack";
import { logMessage, turnLog } from "../ui/logMessage";
import { handleCharacterDefeat } from "../manage/characterDefeat";
import { updateStatus } from "../manage/itemStatusUpdater";
import { uiElements } from "../main";
import { allSKillList, baseSkillList, synthesisSkillList } from "../manage/templates/skillTemplates";
import { startTurn, markPlayerTurnDone, markEnemyTurnDone, proceedTurn, markSkillUsed } from "../manage/turnController";
import type { Character } from "../types/characterTypes";

export interface SkillData {
    name: string;
    mpCost: number;
    type: "attack" | "heal";
    element?: string;
    power: (user: Character) => number;
    log: (skillName: string, user: Character, target: Character, dmg?: number) => void;
    Instruction: string;
  }

export class Skill {
  name: string;
  mpCost: number;
  type: "attack" | "heal";
  element?: string;
  power: (user: Character) => number;
  log: (skillName: string, user: Character, target: Character, damage?: number) => void;
  Instruction: string;

  constructor({ name, mpCost, type, element, power, log, Instruction }: SkillData) {
    this.name = name;
    this.mpCost = mpCost;
    this.type = type;
    this.element = element;
    this.power = power;
    this.log = log;
    this.Instruction = Instruction;
  }
}

export function createAllSkill(index: number): Skill {
  return new Skill(allSKillList[index]);
}

export function createBaseSkill(index: number): Skill {
  return new Skill(baseSkillList[index]);
}

export function createSynthesisSkill(index: number): Skill {
  return new Skill(synthesisSkillList[index]);
}

export function activateSkill(skillIndex: number, _user: Character, _target: Character): void {
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

  user.mp -= skill.mpCost;
  const damage = skill.power(user);

  if (skill.type === "heal") {
    skill.log(skill.name, user, target ||null, skill.power(user));
  } else {
    target.hp -= damage;
    skill.log(skill.name, user, target, skill.power(user));
    proceedTurn();
  }

  if (target.hp > 0 && user === player) {
    markPlayerTurnDone();
    delayedEnemyAction(1000);
  } else if (target.hp > 0) {
    markEnemyTurnDone();
    proceedTurn();
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
    return;
  }
  proceedTurn();
  updateStatus(uiElements);
}

const instructionBorder = document.getElementById("instruction-border") as HTMLElement;
const instructionParagraph = document.getElementById("instruction") as HTMLElement;

export function updateBaseSkillArea(skillDiv: HTMLElement, baseSkillList: SkillData[]): void {
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
      markSkillUsed();
      activateSkill(index, user, target);
    });

    skillDiv.appendChild(skillBtn);
  });
  updateStatus(uiElements);
}

export function updateSynthesisSkillArea(skillDiv: HTMLElement, synthesisSkillList: SkillData[]): void {
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
      markSkillUsed();
      activateSkill(index, user, target);
    });

    skillDiv.appendChild(skillBtn);
  });
  updateStatus(uiElements);
}
