var e=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function ne(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function re(e,t){return ne(e.type,t,e.props)}function w(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ce(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ce(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),ce(o,r,i,``,function(e){return e})):o!=null&&(w(o)&&(o=re(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=ce(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=ce(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ce(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function le(e,t,n){if(e==null)return e;var r=[],i=0;return ce(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ue(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var T=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},E={map:le,forEach:function(e,t,n){le(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return le(e,function(){t++}),t},toArray:function(e){return le(e,function(e){return e})||[]},only:function(e){if(!w(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=E,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ne(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ne(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=w,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ue}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,T)}catch(e){T(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.5`})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,w());else{var t=n(l);t!==null&&oe(x,t.startTime-e)}}var ee=!1,S=-1,C=5,te=-1;function ne(){return g?!0:!(e.unstable_now()-te<C)}function re(){if(g=!1,ee){var t=e.unstable_now();te=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ne());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?w():ee=!1}}}var w;if(typeof y==`function`)w=function(){y(re)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=re,w=function(){ae.postMessage(null)}}else w=function(){_(re,0)};function oe(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,oe(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,w()))),r},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=n();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return s(e,t,null,n)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.5`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=i(),r=n(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),te=Symbol.for(`react.suspense`),ne=Symbol.for(`react.suspense_list`),re=Symbol.for(`react.memo`),w=Symbol.for(`react.lazy`),ie=Symbol.for(`react.activity`),ae=Symbol.for(`react.memo_cache_sentinel`),oe=Symbol.iterator;function se(e){return typeof e!=`object`||!e?null:(e=oe&&e[oe]||e[`@@iterator`],typeof e==`function`?e:null)}var ce=Symbol.for(`react.client.reference`);function le(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ce?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case te:return`Suspense`;case ne:return`SuspenseList`;case ie:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case re:return t=e.displayName||null,t===null?le(e.type)||`Memo`:t;case w:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var ue=Array.isArray,T=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de={pending:!1,data:null,method:null,action:null},fe=[],pe=-1;function me(e){return{current:e}}function D(e){0>pe||(e.current=fe[pe],fe[pe]=null,pe--)}function O(e,t){pe++,fe[pe]=e.current,e.current=t}var he=me(null),ge=me(null),_e=me(null),ve=me(null);function ye(e,t){switch(O(_e,t),O(ge,e),O(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}D(he),O(he,e)}function be(){D(he),D(ge),D(_e)}function xe(e){e.memoizedState!==null&&O(ve,e);var t=he.current,n=Hd(t,e.type);t!==n&&(O(ge,e),O(he,n))}function Se(e){ge.current===e&&(D(he),D(ge)),ve.current===e&&(D(ve),Qf._currentValue=de)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,Ge=null;function Ke(e){if(typeof He==`function`&&Ue(e),Ge&&typeof Ge.setStrictMode==`function`)try{Ge.setStrictMode(We,e)}catch{}}var qe=Math.clz32?Math.clz32:Xe,Je=Math.log,Ye=Math.LN2;function Xe(e){return e>>>=0,e===0?32:31-(Je(e)/Ye|0)|0}var Ze=256,Qe=262144,$e=4194304;function et(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=et(n))):i=et(o):i=et(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=et(n))):i=et(o)):i=et(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function nt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function rt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function it(){var e=$e;return $e<<=1,!($e&62914560)&&($e=4194304),e}function at(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function st(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ct(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ct(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function lt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ut(e,t){var n=t&-t;return n=n&42?1:dt(n),(n&(e.suspendedLanes|t))===0?n:0}function dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ft(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function pt(){var e=E.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function mt(e,t){var n=E.p;try{return E.p=e,t()}finally{E.p=n}}var ht=Math.random().toString(36).slice(2),gt=`__reactFiber$`+ht,_t=`__reactProps$`+ht,vt=`__reactContainer$`+ht,yt=`__reactEvents$`+ht,bt=`__reactListeners$`+ht,xt=`__reactHandles$`+ht,St=`__reactResources$`+ht,Ct=`__reactMarker$`+ht;function wt(e){delete e[gt],delete e[_t],delete e[yt],delete e[bt],delete e[xt]}function Tt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[gt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Et(e){if(e=e[gt]||e[vt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Dt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function Ot(e){var t=e[St];return t||=e[St]={hoistableStyles:new Map,hoistableScripts:new Map},t}function k(e){e[Ct]=!0}var kt=new Set,At={};function jt(e,t){Mt(e,t),Mt(e+`Capture`,t)}function Mt(e,t){for(At[e]=t,e=0;e<t.length;e++)kt.add(t[e])}var Nt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Pt={},Ft={};function It(e){return Ae.call(Ft,e)?!0:Ae.call(Pt,e)?!1:Nt.test(e)?Ft[e]=!0:(Pt[e]=!0,!1)}function Lt(e,t,n){if(It(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Rt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function zt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Bt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Vt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ht(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ut(e){if(!e._valueTracker){var t=Vt(e)?`checked`:`value`;e._valueTracker=Ht(e,t,``+e[t])}}function Wt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Vt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Gt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Kt=/[\n"\\]/g;function qt(e){return e.replace(Kt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Bt(t)):e.value!==``+Bt(t)&&(e.value=``+Bt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Xt(e,o,Bt(n)):Xt(e,o,Bt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Bt(s):e.removeAttribute(`name`)}function Yt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ut(e);return}n=n==null?``:``+Bt(n),t=t==null?n:``+Bt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ut(e)}function Xt(e,t,n){t===`number`&&Gt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Bt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qt(e,t,n){if(t!=null&&(t=``+Bt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Bt(n)}function $t(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(ue(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=Bt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ut(e)}function en(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function nn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||tn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function rn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&nn(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&nn(e,a,t[a])}function an(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var on=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function cn(e){return sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function ln(){}var un=null;function dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fn=null,pn=null;function mn(e){var t=Et(e);if(t&&(e=t.stateNode)){var n=e[_t]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+qt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[_t]||null;if(!i)throw Error(s(90));Jt(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Wt(r)}break a;case`textarea`:Qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}}}var hn=!1;function gn(e,t,n){if(hn)return e(t,n);hn=!0;try{return e(t)}finally{if(hn=!1,(fn!==null||pn!==null)&&(bu(),fn&&(t=fn,e=pn,pn=fn=null,mn(t),e)))for(t=0;t<e.length;t++)mn(e[t])}}function _n(e,t){var n=e.stateNode;if(n===null)return null;var r=n[_t]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var vn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),yn=!1;if(vn)try{var bn={};Object.defineProperty(bn,`passive`,{get:function(){yn=!0}}),window.addEventListener(`test`,bn,bn),window.removeEventListener(`test`,bn,bn)}catch{yn=!1}var xn=null,Sn=null,Cn=null;function wn(){if(Cn)return Cn;var e,t=Sn,n=t.length,r,i=`value`in xn?xn.value:xn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Cn=i.slice(e,1<r?1-r:void 0)}function Tn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function En(){return!0}function Dn(){return!1}function On(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?En:Dn,this.isPropagationStopped=Dn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=En)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=En)},persist:function(){},isPersistent:En}),t}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},An=On(kn),jn=h({},kn,{view:0,detail:0}),Mn=On(jn),Nn,Pn,Fn,In=h({},jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Fn&&(Fn&&e.type===`mousemove`?(Nn=e.screenX-Fn.screenX,Pn=e.screenY-Fn.screenY):Pn=Nn=0,Fn=e),Nn)},movementY:function(e){return`movementY`in e?e.movementY:Pn}}),Ln=On(In),Rn=On(h({},In,{dataTransfer:0})),zn=On(h({},jn,{relatedTarget:0})),Bn=On(h({},kn,{animationName:0,elapsedTime:0,pseudoElement:0})),Vn=On(h({},kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Hn=On(h({},kn,{data:0})),Un={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Wn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Gn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Kn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Gn[e])?!!t[e]:!1}function qn(){return Kn}var Jn=On(h({},jn,{key:function(e){if(e.key){var t=Un[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Tn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Wn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qn,charCode:function(e){return e.type===`keypress`?Tn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Tn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Yn=On(h({},In,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Xn=On(h({},jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qn})),Zn=On(h({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Qn=On(h({},In,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),$n=On(h({},kn,{newState:0,oldState:0})),er=[9,13,27,32],tr=vn&&`CompositionEvent`in window,nr=null;vn&&`documentMode`in document&&(nr=document.documentMode);var rr=vn&&`TextEvent`in window&&!nr,ir=vn&&(!tr||nr&&8<nr&&11>=nr),ar=` `,or=!1;function sr(e,t){switch(e){case`keyup`:return er.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function cr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var lr=!1;function ur(e,t){switch(e){case`compositionend`:return cr(t);case`keypress`:return t.which===32?(or=!0,ar):null;case`textInput`:return e=t.data,e===ar&&or?null:e;default:return null}}function dr(e,t){if(lr)return e===`compositionend`||!tr&&sr(e,t)?(e=wn(),Cn=Sn=xn=null,lr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ir&&t.locale!==`ko`?null:t.data;default:return null}}var fr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!fr[e.type]:t===`textarea`}function mr(e,t,n,r){fn?pn?pn.push(r):pn=[r]:fn=r,t=Ed(t,`onChange`),0<t.length&&(n=new An(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var hr=null,gr=null;function _r(e){yd(e,0)}function vr(e){if(Wt(Dt(e)))return e}function yr(e,t){if(e===`change`)return t}var br=!1;if(vn){var xr;if(vn){var Sr=`oninput`in document;if(!Sr){var Cr=document.createElement(`div`);Cr.setAttribute(`oninput`,`return;`),Sr=typeof Cr.oninput==`function`}xr=Sr}else xr=!1;br=xr&&(!document.documentMode||9<document.documentMode)}function wr(){hr&&(hr.detachEvent(`onpropertychange`,Tr),gr=hr=null)}function Tr(e){if(e.propertyName===`value`&&vr(gr)){var t=[];mr(t,gr,e,dn(e)),gn(_r,t)}}function Er(e,t,n){e===`focusin`?(wr(),hr=t,gr=n,hr.attachEvent(`onpropertychange`,Tr)):e===`focusout`&&wr()}function Dr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return vr(gr)}function Or(e,t){if(e===`click`)return vr(t)}function kr(e,t){if(e===`input`||e===`change`)return vr(t)}function Ar(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var jr=typeof Object.is==`function`?Object.is:Ar;function Mr(e,t){if(jr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!jr(e[i],t[i]))return!1}return!0}function Nr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Pr(e,t){var n=Nr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Nr(n)}}function Fr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Fr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ir(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Gt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gt(e.document)}return t}function Lr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Rr=vn&&`documentMode`in document&&11>=document.documentMode,zr=null,Br=null,Vr=null,Hr=!1;function Ur(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hr||zr==null||zr!==Gt(r)||(r=zr,`selectionStart`in r&&Lr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Vr&&Mr(Vr,r)||(Vr=r,r=Ed(Br,`onSelect`),0<r.length&&(t=new An(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=zr)))}function Wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Gr={animationend:Wr(`Animation`,`AnimationEnd`),animationiteration:Wr(`Animation`,`AnimationIteration`),animationstart:Wr(`Animation`,`AnimationStart`),transitionrun:Wr(`Transition`,`TransitionRun`),transitionstart:Wr(`Transition`,`TransitionStart`),transitioncancel:Wr(`Transition`,`TransitionCancel`),transitionend:Wr(`Transition`,`TransitionEnd`)},Kr={},qr={};vn&&(qr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Gr.animationend.animation,delete Gr.animationiteration.animation,delete Gr.animationstart.animation),`TransitionEvent`in window||delete Gr.transitionend.transition);function Jr(e){if(Kr[e])return Kr[e];if(!Gr[e])return e;var t=Gr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qr)return Kr[e]=t[n];return e}var Yr=Jr(`animationend`),Xr=Jr(`animationiteration`),Zr=Jr(`animationstart`),Qr=Jr(`transitionrun`),$r=Jr(`transitionstart`),ei=Jr(`transitioncancel`),ti=Jr(`transitionend`),ni=new Map,ri=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ri.push(`scrollEnd`);function ii(e,t){ni.set(e,t),jt(t,[e])}var ai=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},oi=[],si=0,ci=0;function li(){for(var e=si,t=ci=si=0;t<e;){var n=oi[t];oi[t++]=null;var r=oi[t];oi[t++]=null;var i=oi[t];oi[t++]=null;var a=oi[t];if(oi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&pi(n,i,a)}}function ui(e,t,n,r){oi[si++]=e,oi[si++]=t,oi[si++]=n,oi[si++]=r,ci|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function di(e,t,n,r){return ui(e,t,n,r),mi(e)}function fi(e,t){return ui(e,null,null,t),mi(e)}function pi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function mi(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var hi={};function gi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _i(e,t,n,r){return new gi(e,t,n,r)}function vi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function yi(e,t){var n=e.alternate;return n===null?(n=_i(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function bi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function xi(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)vi(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ie:return e=_i(31,n,t,i),e.elementType=ie,e.lanes=a,e;case y:return Si(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=_i(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case te:return e=_i(13,n,t,i),e.elementType=te,e.lanes=a,e;case ne:return e=_i(19,n,t,i),e.elementType=ne,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:o=10;break a;case ee:o=9;break a;case C:o=11;break a;case re:o=14;break a;case w:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=_i(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Si(e,t,n,r){return e=_i(7,e,r,t),e.lanes=n,e}function Ci(e,t,n){return e=_i(6,e,null,t),e.lanes=n,e}function wi(e){var t=_i(18,null,null,0);return t.stateNode=e,t}function Ti(e,t,n){return t=_i(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ei=new WeakMap;function Di(e,t){if(typeof e==`object`&&e){var n=Ei.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},Ei.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var Oi=[],ki=0,Ai=null,ji=0,Mi=[],Ni=0,Pi=null,Fi=1,Ii=``;function Li(e,t){Oi[ki++]=ji,Oi[ki++]=Ai,Ai=e,ji=t}function Ri(e,t,n){Mi[Ni++]=Fi,Mi[Ni++]=Ii,Mi[Ni++]=Pi,Pi=e;var r=Fi;e=Ii;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var a=32-qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Fi=1<<32-qe(t)+i|n<<i|r,Ii=a+e}else Fi=1<<a|n<<i|r,Ii=e}function zi(e){e.return!==null&&(Li(e,1),Ri(e,1,0))}function Bi(e){for(;e===Ai;)Ai=Oi[--ki],Oi[ki]=null,ji=Oi[--ki],Oi[ki]=null;for(;e===Pi;)Pi=Mi[--Ni],Mi[Ni]=null,Ii=Mi[--Ni],Mi[Ni]=null,Fi=Mi[--Ni],Mi[Ni]=null}function Vi(e,t){Mi[Ni++]=Fi,Mi[Ni++]=Ii,Mi[Ni++]=Pi,Fi=t.id,Ii=t.overflow,Pi=e}var Hi=null,A=null,j=!1,Ui=null,Wi=!1,Gi=Error(s(519));function Ki(e){throw Qi(Di(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Gi}function qi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[gt]=e,t[_t]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),$t(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=ln),t=!0):t=!1,t||Ki(e,!0)}function Ji(e){for(Hi=e.return;Hi;)switch(Hi.tag){case 5:case 31:case 13:Wi=!1;return;case 27:case 3:Wi=!0;return;default:Hi=Hi.return}}function Yi(e){if(e!==Hi)return!1;if(!j)return Ji(e),j=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&A&&Ki(e),Ji(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));A=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));A=uf(e)}else t===27?(t=A,Zd(e.type)?(e=lf,lf=null,A=e):A=t):A=Hi?cf(e.stateNode.nextSibling):null;return!0}function Xi(){A=Hi=null,j=!1}function Zi(){var e=Ui;return e!==null&&(Ql===null?Ql=e:Ql.push.apply(Ql,e),Ui=null),e}function Qi(e){Ui===null?Ui=[e]:Ui.push(e)}var $i=me(null),ea=null,ta=null;function na(e,t,n){O($i,t._currentValue),t._currentValue=n}function ra(e){e._currentValue=$i.current,D($i)}function ia(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function aa(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),ia(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ia(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function oa(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;jr(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===ve.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&aa(t,e,n,r),t.flags|=262144}function sa(e){for(e=e.firstContext;e!==null;){if(!jr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ca(e){ea=e,ta=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function la(e){return da(ea,e)}function ua(e,t){return ea===null&&ca(e),da(e,t)}function da(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ta===null){if(e===null)throw Error(s(308));ta=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ta=ta.next=t;return n}var fa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},pa=t.unstable_scheduleCallback,ma=t.unstable_NormalPriority,M={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ha(){return{controller:new fa,data:new Map,refCount:0}}function ga(e){e.refCount--,e.refCount===0&&pa(ma,function(){e.controller.abort()})}var _a=null,va=0,ya=0,ba=null;function xa(e,t){if(_a===null){var n=_a=[];va=0,ya=dd(),ba={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return va++,t.then(Sa,Sa),t}function Sa(){if(--va===0&&_a!==null){ba!==null&&(ba.status=`fulfilled`);var e=_a;_a=null,ya=0,ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ca(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var wa=T.S;T.S=function(e,t){tu=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&xa(e,t),wa!==null&&wa(e,t)};var Ta=me(null);function Ea(){var e=Ta.current;return e===null?G.pooledCache:e}function Da(e,t){t===null?O(Ta,Ta.current):O(Ta,t.pool)}function Oa(){var e=Ea();return e===null?null:{parent:M._currentValue,pool:e}}var ka=Error(s(460)),Aa=Error(s(474)),ja=Error(s(542)),Ma={then:function(){}};function Na(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Pa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ln,ln),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ra(e),e;default:if(typeof t.status==`string`)t.then(ln,ln);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ra(e),e}throw Ia=t,ka}}function Fa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ia=e,ka):e}}var Ia=null;function La(){if(Ia===null)throw Error(s(459));var e=Ia;return Ia=null,e}function Ra(e){if(e===ka||e===ja)throw Error(s(483))}var za=null,Ba=0;function Va(e){var t=Ba;return Ba+=1,za===null&&(za=[]),Pa(za,e,t)}function Ha(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ua(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Wa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=yi(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ci(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===w&&Fa(a)===t.type)?(t=i(t,n.props),Ha(t,n),t.return=e,t):(t=xi(n.type,n.key,n.props,null,e.mode,r),Ha(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ti(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=Si(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ci(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=xi(t.type,t.key,t.props,null,e.mode,n),Ha(n,t),n.return=e,n;case v:return t=Ti(t,e.mode,n),t.return=e,t;case w:return t=Fa(t),f(e,t,n)}if(ue(t)||se(t))return t=Si(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Va(t),n);if(t.$$typeof===S)return f(e,ua(e,t),n);Ua(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case w:return n=Fa(n),p(e,t,n,r)}if(ue(n)||se(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Va(n),r);if(n.$$typeof===S)return p(e,t,ua(e,n),r);Ua(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case w:return r=Fa(r),m(e,t,n,r,i)}if(ue(r)||se(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Va(r),i);if(r.$$typeof===S)return m(e,t,n,ua(t,r),i);Ua(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),j&&Li(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return j&&Li(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),j&&Li(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),j&&Li(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return j&&Li(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),j&&Li(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===w&&Fa(l)===r.type){n(e,r.sibling),c=i(r,a.props),Ha(c,a),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}a.type===y?(c=Si(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=xi(a.type,a.key,a.props,null,e.mode,c),Ha(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=Ti(a,e.mode,c),c.return=e,e=c}return o(e);case w:return a=Fa(a),b(e,r,a,c)}if(ue(a))return h(e,r,a,c);if(se(a)){if(l=se(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,Va(a),c);if(a.$$typeof===S)return b(e,r,ua(e,a),c);Ua(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=Ci(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{Ba=0;var i=b(e,t,n,r);return za=null,i}catch(t){if(t===ka||t===ja)throw t;var a=_i(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ga=Wa(!0),Ka=Wa(!1),qa=!1;function Ja(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ya(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Za(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=mi(e),pi(e,null,n),t}return ui(e,r,t,n),mi(e)}function Qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}function $a(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var eo=!1;function to(){if(eo){var e=ba;if(e!==null)throw e}}function no(e,t,n,r){eo=!1;var i=e.updateQueue;qa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===ya&&(eo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:qa=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Kl|=o,e.lanes=o,e.memoizedState=d}}function ro(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function io(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)ro(n[e],t)}var ao=me(null),oo=me(0);function so(e,t){e=Gl,O(oo,e),O(ao,t),Gl=e|t.baseLanes}function co(){O(oo,Gl),O(ao,ao.current)}function lo(){Gl=oo.current,D(ao),D(oo)}var uo=me(null),fo=null;function po(e){var t=e.alternate;O(N,N.current&1),O(uo,e),fo===null&&(t===null||ao.current!==null||t.memoizedState!==null)&&(fo=e)}function mo(e){O(N,N.current),O(uo,e),fo===null&&(fo=e)}function ho(e){e.tag===22?(O(N,N.current),O(uo,e),fo===null&&(fo=e)):go(e)}function go(){O(N,N.current),O(uo,uo.current)}function _o(e){D(uo),fo===e&&(fo=null),D(N)}var N=me(0);function vo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var yo=0,P=null,F=null,I=null,bo=!1,xo=!1,So=!1,Co=0,wo=0,To=null,Eo=0;function L(){throw Error(s(321))}function Do(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!jr(e[n],t[n]))return!1;return!0}function Oo(e,t,n,r,i,a){return yo=a,P=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?Ws:Gs,So=!1,a=n(r,i),So=!1,xo&&(a=Ao(t,n,r,i)),ko(e),a}function ko(e){T.H=Us;var t=F!==null&&F.next!==null;if(yo=0,I=F=P=null,bo=!1,wo=0,To=null,t)throw Error(s(300));e===null||z||(e=e.dependencies,e!==null&&sa(e)&&(z=!0))}function Ao(e,t,n,r){P=e;var i=0;do{if(xo&&(To=null),wo=0,xo=!1,25<=i)throw Error(s(301));if(i+=1,I=F=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}T.H=Ks,a=t(n,r)}while(xo);return a}function jo(){var e=T.H,t=e.useState()[0];return t=typeof t.then==`function`?Lo(t):t,e=e.useState()[0],(F===null?null:F.memoizedState)!==e&&(P.flags|=1024),t}function Mo(){var e=Co!==0;return Co=0,e}function No(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Po(e){if(bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bo=!1}yo=0,I=F=P=null,xo=!1,wo=Co=0,To=null}function Fo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return I===null?P.memoizedState=I=e:I=I.next=e,I}function R(){if(F===null){var e=P.alternate;e=e===null?null:e.memoizedState}else e=F.next;var t=I===null?P.memoizedState:I.next;if(t!==null)I=t,F=e;else{if(e===null)throw P.alternate===null?Error(s(467)):Error(s(310));F=e,e={memoizedState:F.memoizedState,baseState:F.baseState,baseQueue:F.baseQueue,queue:F.queue,next:null},I===null?P.memoizedState=I=e:I=I.next=e}return I}function Io(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(e){var t=wo;return wo+=1,To===null&&(To=[]),e=Pa(To,e,t),t=P,(I===null?t.memoizedState:I.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?Ws:Gs),e}function Ro(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Lo(e);if(e.$$typeof===S)return la(e)}throw Error(s(438,String(e)))}function zo(e){var t=null,n=P.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=P.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Io(),P.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ae;return t.index++,n}function Bo(e,t){return typeof t==`function`?t(e):t}function Vo(e){return Ho(R(),F,e)}function Ho(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(yo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ya&&(d=!0);else if((yo&p)===p){u=u.next,p===ya&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,P.lanes|=p,Kl|=p;f=u.action,So&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,P.lanes|=f,Kl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!jr(a,e.memoizedState)&&(z=!0,d&&(n=ba,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Uo(e){var t=R(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);jr(a,t.memoizedState)||(z=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Wo(e,t,n){var r=P,i=R(),a=j;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!jr((F||i).memoizedState,n);if(o&&(i.memoizedState=n,z=!0),i=i.queue,hs(qo.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||I!==null&&I.memoizedState.tag&1){if(r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,i,n,t),null),G===null)throw Error(s(349));a||yo&127||Go(r,t,n)}return n}function Go(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=P.updateQueue,t===null?(t=Io(),P.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ko(e,t,n,r){t.value=n,t.getSnapshot=r,Jo(t)&&Yo(e)}function qo(e,t,n){return n(function(){Jo(t)&&Yo(e)})}function Jo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!jr(e,n)}catch{return!0}}function Yo(e){var t=fi(e,2);t!==null&&hu(t,e,2)}function Xo(e){var t=Fo();if(typeof e==`function`){var n=e;if(e=n(),So){Ke(!0);try{n()}finally{Ke(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:e},t}function Zo(e,t,n,r){return e.baseState=n,Ho(e,F,typeof r==`function`?r:Bo)}function Qo(e,t,n,r,i){if(Bs(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};T.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,$o(t,a)):(a.next=n.next,t.pending=n.next=a)}}function $o(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=T.T,o={};T.T=o;try{var s=n(i,r),c=T.S;c!==null&&c(o,s),es(e,t,s)}catch(n){ns(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),T.T=a}}else try{a=n(i,r),es(e,t,a)}catch(n){ns(e,t,n)}}function es(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ts(e,t,n)},function(n){return ns(e,t,n)}):ts(e,t,n)}function ts(e,t,n){t.status=`fulfilled`,t.value=n,rs(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,$o(e,n)))}function ns(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,rs(t),t=t.next;while(t!==r)}e.action=null}function rs(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function is(e,t){return t}function as(e,t){if(j){var n=G.formState;if(n!==null){a:{var r=P;if(j){if(A){b:{for(var i=A,a=Wi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){A=cf(i.nextSibling),r=i.data===`F!`;break a}}Ki(r)}r=!1}r&&(t=n[0])}}return n=Fo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:is,lastRenderedState:t},n.queue=r,n=Ls.bind(null,P,r),r.dispatch=n,r=Xo(!1),a=zs.bind(null,P,!1,r.queue),r=Fo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Qo.bind(null,P,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function os(e){return ss(R(),F,e)}function ss(e,t,n){if(t=Ho(e,t,is)[0],e=Vo(Bo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Lo(t)}catch(e){throw e===ka?ja:e}else r=t;t=R();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(P.flags|=2048,us(9,{destroy:void 0},cs.bind(null,i,n),null)),[r,a,e]}function cs(e,t){e.action=t}function ls(e){var t=R(),n=F;if(n!==null)return ss(t,n,e);R(),t=t.memoizedState,n=R();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function us(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=P.updateQueue,t===null&&(t=Io(),P.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ds(){return R().memoizedState}function fs(e,t,n,r){var i=Fo();P.flags|=e,i.memoizedState=us(1|t,{destroy:void 0},n,r===void 0?null:r)}function ps(e,t,n,r){var i=R();r=r===void 0?null:r;var a=i.memoizedState.inst;F!==null&&r!==null&&Do(r,F.memoizedState.deps)?i.memoizedState=us(t,a,n,r):(P.flags|=e,i.memoizedState=us(1|t,a,n,r))}function ms(e,t){fs(8390656,8,e,t)}function hs(e,t){ps(2048,8,e,t)}function gs(e){P.flags|=4;var t=P.updateQueue;if(t===null)t=Io(),P.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function _s(e){var t=R().memoizedState;return gs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function vs(e,t){return ps(4,2,e,t)}function ys(e,t){return ps(4,4,e,t)}function bs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xs(e,t,n){n=n==null?null:n.concat([e]),ps(4,4,bs.bind(null,t,e),n)}function Ss(){}function Cs(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Do(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ws(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Do(t,r[1]))return r[0];if(r=e(),So){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r}function Ts(e,t,n){return n===void 0||yo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),P.lanes|=e,Kl|=e,n)}function Es(e,t,n,r){return jr(n,t)?n:ao.current===null?!(yo&42)||yo&1073741824&&!(q&261930)?(z=!0,e.memoizedState=n):(e=mu(),P.lanes|=e,Kl|=e,t):(e=Ts(e,n,r),jr(e,t)||(z=!0),e)}function Ds(e,t,n,r,i){var a=E.p;E.p=a!==0&&8>a?a:8;var o=T.T,s={};T.T=s,zs(e,!1,t,n);try{var c=i(),l=T.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Rs(e,t,Ca(c,r),pu(e)):Rs(e,t,r,pu(e))}catch(n){Rs(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{E.p=a,o!==null&&s.types!==null&&(o.types=s.types),T.T=o}}function Os(){}function ks(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=As(e).queue;Ds(e,i,t,de,n===null?Os:function(){return js(e),n(r)})}function As(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:de,baseState:de,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:de},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function js(e){var t=As(e);t.next===null&&(t=e.alternate.memoizedState),Rs(e,t.next.queue,{},pu())}function Ms(){return la(Qf)}function Ns(){return R().memoizedState}function Ps(){return R().memoizedState}function Fs(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Xa(n);var r=Za(t,e,n);r!==null&&(hu(r,t,n),Qa(r,t,n)),t={cache:ha()},e.payload=t;return}t=t.return}}function Is(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Bs(e)?Vs(t,n):(n=di(e,t,n,r),n!==null&&(hu(n,e,r),Hs(n,t,r)))}function Ls(e,t,n){Rs(e,t,n,pu())}function Rs(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bs(e))Vs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,jr(s,o))return ui(e,t,i,0),G===null&&li(),!1}catch{}if(n=di(e,t,i,r),n!==null)return hu(n,e,r),Hs(n,t,r),!0}return!1}function zs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Bs(e)){if(t)throw Error(s(479))}else t=di(e,n,r,2),t!==null&&hu(t,e,2)}function Bs(e){var t=e.alternate;return e===P||t!==null&&t===P}function Vs(e,t){xo=bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Hs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}var Us={readContext:la,use:Ro,useCallback:L,useContext:L,useEffect:L,useImperativeHandle:L,useLayoutEffect:L,useInsertionEffect:L,useMemo:L,useReducer:L,useRef:L,useState:L,useDebugValue:L,useDeferredValue:L,useTransition:L,useSyncExternalStore:L,useId:L,useHostTransitionStatus:L,useFormState:L,useActionState:L,useOptimistic:L,useMemoCache:L,useCacheRefresh:L};Us.useEffectEvent=L;var Ws={readContext:la,use:Ro,useCallback:function(e,t){return Fo().memoizedState=[e,t===void 0?null:t],e},useContext:la,useEffect:ms,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),fs(4194308,4,bs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fs(4194308,4,e,t)},useInsertionEffect:function(e,t){fs(4,2,e,t)},useMemo:function(e,t){var n=Fo();t=t===void 0?null:t;var r=e();if(So){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Fo();if(n!==void 0){var i=n(t);if(So){Ke(!0);try{n(t)}finally{Ke(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Is.bind(null,P,e),[r.memoizedState,e]},useRef:function(e){var t=Fo();return e={current:e},t.memoizedState=e},useState:function(e){e=Xo(e);var t=e.queue,n=Ls.bind(null,P,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ss,useDeferredValue:function(e,t){return Ts(Fo(),e,t)},useTransition:function(){var e=Xo(!1);return e=Ds.bind(null,P,e.queue,!0,!1),Fo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=P,i=Fo();if(j){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),G===null)throw Error(s(349));q&127||Go(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,ms(qo.bind(null,r,a,e),[e]),r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,a,n,t),null),n},useId:function(){var e=Fo(),t=G.identifierPrefix;if(j){var n=Ii,r=Fi;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Co++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Eo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ms,useFormState:as,useActionState:as,useOptimistic:function(e){var t=Fo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=zs.bind(null,P,!0,n),n.dispatch=t,[e,t]},useMemoCache:zo,useCacheRefresh:function(){return Fo().memoizedState=Fs.bind(null,P)},useEffectEvent:function(e){var t=Fo(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Gs={readContext:la,use:Ro,useCallback:Cs,useContext:la,useEffect:hs,useImperativeHandle:xs,useInsertionEffect:vs,useLayoutEffect:ys,useMemo:ws,useReducer:Vo,useRef:ds,useState:function(){return Vo(Bo)},useDebugValue:Ss,useDeferredValue:function(e,t){return Es(R(),F.memoizedState,e,t)},useTransition:function(){var e=Vo(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Wo,useId:Ns,useHostTransitionStatus:Ms,useFormState:os,useActionState:os,useOptimistic:function(e,t){return Zo(R(),F,e,t)},useMemoCache:zo,useCacheRefresh:Ps};Gs.useEffectEvent=_s;var Ks={readContext:la,use:Ro,useCallback:Cs,useContext:la,useEffect:hs,useImperativeHandle:xs,useInsertionEffect:vs,useLayoutEffect:ys,useMemo:ws,useReducer:Uo,useRef:ds,useState:function(){return Uo(Bo)},useDebugValue:Ss,useDeferredValue:function(e,t){var n=R();return F===null?Ts(n,e,t):Es(n,F.memoizedState,e,t)},useTransition:function(){var e=Uo(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Wo,useId:Ns,useHostTransitionStatus:Ms,useFormState:ls,useActionState:ls,useOptimistic:function(e,t){var n=R();return F===null?(n.baseState=e,[e,n.queue.dispatch]):Zo(n,F,e,t)},useMemoCache:zo,useCacheRefresh:Ps};Ks.useEffectEvent=_s;function qs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Js={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Xa(r);i.payload=t,n!=null&&(i.callback=n),t=Za(e,i,r),t!==null&&(hu(t,e,r),Qa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Xa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Za(e,i,r),t!==null&&(hu(t,e,r),Qa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Xa(n);r.tag=2,t!=null&&(r.callback=t),t=Za(e,r,n),t!==null&&(hu(t,e,n),Qa(t,e,n))}};function Ys(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Mr(n,r)||!Mr(i,a):!0}function Xs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Js.enqueueReplaceState(t,t.state,null)}function Zs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Qs(e){ai(e)}function $s(e){console.error(e)}function ec(e){ai(e)}function tc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function nc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function rc(e,t,n){return n=Xa(n),n.tag=3,n.payload={element:null},n.callback=function(){tc(e,t)},n}function ic(e){return e=Xa(e),e.tag=3,e}function ac(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){nc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){nc(t,n,r),typeof i!=`function`&&(iu===null?iu=new Set([this]):iu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function oc(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&oa(t,n,i,!0),n=uo.current,n!==null){switch(n.tag){case 31:case 13:return fo===null?Du():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===Ma?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===Ma?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(j)return t=uo.current,t===null?(r!==Gi&&(t=Error(s(423),{cause:r}),Qi(Di(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Di(r,n),i=rc(e.stateNode,r,i),$a(e,i),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Gi&&(e=Error(s(422),{cause:r}),Qi(Di(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Di(a,n),Zl===null?Zl=[a]:Zl.push(a),Y!==4&&(Y=2),t===null)return!0;r=Di(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=rc(n.stateNode,r,e),$a(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(iu===null||!iu.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=ic(i),ac(i,e,n,r),$a(n,i),!1}n=n.return}while(n!==null);return!1}var sc=Error(s(461)),z=!1;function cc(e,t,n,r){t.child=e===null?Ka(t,null,n,r):Ga(t,e.child,n,r)}function lc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ca(t),r=Oo(e,t,n,o,a,i),s=Mo(),e!==null&&!z?(No(e,t,i),Nc(e,t,i)):(j&&s&&zi(t),t.flags|=1,cc(e,t,r,i),t.child)}function uc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!vi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,dc(e,t,a,r,i)):(e=xi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Pc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Mr:n,n(o,r)&&e.ref===t.ref)return Nc(e,t,i)}return t.flags|=1,e=yi(a,r),e.ref=t.ref,e.return=t,t.child=e}function dc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Mr(a,r)&&e.ref===t.ref)if(z=!1,t.pendingProps=r=a,Pc(e,i))e.flags&131072&&(z=!0);else return t.lanes=e.lanes,Nc(e,t,i)}return yc(e,t,n,r,i)}function fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return mc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Da(t,a===null?null:a.cachePool),a===null?co():so(t,a),ho(t);else return r=t.lanes=536870912,mc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Da(t,null),co(),go(t)):(Da(t,a.cachePool),so(t,a),go(t),t.memoizedState=null);return cc(e,t,i,n),t.child}function pc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function mc(e,t,n,r,i){var a=Ea();return a=a===null?null:{parent:M._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Da(t,null),co(),ho(t),e!==null&&oa(e,t,r,!0),t.childLanes=i,null}function hc(e,t){return t=Oc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function gc(e,t,n){return Ga(t,e.child,null,n),e=hc(t,t.pendingProps),e.flags|=2,_o(t),t.memoizedState=null,e}function _c(e,t,n){var r=t.pendingProps,i=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(j){if(r.mode===`hidden`)return e=hc(t,r),t.lanes=536870912,pc(null,e);if(mo(t),(e=A)?(e=rf(e,Wi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pi===null?null:{id:Fi,overflow:Ii},retryLane:536870912,hydrationErrors:null},n=wi(e),n.return=t,t.child=n,Hi=t,A=null)):e=null,e===null)throw Ki(t);return t.lanes=536870912,null}return hc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(mo(t),i)if(t.flags&256)t.flags&=-257,t=gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558));else if(z||oa(e,t,n,!1),i=(n&e.childLanes)!==0,z||i){if(r=G,r!==null&&(o=ut(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,fi(e,o),hu(r,e,o),sc;Du(),t=gc(e,t,n)}else e=a.treeContext,A=cf(o.nextSibling),Hi=t,j=!0,Ui=null,Wi=!1,e!==null&&Vi(t,e),t=hc(t,r),t.flags|=4096;return t}return e=yi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function yc(e,t,n,r,i){return ca(t),n=Oo(e,t,n,r,void 0,i),r=Mo(),e!==null&&!z?(No(e,t,i),Nc(e,t,i)):(j&&r&&zi(t),t.flags|=1,cc(e,t,n,i),t.child)}function bc(e,t,n,r,i,a){return ca(t),t.updateQueue=null,n=Ao(t,r,n,i),ko(e),r=Mo(),e!==null&&!z?(No(e,t,a),Nc(e,t,a)):(j&&r&&zi(t),t.flags|=1,cc(e,t,n,a),t.child)}function xc(e,t,n,r,i){if(ca(t),t.stateNode===null){var a=hi,o=n.contextType;typeof o==`object`&&o&&(a=la(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Js,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ja(t),o=n.contextType,a.context=typeof o==`object`&&o?la(o):hi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(qs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Js.enqueueReplaceState(a,a.state,null),no(t,r,a,i),to(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Zs(n,s);a.props=c;var l=a.context,u=n.contextType;o=hi,typeof u==`object`&&u&&(o=la(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Xs(t,a,r,o),qa=!1;var f=t.memoizedState;a.state=f,no(t,r,a,i),to(),l=t.memoizedState,s||f!==l||qa?(typeof d==`function`&&(qs(t,n,d,r),l=t.memoizedState),(c=qa||Ys(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ya(e,t),o=t.memoizedProps,u=Zs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=hi,typeof l==`object`&&l&&(c=la(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Xs(t,a,r,c),qa=!1,f=t.memoizedState,a.state=f,no(t,r,a,i),to();var p=t.memoizedState;o!==d||f!==p||qa||e!==null&&e.dependencies!==null&&sa(e.dependencies)?(typeof s==`function`&&(qs(t,n,s,r),p=t.memoizedState),(u=qa||Ys(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&sa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,vc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ga(t,e.child,null,i),t.child=Ga(t,null,n,i)):cc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Nc(e,t,i),e}function Sc(e,t,n,r){return Xi(),t.flags|=256,cc(e,t,n,r),t.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function wc(e){return{baseLanes:e,cachePool:Oa()}}function Tc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Yl),e}function Ec(e,t,n){var r=t.pendingProps,i=!1,a=(t.flags&128)!=0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(N.current&2)!=0),o&&(i=!0,t.flags&=-129),o=(t.flags&32)!=0,t.flags&=-33,e===null){if(j){if(i?po(t):go(t),(e=A)?(e=rf(e,Wi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pi===null?null:{id:Fi,overflow:Ii},retryLane:536870912,hydrationErrors:null},n=wi(e),n.return=t,t.child=n,Hi=t,A=null)):e=null,e===null)throw Ki(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(go(t),i=t.mode,c=Oc({mode:`hidden`,children:c},i),r=Si(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,o,n),t.memoizedState=Cc,pc(null,r)):(po(t),Dc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(po(t),t.flags&=-257,t=kc(e,t,n)):t.memoizedState===null?(go(t),c=r.fallback,i=t.mode,r=Oc({mode:`visible`,children:r.children},i),c=Si(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ga(t,e.child,null,n),r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,o,n),t.memoizedState=Cc,t=pc(null,r)):(go(t),t.child=e.child,t.flags|=128,t=null);else if(po(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,Qi({value:r,source:null,stack:null}),t=kc(e,t,n)}else if(z||oa(e,t,n,!1),o=(n&e.childLanes)!==0,z||o){if(o=G,o!==null&&(r=ut(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,fi(e,r),hu(o,e,r),sc;af(c)||Du(),t=kc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,A=cf(c.nextSibling),Hi=t,j=!0,Ui=null,Wi=!1,e!==null&&Vi(t,e),t=Dc(t,r.children),t.flags|=4096);return t}return i?(go(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=yi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=Si(c,i,n,null),c.flags|=2):c=yi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,pc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=wc(n):(i=c.cachePool,i===null?i=Oa():(l=M._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=Tc(e,o,n),t.memoizedState=Cc,pc(e.child,r)):(po(t),n=e.child,e=n.sibling,n=yi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Dc(e,t){return t=Oc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Oc(e,t){return e=_i(22,e,null,t),e.lanes=0,e}function kc(e,t,n){return Ga(t,e.child,null,n),e=Dc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ac(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ia(e.return,t,n)}function jc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Mc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=N.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,O(N,o),cc(e,t,r,n),r=j?ji:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ac(e,n,t);else if(e.tag===19)Ac(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&vo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),jc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&vo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}jc(t,!0,n,null,a,r);break;case`together`:jc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Nc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(oa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=yi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=yi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&sa(e))):!0}function Fc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),na(t,M,e.memoizedState.cache),Xi();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:na(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,mo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(po(t),e=Nc(e,t,n),e===null?null:e.sibling):Ec(e,t,n):(po(t),t.flags|=128,null);po(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(oa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Mc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(N,N.current),r)break;return null;case 22:return t.lanes=0,fc(e,t,n,t.pendingProps);case 24:na(t,M,e.memoizedState.cache)}return Nc(e,t,n)}function Ic(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)z=!0;else{if(!Pc(e,n)&&!(t.flags&128))return z=!1,Fc(e,t,n);z=!!(e.flags&131072)}else z=!1,j&&t.flags&1048576&&Ri(t,ji,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Fa(t.elementType),t.type=e,typeof e==`function`)vi(e)?(r=Zs(e,r),t.tag=1,t=xc(null,t,e,r,n)):(t.tag=0,t=yc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===C){t.tag=11,t=lc(null,t,e,r,n);break a}else if(i===re){t.tag=14,t=uc(null,t,e,r,n);break a}}throw t=le(e)||e,Error(s(306,t,``))}}return t;case 0:return yc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=Zs(r,t.pendingProps),xc(e,t,r,i,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,Ya(e,t),no(t,r,null,n);var o=t.memoizedState;if(r=o.cache,na(t,M,r),r!==a.cache&&aa(t,[M],n,!0),to(),r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Sc(e,t,r,n);break a}else if(r!==i){i=Di(Error(s(424)),t),Qi(i),t=Sc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(A=cf(e.firstChild),Hi=t,j=!0,Ui=null,Wi=!0,n=Ka(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Xi(),r===i){t=Nc(e,t,n);break a}cc(e,t,r,n)}t=t.child}return t;case 26:return vc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:j||(n=t.type,e=t.pendingProps,r=Bd(_e.current).createElement(n),r[gt]=t,r[_t]=e,Pd(r,n,e),k(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&j&&(r=t.stateNode=ff(t.type,t.pendingProps,_e.current),Hi=t,Wi=!0,i=A,Zd(t.type)?(lf=i,A=cf(r.firstChild)):A=i),cc(e,t,t.pendingProps.children,n),vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&j&&((i=r=A)&&(r=tf(r,t.type,t.pendingProps,Wi),r===null?i=!1:(t.stateNode=r,Hi=t,A=cf(r.firstChild),Wi=!1,i=!0)),i||Ki(t)),xe(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Oo(e,t,jo,null,null,n),Qf._currentValue=i),vc(e,t),cc(e,t,r,n),t.child;case 6:return e===null&&j&&((e=n=A)&&(n=nf(n,t.pendingProps,Wi),n===null?e=!1:(t.stateNode=n,Hi=t,A=null,e=!0)),e||Ki(t)),null;case 13:return Ec(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ga(t,null,r,n):cc(e,t,r,n),t.child;case 11:return lc(e,t,t.type,t.pendingProps,n);case 7:return cc(e,t,t.pendingProps,n),t.child;case 8:return cc(e,t,t.pendingProps.children,n),t.child;case 12:return cc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,na(t,t.type,r.value),cc(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,ca(t),i=la(i),r=r(i),t.flags|=1,cc(e,t,r,n),t.child;case 14:return uc(e,t,t.type,t.pendingProps,n);case 15:return dc(e,t,t.type,t.pendingProps,n);case 19:return Mc(e,t,n);case 31:return _c(e,t,n);case 22:return fc(e,t,n,t.pendingProps);case 24:return ca(t),r=la(M),e===null?(i=Ea(),i===null&&(i=G,a=ha(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},Ja(t),na(t,M,i)):((e.lanes&n)!==0&&(Ya(e,t),no(t,null,null,n),to()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,na(t,M,r),r!==i.cache&&aa(t,[M],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),na(t,M,r))),cc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Lc(e){e.flags|=4}function Rc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Ia=Ma,Aa}else e.flags&=-16777217}function zc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Ia=Ma,Aa}function Bc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:it(),e.lanes|=t,Xl|=t)}function Vc(e,t){if(!j)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function B(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Hc(e,t,n){var r=t.pendingProps;switch(Bi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return B(t),null;case 1:return B(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ra(M),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Yi(t)?Lc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Zi())),B(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Lc(t),a===null?(B(t),Rc(t,i,null,r,n)):(B(t),zc(t,a))):a?a===e.memoizedState?(B(t),t.flags&=-16777217):(Lc(t),B(t),zc(t,a)):(e=e.memoizedProps,e!==r&&Lc(t),B(t),Rc(t,i,e,r,n)),null;case 27:if(Se(t),n=_e.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return B(t),null}e=he.current,Yi(t)?qi(t,e):(e=ff(i,r,n),t.stateNode=e,Lc(t))}return B(t),null;case 5:if(Se(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return B(t),null}if(a=he.current,Yi(t))qi(t,a);else{var o=Bd(_e.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[gt]=t,a[_t]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Lc(t)}}return B(t),Rc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=_e.current,Yi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=Hi,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[gt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ki(t,!0)}else e=Bd(e).createTextNode(r),e[gt]=t,t.stateNode=e}return B(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Yi(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[gt]=t}else Xi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;B(t),e=!1}else n=Zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(_o(t),t):(_o(t),null);if(t.flags&128)throw Error(s(558))}return B(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Yi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[gt]=t}else Xi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;B(t),i=!1}else i=Zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(_o(t),t):(_o(t),null)}return _o(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Bc(t,t.updateQueue),B(t),null);case 4:return be(),e===null&&Sd(t.stateNode.containerInfo),B(t),null;case 10:return ra(t.type),B(t),null;case 19:if(D(N),r=t.memoizedState,r===null)return B(t),null;if(i=(t.flags&128)!=0,a=r.rendering,a===null)if(i)Vc(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=vo(e),a!==null){for(t.flags|=128,Vc(r,!1),e=a.updateQueue,t.updateQueue=e,Bc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)bi(n,e),n=n.sibling;return O(N,N.current&1|2),j&&Li(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>nu&&(t.flags|=128,i=!0,Vc(r,!1),t.lanes=4194304)}else{if(!i)if(e=vo(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Bc(t,e),Vc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!j)return B(t),null}else 2*Fe()-r.renderingStartTime>nu&&n!==536870912&&(t.flags|=128,i=!0,Vc(r,!1),t.lanes=4194304);r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(B(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=N.current,O(N,i?n&1|2:n&1),j&&Li(t,r.treeForkCount),e);case 22:case 23:return _o(t),lo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(B(t),t.subtreeFlags&6&&(t.flags|=8192)):B(t),n=t.updateQueue,n!==null&&Bc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&D(Ta),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ra(M),B(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Uc(e,t){switch(Bi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ra(M),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(_o(t),t.alternate===null)throw Error(s(340));Xi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_o(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Xi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return D(N),null;case 4:return be(),null;case 10:return ra(t.type),null;case 22:case 23:return _o(t),lo(),e!==null&&D(Ta),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ra(M),null;case 25:return null;default:return null}}function Wc(e,t){switch(Bi(t),t.tag){case 3:ra(M),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&_o(t);break;case 13:_o(t);break;case 19:D(N);break;case 10:ra(t.type);break;case 22:case 23:_o(t),lo(),e!==null&&D(Ta);break;case 24:ra(M)}}function Gc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Kc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function qc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{io(t,n)}catch(t){Z(e,e.return,t)}}}function Jc(e,t,n){n.props=Zs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Yc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Xc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Zc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[_t]=t}catch(t){Z(e,e.return,t)}}function $c(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function el(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||$c(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ln));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(nl(e,t,n),e=e.sibling;e!==null;)nl(e,t,n),e=e.sibling}function rl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[gt]=e,t[_t]=n}catch(t){Z(e,e.return,t)}}var il=!1,V=!1,al=!1,ol=typeof WeakSet==`function`?WeakSet:Set,H=null;function sl(e,t){if(e=e.containerInfo,Rd=sp,e=Ir(e),Lr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,H=t;H!==null;)if(t=H,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,H=e;else for(;H!==null;){switch(t=H,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=Zs(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,H=e;break}H=t.return}}function cl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Sl(e,n),r&4&&Gc(5,n);break;case 1:if(Sl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Zs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&qc(n),r&512&&Yc(n,n.return);break;case 3:if(Sl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{io(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&rl(n);case 26:case 5:Sl(e,n),t===null&&r&4&&Zc(n),r&512&&Yc(n,n.return);break;case 12:Sl(e,n);break;case 31:Sl(e,n),r&4&&pl(e,n);break;case 13:Sl(e,n),r&4&&ml(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||il,!r){t=t!==null&&t.memoizedState!==null||V,i=il;var a=V;il=r,(V=t)&&!a?wl(e,n,(n.subtreeFlags&8772)!=0):Sl(e,n),il=i,V=a}break;case 30:break;default:Sl(e,n)}}function ll(e){var t=e.alternate;t!==null&&(e.alternate=null,ll(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&wt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,ul=!1;function dl(e,t,n){for(n=n.child;n!==null;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(Ge&&typeof Ge.onCommitFiberUnmount==`function`)try{Ge.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:V||Xc(n,t),dl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:V||Xc(n,t);var r=U,i=ul;Zd(n.type)&&(U=n.stateNode,ul=!1),dl(e,t,n),pf(n.stateNode),U=r,ul=i;break;case 5:V||Xc(n,t);case 6:if(r=U,i=ul,U=null,dl(e,t,n),U=r,ul=i,U!==null)if(ul)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:U!==null&&(ul?(e=U,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(U,n.stateNode));break;case 4:r=U,i=ul,U=n.stateNode.containerInfo,ul=!0,dl(e,t,n),U=r,ul=i;break;case 0:case 11:case 14:case 15:Kc(2,n,t),V||Kc(4,n,t),dl(e,t,n);break;case 1:V||(Xc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Jc(n,t,r)),dl(e,t,n);break;case 21:dl(e,t,n);break;case 22:V=(r=V)||n.memoizedState!==null,dl(e,t,n),V=r;break;default:dl(e,t,n)}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function hl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ol),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ol),t;default:throw Error(s(435,e.tag))}}function gl(e,t){var n=hl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function _l(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){U=c.stateNode,ul=!1;break a}break;case 5:U=c.stateNode,ul=!1;break a;case 3:case 4:U=c.stateNode.containerInfo,ul=!0;break a}c=c.return}if(U===null)throw Error(s(160));fl(a,o,i),U=null,ul=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yl(t,e),t=t.sibling}var vl=null;function yl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_l(t,e),bl(e),r&4&&(Kc(3,e,e.return),Gc(3,e),Kc(5,e,e.return));break;case 1:_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),r&64&&il&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=vl;if(_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[Ct]||a[gt]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[gt]=e,k(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[gt]=e,k(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode);else e.stateNode=If(i,r,e.memoizedProps);else a===r?r===null&&e.stateNode!==null&&Qc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),n!==null&&r&4&&Qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),e.flags&32){i=e.stateNode;try{en(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Qc(e,i,n===null?i:n.memoizedProps)),r&1024&&(al=!0);break;case 6:if(_l(t,e),bl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=vl,vl=gf(t.containerInfo),_l(t,e),vl=i,bl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}al&&(al=!1,xl(e));break;case 4:r=vl,vl=gf(e.stateNode.containerInfo),_l(t,e),bl(e),vl=r;break;case 12:_l(t,e),bl(e);break;case 31:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 13:_l(t,e),bl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(eu=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=il,d=V;if(il=u||i,V=d||l,_l(t,e),V=d,il=u,bl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||il||V||Cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,gl(e,n))));break;case 19:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 30:break;case 21:break;default:_l(t,e),bl(e)}}function bl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if($c(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;nl(e,el(e),i);break;case 5:var a=n.stateNode;n.flags&32&&(en(a,``),n.flags&=-33),nl(e,el(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;tl(e,el(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Sl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)cl(e,t.alternate,t),t=t.sibling}function Cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Kc(4,t,t.return),Cl(t);break;case 1:Xc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Jc(t,t.return,n),Cl(t);break;case 27:pf(t.stateNode);case 26:case 5:Xc(t,t.return),Cl(t);break;case 22:t.memoizedState===null&&Cl(t);break;case 30:Cl(t);break;default:Cl(t)}e=e.sibling}}function wl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:wl(i,a,n),Gc(4,a);break;case 1:if(wl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)ro(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&qc(a),Yc(a,a.return);break;case 27:rl(a);case 26:case 5:wl(i,a,n),n&&r===null&&o&4&&Zc(a),Yc(a,a.return);break;case 12:wl(i,a,n);break;case 31:wl(i,a,n),n&&o&4&&pl(i,a);break;case 13:wl(i,a,n),n&&o&4&&ml(i,a);break;case 22:a.memoizedState===null&&wl(i,a,n),Yc(a,a.return);break;case 30:break;default:wl(i,a,n)}t=t.sibling}}function Tl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ga(n))}function El(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ga(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Gc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ga(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&Tl(o,t);break;case 24:Dl(e,t,n,r),i&2048&&El(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Gc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&Tl(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&El(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&Tl(r.alternate,r);break;case 24:Al(n,r),i&2048&&El(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&Gf(n,vl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=vl;vl=gf(e.stateNode.containerInfo),Ml(e,t,n),vl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&Kc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Kc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;H!==null;){var n=H;switch(n.tag){case 0:case 11:case 15:Kc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ga(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,H=r;else a:for(n=e;H!==null;){r=H;var i=r.sibling,a=r.return;if(ll(r),r===n){H=null;break a}if(i!==null){i.return=a,H=i;break a}H=a}}}var zl={getCacheForType:function(e){var t=la(M),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return la(M).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,Vl=null,Hl=!1,Ul=!1,Wl=!1,Gl=0,Y=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=null,Ql=null,$l=!1,eu=0,tu=0,nu=1/0,ru=null,iu=null,X=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return W&2&&q!==0?q&-q:T.T===null?pt():dd()}function mu(){if(Yl===0)if(!(q&536870912)||j){var e=Qe;Qe<<=1,!(Qe&3932160)&&(Qe=262144),Yl=e}else Yl=536870912;return e=uo.current,e!==null&&(e.flags|=32),Yl}function hu(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,q,Yl,!1)),ot(e,n),(!(W&2)||e!==G)&&(e===G&&(!(W&2)&&(ql|=n),Y===4&&yu(e,q,Yl,!1)),rd(e))}function gu(e,t,n){if(W&6)throw Error(s(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||nt(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Ul&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Zl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Wl&&!l){c.errorRecoveryDisabledLanes|=a,ql|=a,i=4;break a}a=Ql,Ql=i,a!==null&&(Ql===null?Ql=a:Ql.push.apply(Ql,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Yl,!Hl);break a;case 2:Ql=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=eu+300-Fe(),10<i)){if(yu(r,t,Yl,!Hl),tt(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,`Throttled`,-0,0),i);break a}_u(r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ln},Nl(t,a,d);var m=(a&62914560)===a?eu-Fe():(a&4194048)===a?tu-Fe():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!jr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~Jl,t&=~ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ct(e,n,t)}function bu(){return W&6?!0:(id(0,!1),!1)}function xu(){if(K!==null){if(J===0)var e=K.return;else e=K,ta=ea=null,Po(e),za=null,Ba=0,e=K;for(;e!==null;)Wc(e.alternate,e),e=e.return;K=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),G=e,K=n=yi(e.current,null),q=t,J=0,Vl=null,Hl=!1,Ul=nt(e,t),Wl=!1,Xl=Yl=Jl=ql=Kl=Y=0,Ql=Zl=null,$l=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-qe(r),a=1<<i;t|=e[i],r&=~a}return Gl=t,li(),n}function Cu(e,t){P=null,T.H=Us,t===ka||t===ja?(t=La(),J=3):t===Aa?(t=La(),J=4):J=t===sc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Vl=t,K===null&&(Y=1,tc(e,Di(t,e.current)))}function wu(){var e=uo.current;return e===null?!0:(q&4194048)===q?fo===null:(q&62914560)===q||q&536870912?e===fo:!1}function Tu(){var e=T.H;return T.H=Us,e===null?Us:e}function Eu(){var e=T.A;return T.A=zl,e}function Du(){Y=4,Hl||(q&4194048)!==q&&uo.current!==null||(Ul=!0),!(Kl&134217727)&&!(ql&134217727)||G===null||yu(G,q,Yl,!1)}function Ou(e,t,n){var r=W;W|=2;var i=Tu(),a=Eu();(G!==e||q!==t)&&(ru=null,Su(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=Vl;switch(J){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:uo.current===null&&(t=!0);var l=J;if(J=0,Vl=null,Pu(e,s,c,l),n&&Ul){o=0;break a}break;default:l=J,J=0,Vl=null,Pu(e,s,c,l)}}ku(),o=Y;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,ta=ea=null,W=r,T.H=i,T.A=a,K===null&&(G=null,q=0,li()),o}function ku(){for(;K!==null;)Mu(K)}function Au(e,t){var n=W;W|=2;var r=Tu(),i=Eu();G!==e||q!==t?(ru=null,nu=Fe()+500,Su(e,t)):Ul=nt(e,t);a:do try{if(J!==0&&K!==null){t=K;var a=Vl;b:switch(J){case 1:J=0,Vl=null,Pu(e,t,a,1);break;case 2:case 9:if(Na(a)){J=0,Vl=null,Nu(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),rd(e)},a.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:Na(a)?(J=0,Vl=null,Nu(t)):(J=0,Vl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(K.tag){case 26:o=K.memoizedState;case 5:case 27:var c=K;if(o?Wf(o):c.stateNode.complete){J=0,Vl=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,Fu(u))}break b}}J=0,Vl=null,Pu(e,t,a,5);break;case 6:J=0,Vl=null,Pu(e,t,a,6);break;case 8:xu(),Y=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return ta=ea=null,T.H=r,T.A=i,W=n,K===null?(G=null,q=0,li(),Y):0}function ju(){for(;K!==null&&!Ne();)Mu(K)}function Mu(e){var t=Ic(e.alternate,e,Gl);e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=bc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=bc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:Po(t);default:Wc(n,t),t=K=bi(t,Gl),t=Ic(n,t,Gl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Pu(e,t,n,r){ta=ea=null,Po(t),za=null,Ba=0;var i=t.return;try{if(oc(e,i,t,n,q)){Y=1,tc(e,Di(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,tc(e,Di(n,e.current)),K=null;return}t.flags&32768?(j||r===1?e=!0:Ul||q&536870912?e=!1:(Hl=e=!0,(r===2||r===9||r===3||r===6)&&(r=uo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Hl);return}e=t.return;var n=Hc(t.alternate,t,Gl);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function Iu(e,t){do{var n=Uc(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(X!==0);if(W&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=ci,st(e,n,a,o,c,l),e===G&&(K=G=null,q=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(ze,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=T.T,T.T=null,i=E.p,E.p=2,o=W,W|=4;try{sl(e,t,n)}finally{W=o,E.p=i,T.T=r}}X=1,Ru(),zu(),Bu()}}function Ru(){if(X===1){X=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{yl(t,e);var a=zd,o=Ir(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Fr(s.ownerDocument.documentElement,s)){if(c!==null&&Lr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Pr(s,h),v=Pr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{W=i,E.p=r,T.T=n}}e.current=t,X=2}}function zu(){if(X===2){X=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{cl(e,t.alternate,t)}finally{W=i,E.p=r,T.T=n}}X=3}}function Bu(){if(X===4||X===3){X=0,Pe();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?X=5:(X=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(iu=null),ft(n),t=t.stateNode,Ge&&typeof Ge.onCommitFiberRoot==`function`)try{Ge.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=T.T,i=E.p,E.p=2,T.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{T.T=t,E.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ga(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(X!==5)return!1;var e=au,t=cu;cu=0;var n=ft(su),r=T.T,i=E.p;try{E.p=32>n?32:n,T.T=null,n=lu,lu=null;var a=au,o=su;if(X=0,ou=au=null,su=0,W&6)throw Error(s(331));var c=W;if(W|=4,Il(a.current),Ol(a,a.current,o,n),W=c,id(0,!1),Ge&&typeof Ge.onPostCommitFiberRoot==`function`)try{Ge.onPostCommitFiberRoot(We,a)}catch{}return!0}finally{E.p=i,T.T=r,Vu(e,t)}}function Wu(e,t,n){t=Di(n,t),t=rc(e.stateNode,t,2),e=Za(e,t,2),e!==null&&(ot(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(iu===null||!iu.has(r))){e=Di(n,e),n=ic(2),r=Za(t,n,2),r!==null&&(ac(n,r,t,e),ot(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Wl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Fe()-eu?!(W&2)&&Su(e,0):Jl|=n,Xl===q&&(Xl=0)),rd(e)}function qu(e,t){t===0&&(t=it()),e=fi(e,t),e!==null&&(ot(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return je(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=q,a=tt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||nt(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Fe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}X!==0&&X!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=rt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=tt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||nt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),ft(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=cd.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=q;return r=tt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){W&6?je(Le,ad):od()})}function dd(){if(nd===0){var e=ya;e===0&&(e=Ze,Ze<<=1,!(Ze&261888)&&(Ze=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:cn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[_t]||null).action),o=r.submitter;o&&(t=(t=o[_t]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new An(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);ks(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),ks(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ri.length;hd++){var gd=ri[hd];ii(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ii(Yr,`onAnimationEnd`),ii(Xr,`onAnimationIteration`),ii(Zr,`onAnimationStart`),ii(`dblclick`,`onDoubleClick`),ii(`focusin`,`onFocus`),ii(`focusout`,`onBlur`),ii(Qr,`onTransitionRun`),ii($r,`onTransitionStart`),ii(ei,`onTransitionCancel`),ii(ti,`onTransitionEnd`),Mt(`onMouseEnter`,[`mouseout`,`mouseover`]),Mt(`onMouseLeave`,[`mouseout`,`mouseover`]),Mt(`onPointerEnter`,[`pointerout`,`pointerover`]),Mt(`onPointerLeave`,[`pointerout`,`pointerover`]),jt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),jt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),jt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),jt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),jt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),jt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ai(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ai(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[yt];n===void 0&&(n=t[yt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,kt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!yn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=Tt(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}gn(function(){var r=a,i=dn(n),o=[];a:{var s=ni.get(e);if(s!==void 0){var c=An,u=e;switch(e){case`keypress`:if(Tn(n)===0)break a;case`keydown`:case`keyup`:c=Jn;break;case`focusin`:u=`focus`,c=zn;break;case`focusout`:u=`blur`,c=zn;break;case`beforeblur`:case`afterblur`:c=zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Ln;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=Rn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Xn;break;case Yr:case Xr:case Zr:c=Bn;break;case ti:c=Zn;break;case`scroll`:case`scrollend`:c=Mn;break;case`wheel`:c=Qn;break;case`copy`:case`cut`:case`paste`:c=Vn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Yn;break;case`toggle`:case`beforetoggle`:c=$n}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=_n(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==un&&(u=n.relatedTarget||n.fromElement)&&(Tt(u)||u[vt]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?Tt(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=Ln,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Yn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:Dt(c),h=u==null?s:Dt(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,Tt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?Dt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=yr;else if(pr(s))if(br)v=kr;else{v=Dr;var y=Er}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&an(r.elementType)&&(v=yr):v=Or;if(v&&=v(e,r)){mr(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Xt(s,`number`,s.value)}switch(y=r?Dt(r):window,e){case`focusin`:(pr(y)||y.contentEditable===`true`)&&(zr=y,Br=r,Vr=null);break;case`focusout`:Vr=Br=zr=null;break;case`mousedown`:Hr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Hr=!1,Ur(o,n,i);break;case`selectionchange`:if(Rr)break;case`keydown`:case`keyup`:Ur(o,n,i)}var b;if(tr)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else lr?sr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(ir&&n.locale!==`ko`&&(lr||x!==`onCompositionStart`?x===`onCompositionEnd`&&lr&&(b=wn()):(xn=i,Sn=`value`in xn?xn.value:xn.textContent,lr=!0)),y=Ed(r,x),0<y.length&&(x=new Hn(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=cr(n),b!==null&&(x.data=b)))),(b=rr?ur(e,n):dr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Hn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=_n(e,n),i!=null&&r.unshift(Td(e,i,a)),i=_n(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=_n(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=_n(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||en(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&en(e,``+r);break;case`className`:Rt(e,`class`,r);break;case`tabIndex`:Rt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Rt(e,n,r);break;case`style`:rn(e,r,a);break;case`data`:if(t!==`object`){Rt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=cn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Lt(e,`popover`,r);break;case`xlinkActuate`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Lt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=on.get(n)||n,Lt(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:rn(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?en(e,r):(typeof r==`number`||typeof r==`bigint`)&&en(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!At.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[_t]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Lt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}Yt(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Zt(e,!!r,n,!0):Zt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}$t(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(an(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Jt(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Zt(e,!!n,n?[]:``,!1):Zt(e,!!n,t,!0)):Zt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}Qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(an(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),wt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[Ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);wt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=E.d;E.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Et(e);t!==null&&t.tag===5&&t.type===`form`?js(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=qt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),k(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+qt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+qt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+qt(n.imageSizes)+`"]`)):i+=`[href="`+qt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),k(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+qt(r)+`"][href="`+qt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),k(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Ot(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);k(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),k(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),k(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=_e.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Ot(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=Ot(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Ot(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+qt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),k(t),e.head.appendChild(t))}function Pf(e){return`[src="`+qt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+qt(n.href)+`"]`);if(r)return t.instance=r,k(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),k(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,k(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),k(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,k(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),k(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ct]||a[gt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,k(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),k(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:de,_currentValue2:de,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=at(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=at(0),this.hiddenUpdates=at(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=_i(3,null,null,t),e.current=a,a.stateNode=e,t=ha(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ja(a),e}function tp(e){return e?(e=hi,e):hi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Xa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Za(e,r,t),n!==null&&(hu(n,e,t),Qa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=fi(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=dt(t);var n=fi(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=2,up(e,t,n,r)}finally{E.p=a,T.T=i}}function lp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=8,up(e,t,n,r)}finally{E.p=a,T.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Et(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=et(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-qe(o);s.entanglements[1]|=c,o&=~c}rd(a),!(W&6)&&(nu=Fe()+500,id(0,!1))}}break;case 31:case 13:s=fi(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=dn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Tt(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Et(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Tt(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);un=r,n.target.dispatchEvent(r),un=null}else return t=Et(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Et(n);a!==null&&(e.splice(t,3),t-=3,ks(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[_t]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[_t]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[vt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=pt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.5`)throw Error(s(527,Lp,`19.2.5`));E.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.5`,rendererPackageName:`react-dom`,currentDispatcherRef:T,reconcilerVersion:`19.2.5`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{We=zp.inject(Rp),Ge=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Qs,a=$s,o=ec;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[vt]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=n(),u=c(),d=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),f=e(((e,t)=>{t.exports=d()}))();function p(){return(0,f.jsx)(`div`,{className:`mockup`,children:(0,f.jsxs)(`div`,{className:`mock-chat`,children:[(0,f.jsxs)(`div`,{className:`mock-sidebar`,children:[(0,f.jsx)(`div`,{className:`mock-sidebar-header`,children:(0,f.jsx)(`span`,{className:`mock-btn-new`,children:`+ New Chat`})}),(0,f.jsx)(`div`,{className:`mock-thread active`,children:`Meeting prep - Barbara Ann`}),(0,f.jsx)(`div`,{className:`mock-thread`,children:`Nzymes campaign review`}),(0,f.jsx)(`div`,{className:`mock-thread`,children:`Eddie's inbox check`})]}),(0,f.jsxs)(`div`,{className:`mock-main`,children:[(0,f.jsxs)(`div`,{className:`mock-tabs`,children:[(0,f.jsx)(`span`,{className:`mock-tab active`,children:`Chat`}),(0,f.jsxs)(`span`,{className:`mock-tab`,children:[`Email `,(0,f.jsx)(`span`,{className:`mock-badge`,children:`12`})]}),(0,f.jsxs)(`span`,{className:`mock-tab`,children:[`Meetings `,(0,f.jsx)(`span`,{className:`mock-badge`,children:`3`})]})]}),(0,f.jsxs)(`div`,{className:`mock-messages`,children:[(0,f.jsx)(`div`,{className:`mock-msg user`,children:`What's on my calendar tomorrow?`}),(0,f.jsx)(`div`,{className:`mock-tool`,children:`get_calendar_events`}),(0,f.jsxs)(`div`,{className:`mock-msg assistant`,children:[`You have 3 meetings tomorrow: `,(0,f.jsx)(`br`,{}),`- 9:00 AM - Team standup`,(0,f.jsx)(`br`,{}),`- 11:00 AM - Barbara Ann (client call)`,(0,f.jsx)(`br`,{}),`- 2:00 PM - Nzymes ad review with Eddie`]}),(0,f.jsx)(`div`,{className:`mock-msg user`,children:`Draft a prep email to Barbara Ann about tomorrow's call`}),(0,f.jsx)(`div`,{className:`mock-tool`,children:`search_emails`}),(0,f.jsx)(`div`,{className:`mock-tool`,children:`search_recording_by_event`}),(0,f.jsx)(`div`,{className:`mock-msg assistant`,children:`Here's a draft based on your last meeting notes and recent emails...`})]}),(0,f.jsxs)(`div`,{className:`mock-input`,children:[(0,f.jsx)(`span`,{children:`Type a message...`}),(0,f.jsx)(`span`,{className:`mock-send`,children:`Send`})]})]})]})})}function m(){return(0,f.jsx)(`div`,{className:`mockup`,children:(0,f.jsxs)(`div`,{className:`mock-triage`,children:[(0,f.jsxs)(`div`,{className:`mock-triage-header`,children:[(0,f.jsx)(`span`,{className:`mock-triage-count`,children:`Email 3 of 28`}),(0,f.jsxs)(`div`,{className:`mock-triage-actions`,children:[(0,f.jsx)(`span`,{className:`mock-btn`,children:`Archive`}),(0,f.jsx)(`span`,{className:`mock-btn primary`,children:`Next`})]})]}),(0,f.jsxs)(`div`,{className:`mock-email`,children:[(0,f.jsxs)(`div`,{className:`mock-email-meta`,children:[(0,f.jsx)(`strong`,{children:`Sarah Chen`}),` <sarah@nzymes.com>`,(0,f.jsx)(`span`,{className:`mock-email-date`,children:`Today, 2:34 PM`})]}),(0,f.jsx)(`div`,{className:`mock-email-subject`,children:`Re: Q2 campaign budget approval`}),(0,f.jsxs)(`div`,{className:`mock-email-summary`,children:[(0,f.jsx)(`span`,{className:`mock-ai-tag`,children:`AI Summary`}),`Sarah is asking for approval on the revised Q2 budget. She's increased the social spend by 15% based on last month's performance. Needs a response by Friday.`]}),(0,f.jsxs)(`div`,{className:`mock-email-body`,children:[`Hi Will,`,(0,f.jsx)(`br`,{}),(0,f.jsx)(`br`,{}),`Following up on our call yesterday - I've attached the revised Q2 budget with the changes we discussed. Main update is the 15% increase to social...`,(0,f.jsx)(`br`,{}),(0,f.jsx)(`br`,{}),(0,f.jsx)(`span`,{className:`mock-faded`,children:`[ full email body ]`})]}),(0,f.jsxs)(`div`,{className:`mock-email-context`,children:[(0,f.jsx)(`span`,{className:`mock-context-tag`,children:`Last meeting: Apr 8 - Q2 Planning`}),(0,f.jsx)(`span`,{className:`mock-context-tag`,children:`4 emails this week`})]})]}),(0,f.jsxs)(`div`,{className:`mock-email-chat`,children:[(0,f.jsx)(`div`,{className:`mock-msg assistant`,children:`This needs a response - Sarah is waiting on budget approval. Want me to draft a reply?`}),(0,f.jsxs)(`div`,{className:`mock-input`,children:[(0,f.jsx)(`span`,{children:`Ask about this email...`}),(0,f.jsx)(`span`,{className:`mock-send`,children:`Send`})]})]})]})})}function h(){return(0,f.jsx)(`div`,{className:`mockup`,children:(0,f.jsxs)(`div`,{className:`mock-meeting`,children:[(0,f.jsxs)(`div`,{className:`mock-meeting-header`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`div`,{className:`mock-meeting-name`,children:`Built for me w/ Brandon Douglas & DigitalWill`}),(0,f.jsx)(`div`,{className:`mock-meeting-meta`,children:`Apr 09 at 3:12 PM - 4 attendees - 1 of 6`})]}),(0,f.jsx)(`span`,{className:`mock-btn primary`,children:`Done - Next Meeting`})]}),(0,f.jsxs)(`div`,{className:`mock-meeting-body`,children:[(0,f.jsx)(`div`,{className:`mock-tasks-header`,children:`Action Items`}),(0,f.jsxs)(`div`,{className:`mock-task`,children:[(0,f.jsx)(`span`,{className:`mock-task-title`,children:`Send payment link to Brandon`}),(0,f.jsxs)(`span`,{className:`mock-task-actions`,children:[(0,f.jsx)(`span`,{className:`mock-btn small`,children:`Triage Now`}),(0,f.jsx)(`span`,{className:`mock-btn small outline`,children:`Report`})]})]}),(0,f.jsxs)(`div`,{className:`mock-task`,children:[(0,f.jsx)(`span`,{className:`mock-task-title`,children:`Find and activate pond aquatics sales and pond aquatics service campaigns`}),(0,f.jsxs)(`span`,{className:`mock-task-actions`,children:[(0,f.jsx)(`span`,{className:`mock-btn small`,children:`Triage Now`}),(0,f.jsx)(`span`,{className:`mock-btn small outline`,children:`Report`})]})]}),(0,f.jsxs)(`div`,{className:`mock-task`,children:[(0,f.jsx)(`span`,{className:`mock-task-title`,children:`Put notes about pond campaigns that need to be found and activated`}),(0,f.jsxs)(`span`,{className:`mock-task-actions`,children:[(0,f.jsx)(`span`,{className:`mock-btn small`,children:`Triage Now`}),(0,f.jsx)(`span`,{className:`mock-btn small outline`,children:`Report`})]})]}),(0,f.jsxs)(`div`,{className:`mock-task`,children:[(0,f.jsx)(`span`,{className:`mock-task-title`,children:`Set shopping campaigns location targeting to 50 miles radius`}),(0,f.jsxs)(`span`,{className:`mock-task-actions`,children:[(0,f.jsx)(`span`,{className:`mock-btn small`,children:`Triage Now`}),(0,f.jsx)(`span`,{className:`mock-btn small outline`,children:`Report`})]})]})]}),(0,f.jsx)(`div`,{className:`mock-email-chat`,children:(0,f.jsxs)(`div`,{className:`mock-input`,children:[(0,f.jsx)(`span`,{children:`Ask about this meeting...`}),(0,f.jsx)(`span`,{className:`mock-send`,children:`Send`})]})})]})})}function g({annotations:e,onBack:t,backLabel:n}){return(0,f.jsxs)(`div`,{className:`code-view`,children:[(0,f.jsxs)(`div`,{className:`code-header`,children:[(0,f.jsxs)(`a`,{className:`code-back`,onClick:t,children:[`← `,n]}),(0,f.jsxs)(`h1`,{children:[`Code: `,e.file]})]}),e.sections.map((e,t)=>(0,f.jsxs)(`div`,{className:`code-section`,children:[(0,f.jsx)(`div`,{className:`code-section-title`,children:e.title}),(0,f.jsxs)(`div`,{className:`code-columns`,children:[(0,f.jsx)(`div`,{className:`code-right`,children:(0,f.jsx)(`p`,{children:e.explanation})}),(0,f.jsx)(`div`,{className:`code-left`,children:(0,f.jsx)(`pre`,{children:(0,f.jsx)(`code`,{children:e.code})})})]})]},t))]})}var _={file:`src/email/pipeline.rs`,sections:[{title:`Blacklist filter - checking user-defined rules`,code:`pub fn check_blacklist(rules: &[EmailFilterRule], sender: &str, subject: &str) -> Option<String> {
    let sender_lower = sender.to_lowercase();
    let subject_lower = subject.to_lowercase();
    let sender_domain = extract_email_domain(&sender_lower);

    for rule in rules {
        let value_lower = rule.value.to_lowercase();
        let matched = match rule.rule_type.as_str() {
            "sender" => {
                if sender_lower.contains(&value_lower) {
                    Some(format!("Sender '{}' matches rule: {}", sender, rule.value))
                } else { None }
            }
            "domain" => {
                sender_domain.as_ref().and_then(|domain| {
                    if domain.contains(&value_lower) {
                        Some(format!("Domain '{}' matches rule: {}", domain, rule.value))
                    } else { None }
                })
            }
            "keyword" => {
                if subject_lower.contains(&value_lower) || sender_lower.contains(&value_lower) {
                    Some(format!("Keyword '{}' found", rule.value))
                } else { None }
            }
            _ => None,
        };
        if let Some(reason) = matched { return Some(reason); }
    }
    None
}`,explanation:`First line of defense. Before we spend money calling Claude, check the email against the user's own blacklist rules. Three types: exact sender match, domain match (e.g. block everything from @noreply.github.com), and keyword match (searches both subject and sender). If any rule hits, the email is filtered immediately with the reason logged. Everything is case-insensitive.`},{title:`AI filter - Claude decides keep or filter`,code:`pub async fn ai_filter_email(
    http_client: &reqwest::Client,
    sender: &str, subject: &str, body_preview: &str,
) -> Result<Option<String>, String> {
    let truncated_body = truncate_str(body_preview, 1000);

    let prompt = format!(r#"You are an email triage assistant for a digital marketing agency owner.
Determine whether this email should be FILTERED OUT or KEPT for review.

FILTER OUT: Automated receipts, calendar invites, system notifications,
newsletters, sales pitches, social media notifications, account security
(unless suspicious), automated onboarding emails, spam.

KEEP: Direct personal messages expecting a reply, client communications,
emails where a human is asking a specific question, urgent alerts.

When in doubt, FILTER.

From: {sender}  Subject: {subject}  Body: {body}

Respond EXACTLY: KEEP or FILTER: <reason>"#);

    // ... calls Claude API non-streaming, parses response ...
    if response_text.starts_with("FILTER:") {
        Ok(Some(response_text["FILTER:".len()..].trim().to_string()))
    } else {
        Ok(None) // KEEP
    }
}`,explanation:`Second line of defense. If the blacklist didn't catch it, we ask Claude. The body is truncated to 1,000 characters to keep cost down - we don't need the full email to classify it. The prompt is tuned for Will's needs: filter receipts, calendar invites, newsletters, sales pitches. Keep real human messages that need a response. "When in doubt, FILTER" - Will would rather miss a newsletter than get buried in noise. This is a non-streaming call since we just need a short classification.`},{title:`Calendar context gathering`,code:`pub async fn gather_context(
    http_client: &reqwest::Client,
    user_access_token: &str,
    sender_email: &str,
) -> String {
    let now = chrono::Utc::now();
    let thirty_days_ago = now - chrono::Duration::days(30);

    let calendar_client = CalendarClient::new(http_client.clone(), user_access_token.to_string());

    let result = calendar_client.list_events(
        "primary",
        Some(&time_min), Some(&time_max),
        Some(&email_addr),  // searches by attendee email
        5,                   // max 5 recent meetings
        None,
    ).await;

    match result {
        Err(_) => String::new(),  // fail silently - never block on optional enrichment
        Ok(events) => events.iter().map(|event| {
            format!("- Meeting: '{}' on {}", event.summary, event.start_date)
        }).collect::<Vec<_>>().join("\\n")
    }
}`,explanation:`Before generating the AI summary, we look up the last 30 days of calendar events involving the email sender. This gives Claude context like "you met with this person last week about Q2 Planning." If the Calendar API fails, we return an empty string and summarize without context - we never block the pipeline on optional enrichment. Limited to 5 events to keep the context concise.`},{title:`AI summary generation`,code:`pub async fn ai_summarize_email(
    http_client: &reqwest::Client,
    sender: &str, subject: &str, body: &str, context: &str,
) -> Result<String, String> {
    let truncated_body = truncate_str(body, 3000);

    let context_section = if context.is_empty() {
        String::new()
    } else {
        format!("\\nContext about the sender:\\n{}", context)
    };

    let prompt = format!(r#"Summarize this email in 1-2 sentences.
Focus on what the sender wants and any action required.{context_section}

From: {sender}  Subject: {subject}  Body: {body}

Summary (1-2 sentences):"#);

    // ... calls Claude API, returns summary text ...
}`,explanation:`For emails that survive both filters, we generate a 1-2 sentence summary. The body gets 3,000 characters (more than the filter step) because we need enough content to write a good summary. The calendar context is injected if available. The prompt asks for action-oriented summaries - "what does the sender want" and "what action is required" - because the whole point is helping Will decide what to do with each email quickly.`},{title:`Main pipeline orchestrator`,code:`pub async fn process_email(
    app_state: &AppState, user_id: i32, user_access_token: &str,
    gmail_message: &GmailMessage, filter_rules: &[EmailFilterRule],
) -> Result<Option<i32>, String> {
    // 1. Skip if already in queue (free DB check)
    if database::email_exists_in_queue(&mut conn, gmail_message_id, user_id)? {
        return Ok(None);
    }

    // 2. Parse the raw Gmail message
    let parsed = parse_email(gmail_message);

    // 3. Check blacklist rules (free, instant)
    if let Some(reason) = check_blacklist(filter_rules, sender, subject) {
        database::insert_email_queue_entry(/* filtered_out=true */)?;
        return Ok(Some(id));
    }

    // 4. Ask Claude to classify (costs ~$0.001, takes ~1s)
    if let Ok(Some(reason)) = ai_filter_email(/* ... */).await {
        database::insert_email_queue_entry(/* filtered_out=true */)?;
        return Ok(Some(id));
    }

    // 5. Gather calendar context (free, may fail silently)
    let context = gather_context(/* ... */).await;

    // 6. Generate AI summary (costs ~$0.001, takes ~1s)
    let ai_summary = ai_summarize_email(/* ... */).await.ok();

    // 7. Store the kept email with its summary
    database::insert_email_queue_entry(/* filtered_out=false, ai_summary */)?;
    Ok(Some(id))
}`,explanation:`The orchestrator runs the full pipeline for a single email. The order is deliberate: cheapest checks first. (1) Skip duplicates. (2) Parse. (3) Run blacklist rules (free). (4) Only if blacklist passed, call Claude to classify (~$0.001). (5) Only if kept, gather calendar context. (6) Only if kept, generate summary. Each filter step short-circuits - if filtered at step 3, we never pay for steps 4-6. A kept email costs two Claude calls (filter + summarize), a blacklisted one costs zero.`}]},v={file:`src/email/polling.rs`,sections:[{title:`Background polling loop`,code:`pub fn start_polling_task(app_state: AppState, poll_interval_secs: u64) {
    tokio::spawn(async move {
        let interval = tokio::time::Duration::from_secs(poll_interval_secs);
        loop {
            match poll_all_users(&app_state).await {
                Ok(user_count) => { /* log success */ }
                Err(e) => { /* log error, continue */ }
            }
            tokio::time::sleep(interval).await;
        }
    });
}`,explanation:`Spawns a tokio task that runs forever. Every poll_interval_secs (120 seconds), it wakes up and polls all users. This is the development stopgap - in production, Gmail webhooks will trigger processing immediately. The loop never panics - errors are logged and the next cycle continues.`},{title:`Per-user email fetch and deduplication`,code:`pub async fn poll_user_emails(/* ... */) -> Result<(), String> {
    let access_token = get_valid_access_token(app_state, user_id).await?;
    let gmail = GmailClient::new(app_state.reqwest_client.clone(), access_token);

    let message_list = gmail
        .list_messages_by_labels(&["INBOX", "UNREAD"], None, 20)
        .await?;

    let filter_rules = database::list_email_filter_rules(&mut conn, user_id)?;

    // Deduplicate by thread: only process newest message per thread
    let mut seen_threads: HashSet<String> = HashSet::new();
    let mut new_message_ids: Vec<String> = Vec::new();
    for msg_ref in &message_list.messages {
        if seen_threads.contains(&msg_ref.thread_id) { continue; }
        seen_threads.insert(msg_ref.thread_id.clone());

        if !database::email_exists_in_queue(&mut conn, &msg_ref.id, user_id)?
           && !database::email_thread_exists_in_queue(&mut conn, &msg_ref.thread_id, user_id)? {
            new_message_ids.push(msg_ref.id.clone());
        }
    }

    for message_id in &new_message_ids {
        let full_msg = gmail.get_message(message_id).await?;
        pipeline::process_email(app_state, user_id, &access_token, &full_msg, &filter_rules).await;
    }
    Ok(())
}`,explanation:`Fetches up to 20 unread inbox messages, then deduplicates by thread - if a thread has multiple unread messages, only the newest one gets processed. Also checks if the thread is already in the queue. This deduplication matters because Gmail returns individual messages but users think in threads. Without it, a 5-message email thread would show up as 5 separate items in the triage queue.`}]},y={file:`src/chat/chat_endpoint.rs`,sections:[{title:`System prompt - injecting user context`,code:`let system_prompt = format!(
    "{base_prompt}\\n\\nUser context:\\n     - Name: {name}\\n     - Email: {email}\\n     - Timezone: {tz}\\n     - Local time: {local_time}",
    base_prompt = SYSTEM_PROMPT,
    name = user.name,
    email = user.email,
    tz = request.user_timezone,
    local_time = request.user_local_time,
);`,explanation:`Every chat request gets a system prompt with the user's name, email, timezone, and current local time injected. This is how Claude knows what 'today' and 'this week' mean - without it, date calculations would use UTC and be wrong for US timezones. The base prompt includes instructions for email confirmation, calendar handling, recording search strategy, and Chad Ads conversation management.`},{title:`The tool execution loop (max 50 iterations)`,code:`let max_iterations = 50;
for iteration in 0..max_iterations {
    let result = claude.stream_response(&api_messages, &system_prompt, &tool_defs, &tx).await?;

    // Accumulate text and send to UI via SSE
    for block in &result.content_blocks {
        if let ContentStreamBlock::Text(text) = block {
            accumulated_text.push_str(text);
        }
    }

    // If no tool calls, we're done
    if result.tool_calls.is_empty() { break; }

    // Execute each tool with timeout
    for tc in &result.tool_calls {
        let timeout = if tc.name == "ask_chad_ads" { 1800 } else { 300 };
        let tool_result = tokio::time::timeout(
            Duration::from_secs(timeout),
            executor.execute(&tc.id, &tc.name, tc.input.clone()),
        ).await;
        // Add result back to message history
    }

    // Save progress to DB after each iteration
    save_assistant_message(&mut conn, thread_id, &accumulated_text).await;
}`,explanation:`The core loop: send messages to Claude, get back text and tool calls, execute tools, feed results back, repeat. Max 50 iterations prevents infinite loops. Tool timeout is 300 seconds by default, but Chad Ads gets 1800 seconds (30 minutes) because Google Ads queries can be slow. After each iteration, the assistant's accumulated text is saved to the database so the user sees progress even if the connection drops. The loop ends when Claude stops calling tools.`},{title:`SSE streaming to the browser`,code:`pub async fn chat_stream(/* ... */) -> Sse<impl Stream<Item = ...>> {
    // start_generation spawns two tasks:
    // 1. The generation task (tool loop above)
    // 2. A relay task that forwards events to SSE

    let (tx, _) = tokio::sync::broadcast::channel(256);

    // Generation task sends events: Text, ToolCall, ToolResult, ToolProgress, Done
    // Browser receives them as SSE events and renders in real-time

    Sse::new(BroadcastStream::new(rx).map(|event| {
        Ok(Event::default().event(event_type_str(&event)).data(event_data(&event)))
    }))
}`,explanation:`The endpoint returns a Server-Sent Events stream. Two async tasks run: one does the Claude loop and tool execution, the other relays events to the browser. Event types include text (Claude's words appearing), tool_call (which tool is being called), tool_result (what the tool returned), tool_progress (long-running tool updates), and done. The browser renders these in real-time so the user sees Claude thinking and acting.`},{title:`Stream lifecycle management`,code:`pub async fn start_generation(
    app_state: &AppState, user_id: i32, thread_id: i32,
    messages: Vec<UiChatMessage>, user_local_time: String, user_timezone: String,
) -> Result<String, String> {
    // Creates a broadcast channel, spawns the generation task
    // Stores the sender in a global HashMap keyed by stream_id
    // Returns the stream_id for the client to subscribe with
}

pub async fn subscribe_stream(
    State(app_state): State<AppState>,
    Query(params): Query<SubscribeParams>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    // Looks up the broadcast sender by stream_id
    // Creates a new receiver and wraps it as an SSE stream
    // Supports reconnection - if the browser drops, it can re-subscribe
}

pub async fn stop_stream(
    State(app_state): State<AppState>,
    Json(params): Json<StopParams>,
) -> impl IntoResponse {
    // Sends a cancel signal to the generation task via the broadcast channel
    // The generation loop checks for cancellation between tool calls
    // Gracefully stops without losing already-generated text
}

pub async fn active_streams(
    State(app_state): State<AppState>,
) -> impl IntoResponse {
    // Returns list of currently active stream_ids
    // Used by the UI on page load to re-subscribe to in-progress generations
    // Prevents "lost" streams when the user refreshes mid-generation
}`,explanation:`The stream lifecycle has four phases: start_generation kicks off the Claude loop and returns a stream_id. subscribe_stream connects the browser to that stream via SSE. stop_stream sends a cancellation signal for the stop button. active_streams lets the UI recover from page refreshes by finding any in-progress generations for the current thread. The broadcast channel pattern means multiple subscribers can connect (useful for reconnection).`}]},b={file:`src/chat/tool_executor.rs`,sections:[{title:`Tool dispatch and scope checking`,code:`impl ToolExecutor {
    pub async fn execute(&self, id: &str, name: &str, input: Value) -> ToolResult {
        match name {
            "search_emails" => { let client = self.get_gmail_client().await?; /* ... */ }
            "send_email"    => { let client = self.get_gmail_send_client().await?; /* ... */ }
            "get_calendar_events" => { let client = self.get_calendar_client().await?; /* ... */ }
            "list_tasks"    => { let client = self.get_tasks_client().await?; /* ... */ }
            "ask_chad_ads"  => { let client = self.get_chad_ads_client().await?; /* ... */ }
            // ... 30+ more tools ...
            _ => ToolResult::error(format!("Unknown tool: {}", name)),
        }
    }

    async fn get_gmail_send_client(&self) -> Result<GmailClient, ToolResult> {
        // Check that user has granted gmail.send scope
        let tokens = database::get_google_tokens(&mut conn, self.user_id)?;
        if !tokens.scopes.contains("gmail.send") {
            return Err(ToolResult::error("Missing gmail.send scope - ask user to authorize"));
        }
        let token = refresh_access_token(app_state, self.user_id).await?;
        Ok(GmailClient::new(self.http_client.clone(), token))
    }
}`,explanation:`The dispatcher routes tool calls by name to the right handler. Before executing, each client getter validates OAuth scopes - if the user hasn't granted gmail.send, Claude gets a clear error message telling it to ask the user to authorize. This prevents cryptic 403 errors from Google. The access token is refreshed before every call (proactive, not reactive). Output is truncated at 256KB to prevent context overflow.`},{title:`ToolResult constructors`,code:`impl ToolResult {
    pub fn success(content: String) -> ToolResult {
        // Creates a successful tool result with the given content
        // Returned to Claude as the tool's output
    }

    pub fn success_truncated(content: String) -> ToolResult {
        // Like success but truncates content to 256KB
        // Prevents context window overflow from large tool outputs
        // Used by search_emails, get_email_thread, and other tools
        // that can return unbounded amounts of data
    }

    pub fn error(message: String) -> ToolResult {
        // Creates an error tool result
        // Claude sees this as a tool failure and can react accordingly
        // Used for scope errors, missing permissions, invalid inputs
    }
}`,explanation:`Three constructors for tool results. success returns the raw output. success_truncated caps at 256KB to prevent context overflow - critical for tools like email search that can return megabytes of data. error gives Claude a clear failure message it can act on (e.g., 'Missing gmail.send scope - ask user to authorize'). Every tool handler returns one of these three.`}]},x={file:`src/chat/claude_client.rs`,sections:[{title:`Request construction with advisor and web search`,code:`pub async fn stream_response(&self, messages: &[ApiMessage], system: &str,
    tool_defs: &[ToolDefinition], tx: &Sender<StreamEvent>
) -> Result<StreamResult, String> {
    let mut tools: Vec<Value> = tool_defs.iter().map(/* serialize */).collect();

    // Add web search server tool (max 5 searches per response)
    tools.push(json!({
        "type": "web_search_20250305",
        "name": "web_search",
        "max_uses": 5
    }));

    // Add advisor server tool (Claude Opus for hard questions, max 3 uses)
    tools.push(json!({
        "type": "advisor_20260301",
        "name": "advisor",
        "model": "claude-opus-4-6",
        "max_uses": 3,
        "cache_control": { "type": "ephemeral" }  // 5-minute TTL
    }));

    let request = json!({
        "model": "claude-sonnet-4-6",
        "max_tokens": 16384,
        "system": system,
        "tools": tools,
        "messages": messages,
        "stream": true
    });
    // ... sends request, processes SSE stream ...
}`,explanation:`Builds the API request with three types of tools: (1) custom tools like Gmail/Calendar/Tasks that the ToolExecutor handles, (2) web search (up to 5 searches per response for looking up current information), and (3) an advisor tool that escalates hard questions to Claude Opus (up to 3 uses, with ephemeral caching so repeated similar questions are cheap). The main model is Sonnet for speed, Opus for depth when needed.`},{title:`Message format conversion`,code:`pub fn ui_messages_to_api(ui_messages: &[UiChatMessage]) -> Vec<ApiMessage> {
    // Converts frontend message format to Claude API format
    // UiChatMessage has role + Vec<UiContentBlock> (Text, Image)
    // ApiMessage has role + Vec<ContentBlock> (text, image with base64 + media_type)
    // Handles image blocks by converting to the API's source format
    // Filters out empty text blocks to avoid API validation errors
}`,explanation:`Bridge between the frontend's message representation and the Claude API's expected format. The UI stores messages as UiChatMessage with content blocks that can be text or images (from paste). This function converts them to the API's format where images need a source object with type, media_type, and base64 data. Empty text blocks are filtered out because the API rejects them.`}]},ee={file:`src/meetings/pipeline.rs`,sections:[{title:`Main pipeline - processing a recording`,code:`pub async fn process_recording(
    app_state: &AppState, user_id: i32, user_email: &str,
    user_name: &str, recording: &Recording,
) -> Result<Option<i32>, String> {
    // Skip if already processed
    if database::meeting_exists_in_queue(&mut conn, recording_id, user_id)? {
        return Ok(None);
    }

    // Fetch transcript from recording service
    let transcript_response = recorder.get_transcript(recording_id).await?;
    if transcript_response.segments.is_empty() { return Ok(None); }

    // Format transcript as "Speaker: text" lines
    let transcript_lines: Vec<String> = transcript_response.segments.iter()
        .filter_map(|seg| {
            let text = seg.text.as_deref()?.trim();
            if text.is_empty() { return None; }
            Some(format!("{}: {}", seg.speaker.as_deref().unwrap_or("Unknown"), text))
        }).collect();

    // Extract tasks using Barbara Ann (Claude + full tool access)
    let extracted_tasks = extract_tasks(
        app_state, user_id, user_email, user_name,
        meeting_name, &transcript_text, &attendees,
    ).await;

    // Store meeting + draft tasks in database
    let meeting_id = database::insert_meeting_queue_entry(/* ... */)?;
    for task in &tasks {
        database::insert_meeting_draft_task(&mut conn, meeting_id, &task.title,
            task.suggested_assignee.as_deref(), task.assignee_email.as_deref())?;
    }
    Ok(Some(meeting_id))
}`,explanation:`Processes one recording through the full pipeline: skip duplicates, fetch the transcript, format it with speaker labels, run Barbara Ann to extract tasks, then store everything. The transcript is formatted as simple "Speaker: text" lines because that's what Claude needs to understand who said what. Empty segments are filtered out. If the transcript is empty (recording with no speech), the recording is skipped entirely.`},{title:`Barbara Ann - AI task extraction with tool access`,code:`async fn extract_tasks(
    app_state: &AppState, user_id: i32, user_email: &str, user_name: &str,
    meeting_name: &str, transcript: &str, attendees: &[String],
) -> Result<Vec<ExtractedTask>, String> {
    let claude = ClaudeClient::new()?;

    let tool_defs = tools::tool_definitions(true); // full tool access
    let executor = ToolExecutor::new(
        app_state.clone(), user_id, auth_token, true, tx,
        "America/New_York".to_string(),  // default timezone for background work
        user_email.to_string(),
        chrono::Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string(),
    );

    let system_prompt = "You are Barbara Ann, an executive assistant for Digital Will.
You are analyzing a meeting transcript to extract actionable tasks.
You have access to tools - use them to look up context:
- Search emails for prior conversations with participants
- Check the calendar for related events

Your final message MUST end with a JSON array:
[{\\"title\\": \\"..\\", \\"suggested_assignee\\": \\"..\\", \\"assignee_email\\": \\"..\\"}]";

    let mut api_messages = vec![ApiMessage { role: "user", content: user_message }];

    // Barbara Ann gets up to 10 iterations to gather context and extract tasks
    for iteration in 0..10 {
        let result = claude.stream_response(&api_messages, &system_prompt, &tool_defs, &tx).await?;

        for block in &result.content_blocks {
            if let ContentStreamBlock::Text(text) = block { final_text.push_str(text); }
        }

        if result.tool_calls.is_empty() { break; }  // done gathering context

        // Execute tools (email search, calendar lookup, etc.)
        for tc in &result.tool_calls {
            let tool_result = executor.execute(&tc.id, &tc.name, tc.input.clone()).await;
            // feed results back to Claude
        }
        final_text.clear();  // we want the LAST response, not accumulated
    }

    // Parse JSON array from Barbara Ann's final response
    let tasks: Vec<ExtractedTask> = serde_json::from_str(&extract_json_array(&final_text)?)?;
    Ok(tasks)
}`,explanation:`Barbara Ann is a full Claude instance with access to ALL the same tools as the chat interface - Gmail, Calendar, Recordings, Tasks. She gets up to 10 iterations to gather context before extracting tasks. A typical flow: she reads the transcript, searches emails for context about the client, checks the calendar for upcoming meetings, then produces a JSON array of tasks with suggested assignees. The transcript is truncated to 30KB to stay within context limits. The JSON extraction handles both markdown code blocks and raw arrays.`}]},S={file:`src/meetings/polling.rs`,sections:[{title:`Polling loop with seed mode`,code:`pub fn start_polling_task(app_state: AppState, poll_interval_secs: u64) {
    tokio::spawn(async move {
        let interval = tokio::time::Duration::from_secs(poll_interval_secs);
        let mut first_poll = true;

        loop {
            let seed_mode = first_poll;
            poll_all_users(&app_state, seed_mode).await;
            first_poll = false;
            tokio::time::sleep(interval).await;
        }
    });
}`,explanation:`Similar to email polling but with a seed mode twist: the first poll only fetches 3 recordings per user (to avoid processing a huge backlog on startup), subsequent polls fetch 10. This is the development stopgap - webhooks from the recording service will replace this.`},{title:`Poll all users for new recordings`,code:`pub async fn poll_all_users(app_state: &AppState, seed_mode: bool) -> Result<usize, String> {
    // Iterates all users with stored Google tokens
    // Calls poll_user_meetings for each user
    // Returns count of users polled
    // Errors on individual users don't abort the loop
}`,explanation:`Top-level orchestrator called by the polling loop. Loads all users from the database, iterates through each one, and calls poll_user_meetings. Individual user failures are logged but don't stop processing - if Eddie's account has an expired token, Reileigh's recordings still get processed. Returns the count of users polled for logging.`},{title:`Per-user recording fetch`,code:`pub async fn poll_user_meetings(
    app_state: &AppState, user_id: i32, user_email: &str,
    user_name: &str, seed_mode: bool,
) -> Result<(), String> {
    let recorder = RecorderClient::new(app_state.reqwest_client.clone(), api_key);
    let limit = if seed_mode { 3 } else { 10 };

    // Search recordings where this user was a participant
    let recordings = recorder.search_by_participant(Some(user_email), None, limit, 0).await?;

    // Only process recordings that have transcripts
    let with_transcripts: Vec<_> = recordings.iter()
        .filter(|r| r.has_transcript).collect();

    // Skip recordings already in the queue
    let mut new_recordings = Vec::new();
    for recording in &with_transcripts {
        if !database::meeting_exists_in_queue(&mut conn, &recording.id, user_id)? {
            new_recordings.push(recording);
        }
    }

    // Process each new recording through the pipeline
    for recording in &new_recordings {
        pipeline::process_recording(app_state, user_id, user_email, user_name, recording).await;
    }
    Ok(())
}`,explanation:`For each user, searches recordings by participant email, filters to those with transcripts (no point processing a recording with no speech), skips any already in the queue, and sends the rest through the pipeline. The has_transcript flag from the recording service saves us from fetching transcripts that don't exist.`}]},C={file:`src/gmail/client.rs`,sections:[{title:`RFC 2822 email construction`,code:`pub fn build_rfc2822_message(
    from: &str, to: &[&str], cc: &[&str], bcc: &[&str],
    subject: &str, body: &str,
    in_reply_to: Option<&str>, references: Option<&str>,
) -> String {
    let mut headers = String::new();
    headers.push_str(&format!("From: {}\\r\\n", from));
    headers.push_str(&format!("To: {}\\r\\n", to.join(", ")));
    if !cc.is_empty() { headers.push_str(&format!("Cc: {}\\r\\n", cc.join(", "))); }
    if !bcc.is_empty() { headers.push_str(&format!("Bcc: {}\\r\\n", bcc.join(", "))); }
    headers.push_str(&format!("Subject: {}\\r\\n", subject));
    headers.push_str("MIME-Version: 1.0\\r\\n");
    headers.push_str("Content-Type: text/plain; charset=utf-8\\r\\n");

    if let Some(reply_to) = in_reply_to {
        headers.push_str(&format!("In-Reply-To: {}\\r\\n", reply_to));
    }
    if let Some(refs) = references {
        headers.push_str(&format!("References: {}\\r\\n", refs));
    }

    format!("{}\\r\\n{}", headers, body)
}`,explanation:`Builds raw email messages in RFC 2822 format - the standard that all email systems understand. The In-Reply-To and References headers are critical for threading: without them, a reply would show up as a new conversation instead of being grouped with the original thread. The message is base64url-encoded before sending to the Gmail API. This function is shared by send_email, reply_to_email, reply_all, and save_draft.`},{title:`Email body extraction from Gmail's MIME structure`,code:`pub fn extract_body(payload: &GmailPayload) -> (String, String) {
    // Try direct body first
    if let Some(body) = &payload.body {
        if let Some(data) = &body.data {
            let decoded = base64url_decode(data);
            return (decoded.clone(), decoded);
        }
    }

    // Walk multipart structure recursively
    let (plain_parts, html_parts) = extract_parts_recursive(&payload.parts);

    // Prefer text/plain over text/html
    if !plain_parts.is_empty() {
        return (plain_parts.join("\\n"), html_parts.join("\\n"));
    }
    (html_parts.join("\\n"), html_parts.join("\\n"))
}

fn extract_parts_recursive(parts: &[GmailPart]) -> (Vec<String>, Vec<String>) {
    let mut plain = Vec::new();
    let mut html = Vec::new();
    for part in parts {
        match part.mime_type.as_deref() {
            Some("text/plain") => { /* decode and collect */ }
            Some("text/html")  => { /* decode and collect */ }
            Some(t) if t.starts_with("multipart/") => {
                // Recurse into nested parts
                let (p, h) = extract_parts_recursive(&part.parts);
                plain.extend(p); html.extend(h);
            }
            _ => {}
        }
    }
    (plain, html)
}`,explanation:`Gmail stores email bodies as nested MIME structures - a single email might have a text/plain part, an HTML part, and attachments, all nested inside multipart/alternative containers. This code walks the tree recursively, collecting all text/plain and text/html parts. It prefers text/plain because that's what Claude works best with - HTML markup just adds noise. The base64url decoding handles Gmail's encoding format.`},{title:`Remaining client methods - threads, labels, category filtering`,code:`pub async fn get_thread(&self, thread_id: &str) -> Result<GmailThread, String> {
    // Fetches all messages in a thread with format=full
    // Returns them in chronological order
}

pub async fn list_messages_by_labels(
    &self, label_ids: &[&str], query: Option<&str>, max_results: u32,
) -> Result<GmailMessageList, String> {
    // Queries Gmail with label filters (INBOX, UNREAD, CATEGORY_PRIMARY, etc.)
    // Used by email polling (INBOX + UNREAD) and category search
}

pub async fn list_labels(&self) -> Result<Vec<GmailLabel>, String> {
    // Lists all Gmail labels for the user
}

pub fn parse_email(message: &GmailMessage) -> ParsedEmail {
    // Extracts From, To, Subject, Date headers + body into a clean struct
    // Single entry point for turning raw Gmail API response into readable data
}

pub fn base64url_encode(data: &str) -> String {
    // Encodes string as base64url (Gmail's format: no padding, - and _ instead of + and /)
    // Used before sending messages to Gmail API
}`,explanation:`The remaining Gmail client methods. get_thread fetches an entire email conversation. list_messages_by_labels is used by both the email polling loop (filtering to INBOX + UNREAD) and category-based searches (CATEGORY_PRIMARY, etc.). parse_email is the universal translator from Gmail's raw API format to a clean struct. base64url_encode handles Gmail's non-standard base64 variant (no padding, URL-safe characters).`},{title:`Core Gmail client methods - CRUD and helpers`,code:`impl GmailClient {
    pub fn with_user(http_client: reqwest::Client, access_token: String, user_email: String) -> Self {
        // Constructor that stores the user's email alongside the client
        // The email is used for building Gmail deep links with authuser param
    }

    pub async fn get_message(&self, message_id: &str) -> Result<GmailMessage, String> {
        // GET /gmail/v1/users/me/messages/{id}?format=full
        // Returns the full message including all headers and MIME parts
        // Used by email polling, email tools, and reply threading
    }

    pub async fn list_messages(
        &self, query: Option<&str>, max_results: u32, page_token: Option<&str>,
    ) -> Result<GmailMessageList, String> {
        // GET /gmail/v1/users/me/messages with query parameter
        // Returns message IDs and thread IDs (not full messages)
        // Supports Gmail query syntax: from:, to:, subject:, has:, etc.
    }

    pub async fn send_reply(&self, raw_message: &str, thread_id: &str) -> Result<GmailSendResponse, String> {
        // POST /gmail/v1/users/me/messages/send with threadId
        // The raw message must include In-Reply-To and References headers
        // threadId ensures Gmail groups it with the original conversation
    }

    pub async fn create_draft(
        &self, raw_message: &str, thread_id: Option<&str>,
    ) -> Result<GmailDraftResponse, String> {
        // POST /gmail/v1/users/me/drafts
        // Creates a draft without sending - safe for review
        // Optional threadId links the draft to an existing conversation
    }

    pub fn extract_header(payload: &GmailPayload, name: &str) -> String {
        // Searches the headers array for a specific header by name
        // Returns empty string if not found
        // Used for From, To, Subject, Date, Message-ID, References, etc.
    }
}`,explanation:`The core Gmail client methods. with_user is an alternate constructor that stores the user's email for link generation. get_message fetches a single message with full MIME content. list_messages does a Gmail search returning message references (lightweight - full content requires get_message per result). send_reply sends a pre-built RFC 2822 message within an existing thread. create_draft saves a message without sending. extract_header is the utility for pulling specific headers from Gmail's payload structure.`}]},te={file:`src/chat/tools/gmail.rs`,sections:[{title:`Email search with progress updates and category filtering`,code:`pub async fn search_emails(
    client: &GmailClient, query: &str, max_results: u32,
    user_email: &str, category: Option<&str>, progress: ProgressSender,
) -> ToolResult {
    send_progress(&progress, "Searching emails...").await;

    // Category filtering uses Gmail's internal label IDs, not query syntax
    let list = match category.and_then(|c| category_to_label_id(c)) {
        Some(label_id) => client.list_messages_by_labels(&[label_id], q, max_results).await,
        None => client.list_messages(q, max_results, None).await,
    };

    let total = list.messages.len();
    let mut output = format!("Found {} email(s):\\n\\n", total);

    for (i, msg_ref) in list.messages.iter().enumerate() {
        if i > 0 && i % 10 == 0 {
            send_progress(&progress, format!("Loading email {}/{}...", i + 1, total)).await;
        }
        let msg = client.get_message(&msg_ref.id).await?;
        let parsed = parse_email(&msg);
        output.push_str(&format!(
            "---\\nFrom: {}\\nSubject: {}\\nDate: {}\\nLink: {}\\n",
            parsed.from, parsed.subject, parsed.date,
            gmail_link(&parsed.thread_id, user_email)
        ));
    }
    ToolResult::success_truncated(output)
}`,explanation:`Searches Gmail and fetches full details for each result. Progress updates fire every 10 emails so the user sees something happening during large searches. Category filtering (primary, social, promotions, updates) uses Gmail's internal label IDs because the query syntax for categories doesn't work through the API. Each result includes a Gmail deep link with the authuser parameter for multi-account support. Failed individual message loads don't abort the whole search.`},{title:`Send email with user confirmation gate`,code:`pub async fn send_email(
    client: &GmailClient, user_email: &str,
    to: &[String], cc: &[String], bcc: &[String],
    subject: &str, body: &str, user_confirmed: bool,
) -> ToolResult {
    if !user_confirmed {
        return ToolResult::error(
            "Cannot send email without user confirmation.              Draft the email in chat first, show the recipients and content,              then ask them to confirm. Only set user_confirmed=true after they explicitly agree."
        );
    }

    let raw = build_rfc2822_message(user_email, &to_refs, &cc_refs, &bcc_refs,
        subject, body, None, None);

    match client.send_message(&raw).await {
        Ok(resp) => ToolResult::success(format!("Email sent! ID: {}", resp.id)),
        Err(e) => ToolResult::error(format!("Failed to send: {}", e)),
    }
}`,explanation:`The primary safety gate for email sending. If user_confirmed is false, the tool returns an error message that instructs Claude to draft the email first and ask for confirmation. This is enforced in code, not just the system prompt - Claude cannot bypass it. The error message is carefully worded to guide Claude through the correct workflow: draft, show recipients and content, then ask the user to confirm.`},{title:`Reply with threading header extraction`,code:`pub async fn reply_to_email(
    client: &GmailClient, user_email: &str,
    message_id: &str, thread_id: &str,
    to: &[String], cc: &[String], bcc: &[String],
    body: &str, user_confirmed: bool,
) -> ToolResult {
    if !user_confirmed { return ToolResult::error("...confirmation required..."); }

    // Fetch original message to get threading headers
    let original = client.get_message(message_id).await?;
    let payload = original.payload.as_ref()?;

    let original_subject = extract_header(payload, "Subject");
    let reply_subject = if original_subject.to_lowercase().starts_with("re: ") {
        original_subject
    } else {
        format!("Re: {}", original_subject)
    };

    // Build References chain for proper threading
    let original_message_id = extract_header(payload, "Message-ID");
    let original_references = extract_header(payload, "References");
    let references = if original_references.is_empty() {
        original_message_id.clone()
    } else {
        format!("{} {}", original_references, original_message_id)
    };

    let raw = build_rfc2822_message(user_email, &to_refs, &cc_refs, &bcc_refs,
        &reply_subject, body, Some(&original_message_id), Some(&references));

    client.send_reply(&raw, thread_id).await
}`,explanation:`Replying requires fetching the original message to extract its Message-ID and References headers. These are critical for email threading - without them, the reply shows up as a new conversation in every email client. The References header is built by appending the original's Message-ID to the existing References chain (per RFC 5322). The subject gets 'Re: ' prepended only if it's not already there. The same confirmation gate applies.`},{title:`Remaining Gmail tools - read, thread, reply-all, draft`,code:`pub async fn get_email(client: &GmailClient, message_id: &str, user_email: &str) -> ToolResult {
    // Fetches full email body, parses MIME, returns formatted with link
}

pub async fn list_recent_emails(client: &GmailClient, max_results: u32, ...) -> ToolResult {
    // Same as search_emails but with empty query - returns latest inbox messages
}

pub async fn search_emails_by_sender(client: &GmailClient, sender: &str, ...) -> ToolResult {
    // Wraps search_emails with "from:{sender}" query
}

pub async fn get_email_thread(client: &GmailClient, thread_id: &str, ...) -> ToolResult {
    // Fetches ALL messages in a thread, returns them in chronological order
    // Each message gets full body parsing
}

pub async fn reply_all(
    client: &GmailClient, user_email: &str, message_id: &str, thread_id: &str,
    body: &str, user_confirmed: bool,
) -> ToolResult {
    // Same as reply_to_email but extracts ALL recipients (To + Cc) from original
    // Removes the user's own email from the recipient list to avoid self-reply
    // Same confirmation gate applies
}

pub async fn save_draft(
    client: &GmailClient, user_email: &str,
    to: &[String], cc: &[String], bcc: &[String],
    subject: &str, body: &str,
    in_reply_to: Option<&str>, references: Option<&str>,
) -> ToolResult {
    // Builds RFC 2822 message and saves as draft (not sent)
    // Supports threading headers for reply drafts
    // No user_confirmed gate - drafts are safe to create without confirmation
}`,explanation:`The remaining Gmail tools are mostly thin wrappers. get_email fetches one email with full body parsing. list_recent_emails and search_emails_by_sender are convenience wrappers around search_emails. get_email_thread fetches all messages in a conversation. reply_all is like reply_to_email but extracts all original recipients and removes the user's own email to avoid self-reply. save_draft creates a draft without sending - no confirmation needed since drafts are safe.`}]},ne={file:`src/calendar/client.rs`,sections:[{title:`Multi-calendar event aggregation and deduplication`,code:`pub async fn list_events_all_calendars(
    client: &CalendarClient,
    time_min: Option<&str>, time_max: Option<&str>,
    query: Option<&str>, max_results: u32, time_zone: Option<&str>,
) -> Result<Vec<ParsedEvent>, String> {
    let calendars = client.list_calendars().await?;

    // Query each calendar and deduplicate by iCalUID
    let mut seen: HashMap<String, ParsedEvent> = HashMap::new();

    for cal in &calendars {
        match client.list_events(&cal.id, time_min, time_max, query, max_results, time_zone).await {
            Ok(events) => {
                for event in events {
                    let parsed = parse_event(&event, &cal.summary);
                    if let Some(existing) = seen.get_mut(&event.i_cal_uid) {
                        // Duplicate - append source calendar name
                        existing.source_calendars.push(cal.summary.clone());
                    } else {
                        seen.insert(event.i_cal_uid.clone(), parsed);
                    }
                }
            }
            Err(e) => { /* log and continue - don't fail on one calendar */ }
        }
    }

    let mut results: Vec<ParsedEvent> = seen.into_values().collect();
    results.sort_by(|a, b| a.start_time.cmp(&b.start_time));
    Ok(results)
}`,explanation:`When a user asks 'what's on my calendar tomorrow?', we need to search ALL their calendars - personal, work, shared team calendars. This iterates through each one, deduplicates by iCalUID (the same event on multiple calendars has the same UID), and returns a sorted list. Errors on individual calendars are logged but don't fail the whole query - if one shared calendar is down, the user still sees their other events.`},{title:`Core Calendar API methods`,code:`pub async fn list_events(
    &self, calendar_id: &str,
    time_min: Option<&str>, time_max: Option<&str>,
    query: Option<&str>, max_results: u32, time_zone: Option<&str>,
) -> Result<Vec<CalendarEvent>, String> {
    // GET /calendar/v3/calendars/{calendarId}/events with pagination
    // Filters by time range, search query, and timezone
}

pub async fn get_event(
    &self, calendar_id: &str, event_id: &str,
) -> Result<CalendarEvent, String> {
    // GET /calendar/v3/calendars/{calendarId}/events/{eventId}
    // Returns full event details including attendees, Meet link, description
}

pub async fn get_timezone(
    &self, calendar_id: &str,
) -> Result<String, String> {
    // GET /calendar/v3/calendars/{calendarId} and extract timeZone field
    // Used for timezone-aware date handling
}

pub fn parse_event(event: &CalendarEvent, source_calendar: &str) -> ParsedEvent {
    // Transforms raw Calendar API response into a clean struct
    // Extracts: title, start/end times, attendees, organizer, Meet link, location
    // Handles both dateTime (timed events) and date (all-day events)
}

pub fn format_event_time(event: &ParsedEvent) -> String {
    // Formats event start/end into human-readable string
    // All-day events show just the date
    // Timed events show "10:00 AM - 11:00 AM" in the user's timezone
}`,explanation:`The lower-level Calendar client methods. list_events queries a single calendar with optional filters. get_event fetches full details for one event (used by the two-step event-to-transcript lookup). get_timezone reads the calendar's timezone setting. parse_event is the universal translator from Google's API format to a clean struct, handling both all-day and timed events. format_event_time produces human-readable time strings for display.`}]},re={file:`src/chat/tools/recorder.rs`,sections:[{title:`Transcript fetching and formatting`,code:`pub async fn get_meeting_transcript(
    client: &RecorderClient, recording_id: &str,
) -> ToolResult {
    let transcript = client.get_transcript(recording_id).await?;

    let formatted: Vec<String> = transcript.segments.iter()
        .filter_map(|seg| {
            let text = seg.text.as_deref()?.trim();
            if text.is_empty() { return None; }
            let speaker = seg.speaker.as_deref().unwrap_or("Unknown");
            let start = format_ms(seg.start_ms);
            let end = format_ms(seg.end_ms);
            Some(format!("[{} - {} to {}] {}", speaker, start, end, text))
        }).collect();

    ToolResult::success(formatted.join("\\n"))
}

fn format_ms(ms: Option<i64>) -> String {
    match ms {
        Some(ms) => {
            let secs = ms / 1000;
            format!("{:02}:{:02}:{:02}", secs / 3600, (secs % 3600) / 60, secs % 60)
        }
        None => "??:??:??".to_string(),
    }
}`,explanation:`Formats meeting transcripts for Claude to read. Each segment gets a speaker label and timestamps in HH:MM:SS format (converted from milliseconds). Empty segments are filtered out. The format is designed for readability: "[Will Arnett - 00:02:15 to 00:02:32] We need to increase the social budget by 15%." This is the same format used by both the chat tools and the meeting review pipeline.`},{title:`Two-step event-to-transcript lookup`,code:`pub async fn get_meeting_transcript_by_event(
    client: &RecorderClient, event_id: &str, user_email: Option<&str>,
) -> ToolResult {
    // Step 1: Find recording linked to this calendar event
    let search = client.search_by_event(event_id).await?;
    let recordings: Vec<_> = search.recordings.iter()
        .filter(|r| r.has_transcript).collect();

    if recordings.is_empty() {
        return ToolResult::error("No recording with transcript found for this event");
    }

    // Step 2: Fetch the transcript
    let recording = recordings[0];
    let transcript = client.get_transcript(&recording.id).await?;

    // Format and return with recording metadata
    ToolResult::success(format!(
        "Recording: {}\\nDuration: {} min\\nAttendees: {}\\n\\nTranscript:\\n{}",
        recording.meeting_name, recording.duration_seconds / 60,
        attendee_list, formatted_transcript
    ))
}`,explanation:`The most common path for finding transcripts: user mentions a meeting, Claude looks up the calendar event, then uses the event ID to find the linked recording. Two API calls chained together. Picks the first recording that has a transcript (some recordings may still be processing). Returns the transcript with metadata so Claude has the full picture - who was there, how long it was, and what was said.`},{title:`Remaining recorder tools - date search and transcript search`,code:`pub async fn search_recordings_by_date(
    client: &RecorderClient, date: &str, timezone: Option<&str>,
    user_email: Option<&str>,
) -> ToolResult {
    let recordings = client.search_by_date(date, timezone).await?;
    // Filters to user's recordings if not admin
    // Returns list with meeting name, date, duration, attendees
}

pub async fn search_transcripts(
    client: &RecorderClient, query: &str, recording_id: Option<&str>,
) -> ToolResult {
    let results = client.search_transcripts(query, recording_id).await?;
    // Full-text search across transcript content
    // Returns matches with speaker, timestamp ranges, and highlighted text
    // Strips HTML <b></b> tags from highlighted results
}`,explanation:`search_recordings_by_date finds recordings from a specific day - useful when the user says 'what meetings did I have on Tuesday?' without naming a specific meeting. search_transcripts is the last resort in the fallback chain - full-text search across all transcript content for when you can't find a recording by event ID or participant. It searches the spoken words themselves, so 'find the meeting where we discussed the Q2 budget' can find it even without knowing who was there.`},{title:`Event and participant-based recording search`,code:`pub async fn search_recording_by_event(
    client: &RecorderClient, event_id: &str, user_email: Option<&str>,
) -> ToolResult {
    // Finds recordings linked to a specific calendar event ID
    // Returns recording metadata: name, date, duration, attendees, has_transcript
    // Used as the first step before fetching a transcript
}

pub async fn search_recordings_by_participant(
    client: &RecorderClient, participant: &str, user_email: Option<&str>,
    limit: u32, offset: u32,
) -> ToolResult {
    // Searches recordings where a specific person was an attendee
    // Matches by name or email
    // Used when user says "find my meetings with Sarah"
    // Returns list with pagination support
}`,explanation:`Two targeted recording search tools. search_recording_by_event is used when Claude has a calendar event ID and needs to find the corresponding recording - the most precise lookup. search_recordings_by_participant finds recordings involving a specific person, matched by name or email. Both are used by the chat tools to help users find recordings without knowing the exact recording ID.`}]},w={file:`src/chat/tools/chad_ads.rs`,sections:[{title:`Multi-turn conversation with Google Ads API`,code:`pub async fn ask_chad_ads(
    app_state: &AppState, user_id: i32, client: &ChadAdsClient,
    messages: &[ChadAdsMessage], tx: &Sender<StreamEvent>, tool_use_id: &str,
) -> ToolResult {
    // Filter out empty assistant messages (prevents API errors)
    let clean_messages: Vec<_> = messages.iter()
        .filter(|m| !(m.role == "assistant" && m.content.is_empty()))
        .collect();

    // Stream response from Chad Ads API
    let response = client.send_message(&clean_messages, customer_id).await?;

    // Build updated conversation history with customer_id marker
    let history_json = serde_json::to_string(&updated_messages)?;
    let output = format!(
        "{}\\n\\n[CHAD_ADS_CONVERSATION_HISTORY:customer_id={}:{}]",
        response.text, customer_id, history_json
    );

    ToolResult::success(output)
}`,explanation:`Chad Ads wraps Google Ads in a conversational API. Each call includes the full conversation history so follow-up questions work ('now show me last month' after asking about this month). The history is stored as a JSON marker in the tool output text - not in the database - so it persists across tool loop iterations but is lost between chat sessions. Empty assistant messages are filtered because the API rejects them. The customer_id tag lets Claude track which ad account the conversation is about.`},{title:`Customer auto-selection`,code:`pub async fn list_customers(
    app_state: &AppState, user_id: i32, admin_secret: &str,
) -> ToolResult {
    let customers = client.list_customers().await?;

    if customers.len() == 1 {
        // Auto-select the only account
        database::update_chad_ads_customer(&mut conn, user_id, &customers[0].id)?;
        ToolResult::success(format!("Auto-selected: {} ({})", customers[0].name, customers[0].id))
    } else {
        // Show list for user to choose
        let list = customers.iter()
            .map(|c| format!("- {} (ID: {})", c.name, c.id))
            .join("\\n");
        ToolResult::success(format!("Multiple accounts:\\n{}\\nUse select_customer to choose.", list))
    }
}`,explanation:`When listing Google Ads accounts, if there's only one, it's auto-selected - no need to ask 'which account?' every time. For users managing multiple client accounts, it shows a list and asks Claude to use select_customer with the right ID. The selected customer_id is stored in the database so it persists across sessions.`},{title:`Customer selection`,code:`pub async fn select_customer(
    app_state: &AppState, user_id: i32, customer_id: &str,
) -> ToolResult {
    // Verify Chad Ads token exists before updating
    let token = database::get_chad_ads_token(&mut conn, user_id)?
        .ok_or("No Chad Ads token found - connect your account first")?;

    // Update the selected customer_id in the database
    database::update_chad_ads_customer_id(&mut conn, user_id, customer_id)?;

    ToolResult::success(format!("Selected customer account: {}", customer_id))
}`,explanation:`Sets the active Google Ads customer account for future queries. Verifies the user has connected their Chad Ads account first. The customer_id is stored in the database so it persists - the user doesn't have to select their account every session. Used when list_customers returns multiple accounts and Claude needs the user to pick one.`}]},ie={file:`src/chad_ads/client.rs`,sections:[{title:`Streaming conversation with Chad Ads API`,code:`pub struct ChadAdsClient {
    client: reqwest::Client,
    admin_secret: String,
    user_token: String,
    customer_id: i64,
}

impl ChadAdsClient {
    pub fn customer_id(&self) -> i64 {
        self.customer_id
    }

    pub async fn send_message(
        &self, messages: &[ChadAdsMessage], customer_id: i64,
    ) -> Result<ChadAdsResponse, String> {
        let request = json!({
            "admin_secret": self.admin_secret,
            "user_token": self.user_token,
            "customer_id": customer_id,
            "messages": messages,
        });

        // Chad Ads API returns SSE stream of text chunks + usage stats
        let response = self.client.post("https://chad-ads-api.example.com/chat")
            .json(&request).send().await?;

        // Accumulate streamed text chunks
        let mut full_text = String::new();
        let mut usage = None;
        // ... SSE parsing loop ...

        Ok(ChadAdsResponse { text: full_text, usage })
    }

    pub async fn list_customers(&self) -> Result<Vec<ChadCustomer>, String> {
        // GET request to list all customer accounts accessible to this user
    }

    pub async fn get_auth_url(
        client: &reqwest::Client, admin_secret: &str, callback_url: &str,
    ) -> Result<String, String> {
        // Requests OAuth URL from Chad Ads API
        // callback_url includes the user's auth_token in the state parameter
        // so we can link the Chad Ads token back to the right user
    }
}`,explanation:`The HTTP client that talks to the Chad Ads API. send_message streams the response (SSE) and accumulates text chunks into a single response. Three credentials are needed: admin_secret (app-level), user_token (user-level, from OAuth), and customer_id (which ad account to query). get_auth_url generates the OAuth URL for connecting a user's Google Ads account - the callback URL embeds the user's auth_token so the callback handler knows which user to associate the Chad Ads token with.`}]},ae={file:`src/chat/tools/tasks.rs`,sections:[{title:`Outstanding tasks across all lists`,code:`pub async fn get_outstanding_tasks(
    client: &TasksClient, tasklist_id: Option<&str>,
    due_max: Option<&str>, progress: ProgressSender, user_email: &str,
) -> ToolResult {
    // If no specific list, iterate ALL task lists
    let lists = if let Some(id) = tasklist_id {
        vec![TaskList { id: id.to_string(), title: "".to_string() }]
    } else {
        client.list_task_lists().await?
    };

    let mut all_tasks = Vec::new();
    for list in &lists {
        progress.send(format!("Checking {}...", list.title)).await;
        match client.list_tasks(&list.id, false, None, due_max, None, None).await {
            Ok(tasks) => all_tasks.extend(tasks),
            Err(e) => { /* log and continue */ }
        }
    }

    // Format with checkboxes, due dates, and deep links
    let formatted = all_tasks.iter().map(|task| {
        let checkbox = if task.status == "completed" { "[x]" } else { "[ ]" };
        let due = task.due.as_deref().unwrap_or("no due date");
        let link = format!("https://tasks.google.com/task/{}?authuser={}", task.id, user_email);
        format!("{} {} (due: {}) - {}", checkbox, task.title, due, link)
    }).join("\\n");

    ToolResult::success(formatted)
}`,explanation:`When the user asks 'what tasks do I have?', this searches across all their task lists - not just one. Sends progress updates for each list being checked so the user sees activity. The output includes checkboxes, due dates, and deep links with the authuser parameter so links open in the correct Google account. Errors on individual lists don't fail the whole query - if one shared list is inaccessible, other tasks still show up.`},{title:`Task CRUD operations`,code:`pub async fn create_task(
    client: &TasksClient, tasklist_id: &str,
    title: &str, notes: Option<&str>, due: Option<&str>,
    parent: Option<&str>, position: Option<&str>,
) -> ToolResult {
    let task = client.create_task(tasklist_id, title, notes, due, parent, position).await?;
    ToolResult::success(format!("Created task: {} (due: {})", task.title, task.due.unwrap_or("none")))
}

pub async fn update_task(
    client: &TasksClient, tasklist_id: &str, task_id: &str,
    title: Option<&str>, notes: Option<&str>, due: Option<&str>,
) -> ToolResult {
    client.update_task(tasklist_id, task_id, title, notes, due).await?;
    ToolResult::success("Task updated")
}

pub async fn complete_task(client: &TasksClient, tasklist_id: &str, task_id: &str) -> ToolResult {
    client.complete_task(tasklist_id, task_id).await?;
    ToolResult::success("Task marked as completed")
}

pub async fn delete_task(client: &TasksClient, tasklist_id: &str, task_id: &str) -> ToolResult {
    client.delete_task(tasklist_id, task_id).await?;
    ToolResult::success("Task deleted")
}

pub async fn move_task(
    client: &TasksClient, tasklist_id: &str, task_id: &str,
    destination_tasklist_id: Option<&str>, parent: Option<&str>, previous: Option<&str>,
) -> ToolResult {
    // Supports moving between lists, nesting under a parent, and reordering
    client.move_task(tasklist_id, task_id, destination_tasklist_id, parent, previous).await?;
    ToolResult::success("Task moved")
}`,explanation:`Standard CRUD for individual tasks. Create supports title, notes, due date, parent task (for nesting), and position. Update can change any combination of title, notes, and due date. Complete marks the task as done. Delete permanently removes it. Move is the most flexible - it can move a task between lists, nest it under a parent task, or reorder it relative to another task. All operations go through the TasksClient which handles the Google Tasks API calls.`},{title:`Task list management`,code:`pub async fn list_task_lists(client: &TasksClient, user_email: &str) -> ToolResult {
    let lists = client.list_task_lists().await?;
    let formatted = lists.iter().map(|l| {
        format!("- {} (ID: {})\\n  Link: https://tasks.google.com/list/{}?authuser={}",
            l.title, l.id, l.id, user_email)
    }).join("\\n");
    ToolResult::success(formatted)
}

pub async fn create_task_list(client: &TasksClient, title: &str) -> ToolResult {
    let list = client.create_task_list(title).await?;
    ToolResult::success(format!("Created list: {} (ID: {})", list.title, list.id))
}

pub async fn update_task_list(client: &TasksClient, list_id: &str, title: &str) -> ToolResult {
    client.update_task_list(list_id, title).await?;
    ToolResult::success("Task list renamed")
}

pub async fn delete_task_list(client: &TasksClient, list_id: &str) -> ToolResult {
    client.delete_task_list(list_id).await?;
    ToolResult::success("Task list deleted")
}`,explanation:`Task list CRUD. Lists show all the user's task lists with direct links. Create makes a new list (used by the meeting review pipeline to create 'Meeting Action Items' if it doesn't exist). Update renames a list. Delete removes a list and all its tasks. The list IDs are used as parameters for all individual task operations.`},{title:`Filtered task listing with date ranges`,code:`pub async fn list_tasks(
    client: &TasksClient, tasklist_id: &str,
    show_completed: bool,
    due_min: Option<&str>, due_max: Option<&str>,
    completed_min: Option<&str>, completed_max: Option<&str>,
    progress: ProgressSender, user_email: &str,
) -> ToolResult {
    let tasks = client.list_tasks(tasklist_id, show_completed,
        due_min, due_max, completed_min, completed_max).await?;

    // Separate outstanding vs completed
    let outstanding: Vec<_> = tasks.iter().filter(|t| t.status != "completed").collect();
    let completed: Vec<_> = tasks.iter().filter(|t| t.status == "completed").collect();

    let mut output = String::new();
    if !outstanding.is_empty() {
        output.push_str(&format!("Outstanding ({}):\\n", outstanding.len()));
        for task in &outstanding {
            output.push_str(&format!("[ ] {} (due: {})\\n", task.title, task.due.unwrap_or("none")));
        }
    }
    if !completed.is_empty() {
        output.push_str(&format!("\\nCompleted ({}):\\n", completed.len()));
        for task in &completed {
            output.push_str(&format!("[x] {}\\n", task.title));
        }
    }
    ToolResult::success(output)
}`,explanation:`Lists tasks in a specific list with optional date filtering. Can filter by due date range and completion date range. Separates outstanding from completed tasks in the output so the user sees what's pending first. The show_completed flag controls whether completed tasks are fetched at all (saves API calls when you only care about outstanding work).`}]},oe={file:`src/stripe/tools.rs`,sections:[{title:`Invoice listing with date range and currency formatting`,code:`pub async fn list_invoices(
    client: &stripe::Client,
    customer_id: Option<&str>, status: Option<&str>,
    date_from: Option<&str>, date_to: Option<&str>,
    limit: i64, starting_after: Option<&str>,
) -> ToolResult {
    let mut params = ListInvoices::new();
    if let Some(cid) = customer_id {
        params.customer = Some(CustomerId::from_str(cid)?);
    }
    if let Some(s) = status { params.status = Some(parse_invoice_status(s)?); }
    params.created = build_date_range(date_from, date_to)?;

    let invoices = Invoice::list(client, &params).await?;

    let formatted = invoices.data.iter().map(|inv| {
        format!("Invoice {}\\n  Customer: {}\\n  Status: {:?}\\n  Amount due: {}\\n  Amount paid: {}\\n  Created: {}",
            inv.id,
            inv.customer_name.as_deref().unwrap_or("Unknown"),
            inv.status,
            format_amount(inv.amount_due, &inv.currency),
            format_amount(inv.amount_paid, &inv.currency),
            format_ts(inv.created),
        )
    }).join("\\n\\n");

    ToolResult::success(formatted)
}

fn format_amount(cents: i64, currency: &Currency) -> String {
    // Handle zero-decimal currencies (JPY, KRW, etc.)
    if is_zero_decimal(currency) {
        format!("{} {}", cents, currency.to_uppercase())
    } else {
        format!("{:.2} {}", cents as f64 / 100.0, currency.to_uppercase())
    }
}`,explanation:`Admin-only tool for querying Stripe invoices. Supports filtering by customer, status, and date range. The date range uses Stripe's RangeQuery with inclusive end-of-day handling (if you ask for invoices through April 12, it includes the whole day, not just midnight). Currency formatting handles both normal currencies (divide by 100 for dollars) and zero-decimal currencies like JPY where the amount is already in the base unit.`},{title:`Customer and subscription listing`,code:`pub async fn list_customers(
    client: &stripe::Client,
    email: Option<&str>, name: Option<&str>,
    limit: i64, starting_after: Option<&str>,
    created_after: Option<&str>, created_before: Option<&str>,
) -> ToolResult {
    // Server-side email filter (Stripe supports this)
    // Client-side name filter (Stripe has no server-side name search)
    let filtered = customers.iter()
        .filter(|c| name.map_or(true, |n| c.name.contains(n)))
        .collect();
}

pub async fn list_subscriptions(
    client: &stripe::Client,
    customer_id: Option<&str>, status: Option<&str>,
    limit: i64, starting_after: Option<&str>,
) -> ToolResult {
    // Filters by customer and status
    // Parses status string to Stripe enum (active, past_due, canceled, etc.)
    // Walks subscription items showing plan name, price, quantity, interval
}`,explanation:`list_customers supports email filter server-side (Stripe's API handles this) but name filtering is done client-side because Stripe doesn't have a name search endpoint. list_subscriptions shows each subscription's plan details including price, billing interval, and quantity. Both support pagination via starting_after for large result sets.`},{title:`Charges and disputes`,code:`pub async fn list_charges(
    client: &stripe::Client,
    customer_id: Option<&str>,
    date_from: Option<&str>, date_to: Option<&str>,
    limit: i64, starting_after: Option<&str>,
) -> ToolResult {
    // Shows refund status (full vs partial)
    // Shows dispute flag if applicable
    // Includes failure_code and failure_message if charge failed
    // Displays outcome (seller_message and risk_level)
}

pub async fn list_disputes(
    client: &stripe::Client,
    charge_id: Option<&str>, payment_intent_id: Option<&str>,
    limit: i64,
) -> ToolResult {
    // Filters by charge or payment intent
    // Shows evidence_details: has_evidence, past_due, due_by
    // Shows is_charge_refundable flag
}`,explanation:`list_charges includes detailed status for each charge: whether it was refunded (and if partially), whether there's a dispute, and if it failed, the specific failure code and message. The outcome field shows Stripe's risk assessment. list_disputes shows the evidence submission status (whether evidence has been submitted, whether the deadline has passed) and whether the disputed charge can still be refunded.`}]},se={file:`src/email/chat_endpoint.rs`,sections:[{title:`Email-specific system prompt and send confirmation logic`,code:`pub async fn email_chat_stream(
    State(app_state): State<AppState>,
    Json(params): Json<EmailChatParams>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    // Entry point for email triage chat
    // Loads the email queue entry to inject context into the system prompt
    // Uses the same streaming infrastructure as the main chat endpoint
}

let system_prompt = format!(
    "You are a concise email assistant. The user is reviewing an email and may want to reply.\\n\\n     Email context:\\n     From: {sender}\\nSubject: {subject}\\nBody:\\n{body}\\n\\n     You have the email's message_id ({message_id}) and thread_id ({thread_id}).\\n     To reply, use reply_to_email or reply_all with these IDs.\\n\\n     SEND CONFIRMATION RULES:\\n     If the user clearly communicates intent to send NOW (e.g. 'tell him X and send it',\\n     'reply saying Y go ahead and send'), draft and send immediately with user_confirmed=true.\\n     Use judgment - the user must be explicitly asking you to send, not just using the word\\n     'send' in passing. 'Send' alone after seeing a draft is confirmation.\\n     'What should I send?' is NOT confirmation.\\n     When in doubt, show the draft and ask to confirm."
);`,explanation:`The email chat endpoint is a specialized version of the main chat. Key differences: (1) The email body, sender, subject, message_id, and thread_id are pre-loaded into the system prompt so Claude doesn't need to search for them. (2) reply_to_email is preferred over send_email since we already have the IDs. (3) The send confirmation logic has nuanced heuristics - 'tell him X and send it' means send immediately, but 'what should I send?' is a question, not a command. This prevents both accidental sends and unnecessary confirmation prompts.`}]},ce={file:`src/meetings/chat_endpoint.rs`,sections:[{title:`Meeting-specific tools for task management`,code:`pub async fn meeting_chat_stream(
    State(app_state): State<AppState>,
    Json(params): Json<MeetingChatParams>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    // Entry point for meeting review chat
    // Loads meeting entry, transcript, and draft tasks to inject into system prompt
    // Adds three meeting-specific inline tools on top of the standard tool set
    // Uses the same streaming infrastructure as the main chat endpoint
}

// Three inline tools added on top of the standard tool set
let meeting_tools = vec![
    ToolDefinition {
        name: "update_meeting_task".to_string(),
        description: "Update a draft task's title or assignee by task number".to_string(),
        input_schema: json!({
            "properties": {
                "task_number": { "type": "integer", "description": "1-based task number" },
                "title": { "type": "string" },
                "suggested_assignee": { "type": "string" },
                "assignee_email": { "type": "string" }
            },
            "required": ["task_number"]
        }),
    },
    ToolDefinition {
        name: "reject_meeting_task".to_string(),
        description: "Remove a draft task by marking it rejected".to_string(),
        // ...
    },
    ToolDefinition {
        name: "add_meeting_task".to_string(),
        description: "Add a new draft task for this meeting".to_string(),
        // ...
    },
];`,explanation:`The meeting chat endpoint adds three tools that the main chat doesn't have: update, reject, and add draft tasks. These are handled inline (not through the ToolExecutor) because they need direct access to the meeting's task list in the database. Task numbers are 1-based so Claude can say 'update task 3' matching what the user sees in the UI. The current task list is reloaded from the database before each tool loop iteration to handle concurrent modifications.`},{title:`Transcript context injection`,code:`let transcript_snippet = entry.transcript_text
    .map(|t| {
        let bytes = t.as_bytes();
        if bytes.len() > 15000 {
            let truncated = std::str::from_utf8(&bytes[..15000])
                .unwrap_or(&t[..t.len().min(15000)]);
            format!("{}\\n[...transcript truncated]", truncated)
        } else { t }
    })
    .unwrap_or_default();

let system_prompt = format!(
    "You are reviewing a meeting. You can modify the draft action items.\\n\\n     Meeting: {name}\\nDate: {date}\\nAttendees: {attendees}\\n\\n     Draft tasks:\\n{task_list}\\n\\n     Transcript:\\n{transcript}",
);`,explanation:`The meeting's transcript is injected into the system prompt, truncated to 15KB at a UTF-8 boundary to stay within context limits. The draft tasks are listed with their current titles and assignees so Claude can reference them by number. Claude can then use its meeting-specific tools to update, reject, or add tasks based on the conversation with the user.`}]},le={file:`src/gmail/admin.rs`,sections:[{title:`JWT creation for service account impersonation`,code:`pub async fn get_delegated_access_token(
    http_client: &reqwest::Client,
    target_email: &str,
    scopes: &str,
) -> Result<String, String> {
    let sa_path = std::env::var("SERVICE_ACCOUNT_PATH")
        .unwrap_or_else(|_| SERVICE_ACCOUNT_PATH_DEFAULT.to_string());
    let sa_key: ServiceAccountKey = serde_json::from_reader(File::open(&sa_path)?)?;

    let now = chrono::Utc::now().timestamp();
    let claims = JwtClaims {
        iss: sa_key.client_email.clone(),   // service account email
        sub: target_email.to_string(),       // user to impersonate
        scope: scopes.to_string(),           // what permissions to request
        aud: sa_key.token_uri.clone(),       // Google's token endpoint
        iat: now,                            // issued now
        exp: now + 3600,                     // expires in 1 hour
    };

    let header = Header::new(Algorithm::RS256);
    let key = EncodingKey::from_rsa_pem(sa_key.private_key.as_bytes())?;
    let jwt = encode(&header, &claims, &key)?;

    // Exchange JWT for access token
    let response = http_client.post("https://oauth2.googleapis.com/token")
        .form(&[
            ("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer"),
            ("assertion", &jwt),
        ])
        .send().await?;

    let token_response: TokenResponse = response.json().await?;
    Ok(token_response.access_token)
}`,explanation:`This is how admin users access other team members' Gmail and Calendar. A Google service account with domain-wide delegation creates a JWT that says 'I am the service account, let me act as target_email.' The JWT is signed with RS256 using the service account's private key, then exchanged at Google's token endpoint for an access token that has the requested scopes for the target user. The token expires after 1 hour. This is the same pattern used for admin email search, admin calendar access, and admin task management.`},{title:`Workspace user listing via Directory API`,code:`pub async fn list_workspace_users(
    http_client: &reqwest::Client,
    admin_access_token: &str,
    domain: &str,
) -> Result<Vec<DirectoryUserEntry>, String> {
    let mut all_users = Vec::new();
    let mut page_token: Option<String> = None;

    loop {
        let mut url = format!(
            "https://admin.googleapis.com/admin/directory/v1/users?domain={}&maxResults=200",
            domain
        );
        if let Some(token) = &page_token {
            url.push_str(&format!("&pageToken={}", token));
        }

        let response = http_client.get(&url)
            .bearer_auth(admin_access_token)
            .send().await?;

        let body: DirectoryResponse = response.json().await?;
        all_users.extend(body.users);

        match body.next_page_token {
            Some(token) => page_token = Some(token),
            None => break,
        }
    }
    Ok(all_users)
}`,explanation:`Lists all users in the @digitalwillads.com Google Workspace domain. Handles pagination (Google returns max 200 users per page). Used by the 'list workspace users' admin tool so Claude can help Will find team members' emails, check who's in the directory, etc. The admin access token comes from the same service account delegation mechanism.`},{title:`Delegated client constructors for Gmail, Calendar, Tasks`,code:`pub async fn create_delegated_gmail_client(
    http_client: &reqwest::Client, target_email: &str,
) -> Result<GmailClient, String> {
    // Gets a delegated access token with gmail.readonly scope
    // Returns a GmailClient configured to act as target_email
    // Used by admin tools to search other team members' inboxes
}

pub async fn create_delegated_calendar_client(
    http_client: &reqwest::Client, target_email: &str,
) -> Result<CalendarClient, String> {
    // Gets a delegated access token with calendar.readonly scope
    // Returns a CalendarClient configured to act as target_email
    // Used by admin tools to view other team members' calendars
}

pub async fn create_delegated_tasks_client(
    http_client: &reqwest::Client, target_email: &str,
) -> Result<TasksClient, String> {
    // Gets a delegated access token with tasks scope
    // Returns a TasksClient configured to act as target_email
    // Used by meeting review to create tasks in assignees' accounts
}`,explanation:`Convenience constructors that wrap get_delegated_access_token for each Google service. Each calls get_delegated_access_token with the appropriate scope, then constructs the service-specific client. create_delegated_gmail_client and create_delegated_calendar_client are used by admin tools. create_delegated_tasks_client is used by the meeting review pipeline to create tasks directly in a team member's Google Tasks when they're assigned an action item.`}]},ue={file:`src/auth/oauth.rs`,sections:[{title:`OAuth login flow - code exchange to session token`,code:`#[server(RequestOAuthTokens, "/api")]
pub async fn request_oauth_tokens(authcode: AuthCode) -> Result<String, ServerFnError> {
    // 1. Exchange auth code for tokens
    let body = json!({
        "client_id": client_secret.client_id,
        "client_secret": client_secret.client_secret,
        "code": authcode.code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri,
    });
    let token_response: TokenResponse = client.post(&client_secret.token_uri)
        .json(&body).send().await?.json().await?;

    // 2. Fetch user profile from Google
    let user_profile: UserProfile = client
        .get("https://www.googleapis.com/oauth2/v3/userinfo")
        .query(&[("access_token", &token_response.access_token)])
        .send().await?.json().await?;

    // 3. Check admin status (best-effort - doesn't block login)
    let is_admin = check_admin_status(&client, &token_response.access_token, &user_profile.email).await;

    // 4. Upsert user record (create or update)
    let user_id = database::upsert_user(&mut conn, &user_profile.sub, &user_profile.email,
        &user_profile.name, user_profile.picture.as_deref(), is_admin)?;

    // 5. Store OAuth tokens (access + refresh + scopes)
    database::store_google_tokens(&mut conn, user_id, &token_response.access_token,
        token_response.refresh_token.as_deref().unwrap_or(""), Some(&token_response.scope))?;

    // 6. Generate session token (UUID stored in auth_tokens table)
    let auth_token = database::store_auth_token(&mut conn, user_id)?;
    Ok(auth_token)  // returned to browser, stored in localStorage
}`,explanation:`The complete login flow in one function. Google redirects back with an auth code, we exchange it for tokens, fetch the user's profile, check if they're an admin (best-effort - failures don't block login), upsert the user record (so profile changes are picked up), store the OAuth tokens, and generate a UUID session token. The session token goes back to the browser and gets stored in localStorage. Every subsequent API call includes this token for authentication.`},{title:`Incremental scope authorization`,code:`const REQUIRED_EXTRA_SCOPES: &[(&str, &str)] = &[
    ("https://www.googleapis.com/auth/gmail.readonly", "Email read access"),
    ("https://www.googleapis.com/auth/gmail.send", "Email sending"),
    ("https://www.googleapis.com/auth/calendar.readonly", "Calendar access"),
    ("https://www.googleapis.com/auth/tasks", "Google Tasks access"),
];

#[server(CheckMissingScopes, "/api")]
pub async fn check_missing_scopes(auth_token: String) -> Result<Vec<String>, ServerFnError> {
    let tokens = database::get_google_tokens(&mut conn, user.id)?;
    let stored_scopes = tokens.map(|t| t.scopes.unwrap_or_default()).unwrap_or_default();

    let missing: Vec<String> = REQUIRED_EXTRA_SCOPES.iter()
        .filter(|(scope_url, _)| !stored_scopes.contains(scope_url))
        .map(|(_, label)| label.to_string())
        .collect();
    Ok(missing)
}

#[server(GetScopeAuthUrl, "/api")]
pub async fn get_scope_auth_url(auth_token: String) -> Result<String, ServerFnError> {
    // Build OAuth URL with ONLY the missing scopes
    // include_granted_scopes=true tells Google to merge with existing grants
    let params = HashMap::from([
        ("include_granted_scopes", "true"),
        ("prompt", "consent"),
        ("scope", &missing_scope_urls.join(" ")),
        // ...
    ]);
    Ok(url.to_string())
}`,explanation:`Users don't have to grant all permissions at once. On page load, the UI checks which scopes are missing. If gmail.send isn't granted yet, a banner appears asking the user to authorize email sending. The key is include_granted_scopes=true - this tells Google to ADD the new scope to existing grants, not replace them. Without it, granting gmail.send would revoke gmail.readonly. After authorization, the callback goes through the same login flow and the stored scopes are updated.`},{title:`Token refresh`,code:`pub async fn refresh_access_token(app_state: &AppState, user_id: i32) -> Result<String, String> {
    let tokens = database::get_google_tokens(&mut conn, user_id)?
        .ok_or("No Google tokens found")?;

    let body = json!({
        "client_id": client_secret.client_id,
        "client_secret": client_secret.client_secret,
        "refresh_token": tokens.refresh_token,
        "grant_type": "refresh_token",
    });

    let response = app_state.reqwest_client
        .post("https://oauth2.googleapis.com/token")
        .json(&body).send().await?;

    let refresh_response: RefreshResponse = response.json().await?;

    database::update_access_token(&mut conn, user_id, &refresh_response.access_token)?;
    Ok(refresh_response.access_token)
}`,explanation:`Called proactively before every Gmail/Calendar API call. Uses the stored refresh token (which never expires if offline access was granted) to get a fresh access token from Google. The new token is saved to the database. This function is called by the ToolExecutor, the email polling loop, and the meeting polling loop - all sharing the same refresh mechanism.`},{title:`OAuth URL generation and Chad Ads connection check`,code:`#[server(GetOAuthUrl, "/api")]
pub async fn get_oauth_url() -> Result<String, ServerFnError> {
    // Builds Google OAuth consent URL with all required scopes
    // Includes state parameter for CSRF protection
    // redirect_uri points to /api/oauth/callback
}

#[server(GetChadAdsAuthUrl, "/api")]
pub async fn get_chad_ads_auth_url(auth_token: String) -> Result<String, ServerFnError> {
    // Requests an OAuth URL from the Chad Ads API
    // Embeds the user's auth_token in the callback state
    // so the callback handler can link the Chad Ads token to the right user
}

#[server(CheckChadAdsConnected, "/api")]
pub async fn check_chad_ads_connected(auth_token: String) -> Result<bool, ServerFnError> {
    // Checks if the user has a stored Chad Ads token
    // Used by the UI to show/hide the "Connect Google Ads" banner
}`,explanation:`Supporting OAuth functions. get_oauth_url generates the initial Google login URL. get_chad_ads_auth_url generates the OAuth URL for connecting a user's Google Ads account to the Chad Ads service - the auth_token is embedded in the state parameter so the callback can associate the returned token with the correct user. check_chad_ads_connected is a simple boolean check used by the chat page to decide whether to show a 'Connect Google Ads' banner.`}]},T={file:`src/chat/tools/calendar.rs`,sections:[{title:`Timezone offset extraction from user's local time`,code:`pub fn extract_tz_offset(user_local_time: &str) -> &str {
    // Input: "2026-04-06T14:30:00-04:00" -> "-04:00"
    // Input: "2026-04-06T14:30:00Z"      -> "+00:00"
    if user_local_time.ends_with('Z') {
        return "+00:00";
    }
    let bytes = user_local_time.as_bytes();
    let len = bytes.len();
    if len >= 6 {
        let candidate = &user_local_time[len - 6..];
        if candidate.starts_with('+') || candidate.starts_with('-') {
            return candidate;
        }
    }
    "+00:00"  // fallback to UTC
}

pub fn date_to_rfc3339_start(date: &str, tz_offset: &str) -> String {
    format!("{}T00:00:00{}", date, tz_offset)  // start of day
}

pub fn date_to_rfc3339_end_inclusive(date: &str, tz_offset: &str) -> String {
    // Calendar API uses exclusive upper bound, so "through April 12"
    // needs to be "before April 13 00:00"
    if let Ok(d) = NaiveDate::parse_from_str(date, "%Y-%m-%d") {
        let next_day = d + Duration::days(1);
        format!("{}T00:00:00{}", next_day.format("%Y-%m-%d"), tz_offset)
    } else {
        format!("{}T23:59:59{}", date, tz_offset)  // fallback
    }
}`,explanation:`The timezone handling that took three tries to get right. The user's browser sends their local time as an ISO 8601 string with the timezone offset baked in. We parse the last 6 characters to extract the offset (e.g. '-04:00' for EDT). This offset is then used to construct RFC3339 date boundaries for the Calendar API. The end date is incremented by one day because the API uses exclusive upper bounds - 'events on April 12' needs time_max of April 13 midnight, not April 12 midnight.`},{title:`Two-phase participant filtering`,code:`pub async fn get_calendar_events_by_participant(
    client: &CalendarClient, participant: &str,
    start_date: Option<&str>, end_date: Option<&str>,
    user_local_time: &str, user_timezone: &str, progress: ProgressSender,
) -> ToolResult {
    // Phase 1: Use Calendar API's "q" parameter for initial server-side search
    let events = list_events_all_calendars(
        client, time_min, time_max, Some(participant), 2500, tz_param
    ).await?;

    // Phase 2: Client-side verification - API search is fuzzy, so we double-check
    let participant_lower = participant.to_lowercase();
    let filtered: Vec<&ParsedEvent> = events.iter().filter(|e| {
        for a in &e.attendees {
            if a.to_lowercase().contains(&participant_lower) { return true; }
        }
        if e.organizer.to_lowercase().contains(&participant_lower) { return true; }
        false
    }).collect();

    // Format and return filtered results
}`,explanation:`Finding events with a specific person uses two phases because the Calendar API's search is fuzzy - it matches against event titles and descriptions too, not just attendees. Phase 1 uses the API's 'q' parameter for a broad server-side search. Phase 2 filters client-side to only events where the person is actually an attendee or organizer. The case-insensitive contains match handles variations like 'Sarah' matching 'Sarah Chen <sarah@nzymes.com>'.`},{title:`Remaining calendar tools - list calendars, single event lookup`,code:`pub async fn list_calendars(client: &CalendarClient, ...) -> ToolResult {
    let calendars = client.list_calendars().await?;
    // Categorizes by visibility: visible (checked), unchecked, hidden
    let visible: Vec<_> = calendars.iter().filter(|c| c.selected && !c.hidden).collect();
    let unchecked: Vec<_> = calendars.iter().filter(|c| !c.selected && !c.hidden).collect();
    let hidden: Vec<_> = calendars.iter().filter(|c| c.hidden).collect();
    // Formats each with name, ID, and visibility status
}

pub async fn get_calendar_event(
    client: &CalendarClient, calendar_id: &str, event_id: &str, ...,
) -> ToolResult {
    let event = client.get_event(calendar_id, event_id).await?;
    // Formats with: title, time, location, Meet link, organizer,
    // all attendees with response status (accepted/declined/tentative),
    // and full description if verbose mode enabled
}`,explanation:`list_calendars shows all the user's calendars grouped by visibility - useful when Claude needs to know which calendars to search. get_calendar_event returns full details for a single event including attendees with their RSVP status, Google Meet link (extracted from hangout_link or conference_data), and the event description. Both are read-only operations.`},{title:`Primary calendar events lookup`,code:`pub async fn get_calendar_events(
    client: &CalendarClient,
    start_date: Option<&str>, end_date: Option<&str>,
    user_local_time: &str, user_timezone: &str, progress: ProgressSender,
) -> ToolResult {
    // The main "what's on my calendar" tool
    // Converts date strings to RFC3339 with user's timezone offset
    // Calls list_events_all_calendars to search across all calendars
    // Formats results with time, title, attendees, Meet link, and source calendar
    // Handles both date range queries ("this week") and open-ended ("upcoming")
}`,explanation:`The primary entry point when Claude needs to look up calendar events. Handles timezone conversion using the user's local time offset, queries across all calendars via list_events_all_calendars, and formats the results for Claude to read. This is the most commonly called calendar tool - used for 'what meetings do I have today', 'what's on my calendar this week', etc.`}]},E={file:`src/main.rs`,sections:[{title:`Database initialization with SQLite pragmas`,code:`struct SqlitePragmas;

impl CustomizeConnection<SqliteConnection, r2d2::Error> for SqlitePragmas {
    fn on_acquire(&self, conn: &mut SqliteConnection) -> Result<(), r2d2::Error> {
        // WAL mode allows concurrent readers during writes
        sql_query("PRAGMA journal_mode = WAL").execute(conn)?;
        // Wait up to 5s for a write lock instead of failing immediately
        sql_query("PRAGMA busy_timeout = 5000").execute(conn)?;
        Ok(())
    }
}

let db_pool = Pool::builder()
    .max_size(5)
    .connection_customizer(Box::new(SqlitePragmas))
    .build(manager)?;

// Run migrations on startup
conn.run_pending_migrations(MIGRATIONS)?;`,explanation:`Every database connection gets two pragmas set on acquire. WAL (Write-Ahead Logging) mode lets the background polling tasks read while the chat endpoint writes - without it, concurrent access would deadlock. The 5-second busy timeout prevents immediate failures when multiple writes compete - instead of erroring, SQLite waits up to 5 seconds for the lock. Pool is capped at 5 connections because SQLite has limited concurrency. Migrations run automatically on startup so the schema stays in sync with code.`},{title:`Route registration and background task spawning`,code:`pub fn main() {
    // Leptos + Axum entry point (uses #[tokio::main] macro)
    // Initializes tracing, loads env vars, builds DB pool, runs migrations
    // Constructs AppState with shared reqwest client, DB pool, and config
    // Registers all routes and spawns background polling tasks
}

// API routes
let chat_routes = Router::new()
    .route("/api/chat", post(chat_endpoint::chat_stream))
    .route("/api/chat/stop", post(chat_endpoint::stop_stream))
    .route("/api/chat/subscribe", post(chat_endpoint::subscribe_stream))
    .route("/api/email-chat", post(email::chat_endpoint::email_chat_stream))
    .route("/api/meeting-chat", post(meetings::chat_endpoint::meeting_chat_stream))
    .route("/api/chad-ads/callback", get(chad_ads_callback))
    .layer(DefaultBodyLimit::max(16 * 1024 * 1024));  // 16MB for image uploads

// Background tasks - polling (will be replaced by webhooks)
let email_interval: u64 = env::var("EMAIL_POLL_INTERVAL_SECS")
    .ok().and_then(|v| v.parse().ok()).unwrap_or(120);
email::polling::start_polling_task(app_state.clone(), email_interval);

let meeting_interval: u64 = env::var("MEETING_POLL_INTERVAL_SECS")
    .ok().and_then(|v| v.parse().ok()).unwrap_or(300);
meetings::polling::start_polling_task(app_state.clone(), meeting_interval);`,explanation:`Three chat SSE endpoints (main, email, meeting) plus a Chad Ads OAuth callback. The 16MB body limit accommodates image uploads (users can paste images into chat). Two background polling tasks spawn on startup with configurable intervals via environment variables - 120s for email, 300s for meetings. These run independently from the web server, sharing the same database pool and HTTP client through AppState.`}]},de={file:`src/chat/tools/mod.rs`,sections:[{title:`Conditional tool availability based on admin status`,code:`pub fn tool_definitions(is_admin: bool) -> Vec<ToolDefinition> {
    let mut tools = vec![
        // --- Non-admin tools (available to everyone) ---
        ToolDefinition {
            name: SEARCH_EMAILS.to_string(),
            description: "Search emails using Gmail query syntax...".to_string(),
            input_schema: json!({
                "type": "object",
                "properties": {
                    "query": { "type": "string", "description": "Gmail search query" },
                    "max_results": { "type": "integer", "description": "Max results (default 10)" },
                    "category": { "type": "string", "enum": ["primary","social","promotions","updates"] }
                },
                "required": ["query"]
            }),
        },
        // ... ~20 more non-admin tools for Gmail, Calendar, Tasks, Recorder, Chad Ads ...
    ];

    if is_admin {
        tools.push(ToolDefinition {
            name: ADMIN_SEARCH_USER_EMAILS.to_string(),
            description: "Admin only: Search another workspace user's Gmail...".to_string(),
            input_schema: json!({
                "properties": {
                    "target_user_email": { "type": "string" },
                    "query": { "type": "string" }
                },
                "required": ["target_user_email", "query"]
            }),
        });
        // ... admin variants for Gmail, Calendar, Tasks, Directory ...
    }

    tools
}`,explanation:`This is the master file that defines every tool Claude can use - about 30+ tools total. The is_admin flag controls which tools are included in the API request. Non-admin users get Gmail read/send, Calendar read, Tasks CRUD, Recording search, and Chad Ads. Admin users additionally get workspace-wide search across all team members' email, calendar, and tasks, plus the Directory API for listing users. By conditionally including tools (not just checking permissions at execution), Claude literally doesn't know admin tools exist for non-admin users - it can't try to call what it can't see.`}]},fe={file:`src/components/email_triage.rs`,sections:[{title:`Queue management and email advancement`,code:`// State
let email_queue: RwSignal<Vec<EmailQueueItem>> = RwSignal::new(vec![]);
let current_index: RwSignal<usize> = RwSignal::new(0);
let queue_state: RwSignal<String> = RwSignal::new("loading".to_string());
let email_body: RwSignal<String> = RwSignal::new(String::new());

// Load queue on mount
Effect::new(move || {
    spawn_local(async move {
        let queue = get_email_queue(auth_token).await?;
        if queue.is_empty() {
            queue_state.set("empty".to_string());
        } else {
            email_queue.set(queue);
            queue_state.set("active".to_string());
        }
    });
});

// When current_index changes, load the new email's body and reset chat
Effect::new(move || {
    let idx = current_index.get();
    let queue = email_queue.get();
    if let Some(entry) = queue.get(idx) {
        spawn_local(async move {
            let body = get_email_content(auth_token, entry.id).await?;
            email_body.set(body);
            chat_messages.set(vec![]);  // reset chat for new email
        });
    }
});

fn advance_to_next() {
    let idx = current_index.get();
    let queue = email_queue.get();
    if idx + 1 < queue.len() {
        current_index.set(idx + 1);
    } else {
        // End of queue - reload to check for new emails
        spawn_local(async move {
            let new_queue = get_email_queue(auth_token).await?;
            if new_queue.is_empty() {
                queue_state.set("complete".to_string());
            } else {
                email_queue.set(new_queue);
                current_index.set(0);
            }
        });
    }
}`,explanation:`The email triage UI works like a card deck - you review one email at a time, take action, then advance to the next. When you reach the end, it reloads the queue to check for new emails that arrived while you were triaging. Each email advance loads the full body (lazy, not preloaded) and resets the chat conversation. The queue_state signal drives the UI between loading, active (has emails), empty (nothing to review), and complete (finished the batch).`}]},pe={file:`src/components/email_api.rs`,sections:[{title:`Archive with Gmail label removal`,code:`#[server(UpdateEmailStatusApi, "/api")]
pub async fn update_email_status_api(
    auth_token: String, entry_id: i32, status: String,
) -> Result<(), ServerFnError> {
    // Verify ownership
    let user = database::verify_auth_token(&mut conn, &auth_token)?
        .ok_or(ServerFnError::new("Invalid token"))?;
    let entry = database::get_email_queue_entry(&mut conn, entry_id)?;
    if entry.user_id != user.id { return Err(ServerFnError::new("Not your email")); }

    // Update status in our database
    database::update_email_status(&mut conn, entry_id, &status)?;

    // Also remove from Gmail INBOX (best-effort, non-blocking)
    if status == "archived" {
        if let Ok(token) = refresh_access_token(&app_state, user.id).await {
            let gmail = GmailClient::new(app_state.reqwest_client.clone(), token);
            let _ = gmail.modify_message(&entry.gmail_message_id,
                &[], &["INBOX"]  // add no labels, remove INBOX
            ).await;  // ignore errors - archiving in our DB is what matters
        }
    }
    Ok(())
}`,explanation:`When the user archives an email in the triage queue, two things happen: (1) the status is updated in our database (the important part), and (2) the INBOX label is removed from the email in Gmail (best-effort). The Gmail API call is fire-and-forget - if it fails, the email stays in Gmail's inbox but is still marked as processed in our queue. This prevents the email from reappearing in the next triage cycle. Ownership is verified before any action.`},{title:`Email queue and filter server functions`,code:`#[server(GetEmailQueue, "/api")]
pub async fn get_email_queue(auth_token: String) -> Result<Vec<EmailQueueItem>, ServerFnError> {
    // Returns all pending (non-filtered) emails for the authenticated user
    // Ordered by created_at DESC (newest first)
    // Drives the email triage card deck UI
}

#[server(GetEmailContent, "/api")]
pub async fn get_email_content(auth_token: String, entry_id: i32) -> Result<String, ServerFnError> {
    // Fetches the full email body for a queue entry
    // Lazy-loaded when the user navigates to an email in the triage UI
    // Parses the stored raw_json to extract the body text
}

#[server(GetEmailQueueEntryApi, "/api")]
pub async fn get_email_queue_entry_api(
    auth_token: String, entry_id: i32,
) -> Result<EmailQueueEntry, ServerFnError> {
    // Returns full details for a single email queue entry
    // Used by the email chat endpoint to load context
}

#[server(GetEmailBadgeCount, "/api")]
pub async fn get_email_badge_count(auth_token: String) -> Result<i64, ServerFnError> {
    // Returns count of pending emails for badge display
    // Lightweight query (just COUNT, no data transfer)
    // Polled every 30 seconds by the chat page
}

#[server(GetFilterRules, "/api")]
pub async fn get_filter_rules(auth_token: String) -> Result<Vec<EmailFilterRule>, ServerFnError> {
    // Returns all email filter rules for the authenticated user
    // Displayed in the settings panel for management
}

#[server(AddFilterRule, "/api")]
pub async fn add_filter_rule(
    auth_token: String, rule_type: String, value: String,
) -> Result<i32, ServerFnError> {
    // Creates a new email filter rule (sender, domain, or keyword)
    // Returns the new rule's ID
}

#[server(DeleteFilterRule, "/api")]
pub async fn delete_filter_rule(auth_token: String, rule_id: i32) -> Result<(), ServerFnError> {
    // Deletes an email filter rule by ID
    // Verifies ownership before deleting
}`,explanation:`Seven server functions that power the email triage UI. get_email_queue loads the triage card deck. get_email_content lazy-loads email bodies (not preloaded to save bandwidth). get_email_queue_entry_api provides full entry details for the email chat endpoint. get_email_badge_count is a lightweight poll for the tab badge. The three filter rule functions (get, add, delete) manage the user's custom blacklist from the settings panel.`}]},me={file:`src/components/meeting_review.rs`,sections:[{title:`Batch task approval on Done`,code:`fn on_done() {
    spawn_local(async move {
        let tasks = draft_tasks.get();
        let pending_tasks: Vec<_> = tasks.iter()
            .filter(|t| t.status == "pending")
            .collect();

        // Approve all pending tasks (creates Google Tasks)
        for task in &pending_tasks {
            let _ = approve_draft_task_api(
                auth_token, task.id, &task.title,
                task.assignee_email.as_deref(),
            ).await;
        }

        // Mark meeting as reviewed
        mark_meeting_reviewed_api(auth_token, meeting_id).await?;

        // Advance to next meeting
        advance_to_next();
    });
}

fn on_reject(task_id: i32) {
    // Remove from local list immediately (optimistic UI)
    draft_tasks.update(|tasks| {
        tasks.retain(|t| t.id != task_id);
    });
    // Then persist the rejection
    spawn_local(async move {
        reject_draft_task_api(auth_token, task_id).await;
    });
}`,explanation:`When the user clicks 'Done - Next Meeting', all remaining pending tasks are batch-approved (each creates a Google Task), the meeting is marked as reviewed, and the UI advances to the next meeting. Individual task rejection is optimistic - the task is removed from the UI immediately, then the API call happens in the background. This makes the UI feel snappy even if the network is slow.`}]},D={file:`src/components/meeting_api.rs`,sections:[{title:`Task approval with delegation and deduplication`,code:`#[server(ApproveDraftTaskApi, "/api")]
pub async fn approve_draft_task_api(
    auth_token: String, task_id: i32, title: String,
    assignee_email: Option<String>,
) -> Result<(), ServerFnError> {
    // Determine whose Google Tasks to create in
    let (tasks_client, target_label) = if let Some(ref email) = assignee_email {
        if email.ends_with("@digitalwillads.com") {
            // Workspace user - use service account delegation
            match create_delegated_tasks_client(&app_state.reqwest_client, email).await {
                Ok(client) => (client, format!("{}'s tasks", email)),
                Err(_) => {
                    // Delegation failed - fall back to current user's account
                    let client = get_tasks_client_for_user(&app_state, user.id).await?;
                    (client, format!("your tasks (delegation to {} failed)", email))
                }
            }
        } else {
            // External user - create in current user's account with note
            let client = get_tasks_client_for_user(&app_state, user.id).await?;
            (client, "your tasks".to_string())
        }
    } else {
        let client = get_tasks_client_for_user(&app_state, user.id).await?;
        ("your tasks".to_string())
    };

    // Find or create "Meeting Action Items" task list
    let lists = tasks_client.list_task_lists().await?;
    let list_id = lists.iter()
        .find(|l| l.title == "Meeting Action Items")
        .map(|l| l.id.clone())
        .unwrap_or_else(|| {
            tasks_client.create_task_list("Meeting Action Items").await?.id
        });

    // Deduplication - skip if task with same title already exists
    let existing = tasks_client.list_tasks(&list_id, false, None, None, None, None).await?;
    if existing.iter().any(|t| t.title == title) {
        return Ok(());  // already exists
    }

    // Create the task with meeting context in notes
    let task = tasks_client.create_task(&list_id, &title, Some(&notes), None, None, None).await?;

    // Update draft task status to "approved" with google_task_id
    database::update_draft_task_status(&mut conn, task_id, "approved",
        Some(&task.id), Some(&list_id))?;
    Ok(())
}`,explanation:`The most complex approval logic in the app. When a draft task is approved: (1) If the assignee is a @digitalwillads.com user, try to create the task directly in THEIR Google Tasks using service account delegation. (2) If delegation fails, fall back to the current user's account with a note. (3) If the assignee is external (not workspace), create in the current user's account. Tasks always go into a 'Meeting Action Items' list (created if it doesn't exist). Deduplication prevents the same task from being created twice if the user clicks Done multiple times. The google_task_id is stored so we can reference it later.`},{title:`Meeting queue and task management server functions`,code:`#[server(GetMeetingQueue, "/api")]
pub async fn get_meeting_queue(auth_token: String) -> Result<Vec<MeetingQueueItem>, ServerFnError> {
    // Returns all pending meetings for the authenticated user
    // Ordered by created_at DESC (newest first)
    // Drives the meeting review card deck UI
}

#[server(GetMeetingDetail, "/api")]
pub async fn get_meeting_detail(
    auth_token: String, meeting_id: i32,
) -> Result<MeetingDetail, ServerFnError> {
    // Returns full meeting details including draft tasks
    // Loads meeting entry + all associated draft tasks from DB
}

#[server(GetMeetingTranscriptText, "/api")]
pub async fn get_meeting_transcript_text(
    auth_token: String, meeting_id: i32,
) -> Result<String, ServerFnError> {
    // Returns the stored transcript text for a meeting
    // Lazy-loaded when user expands the transcript section
}

#[server(GetMeetingBadgeCount, "/api")]
pub async fn get_meeting_badge_count(auth_token: String) -> Result<i64, ServerFnError> {
    // Returns count of pending meetings for badge display
    // Polled every 30 seconds by the chat page
}

#[server(MarkMeetingReviewedApi, "/api")]
pub async fn mark_meeting_reviewed_api(
    auth_token: String, meeting_id: i32,
) -> Result<(), ServerFnError> {
    // Sets meeting status to 'reviewed' with timestamp
    // Called when user clicks Done on a meeting
}

#[server(UpdateDraftTaskApi, "/api")]
pub async fn update_draft_task_api(
    auth_token: String, task_id: i32, title: Option<String>,
    suggested_assignee: Option<String>, assignee_email: Option<String>,
) -> Result<(), ServerFnError> {
    // Updates a draft task's title and/or assignee
    // Used by both the meeting review UI and the meeting chat endpoint
}

#[server(RejectDraftTaskApi, "/api")]
pub async fn reject_draft_task_api(
    auth_token: String, task_id: i32,
) -> Result<(), ServerFnError> {
    // Marks a draft task as rejected (soft delete)
    // Called when user removes a task from the meeting review
}`,explanation:`Seven server functions for the meeting review UI. get_meeting_queue loads the review card deck. get_meeting_detail provides full meeting info with draft tasks. get_meeting_transcript_text lazy-loads transcripts. get_meeting_badge_count powers the tab badge. mark_meeting_reviewed_api finalizes a meeting review. update_draft_task_api and reject_draft_task_api handle individual task management from both the UI and the meeting chat endpoint.`}]},O={file:`src/components/chat_page.rs`,sections:[{title:`Tab management and badge polling`,code:`// Tab state
let active_tab: RwSignal<String> = RwSignal::new("chat".to_string());
let email_badge_count: RwSignal<i64> = RwSignal::new(0);
let meeting_badge_count: RwSignal<i64> = RwSignal::new(0);

// Scope checking on load
Effect::new(move || {
    spawn_local(async move {
        let missing = check_missing_scopes(auth_token).await?;
        if !missing.is_empty() {
            chat_disabled.set(true);
            missing_scopes.set(missing);
            scope_auth_url.set(Some(get_scope_auth_url(auth_token).await?));
        }
    });
});

// Badge polling loop - runs every 30 seconds
Effect::new(move || {
    spawn_local(async move {
        loop {
            if let Ok(count) = get_email_badge_count(auth_token).await {
                email_badge_count.set(count);
            }
            if let Ok(count) = get_meeting_badge_count(auth_token).await {
                meeting_badge_count.set(count);
            }
            gloo_timers::future::sleep(Duration::from_secs(30)).await;
        }
    });
});

// Tab rendering
match active_tab.get().as_str() {
    "email" => view! { <EmailTriageCard auth_token badge_count=email_badge_count /> },
    "meetings" => view! { <MeetingReviewCard auth_token badge_count=meeting_badge_count /> },
    _ => view! { <ChatBox auth_token /* ... */ /> },
}`,explanation:`The main page orchestrates three tabs: Chat (default), Email (triage), and Meetings (review). On load, it checks for missing OAuth scopes and shows an authorization banner if any are missing. Badge counts poll every 30 seconds so the user sees how many emails and meetings are waiting for review without switching tabs. Each tab renders its own self-contained component. The Chad Ads connection check is separate and non-blocking - it shows a banner but doesn't disable chat.`}]},he={file:`src/components/chat_box.rs`,sections:[{title:`SSE streaming and thread management`,code:`fn send_message() {
    // Build message with image blocks (if pasted) + text
    let blocks = pending_images.get().iter()
        .map(|(data, mime)| UiContentBlock::Image { data, media_type: mime })
        .chain(std::iter::once(UiContentBlock::Text { text: input_text.get() }))
        .collect();

    let message = UiChatMessage { role: "user", content: blocks };

    // Create thread if needed (uses first 40 chars as title)
    if current_thread_id.get().is_none() {
        let title = if has_only_images { "Image" } else { &text[..40] };
        let thread_id = create_thread_api(auth_token, title).await?;
        current_thread_id.set(Some(thread_id));
    }

    // Trigger server-side generation
    start_chat_api(auth_token, thread_id, messages).await?;

    // Subscribe to SSE stream
    subscribe_to_stream(thread_id);
}

fn subscribe_to_stream(thread_id: i32) {
    let event_source = EventSource::new(&format!("/api/chat/subscribe?thread_id={}", thread_id));
    event_source.on_message(move |event| {
        match event.type_ {
            "text"        => streaming_text.update(|t| t.push_str(&event.data)),
            "tool_call"   => { /* show tool indicator */ },
            "tool_result" => { /* show tool output */ },
            "done"        => { is_streaming.set(false); merge_streaming_text(); },
            "error"       => { /* show error */ },
        }
    });
}

fn stop_message() {
    stream_cancel.set(true);
    // Merge any in-flight text
    // Mark pending tool calls as "Interrupted"
}`,explanation:`The main chat UI handles the full lifecycle: composing messages (text + pasted images), creating threads on first message, triggering server-side generation, and subscribing to the SSE stream for real-time updates. Streaming text accumulates in a separate signal (streaming_text) to avoid DOM thrashing - it's only merged into the message list when the stream completes. The stop button cancels gracefully by marking pending tool calls as 'Interrupted' so the user knows what was in progress. Thread titles are auto-generated from the first 40 characters of the first message.`}]},ge={file:`src/tasks/client.rs`,sections:[{title:`Google Tasks API client - full CRUD`,code:`pub struct TasksClient {
    client: reqwest::Client,
    access_token: String,
}

impl TasksClient {
    pub fn new(client: reqwest::Client, access_token: String) -> Self {
        Self { client, access_token }
    }

    pub async fn list_task_lists(&self) -> Result<Vec<TaskList>, String> {
        // GET /tasks/v1/users/@me/lists with pagination (maxResults=100)
    }
    pub async fn create_task_list(&self, title: &str) -> Result<TaskList, String> {
        // POST /tasks/v1/users/@me/lists
    }
    pub async fn update_task_list(&self, list_id: &str, title: &str) -> Result<(), String> {
        // PATCH /tasks/v1/users/@me/lists/{list_id}
    }
    pub async fn delete_task_list(&self, list_id: &str) -> Result<(), String> {
        // DELETE /tasks/v1/users/@me/lists/{list_id}
    }
    pub async fn list_tasks(
        &self, list_id: &str, show_completed: bool,
        due_min: Option<&str>, due_max: Option<&str>,
        completed_min: Option<&str>, completed_max: Option<&str>,
    ) -> Result<Vec<Task>, String> {
        // GET /tasks/v1/lists/{list_id}/tasks with filters and pagination
        // showCompleted, showHidden, dueMin, dueMax, completedMin, completedMax
    }
    pub async fn get_task(&self, list_id: &str, task_id: &str) -> Result<Task, String> {
        // GET /tasks/v1/lists/{list_id}/tasks/{task_id}
    }
    pub async fn create_task(
        &self, list_id: &str, title: &str, notes: Option<&str>,
        due: Option<&str>, parent: Option<&str>, previous: Option<&str>,
    ) -> Result<Task, String> {
        // POST /tasks/v1/lists/{list_id}/tasks
        // parent: nest under another task, previous: insert after this task
    }
    pub async fn update_task(
        &self, list_id: &str, task_id: &str,
        title: Option<&str>, notes: Option<&str>, due: Option<&str>,
    ) -> Result<Task, String> {
        // PATCH /tasks/v1/lists/{list_id}/tasks/{task_id}
        // Only sends fields that are Some (partial update)
    }
    pub async fn complete_task(&self, list_id: &str, task_id: &str) -> Result<(), String> {
        // PATCH with status: "completed"
    }
    pub async fn delete_task(&self, list_id: &str, task_id: &str) -> Result<(), String> {
        // DELETE /tasks/v1/lists/{list_id}/tasks/{task_id}
    }
    pub async fn move_task(
        &self, list_id: &str, task_id: &str,
        dest_list: Option<&str>, parent: Option<&str>, previous: Option<&str>,
    ) -> Result<Task, String> {
        // POST /tasks/v1/lists/{list_id}/tasks/{task_id}/move
        // Can move between lists, nest under parent, or reorder
    }
}`,explanation:`The low-level HTTP client for Google Tasks API. Each method maps to one API endpoint. list_tasks supports 6 optional filters (show completed, date ranges for due and completion). create_task supports nesting (parent) and ordering (previous). move_task can relocate tasks between lists, nest them, or reorder them. All methods handle pagination, error responses, and bearer token auth. This client is used by both the chat tools (tools/tasks.rs) and the meeting review pipeline (for creating tasks from extracted action items).`}]},_e={file:`src/database.rs`,sections:[{title:`User and session management (7 functions)`,code:`pub fn upsert_user(conn, google_sub, email, name, picture_url, is_admin) -> Result<i32> {
    // Find by google_sub, update if exists, insert if new
    // Returns user_id
}
pub fn store_auth_token(conn, user_id) -> Result<String> {
    // Generates UUID, inserts into auth_tokens, returns token string
}
pub fn verify_auth_token(conn, token) -> Result<Option<UserInfo>> {
    // Joins auth_tokens with users table, returns user info if valid
}
pub fn store_google_tokens(conn, user_id, access_token, refresh_token, scopes) {
    // SQLite REPLACE INTO (upsert by user_id unique constraint)
}
pub fn get_google_tokens(conn, user_id) -> Result<Option<GoogleToken>> { /* ... */ }
pub fn update_access_token(conn, user_id, new_token) { /* updates only access_token */ }
pub fn get_user_by_id(conn, user_id) -> Result<Option<User>> { /* ... */ }`,explanation:`Core identity layer. upsert_user is called on every login to keep profile data fresh. store_auth_token generates a UUID session token. verify_auth_token is called on every API request to authenticate. Google tokens use SQLite's REPLACE INTO for upsert since user_id has a unique constraint. update_access_token only changes the access_token field (called after refresh, doesn't touch the refresh_token).`},{title:`Chat thread and message CRUD (10 functions)`,code:`pub fn create_chat_thread(conn, user_id, title) -> Result<i32> { /* last_insert_rowid */ }
pub fn list_chat_threads(conn, user_id) -> Result<Vec<ChatThreadSummary>> {
    // Ordered by updated_at DESC (most recent activity first)
    // Includes has_unread flag
}
pub fn save_chat_message(conn, thread_id, role, content) {
    // Inserts message AND updates thread's updated_at timestamp
}
pub fn save_chat_message_returning_id(conn, thread_id, role, content) -> Result<i32> {
    // Same as above but returns the message ID (for progressive updates)
}
pub fn update_chat_message_content(conn, message_id, content) {
    // Used for progressive streaming - updates message as more text arrives
}
pub fn load_chat_messages(conn, thread_id) -> Result<Vec<ChatMessage>> {
    // Ordered by created_at ASC (chronological)
}
pub fn delete_chat_thread(conn, thread_id) { /* messages cascade-deleted by FK */ }
pub fn update_chat_thread_title(conn, thread_id, title) { /* ... */ }
pub fn mark_thread_unread(conn, thread_id) { /* sets has_unread = 1 */ }
pub fn mark_thread_read(conn, thread_id) { /* sets has_unread = 0 */ }
pub fn delete_chat_message(conn, message_id) { /* ... */ }`,explanation:`Chat persistence. Threads sort by most recent activity (updated_at changes on every message). save_chat_message_returning_id and update_chat_message_content work together for progressive streaming - the first call creates the message, subsequent calls update it as more text arrives from Claude. This way, if the connection drops mid-stream, the partial response is already saved. delete_chat_thread cascades to messages via foreign key.`},{title:`Email queue operations (12 functions)`,code:`pub fn insert_email_queue_entry(conn, gmail_message_id, thread_id, user_id,
    sender, subject, snippet, filtered_out, filter_reason, ai_summary, raw_json) -> Result<i32>
pub fn get_email_queue_entry(conn, entry_id) -> Result<Option<EmailQueueEntry>> {
    // Fetches a single email queue entry by ID
    // Used by email_api to load full details and verify ownership
}
pub fn list_pending_emails(conn, user_id) -> Result<Vec<EmailQueueEntry>> {
    // WHERE filtered_out = false AND status = 'pending', ordered by created_at DESC
}
pub fn get_pending_email_count(conn, user_id) -> Result<i64> { /* for badge count */ }
pub fn email_exists_in_queue(conn, gmail_message_id, user_id) -> Result<bool>
pub fn email_thread_exists_in_queue(conn, gmail_thread_id, user_id) -> Result<bool>
pub fn update_email_status(conn, entry_id, status) { /* "pending" -> "archived" */ }
pub fn list_email_filter_rules(conn, user_id) -> Result<Vec<EmailFilterRule>>
pub fn insert_email_filter_rule(conn, user_id, rule_type, value) -> Result<i32>
pub fn get_email_filter_rule(conn, rule_id) -> Result<Option<EmailFilterRule>>
pub fn delete_email_filter_rule(conn, rule_id)
pub fn upsert_email_webhook_state(conn, user_id, history_id, watch_expiration, last_poll_at)
pub fn get_email_webhook_state(conn, user_id) -> Result<Option<EmailWebhookState>>`,explanation:`Email queue persistence. list_pending_emails only shows non-filtered emails with pending status - this is what drives the triage UI. The two exists checks (by message_id and by thread_id) prevent duplicate processing during polling. Filter rules CRUD supports the user-defined blacklist. Webhook state tracks the Gmail history ID for incremental polling. The badge count query is separate from the full list for performance (just a COUNT, no data transfer).`},{title:`Meeting queue operations (11 functions)`,code:`pub fn insert_meeting_queue_entry(conn, recording_id, user_id,
    meeting_name, meeting_date, duration, attendees_json, transcript_text) -> Result<i32>
pub fn list_pending_meetings(conn, user_id) -> Result<Vec<MeetingQueueEntry>> {
    // WHERE status = 'pending', ordered by created_at DESC
}
pub fn get_pending_meeting_count(conn, user_id) -> Result<i64> { /* badge count */ }
pub fn meeting_exists_in_queue(conn, recording_id, user_id) -> Result<bool>
pub fn mark_meeting_reviewed(conn, meeting_id) { /* status = 'reviewed', sets reviewed_at */ }
pub fn insert_meeting_draft_task(conn, meeting_id, title, assignee, email) -> Result<i32>
pub fn list_meeting_draft_tasks(conn, meeting_id) -> Result<Vec<MeetingDraftTask>>
pub fn update_draft_task_status(conn, task_id, status, google_task_id, google_tasklist_id)
pub fn update_draft_task_details(conn, task_id, title, assignee_email)
pub fn get_draft_task(conn, task_id) -> Result<Option<MeetingDraftTask>>
pub fn get_meeting_queue_entry(conn, meeting_id) -> Result<Option<MeetingQueueEntry>>`,explanation:`Meeting queue persistence. Same pattern as email: pending items drive the UI, exists check prevents duplicates, badge count is a lightweight query. Draft tasks are linked to meetings and track their lifecycle: pending -> approved (with google_task_id stored) or rejected. update_draft_task_status stores the Google Task ID and list ID so the app can reference the created task later. mark_meeting_reviewed sets the reviewed_at timestamp for audit trail.`},{title:`Chad Ads token and conversation storage (4 functions)`,code:`pub fn store_chad_ads_token(conn, user_id, user_token, customer_id) {
    // REPLACE INTO (upsert by user_id unique constraint)
}
pub fn get_chad_ads_token(conn, user_id) -> Result<Option<ChadAdsToken>>
pub fn update_chad_ads_customer_id(conn, user_id, customer_id)
pub fn load_chad_ads_conversation(conn, user_id, customer_id) -> Result<String> {
    // Returns JSON array string, or "[]" if no history
}
pub fn save_chad_ads_conversation(conn, user_id, customer_id, history_json) {
    // REPLACE INTO - upserts conversation by user_id + customer_id
}`,explanation:`Chad Ads persistence. Token storage is one record per user (like Google tokens). Conversation history is stored per user+customer pair as a JSON string. load returns '[]' if no history exists, so callers don't need null handling. save uses REPLACE INTO for upsert. The customer_id is stored separately so it persists across sessions - the user doesn't have to re-select their ad account every time.`}]},ve={file:`src/components/chat_box.rs`,sections:[{title:`Server-side chat functions`,code:`#[server(input = Json)]
pub async fn save_message_api(
    auth_token: String, thread_id: i32, role: String, content: String,
) -> Result<i32, ServerFnError> {
    // Verifies auth, saves message, returns message_id
    // Used for saving user messages before starting generation
}

#[server(UpdateThreadTitleApi, "/api")]
pub async fn update_thread_title_api(
    auth_token: String, thread_id: i32, title: String,
) -> Result<(), ServerFnError> {
    // Verifies auth + ownership, updates title
    // Called when user renames a thread in the sidebar
}

#[server(StartChatApi, "/api")]
pub async fn start_chat_api(
    auth_token: String, thread_id: i32,
    messages: Vec<UiChatMessage>, user_local_time: String, user_timezone: String,
) -> Result<String, ServerFnError> {
    // Triggers server-side generation by calling start_generation()
    // Returns a stream_id the client uses to subscribe to SSE
    // This is the bridge between the UI and the chat_endpoint
}`,explanation:`Three server functions that support the chat UI. save_message_api persists the user's message before generation starts (so it's saved even if generation fails). update_thread_title_api handles sidebar renames. start_chat_api is the critical bridge - it triggers the server-side generation loop and returns a stream_id that the browser uses to subscribe to the SSE stream. The separation between 'start' and 'subscribe' allows reconnection if the browser connection drops mid-stream.`}]},ye={chat_engine:p,"email_triage.ui":m,"meeting_review.ui":h},be={},xe={chat_engine:[{label:`chat_endpoint.rs - SSE streaming and tool loop`,annotation:y},{label:`tool_executor.rs - Tool dispatch and scope checking`,annotation:b},{label:`claude_client.rs - API request construction`,annotation:x},{label:`tools/mod.rs - Tool definitions and admin gating`,annotation:de},{label:`chat_box.rs - Chat UI and SSE handling`,annotation:he},{label:`chat_box.rs - Server functions (save, title, start)`,annotation:ve},{label:`chat_page.rs - Tab management and badge polling`,annotation:O},{label:`main.rs - Server setup and background tasks`,annotation:E},{label:`database.rs - All persistence operations (47 functions)`,annotation:_e}],auth:[{label:`oauth.rs - Login flow, token refresh, scope management`,annotation:ue},{label:`admin.rs - Service account delegation and JWT creation`,annotation:le}],email_triage:[{label:`pipeline.rs - Email processing pipeline`,annotation:_},{label:`polling.rs - Background polling loop`,annotation:v},{label:`chat_endpoint.rs - Email-specific chat with send confirmation`,annotation:se},{label:`email_triage.rs - Triage queue UI component`,annotation:fe},{label:`email_api.rs - Email queue server functions`,annotation:pe}],meeting_review:[{label:`pipeline.rs - Barbara Ann task extraction`,annotation:ee},{label:`polling.rs - Recording poll loop`,annotation:S},{label:`chat_endpoint.rs - Meeting chat with task management tools`,annotation:ce},{label:`meeting_review.rs - Meeting review UI component`,annotation:me},{label:`meeting_api.rs - Meeting queue and task approval server functions`,annotation:D}],gmail:[{label:`tools/gmail.rs - Search, send, reply, draft tools (9 functions)`,annotation:te},{label:`client.rs - Gmail API client and MIME parsing (15 functions)`,annotation:C}],calendar:[{label:`client.rs - Calendar API client (8 functions)`,annotation:ne},{label:`tools/calendar.rs - Timezone handling and event formatting (7 functions)`,annotation:T}],recorder:[{label:`tools/recorder.rs - Recording search and transcripts (6 functions)`,annotation:re}],chad_ads:[{label:`tools/chad_ads.rs - Google Ads tool handlers (3 functions)`,annotation:w},{label:`chad_ads/client.rs - Chad Ads API client (5 functions)`,annotation:ie}],google_tasks:[{label:`tools/tasks.rs - Google Tasks tool handlers (12 functions)`,annotation:ae},{label:`tasks/client.rs - Google Tasks API client (12 functions)`,annotation:ge}],stripe:[{label:`tools/stripe.rs - Stripe billing queries (5 functions)`,annotation:oe}]};for(let e of Object.values(xe))for(let t of e)be[t.annotation.file]=t;function Se({logicMap:e}){let[t,n]=(0,l.useState)(`overview`),[r,i]=(0,l.useState)(null),a=(0,l.useRef)(null);(0,l.useEffect)(()=>{a.current?.scrollTo(0,0)},[t]);let o=null,s=null;for(let n of e.systems){if(n.id===t){o=n;break}for(let e of n.children||[])if(e.id===t){o=e,s=n;break}if(o)break}let c=[],u=[`#3b82f6`,`#10b981`,`#f59e0b`,`#ef4444`,`#8b5cf6`,`#ec4899`];if(e.systems.some(e=>e.id===`chat_engine`)){let t=e.systems.find(e=>e.id===`chat_engine`);if(t){c.push({type:`link`,id:t.id,label:t.name,indent:!1,color:`#3b82f6`});for(let e of t.children||[])c.push({type:`link`,id:e.id,label:e.name,indent:!0,color:`#94a3b8`})}let n=[`email_triage`,`meeting_review`],r=e.systems.filter(e=>n.includes(e.id));if(r.length>0){c.push({type:`link`,id:`automation_overview`,label:`Chat Automation Tabs`,indent:!1,color:`#10b981`});for(let e of r)c.push({type:`link`,id:e.id,label:e.name,indent:!0,color:`#10b981`})}let i=[`auth`,`database`],a=e.systems.filter(e=>i.includes(e.id));if(a.length>0){c.push({type:`header`,label:`System`});for(let e of a)c.push({type:`link`,id:e.id,label:e.name,indent:!1,color:`#8b5cf6`})}}else{c.push({type:`header`,label:e.project.toUpperCase().replace(/-/g,` `)});for(let t=0;t<e.systems.length;t++){let n=e.systems[t],r=u[t%u.length];c.push({type:`link`,id:n.id,label:n.name,indent:!1,color:r});for(let e of n.children||[])c.push({type:`link`,id:e.id,label:e.name,indent:!0,color:`#94a3b8`})}}let d=o?e.relationships.filter(e=>e.from.startsWith(o.id)||e.to.startsWith(o.id)):[];return(0,f.jsxs)(`div`,{className:`doc-layout`,children:[(0,f.jsxs)(`nav`,{className:`doc-nav`,children:[(0,f.jsx)(`a`,{className:`nav-title ${t===`overview`?`active`:``}`,onClick:()=>n(`overview`),children:e.project}),(0,f.jsx)(`ul`,{children:c.map((e,r)=>e.type===`header`?(0,f.jsx)(`li`,{className:`nav-section-header`,children:e.label},`h-${r}`):(0,f.jsx)(`li`,{children:(0,f.jsxs)(`a`,{className:`${e.indent?`indent`:``} ${t===e.id?`active`:``}`,onClick:()=>n(e.id),children:[(0,f.jsx)(`span`,{className:`nav-dot`,style:{background:e.color}}),e.label]})},e.id))})]}),(0,f.jsx)(`main`,{className:`doc-content`,ref:a,children:r?(0,f.jsx)(g,{annotations:r,onBack:()=>i(null),backLabel:o?.name||`Back`}):t===`overview`?(0,f.jsx)(we,{logicMap:e,onNavigate:n}):t===`automation_overview`?(0,f.jsx)(Ce,{automations:e.systems.filter(e=>[`email_triage`,`meeting_review`].includes(e.id)),onNavigate:n}):o?(0,f.jsx)(De,{system:o,parent:s,relationships:d,onNavigate:n,onViewCode:i}):(0,f.jsx)(`div`,{className:`doc-empty`,children:`Select a system from the left.`})},r?`code`:t)]})}function Ce({automations:e,onNavigate:t}){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`h1`,{children:`Chat Automation Tabs`}),(0,f.jsx)(`p`,{className:`page-lead`,children:`Dedicated UI tabs that extend the Chat Engine with proactive, automated workflows. Instead of waiting for a user to ask Claude a question, these tabs process data in the background and present it for human review.`}),(0,f.jsxs)(`div`,{className:`context-block`,children:[(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`How they relate to the Chat Engine`}),(0,f.jsx)(`p`,{children:`Each automation tab reuses the Chat Engine's existing infrastructure - the same Claude API client, the same tool executor, the same Gmail/Calendar/Tasks integrations. They don't rebuild any of that. What they add is a background polling pipeline that fetches and processes data automatically, and a dedicated UI tab that presents the results for human review. The chat input inside each tab connects to the same Claude but with narrower context - it knows about the specific email or meeting being reviewed.`})]}),(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`Architecture pattern`}),(0,f.jsx)(`p`,{children:`Every automation tab follows the same pattern: (1) a webhook endpoint that receives events from the external service (Gmail push notifications for new emails, recording service callbacks when a transcript is ready), (2) an AI processing pipeline that classifies, summarizes, or extracts structured data from the raw input, (3) a database queue that stores processed items with their status, (4) a dedicated chat endpoint that gives Claude context about the specific item being reviewed, and (5) a UI card component that presents the queue and lets users take action. Currently using polling as a stopgap during development - webhooks are the real architecture.`})]}),(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`Why they're separate from the main chat`}),(0,f.jsx)(`p`,{children:`The main chat is reactive - the user asks, Claude responds. These tabs are proactive - the system processes data before the user asks. Email Triage pre-sorts the inbox so the user reviews a filtered queue instead of raw email. Meeting Review pre-extracts action items so the user approves tasks instead of watching transcripts. Both save hours of manual work by doing the AI processing upfront.`})]})]}),(0,f.jsx)(`h3`,{className:`section-heading`,style:{marginTop:32,borderBottom:`1px solid #e5e7eb`,paddingBottom:8},children:`Tabs`}),e.map(e=>(0,f.jsxs)(`a`,{className:`overview-card`,onClick:()=>t(e.id),children:[(0,f.jsx)(`h4`,{children:e.name}),(0,f.jsx)(`p`,{children:e.intent}),e.why&&(0,f.jsx)(`p`,{className:`overview-why`,children:e.why})]},e.id))]})}function we({logicMap:e,onNavigate:t}){let n=0,r=0,i=0,a=e.relationships.length,o=Object.values(xe).reduce((e,t)=>e+t.length,0),s=e=>{n++,r+=e.functions.length;for(let t of e.functions)i+=t.decisions.length;for(let t of e.children||[])s(t)};for(let t of e.systems)s(t);let c=[`#3b82f6`,`#10b981`,`#f59e0b`,`#ef4444`,`#8b5cf6`,`#ec4899`];return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`h1`,{children:e.project}),(0,f.jsx)(`p`,{className:`page-lead`,children:e.intent}),(0,f.jsxs)(`span`,{className:`doc-version`,children:[`Updated `,e.version]}),(0,f.jsxs)(`div`,{className:`overview-stats`,children:[(0,f.jsxs)(`div`,{className:`stat`,children:[(0,f.jsx)(`span`,{className:`stat-number`,children:n}),(0,f.jsx)(`span`,{className:`stat-label`,children:`systems`})]}),(0,f.jsxs)(`div`,{className:`stat`,children:[(0,f.jsx)(`span`,{className:`stat-number`,children:r}),(0,f.jsx)(`span`,{className:`stat-label`,children:`functions`})]}),(0,f.jsxs)(`div`,{className:`stat`,children:[(0,f.jsx)(`span`,{className:`stat-number`,children:i}),(0,f.jsx)(`span`,{className:`stat-label`,children:`decisions`})]}),(0,f.jsxs)(`div`,{className:`stat`,children:[(0,f.jsx)(`span`,{className:`stat-number`,children:a}),(0,f.jsx)(`span`,{className:`stat-label`,children:`connections`})]}),(0,f.jsxs)(`div`,{className:`stat`,children:[(0,f.jsx)(`span`,{className:`stat-number`,children:o}),(0,f.jsx)(`span`,{className:`stat-label`,children:`annotated files`})]})]}),e.systems.map((e,n)=>(0,f.jsxs)(`section`,{className:`overview-group`,children:[(0,f.jsxs)(`h3`,{className:`overview-group-title`,children:[(0,f.jsx)(`span`,{className:`nav-dot`,style:{background:c[n%c.length]}}),e.name]}),e.intent&&(0,f.jsx)(`p`,{className:`overview-group-desc`,children:e.intent}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(Te,{system:e,onNavigate:t}),e.children&&e.children.length>0&&(0,f.jsx)(`div`,{className:`overview-children`,children:e.children.map(e=>(0,f.jsx)(Ee,{system:e,onNavigate:t},e.id))})]})]},e.id))]})}function Te({system:e,onNavigate:t}){return(0,f.jsxs)(`a`,{className:`overview-card`,onClick:()=>t(e.id),children:[(0,f.jsx)(`h4`,{children:e.name}),(0,f.jsx)(`p`,{children:e.intent}),e.why&&(0,f.jsx)(`p`,{className:`overview-why`,children:e.why})]})}function Ee({system:e,onNavigate:t}){return(0,f.jsxs)(`a`,{className:`overview-card-sm`,onClick:()=>t(e.id),children:[(0,f.jsx)(`h5`,{children:e.name}),(0,f.jsx)(`p`,{children:e.intent})]})}function De({system:e,parent:t,relationships:n,onNavigate:r,onViewCode:i}){let a=e.invariants&&e.invariants.length>0,o=e.entities&&e.entities.length>0,s=e.children&&e.children.length>0,c=xe[e.id];return(0,f.jsxs)(f.Fragment,{children:[t&&(0,f.jsxs)(`div`,{className:`breadcrumb`,children:[(0,f.jsx)(`a`,{onClick:()=>r(t.id),children:t.name}),(0,f.jsx)(`span`,{className:`breadcrumb-sep`,children:`/`}),(0,f.jsx)(`span`,{children:e.name})]}),(0,f.jsx)(`h1`,{children:e.name}),(0,f.jsx)(`p`,{className:`page-lead`,children:e.intent}),(0,f.jsxs)(`div`,{className:`context-block`,children:[e.why&&(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`Why this exists`}),(0,f.jsx)(`p`,{children:e.why})]}),e.who&&(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`Who uses this`}),(0,f.jsx)(`p`,{children:e.who})]}),(0,f.jsxs)(`div`,{className:`context-row`,children:[(0,f.jsx)(`span`,{className:`context-label`,children:`How it works`}),(0,f.jsx)(`p`,{children:e.description})]})]}),e.limitations&&e.limitations.length>0&&(0,f.jsxs)(`div`,{className:`limitations-block`,children:[(0,f.jsx)(`h5`,{className:`limitations-heading`,children:`Known limitations`}),(0,f.jsx)(`ul`,{children:e.limitations.map((e,t)=>(0,f.jsx)(`li`,{children:e},t))})]}),ye[e.id]&&(0,f.jsx)(`div`,{className:`screenshot-block`,children:ye[e.id]()}),e.screenshot&&(0,f.jsx)(`div`,{className:`screenshot-block`,children:(0,f.jsx)(`img`,{src:e.screenshot,alt:`${e.name} UI`})}),a&&(0,f.jsx)(Oe,{title:`Rules`,defaultOpen:!0,children:(0,f.jsx)(`dl`,{className:`def-list`,children:e.invariants.map(e=>(0,f.jsxs)(`div`,{className:`def-item`,children:[(0,f.jsx)(`dt`,{children:e.name}),(0,f.jsx)(`dd`,{children:e.description})]},e.id))})}),o&&(0,f.jsx)(Oe,{title:`Data`,defaultOpen:!0,children:e.entities.map(e=>(0,f.jsx)(ke,{entity:e},e.id))}),n.length>0&&(0,f.jsx)(Oe,{title:`Connections`,defaultOpen:!1,children:(0,f.jsx)(`ul`,{className:`connection-list`,children:n.map((e,t)=>(0,f.jsx)(`li`,{children:e.description},t))})}),e.config&&e.config.length>0&&(0,f.jsx)(Oe,{title:`Configuration`,defaultOpen:!1,children:(0,f.jsx)(`div`,{className:`config-list`,children:e.config.map((e,t)=>(0,f.jsxs)(`div`,{className:`config-item`,children:[(0,f.jsx)(`code`,{className:`config-name`,children:e.name}),(0,f.jsx)(`span`,{className:`config-desc`,children:e.description})]},t))})}),e.dependencies&&e.dependencies.length>0&&(0,f.jsx)(Oe,{title:`Dependencies`,defaultOpen:!1,children:(0,f.jsx)(`ul`,{className:`dep-list`,children:e.dependencies.map((e,t)=>(0,f.jsx)(`li`,{children:e},t))})}),e.failure_modes&&e.failure_modes.length>0&&(0,f.jsx)(Oe,{title:`Failure Modes`,defaultOpen:!1,children:(0,f.jsx)(`div`,{className:`failure-list`,children:e.failure_modes.map((e,t)=>(0,f.jsx)(`div`,{className:`failure-item`,children:e},t))})}),e.validation&&e.validation.length>0&&(0,f.jsx)(Oe,{title:`Validation`,defaultOpen:!1,children:(0,f.jsx)(`div`,{className:`validation-list`,children:e.validation.map((e,t)=>(0,f.jsx)(`div`,{className:`validation-item`,children:e},t))})}),s&&(0,f.jsxs)(`section`,{className:`children-section`,children:[(0,f.jsx)(`h3`,{className:`section-heading`,children:`Tools`}),(0,f.jsx)(`div`,{className:`children-grid`,children:e.children.map(e=>(0,f.jsxs)(`a`,{className:`child-card`,onClick:()=>r(e.id),children:[(0,f.jsx)(`h4`,{children:e.name}),(0,f.jsx)(`p`,{children:e.intent}),(0,f.jsxs)(`span`,{className:`child-meta`,children:[e.functions.length,` function`,e.functions.length===1?``:`s`]})]},e.id))})]}),c&&c.length>0&&(0,f.jsxs)(`section`,{className:`code-links-section`,children:[(0,f.jsx)(`h3`,{className:`section-heading`,children:`Source Code`}),c.map((e,t)=>(0,f.jsxs)(`a`,{className:`code-link`,onClick:()=>i(e.annotation),children:[(0,f.jsxs)(`div`,{className:`code-link-header`,children:[(0,f.jsx)(`span`,{className:`code-link-icon`,children:`</>`}),(0,f.jsx)(`span`,{className:`code-link-title`,children:e.label})]}),(0,f.jsx)(`p`,{className:`code-link-desc`,children:e.annotation.sections.map(e=>e.title).join(` / `)})]},t))]})]})}function Oe({title:e,defaultOpen:t=!0,children:n}){let[r,i]=(0,l.useState)(t);return(0,f.jsxs)(`section`,{className:`collapsible`,children:[(0,f.jsxs)(`button`,{className:`collapsible-header`,onClick:()=>i(!r),children:[(0,f.jsx)(`h3`,{className:`section-heading`,children:e}),(0,f.jsx)(`span`,{className:`collapsible-indicator`,children:r?`−`:`+`})]}),r&&(0,f.jsx)(`div`,{className:`collapsible-body`,children:n})]})}function ke({entity:e}){let[t,n]=(0,l.useState)(!1);return(0,f.jsxs)(`div`,{className:`entity-block`,children:[(0,f.jsxs)(`div`,{className:`entity-header`,children:[(0,f.jsx)(`h4`,{children:e.name}),e.key_fields.length>0&&(0,f.jsx)(`button`,{className:`entity-toggle`,onClick:()=>n(!t),children:t?`Hide fields`:`${e.key_fields.length} fields`})]}),(0,f.jsx)(`p`,{children:e.description}),t&&(0,f.jsx)(`div`,{className:`field-list`,children:e.key_fields.map((e,t)=>(0,f.jsx)(`div`,{className:`field-row`,children:e},t))})]})}function Ae(){let[e,t]=(0,l.useState)(null),[n,r]=(0,l.useState)(null);return(0,l.useEffect)(()=>{let e=new URLSearchParams(window.location.search).get(`project`)||`comm-chat`;fetch(`/data/${e}.json`).then(e=>{if(!e.ok)throw Error(`Failed to load logic map: ${e.status}`);return e.json()}).then(t).catch(e=>r(e.message))},[]),n?(0,f.jsxs)(`div`,{style:{padding:40,color:`#ef4444`,fontFamily:`system-ui`,height:`100vh`},children:[(0,f.jsx)(`h1`,{children:`Failed to load logic map`}),(0,f.jsx)(`p`,{children:n})]}):e?(0,f.jsx)(Se,{logicMap:e}):(0,f.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:`100vh`,color:`#9ca3af`,fontFamily:`system-ui`,fontSize:14},children:`Loading...`})}(0,u.createRoot)(document.getElementById(`root`)).render((0,f.jsx)(l.StrictMode,{children:(0,f.jsx)(Ae,{})}));