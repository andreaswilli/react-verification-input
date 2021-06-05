module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){e.exports=n(4)()},function(e,t){e.exports=require("react")},function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var i=a.apply(null,r);i&&e.push(i)}else if("object"===o)for(var c in r)n.call(r,c)&&r[c]&&e.push(c)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},function(e,t){e.exports=".verification-input__wrapper {\n  position: relative; }\n\n.verification-input {\n  height: 100%;\n  box-sizing: border-box;\n  position: absolute;\n  left: -2000px;\n  opacity: 0;\n  transform: scale(0); }\n\n.verification-input--debug {\n  left: 0;\n  bottom: -70px;\n  opacity: 1;\n  transform: scale(1); }\n\n.verification-input__container {\n  display: flex; }\n\n.verification-input__container--default {\n  height: 50px;\n  width: 300px; }\n\n.verification-input__character {\n  height: 100%;\n  flex-grow: 1;\n  flex-basis: 0;\n  text-align: center; }\n\n.verification-input__character--default {\n  font-size: 36px;\n  line-height: 50px;\n  color: black;\n  background-color: white;\n  margin-left: 8px;\n  border: 1px solid black;\n  cursor: default;\n  user-select: none;\n  box-sizing: border-box; }\n  .verification-input__character--default:first-child {\n    margin-left: 0; }\n\n.verification-input__character--inactive--default {\n  color: dimgray;\n  background-color: lightgray; }\n\n.verification-input__character--selected--default {\n  outline: 2px solid cornflowerblue;\n  color: cornflowerblue; }\n"},function(e,t,n){"use strict";var r=n(5);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,i){if(i!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(2),i=n.n(o),c=n(0),u=n.n(c),l={BACKSPACE:8,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},f=n(3),s=n.n(f);function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||v(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||v(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var m=Object(r.forwardRef)((function(e,t){var n=e.value,o=e.length,c=e.validChars,u=e.placeholder,f=e.autoFocus,v=e.removeDefaultStyles,b=e.debug,m=e.inputProps,_=e.classNames,O=e.onChange,x=e.onFocus,S=e.onBlur,j=g(e,["value","length","validChars","placeholder","autoFocus","removeDefaultStyles","debug","inputProps","classNames","onChange","onFocus","onBlur"]),R=h(Object(r.useState)(""),2),A=R[0],P=R[1],w=h(Object(r.useState)(!1),2),E=w[0],T=w[1],C=Object(r.useRef)(null);Object(r.useEffect)((function(){f&&C.current.focus()}),[f]);var I=function(){C.current.focus()},k=function(){return null!=n?n:A};return a.a.createElement("div",{className:"verification-input__wrapper"},a.a.createElement("input",y({value:k(),onChange:function(e){var t=e.target.value.replace(/\s/g,"");RegExp("^[".concat(c,"]{0,").concat(o,"}$")).test(t)&&(O?null==O||O(t):P(t))},ref:function(e){C.current=e,"function"==typeof t?t(e):t&&(t.current=e)},className:i()("verification-input",{"verification-input--debug":b}),onKeyDown:function(e){[l.ARROW_LEFT,l.ARROW_RIGHT,l.ARROW_UP,l.ARROW_DOWN].includes(e.keyCode)&&e.preventDefault()},onFocus:function(e){T(!0);var t=e.target.value;e.target.setSelectionRange(t.length,t.length),null==x||x()},onBlur:function(){T(!1),null==S||S()}},m)),a.a.createElement("div",y({"data-testid":"container",className:i()("verification-input__container",_.container,{"verification-input__container--default":!v}),onClick:function(){return C.current.focus()}},j),d(Array(o)).map((function(e,t){var n;return a.a.createElement("div",{className:i()("verification-input__character",_.character,(n={"verification-input__character--default":!v,"verification-input__character--selected--default":!v&&(k().length===t||k().length===t+1&&o===t+1)&&E},p(n,_.characterSelected,(k().length===t||k().length===t+1&&o===t+1)&&E),p(n,"verification-input__character--inactive--default",!v&&k().length<t),p(n,_.characterInactive,k().length<t),n)),onClick:I,id:"field-".concat(t),"data-testid":"character-".concat(t),key:t},k()[t]||u)}))),a.a.createElement("style",{dangerouslySetInnerHTML:{__html:s.a}}))}));m.displayName="VerificationInput",m.propTypes={value:u.a.string,length:u.a.number,validChars:u.a.string,placeholder:u.a.string,autoFocus:u.a.bool,removeDefaultStyles:u.a.bool,debug:u.a.bool,inputProps:u.a.object,classNames:u.a.shape({container:u.a.string,character:u.a.string,characterInactive:u.a.string,characterSelected:u.a.string}),onChange:u.a.func,onFocus:u.a.func,onBlur:u.a.func},m.defaultProps={length:6,validChars:"A-Za-z0-9",placeholder:"·",autoFocus:!1,removeDefaultStyles:!1,debug:!1,inputProps:{},classNames:{}};t.default=m}]);