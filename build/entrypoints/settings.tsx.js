!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,n=window.wp.components,r=window.wp.notices,s=window.wp.i18n,a=window.wp.data,c=window.wp.apiFetch,o=e.n(c);const l=e=>(0,t.createElement)(t.Fragment,null,(0,s.__)("The following error has occurred:","wp-ftek-course-pages"),(0,t.createElement)("pre",{className:"error"},JSON.stringify(e,null,4))),u=()=>{const e=(0,a.useSelect)((e=>e(r.store).getNotices())).filter((e=>"snackbar"===e.type)),{removeNotice:s}=(0,a.useDispatch)(r.store);return(0,t.createElement)(n.SnackbarList,{notices:e,onRemove:s})},i=()=>(0,t.createElement)(n.Placeholder,null,(0,t.createElement)("div",{className:"placeholder-center"},(0,t.createElement)(n.Spinner,null))),p=()=>{const[e,c]=(0,t.useState)(null),[u,p]=(0,t.useState)(null);(0,t.useEffect)((()=>{o()({path:"/wp-ftek-course-pages/v1/settings"}).then((e=>{p(e)})).catch((e=>c(e)))}),[]);const{createNotice:m}=(0,a.useDispatch)(r.store);return e?(0,t.createElement)(l,{error:e}):u?(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.TextControl,{label:(0,s.__)("Course page slug","wp-ftek-course-pages"),value:u.slug,onChange:e=>p({...u,slug:e})}),(0,t.createElement)(n.Button,{onClick:()=>{o()({path:"/wp-ftek-course-pages/v1/settings",method:"POST",data:u}).then((()=>m("success",(0,s.__)("Settings saved.","wp-ftek-course-pages"),{type:"snackbar"}))).catch((e=>m("error",(null==e?void 0:e.message)||JSON.stringify(e),{type:"snackbar"})))},isPrimary:!0},(0,s.__)("Save changes","wp-ftek-course-pages"))):(0,t.createElement)(i,null)};var m=()=>(0,t.createElement)("div",{className:"wp-ftek-course-pages-settings"},(0,t.createElement)("h1",null,(0,s.__)("Course Pages Settings","wp-ftek-course-pages")),(0,t.createElement)(p,null),(0,t.createElement)(u,null));document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("wp-ftek-course-pages-settings");e&&(0,t.render)((0,t.createElement)(m,null),e)}))}();