!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:11,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=e>51?51:e;E.clear(),k=(0,m.default)(n,x),W=(0,v.default)(k),j=(0,b.default)(k,W.walls),R.followPuppet.apply(R,o(k.getVirtPos(j.getPos()))),z&&(R.setTrainOfThoughtAndAppear(["Welcome to my confused mind!","I have to find a way out of here!","Use the arrow keys to move me around...","left click to rotate my brain barriers...","and right click to move the rotation point...","of a brain barrier.","Press any key to suppress my thought bubble...","Be careful not to squash me!"]),z=!1),(0,T.initGameEvents)(W,j,k,_,I,A,R,function(){return u(function(){return a()})},function(){return u(function(){return a(n+2,t+1)})})}function u(e){j=null,W.walls=[],e()}var i=n(1),f=r(i),c=n(2),l=r(c),s=n(3),d=r(s),h=n(4),g=r(h),p=n(5),v=r(p),y=n(7),m=r(y),w=n(8),b=r(w),P=n(9),M=r(P),T=n(10),x=1e3,S=1e3,A=document.getElementById("foo-layer"),I=document.getElementById("bar-layer"),E=(0,f.default)(A.getContext("2d"),A),O=(0,f.default)(I.getContext("2d"),I),_=(0,g.default)(),k=void 0,W={walls:[]},j=null,R=(0,M.default)(x),z=!0;(0,d.default)(x,S,(0,l.default)([A,I],_.onResize,E.onResize,O.onResize,function(){return[j].filter(function(e){return null!==e}).concat(R).concat(W.walls).forEach(function(e){return e.forceUpdate()})})),a();var C=function e(){E.render([j].filter(function(e){return null!==e}).concat(W.walls)),O.render([R]),requestAnimationFrame(e)};C()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0,r=!1;return{onResize:function(e){n=e},clear:function(){r=!0},render:function(o){r?(e.clearRect(0,0,t.width,t.height),r=!1):o.filter(function(e){return e.updated()}).forEach(function(t){return t.clear(e,n)}),o.filter(function(e){return e.updated()}).forEach(function(t){return t.draw(e,n)})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r){e.forEach(function(e){e.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),e.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),e.width=n,e.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[t].concat(r)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function r(e,t,r){n.forEach(function(n){return n(r,e,t)})}function o(){var t=window,n=t.innerWidth,o=t.innerHeight;n*a>o?r(parseInt(Math.floor(o/a),10),o,o/a/e):r(n,parseInt(Math.floor(n*a),10),n/e)}var a=t/e;o(),window.addEventListener("resize",o)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=void 0,t=[];return{onResize:function(t){e=t},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,a=function(t){return r(t,e)};t.push({elem:o,eventName:n,fn:a}),o.addEventListener(n,a)},clear:function(){t.forEach(function(e){var t=e.elem,n=e.eventName,r=e.fn;return t.removeEventListener(n,r)})}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.initGrid,n=e.Types,r=e.getP,o=e.getY,u=e.SIZE,i=(0,a.default)(e),f=i.makeWall,c=t();c[r((u-1)/2,(u-1)/2)]=n.ClosedSpace;for(var l=[],s=0;s<u*u;s+=Math.floor(3*Math.random())+1){var d=s+o(s)%2;if(c[d]!==n.ClosedSpace){var h=f(d,c,0===Math.floor(2.5*Math.random())?3:2);null!==h&&l.push(h)}}return{walls:l,complexity:l.length}};var o=n(6),a=r(o)},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e){var t=e.getOpen,o=e.Types,a=e.getScreenPos,u=e.getGridSize,i=e.getRect,f=e.getX,c=e.getY,l=e.getP,s=function(e){var t=e,o=Math.floor(Math.random()*e.length),s=t[o],d=!0,h=function(){return{x:f(s),y:c(s)}},g=function(e,t,n){return{x:e.x+Math.round(t.x*Math.cos(n)-t.y*Math.sin(n)),y:e.y+Math.round(t.x*Math.sin(n)+t.y*Math.cos(n))}},p=function(e,t,n,r){return e.map(function(e,o){return g(t,n[o],r)}).map(function(e){var t=e.x,n=e.y;return l(t,n)})},v=function(){for(var t=h(),n=e.map(function(e){return{x:f(e),y:c(e)}}),r=n.map(function(e){return{x:t.x-e.x,y:t.y-e.y}}),o=0;o<4;o++){var a=90*o*(Math.PI/180),u=p(n,t,r,a);if(u.filter(function(t,n){return t===e[n]}).length===e.length)return o}return 0},y=function(e,r,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;e.beginPath(),e.lineCap="round",e.strokeStyle=o,e.lineWidth=Math.floor(u(r)-2*i),t.forEach(function(t,o){0===o?e.moveTo.apply(e,n(a(t,r).map(function(e){return e-i}))):e.lineTo.apply(e,n(a(t,r).map(function(e){return e-i})))}),e.stroke()},m=function(e,t){e.save(),e.beginPath(),e.fillStyle="rgb(96, 0, 0)",e.translate.apply(e,n(a(s,t))),e.arc(-1,-1,u(t)/10,0,2*Math.PI,!1),e.fill(),e.beginPath(),e.strokeStyle="rgb(196, 96, 96)";var r=u(t);e.lineWidth=Math.round(r/14),e.moveTo(-1,-1),e.lineTo(-3*t,-.4*r*t),e.stroke(),e.restore()},w=v();return{movePivot:function(){o=o<t.length-1?o+1:0,s=t[o],e=t,w=v(),d=!0},getSpaces:function(){return t},isAt:function(e,n,o){for(var i=u(o)/2,f=0;f<t.length;f++){var c=a(t[f],o),l=r(c,2),s=l[0],d=l[1];if(d-i<n&&d+i>n&&s-i<e&&s+i>e)return!0}return!1},rotate:function(n){var r=h(),o=e.map(function(e){return{x:f(e),y:c(e)}}),a=o.map(function(e){return{x:r.x-e.x,y:r.y-e.y}}),u=w;do{w=3===w?0:w+1;var i=90*w*(Math.PI/180),l=p(o,r,a,i);if(l.indexOf(-1)<0&&0===l.filter(function(e){return!n(e)}).length){t=l;break}}while(w!==u);return d=!0,w},draw:function(e,t){y(e,t,"rgba(96, 0, 0, 0.6)",0),y(e,t,"rgba(128, 0, 0, 0.8)",1),y(e,t,"rgb(196, 0, 0)",2),m(e,t),d=!1},clear:function(e,r){t.forEach(function(t){e.clearRect.apply(e,n(i(t,r).map(function(e,t){return t<2?e-1:e+1})))})},forceUpdate:function(){d=!0},updated:function(){return d}}},d=function e(n,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r[n]=o.ClosedSpace;var i=t(n,r);return 0===i.length||1===a?u.length<1?null:s(u.concat(n)):e(i[parseInt(Math.random()*i.length,10)],r,a-1,u.concat(n))};return{makeWall:d}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n={OpenSpace:0,PathSpace:1,ClosedSpace:2},r=t/e,o=function(t){return t%e},a=function(t){return(t-t%e)/e},u=function(t,n){return t>=0&&t<e&&n>=0&&n<e?t+n*e:-1},i=function(t,n){return[n>0?u(t,n-1):null,n<e-1?u(t,n+1):null,t>0?u(t-1,n):null,t<e-1?u(t+1,n):null]},f=function(e,t){return[o(e)*r*t+r*t*.5,a(e)*r*t+r*t*.5]},c=function(e,t){return[o(e)*r*t,a(e)*r*t,r*t,r*t]},l=function(e){return r*e},s=function(e){return[o(e)*r+r/2,a(e)*r+r/2]},d=function(e,t){return t[e]===n.OpenSpace},h=function(e,t){return i(o(e),a(e)).filter(function(e){return d(e,t)})},g=function(){for(var t=[],r=0;r<e;r++)for(var o=0;o<e;o++)t[u(o,r)]=n.OpenSpace;return t},p=function(e,t){return function(n){return e.filter(function(e,n){return n!==t}).map(function(e){return e.getSpaces()}).reduce(function(e,t){return e.concat(t)},[]).indexOf(n)<0}};return{SIZE:e,getRect:c,getScreenPos:f,getGridSize:l,getVirtPos:s,getX:o,getY:a,getP:u,getOpen:h,Types:n,initGrid:g,gridSpaceIsFree:p}}},function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.getP,o=e.getScreenPos,a=e.getGridSize,u=e.SIZE,i=e.getRect,f=e.getX,c=e.getY,l=r((u-1)/2,(u-1)/2),s=l,d=!0;return{getPos:function(){return l},move:function(n,o){var a=r(f(l)+n,c(l)+o);s=l,a>-1&&e.gridSpaceIsFree(t,-1)(a)&&(l=a),d=!0},draw:function(e,t){e.beginPath(),e.fillStyle="rgb(128,128,255)",e.arc.apply(e,n(o(l,t)).concat([a(t)/3,0,2*Math.PI,!1])),e.fill(),e.fillStyle="black",e.font="normal "+.75*a(t)+"px sans-serif",e.save(),e.translate(-(a(t)/4),a(t)/10),e.fillText.apply(e,["∞"].concat(n(o(l,t)))),e.restore(),d=!1},clear:function(e,t){e.clearRect.apply(e,n(i(s,t)))},forceUpdate:function(){d=!0},updated:function(){return d}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={x:0,y:0},n=!0,r=!1,o="...",a=[],u=function(){a.forEach(function(e){return clearTimeout(e)}),r=!1,n=!0,o="..."};return{isVisible:function(){return r},followPuppet:function(e,r){t={x:e,y:r},n=!0},disappear:u,setTrainOfThoughtAndAppear:function(e){var t=2500;o=e.shift(),a.forEach(function(e){return clearTimeout(e)}),e.forEach(function(e,r){a.push(setTimeout(function(){o=e,n=!0},t*(r+1)))}),a.push(setTimeout(u,(e.length+1)*t)),r=!0},draw:function(a,u){if(r){var i=t.y>250?150:450,f=e/2;a.fillStyle="rgba(255,255,255,1)",a.strokeStyle="black",a.lineWidth=1*u,a.save(),a.translate(f*u,i*u),a.scale(3,1),a.beginPath(),a.arc(0,0,150*u,2*Math.PI,!1),a.fill(),a.stroke(),a.restore();for(var c=Math.atan2(i-t.y,f/2-t.x),l=c-1.5,s=Math.sqrt(Math.pow(f/2-t.x,2)+Math.pow(i-t.y,2)),d=t.x-10,h=t.y,g=0;g<10;g++)l+=.2,d+=Math.cos(l)*(s*(g/70)),h+=Math.sin(l)*(s*(g/70)),a.beginPath(),a.arc(d*u,h*u,(g+1)*u,2*Math.PI,!1),a.fill();a.font="bold "+30*u+"px sans-serif",a.fillStyle="black",a.fillText(o,f*u-a.measureText(o).width/2,(15+i)*u),n=!1}},clear:function(e){e.clearRect(0,0,e.canvas.width,e.canvas.height)},forceUpdate:function(){n=!0},updated:function(){return n}}}},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t,n,o,u,i,f,c,l){var s=0,d=setInterval(function(){s++,s>=10&&!f.isVisible()&&(f.setTrainOfThoughtAndAppear((0,a.strayThought)()),s=0)},1e3);o.add("click",function(r,u){e.walls.map(function(e,t){return{w:e,wIdx:t}}).filter(function(e){var t=e.w;return t.isAt(r.clientX-r.target.offsetLeft,r.clientY-r.target.offsetTop,u)}).forEach(function(t){var r=t.w,o=t.wIdx;r.clear(i.getContext("2d"),u),r.rotate(n.gridSpaceIsFree(e.walls,o))}),n.gridSpaceIsFree(e.walls,-1)(t.getPos())||(f.setTrainOfThoughtAndAppear([(0,a.gameOverThought)()]),clearInterval(d),o.clear(),window.setTimeout(c,2500))},u),o.add("contextmenu",function(t,n){return e.walls.filter(function(e){return e.isAt(t.clientX-t.target.offsetLeft,t.clientY-t.target.offsetTop,n)}).forEach(function(e){return e.movePivot()}),t.preventDefault()}),o.add("keydown",function(e,u){switch(s=0,f.disappear(),e.keyCode){case 37:t.move(-1,0);break;case 38:t.move(0,-1);break;case 39:t.move(1,0);break;case 40:t.move(0,1)}f.followPuppet.apply(f,r(n.getVirtPos(t.getPos()))),0!==n.getX(t.getPos())&&0!==n.getY(t.getPos())&&n.getX(t.getPos())!==n.SIZE-1&&n.getY(t.getPos())!==n.SIZE-1||(clearInterval(d),o.clear(),f.setTrainOfThoughtAndAppear([(0,a.salvationThought)()]),window.setTimeout(l,1e3))})}Object.defineProperty(t,"__esModule",{value:!0}),t.initGameEvents=void 0;var a=n(11);t.initGameEvents=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=["Noooo!!","The agony!","Why?!","What did you do?","The pain!","The anguish!"],r=["Thank you!","Bless you!","Salvation!","Freedom!","Joy!","Hurray!"],o=[["Where did I put my keys?","I must have left them somewhere..."],["What are you waiting for?","I'm going crazy in here!"],["What were the four noble truths again?","Suffering...","...the origin of suffering...","...the cessation of suffering...","...the noble 8-fold path."],["Stuck in the wheel of becoming..."],["3.14","3.141","3.1415","3.14159","3.141592..."],["These games always involve Pi...","...but never 42...","...or do they?"]],a=function(e){return e[Math.floor(Math.random()*e.length)]},u=function(){return a(n)},i=function(){return a(r)},f=function(){return a(o).slice()};t.gameOverThought=u,t.salvationThought=i,t.strayThought=f}]);