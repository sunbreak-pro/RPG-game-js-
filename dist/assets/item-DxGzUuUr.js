var Mc=Object.defineProperty;var Lc=(n,t,e)=>t in n?Mc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var $=(n,t,e)=>Lc(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();let me=null,pe=null;const sl=document.getElementById("tittle-log"),il=document.getElementById("next-stage"),dn=document.getElementById("background-log-area");function ol(n){sl.innerHTML+=`<h3>
 ${n}</h3>`}function $t(n="",t=""){const r=il.style.display!=="none"?pe:me;r&&(n&&(r.innerHTML+=`<p>
<strong>${n}</strong></p>`),t&&setTimeout(()=>{r.innerHTML+=`<p>
<strong>${t}</strong></p>`},500),r.scrollTo({top:r.scrollHeight,behavior:"smooth"}),console.log(r))}function K(n,t=""){const r=il.style.display!=="none"?pe:me;r&&(n&&(r.innerHTML+=`<p>
<strong>${n}</strong></p>`,dn.innerHTML+=`<p>
${n}</p>`),t&&setTimeout(()=>{r.innerHTML+=`<p>
<strong>${t}</strong></p>`,dn.innerHTML+=`<p>
${t}</p>`},500),dn.scrollTo({top:dn.scrollHeight,behavior:"smooth"}))}function al(){me&&(me.innerHTML=""),pe&&(pe.innerHTML="")}function ei(){me&&(me.innerHTML=""),pe&&(pe.innerHTML=""),dn.innerHTML="",sl.innerHTML=""}function Oc({battleLog:n,afterBattleLog:t}){me=n,pe=t}const Dr=[{name:"スライム",characterType:"monster",hp:30,mp:0,physicalStrength:5,magicalStrength:0,defense:10,speed:3},{name:"ゴブリン",characterType:"monster",hp:120,mp:30,physicalStrength:50,magicalStrength:10,defense:20,speed:20},{name:"オーク",characterType:"monster",hp:150,mp:35,physicalStrength:60,magicalStrength:15,defense:30,speed:20},{name:"リッチ",characterType:"monster",hp:300,mp:200,physicalStrength:70,magicalStrength:100,defense:18,speed:50},{name:"ドラゴン",characterType:"monster",hp:500,mp:200,physicalStrength:80,magicalStrength:70,defense:80,speed:50},{name:"ダンジョンボス",characterType:"monster",hp:1e3,mp:500,physicalStrength:100,magicalStrength:100,defense:100,speed:20}],gs=document.getElementById("instruction-item-border"),Fc=document.getElementById("item-instruction");function bt({playerStatus:n,enemyStatus:t,healItemsDiv:e,equipItemsDiv:r,equippedDiv:s}=St){const o=jt();if(!(o instanceof zr)){console.warn("現在のプレイヤーが Player クラスのインスタンスではありません。");return}const a=o,c=kr();n.textContent=a.getPlayerStatus(),t.textContent=c.getEnemyStatus(),e.innerHTML="",r.innerHTML="";let h=!1,f=!1;a.inventory.forEach(m=>{if(m.amount<=0)return;const E=document.createElement("button");E.textContent=`${m.showAmount()}`,E.addEventListener("mouseenter",()=>{gs.style.display="block",Fc.innerText=m.instructionText}),E.addEventListener("mouseleave",()=>{gs.style.display="none"}),E.addEventListener("click",()=>{if(gs.style.display="none",["hpHeal","mpHeal","bothHeal"].includes(m.itemType)){if(m.itemType==="hpHeal"&&a.hp===a.maxHp)return $t("HPがMAXなため、薬は使用不可");if(m.itemType==="mpHeal"&&a.mp===a.maxMp)return $t("MPがMAXなため、薬は使用不可");a.healItem(m)}else m.itemType==="equipment"&&(a.equipItem(m),m.isEquipped=!0);if(m.amount--,m.amount<=0){const A=a.inventory.indexOf(m);a.inventory.splice(A,1)}bt(St)}),["hpHeal","mpHeal","bothHeal"].includes(m.itemType)?(e.appendChild(E),h=!0,e.style.color="black"):m.itemType==="equipment"&&(r.appendChild(E),f=!0,r.style.color="black")}),h||(e.innerText="何も持っていない",e.style.color="gray",e.style.textAlign="center"),f||(r.innerText="何も持っていない",r.style.color="gray",r.style.textAlign="center"),s.innerHTML=`<h3>装備中アイテム</h3>
`,a.equipment.length>0?a.equipment.forEach(m=>{const E=document.createElement("button");let A="";m.effect.physicalStrength&&(A+=` 攻撃+${m.effect.physicalStrength}`),m.effect.defense&&(A+=` 防御+${m.effect.defense}`),E.innerHTML=`<p>${m.itemName}${A}<br>（クリックで外す）</p>`,E.style.cursor="pointer",E.addEventListener("click",()=>{a.unequipItem(m),bt(St)}),s.appendChild(E)}):s.innerHTML+="<p>未装備</p>"}const ni=[{name:"スラッシュ",mpCost:5,skillType:"attack",skillRarity:"common",power:n=>Math.floor(n.physicalStrength*1.3),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,` ${e.name} は細切れにされた`)):K(`${t.name} は【${n}】で攻撃！ ${e.name} に ${r} ダメージ！ <br>(${e.name}のHP：${e.hp})`)},Instruction:`名称：スラッシュ
 少しのオーラを纏った斬撃を放つ。ダメージはキャラクターの物理攻撃に依存する`,skillId:""},{name:"ファイアボール",mpCost:10,skillType:"attack",skillRarity:"common",power:n=>Math.floor(n.magicalStrength*1.3),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${e.name}は、炭火焼きにされた`)):K(`${t.name} は 【${n}】で攻撃！ ${e.name} に ${r} ダメージ！<br>(${e.name}のHP：${e.hp})`)},Instruction:`名称：ファイヤーボール
 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する`,skillId:""},{name:"アイスランス",mpCost:12,skillType:"attack",skillRarity:"common",skillId:"",Instruction:`名称：アイスランス
 氷の槍を繰り出す。ダメージはキャラクターの 精神力×1.5 に依存する`,power:n=>Math.floor(n.magicalStrength*1.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${e.name}は、氷の槍で串刺にされた`)):K(`${t.name} は【${n}】で攻撃！ ${e.name} に ${r} ダメージ！<br>(${e.name}のHP：${e.hp})`)}},{name:"自己再生",mpCost:8,skillType:"heal",skillRarity:"common",skillId:"",element:"heal",power:()=>0,log:(n,t)=>{if(t.hp!==t.maxHp){const e=Math.floor(t.magicalStrength*1.5);t.hp=Math.min(t.maxHp,t.hp+e),K(`${t.name} は ${n} でHPを${e}回復！<br>(${t.name}のHP：${t.hp})`)}else K(`${t.name} のHPは既に MAX です！`)},Instruction:`名称：自己再生
 自らの力で体力を回復するスキル。精神力依存`}],Bc=[{name:"ファイアブラスト",mpCost:18,skillType:"attack",skillRarity:"common",skillId:"",element:"fire",power:n=>Math.floor(n.magicalStrength*1.8),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${t.name} は 【${n}】で爆散した`)):K(`${t.name} の【ファイアブラスト】が炸裂！${e.name} に ${r} ダメージ！<br>(現在のHP：${e.hp})`)},Instruction:`名称：ファイヤブラスト
 ダメージは精神力に依存する強力魔法`}],$c=[{name:"次元斬",mpCost:35,skillType:"attack",skillRarity:"common",skillId:"",element:"sword",power:n=>Math.floor(n.physicalStrength*2),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${e.name}は、次元の狭間に葬り去られた`)):K(`${t.name} は【${n}】で切り刻まれる！ ${e.name} に ${r} ダメージ！<br> (${e.name}のHP：${e.hp})`)},Instruction:`名称：次元斬
 高威力の物理攻撃。物理ステ依存`},{name:"インフェルノ",mpCost:50,skillType:"attack",skillRarity:"common",skillId:"",element:"fire",power:n=>Math.floor(n.magicalStrength*2.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${e.name}は、地獄の業火に焼き尽くされた`)):K(`${t.name} の【${n}】が大地を焼き尽くす ${e.name} に ${r} ダメージ！ <br>(現在のHP：${e.hp})`)},Instruction:`名称：インフェルノ
 fire elementの最終進化系。精神力依存`},{name:"コキュートス",mpCost:50,skillType:"attack",skillRarity:"common",skillId:"",element:"ice",power:n=>Math.floor(n.magicalStrength*2.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,K(`${t.name} は 【${n}】で攻撃！ ${e.name}に${r}ダメージ！<br>(${e.name}のHP：${e.hp})`,`${e.name} は、氷漬けにされ息絶えた`)):K(`${t.name} の【${n}】が銀世界を創り出す${e.name} に ${r} ダメージ！<br>(${e.name}のHP：${e.hp})`)},Instruction:`名称：アイステンペスト
 氷属性の最終進化スキル。精神力依存`}],ll=[...ni,...Bc,...$c];let Ss=null,Ps=null;function ul(n,t,e){Ss=n,Ps=t,console.log(n),console.log(t)}function jt(){if(!Ss)throw new Error("プレイヤーが設定されていません");return Ss}function kr(){if(!Ps)throw new Error("敵が設定されていません");return Ps}let Wt;function Uc(n){Wt=n}function ae(){return Wt}let Cs=1;function Hc(){const{skillDiv:n,skillArea:t}=ae();t.style.opacity="1",n.style.opacity="1";const e=Dr[Cs],r=Ui(e);ul(jt(),r),ei(),Ju(Wt.skillDiv,ni),bt(St),Wt.defaultAttackBtn.style.opacity="1",Wt.defaultAttackBtn.ariaDisabled="false",Wt.nextStageBtn.style.display="none",Wt.battleLogArea.style.display="",Wt.afterBattleLogArea.style.display="none",Cs++,cl(r)}function cl(n){ol(`第 ${Cs} 階層`),$t(`${n.name}が現れた！`,"どうする？")}let dr=1,ri=!1,si=!1,bs=!1,Vs=!1,Ds=!0;function Ve(){ri=!0,He()}function hl(){si=!0,He()}function qo(){Vs||(Vs=!0,He())}function De(){if(!Ds)return;const{defaultAttackBtn:n,skillArea:t,nextStageBtn:e}=ae();e.style.display!==""&&(al(),t.style.opacity="0",Dn.style.opacity="0",n.style.opacity="0",ri=!1,si=!1,Vs=!1,bs=!1,Ds=!1,K(`--- ${dr}ターン目 ---`))}function He(){if(ri&&si&&!bs){const{defaultAttackBtn:n,skillArea:t}=ae();Ds=!0,bs=!0,dr++,setTimeout(()=>{t.style.opacity="1",t.style.marginInline="auto",Dn.style.opacity="1",Dn.style.marginInline="auto",n.style.opacity="1",n.style.marginInline="auto",$t(`${dr-1}ターン目が終了…`,"次の行動を選べ")},1800)}}function qc(){dr=1}const jc=()=>{};var jo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},zc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],c=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},fl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,E=(o&3)<<4|c>>4;let A=(c&15)<<2|f>>6,P=f&63;h||(P=64,a||(A=64)),r.push(e[m],e[E],e[A],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(dl(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):zc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const E=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||f==null||E==null)throw new Gc;const A=o<<2|c>>4;if(r.push(A),f!==64){const P=c<<4&240|f>>2;if(r.push(P),E!==64){const V=f<<6&192|E;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Gc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kc=function(n){const t=dl(n);return fl.encodeByteArray(t,!0)},fr=function(n){return Kc(n).replace(/\./g,"")},Qc=function(n){try{return fl.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=()=>Wc().__FIREBASE_DEFAULTS__,Yc=()=>{if(typeof process>"u"||typeof jo>"u")return;const n=jo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Jc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Qc(n[1]);return t&&JSON.parse(t)},ii=()=>{try{return jc()||Xc()||Yc()||Jc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Zc=n=>{var t,e;return(e=(t=ii())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},th=n=>{const t=Zc(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},ml=()=>{var n;return(n=ii())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(n){return n.endsWith(".cloudworkstations.dev")}async function nh(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[fr(JSON.stringify(e)),fr(JSON.stringify(a)),""].join(".")}const gn={};function sh(){const n={prod:[],emulator:[]};for(const t of Object.keys(gn))gn[t]?n.emulator.push(t):n.prod.push(t);return n}function ih(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let zo=!1;function oh(n,t){if(typeof window>"u"||typeof document>"u"||!oi(window.location.host)||gn[n]===t||gn[n]||zo)return;gn[n]=t;function e(A){return`__firebase__banner__${A}`}const r="__firebase__banner",o=sh().prod.length>0;function a(){const A=document.getElementById(r);A&&A.remove()}function c(A){A.style.display="flex",A.style.background="#7faaf0",A.style.position="fixed",A.style.bottom="5px",A.style.left="5px",A.style.padding=".5em",A.style.borderRadius="5px",A.style.alignItems="center"}function h(A,P){A.setAttribute("width","24"),A.setAttribute("id",P),A.setAttribute("height","24"),A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.style.marginLeft="-6px"}function f(){const A=document.createElement("span");return A.style.cursor="pointer",A.style.marginLeft="16px",A.style.fontSize="24px",A.innerHTML=" &times;",A.onclick=()=>{zo=!0,a()},A}function m(A,P){A.setAttribute("id",P),A.innerText="Learn more",A.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",A.setAttribute("target","__blank"),A.style.paddingLeft="5px",A.style.textDecoration="underline"}function E(){const A=ih(r),P=e("text"),V=document.getElementById(P)||document.createElement("span"),x=e("learnmore"),D=document.getElementById(x)||document.createElement("a"),Q=e("preprendIcon"),U=document.getElementById(Q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(A.created){const z=A.element;c(z),m(D,x);const nt=f();h(U,Q),z.append(U,V,D,nt),document.body.appendChild(z)}o?(V.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,V.innerText="Preview backend running in this workspace."),V.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",E):E()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lh(){var n;const t=(n=ii())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function uh(){return!lh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ch(){try{return typeof indexedDB=="object"}catch{return!1}}function hh(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="FirebaseError";class qe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=dh,Object.setPrototypeOf(this,qe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pl.prototype.create)}}class pl{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?fh(o,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new qe(s,c,r)}}function fh(n,t){return n.replace(mh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const mh=/\{\$([^}]+)}/g;function mr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Go(o)&&Go(a)){if(!mr(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Go(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n){return n&&n._delegate?n._delegate:n}class vn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new eh;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(yh(t))try{this.getOrInitializeService({instanceIdentifier:de})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=de){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=de){return this.instances.has(t)}getOptions(t=de){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=de){return this.component?this.component.multipleInstances?t:de:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gh(n){return n===de?void 0:n}function yh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ph(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const Eh={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},Th=j.INFO,vh={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Ih=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=vh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class gl{constructor(t){this.name=t,this._logLevel=Th,this._logHandler=Ih,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Eh[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}}const Ah=(n,t)=>t.some(e=>n instanceof e);let Ko,Qo;function wh(){return Ko||(Ko=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rh(){return Qo||(Qo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yl=new WeakMap,ks=new WeakMap,_l=new WeakMap,ys=new WeakMap,ai=new WeakMap;function Sh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Yt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&yl.set(e,n)}).catch(()=>{}),ai.set(t,n),t}function Ph(n){if(ks.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ks.set(n,t)}let xs={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return ks.get(n);if(t==="objectStoreNames")return n.objectStoreNames||_l.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Yt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Ch(n){xs=n(xs)}function bh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(_s(this),t,...e);return _l.set(r,t.sort?t.sort():[t]),Yt(r)}:Rh().includes(n)?function(...t){return n.apply(_s(this),t),Yt(yl.get(this))}:function(...t){return Yt(n.apply(_s(this),t))}}function Vh(n){return typeof n=="function"?bh(n):(n instanceof IDBTransaction&&Ph(n),Ah(n,wh())?new Proxy(n,xs):n)}function Yt(n){if(n instanceof IDBRequest)return Sh(n);if(ys.has(n))return ys.get(n);const t=Vh(n);return t!==n&&(ys.set(n,t),ai.set(t,n)),t}const _s=n=>ai.get(n);function Dh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),c=Yt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Yt(a.result),h.oldVersion,h.newVersion,Yt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const kh=["get","getKey","getAll","getAllKeys","count"],xh=["put","add","delete","clear"],Es=new Map;function Wo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Es.get(t))return Es.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=xh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||kh.includes(e)))return;const o=async function(a,...c){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[e](...c),s&&h.done]))[0]};return Es.set(t,o),o}Ch(n=>({...n,get:(t,e,r)=>Wo(t,e)||n.get(t,e,r),has:(t,e)=>!!Wo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Mh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Mh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ns="@firebase/app",Xo="0.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new gl("@firebase/app"),Lh="@firebase/app-compat",Oh="@firebase/analytics-compat",Fh="@firebase/analytics",Bh="@firebase/app-check-compat",$h="@firebase/app-check",Uh="@firebase/auth",Hh="@firebase/auth-compat",qh="@firebase/database",jh="@firebase/data-connect",zh="@firebase/database-compat",Gh="@firebase/functions",Kh="@firebase/functions-compat",Qh="@firebase/installations",Wh="@firebase/installations-compat",Xh="@firebase/messaging",Yh="@firebase/messaging-compat",Jh="@firebase/performance",Zh="@firebase/performance-compat",td="@firebase/remote-config",ed="@firebase/remote-config-compat",nd="@firebase/storage",rd="@firebase/storage-compat",sd="@firebase/firestore",id="@firebase/ai",od="@firebase/firestore-compat",ad="firebase",ld="11.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms="[DEFAULT]",ud={[Ns]:"fire-core",[Lh]:"fire-core-compat",[Fh]:"fire-analytics",[Oh]:"fire-analytics-compat",[$h]:"fire-app-check",[Bh]:"fire-app-check-compat",[Uh]:"fire-auth",[Hh]:"fire-auth-compat",[qh]:"fire-rtdb",[jh]:"fire-data-connect",[zh]:"fire-rtdb-compat",[Gh]:"fire-fn",[Kh]:"fire-fn-compat",[Qh]:"fire-iid",[Wh]:"fire-iid-compat",[Xh]:"fire-fcm",[Yh]:"fire-fcm-compat",[Jh]:"fire-perf",[Zh]:"fire-perf-compat",[td]:"fire-rc",[ed]:"fire-rc-compat",[nd]:"fire-gcs",[rd]:"fire-gcs-compat",[sd]:"fire-fst",[od]:"fire-fst-compat",[id]:"fire-vertex","fire-js":"fire-js",[ad]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=new Map,cd=new Map,Ls=new Map;function Yo(n,t){try{n.container.addComponent(t)}catch(e){Ut.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function yr(n){const t=n.name;if(Ls.has(t))return Ut.debug(`There were multiple attempts to register component ${t}.`),!1;Ls.set(t,n);for(const e of gr.values())Yo(e,n);for(const e of cd.values())Yo(e,n);return!0}function hd(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function dd(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new pl("app","Firebase",fd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=ld;function El(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Ms,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(e||(e=ml()),!e)throw Jt.create("no-options");const o=gr.get(s);if(o){if(mr(e,o.options)&&mr(r,o.config))return o;throw Jt.create("duplicate-app",{appName:s})}const a=new _h(s);for(const h of Ls.values())a.addComponent(h);const c=new md(e,r,a);return gr.set(s,c),c}function gd(n=Ms){const t=gr.get(n);if(!t&&n===Ms&&ml())return El();if(!t)throw Jt.create("no-app",{appName:n});return t}function ke(n,t,e){var r;let s=(r=ud[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ut.warn(c.join(" "));return}yr(new vn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="firebase-heartbeat-database",_d=1,In="firebase-heartbeat-store";let Ts=null;function Tl(){return Ts||(Ts=Dh(yd,_d,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(In)}catch(e){console.warn(e)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),Ts}async function Ed(n){try{const e=(await Tl()).transaction(In),r=await e.objectStore(In).get(vl(n));return await e.done,r}catch(t){if(t instanceof qe)Ut.warn(t.message);else{const e=Jt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ut.warn(e.message)}}}async function Jo(n,t){try{const r=(await Tl()).transaction(In,"readwrite");await r.objectStore(In).put(t,vl(n)),await r.done}catch(e){if(e instanceof qe)Ut.warn(e.message);else{const r=Jt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ut.warn(r.message)}}}function vl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=1024,vd=30;class Id{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new wd(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Zo();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>vd){const a=Rd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ut.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zo(),{heartbeatsToSend:r,unsentEntries:s}=Ad(this._heartbeatsCache.heartbeats),o=fr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ut.warn(e),""}}}function Zo(){return new Date().toISOString().substring(0,10)}function Ad(n,t=Td){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ta(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),ta(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class wd{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ch()?hh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Ed(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Jo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Jo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function ta(n){return fr(JSON.stringify({version:2,heartbeats:n})).length}function Rd(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(n){yr(new vn("platform-logger",t=>new Nh(t),"PRIVATE")),yr(new vn("heartbeat",t=>new Id(t),"PRIVATE")),ke(Ns,Xo,n),ke(Ns,Xo,"esm2017"),ke("fire-js","")}Sd("");var Pd="firebase",Cd="11.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(Pd,Cd,"app");var ea=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zt,Il;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,p){function y(){}y.prototype=p.prototype,v.D=p.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(_,T,w){for(var g=Array(arguments.length-2),Lt=2;Lt<arguments.length;Lt++)g[Lt-2]=arguments[Lt];return p.prototype[T].apply(_,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,p,y){y||(y=0);var _=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)_[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;16>T;++T)_[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=v.g[0],y=v.g[1],T=v.g[2];var w=v.g[3],g=p+(w^y&(T^w))+_[0]+3614090360&4294967295;p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+_[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+_[2]+606105819&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+_[3]+3250441966&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+_[4]+4118548399&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+_[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+_[6]+2821735955&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+_[7]+4249261313&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+_[8]+1770035416&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+_[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+_[10]+4294925233&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+_[11]+2304563134&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+_[12]+1804603682&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+_[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+_[14]+2792965006&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+_[15]+1236535329&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(T^w&(y^T))+_[1]+4129170786&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+_[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+_[11]+643717713&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+_[0]+3921069994&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+_[5]+3593408605&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+_[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+_[15]+3634488961&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+_[4]+3889429448&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+_[9]+568446438&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+_[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+_[3]+4107603335&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+_[8]+1163531501&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+_[13]+2850285829&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+_[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+_[7]+1735328473&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+_[12]+2368359562&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(y^T^w)+_[5]+4294588738&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+_[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+_[11]+1839030562&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+_[14]+4259657740&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+_[1]+2763975236&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+_[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+_[7]+4139469664&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+_[10]+3200236656&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+_[13]+681279174&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+_[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+_[3]+3572445317&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+_[6]+76029189&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+_[9]+3654602809&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+_[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+_[15]+530742520&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+_[2]+3299628645&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(T^(y|~w))+_[0]+4096336452&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+_[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+_[14]+2878612391&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+_[5]+4237533241&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+_[12]+1700485571&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+_[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+_[10]+4293915773&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+_[1]+2240044497&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+_[8]+1873313359&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+_[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+_[6]+2734768916&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+_[13]+1309151649&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+_[4]+4149444226&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+_[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+_[2]+718787259&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+_[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+T&4294967295,v.g[3]=v.g[3]+w&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var y=p-this.blockSize,_=this.B,T=this.h,w=0;w<p;){if(T==0)for(;w<=y;)s(this,v,w),w+=this.blockSize;if(typeof v=="string"){for(;w<p;)if(_[T++]=v.charCodeAt(w++),T==this.blockSize){s(this,_),T=0;break}}else for(;w<p;)if(_[T++]=v[w++],T==this.blockSize){s(this,_),T=0;break}}this.h=T,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var y=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=y&255,y/=256;for(this.u(v),v=Array(16),p=y=0;4>p;++p)for(var _=0;32>_;_+=8)v[y++]=this.g[p]>>>_&255;return v};function o(v,p){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=p(v)}function a(v,p){this.h=p;for(var y=[],_=!0,T=v.length-1;0<=T;T--){var w=v[T]|0;_&&w==p||(y[T]=w,_=!1)}this.g=y}var c={};function h(v){return-128<=v&&128>v?o(v,function(p){return new a([p|0],0>p?-1:0)}):new a([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return E;if(0>v)return D(f(-v));for(var p=[],y=1,_=0;v>=y;_++)p[_]=v/y|0,y*=4294967296;return new a(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return D(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(p,8)),_=E,T=0;T<v.length;T+=8){var w=Math.min(8,v.length-T),g=parseInt(v.substring(T,T+w),p);8>w?(w=f(Math.pow(p,w)),_=_.j(w).add(f(g))):(_=_.j(y),_=_.add(f(g)))}return _}var E=h(0),A=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(x(this))return-D(this).m();for(var v=0,p=1,y=0;y<this.g.length;y++){var _=this.i(y);v+=(0<=_?_:4294967296+_)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(V(this))return"0";if(x(this))return"-"+D(this).toString(v);for(var p=f(Math.pow(v,6)),y=this,_="";;){var T=nt(y,p).g;y=Q(y,T.j(p));var w=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=T,V(y))return w+_;for(;6>w.length;)w="0"+w;_=w+_}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function V(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function x(v){return v.h==-1}n.l=function(v){return v=Q(this,v),x(v)?-1:V(v)?0:1};function D(v){for(var p=v.g.length,y=[],_=0;_<p;_++)y[_]=~v.g[_];return new a(y,~v.h).add(A)}n.abs=function(){return x(this)?D(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0,T=0;T<=p;T++){var w=_+(this.i(T)&65535)+(v.i(T)&65535),g=(w>>>16)+(this.i(T)>>>16)+(v.i(T)>>>16);_=g>>>16,w&=65535,g&=65535,y[T]=g<<16|w}return new a(y,y[y.length-1]&-2147483648?-1:0)};function Q(v,p){return v.add(D(p))}n.j=function(v){if(V(this)||V(v))return E;if(x(this))return x(v)?D(this).j(D(v)):D(D(this).j(v));if(x(v))return D(this.j(D(v)));if(0>this.l(P)&&0>v.l(P))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,y=[],_=0;_<2*p;_++)y[_]=0;for(_=0;_<this.g.length;_++)for(var T=0;T<v.g.length;T++){var w=this.i(_)>>>16,g=this.i(_)&65535,Lt=v.i(T)>>>16,Qe=v.i(T)&65535;y[2*_+2*T]+=g*Qe,U(y,2*_+2*T),y[2*_+2*T+1]+=w*Qe,U(y,2*_+2*T+1),y[2*_+2*T+1]+=g*Lt,U(y,2*_+2*T+1),y[2*_+2*T+2]+=w*Lt,U(y,2*_+2*T+2)}for(_=0;_<p;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=p;_<2*p;_++)y[_]=0;return new a(y,0)};function U(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function z(v,p){this.g=v,this.h=p}function nt(v,p){if(V(p))throw Error("division by zero");if(V(v))return new z(E,E);if(x(v))return p=nt(D(v),p),new z(D(p.g),D(p.h));if(x(p))return p=nt(v,D(p)),new z(D(p.g),p.h);if(30<v.g.length){if(x(v)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var y=A,_=p;0>=_.l(v);)y=Mt(y),_=Mt(_);var T=lt(y,1),w=lt(_,1);for(_=lt(_,2),y=lt(y,2);!V(_);){var g=w.add(_);0>=g.l(v)&&(T=T.add(y),w=g),_=lt(_,1),y=lt(y,1)}return p=Q(v,T.j(p)),new z(T,p)}for(T=E;0<=v.l(p);){for(y=Math.max(1,Math.floor(v.m()/p.m())),_=Math.ceil(Math.log(y)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),w=f(y),g=w.j(p);x(g)||0<g.l(v);)y-=_,w=f(y),g=w.j(p);V(w)&&(w=A),T=T.add(w),v=Q(v,g)}return new z(T,v)}n.A=function(v){return nt(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)&v.i(_);return new a(y,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)|v.i(_);return new a(y,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)^v.i(_);return new a(y,this.h^v.h)};function Mt(v){for(var p=v.g.length+1,y=[],_=0;_<p;_++)y[_]=v.i(_)<<1|v.i(_-1)>>>31;return new a(y,v.h)}function lt(v,p){var y=p>>5;p%=32;for(var _=v.g.length-y,T=[],w=0;w<_;w++)T[w]=0<p?v.i(w+y)>>>p|v.i(w+y+1)<<32-p:v.i(w+y);return new a(T,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Il=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,Zt=a}).apply(typeof ea<"u"?ea:typeof self<"u"?self:typeof window<"u"?window:{});var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Al,fn,wl,ar,Os,Rl,Sl,Pl;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,l,u){return i==Array.prototype||i==Object.prototype||(i[l]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var l=0;l<i.length;++l){var u=i[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,l){if(l)t:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var I=i[d];if(!(I in u))break t;u=u[I]}i=i[i.length-1],d=u[i],l=l(d),l!=d&&l!=null&&t(u,i,{configurable:!0,writable:!0,value:l})}}function o(i,l){i instanceof String&&(i+="");var u=0,d=!1,I={next:function(){if(!d&&u<i.length){var R=u++;return{value:l(R,i[R]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(i){return i||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(i){var l=typeof i;return l=l!="object"?l:i?Array.isArray(i)?"array":l:"null",l=="array"||l=="object"&&typeof i.length=="number"}function f(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function m(i,l,u){return i.call.apply(i.bind,arguments)}function E(i,l,u){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),i.apply(l,I)}}return function(){return i.apply(l,arguments)}}function A(i,l,u){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:E,A.apply(null,arguments)}function P(i,l){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function V(i,l){function u(){}u.prototype=l.prototype,i.aa=l.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(d,I,R){for(var b=Array(arguments.length-2),X=2;X<arguments.length;X++)b[X-2]=arguments[X];return l.prototype[I].apply(d,b)}}function x(i){const l=i.length;if(0<l){const u=Array(l);for(let d=0;d<l;d++)u[d]=i[d];return u}return[]}function D(i,l){for(let u=1;u<arguments.length;u++){const d=arguments[u];if(h(d)){const I=i.length||0,R=d.length||0;i.length=I+R;for(let b=0;b<R;b++)i[I+b]=d[b]}else i.push(d)}}class Q{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function U(i){return/^[\s\xa0]*$/.test(i)}function z(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function nt(i){return nt[" "](i),i}nt[" "]=function(){};var Mt=z().indexOf("Gecko")!=-1&&!(z().toLowerCase().indexOf("webkit")!=-1&&z().indexOf("Edge")==-1)&&!(z().indexOf("Trident")!=-1||z().indexOf("MSIE")!=-1)&&z().indexOf("Edge")==-1;function lt(i,l,u){for(const d in i)l.call(u,i[d],d,i)}function v(i,l){for(const u in i)l.call(void 0,i[u],u,i)}function p(i){const l={};for(const u in i)l[u]=i[u];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,l){let u,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(u in d)i[u]=d[u];for(let R=0;R<y.length;R++)u=y[R],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function T(i){var l=1;i=i.split(":");const u=[];for(;0<l&&i.length;)u.push(i.shift()),l--;return i.length&&u.push(i.join(":")),u}function w(i){c.setTimeout(()=>{throw i},0)}function g(){var i=Gr;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class Lt{constructor(){this.h=this.g=null}add(l,u){const d=Qe.get();d.set(l,u),this.h?this.h.next=d:this.g=d,this.h=d}}var Qe=new Q(()=>new tc,i=>i.reset());class tc{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let We,Xe=!1,Gr=new Lt,Hi=()=>{const i=c.Promise.resolve(void 0);We=()=>{i.then(ec)}};var ec=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(u){w(u)}var l=Qe;l.j(i),100>l.h&&(l.h++,i.next=l.g,l.g=i)}Xe=!1};function zt(){this.s=this.s,this.C=this.C}zt.prototype.s=!1,zt.prototype.ma=function(){this.s||(this.s=!0,this.N())},zt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ft(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}ft.prototype.h=function(){this.defaultPrevented=!0};var nc=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return i}();function Ye(i,l){if(ft.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget){if(Mt){t:{try{nt(l.nodeName);var I=!0;break t}catch{}I=!1}I||(l=null)}}else u=="mouseover"?l=i.fromElement:u=="mouseout"&&(l=i.toElement);this.relatedTarget=l,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:rc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Ye.aa.h.call(this)}}V(Ye,ft);var rc={2:"touch",3:"pen",4:"mouse"};Ye.prototype.h=function(){Ye.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var On="closure_listenable_"+(1e6*Math.random()|0),sc=0;function ic(i,l,u,d,I){this.listener=i,this.proxy=null,this.src=l,this.type=u,this.capture=!!d,this.ha=I,this.key=++sc,this.da=this.fa=!1}function Fn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Bn(i){this.src=i,this.g={},this.h=0}Bn.prototype.add=function(i,l,u,d,I){var R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);var b=Qr(i,l,d,I);return-1<b?(l=i[b],u||(l.fa=!1)):(l=new ic(l,this.src,R,!!d,I),l.fa=u,i.push(l)),l};function Kr(i,l){var u=l.type;if(u in i.g){var d=i.g[u],I=Array.prototype.indexOf.call(d,l,void 0),R;(R=0<=I)&&Array.prototype.splice.call(d,I,1),R&&(Fn(l),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Qr(i,l,u,d){for(var I=0;I<i.length;++I){var R=i[I];if(!R.da&&R.listener==l&&R.capture==!!u&&R.ha==d)return I}return-1}var Wr="closure_lm_"+(1e6*Math.random()|0),Xr={};function qi(i,l,u,d,I){if(Array.isArray(l)){for(var R=0;R<l.length;R++)qi(i,l[R],u,d,I);return null}return u=Gi(u),i&&i[On]?i.K(l,u,f(d)?!!d.capture:!1,I):oc(i,l,u,!1,d,I)}function oc(i,l,u,d,I,R){if(!l)throw Error("Invalid event type");var b=f(I)?!!I.capture:!!I,X=Jr(i);if(X||(i[Wr]=X=new Bn(i)),u=X.add(l,u,d,b,R),u.proxy)return u;if(d=ac(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)nc||(I=b),I===void 0&&(I=!1),i.addEventListener(l.toString(),d,I);else if(i.attachEvent)i.attachEvent(zi(l.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function ac(){function i(u){return l.call(i.src,i.listener,u)}const l=lc;return i}function ji(i,l,u,d,I){if(Array.isArray(l))for(var R=0;R<l.length;R++)ji(i,l[R],u,d,I);else d=f(d)?!!d.capture:!!d,u=Gi(u),i&&i[On]?(i=i.i,l=String(l).toString(),l in i.g&&(R=i.g[l],u=Qr(R,u,d,I),-1<u&&(Fn(R[u]),Array.prototype.splice.call(R,u,1),R.length==0&&(delete i.g[l],i.h--)))):i&&(i=Jr(i))&&(l=i.g[l.toString()],i=-1,l&&(i=Qr(l,u,d,I)),(u=-1<i?l[i]:null)&&Yr(u))}function Yr(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[On])Kr(l.i,i);else{var u=i.type,d=i.proxy;l.removeEventListener?l.removeEventListener(u,d,i.capture):l.detachEvent?l.detachEvent(zi(u),d):l.addListener&&l.removeListener&&l.removeListener(d),(u=Jr(l))?(Kr(u,i),u.h==0&&(u.src=null,l[Wr]=null)):Fn(i)}}}function zi(i){return i in Xr?Xr[i]:Xr[i]="on"+i}function lc(i,l){if(i.da)i=!0;else{l=new Ye(l,this);var u=i.listener,d=i.ha||i.src;i.fa&&Yr(i),i=u.call(d,l)}return i}function Jr(i){return i=i[Wr],i instanceof Bn?i:null}var Zr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gi(i){return typeof i=="function"?i:(i[Zr]||(i[Zr]=function(l){return i.handleEvent(l)}),i[Zr])}function mt(){zt.call(this),this.i=new Bn(this),this.M=this,this.F=null}V(mt,zt),mt.prototype[On]=!0,mt.prototype.removeEventListener=function(i,l,u,d){ji(this,i,l,u,d)};function Tt(i,l){var u,d=i.F;if(d)for(u=[];d;d=d.F)u.push(d);if(i=i.M,d=l.type||l,typeof l=="string")l=new ft(l,i);else if(l instanceof ft)l.target=l.target||i;else{var I=l;l=new ft(d,i),_(l,I)}if(I=!0,u)for(var R=u.length-1;0<=R;R--){var b=l.g=u[R];I=$n(b,d,!0,l)&&I}if(b=l.g=i,I=$n(b,d,!0,l)&&I,I=$n(b,d,!1,l)&&I,u)for(R=0;R<u.length;R++)b=l.g=u[R],I=$n(b,d,!1,l)&&I}mt.prototype.N=function(){if(mt.aa.N.call(this),this.i){var i=this.i,l;for(l in i.g){for(var u=i.g[l],d=0;d<u.length;d++)Fn(u[d]);delete i.g[l],i.h--}}this.F=null},mt.prototype.K=function(i,l,u,d){return this.i.add(String(i),l,!1,u,d)},mt.prototype.L=function(i,l,u,d){return this.i.add(String(i),l,!0,u,d)};function $n(i,l,u,d){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();for(var I=!0,R=0;R<l.length;++R){var b=l[R];if(b&&!b.da&&b.capture==u){var X=b.listener,ut=b.ha||b.src;b.fa&&Kr(i.i,b),I=X.call(ut,d)!==!1&&I}}return I&&!d.defaultPrevented}function Ki(i,l,u){if(typeof i=="function")u&&(i=A(i,u));else if(i&&typeof i.handleEvent=="function")i=A(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(i,l||0)}function Qi(i){i.g=Ki(()=>{i.g=null,i.i&&(i.i=!1,Qi(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class uc extends zt{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Qi(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Je(i){zt.call(this),this.h=i,this.g={}}V(Je,zt);var Wi=[];function Xi(i){lt(i.g,function(l,u){this.g.hasOwnProperty(u)&&Yr(l)},i),i.g={}}Je.prototype.N=function(){Je.aa.N.call(this),Xi(this)},Je.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ts=c.JSON.stringify,cc=c.JSON.parse,hc=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function es(){}es.prototype.h=null;function Yi(i){return i.h||(i.h=i.i())}function Ji(){}var Ze={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ns(){ft.call(this,"d")}V(ns,ft);function rs(){ft.call(this,"c")}V(rs,ft);var le={},Zi=null;function Un(){return Zi=Zi||new mt}le.La="serverreachability";function to(i){ft.call(this,le.La,i)}V(to,ft);function tn(i){const l=Un();Tt(l,new to(l))}le.STAT_EVENT="statevent";function eo(i,l){ft.call(this,le.STAT_EVENT,i),this.stat=l}V(eo,ft);function vt(i){const l=Un();Tt(l,new eo(l,i))}le.Ma="timingevent";function no(i,l){ft.call(this,le.Ma,i),this.size=l}V(no,ft);function en(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},l)}function nn(){this.g=!0}nn.prototype.xa=function(){this.g=!1};function dc(i,l,u,d,I,R){i.info(function(){if(i.g)if(R)for(var b="",X=R.split("&"),ut=0;ut<X.length;ut++){var G=X[ut].split("=");if(1<G.length){var pt=G[0];G=G[1];var gt=pt.split("_");b=2<=gt.length&&gt[1]=="type"?b+(pt+"="+G+"&"):b+(pt+"=redacted&")}}else b=null;else b=R;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+l+`
`+u+`
`+b})}function fc(i,l,u,d,I,R,b){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+l+`
`+u+`
`+R+" "+b})}function Ie(i,l,u,d){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+pc(i,u)+(d?" "+d:"")})}function mc(i,l){i.info(function(){return"TIMEOUT: "+l})}nn.prototype.info=function(){};function pc(i,l){if(!i.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var d=u[i];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var b=1;b<I.length;b++)I[b]=""}}}}return ts(u)}catch{return l}}var Hn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ro={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ss;function qn(){}V(qn,es),qn.prototype.g=function(){return new XMLHttpRequest},qn.prototype.i=function(){return{}},ss=new qn;function Gt(i,l,u,d){this.j=i,this.i=l,this.l=u,this.R=d||1,this.U=new Je(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new so}function so(){this.i=null,this.g="",this.h=!1}var io={},is={};function os(i,l,u){i.L=1,i.v=Kn(Ot(l)),i.m=u,i.P=!0,oo(i,null)}function oo(i,l){i.F=Date.now(),jn(i),i.A=Ot(i.v);var u=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),vo(u.i,"t",d),i.C=0,u=i.j.J,i.h=new so,i.g=Bo(i.j,u?l:null,!i.m),0<i.O&&(i.M=new uc(A(i.Y,i,i.g),i.O)),l=i.U,u=i.g,d=i.ca;var I="readystatechange";Array.isArray(I)||(I&&(Wi[0]=I.toString()),I=Wi);for(var R=0;R<I.length;R++){var b=qi(u,I[R],d||l.handleEvent,!1,l.h||l);if(!b)break;l.g[b.key]=b}l=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,l)):(i.u="GET",i.g.ea(i.A,i.u,null,l)),tn(),dc(i.i,i.u,i.A,i.l,i.R,i.m)}Gt.prototype.ca=function(i){i=i.target;const l=this.M;l&&Ft(i)==3?l.j():this.Y(i)},Gt.prototype.Y=function(i){try{if(i==this.g)t:{const gt=Ft(this.g);var l=this.g.Ba();const Re=this.g.Z();if(!(3>gt)&&(gt!=3||this.g&&(this.h.h||this.g.oa()||Co(this.g)))){this.J||gt!=4||l==7||(l==8||0>=Re?tn(3):tn(2)),as(this);var u=this.g.Z();this.X=u;e:if(ao(this)){var d=Co(this.g);i="";var I=d.length,R=Ft(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ue(this),rn(this);var b="";break e}this.h.i=new c.TextDecoder}for(l=0;l<I;l++)this.h.h=!0,i+=this.h.i.decode(d[l],{stream:!(R&&l==I-1)});d.length=0,this.h.g+=i,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=u==200,fc(this.i,this.u,this.A,this.l,this.R,gt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var X,ut=this.g;if((X=ut.g?ut.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(X)){var G=X;break e}}G=null}if(u=G)Ie(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ls(this,u);else{this.o=!1,this.s=3,vt(12),ue(this),rn(this);break t}}if(this.P){u=!0;let Pt;for(;!this.J&&this.C<b.length;)if(Pt=gc(this,b),Pt==is){gt==4&&(this.s=4,vt(14),u=!1),Ie(this.i,this.l,null,"[Incomplete Response]");break}else if(Pt==io){this.s=4,vt(15),Ie(this.i,this.l,b,"[Invalid Chunk]"),u=!1;break}else Ie(this.i,this.l,Pt,null),ls(this,Pt);if(ao(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),gt!=4||b.length!=0||this.h.h||(this.s=1,vt(16),u=!1),this.o=this.o&&u,!u)Ie(this.i,this.l,b,"[Invalid Chunked Response]"),ue(this),rn(this);else if(0<b.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),ms(pt),pt.M=!0,vt(11))}}else Ie(this.i,this.l,b,null),ls(this,b);gt==4&&ue(this),this.o&&!this.J&&(gt==4?Mo(this.j,this):(this.o=!1,jn(this)))}else xc(this.g),u==400&&0<b.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),ue(this),rn(this)}}}catch{}finally{}};function ao(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function gc(i,l){var u=i.C,d=l.indexOf(`
`,u);return d==-1?is:(u=Number(l.substring(u,d)),isNaN(u)?io:(d+=1,d+u>l.length?is:(l=l.slice(d,d+u),i.C=d+u,l)))}Gt.prototype.cancel=function(){this.J=!0,ue(this)};function jn(i){i.S=Date.now()+i.I,lo(i,i.I)}function lo(i,l){if(i.B!=null)throw Error("WatchDog timer not null");i.B=en(A(i.ba,i),l)}function as(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Gt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(mc(this.i,this.A),this.L!=2&&(tn(),vt(17)),ue(this),this.s=2,rn(this)):lo(this,this.S-i)};function rn(i){i.j.G==0||i.J||Mo(i.j,i)}function ue(i){as(i);var l=i.M;l&&typeof l.ma=="function"&&l.ma(),i.M=null,Xi(i.U),i.g&&(l=i.g,i.g=null,l.abort(),l.ma())}function ls(i,l){try{var u=i.j;if(u.G!=0&&(u.g==i||us(u.h,i))){if(!i.K&&us(u.h,i)&&u.G==3){try{var d=u.Da.g.parse(l)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)Zn(u),Yn(u);else break t;fs(u),vt(18)}}else u.za=I[1],0<u.za-u.T&&37500>I[2]&&u.F&&u.v==0&&!u.C&&(u.C=en(A(u.Za,u),6e3));if(1>=ho(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else he(u,11)}else if((i.K||u.g==i)&&Zn(u),!U(l))for(I=u.Da.g.parse(l),l=0;l<I.length;l++){let G=I[l];if(u.T=G[0],G=G[1],u.G==2)if(G[0]=="c"){u.K=G[1],u.ia=G[2];const pt=G[3];pt!=null&&(u.la=pt,u.j.info("VER="+u.la));const gt=G[4];gt!=null&&(u.Aa=gt,u.j.info("SVER="+u.Aa));const Re=G[5];Re!=null&&typeof Re=="number"&&0<Re&&(d=1.5*Re,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Pt=i.g;if(Pt){const er=Pt.g?Pt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(er){var R=d.h;R.g||er.indexOf("spdy")==-1&&er.indexOf("quic")==-1&&er.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(cs(R,R.h),R.h=null))}if(d.D){const ps=Pt.g?Pt.g.getResponseHeader("X-HTTP-Session-Id"):null;ps&&(d.ya=ps,Y(d.I,d.D,ps))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var b=i;if(d.qa=Fo(d,d.J?d.ia:null,d.W),b.K){fo(d.h,b);var X=b,ut=d.L;ut&&(X.I=ut),X.B&&(as(X),jn(X)),d.g=b}else xo(d);0<u.i.length&&Jn(u)}else G[0]!="stop"&&G[0]!="close"||he(u,7);else u.G==3&&(G[0]=="stop"||G[0]=="close"?G[0]=="stop"?he(u,7):ds(u):G[0]!="noop"&&u.l&&u.l.ta(G),u.v=0)}}tn(4)}catch{}}var yc=class{constructor(i,l){this.g=i,this.map=l}};function uo(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function co(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ho(i){return i.h?1:i.g?i.g.size:0}function us(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function cs(i,l){i.g?i.g.add(l):i.h=l}function fo(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}uo.prototype.cancel=function(){if(this.i=mo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function mo(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const u of i.g.values())l=l.concat(u.D);return l}return x(i.i)}function _c(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var l=[],u=i.length,d=0;d<u;d++)l.push(i[d]);return l}l=[],u=0;for(d in i)l[u++]=i[d];return l}function Ec(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var l=[];i=i.length;for(var u=0;u<i;u++)l.push(u);return l}l=[],u=0;for(const d in i)l[u++]=d;return l}}}function po(i,l){if(i.forEach&&typeof i.forEach=="function")i.forEach(l,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,l,void 0);else for(var u=Ec(i),d=_c(i),I=d.length,R=0;R<I;R++)l.call(void 0,d[R],u&&u[R],i)}var go=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Tc(i,l){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var d=i[u].indexOf("="),I=null;if(0<=d){var R=i[u].substring(0,d);I=i[u].substring(d+1)}else R=i[u];l(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function ce(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof ce){this.h=i.h,zn(this,i.j),this.o=i.o,this.g=i.g,Gn(this,i.s),this.l=i.l;var l=i.i,u=new an;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),yo(this,u),this.m=i.m}else i&&(l=String(i).match(go))?(this.h=!1,zn(this,l[1]||"",!0),this.o=sn(l[2]||""),this.g=sn(l[3]||"",!0),Gn(this,l[4]),this.l=sn(l[5]||"",!0),yo(this,l[6]||"",!0),this.m=sn(l[7]||"")):(this.h=!1,this.i=new an(null,this.h))}ce.prototype.toString=function(){var i=[],l=this.j;l&&i.push(on(l,_o,!0),":");var u=this.g;return(u||l=="file")&&(i.push("//"),(l=this.o)&&i.push(on(l,_o,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(on(u,u.charAt(0)=="/"?Ac:Ic,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",on(u,Rc)),i.join("")};function Ot(i){return new ce(i)}function zn(i,l,u){i.j=u?sn(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function Gn(i,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);i.s=l}else i.s=null}function yo(i,l,u){l instanceof an?(i.i=l,Sc(i.i,i.h)):(u||(l=on(l,wc)),i.i=new an(l,i.h))}function Y(i,l,u){i.i.set(l,u)}function Kn(i){return Y(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function sn(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function on(i,l,u){return typeof i=="string"?(i=encodeURI(i).replace(l,vc),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function vc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var _o=/[#\/\?@]/g,Ic=/[#\?:]/g,Ac=/[#\?]/g,wc=/[#\?@]/g,Rc=/#/g;function an(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function Kt(i){i.g||(i.g=new Map,i.h=0,i.i&&Tc(i.i,function(l,u){i.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=an.prototype,n.add=function(i,l){Kt(this),this.i=null,i=Ae(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(l),this.h+=1,this};function Eo(i,l){Kt(i),l=Ae(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function To(i,l){return Kt(i),l=Ae(i,l),i.g.has(l)}n.forEach=function(i,l){Kt(this),this.g.forEach(function(u,d){u.forEach(function(I){i.call(l,I,d,this)},this)},this)},n.na=function(){Kt(this);const i=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let d=0;d<l.length;d++){const I=i[d];for(let R=0;R<I.length;R++)u.push(l[d])}return u},n.V=function(i){Kt(this);let l=[];if(typeof i=="string")To(this,i)&&(l=l.concat(this.g.get(Ae(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)l=l.concat(i[u])}return l},n.set=function(i,l){return Kt(this),this.i=null,i=Ae(this,i),To(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=this.V(i),0<i.length?String(i[0]):l):l};function vo(i,l,u){Eo(i,l),0<u.length&&(i.i=null,i.g.set(Ae(i,l),x(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var d=l[u];const R=encodeURIComponent(String(d)),b=this.V(d);for(d=0;d<b.length;d++){var I=R;b[d]!==""&&(I+="="+encodeURIComponent(String(b[d]))),i.push(I)}}return this.i=i.join("&")};function Ae(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function Sc(i,l){l&&!i.j&&(Kt(i),i.i=null,i.g.forEach(function(u,d){var I=d.toLowerCase();d!=I&&(Eo(this,d),vo(this,I,u))},i)),i.j=l}function Pc(i,l){const u=new nn;if(c.Image){const d=new Image;d.onload=P(Qt,u,"TestLoadImage: loaded",!0,l,d),d.onerror=P(Qt,u,"TestLoadImage: error",!1,l,d),d.onabort=P(Qt,u,"TestLoadImage: abort",!1,l,d),d.ontimeout=P(Qt,u,"TestLoadImage: timeout",!1,l,d),c.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else l(!1)}function Cc(i,l){const u=new nn,d=new AbortController,I=setTimeout(()=>{d.abort(),Qt(u,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(I),R.ok?Qt(u,"TestPingServer: ok",!0,l):Qt(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Qt(u,"TestPingServer: error",!1,l)})}function Qt(i,l,u,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(u)}catch{}}function bc(){this.g=new hc}function Vc(i,l,u){const d=u||"";try{po(i,function(I,R){let b=I;f(I)&&(b=ts(I)),l.push(d+R+"="+encodeURIComponent(b))})}catch(I){throw l.push(d+"type="+encodeURIComponent("_badmap")),I}}function Qn(i){this.l=i.Ub||null,this.j=i.eb||!1}V(Qn,es),Qn.prototype.g=function(){return new Wn(this.l,this.j)},Qn.prototype.i=function(i){return function(){return i}}({});function Wn(i,l){mt.call(this),this.D=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(Wn,mt),n=Wn.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=l,this.readyState=1,un(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(l.body=i),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ln(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,un(this)),this.g&&(this.readyState=3,un(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Io(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Io(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?ln(this):un(this),this.readyState==3&&Io(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,ln(this))},n.Qa=function(i){this.g&&(this.response=i,ln(this))},n.ga=function(){this.g&&ln(this)};function ln(i){i.readyState=4,i.l=null,i.j=null,i.v=null,un(i)}n.setRequestHeader=function(i,l){this.u.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=l.next();return i.join(`\r
`)};function un(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ao(i){let l="";return lt(i,function(u,d){l+=d,l+=":",l+=u,l+=`\r
`}),l}function hs(i,l,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=Ao(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):Y(i,l,u))}function Z(i){mt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(Z,mt);var Dc=/^https?$/i,kc=["POST","PUT"];n=Z.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,l,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ss.g(),this.v=this.o?Yi(this.o):Yi(ss),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(R){wo(this,R);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)u.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())u.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(R=>R.toLowerCase()=="content-type"),I=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(kc,l,void 0))||d||I||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,b]of u)this.g.setRequestHeader(R,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Po(this),this.u=!0,this.g.send(i),this.u=!1}catch(R){wo(this,R)}};function wo(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.m=5,Ro(i),Xn(i)}function Ro(i){i.A||(i.A=!0,Tt(i,"complete"),Tt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Tt(this,"complete"),Tt(this,"abort"),Xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xn(this,!0)),Z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?So(this):this.bb())},n.bb=function(){So(this)};function So(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Ft(i)!=4||i.Z()!=2)){if(i.u&&Ft(i)==4)Ki(i.Ea,0,i);else if(Tt(i,"readystatechange"),Ft(i)==4){i.h=!1;try{const b=i.Z();t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var u;if(!(u=l)){var d;if(d=b===0){var I=String(i.D).match(go)[1]||null;!I&&c.self&&c.self.location&&(I=c.self.location.protocol.slice(0,-1)),d=!Dc.test(I?I.toLowerCase():"")}u=d}if(u)Tt(i,"complete"),Tt(i,"success");else{i.m=6;try{var R=2<Ft(i)?i.g.statusText:""}catch{R=""}i.l=R+" ["+i.Z()+"]",Ro(i)}}finally{Xn(i)}}}}function Xn(i,l){if(i.g){Po(i);const u=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,l||Tt(i,"ready");try{u.onreadystatechange=d}catch{}}}function Po(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ft(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ft(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),cc(l)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function xc(i){const l={};i=(i.g&&2<=Ft(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(U(i[d]))continue;var u=T(i[d]);const I=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const R=l[I]||[];l[I]=R,R.push(u)}v(l,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function cn(i,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||l}function bo(i){this.Aa=0,this.i=[],this.j=new nn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=cn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=cn("baseRetryDelayMs",5e3,i),this.cb=cn("retryDelaySeedMs",1e4,i),this.Wa=cn("forwardChannelMaxRetries",2,i),this.wa=cn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new uo(i&&i.concurrentRequestLimit),this.Da=new bc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bo.prototype,n.la=8,n.G=1,n.connect=function(i,l,u,d){vt(0),this.W=i,this.H=l||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=Fo(this,null,this.W),Jn(this)};function ds(i){if(Vo(i),i.G==3){var l=i.U++,u=Ot(i.I);if(Y(u,"SID",i.K),Y(u,"RID",l),Y(u,"TYPE","terminate"),hn(i,u),l=new Gt(i,i.j,l),l.L=2,l.v=Kn(Ot(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=Bo(l.j,null),l.g.ea(l.v)),l.F=Date.now(),jn(l)}Oo(i)}function Yn(i){i.g&&(ms(i),i.g.cancel(),i.g=null)}function Vo(i){Yn(i),i.u&&(c.clearTimeout(i.u),i.u=null),Zn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function Jn(i){if(!co(i.h)&&!i.s){i.s=!0;var l=i.Ga;We||Hi(),Xe||(We(),Xe=!0),Gr.add(l,i),i.B=0}}function Nc(i,l){return ho(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=l.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=en(A(i.Ga,i,l),Lo(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const I=new Gt(this,this.j,i);let R=this.o;if(this.S&&(R?(R=p(R),_(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)t:{for(var l=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(l+=d,4096<l){l=u;break t}if(l===4096||u===this.i.length-1){l=u+1;break t}}l=1e3}else l=1e3;l=ko(this,I,l),u=Ot(this.I),Y(u,"RID",i),Y(u,"CVER",22),this.D&&Y(u,"X-HTTP-Session-Id",this.D),hn(this,u),R&&(this.O?l="headers="+encodeURIComponent(String(Ao(R)))+"&"+l:this.m&&hs(u,this.m,R)),cs(this.h,I),this.Ua&&Y(u,"TYPE","init"),this.P?(Y(u,"$req",l),Y(u,"SID","null"),I.T=!0,os(I,u,null)):os(I,u,l),this.G=2}}else this.G==3&&(i?Do(this,i):this.i.length==0||co(this.h)||Do(this))};function Do(i,l){var u;l?u=l.l:u=i.U++;const d=Ot(i.I);Y(d,"SID",i.K),Y(d,"RID",u),Y(d,"AID",i.T),hn(i,d),i.m&&i.o&&hs(d,i.m,i.o),u=new Gt(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),l&&(i.i=l.D.concat(i.i)),l=ko(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),cs(i.h,u),os(u,d,l)}function hn(i,l){i.H&&lt(i.H,function(u,d){Y(l,d,u)}),i.l&&po({},function(u,d){Y(l,d,u)})}function ko(i,l,u){u=Math.min(i.i.length,u);var d=i.l?A(i.l.Na,i.l,i):null;t:{var I=i.i;let R=-1;for(;;){const b=["count="+u];R==-1?0<u?(R=I[0].g,b.push("ofs="+R)):R=0:b.push("ofs="+R);let X=!0;for(let ut=0;ut<u;ut++){let G=I[ut].g;const pt=I[ut].map;if(G-=R,0>G)R=Math.max(0,I[ut].g-100),X=!1;else try{Vc(pt,b,"req"+G+"_")}catch{d&&d(pt)}}if(X){d=b.join("&");break t}}}return i=i.i.splice(0,u),l.D=i,d}function xo(i){if(!i.g&&!i.u){i.Y=1;var l=i.Fa;We||Hi(),Xe||(We(),Xe=!0),Gr.add(l,i),i.v=0}}function fs(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=en(A(i.Fa,i),Lo(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,No(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=en(A(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),Yn(this),No(this))};function ms(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function No(i){i.g=new Gt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var l=Ot(i.qa);Y(l,"RID","rpc"),Y(l,"SID",i.K),Y(l,"AID",i.T),Y(l,"CI",i.F?"0":"1"),!i.F&&i.ja&&Y(l,"TO",i.ja),Y(l,"TYPE","xmlhttp"),hn(i,l),i.m&&i.o&&hs(l,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=Kn(Ot(l)),u.m=null,u.P=!0,oo(u,i)}n.Za=function(){this.C!=null&&(this.C=null,Yn(this),fs(this),vt(19))};function Zn(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function Mo(i,l){var u=null;if(i.g==l){Zn(i),ms(i),i.g=null;var d=2}else if(us(i.h,l))u=l.D,fo(i.h,l),d=1;else return;if(i.G!=0){if(l.o)if(d==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var I=i.B;d=Un(),Tt(d,new no(d,u)),Jn(i)}else xo(i);else if(I=l.s,I==3||I==0&&0<l.X||!(d==1&&Nc(i,l)||d==2&&fs(i)))switch(u&&0<u.length&&(l=i.h,l.i=l.i.concat(u)),I){case 1:he(i,5);break;case 4:he(i,10);break;case 3:he(i,6);break;default:he(i,2)}}}function Lo(i,l){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*l}function he(i,l){if(i.j.info("Error code "+l),l==2){var u=A(i.fb,i),d=i.Xa;const I=!d;d=new ce(d||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||zn(d,"https"),Kn(d),I?Pc(d.toString(),u):Cc(d.toString(),u)}else vt(2);i.G=0,i.l&&i.l.sa(l),Oo(i),Vo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function Oo(i){if(i.G=0,i.ka=[],i.l){const l=mo(i.h);(l.length!=0||i.i.length!=0)&&(D(i.ka,l),D(i.ka,i.i),i.h.i.length=0,x(i.i),i.i.length=0),i.l.ra()}}function Fo(i,l,u){var d=u instanceof ce?Ot(u):new ce(u);if(d.g!="")l&&(d.g=l+"."+d.g),Gn(d,d.s);else{var I=c.location;d=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;var R=new ce(null);d&&zn(R,d),l&&(R.g=l),I&&Gn(R,I),u&&(R.l=u),d=R}return u=i.D,l=i.ya,u&&l&&Y(d,u,l),Y(d,"VER",i.la),hn(i,d),d}function Bo(i,l,u){if(l&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Ca&&!i.pa?new Z(new Qn({eb:u})):new Z(i.pa),l.Ha(i.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $o(){}n=$o.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function tr(){}tr.prototype.g=function(i,l){return new At(i,l)};function At(i,l){mt.call(this),this.g=new bo(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(i?i["X-WebChannel-Client-Profile"]=l.va:i={"X-WebChannel-Client-Profile":l.va}),this.g.S=i,(i=l&&l.Sb)&&!U(i)&&(this.g.m=i),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!U(l)&&(this.g.D=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new we(this)}V(At,mt),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){ds(this.g)},At.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=ts(i),i=u);l.i.push(new yc(l.Ya++,i)),l.G==3&&Jn(l)},At.prototype.N=function(){this.g.l=null,delete this.j,ds(this.g),delete this.g,At.aa.N.call(this)};function Uo(i){ns.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){t:{for(const u in l){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}V(Uo,ns);function Ho(){rs.call(this),this.status=1}V(Ho,rs);function we(i){this.g=i}V(we,$o),we.prototype.ua=function(){Tt(this.g,"a")},we.prototype.ta=function(i){Tt(this.g,new Uo(i))},we.prototype.sa=function(i){Tt(this.g,new Ho)},we.prototype.ra=function(){Tt(this.g,"b")},tr.prototype.createWebChannel=tr.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,Pl=function(){return new tr},Sl=function(){return Un()},Rl=le,Os={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Hn.NO_ERROR=0,Hn.TIMEOUT=8,Hn.HTTP_ERROR=6,ar=Hn,ro.COMPLETE="complete",wl=ro,Ji.EventType=Ze,Ze.OPEN="a",Ze.CLOSE="b",Ze.ERROR="c",Ze.MESSAGE="d",mt.prototype.listen=mt.prototype.K,fn=Ji,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,Al=Z}).apply(typeof nr<"u"?nr:typeof self<"u"?self:typeof window<"u"?window:{});const na="@firebase/firestore",ra="4.7.16";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}_t.UNAUTHENTICATED=new _t(null),_t.GOOGLE_CREDENTIALS=new _t("google-credentials-uid"),_t.FIRST_PARTY=new _t("first-party-uid"),_t.MOCK_USER=new _t("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let je="11.8.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge=new gl("@firebase/firestore");function Se(){return ge.logLevel}function k(n,...t){if(ge.logLevel<=j.DEBUG){const e=t.map(li);ge.debug(`Firestore (${je}): ${n}`,...e)}}function Ht(n,...t){if(ge.logLevel<=j.ERROR){const e=t.map(li);ge.error(`Firestore (${je}): ${n}`,...e)}}function Me(n,...t){if(ge.logLevel<=j.WARN){const e=t.map(li);ge.warn(`Firestore (${je}): ${n}`,...e)}}function li(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Cl(n,r,e)}function Cl(n,t,e){let r=`FIRESTORE (${je}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ht(r),new Error(r)}function W(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Cl(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends qe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class bd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class Vd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Dd{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){W(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new te;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new te,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},c=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new te)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(W(typeof r.accessToken=="string",31837,{l:r}),new bl(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return W(t===null||typeof t=="string",2055,{h:t}),new _t(t)}}class kd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class xd{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new kd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class sa{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Nd{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,dd(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){W(this.o===void 0,3512);const r=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new sa(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(W(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new sa(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Md(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Fs(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return B(r,s);{const o=Vl(),a=Ld(o.encode(ia(n,e)),o.encode(ia(t,e)));return a!==0?a:B(r,s)}}e+=r>65535?2:1}return B(n.length,t.length)}function ia(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Ld(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return B(n[e],t[e]);return B(n.length,t.length)}function Le(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=-62135596800,aa=1e6;class it{static now(){return it.fromMillis(Date.now())}static fromDate(t){return it.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*aa);return new it(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<oa)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/aa}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-oa;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static fromTimestamp(t){return new O(t)}static min(){return new O(new it(0,0))}static max(){return new O(new it(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="__name__";class Vt{constructor(t,e,r){e===void 0?e=0:e>t.length&&L(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&L(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Vt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Vt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Vt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=Vt.isNumericId(t),s=Vt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Vt.extractNumericId(t).compare(Vt.extractNumericId(e)):Fs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Zt.fromString(t.substring(4,t.length-2))}}class tt extends Vt{construct(t,e,r){return new tt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new N(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new tt(e)}static emptyPath(){return new tt([])}}const Od=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends Vt{construct(t,e,r){return new ht(t,e,r)}static isValidIdentifier(t){return Od.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===la}static keyField(){return new ht([la])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new N(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new N(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(o(),s++)}if(o(),a)throw new N(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ht(e)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(tt.fromString(t))}static fromName(t){return new M(tt.fromString(t).popFirst(5))}static empty(){return new M(tt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&tt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return tt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new tt(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An=-1;function Fd(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=O.fromTimestamp(r===1e9?new it(e+1,0):new it(e,r));return new ee(s,M.empty(),t)}function Bd(n){return new ee(n.readTime,n.key,An)}class ee{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new ee(O.min(),M.empty(),An)}static max(){return new ee(O.max(),M.empty(),An)}}function $d(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Hd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ze(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Ud)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,r)=>{e(t)})}static reject(t){return new S((e,r)=>{r(t)})}static waitFor(t){return new S((e,r)=>{let s=0,o=0,a=!1;t.forEach(c=>{++s,c.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next(s=>s?S.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new S((r,s)=>{const o=t.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{a[f]=m,++c,c===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new S((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function qd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ge(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ue(r),this.ce=r=>e.writeSequenceNumber(r))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}xr.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=-1;function Nr(n){return n==null}function _r(n){return n===0&&1/n==-1/0}function jd(n){return typeof n=="number"&&Number.isInteger(n)&&!_r(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl="";function zd(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ua(t)),t=Gd(n.get(e),t);return ua(t)}function Gd(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case kl:e+="";break;default:e+=o}}return e}function ua(n){return n+kl+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function _e(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function xl(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t,e){this.comparator=t,this.root=e||ct.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new rr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new rr(this.root,t,this.comparator,!1)}getReverseIterator(){return new rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new rr(this.root,t,this.comparator,!0)}}class rr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ct.RED,this.left=s??ct.EMPTY,this.right=o??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ct(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ct.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw L(27949);return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ha(this.data.getIterator())}getIteratorFrom(t){return new ha(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class ha{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t){this.fields=t,t.sort(ht.comparator)}static empty(){return new Ct([])}unionWith(t){let e=new ot(ht.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Ct(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Le(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Nl("Invalid base64 string: "+o):o}}(t);return new dt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const Kd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ne(n){if(W(!!n,39018),typeof n=="string"){let t=0;const e=Kd.exec(n);if(W(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function re(n){return typeof n=="string"?dt.fromBase64String(n):dt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="server_timestamp",Ll="__type__",Ol="__previous_value__",Fl="__local_write_time__";function ci(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[Ll])===null||e===void 0?void 0:e.stringValue)===Ml}function Mr(n){const t=n.mapValue.fields[Ol];return ci(t)?Mr(t):t}function wn(n){const t=ne(n.mapValue.fields[Fl].timestampValue);return new it(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(t,e,r,s,o,a,c,h,f,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m}}const Er="(default)";class Rn{constructor(t,e){this.projectId=t,this.database=e||Er}static empty(){return new Rn("","")}get isDefaultDatabase(){return this.database===Er}isEqual(t){return t instanceof Rn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl="__type__",Wd="__max__",sr={mapValue:{}},$l="__vector__",Tr="value";function se(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ci(n)?4:Yd(n)?9007199254740991:Xd(n)?10:11:L(28295,{value:n})}function xt(n,t){if(n===t)return!0;const e=se(n);if(e!==se(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return wn(n).isEqual(wn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=ne(s.timestampValue),c=ne(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return re(s.bytesValue).isEqual(re(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return et(s.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(s.geoPointValue.longitude)===et(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return et(s.integerValue)===et(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=et(s.doubleValue),c=et(o.doubleValue);return a===c?_r(a)===_r(c):isNaN(a)&&isNaN(c)}return!1}(n,t);case 9:return Le(n.arrayValue.values||[],t.arrayValue.values||[],xt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},c=o.mapValue.fields||{};if(ca(a)!==ca(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!xt(a[h],c[h])))return!1;return!0}(n,t);default:return L(52216,{left:n})}}function Sn(n,t){return(n.values||[]).find(e=>xt(e,t))!==void 0}function Oe(n,t){if(n===t)return 0;const e=se(n),r=se(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const c=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,t);case 3:return da(n.timestampValue,t.timestampValue);case 4:return da(wn(n),wn(t));case 5:return Fs(n.stringValue,t.stringValue);case 6:return function(o,a){const c=re(o),h=re(a);return c.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let f=0;f<c.length&&f<h.length;f++){const m=B(c[f],h[f]);if(m!==0)return m}return B(c.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const c=B(et(o.latitude),et(a.latitude));return c!==0?c:B(et(o.longitude),et(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return fa(n.arrayValue,t.arrayValue);case 10:return function(o,a){var c,h,f,m;const E=o.fields||{},A=a.fields||{},P=(c=E[Tr])===null||c===void 0?void 0:c.arrayValue,V=(h=A[Tr])===null||h===void 0?void 0:h.arrayValue,x=B(((f=P==null?void 0:P.values)===null||f===void 0?void 0:f.length)||0,((m=V==null?void 0:V.values)===null||m===void 0?void 0:m.length)||0);return x!==0?x:fa(P,V)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===sr.mapValue&&a===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(a===sr.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let E=0;E<h.length&&E<m.length;++E){const A=Fs(h[E],m[E]);if(A!==0)return A;const P=Oe(c[h[E]],f[m[E]]);if(P!==0)return P}return B(h.length,m.length)}(n.mapValue,t.mapValue);default:throw L(23264,{Pe:e})}}function da(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=ne(n),r=ne(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function fa(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Oe(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function Fe(n){return Bs(n)}function Bs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=ne(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return re(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Bs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Bs(e.fields[a])}`;return s+"}"}(n.mapValue):L(61005,{value:n})}function lr(n){switch(se(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Mr(n);return t?16+lr(t):16;case 5:return 2*n.stringValue.length;case 6:return re(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+lr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return _e(r.fields,(o,a)=>{s+=o.length+lr(a)}),s}(n.mapValue);default:throw L(13486,{value:n})}}function $s(n){return!!n&&"integerValue"in n}function hi(n){return!!n&&"arrayValue"in n}function ma(n){return!!n&&"nullValue"in n}function pa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ur(n){return!!n&&"mapValue"in n}function Xd(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[Bl])===null||e===void 0?void 0:e.stringValue)===$l}function yn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return _e(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=yn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=yn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Yd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Wd}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!ur(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=yn(e)}setAll(t){let e=ht.emptyPath(),r={},s=[];t.forEach((a,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=c.popLast()}a?r[c.lastSegment()]=yn(a):s.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());ur(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];ur(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){_e(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new wt(yn(this.value))}}function Ul(n){const t=[];return _e(n.fields,(e,r)=>{const s=new ht([e]);if(ur(r)){const o=Ul(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new Ct(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t,e,r,s,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Et(t,0,O.min(),O.min(),O.min(),wt.empty(),0)}static newFoundDocument(t,e,r,s){return new Et(t,1,e,O.min(),r,s,0)}static newNoDocument(t,e){return new Et(t,2,e,O.min(),O.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new Et(t,3,e,O.min(),O.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(O.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=O.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Et&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(t,e){this.position=t,this.inclusive=e}}function ga(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),e.key):r=Oe(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function ya(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!xt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e="asc"){this.field=t,this.dir=e}}function Jd(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{}class st extends Hl{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new tf(t,e,r):e==="array-contains"?new rf(t,r):e==="in"?new sf(t,r):e==="not-in"?new of(t,r):e==="array-contains-any"?new af(t,r):new st(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new ef(t,r):new nf(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Oe(e,this.value)):e!==null&&se(this.value)===se(e)&&this.matchesComparison(Oe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Nt extends Hl{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Nt(t,e)}matches(t){return ql(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function ql(n){return n.op==="and"}function jl(n){return Zd(n)&&ql(n)}function Zd(n){for(const t of n.filters)if(t instanceof Nt)return!1;return!0}function Us(n){if(n instanceof st)return n.field.canonicalString()+n.op.toString()+Fe(n.value);if(jl(n))return n.filters.map(t=>Us(t)).join(",");{const t=n.filters.map(e=>Us(e)).join(",");return`${n.op}(${t})`}}function zl(n,t){return n instanceof st?function(r,s){return s instanceof st&&r.op===s.op&&r.field.isEqual(s.field)&&xt(r.value,s.value)}(n,t):n instanceof Nt?function(r,s){return s instanceof Nt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,c)=>o&&zl(a,s.filters[c]),!0):!1}(n,t):void L(19439)}function Gl(n){return n instanceof st?function(e){return`${e.field.canonicalString()} ${e.op} ${Fe(e.value)}`}(n):n instanceof Nt?function(e){return e.op.toString()+" {"+e.getFilters().map(Gl).join(" ,")+"}"}(n):"Filter"}class tf extends st{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class ef extends st{constructor(t,e){super(t,"in",e),this.keys=Kl("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class nf extends st{constructor(t,e){super(t,"not-in",e),this.keys=Kl("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Kl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>M.fromName(r.referenceValue))}class rf extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return hi(e)&&Sn(e.arrayValue,this.value)}}class sf extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Sn(this.value.arrayValue,e)}}class of extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(Sn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Sn(this.value.arrayValue,e)}}class af extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!hi(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Sn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(t,e=null,r=[],s=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=c,this.Ie=null}}function _a(n,t=null,e=[],r=[],s=null,o=null,a=null){return new lf(n,t,e,r,s,o,a)}function di(n){const t=F(n);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Us(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Nr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Fe(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Fe(r)).join(",")),t.Ie=e}return t.Ie}function fi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Jd(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!zl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!ya(n.startAt,t.startAt)&&ya(n.endAt,t.endAt)}function Hs(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(t,e=null,r=[],s=[],o=null,a="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function uf(n,t,e,r,s,o,a,c){return new Lr(n,t,e,r,s,o,a,c)}function mi(n){return new Lr(n)}function Ea(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function cf(n){return n.collectionGroup!==null}function _n(n){const t=F(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ot(ht.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Ir(o,r))}),e.has(ht.keyField().canonicalString())||t.Ee.push(new Ir(ht.keyField(),r))}return t.Ee}function Dt(n){const t=F(n);return t.de||(t.de=hf(t,_n(n))),t.de}function hf(n,t){if(n.limitType==="F")return _a(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Ir(s.field,o)});const e=n.endAt?new vr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vr(n.startAt.position,n.startAt.inclusive):null;return _a(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function qs(n,t,e){return new Lr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Or(n,t){return fi(Dt(n),Dt(t))&&n.limitType===t.limitType}function Ql(n){return`${di(Dt(n))}|lt:${n.limitType}`}function Pe(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Gl(s)).join(", ")}]`),Nr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>Fe(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>Fe(s)).join(",")),`Target(${r})`}(Dt(n))}; limitType=${n.limitType})`}function Fr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of _n(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,c,h){const f=ga(a,c,h);return a.inclusive?f<=0:f<0}(r.startAt,_n(r),s)||r.endAt&&!function(a,c,h){const f=ga(a,c,h);return a.inclusive?f>=0:f>0}(r.endAt,_n(r),s))}(n,t)}function df(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Wl(n){return(t,e)=>{let r=!1;for(const s of _n(n)){const o=ff(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function ff(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):function(o,a,c){const h=a.data.field(o),f=c.data.field(o);return h!==null&&f!==null?Oe(h,f):L(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){_e(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return xl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=new J(M.comparator);function qt(){return mf}const Xl=new J(M.comparator);function mn(...n){let t=Xl;for(const e of n)t=t.insert(e.key,e);return t}function Yl(n){let t=Xl;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function fe(){return En()}function Jl(){return En()}function En(){return new Ee(n=>n.toString(),(n,t)=>n.isEqual(t))}const pf=new J(M.comparator),gf=new ot(M.comparator);function H(...n){let t=gf;for(const e of n)t=t.add(e);return t}const yf=new ot(B);function _f(){return yf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_r(t)?"-0":t}}function Zl(n){return{integerValue:""+n}}function Ef(n,t){return jd(t)?Zl(t):pi(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(){this._=void 0}}function Tf(n,t,e){return n instanceof Ar?function(s,o){const a={fields:{[Ll]:{stringValue:Ml},[Fl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&ci(o)&&(o=Mr(o)),o&&(a.fields[Ol]=o),{mapValue:a}}(e,t):n instanceof Pn?eu(n,t):n instanceof Cn?nu(n,t):function(s,o){const a=tu(s,o),c=Ta(a)+Ta(s.Re);return $s(a)&&$s(s.Re)?Zl(c):pi(s.serializer,c)}(n,t)}function vf(n,t,e){return n instanceof Pn?eu(n,t):n instanceof Cn?nu(n,t):e}function tu(n,t){return n instanceof wr?function(r){return $s(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class Ar extends Br{}class Pn extends Br{constructor(t){super(),this.elements=t}}function eu(n,t){const e=ru(t);for(const r of n.elements)e.some(s=>xt(s,r))||e.push(r);return{arrayValue:{values:e}}}class Cn extends Br{constructor(t){super(),this.elements=t}}function nu(n,t){let e=ru(t);for(const r of n.elements)e=e.filter(s=>!xt(s,r));return{arrayValue:{values:e}}}class wr extends Br{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Ta(n){return et(n.integerValue||n.doubleValue)}function ru(n){return hi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function If(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Pn&&s instanceof Pn||r instanceof Cn&&s instanceof Cn?Le(r.elements,s.elements,xt):r instanceof wr&&s instanceof wr?xt(r.Re,s.Re):r instanceof Ar&&s instanceof Ar}(n.transform,t.transform)}class Af{constructor(t,e){this.version=t,this.transformResults=e}}class Bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Bt}static exists(t){return new Bt(void 0,t)}static updateTime(t){return new Bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function cr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class $r{}function su(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ou(n.key,Bt.none()):new xn(n.key,n.data,Bt.none());{const e=n.data,r=wt.empty();let s=new ot(ht.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Te(n.key,r,new Ct(s.toArray()),Bt.none())}}function wf(n,t,e){n instanceof xn?function(s,o,a){const c=s.value.clone(),h=Ia(s.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,t,e):n instanceof Te?function(s,o,a){if(!cr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Ia(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(iu(s)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Tn(n,t,e,r){return n instanceof xn?function(o,a,c,h){if(!cr(o.precondition,a))return c;const f=o.value.clone(),m=Aa(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Te?function(o,a,c,h){if(!cr(o.precondition,a))return c;const f=Aa(o.fieldTransforms,h,a),m=a.data;return m.setAll(iu(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(E=>E.field))}(n,t,e,r):function(o,a,c){return cr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,t,e)}function Rf(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=tu(r.transform,s||null);o!=null&&(e===null&&(e=wt.empty()),e.set(r.field,o))}return e||null}function va(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Le(r,s,(o,a)=>If(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class xn extends $r{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Te extends $r{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function iu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Ia(n,t,e){const r=new Map;W(n.length===e.length,32656,{Ve:e.length,me:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,c=t.data.field(o.field);r.set(o.field,vf(a,c,e[s]))}return r}function Aa(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Tf(o,a,t))}return r}class ou extends $r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Sf extends $r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&wf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Tn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Tn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Jl();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(s.key)?null:c;const h=su(a,c);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(O.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),H())}isEqual(t){return this.batchId===t.batchId&&Le(this.mutations,t.mutations,(e,r)=>va(e,r))&&Le(this.baseMutations,t.baseMutations,(e,r)=>va(e,r))}}class gi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){W(t.mutations.length===r.length,58842,{fe:t.mutations.length,ge:r.length});let s=function(){return pf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new gi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt,q;function Vf(n){switch(n){case C.OK:return L(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function au(n){if(n===void 0)return Ht("GRPC error has no .code"),C.UNKNOWN;switch(n){case rt.OK:return C.OK;case rt.CANCELLED:return C.CANCELLED;case rt.UNKNOWN:return C.UNKNOWN;case rt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case rt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case rt.INTERNAL:return C.INTERNAL;case rt.UNAVAILABLE:return C.UNAVAILABLE;case rt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case rt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case rt.NOT_FOUND:return C.NOT_FOUND;case rt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case rt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case rt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case rt.ABORTED:return C.ABORTED;case rt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case rt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case rt.DATA_LOSS:return C.DATA_LOSS;default:return L(39323,{code:n})}}(q=rt||(rt={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=new Zt([4294967295,4294967295],0);function wa(n){const t=Vl().encode(n),e=new Il;return e.update(t),new Uint8Array(e.digest())}function Ra(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Zt([e,r],0),new Zt([s,o],0)]}class yi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new pn(`Invalid padding: ${e}`);if(r<0)throw new pn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new pn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new pn(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=Zt.fromNumber(this.pe)}we(t,e,r){let s=t.add(e.multiply(Zt.fromNumber(r)));return s.compare(Df)===1&&(s=new Zt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}Se(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.pe===0)return!1;const e=wa(t),[r,s]=Ra(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);if(!this.Se(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new yi(o,s,e);return r.forEach(c=>a.insert(c)),a}insert(t){if(this.pe===0)return;const e=wa(t),[r,s]=Ra(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);this.be(a)}}be(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class pn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Nn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ur(O.min(),s,new J(B),qt(),H())}}class Nn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Nn(r,e,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e,r,s){this.De=t,this.removedTargetIds=e,this.key=r,this.ve=s}}class lu{constructor(t,e){this.targetId=t,this.Ce=e}}class uu{constructor(t,e,r=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Sa{constructor(){this.Fe=0,this.Me=Pa(),this.xe=dt.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=H(),e=H(),r=H();return this.Me.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:L(38017,{changeType:o})}}),new Nn(this.xe,this.Oe,t,e,r)}Qe(){this.Ne=!1,this.Me=Pa()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,W(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class kf{constructor(t){this.ze=t,this.je=new Map,this.He=qt(),this.Je=ir(),this.Ye=ir(),this.Ze=new J(B)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const r=this.rt(e);switch(t.state){case 0:this.it(e)&&r.ke(t.resumeToken);break;case 1:r.We(),r.Be||r.Qe(),r.ke(t.resumeToken);break;case 2:r.We(),r.Be||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.ke(t.resumeToken));break;default:L(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((r,s)=>{this.it(s)&&e(s)})}ot(t){const e=t.targetId,r=t.Ce.count,s=this._t(e);if(s){const o=s.target;if(Hs(o))if(r===0){const a=new M(o.path);this.tt(e,a,Et.newNoDocument(a,O.min()))}else W(r===1,20013,{expectedCount:r});else{const a=this.ut(e);if(a!==r){const c=this.ct(t),h=c?this.lt(c,t,a):1;if(h!==0){this.st(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,c;try{a=re(r).toUint8Array()}catch(h){if(h instanceof Nl)return Me("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new yi(a,s,o)}catch(h){return Me(h instanceof pn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.pe===0?null:c}lt(t,e,r){return e.Ce.count===r-this.Tt(t,e.targetId)?0:2}Tt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.ze.Pt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.tt(e,o,null),s++)}),s}It(t){const e=new Map;this.je.forEach((o,a)=>{const c=this._t(a);if(c){if(o.current&&Hs(c.target)){const h=new M(c.target.path);this.Et(h).has(a)||this.dt(a,h)||this.tt(a,h,Et.newNoDocument(h,t))}o.Le&&(e.set(a,o.qe()),o.Qe())}});let r=H();this.Ye.forEach((o,a)=>{let c=!0;a.forEachWhile(h=>{const f=this._t(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.He.forEach((o,a)=>a.setReadTime(t));const s=new Ur(t,e,this.Ze,this.He,r);return this.He=qt(),this.Je=ir(),this.Ye=ir(),this.Ze=new J(B),s}et(t,e){if(!this.it(t))return;const r=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,r),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,r){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),r&&(this.He=this.He.insert(e,r))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Sa,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new ot(B),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new ot(B),this.Je=this.Je.insert(t,e)),e}it(t){const e=this._t(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Sa),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function ir(){return new J(M.comparator)}function Pa(){return new J(M.comparator)}const xf={asc:"ASCENDING",desc:"DESCENDING"},Nf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Mf={and:"AND",or:"OR"};class Lf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function js(n,t){return n.useProto3Json||Nr(t)?t:{value:t}}function Rr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function cu(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Of(n,t){return Rr(n,t.toTimestamp())}function kt(n){return W(!!n,49232),O.fromTimestamp(function(e){const r=ne(e);return new it(r.seconds,r.nanos)}(n))}function _i(n,t){return zs(n,t).canonicalString()}function zs(n,t){const e=function(s){return new tt(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function hu(n){const t=tt.fromString(n);return W(gu(t),10190,{key:t.toString()}),t}function Gs(n,t){return _i(n.databaseId,t.path)}function vs(n,t){const e=hu(t);if(e.get(1)!==n.databaseId.projectId)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M(fu(e))}function du(n,t){return _i(n.databaseId,t)}function Ff(n){const t=hu(n);return t.length===4?tt.emptyPath():fu(t)}function Ks(n){return new tt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function fu(n){return W(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ca(n,t,e){return{name:Gs(n,t),fields:e.value.mapValue.fields}}function Bf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(W(m===void 0||typeof m=="string",58123),dt.fromBase64String(m||"")):(W(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),dt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(f){const m=f.code===void 0?C.UNKNOWN:au(f.code);return new N(m,f.message||"")}(a);e=new uu(r,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=vs(n,r.document.name),o=kt(r.document.updateTime),a=r.document.createTime?kt(r.document.createTime):O.min(),c=new wt({mapValue:{fields:r.document.fields}}),h=Et.newFoundDocument(s,o,a,c),f=r.targetIds||[],m=r.removedTargetIds||[];e=new hr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=vs(n,r.document),o=r.readTime?kt(r.readTime):O.min(),a=Et.newNoDocument(s,o),c=r.removedTargetIds||[];e=new hr([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=vs(n,r.document),o=r.removedTargetIds||[];e=new hr([],o,s,null)}else{if(!("filter"in t))return L(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new bf(s,o),c=r.targetId;e=new lu(c,a)}}return e}function $f(n,t){let e;if(t instanceof xn)e={update:Ca(n,t.key,t.value)};else if(t instanceof ou)e={delete:Gs(n,t.key)};else if(t instanceof Te)e={update:Ca(n,t.key,t.data),updateMask:Wf(t.fieldMask)};else{if(!(t instanceof Sf))return L(16599,{ft:t.type});e={verify:Gs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const c=a.transform;if(c instanceof Ar)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Pn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Cn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof wr)return{fieldPath:a.field.canonicalString(),increment:c.Re};throw L(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Of(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L(27497)}(n,t.precondition)),e}function Uf(n,t){return n&&n.length>0?(W(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?kt(s.updateTime):kt(o);return a.isEqual(O.min())&&(a=kt(o)),new Af(a,s.transformResults||[])}(e,t))):[]}function Hf(n,t){return{documents:[du(n,t.path)]}}function qf(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=du(n,s);const o=function(f){if(f.length!==0)return pu(Nt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(m=>function(A){return{field:Ce(A.field),direction:Gf(A.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=js(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{gt:e,parent:s}}function jf(n){let t=Ff(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){W(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(E){const A=mu(E);return A instanceof Nt&&jl(A)?A.getFilters():[A]}(e.where));let a=[];e.orderBy&&(a=function(E){return E.map(A=>function(V){return new Ir(be(V.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(A))}(e.orderBy));let c=null;e.limit&&(c=function(E){let A;return A=typeof E=="object"?E.value:E,Nr(A)?null:A}(e.limit));let h=null;e.startAt&&(h=function(E){const A=!!E.before,P=E.values||[];return new vr(P,A)}(e.startAt));let f=null;return e.endAt&&(f=function(E){const A=!E.before,P=E.values||[];return new vr(P,A)}(e.endAt)),uf(t,s,a,o,c,"F",h,f)}function zf(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function mu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=be(e.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=be(e.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=be(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=be(e.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}}(n):n.fieldFilter!==void 0?function(e){return st.create(be(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Nt.create(e.compositeFilter.filters.map(r=>mu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}}(e.compositeFilter.op))}(n):L(30097,{filter:n})}function Gf(n){return xf[n]}function Kf(n){return Nf[n]}function Qf(n){return Mf[n]}function Ce(n){return{fieldPath:n.canonicalString()}}function be(n){return ht.fromServerFormat(n.fieldPath)}function pu(n){return n instanceof st?function(e){if(e.op==="=="){if(pa(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NAN"}};if(ma(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(pa(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NAN"}};if(ma(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ce(e.field),op:Kf(e.op),value:e.value}}}(n):n instanceof Nt?function(e){const r=e.getFilters().map(s=>pu(s));return r.length===1?r[0]:{compositeFilter:{op:Qf(e.op),filters:r}}}(n):L(54877,{filter:n})}function Wf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function gu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(t,e,r,s,o=O.min(),a=O.min(),c=dt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Xt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(t){this.wt=t}}function Yf(n){const t=jf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?qs(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(){this.Cn=new Zf}addToCollectionParentIndex(t,e){return this.Cn.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(ee.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(ee.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class Zf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(tt.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(tt.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yu=41943040;class It{static withCacheSize(t){return new It(t,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It.DEFAULT_COLLECTION_PERCENTILE=10,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,It.DEFAULT=new It(yu,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),It.DISABLED=new It(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t){this.ur=t}next(){return this.ur+=2,this.ur}static cr(){return new Be(0)}static lr(){return new Be(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="LruGarbageCollector",tm=1048576;function Da([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class em{constructor(t){this.Er=t,this.buffer=new ot(Da),this.dr=0}Ar(){return++this.dr}Rr(t){const e=[t,this.Ar()];if(this.buffer.size<this.Er)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Da(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class nm{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Vr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.mr(6e4)}stop(){this.Vr&&(this.Vr.cancel(),this.Vr=null)}get started(){return this.Vr!==null}mr(t){k(Va,`Garbage collection scheduled in ${t}ms`),this.Vr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Vr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ge(e)?k(Va,"Ignoring IndexedDB error during garbage collection: ",e):await ze(e)}await this.mr(3e5)})}}class rm{constructor(t,e){this.gr=t,this.params=e}calculateTargetCount(t,e){return this.gr.pr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return S.resolve(xr.le);const r=new em(e);return this.gr.forEachTarget(t,s=>r.Rr(s.sequenceNumber)).next(()=>this.gr.yr(t,s=>r.Rr(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.gr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.gr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(ba)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ba):this.wr(t,e))}getCacheSize(t){return this.gr.getCacheSize(t)}wr(t,e){let r,s,o,a,c,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(E=>(E>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${E}`),s=this.params.maximumSequenceNumbersToCollect):s=E,a=Date.now(),this.nthSequenceNumber(t,s))).next(E=>(r=E,c=Date.now(),this.removeTargets(t,r,e))).next(E=>(o=E,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(E=>(f=Date.now(),Se()<=j.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${E} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:E})))}}function sm(n,t){return new rm(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(){this.changes=new Ee(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Et.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&Tn(r.mutation,s,Ct.empty(),it.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,H()).next(()=>r))}getLocalViewOfDocuments(t,e,r=H()){const s=fe();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=mn();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=fe();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,H()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,c)=>{e.set(a,c)})})}computeViews(t,e,r,s){let o=qt();const a=En(),c=function(){return En()}();return e.forEach((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof Te)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),Tn(m.mutation,f,m.mutation.getFieldMask(),it.now())):a.set(f.key,Ct.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>a.set(f,m)),e.forEach((f,m)=>{var E;return c.set(f,new om(m,(E=a.get(f))!==null&&E!==void 0?E:null))}),c))}recalculateAndSaveOverlays(t,e){const r=En();let s=new J((a,c)=>a-c),o=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const c of a)c.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Ct.empty();m=c.applyToLocalView(f,m),r.set(h,m);const E=(s.get(c.batchId)||H()).add(h);s=s.insert(c.batchId,E)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,m=h.value,E=Jl();m.forEach(A=>{if(!o.has(A)){const P=su(e.get(A),r.get(A));P!==null&&E.set(A,P),o=o.add(A)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,E))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):cf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):S.resolve(fe());let c=An,h=o;return a.next(f=>S.forEach(f,(m,E)=>(c<E.largestBatchId&&(c=E.largestBatchId),o.get(m)?S.resolve():this.remoteDocumentCache.getEntry(t,m).next(A=>{h=h.insert(m,A)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,H())).next(m=>({batchId:c,changes:Yl(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(r=>{let s=mn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=mn();return this.indexManager.getCollectionParents(t,o).next(c=>S.forEach(c,h=>{const f=function(E,A){return new Lr(A,null,E.explicitOrderBy.slice(),E.filters.slice(),E.limit,E.limitType,E.startAt,E.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(m=>{m.forEach((E,A)=>{a=a.insert(E,A)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,Et.newInvalidDocument(m)))});let c=mn();return a.forEach((h,f)=>{const m=o.get(h);m!==void 0&&Tn(m.mutation,f,Ct.empty(),it.now()),Fr(e,f)&&(c=c.insert(h,f))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(t){this.serializer=t,this.kr=new Map,this.qr=new Map}getBundleMetadata(t,e){return S.resolve(this.kr.get(e))}saveBundleMetadata(t,e){return this.kr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:kt(s.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.qr.get(e))}saveNamedQuery(t,e){return this.qr.set(e.name,function(s){return{name:s.name,query:Yf(s.bundledQuery),readTime:kt(s.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(){this.overlays=new J(M.comparator),this.Qr=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=fe();return S.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.bt(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Qr.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const s=fe(),o=e.length+1,a=new M(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new J((f,m)=>f-m);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=fe(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const c=fe(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>c.set(f,m)),!(c.size()>=s)););return S.resolve(c)}bt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Qr.get(s.largestBatchId).delete(r.key);this.Qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Cf(e,r));let o=this.Qr.get(e);o===void 0&&(o=H(),this.Qr.set(e,o)),this.Qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.$r=new ot(at.Ur),this.Kr=new ot(at.Wr)}isEmpty(){return this.$r.isEmpty()}addReference(t,e){const r=new at(t,e);this.$r=this.$r.add(r),this.Kr=this.Kr.add(r)}Gr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.zr(new at(t,e))}jr(t,e){t.forEach(r=>this.removeReference(r,e))}Hr(t){const e=new M(new tt([])),r=new at(e,t),s=new at(e,t+1),o=[];return this.Kr.forEachInRange([r,s],a=>{this.zr(a),o.push(a.key)}),o}Jr(){this.$r.forEach(t=>this.zr(t))}zr(t){this.$r=this.$r.delete(t),this.Kr=this.Kr.delete(t)}Yr(t){const e=new M(new tt([])),r=new at(e,t),s=new at(e,t+1);let o=H();return this.Kr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new at(t,0),r=this.$r.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class at{constructor(t,e){this.key=t,this.Zr=e}static Ur(t,e){return M.comparator(t.key,e.key)||B(t.Zr,e.Zr)}static Wr(t,e){return B(t.Zr,e.Zr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.nr=1,this.Xr=new ot(at.Ur)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.nr;this.nr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Pf(o,e,r,s);this.mutationQueue.push(a);for(const c of s)this.Xr=this.Xr.add(new at(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.ei(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ti(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?ui:this.nr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new at(e,0),s=new at(e,Number.POSITIVE_INFINITY),o=[];return this.Xr.forEachInRange([r,s],a=>{const c=this.ei(a.Zr);o.push(c)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(B);return e.forEach(s=>{const o=new at(s,0),a=new at(s,Number.POSITIVE_INFINITY);this.Xr.forEachInRange([o,a],c=>{r=r.add(c.Zr)})}),S.resolve(this.ni(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new at(new M(o),0);let c=new ot(B);return this.Xr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(c=c.add(h.Zr)),!0)},a),S.resolve(this.ni(c))}ni(t){const e=[];return t.forEach(r=>{const s=this.ei(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){W(this.ri(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Xr;return S.forEach(e.mutations,s=>{const o=new at(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Xr=r})}sr(t){}containsKey(t,e){const r=new at(e,0),s=this.Xr.firstAfterOrEqual(r);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}ri(t,e){return this.ti(t)}ti(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}ei(t){const e=this.ti(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t){this.ii=t,this.docs=function(){return new J(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ii(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():Et.newInvalidDocument(e))}getEntries(t,e){let r=qt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Et.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=qt();const a=e.path,c=new M(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||$d(Bd(m),r)<=0||(s.has(m.key)||Fr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,r,s){L(9500)}si(t,e){return S.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new fm(this)}getSize(t){return S.resolve(this.size)}}class fm extends im{constructor(t){super(),this.Br=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Br.addEntry(t,s)):this.Br.removeEntry(r)}),S.waitFor(e)}getFromCache(t,e){return this.Br.getEntry(t,e)}getAllFromCache(t,e){return this.Br.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(t){this.persistence=t,this.oi=new Ee(e=>di(e),fi),this.lastRemoteSnapshotVersion=O.min(),this.highestTargetId=0,this._i=0,this.ai=new Ei,this.targetCount=0,this.ui=Be.cr()}forEachTarget(t,e){return this.oi.forEach((r,s)=>e(s)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this._i)}allocateTargetId(t){return this.highestTargetId=this.ui.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this._i&&(this._i=e),S.resolve()}Tr(t){this.oi.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ui=new Be(e),this.highestTargetId=e),t.sequenceNumber>this._i&&(this._i=t.sequenceNumber)}addTargetData(t,e){return this.Tr(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Tr(e),S.resolve()}removeTargetData(t,e){return this.oi.delete(e.target),this.ai.Hr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.oi.forEach((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.oi.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.oi.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this.ai.Gr(e,r),S.resolve()}removeMatchingKeys(t,e,r){this.ai.jr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ai.Hr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this.ai.Yr(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this.ai.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(t,e){this.ci={},this.overlays={},this.li=new xr(0),this.hi=!1,this.hi=!0,this.Pi=new cm,this.referenceDelegate=t(this),this.Ti=new mm(this),this.indexManager=new Jf,this.remoteDocumentCache=function(s){return new dm(s)}(r=>this.referenceDelegate.Ii(r)),this.serializer=new Xf(e),this.Ei=new lm(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.hi=!1,Promise.resolve()}get started(){return this.hi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new um,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ci[t.toKey()];return r||(r=new hm(e,this.referenceDelegate),this.ci[t.toKey()]=r),r}getGlobalsCache(){return this.Pi}getTargetCache(){return this.Ti}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ei}runTransaction(t,e,r){k("MemoryPersistence","Starting transaction:",t);const s=new pm(this.li.next());return this.referenceDelegate.di(),r(s).next(o=>this.referenceDelegate.Ai(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ri(t,e){return S.or(Object.values(this.ci).map(r=>()=>r.containsKey(t,e)))}}class pm extends Hd{constructor(t){super(),this.currentSequenceNumber=t}}class Ti{constructor(t){this.persistence=t,this.Vi=new Ei,this.mi=null}static fi(t){return new Ti(t)}get gi(){if(this.mi)return this.mi;throw L(60996)}addReference(t,e,r){return this.Vi.addReference(r,e),this.gi.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.Vi.removeReference(r,e),this.gi.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.gi.add(e.toString()),S.resolve()}removeTarget(t,e){this.Vi.Hr(e.targetId).forEach(s=>this.gi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.gi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}di(){this.mi=new Set}Ai(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.gi,r=>{const s=M.fromPath(r);return this.pi(t,s).next(o=>{o||e.removeEntry(s,O.min())})}).next(()=>(this.mi=null,e.apply(t)))}updateLimboDocument(t,e){return this.pi(t,e).next(r=>{r?this.gi.delete(e.toString()):this.gi.add(e.toString())})}Ii(t){return 0}pi(t,e){return S.or([()=>S.resolve(this.Vi.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ri(t,e)])}}class Sr{constructor(t,e){this.persistence=t,this.yi=new Ee(r=>zd(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=sm(this,e)}static fi(t,e){return new Sr(t,e)}di(){}Ai(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}pr(t){const e=this.Sr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}Sr(t){let e=0;return this.yr(t,r=>{e++}).next(()=>e)}yr(t,e){return S.forEach(this.yi,(r,s)=>this.Dr(t,r,s).next(o=>o?S.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.si(t,a=>this.Dr(t,a,e).next(c=>{c||(r++,o.removeEntry(a,O.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.yi.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),S.resolve()}removeReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.yi.set(e,t.currentSequenceNumber),S.resolve()}Ii(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=lr(t.data.value)),e}Dr(t,e,r){return S.or([()=>this.persistence.Ri(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.yi.get(e);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.ds=r,this.As=s}static Rs(t,e){let r=H(),s=H();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new vi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(){this.Vs=!1,this.fs=!1,this.gs=100,this.ps=function(){return uh()?8:qd(ah())>0?6:4}()}initialize(t,e){this.ys=t,this.indexManager=e,this.Vs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ws(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Ss(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new gm;return this.bs(t,e,a).next(c=>{if(o.result=c,this.fs)return this.Ds(t,e,a,c.size)})}).next(()=>o.result)}Ds(t,e,r,s){return r.documentReadCount<this.gs?(Se()<=j.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Pe(e),"since it only creates cache indexes for collection contains","more than or equal to",this.gs,"documents"),S.resolve()):(Se()<=j.DEBUG&&k("QueryEngine","Query:",Pe(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ps*s?(Se()<=j.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Pe(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):S.resolve())}ws(t,e){if(Ea(e))return S.resolve(null);let r=Dt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=qs(e,null,"F"),r=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=H(...o);return this.ys.getDocuments(t,a).next(c=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.vs(e,c);return this.Cs(e,f,a,h.readTime)?this.ws(t,qs(e,null,"F")):this.Fs(t,f,e,h)}))})))}Ss(t,e,r,s){return Ea(e)||s.isEqual(O.min())?S.resolve(null):this.ys.getDocuments(t,r).next(o=>{const a=this.vs(e,o);return this.Cs(e,a,r,s)?S.resolve(null):(Se()<=j.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Pe(e)),this.Fs(t,a,e,Fd(s,An)).next(c=>c))})}vs(t,e){let r=new ot(Wl(t));return e.forEach((s,o)=>{Fr(t,o)&&(r=r.add(o))}),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}bs(t,e,r){return Se()<=j.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Pe(e)),this.ys.getDocumentsMatchingQuery(t,e,ee.min(),r)}Fs(t,e,r,s){return this.ys.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="LocalStore",_m=3e8;class Em{constructor(t,e,r,s){this.persistence=t,this.Ms=e,this.serializer=s,this.xs=new J(B),this.Os=new Ee(o=>di(o),fi),this.Ns=new Map,this.Bs=t.getRemoteDocumentCache(),this.Ti=t.getTargetCache(),this.Ei=t.getBundleCache(),this.Ls(r)}Ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new am(this.Bs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Ms.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.xs))}}function Tm(n,t,e,r){return new Em(n,t,e,r)}async function Eu(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let h=H();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){c.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({ks:f,removedBatchIds:a,addedBatchIds:c}))})})}function vm(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Bs.newChangeBuffer({trackRemovals:!0});return function(c,h,f,m){const E=f.batch,A=E.keys();let P=S.resolve();return A.forEach(V=>{P=P.next(()=>m.getEntry(h,V)).next(x=>{const D=f.docVersions.get(V);W(D!==null,48541),x.version.compareTo(D)<0&&(E.applyToRemoteDocument(x,f),x.isValidDocument()&&(x.setReadTime(f.commitVersion),m.addEntry(x)))})}),P.next(()=>c.mutationQueue.removeMutationBatch(h,E))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let h=H();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function Tu(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ti.getLastRemoteSnapshotVersion(e))}function Im(n,t){const e=F(n),r=t.snapshotVersion;let s=e.xs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Bs.newChangeBuffer({trackRemovals:!0});s=e.xs;const c=[];t.targetChanges.forEach((m,E)=>{const A=s.get(E);if(!A)return;c.push(e.Ti.removeMatchingKeys(o,m.removedDocuments,E).next(()=>e.Ti.addMatchingKeys(o,m.addedDocuments,E)));let P=A.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(E)!==null?P=P.withResumeToken(dt.EMPTY_BYTE_STRING,O.min()).withLastLimboFreeSnapshotVersion(O.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,r)),s=s.insert(E,P),function(x,D,Q){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=_m?!0:Q.addedDocuments.size+Q.modifiedDocuments.size+Q.removedDocuments.size>0}(A,P,m)&&c.push(e.Ti.updateTargetData(o,P))});let h=qt(),f=H();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),c.push(Am(o,a,t.documentUpdates).next(m=>{h=m.qs,f=m.Qs})),!r.isEqual(O.min())){const m=e.Ti.getLastRemoteSnapshotVersion(o).next(E=>e.Ti.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(m)}return S.waitFor(c).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.xs=s,o))}function Am(n,t,e){let r=H(),s=H();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=qt();return e.forEach((c,h)=>{const f=o.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(O.min())?(t.removeEntry(c,h.readTime),a=a.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(c,h)):k(Ii,"Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)}),{qs:a,Qs:s}})}function wm(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=ui),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function Rm(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Ti.getTargetData(r,t).next(o=>o?(s=o,S.resolve(s)):e.Ti.allocateTargetId(r).next(a=>(s=new Xt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Ti.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.xs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.xs=e.xs.insert(r.targetId,r),e.Os.set(t,r.targetId)),r})}async function Qs(n,t,e){const r=F(n),s=r.xs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ge(a))throw a;k(Ii,`Failed to update sequence numbers for target ${t}: ${a}`)}r.xs=r.xs.remove(t),r.Os.delete(s.target)}function ka(n,t,e){const r=F(n);let s=O.min(),o=H();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,m){const E=F(h),A=E.Os.get(m);return A!==void 0?S.resolve(E.xs.get(A)):E.Ti.getTargetData(f,m)}(r,a,Dt(t)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ti.getMatchingKeysForTargetId(a,c.targetId).next(h=>{o=h})}).next(()=>r.Ms.getDocumentsMatchingQuery(a,t,e?s:O.min(),e?o:H())).next(c=>(Sm(r,df(t),c),{documents:c,$s:o})))}function Sm(n,t,e){let r=n.Ns.get(t)||O.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ns.set(t,r)}class xa{constructor(){this.activeTargetIds=_f()}js(t){this.activeTargetIds=this.activeTargetIds.add(t)}Hs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}zs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Pm{constructor(){this.xo=new xa,this.Oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.xo.js(t),this.Oo[t]||"not-current"}updateQueryState(t,e,r){this.Oo[t]=e}removeLocalQueryTarget(t){this.xo.Hs(t)}isLocalQueryTarget(t){return this.xo.activeTargetIds.has(t)}clearQueryState(t){delete this.Oo[t]}getAllActiveQueryTargets(){return this.xo.activeTargetIds}isActiveQueryTarget(t){return this.xo.activeTargetIds.has(t)}start(){return this.xo=new xa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{No(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na="ConnectivityMonitor";class Ma{constructor(){this.Bo=()=>this.Lo(),this.ko=()=>this.qo(),this.Qo=[],this.$o()}No(t){this.Qo.push(t)}shutdown(){window.removeEventListener("online",this.Bo),window.removeEventListener("offline",this.ko)}$o(){window.addEventListener("online",this.Bo),window.addEventListener("offline",this.ko)}Lo(){k(Na,"Network connectivity changed: AVAILABLE");for(const t of this.Qo)t(0)}qo(){k(Na,"Network connectivity changed: UNAVAILABLE");for(const t of this.Qo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let or=null;function Ws(){return or===null?or=function(){return 268435456+Math.round(2147483648*Math.random())}():or++,"0x"+or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is="RestConnection",bm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Vm{get Uo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Wo=`projects/${r}/databases/${s}`,this.Go=this.databaseId.database===Er?`project_id=${r}`:`project_id=${r}&database_id=${s}`}zo(t,e,r,s,o){const a=Ws(),c=this.jo(t,e.toUriEncodedString());k(Is,`Sending RPC '${t}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Wo,"x-goog-request-params":this.Go};this.Ho(h,s,o);const{host:f}=new URL(c),m=oi(f);return this.Jo(t,c,h,r,m).then(E=>(k(Is,`Received RPC '${t}' ${a}: `,E),E),E=>{throw Me(Is,`RPC '${t}' ${a} failed with error: `,E,"url: ",c,"request:",r),E})}Yo(t,e,r,s,o,a){return this.zo(t,e,r,s,o)}Ho(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+je}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}jo(t,e){const r=bm[t];return`${this.Ko}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(t){this.Zo=t.Zo,this.Xo=t.Xo}e_(t){this.t_=t}n_(t){this.r_=t}i_(t){this.s_=t}onMessage(t){this.o_=t}close(){this.Xo()}send(t){this.Zo(t)}__(){this.t_()}a_(){this.r_()}u_(t){this.s_(t)}c_(t){this.o_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="WebChannelConnection";class km extends Vm{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ws();return new Promise((c,h)=>{const f=new Al;f.setWithCredentials(!0),f.listenOnce(wl.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case ar.NO_ERROR:const E=f.getResponseJson();k(yt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(E)),c(E);break;case ar.TIMEOUT:k(yt,`RPC '${t}' ${a} timed out`),h(new N(C.DEADLINE_EXCEEDED,"Request time out"));break;case ar.HTTP_ERROR:const A=f.getStatus();if(k(yt,`RPC '${t}' ${a} failed with status:`,A,"response text:",f.getResponseText()),A>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const V=P==null?void 0:P.error;if(V&&V.status&&V.message){const x=function(Q){const U=Q.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(U)>=0?U:C.UNKNOWN}(V.status);h(new N(x,V.message))}else h(new N(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new N(C.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:t,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{k(yt,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);k(yt,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)})}T_(t,e,r){const s=Ws(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Pl(),c=Sl(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Ho(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");k(yt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const E=a.createWebChannel(m,h);let A=!1,P=!1;const V=new Dm({Zo:D=>{P?k(yt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(A||(k(yt,`Opening RPC '${t}' stream ${s} transport.`),E.open(),A=!0),k(yt,`RPC '${t}' stream ${s} sending:`,D),E.send(D))},Xo:()=>E.close()}),x=(D,Q,U)=>{D.listen(Q,z=>{try{U(z)}catch(nt){setTimeout(()=>{throw nt},0)}})};return x(E,fn.EventType.OPEN,()=>{P||(k(yt,`RPC '${t}' stream ${s} transport opened.`),V.__())}),x(E,fn.EventType.CLOSE,()=>{P||(P=!0,k(yt,`RPC '${t}' stream ${s} transport closed`),V.u_())}),x(E,fn.EventType.ERROR,D=>{P||(P=!0,Me(yt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),V.u_(new N(C.UNAVAILABLE,"The operation could not be completed")))}),x(E,fn.EventType.MESSAGE,D=>{var Q;if(!P){const U=D.data[0];W(!!U,16349);const z=U,nt=(z==null?void 0:z.error)||((Q=z[0])===null||Q===void 0?void 0:Q.error);if(nt){k(yt,`RPC '${t}' stream ${s} received error:`,nt);const Mt=nt.status;let lt=function(y){const _=rt[y];if(_!==void 0)return au(_)}(Mt),v=nt.message;lt===void 0&&(lt=C.INTERNAL,v="Unknown error status: "+Mt+" with message "+nt.message),P=!0,V.u_(new N(lt,v)),E.close()}else k(yt,`RPC '${t}' stream ${s} received:`,U),V.c_(U)}}),x(c,Rl.STAT_EVENT,D=>{D.stat===Os.PROXY?k(yt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Os.NOPROXY&&k(yt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{V.a_()},0),V}}function As(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(n){return new Lf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.xi=t,this.timerId=e,this.I_=r,this.E_=s,this.d_=o,this.A_=0,this.R_=null,this.V_=Date.now(),this.reset()}reset(){this.A_=0}m_(){this.A_=this.d_}f_(t){this.cancel();const e=Math.floor(this.A_+this.g_()),r=Math.max(0,Date.now()-this.V_),s=Math.max(0,e-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.A_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.R_=this.xi.enqueueAfterDelay(this.timerId,s,()=>(this.V_=Date.now(),t())),this.A_*=this.E_,this.A_<this.I_&&(this.A_=this.I_),this.A_>this.d_&&(this.A_=this.d_)}p_(){this.R_!==null&&(this.R_.skipDelay(),this.R_=null)}cancel(){this.R_!==null&&(this.R_.cancel(),this.R_=null)}g_(){return(Math.random()-.5)*this.A_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La="PersistentStream";class Iu{constructor(t,e,r,s,o,a,c,h){this.xi=t,this.y_=r,this.w_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.S_=0,this.b_=null,this.D_=null,this.stream=null,this.v_=0,this.C_=new vu(t,e)}F_(){return this.state===1||this.state===5||this.M_()}M_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.x_()}async stop(){this.F_()&&await this.close(0)}O_(){this.state=0,this.C_.reset()}N_(){this.M_()&&this.b_===null&&(this.b_=this.xi.enqueueAfterDelay(this.y_,6e4,()=>this.B_()))}L_(t){this.k_(),this.stream.send(t)}async B_(){if(this.M_())return this.close(0)}k_(){this.b_&&(this.b_.cancel(),this.b_=null)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}async close(t,e){this.k_(),this.q_(),this.C_.cancel(),this.S_++,t!==4?this.C_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Ht(e.toString()),Ht("Using maximum backoff delay to prevent overloading the backend."),this.C_.m_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Q_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.i_(e)}Q_(){}auth(){this.state=1;const t=this.U_(this.S_),e=this.S_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.S_===e&&this.K_(r,s)},r=>{t(()=>{const s=new N(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.W_(s)})})}K_(t,e){const r=this.U_(this.S_);this.stream=this.G_(t,e),this.stream.e_(()=>{r(()=>this.listener.e_())}),this.stream.n_(()=>{r(()=>(this.state=2,this.D_=this.xi.enqueueAfterDelay(this.w_,1e4,()=>(this.M_()&&(this.state=3),Promise.resolve())),this.listener.n_()))}),this.stream.i_(s=>{r(()=>this.W_(s))}),this.stream.onMessage(s=>{r(()=>++this.v_==1?this.z_(s):this.onNext(s))})}x_(){this.state=5,this.C_.f_(async()=>{this.state=0,this.start()})}W_(t){return k(La,`close with error: ${t}`),this.stream=null,this.close(4,t)}U_(t){return e=>{this.xi.enqueueAndForget(()=>this.S_===t?e():(k(La,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class xm extends Iu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}G_(t,e){return this.connection.T_("Listen",t,e)}z_(t){return this.onNext(t)}onNext(t){this.C_.reset();const e=Bf(this.serializer,t),r=function(o){if(!("targetChange"in o))return O.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?O.min():a.readTime?kt(a.readTime):O.min()}(t);return this.listener.j_(e,r)}H_(t){const e={};e.database=Ks(this.serializer),e.addTarget=function(o,a){let c;const h=a.target;if(c=Hs(h)?{documents:Hf(o,h)}:{query:qf(o,h).gt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=cu(o,a.resumeToken);const f=js(o,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(O.min())>0){c.readTime=Rr(o,a.snapshotVersion.toTimestamp());const f=js(o,a.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,t);const r=zf(this.serializer,t);r&&(e.labels=r),this.L_(e)}J_(t){const e={};e.database=Ks(this.serializer),e.removeTarget=t,this.L_(e)}}class Nm extends Iu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}Q_(){this.Y_&&this.Z_([])}G_(t,e){return this.connection.T_("Write",t,e)}z_(t){return W(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,W(!t.writeResults||t.writeResults.length===0,55816),this.listener.X_()}onNext(t){W(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.C_.reset();const e=Uf(t.writeResults,t.commitTime),r=kt(t.commitTime);return this.listener.ea(r,e)}ta(){const t={};t.database=Ks(this.serializer),this.L_(t)}Z_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>$f(this.serializer,r))};this.L_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{}class Lm extends Mm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.na=!1}ra(){if(this.na)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.")}zo(t,e,r,s){return this.ra(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.zo(t,zs(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(C.UNKNOWN,o.toString())})}Yo(t,e,r,s,o){return this.ra(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Yo(t,zs(e,r),s,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(C.UNKNOWN,a.toString())})}terminate(){this.na=!0,this.connection.terminate()}}class Om{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.ia=0,this.sa=null,this.oa=!0}_a(){this.ia===0&&(this.aa("Unknown"),this.sa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.sa=null,this.ua("Backend didn't respond within 10 seconds."),this.aa("Offline"),Promise.resolve())))}ca(t){this.state==="Online"?this.aa("Unknown"):(this.ia++,this.ia>=1&&(this.la(),this.ua(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.aa("Offline")))}set(t){this.la(),this.ia=0,t==="Online"&&(this.oa=!1),this.aa(t)}aa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ua(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.oa?(Ht(e),this.oa=!1):k("OnlineStateTracker",e)}la(){this.sa!==null&&(this.sa.cancel(),this.sa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="RemoteStore";class Fm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.ha=[],this.Pa=new Map,this.Ta=new Set,this.Ia=[],this.Ea=o,this.Ea.No(a=>{r.enqueueAndForget(async()=>{ve(this)&&(k(ye,"Restarting streams for network reachability change."),await async function(h){const f=F(h);f.Ta.add(4),await Mn(f),f.da.set("Unknown"),f.Ta.delete(4),await qr(f)}(this))})}),this.da=new Om(r,s)}}async function qr(n){if(ve(n))for(const t of n.Ia)await t(!0)}async function Mn(n){for(const t of n.Ia)await t(!1)}function Au(n,t){const e=F(n);e.Pa.has(t.targetId)||(e.Pa.set(t.targetId,t),Si(e)?Ri(e):Ke(e).M_()&&wi(e,t))}function Ai(n,t){const e=F(n),r=Ke(e);e.Pa.delete(t),r.M_()&&wu(e,t),e.Pa.size===0&&(r.M_()?r.N_():ve(e)&&e.da.set("Unknown"))}function wi(n,t){if(n.Aa.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(O.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ke(n).H_(t)}function wu(n,t){n.Aa.Ke(t),Ke(n).J_(t)}function Ri(n){n.Aa=new kf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>n.Pa.get(t)||null,Pt:()=>n.datastore.serializer.databaseId}),Ke(n).start(),n.da._a()}function Si(n){return ve(n)&&!Ke(n).F_()&&n.Pa.size>0}function ve(n){return F(n).Ta.size===0}function Ru(n){n.Aa=void 0}async function Bm(n){n.da.set("Online")}async function $m(n){n.Pa.forEach((t,e)=>{wi(n,t)})}async function Um(n,t){Ru(n),Si(n)?(n.da.ca(t),Ri(n)):n.da.set("Unknown")}async function Hm(n,t,e){if(n.da.set("Online"),t instanceof uu&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const c of o.targetIds)s.Pa.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Pa.delete(c),s.Aa.removeTarget(c))}(n,t)}catch(r){k(ye,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Pr(n,r)}else if(t instanceof hr?n.Aa.Xe(t):t instanceof lu?n.Aa.ot(t):n.Aa.nt(t),!e.isEqual(O.min()))try{const r=await Tu(n.localStore);e.compareTo(r)>=0&&await function(o,a){const c=o.Aa.It(a);return c.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Pa.get(f);m&&o.Pa.set(f,m.withResumeToken(h.resumeToken,a))}}),c.targetMismatches.forEach((h,f)=>{const m=o.Pa.get(h);if(!m)return;o.Pa.set(h,m.withResumeToken(dt.EMPTY_BYTE_STRING,m.snapshotVersion)),wu(o,h);const E=new Xt(m.target,h,f,m.sequenceNumber);wi(o,E)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){k(ye,"Failed to raise snapshot:",r),await Pr(n,r)}}async function Pr(n,t,e){if(!Ge(t))throw t;n.Ta.add(1),await Mn(n),n.da.set("Offline"),e||(e=()=>Tu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{k(ye,"Retrying IndexedDB access"),await e(),n.Ta.delete(1),await qr(n)})}function Su(n,t){return t().catch(e=>Pr(n,e,t))}async function jr(n){const t=F(n),e=ie(t);let r=t.ha.length>0?t.ha[t.ha.length-1].batchId:ui;for(;qm(t);)try{const s=await wm(t.localStore,r);if(s===null){t.ha.length===0&&e.N_();break}r=s.batchId,jm(t,s)}catch(s){await Pr(t,s)}Pu(t)&&Cu(t)}function qm(n){return ve(n)&&n.ha.length<10}function jm(n,t){n.ha.push(t);const e=ie(n);e.M_()&&e.Y_&&e.Z_(t.mutations)}function Pu(n){return ve(n)&&!ie(n).F_()&&n.ha.length>0}function Cu(n){ie(n).start()}async function zm(n){ie(n).ta()}async function Gm(n){const t=ie(n);for(const e of n.ha)t.Z_(e.mutations)}async function Km(n,t,e){const r=n.ha.shift(),s=gi.from(r,t,e);await Su(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await jr(n)}async function Qm(n,t){t&&ie(n).Y_&&await async function(r,s){if(function(a){return Vf(a)&&a!==C.ABORTED}(s.code)){const o=r.ha.shift();ie(r).O_(),await Su(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await jr(r)}}(n,t),Pu(n)&&Cu(n)}async function Oa(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),k(ye,"RemoteStore received new credentials");const r=ve(e);e.Ta.add(3),await Mn(e),r&&e.da.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ta.delete(3),await qr(e)}async function Wm(n,t){const e=F(n);t?(e.Ta.delete(2),await qr(e)):t||(e.Ta.add(2),await Mn(e),e.da.set("Unknown"))}function Ke(n){return n.Ra||(n.Ra=function(e,r,s){const o=F(e);return o.ra(),new xm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{e_:Bm.bind(null,n),n_:$m.bind(null,n),i_:Um.bind(null,n),j_:Hm.bind(null,n)}),n.Ia.push(async t=>{t?(n.Ra.O_(),Si(n)?Ri(n):n.da.set("Unknown")):(await n.Ra.stop(),Ru(n))})),n.Ra}function ie(n){return n.Va||(n.Va=function(e,r,s){const o=F(e);return o.ra(),new Nm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{e_:()=>Promise.resolve(),n_:zm.bind(null,n),i_:Qm.bind(null,n),X_:Gm.bind(null,n),ea:Km.bind(null,n)}),n.Ia.push(async t=>{t?(n.Va.O_(),await jr(n)):(await n.Va.stop(),n.ha.length>0&&(k(ye,`Stopping write stream with ${n.ha.length} pending writes`),n.ha=[]))})),n.Va}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new te,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,c=new Pi(t,e,a,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ci(n,t){if(Ht("AsyncQueue",`${t}: ${n}`),Ge(n))return new N(C.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{static emptySet(t){return new xe(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||M.comparator(e.key,r.key):(e,r)=>M.comparator(e.key,r.key),this.keyedMap=mn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof xe)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new xe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(){this.ma=new J(M.comparator)}track(t){const e=t.doc.key,r=this.ma.get(e);r?t.type!==0&&r.type===3?this.ma=this.ma.insert(e,t):t.type===3&&r.type!==1?this.ma=this.ma.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ma=this.ma.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ma=this.ma.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ma=this.ma.remove(e):t.type===1&&r.type===2?this.ma=this.ma.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ma=this.ma.insert(e,{type:2,doc:t.doc}):L(63341,{Vt:t,fa:r}):this.ma=this.ma.insert(e,t)}ga(){const t=[];return this.ma.inorderTraversal((e,r)=>{t.push(r)}),t}}class $e{constructor(t,e,r,s,o,a,c,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(c=>{a.push({type:0,doc:c})}),new $e(t,e,xe.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Or(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(){this.pa=void 0,this.ya=[]}wa(){return this.ya.some(t=>t.Sa())}}class Ym{constructor(){this.queries=Ba(),this.onlineState="Unknown",this.ba=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Ba(),o.forEach((a,c)=>{for(const h of c.ya)h.onError(r)})})(this,new N(C.ABORTED,"Firestore shutting down"))}}function Ba(){return new Ee(n=>Ql(n),Or)}async function Jm(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.wa()&&t.Sa()&&(r=2):(o=new Xm,r=t.Sa()?0:1);try{switch(r){case 0:o.pa=await e.onListen(s,!0);break;case 1:o.pa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=Ci(a,`Initialization of query '${Pe(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,o),o.ya.push(t),t.Da(e.onlineState),o.pa&&t.va(o.pa)&&bi(e)}async function Zm(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.ya.indexOf(t);a>=0&&(o.ya.splice(a,1),o.ya.length===0?s=t.Sa()?0:1:!o.wa()&&t.Sa()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function tp(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const c of a.ya)c.va(s)&&(r=!0);a.pa=s}}r&&bi(e)}function ep(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.ya)o.onError(e);r.queries.delete(t)}function bi(n){n.ba.forEach(t=>{t.next()})}var Xs,$a;($a=Xs||(Xs={})).Ca="default",$a.Cache="cache";class np{constructor(t,e,r){this.query=t,this.Fa=e,this.Ma=!1,this.xa=null,this.onlineState="Unknown",this.options=r||{}}va(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new $e(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Ma?this.Oa(t)&&(this.Fa.next(t),e=!0):this.Na(t,this.onlineState)&&(this.Ba(t),e=!0),this.xa=t,e}onError(t){this.Fa.error(t)}Da(t){this.onlineState=t;let e=!1;return this.xa&&!this.Ma&&this.Na(this.xa,t)&&(this.Ba(this.xa),e=!0),e}Na(t,e){if(!t.fromCache||!this.Sa())return!0;const r=e!=="Offline";return(!this.options.La||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Oa(t){if(t.docChanges.length>0)return!0;const e=this.xa&&this.xa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ba(t){t=$e.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Ma=!0,this.Fa.next(t)}Sa(){return this.options.source!==Xs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(t){this.key=t}}class Vu{constructor(t){this.key=t}}class rp{constructor(t,e){this.query=t,this.Ga=e,this.za=null,this.hasCachedResults=!1,this.current=!1,this.ja=H(),this.mutatedKeys=H(),this.Ha=Wl(t),this.Ja=new xe(this.Ha)}get Ya(){return this.Ga}Za(t,e){const r=e?e.Xa:new Fa,s=e?e.Ja:this.Ja;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,E)=>{const A=s.get(m),P=Fr(this.query,E)?E:null,V=!!A&&this.mutatedKeys.has(A.key),x=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let D=!1;A&&P?A.data.isEqual(P.data)?V!==x&&(r.track({type:3,doc:P}),D=!0):this.eu(A,P)||(r.track({type:2,doc:P}),D=!0,(h&&this.Ha(P,h)>0||f&&this.Ha(P,f)<0)&&(c=!0)):!A&&P?(r.track({type:0,doc:P}),D=!0):A&&!P&&(r.track({type:1,doc:A}),D=!0,(h||f)&&(c=!0)),D&&(P?(a=a.add(P),o=x?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{Ja:a,Xa:r,Cs:c,mutatedKeys:o}}eu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Ja;this.Ja=t.Ja,this.mutatedKeys=t.mutatedKeys;const a=t.Xa.ga();a.sort((m,E)=>function(P,V){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Vt:D})}};return x(P)-x(V)}(m.type,E.type)||this.Ha(m.doc,E.doc)),this.tu(r),s=s!=null&&s;const c=e&&!s?this.nu():[],h=this.ja.size===0&&this.current&&!s?1:0,f=h!==this.za;return this.za=h,a.length!==0||f?{snapshot:new $e(this.query,t.Ja,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),ru:c}:{ru:c}}Da(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ja:this.Ja,Xa:new Fa,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{ru:[]}}iu(t){return!this.Ga.has(t)&&!!this.Ja.has(t)&&!this.Ja.get(t).hasLocalMutations}tu(t){t&&(t.addedDocuments.forEach(e=>this.Ga=this.Ga.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ga=this.Ga.delete(e)),this.current=t.current)}nu(){if(!this.current)return[];const t=this.ja;this.ja=H(),this.Ja.forEach(r=>{this.iu(r.key)&&(this.ja=this.ja.add(r.key))});const e=[];return t.forEach(r=>{this.ja.has(r)||e.push(new Vu(r))}),this.ja.forEach(r=>{t.has(r)||e.push(new bu(r))}),e}su(t){this.Ga=t.$s,this.ja=H();const e=this.Za(t.documents);return this.applyChanges(e,!0)}ou(){return $e.fromInitialDocuments(this.query,this.Ja,this.mutatedKeys,this.za===0,this.hasCachedResults)}}const Vi="SyncEngine";class sp{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class ip{constructor(t){this.key=t,this._u=!1}}class op{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.au={},this.uu=new Ee(c=>Ql(c),Or),this.cu=new Map,this.lu=new Set,this.hu=new J(M.comparator),this.Pu=new Map,this.Tu=new Ei,this.Iu={},this.Eu=new Map,this.du=Be.lr(),this.onlineState="Unknown",this.Au=void 0}get isPrimaryClient(){return this.Au===!0}}async function ap(n,t,e=!0){const r=Lu(n);let s;const o=r.uu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.ou()):s=await Du(r,t,e,!0),s}async function lp(n,t){const e=Lu(n);await Du(e,t,!0,!1)}async function Du(n,t,e,r){const s=await Rm(n.localStore,Dt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await up(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Au(n.remoteStore,s),c}async function up(n,t,e,r,s){n.Ru=(E,A,P)=>async function(x,D,Q,U){let z=D.view.Za(Q);z.Cs&&(z=await ka(x.localStore,D.query,!1).then(({documents:v})=>D.view.Za(v,z)));const nt=U&&U.targetChanges.get(D.targetId),Mt=U&&U.targetMismatches.get(D.targetId)!=null,lt=D.view.applyChanges(z,x.isPrimaryClient,nt,Mt);return Ha(x,D.targetId,lt.ru),lt.snapshot}(n,E,A,P);const o=await ka(n.localStore,t,!0),a=new rp(t,o.$s),c=a.Za(o.documents),h=Nn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(c,n.isPrimaryClient,h);Ha(n,e,f.ru);const m=new sp(t,e,a);return n.uu.set(t,m),n.cu.has(e)?n.cu.get(e).push(t):n.cu.set(e,[t]),f.snapshot}async function cp(n,t,e){const r=F(n),s=r.uu.get(t),o=r.cu.get(s.targetId);if(o.length>1)return r.cu.set(s.targetId,o.filter(a=>!Or(a,t))),void r.uu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Qs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Ai(r.remoteStore,s.targetId),Ys(r,s.targetId)}).catch(ze)):(Ys(r,s.targetId),await Qs(r.localStore,s.targetId,!0))}async function hp(n,t){const e=F(n),r=e.uu.get(t),s=e.cu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ai(e.remoteStore,r.targetId))}async function dp(n,t,e){const r=Ep(n);try{const s=await function(a,c){const h=F(a),f=it.now(),m=c.reduce((P,V)=>P.add(V.key),H());let E,A;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let V=qt(),x=H();return h.Bs.getEntries(P,m).next(D=>{V=D,V.forEach((Q,U)=>{U.isValidDocument()||(x=x.add(Q))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,V)).next(D=>{E=D;const Q=[];for(const U of c){const z=Rf(U,E.get(U.key).overlayedDocument);z!=null&&Q.push(new Te(U.key,z,Ul(z.value.mapValue),Bt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,Q,c)}).next(D=>{A=D;const Q=D.applyToLocalDocumentSet(E,x);return h.documentOverlayCache.saveOverlays(P,D.batchId,Q)})}).then(()=>({batchId:A.batchId,changes:Yl(E)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,h){let f=a.Iu[a.currentUser.toKey()];f||(f=new J(B)),f=f.insert(c,h),a.Iu[a.currentUser.toKey()]=f}(r,s.batchId,e),await Ln(r,s.changes),await jr(r.remoteStore)}catch(s){const o=Ci(s,"Failed to persist write");e.reject(o)}}async function ku(n,t){const e=F(n);try{const r=await Im(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Pu.get(o);a&&(W(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a._u=!0:s.modifiedDocuments.size>0?W(a._u,14607):s.removedDocuments.size>0&&(W(a._u,42227),a._u=!1))}),await Ln(e,r,t)}catch(r){await ze(r)}}function Ua(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.uu.forEach((o,a)=>{const c=a.view.Da(t);c.snapshot&&s.push(c.snapshot)}),function(a,c){const h=F(a);h.onlineState=c;let f=!1;h.queries.forEach((m,E)=>{for(const A of E.ya)A.Da(c)&&(f=!0)}),f&&bi(h)}(r.eventManager,t),s.length&&r.au.j_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function fp(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Pu.get(t),o=s&&s.key;if(o){let a=new J(M.comparator);a=a.insert(o,Et.newNoDocument(o,O.min()));const c=H().add(o),h=new Ur(O.min(),new Map,new J(B),a,c);await ku(r,h),r.hu=r.hu.remove(o),r.Pu.delete(t),Di(r)}else await Qs(r.localStore,t,!1).then(()=>Ys(r,t,e)).catch(ze)}async function mp(n,t){const e=F(n),r=t.batch.batchId;try{const s=await vm(e.localStore,t);Nu(e,r,null),xu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Ln(e,s)}catch(s){await ze(s)}}async function pp(n,t,e){const r=F(n);try{const s=await function(a,c){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,c).next(E=>(W(E!==null,37113),m=E.keys(),h.mutationQueue.removeMutationBatch(f,E))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);Nu(r,t,e),xu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Ln(r,s)}catch(s){await ze(s)}}function xu(n,t){(n.Eu.get(t)||[]).forEach(e=>{e.resolve()}),n.Eu.delete(t)}function Nu(n,t,e){const r=F(n);let s=r.Iu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Iu[r.currentUser.toKey()]=s}}function Ys(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.cu.get(t))n.uu.delete(r),e&&n.au.Vu(r,e);n.cu.delete(t),n.isPrimaryClient&&n.Tu.Hr(t).forEach(r=>{n.Tu.containsKey(r)||Mu(n,r)})}function Mu(n,t){n.lu.delete(t.path.canonicalString());const e=n.hu.get(t);e!==null&&(Ai(n.remoteStore,e),n.hu=n.hu.remove(t),n.Pu.delete(e),Di(n))}function Ha(n,t,e){for(const r of e)r instanceof bu?(n.Tu.addReference(r.key,t),gp(n,r)):r instanceof Vu?(k(Vi,"Document no longer in limbo: "+r.key),n.Tu.removeReference(r.key,t),n.Tu.containsKey(r.key)||Mu(n,r.key)):L(19791,{mu:r})}function gp(n,t){const e=t.key,r=e.path.canonicalString();n.hu.get(e)||n.lu.has(r)||(k(Vi,"New document in limbo: "+e),n.lu.add(r),Di(n))}function Di(n){for(;n.lu.size>0&&n.hu.size<n.maxConcurrentLimboResolutions;){const t=n.lu.values().next().value;n.lu.delete(t);const e=new M(tt.fromString(t)),r=n.du.next();n.Pu.set(r,new ip(e)),n.hu=n.hu.insert(e,r),Au(n.remoteStore,new Xt(Dt(mi(e.path)),r,"TargetPurposeLimboResolution",xr.le))}}async function Ln(n,t,e){const r=F(n),s=[],o=[],a=[];r.uu.isEmpty()||(r.uu.forEach((c,h)=>{a.push(r.Ru(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const E=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,E?"current":"not-current")}if(f){s.push(f);const E=vi.Rs(h.targetId,f);o.push(E)}}))}),await Promise.all(a),r.au.j_(s),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",E=>S.forEach(f,A=>S.forEach(A.ds,P=>m.persistence.referenceDelegate.addReference(E,A.targetId,P)).next(()=>S.forEach(A.As,P=>m.persistence.referenceDelegate.removeReference(E,A.targetId,P)))))}catch(E){if(!Ge(E))throw E;k(Ii,"Failed to update sequence numbers: "+E)}for(const E of f){const A=E.targetId;if(!E.fromCache){const P=m.xs.get(A),V=P.snapshotVersion,x=P.withLastLimboFreeSnapshotVersion(V);m.xs=m.xs.insert(A,x)}}}(r.localStore,o))}async function yp(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){k(Vi,"User change. New user:",t.toKey());const r=await Eu(e.localStore,t);e.currentUser=t,function(o,a){o.Eu.forEach(c=>{c.forEach(h=>{h.reject(new N(C.CANCELLED,a))})}),o.Eu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Ln(e,r.ks)}}function _p(n,t){const e=F(n),r=e.Pu.get(t);if(r&&r._u)return H().add(r.key);{let s=H();const o=e.cu.get(t);if(!o)return s;for(const a of o){const c=e.uu.get(a);s=s.unionWith(c.view.Ya)}return s}}function Lu(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=ku.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=_p.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=fp.bind(null,t),t.au.j_=tp.bind(null,t.eventManager),t.au.Vu=ep.bind(null,t.eventManager),t}function Ep(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=mp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=pp.bind(null,t),t}class Cr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Hr(t.databaseInfo.databaseId),this.sharedClientState=this.pu(t),this.persistence=this.yu(t),await this.persistence.start(),this.localStore=this.wu(t),this.gcScheduler=this.Su(t,this.localStore),this.indexBackfillerScheduler=this.bu(t,this.localStore)}Su(t,e){return null}bu(t,e){return null}wu(t){return Tm(this.persistence,new ym,t.initialUser,this.serializer)}yu(t){return new _u(Ti.fi,this.serializer)}pu(t){return new Pm}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cr.provider={build:()=>new Cr};class Tp extends Cr{constructor(t){super(),this.cacheSizeBytes=t}Su(t,e){W(this.persistence.referenceDelegate instanceof Sr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new nm(r,t.asyncQueue,e)}yu(t){const e=this.cacheSizeBytes!==void 0?It.withCacheSize(this.cacheSizeBytes):It.DEFAULT;return new _u(r=>Sr.fi(r,e),this.serializer)}}class Js{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ua(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=yp.bind(null,this.syncEngine),await Wm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Ym}()}createDatastore(t){const e=Hr(t.databaseInfo.databaseId),r=function(o){return new km(o)}(t.databaseInfo);return function(o,a,c,h){return new Lm(o,a,c,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,c){return new Fm(r,s,o,a,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Ua(this.syncEngine,e,0),function(){return Ma.C()?new Ma:new Cm}())}createSyncEngine(t,e){return function(s,o,a,c,h,f,m){const E=new op(s,o,a,c,h,f);return m&&(E.Au=!0),E}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);k(ye,"RemoteStore shutting down."),o.Ta.add(5),await Mn(o),o.Ea.shutdown(),o.da.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Js.provider={build:()=>new Js};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.vu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.vu(this.observer.error,t):Ht("Uncaught Error in snapshot listener:",t.toString()))}Cu(){this.muted=!0}vu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe="FirestoreClient";class Ip{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=_t.UNAUTHENTICATED,this.clientId=Dl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{k(oe,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(k(oe,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new te;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ci(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function ws(n,t){n.asyncQueue.verifyOperationInProgress(),k(oe,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Eu(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function qa(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Ap(n);k(oe,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>Oa(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Oa(t.remoteStore,s)),n._onlineComponents=t}async function Ap(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k(oe,"Using user provided OfflineComponentProvider");try{await ws(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Me("Error using user provided cache. Falling back to memory cache: "+e),await ws(n,new Cr)}}else k(oe,"Using default OfflineComponentProvider"),await ws(n,new Tp(void 0));return n._offlineComponents}async function Ou(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k(oe,"Using user provided OnlineComponentProvider"),await qa(n,n._uninitializedComponentsProvider._online)):(k(oe,"Using default OnlineComponentProvider"),await qa(n,new Js))),n._onlineComponents}function wp(n){return Ou(n).then(t=>t.syncEngine)}async function Rp(n){const t=await Ou(n),e=t.eventManager;return e.onListen=ap.bind(null,t.syncEngine),e.onUnlisten=cp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=lp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=hp.bind(null,t.syncEngine),e}function Sp(n,t,e={}){const r=new te;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,h,f){const m=new vp({next:A=>{m.Cu(),a.enqueueAndForget(()=>Zm(o,E));const P=A.docs.has(c);!P&&A.fromCache?f.reject(new N(C.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&A.fromCache&&h&&h.source==="server"?f.reject(new N(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(A)},error:A=>f.reject(A)}),E=new np(mi(c.path),m,{includeMetadataChanges:!0,La:!0});return Jm(o,E)}(await Rp(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fu(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(n,t,e){if(!e)throw new N(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Cp(n,t,e,r){if(t===!0&&r===!0)throw new N(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function za(n){if(!M.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ki(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function bn(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ki(n);throw new N(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="firestore.googleapis.com",Ga=!0;class Ka{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new N(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Bu,this.ssl=Ga}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:Ga;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=yu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<tm)throw new N(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Cp("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Fu((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class xi{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ka({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ka(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bd;switch(r.type){case"firstParty":return new xd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=ja.get(e);r&&(k("ComponentProvider","Removing Datastore"),ja.delete(e),r.terminate())}(this),Promise.resolve()}}function bp(n,t,e,r={}){var s;n=bn(n,xi);const o=oi(t),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(nh(`https://${h}`),oh("Firestore",!0)),a.host!==Bu&&a.host!==h&&Me("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!mr(f,c)&&(n._setSettings(f),r.mockUserToken)){let m,E;if(typeof r.mockUserToken=="string")m=r.mockUserToken,E=_t.MOCK_USER;else{m=rh(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const A=r.mockUserToken.sub||r.mockUserToken.user_id;if(!A)throw new N(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");E=new _t(A)}n._authCredentials=new Vd(new bl(m,E))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Ni(this.firestore,t,this._query)}}class Rt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Rt(this.firestore,t,this._key)}}class Vn extends Ni{constructor(t,e,r){super(t,e,mi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Rt(this.firestore,null,new M(t))}withConverter(t){return new Vn(this.firestore,t,this._path)}}function Vp(n,t,...e){if(n=pr(n),arguments.length===1&&(t=Dl.newId()),Pp("doc","path",t),n instanceof xi){const r=tt.fromString(t,...e);return za(r),new Rt(n,null,new M(r))}{if(!(n instanceof Rt||n instanceof Vn))throw new N(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(tt.fromString(t,...e));return za(r),new Rt(n.firestore,n instanceof Vn?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="AsyncQueue";class Wa{constructor(t=Promise.resolve()){this.zu=[],this.ju=!1,this.Hu=[],this.Ju=null,this.Yu=!1,this.Zu=!1,this.Xu=[],this.C_=new vu(this,"async_queue_retry"),this.ec=()=>{const r=As();r&&k(Qa,"Visibility state changed to "+r.visibilityState),this.C_.p_()},this.tc=t;const e=As();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ec)}get isShuttingDown(){return this.ju}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.nc(),this.rc(t)}enterRestrictedMode(t){if(!this.ju){this.ju=!0,this.Zu=t||!1;const e=As();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.ec)}}enqueue(t){if(this.nc(),this.ju)return new Promise(()=>{});const e=new te;return this.rc(()=>this.ju&&this.Zu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.zu.push(t),this.sc()))}async sc(){if(this.zu.length!==0){try{await this.zu[0](),this.zu.shift(),this.C_.reset()}catch(t){if(!Ge(t))throw t;k(Qa,"Operation failed with retryable error: "+t)}this.zu.length>0&&this.C_.f_(()=>this.sc())}}rc(t){const e=this.tc.then(()=>(this.Yu=!0,t().catch(r=>{throw this.Ju=r,this.Yu=!1,Ht("INTERNAL UNHANDLED ERROR: ",Xa(r)),r}).then(r=>(this.Yu=!1,r))));return this.tc=e,e}enqueueAfterDelay(t,e,r){this.nc(),this.Xu.indexOf(t)>-1&&(e=0);const s=Pi.createAndSchedule(this,t,e,r,o=>this.oc(o));return this.Hu.push(s),s}nc(){this.Ju&&L(47125,{_c:Xa(this.Ju)})}verifyOperationInProgress(){}async ac(){let t;do t=this.tc,await t;while(t!==this.tc)}uc(t){for(const e of this.Hu)if(e.timerId===t)return!0;return!1}cc(t){return this.ac().then(()=>{this.Hu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Hu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.ac()})}lc(t){this.Xu.push(t)}oc(t){const e=this.Hu.indexOf(t);this.Hu.splice(e,1)}}function Xa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Mi extends xi{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new Wa,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Wa(t),this._firestoreClient=void 0,await t}}}function Dp(n,t){const e=typeof n=="object"?n:gd(),r=typeof n=="string"?n:Er,s=hd(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=th("firestore");o&&bp(s,...o)}return s}function $u(n){if(n._terminated)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||kp(n),n._firestoreClient}function kp(n){var t,e,r;const s=n._freezeSettings(),o=function(c,h,f,m){return new Qd(c,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Fu(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Ip(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ue(dt.fromBase64String(t))}catch(e){throw new N(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ue(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp=/^__.*__$/;class Np{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Te(t,this.data,this.fieldMask,e,this.fieldTransforms):new xn(t,this.data,e,this.fieldTransforms)}}function Hu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{hc:n})}}class Bi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Pc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get hc(){return this.settings.hc}Tc(t){return new Bi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ic(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Tc({path:r,Ec:!1});return s.dc(t),s}Ac(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Tc({path:r,Ec:!1});return s.Pc(),s}Rc(t){return this.Tc({path:void 0,Ec:!0})}Vc(t){return br(t,this.settings.methodName,this.settings.mc||!1,this.path,this.settings.fc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Pc(){if(this.path)for(let t=0;t<this.path.length;t++)this.dc(this.path.get(t))}dc(t){if(t.length===0)throw this.Vc("Document fields must not be empty");if(Hu(this.hc)&&xp.test(t))throw this.Vc('Document fields cannot begin and end with "__"')}}class Mp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Hr(t)}gc(t,e,r,s=!1){return new Bi({hc:t,methodName:e,fc:r,path:ht.emptyPath(),Ec:!1,mc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Lp(n){const t=n._freezeSettings(),e=Hr(n._databaseId);return new Mp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Op(n,t,e,r,s,o={}){const a=n.gc(o.merge||o.mergeFields?2:0,t,e,s);Gu("Data must be an object, but it was:",a,r);const c=ju(r,a);let h,f;if(o.merge)h=new Ct(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const E of o.mergeFields){const A=Fp(t,E,e);if(!a.contains(A))throw new N(C.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);$p(m,A)||m.push(A)}h=new Ct(m),f=a.fieldTransforms.filter(E=>h.covers(E.field))}else h=null,f=a.fieldTransforms;return new Np(new wt(c),h,f)}function qu(n,t){if(zu(n=pr(n)))return Gu("Unsupported field value:",t,n),ju(n,t);if(n instanceof Uu)return function(r,s){if(!Hu(s.hc))throw s.Vc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Vc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.Ec&&t.hc!==4)throw t.Vc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const c of r){let h=qu(c,s.Rc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=pr(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ef(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=it.fromDate(r);return{timestampValue:Rr(s.serializer,o)}}if(r instanceof it){const o=new it(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rr(s.serializer,o)}}if(r instanceof Oi)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ue)return{bytesValue:cu(s.serializer,r._byteString)};if(r instanceof Rt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Vc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:_i(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Fi)return function(a,c){return{mapValue:{fields:{[Bl]:{stringValue:$l},[Tr]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw c.Vc("VectorValues must only contain numeric values.");return pi(c.serializer,f)})}}}}}}(r,s);throw s.Vc(`Unsupported field value: ${ki(r)}`)}(n,t)}function ju(n,t){const e={};return xl(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):_e(n,(r,s)=>{const o=qu(s,t.Ic(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function zu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof it||n instanceof Oi||n instanceof Ue||n instanceof Rt||n instanceof Uu||n instanceof Fi)}function Gu(n,t,e){if(!zu(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const r=ki(e);throw r==="an object"?t.Vc(n+" a custom object"):t.Vc(n+" "+r)}}function Fp(n,t,e){if((t=pr(t))instanceof Li)return t._internalPath;if(typeof t=="string")return Ku(n,t);throw br("Field path arguments must be of type string or ",n,!1,void 0,e)}const Bp=new RegExp("[~\\*/\\[\\]]");function Ku(n,t,e){if(t.search(Bp)>=0)throw br(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Li(...t.split("."))._internalPath}catch{throw br(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function br(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new N(C.INVALID_ARGUMENT,c+n+h)}function $p(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Up(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Wu("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Up extends Qu{data(){return super.data()}}function Wu(n,t){return typeof t=="string"?Ku(n,t):t instanceof Li?t._internalPath:t._delegate._internalPath}class Hp{convertValue(t,e="none"){switch(se(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(re(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return _e(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e[Tr].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>et(a.doubleValue));return new Fi(o)}convertGeoPoint(t){return new Oi(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Mr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(wn(t));default:return null}}convertTimestamp(t){const e=ne(t);return new it(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=tt.fromString(t);W(gu(r),9688,{name:t});const s=new Rn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return s.isEqual(e)||Ht(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(n,t,e){let r;return r=n?n.toFirestore(t):t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Xu extends Qu{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new zp(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Wu("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class zp extends Xu{data(t={}){return super.data(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(n){n=bn(n,Rt);const t=bn(n.firestore,Mi);return Sp($u(t),n._key).then(e=>Wp(t,n,e))}class Gp extends Hp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ue(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Rt(this.firestore,null,e)}}function Kp(n,t,e){n=bn(n,Rt);const r=bn(n.firestore,Mi),s=qp(n.converter,t);return Qp(r,[Op(Lp(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Bt.none())])}function Qp(n,t){return function(r,s){const o=new te;return r.asyncQueue.enqueueAndForget(async()=>dp(await wp(r),s,o)),o.promise}($u(n),t)}function Wp(n,t,e){const r=e.docs.get(t._key),s=new Gp(n);return new Xu(n,s,t._key,r,new jp(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(s){je=s})(pd),yr(new vn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new Mi(new Dd(r.getProvider("auth-internal")),new Nd(a,r.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new N(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Rn(f.options.projectId,m)}(a,s),a);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),ke(na,ra,t),ke(na,ra,"esm2017")})();const Xp={apiKey:"AIzaSyCgeIZwuyIF3cvaE5gkSRK8GW8wYZgB7TM",authDomain:"first-rpg-ae688.firebaseapp.com",projectId:"first-rpg-ae688",storageBucket:"first-rpg-ae688.firebasestorage.app",messagingSenderId:"357652321948",appId:"1:357652321948:web:6a4d46e195336bc3ab3f59",measurementId:"G-6X215LJ64N"},Yp=El(Xp),Jp=Dp(Yp),Yu=async n=>{if(!n.playerName||n.playerName.trim()===""){console.warn("[SAVE] playerName が空のため保存スキップ");return}const t=Vp(Jp,"saves",n.playerName);await Kp(t,n)};async function Zp(n){const{defaultAttackBtn:t,nextStageBtn:e,battleLogArea:r,afterBattleLogArea:s,toggleArea:o}=ae();t.style.display="none",t.ariaDisabled="true",o.style.display="none",e.style.display="none",r.style.display="",s.style.display="none",$t("ダンジョンクリア！！🎉","おめでとう！！！");const a=jt(),c={playerName:a.name,maxHp:a.maxHp,maxMp:a.maxMp,hp:a.hp,mp:a.mp,physicalStrength:a.physicalStrength,magicalStrength:a.magicalStrength,defense:a.defense,speed:a.speed,isPlayer:a.isPlayer,inventory:a.inventory,equipment:a.equipment,skills:a.skills.map(f=>f.skillId),currentStage:n,deathCount:a.deathCount,lastClearedFloor:a.lastClearedFloor};await Yu(c);const h=document.getElementById("game-reset");h&&h.addEventListener("click",()=>{window.location.href="safezone.html"})}function $i(n,t=null,e=!1){if(n.hp>0||!e)return;ei();const r=jt();let s;if(r instanceof Object&&"inventory"in r)s=r;else return;const{defaultAttackBtn:o,nextStageBtn:a,battleLogArea:c,afterBattleLogArea:h,backgroundLogArea:f,skillArea:m}=ae();if(m.style.display="none",c.style.display="none",o.style.display="none",o.ariaDisabled="true",h.style.display="block",f.style.display="none",n.hp=0,n.isPlayer)c.style.display="block",h.style.display="none",K(`<h1>${n.name} は倒された</h1>`,"5秒後に引き継ぎアイテム選択画面に移動します"),setTimeout(eg,5e3);else{qc(),tg(0),Dn.style.opacity="1",ol("セーフティーエリア");const E=Math.floor(s.maxHp*.2),A=Math.floor(s.maxMp*.2);if(s.hp=Math.min(s.hp+E,s.maxHp),s.mp=Math.min(s.mp+A,s.maxMp),t&&a.style.display==="")al(),K(`${n.name} は倒された`),K("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。"),K(`勝利ボーナス！HPが${E}、MPが${A}回復した！`,""),rl(s);else if(a.style.display==="none"&&h.style.display==="none")$t("外に出よう");else{K(`${n.name} は倒された`),K("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。",""),K(`勝利ボーナス！HPが${E}、MPが${A}回復した！`,""),rl(s);return}bt()}}async function tg(n){const t=Dr[n];if(console.log(n,t),!t)Zp(n);else{const{nextStageBtn:e}=ae();e.style.display="block"}n++}async function eg(){const n=jt(),t={playerName:n.name,maxHp:n.maxHp,maxMp:n.maxMp,hp:n.hp,mp:n.mp,physicalStrength:n.physicalStrength,magicalStrength:n.magicalStrength,defense:n.defense,speed:n.speed,isPlayer:n.isPlayer,inventory:n.inventory,equipment:n.equipment,skills:n.skills.map(r=>r.skillId),currentStage:0,deathCount:n.deathCount,lastClearedFloor:n.lastClearedFloor};await Yu(t);const e=document.getElementById("game-reset");e&&e.addEventListener("click",()=>{window.location.href="safezone.html"})}function Zs(n,t,e){const r=ll[n],s=jt();if(!r){$t("スキルが見つかりません！","");return}const o=t,a=e;let c=!0;if(o.mp<r.mpCost)if(o.mp<=0&&(o.mp=0),K(`${o.name}はスキルを発動！`,`しかし、${o.name} はMPが足りない！`),o.isPlayer)c=!1,Ne();else{c=!1;return}else De(),o.mp-=r.mpCost;if(c){let h=r.power(o);a.hp<=h&&(h=a.hp),a.hp-=h,r.skillType==="heal"?r.log(r.name,o,a||null,r.power(o)):r.log(r.name,o,a,h),a.hp>0&&o===s?(Ve(),Ne(900)):a.hp>0&&hl(),a.hp<=0&&r.skillType!=="heal"&&(a.hp=0,setTimeout(()=>{const f=typeof r.log=="function"?()=>r.log(r.name,o,a,h):null;setTimeout(()=>{$i(a,f,!0)},1e3)},800))}He(),bt(St)}const Ya=document.getElementById("instruction-border"),ng=document.getElementById("instruction");function Ju(n,t){n.innerText="",t.forEach((e,r)=>{const s=document.createElement("button");s.innerHTML=`${e.name} <br>（消費MP:${e.mpCost}）`,s.addEventListener("mouseover",()=>{Ya.style.display="block",ng.innerText=e.Instruction}),s.addEventListener("mouseleave",()=>{Ya.style.display="none"}),s.addEventListener("click",()=>{const o=jt(),a=kr();De(),Ve(),Zs(r,o,a)}),n.appendChild(s)}),bt(St)}function rg(n){n.addEventListener("click",()=>{De();const t=jt(),e=kr(),r=Math.max(t.physicalStrength-e.defense,1);if(e.hp-=r,e.hp<=0&&(e.hp=0),K(`${t.name} の攻撃！${e.name} に ${r} ダメージ！ 
(${e.name}のHP：${e.hp})`),bt(St),e.hp<=0){setTimeout(()=>{$i(e,null,!0)},1e3);return}else Ne();bt(St),Ve(),He()})}function sg(){const n=jt();let t;if(n instanceof Object&&"inventory"in n)t=n;else throw new Error("Player の取得に失敗しました");const e=kr();let r;if(e instanceof Object)r=e;else throw new Error("Enemy の取得に失敗しました");if(r.hp<=0)return;let s;if(r.hp>=r.maxHp*.7?s=Math.random()<.95?"attack":"heal":r.hp<=r.maxHp*.3?s=Math.random()<.4?"attack":"heal":s=Math.random()<.7?"attack":"heal",s==="attack")if(Math.random()<(r.hp>=r.maxHp*.7?.05:r.hp<=r.maxHp*.3?.5:.3)){const a=Math.floor(Math.random()*100),c=a<50?0:a<80?1:2;Zs(c,r,t),qo()}else{const a=Math.max(r.physicalStrength-t.defense,1);if(t.hp-=a,K(`${r.name} の攻撃！${t.name} は${a} ダメージを受けた！<br>(${t.name}のHP：${t.hp})`),t.hp<=0){ei(),t.hp=0,$i(t,null,!0);return}}else Zs(3,r,t),qo();bt(St),hl(),He()}function Ne(n=900){setTimeout(()=>{sg()},n)}class zr{constructor(t,e,r,s,o,a,c){$(this,"name");$(this,"characterType");$(this,"hp");$(this,"maxHp");$(this,"mp");$(this,"maxMp");$(this,"physicalStrength");$(this,"magicalStrength");$(this,"defense");$(this,"speed");$(this,"isPlayer",!0);$(this,"equipment",[]);$(this,"inventory",[]);$(this,"skills",[]);$(this,"currentStage",0);$(this,"deathCount",0);$(this,"lastClearedFloor",0);this.name=t,this.hp=e,this.maxHp=e,this.mp=r,this.maxMp=r,this.physicalStrength=s,this.magicalStrength=o,this.defense=a,this.speed=c}static fromSaveData(t){const e=new zr(t.playerName,t.hp,t.mp,t.physicalStrength,t.magicalStrength,t.defense,t.speed);return e.maxHp=t.maxHp,e.maxMp=t.maxMp,e.inventory=t.inventory.map(kn.fromData),e.equipment=t.equipment.map(kn.fromData),e.currentStage=t.currentStage,e.deathCount=t.deathCount,e.lastClearedFloor=t.lastClearedFloor,e}addSkill(t){this.skills.find(e=>e.skillId===t.skillId)||this.skills.push(t)}addSkillById(t){const e=ll.find(r=>r.skillId===t);e&&!this.skills.find(r=>r.skillId===e.skillId)&&this.skills.push(e)}recordDeath(){this.deathCount++}updateClearedFloor(t){t>this.lastClearedFloor&&(this.lastClearedFloor=t)}getPlayerStatus(){return`HP: ${this.hp}/${this.maxHp}, MP: ${this.mp}/${this.maxMp}`}healItem(t){if(De(),Ve(),t.itemType==="hpHeal"){const e=t.effect.hp??0;this.hp=Math.min(this.hp+e,this.maxHp),K(`${this.name} は ${t.itemName} を使い、HPを${e}回復した！`,"")}else if(t.itemType==="mpHeal"){const e=t.effect.mp??0;this.mp=Math.min(this.mp+e,this.maxMp),K(`${this.name} は ${t.itemName} を使い、MPを${e}回復した！`,"")}else if(t.itemType==="bothHeal"){const e=t.effect.hp??0,r=t.effect.mp??0;this.hp=Math.min(this.hp+e,this.maxHp),this.mp=Math.min(this.mp+r,this.maxMp),K(`${this.name} は ${t.itemName} を使い、HP${e}・MP${r}回復した！`,"")}Ne(900)}equipItem(t){if(De(),Ve(),this.equipment.find(r=>r.equipmentType===t.equipmentType)){$t("すでにその装備は装備中です");return}this.physicalStrength+=t.effect.physicalStrength||0,this.defense+=t.effect.defense||0,this.speed+=t.effect.speed||0,t.isEquipped=!0,this.equipment.push(t),K(`${t.itemName} を装備した！`),Ne(900)}unequipItem(t){ti.style.display="none",De(),Ve(),this.physicalStrength-=t.effect.physicalStrength||0,this.defense-=t.effect.defense||0,t.isEquipped=!1;const e=this.equipment.indexOf(t);e!==-1&&this.equipment.splice(e,1);const r=this.inventory.find(s=>s.itemName===t.itemName);r?r.amount+=1:this.inventory.push(new Vr(t.itemName,t.itemType,t.equipmentType,t.effect,1,t.rarity,t.instructionText)),K(`${t.itemName} を外し、インベントリに戻した`),Ne(1e3)}}class ig{constructor(t,e,r,s,o,a,c,h){$(this,"name");$(this,"characterType");$(this,"hp");$(this,"maxHp");$(this,"mp");$(this,"maxMp");$(this,"physicalStrength");$(this,"magicalStrength");$(this,"defense");$(this,"speed");$(this,"isPlayer",!1);this.name=t,this.characterType=e,this.hp=r,this.maxHp=r,this.mp=s,this.maxMp=s,this.physicalStrength=o,this.magicalStrength=a,this.defense=c,this.speed=h}getEnemyStatus(){return`${this.name}（${this.characterType}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`}}function Ui(n){return new ig(n.name,n.characterType,n.hp,n.mp,n.physicalStrength,n.magicalStrength,n.defense,n.hitRate??80)}function og(){[{btnId:"toggle-heal-items",listId:"heal-items",label:"回復アイテム一覧"},{btnId:"toggle-equip-items",listId:"equip-items",label:"装備アイテム一覧"},{btnId:"toggle-skill-btn",listId:"skill-list",label:"スキル一覧"},{btnId:"background-button",listId:"background-log-area",label:"バトルログ履歴"}].forEach(({btnId:t,listId:e,label:r})=>{const s=document.getElementById(t),o=document.getElementById(e);s.textContent=`▶︎ ${r}`,o.classList.add("hidden"),s.addEventListener("click",()=>{const a=o.classList.toggle("hidden");s.textContent=a?`▶︎ ${r}`:`▼ ${r}を閉じる`;const{battleLogArea:c}=ae();t==="background-button"&&!a?c.style.display="none":t==="background-button"&&a&&(c.style.display="block")})})}const Rs=document.getElementById("back-floor-btn");Rs==null||Rs.addEventListener("click",()=>{window.location.href="/"});function ag(n,t){n.addEventListener("click",()=>{const{skillArea:e,defaultAttackBtn:r,backgroundLogArea:s}=ae();s.style.display="block",r.style.display="block",e.style.display="block",t()})}const Ja=document.querySelector(".battle-area"),Dn=document.getElementById("toggle-area");document.getElementById("toggle-heal-items");document.getElementById("toggle-equip-items");const ti=document.getElementById("default-attack"),lg=document.getElementById("skill-area"),Za=document.getElementById("battle-log"),tl=document.getElementById("after-battle-log"),ug=document.getElementById("background-area"),cg=document.getElementById("player-status"),el=document.getElementById("next-stage"),hg=document.getElementById("enemy-status"),dg=document.getElementById("equipped-items"),nl=document.getElementById("skill-list"),fg=document.getElementById("heal-items"),mg=document.getElementById("equip-items"),St={playerStatus:cg,enemyStatus:hg,healItemsDiv:fg,equipItemsDiv:mg,equippedDiv:dg};location.pathname.includes("battleDisplay.html")&&pg();async function pg(){const n=document.getElementById("game-over-display");n.style.display="none";const t=localStorage.getItem("playerData"),e=location.pathname.includes("battleDisplay.html");if(!t||!e){alert("セーフティエリアから開始してください！"),window.location.href="/";return}const r=JSON.parse(t),s=zr.fromSaveData(r);gg(s)}function gg(n){const t=Ui(Dr[0]);ul(n,t),yg()}async function yg(){Ja.style.display="",Oc({battleLog:Za,afterBattleLog:tl});const n=Ui(Dr[0]);cl(n),Ju(nl,ni),rg(ti),og(),ag(el,Hc),Uc({defaultAttackBtn:ti,nextStageBtn:el,battleArea:Ja,toggleArea:Dn,battleLogArea:Za,afterBattleLogArea:tl,backgroundLogArea:ug,skillArea:lg,skillDiv:nl,uiElements:St}),bt(St)}const _g=[{name:"HPの実",itemType:"hpHeal",effect:{hp:30},amount:0,rarity:"common",instructionText:"レアリティ：一般級。HPを30回復する。"},{name:"HPジャム",itemType:"hpHeal",effect:{hp:80},amount:0,rarity:"uncommon",instructionText:"レアリティ：希少級。HPを80回復する。"},{name:"HPポーション",itemType:"hpHeal",effect:{hp:200},amount:0,rarity:"rare",instructionText:"レアリティ：上級。HPを200回復する。"},{name:"MPの実",itemType:"mpHeal",effect:{mp:10},amount:0,rarity:"common",instructionText:"レアリティ：一般級。MPを10回復する。"},{name:"MPジャム",itemType:"mpHeal",effect:{mp:30},amount:0,rarity:"uncommon",instructionText:"レアリティ：希少級。MPを30回復する。"},{name:"MPポーション",itemType:"mpHeal",effect:{mp:60},amount:0,rarity:"rare",instructionText:"レアリティ：上級。MPを60回復する。"},{name:"エリクサー",itemType:"bothHeal",effect:{hp:500,mp:500},amount:0,rarity:"legendary",instructionText:"レアリティ：伝説級。MPを500回復する。"}],Eg=[{name:"木の棒",itemType:"equipment",equipmentType:"sword",effect:{physicalStrength:5},amount:0,rarity:"common",instructionText:"分類：剣。 レアリティ：一般。 攻撃力＋５"},{name:"欠けた鉄鎧",itemType:"equipment",equipmentType:"armor",effect:{defense:8,speed:-3},amount:0,rarity:"rare",instructionText:"分類：鎧。 レアリティ：上級。 防御力＋８、スピード−３"},{name:"ハゲた兜",itemType:"equipment",equipmentType:"helmet",effect:{defense:4},amount:0,rarity:"uncommon",instructionText:"分類：兜。 レアリティ：希少級。 防御力＋４"},{name:"穴の空いた革靴",itemType:"equipment",equipmentType:"shoes",effect:{defense:2,speed:5},amount:0,rarity:"common",instructionText:"分類：靴。 レアリティ：一般級。 防御力＋４"},{name:"弦が切れそうな弓",itemType:"equipment",equipmentType:"bow",effect:{physicalStrength:10,hitRate:-5},amount:0,rarity:"rare",instructionText:"分類：剣。 レアリティ：上級。 攻撃力＋50。"},{name:"エクスカリバー",itemType:"equipment",equipmentType:"sword",effect:{physicalStrength:50},amount:0,rarity:"legendary",instructionText:"分類：剣。 レアリティ：伝説級。 攻撃力＋50。"}];class kn{constructor(t,e,r,s,o,a){$(this,"itemName");$(this,"itemType");$(this,"effect");$(this,"amount");$(this,"rarity");$(this,"instructionText");$(this,"isEquipped",!1);this.itemName=t,this.itemType=e,this.effect=r,this.amount=s,this.rarity=o,this.instructionText=a}static fromData(t){if(t.itemType==="hpHeal"||t.itemType==="mpHeal"||t.itemType==="bothHeal")return new Zu(t.itemName,t.itemType,t.effect,t.amount,t.rarity,t.instructionText);if(t.itemType==="equipment")return new Vr(t.itemName,t.itemType,t.equipmentType||"",t.effect,t.amount,t.rarity,t.instructionText);throw new Error(`[Item.fromData] 未知の itemType: ${t.itemType}`)}toSerialized(){return{itemName:this.itemName,itemType:this.itemType,equipmentType:this instanceof Vr?this.equipmentType??"":void 0,effect:this.effect,amount:this.amount,rarity:this.rarity,instructionText:this.instructionText}}showAmount(){return`${this.itemName}：${this.amount} 個`}}class Zu extends kn{constructor(t,e,r,s,o,a){super(t,e,r,s,o,a)}}class Vr extends kn{constructor(e,r,s,o,a,c,h){super(e,r,o,a,c,h);$(this,"equipmentType");$(this,"isEquipped");this.equipmentType=s,this.isEquipped=!1}}const Tg=_g.map(n=>new Zu(n.name,n.itemType,n.effect,n.amount,n.rarity,n.instructionText)),vg=Eg.map(n=>new Vr(n.name,n.itemType,n.equipmentType??null,n.effect,n.amount,n.rarity,n.instructionText)),Ig=[...Tg,...vg];function Ag(n,t){const e=t.reduce((o,a)=>o+a,0),r=Math.random()*e;let s=0;for(let o=0;o<n.length;o++)if(s+=t[o],r<s)return n[o];return n[n.length-1]}function rl(n){const t=Ig,e={common:.6,uncommon:.3,rare:.15,epic:.05,legendary:.02},r=t.map(a=>e[a.rarity]||.6),s=Ag(t,r);console.log("【DEBUG】選ばれたdroppedItem：",s);const o=n.inventory.find(a=>a.itemName===s.itemName);o?o.amount+=1:n.inventory.push(new kn(s.itemName,s.itemType,s.effect,1,s.rarity,s.instructionText)),$t(`ドロップ報酬：${s.itemName}（${s.rarity}）を手に入れた！`,""),bt(St)}export{vg as a,Tg as b,Jp as c,Vp as d,Sg as g,Yu as s};
