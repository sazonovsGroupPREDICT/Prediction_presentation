import{d as p,ab as h,ac as f,ad as d,b as u,ae as g,af as v,ag as b,_ as x,o as n,f as i,g as e,h as a,F as y,i as N,j as k,k as P,l as V,n as S}from"./index-Dxf5LNpF.js";import{N as w}from"./NoteDisplay-awUqOkHs.js";const D=p({__name:"PresenterPrint",setup(m,{expose:r}){r(),h(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),f({title:`Notes - ${d.title}`});const t={slidesWithNote:u(()=>g.map(s=>{var l;return(l=s.meta)==null?void 0:l.slide}).filter(s=>s!==void 0&&s.noteHTML!=="")),get configs(){return d},get themeVars(){return b},get total(){return v},NoteDisplay:w};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}}),L={class:"m-4"},T={class:"mb-10"},W={class:"text-4xl font-bold mt-2"},j={class:"opacity-50"},z={class:"text-lg"},B={class:"font-bold flex gap-2"},H={class:"opacity-50"},C={key:0,class:"border-gray-400/50 mb-8"};function F(m,r,_,t,s,l){return n(),i("div",{id:"page-root",style:S(t.themeVars)},[e("div",L,[e("div",T,[e("h1",W,a(t.configs.title),1),e("div",j,a(new Date().toLocaleString()),1)]),(n(!0),i(y,null,N(t.slidesWithNote,(o,c)=>(n(),i("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[e("div",null,[e("h2",z,[e("div",B,[e("div",H,a(o==null?void 0:o.no)+"/"+a(t.total),1),k(" "+a(o==null?void 0:o.title)+" ",1),r[0]||(r[0]=e("div",{class:"flex-auto"},null,-1))])]),P(t.NoteDisplay,{"note-html":o.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<t.slidesWithNote.length-1?(n(),i("hr",C)):V("v-if",!0)]))),128))])],4)}const E=x(D,[["render",F],["__file","/Users/oz16cb/Desktop/prediction_presentation/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
