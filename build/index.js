!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=n(1),a=r(i),u=n(2),f=r(u),c=n(3),d=r(c),l=n(4),s=r(l),h=n(5),v=r(h),p=1600,g=900,w=document.getElementById("foo-layer"),m=document.getElementById("bar-layer");w.style.backgroundImage="url(http://www.allwhitebackground.com/images/2/2297.jpg)",w.style.backgroundSize="cover";var y=(0,a.default)(w.getContext("2d"),w),M=(0,f.default)(m.getContext("2d"),m),b=(0,v.default)(),_=function(){var e=!1,t=1;return{drawSegment:function(e,t,n,r){e.save(),e.rotate(n*Math.PI/180),e.translate.apply(e,o(t)),e.beginPath(),e.scale.apply(e,o(r)),e.arc(90,0,80,0,2*Math.PI,!1),e.fill(),e.restore()},draw:function(n,r){n.fillStyle="rgba(0,255,255,0.5)",n.save(),n.translate(730*r,520*r),n.scale(r*t,r*t),this.drawSegment(n,[-260,0],310,[1.6,1]),this.drawSegment(n,[0,0],10,[1.5,.9]),this.drawSegment(n,[230,0],8,[.7,.9]),this.drawSegment(n,[330,0],0,[.4,.4]),this.drawSegment(n,[360,-40],0,[2.5,1.5]),n.restore(),e=!1},clear:function(e,t){},forceUpdate:function(){e=!0},updated:function(){return e}}},x=_(),E=function e(){y.render([x]),requestAnimationFrame(e)};E(),(0,s.default)(p,g,(0,d.default)([w,m],b.onResize,y.onResize,M.onResize,function(){return x.forceUpdate()}))},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0,r=!1;return{onResize:function(e){n=e},clear:function(){r=!0},render:function(o){r?(e.clearRect(0,0,t.width,t.height),r=!1):o.filter(function(e){return e.updated()}).forEach(function(t){return t.clear(e,n)}),o.filter(function(e){return e.updated()}).forEach(function(t){return t.draw(e,n)})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=void 0;return{onResize:function(e){n=e},drawText:function(r,o,i,a,u,f){e.font="bold "+(a||50)*n+"px sans-serif",e.fillStyle=u||"#fff",e.fillText(r,Math.round(o*n),Math.round(i*n));var c=function(){return e.clearRect(0,0,t.width,t.height)};return f&&setTimeout(c,f||500),c}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r){e.forEach(function(e){e.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),e.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),e.width=n,e.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[t].concat(r)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function r(e,t,r){n.forEach(function(n){return n(r,e,t)})}function o(){var t=window,n=t.innerWidth,o=t.innerHeight;n*i>o?r(parseInt(Math.floor(o/i),10),o,o/i/e):r(n,parseInt(Math.floor(n*i),10),n/e)}var i=t/e;o(),window.addEventListener("resize",o)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=void 0,t=[];return{onResize:function(t){e=t},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,i=function(t){return r(t,e)};t.push({elem:o,eventName:n,fn:i}),o.addEventListener(n,i)},clear:function(){t.forEach(function(e){var t=e.elem,n=e.eventName,r=e.fn;return t.removeEventListener(n,r)})}}}}]);