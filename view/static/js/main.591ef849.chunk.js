(this["webpackJsonpdynamic-form"]=this["webpackJsonpdynamic-form"]||[]).push([[0],{237:function(e,t,n){e.exports={header_right:"UserFn_header_right__10BqY",username:"UserFn_username__3vBQF",user_dropdown:"UserFn_user_dropdown__3M1F9"}},413:function(e,t,n){},678:function(e,t,n){},679:function(e,t,n){},798:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),r=n.n(c),i=n(46),s=n.n(i),l=(n(413),n(280),n(423),n(463),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,821)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))}),d=n(52),o=n(36),j=n(13),b=n(181),u=n(808),O=n(402),h=n(63),f=n(820),m=n(804),x=n(801),p=n(802),g=n(809),v=n(810),y=n(807),k="http://localhost:4000",I=function(e){var t="";if(e&&e instanceof Object){var n=Object.keys(e);n&&n.length&&n.forEach((function(a,c){t+="".concat(a,"=").concat(e[a]),c+1<n.length&&(t+="&")}))}return t},S=n(373),w=n.n(S);n(401);function C(){var e=window.location.href,t=!1;if(e.indexOf("?")>=0){var n=e.split("?");if(n[1].indexOf("&")>=0)n[1].split("&").forEach((function(e){var n=e.split("=");"lan"===n[0]&&"en"===n[1]&&(t=!0)}));else if(n[1]){var a=n[1].split("=");"lan"===a[0]&&"en"===a[1]&&(t=!0)}}return t}function F(e,t){return function(e,t){var n,a=Object(o.a)(Object(o.a)({},{credentials:"include"}),t);return C()&&(a.data.lan="en"),"POST"===a.method||"PUT"===a.method||"DELETE"===a.method?("application/json"===a.contentType?(a.headers=Object(o.a)({Accept:"text/html","Content-Type":"application/json"},a.headers),a.data=JSON.stringify(a.data)):"formData"===a.contentType?a.headers=Object(o.a)({Accept:"application/json"},a.headers):(a.headers=Object(o.a)({Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},a.headers),a.data&&(a.data=I(a.data))),n=e):"GET"===a.method&&(n=e+"?"+I(a.data),delete a.data),Object(o.a)({url:n,data:a.data},a),w()(n,a)}(e,t=t||{}).then((function(e){if(200===e.status)return e.data||{};var t=new Error;throw t.code=e.code,t.message=e.message||"Failed to get data code : ".concat(t.code),t})).catch((function(e,t){var n=e.code;401!==n?403!==n||C():window.g_app._store.dispatch({type:"login/logout"})}))}F.get=function(e,t,n){return(n=n||{}).data=t||{},n.method="GET",F(e,n)},F.post=function(e,t,n){return(n=n||{}).data=t||{},n.method="POST",F(e,n)},F.put=function(e,t,n){return(n=n||{}).data=t||{},n.method="PUT",F(e,n)},F.delete=function(e,t,n){return(n=n||{}).data=t||{},n.method="DELETE",F(e,n)};var _=F,N=n(806),E=n(135),T=(n(678),n(679),n(815)),q=n(230),z=n(803),R=(n(128),n(811)),B=(b.a.Option,b.a.Option,n(233)),J=n(96),P=n(182),D=n(229),L=n(180),U=n(814),K=n(813),A=n(805),V=n(225),G=n.n(V),M=n(816),H=n(818),Q=(b.a.Option,Object(L.b)(D.a),n(231)),Y=n(812),$=n(819),W=n(237),X=n.n(W),Z=function(){var e=Object(c.useState)({name:""}),t=Object(j.a)(e,2),n=t[0],r=t[1];Object(c.useEffect)((function(){_.get(k+"/user",{id:1}).then((function(e){e&&r(e.data)}))}),[]);var i=Object(a.jsxs)(E.a,{onClick:function(){},children:[Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)($.a,{}),children:"1st menu item"},"1"),Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)($.a,{}),children:"2nd menu item"},"2"),Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)($.a,{}),children:"3rd menu item"},"3")]});return Object(a.jsx)("div",{className:X.a.header_right,children:Object(a.jsx)(Q.a,{overlay:i,className:X.a.user_dropdown,placement:"bottomCenter",children:Object(a.jsxs)("div",{children:[Object(a.jsx)(Y.a,{icon:Object(a.jsx)($.a,{})}),Object(a.jsx)("span",{className:X.a.username,children:n.name})]})})})},ee=n(94),te=n(817),ne=N.a.Header,ae=N.a.Content,ce=N.a.Footer;var re=function(e){var t=e.children,n=Object(c.useState)(["1"]),r=Object(j.a)(n,2),i=r[0];r[1];return Object(a.jsxs)(N.a,{className:"home_page",children:[Object(a.jsx)(ne,{className:"header",children:Object(a.jsxs)(x.a,{children:[Object(a.jsxs)(p.a,{flex:4,style:{display:"flex"},children:[Object(a.jsx)("div",{className:"logo",children:"\u51b6\u63a7\u586b\u62a5\u5e73\u53f0"}),Object(a.jsxs)(E.a,{theme:"dark",mode:"horizontal",onClick:function(e){e.keyPath},selectedKeys:i,defaultSelectedKeys:["1"],children:[Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)(te.a,{}),children:Object(a.jsx)(ee.b,{to:"/",children:"\u5217\u8868\u9875"})},"1"),Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)($.a,{}),children:Object(a.jsx)(ee.b,{to:"/allocation",children:"\u914d\u7f6e\u9875"})},"2"),Object(a.jsx)(E.a.Item,{icon:Object(a.jsx)($.a,{}),children:Object(a.jsx)(ee.b,{to:"/view",children:"\u586b\u62a5\u9875"})},"3")]})]}),Object(a.jsx)(p.a,{flex:1,children:Object(a.jsx)(Z,{})})]})}),Object(a.jsx)(ae,{className:"site-layout-background",style:{margin:"24px 16px",padding:24,minHeight:280},children:t}),Object(a.jsx)(ce,{style:{textAlign:"center"},children:" \xa92020 Created by MG"})]})},ie=b.a.Option,se=function(e){var t=Object(d.f)(),n=u.a.useForm(),i=Object(j.a)(n,1)[0],s=Object(c.useState)([]),l=Object(j.a)(s,2),I=l[0],S=l[1],w=Object(c.useState)([]),C=Object(j.a)(w,2),F=C[0],N=C[1],E=Object(c.useState)(!1),T=Object(j.a)(E,2),q=T[0],z=T[1],R=Object(c.useState)(!1),B=Object(j.a)(R,2),J=B[0],P=B[1],D=Object(c.useState)({page:1,pageSize:10}),L=Object(j.a)(D,2),U=L[0];L[1];Object(c.useEffect)((function(){_.get(k+"/business",{}).then((function(e){e&&S(e.data)}))}),[]),Object(c.useEffect)((function(){K(U)}),[U]);var K=function(e){_.get(k+"/getFormList",e).then((function(e){e&&0===e.code&&N(e.data)}))},A=[{title:"\u8868\u5355\u540d",dataIndex:"name",key:"name",render:function(e,t){return Object(a.jsx)(h.a,{size:"small",onClick:function(){return e=t,console.log(e),void z(!0);var e},type:"link",children:e})}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"created_date",key:"created_date"},{title:"\u6240\u5c5e\u4e1a\u52a1",key:"remark",render:function(e,t){if(I.length){var n=I.filter((function(e){return e.id===t.fid}));if(n.length)return n[0].name}}},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u64cd\u4f5c",key:"action",render:function(e,n){return Object(a.jsxs)(f.b,{size:"middle",children:[Object(a.jsx)("a",{onClick:function(){return function(e){t.push("/allocation?formId="+e.id)}(n)},children:"\u914d\u7f6e"}),Object(a.jsx)("a",{onClick:function(){return function(e){t.push("/view?formId="+e.id)}(n)},children:"\u586b\u62a5"}),Object(a.jsx)(m.a,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:function(){return function(e){var t=JSON.parse(JSON.stringify(U));_.post(k+"/delForm",{id:e.id}).then((function(e){0===e.code&&(O.b.info("\u5220\u9664\u6210\u529f\uff01"),K(t))}))}(n)},okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",children:Object(a.jsx)("a",{children:"\u5220\u9664"})})]})}}],V=function(){i.submit()},G=function(){z(!1)},M=function(e){P(!0),_.post(k+"/addForm",e).then((function(e){0===e.code&&(O.b.info("\u65b0\u589e\u6210\u529f\uff01"),i.resetFields(),P(!1),z(!1),K(U))}))};return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsxs)(re,{children:[Object(a.jsx)("div",{style:{background:"#fff",padding:15,marginBottom:20},children:Object(a.jsxs)(u.a,{form:i,name:"advanced_search",className:"ant-advanced-search-form",onFinish:M,children:[Object(a.jsx)(x.a,{gutter:24,children:Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:"\u6309\u4e1a\u52a1",children:Object(a.jsx)(b.a,{style:{width:120,marginBottom:12},onChange:function(e){var t=JSON.parse(JSON.stringify(U));t.id=e,_.get(k+"/getFormList",t).then((function(e){e&&0===e.code&&N(e.data)}))},placeholder:"\u8bf7\u9009\u62e9\u4e1a\u52a1",children:I.map((function(e){return Object(a.jsx)(ie,{value:e.key,children:e.name},e.id)}))})})})}),Object(a.jsx)(x.a,{children:Object(a.jsxs)(p.a,{span:24,style:{textAlign:"right"},children:[Object(a.jsx)(h.a,{type:"primary",htmlType:"submit",children:"Search"}),Object(a.jsx)(h.a,{style:{margin:"0 8px"},onClick:function(){},children:"Clear"})]})})]})}),Object(a.jsxs)("div",{style:{padding:15,background:"#fff"},children:[Object(a.jsx)(h.a,{style:{marginBottom:12},onClick:function(){z(!0)},type:"primary",children:"\u65b0\u5efa"}),Object(a.jsx)(g.a,{title:"\u65b0\u589e\u8868\u5355",visible:q,onOk:V,onCancel:G,footer:[Object(a.jsx)(h.a,{onClick:G,children:"\u53d6\u6d88"},"back"),Object(a.jsx)(h.a,{type:"primary",loading:J,onClick:V,children:"\u65b0\u589e"},"submit")],children:Object(a.jsxs)(u.a,Object(o.a)(Object(o.a)({name:"validate_other"},{labelCol:{span:6},wrapperCol:{span:18}}),{},{onFinish:M,form:i,children:[Object(a.jsx)(u.a.Item,{label:"\u6240\u5c5e\u4e1a\u52a1",name:"business",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6240\u5c5e\u4e1a\u52a1!"}],children:Object(a.jsx)(b.a,{onChange:function(){},placeholder:"\u8bf7\u9009\u62e9\u4e1a\u52a1",children:I.map((function(e){return Object(a.jsx)(ie,{value:e.key,children:e.name},e.id)}))})}),Object(a.jsx)(u.a.Item,{label:"\u8868\u5355\u540d",name:"name",rules:[{required:!0}],children:Object(a.jsx)(v.a,{placeholder:"\u8bf7\u8f93\u5165\u8868\u5355\u540d"})})]}))}),Object(a.jsx)(y.a,{rowKey:function(e){return e.id},columns:A,dataSource:F,size:"small",bordered:!0})]})]})})},le=b.a.Option,de=function(){var e=Object(d.g)(),t=Object(c.useState)([]),n=Object(j.a)(t,2),r=n[0],i=n[1],s=Object(c.useState)([]),l=Object(j.a)(s,2),f=l[0],m=l[1],g=Object(c.useState)({name:""}),I=Object(j.a)(g,2),S=I[0],w=I[1],C=Object(c.useState)(!1),F=Object(j.a)(C,2),N=F[0],E=F[1],B=Object(c.useState)(""),J=Object(j.a)(B,2),P=J[0],D=J[1],L=Object(c.useState)({page:1,pageSize:30}),U=Object(j.a)(L,2),K=U[0];U[1];Object(c.useEffect)((function(){var t=new URLSearchParams(e.search).get("formId"),n=JSON.parse(JSON.stringify(K));t&&(n.formId=t,D(t)),P&&(new Promise((function(e,t){_.get(k+"/lists",n).then((function(t){t&&(i(t.data),e())}))})).then((function(){_.get(k+"/getFormData",{id:P}).then((function(e){var t=[],n=[];if(e){for(var a=0;a<e.data.length;a++){var c=e.data[a].row_id;-1===t.indexOf(c)&&t.push(c);var r=t.indexOf(c);r>=0&&(n[r]=n[r]||{rowId:c},n[r][e.data[a].field_name]=e.data[a].value)}m(n)}}))})),_.get(k+"/getFormInfo",{id:P}).then((function(e){e&&w(e.data)})))}),[P,K,N]);var A=r.map((function(e){return{title:e.name,dataIndex:e.field,key:e.id}})).concat({title:"\u64cd\u4f5c",key:"action",render:function(e,t){return Object(a.jsx)("a",{onClick:function(){return e=t,void _.post(k+"/delData",{id:e.rowId}).then((function(e){e&&0===e.code&&(O.b.info("\u5220\u9664\u6210\u529f\uff01"),E(!N))}));var e},children:"\u5220\u9664"})}});return Object(a.jsxs)(re,{children:[Object(a.jsx)("div",{style:{background:"#fff",padding:"12px 15px",marginBottom:20},children:Object(a.jsxs)(u.a,Object(o.a)(Object(o.a)({name:"validate_other"},{labelCol:{span:6},wrapperCol:{span:18}}),{},{onFinish:function(e){e.formId=P,e.uuid=Object(R.a)(),_.post(k+"/save",e).then((function(e){e&&0===e.code&&(O.b.info("\u4fdd\u5b58\u6210\u529f\uff01"),E(!N))}))},children:[Object(a.jsx)(x.a,{gutter:24,children:r.map((function(e){var t=[];e.options&&(t=e.options.split("/"));var n=[];return"1"===e.isRequired&&n.push({required:!0,message:e.placeholder}),"1"===e.code?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{initialValue:e.default_value,name:e.field,rules:n,label:e.name,children:Object(a.jsx)(v.a,{placeholder:e.placeholder})})},e.id):"2"===e.code?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{name:e.field,label:e.name,hasFeedback:!0,initialValue:e.default_value,rules:n,children:Object(a.jsx)(b.a,{placeholder:e.placeholder,children:t.map((function(e,t){return Object(a.jsx)(le,{value:t,children:e},t)}))})})},e.id):"3"===e.code?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:e.name,children:Object(a.jsx)(u.a.Item,{name:e.field,rules:n,initialValue:e.default_value,noStyle:!0,children:Object(a.jsx)(T.a,{style:{width:"100%"},placeholder:e.placeholder,min:0})})})},e.id):"4"===e.code?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{name:e.field,initialValue:e.default_value,rules:n,label:e.name,children:Object(a.jsx)(q.a.Group,{children:t.map((function(e,t){return Object(a.jsx)(q.a,{value:t,children:e},t)}))})})},e.id):"5"===e.code?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:e.name,children:Object(a.jsx)("span",{className:"ant-form-text",children:"\u7eaf\u6587\u672c"})})},e.id):null}))}),Object(a.jsx)(x.a,{children:Object(a.jsx)(p.a,{span:24,children:Object(a.jsx)(h.a,{type:"primary",style:{float:"right"},htmlType:"submit",children:"\u63d0\u4ea4"})})})]}))}),Object(a.jsxs)("div",{style:{background:"#fff",padding:"12px 15px"},children:[Object(a.jsx)(z.a,{style:{marginBottom:30,fontSize:20},children:S.name}),Object(a.jsx)(y.a,{rowKey:function(e){return e.rowId},columns:A,dataSource:f,size:"small",bordered:!0})]})]})},oe=b.a.Option,je=Object(L.b)(D.a),be="DragableBodyRow",ue=function(e){var t=Object(d.g)(),n=u.a.useForm(),i=Object(j.a)(n,1)[0],s=Object(c.useState)([]),l=Object(j.a)(s,2),m=l[0],g=l[1],I=Object(c.useState)({page:1,pageSize:30}),S=Object(j.a)(I,2),w=S[0],C=(S[1],Object(c.useState)(!1)),F=Object(j.a)(C,2),N=F[0],E=F[1],T=Object(c.useState)([]),q=Object(j.a)(T,2),R=(q[0],q[1]),D=Object(c.useState)(""),L=Object(j.a)(D,2),V=L[0],Q=L[1],Y=Object(c.useState)(""),$=Object(j.a)(Y,2),W=$[0],X=($[1],Object(c.useState)("")),Z=Object(j.a)(X,2),ee=Z[0],te=(Z[1],Object(c.useState)("")),ne=Object(j.a)(te,2),ae=ne[0],ce=(ne[1],Object(c.useState)("")),ie=Object(j.a)(ce,2),se=ie[0],le=ie[1];Object(c.useEffect)((function(){var e=new URLSearchParams(t.search).get("formId"),n=JSON.parse(JSON.stringify(w));e&&(n.formId=e,le(e)),_.get(k+"/lists",n).then((function(e){e&&g(e.data)}))}),[w,N]),Object(c.useEffect)((function(){_.get(k+"/business",{}).then((function(e){e&&R(e.data)}))}),[]);var de=[{title:"\u5e8f\u53f7",dataIndex:"sort",key:"sort",render:function(e){return e+1}},{title:"\u63a7\u4ef6\u540d",dataIndex:"name",key:"name",render:function(e){return Object(a.jsx)(h.a,{size:"small",type:"link",children:e})}},{title:"\u63a7\u4ef6\u7c7b\u578b",dataIndex:"code",key:"code"},{title:"\u662f\u5426\u5fc5\u586b",dataIndex:"isRequired",key:"isRequired",render:function(e){return"1"===e?"\u662f":"\u5426"}},{title:"\u63d0\u793a\u5360\u4f4d\u7b26",dataIndex:"placeholder",key:"placeholder"},{title:"\u64cd\u4f5c",key:"action",render:function(e,t){return Object(a.jsx)(f.b,{size:"middle",children:Object(a.jsx)(J.a,{title:"\u5220\u9664",children:Object(a.jsx)(h.a,{danger:!0,onClick:function(){return ue(t)},shape:"circle",size:"small",icon:Object(a.jsx)(M.a,{})})})})}}],ue=function(e){_.get(k+"/delete",{id:e.id}).then((function(e){0===e.code&&(O.b.info("\u5220\u9664\u6210\u529f\uff01"),E(!N))}))},Oe={body:{row:function(e){return function(e){var t=e.index,n=e.moveRow,c=e.className,i=e.style,s=Object(B.a)(e,["index","moveRow","className","style"]),l=r.a.useRef(),d=Object(U.a)({accept:be,collect:function(e){var n=(e.getItem()||{}).index;return n===t?{}:{isOver:e.isOver(),dropClassName:n<t?" drop-over-downward":" drop-over-upward"}},drop:function(e){n(e.index,t)}}),b=Object(j.a)(d,2),u=b[0],O=u.isOver,h=u.dropClassName,f=b[1],m=Object(K.a)({item:{type:be,index:t},collect:function(e){return{isDragging:e.isDragging()}}});return f((0,Object(j.a)(m,2)[1])(l)),Object(a.jsx)("tr",Object(o.a)({ref:l,className:"".concat(c).concat(O?h:""),style:Object(o.a)({cursor:"move"},i)},s))}(e)}}},he=Object(c.useCallback)((function(e,t){var n=m[e],a=m[e],c=m[t],r={originId:a.id,originSort:a.sort,targetId:c.id,targetSort:c.sort};_.post(k+"/sort",r).then((function(a){0===a.code&&(O.b.info("OK\uff01"),E(!N),g(G()(m,{$splice:[[e,1],[t,0,n]]})))}))}),[m,N]),fe=Object(c.useRef)(je);return Object(a.jsxs)(re,{children:[Object(a.jsxs)("div",{style:{background:"#fff",padding:15,marginBottom:20},children:[Object(a.jsx)(z.a,{orientation:"left",children:"\u63a7\u4ef6\u5c5e\u6027"}),Object(a.jsxs)(u.a,Object(o.a)(Object(o.a)({name:"validate_other"},{labelCol:{span:6},wrapperCol:{span:18}}),{},{onFinish:function(e){console.log("Received values of form: ",e);var t={};Object.keys(e).forEach((function(n){e[n]&&(t[n]=e[n]),e.required&&(t.required="1")})),t.sort=m.length,t.formId=se,_.post(k+"/add",t).then((function(e){0===e.code&&(O.b.info("\u6dfb\u52a0\u6210\u529f\uff01"),i.resetFields(),E(!N))}))},form:i,children:[Object(a.jsxs)(x.a,{children:[Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:"\u5b57\u6bb5\u6807\u7b7e",children:Object(a.jsx)(u.a.Item,{name:"name",noStyle:!0,children:Object(a.jsx)(v.a,{value:W,placeholder:"\u8bf7\u8f93\u5165\u5b57\u6bb5\u6807\u7b7e"})})})}),Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{name:"field",label:"\u5b57\u6bb5",hasFeedback:!0,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5b57\u6bb5"}],children:Object(a.jsx)(v.a,{placeholder:"\u8bf7\u8f93\u5165\u5b57\u6bb5"})})}),Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:"\u5360\u4f4d\u63d0\u793a",children:Object(a.jsx)(u.a.Item,{name:"placeholder",noStyle:!0,children:Object(a.jsx)(v.a,{value:ee,placeholder:"\u8bf7\u8f93\u5165\u5360\u4f4d\u63d0\u793a"})})})}),Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:"\u9ed8\u8ba4\u503c",children:Object(a.jsx)(u.a.Item,{name:"defaultValue",noStyle:!0,children:Object(a.jsx)(v.a,{value:ae,placeholder:"\u8bf7\u8f93\u5165\u9ed8\u8ba4\u503c"})})})}),Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{name:"select",label:"\u8868\u5355\u63a7\u4ef6",hasFeedback:!0,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u63a7\u4ef6\u7c7b\u578b!"}],children:Object(a.jsxs)(b.a,{onChange:function(e,t){Q(e)},placeholder:"\u8bf7\u9009\u62e9\u63a7\u4ef6\u7c7b\u578b",children:[Object(a.jsx)(oe,{value:"3",children:"\u6570\u5b57"}),Object(a.jsx)(oe,{value:"1",children:"\u6587\u672c"}),Object(a.jsx)(oe,{value:"2",children:"\u4e0b\u62c9\u9009\u62e9"}),Object(a.jsx)(oe,{value:"4",children:"\u5355\u9009\u6309\u94ae"}),Object(a.jsx)(oe,{value:"5",children:"\u7eaf\u6587\u672c"})]})})}),["2","4"].includes(V)?Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,{label:"\u63a7\u4ef6\u9009\u9879",children:Object(a.jsx)(u.a.Item,{name:"options",noStyle:!0,hasFeedback:!0,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9009\u9879"}],children:Object(a.jsx)(v.a,{placeholder:"\u8f93\u5165\u9009\u9879\u5e76\u7528'/'\u9694\u5f00"})})})}):null,Object(a.jsx)(p.a,{span:8,children:Object(a.jsx)(u.a.Item,Object(o.a)(Object(o.a)({},{wrapperCol:{xs:{span:6,offset:0},sm:{span:6,offset:2}}}),{},{name:"required",valuePropName:"checked",children:Object(a.jsx)(P.a,{children:"\u662f\u5426\u5fc5\u586b"})}))})]}),Object(a.jsx)(u.a.Item,{children:Object(a.jsx)(h.a,{type:"primary",icon:Object(a.jsx)(H.a,{}),htmlType:"submit",children:"\u65b0\u589e"})})]}))]}),Object(a.jsx)("div",{style:{background:"#fff",padding:15},children:Object(a.jsx)(A.a,{manager:fe.current.dragDropManager,children:Object(a.jsx)(y.a,{rowKey:function(e){return e.id},columns:de,dataSource:m,size:"small",bordered:!0,components:Oe,onRow:function(e,t){return{index:t,moveRow:he}}})})})]})};function Oe(){return Object(a.jsxs)(d.c,{children:[Object(a.jsx)(d.a,{exact:!0,path:"/",children:Object(a.jsx)(se,{})}),Object(a.jsx)(d.a,{exact:!0,path:"/view",children:Object(a.jsx)(de,{})}),Object(a.jsx)(d.a,{exact:!0,path:"/allocation",children:Object(a.jsx)(ue,{})})]})}s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(ee.a,{children:Object(a.jsx)(Oe,{})})}),document.getElementById("root")),l()}},[[798,1,2]]]);
//# sourceMappingURL=main.591ef849.chunk.js.map