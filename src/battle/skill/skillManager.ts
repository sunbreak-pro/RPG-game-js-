// manage/skill.ts - TypeScript対応

import { getCurrentPlayer, getCurrentEnemy } from "@/controller/battleStateController";
import { delayedEnemyAction } from "../attackManager";
import { logMessage, turnLog } from "@/ui/logMessage";
import { handleCharacterDefeat } from "@/manage/characterManage/characterDefeat";
import { updateStatus } from "@/manage/itemManage/itemStatusUpdater";
import { uiElements } from "@/main";
import { allSKillList, baseSkillList, synthesisSkillList } from "./skillTemplates";
import { startTurn, markPlayerTurnDone, markEnemyTurnDone, proceedTurn } from "@/controller/turnController";
import type { Character } from "@/types/characterTypes";

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
  let skillPlay = true;

  if (user.mp < skill.mpCost) {
    if (user.mp <= 0) user.mp = 0;
    turnLog(`${user.name}はスキルを発動！`, `しかし、${user.name} はMPが足りない！`);
    if (user.isPlayer) {
      skillPlay = false;
      delayedEnemyAction();
    } else {
      skillPlay = false;
      return;
    }
  } else {
    startTurn();
    user.mp -= skill.mpCost;
  }
  if (skillPlay) {
    let damage: number = skill.power(user);
    if (target.hp <= damage) {
      damage = target.hp;
    }
    target.hp -= damage;
    if (skill.type === "heal") {
      skill.log(skill.name, user, target || null, skill.power(user));
    } else {
      skill.log(skill.name, user, target, damage);
    }

    if (target.hp > 0 && user === player) {
      markPlayerTurnDone();
      delayedEnemyAction(900);
    } else if (target.hp > 0) {
      markEnemyTurnDone();
    }

    if (target.hp <= 0 && skill.type !== "heal") {
      target.hp = 0;
      setTimeout(() => {
        const afterLog = typeof skill.log === "function"
          ? () => skill.log(skill.name, user, target, damage)
          : null;
        setTimeout(() => {
          handleCharacterDefeat(target, afterLog, true);
        }, 1000);
      }, 800);
    }

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
      const user = getCurrentPlayer();
      const target = getCurrentEnemy();
      startTurn();
      markPlayerTurnDone();
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
      startTurn();
      markPlayerTurnDone();
      activateSkill(index, user, target);
    });

    skillDiv.appendChild(skillBtn);
  });
  updateStatus(uiElements);
}
