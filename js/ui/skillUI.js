import { activateSkill } from "../battle/skill.js";
// === スキルボタンを生成して並べる ===

export function updateSkillArea(skillDiv, skillList) {


    skillList.forEach((skill, index) => {
        const skillBtn = document.createElement("button");
        skillBtn.textContent = `${skill.name}（消費MP:${skill.mpCost}）`;
        
        skillBtn.addEventListener("click", () => {
            activateSkill(index); // スキル発動！
        });
        skillDiv.appendChild(skillBtn);
    });
    
}
