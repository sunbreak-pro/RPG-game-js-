var Eu=Object.defineProperty;var Tu=(n,t,e)=>t in n?Eu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var $=(n,t,e)=>Tu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();let ae=null,le=null;const fa=document.getElementById("tittle-log"),da=document.getElementById("next-stage"),Ze=document.getElementById("background-log-area");function pa(n){fa.innerHTML+=`<h3>
 ${n}</h3>`}function Lt(n="",t=""){const r=da.style.display!=="none"?le:ae;r&&(n&&(r.innerHTML+=`<p>
<strong>${n}</strong></p>`),t&&setTimeout(()=>{r.innerHTML+=`<p>
<strong>${t}</strong></p>`},500),r.scrollTo({top:r.scrollHeight,behavior:"smooth"}),console.log(r))}function j(n,t=""){const r=da.style.display!=="none"?le:ae;r&&(n&&(r.innerHTML+=`<p>
<strong>${n}</strong></p>`,Ze.innerHTML+=`<p>
${n}</p>`),t&&setTimeout(()=>{r.innerHTML+=`<p>
<strong>${t}</strong></p>`,Ze.innerHTML+=`<p>
${t}</p>`},500),Ze.scrollTo({top:Ze.scrollHeight,behavior:"smooth"}))}function ma(){ae&&(ae.innerHTML=""),le&&(le.innerHTML="")}function Ci(){ae&&(ae.innerHTML=""),le&&(le.innerHTML=""),Ze.innerHTML="",fa.innerHTML=""}function vu({battleLog:n,afterBattleLog:t}){ae=n,le=t}const Iu=[{className:"戦士",hp:130,mp:30,physicalStrength:50,magicalStrength:15,defense:25,speed:20},{className:"魔法使い",hp:80,mp:80,physicalStrength:15,magicalStrength:50,defense:20,speed:25}],dr=[{name:"スライム",className:"monster",hp:100,mp:0,physicalStrength:40,magicalStrength:0,defense:15,speed:20},{name:"ゴブリン",className:"monster",hp:120,mp:30,physicalStrength:50,magicalStrength:10,defense:20,speed:20},{name:"オーク",className:"monster",hp:150,mp:35,physicalStrength:60,magicalStrength:15,defense:30,speed:20},{name:"リッチ",className:"monster",hp:300,mp:200,physicalStrength:70,magicalStrength:100,defense:18,speed:50},{name:"ドラゴン",className:"monster",hp:500,mp:200,physicalStrength:80,magicalStrength:70,defense:80,speed:50},{name:"ダンジョンボス",className:"monster",hp:1e3,mp:500,physicalStrength:100,magicalStrength:100,defense:100,speed:20}],Fn=document.getElementById("instruction-item-border"),Au=document.getElementById("item-instruction");function St({playerStatus:n,enemyStatus:t,healItemsDiv:e,equipItemsDiv:r,equippedDiv:s}=It){const o=Xt();let l;if(o instanceof Object&&"inventory"in o)l=o;else return;const f=pr();n.textContent=l.getPlayerStatus(),t.textContent=f.getEnemyStatus(),e.innerHTML="",r.innerHTML="";let p=!1,I=!1;l.inventory.forEach(A=>{if(A.amount<=0)return;const P=document.createElement("button");P.textContent=`${A.showAmount()}`,P.addEventListener("mouseenter",()=>{Fn.style.display="block",console.log(Fn,"説明要素"),Au.innerText=A.instructionText}),P.addEventListener("mouseleave",()=>{Fn.style.display="none"}),P.addEventListener("click",()=>{if(Fn.style.display="none",["hpHeal","mpHeal","bothHeal"].includes(A.itemType)){if(A.itemType==="hpHeal"&&l.hp===l.maxHp)return Lt("HPがMAXなため、薬は使用不可");if(A.itemType==="mpHeal"&&l.mp===l.maxMp)return Lt("MPがMAXなため、薬は使用不可");l.healItem(A)}else A.itemType==="equipment"&&(l.equipItem(A),A.isEquipped=!0);if(A.amount--,A.amount<=0){const C=l.inventory.indexOf(A);l.inventory.splice(C,1)}St(It)}),["hpHeal","mpHeal","bothHeal"].includes(A.itemType)?(e.appendChild(P),p=!0,e.style.color="black"):A.itemType==="equipment"&&(r.appendChild(P),I=!0,r.style.color="black")}),p||(e.innerText="何も持っていない",e.style.color="gray",e.style.textAlign="center"),I||(r.innerText="何も持っていない",r.style.color="gray",r.style.textAlign="center"),s.innerHTML=`<h3>装備中アイテム</h3>
`,l.equipment.length>0?l.equipment.forEach(A=>{const P=document.createElement("button");let C="";A.effect.physicalStrength&&(C+=` 攻撃+${A.effect.physicalStrength}`),A.effect.defense&&(C+=` 防御+${A.effect.defense}`),P.innerHTML=`<p>${A.name}${C}<br>（クリックで外す）</p>`,P.style.cursor="pointer",P.addEventListener("click",()=>{l.unequipItem(A),St(It)}),s.appendChild(P)}):s.innerHTML+="<p>未装備</p>"}const Vi=[{name:"スラッシュ",mpCost:5,type:"attack",power:n=>Math.floor(n.physicalStrength*1.3),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${t.name} は 【${n}】で攻撃！ ${e.name}に${e.hp}ダメージ！`,` ${e.name} は細切れにされた`)):j(`${t.name} は【${n}】で攻撃！ ${e.name} に ${r} ダメージ！`,`(${e.name}のHP：${e.hp})`)},Instruction:`名称：スラッシュ
 少しのオーラを纏った斬撃を放つ。ダメージはキャラクターの物理攻撃に依存する`},{name:"ファイアボール",mpCost:10,type:"attack",power:n=>Math.floor(n.magicalStrength*1.3),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${t.name} は 【${n}】で攻撃！ ${e.name}に${e.hp}ダメージ！`,`${e.name}は、炭火焼きにされた`)):j(`${t.name} は 【${n}】で攻撃！ ${e.name} に ${r} ダメージ！`,` (${e.name}のHP：${e.hp})`)},Instruction:`名称：ファイヤーボール
 炎の球を繰り出す。ダメージはキャラクターの精神力に依存する`},{name:"アイスランス",mpCost:12,type:"attack",power:n=>Math.floor(n.magicalStrength*1.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${t.name} は 【${n}】で攻撃！ ${e.name}に${e.hp}ダメージ！`,`${e.name}は、串刺の中、凍え死んだ... `)):j(`${t.name} は【${n}】で攻撃！ ${e.name} に ${r} ダメージ！`,` (${e.name}のHP：${e.hp})`)},Instruction:`名称：アイスランス
 氷の槍を繰り出す。ダメージはキャラクターの 精神力×1.5 に依存する`},{name:"自己再生",mpCost:8,type:"heal",element:"heal",power:()=>0,log:(n,t)=>{if(t.hp!==t.maxHp){const e=Math.floor(t.magicalStrength*1.5);t.hp=Math.min(t.maxHp,t.hp+e),j(`${t.name} は ${n} でHPを${e}回復！(${t.name}のHP：${t.hp})`)}else j(`${t.name} のHPは既に MAX です！`)},Instruction:`名称：自己再生
 自らの力で体力を回復するスキル。精神力依存`}],wu=[{name:"ファイアブラスト",mpCost:18,type:"attack",element:"fire",power:n=>Math.floor(n.magicalStrength*1.8),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${t.name} は 【${n}】で攻撃！ ${e.name}に${e.hp}ダメージ！`,`${t.name} は 【${n}】で爆散した`)):j(`${t.name} の【ファイアブラスト】が炸裂！`,`${e.name} に ${r} ダメージ！(現在のHP：${e.hp})`)},Instruction:`名称：ファイヤブラスト
 ダメージは精神力に依存する強力魔法`}],Ru=[{name:"次元斬",mpCost:35,type:"attack",element:"sword",power:n=>Math.floor(n.physicalStrength*2),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${t.name} は 【${n}】で攻撃！ ${e.name}に${e.hp}ダメージ！`,`${e.name}は、次元の狭間に葬り去られた`)):j(`${t.name} は【${n}】で切り刻まれる！ ${e.name} に ${r} ダメージ！ (${e.name}のHP：${e.hp})`)},Instruction:`名称：次元斬
 高威力の物理攻撃。物理ステ依存`},{name:"インフェルノ",mpCost:50,type:"attack",element:"fire",power:n=>Math.floor(n.magicalStrength*2.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${e.name}は、業火に包まれ、息たえた
 ${e.name} は倒れた！`)):j(`${t.name} の【${n}】が大地を焼き尽くす`,`${e.name} に ${r} ダメージ！ (現在のHP：${e.hp})`)},Instruction:`名称：インフェルノ
 fire elementの最終進化系。精神力依存`},{name:"アイステンペスト",mpCost:50,type:"attack",element:"ice",power:n=>Math.floor(n.magicalStrength*2.5),log:(n,t,e,r)=>{e.hp<=0?(e.hp=0,j(`${e.name}は、氷漬けにされた`,`${e.name} は倒れた！`)):j(`${t.name} の【${n}】が銀世界を創り出す`,`${e.name} に ${r} ダメージ！(${e.name}のHP：${e.hp})`)},Instruction:`名称：アイステンペスト
 氷属性の最終進化スキル。精神力依存`}],Pu=[...Vi,...wu,...Ru];let ni=null,ri=null;function ga(n,t,e){ni=n,ri=t,console.log(n),console.log(t)}function Xt(){if(!ni)throw new Error("プレイヤーが設定されていません");return ni}function pr(){if(!ri)throw new Error("敵が設定されていません");return ri}let Ht;function Su(n){Ht=n}function bu(){return Ht}let ii=1;function Cu(){De.style.opacity="1",bi.style.opacity="1";const n=dr[ii],t=is(n);ga(Xt(),t),Ci(),Ol(Ht.skillDiv,Vi),St(It),Ht.defaultAttackBtn.style.opacity="1",Ht.defaultAttackBtn.ariaDisabled="false",Ht.nextStageBtn.style.display="none",Ht.battleLogArea.style.display="",Ht.afterBattleLogArea.style.display="none",ii++,ya(t)}function ya(n){pa(`第 ${ii} 階層`),Lt(`${n.name}が現れた！`,"どうする？")}const Vu=()=>{};var ao={};/**
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
 */const _a=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Du=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],l=n[e++],c=n[e++],f=((s&7)<<18|(o&63)<<12|(l&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(f>>10)),t[r++]=String.fromCharCode(56320+(f&1023))}else{const o=n[e++],l=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|l&63)}}return t.join("")},Ea={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],l=s+1<n.length,c=l?n[s+1]:0,f=s+2<n.length,p=f?n[s+2]:0,I=o>>2,A=(o&3)<<4|c>>4;let P=(c&15)<<2|p>>6,C=p&63;f||(C=64,l||(P=64)),r.push(e[I],e[A],e[P],e[C])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(_a(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Du(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const p=s<n.length?e[n.charAt(s)]:64;++s;const A=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||p==null||A==null)throw new Nu;const P=o<<2|c>>4;if(r.push(P),p!==64){const C=c<<4&240|p>>2;if(r.push(C),A!==64){const D=p<<6&192|A;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ku=function(n){const t=_a(n);return Ea.encodeByteArray(t,!0)},Qn=function(n){return ku(n).replace(/\./g,"")},xu=function(n){try{return Ea.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Mu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ou=()=>Mu().__FIREBASE_DEFAULTS__,Lu=()=>{if(typeof process>"u"||typeof ao>"u")return;const n=ao.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&xu(n[1]);return t&&JSON.parse(t)},Di=()=>{try{return Vu()||Ou()||Lu()||Fu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$u=n=>{var t,e;return(e=(t=Di())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},Bu=n=>{const t=$u(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ta=()=>{var n;return(n=Di())===null||n===void 0?void 0:n.config};/**
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
 */class Uu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function ju(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Qn(JSON.stringify(e)),Qn(JSON.stringify(l)),""].join(".")}/**
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
 */function Hu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qu(){var n;const t=(n=Di())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function zu(){return!qu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gu(){try{return typeof indexedDB=="object"}catch{return!1}}function Ku(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
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
 */const Qu="FirebaseError";class Ne extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Qu,Object.setPrototypeOf(this,Ne.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,va.prototype.create)}}class va{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],l=o?Wu(o,r):"Error",c=`${this.serviceName}: ${l} (${s}).`;return new Ne(s,c,r)}}function Wu(n,t){return n.replace(Xu,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Xu=/\{\$([^}]+)}/g;function Wn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],l=t[s];if(lo(o)&&lo(l)){if(!Wn(o,l))return!1}else if(o!==l)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function lo(n){return n!==null&&typeof n=="object"}/**
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
 */function Xn(n){return n&&n._delegate?n._delegate:n}class on{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const ne="[DEFAULT]";/**
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
 */class Ju{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Uu;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Zu(t))try{this.getOrInitializeService({instanceIdentifier:ne})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=ne){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ne){return this.instances.has(t)}getOptions(t=ne){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,l]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&l.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const l=this.instances.get(s);return l&&t(l,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Yu(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=ne){return this.component?this.component.multipleInstances?t:ne:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yu(n){return n===ne?void 0:n}function Zu(n){return n.instantiationMode==="EAGER"}/**
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
 */class tc{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Ju(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var F;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(F||(F={}));const ec={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},nc=F.INFO,rc={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},ic=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=rc[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ia{constructor(t){this.name=t,this._logLevel=nc,this._logHandler=ic,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in F))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ec[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...t),this._logHandler(this,F.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...t),this._logHandler(this,F.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,F.INFO,...t),this._logHandler(this,F.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,F.WARN,...t),this._logHandler(this,F.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...t),this._logHandler(this,F.ERROR,...t)}}const sc=(n,t)=>t.some(e=>n instanceof e);let uo,co;function oc(){return uo||(uo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ac(){return co||(co=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Aa=new WeakMap,si=new WeakMap,wa=new WeakMap,Qr=new WeakMap,Ni=new WeakMap;function lc(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(qt(n.result)),s()},l=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&Aa.set(e,n)}).catch(()=>{}),Ni.set(t,n),t}function uc(n){if(si.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),s()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});si.set(n,t)}let oi={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return si.get(n);if(t==="objectStoreNames")return n.objectStoreNames||wa.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return qt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function cc(n){oi=n(oi)}function hc(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Wr(this),t,...e);return wa.set(r,t.sort?t.sort():[t]),qt(r)}:ac().includes(n)?function(...t){return n.apply(Wr(this),t),qt(Aa.get(this))}:function(...t){return qt(n.apply(Wr(this),t))}}function fc(n){return typeof n=="function"?hc(n):(n instanceof IDBTransaction&&uc(n),sc(n,oc())?new Proxy(n,oi):n)}function qt(n){if(n instanceof IDBRequest)return lc(n);if(Qr.has(n))return Qr.get(n);const t=fc(n);return t!==n&&(Qr.set(n,t),Ni.set(t,n)),t}const Wr=n=>Ni.get(n);function dc(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const l=indexedDB.open(n,t),c=qt(l);return r&&l.addEventListener("upgradeneeded",f=>{r(qt(l.result),f.oldVersion,f.newVersion,qt(l.transaction),f)}),e&&l.addEventListener("blocked",f=>e(f.oldVersion,f.newVersion,f)),c.then(f=>{o&&f.addEventListener("close",()=>o()),s&&f.addEventListener("versionchange",p=>s(p.oldVersion,p.newVersion,p))}).catch(()=>{}),c}const pc=["get","getKey","getAll","getAllKeys","count"],mc=["put","add","delete","clear"],Xr=new Map;function ho(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Xr.get(t))return Xr.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=mc.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||pc.includes(e)))return;const o=async function(l,...c){const f=this.transaction(l,s?"readwrite":"readonly");let p=f.store;return r&&(p=p.index(c.shift())),(await Promise.all([p[e](...c),s&&f.done]))[0]};return Xr.set(t,o),o}cc(n=>({...n,get:(t,e,r)=>ho(t,e)||n.get(t,e,r),has:(t,e)=>!!ho(t,e)||n.has(t,e)}));/**
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
 */class gc{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(yc(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function yc(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ai="@firebase/app",fo="0.11.5";/**
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
 */const Ft=new Ia("@firebase/app"),_c="@firebase/app-compat",Ec="@firebase/analytics-compat",Tc="@firebase/analytics",vc="@firebase/app-check-compat",Ic="@firebase/app-check",Ac="@firebase/auth",wc="@firebase/auth-compat",Rc="@firebase/database",Pc="@firebase/data-connect",Sc="@firebase/database-compat",bc="@firebase/functions",Cc="@firebase/functions-compat",Vc="@firebase/installations",Dc="@firebase/installations-compat",Nc="@firebase/messaging",kc="@firebase/messaging-compat",xc="@firebase/performance",Mc="@firebase/performance-compat",Oc="@firebase/remote-config",Lc="@firebase/remote-config-compat",Fc="@firebase/storage",$c="@firebase/storage-compat",Bc="@firebase/firestore",Uc="@firebase/vertexai",jc="@firebase/firestore-compat",Hc="firebase",qc="11.6.1";/**
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
 */const li="[DEFAULT]",zc={[ai]:"fire-core",[_c]:"fire-core-compat",[Tc]:"fire-analytics",[Ec]:"fire-analytics-compat",[Ic]:"fire-app-check",[vc]:"fire-app-check-compat",[Ac]:"fire-auth",[wc]:"fire-auth-compat",[Rc]:"fire-rtdb",[Pc]:"fire-data-connect",[Sc]:"fire-rtdb-compat",[bc]:"fire-fn",[Cc]:"fire-fn-compat",[Vc]:"fire-iid",[Dc]:"fire-iid-compat",[Nc]:"fire-fcm",[kc]:"fire-fcm-compat",[xc]:"fire-perf",[Mc]:"fire-perf-compat",[Oc]:"fire-rc",[Lc]:"fire-rc-compat",[Fc]:"fire-gcs",[$c]:"fire-gcs-compat",[Bc]:"fire-fst",[jc]:"fire-fst-compat",[Uc]:"fire-vertex","fire-js":"fire-js",[Hc]:"fire-js-all"};/**
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
 */const Jn=new Map,Gc=new Map,ui=new Map;function po(n,t){try{n.container.addComponent(t)}catch(e){Ft.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Yn(n){const t=n.name;if(ui.has(t))return Ft.debug(`There were multiple attempts to register component ${t}.`),!1;ui.set(t,n);for(const e of Jn.values())po(e,n);for(const e of Gc.values())po(e,n);return!0}function Kc(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Qc(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Wc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new va("app","Firebase",Wc);/**
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
 */class Xc{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new on("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
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
 */const Jc=qc;function Ra(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:li,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw zt.create("bad-app-name",{appName:String(s)});if(e||(e=Ta()),!e)throw zt.create("no-options");const o=Jn.get(s);if(o){if(Wn(e,o.options)&&Wn(r,o.config))return o;throw zt.create("duplicate-app",{appName:s})}const l=new tc(s);for(const f of ui.values())l.addComponent(f);const c=new Xc(e,r,l);return Jn.set(s,c),c}function Yc(n=li){const t=Jn.get(n);if(!t&&n===li&&Ta())return Ra();if(!t)throw zt.create("no-app",{appName:n});return t}function ve(n,t,e){var r;let s=(r=zc[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),l=t.match(/\s|\//);if(o||l){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&l&&c.push("and"),l&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ft.warn(c.join(" "));return}Yn(new on(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Zc="firebase-heartbeat-database",th=1,an="firebase-heartbeat-store";let Jr=null;function Pa(){return Jr||(Jr=dc(Zc,th,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(an)}catch(e){console.warn(e)}}}}).catch(n=>{throw zt.create("idb-open",{originalErrorMessage:n.message})})),Jr}async function eh(n){try{const e=(await Pa()).transaction(an),r=await e.objectStore(an).get(Sa(n));return await e.done,r}catch(t){if(t instanceof Ne)Ft.warn(t.message);else{const e=zt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ft.warn(e.message)}}}async function mo(n,t){try{const r=(await Pa()).transaction(an,"readwrite");await r.objectStore(an).put(t,Sa(n)),await r.done}catch(e){if(e instanceof Ne)Ft.warn(e.message);else{const r=zt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(r.message)}}}function Sa(n){return`${n.name}!${n.options.appId}`}/**
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
 */const nh=1024,rh=30;class ih{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new oh(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=go();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(l=>l.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>rh){const l=ah(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ft.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=go(),{heartbeatsToSend:r,unsentEntries:s}=sh(this._heartbeatsCache.heartbeats),o=Qn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ft.warn(e),""}}}function go(){return new Date().toISOString().substring(0,10)}function sh(n,t=nh){const e=[];let r=n.slice();for(const s of n){const o=e.find(l=>l.agent===s.agent);if(o){if(o.dates.push(s.date),yo(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),yo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class oh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Gu()?Ku().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await eh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return mo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return mo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function yo(n){return Qn(JSON.stringify({version:2,heartbeats:n})).length}function ah(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function lh(n){Yn(new on("platform-logger",t=>new gc(t),"PRIVATE")),Yn(new on("heartbeat",t=>new ih(t),"PRIVATE")),ve(ai,fo,n),ve(ai,fo,"esm2017"),ve("fire-js","")}lh("");var uh="firebase",ch="11.6.1";/**
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
 */ve(uh,ch,"app");var _o=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ki;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,d){function g(){}g.prototype=d.prototype,E.D=d.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(y,_,v){for(var m=Array(arguments.length-2),Dt=2;Dt<arguments.length;Dt++)m[Dt-2]=arguments[Dt];return d.prototype[_].apply(y,m)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,d,g){g||(g=0);var y=Array(16);if(typeof d=="string")for(var _=0;16>_;++_)y[_]=d.charCodeAt(g++)|d.charCodeAt(g++)<<8|d.charCodeAt(g++)<<16|d.charCodeAt(g++)<<24;else for(_=0;16>_;++_)y[_]=d[g++]|d[g++]<<8|d[g++]<<16|d[g++]<<24;d=E.g[0],g=E.g[1],_=E.g[2];var v=E.g[3],m=d+(v^g&(_^v))+y[0]+3614090360&4294967295;d=g+(m<<7&4294967295|m>>>25),m=v+(_^d&(g^_))+y[1]+3905402710&4294967295,v=d+(m<<12&4294967295|m>>>20),m=_+(g^v&(d^g))+y[2]+606105819&4294967295,_=v+(m<<17&4294967295|m>>>15),m=g+(d^_&(v^d))+y[3]+3250441966&4294967295,g=_+(m<<22&4294967295|m>>>10),m=d+(v^g&(_^v))+y[4]+4118548399&4294967295,d=g+(m<<7&4294967295|m>>>25),m=v+(_^d&(g^_))+y[5]+1200080426&4294967295,v=d+(m<<12&4294967295|m>>>20),m=_+(g^v&(d^g))+y[6]+2821735955&4294967295,_=v+(m<<17&4294967295|m>>>15),m=g+(d^_&(v^d))+y[7]+4249261313&4294967295,g=_+(m<<22&4294967295|m>>>10),m=d+(v^g&(_^v))+y[8]+1770035416&4294967295,d=g+(m<<7&4294967295|m>>>25),m=v+(_^d&(g^_))+y[9]+2336552879&4294967295,v=d+(m<<12&4294967295|m>>>20),m=_+(g^v&(d^g))+y[10]+4294925233&4294967295,_=v+(m<<17&4294967295|m>>>15),m=g+(d^_&(v^d))+y[11]+2304563134&4294967295,g=_+(m<<22&4294967295|m>>>10),m=d+(v^g&(_^v))+y[12]+1804603682&4294967295,d=g+(m<<7&4294967295|m>>>25),m=v+(_^d&(g^_))+y[13]+4254626195&4294967295,v=d+(m<<12&4294967295|m>>>20),m=_+(g^v&(d^g))+y[14]+2792965006&4294967295,_=v+(m<<17&4294967295|m>>>15),m=g+(d^_&(v^d))+y[15]+1236535329&4294967295,g=_+(m<<22&4294967295|m>>>10),m=d+(_^v&(g^_))+y[1]+4129170786&4294967295,d=g+(m<<5&4294967295|m>>>27),m=v+(g^_&(d^g))+y[6]+3225465664&4294967295,v=d+(m<<9&4294967295|m>>>23),m=_+(d^g&(v^d))+y[11]+643717713&4294967295,_=v+(m<<14&4294967295|m>>>18),m=g+(v^d&(_^v))+y[0]+3921069994&4294967295,g=_+(m<<20&4294967295|m>>>12),m=d+(_^v&(g^_))+y[5]+3593408605&4294967295,d=g+(m<<5&4294967295|m>>>27),m=v+(g^_&(d^g))+y[10]+38016083&4294967295,v=d+(m<<9&4294967295|m>>>23),m=_+(d^g&(v^d))+y[15]+3634488961&4294967295,_=v+(m<<14&4294967295|m>>>18),m=g+(v^d&(_^v))+y[4]+3889429448&4294967295,g=_+(m<<20&4294967295|m>>>12),m=d+(_^v&(g^_))+y[9]+568446438&4294967295,d=g+(m<<5&4294967295|m>>>27),m=v+(g^_&(d^g))+y[14]+3275163606&4294967295,v=d+(m<<9&4294967295|m>>>23),m=_+(d^g&(v^d))+y[3]+4107603335&4294967295,_=v+(m<<14&4294967295|m>>>18),m=g+(v^d&(_^v))+y[8]+1163531501&4294967295,g=_+(m<<20&4294967295|m>>>12),m=d+(_^v&(g^_))+y[13]+2850285829&4294967295,d=g+(m<<5&4294967295|m>>>27),m=v+(g^_&(d^g))+y[2]+4243563512&4294967295,v=d+(m<<9&4294967295|m>>>23),m=_+(d^g&(v^d))+y[7]+1735328473&4294967295,_=v+(m<<14&4294967295|m>>>18),m=g+(v^d&(_^v))+y[12]+2368359562&4294967295,g=_+(m<<20&4294967295|m>>>12),m=d+(g^_^v)+y[5]+4294588738&4294967295,d=g+(m<<4&4294967295|m>>>28),m=v+(d^g^_)+y[8]+2272392833&4294967295,v=d+(m<<11&4294967295|m>>>21),m=_+(v^d^g)+y[11]+1839030562&4294967295,_=v+(m<<16&4294967295|m>>>16),m=g+(_^v^d)+y[14]+4259657740&4294967295,g=_+(m<<23&4294967295|m>>>9),m=d+(g^_^v)+y[1]+2763975236&4294967295,d=g+(m<<4&4294967295|m>>>28),m=v+(d^g^_)+y[4]+1272893353&4294967295,v=d+(m<<11&4294967295|m>>>21),m=_+(v^d^g)+y[7]+4139469664&4294967295,_=v+(m<<16&4294967295|m>>>16),m=g+(_^v^d)+y[10]+3200236656&4294967295,g=_+(m<<23&4294967295|m>>>9),m=d+(g^_^v)+y[13]+681279174&4294967295,d=g+(m<<4&4294967295|m>>>28),m=v+(d^g^_)+y[0]+3936430074&4294967295,v=d+(m<<11&4294967295|m>>>21),m=_+(v^d^g)+y[3]+3572445317&4294967295,_=v+(m<<16&4294967295|m>>>16),m=g+(_^v^d)+y[6]+76029189&4294967295,g=_+(m<<23&4294967295|m>>>9),m=d+(g^_^v)+y[9]+3654602809&4294967295,d=g+(m<<4&4294967295|m>>>28),m=v+(d^g^_)+y[12]+3873151461&4294967295,v=d+(m<<11&4294967295|m>>>21),m=_+(v^d^g)+y[15]+530742520&4294967295,_=v+(m<<16&4294967295|m>>>16),m=g+(_^v^d)+y[2]+3299628645&4294967295,g=_+(m<<23&4294967295|m>>>9),m=d+(_^(g|~v))+y[0]+4096336452&4294967295,d=g+(m<<6&4294967295|m>>>26),m=v+(g^(d|~_))+y[7]+1126891415&4294967295,v=d+(m<<10&4294967295|m>>>22),m=_+(d^(v|~g))+y[14]+2878612391&4294967295,_=v+(m<<15&4294967295|m>>>17),m=g+(v^(_|~d))+y[5]+4237533241&4294967295,g=_+(m<<21&4294967295|m>>>11),m=d+(_^(g|~v))+y[12]+1700485571&4294967295,d=g+(m<<6&4294967295|m>>>26),m=v+(g^(d|~_))+y[3]+2399980690&4294967295,v=d+(m<<10&4294967295|m>>>22),m=_+(d^(v|~g))+y[10]+4293915773&4294967295,_=v+(m<<15&4294967295|m>>>17),m=g+(v^(_|~d))+y[1]+2240044497&4294967295,g=_+(m<<21&4294967295|m>>>11),m=d+(_^(g|~v))+y[8]+1873313359&4294967295,d=g+(m<<6&4294967295|m>>>26),m=v+(g^(d|~_))+y[15]+4264355552&4294967295,v=d+(m<<10&4294967295|m>>>22),m=_+(d^(v|~g))+y[6]+2734768916&4294967295,_=v+(m<<15&4294967295|m>>>17),m=g+(v^(_|~d))+y[13]+1309151649&4294967295,g=_+(m<<21&4294967295|m>>>11),m=d+(_^(g|~v))+y[4]+4149444226&4294967295,d=g+(m<<6&4294967295|m>>>26),m=v+(g^(d|~_))+y[11]+3174756917&4294967295,v=d+(m<<10&4294967295|m>>>22),m=_+(d^(v|~g))+y[2]+718787259&4294967295,_=v+(m<<15&4294967295|m>>>17),m=g+(v^(_|~d))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+d&4294967295,E.g[1]=E.g[1]+(_+(m<<21&4294967295|m>>>11))&4294967295,E.g[2]=E.g[2]+_&4294967295,E.g[3]=E.g[3]+v&4294967295}r.prototype.u=function(E,d){d===void 0&&(d=E.length);for(var g=d-this.blockSize,y=this.B,_=this.h,v=0;v<d;){if(_==0)for(;v<=g;)s(this,E,v),v+=this.blockSize;if(typeof E=="string"){for(;v<d;)if(y[_++]=E.charCodeAt(v++),_==this.blockSize){s(this,y),_=0;break}}else for(;v<d;)if(y[_++]=E[v++],_==this.blockSize){s(this,y),_=0;break}}this.h=_,this.o+=d},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var d=1;d<E.length-8;++d)E[d]=0;var g=8*this.o;for(d=E.length-8;d<E.length;++d)E[d]=g&255,g/=256;for(this.u(E),E=Array(16),d=g=0;4>d;++d)for(var y=0;32>y;y+=8)E[g++]=this.g[d]>>>y&255;return E};function o(E,d){var g=c;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=d(E)}function l(E,d){this.h=d;for(var g=[],y=!0,_=E.length-1;0<=_;_--){var v=E[_]|0;y&&v==d||(g[_]=v,y=!1)}this.g=g}var c={};function f(E){return-128<=E&&128>E?o(E,function(d){return new l([d|0],0>d?-1:0)}):new l([E|0],0>E?-1:0)}function p(E){if(isNaN(E)||!isFinite(E))return A;if(0>E)return N(p(-E));for(var d=[],g=1,y=0;E>=g;y++)d[y]=E/g|0,g*=4294967296;return new l(d,0)}function I(E,d){if(E.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(E.charAt(0)=="-")return N(I(E.substring(1),d));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=p(Math.pow(d,8)),y=A,_=0;_<E.length;_+=8){var v=Math.min(8,E.length-_),m=parseInt(E.substring(_,_+v),d);8>v?(v=p(Math.pow(d,v)),y=y.j(v).add(p(m))):(y=y.j(g),y=y.add(p(m)))}return y}var A=f(0),P=f(1),C=f(16777216);n=l.prototype,n.m=function(){if(x(this))return-N(this).m();for(var E=0,d=1,g=0;g<this.g.length;g++){var y=this.i(g);E+=(0<=y?y:4294967296+y)*d,d*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(x(this))return"-"+N(this).toString(E);for(var d=p(Math.pow(E,6)),g=this,y="";;){var _=lt(g,d).g;g=Q(g,_.j(d));var v=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=_,D(g))return v+y;for(;6>v.length;)v="0"+v;y=v+y}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var d=0;d<E.g.length;d++)if(E.g[d]!=0)return!1;return!0}function x(E){return E.h==-1}n.l=function(E){return E=Q(this,E),x(E)?-1:D(E)?0:1};function N(E){for(var d=E.g.length,g=[],y=0;y<d;y++)g[y]=~E.g[y];return new l(g,~E.h).add(P)}n.abs=function(){return x(this)?N(this):this},n.add=function(E){for(var d=Math.max(this.g.length,E.g.length),g=[],y=0,_=0;_<=d;_++){var v=y+(this.i(_)&65535)+(E.i(_)&65535),m=(v>>>16)+(this.i(_)>>>16)+(E.i(_)>>>16);y=m>>>16,v&=65535,m&=65535,g[_]=m<<16|v}return new l(g,g[g.length-1]&-2147483648?-1:0)};function Q(E,d){return E.add(N(d))}n.j=function(E){if(D(this)||D(E))return A;if(x(this))return x(E)?N(this).j(N(E)):N(N(this).j(E));if(x(E))return N(this.j(N(E)));if(0>this.l(C)&&0>E.l(C))return p(this.m()*E.m());for(var d=this.g.length+E.g.length,g=[],y=0;y<2*d;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var _=0;_<E.g.length;_++){var v=this.i(y)>>>16,m=this.i(y)&65535,Dt=E.i(_)>>>16,Me=E.i(_)&65535;g[2*y+2*_]+=m*Me,K(g,2*y+2*_),g[2*y+2*_+1]+=v*Me,K(g,2*y+2*_+1),g[2*y+2*_+1]+=m*Dt,K(g,2*y+2*_+1),g[2*y+2*_+2]+=v*Dt,K(g,2*y+2*_+2)}for(y=0;y<d;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=d;y<2*d;y++)g[y]=0;return new l(g,0)};function K(E,d){for(;(E[d]&65535)!=E[d];)E[d+1]+=E[d]>>>16,E[d]&=65535,d++}function W(E,d){this.g=E,this.h=d}function lt(E,d){if(D(d))throw Error("division by zero");if(D(E))return new W(A,A);if(x(E))return d=lt(N(E),d),new W(N(d.g),N(d.h));if(x(d))return d=lt(E,N(d)),new W(N(d.g),d.h);if(30<E.g.length){if(x(E)||x(d))throw Error("slowDivide_ only works with positive integers.");for(var g=P,y=d;0>=y.l(E);)g=Jt(g),y=Jt(y);var _=_t(g,1),v=_t(y,1);for(y=_t(y,2),g=_t(g,2);!D(y);){var m=v.add(y);0>=m.l(E)&&(_=_.add(g),v=m),y=_t(y,1),g=_t(g,1)}return d=Q(E,_.j(d)),new W(_,d)}for(_=A;0<=E.l(d);){for(g=Math.max(1,Math.floor(E.m()/d.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),v=p(g),m=v.j(d);x(m)||0<m.l(E);)g-=y,v=p(g),m=v.j(d);D(v)&&(v=P),_=_.add(v),E=Q(E,m)}return new W(_,E)}n.A=function(E){return lt(this,E).h},n.and=function(E){for(var d=Math.max(this.g.length,E.g.length),g=[],y=0;y<d;y++)g[y]=this.i(y)&E.i(y);return new l(g,this.h&E.h)},n.or=function(E){for(var d=Math.max(this.g.length,E.g.length),g=[],y=0;y<d;y++)g[y]=this.i(y)|E.i(y);return new l(g,this.h|E.h)},n.xor=function(E){for(var d=Math.max(this.g.length,E.g.length),g=[],y=0;y<d;y++)g[y]=this.i(y)^E.i(y);return new l(g,this.h^E.h)};function Jt(E){for(var d=E.g.length+1,g=[],y=0;y<d;y++)g[y]=E.i(y)<<1|E.i(y-1)>>>31;return new l(g,E.h)}function _t(E,d){var g=d>>5;d%=32;for(var y=E.g.length-g,_=[],v=0;v<y;v++)_[v]=0<d?E.i(v+g)>>>d|E.i(v+g+1)<<32-d:E.i(v+g);return new l(_,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=p,l.fromString=I,ki=l}).apply(typeof _o<"u"?_o:typeof self<"u"?self:typeof window<"u"?window:{});var $n=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ba,tn,Ca,qn,ci,Va,Da,Na;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,u){return i==Array.prototype||i==Object.prototype||(i[a]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof $n=="object"&&$n];for(var a=0;a<i.length;++a){var u=i[a];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,a){if(a)t:{var u=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var T=i[h];if(!(T in u))break t;u=u[T]}i=i[i.length-1],h=u[i],a=a(h),a!=h&&a!=null&&t(u,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var u=0,h=!1,T={next:function(){if(!h&&u<i.length){var w=u++;return{value:a(w,i[w]),done:!1}}return h=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},c=this||self;function f(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function p(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function I(i,a,u){return i.call.apply(i.bind,arguments)}function A(i,a,u){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,h),i.apply(a,T)}}return function(){return i.apply(a,arguments)}}function P(i,a,u){return P=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?I:A,P.apply(null,arguments)}function C(i,a){var u=Array.prototype.slice.call(arguments,1);return function(){var h=u.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function D(i,a){function u(){}u.prototype=a.prototype,i.aa=a.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(h,T,w){for(var b=Array(arguments.length-2),H=2;H<arguments.length;H++)b[H-2]=arguments[H];return a.prototype[T].apply(h,b)}}function x(i){const a=i.length;if(0<a){const u=Array(a);for(let h=0;h<a;h++)u[h]=i[h];return u}return[]}function N(i,a){for(let u=1;u<arguments.length;u++){const h=arguments[u];if(f(h)){const T=i.length||0,w=h.length||0;i.length=T+w;for(let b=0;b<w;b++)i[T+b]=h[b]}else i.push(h)}}class Q{constructor(a,u){this.i=a,this.j=u,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function K(i){return/^[\s\xa0]*$/.test(i)}function W(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function lt(i){return lt[" "](i),i}lt[" "]=function(){};var Jt=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function _t(i,a,u){for(const h in i)a.call(u,i[h],h,i)}function E(i,a){for(const u in i)a.call(void 0,i[u],u,i)}function d(i){const a={};for(const u in i)a[u]=i[u];return a}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,a){let u,h;for(let T=1;T<arguments.length;T++){h=arguments[T];for(u in h)i[u]=h[u];for(let w=0;w<g.length;w++)u=g[w],Object.prototype.hasOwnProperty.call(h,u)&&(i[u]=h[u])}}function _(i){var a=1;i=i.split(":");const u=[];for(;0<a&&i.length;)u.push(i.shift()),a--;return i.length&&u.push(i.join(":")),u}function v(i){c.setTimeout(()=>{throw i},0)}function m(){var i=wr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Dt{constructor(){this.h=this.g=null}add(a,u){const h=Me.get();h.set(a,u),this.h?this.h.next=h:this.g=h,this.h=h}}var Me=new Q(()=>new Fl,i=>i.reset());class Fl{constructor(){this.next=this.g=this.h=null}set(a,u){this.h=a,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Oe,Le=!1,wr=new Dt,as=()=>{const i=c.Promise.resolve(void 0);Oe=()=>{i.then($l)}};var $l=()=>{for(var i;i=m();){try{i.h.call(i.g)}catch(u){v(u)}var a=Me;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Le=!1};function $t(){this.s=this.s,this.C=this.C}$t.prototype.s=!1,$t.prototype.ma=function(){this.s||(this.s=!0,this.N())},$t.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ut(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}ut.prototype.h=function(){this.defaultPrevented=!0};var Bl=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};c.addEventListener("test",u,a),c.removeEventListener("test",u,a)}catch{}return i}();function Fe(i,a){if(ut.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Jt){t:{try{lt(a.nodeName);var T=!0;break t}catch{}T=!1}T||(a=null)}}else u=="mouseover"?a=i.fromElement:u=="mouseout"&&(a=i.toElement);this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Ul[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Fe.aa.h.call(this)}}D(Fe,ut);var Ul={2:"touch",3:"pen",4:"mouse"};Fe.prototype.h=function(){Fe.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var En="closure_listenable_"+(1e6*Math.random()|0),jl=0;function Hl(i,a,u,h,T){this.listener=i,this.proxy=null,this.src=a,this.type=u,this.capture=!!h,this.ha=T,this.key=++jl,this.da=this.fa=!1}function Tn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function vn(i){this.src=i,this.g={},this.h=0}vn.prototype.add=function(i,a,u,h,T){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var b=Pr(i,a,h,T);return-1<b?(a=i[b],u||(a.fa=!1)):(a=new Hl(a,this.src,w,!!h,T),a.fa=u,i.push(a)),a};function Rr(i,a){var u=a.type;if(u in i.g){var h=i.g[u],T=Array.prototype.indexOf.call(h,a,void 0),w;(w=0<=T)&&Array.prototype.splice.call(h,T,1),w&&(Tn(a),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Pr(i,a,u,h){for(var T=0;T<i.length;++T){var w=i[T];if(!w.da&&w.listener==a&&w.capture==!!u&&w.ha==h)return T}return-1}var Sr="closure_lm_"+(1e6*Math.random()|0),br={};function ls(i,a,u,h,T){if(Array.isArray(a)){for(var w=0;w<a.length;w++)ls(i,a[w],u,h,T);return null}return u=hs(u),i&&i[En]?i.K(a,u,p(h)?!!h.capture:!1,T):ql(i,a,u,!1,h,T)}function ql(i,a,u,h,T,w){if(!a)throw Error("Invalid event type");var b=p(T)?!!T.capture:!!T,H=Vr(i);if(H||(i[Sr]=H=new vn(i)),u=H.add(a,u,h,b,w),u.proxy)return u;if(h=zl(),u.proxy=h,h.src=i,h.listener=u,i.addEventListener)Bl||(T=b),T===void 0&&(T=!1),i.addEventListener(a.toString(),h,T);else if(i.attachEvent)i.attachEvent(cs(a.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return u}function zl(){function i(u){return a.call(i.src,i.listener,u)}const a=Gl;return i}function us(i,a,u,h,T){if(Array.isArray(a))for(var w=0;w<a.length;w++)us(i,a[w],u,h,T);else h=p(h)?!!h.capture:!!h,u=hs(u),i&&i[En]?(i=i.i,a=String(a).toString(),a in i.g&&(w=i.g[a],u=Pr(w,u,h,T),-1<u&&(Tn(w[u]),Array.prototype.splice.call(w,u,1),w.length==0&&(delete i.g[a],i.h--)))):i&&(i=Vr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=Pr(a,u,h,T)),(u=-1<i?a[i]:null)&&Cr(u))}function Cr(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[En])Rr(a.i,i);else{var u=i.type,h=i.proxy;a.removeEventListener?a.removeEventListener(u,h,i.capture):a.detachEvent?a.detachEvent(cs(u),h):a.addListener&&a.removeListener&&a.removeListener(h),(u=Vr(a))?(Rr(u,i),u.h==0&&(u.src=null,a[Sr]=null)):Tn(i)}}}function cs(i){return i in br?br[i]:br[i]="on"+i}function Gl(i,a){if(i.da)i=!0;else{a=new Fe(a,this);var u=i.listener,h=i.ha||i.src;i.fa&&Cr(i),i=u.call(h,a)}return i}function Vr(i){return i=i[Sr],i instanceof vn?i:null}var Dr="__closure_events_fn_"+(1e9*Math.random()>>>0);function hs(i){return typeof i=="function"?i:(i[Dr]||(i[Dr]=function(a){return i.handleEvent(a)}),i[Dr])}function ct(){$t.call(this),this.i=new vn(this),this.M=this,this.F=null}D(ct,$t),ct.prototype[En]=!0,ct.prototype.removeEventListener=function(i,a,u,h){us(this,i,a,u,h)};function gt(i,a){var u,h=i.F;if(h)for(u=[];h;h=h.F)u.push(h);if(i=i.M,h=a.type||a,typeof a=="string")a=new ut(a,i);else if(a instanceof ut)a.target=a.target||i;else{var T=a;a=new ut(h,i),y(a,T)}if(T=!0,u)for(var w=u.length-1;0<=w;w--){var b=a.g=u[w];T=In(b,h,!0,a)&&T}if(b=a.g=i,T=In(b,h,!0,a)&&T,T=In(b,h,!1,a)&&T,u)for(w=0;w<u.length;w++)b=a.g=u[w],T=In(b,h,!1,a)&&T}ct.prototype.N=function(){if(ct.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var u=i.g[a],h=0;h<u.length;h++)Tn(u[h]);delete i.g[a],i.h--}}this.F=null},ct.prototype.K=function(i,a,u,h){return this.i.add(String(i),a,!1,u,h)},ct.prototype.L=function(i,a,u,h){return this.i.add(String(i),a,!0,u,h)};function In(i,a,u,h){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,w=0;w<a.length;++w){var b=a[w];if(b&&!b.da&&b.capture==u){var H=b.listener,rt=b.ha||b.src;b.fa&&Rr(i.i,b),T=H.call(rt,h)!==!1&&T}}return T&&!h.defaultPrevented}function fs(i,a,u){if(typeof i=="function")u&&(i=P(i,u));else if(i&&typeof i.handleEvent=="function")i=P(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(i,a||0)}function ds(i){i.g=fs(()=>{i.g=null,i.i&&(i.i=!1,ds(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class Kl extends $t{constructor(a,u){super(),this.m=a,this.l=u,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ds(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function $e(i){$t.call(this),this.h=i,this.g={}}D($e,$t);var ps=[];function ms(i){_t(i.g,function(a,u){this.g.hasOwnProperty(u)&&Cr(a)},i),i.g={}}$e.prototype.N=function(){$e.aa.N.call(this),ms(this)},$e.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Nr=c.JSON.stringify,Ql=c.JSON.parse,Wl=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function kr(){}kr.prototype.h=null;function gs(i){return i.h||(i.h=i.i())}function ys(){}var Be={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function xr(){ut.call(this,"d")}D(xr,ut);function Mr(){ut.call(this,"c")}D(Mr,ut);var Yt={},_s=null;function An(){return _s=_s||new ct}Yt.La="serverreachability";function Es(i){ut.call(this,Yt.La,i)}D(Es,ut);function Ue(i){const a=An();gt(a,new Es(a))}Yt.STAT_EVENT="statevent";function Ts(i,a){ut.call(this,Yt.STAT_EVENT,i),this.stat=a}D(Ts,ut);function yt(i){const a=An();gt(a,new Ts(a,i))}Yt.Ma="timingevent";function vs(i,a){ut.call(this,Yt.Ma,i),this.size=a}D(vs,ut);function je(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},a)}function He(){this.g=!0}He.prototype.xa=function(){this.g=!1};function Xl(i,a,u,h,T,w){i.info(function(){if(i.g)if(w)for(var b="",H=w.split("&"),rt=0;rt<H.length;rt++){var U=H[rt].split("=");if(1<U.length){var ht=U[0];U=U[1];var ft=ht.split("_");b=2<=ft.length&&ft[1]=="type"?b+(ht+"="+U+"&"):b+(ht+"=redacted&")}}else b=null;else b=w;return"XMLHTTP REQ ("+h+") [attempt "+T+"]: "+a+`
`+u+`
`+b})}function Jl(i,a,u,h,T,w,b){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+T+"]: "+a+`
`+u+`
`+w+" "+b})}function me(i,a,u,h){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+Zl(i,u)+(h?" "+h:"")})}function Yl(i,a){i.info(function(){return"TIMEOUT: "+a})}He.prototype.info=function(){};function Zl(i,a){if(!i.g)return a;if(!a)return null;try{var u=JSON.parse(a);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var h=u[i];if(!(2>h.length)){var T=h[1];if(Array.isArray(T)&&!(1>T.length)){var w=T[0];if(w!="noop"&&w!="stop"&&w!="close")for(var b=1;b<T.length;b++)T[b]=""}}}}return Nr(u)}catch{return a}}var wn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Is={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Or;function Rn(){}D(Rn,kr),Rn.prototype.g=function(){return new XMLHttpRequest},Rn.prototype.i=function(){return{}},Or=new Rn;function Bt(i,a,u,h){this.j=i,this.i=a,this.l=u,this.R=h||1,this.U=new $e(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new As}function As(){this.i=null,this.g="",this.h=!1}var ws={},Lr={};function Fr(i,a,u){i.L=1,i.v=Cn(Nt(a)),i.m=u,i.P=!0,Rs(i,null)}function Rs(i,a){i.F=Date.now(),Pn(i),i.A=Nt(i.v);var u=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),$s(u.i,"t",h),i.C=0,u=i.j.J,i.h=new As,i.g=ro(i.j,u?a:null,!i.m),0<i.O&&(i.M=new Kl(P(i.Y,i,i.g),i.O)),a=i.U,u=i.g,h=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(ps[0]=T.toString()),T=ps);for(var w=0;w<T.length;w++){var b=ls(u,T[w],h||a.handleEvent,!1,a.h||a);if(!b)break;a.g[b.key]=b}a=i.H?d(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),Ue(),Xl(i.i,i.u,i.A,i.l,i.R,i.m)}Bt.prototype.ca=function(i){i=i.target;const a=this.M;a&&kt(i)==3?a.j():this.Y(i)},Bt.prototype.Y=function(i){try{if(i==this.g)t:{const ft=kt(this.g);var a=this.g.Ba();const _e=this.g.Z();if(!(3>ft)&&(ft!=3||this.g&&(this.h.h||this.g.oa()||Gs(this.g)))){this.J||ft!=4||a==7||(a==8||0>=_e?Ue(3):Ue(2)),$r(this);var u=this.g.Z();this.X=u;e:if(Ps(this)){var h=Gs(this.g);i="";var T=h.length,w=kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Zt(this),qe(this);var b="";break e}this.h.i=new c.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,i+=this.h.i.decode(h[a],{stream:!(w&&a==T-1)});h.length=0,this.h.g+=i,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=u==200,Jl(this.i,this.u,this.A,this.l,this.R,ft,u),this.o){if(this.T&&!this.K){e:{if(this.g){var H,rt=this.g;if((H=rt.g?rt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(H)){var U=H;break e}}U=null}if(u=U)me(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Br(this,u);else{this.o=!1,this.s=3,yt(12),Zt(this),qe(this);break t}}if(this.P){u=!0;let At;for(;!this.J&&this.C<b.length;)if(At=tu(this,b),At==Lr){ft==4&&(this.s=4,yt(14),u=!1),me(this.i,this.l,null,"[Incomplete Response]");break}else if(At==ws){this.s=4,yt(15),me(this.i,this.l,b,"[Invalid Chunk]"),u=!1;break}else me(this.i,this.l,At,null),Br(this,At);if(Ps(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ft!=4||b.length!=0||this.h.h||(this.s=1,yt(16),u=!1),this.o=this.o&&u,!u)me(this.i,this.l,b,"[Invalid Chunked Response]"),Zt(this),qe(this);else if(0<b.length&&!this.W){this.W=!0;var ht=this.j;ht.g==this&&ht.ba&&!ht.M&&(ht.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),Gr(ht),ht.M=!0,yt(11))}}else me(this.i,this.l,b,null),Br(this,b);ft==4&&Zt(this),this.o&&!this.J&&(ft==4?Zs(this.j,this):(this.o=!1,Pn(this)))}else yu(this.g),u==400&&0<b.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),Zt(this),qe(this)}}}catch{}finally{}};function Ps(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function tu(i,a){var u=i.C,h=a.indexOf(`
`,u);return h==-1?Lr:(u=Number(a.substring(u,h)),isNaN(u)?ws:(h+=1,h+u>a.length?Lr:(a=a.slice(h,h+u),i.C=h+u,a)))}Bt.prototype.cancel=function(){this.J=!0,Zt(this)};function Pn(i){i.S=Date.now()+i.I,Ss(i,i.I)}function Ss(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=je(P(i.ba,i),a)}function $r(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Bt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Yl(this.i,this.A),this.L!=2&&(Ue(),yt(17)),Zt(this),this.s=2,qe(this)):Ss(this,this.S-i)};function qe(i){i.j.G==0||i.J||Zs(i.j,i)}function Zt(i){$r(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,ms(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function Br(i,a){try{var u=i.j;if(u.G!=0&&(u.g==i||Ur(u.h,i))){if(!i.K&&Ur(u.h,i)&&u.G==3){try{var h=u.Da.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var T=h;if(T[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)Mn(u),kn(u);else break t;zr(u),yt(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=je(P(u.Za,u),6e3));if(1>=Vs(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else ee(u,11)}else if((i.K||u.g==i)&&Mn(u),!K(a))for(T=u.Da.g.parse(a),a=0;a<T.length;a++){let U=T[a];if(u.T=U[0],U=U[1],u.G==2)if(U[0]=="c"){u.K=U[1],u.ia=U[2];const ht=U[3];ht!=null&&(u.la=ht,u.j.info("VER="+u.la));const ft=U[4];ft!=null&&(u.Aa=ft,u.j.info("SVER="+u.Aa));const _e=U[5];_e!=null&&typeof _e=="number"&&0<_e&&(h=1.5*_e,u.L=h,u.j.info("backChannelRequestTimeoutMs_="+h)),h=u;const At=i.g;if(At){const Ln=At.g?At.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ln){var w=h.h;w.g||Ln.indexOf("spdy")==-1&&Ln.indexOf("quic")==-1&&Ln.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(jr(w,w.h),w.h=null))}if(h.D){const Kr=At.g?At.g.getResponseHeader("X-HTTP-Session-Id"):null;Kr&&(h.ya=Kr,z(h.I,h.D,Kr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),h=u;var b=i;if(h.qa=no(h,h.J?h.ia:null,h.W),b.K){Ds(h.h,b);var H=b,rt=h.L;rt&&(H.I=rt),H.B&&($r(H),Pn(H)),h.g=b}else Js(h);0<u.i.length&&xn(u)}else U[0]!="stop"&&U[0]!="close"||ee(u,7);else u.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?ee(u,7):qr(u):U[0]!="noop"&&u.l&&u.l.ta(U),u.v=0)}}Ue(4)}catch{}}var eu=class{constructor(i,a){this.g=i,this.map=a}};function bs(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Cs(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Vs(i){return i.h?1:i.g?i.g.size:0}function Ur(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function jr(i,a){i.g?i.g.add(a):i.h=a}function Ds(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}bs.prototype.cancel=function(){if(this.i=Ns(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Ns(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const u of i.g.values())a=a.concat(u.D);return a}return x(i.i)}function nu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(f(i)){for(var a=[],u=i.length,h=0;h<u;h++)a.push(i[h]);return a}a=[],u=0;for(h in i)a[u++]=i[h];return a}function ru(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(f(i)||typeof i=="string"){var a=[];i=i.length;for(var u=0;u<i;u++)a.push(u);return a}a=[],u=0;for(const h in i)a[u++]=h;return a}}}function ks(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(f(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var u=ru(i),h=nu(i),T=h.length,w=0;w<T;w++)a.call(void 0,h[w],u&&u[w],i)}var xs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function iu(i,a){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var h=i[u].indexOf("="),T=null;if(0<=h){var w=i[u].substring(0,h);T=i[u].substring(h+1)}else w=i[u];a(w,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function te(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof te){this.h=i.h,Sn(this,i.j),this.o=i.o,this.g=i.g,bn(this,i.s),this.l=i.l;var a=i.i,u=new Ke;u.i=a.i,a.g&&(u.g=new Map(a.g),u.h=a.h),Ms(this,u),this.m=i.m}else i&&(a=String(i).match(xs))?(this.h=!1,Sn(this,a[1]||"",!0),this.o=ze(a[2]||""),this.g=ze(a[3]||"",!0),bn(this,a[4]),this.l=ze(a[5]||"",!0),Ms(this,a[6]||"",!0),this.m=ze(a[7]||"")):(this.h=!1,this.i=new Ke(null,this.h))}te.prototype.toString=function(){var i=[],a=this.j;a&&i.push(Ge(a,Os,!0),":");var u=this.g;return(u||a=="file")&&(i.push("//"),(a=this.o)&&i.push(Ge(a,Os,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(Ge(u,u.charAt(0)=="/"?au:ou,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",Ge(u,uu)),i.join("")};function Nt(i){return new te(i)}function Sn(i,a,u){i.j=u?ze(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function bn(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function Ms(i,a,u){a instanceof Ke?(i.i=a,cu(i.i,i.h)):(u||(a=Ge(a,lu)),i.i=new Ke(a,i.h))}function z(i,a,u){i.i.set(a,u)}function Cn(i){return z(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function ze(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ge(i,a,u){return typeof i=="string"?(i=encodeURI(i).replace(a,su),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function su(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Os=/[#\/\?@]/g,ou=/[#\?:]/g,au=/[#\?]/g,lu=/[#\?@]/g,uu=/#/g;function Ke(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Ut(i){i.g||(i.g=new Map,i.h=0,i.i&&iu(i.i,function(a,u){i.add(decodeURIComponent(a.replace(/\+/g," ")),u)}))}n=Ke.prototype,n.add=function(i,a){Ut(this),this.i=null,i=ge(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(a),this.h+=1,this};function Ls(i,a){Ut(i),a=ge(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function Fs(i,a){return Ut(i),a=ge(i,a),i.g.has(a)}n.forEach=function(i,a){Ut(this),this.g.forEach(function(u,h){u.forEach(function(T){i.call(a,T,h,this)},this)},this)},n.na=function(){Ut(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),u=[];for(let h=0;h<a.length;h++){const T=i[h];for(let w=0;w<T.length;w++)u.push(a[h])}return u},n.V=function(i){Ut(this);let a=[];if(typeof i=="string")Fs(this,i)&&(a=a.concat(this.g.get(ge(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)a=a.concat(i[u])}return a},n.set=function(i,a){return Ut(this),this.i=null,i=ge(this,i),Fs(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function $s(i,a,u){Ls(i,a),0<u.length&&(i.i=null,i.g.set(ge(i,a),x(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var u=0;u<a.length;u++){var h=a[u];const w=encodeURIComponent(String(h)),b=this.V(h);for(h=0;h<b.length;h++){var T=w;b[h]!==""&&(T+="="+encodeURIComponent(String(b[h]))),i.push(T)}}return this.i=i.join("&")};function ge(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function cu(i,a){a&&!i.j&&(Ut(i),i.i=null,i.g.forEach(function(u,h){var T=h.toLowerCase();h!=T&&(Ls(this,h),$s(this,T,u))},i)),i.j=a}function hu(i,a){const u=new He;if(c.Image){const h=new Image;h.onload=C(jt,u,"TestLoadImage: loaded",!0,a,h),h.onerror=C(jt,u,"TestLoadImage: error",!1,a,h),h.onabort=C(jt,u,"TestLoadImage: abort",!1,a,h),h.ontimeout=C(jt,u,"TestLoadImage: timeout",!1,a,h),c.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else a(!1)}function fu(i,a){const u=new He,h=new AbortController,T=setTimeout(()=>{h.abort(),jt(u,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:h.signal}).then(w=>{clearTimeout(T),w.ok?jt(u,"TestPingServer: ok",!0,a):jt(u,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),jt(u,"TestPingServer: error",!1,a)})}function jt(i,a,u,h,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),h(u)}catch{}}function du(){this.g=new Wl}function pu(i,a,u){const h=u||"";try{ks(i,function(T,w){let b=T;p(T)&&(b=Nr(T)),a.push(h+w+"="+encodeURIComponent(b))})}catch(T){throw a.push(h+"type="+encodeURIComponent("_badmap")),T}}function Vn(i){this.l=i.Ub||null,this.j=i.eb||!1}D(Vn,kr),Vn.prototype.g=function(){return new Dn(this.l,this.j)},Vn.prototype.i=function(i){return function(){return i}}({});function Dn(i,a){ct.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Dn,ct),n=Dn.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,We(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Qe(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,We(this)),this.g&&(this.readyState=3,We(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Bs(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Bs(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?Qe(this):We(this),this.readyState==3&&Bs(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Qe(this))},n.Qa=function(i){this.g&&(this.response=i,Qe(this))},n.ga=function(){this.g&&Qe(this)};function Qe(i){i.readyState=4,i.l=null,i.j=null,i.v=null,We(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var u=a.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=a.next();return i.join(`\r
`)};function We(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Dn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Us(i){let a="";return _t(i,function(u,h){a+=h,a+=":",a+=u,a+=`\r
`}),a}function Hr(i,a,u){t:{for(h in u){var h=!1;break t}h=!0}h||(u=Us(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):z(i,a,u))}function X(i){ct.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(X,ct);var mu=/^https?$/i,gu=["POST","PUT"];n=X.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,u,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Or.g(),this.v=this.o?gs(this.o):gs(Or),this.g.onreadystatechange=P(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(w){js(this,w);return}if(i=u||"",u=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var T in h)u.set(T,h[T]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const w of h.keys())u.set(w,h.get(w));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(u.keys()).find(w=>w.toLowerCase()=="content-type"),T=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(gu,a,void 0))||h||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,b]of u)this.g.setRequestHeader(w,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zs(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){js(this,w)}};function js(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,Hs(i),Nn(i)}function Hs(i){i.A||(i.A=!0,gt(i,"complete"),gt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,gt(this,"complete"),gt(this,"abort"),Nn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Nn(this,!0)),X.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?qs(this):this.bb())},n.bb=function(){qs(this)};function qs(i){if(i.h&&typeof l<"u"&&(!i.v[1]||kt(i)!=4||i.Z()!=2)){if(i.u&&kt(i)==4)fs(i.Ea,0,i);else if(gt(i,"readystatechange"),kt(i)==4){i.h=!1;try{const b=i.Z();t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var u;if(!(u=a)){var h;if(h=b===0){var T=String(i.D).match(xs)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),h=!mu.test(T?T.toLowerCase():"")}u=h}if(u)gt(i,"complete"),gt(i,"success");else{i.m=6;try{var w=2<kt(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",Hs(i)}}finally{Nn(i)}}}}function Nn(i,a){if(i.g){zs(i);const u=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||gt(i,"ready");try{u.onreadystatechange=h}catch{}}}function zs(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function kt(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<kt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),Ql(a)}};function Gs(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function yu(i){const a={};i=(i.g&&2<=kt(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if(K(i[h]))continue;var u=_(i[h]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const w=a[T]||[];a[T]=w,w.push(u)}E(a,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xe(i,a,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||a}function Ks(i){this.Aa=0,this.i=[],this.j=new He,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xe("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xe("baseRetryDelayMs",5e3,i),this.cb=Xe("retryDelaySeedMs",1e4,i),this.Wa=Xe("forwardChannelMaxRetries",2,i),this.wa=Xe("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new bs(i&&i.concurrentRequestLimit),this.Da=new du,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ks.prototype,n.la=8,n.G=1,n.connect=function(i,a,u,h){yt(0),this.W=i,this.H=a||{},u&&h!==void 0&&(this.H.OSID=u,this.H.OAID=h),this.F=this.X,this.I=no(this,null,this.W),xn(this)};function qr(i){if(Qs(i),i.G==3){var a=i.U++,u=Nt(i.I);if(z(u,"SID",i.K),z(u,"RID",a),z(u,"TYPE","terminate"),Je(i,u),a=new Bt(i,i.j,a),a.L=2,a.v=Cn(Nt(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=a.v,u=!0),u||(a.g=ro(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Pn(a)}eo(i)}function kn(i){i.g&&(Gr(i),i.g.cancel(),i.g=null)}function Qs(i){kn(i),i.u&&(c.clearTimeout(i.u),i.u=null),Mn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function xn(i){if(!Cs(i.h)&&!i.s){i.s=!0;var a=i.Ga;Oe||as(),Le||(Oe(),Le=!0),wr.add(a,i),i.B=0}}function _u(i,a){return Vs(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=je(P(i.Ga,i,a),to(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new Bt(this,this.j,i);let w=this.o;if(this.S&&(w?(w=d(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(T.H=w,w=null),this.P)t:{for(var a=0,u=0;u<this.i.length;u++){e:{var h=this.i[u];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break e}h=void 0}if(h===void 0)break;if(a+=h,4096<a){a=u;break t}if(a===4096||u===this.i.length-1){a=u+1;break t}}a=1e3}else a=1e3;a=Xs(this,T,a),u=Nt(this.I),z(u,"RID",i),z(u,"CVER",22),this.D&&z(u,"X-HTTP-Session-Id",this.D),Je(this,u),w&&(this.O?a="headers="+encodeURIComponent(String(Us(w)))+"&"+a:this.m&&Hr(u,this.m,w)),jr(this.h,T),this.Ua&&z(u,"TYPE","init"),this.P?(z(u,"$req",a),z(u,"SID","null"),T.T=!0,Fr(T,u,null)):Fr(T,u,a),this.G=2}}else this.G==3&&(i?Ws(this,i):this.i.length==0||Cs(this.h)||Ws(this))};function Ws(i,a){var u;a?u=a.l:u=i.U++;const h=Nt(i.I);z(h,"SID",i.K),z(h,"RID",u),z(h,"AID",i.T),Je(i,h),i.m&&i.o&&Hr(h,i.m,i.o),u=new Bt(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),a&&(i.i=a.D.concat(i.i)),a=Xs(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),jr(i.h,u),Fr(u,h,a)}function Je(i,a){i.H&&_t(i.H,function(u,h){z(a,h,u)}),i.l&&ks({},function(u,h){z(a,h,u)})}function Xs(i,a,u){u=Math.min(i.i.length,u);var h=i.l?P(i.l.Na,i.l,i):null;t:{var T=i.i;let w=-1;for(;;){const b=["count="+u];w==-1?0<u?(w=T[0].g,b.push("ofs="+w)):w=0:b.push("ofs="+w);let H=!0;for(let rt=0;rt<u;rt++){let U=T[rt].g;const ht=T[rt].map;if(U-=w,0>U)w=Math.max(0,T[rt].g-100),H=!1;else try{pu(ht,b,"req"+U+"_")}catch{h&&h(ht)}}if(H){h=b.join("&");break t}}}return i=i.i.splice(0,u),a.D=i,h}function Js(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;Oe||as(),Le||(Oe(),Le=!0),wr.add(a,i),i.v=0}}function zr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=je(P(i.Fa,i),to(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Ys(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=je(P(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),kn(this),Ys(this))};function Gr(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function Ys(i){i.g=new Bt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=Nt(i.qa);z(a,"RID","rpc"),z(a,"SID",i.K),z(a,"AID",i.T),z(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&z(a,"TO",i.ja),z(a,"TYPE","xmlhttp"),Je(i,a),i.m&&i.o&&Hr(a,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=Cn(Nt(a)),u.m=null,u.P=!0,Rs(u,i)}n.Za=function(){this.C!=null&&(this.C=null,kn(this),zr(this),yt(19))};function Mn(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function Zs(i,a){var u=null;if(i.g==a){Mn(i),Gr(i),i.g=null;var h=2}else if(Ur(i.h,a))u=a.D,Ds(i.h,a),h=1;else return;if(i.G!=0){if(a.o)if(h==1){u=a.m?a.m.length:0,a=Date.now()-a.F;var T=i.B;h=An(),gt(h,new vs(h,u)),xn(i)}else Js(i);else if(T=a.s,T==3||T==0&&0<a.X||!(h==1&&_u(i,a)||h==2&&zr(i)))switch(u&&0<u.length&&(a=i.h,a.i=a.i.concat(u)),T){case 1:ee(i,5);break;case 4:ee(i,10);break;case 3:ee(i,6);break;default:ee(i,2)}}}function to(i,a){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*a}function ee(i,a){if(i.j.info("Error code "+a),a==2){var u=P(i.fb,i),h=i.Xa;const T=!h;h=new te(h||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Sn(h,"https"),Cn(h),T?hu(h.toString(),u):fu(h.toString(),u)}else yt(2);i.G=0,i.l&&i.l.sa(a),eo(i),Qs(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function eo(i){if(i.G=0,i.ka=[],i.l){const a=Ns(i.h);(a.length!=0||i.i.length!=0)&&(N(i.ka,a),N(i.ka,i.i),i.h.i.length=0,x(i.i),i.i.length=0),i.l.ra()}}function no(i,a,u){var h=u instanceof te?Nt(u):new te(u);if(h.g!="")a&&(h.g=a+"."+h.g),bn(h,h.s);else{var T=c.location;h=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var w=new te(null);h&&Sn(w,h),a&&(w.g=a),T&&bn(w,T),u&&(w.l=u),h=w}return u=i.D,a=i.ya,u&&a&&z(h,u,a),z(h,"VER",i.la),Je(i,h),h}function ro(i,a,u){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new X(new Vn({eb:u})):new X(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function io(){}n=io.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function On(){}On.prototype.g=function(i,a){return new vt(i,a)};function vt(i,a){ct.call(this),this.g=new Ks(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!K(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!K(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new ye(this)}D(vt,ct),vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){qr(this.g)},vt.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Nr(i),i=u);a.i.push(new eu(a.Ya++,i)),a.G==3&&xn(a)},vt.prototype.N=function(){this.g.l=null,delete this.j,qr(this.g),delete this.g,vt.aa.N.call(this)};function so(i){xr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){t:{for(const u in a){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}D(so,xr);function oo(){Mr.call(this),this.status=1}D(oo,Mr);function ye(i){this.g=i}D(ye,io),ye.prototype.ua=function(){gt(this.g,"a")},ye.prototype.ta=function(i){gt(this.g,new so(i))},ye.prototype.sa=function(i){gt(this.g,new oo)},ye.prototype.ra=function(){gt(this.g,"b")},On.prototype.createWebChannel=On.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Na=function(){return new On},Da=function(){return An()},Va=Yt,ci={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},wn.NO_ERROR=0,wn.TIMEOUT=8,wn.HTTP_ERROR=6,qn=wn,Is.COMPLETE="complete",Ca=Is,ys.EventType=Be,Be.OPEN="a",Be.CLOSE="b",Be.ERROR="c",Be.MESSAGE="d",ct.prototype.listen=ct.prototype.K,tn=ys,X.prototype.listenOnce=X.prototype.L,X.prototype.getLastError=X.prototype.Ka,X.prototype.getLastErrorCode=X.prototype.Ba,X.prototype.getStatus=X.prototype.Z,X.prototype.getResponseJson=X.prototype.Oa,X.prototype.getResponseText=X.prototype.oa,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Ha,ba=X}).apply(typeof $n<"u"?$n:typeof self<"u"?self:typeof window<"u"?window:{});const Eo="@firebase/firestore",To="4.7.11";/**
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
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
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
 */let ke="11.6.1";/**
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
 */const ue=new Ia("@firebase/firestore");function Ee(){return ue.logLevel}function V(n,...t){if(ue.logLevel<=F.DEBUG){const e=t.map(xi);ue.debug(`Firestore (${ke}): ${n}`,...e)}}function ce(n,...t){if(ue.logLevel<=F.ERROR){const e=t.map(xi);ue.error(`Firestore (${ke}): ${n}`,...e)}}function mr(n,...t){if(ue.logLevel<=F.WARN){const e=t.map(xi);ue.warn(`Firestore (${ke}): ${n}`,...e)}}function xi(n){if(typeof n=="string")return n;try{/**
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
 */function O(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,ka(n,r,e)}function ka(n,t,e){let r=`FIRESTORE (${ke}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw ce(r),new Error(r)}function J(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||ka(t,s,r)}function q(n,t){return n}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Ne{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ie{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class xa{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class hh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class fh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class dh{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){J(this.o===void 0,42304);let r=this.i;const s=f=>this.i!==r?(r=this.i,e(f)):Promise.resolve();let o=new ie;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ie,t.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const f=o;t.enqueueRetryable(async()=>{await f.promise,await s(this.currentUser)})},c=f=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(f=>c(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?c(f):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ie)}},0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string",31837,{l:r}),new xa(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return J(t===null||typeof t=="string",2055,{h:t}),new pt(t)}}class ph{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class mh{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new ph(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gh{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qc(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){J(this.o===void 0,3512);const r=o=>{o.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.m;return this.m=o.token,V("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new vo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(J(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new vo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function yh(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */function _h(){return new TextEncoder}/**
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
 */class Ma{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=yh(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function hi(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return B(r,s);{const o=_h(),l=Eh(o.encode(Io(n,e)),o.encode(Io(t,e)));return l!==0?l:B(r,s)}}e+=r>65535?2:1}return B(n.length,t.length)}function Io(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Eh(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return B(n[e],t[e]);return B(n.length,t.length)}function Pe(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
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
 */const Ao=-62135596800,wo=1e6;class nt{static now(){return nt.fromMillis(Date.now())}static fromDate(t){return nt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*wo);return new nt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ao)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/wo}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-Ao;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class G{static fromTimestamp(t){return new G(t)}static min(){return new G(new nt(0,0))}static max(){return new G(new nt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ro="__name__";class bt{constructor(t,e,r){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&O(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return bt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof bt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=bt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=bt.isNumericId(t),s=bt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?bt.extractNumericId(t).compare(bt.extractNumericId(e)):hi(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ki.fromString(t.substring(4,t.length-2))}}class Z extends bt{construct(t,e,r){return new Z(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Z(e)}static emptyPath(){return new Z([])}}const Th=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends bt{construct(t,e,r){return new ot(t,e,r)}static isValidIdentifier(t){return Th.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ro}static keyField(){return new ot([Ro])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let l=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const f=t[s+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=f,s+=2}else c==="`"?(l=!l,s++):c!=="."||l?(r+=c,s++):(o(),s++)}if(o(),l)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
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
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(Z.fromString(t))}static fromName(t){return new M(Z.fromString(t).popFirst(5))}static empty(){return new M(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Z.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Z.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new Z(t.slice()))}}/**
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
 */const ln=-1;function vh(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=G.fromTimestamp(r===1e9?new nt(e+1,0):new nt(e,r));return new Gt(s,M.empty(),t)}function Ih(n){return new Gt(n.readTime,n.key,ln)}class Gt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Gt(G.min(),M.empty(),ln)}static max(){return new Gt(G.max(),M.empty(),ln)}}function Ah(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
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
 */const wh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Rh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Mi(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==wh)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):R.reject(e)}static resolve(t){return new R((e,r)=>{e(t)})}static reject(t){return new R((e,r)=>{r(t)})}static waitFor(t){return new R((e,r)=>{let s=0,o=0,l=!1;t.forEach(c=>{++s,c.next(()=>{++o,l&&o===s&&e()},f=>r(f))}),l=!0,o===s&&e()})}static or(t){let e=R.resolve(!1);for(const r of t)e=e.next(s=>s?R.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new R((r,s)=>{const o=t.length,l=new Array(o);let c=0;for(let f=0;f<o;f++){const p=f;e(t[p]).next(I=>{l[p]=I,++c,c===o&&r(l)},I=>s(I))}})}static doWhile(t,e){return new R((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Ph(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function pn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Oi{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ue(r),this.ce=r=>e.writeSequenceNumber(r))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Oi.le=-1;/**
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
 */const Li=-1;function Fi(n){return n==null}function Zn(n){return n===0&&1/n==-1/0}function Sh(n){return typeof n=="number"&&Number.isInteger(n)&&!Zn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Oa="";function bh(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Po(t)),t=Ch(n.get(e),t);return Po(t)}function Ch(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Oa:e+="";break;default:e+=o}}return e}function Po(n){return n+Oa+""}/**
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
 */function So(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function xe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function La(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class Tt{constructor(t,e){this.comparator=t,this.root=e||it.EMPTY}insert(t,e){return new Tt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,it.BLACK,null,null))}remove(t){return new Tt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,it.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Bn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Bn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Bn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Bn(this.root,t,this.comparator,!0)}}class Bn{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class it{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??it.RED,this.left=s??it.EMPTY,this.right=o??it.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new it(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return it.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return it.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,it.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,it.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}it.EMPTY=null,it.RED=!0,it.BLACK=!1;it.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new it(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class at{constructor(t){this.comparator=t,this.data=new Tt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new bo(this.data.getIterator())}getIteratorFrom(t){return new bo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof at)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new at(this.comparator);return e.data=t,e}}class bo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Pt{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new Pt([])}unionWith(t){let e=new at(ot.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Pt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Pe(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
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
 */class Vh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Vh("Invalid base64 string: "+o):o}}(t);return new Ct(e)}static fromUint8Array(t){const e=function(s){let o="";for(let l=0;l<s.length;++l)o+=String.fromCharCode(s[l]);return o}(t);return new Ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ct.EMPTY_BYTE_STRING=new Ct("");const Dh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function he(n){if(J(!!n,39018),typeof n=="string"){let t=0;const e=Dh.exec(n);if(J(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:st(n.seconds),nanos:st(n.nanos)}}function st(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Se(n){return typeof n=="string"?Ct.fromBase64String(n):Ct.fromUint8Array(n)}/**
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
 */const Fa="server_timestamp",$a="__type__",Ba="__previous_value__",Ua="__local_write_time__";function $i(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[$a])===null||e===void 0?void 0:e.stringValue)===Fa}function Bi(n){const t=n.mapValue.fields[Ba];return $i(t)?Bi(t):t}function tr(n){const t=he(n.mapValue.fields[Ua].timestampValue);return new nt(t.seconds,t.nanos)}/**
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
 */class Nh{constructor(t,e,r,s,o,l,c,f,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=c,this.longPollingOptions=f,this.useFetchStreams=p}}const er="(default)";class nr{constructor(t,e){this.projectId=t,this.database=e||er}static empty(){return new nr("","")}get isDefaultDatabase(){return this.database===er}isEqual(t){return t instanceof nr&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const ja="__type__",kh="__max__",Un={mapValue:{}},Ha="__vector__",fi="value";function fe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?$i(n)?4:Mh(n)?9007199254740991:xh(n)?10:11:O(28295,{value:n})}function Vt(n,t){if(n===t)return!0;const e=fe(n);if(e!==fe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return tr(n).isEqual(tr(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const l=he(s.timestampValue),c=he(o.timestampValue);return l.seconds===c.seconds&&l.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return Se(s.bytesValue).isEqual(Se(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return st(s.geoPointValue.latitude)===st(o.geoPointValue.latitude)&&st(s.geoPointValue.longitude)===st(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return st(s.integerValue)===st(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const l=st(s.doubleValue),c=st(o.doubleValue);return l===c?Zn(l)===Zn(c):isNaN(l)&&isNaN(c)}return!1}(n,t);case 9:return Pe(n.arrayValue.values||[],t.arrayValue.values||[],Vt);case 10:case 11:return function(s,o){const l=s.mapValue.fields||{},c=o.mapValue.fields||{};if(So(l)!==So(c))return!1;for(const f in l)if(l.hasOwnProperty(f)&&(c[f]===void 0||!Vt(l[f],c[f])))return!1;return!0}(n,t);default:return O(52216,{left:n})}}function un(n,t){return(n.values||[]).find(e=>Vt(e,t))!==void 0}function be(n,t){if(n===t)return 0;const e=fe(n),r=fe(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,l){const c=st(o.integerValue||o.doubleValue),f=st(l.integerValue||l.doubleValue);return c<f?-1:c>f?1:c===f?0:isNaN(c)?isNaN(f)?0:-1:1}(n,t);case 3:return Co(n.timestampValue,t.timestampValue);case 4:return Co(tr(n),tr(t));case 5:return hi(n.stringValue,t.stringValue);case 6:return function(o,l){const c=Se(o),f=Se(l);return c.compareTo(f)}(n.bytesValue,t.bytesValue);case 7:return function(o,l){const c=o.split("/"),f=l.split("/");for(let p=0;p<c.length&&p<f.length;p++){const I=B(c[p],f[p]);if(I!==0)return I}return B(c.length,f.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,l){const c=B(st(o.latitude),st(l.latitude));return c!==0?c:B(st(o.longitude),st(l.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Vo(n.arrayValue,t.arrayValue);case 10:return function(o,l){var c,f,p,I;const A=o.fields||{},P=l.fields||{},C=(c=A[fi])===null||c===void 0?void 0:c.arrayValue,D=(f=P[fi])===null||f===void 0?void 0:f.arrayValue,x=B(((p=C==null?void 0:C.values)===null||p===void 0?void 0:p.length)||0,((I=D==null?void 0:D.values)===null||I===void 0?void 0:I.length)||0);return x!==0?x:Vo(C,D)}(n.mapValue,t.mapValue);case 11:return function(o,l){if(o===Un.mapValue&&l===Un.mapValue)return 0;if(o===Un.mapValue)return 1;if(l===Un.mapValue)return-1;const c=o.fields||{},f=Object.keys(c),p=l.fields||{},I=Object.keys(p);f.sort(),I.sort();for(let A=0;A<f.length&&A<I.length;++A){const P=hi(f[A],I[A]);if(P!==0)return P;const C=be(c[f[A]],p[I[A]]);if(C!==0)return C}return B(f.length,I.length)}(n.mapValue,t.mapValue);default:throw O(23264,{Pe:e})}}function Co(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=he(n),r=he(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function Vo(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=be(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function Ce(n){return di(n)}function di(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=he(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Se(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=di(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const l of r)o?o=!1:s+=",",s+=`${l}:${di(e.fields[l])}`;return s+"}"}(n.mapValue):O(61005,{value:n})}function zn(n){switch(fe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Bi(n);return t?16+zn(t):16;case 5:return 2*n.stringValue.length;case 6:return Se(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+zn(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return xe(r.fields,(o,l)=>{s+=o.length+zn(l)}),s}(n.mapValue);default:throw O(13486,{value:n})}}function pi(n){return!!n&&"integerValue"in n}function Ui(n){return!!n&&"arrayValue"in n}function Gn(n){return!!n&&"mapValue"in n}function xh(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[ja])===null||e===void 0?void 0:e.stringValue)===Ha}function en(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return xe(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=en(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=en(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Mh(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===kh}/**
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
 */class Rt{constructor(t){this.value=t}static empty(){return new Rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=en(e)}setAll(t){let e=ot.emptyPath(),r={},s=[];t.forEach((l,c)=>{if(!e.isImmediateParentOf(c)){const f=this.getFieldsMap(e);this.applyChanges(f,r,s),r={},s=[],e=c.popLast()}l?r[c.lastSegment()]=en(l):s.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Vt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Gn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){xe(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new Rt(en(this.value))}}function qa(n){const t=[];return xe(n.fields,(e,r)=>{const s=new ot([e]);if(Gn(r)){const o=qa(r.mapValue).fields;if(o.length===0)t.push(s);else for(const l of o)t.push(s.child(l))}else t.push(s)}),new Pt(t)}/**
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
 */class wt{constructor(t,e,r,s,o,l,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=l,this.documentState=c}static newInvalidDocument(t){return new wt(t,0,G.min(),G.min(),G.min(),Rt.empty(),0)}static newFoundDocument(t,e,r,s){return new wt(t,1,e,G.min(),r,s,0)}static newNoDocument(t,e){return new wt(t,2,e,G.min(),G.min(),Rt.empty(),0)}static newUnknownDocument(t,e){return new wt(t,3,e,G.min(),G.min(),Rt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof wt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new wt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class rr{constructor(t,e){this.position=t,this.inclusive=e}}function Do(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],l=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(l.referenceValue),e.key):r=be(l,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function No(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Vt(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class ir{constructor(t,e="asc"){this.field=t,this.dir=e}}function Oh(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class za{}class et extends za{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Fh(t,e,r):e==="array-contains"?new Uh(t,r):e==="in"?new jh(t,r):e==="not-in"?new Hh(t,r):e==="array-contains-any"?new qh(t,r):new et(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new $h(t,r):new Bh(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(be(e,this.value)):e!==null&&fe(this.value)===fe(e)&&this.matchesComparison(be(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Kt extends za{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Kt(t,e)}matches(t){return Ga(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Ga(n){return n.op==="and"}function Ka(n){return Lh(n)&&Ga(n)}function Lh(n){for(const t of n.filters)if(t instanceof Kt)return!1;return!0}function mi(n){if(n instanceof et)return n.field.canonicalString()+n.op.toString()+Ce(n.value);if(Ka(n))return n.filters.map(t=>mi(t)).join(",");{const t=n.filters.map(e=>mi(e)).join(",");return`${n.op}(${t})`}}function Qa(n,t){return n instanceof et?function(r,s){return s instanceof et&&r.op===s.op&&r.field.isEqual(s.field)&&Vt(r.value,s.value)}(n,t):n instanceof Kt?function(r,s){return s instanceof Kt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,l,c)=>o&&Qa(l,s.filters[c]),!0):!1}(n,t):void O(19439)}function Wa(n){return n instanceof et?function(e){return`${e.field.canonicalString()} ${e.op} ${Ce(e.value)}`}(n):n instanceof Kt?function(e){return e.op.toString()+" {"+e.getFilters().map(Wa).join(" ,")+"}"}(n):"Filter"}class Fh extends et{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class $h extends et{constructor(t,e){super(t,"in",e),this.keys=Xa("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Bh extends et{constructor(t,e){super(t,"not-in",e),this.keys=Xa("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Xa(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>M.fromName(r.referenceValue))}class Uh extends et{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ui(e)&&un(e.arrayValue,this.value)}}class jh extends et{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&un(this.value.arrayValue,e)}}class Hh extends et{constructor(t,e){super(t,"not-in",e)}matches(t){if(un(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!un(this.value.arrayValue,e)}}class qh extends et{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ui(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>un(this.value.arrayValue,r))}}/**
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
 */class zh{constructor(t,e=null,r=[],s=[],o=null,l=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=l,this.endAt=c,this.Ie=null}}function ko(n,t=null,e=[],r=[],s=null,o=null,l=null){return new zh(n,t,e,r,s,o,l)}function ji(n){const t=q(n);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>mi(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Fi(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Ce(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Ce(r)).join(",")),t.Ie=e}return t.Ie}function Hi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Oh(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Qa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!No(n.startAt,t.startAt)&&No(n.endAt,t.endAt)}/**
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
 */class gr{constructor(t,e=null,r=[],s=[],o=null,l="F",c=null,f=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=l,this.startAt=c,this.endAt=f,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function Gh(n,t,e,r,s,o,l,c){return new gr(n,t,e,r,s,o,l,c)}function Kh(n){return new gr(n)}function xo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Qh(n){return n.collectionGroup!==null}function nn(n){const t=q(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let c=new at(ot.comparator);return l.filters.forEach(f=>{f.getFlattenedFilters().forEach(p=>{p.isInequality()&&(c=c.add(p.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new ir(o,r))}),e.has(ot.keyField().canonicalString())||t.Ee.push(new ir(ot.keyField(),r))}return t.Ee}function se(n){const t=q(n);return t.de||(t.de=Wh(t,nn(n))),t.de}function Wh(n,t){if(n.limitType==="F")return ko(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new ir(s.field,o)});const e=n.endAt?new rr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new rr(n.startAt.position,n.startAt.inclusive):null;return ko(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function gi(n,t,e){return new gr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ja(n,t){return Hi(se(n),se(t))&&n.limitType===t.limitType}function Ya(n){return`${ji(se(n))}|lt:${n.limitType}`}function Ye(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Wa(s)).join(", ")}]`),Fi(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(l){return`${l.field.canonicalString()} (${l.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>Ce(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>Ce(s)).join(",")),`Target(${r})`}(se(n))}; limitType=${n.limitType})`}function qi(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of nn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(l,c,f){const p=Do(l,c,f);return l.inclusive?p<=0:p<0}(r.startAt,nn(r),s)||r.endAt&&!function(l,c,f){const p=Do(l,c,f);return l.inclusive?p>=0:p>0}(r.endAt,nn(r),s))}(n,t)}function Xh(n){return(t,e)=>{let r=!1;for(const s of nn(n)){const o=Jh(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Jh(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):function(o,l,c){const f=l.data.field(o),p=c.data.field(o);return f!==null&&p!==null?be(f,p):O(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return O(19790,{direction:n.dir})}}/**
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
 */class de{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){xe(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return La(this.inner)}size(){return this.innerSize}}/**
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
 */const Yh=new Tt(M.comparator);function sr(){return Yh}const Za=new Tt(M.comparator);function jn(...n){let t=Za;for(const e of n)t=t.insert(e.key,e);return t}function tl(n){let t=Za;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function re(){return rn()}function el(){return rn()}function rn(){return new de(n=>n.toString(),(n,t)=>n.isEqual(t))}const Zh=new Tt(M.comparator),tf=new at(M.comparator);function mt(...n){let t=tf;for(const e of n)t=t.add(e);return t}const ef=new at(B);function nf(){return ef}/**
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
 */function zi(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zn(t)?"-0":t}}function nl(n){return{integerValue:""+n}}function rf(n,t){return Sh(t)?nl(t):zi(n,t)}/**
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
 */class yr{constructor(){this._=void 0}}function sf(n,t,e){return n instanceof or?function(s,o){const l={fields:{[$a]:{stringValue:Fa},[Ua]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&$i(o)&&(o=Bi(o)),o&&(l.fields[Ba]=o),{mapValue:l}}(e,t):n instanceof cn?il(n,t):n instanceof hn?sl(n,t):function(s,o){const l=rl(s,o),c=Mo(l)+Mo(s.Re);return pi(l)&&pi(s.Re)?nl(c):zi(s.serializer,c)}(n,t)}function of(n,t,e){return n instanceof cn?il(n,t):n instanceof hn?sl(n,t):e}function rl(n,t){return n instanceof ar?function(r){return pi(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class or extends yr{}class cn extends yr{constructor(t){super(),this.elements=t}}function il(n,t){const e=ol(t);for(const r of n.elements)e.some(s=>Vt(s,r))||e.push(r);return{arrayValue:{values:e}}}class hn extends yr{constructor(t){super(),this.elements=t}}function sl(n,t){let e=ol(t);for(const r of n.elements)e=e.filter(s=>!Vt(s,r));return{arrayValue:{values:e}}}class ar extends yr{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Mo(n){return st(n.integerValue||n.doubleValue)}function ol(n){return Ui(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function af(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof cn&&s instanceof cn||r instanceof hn&&s instanceof hn?Pe(r.elements,s.elements,Vt):r instanceof ar&&s instanceof ar?Vt(r.Re,s.Re):r instanceof or&&s instanceof or}(n.transform,t.transform)}class lf{constructor(t,e){this.version=t,this.transformResults=e}}class xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new xt}static exists(t){return new xt(void 0,t)}static updateTime(t){return new xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Kn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class _r{}function al(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ul(n.key,xt.none()):new mn(n.key,n.data,xt.none());{const e=n.data,r=Rt.empty();let s=new at(ot.comparator);for(let o of t.fields)if(!s.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?r.delete(o):r.set(o,l),s=s.add(o)}return new pe(n.key,r,new Pt(s.toArray()),xt.none())}}function uf(n,t,e){n instanceof mn?function(s,o,l){const c=s.value.clone(),f=Lo(s.fieldTransforms,o,l.transformResults);c.setAll(f),o.convertToFoundDocument(l.version,c).setHasCommittedMutations()}(n,t,e):n instanceof pe?function(s,o,l){if(!Kn(s.precondition,o))return void o.convertToUnknownDocument(l.version);const c=Lo(s.fieldTransforms,o,l.transformResults),f=o.data;f.setAll(ll(s)),f.setAll(c),o.convertToFoundDocument(l.version,f).setHasCommittedMutations()}(n,t,e):function(s,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()}(0,t,e)}function sn(n,t,e,r){return n instanceof mn?function(o,l,c,f){if(!Kn(o.precondition,l))return c;const p=o.value.clone(),I=Fo(o.fieldTransforms,f,l);return p.setAll(I),l.convertToFoundDocument(l.version,p).setHasLocalMutations(),null}(n,t,e,r):n instanceof pe?function(o,l,c,f){if(!Kn(o.precondition,l))return c;const p=Fo(o.fieldTransforms,f,l),I=l.data;return I.setAll(ll(o)),I.setAll(p),l.convertToFoundDocument(l.version,I).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(n,t,e,r):function(o,l,c){return Kn(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):c}(n,t,e)}function cf(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=rl(r.transform,s||null);o!=null&&(e===null&&(e=Rt.empty()),e.set(r.field,o))}return e||null}function Oo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Pe(r,s,(o,l)=>af(o,l))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class mn extends _r{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class pe extends _r{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function ll(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Lo(n,t,e){const r=new Map;J(n.length===e.length,32656,{Ve:e.length,me:n.length});for(let s=0;s<e.length;s++){const o=n[s],l=o.transform,c=t.data.field(o.field);r.set(o.field,of(l,c,e[s]))}return r}function Fo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,l=e.data.field(s.field);r.set(s.field,sf(o,l,t))}return r}class ul extends _r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hf extends _r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ff{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&uf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=sn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=sn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=el();return this.mutations.forEach(s=>{const o=t.get(s.key),l=o.overlayedDocument;let c=this.applyToLocalView(l,o.mutatedFields);c=e.has(s.key)?null:c;const f=al(l,c);f!==null&&r.set(s.key,f),l.isValidDocument()||l.convertToNoDocument(G.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),mt())}isEqual(t){return this.batchId===t.batchId&&Pe(this.mutations,t.mutations,(e,r)=>Oo(e,r))&&Pe(this.baseMutations,t.baseMutations,(e,r)=>Oo(e,r))}}class Gi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){J(t.mutations.length===r.length,58842,{fe:t.mutations.length,ge:r.length});let s=function(){return Zh}();const o=t.mutations;for(let l=0;l<o.length;l++)s=s.insert(o[l].key,r[l].version);return new Gi(t,e,r,s)}}/**
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
 */class df{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */var Y,L;function pf(n){switch(n){case S.OK:return O(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return O(15467,{code:n})}}function mf(n){if(n===void 0)return ce("GRPC error has no .code"),S.UNKNOWN;switch(n){case Y.OK:return S.OK;case Y.CANCELLED:return S.CANCELLED;case Y.UNKNOWN:return S.UNKNOWN;case Y.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Y.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Y.INTERNAL:return S.INTERNAL;case Y.UNAVAILABLE:return S.UNAVAILABLE;case Y.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Y.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Y.NOT_FOUND:return S.NOT_FOUND;case Y.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Y.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Y.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Y.ABORTED:return S.ABORTED;case Y.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Y.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Y.DATA_LOSS:return S.DATA_LOSS;default:return O(39323,{code:n})}}(L=Y||(Y={}))[L.OK=0]="OK",L[L.CANCELLED=1]="CANCELLED",L[L.UNKNOWN=2]="UNKNOWN",L[L.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",L[L.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",L[L.NOT_FOUND=5]="NOT_FOUND",L[L.ALREADY_EXISTS=6]="ALREADY_EXISTS",L[L.PERMISSION_DENIED=7]="PERMISSION_DENIED",L[L.UNAUTHENTICATED=16]="UNAUTHENTICATED",L[L.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",L[L.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",L[L.ABORTED=10]="ABORTED",L[L.OUT_OF_RANGE=11]="OUT_OF_RANGE",L[L.UNIMPLEMENTED=12]="UNIMPLEMENTED",L[L.INTERNAL=13]="INTERNAL",L[L.UNAVAILABLE=14]="UNAVAILABLE",L[L.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new ki([4294967295,4294967295],0);class gf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function yi(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function yf(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function _f(n,t){return yi(n,t.toTimestamp())}function Ie(n){return J(!!n,49232),G.fromTimestamp(function(e){const r=he(e);return new nt(r.seconds,r.nanos)}(n))}function cl(n,t){return _i(n,t).canonicalString()}function _i(n,t){const e=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Ef(n){const t=Z.fromString(n);return J(Sf(t),10190,{key:t.toString()}),t}function Ei(n,t){return cl(n.databaseId,t.path)}function Tf(n){const t=Ef(n);return t.length===4?Z.emptyPath():If(t)}function vf(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function If(n){return J(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function $o(n,t,e){return{name:Ei(n,t),fields:e.value.mapValue.fields}}function Af(n,t){let e;if(t instanceof mn)e={update:$o(n,t.key,t.value)};else if(t instanceof ul)e={delete:Ei(n,t.key)};else if(t instanceof pe)e={update:$o(n,t.key,t.data),updateMask:Pf(t.fieldMask)};else{if(!(t instanceof hf))return O(16599,{ft:t.type});e={verify:Ei(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,l){const c=l.transform;if(c instanceof or)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof cn)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof hn)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ar)return{fieldPath:l.field.canonicalString(),increment:c.Re};throw O(20930,{transform:l.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:_f(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O(27497)}(n,t.precondition)),e}function wf(n,t){return n&&n.length>0?(J(t!==void 0,14353),n.map(e=>function(s,o){let l=s.updateTime?Ie(s.updateTime):Ie(o);return l.isEqual(G.min())&&(l=Ie(o)),new lf(l,s.transformResults||[])}(e,t))):[]}function Rf(n){let t=Tf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){J(r===1,65062);const I=e.from[0];I.allDescendants?s=I.collectionId:t=t.child(I.collectionId)}let o=[];e.where&&(o=function(A){const P=hl(A);return P instanceof Kt&&Ka(P)?P.getFilters():[P]}(e.where));let l=[];e.orderBy&&(l=function(A){return A.map(P=>function(D){return new ir(Te(D.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(P))}(e.orderBy));let c=null;e.limit&&(c=function(A){let P;return P=typeof A=="object"?A.value:A,Fi(P)?null:P}(e.limit));let f=null;e.startAt&&(f=function(A){const P=!!A.before,C=A.values||[];return new rr(C,P)}(e.startAt));let p=null;return e.endAt&&(p=function(A){const P=!A.before,C=A.values||[];return new rr(C,P)}(e.endAt)),Gh(t,s,l,o,c,"F",f,p)}function hl(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Te(e.unaryFilter.field);return et.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Te(e.unaryFilter.field);return et.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Te(e.unaryFilter.field);return et.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Te(e.unaryFilter.field);return et.create(l,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(n):n.fieldFilter!==void 0?function(e){return et.create(Te(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Kt.create(e.compositeFilter.filters.map(r=>hl(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(n):O(30097,{filter:n})}function Te(n){return ot.fromServerFormat(n.fieldPath)}function Pf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Sf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class bf{constructor(t){this.wt=t}}function Cf(n){const t=Rf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?gi(t,t.limit,"L"):t}/**
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
 */class Vf{constructor(){this.yn=new Df}addToCollectionParentIndex(t,e){return this.yn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Gt.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Gt.min())}updateCollectionGroup(t,e,r){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class Df{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new at(Z.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new at(Z.comparator)).toArray()}}/**
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
 */const Bo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},fl=41943040;class Et{static withCacheSize(t){return new Et(t,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Et.DEFAULT_COLLECTION_PERCENTILE=10,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Et.DEFAULT=new Et(fl,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Et.DISABLED=new Et(-1,0,0);/**
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
 */class Ve{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new Ve(0)}static ir(){return new Ve(-1)}}/**
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
 */const Uo="LruGarbageCollector",Nf=1048576;function jo([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class kf{constructor(t){this.cr=t,this.buffer=new at(jo),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();jo(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(t){V(Uo,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){pn(e)?V(Uo,"Ignoring IndexedDB error during garbage collection: ",e):await Mi(e)}await this.Ir(3e5)})}}class Mf{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return R.resolve(Oi.le);const r=new kf(e);return this.Er.forEachTarget(t,s=>r.Pr(s.sequenceNumber)).next(()=>this.Er.Ar(t,s=>r.Pr(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Er.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Bo)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Bo):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let r,s,o,l,c,f,p;const I=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(A=>(A>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${A}`),s=this.params.maximumSequenceNumbersToCollect):s=A,l=Date.now(),this.nthSequenceNumber(t,s))).next(A=>(r=A,c=Date.now(),this.removeTargets(t,r,e))).next(A=>(o=A,f=Date.now(),this.removeOrphanedDocuments(t,r))).next(A=>(p=Date.now(),Ee()<=F.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${l-I}ms
	Determined least recently used ${s} in `+(c-l)+`ms
	Removed ${o} targets in `+(f-c)+`ms
	Removed ${A} documents in `+(p-f)+`ms
Total Duration: ${p-I}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:A})))}}function Of(n,t){return new Mf(n,t)}/**
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
 */class Lf{constructor(){this.changes=new de(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,wt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?R.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Ff{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class $f{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&sn(r.mutation,s,Pt.empty(),nt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,mt()).next(()=>r))}getLocalViewOfDocuments(t,e,r=mt()){const s=re();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let l=jn();return o.forEach((c,f)=>{l=l.insert(c,f.overlayedDocument)}),l}))}getOverlayedDocuments(t,e){const r=re();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,mt()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((l,c)=>{e.set(l,c)})})}computeViews(t,e,r,s){let o=sr();const l=rn(),c=function(){return rn()}();return e.forEach((f,p)=>{const I=r.get(p.key);s.has(p.key)&&(I===void 0||I.mutation instanceof pe)?o=o.insert(p.key,p):I!==void 0?(l.set(p.key,I.mutation.getFieldMask()),sn(I.mutation,p,I.mutation.getFieldMask(),nt.now())):l.set(p.key,Pt.empty())}),this.recalculateAndSaveOverlays(t,o).next(f=>(f.forEach((p,I)=>l.set(p,I)),e.forEach((p,I)=>{var A;return c.set(p,new Ff(I,(A=l.get(p))!==null&&A!==void 0?A:null))}),c))}recalculateAndSaveOverlays(t,e){const r=rn();let s=new Tt((l,c)=>l-c),o=mt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(l=>{for(const c of l)c.keys().forEach(f=>{const p=e.get(f);if(p===null)return;let I=r.get(f)||Pt.empty();I=c.applyToLocalView(p,I),r.set(f,I);const A=(s.get(c.batchId)||mt()).add(f);s=s.insert(c.batchId,A)})}).next(()=>{const l=[],c=s.getReverseIterator();for(;c.hasNext();){const f=c.getNext(),p=f.key,I=f.value,A=el();I.forEach(P=>{if(!o.has(P)){const C=al(e.get(P),r.get(P));C!==null&&A.set(P,C),o=o.add(P)}}),l.push(this.documentOverlayCache.saveOverlays(t,p,A))}return R.waitFor(l)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(l){return M.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Qh(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const l=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):R.resolve(re());let c=ln,f=o;return l.next(p=>R.forEach(p,(I,A)=>(c<A.largestBatchId&&(c=A.largestBatchId),o.get(I)?R.resolve():this.remoteDocumentCache.getEntry(t,I).next(P=>{f=f.insert(I,P)}))).next(()=>this.populateOverlays(t,p,o)).next(()=>this.computeViews(t,f,p,mt())).next(I=>({batchId:c,changes:tl(I)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(r=>{let s=jn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let l=jn();return this.indexManager.getCollectionParents(t,o).next(c=>R.forEach(c,f=>{const p=function(A,P){return new gr(P,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(e,f.child(o));return this.getDocumentsMatchingCollectionQuery(t,p,r,s).next(I=>{I.forEach((A,P)=>{l=l.insert(A,P)})})}).next(()=>l))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(l=>{o.forEach((f,p)=>{const I=p.getKey();l.get(I)===null&&(l=l.insert(I,wt.newInvalidDocument(I)))});let c=jn();return l.forEach((f,p)=>{const I=o.get(f);I!==void 0&&sn(I.mutation,p,Pt.empty(),nt.now()),qi(e,p)&&(c=c.insert(f,p))}),c})}}/**
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
 */class Bf{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return R.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Ie(s.createTime)}}(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,function(s){return{name:s.name,query:Cf(s.bundledQuery),readTime:Ie(s.readTime)}}(e)),R.resolve()}}/**
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
 */class Uf{constructor(){this.overlays=new Tt(M.comparator),this.Or=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const r=re();return R.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),R.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Or.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Or.delete(r)),R.resolve()}getOverlaysForCollection(t,e,r){const s=re(),o=e.length+1,l=new M(e.child("")),c=this.overlays.getIteratorFrom(l);for(;c.hasNext();){const f=c.getNext().value,p=f.getKey();if(!e.isPrefixOf(p.path))break;p.path.length===o&&f.largestBatchId>r&&s.set(f.getKey(),f)}return R.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Tt((p,I)=>p-I);const l=this.overlays.getIterator();for(;l.hasNext();){const p=l.getNext().value;if(p.getKey().getCollectionGroup()===e&&p.largestBatchId>r){let I=o.get(p.largestBatchId);I===null&&(I=re(),o=o.insert(p.largestBatchId,I)),I.set(p.getKey(),p)}}const c=re(),f=o.getIterator();for(;f.hasNext()&&(f.getNext().value.forEach((p,I)=>c.set(p,I)),!(c.size()>=s)););return R.resolve(c)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const l=this.Or.get(s.largestBatchId).delete(r.key);this.Or.set(s.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new df(e,r));let o=this.Or.get(e);o===void 0&&(o=mt(),this.Or.set(e,o)),this.Or.set(e,o.add(r.key))}}/**
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
 */class jf{constructor(){this.sessionToken=Ct.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
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
 */class Ki{constructor(){this.Nr=new at(tt.Br),this.Lr=new at(tt.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const r=new tt(t,e);this.Nr=this.Nr.add(r),this.Lr=this.Lr.add(r)}qr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Qr(new tt(t,e))}$r(t,e){t.forEach(r=>this.removeReference(r,e))}Ur(t){const e=new M(new Z([])),r=new tt(e,t),s=new tt(e,t+1),o=[];return this.Lr.forEachInRange([r,s],l=>{this.Qr(l),o.push(l.key)}),o}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new M(new Z([])),r=new tt(e,t),s=new tt(e,t+1);let o=mt();return this.Lr.forEachInRange([r,s],l=>{o=o.add(l.key)}),o}containsKey(t){const e=new tt(t,0),r=this.Nr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class tt{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return M.comparator(t.key,e.key)||B(t.Gr,e.Gr)}static kr(t,e){return B(t.Gr,e.Gr)||M.comparator(t.key,e.key)}}/**
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
 */class Hf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new at(tt.Br)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new ff(o,e,r,s);this.mutationQueue.push(l);for(const c of s)this.zr=this.zr.add(new tt(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(l)}lookupMutationBatch(t,e){return R.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Hr(r),o=s<0?0:s;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Li:this.Jn-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new tt(e,0),s=new tt(e,Number.POSITIVE_INFINITY),o=[];return this.zr.forEachInRange([r,s],l=>{const c=this.jr(l.Gr);o.push(c)}),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new at(B);return e.forEach(s=>{const o=new tt(s,0),l=new tt(s,Number.POSITIVE_INFINITY);this.zr.forEachInRange([o,l],c=>{r=r.add(c.Gr)})}),R.resolve(this.Jr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const l=new tt(new M(o),0);let c=new at(B);return this.zr.forEachWhile(f=>{const p=f.key.path;return!!r.isPrefixOf(p)&&(p.length===s&&(c=c.add(f.Gr)),!0)},l),R.resolve(this.Jr(c))}Jr(t){const e=[];return t.forEach(r=>{const s=this.jr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){J(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.zr;return R.forEach(e.mutations,s=>{const o=new tt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.zr=r})}Xn(t){}containsKey(t,e){const r=new tt(e,0),s=this.zr.firstAfterOrEqual(r);return R.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class qf{constructor(t){this.Zr=t,this.docs=function(){return new Tt(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,l=this.Zr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return R.resolve(r?r.document.mutableCopy():wt.newInvalidDocument(e))}getEntries(t,e){let r=sr();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():wt.newInvalidDocument(s))}),R.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=sr();const l=e.path,c=new M(l.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(c);for(;f.hasNext();){const{key:p,value:{document:I}}=f.getNext();if(!l.isPrefixOf(p.path))break;p.path.length>l.length+1||Ah(Ih(I),r)<=0||(s.has(I.key)||qi(e,I))&&(o=o.insert(I.key,I.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(t,e,r,s){O(9500)}Xr(t,e){return R.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new zf(this)}getSize(t){return R.resolve(this.size)}}class zf extends Lf{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.vr.addEntry(t,s)):this.vr.removeEntry(r)}),R.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}/**
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
 */class Gf{constructor(t){this.persistence=t,this.ei=new de(e=>ji(e),Hi),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.ti=0,this.ni=new Ki,this.targetCount=0,this.ri=Ve.rr()}forEachTarget(t,e){return this.ei.forEach((r,s)=>e(s)),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ti&&(this.ti=e),R.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new Ve(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.ar(e),R.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ei.forEach((l,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.ei.delete(l),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)}),R.waitFor(o).next(()=>s)}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const r=this.ei.get(e)||null;return R.resolve(r)}addMatchingKeys(t,e,r){return this.ni.qr(e,r),R.resolve()}removeMatchingKeys(t,e,r){this.ni.$r(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(l=>{o.push(s.markPotentiallyOrphaned(t,l))}),R.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),R.resolve()}getMatchingKeysForTargetId(t,e){const r=this.ni.Wr(e);return R.resolve(r)}containsKey(t,e){return R.resolve(this.ni.containsKey(e))}}/**
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
 */class dl{constructor(t,e){this.ii={},this.overlays={},this.si=new Oi(0),this.oi=!1,this.oi=!0,this._i=new jf,this.referenceDelegate=t(this),this.ai=new Gf(this),this.indexManager=new Vf,this.remoteDocumentCache=function(s){return new qf(s)}(r=>this.referenceDelegate.ui(r)),this.serializer=new bf(e),this.ci=new Bf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Uf,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ii[t.toKey()];return r||(r=new Hf(e,this.referenceDelegate),this.ii[t.toKey()]=r),r}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,r){V("MemoryPersistence","Starting transaction:",t);const s=new Kf(this.si.next());return this.referenceDelegate.li(),r(s).next(o=>this.referenceDelegate.hi(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Pi(t,e){return R.or(Object.values(this.ii).map(r=>()=>r.containsKey(t,e)))}}class Kf extends Rh{constructor(t){super(),this.currentSequenceNumber=t}}class Qi{constructor(t){this.persistence=t,this.Ti=new Ki,this.Ii=null}static Ei(t){return new Qi(t)}get di(){if(this.Ii)return this.Ii;throw O(60996)}addReference(t,e,r){return this.Ti.addReference(r,e),this.di.delete(r.toString()),R.resolve()}removeReference(t,e,r){return this.Ti.removeReference(r,e),this.di.add(r.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.di.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.di,r=>{const s=M.fromPath(r);return this.Ai(t,s).next(o=>{o||e.removeEntry(s,G.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return R.or([()=>R.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class lr{constructor(t,e){this.persistence=t,this.Ri=new de(r=>bh(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Of(this,e)}static Ei(t,e){return new lr(t,e)}li(){}hi(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}Vr(t){let e=0;return this.Ar(t,r=>{e++}).next(()=>e)}Ar(t,e){return R.forEach(this.Ri,(r,s)=>this.gr(t,r,s).next(o=>o?R.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.Xr(t,l=>this.gr(t,l,e).next(c=>{c||(r++,o.removeEntry(l,G.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.Ri.set(r,t.currentSequenceNumber),R.resolve()}removeReference(t,e,r){return this.Ri.set(r,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),R.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=zn(t.data.value)),e}gr(t,e,r){return R.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.Ri.get(e);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Wi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.ls=r,this.hs=s}static Ps(t,e){let r=mt(),s=mt();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Wi(t,e.fromCache,r,s)}}/**
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
 */class Qf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Wf{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return zu()?8:Ph(Hu())>0?6:4}()}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.Rs(t,e).next(l=>{o.result=l}).next(()=>{if(!o.result)return this.Vs(t,e,s,r).next(l=>{o.result=l})}).next(()=>{if(o.result)return;const l=new Qf;return this.fs(t,e,l).next(c=>{if(o.result=c,this.Is)return this.gs(t,e,l,c.size)})}).next(()=>o.result)}gs(t,e,r,s){return r.documentReadCount<this.Es?(Ee()<=F.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Ye(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),R.resolve()):(Ee()<=F.DEBUG&&V("QueryEngine","Query:",Ye(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Ee()<=F.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Ye(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,se(e))):R.resolve())}Rs(t,e){if(xo(e))return R.resolve(null);let r=se(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=gi(e,null,"F"),r=se(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const l=mt(...o);return this.As.getDocuments(t,l).next(c=>this.indexManager.getMinOffset(t,r).next(f=>{const p=this.ps(e,c);return this.ys(e,p,l,f.readTime)?this.Rs(t,gi(e,null,"F")):this.ws(t,p,e,f)}))})))}Vs(t,e,r,s){return xo(e)||s.isEqual(G.min())?R.resolve(null):this.As.getDocuments(t,r).next(o=>{const l=this.ps(e,o);return this.ys(e,l,r,s)?R.resolve(null):(Ee()<=F.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ye(e)),this.ws(t,l,e,vh(s,ln)).next(c=>c))})}ps(t,e){let r=new at(Xh(t));return e.forEach((s,o)=>{qi(t,o)&&(r=r.add(o))}),r}ys(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}fs(t,e,r){return Ee()<=F.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Ye(e)),this.As.getDocumentsMatchingQuery(t,e,Gt.min(),r)}ws(t,e,r,s){return this.As.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(l=>{o=o.insert(l.key,l)}),o))}}/**
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
 */const Xf="LocalStore";class Jf{constructor(t,e,r,s){this.persistence=t,this.bs=e,this.serializer=s,this.Ss=new Tt(B),this.Ds=new de(o=>ji(o),Hi),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(r)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new $f(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}function Yf(n,t,e,r){return new Jf(n,t,e,r)}async function pl(n,t){const e=q(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Fs(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const l=[],c=[];let f=mt();for(const p of s){l.push(p.batchId);for(const I of p.mutations)f=f.add(I.key)}for(const p of o){c.push(p.batchId);for(const I of p.mutations)f=f.add(I.key)}return e.localDocuments.getDocuments(r,f).next(p=>({Ms:p,removedBatchIds:l,addedBatchIds:c}))})})}function Zf(n,t){const e=q(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Cs.newChangeBuffer({trackRemovals:!0});return function(c,f,p,I){const A=p.batch,P=A.keys();let C=R.resolve();return P.forEach(D=>{C=C.next(()=>I.getEntry(f,D)).next(x=>{const N=p.docVersions.get(D);J(N!==null,48541),x.version.compareTo(N)<0&&(A.applyToRemoteDocument(x,p),x.isValidDocument()&&(x.setReadTime(p.commitVersion),I.addEntry(x)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(f,A))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let f=mt();for(let p=0;p<c.mutationResults.length;++p)c.mutationResults[p].transformResults.length>0&&(f=f.add(c.batch.mutations[p].key));return f}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function td(n){const t=q(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ai.getLastRemoteSnapshotVersion(e))}function ed(n,t){const e=q(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=Li),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}class Ho{constructor(){this.activeTargetIds=nf()}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class nd{constructor(){this.So=new Ho,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,r){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new Ho,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class rd{vo(t){}shutdown(){}}/**
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
 */const qo="ConnectivityMonitor";class zo{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){V(qo,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){V(qo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Hn=null;function Ti(){return Hn===null?Hn=function(){return 268435456+Math.round(2147483648*Math.random())}():Hn++,"0x"+Hn.toString(16)}/**
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
 */const Yr="RestConnection",id={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class sd{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${r}/databases/${s}`,this.qo=this.databaseId.database===er?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Qo(t,e,r,s,o){const l=Ti(),c=this.$o(t,e.toUriEncodedString());V(Yr,`Sending RPC '${t}' ${l}:`,c,r);const f={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(f,s,o),this.Ko(t,c,f,r).then(p=>(V(Yr,`Received RPC '${t}' ${l}: `,p),p),p=>{throw mr(Yr,`RPC '${t}' ${l} failed with error: `,p,"url: ",c,"request:",r),p})}Wo(t,e,r,s,o,l){return this.Qo(t,e,r,s,o)}Uo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ke}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}$o(t,e){const r=id[t];return`${this.Lo}/v1/${e}:${r}`}terminate(){}}/**
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
 */class od{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}/**
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
 */const dt="WebChannelConnection";class ad extends sd{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,r,s){const o=Ti();return new Promise((l,c)=>{const f=new ba;f.setWithCredentials(!0),f.listenOnce(Ca.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case qn.NO_ERROR:const I=f.getResponseJson();V(dt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(I)),l(I);break;case qn.TIMEOUT:V(dt,`RPC '${t}' ${o} timed out`),c(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case qn.HTTP_ERROR:const A=f.getStatus();if(V(dt,`RPC '${t}' ${o} failed with status:`,A,"response text:",f.getResponseText()),A>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const C=P==null?void 0:P.error;if(C&&C.status&&C.message){const D=function(N){const Q=N.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(Q)>=0?Q:S.UNKNOWN}(C.status);c(new k(D,C.message))}else c(new k(S.UNKNOWN,"Server responded with status "+f.getStatus()))}else c(new k(S.UNAVAILABLE,"Connection failed."));break;default:O(9055,{s_:t,streamId:o,o_:f.getLastErrorCode(),__:f.getLastError()})}}finally{V(dt,`RPC '${t}' ${o} completed.`)}});const p=JSON.stringify(s);V(dt,`RPC '${t}' ${o} sending request:`,s),f.send(e,"POST",p,r,15)})}a_(t,e,r){const s=Ti(),o=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=Na(),c=Da(),f={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;p!==void 0&&(f.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(f.useFetchStreams=!0),this.Uo(f.initMessageHeaders,e,r),f.encodeInitMessageHeaders=!0;const I=o.join("");V(dt,`Creating RPC '${t}' stream ${s}: ${I}`,f);const A=l.createWebChannel(I,f);let P=!1,C=!1;const D=new od({Go:N=>{C?V(dt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(P||(V(dt,`Opening RPC '${t}' stream ${s} transport.`),A.open(),P=!0),V(dt,`RPC '${t}' stream ${s} sending:`,N),A.send(N))},zo:()=>A.close()}),x=(N,Q,K)=>{N.listen(Q,W=>{try{K(W)}catch(lt){setTimeout(()=>{throw lt},0)}})};return x(A,tn.EventType.OPEN,()=>{C||(V(dt,`RPC '${t}' stream ${s} transport opened.`),D.t_())}),x(A,tn.EventType.CLOSE,()=>{C||(C=!0,V(dt,`RPC '${t}' stream ${s} transport closed`),D.r_())}),x(A,tn.EventType.ERROR,N=>{C||(C=!0,mr(dt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),D.r_(new k(S.UNAVAILABLE,"The operation could not be completed")))}),x(A,tn.EventType.MESSAGE,N=>{var Q;if(!C){const K=N.data[0];J(!!K,16349);const W=K,lt=(W==null?void 0:W.error)||((Q=W[0])===null||Q===void 0?void 0:Q.error);if(lt){V(dt,`RPC '${t}' stream ${s} received error:`,lt);const Jt=lt.status;let _t=function(g){const y=Y[g];if(y!==void 0)return mf(y)}(Jt),E=lt.message;_t===void 0&&(_t=S.INTERNAL,E="Unknown error status: "+Jt+" with message "+lt.message),C=!0,D.r_(new k(_t,E)),A.close()}else V(dt,`RPC '${t}' stream ${s} received:`,K),D.i_(K)}}),x(c,Va.STAT_EVENT,N=>{N.stat===ci.PROXY?V(dt,`RPC '${t}' stream ${s} detected buffering proxy`):N.stat===ci.NOPROXY&&V(dt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.n_()},0),D}}function Zr(){return typeof document<"u"?document:null}/**
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
 */function Er(n){return new gf(n,!0)}/**
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
 */class ml{constructor(t,e,r=1e3,s=1.5,o=6e4){this.bi=t,this.timerId=e,this.u_=r,this.c_=s,this.l_=o,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),r=Math.max(0,Date.now()-this.T_),s=Math.max(0,e-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,s,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
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
 */const Go="PersistentStream";class ld{constructor(t,e,r,s,o,l,c,f){this.bi=t,this.R_=r,this.V_=s,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=c,this.listener=f,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new ml(t,e)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,t!==4?this.y_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(ce(e.toString()),ce("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.m_===e&&this.B_(r,s)},r=>{t(()=>{const s=new k(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.L_(s)})})}B_(t,e){const r=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{r(()=>this.listener.jo())}),this.stream.Jo(()=>{r(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(s=>{r(()=>this.L_(s))}),this.stream.onMessage(s=>{r(()=>++this.p_==1?this.q_(s):this.onNext(s))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return V(Go,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(V(Go,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ud extends ld{constructor(t,e,r,s,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,l),this.serializer=o}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return J(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,J(!t.writeResults||t.writeResults.length===0,55816),this.listener.z_()}onNext(t){J(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=wf(t.writeResults,t.commitTime),r=Ie(t.commitTime);return this.listener.j_(r,e)}H_(){const t={};t.database=vf(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Af(this.serializer,r))};this.F_(e)}}/**
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
 */class cd{}class hd extends cd{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.J_=!1}Y_(){if(this.J_)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,r,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Qo(t,_i(e,r),s,o,l)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(S.UNKNOWN,o.toString())})}Wo(t,e,r,s,o){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,c])=>this.connection.Wo(t,_i(e,r),s,l,c,o)).catch(l=>{throw l.name==="FirebaseError"?(l.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new k(S.UNKNOWN,l.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class fd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,t==="Online"&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(ce(e),this.ea=!1):V("OnlineStateTracker",e)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
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
 */const gn="RemoteStore";class dd{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=o,this.ca.vo(l=>{r.enqueueAndForget(async()=>{_n(this)&&(V(gn,"Restarting streams for network reachability change."),await async function(f){const p=q(f);p.aa.add(4),await yn(p),p.la.set("Unknown"),p.aa.delete(4),await Tr(p)}(this))})}),this.la=new fd(r,s)}}async function Tr(n){if(_n(n))for(const t of n.ua)await t(!0)}async function yn(n){for(const t of n.ua)await t(!1)}function _n(n){return q(n).aa.size===0}async function gl(n,t,e){if(!pn(t))throw t;n.aa.add(1),await yn(n),n.la.set("Offline"),e||(e=()=>td(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(gn,"Retrying IndexedDB access"),await e(),n.aa.delete(1),await Tr(n)})}function yl(n,t){return t().catch(e=>gl(n,e,t))}async function vr(n){const t=q(n),e=Qt(t);let r=t.oa.length>0?t.oa[t.oa.length-1].batchId:Li;for(;pd(t);)try{const s=await ed(t.localStore,r);if(s===null){t.oa.length===0&&e.v_();break}r=s.batchId,md(t,s)}catch(s){await gl(t,s)}_l(t)&&El(t)}function pd(n){return _n(n)&&n.oa.length<10}function md(n,t){n.oa.push(t);const e=Qt(n);e.b_()&&e.W_&&e.G_(t.mutations)}function _l(n){return _n(n)&&!Qt(n).w_()&&n.oa.length>0}function El(n){Qt(n).start()}async function gd(n){Qt(n).H_()}async function yd(n){const t=Qt(n);for(const e of n.oa)t.G_(e.mutations)}async function _d(n,t,e){const r=n.oa.shift(),s=Gi.from(r,t,e);await yl(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await vr(n)}async function Ed(n,t){t&&Qt(n).W_&&await async function(r,s){if(function(l){return pf(l)&&l!==S.ABORTED}(s.code)){const o=r.oa.shift();Qt(r).D_(),await yl(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await vr(r)}}(n,t),_l(n)&&El(n)}async function Ko(n,t){const e=q(n);e.asyncQueue.verifyOperationInProgress(),V(gn,"RemoteStore received new credentials");const r=_n(e);e.aa.add(3),await yn(e),r&&e.la.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.aa.delete(3),await Tr(e)}async function Td(n,t){const e=q(n);t?(e.aa.delete(2),await Tr(e)):t||(e.aa.add(2),await yn(e),e.la.set("Unknown"))}function Qt(n){return n.Ta||(n.Ta=function(e,r,s){const o=q(e);return o.Y_(),new ud(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{jo:()=>Promise.resolve(),Jo:gd.bind(null,n),Zo:Ed.bind(null,n),z_:yd.bind(null,n),j_:_d.bind(null,n)}),n.ua.push(async t=>{t?(n.Ta.D_(),await vr(n)):(await n.Ta.stop(),n.oa.length>0&&(V(gn,`Stopping write stream with ${n.oa.length} pending writes`),n.oa=[]))})),n.Ta}/**
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
 */class Xi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new ie,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const l=Date.now()+r,c=new Xi(t,e,l,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Tl(n,t){if(ce("AsyncQueue",`${t}: ${n}`),pn(n))return new k(S.UNAVAILABLE,`${t}: ${n}`);throw n}class vd{constructor(){this.queries=Qo(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(e,r){const s=q(e),o=s.queries;s.queries=Qo(),o.forEach((l,c)=>{for(const f of c.Ra)f.onError(r)})})(this,new k(S.ABORTED,"Firestore shutting down"))}}function Qo(){return new de(n=>Ya(n),Ja)}function Id(n){n.fa.forEach(t=>{t.next()})}var Wo,Xo;(Xo=Wo||(Wo={})).ya="default",Xo.Cache="cache";const Ad="SyncEngine";class wd{constructor(t,e,r,s,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.nu={},this.ru=new de(c=>Ya(c),Ja),this.iu=new Map,this.su=new Set,this.ou=new Tt(M.comparator),this._u=new Map,this.au=new Ki,this.uu={},this.cu=new Map,this.lu=Ve.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function Rd(n,t,e){const r=Cd(n);try{const s=await function(l,c){const f=q(l),p=nt.now(),I=c.reduce((C,D)=>C.add(D.key),mt());let A,P;return f.persistence.runTransaction("Locally write mutations","readwrite",C=>{let D=sr(),x=mt();return f.Cs.getEntries(C,I).next(N=>{D=N,D.forEach((Q,K)=>{K.isValidDocument()||(x=x.add(Q))})}).next(()=>f.localDocuments.getOverlayedDocuments(C,D)).next(N=>{A=N;const Q=[];for(const K of c){const W=cf(K,A.get(K.key).overlayedDocument);W!=null&&Q.push(new pe(K.key,W,qa(W.value.mapValue),xt.exists(!0)))}return f.mutationQueue.addMutationBatch(C,p,Q,c)}).next(N=>{P=N;const Q=N.applyToLocalDocumentSet(A,x);return f.documentOverlayCache.saveOverlays(C,N.batchId,Q)})}).then(()=>({batchId:P.batchId,changes:tl(A)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(l,c,f){let p=l.uu[l.currentUser.toKey()];p||(p=new Tt(B)),p=p.insert(c,f),l.uu[l.currentUser.toKey()]=p}(r,s.batchId,e),await Ir(r,s.changes),await vr(r.remoteStore)}catch(s){const o=Tl(s,"Failed to persist write");e.reject(o)}}function Jo(n,t,e){const r=q(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ru.forEach((o,l)=>{const c=l.view.ga(t);c.snapshot&&s.push(c.snapshot)}),function(l,c){const f=q(l);f.onlineState=c;let p=!1;f.queries.forEach((I,A)=>{for(const P of A.Ra)P.ga(c)&&(p=!0)}),p&&Id(f)}(r.eventManager,t),s.length&&r.nu.Q_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Pd(n,t){const e=q(n),r=t.batch.batchId;try{const s=await Zf(e.localStore,t);Il(e,r,null),vl(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Ir(e,s)}catch(s){await Mi(s)}}async function Sd(n,t,e){const r=q(n);try{const s=await function(l,c){const f=q(l);return f.persistence.runTransaction("Reject batch","readwrite-primary",p=>{let I;return f.mutationQueue.lookupMutationBatch(p,c).next(A=>(J(A!==null,37113),I=A.keys(),f.mutationQueue.removeMutationBatch(p,A))).next(()=>f.mutationQueue.performConsistencyCheck(p)).next(()=>f.documentOverlayCache.removeOverlaysForBatchId(p,I,c)).next(()=>f.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(p,I)).next(()=>f.localDocuments.getDocuments(p,I))})}(r.localStore,t);Il(r,t,e),vl(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Ir(r,s)}catch(s){await Mi(s)}}function vl(n,t){(n.cu.get(t)||[]).forEach(e=>{e.resolve()}),n.cu.delete(t)}function Il(n,t,e){const r=q(n);let s=r.uu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.uu[r.currentUser.toKey()]=s}}async function Ir(n,t,e){const r=q(n),s=[],o=[],l=[];r.ru.isEmpty()||(r.ru.forEach((c,f)=>{l.push(r.Pu(f,t,e).then(p=>{var I;if((p||e)&&r.isPrimaryClient){const A=p?!p.fromCache:(I=void 0)===null||I===void 0?void 0:I.current;r.sharedClientState.updateQueryState(f.targetId,A?"current":"not-current")}if(p){s.push(p);const A=Wi.Ps(f.targetId,p);o.push(A)}}))}),await Promise.all(l),r.nu.Q_(s),await async function(f,p){const I=q(f);try{await I.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>R.forEach(p,P=>R.forEach(P.ls,C=>I.persistence.referenceDelegate.addReference(A,P.targetId,C)).next(()=>R.forEach(P.hs,C=>I.persistence.referenceDelegate.removeReference(A,P.targetId,C)))))}catch(A){if(!pn(A))throw A;V(Xf,"Failed to update sequence numbers: "+A)}for(const A of p){const P=A.targetId;if(!A.fromCache){const C=I.Ss.get(P),D=C.snapshotVersion,x=C.withLastLimboFreeSnapshotVersion(D);I.Ss=I.Ss.insert(P,x)}}}(r.localStore,o))}async function bd(n,t){const e=q(n);if(!e.currentUser.isEqual(t)){V(Ad,"User change. New user:",t.toKey());const r=await pl(e.localStore,t);e.currentUser=t,function(o,l){o.cu.forEach(c=>{c.forEach(f=>{f.reject(new k(S.CANCELLED,l))})}),o.cu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Ir(e,r.Ms)}}function Cd(n){const t=q(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Pd.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Sd.bind(null,t),t}class ur{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Er(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return Yf(this.persistence,new Wf,t.initialUser,this.serializer)}Ru(t){return new dl(Qi.Ei,this.serializer)}Au(t){return new nd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ur.provider={build:()=>new ur};class Vd extends ur{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){J(this.persistence.referenceDelegate instanceof lr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new xf(r,t.asyncQueue,e)}Ru(t){const e=this.cacheSizeBytes!==void 0?Et.withCacheSize(this.cacheSizeBytes):Et.DEFAULT;return new dl(r=>lr.Ei(r,e),this.serializer)}}class vi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jo(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=bd.bind(null,this.syncEngine),await Td(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new vd}()}createDatastore(t){const e=Er(t.databaseInfo.databaseId),r=function(o){return new ad(o)}(t.databaseInfo);return function(o,l,c,f){return new hd(o,l,c,f)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,l,c){return new dd(r,s,o,l,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Jo(this.syncEngine,e,0),function(){return zo.C()?new zo:new rd}())}createSyncEngine(t,e){return function(s,o,l,c,f,p,I){const A=new wd(s,o,l,c,f,p);return I&&(A.hu=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=q(s);V(gn,"RemoteStore shutting down."),o.aa.add(5),await yn(o),o.ca.shutdown(),o.la.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}vi.provider={build:()=>new vi};/**
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
 */const Wt="FirestoreClient";class Dd{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=pt.UNAUTHENTICATED,this.clientId=Ma.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async l=>{V(Wt,"Received user=",l.uid),await this.authCredentialListener(l),this.user=l}),this.appCheckCredentials.start(r,l=>(V(Wt,"Received new app check token=",l),this.appCheckCredentialListener(l,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ie;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Tl(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function ti(n,t){n.asyncQueue.verifyOperationInProgress(),V(Wt,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await pl(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Yo(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Nd(n);V(Wt,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>Ko(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ko(t.remoteStore,s)),n._onlineComponents=t}async function Nd(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Wt,"Using user provided OfflineComponentProvider");try{await ti(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;mr("Error using user provided cache. Falling back to memory cache: "+e),await ti(n,new ur)}}else V(Wt,"Using default OfflineComponentProvider"),await ti(n,new Vd(void 0));return n._offlineComponents}async function kd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Wt,"Using user provided OnlineComponentProvider"),await Yo(n,n._uninitializedComponentsProvider._online)):(V(Wt,"Using default OnlineComponentProvider"),await Yo(n,new vi))),n._onlineComponents}function xd(n){return kd(n).then(t=>t.syncEngine)}/**
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
 */function Al(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const Zo=new Map;/**
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
 */function Md(n,t,e){if(!e)throw new k(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Od(n,t,e,r){if(t===!0&&r===!0)throw new k(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function ta(n){if(!M.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ji(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":O(12329,{type:typeof n})}function Ii(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ji(n);throw new k(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */const wl="firestore.googleapis.com",ea=!0;class na{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=wl,this.ssl=ea}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ea;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=fl;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Nf)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Od("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Al((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Yi{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new na({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new na(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new hh;switch(r.type){case"firstParty":return new mh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Zo.get(e);r&&(V("ComponentProvider","Removing Datastore"),Zo.delete(e),r.terminate())}(this),Promise.resolve()}}function Ld(n,t,e,r={}){var s;const o=(n=Ii(n,Yi))._getSettings(),l=Object.assign(Object.assign({},o),{emulatorOptions:n._getEmulatorOptions()}),c=`${t}:${e}`;o.host!==wl&&o.host!==c&&mr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f=Object.assign(Object.assign({},o),{host:c,ssl:!1,emulatorOptions:r});if(!Wn(f,l)&&(n._setSettings(f),r.mockUserToken)){let p,I;if(typeof r.mockUserToken=="string")p=r.mockUserToken,I=pt.MOCK_USER;else{p=ju(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const A=r.mockUserToken.sub||r.mockUserToken.user_id;if(!A)throw new k(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new pt(A)}n._authCredentials=new fh(new xa(p,I))}}/**
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
 */class Zi{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Zi(this.firestore,t,this._query)}}class Mt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new fn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Mt(this.firestore,t,this._key)}}class fn extends Zi{constructor(t,e,r){super(t,e,Kh(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Mt(this.firestore,null,new M(t))}withConverter(t){return new fn(this.firestore,t,this._path)}}function Fd(n,t,...e){if(n=Xn(n),arguments.length===1&&(t=Ma.newId()),Md("doc","path",t),n instanceof Yi){const r=Z.fromString(t,...e);return ta(r),new Mt(n,null,new M(r))}{if(!(n instanceof Mt||n instanceof fn))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(t,...e));return ta(r),new Mt(n.firestore,n instanceof fn?n.converter:null,new M(r))}}/**
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
 */const ra="AsyncQueue";class ia{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new ml(this,"async_queue_retry"),this.ju=()=>{const r=Zr();r&&V(ra,"Visibility state changed to "+r.visibilityState),this.y_.A_()},this.Hu=t;const e=Zr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=Zr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new ie;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!pn(t))throw t;V(ra,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(r=>{throw this.Ku=r,this.Wu=!1,ce("INTERNAL UNHANDLED ERROR: ",sa(r)),r}).then(r=>(this.Wu=!1,r))));return this.Hu=e,e}enqueueAfterDelay(t,e,r){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const s=Xi.createAndSchedule(this,t,e,r,o=>this.Xu(o));return this.Uu.push(s),s}Ju(){this.Ku&&O(47125,{ec:sa(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do t=this.Hu,await t;while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function sa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Rl extends Yi{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new ia,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ia(t),this._firestoreClient=void 0,await t}}}function $d(n,t){const e=typeof n=="object"?n:Yc(),r=typeof n=="string"?n:er,s=Kc(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Bu("firestore");o&&Ld(s,...o)}return s}function Bd(n){if(n._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ud(n),n._firestoreClient}function Ud(n){var t,e,r;const s=n._freezeSettings(),o=function(c,f,p,I){return new Nh(c,f,p,I.host,I.ssl,I.experimentalForceLongPolling,I.experimentalAutoDetectLongPolling,Al(I.experimentalLongPollingOptions),I.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Dd(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const f=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(f),_online:f}}(n._componentsProvider))}/**
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
 */class dn{constructor(t){this._byteString=t}static fromBase64String(t){try{return new dn(Ct.fromBase64String(t))}catch(e){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new dn(Ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class Pl{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Sl{constructor(t){this._methodName=t}}/**
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
 */class bl{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}}/**
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
 */class Cl{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
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
 */const jd=/^__.*__$/;class Hd{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new pe(t,this.data,this.fieldMask,e,this.fieldTransforms):new mn(t,this.data,e,this.fieldTransforms)}}function Vl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{oc:n})}}class ts{constructor(t,e,r,s,o,l){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this._c(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new ts(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.ac({path:r,cc:!1});return s.lc(t),s}hc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.ac({path:r,cc:!1});return s._c(),s}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return cr(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(t.length===0)throw this.Tc("Document fields must not be empty");if(Vl(this.oc)&&jd.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class qd{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Er(t)}dc(t,e,r,s=!1){return new ts({oc:t,methodName:e,Ec:r,path:ot.emptyPath(),cc:!1,Ic:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zd(n){const t=n._freezeSettings(),e=Er(n._databaseId);return new qd(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Gd(n,t,e,r,s,o={}){const l=n.dc(o.merge||o.mergeFields?2:0,t,e,s);xl("Data must be an object, but it was:",l,r);const c=Nl(r,l);let f,p;if(o.merge)f=new Pt(l.fieldMask),p=l.fieldTransforms;else if(o.mergeFields){const I=[];for(const A of o.mergeFields){const P=Kd(t,A,e);if(!l.contains(P))throw new k(S.INVALID_ARGUMENT,`Field '${P}' is specified in your field mask but missing from your input data.`);Xd(I,P)||I.push(P)}f=new Pt(I),p=l.fieldTransforms.filter(A=>f.covers(A.field))}else f=null,p=l.fieldTransforms;return new Hd(new Rt(c),f,p)}function Dl(n,t){if(kl(n=Xn(n)))return xl("Unsupported field value:",t,n),Nl(n,t);if(n instanceof Sl)return function(r,s){if(!Vl(s.oc))throw s.Tc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Tc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.cc&&t.oc!==4)throw t.Tc("Nested arrays are not supported");return function(r,s){const o=[];let l=0;for(const c of r){let f=Dl(c,s.Pc(l));f==null&&(f={nullValue:"NULL_VALUE"}),o.push(f),l++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=Xn(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return rf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=nt.fromDate(r);return{timestampValue:yi(s.serializer,o)}}if(r instanceof nt){const o=new nt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:yi(s.serializer,o)}}if(r instanceof bl)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof dn)return{bytesValue:yf(s.serializer,r._byteString)};if(r instanceof Mt){const o=s.databaseId,l=r.firestore._databaseId;if(!l.isEqual(o))throw s.Tc(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:cl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Cl)return function(l,c){return{mapValue:{fields:{[ja]:{stringValue:Ha},[fi]:{arrayValue:{values:l.toArray().map(p=>{if(typeof p!="number")throw c.Tc("VectorValues must only contain numeric values.");return zi(c.serializer,p)})}}}}}}(r,s);throw s.Tc(`Unsupported field value: ${Ji(r)}`)}(n,t)}function Nl(n,t){const e={};return La(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):xe(n,(r,s)=>{const o=Dl(s,t.uc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function kl(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof nt||n instanceof bl||n instanceof dn||n instanceof Mt||n instanceof Sl||n instanceof Cl)}function xl(n,t,e){if(!kl(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const r=Ji(e);throw r==="an object"?t.Tc(n+" a custom object"):t.Tc(n+" "+r)}}function Kd(n,t,e){if((t=Xn(t))instanceof Pl)return t._internalPath;if(typeof t=="string")return Wd(n,t);throw cr("Field path arguments must be of type string or ",n,!1,void 0,e)}const Qd=new RegExp("[~\\*/\\[\\]]");function Wd(n,t,e){if(t.search(Qd)>=0)throw cr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Pl(...t.split("."))._internalPath}catch{throw cr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function cr(n,t,e,r,s){const o=r&&!r.isEmpty(),l=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let f="";return(o||l)&&(f+=" (found",o&&(f+=` in field ${r}`),l&&(f+=` in document ${s}`),f+=")"),new k(S.INVALID_ARGUMENT,c+n+f)}function Xd(n,t){return n.some(e=>e.isEqual(t))}/**
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
 */function Jd(n,t,e){let r;return r=n?n.toFirestore(t):t,r}function Yd(n,t,e){n=Ii(n,Mt);const r=Ii(n.firestore,Rl),s=Jd(n.converter,t);return Zd(r,[Gd(zd(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,xt.none())])}function Zd(n,t){return function(r,s){const o=new ie;return r.asyncQueue.enqueueAndForget(async()=>Rd(await xd(r),s,o)),o.promise}(Bd(n),t)}(function(t,e=!0){(function(s){ke=s})(Jc),Yn(new on("firestore",(r,{instanceIdentifier:s,options:o})=>{const l=r.getProvider("app").getImmediate(),c=new Rl(new dh(r.getProvider("auth-internal")),new gh(l,r.getProvider("app-check-internal")),function(p,I){if(!Object.prototype.hasOwnProperty.apply(p.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new nr(p.options.projectId,I)}(l,s),l);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),ve(Eo,To,t),ve(Eo,To,"esm2017")})();const tp={apiKey:"AIzaSyCgeIZwuyIF3cvaE5gkSRK8GW8wYZgB7TM",authDomain:"first-rpg-ae688.firebaseapp.com",projectId:"first-rpg-ae688",storageBucket:"first-rpg-ae688.firebasestorage.app",messagingSenderId:"357652321948",appId:"1:357652321948:web:6a4d46e195336bc3ab3f59",measurementId:"G-6X215LJ64N"},ep=Ra(tp),np=$d(ep),rp=document.querySelector(".battle-area"),ip=document.getElementById("game-over"),oa=document.getElementById("game-reset"),sp=async n=>{if(!n.playerName){console.warn("プレイヤー名が空です。セーブをスキップします。");return}try{const t=Fd(np,"saves",n.playerName);await Yd(t,n),console.log(`[セーブ成功] ${n.playerName} のデータを保存しました。`)}catch(t){console.error("セーブ失敗:",t)}finally{window.location.href="safezone.html"}};function op(){rp.style.display="none",ip.style.display="block";const n=Xt(),t={playerName:n.name,hp:n.hp,mp:n.mp,inventory:n.inventory};oa&&oa.addEventListener("click",()=>{window.location.href="safezone.html"}),sp(t)}let hr=1,es=!1,ns=!1,Ai=!1,wi=!1,Ri=!0;function Ae(){es=!0}function Ml(){ns=!0}function aa(){wi||(wi=!0,Ar())}function we(){Ri&&Si.style.display!==""&&(ma(),De.style.opacity="0",oe.style.opacity="0",Ot.style.opacity="0",es=!1,ns=!1,wi=!1,Ai=!1,Ri=!1,j(`--- ${hr}ターン目 ---`))}function Ar(){es&&ns&&!Ai&&(Ri=!0,Ai=!0,hr++,setTimeout(()=>{De.style.opacity="1",De.style.marginInline="auto",oe.style.opacity="1",oe.style.display="flex",oe.style.marginInline="auto",Ot.style.opacity="1",Ot.style.marginInline="auto",Lt(`${hr-1}ターン目が終了…`,"次の行動を選べ")},1800))}function ap(){hr=1}function rs(n,t=null,e=!1){if(n.hp>0||!e)return;Ci();const r=Xt();let s;if(r instanceof Object&&"inventory"in r)s=r;else return;const{defaultAttackBtn:o,nextStageBtn:l,battleLogArea:c,afterBattleLogArea:f}=bu();if(De.style.display="none",c.style.display="none",o.style.display="none",o.ariaDisabled="true",f.style.display="block",n.hp=0,console.log(n.name),n.isPlayer)c.style.display="block",f.style.display="none",j(`<h1>${n.name} は倒された</h1>`,"5秒後に引き継ぎアイテム選択画面に移動します"),setTimeout(op,5e3);else{lp(o,l,c,f),ap(),oe.style.opacity="1",pa("セーフティーエリア");const p=Math.floor(s.maxHp*.2),I=Math.floor(s.maxMp*.2);if(s.hp=Math.min(s.hp+p,s.maxHp),s.mp=Math.min(s.mp+I,s.maxMp),t&&l.style.display==="")ma(),j(`${n.name} は倒された`),j("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。"),j(`勝利ボーナス！HPが${p}、MPが${I}回復した！`,""),ha(s);else if(l.style.display==="none"&&f.style.display==="none")Lt("外に出よう");else{j(`${n.name} は倒された`),j("次の階層まで安全だ。回復・装備・スキルを使って準備しよう。",""),j(`勝利ボーナス！HPが${p}、MPが${I}回復した！`,""),ha(s);return}St()}}let ei=1;function lp(n,t,e,r){const s=dr[ei];if(console.log(ei,s),ei++,s)t.style.display="";else{n.style.display="none",n.ariaDisabled="true",oe.style.display="none",t.style.display="none",e.style.display="",r.style.display="none",Lt("ダンジョンクリア！！🎉","おめでとう！！！");return}}function Pi(n,t,e){const r=Pu[n],s=Xt();if(!r){Lt("スキルが見つかりません！","");return}const o=t,l=e;let c=!0;if(o.mp<r.mpCost)if(o.mp<=0&&(o.mp=0),j(`${o.name}はスキルを発動！`,`しかし、${o.name} はMPが足りない！`),o.isPlayer)c=!1,Re();else{c=!1;return}else we(),o.mp-=r.mpCost;if(c){const f=r.power(o);r.type==="heal"?r.log(r.name,o,l||null,r.power(o)):(l.hp-=f,r.log(r.name,o,l,r.power(o))),l.hp>0&&o===s?(Ae(),Re(1e3)):l.hp>0&&Ml(),l.hp<=0&&r.type!=="heal"&&(l.hp=0,setTimeout(()=>{const p=typeof r.log=="function"?()=>r.log(r.name,o,l,r.power(o)):null;setTimeout(()=>{rs(l,p,!0)},1e3)},800))}Ar(),St(It)}const la=document.getElementById("instruction-border"),up=document.getElementById("instruction");function Ol(n,t){n.innerText="",t.forEach((e,r)=>{const s=document.createElement("button");s.innerHTML=`${e.name} <br>（消費MP:${e.mpCost}）`,s.addEventListener("mouseover",()=>{la.style.display="block",up.innerText=e.Instruction}),s.addEventListener("mouseleave",()=>{la.style.display="none"}),s.addEventListener("click",()=>{const o=Xt(),l=pr();we(),Ae(),Pi(r,o,l)}),n.appendChild(s)}),St(It)}function cp(n){n.addEventListener("click",()=>{we();const t=Xt(),e=pr(),r=Math.max(t.physicalStrength-e.defense,1);if(e.hp-=r,e.hp<=0&&(e.hp=0),j(`${t.name} の攻撃！${e.name} に ${r} ダメージ！`,`(${e.name}のHP：${e.hp})`),St(It),e.hp<=0){setTimeout(()=>{rs(e,null,!0)},1e3);return}else Re();St(It),Ae(),Ar()})}function hp(){const n=Xt();let t;if(n instanceof Object&&"inventory"in n)t=n;else throw new Error("Player の取得に失敗しました");const e=pr();let r;if(e instanceof Object)r=e;else throw new Error("Enemy の取得に失敗しました");if(r.hp<=0)return;let s;if(r.hp>=r.maxHp*.7?s=Math.random()<.95?"attack":"heal":r.hp<=r.maxHp*.3?s=Math.random()<.4?"attack":"heal":s=Math.random()<.7?"attack":"heal",s==="attack")if(Math.random()<(r.hp>=r.maxHp*.7?.05:r.hp<=r.maxHp*.3?.5:.3)){const l=Math.floor(Math.random()*100),c=l<50?0:l<80?1:2;Pi(c,r,t),aa()}else{const l=Math.max(r.physicalStrength-t.defense,1);if(t.hp-=l,j(`${r.name} の攻撃！
 ${t.name} は${l} ダメージを受けた！`,`(${t.name}のHP：${t.hp})`),t.hp<=0){Ci(),t.hp=0,rs(t,null,!0);return}}else Pi(3,r,t),aa();St(It),Ml(),Ar()}function Re(n=1800){setTimeout(()=>{hp()},n)}class fp{constructor(t,e,r,s,o,l,c,f){$(this,"name");$(this,"className");$(this,"hp");$(this,"maxHp");$(this,"mp");$(this,"maxMp");$(this,"physicalStrength");$(this,"magicalStrength");$(this,"defense");$(this,"speed");$(this,"isPlayer",!0);$(this,"equipment",[]);$(this,"inventory",[]);this.name=t,this.className=e,this.hp=r,this.maxHp=r,this.mp=s,this.maxMp=s,this.physicalStrength=o,this.magicalStrength=l,this.defense=c,this.speed=f}getPlayerStatus(){return`${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`}healItem(t){if(Ot.style.display="none",we(),Ae(),t.itemType==="hpHeal"){const e=t.effect.hp??0;this.hp=Math.min(this.hp+e,this.maxHp),j(`${this.name} は ${t.name} を使い、HPを${e}回復した！`,"")}else if(t.itemType==="mpHeal"){const e=t.effect.mp??0;this.mp=Math.min(this.mp+e,this.maxMp),j(`${this.name} は ${t.name} を使い、MPを${e}回復した！`,"")}else if(t.itemType==="bothHeal"){const e=t.effect.hp??0,r=t.effect.mp??0;this.hp=Math.min(this.hp+e,this.maxHp),this.mp=Math.min(this.mp+r,this.maxMp),j(`${this.name} は ${t.name} を使い、HP${e}・MP${r}回復した！`,"")}Re(1e3)}equipItem(t){if(Ot.style.display="none",we(),Ae(),this.equipment.find(r=>r.equipmentType===t.equipmentType)){Lt("すでにその装備は装備中です");return}this.physicalStrength+=t.effect.physicalStrength||0,this.defense+=t.effect.defense||0,this.speed+=t.effect.speed||0,t.isEquipped=!0,this.equipment.push(t),j(`${t.name} を装備した！`),Re(1e3)}unequipItem(t){Ot.style.display="none",we(),Ae(),this.physicalStrength-=t.effect.physicalStrength||0,this.defense-=t.effect.defense||0,t.isEquipped=!1;const e=this.equipment.indexOf(t);e!==-1&&this.equipment.splice(e,1);const r=this.inventory.find(s=>s.name===t.name);r?r.amount+=1:this.inventory.push(new os(t.name,t.itemType,t.equipmentType,t.effect,1,t.rarity,t.instructionText)),j(`${t.name} を外し、インベントリに戻した`),Re(1e3)}}class dp{constructor(t,e,r,s,o,l,c,f){$(this,"name");$(this,"className");$(this,"hp");$(this,"maxHp");$(this,"mp");$(this,"maxMp");$(this,"physicalStrength");$(this,"magicalStrength");$(this,"defense");$(this,"speed");$(this,"isPlayer",!1);this.name=t,this.className=e,this.hp=r,this.maxHp=r,this.mp=s,this.maxMp=s,this.physicalStrength=o,this.magicalStrength=l,this.defense=c,this.speed=f}getEnemyStatus(){return`${this.name}（${this.className}）：【HP ${this.hp}/${this.maxHp}】【MP ${this.mp}/${this.maxMp}】`}}function pp(n,t){const e=Iu[n];return new fp(t,e.className,e.hp,e.mp,e.physicalStrength,e.magicalStrength,e.defense,e.speed)}function is(n){return new dp(n.name,n.className,n.hp,n.mp,n.physicalStrength,n.magicalStrength,n.defense,n.hitRate??80)}function mp(){[{btnId:"toggle-heal-items",listId:"heal-items",label:"回復アイテム一覧"},{btnId:"toggle-equip-items",listId:"equip-items",label:"装備アイテム一覧"},{btnId:"toggle-skill-btn",listId:"skill-list",label:"スキル一覧"},{btnId:"background-button",listId:"background-log-area",label:"バトルログ履歴"}].forEach(({btnId:t,listId:e,label:r})=>{const s=document.getElementById(t),o=document.getElementById(e);s.textContent=`▶︎ ${r}`,o.classList.add("hidden"),s.addEventListener("click",()=>{const l=o.classList.toggle("hidden");s.textContent=l?`▶︎ ${r}`:`▼ ${r}を閉じる`,t==="background-button"&&!l?fr.style.display="none":l&&(fr.style.display="block")})})}function gp(n,t){n.addEventListener("click",()=>{Ot.style.display="block",De.style.display="block",t()})}const ua=document.querySelector(".battle-area"),oe=document.getElementById("toggle-area");document.getElementById("toggle-heal-items");document.getElementById("toggle-equip-items");const De=document.getElementById("skill-area"),fr=document.getElementById("battle-log"),ca=document.getElementById("after-battle-log"),yp=document.getElementById("player-status"),Ot=document.getElementById("default-attack"),Si=document.getElementById("next-stage"),_p=document.getElementById("enemy-status"),Ep=document.getElementById("equipped-items"),bi=document.getElementById("skill-list"),Tp=document.getElementById("heal-items"),vp=document.getElementById("equip-items"),It={playerStatus:yp,enemyStatus:_p,healItemsDiv:Tp,equipItemsDiv:vp,equippedDiv:Ep};function Ip(){ua.style.display="",vu({battleLog:fr,afterBattleLog:ca});const n=dr[0],t=is(n);ya(t),Ol(bi,Vi),cp(Ot),mp(),gp(Si,Cu),Su({defaultAttackBtn:Ot,nextStageBtn:Si,battleArea:ua,toggleArea:oe,battleLogArea:fr,afterBattleLogArea:ca,skillDiv:bi,uiElements:It}),St(It)}document.addEventListener("DOMContentLoaded",()=>{const n=localStorage.getItem("playerData"),t=location.pathname.includes("safezone.html");if(!n&&!t){alert("セーフティエリアからスタートしてください！"),window.location.href="safezone.ts";return}if(n){const e=JSON.parse(n);Ap(e)}});function Ap(n){const t=pp(n.jobIndex,n.name),e=[...n.equipment.map(s=>new os(s.name,s.itemType,s.equipmentType??"",s.effect,s.amount??1,s.rarity,s.instructionText)),...n.items.map(s=>new Ll(s.name,s.itemType,s.effect,s.amount??1,s.rarity,s.instructionText))];t.inventory=e;const r=is(dr[0]);ga(t,r),Ip()}const wp=[{name:"HPの実",itemType:"hpHeal",effect:{hp:30},amount:0,rarity:"common",instructionText:"レアリティ：一般級。HPを30回復する。"},{name:"HPジャム",itemType:"hpHeal",effect:{hp:80},amount:0,rarity:"uncommon",instructionText:"レアリティ：希少級。HPを80回復する。"},{name:"HPポーション",itemType:"hpHeal",effect:{hp:200},amount:0,rarity:"rare",instructionText:"レアリティ：上級。HPを200回復する。"},{name:"MPの実",itemType:"mpHeal",effect:{mp:10},amount:0,rarity:"common",instructionText:"レアリティ：一般級。MPを10回復する。"},{name:"MPジャム",itemType:"mpHeal",effect:{mp:30},amount:0,rarity:"uncommon",instructionText:"レアリティ：希少級。MPを30回復する。"},{name:"MPポーション",itemType:"mpHeal",effect:{mp:60},amount:0,rarity:"rare",instructionText:"レアリティ：上級。MPを60回復する。"},{name:"エリクサー",itemType:"bothHeal",effect:{hp:500,mp:500},amount:0,rarity:"legendary",instructionText:"レアリティ：伝説級。MPを500回復する。"}],Rp=[{name:"木の棒",itemType:"equipment",equipmentType:"sword",effect:{physicalStrength:5},amount:0,rarity:"common",instructionText:"分類：剣。 レアリティ：一般。 攻撃力＋５"},{name:"欠けた鉄鎧",itemType:"equipment",equipmentType:"armor",effect:{defense:8,speed:-3},amount:0,rarity:"rare",instructionText:"分類：鎧。 レアリティ：上級。 防御力＋８、スピード−３"},{name:"ハゲた兜",itemType:"equipment",equipmentType:"helmet",effect:{defense:4},amount:0,rarity:"uncommon",instructionText:"分類：兜。 レアリティ：希少級。 防御力＋４"},{name:"穴の空いた革靴",itemType:"equipment",equipmentType:"shoes",effect:{defense:2,speed:5},amount:0,rarity:"common",instructionText:"分類：靴。 レアリティ：一般級。 防御力＋４"},{name:"弦が切れそうな弓",itemType:"equipment",equipmentType:"bow",effect:{physicalStrength:10,hitRate:-5},amount:0,rarity:"rare",instructionText:"分類：剣。 レアリティ：上級。 攻撃力＋50。"},{name:"エクスカリバー",itemType:"equipment",equipmentType:"sword",effect:{physicalStrength:50},amount:0,rarity:"legendary",instructionText:"分類：剣。 レアリティ：伝説級。 攻撃力＋50。"}];class ss{constructor(t,e,r,s,o,l){$(this,"name");$(this,"itemType");$(this,"effect");$(this,"amount");$(this,"rarity");$(this,"instructionText");$(this,"isEquipped",!1);this.name=t,this.itemType=e,this.effect=r,this.amount=s,this.rarity=o,this.instructionText=l}showAmount(){return`${this.name}：${this.amount} 個`}}class Ll extends ss{}class os extends ss{constructor(e,r,s,o,l,c,f){super(e,r,o,l,c,f);$(this,"equipmentType");this.equipmentType=s,this.isEquipped=!1}}const Pp=wp.map(n=>new Ll(n.name,n.itemType,n.effect,n.amount,n.rarity,n.instructionText)),Sp=Rp.map(n=>new os(n.name,n.itemType,n.equipmentType??null,n.effect,n.amount,n.rarity,n.instructionText)),bp=[...Pp,...Sp];function Cp(n,t){const e=t.reduce((o,l)=>o+l,0),r=Math.random()*e;let s=0;for(let o=0;o<n.length;o++)if(s+=t[o],r<s)return n[o];return n[n.length-1]}function ha(n){const t=bp,e={common:.6,uncommon:.3,rare:.15,epic:.05,legendary:.02},r=t.map(l=>e[l.rarity]||.6),s=Cp(t,r);console.log("【DEBUG】選ばれたdroppedItem：",s);const o=n.inventory.find(l=>l.name===s.name);o?o.amount+=1:n.inventory.push(new ss(s.name,s.itemType,s.effect,1,s.rarity,s.instructionText)),Lt(`ドロップ報酬：${s.name}（${s.rarity}）を手に入れた！`,""),St(It)}export{Sp as a,Pp as b};
