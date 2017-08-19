!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:11,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=t>51?51:t;E.clear(),k=(0,m.default)(n,x),W=(0,v.default)(k),j=(0,b.default)(k,W.walls),R.followPuppet.apply(R,o(k.getVirtPos(j.getPos()))),z&&(R.setTrainOfThoughtAndAppear(["Welcome to my confused mind!","I have to find a way out of here!","Use the arrow keys to move me around...","left click to rotate my brain barriers...","and right click to move the rotation point...","of a brain barrier.","Press any key to suppress my thought bubble...","Be careful not to squash me!"]),z=!1),(0,T.initGameEvents)(W,j,k,_,I,A,R,function(){return u(function(){return a()})},function(){return u(function(){return a(n+2,e+1)})})}function u(t){j=null,W.walls=[],t()}var i=n(1),f=r(i),c=n(2),l=r(c),s=n(3),d=r(s),h=n(4),p=r(h),g=n(5),v=r(g),y=n(7),m=r(y),w=n(8),b=r(w),P=n(9),M=r(P),T=n(10),x=1e3,S=1e3,A=document.getElementById("foo-layer"),I=document.getElementById("bar-layer"),E=(0,f.default)(A.getContext("2d"),A),O=(0,f.default)(I.getContext("2d"),I),_=(0,p.default)(),k=void 0,W={walls:[]},j=null,R=(0,M.default)(x),z=!0;(0,d.default)(x,S,(0,l.default)([A,I],_.onResize,E.onResize,O.onResize,function(){return[j].filter(function(t){return null!==t}).concat(R).concat(W.walls).forEach(function(t){return t.forceUpdate()})})),a();var C=function t(){E.render([j].filter(function(t){return null!==t}).concat(W.walls)),O.render([R]),requestAnimationFrame(t)};C()},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=void 0,r=!1;return{onResize:function(t){n=t},clear:function(){r=!0},render:function(o){r?(t.clearRect(0,0,e.width,e.height),r=!1):o.filter(function(t){return t.updated()}).forEach(function(e){return e.clear(t,n)}),o.filter(function(t){return t.updated()}).forEach(function(e){return e.draw(t,n)})}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){function e(e,n,r){t.forEach(function(t){t.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),t.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),t.width=n,t.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[e].concat(r)}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,n){function r(t,e,r){n.forEach(function(n){return n(r,t,e)})}function o(){var e=window,n=e.innerWidth,o=e.innerHeight;n*a>o?r(parseInt(Math.floor(o/a),10),o,o/a/t):r(n,parseInt(Math.floor(n*a),10),n/t)}var a=e/t;o(),window.addEventListener("resize",o)}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=void 0,e=[];return{onResize:function(e){t=e},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,a=function(e){return r(e,t)};e.push({elem:o,eventName:n,fn:a}),o.addEventListener(n,a)},clear:function(){e.forEach(function(t){var e=t.elem,n=t.eventName,r=t.fn;return e.removeEventListener(n,r)})}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.initGrid,n=t.Types,r=t.getP,o=t.getY,u=t.SIZE,i=(0,a.default)(t),f=i.makeWall,c=e();c[r((u-1)/2,(u-1)/2)]=n.ClosedSpace;for(var l=[],s=0;s<u*u;s+=Math.floor(3*Math.random())+1){var d=s+o(s)%2;if(c[d]!==n.ClosedSpace){var h=f(d,c,0===Math.floor(2.5*Math.random())?3:2);null!==h&&l.push(h)}}return{walls:l,complexity:l.length}};var o=n(6),a=r(o)},function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.default=function(t){var e=t.getOpen,o=t.Types,a=t.getScreenPos,u=t.getGridSize,i=t.getRect,f=t.getX,c=t.getY,l=t.getP,s=function(t){var e=t,o=Math.floor(Math.random()*t.length),s=e[o],d=!0,h=function(){return{x:f(s),y:c(s)}},p=function(t,e,n){return{x:t.x+Math.round(e.x*Math.cos(n)-e.y*Math.sin(n)),y:t.y+Math.round(e.x*Math.sin(n)+e.y*Math.cos(n))}},g=function(t,e,n,r){return t.map(function(t,o){return p(e,n[o],r)}).map(function(t){var e=t.x,n=t.y;return l(e,n)})},v=function(){for(var e=h(),n=t.map(function(t){return{x:f(t),y:c(t)}}),r=n.map(function(t){return{x:e.x-t.x,y:e.y-t.y}}),o=0;o<4;o++){var a=90*o*(Math.PI/180),u=g(n,e,r,a);if(u.filter(function(e,n){return e===t[n]}).length===t.length)return o}return 0},y=function(t,r,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;t.strokeStyle=o,t.lineWidth=Math.floor(u(r)-2*i),e.forEach(function(e,o){0===o?t.moveTo.apply(t,n(a(e,r).map(function(t){return t-i}))):t.lineTo.apply(t,n(a(e,r).map(function(t){return t-i})))}),t.stroke()},m=v();return{movePivot:function(){o=o<e.length-1?o+1:0,s=e[o],t=e,m=v(),d=!0},getSpaces:function(){return e},isAt:function(t,n,o){for(var i=u(o)/2,f=0;f<e.length;f++){var c=a(e[f],o),l=r(c,2),s=l[0],d=l[1];if(d-i<n&&d+i>n&&s-i<t&&s+i>t)return!0}return!1},rotate:function(n){var r=h(),o=t.map(function(t){return{x:f(t),y:c(t)}}),a=o.map(function(t){return{x:r.x-t.x,y:r.y-t.y}}),u=m;do{m=3===m?0:m+1;var i=90*m*(Math.PI/180),l=g(o,r,a,i);if(l.indexOf(-1)<0&&0===l.filter(function(t){return!n(t)}).length){e=l;break}}while(m!==u);return d=!0,m},draw:function(t,e){t.beginPath(),t.lineCap="round",y(t,e,"rgba(96, 0, 0, 0.6)",0),y(t,e,"rgba(128, 0, 0, 0.8)",1),y(t,e,"rgb(196, 0, 0)",2),t.beginPath(),t.fillStyle="rgb(96, 0, 0)",t.arc.apply(t,n(a(s,e).map(function(t){return t-1})).concat([u(e)/10,0,2*Math.PI,!1])),t.fill(),t.beginPath(),t.strokeStyle="rgb(196, 96, 96)";var r=u(e);t.lineWidth=Math.round(r/14),t.moveTo.apply(t,n(a(s,e).map(function(t){return t-1}))),t.lineTo.apply(t,n(a(s,e).map(function(t,n){return t-(0===n?3*e:.4*r*e)}))),t.stroke(),d=!1},clear:function(t,r){e.forEach(function(e){t.clearRect.apply(t,n(i(e,r).map(function(t,e){return e<2?t-1:t+1})))})},forceUpdate:function(){d=!0},updated:function(){return d}}},d=function t(n,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r[n]=o.ClosedSpace;var i=e(n,r);return 0===i.length||1===a?u.length<1?null:s(u.concat(n)):t(i[parseInt(Math.random()*i.length,10)],r,a-1,u.concat(n))};return{makeWall:d}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n={OpenSpace:0,PathSpace:1,ClosedSpace:2},r=e/t,o=function(e){return e%t},a=function(e){return(e-e%t)/t},u=function(e,n){return e>=0&&e<t&&n>=0&&n<t?e+n*t:-1},i=function(e,n){return[n>0?u(e,n-1):null,n<t-1?u(e,n+1):null,e>0?u(e-1,n):null,e<t-1?u(e+1,n):null]},f=function(t,e){return[o(t)*r*e+r*e*.5,a(t)*r*e+r*e*.5]},c=function(t,e){return[o(t)*r*e,a(t)*r*e,r*e,r*e]},l=function(t){return r*t},s=function(t){return[o(t)*r+r/2,a(t)*r+r/2]},d=function(t,e){return e[t]===n.OpenSpace},h=function(t,e){return i(o(t),a(t)).filter(function(t){return d(t,e)})},p=function(){for(var e=[],r=0;r<t;r++)for(var o=0;o<t;o++)e[u(o,r)]=n.OpenSpace;return e},g=function(t,e){return function(n){return t.filter(function(t,n){return n!==e}).map(function(t){return t.getSpaces()}).reduce(function(t,e){return t.concat(e)},[]).indexOf(n)<0}};return{SIZE:t,getRect:c,getScreenPos:f,getGridSize:l,getVirtPos:s,getX:o,getY:a,getP:u,getOpen:h,Types:n,initGrid:p,gridSpaceIsFree:g}}},function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var r=t.getP,o=t.getScreenPos,a=t.getGridSize,u=t.SIZE,i=t.getRect,f=t.getX,c=t.getY,l=r((u-1)/2,(u-1)/2),s=l,d=!0;return{getPos:function(){return l},move:function(n,o){var a=r(f(l)+n,c(l)+o);s=l,a>-1&&t.gridSpaceIsFree(e,-1)(a)&&(l=a),d=!0},draw:function(t,e){t.beginPath(),t.fillStyle="rgb(128,128,255)",t.arc.apply(t,n(o(l,e)).concat([a(e)/3,0,2*Math.PI,!1])),t.fill(),t.fillStyle="black",t.font="normal "+.75*a(e)+"px sans-serif",t.save(),t.translate(-(a(e)/4),a(e)/10),t.fillText.apply(t,["∞"].concat(n(o(l,e)))),t.restore(),d=!1},clear:function(t,e){t.clearRect.apply(t,n(i(s,e)))},forceUpdate:function(){d=!0},updated:function(){return d}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e={x:0,y:0},n=!0,r=!1,o="...",a=[],u=function(){a.forEach(function(t){return clearTimeout(t)}),r=!1,n=!0,o="..."};return{isVisible:function(){return r},followPuppet:function(t,r){e={x:t,y:r},n=!0},disappear:u,setTrainOfThoughtAndAppear:function(t){var e=2500;o=t.shift(),a.forEach(function(t){return clearTimeout(t)}),t.forEach(function(t,r){a.push(setTimeout(function(){o=t,n=!0},e*(r+1)))}),a.push(setTimeout(u,(t.length+1)*e)),r=!0},draw:function(a,u){if(r){var i=e.y>250?150:450,f=t/2;a.fillStyle="rgba(255,255,255,1)",a.strokeStyle="black",a.lineWidth=1*u,a.save(),a.translate(f*u,i*u),a.scale(3,1),a.beginPath(),a.arc(0,0,150*u,2*Math.PI,!1),a.fill(),a.stroke(),a.restore();for(var c=Math.atan2(i-e.y,f/2-e.x),l=c-1.5,s=Math.sqrt(Math.pow(f/2-e.x,2)+Math.pow(i-e.y,2)),d=e.x-10,h=e.y,p=0;p<10;p++)l+=.2,d+=Math.cos(l)*(s*(p/70)),h+=Math.sin(l)*(s*(p/70)),a.beginPath(),a.arc(d*u,h*u,(p+1)*u,2*Math.PI,!1),a.fill();a.font="bold "+30*u+"px sans-serif",a.fillStyle="black",a.fillText(o,f*u-a.measureText(o).width/2,(15+i)*u),n=!1}},clear:function(t){t.clearRect(0,0,t.canvas.width,t.canvas.height)},forceUpdate:function(){n=!0},updated:function(){return n}}}},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e,n,o,u,i,f,c,l){var s=0,d=setInterval(function(){s++,s>=10&&!f.isVisible()&&(f.setTrainOfThoughtAndAppear((0,a.strayThought)()),s=0)},1e3);o.add("click",function(r,u){t.walls.map(function(t,e){return{w:t,wIdx:e}}).filter(function(t){var e=t.w;return e.isAt(r.clientX-r.target.offsetLeft,r.clientY-r.target.offsetTop,u)}).forEach(function(e){var r=e.w,o=e.wIdx;r.clear(i.getContext("2d"),u),r.rotate(n.gridSpaceIsFree(t.walls,o))}),n.gridSpaceIsFree(t.walls,-1)(e.getPos())||(f.setTrainOfThoughtAndAppear([(0,a.gameOverThought)()]),clearInterval(d),o.clear(),window.setTimeout(c,2500))},u),o.add("contextmenu",function(e,n){return t.walls.filter(function(t){return t.isAt(e.clientX-e.target.offsetLeft,e.clientY-e.target.offsetTop,n)}).forEach(function(t){return t.movePivot()}),e.preventDefault()}),o.add("keydown",function(t,u){switch(s=0,f.disappear(),t.keyCode){case 37:e.move(-1,0);break;case 38:e.move(0,-1);break;case 39:e.move(1,0);break;case 40:e.move(0,1)}f.followPuppet.apply(f,r(n.getVirtPos(e.getPos()))),0!==n.getX(e.getPos())&&0!==n.getY(e.getPos())&&n.getX(e.getPos())!==n.SIZE-1&&n.getY(e.getPos())!==n.SIZE-1||(clearInterval(d),o.clear(),f.setTrainOfThoughtAndAppear([(0,a.salvationThought)()]),window.setTimeout(l,1e3))})}Object.defineProperty(e,"__esModule",{value:!0}),e.initGameEvents=void 0;var a=n(11);e.initGameEvents=o},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=["Noooo!!","The agony!","Why?!","What did you do?","The pain!","The anguish!"],r=["Thank you!","Bless you!","Salvation!","Freedom!","Joy!","Hurray!"],o=[["Where did I put my keys?","I must have left them somewhere..."],["What are you waiting for?","I'm going crazy in here!"],["What were the four noble truths again?","Suffering...","...the origin of suffering...","...the cessation of suffering...","...the noble 8-fold path."],["Stuck in the wheel of becoming..."],["3.14","3.141","3.1415","3.14159","3.141592..."],["These games always involve Pi...","...but never 42...","...or do they?"]],a=function(t){return t[Math.floor(Math.random()*t.length)]},u=function(){return a(n)},i=function(){return a(r)},f=function(){return a(o).slice()};e.gameOverThought=u,e.salvationThought=i,e.strayThought=f}]);