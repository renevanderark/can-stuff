!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var a=n(1),i=r(a),u=n(2),f=r(u),c=n(3),d=r(c),l=n(4),s=r(l),h=n(5),v=r(h),p=1600,m=900,w=document.getElementById("foo-layer"),y=w.getContext("2d"),g=document.getElementById("bar-layer"),M=g.getContext("2d"),R=(0,i.default)(y,p,m),_=(0,f.default)(M,p,m),x=(0,v.default)(),E=function(){},b="test",T="";x.add("mousemove",function(e,t){b="mousemove at "+Math.round((e.clientX-e.target.offsetLeft)/t)+(" "+Math.round((e.clientY-e.target.offsetTop)/t))},g);var z={clearRect:[0,0,0,0],draw:function(e,t){var n=new Date,r=n.getSeconds()/60*360*(Math.PI/180),o=[p/2*t,m/2*t],a=[(p/2+200*Math.cos(r))*t,(m/2+200*Math.sin(r))*t];e.beginPath(),e.moveTo.apply(e,o),e.lineTo.apply(e,a),e.stroke(),this.clearRect=[o[0]<a[0]?o[0]-1:a[0]-1,o[1]<a[1]?o[1]-1:a[1]-1,o[0]>a[0]?o[0]+1:a[0]+1,o[1]>a[1]?o[1]+1:a[1]+1]},clear:function(e,t){e.clearRect.apply(e,o(this.clearRect))},updated:!0,lastSec:-1},I=function e(){b!==T&&(E(),E=_.drawText(b,5,50,40),T=b),R.render([z]),requestAnimationFrame(e)};I(),(0,s.default)(p,m,(0,d.default)([w,g],x.onResize,R.onResize,_.onResize,function(e,t,n){b="w="+t+", h="+n+", s="+e+", ts="+(new Date).getTime()}))},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=void 0,n=!1;return{onResize:function(e){t=e},clear:function(){n=!0},render:function(r){n?(e.clearRect(0,0,e.canvas.width,e.canvas.height),n=!1):r.filter(function(e){return e.updated}).forEach(function(n){return n.clear(e,t)}),r.filter(function(e){return e.updated}).forEach(function(n){return n.draw(e,t)})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=void 0;return{onResize:function(e){t=e},drawText:function(n,r,o,a,i,u){e.font="bold "+(a||50)*t+"px sans-serif",e.fillStyle=i||"#fff",e.fillText(n,Math.round(r*t),Math.round(o*t));var f=function(){return e.clearRect(0,0,e.canvas.width,e.canvas.height)};return u&&setTimeout(f,u||500),f}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,r){e.forEach(function(e){e.style.left=parseInt(Math.floor((window.innerWidth-n)/2),10),e.style.top=parseInt(Math.floor((window.innerHeight-r)/2),10),e.width=n,e.height=r})}for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return[t].concat(r)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function r(e,t,r){n.forEach(function(n){return n(r,e,t)})}function o(){var t=window,n=t.innerWidth,o=t.innerHeight;n*a>o?r(parseInt(Math.floor(o/a),10),o,o/a/e):r(n,parseInt(Math.floor(n*a),10),n/e)}var a=t/e;o(),window.addEventListener("resize",o)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=void 0,t=[];return{onResize:function(t){e=t},add:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,a=function(t){return r(t,e)};t.push({elem:o,eventName:n,fn:a}),o.addEventListener(n,a)},clear:function(){t.forEach(function(e){var t=e.elem,n=e.eventName,r=e.fn;return t.removeEventListener(n,r)})}}}}]);