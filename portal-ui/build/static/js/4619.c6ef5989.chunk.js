"use strict";(self.webpackChunkportal_ui=self.webpackChunkportal_ui||[]).push([[4619],{94619:function(e,a,s){s.r(a);var n=s(29439),t=s(1413),l=s(72791),o=s(56028),i=s(61889),r=s(36151),c=s(21435),d=s(11135),u=s(25787),m=s(23814),f=s(60364),p=s(81207),Z=s(42649),x=s(90673),h=s(93656),v=s(80184),g=(0,f.$j)((function(e){return{session:e.console.session}}),{setErrorSnackMessage:Z.Ih});a.default=(0,u.Z)((function(e){return(0,d.Z)((0,t.Z)((0,t.Z)({},m.DF),m.ID))}))(g((function(e){var a=e.modalOpen,s=e.onClose,t=e.classes,d=e.bucket,u=(0,l.useState)(""),m=(0,n.Z)(u,2),f=m[0],g=m[1],j=(0,l.useState)("readonly"),k=(0,n.Z)(j,2),C=k[0],b=k[1];return(0,v.jsx)(o.Z,{modalOpen:a,title:"Add Access Rule",onClose:s,titleIcon:(0,v.jsx)(h.sR,{}),children:(0,v.jsxs)(i.ZP,{container:!0,children:[(0,v.jsx)(i.ZP,{item:!0,xs:12,className:t.formFieldRow,children:(0,v.jsx)(c.Z,{value:f,label:"Prefix",id:"prefix",name:"prefix",placeholder:"Enter Prefix",onChange:function(e){g(e.target.value)}})}),(0,v.jsx)(i.ZP,{item:!0,xs:12,children:(0,v.jsx)(x.Z,{id:"access",name:"Access",onChange:function(e){b(e.target.value)},label:"Access",value:C,options:[{label:"readonly",value:"readonly"},{label:"writeonly",value:"writeonly"},{label:"readwrite",value:"readwrite"}],disabled:!1})}),(0,v.jsxs)(i.ZP,{item:!0,xs:12,className:t.modalButtonBar,children:[(0,v.jsx)(r.Z,{type:"button",color:"primary",variant:"outlined",onClick:function(){g(""),b("readonly")},children:"Clear"}),(0,v.jsx)(r.Z,{type:"submit",variant:"contained",color:"primary",disabled:""===f.trim(),onClick:function(){p.Z.invoke("PUT","/api/v1/bucket/".concat(d,"/access-rules"),{prefix:f,access:C}).then((function(e){s()})).catch((function(e){(0,Z.Ih)(e),s()}))},children:"Save"})]})]})})})))},56028:function(e,a,s){var n=s(29439),t=s(1413),l=s(72791),o=s(60364),i=s(13400),r=s(55646),c=s(5574),d=s(65661),u=s(39157),m=s(11135),f=s(25787),p=s(23814),Z=s(42649),x=s(29823),h=s(28057),v=s(80184),g=(0,o.$j)((function(e){return{modalSnackMessage:e.system.modalSnackBar}}),{setModalSnackMessage:Z.MK});a.Z=(0,f.Z)((function(e){return(0,m.Z)((0,t.Z)((0,t.Z)({},p.Qw),{},{content:{padding:25,paddingBottom:0},customDialogSize:{width:"100%",maxWidth:765}},p.sN))}))(g((function(e){var a=e.onClose,s=e.modalOpen,o=e.title,m=e.children,f=e.classes,p=e.wideLimit,Z=void 0===p||p,g=e.modalSnackMessage,j=e.noContentPadding,k=e.setModalSnackMessage,C=e.titleIcon,b=void 0===C?null:C,y=(0,l.useState)(!1),M=(0,n.Z)(y,2),S=M[0],N=M[1];(0,l.useEffect)((function(){k("")}),[k]),(0,l.useEffect)((function(){if(g){if(""===g.message)return void N(!1);"error"!==g.type&&N(!0)}}),[g]);var w=Z?{classes:{paper:f.customDialogSize}}:{maxWidth:"lg",fullWidth:!0},P="";return g&&(P=g.detailedErrorMsg,(""===g.detailedErrorMsg||g.detailedErrorMsg.length<5)&&(P=g.message)),(0,v.jsxs)(c.Z,(0,t.Z)((0,t.Z)({open:s,classes:f},w),{},{scroll:"paper",onClose:function(e,s){"backdropClick"!==s&&a()},className:f.root,children:[(0,v.jsxs)(d.Z,{className:f.title,children:[(0,v.jsxs)("div",{className:f.titleText,children:[b," ",o]}),(0,v.jsx)("div",{className:f.closeContainer,children:(0,v.jsx)(i.Z,{"aria-label":"close",id:"close",className:f.closeButton,onClick:a,disableRipple:!0,size:"small",children:(0,v.jsx)(x.Z,{})})})]}),(0,v.jsx)(h.Z,{isModal:!0}),(0,v.jsx)(r.Z,{open:S,className:f.snackBarModal,onClose:function(){N(!1),k("")},message:P,ContentProps:{className:"".concat(f.snackBar," ").concat(g&&"error"===g.type?f.errorSnackBar:"")},autoHideDuration:g&&"error"===g.type?1e4:5e3}),(0,v.jsx)(u.Z,{className:j?"":f.content,children:m})]}))})))},29823:function(e,a,s){var n=s(95318);a.Z=void 0;var t=n(s(45649)),l=s(80184),o=(0,t.default)((0,l.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");a.Z=o}}]);
//# sourceMappingURL=4619.c6ef5989.chunk.js.map