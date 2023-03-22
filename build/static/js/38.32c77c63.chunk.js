"use strict";(self.webpackChunksnappy=self.webpackChunksnappy||[]).push([[38],{4038:function(n,e,r){r.r(e);var t,s=r(168),a=r(4942),o=r(1413),i=r(4165),c=r(5861),u=r(885),d=r(2791),l=r(7689),p=r(1087),m=r(6444),f=r(6571),g=r(8174),h=(r(5462),r(4569)),x=r.n(h),b=r(8204),w=r(5569),v=r(184);var j=m.ZP.div(t||(t=(0,s.Z)(["\n  height: 100vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1rem;\n  align-items: center;\n  background-color: #131324;\n  .brand {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    justify-content: center;\n    img {\n      height: 5rem;\n    }\n    h1 {\n      color: white;\n      text-transform: uppercase;\n    }\n  }\n   form {\n     display: flex;\n     flex-direction: column;\n     gap: 2rem;\n     background-color: #00000076;\n     border-radius: 2rem;\n     padding: 3rem 5rem;\n   }\n   input {\n     background-color: transparent;\n     padding: 1rem;\n     border: 0.1rem solid #4e0eff;\n     border-radius: 0.4rem;\n     color: white;\n     width: 100%;\n     font-size: 1rem;\n     &:focus {\n       border: 0.1rem solid #997af0;\n       outline: none;\n     }\n   }\n   .btn {\n     background-color: #4e0eff;\n     color: white;\n     padding: 1rem 2rem;\n     border: none;\n     font-weight: bold;\n     cursor: pointer;\n     border-radius: 0.4rem;\n     font-size: 1rem;\n     text-transform: uppercase;\n     &:hover {\n       background-color: #4e0eff;\n     }\n   }\n   span {\n     color: white;\n     text-transform: uppercase;\n     a {\n       color: #4e0eff;\n       text-decoration: none;\n       font-weight: bold;\n     }\n   }\n"])));e.default=function(){var n=(0,l.s0)(),e=(0,d.useState)({username:"",password:""}),r=(0,u.Z)(e,2),t=r[0],s=r[1],m={position:"bottom-right",autoClose:8e3,pauseOnHover:!0,draggable:!0,theme:"dark"};(0,d.useEffect)((function(){localStorage.getItem("snappy-user")&&n("/")}),[]);var h=function(){var e=(0,c.Z)((0,i.Z)().mark((function e(r){var s,a,o,c;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),!y()){e.next=15;break}return s=t.password,a=t.username,e.prev=3,e.next=6,x().post(b.VU,{username:a,password:s});case 6:o=e.sent,!1===(c=o.data).status&&g.Am.error(c.msg,m),!0===c.status&&(localStorage.setItem("snappy-user",JSON.stringify(c.user)),n("/")),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),g.Am.error(e.t0,m);case 15:case 16:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(n){return e.apply(this,arguments)}}(),y=function(){var n=t.password,e=t.username;return""===n?(g.Am.error("Email and Password is required",m),!1):""!==e.length||(g.Am.error("Email and Password is required",m),!1)},k=function(n){s((0,o.Z)((0,o.Z)({},t),{},(0,a.Z)({},n.target.name,n.target.value)))};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{children:(0,v.jsxs)("form",{onSubmit:function(n){return h(n)},children:[(0,v.jsxs)("div",{className:"brand",children:[(0,v.jsx)("img",{src:f.Z,alt:"Logo"}),(0,v.jsx)("h1",{children:"snappy"})]}),(0,v.jsx)("input",{type:"text",placeholder:"Username",name:"username",onChange:function(n){return k(n)},min:"3"}),(0,v.jsx)("input",{type:"password",placeholder:"Password",name:"password",onChange:function(n){return k(n)}}),(0,v.jsx)("button",{type:"submit",className:"btn",children:"Login"}),(0,v.jsx)(w.Z,{}),(0,v.jsxs)("span",{children:["New User ? ",(0,v.jsx)(p.rU,{to:"/register",children:"Register"})]})]})}),(0,v.jsx)(g.Ix,{})]})}}}]);
//# sourceMappingURL=38.32c77c63.chunk.js.map