(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0019"],{"65ae":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ae-layout",[a("ae-layout-content",[a("v-schema-form",{attrs:{effects:e.effects,schema:e.schema},on:{ok:e.showValue},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),a("show-value",{attrs:{value:e.value}})],1)],1)},l=[],o=a("d225"),s=a("b0b4"),c=a("308d"),u=a("6bb5"),i=a("4e2b"),r=a("9ab4"),p=a("8bbf"),b=a.n(p),f=a("2fe1"),m=a("98ce"),d=a("5c91"),v=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.schema={props:{inline:!0,labelPosition:"top"},fields:{$grid:{type:"grid",layout:[[6,6,6,6,6,6,6]],props:{gutter:58},fields:{callerName:{type:"string",title:"来电人",nativeEvents:{keydown:function(e,t){console.log(e),console.log(t)}}},phoneMark:{type:"select",title:"来电类型"},partyName:{type:"string",title:"当事人"},caseNumber:{type:"string",title:"案号"},"[startTime, endTime]":{type:"datetimerange",title:"来电时间",props:{"default-time":["00:00:00","23:59:59"]}},status:{type:"select",title:"当前状态",enum:[],props:{labelProperty:"name"}}}}}},e.value={},e}return Object(i["a"])(t,e),Object(s["a"])(t,[{key:"created",value:function(){m["a"].registerElement()}},{key:"effects",value:function(e){e("callerName").subscribe("onFieldKeydown",function(){})}},{key:"showValue",value:function(){console.log(this.value)}}]),t}(b.a);v=r["b"]([Object(f["b"])({name:"ElementDestruct",components:{ShowValue:d["a"]}})],v);var y=v,h=y,w=a("2877"),g=Object(w["a"])(h,n,l,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-2d0d0019.5b127bbf.js.map