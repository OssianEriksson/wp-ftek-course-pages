!function(){"use strict";var e={n:function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},d:function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,r=window.wp.blocks,n=window.wp.blockEditor,s=window.wp.i18n,a=window.wp.apiFetch,o=e.n(a);const u=["F","TM"],c=[1,2,3,4];var l=window.wp.url;const i=e=>"master"===e?(0,s.__)("Master's course","wp-ftek-course-pages"):(0,s._x)("Year %$1s","grade","wp-ftek-course-pages").replace("%$1s",e);var p=function(){const[e,r]=(0,t.useState)(null),[n,a]=(0,t.useState)(c[0]);(0,t.useEffect)((()=>{o()({path:"/wp-ftek-course-pages/v1/settings"}).then((e=>{const t=e;r((()=>t));const n=new Date,s=t.study_periods_end.map(((e,t)=>({end:new Date(n.getFullYear(),e.month-1,e.day),sp:c[t]}))).sort(((e,t)=>e.end.valueOf()-t.end.valueOf()));for(let e=s.length-1;e>=0;e--)if(n>s[e].end)return void a((()=>s[(e+1)%s.length].sp));a((()=>s[0].sp))}))}),[]);const p=function(e,r){const[n,s]=(0,t.useState)([]);return(0,t.useEffect)((()=>{n.length%100==0&&o()({...e,path:(0,l.addQueryArgs)(e.path,{per_page:100,offset:n.length})}).then((e=>{Array.isArray(e)&&e.length>0&&s([...n,...e])})).catch(console.error)}),[n,void 0]),n}({path:"/wp/v2/course-page"}).filter((e=>e.meta.wp_ftek_course_pages_study_perionds.includes(n)));return(0,t.createElement)(t.Fragment,null,["1","2","3"].map((r=>{const n=p.filter((e=>e.meta.wp_ftek_course_pages_year===r)).sort(((e,t)=>t.meta.wp_ftek_course_pages_participant_count-e.meta.wp_ftek_course_pages_participant_count));return(0,t.createElement)(t.Fragment,{key:r},(0,t.createElement)("h3",{dangerouslySetInnerHTML:{__html:i(r)+" "+(0,s.__)("(Schedule %$1s)","wp-ftek-course-pages").replace("%$1s",u.map((t=>{var r;return`<a href="${(null==e||null===(r=e.schedules)||void 0===r?void 0:r[t])||""}">${t}</a>`})).join(", "))}}),n.length>0?(0,t.createElement)("ul",null,n.map(((e,r)=>(0,t.createElement)("li",{key:r},(0,t.createElement)("a",{href:e.link},e.title.rendered))))):(0,t.createElement)("p",null,(0,s.__)("No courses found","wp-ftek-course-pages")))})))},d=JSON.parse('{"apiVersion":2,"name":"wp-ftek-course-pages/current-courses","title":"Current Courses","category":"widgets","textdomain":"wp-ftek-course-pages","viewScript":"file:view.js","editorScript":"file:editor.js"}');(0,r.registerBlockType)(d,{edit:function(){return(0,t.createElement)("div",(0,n.useBlockProps)(),(0,t.createElement)(p,null))},save:function(){return(0,t.createElement)("div",n.useBlockProps.save())},icon:(0,t.createElement)((function(e){let{url:r,style:n}=e;return(0,t.createElement)("svg",{style:n},(0,t.createElement)("image",{style:{width:"100%"},xlinkHref:r}))}),{url:wpFtekCoursePagesCurrentCoursesEditor.iconUrl})})}();