"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[453],{5883:function(e,t,n){n.d(t,{A:function(){return $}});var r=n(8587),o=n(8168),a=n(6540),s=n(4164),i=n(1609),u=n(5659),l=n(3967),d=n(7340),m=n(2858);var c=n(2532),p=n(1317),h=n(8749),f=n(3571);const A=["ownerState"],x=["variants"],v=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function b(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const y=(0,h.A)(),g=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function w({defaultTheme:e,theme:t,themeId:n}){return r=t,0===Object.keys(r).length?e:t[n]||t;var r}function S(e){return e?(t,n)=>n[e]:null}function k(e,t){let{ownerState:n}=t,a=(0,r.A)(t,A);const s="function"==typeof e?e((0,o.A)({ownerState:n},a)):e;if(Array.isArray(s))return s.flatMap((e=>k(e,(0,o.A)({ownerState:n},a))));if(s&&"object"==typeof s&&Array.isArray(s.variants)){const{variants:e=[]}=s;let t=(0,r.A)(s,x);return e.forEach((e=>{let r=!0;"function"==typeof e.props?r=e.props((0,o.A)({ownerState:n},a,n)):Object.keys(e.props).forEach((t=>{(null==n?void 0:n[t])!==e.props[t]&&a[t]!==e.props[t]&&(r=!1)})),r&&(Array.isArray(t)||(t=[t]),t.push("function"==typeof e.style?e.style((0,o.A)({ownerState:n},a,n)):e.style))})),t}return s}const W=function(e={}){const{themeId:t,defaultTheme:n=y,rootShouldForwardProp:a=b,slotShouldForwardProp:s=b}=e,i=e=>(0,f.A)((0,o.A)({},e,{theme:w((0,o.A)({},e,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(e,u={})=>{(0,c.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:l,slot:d,skipVariantsResolver:m,skipSx:h,overridesResolver:f=S(g(d))}=u,A=(0,r.A)(u,v),x=void 0!==m?m:d&&"Root"!==d&&"root"!==d||!1,y=h||!1;let W=b;"Root"===d||"root"===d?W=a:d?W=s:function(e){return"string"==typeof e&&e.charCodeAt(0)>96}(e)&&(W=void 0);const C=(0,c.default)(e,(0,o.A)({shouldForwardProp:W,label:undefined},A)),R=e=>"function"==typeof e&&e.__emotion_real!==e||(0,p.Q)(e)?r=>k(e,(0,o.A)({},r,{theme:w({theme:r.theme,defaultTheme:n,themeId:t})})):e,G=(r,...a)=>{let s=R(r);const u=a?a.map(R):[];l&&f&&u.push((e=>{const r=w((0,o.A)({},e,{defaultTheme:n,themeId:t}));if(!r.components||!r.components[l]||!r.components[l].styleOverrides)return null;const a=r.components[l].styleOverrides,s={};return Object.entries(a).forEach((([t,n])=>{s[t]=k(n,(0,o.A)({},e,{theme:r}))})),f(e,s)})),l&&!x&&u.push((e=>{var r;const a=w((0,o.A)({},e,{defaultTheme:n,themeId:t}));return k({variants:null==a||null==(r=a.components)||null==(r=r[l])?void 0:r.variants},(0,o.A)({},e,{theme:a}))})),y||u.push(i);const d=u.length-a.length;if(Array.isArray(r)&&d>0){const e=new Array(d).fill("");s=[...r,...e],s.raw=[...r.raw,...e]}const m=C(s,...u);return e.muiName&&(m.muiName=e.muiName),m};return C.withConfig&&(G.withConfig=C.withConfig),G}}();var C=W,R=n(4848);const G=["className","component","disableGutters","fixed","maxWidth","classes"],T=(0,h.A)(),_=C("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,l.A)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),E=e=>function({props:e,name:t,defaultTheme:n,themeId:r}){let o=(0,m.A)(n);return r&&(o=o[r]||o),(0,d.A)({theme:o,name:t,props:e})}({props:e,name:"MuiContainer",defaultTheme:T});var I=n(8466),M=n(1848),N=n(5669);const P=function(e={}){const{createStyledComponent:t=_,useThemeProps:n=E,componentName:d="MuiContainer"}=e,m=t((({theme:e,ownerState:t})=>(0,o.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=n,o=e.breakpoints.values[r];return 0!==o&&(t[e.breakpoints.up(r)]={maxWidth:`${o}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,o.A)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),c=a.forwardRef((function(e,t){const a=n(e),{className:c,component:p="div",disableGutters:h=!1,fixed:f=!1,maxWidth:A="lg"}=a,x=(0,r.A)(a,G),v=(0,o.A)({},a,{component:p,disableGutters:h,fixed:f,maxWidth:A}),b=((e,t)=>{const{classes:n,fixed:r,disableGutters:o,maxWidth:a}=e,s={root:["root",a&&`maxWidth${(0,l.A)(String(a))}`,r&&"fixed",o&&"disableGutters"]};return(0,u.A)(s,(e=>(0,i.Ay)(t,e)),n)})(v,d);return(0,R.jsx)(m,(0,o.A)({as:p,ownerState:v,className:(0,s.A)(b.root,c),ref:t},x))}));return c}({createStyledComponent:(0,M.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,I.A)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,N.b)({props:e,name:"MuiContainer"})});var $=P},7340:function(e,t,n){n.d(t,{A:function(){return o}});var r=n(7379);function o(e){const{theme:t,name:n,props:o}=e;return t&&t.components&&t.components[n]&&t.components[n].defaultProps?(0,r.A)(t.components[n].defaultProps,o):o}},731:function(e,t,n){n.r(t);var r=n(5883),o=n(4073),a=n(6540);t.default=e=>a.createElement(a.Fragment,null,a.createElement(r.A,{fixed:!0,sx:{pt:4}},a.createElement(o.A,{variant:"h1"},"404"),a.createElement(o.A,{variant:"h4"},"Sorry, but it looks like we can't find the page you're looking for.")))}}]);
//# sourceMappingURL=component---src-pages-404-tsx-ef599c85b2eb0c82bf3a.js.map