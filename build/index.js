!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:11,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;T.clear(),j=(0,P.default)(e,I),z=(0,m.default)(j),G=(0,M.default)(j,z.walls),Y.followPuppet.apply(Y,o(j.getVirtPos(G.getPos()))),(0,_.initGameEvents)(z,G,j,C,O,A,Y,function(){return u(function(){return a()})},function(){return u(function(){return a(e+2,t+1)})})}function u(e){(0,_.clearGameEvents)(C),G=null,z.walls=[],e()}var i=n(1),f=r(i),c=n(2),l=r(c),d=n(3),s=r(d),p=n(4),h=r(p),v=n(5),g=r(v),y=n(6),m=r(y),w=n(8),P=r(w),x=n(9),M=r(x),S=n(10),b=r(S),_=n(11),I=1e3,E=1e3,A=document.getElementById("foo-layer"),O=document.getElementById("bar-layer"),T=(0,f.default)(A.getContext("2d"),A),R=(0,f.default)(O.getContext("2d"),O),k=(0,l.default)(O.getContext("2d"),O),C=(0,g.default)();(0,h.default)(I,E,(0,s.default)([A,O],C.onResize,T.onResize,k.onResize,R.onResize));var j=void 0,z={walls:[]},G=null,Y=(0,b.default)(I);a();var W=function e(){T.render([G].filter(function(e){return null!==e}).concat(z.walls)),R.render([Y]),requestAnimationFrame(e)};W()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0,r=!1;return{onResize:function(e){n=e},clear:function(){r=!0},render:function(o){r?(e.clearRect(0,0,t.width,t.height),r=!1):o.filter(function(e){return e.updated()}).forEach(function(t){return t.clear(e,n)}),o.filter(function(e){return e.updated()}).forEach(function(t){return t.draw(e,n)})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0;return{onResize:function(e){n=e},drawText:function(r,o,a,u,i,f){e.font="bold "+(u||50)*n+"px sans-serif",e.fillStyle=i||"#fff",e.fillText(r,Math.round(o*n),Math.round(a*n));var c=function(){return e.clearRect(0,0,t.width,t.height)};return f&&setTimeout(c,f||500),c}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r){e.forEach(function(e){e.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),e.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),e.width=n,e.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[t].concat(r)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function r(e,t,r){n.forEach(function(n){return n(r,e,t)})}function o(){var t=window,n=t.innerWidth,o=t.innerHeight;n*a>o?r(parseInt(Math.floor(o/a),10),o,o/a/e):r(n,parseInt(Math.floor(n*a),10),n/e)}var a=t/e;o(),window.addEventListener("resize",o)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=void 0,t=[];return{onResize:function(t){e=t},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,a=function(t){return r(t,e)};t.push({elem:o,eventName:n,fn:a}),o.addEventListener(n,a)},clear:function(){t.forEach(function(e){var t=e.elem,n=e.eventName,r=e.fn;return t.removeEventListener(n,r)})}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.initGrid,n=e.Types,r=e.getP,o=e.getY,u=e.SIZE,i=(0,a.default)(e),f=i.makeWall,c=t();c[r((u-1)/2,(u-1)/2)]=n.ClosedSpace;for(var l=[],d=0;d<u*u;d+=Math.floor(3*Math.random())+1){var s=d+o(d)%2;if(c[s]!==n.ClosedSpace){var p=f(s,c,0===Math.floor(3*Math.random())?3:2);null!==p&&l.push(p)}}return{walls:l,complexity:l.length}};var o=n(7),a=r(o)},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e){var t=e.getOpen,o=e.Types,a=e.getScreenPos,u=e.getGridSize,i=e.getRect,f=e.getX,c=e.getY,l=e.getP,d=function(e){var t=e,o=Math.floor(Math.random()*e.length),d=t[o],s=function(){return{x:f(d),y:c(d)}},p=function(e,t,n){return{x:e.x+Math.round(t.x*Math.cos(n)-t.y*Math.sin(n)),y:e.y+Math.round(t.x*Math.sin(n)+t.y*Math.cos(n))}},h=function(e,t,n,r){return e.map(function(e,o){return p(t,n[o],r)}).map(function(e){var t=e.x,n=e.y;return l(t,n)})},v=function(){for(var t=s(),n=e.map(function(e){return{x:f(e),y:c(e)}}),r=n.map(function(e){return{x:t.x-e.x,y:t.y-e.y}}),o=0;o<4;o++){var a=90*o*(Math.PI/180),u=h(n,t,r,a);if(u.filter(function(t,n){return t===e[n]}).length===e.length)return o}return 0},g=v();return{movePivot:function(){o=o<t.length-1?o+1:0,d=t[o],e=t,g=v()},getSpaces:function(){return t},isAt:function(e,n,o){for(var i=u(o)/2,f=0;f<t.length;f++){var c=a(t[f],o),l=r(c,2),d=l[0],s=l[1];if(s-i<n&&s+i>n&&d-i<e&&d+i>e)return!0}return!1},rotate:function(n){var r=s(),o=e.map(function(e){return{x:f(e),y:c(e)}}),a=o.map(function(e){return{x:r.x-e.x,y:r.y-e.y}}),u=g;do{g=3===g?0:g+1;var i=90*g*(Math.PI/180),l=h(o,r,a,i);if(l.indexOf(-1)<0&&0===l.filter(function(e){return!n(e)}).length){t=l;break}}while(g!==u);return g},draw:function(e,r){e.beginPath(),e.lineWidth=Math.floor(u(r)),e.lineCap="round",1===t.length?(e.moveTo.apply(e,n(a(t[0],r))),e.lineTo.apply(e,n(a(t[0],r)))):t.forEach(function(t,o){0===o?e.moveTo.apply(e,n(a(t,r))):e.lineTo.apply(e,n(a(t,r)))}),e.stroke(),e.beginPath(),e.fillStyle="white",e.arc.apply(e,n(a(d,r)).concat([u(r)/6,0,2*Math.PI,!1])),e.fill()},clear:function(e,r){t.forEach(function(t){e.clearRect.apply(e,n(i(t,r)))})},updated:function(){return!0}}},s=function e(n,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r[n]=o.ClosedSpace;var i=t(n,r);return 0===i.length||1===a?u.length<1?null:d(u.concat(n)):e(i[parseInt(Math.random()*i.length,10)],r,a-1,u.concat(n))};return{makeWall:s}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n={OpenSpace:0,PathSpace:1,ClosedSpace:2},r=t/e,o=function(t){return t%e},a=function(t){return(t-t%e)/e},u=function(t,n){return t>=0&&t<e&&n>=0&&n<e?t+n*e:-1},i=function(t,n){return[n>0?u(t,n-1):null,n<e-1?u(t,n+1):null,t>0?u(t-1,n):null,t<e-1?u(t+1,n):null]},f=function(e,t){return[o(e)*r*t+r*t*.5,a(e)*r*t+r*t*.5]},c=function(e,t){return[o(e)*r*t,a(e)*r*t,r*t,r*t]},l=function(e){return r*e},d=function(e){return[o(e)*r+r/2,a(e)*r+r/2]},s=function(e,t){return t[e]===n.OpenSpace},p=function(e,t){return i(o(e),a(e)).filter(function(e){return s(e,t)})},h=function(){for(var t=[],r=0;r<e;r++)for(var o=0;o<e;o++)t[u(o,r)]=n.OpenSpace;return t},v=function(e,t){return function(n){return e.filter(function(e,n){return n!==t}).map(function(e){return e.getSpaces()}).reduce(function(e,t){return e.concat(t)}).indexOf(n)<0}};return{SIZE:e,getRect:c,getScreenPos:f,getGridSize:l,getVirtPos:d,getX:o,getY:a,getP:u,getOpen:p,Types:n,initGrid:h,gridSpaceIsFree:v}}},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.getP,o=e.getScreenPos,a=e.getGridSize,u=e.SIZE,i=e.getRect,f=e.getX,c=e.getY,l=r((u-1)/2,(u-1)/2);return{getPos:function(){return l},move:function(n,o){var a=r(f(l)+n,c(l)+o);a>-1&&e.gridSpaceIsFree(t,-1)(a)&&(l=a)},draw:function(e,t){e.beginPath(),e.arc.apply(e,n(o(l,t)).concat([a(t)/6,0,2*Math.PI,!1])),e.fill()},clear:function(e,t){e.clearRect.apply(e,n(i(l,t)))},updated:function(){return!0}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={x:0,y:0},n=!0,r=!0,o="Welcome to my confused mind!";return{followPuppet:function(e,r){t={x:e,y:r},n=!0},disappear:function(e){r=!1,n=!0},draw:function(a,u){if(r){var i=t.y>250?150:450,f=e/2;a.fillStyle="rgba(255,255,255,1)",a.strokeStyle="black",a.lineWidth=1*u,a.save(),a.translate(f*u,i*u),a.scale(3,1),a.beginPath(),a.arc(0,0,150*u,2*Math.PI,!1),a.fill(),a.stroke(),a.restore();for(var c=Math.atan2(i-t.y,f/2-t.x),l=c-1,d=Math.sqrt(Math.pow(f/2-t.x,2)+Math.pow(i-t.y,2)),s=t.x,p=t.y,h=0;h<10;h++)l+=.1,s+=Math.cos(l)*(d*(h/30))*u,p+=Math.sin(l)*(d*(h/30))*u,a.beginPath(),a.arc(s*u,p*u,(h+1)*u,2*Math.PI,!1),a.fill();n=!1,a.font="bold "+30*u+"px sans-serif",a.fillStyle="black",a.fillText(o,f*u-a.measureText(o).width/2,(15+i)*u)}},clear:function(e){e.clearRect(0,0,e.canvas.width,e.canvas.height)},updated:function(){return n}}}},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t,r,o,a,u,i,f,c){o.add("click",function(n,o){i.disappear(a.getContext("2d")),e.walls.map(function(e,t){return{w:e,wIdx:t}}).filter(function(e){var t=e.w;return t.isAt(n.clientX-n.target.offsetLeft,n.clientY-n.target.offsetTop,o)}).forEach(function(t){var n=t.w,a=t.wIdx;n.clear(u.getContext("2d"),o),n.rotate(r.gridSpaceIsFree(e.walls,a))}),r.gridSpaceIsFree(e.walls,-1)(t.getPos())||window.setTimeout(f,1e3)},a),o.add("contextmenu",function(t,n){return i.disappear(a.getContext("2d")),e.walls.filter(function(e){return e.isAt(t.clientX-t.target.offsetLeft,t.clientY-t.target.offsetTop,n)}).forEach(function(e){return e.movePivot()}),t.preventDefault()}),o.add("keypress",function(e,o){switch(i.disappear(a.getContext("2d")),t.clear(u.getContext("2d"),o),e.keyCode){case 37:t.move(-1,0);break;case 38:t.move(0,-1);break;case 39:t.move(1,0);break;case 40:t.move(0,1)}i.followPuppet.apply(i,n(r.getVirtPos(t.getPos()))),0!==r.getX(t.getPos())&&0!==r.getY(t.getPos())&&r.getX(t.getPos())!==r.SIZE-1&&r.getY(t.getPos())!==r.SIZE-1||window.setTimeout(c,1e3)})}function o(e){e.clear()}Object.defineProperty(t,"__esModule",{value:!0}),t.initGameEvents=r,t.clearGameEvents=o}]);