!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:11,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;I.clear(),T=(0,w.default)(e,S),R=(0,y.default)(T),j=(0,x.default)(T,R.walls),(0,P.initGameEvents)(R,j,T,A,b,_,function(){return u(function(){return o()})},function(){return u(function(){return o(e+2,t+1)})})}function u(e){(0,P.clearGameEvents)(A),j=null,R.walls=[],e()}var i=n(1),a=r(i),c=n(2),f=r(c),l=n(3),d=r(l),s=n(4),v=r(s),p=n(5),h=r(p),g=n(6),y=r(g),m=n(8),w=r(m),M=n(9),x=r(M),P=n(10),S=1e3,E=1e3,_=document.getElementById("foo-layer"),b=document.getElementById("bar-layer"),I=(0,a.default)(_.getContext("2d"),_),O=(0,f.default)(b.getContext("2d"),b),A=(0,h.default)();(0,v.default)(S,E,(0,d.default)([_,b],A.onResize,I.onResize,O.onResize));var T=void 0,R={walls:[]},j=null;o();var k=function e(){I.render([j].filter(function(e){return null!==e}).concat(R.walls)),requestAnimationFrame(e)};k()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0,r=!1;return{onResize:function(e){n=e},clear:function(){r=!0},render:function(o){r?(e.clearRect(0,0,t.width,t.height),r=!1):o.filter(function(e){return e.updated()}).forEach(function(t){return t.clear(e,n)}),o.filter(function(e){return e.updated()}).forEach(function(t){return t.draw(e,n)})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0;return{onResize:function(e){n=e},drawText:function(r,o,u,i,a,c){e.font="bold "+(i||50)*n+"px sans-serif",e.fillStyle=a||"#fff",e.fillText(r,Math.round(o*n),Math.round(u*n));var f=function(){return e.clearRect(0,0,t.width,t.height)};return c&&setTimeout(f,c||500),f}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r){e.forEach(function(e){e.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),e.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),e.width=n,e.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[t].concat(r)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function r(e,t,r){n.forEach(function(n){return n(r,e,t)})}function o(){var t=window,n=t.innerWidth,o=t.innerHeight;n*u>o?r(parseInt(Math.floor(o/u),10),o,o/u/e):r(n,parseInt(Math.floor(n*u),10),n/e)}var u=t/e;o(),window.addEventListener("resize",o)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=void 0,t=[];return{onResize:function(t){e=t},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,u=function(t){return r(t,e)};t.push({elem:o,eventName:n,fn:u}),o.addEventListener(n,u)},clear:function(){t.forEach(function(e){var t=e.elem,n=e.eventName,r=e.fn;return t.removeEventListener(n,r)})}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.initGrid,n=e.Types,r=e.getP,o=e.getY,i=e.SIZE,a=(0,u.default)(e),c=a.makeWall,f=t();f[r((i-1)/2,(i-1)/2)]=n.ClosedSpace;for(var l=[],d=0;d<i*i;d+=Math.floor(3*Math.random())+1){var s=d+o(d)%2;if(f[s]!==n.ClosedSpace){var v=c(s,f,0===Math.floor(3*Math.random())?3:2);null!==v&&l.push(v)}}return{walls:l,complexity:l.length}};var o=n(7),u=r(o)},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],r=!0,o=!1,u=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{!r&&a.return&&a.return()}finally{if(o)throw u}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e){var t=e.getOpen,o=e.Types,u=e.getScreenPos,i=e.getGridSize,a=e.getRect,c=e.getX,f=e.getY,l=e.getP,d=function(e){var t=e,o=Math.floor(Math.random()*e.length),d=t[o],s=function(){return{x:c(d),y:f(d)}},v=function(e,t,n){return{x:e.x+Math.round(t.x*Math.cos(n)-t.y*Math.sin(n)),y:e.y+Math.round(t.x*Math.sin(n)+t.y*Math.cos(n))}},p=function(e,t,n,r){return e.map(function(e,o){return v(t,n[o],r)}).map(function(e){var t=e.x,n=e.y;return l(t,n)})},h=function(){for(var t=s(),n=e.map(function(e){return{x:c(e),y:f(e)}}),r=n.map(function(e){return{x:t.x-e.x,y:t.y-e.y}}),o=0;o<4;o++){var u=90*o*(Math.PI/180),i=p(n,t,r,u);if(i.filter(function(t,n){return t===e[n]}).length===e.length)return o}return 0},g=h();return{movePivot:function(){o=o<t.length-1?o+1:0,d=t[o],e=t,g=h()},getSpaces:function(){return t},isAt:function(e,n,o){for(var a=i(o)/2,c=0;c<t.length;c++){var f=u(t[c],o),l=r(f,2),d=l[0],s=l[1];if(s-a<n&&s+a>n&&d-a<e&&d+a>e)return!0}return!1},rotate:function(n){var r=s(),o=e.map(function(e){return{x:c(e),y:f(e)}}),u=o.map(function(e){return{x:r.x-e.x,y:r.y-e.y}}),i=g;do{g=3===g?0:g+1;var a=90*g*(Math.PI/180),l=p(o,r,u,a);if(l.indexOf(-1)<0&&0===l.filter(function(e){return!n(e)}).length){t=l;break}}while(g!==i);return g},draw:function(e,r){e.beginPath(),e.lineWidth=Math.floor(i(r)),e.lineCap="round",1===t.length?(e.moveTo.apply(e,n(u(t[0],r))),e.lineTo.apply(e,n(u(t[0],r)))):t.forEach(function(t,o){0===o?e.moveTo.apply(e,n(u(t,r))):e.lineTo.apply(e,n(u(t,r)))}),e.stroke(),e.beginPath(),e.fillStyle="white",e.arc.apply(e,n(u(d,r)).concat([i(r)/6,0,2*Math.PI,!1])),e.fill()},clear:function(e,r){t.forEach(function(t){e.clearRect.apply(e,n(a(t,r)))})},updated:function(){return!0}}},s=function e(n,r){var u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r[n]=o.ClosedSpace;var a=t(n,r);return 0===a.length||1===u?i.length<1?null:d(i.concat(n)):e(a[parseInt(Math.random()*a.length,10)],r,u-1,i.concat(n))};return{makeWall:s}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n={OpenSpace:0,PathSpace:1,ClosedSpace:2},r=t/e,o=function(t){return t%e},u=function(t){return(t-t%e)/e},i=function(t,n){return t>=0&&t<e&&n>=0&&n<e?t+n*e:-1},a=function(t,n){return[n>0?i(t,n-1):null,n<e-1?i(t,n+1):null,t>0?i(t-1,n):null,t<e-1?i(t+1,n):null]},c=function(e,t){return[o(e)*r*t+r*t*.5,u(e)*r*t+r*t*.5]},f=function(e,t){return[o(e)*r*t,u(e)*r*t,r*t,r*t]},l=function(e){return r*e},d=function(e,t){return t[e]===n.OpenSpace},s=function(e,t){return a(o(e),u(e)).filter(function(e){return d(e,t)})},v=function(){for(var t=[],r=0;r<e;r++)for(var o=0;o<e;o++)t[i(o,r)]=n.OpenSpace;return t},p=function(e,t){return function(n){return e.filter(function(e,n){return n!==t}).map(function(e){return e.getSpaces()}).reduce(function(e,t){return e.concat(t)}).indexOf(n)<0}};return{SIZE:e,getRect:f,getScreenPos:c,getGridSize:l,getX:o,getY:u,getP:i,getOpen:s,Types:n,initGrid:v,gridSpaceIsFree:p}}},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.getP,o=e.getScreenPos,u=e.getGridSize,i=e.SIZE,a=e.getRect,c=e.getX,f=e.getY,l=r((i-1)/2,(i-1)/2);return{getPos:function(){return l},move:function(n,o){var u=r(c(l)+n,f(l)+o);u>-1&&e.gridSpaceIsFree(t,-1)(u)&&(l=u)},draw:function(e,t){e.beginPath(),e.arc.apply(e,n(o(l,t)).concat([u(t)/6,0,2*Math.PI,!1])),e.fill()},clear:function(e,t){e.clearRect.apply(e,n(a(l,t)))},updated:function(){return!0}}}},function(e,t){"use strict";function n(e,t,n,r,o,u,i,a){r.add("click",function(r,o){e.walls.map(function(e,t){return{w:e,wIdx:t}}).filter(function(e){var t=e.w;return t.isAt(r.clientX-r.target.offsetLeft,r.clientY-r.target.offsetTop,o)}).forEach(function(t){var r=t.w,i=t.wIdx;r.clear(u.getContext("2d"),o),r.rotate(n.gridSpaceIsFree(e.walls,i))}),n.gridSpaceIsFree(e.walls,-1)(t.getPos())||window.setTimeout(i,1e3)},o),r.add("contextmenu",function(t,n){return e.walls.filter(function(e){return e.isAt(t.clientX-t.target.offsetLeft,t.clientY-t.target.offsetTop,n)}).forEach(function(e){return e.movePivot()}),t.preventDefault()}),r.add("keypress",function(e,r){switch(t.clear(u.getContext("2d"),r),e.keyCode){case 37:t.move(-1,0);break;case 38:t.move(0,-1);break;case 39:t.move(1,0);break;case 40:t.move(0,1)}0!==n.getX(t.getPos())&&0!==n.getY(t.getPos())&&n.getX(t.getPos())!==n.SIZE-1&&n.getY(t.getPos())!==n.SIZE-1||window.setTimeout(a,1e3)})}function r(e){e.clear()}Object.defineProperty(t,"__esModule",{value:!0}),t.initGameEvents=n,t.clearGameEvents=r}]);