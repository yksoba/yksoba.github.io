"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[947],{6990:function(e,t,n){n.d(t,{A:function(){return C}});var a=n(8587),r=n(8168),o=n(6540),l=n(4164),i=n(7379),c=n(5659),s=n(771),d=n(1848),u=n(3431),m=n(5669),p=n(8850),h=n(8466),v=n(8413),b=n(1609);function f(e){return(0,b.Ay)("MuiButton",e)}var g=(0,v.A)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var x=o.createContext({});var E=o.createContext(void 0),y=n(4848);const S=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],A=e=>(0,r.A)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),w=(0,d.Ay)(p.A,{shouldForwardProp:e=>(0,u.A)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${(0,h.A)(n.color)}`],t[`size${(0,h.A)(n.size)}`],t[`${n.variant}Size${(0,h.A)(n.size)}`],"inherit"===n.color&&t.colorInherit,n.disableElevation&&t.disableElevation,n.fullWidth&&t.fullWidth]}})((({theme:e,ownerState:t})=>{var n,a;const o="light"===e.palette.mode?e.palette.grey[300]:e.palette.grey[800],l="light"===e.palette.mode?e.palette.grey.A100:e.palette.grey[700];return(0,r.A)({},e.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,transition:e.transitions.create(["background-color","box-shadow","border-color","color"],{duration:e.transitions.duration.short}),"&:hover":(0,r.A)({textDecoration:"none",backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===t.variant&&"inherit"!==t.color&&{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===t.variant&&"inherit"!==t.color&&{border:`1px solid ${(e.vars||e).palette[t.color].main}`,backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===t.variant&&{backgroundColor:e.vars?e.vars.palette.Button.inheritContainedHoverBg:l,boxShadow:(e.vars||e).shadows[4],"@media (hover: none)":{boxShadow:(e.vars||e).shadows[2],backgroundColor:(e.vars||e).palette.grey[300]}},"contained"===t.variant&&"inherit"!==t.color&&{backgroundColor:(e.vars||e).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(e.vars||e).palette[t.color].main}}),"&:active":(0,r.A)({},"contained"===t.variant&&{boxShadow:(e.vars||e).shadows[8]}),[`&.${g.focusVisible}`]:(0,r.A)({},"contained"===t.variant&&{boxShadow:(e.vars||e).shadows[6]}),[`&.${g.disabled}`]:(0,r.A)({color:(e.vars||e).palette.action.disabled},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.action.disabledBackground}`},"contained"===t.variant&&{color:(e.vars||e).palette.action.disabled,boxShadow:(e.vars||e).shadows[0],backgroundColor:(e.vars||e).palette.action.disabledBackground})},"text"===t.variant&&{padding:"6px 8px"},"text"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main},"outlined"===t.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main,border:e.vars?`1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`:`1px solid ${(0,s.X4)(e.palette[t.color].main,.5)}`},"contained"===t.variant&&{color:e.vars?e.vars.palette.text.primary:null==(n=(a=e.palette).getContrastText)?void 0:n.call(a,e.palette.grey[300]),backgroundColor:e.vars?e.vars.palette.Button.inheritContainedBg:o,boxShadow:(e.vars||e).shadows[2]},"contained"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].contrastText,backgroundColor:(e.vars||e).palette[t.color].main},"inherit"===t.color&&{color:"inherit",borderColor:"currentColor"},"small"===t.size&&"text"===t.variant&&{padding:"4px 5px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"text"===t.variant&&{padding:"8px 11px",fontSize:e.typography.pxToRem(15)},"small"===t.size&&"outlined"===t.variant&&{padding:"3px 9px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"outlined"===t.variant&&{padding:"7px 21px",fontSize:e.typography.pxToRem(15)},"small"===t.size&&"contained"===t.variant&&{padding:"4px 10px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"contained"===t.variant&&{padding:"8px 22px",fontSize:e.typography.pxToRem(15)},t.fullWidth&&{width:"100%"})}),(({ownerState:e})=>e.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${g.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${g.disabled}`]:{boxShadow:"none"}})),z=(0,d.Ay)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.startIcon,t[`iconSize${(0,h.A)(n.size)}`]]}})((({ownerState:e})=>(0,r.A)({display:"inherit",marginRight:8,marginLeft:-4},"small"===e.size&&{marginLeft:-2},A(e)))),I=(0,d.Ay)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.endIcon,t[`iconSize${(0,h.A)(n.size)}`]]}})((({ownerState:e})=>(0,r.A)({display:"inherit",marginRight:-4,marginLeft:8},"small"===e.size&&{marginRight:-2},A(e))));var C=o.forwardRef((function(e,t){const n=o.useContext(x),s=o.useContext(E),d=(0,i.A)(n,e),u=(0,m.b)({props:d,name:"MuiButton"}),{children:p,color:v="primary",component:b="button",className:g,disabled:A=!1,disableElevation:C=!1,disableFocusRipple:k=!1,endIcon:$,focusVisibleClassName:R,fullWidth:M=!1,size:B="medium",startIcon:W,type:L,variant:N="text"}=u,O=(0,a.A)(u,S),F=(0,r.A)({},u,{color:v,component:b,disabled:A,disableElevation:C,disableFocusRipple:k,fullWidth:M,size:B,type:L,variant:N}),T=(e=>{const{color:t,disableElevation:n,fullWidth:a,size:o,variant:l,classes:i}=e,s={root:["root",l,`${l}${(0,h.A)(t)}`,`size${(0,h.A)(o)}`,`${l}Size${(0,h.A)(o)}`,`color${(0,h.A)(t)}`,n&&"disableElevation",a&&"fullWidth"],label:["label"],startIcon:["icon","startIcon",`iconSize${(0,h.A)(o)}`],endIcon:["icon","endIcon",`iconSize${(0,h.A)(o)}`]},d=(0,c.A)(s,f,i);return(0,r.A)({},i,d)})(F),_=W&&(0,y.jsx)(z,{className:T.startIcon,ownerState:F,children:W}),P=$&&(0,y.jsx)(I,{className:T.endIcon,ownerState:F,children:$}),j=s||"";return(0,y.jsxs)(w,(0,r.A)({ownerState:F,className:(0,l.A)(n.className,T.root,g,j),component:b,disabled:A,focusRipple:!k,focusVisibleClassName:(0,l.A)(T.focusVisible,R),ref:t,type:L},O,{classes:T,children:[_,p,P]}))}))},7340:function(e,t,n){n.d(t,{A:function(){return r}});var a=n(7379);function r(e){const{theme:t,name:n,props:r}=e;return t&&t.components&&t.components[n]&&t.components[n].defaultProps?(0,a.A)(t.components[n].defaultProps,r):r}},1130:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var a=n(6540),r=n.t(a,2),o=n(1529),l=n(7340),i=n(3951);function c(e,t,n,r,l){const[i,c]=a.useState((()=>l&&n?n(e).matches:r?r(e).matches:t));return(0,o.A)((()=>{let t=!0;if(!n)return;const a=n(e),r=()=>{t&&c(a.matches)};return r(),a.addListener(r),()=>{t=!1,a.removeListener(r)}}),[e,n]),i}const s=r.useSyncExternalStore;function d(e,t,n,r,o){const l=a.useCallback((()=>t),[t]),i=a.useMemo((()=>{if(o&&n)return()=>n(e).matches;if(null!==r){const{matches:t}=r(e);return()=>t}return l}),[l,e,r,o,n]),[c,d]=a.useMemo((()=>{if(null===n)return[l,()=>()=>{}];const t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]}),[l,n,e]);return s(d,c,i)}var u=n(4073),m=n(5001),p=n(6990),h=n(4794),v=n(4883),b=n(4859),f=n(4506),g=n(8161);const x=e=>{let{children:t,direction:n,style:r,sx:o,...l}=e;const i=(0,a.useRef)(null),{0:c,1:s}=(0,a.useState)("auto"),d=(0,a.useCallback)((()=>{if(!i.current)return;console.info("Recomputing container aspect ratio");const e=i.current.children,t=new Array(e.length).fill(0).map(((t,n)=>e.item(n))).map(S).filter((e=>e)),a=A(t,n);s(a)}),[]),u=(0,a.useMemo)((()=>{if("undefined"==typeof window)return null;const e=new MutationObserver((e=>{e.forEach((e=>{"attributes"===e.type&&"style"===e.attributeName&&d()}))}));return new MutationObserver((t=>t.forEach((t=>{"childList"===t.type&&t.addedNodes.forEach((t=>e.observe(t,{attributeFilter:["style"]})))}))))}),[]);return(0,a.useEffect)((()=>{i.current&&"undefined"!=typeof window&&(null==u||u.observe(i.current,{childList:!0}),d())}),[i.current]),a.createElement(g.A,Object.assign({ref:i,style:{...r,aspectRatio:c},sx:[].concat((0,f.A)(Array.isArray(o)?o:[o]),[{display:"flex",flexDirection:n}])},l),t)},E=e=>a.createElement(x,Object.assign({direction:"row"},e)),y=e=>a.createElement(x,Object.assign({direction:"column"},e)),S=e=>(e=>{if("auto"===e)return null;const t=e.split("/");return 1==t.length?[+t[0],1]:[+t[0],+t[1]]})(window.getComputedStyle(e).aspectRatio),A=(e,t)=>0==e.length?"auto":"row"==t?`${e.map((e=>{let[t,n]=e;return t/n})).reduce(((e,t)=>e+t),0)}`:""+1/e.map((e=>{let[t,n]=e;return n/t})).reduce(((e,t)=>e+t),0);var w=n(7705),z=n(2421),I=n(6793);var C=()=>{const e=(0,h.useStaticQuery)("3058975044"),t=Object.fromEntries(e.allFile.nodes.map((e=>[e.name,e])));!function(e,t={}){const n=(0,i.A)(),a="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:r=!1,matchMedia:o=(a?window.matchMedia:null),ssrMatchMedia:u=null,noSsr:m=!1}=(0,l.A)({name:"MuiUseMediaQuery",props:t,theme:n});let p="function"==typeof e?e(n):e;p=p.replace(/^@media( ?)/m,""),(void 0!==s?d:c)(p,r,o,u,m)}((e=>e.breakpoints.down(b.SM)));return a.createElement(v.wt,{m:[.5,1],gap:2,pb:4,sx:e=>({"& h2":{[e.breakpoints.down(b.SM)]:{fontSize:"3rem"}},maxWidth:"800px"})},a.createElement(v.wt,{mt:4,px:4,alignItems:"center",sx:{textAlign:"center"}},a.createElement(u.A,{component:"h1",variant:"h2",sx:{textTransform:"uppercase"}},"Commissions"),a.createElement(u.A,{variant:"subtitle1",sx:{fontStyle:"italic",mt:2}},"Prices below are estimates for one character. For more options and multiple characters, see the"," ",a.createElement(m.A,{href:w.yg,target:"_blank"},"full pricing sheet"),". All prices in USD.")),a.createElement(v.wt,{gap:2,alignItems:"center"},a.createElement(v.Ap,null),a.createElement(m.A,{href:w.vy,target:"_blank"},"Commissions Trello Board"),a.createElement(m.A,{href:w.oH,target:"_blank"},"Commissions Info Sheet"),a.createElement(m.A,{href:w.yg,target:"_blank"},"Pricing Sheet"),a.createElement(m.A,{href:w.zr,target:"_blank"},"Terms of Service"),a.createElement(M,null),a.createElement(v.Ap,null)),a.createElement(k,null,a.createElement($,null,a.createElement(u.A,{variant:"h3"},"Full-Body"),a.createElement(u.A,{variant:"body1"},"Flat Style | 120"),a.createElement(u.A,{variant:"body1"},"Rendered Style | 150"),a.createElement(u.A,{variant:"body1"},"Rendered+Detailed Background | 200")),a.createElement(R,null,a.createElement(z.r,{images:[t["600-a"],t["404-n"],t[593]].map(I._)},a.createElement(E,null,a.createElement(y,null,a.createElement(z.I,{index:0}),a.createElement(z.I,{index:1})),a.createElement(y,null,a.createElement(z.I,{index:2})))))),a.createElement(v.Ap,null),a.createElement(k,null,a.createElement($,null,a.createElement(u.A,{variant:"h3"},"Half-Body"),a.createElement(u.A,{variant:"body1"},"Flat Style | 80"),a.createElement(u.A,{variant:"body1"},"Rendered Style | 100")),a.createElement(R,null,a.createElement(z.r,{images:[t["611.1-p"],t[453]].map(I._)},a.createElement(E,null,a.createElement(y,null,a.createElement(z.I,{index:0})),a.createElement(y,null,a.createElement(z.I,{index:1})))))),a.createElement(v.Ap,null),a.createElement(k,null,a.createElement($,null,a.createElement(u.A,{variant:"h3"},"Bust-Up / ",a.createElement("br",null),"Headshot"),a.createElement(u.A,{variant:"body1"},"Flat Style | 50"),a.createElement(u.A,{variant:"body1"},"Rendered Style | 60")),a.createElement(R,null,a.createElement(z.r,{images:[t[500],t[507],t[521],t[498]].map(I._)},a.createElement(y,null,a.createElement(E,null,a.createElement(y,null,a.createElement(z.I,{index:0})),a.createElement(y,null,a.createElement(z.I,{index:1}))),a.createElement(E,null,a.createElement(y,null,a.createElement(z.I,{index:2})),a.createElement(y,null,a.createElement(z.I,{index:3}))))))),a.createElement(v.Ap,null),a.createElement(v.wt,{px:4,alignItems:"center",sx:{textAlign:"center"}},a.createElement(u.A,{variant:"subtitle1",sx:{fontStyle:"italic"}},"See the"," ",a.createElement(m.A,{href:w.yg,target:"_blank"},"full pricing sheet")," ","for more options!")),a.createElement(v.wt,{px:4,alignItems:"center",sx:{textAlign:"center"}},a.createElement(M,null)))};const k=e=>{let{children:t}=e;return a.createElement(v.so,{gap:2,width:"100%",sx:{flexDirection:"column",px:4}},t)},$=e=>{let{children:t}=e;return a.createElement(v.wt,{className:"info-col",alignItems:"end",sx:{textAlign:"right","& h3":{fontSize:"3rem"},"& p":{fontSize:"1.5rem"}}},t)},R=e=>{let{children:t}=e;return a.createElement(v.wt,{className:"preview-col"},t)},M=e=>{let{href:t="https://forms.gle/SuE2buZKXEZMnJvX7"}=e;return a.createElement(p.A,{component:"a",href:t,target:"_blank",variant:"outlined"},"Request A Slot")}}}]);
//# sourceMappingURL=component---src-pages-commissions-tsx-5f15f353c9f4703db1c9.js.map