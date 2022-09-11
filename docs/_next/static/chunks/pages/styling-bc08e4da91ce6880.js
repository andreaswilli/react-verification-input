(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{9724:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/styling",function(){return t(5310)}])},5310:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(7829),a=t.n(o),i=t(3805),c=t(7845),l=t(254),s=t.n(l),u=t(8289),f=t(5073),p=function(e){return(0,i.withSSG)(a()({filename:"styling.mdx",route:"/styling",meta:{title:"Styling"},pageMap:[{name:"API",route:"/API",frontMatter:{title:"API"}},{name:"index",route:"/",frontMatter:{title:"Demo"}},{name:"meta.json",meta:{index:"Demo",API:"API",styling:"Styling",migration:"Migration Guide"}},{name:"migration",children:[{name:"v2",route:"/migration/v2",frontMatter:{title:"Migrating to Version 2"}},{name:"v3",route:"/migration/v3",frontMatter:{title:"Migrating to Version 3"}}],route:"/migration"},{name:"styling",route:"/styling",frontMatter:{title:"Styling"}}]},c.Z))(e)};function h(e){var n=Object.assign({h1:"h1",h2:"h2",pre:"pre",code:"code"},e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{children:"Styling"}),"\n",(0,r.jsx)(f.Z,{markdown:u.Z,type:"h3",name:"Custom Styling",removeHeading:!0}),"\n",(0,r.jsx)(n.h2,{children:"Example"}),"\n",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s(),{length:5,classNames:{character:"character"}}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:".character {\n  border: none;\n  font-size: 20px;\n  border-radius: 8px;\n\n  /* light theme */\n  color: #272729;\n  background-color: #f6f5fa;\n  box-shadow: 0 2px 0 #e4e2f5;\n\n  /* dark theme */\n  color: #fff;\n  background-color: #222;\n  box-shadow: 0 2px 0 #444;\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.jsx)(p,Object.assign({},e,{children:(0,r.jsx)(h,e)}))}},254:function(e,n,t){(()=>{var n={184:(e,n)=>{var t;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t)){if(t.length){var i=o.apply(null,t);i&&e.push(i)}}else if("object"===a)if(t.toString===Object.prototype.toString)for(var c in t)r.call(t,c)&&t[c]&&e.push(c);else e.push(t.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(t=function(){return o}.apply(n,[]))||(e.exports=t)}()},28:(e,n,t)=>{"use strict";t.d(n,{Z:()=>c});var r=t(81),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([e.id,"/* :where() gives the styles specificity 0, which makes them overridable */\n:where(.vi__wrapper) {\n  position: relative;\n  width: min-content;\n}\n\n.vi {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  box-sizing: border-box;\n  position: absolute;\n  color: transparent;\n  background: transparent;\n  caret-color: transparent;\n  outline: none;\n  border: 0 none transparent;\n}\n\n.vi::selection {\n  background: transparent;\n}\n\n:where(.vi__container) {\n  display: flex;\n  gap: 8px;\n  height: 50px;\n  width: 300px;\n}\n\n:where(.vi__character) {\n  height: 100%;\n  flex-grow: 1;\n  flex-basis: 0;\n  text-align: center;\n  font-size: 36px;\n  line-height: 50px;\n  color: black;\n  background-color: white;\n  border: 1px solid black;\n  cursor: default;\n  user-select: none;\n  box-sizing: border-box;\n}\n\n:where(.vi__character--inactive) {\n  color: dimgray;\n  background-color: lightgray;\n}\n\n:where(.vi__character--selected) {\n  outline: 2px solid cornflowerblue;\n  color: cornflowerblue;\n}\n",""]);const c=i},645:e=>{"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);r&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},81:e=>{"use strict";e.exports=function(e){return e[1]}},703:(e,n,t)=>{"use strict";var r=t(414);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,n,t,o,a,i){if(i!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:a,resetWarningCache:o};return t.PropTypes=t,t}},697:(e,n,t)=>{e.exports=t(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var a=r[e]={id:e,exports:{}};return n[e](a,a.exports,o),a.exports}o.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return o.d(n,{a:n}),n},o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";o.r(a),o.d(a,{default:()=>b});const e=t(7294);var n=o.n(e),r=o(184),i=o.n(r),c=o(697),l=o.n(c),s=o(28),u=["className"],f=["className"];function p(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function h(){return h=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},h.apply(this,arguments)}function d(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function g(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a=[],i=!0,c=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(a.push(r.value),!n||a.length!==n);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==t.return||t.return()}finally{if(c)throw o}}return a}}(e,n)||v(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,n){if(e){if("string"==typeof e)return y(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?y(e,n):void 0}}function y(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var m=(0,e.forwardRef)((function(t,r){var o=t.value,a=t.length,c=t.validChars,l=t.placeholder,m=t.autoFocus,b=t.inputProps,x=t.containerProps,_=t.classNames,w=t.onChange,j=t.onFocus,S=t.onBlur,O=g((0,e.useState)(""),2),P=O[0],k=O[1],A=g((0,e.useState)(!1),2),E=A[0],N=A[1],I=(0,e.useRef)(null);(0,e.useEffect)((function(){m&&I.current.focus()}),[m]);var T,C=function(){I.current.focus()},M=function(){return null!=o?o:P},R=b.className,F=d(b,u),D=x.className,Z=d(x,f);return n().createElement("div",{className:"vi__wrapper"},n().createElement("input",h({spellCheck:!1,value:M(),onChange:function(e){var n=e.target.value.replace(/\s/g,"");RegExp("^[".concat(c,"]{0,").concat(a,"}$")).test(n)&&(w&&(null==w||w(n)),k(n))},ref:function(e){I.current=e,"function"==typeof r?r(e):r&&(r.current=e)},className:i()("vi",R),onKeyDown:function(e){["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)&&e.preventDefault()},onFocus:function(){N(!0),null==j||j()},onBlur:function(){N(!1),null==S||S()},onSelect:function(e){var n=e.target.value;e.target.setSelectionRange(n.length,n.length)}},F)),n().createElement("div",h({"data-testid":"container",className:i()("vi__container",_.container,D),onClick:function(){return I.current.focus()}},Z),(T=Array(a),function(e){if(Array.isArray(e))return y(e)}(T)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(T)||v(T)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e,t){var r;return n().createElement("div",{className:i()("vi__character",_.character,(r={"vi__character--selected":(M().length===t||M().length===t+1&&a===t+1)&&E},p(r,_.characterSelected,(M().length===t||M().length===t+1&&a===t+1)&&E),p(r,"vi__character--inactive",M().length<t),p(r,_.characterInactive,M().length<t),r)),onClick:C,id:"field-".concat(t),"data-testid":"character-".concat(t),key:t},M()[t]||l)}))),n().createElement("style",{dangerouslySetInnerHTML:{__html:s.Z}}))}));m.displayName="VerificationInput",m.propTypes={value:l().string,length:l().number,validChars:l().string,placeholder:l().string,autoFocus:l().bool,inputProps:l().object,containerProps:l().object,classNames:l().shape({container:l().string,character:l().string,characterInactive:l().string,characterSelected:l().string}),onChange:l().func,onFocus:l().func,onBlur:l().func},m.defaultProps={length:6,validChars:"A-Za-z0-9",placeholder:"\xb7",autoFocus:!1,inputProps:{},containerProps:{},classNames:{}};const b=m})(),e.exports=a})()}},function(e){e.O(0,[511,346,774,888,179],(function(){return n=9724,e(e.s=n);var n}));var n=e.O();_N_E=n}]);