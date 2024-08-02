"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[304],{5883:function(e,t,r){r.d(t,{A:function(){return $}});var o=r(8587),n=r(8168),a=r(6540),s=r(4164),i=r(1609),u=r(5659),d=r(3967),l=r(7340),m=r(2858);var c=r(2532),h=r(1317),p=r(8749),f=r(3571);const A=["ownerState"],x=["variants"],v=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function b(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const y=(0,p.A)(),g=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function w({defaultTheme:e,theme:t,themeId:r}){return o=t,0===Object.keys(o).length?e:t[r]||t;var o}function S(e){return e?(t,r)=>r[e]:null}function k(e,t){let{ownerState:r}=t,a=(0,o.A)(t,A);const s="function"==typeof e?e((0,n.A)({ownerState:r},a)):e;if(Array.isArray(s))return s.flatMap((e=>k(e,(0,n.A)({ownerState:r},a))));if(s&&"object"==typeof s&&Array.isArray(s.variants)){const{variants:e=[]}=s;let t=(0,o.A)(s,x);return e.forEach((e=>{let o=!0;"function"==typeof e.props?o=e.props((0,n.A)({ownerState:r},a,r)):Object.keys(e.props).forEach((t=>{(null==r?void 0:r[t])!==e.props[t]&&a[t]!==e.props[t]&&(o=!1)})),o&&(Array.isArray(t)||(t=[t]),t.push("function"==typeof e.style?e.style((0,n.A)({ownerState:r},a,r)):e.style))})),t}return s}const W=function(e={}){const{themeId:t,defaultTheme:r=y,rootShouldForwardProp:a=b,slotShouldForwardProp:s=b}=e,i=e=>(0,f.A)((0,n.A)({},e,{theme:w((0,n.A)({},e,{defaultTheme:r,themeId:t}))}));return i.__mui_systemSx=!0,(e,u={})=>{(0,c.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:d,slot:l,skipVariantsResolver:m,skipSx:p,overridesResolver:f=S(g(l))}=u,A=(0,o.A)(u,v),x=void 0!==m?m:l&&"Root"!==l&&"root"!==l||!1,y=p||!1;let W=b;"Root"===l||"root"===l?W=a:l?W=s:function(e){return"string"==typeof e&&e.charCodeAt(0)>96}(e)&&(W=void 0);const C=(0,c.default)(e,(0,n.A)({shouldForwardProp:W,label:undefined},A)),R=e=>"function"==typeof e&&e.__emotion_real!==e||(0,h.Q)(e)?o=>k(e,(0,n.A)({},o,{theme:w({theme:o.theme,defaultTheme:r,themeId:t})})):e,T=(o,...a)=>{let s=R(o);const u=a?a.map(R):[];d&&f&&u.push((e=>{const o=w((0,n.A)({},e,{defaultTheme:r,themeId:t}));if(!o.components||!o.components[d]||!o.components[d].styleOverrides)return null;const a=o.components[d].styleOverrides,s={};return Object.entries(a).forEach((([t,r])=>{s[t]=k(r,(0,n.A)({},e,{theme:o}))})),f(e,s)})),d&&!x&&u.push((e=>{var o;const a=w((0,n.A)({},e,{defaultTheme:r,themeId:t}));return k({variants:null==a||null==(o=a.components)||null==(o=o[d])?void 0:o.variants},(0,n.A)({},e,{theme:a}))})),y||u.push(i);const l=u.length-a.length;if(Array.isArray(o)&&l>0){const e=new Array(l).fill("");s=[...o,...e],s.raw=[...o.raw,...e]}const m=C(s,...u);return e.muiName&&(m.muiName=e.muiName),m};return C.withConfig&&(T.withConfig=C.withConfig),T}}();var C=W,R=r(4848);const T=["className","component","disableGutters","fixed","maxWidth","classes"],_=(0,p.A)(),G=C("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`maxWidth${(0,d.A)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),I=e=>function({props:e,name:t,defaultTheme:r,themeId:o}){let n=(0,m.A)(r);return o&&(n=n[o]||n),(0,l.A)({theme:n,name:t,props:e})}({props:e,name:"MuiContainer",defaultTheme:_});var M=r(8466),N=r(1848),j=r(5669);const O=function(e={}){const{createStyledComponent:t=G,useThemeProps:r=I,componentName:l="MuiContainer"}=e,m=t((({theme:e,ownerState:t})=>(0,n.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,r)=>{const o=r,n=e.breakpoints.values[o];return 0!==n&&(t[e.breakpoints.up(o)]={maxWidth:`${n}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,n.A)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),c=a.forwardRef((function(e,t){const a=r(e),{className:c,component:h="div",disableGutters:p=!1,fixed:f=!1,maxWidth:A="lg"}=a,x=(0,o.A)(a,T),v=(0,n.A)({},a,{component:h,disableGutters:p,fixed:f,maxWidth:A}),b=((e,t)=>{const{classes:r,fixed:o,disableGutters:n,maxWidth:a}=e,s={root:["root",a&&`maxWidth${(0,d.A)(String(a))}`,o&&"fixed",n&&"disableGutters"]};return(0,u.A)(s,(e=>(0,i.Ay)(t,e)),r)})(v,l);return(0,R.jsx)(m,(0,n.A)({as:h,ownerState:v,className:(0,s.A)(b.root,c),ref:t},x))}));return c}({createStyledComponent:(0,N.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`maxWidth${(0,M.A)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,j.b)({props:e,name:"MuiContainer"})});var $=O},3432:function(e,t,r){r.r(t);var o=r(6540),n=r(8161),a=r(5883);t.default=e=>o.createElement(n.A,{bgcolor:"rgba(0,0,0,0.5)"},o.createElement(a.A,{sx:{py:4,a:{color:"#AFF"},h3:{mt:3}},fixed:!0},"This page has been temporarily moved."," ",o.createElement("a",{href:"https://docs.google.com/document/d/e/2PACX-1vTimCN2_ovUX2HI7RiQk21wpcz8yfg9qjMAMZh3zrWF0DuZ2xovh3aImOUHte0D9e8zBhh-I9Wj-VUN/pub"},"Click here for the terms of service.")))}}]);
//# sourceMappingURL=component---src-pages-terms-of-service-tsx-720edee5e3156d6378a4.js.map