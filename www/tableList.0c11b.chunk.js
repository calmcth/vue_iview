webpackJsonp([3],{60:function(e,t,n){var a=n(17)(n(76),n(77),null,null);e.exports=a.exports},76:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){var e=this;return{columns7:[{title:"Name",key:"name",render:function(e,t){return e("div",[e("Icon",{props:{type:"person"}}),e("strong",t.row.name)])}},{title:"Age",key:"age"},{title:"Address",key:"address"},{title:"Action",key:"action",width:150,align:"center",render:function(t,n){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.show(n.index)}}},"查看"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.remove(n.index)}}},"删除")])}}],data6:[{name:"John Brown",age:18,address:"New York No. 1 Lake Park"},{name:"Jim Green",age:24,address:"London No. 1 Lake Park"},{name:"Joe Black",age:30,address:"Sydney No. 1 Lake Park"},{name:"Jon Snow",age:26,address:"Ottawa No. 2 Lake Park"}]}},methods:{show:function(e){this.$Modal.info({title:"User Info",content:"Name："+this.data6[e].name+"<br>Age："+this.data6[e].age+"<br>Address："+this.data6[e].address})},remove:function(e){this.data6.splice(e,1)}}}},77:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("Table",{attrs:{border:"",columns:e.columns7,data:e.data6}})},staticRenderFns:[]}}});