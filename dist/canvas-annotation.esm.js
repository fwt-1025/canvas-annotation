class t{constructor(){this.events={}}on(t,i){let e=this.events[t];Array.isArray(e)?e.push(i):this.events[t]=[i]}emit(t,...i){let e=this.events[t];e&&e.length&&e.forEach((t=>{t.call(null,...i)}))}off(t,i){let e=this.events[t],s=e.findIndex((t=>t===i));e.splice(s,1)}}class i extends t{constructor(t,{points:i,lineColor:e,fillColor:s,lineWidth:h,control:a,opacity:n,uuid:o}){super(),this.ctx=t,this.index=-1,this.opacity=n||.2,this.editIndex=-1,this.points=i||[],this.control=a||!0,this.controlPoints=[],this.lineColor=e||"#f00",this.fillColor=s||"#f00",this.lineWidth=h||3,this.creating=!1,this.editing=!1,this.activating=!1,this.uuid=o||(()=>{let t="abcdefg12334567890",i="";for(let e=0;e<8;e++)i+=t[Math.floor(Math.random()*t.length)];return i})(),this.visible=!0,this.dragable=!1}controlPointsIndex(t){let i=this.getControlPoints(),{x:e,y:s}=t,h=this.ctx.canvas,a=this.ctx.getTransform();for(let t=0;t<i.length;t++){let{x:n,y:o}=i[t];if(e<n+5/a.a&&e>n-5/a.a&&s<o+5/a.a&&s>o-5/a.a)return h.style.cursor="pointer",t;h.style.cursor="auto"}return-1}drawControls(){let t=this.ctx.getTransform();this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.getControlPoints().forEach((i=>{this.ctx.beginPath(),this.ctx.strokeStyle=this.lineColor,this.ctx.fillStyle="#fff",this.ctx.arc(i.x*t.a+t.e,i.y*t.a+t.f,5,0,2*Math.PI),this.ctx.stroke(),this.ctx.fill(),this.ctx.closePath()})),this.ctx.restore()}drawText(){if(!this.points.length)return;let t=this.ctx,i=t.getTransform(),e=t.measureText(this.type),{x:s,y:h}=this.points[0];s=s*i.a+i.e+10,h=h*i.a+i.f,t.save(),t.setTransform(1,0,0,1,0,0),this.ctx.font="14px 微软雅黑",t.beginPath(),t.save(),t.fillStyle=this.lineColor,t.fillRect(s+10,h,e.width+2*e.actualBoundingBoxAscent,20),t.restore(),t.fillStyle="#fff",t.fillText(this.type,s+10,h+14),t.closePath(),t.restore()}getData(){let t={coordinates:this.points,type:this.type,uuid:this.uuid};return this.rotate&&(t=Object.assign(t,{angle:this.angle})),t}}class e extends i{constructor(t,i){super(t,i),this.type="rect",this.width=i.width||0,this.height=i.height||0,this.left=i.left||0,this.top=i.top||0}getControlPoints(){let[t,i]=this.points;return[t,{x:(t.x+i.x)/2,y:t.y},{x:i.x,y:t.y},{x:i.x,y:(i.y+t.y)/2},i,{x:(t.x+i.x)/2,y:i.y},{x:t.x,y:i.y},{x:t.x,y:(t.y+i.y)/2}]}initPoints(t,i){t.x<i.x&&t.y<i.y?(this.points[0]=t,this.points[1]=i):t.x<i.x&&t.y>i.y?(this.points[0]={x:t.x,y:i.y},this.points[1]={x:i.x,y:t.y}):t.x>i.x&&t.y>i.y?[this.points[0],this.points[1]]=[i,t]:(this.points[0]={x:i.x,y:t.y},this.points[1]={x:t.x,y:i.y})}drawGraph(){let{width:t,height:i,left:e,top:s}=this;!(0 in this.points)&&t&&i&&e&&s&&(this.points=[{x:e,y:s},{x:e+t,y:s+i}]);let h=this.ctx.getTransform();this.ctx.save(),this.ctx.beginPath(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.strokeStyle=this.lineColor,this.ctx.fillStyle=this.lineColor,this.ctx.lineWidth=this.lineWidth;let{x:a,y:n}=this.points[0],{x:o,y:r}=this.points[1];a=a*h.a+h.e,n=n*h.a+h.f,o=o*h.a+h.e,r=r*h.a+h.f,this.ctx.rect(a,n,o-a,r-n),this.ctx.stroke(),this.ctx.closePath(),this.ctx.globalAlpha=this.opacity,this.ctx.fill(),this.ctx.restore(),this.activating&&this.drawControls()}getArea(){let{x:t,y:i}=this.points[0],{x:e,y:s}=this.points[1];return(e-t)*(s-i)}getMaxAndMinmun(){return{max:this.points[1],min:this.points[0]}}getShapeCenter(){let{max:t,min:i}=this.getMaxAndMinmun();return{x:(t.x+i.x)/2,y:(t.y+i.y)/2}}isPointInPath(t){let{x:i,y:e}=this.points[0],{x:s,y:h}=this.points[1];return i<t.x&&e<t.y&&i+s-i>t.x&&e+h-e>t.y}updateGraph(t,i){let{x:e,y:s}=i;switch(t){case 0:this.points[0]=i;break;case 1:this.points[0].y=s;break;case 2:this.points[0].y=s,this.points[1].x=e;break;case 3:this.points[1].x=e;break;case 4:this.points[1]=i;break;case 5:this.points[1].y=s;break;case 6:this.points[0].x=e,this.points[1].y=s;break;case 7:this.points[0].x=e}}}class s extends i{startPos={x:null,y:null};control_points=[];rotate_angle=0;constructor(t,i){super(t,i),this.type="rectRotate",this.angle=i.angle||0,this.rotate=!0}initPoints(t,i){this.points[0]={x:t.x>i.x?i.x:t.x,y:t.y>i.y?i.y:t.y},this.points[1]={x:i.x>t.x?i.x:t.x,y:t.y>i.y?i.y:t.y},this.points[2]={x:i.x>t.x?i.x:t.x,y:i.y>t.y?i.y:t.y},this.points[3]={x:t.x>i.x?i.x:t.x,y:i.y>t.y?i.y:t.y},this.x=this.points[0].x,this.y=this.points[0].y,this.width=this.points[2].x-this.x,this.height=this.points[2].y-this.y,this.getShapeCenter()}getControlPoints(){return this.control_points=[{x:this.centerPos.x-this.width/2,y:this.centerPos.y-this.height/2},{x:this.centerPos.x+this.width/2,y:this.centerPos.y-this.height/2},{x:this.centerPos.x+this.width/2,y:this.centerPos.y+this.height/2},{x:this.centerPos.x-this.width/2,y:this.centerPos.y+this.height/2},{x:this.centerPos.x,y:this.centerPos.y-this.height/2-20}],this.points=this.control_points=this.getRotatePoints(this.centerPos,this.angle),this.control_points}drawGraph(){this.points.length<3&&this.initPoints(this.points[0],this.points[1]);let t=this.ctx.getTransform();this.getControlPoints();let i=this.ctx;i.save(),i.setTransform(Math.cos(this.angle),Math.sin(this.angle),-Math.sin(this.angle),Math.cos(this.angle),this.centerPos.x*t.a+t.e,this.centerPos.y*t.a+t.f),i.beginPath(),i.fillStyle="#f00",i.arc(0,0,5,0,2*Math.PI),i.fill(),i.closePath(),i.beginPath(),i.strokeStyle=this.lineColor;let e=this.width*t.a,s=this.height*t.a;i.rect(-e/2,-s/2,e,s),i.closePath(),i.stroke(),i.restore(),this.activating&&this.drawControls()}drawControls(){let t=this.ctx.getTransform(),i=this.ctx;i.save(),i.setTransform(1,0,0,1,0,0),this.control_points.forEach(((e,s)=>{let h=e.x*t.a+t.e,a=e.y*t.a+t.f;i.beginPath(),i.arc(h,a,5,0,2*Math.PI),i.closePath(),i.stroke()})),i.restore()}getArea(){let t=this.getRotatePoints(this.centerPos,-this.angle),{x:i,y:e}=t[0],{x:s,y:h}=t[2];return(s-i)*(h-e)}getMaxAndMinmun(){return{max:{x:Math.max.apply(null,this.points.map((t=>t.x))),y:Math.max.apply(null,this.points.map((t=>t.y)))},min:{x:Math.min.apply(null,this.points.map((t=>t.x))),y:Math.min.apply(null,this.points.map((t=>t.y)))}}}getShapeCenter(){let t={x:this.x+this.width/2,y:this.y+this.height/2};return this.centerPos=t,t}updateGraph(t,i,e){"object"!=typeof e||this.startPos.x||(this.startPos=e);let s={0:2,1:3,2:0,3:1};switch(t){case 0:case 1:case 2:case 3:this.setPoints(i,s[t]);break;case 4:let e=Math.atan2(this.startPos.y-this.centerPos.y,this.startPos.x-this.centerPos.x),h=Math.atan2(i.y-this.centerPos.y,i.x-this.centerPos.x);this.rotate_angle=h-e,this.angle+=this.rotate_angle,this.startPos=i}}setPoints(t,i){this.centerPos={x:(t.x+this.control_points[i].x)/2,y:(t.y+this.control_points[i].y)/2};let e=(t.x-this.centerPos.x)*Math.cos(-this.angle)-(t.y-this.centerPos.y)*Math.sin(-this.angle)+this.centerPos.x,s=(t.x-this.centerPos.x)*Math.sin(-this.angle)+(t.y-this.centerPos.y)*Math.cos(-this.angle)+this.centerPos.y,h=this.getRotatePoints(this.centerPos,-this.angle);this.width=Math.abs(h[i].x-e),this.height=Math.abs(h[i].y-s)}getPoints(){this.points=[{x:this.x,y:this.y},{x:this.x+this.width,y:this.y},{x:this.x+this.width,y:this.y+this.height},{x:this.x,y:this.height+this.y}]}getRotatePoints({x:t,y:i},e){return this.control_points.map((s=>({x:(s.x-t)*Math.cos(e)-(s.y-i)*Math.sin(e)+t,y:(s.x-t)*Math.sin(e)+(s.y-i)*Math.cos(e)+i})))}isPointInPath(t){let i=t,e=this.control_points.slice(0,4),s=e.map(((t,i)=>[t,e[(i+1)%e.length]])).slice(0,7),h=i.x,a=i.y,n=!1;for(let t=0,i=s.length;t<i;t++){let i=s[t][0].x,e=s[t][0].y,o=s[t][1].x,r=s[t][1].y;if(i===h&&e===a||o===h&&r===a)return!0;if(e===r&&e===a&&(i>h&&o<h||i<h&&o>h))return!0;if(e<a&&r>=a||e>=a&&r<a){let t=i+(a-e)*(o-i)/(r-e);if(t===h)return!0;t>h&&(n=!n)}}return!!n}}class h extends i{constructor(t,i){super(t,i),this.type="polygon"}getControlPoints(){return this.points}initPoints(t,i){this.points.length>1?this.points.splice(this.points.length-1,1,i):this.points=[t,i]}drawGraph(){let t=this.ctx.getTransform();this.ctx.save(),this.ctx.beginPath(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.strokeStyle=this.lineColor,this.ctx.fillStyle=this.lineColor,this.ctx.lineWidth=this.lineWidth,this.points.forEach(((i,e)=>{let{x:s,y:h}=i;s=s*t.a+t.e,h=h*t.a+t.f,0===e?this.ctx.moveTo(s,h):this.ctx.lineTo(s,h)})),this.ctx.save(),this.ctx.globalAlpha=this.opacity,this.ctx.fill(),this.ctx.restore(),this.ctx.closePath(),this.ctx.stroke(),this.ctx.restore(),this.activating&&this.drawControls()}getArea(){let t=this.points.map(((t,i)=>[t,this.points[(i+1)%this.points.length]])),i=0;for(let e=0,s=t.length;e<s;e++){let s=t[e];i+=s[0].x*s[1].y-s[0].y*s[1].x}return i=Math.abs(i/2),i}getMaxAndMinmun(){let t=[],i=[];this.points.forEach((e=>{t.push(e.x),i.push(e.y)}));let e=Math.max.apply(null,t),s=Math.min.apply(null,t);return{max:{x:e,y:Math.max.apply(null,i)},min:{x:s,y:Math.min.apply(null,i)}}}getShapeCenter(){let{max:t,min:i}=this.getMaxAndMinmun();return{x:(t.x+i.x)/2,y:(t.y+i.y)/2}}isIntersect(t){let i=this.points.slice(),e=i.map(((t,e)=>[t,i[(e+1)%i.length]])),s=e.slice(e.length-3,e.length-2),h=e.slice(-1).concat(e.slice(0,e.length-3)),a=Math.max,n=Math.min,[o,r]=t?e.slice(-1)[0]:s[0];for(let t=0;t<h.length;t++){let[i,e]=h[t];if(a(o.x,r.x)>n(i.x,e.x)&&n(o.x,r.x)<a(i.x,e.x)&&a(o.y,r.y)>n(i.y,e.y)&&n(o.y,r.y)<a(i.y,e.y)&&((i.x-o.x)*(r.y-o.y)-(i.y-o.y)*(i.x-o.x))*((e.x-o.x)*(r.y-o.y)-(e.y-o.y)*(r.x-o.x))<0&&((o.x-i.x)*(e.y-i.y)-(o.y-i.y)*(e.x-i.x))*((r.x-i.x)*(e.y-i.y)-(r.y-i.y)*(e.x-i.x))<0)return!0}return!1}updateGraph(t,i){this.points[t]=i}isPointInPath(t){let i=t,e=this.points.slice(),s=e.map(((t,i)=>[t,e[(i+1)%e.length]])),h=i.x,a=i.y,n=!1;for(let t=0,i=s.length;t<i;t++){let i=s[t][0].x,e=s[t][0].y,o=s[t][1].x,r=s[t][1].y;if(i===h&&e===a||o===h&&r===a)return!0;if(e===r&&e===a&&(i>h&&o<h||i<h&&o>h))return!0;if(e<a&&r>=a||e>=a&&r<a){let t=i+(a-e)*(o-i)/(r-e);if(t===h)return!0;t>h&&(n=!n)}}return!!n}}let a=class extends i{constructor(t,i){super(t,i),this.type="line"}getControlPoints(){return this.points}initPoints(t,i){this.points.length>1?this.points.splice(this.points.length-1,1,i):this.points=[t,i]}drawGraph(){let t=this.ctx.getTransform();this.ctx.save(),this.ctx.beginPath(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.lineWidth=this.lineWidth||5,this.ctx.strokeStyle=this.lineColor,this.points.forEach(((i,e)=>{let{x:s,y:h}=i;s=s*t.a+t.e,h=h*t.a+t.f,0===e?this.ctx.moveTo(s,h):this.ctx.lineTo(s,h)})),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this.activating&&this.drawControls()}isIntersect(t){let i=this.points.slice(),e=i.map(((t,e)=>[t,i[(e+1)%i.length]])),s=e.slice(e.length-3,e.length-2),h=e.slice(-1).concat(e.slice(0,e.length-3)),a=Math.max,n=Math.min,[o,r]=t?e.slice(-1)[0]:s[0];for(let t=0;t<h.length;t++){let[i,e]=h[t];if(a(o.x,r.x)>n(i.x,e.x)&&n(o.x,r.x)<a(i.x,e.x)&&a(o.y,r.y)>n(i.y,e.y)&&n(o.y,r.y)<a(i.y,e.y)&&((i.x-o.x)*(r.y-o.y)-(i.y-o.y)*(i.x-o.x))*((e.x-o.x)*(r.y-o.y)-(e.y-o.y)*(r.x-o.x))<0&&((o.x-i.x)*(e.y-i.y)-(o.y-i.y)*(e.x-i.x))*((r.x-i.x)*(e.y-i.y)-(r.y-i.y)*(e.x-i.x))<0)return!0}return!1}getMaxAndMinmun(){return{max:{x:Math.max.apply(null,this.points.map((t=>t.x))),y:Math.max.apply(null,this.points.map((t=>t.y)))},min:{x:Math.min.apply(null,this.points.map((t=>t.x))),y:Math.min.apply(null,this.points.map((t=>t.y)))}}}getShapeCenter(){let t=this.getMaxAndMinmun(),i={x:(t.max.x+t.min.x)/2,y:(t.max.y+t.min.y)/2};return this.centerPos=i,i}updateGraph(t,i){this.points[t]=i}isPointInPath(t){let i=this.ctx.getTransform(),e=this.points.map(((t,i)=>[t,this.points[(i+1)%this.points.length]])).slice(0,this.points.length-1);for(let s=0,h=e.length;s<h;s++){let h=e[s][0],a=e[s][1],n=Math.sqrt(Math.pow(t.x-h.x,2)+Math.pow(t.y-h.y,2));if(Math.sqrt(Math.pow(t.x-a.x,2)+Math.pow(t.y-a.y,2))+n-Math.sqrt(Math.pow(a.x-h.x,2)+Math.pow(a.y-h.y,2))<.02/i.a)return this}}};class n extends i{constructor(t,i){super(t,i),this.type="line"}getControlPoints(){return this.points}initPoints(t,i){this.points.length>1?this.points.splice(this.points.length-1,1,i):this.points=[t,i]}drawGraph(){let t=this.ctx.getTransform(),i=this.ctx;i.save(),i.beginPath(),i.setTransform(1,0,0,1,0,0),i.strokeStyle=this.lineColor;let[e,s,h]=this.points,{x:a,y:n}=e,{x:o,y:r}=s;if(a=a*t.a+t.e,n=n*t.a+t.f,o=o*t.a+t.e,r=r*t.a+t.f,i.rect(a,n,o-a,r-n),i.stroke(),i.closePath(),h){i.beginPath();let{x:e,y:s}=h;e=e*t.a+t.e,s=s*t.a+t.f,i.rect(a+e-o,n+s-r,o-a,r-n),i.stroke(),i.closePath(),i.beginPath(),i.moveTo(a,n),i.lineTo(a+e-o,n+s-r),i.moveTo(o,n),i.lineTo(o+e-o,n+s-r),i.moveTo(a,r),i.lineTo(a+e-o,s),i.moveTo(o,r),i.lineTo(o+e-o,s),i.stroke(),i.closePath()}this.ctx.restore(),this.editing&&this.drawControls()}drawControls(){let t=this.ctx.getTransform();this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.getControlPoints().forEach((i=>{this.ctx.beginPath(),this.ctx.fillStyle=this.fillColor,this.ctx.arc(i.x*t.a+t.e,i.y*t.a+t.f,5,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath()})),this.ctx.restore()}isPointInPath(t){let i=document.createElement("canvas").getContext("2d");i.setTransform(this.ctx.getTransform());let e=i.getTransform();console.log(e,t.x,t.y),i.save(),i.beginPath(),i.setTransform(1,0,0,1,0,0),i.strokeStyle=this.lineColor;let[s,h,a]=this.points,{x:n,y:o}=s,{x:r,y:l}=h;if(n=n*e.a+e.e,o=o*e.a+e.f,r=r*e.a+e.e,l=l*e.a+e.f,i.rect(n,o,r-n,l-o),i.stroke(),i.closePath(),a){i.beginPath();let{x:t,y:s}=a;t=t*e.a+e.e,s=s*e.a+e.f,i.rect(n+t-r,o+s-l,r-n,l-o),i.stroke(),i.closePath(),i.beginPath(),i.moveTo(n,o),i.lineTo(n+t-r,o+s-l),i.moveTo(r,o),i.lineTo(r+t-r,o+s-l),i.moveTo(n,l),i.lineTo(n+t-r,s),i.moveTo(r,l),i.lineTo(r+t-r,s),i.stroke(),i.closePath()}i.restore(),i.isPointInPath(t.x,t.y)&&console.log(1231231)}}class o extends i{constructor(t,i){super(t,i),this.type="point"}getControlPoints(){return this.points}initPoints(t){this.points.push(t)}drawGraph(){let t=this.ctx.getTransform(),i=this.ctx;i.save(),i.setTransform(1,0,0,1,0,0),i.beginPath(),i.arc(this.points[0].x*t.a+t.e,this.points[0].y*t.a+t.f,5,0,2*Math.PI),i.fillStyle=this.lineColor,i.fill(),i.closePath(),i.restore(),this.activating&&this.drawControls()}drawControls(){let t=this.ctx.getTransform(),i=this.ctx;i.save(),i.setTransform(1,0,0,1,0,0),i.beginPath(),i.arc(this.points[0].x*t.a+t.e,this.points[0].y*t.a+t.f,10,0,2*Math.PI),i.strokeStyle=this.lineColor,i.stroke(),i.closePath(),i.restore()}isPointInPath(t){let{x:i,y:e}=this.points[0];return i-5<t.x&&t.x<i+5&&t.y<e+5&&t.y>e-5}}let r={a:1,b:0,c:0,d:1,e:0,f:0,transform(t,i,e,s,h,a){let n=this;var o=n.a,r=n.b,l=n.c,c=n.d,x=n.e,p=n.f;return n.a=o*t+l*i,n.b=r*t+c*i,n.c=o*e+l*s,n.d=r*e+c*s,n.e=o*h+l*a+x,n.f=r*h+c*a+p,n},translate(t,i){return this.transform(1,0,0,1,t,i)},scaleU(t){return this.transform(t,0,0,t,0,0)},rotate(t){let i=Math.cos(t),e=Math.sin(t);return this.transform(i,e,-e,i,0,0)},getRotatePoint:(t,i)=>({x:i.x*Math.cos(t)+i.y*-Math.sin(t),y:i.y*Math.sin(t)+i.y*Math.cos(t)}),clone(){let{a:t,b:i,c:e,d:s,e:h,f:a}=this;return{a:t,b:i,c:e,d:s,e:h,f:a}},reset(){this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0}};const l=(t,i)=>{i?console.error("Canvas-annotation Error:\r\n"+t,i):console.error("Canvas-annotation Error:"+t)};let c=0;function x(t,i){c||(t(),c=Date.now()),Date.now()-c<i||(t(),c=Date.now())}class p extends t{rightMouseDown=!1;rightMouseMove=!1;dbclickTime=0;canvasDOM=null;offsetX=0;offsetY=0;img=new Image;activeShape=null;constructor({el:t,width:i,height:l,imgUrl:c,minScale:x,maxScale:p,focusMode:u,showOnlyCurrent:y,selectTool:m,font:d,customTag:g}){super(),this.el=t,this.shapeList=[],this.width=i||window.innerWidth,this.height=l||window.innerHeight,this.selectTool=m||"select",this.img.src=c,this.scale=1,this.minScale=x||.6,this.maxScale=p||40,this.index=0,this.activeIndex=-1,this.pixelSize={},this.matrix=r,this.focusMode=u||!1,this.showOnlyCurrent=y||!1,this.font=d||"14px 微软雅黑",this.customTag=g||!1,this.mouse={down:!1,move:!1,up:!1,mousedownPos:{x:0,y:0},mousemovePos:{x:0,y:0},mouseupPos:{x:0,y:0},mousewheelPos:{x:0,y:0}},this.img.setAttribute("crossOrigin","anonymous"),this.img.onload=()=>{this.pixelRatio=this.img.naturalWidth/this.img.naturalHeight,this.pixelSize={w:this.img.naturalWidth,h:this.img.naturalHeight},this.imgHeight=this.width/this.pixelRatio,this.init()},this.Rect=e,this.Polygon=h,this.Line=a,this.Point=o,this.Cube=n,this.RectRotate=s}init(){this.el?(this.el instanceof HTMLCanvasElement?this.canvasDOM=this.el:"string"==typeof this.el&&(this.canvasDOM=document.querySelector(this.el)),this.ctx=this.canvasDOM.getContext("2d"),this.ctx.font="10px 微软雅黑",this.canvasDOM.width=this.width,this.canvasDOM.height=this.height,this.canvasDOM.addEventListener("mousedown",this.handleMouseDown.bind(this)),this.canvasDOM.addEventListener("mousemove",(t=>{x(this.handleMouseMove.bind(this,t),10)})),this.canvasDOM.addEventListener("mouseup",this.handleMouseUp.bind(this)),this.canvasDOM.addEventListener("mousewheel",this.handleMouseWheel.bind(this)),document.addEventListener("contextmenu",(t=>{t.preventDefault()})),this.update(),this.emit("created")):l("You should provide an 'el' attribute and it needs to be set to 'string | HTMLCanvasElement'")}setImage(t){this.img.src=t,this.img.setAttribute("crossOrigin","anonymous"),this.img.onload=()=>{this.pixelRatio=this.img.naturalWidth/this.img.naturalHeight,this.pixelSize={w:this.img.naturalWidth,h:this.img.naturalHeight},this.imgHeight=this.width/this.pixelRatio,this.update()}}fitInWindow(){this.matrix.reset(),this.matrix.scaleU(.65);let t=(this.width-.65*this.width)/2,i=(this.height-.65*this.imgHeight)/2;this.matrix.translate(t,i),this.ctx.setTransform(this.matrix.clone()),this.update()}resetCanvas(){this.matrix.reset(),this.ctx.setTransform(this.matrix.clone()),this.update()}addShape(t){this.shapeList.push(t),this.emit("changed")}update(){if(this.clear(),this.ctx.drawImage(this.img,0,0,this.width,this.imgHeight),this.showOnlyCurrent&&this.activeShape)return this.activeShape.drawGraph(),!this.customTag&&this.activeShape.drawText(),void(this.customTag&&this.customTag(this.activeShape));this.shapeList.forEach(((t,i)=>{t.index=i,t.drawGraph(),!this.customTag&&t.drawText(),this.customTag&&this.customTag(t,i)}))}clear(){this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.width,this.height),this.ctx.restore()}getActiveShapeIndex(){if(~this.activeIndex)return this.activeIndex;if(!this.activeShape)return t="You need to select a graphic, but the program did not obtain it. Please confirm",void console.warn("Canvas-annotation Warn:"+t);var t;return this.shapeList.findIndex((t=>t.uuid===this.activeShape.uuid))}getCurrentActiveShape(){let t=this.shapeList.filter((t=>t.activating));return t.length?t[0]:null}mouseEventPosition(t){let i=this.canvasDOM.getBoundingClientRect(),e={x:Math.round((t.clientX-i.x-this.matrix.e)/this.matrix.a),y:Math.round((t.clientY-i.y-this.matrix.f)/this.matrix.a)};return e.x=e.x<0?0:e.x>this.width?this.width:e.x,e.y=e.y<0?0:e.y>this.imgHeight?this.imgHeight:e.y,e}handleMouseWheel(t){let{x:i,y:e}=this.mousewheelPos=this.mouseEventPosition(t),s=1+.2*(t.deltaY<0?1:-1);this.matrix.translate(i,e).scaleU(s),this.matrix.a<.3&&this.matrix.scaleU(.3/this.matrix.a),this.matrix.a>40&&this.matrix.scaleU(40/this.matrix.a),this.matrix.translate(-i,-e),this.ctx.setTransform(this.matrix.clone()),this.update()}handleMouseDown(t){if(t.preventDefault(),this.dbclickTime&&Date.now()-this.dbclickTime<300){if(this.activeShape&&this.activeShape.intersect)return;if(this.activeShape&&["polygon","line"].includes(this.activeShape.type)){if(this.activeShape.points.length>4&&"polygon"===this.activeShape.type&&this.activeShape.isIntersect("drawOver")&&JSON.stringify(this.mouseEventPosition(t))===JSON.stringify(this.mouse.mousedownPos))return void this.activeShape.points.splice(this.activeShape.points.length-1,1);if(JSON.stringify(this.mouseEventPosition(t))===JSON.stringify(this.mouse.mousedownPos))return this.activeShape.points.splice(this.activeShape.points.length-1,1),this.activeShape.creating=!1,this.activeShape.activating=!0,this.update(),void(this.activeIndex=this.shapeList.length-1)}}else this.dbclickTime=Date.now();if(this.mouse.mousedownPos=this.mouseEventPosition(t),2===t.button)return this.rightMouseDown=!0,void this.setMouseCursor("grab");if(this.activeShape&&(this.mouse.down=!0),this.activeShape&&~this.activeShape.editIndex)"point"!==this.activeShape.type&&(this.activeShape.editing=!0);else{if("select"===this.selectTool)return this.activeShape&&(this.activeShape.activating=!1,this.activeShape=null),~this.activeIndex?(this.activeShape=this.shapeList[this.activeIndex],this.activeShape.activating=!0,this.focusMode&&this.setFocusMode(),this.emit("selectedShape",this.activeShape),void this.update()):void this.update();if(this.activeShape?.creating){switch(this.selectTool){case"rect":case"rectRotate":this.activeShape.creating=!1,this.activeShape.activating=!0,this.activeIndex=this.shapeList.length-1;break;case"line":case"polygon":this.activeShape.points.splice(this.activeShape.points.length-1,1,this.mouse.mousedownPos,this.mouse.mousedownPos),this.activeShape.intersect=!1,this.activeShape.points.length>4&&this.activeShape.isIntersect()&&(this.activeShape.points.splice(this.activeShape.points.length-1,1),this.activeShape.intersect=!0);break;case"cube":if(3===this.activeShape.points.length){this.activeShape.creating=!1;break}this.activeShape.points.splice(this.activeShape.points.length-1,1,this.mouse.mousedownPos,this.mouse.mousedownPos)}this.update()}else if(this.selectTool){if(this.activeShape&&(this.activeShape.activating=!1),this.activeShape=this.createShape(this.selectTool,this.shapeProps||{}),"point"===this.selectTool)return this.activeShape.initPoints(this.mouse.mousedownPos),this.activeShape.activating=!0,this.addShape(this.activeShape),this.update(),void(this.activeIndex=this.shapeList.length-1);this.activeShape.creating=!0,this.addShape(this.activeShape)}}}handleMouseMove(t){if(this.mouse.mousemovePos=this.mouseEventPosition(t),this.rightMouseDown){this.setMouseCursor("grabbing");let t=this.mouse.mousemovePos.x-this.mouse.mousedownPos.x,i=this.mouse.mousemovePos.y-this.mouse.mousedownPos.y;return this.matrix.translate(t,i),this.ctx.setTransform(this.matrix.clone()),void this.update()}if(this.activeShape&&this.activeShape.editing)return this.activeShape.updateGraph(this.activeShape.editIndex,this.mouse.mousemovePos,this.mouse.mousedownPos),void this.update();if(this.activeShape&&this.activeShape.dragable&&this.mouse.down&&this.activeShape.activating)return this.dragShape(this.mouse.mousedownPos,this.mouse.mousemovePos),this.mouse.mousedownPos=this.mouse.mousemovePos,void this.update();if(this.activeShape&&this.activeShape.activating&&(this.activeShape.editIndex=this.activeShape.controlPointsIndex(this.mouse.mousemovePos)),"select"===this.selectTool)return this.showOnlyCurrent&&this.activeShape?void this.update():void this.selectShape();if(this.activeShape?.creating){switch(this.selectTool){case"rect":case"rectRotate":case"line":case"polygon":case"cube":this.activeShape.initPoints(this.mouse.mousedownPos,this.mouse.mousemovePos)}this.update()}}selectShape(){this.setMouseCursor("auto");let t=this.shapeList.filter((t=>(this.activeShape&&t.uuid===this.activeShape.uuid||(t.activating=!1,t.editing=!1),t.isPointInPath(this.mouse.mousemovePos))));t.length||(this.activeIndex=-1);let i=0;if(1===t.length){let i=t[0];this.activeIndex=i.index,this.emit("hoverShape",i)}else for(let e=0;e<t.length;e++){let s=t[e];if("line"===s.type)return this.activeIndex=s.index,this.update(),void this.emit("hoverShape",s);let h=s.getArea();if(i){if(h<i)return this.activeIndex=s.index,this.update(),void this.emit("hoverShape",s)}else i=h,this.activeIndex=s.index,this.update(),this.emit("hoverShape",s)}this.update()}handleMouseUp(){this.rightMouseDown&&(this.setMouseCursor("auto"),this.rightMouseDown=!1),this.activeShape&&this.activeShape.editing&&(this.activeShape.editing=!1),this.mouse.down&&(this.mouse.down=!1),this.activeShape&&(this.activeShape.startPos={})}setFocusMode(){let{x:t,y:i}=this.activeShape.getShapeCenter(),{max:e,min:s}=this.activeShape.getMaxAndMinmun(),{w:h,h:a}={w:this.width,h:this.height},n=Math.floor(a/(e.y-s.y))-.3;this.matrix.reset(),this.matrix.scaleU(n),this.matrix.e+=h/2-t*this.matrix.a,this.matrix.f+=a/2-i*this.matrix.a,this.ctx.setTransform(this.matrix.clone()),this.update()}createShape(t,i){let e=null;return e=new(0,this[t.slice(0,1).toUpperCase()+t.slice(1)])(this.ctx,i),e}dragShape(t,i){let e,s,h,a,n=i.x-t.x,o=i.y-t.y,r=this.activeShape.points;if(n>=0&&(e=Math.max.apply(null,r.map((t=>t.x)))),o>=0&&(s=Math.max.apply(null,r.map((t=>t.y)))),n<=0&&(h=Math.min(...r.map((t=>t.x)))),o<=0&&(a=Math.min(...r.map((t=>t.y)))),!(e+n>=this.width||s+o>=this.imgHeight||h+n<=0||a+o<=0))for(let t=0;t<r.length;t++){let i=r[t];i.x=i.x+n,i.y=i.y+o}}setMouseCursor(t){this.canvasDOM.style.cursor=t}setData(t){this.shapeList=[];let i=null;t.forEach((t=>{t.points.forEach((t=>{t.x=t.x/this.img.naturalWidth*this.width,t.y=t.y/this.img.naturalHeight*this.imgHeight})),i=this.createShape(t.type,t),this.addShape(i)})),this.update()}deleteByIndex(t){null!=t?"number"==typeof t?(this.shapeList.splice(t,1),this.activeShape=null,this.activeIndex=-1,this.emit("changed")):l("You need to provide a parameter of numerical type"):l("You need to provide a parameter, which is the subscript you want to delete, but I did not obtain it")}getResultData(){let t=this.shapeList.map((t=>t.getData()));return t=JSON.parse(JSON.stringify(t)),t.forEach((t=>{t.coordinates.forEach((t=>{t.x=Math.round(t.x/this.width*this.img.naturalWidth),t.y=Math.round(t.y/this.imgHeight*this.img.naturalHeight)}))})),{pixelSize:this.pixelSize,regions:t}}destory(){this.canvasDOM.removeEventListener("mousedown",this.handleMouseDown.bind(this)),this.canvasDOM.removeEventListener("mousemove",(t=>{x(this.handleMouseMove.bind(this,t),10)})),this.canvasDOM.removeEventListener("mouseup",this.handleMouseUp.bind(this)),this.canvasDOM.removeEventListener("mousewheel",this.handleMouseWheel.bind(this)),document.removeEventListener("keydown",(t=>{"r"===t.key&&(this.matrix.reset(),this.ctx.setTransform(this.matrix.clone()),this.update()),"v"===t.key&&(this.selectTool="select")})),document.removeEventListener("contextmenu",(t=>{t.preventDefault()}))}}export{p as default};
