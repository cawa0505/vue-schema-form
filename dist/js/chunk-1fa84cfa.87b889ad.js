(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fa84cfa"],{"35d5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ae-layout",{staticClass:"demo-wrapper"},[a("ae-layout-content",[a("a-schema-form",{attrs:{inline:"",definition:e.optionFormDefinition},model:{value:e.options,callback:function(t){e.options=t},expression:"options"}}),a("a-schema-form",{staticClass:"demo-form",attrs:{definition:e.definition,disabled:e.options.disabled,loading:e.options.loading,props:e.props,readonly:e.options.readonly},on:{cancel:e.onCancel,ok:e.onOk,reset:e.onReset},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1)},i=[],r=a("d225"),l=a("b0b4"),o=a("308d"),s=a("6bb5"),p=a("4e2b"),u=a("9ab4"),d=a("ffb4"),c=a("a7ab"),b=a("2fe1"),y={radio:{type:"expand-select",enum:["1","2","3","4"],title:"Radio"},select:{type:"select",enum:["1","2","3","4"],title:"Select",required:!0},checkbox:{type:"expand-select",array:!0,enum:["1","2","3","4"],title:"Checkbox",required:!0},textarea:{type:"text",title:"TextArea"},number:{type:"number",title:"数字选择"},boolean:{type:"boolean",title:"开关选择"},date:{type:"date",title:"日期选择"},daterange:{type:"daterange",default:["2018-12-19","2018-12-19"],title:"日期范围"},time:{type:"time",title:"时间"},upload:{type:"upload",props:{listType:"card"},title:"卡片上传文件"},upload2:{type:"upload",props:{listType:"dragger"},title:"图片上传"},upload3:{type:"upload",props:{listType:"text"},title:"普通上传文件"},range:{type:"range",props:{min:0,max:1024,marks:{0:0,1024:1024},range:!0},title:"范围选择"},transfer:{type:"transfer",enum:[{value:1,label:"选项1"},{value:2,label:"选项2"}],title:"穿梭框"},rating:{type:"rate",title:"等级"}},f=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(o["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.year=[2019],e.fileList=[{uid:"-1",name:"image.png",status:"done",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}],e}return Object(p["a"])(t,e),Object(l["a"])(t,[{key:"created",value:function(){d["a"].registerAntd()}},{key:"definition",get:function(){return{fields:y}}}]),t}(c["a"]);f=u["b"]([Object(b["a"])({name:"DesktopEdit"})],f);var m=f,g=m,v=a("2877"),x=Object(v["a"])(g,n,i,!1,null,null,null);t["default"]=x.exports},a7ab:function(e,t,a){"use strict";var n=a("d225"),i=a("b0b4"),r=a("308d"),l=a("6bb5"),o=a("4e2b"),s=a("9ab4"),p=a("ab3c"),u=a("8bbf"),d=a.n(u),c=a("2fe1"),b=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(r["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.props=Object(p["b"])(),e.value=Object(p["c"])(),e.options={disabled:!1,loading:!1,readonly:!1},e.optionFormDefinition={fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"只读",type:"boolean",property:"readonly"}]},e}return Object(o["a"])(t,e),Object(i["a"])(t,[{key:"onOk",value:function(){var e=this.$createElement;this.$message.success(e("pre",[JSON.stringify(this.value.start)]))}},{key:"onReset",value:function(){this.$message.error("reset click")}},{key:"onCancel",value:function(){this.$message.warning("cancel clicked")}},{key:"definition",get:function(){return Object(p["a"])()}}]),t}(d.a);b=s["b"]([Object(c["a"])({name:"Base"})],b),t["a"]=b},ab3c:function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"c",function(){return l}),a.d(t,"a",function(){return s});var n=a("787b"),i=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],r=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},l=function(){return{string:"111",text:"abc",integer:122,double:"0.2",url:"http://www.aegis-info.com",datetime:new Date,date:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],month:null,year:null,values:{input:"sssssssss"}}},o={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",required:!0,type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},dateRange:{title:"日期范围",required:!0,type:"daterange",processor:{getValue:function(e,t){return[e&&e["start"],e&&e["end"]]},setValue:function(e,t,a){a?(e["start"]=a[0],e["end"]=a[1]):(e["start"]=null,e["end"]=null)}}},datetime:{title:"日期时间",required:!0,type:"datetime"},year:{title:"年份",required:!0,type:"year"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:i,clearable:!0}},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:i}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:i}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:i}},subForm:{title:"子表单",type:n["d"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:n["d"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},s=function(){return{fields:o}}}}]);
//# sourceMappingURL=chunk-1fa84cfa.87b889ad.js.map