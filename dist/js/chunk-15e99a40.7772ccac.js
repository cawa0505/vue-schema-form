(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15e99a40"],{"258b":function(e){e.exports=JSON.parse('{"array":true,"arrayComponent":"block","fields":{"basic":{"type":"object","layoutType":"card","layoutProps":{"title":"基本信息"},"props":{"inline":true},"fields":{"bb":{"type":"select","props":{"style":{"maxWidth":300}},"enum":["a","b","c","d","e"],"title":"BB"},"cc":{"type":"select","props":{"style":{"maxWidth":300}},"required":true,"enum":[],"title":"CC"},"gg":{"type":"string","props":{"style":{"width":200}},"title":"GG"}}},"dd":{"type":"object","array":true,"arrayComponent":"block","arrayProps":{"addText":"添加一项","removeText":"删除"},"layoutType":"card","layoutProps":{"title":"嵌套Array"},"props":{"inline":true},"fields":{"ee":{"type":"select","props":{"style":{"maxWidth":300}},"wrapperProps":{"extra":"是否隐藏GG"},"enum":["是","否"],"title":"EE"},"ff":{"type":"select","props":{"style":{"maxWidth":300}},"wrapperProps":{"extra":"是否隐藏EE"},"default":"是","enum":["是","否"],"title":"FF"}}}}}')},4146:function(e){e.exports=JSON.parse('{"fields":{"$card1":{"type":"card","props":{"title":"Block1"},"fields":{"f1":{"type":"object","fields":{"aa":{"type":"expand-select","default":true,"enum":[{"label":"是","value":true},{"label":"否","value":false}],"title":"是否隐藏AA"},"bb":{"type":"string","title":"AA"},"cc":{"type":"expand-select","default":true,"enum":[{"label":"是","value":true},{"label":"否","value":false}],"title":"是否隐藏Block2"}}}}},"$card2":{"type":"card","props":{"title":"Block2"},"fields":{"dd":{"type":"object","fields":{"ee":{"type":"date","title":"EE"},"ff":{"type":"number","title":"FF","required":true}}}}},"$card3":{"type":"card","props":{"title":"Block3"},"fields":{"kk":{"type":"object","fields":{"gg":{"type":"string","props":{"showSearch":true,"filterLocal":false},"title":"GG"},"hh":{"type":"string","title":"HH"},"mm":{"type":"string","title":"MM"}}}}}}}')},a40e:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ae-layout",{staticClass:"demo-wrapper"},[a("ae-layout-content",[a("v-schema-form",{staticClass:"demo-form",attrs:{actions:e.actions,effects:e.effects,props:e.props,schema:e.definition},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),a("v-schema-form",{staticStyle:{width:"800px"},attrs:{title:"Block1",actions:e.actions,effects:e.effects2,schema:e.schema2},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1)],1)},i=[],n=a("d225"),l=a("b0b4"),s=a("308d"),o=a("6bb5"),c=a("4e2b"),p=a("9ab4"),u=a("ffb4"),d=a("e7ae"),f=a("ab3c"),b=a("8bbf"),y=a.n(b),m=a("2fe1"),h=a("4146"),g=a("258b");y.a.component("FormBlock",d["a"]),u["a"].registerAntd();var v=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments)),e.definition=h,e.props=Object(f["b"])(),e.schema2=g,e.value={f1:{aa:!0,cc:!0}},e.value2=[{basic:{bb:"a",gg:"fffff"},dd:[{ee:"是",ff:"是"}]},{basic:{bb:"c",cc:"1",gg:"1111"},dd:[{ee:"否",ff:"是"}]}],e}return Object(c["a"])(t,e),Object(l["a"])(t,[{key:"created",value:function(){u["a"].registerAntd()}},{key:"effects",value:function(e){e("f1.aa").onFieldCreateOrChange(function(t){t?e("f1.bb").hide():e("f1.bb").show()}),e("f1.cc").onFieldCreateOrChange(function(t){t?e("$card2").hide():e("$card2").show()})}},{key:"effects2",value:function(e){var t=function(t,a){var r=a.substr(0,a.indexOf("."))+".basic.cc";"a"===t?(e(r).setFieldProps({loading:!0}),setTimeout(function(){e(r).setEnum(["1"]),e(r).setFieldProps({loading:!1})},1e3)):"b"===t&&(e(r).setFieldProps({loading:!0}),setTimeout(function(){e(r).setEnum(["1","2"]),e(r).setFieldProps({loading:!1})},1e3))};e("?.basic.bb").onFieldCreateOrChange(t);var a=function(t,a){"是"===t?e(a).takePath(1).appendPath("basic.gg").hide():"否"===t&&e(a).takePath(1).appendPath("basic.gg").show()};e("?.dd.?.ee").onFieldCreateOrChange(a),e("?.dd.?.ff").onFieldCreateOrChange(function(t,a){"是"===t?e(a).takePath(3).appendPath("ee").hide():"否"===t&&e(a).takePath(3).appendPath("ee").show()}),e("?.basic.cc").setEnum([{label:"1111",value:"1111"},{label:"2222",value:"2222"}])}},{key:"actions",get:function(){var e=this;return[{text:"提交",props:{type:"primary"},action:function(e){console.log(e)}},{text:"重置",action:function(){}},{text:"切换MM",action:function(e){e("kk.mm").toggle()}},{text:"校验",action:function(t){t.validate(function(t){e.$message.error(t)})}}]}}]),t}(y.a);v=p["b"]([Object(m["b"])({name:"DesktopEdit"})],v);var x=v,k=x,w=a("2877"),P=Object(w["a"])(k,r,i,!1,null,null,null);t["default"]=P.exports},ab3c:function(e,t,a){"use strict";a.d(t,"b",function(){return n}),a.d(t,"c",function(){return l}),a.d(t,"a",function(){return o});var r=a("8588"),i=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],n=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},l=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:new Date,month:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},s={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},dateRange:{title:"日期范围",required:!0,type:"daterange",processor:{getValue:function(e,t){return[e&&e["start"],e&&e["end"]]},setValue:function(e,t,a){a?(e["start"]=a[0],e["end"]=a[1]):(e["start"]=null,e["end"]=null)}}},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:i,clearable:!0}},image:{title:"图片",type:"picture"},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:i}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:i}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:i}},subForm:{title:"子表单",type:r["g"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:r["g"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},o=function(){return{props:{section:!0,spaceBetweenSection:16},fields:s}}}}]);
//# sourceMappingURL=chunk-15e99a40.7772ccac.js.map