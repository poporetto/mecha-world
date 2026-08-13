(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,ee=1020,O=35902,k=35899,te=1021,ne=1022,A=1023,re=1026,ie=1027,ae=1028,oe=1029,se=1030,ce=1031,le=1033,ue=33776,de=33777,fe=33778,pe=33779,me=35840,he=35841,ge=35842,_e=35843,ve=36196,ye=37492,be=37496,xe=37488,Se=37489,Ce=37490,we=37491,Te=37808,Ee=37809,De=37810,Oe=37811,ke=37812,Ae=37813,je=37814,Me=37815,Ne=37816,Pe=37817,Fe=37818,Ie=37819,Le=37820,j=37821,Re=36492,ze=36494,Be=36495,M=36283,Ve=36284,He=36285,Ue=36286,We=2300,Ge=2301,Ke=2302,qe=2303,Je=2400,Ye=2401,Xe=2402,Ze=3200,Qe=`srgb`,$e=`srgb-linear`,et=`linear`,tt=`srgb`,nt=7680,rt=35044,it=35048,at=2e3;function ot(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function st(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ct(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function lt(){let e=ct(`canvas`);return e.style.display=`block`,e}var ut={};function dt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ft(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function N(...e){e=ft(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function P(...e){e=ft(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function pt(...e){let t=e.join(` `);t in ut||(ut[t]=!0,N(...e))}function mt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ht={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},gt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},_t=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),vt=1234567,yt=Math.PI/180,bt=180/Math.PI;function xt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_t[e&255]+_t[e>>8&255]+_t[e>>16&255]+_t[e>>24&255]+`-`+_t[t&255]+_t[t>>8&255]+`-`+_t[t>>16&15|64]+_t[t>>24&255]+`-`+_t[n&63|128]+_t[n>>8&255]+`-`+_t[n>>16&255]+_t[n>>24&255]+_t[r&255]+_t[r>>8&255]+_t[r>>16&255]+_t[r>>24&255]).toLowerCase()}function St(e,t,n){return Math.max(t,Math.min(n,e))}function Ct(e,t){return(e%t+t)%t}function wt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Tt(e,t,n){return e===t?0:(n-e)/(t-e)}function Et(e,t,n){return(1-n)*e+n*t}function Dt(e,t,n,r){return Et(e,t,1-Math.exp(-n*r))}function Ot(e,t=1){return t-Math.abs(Ct(e,t*2)-t)}function kt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function At(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function jt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Mt(e,t){return e+Math.random()*(t-e)}function Nt(e){return e*(.5-Math.random())}function Pt(e){e!==void 0&&(vt=e);let t=vt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ft(e){return e*yt}function It(e){return e*bt}function Lt(e){return(e&e-1)==0&&e!==0}function Rt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function zt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Bt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:N(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Vt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ht(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var F={DEG2RAD:yt,RAD2DEG:bt,generateUUID:xt,clamp:St,euclideanModulo:Ct,mapLinear:wt,inverseLerp:Tt,lerp:Et,damp:Dt,pingpong:Ot,smoothstep:kt,smootherstep:At,randInt:jt,randFloat:Mt,randFloatSpread:Nt,seededRandom:Pt,degToRad:Ft,radToDeg:It,isPowerOfTwo:Lt,ceilPowerOfTwo:Rt,floorPowerOfTwo:zt,setQuaternionFromProperEuler:Bt,normalize:Ht,denormalize:Vt};o=Symbol.iterator;var Ut=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(St(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=Ut,e.prototype.isVector2=!0;var Wt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:N(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var I=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this.z=St(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this.z=St(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(St(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gt.copy(this).projectOnVector(e),this.sub(Gt)}reflect(e){return this.sub(Gt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=I,t.prototype.isVector3=!0;var Gt=new I,Kt=new Wt,qt=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return pt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Jt.makeScale(e,t)),this}rotate(e){return pt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Jt.makeRotation(-e)),this}translate(e,t){return pt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Jt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=qt,n.prototype.isMatrix3=!0;var Jt=new qt,Yt=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xt=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zt(){let e={enabled:!0,workingColorSpace:$e,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=$t(e.r),e.g=$t(e.g),e.b=$t(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=en(e.r),e.g=en(e.g),e.b=en(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?et:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return pt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return pt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[$e]:{primaries:t,whitePoint:r,transfer:et,toXYZ:Yt,fromXYZ:Xt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:r,transfer:tt,toXYZ:Yt,fromXYZ:Xt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),e}var Qt=Zt();function $t(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function en(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var tn,nn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{tn===void 0&&(tn=ct(`canvas`)),tn.width=e.width,tn.height=e.height;let t=tn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=tn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=ct(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=$t(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor($t(t[e]/255)*255):t[e]=$t(t[e]);return{data:t,width:e.width,height:e.height}}else return N(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},rn=0,an=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rn++}),this.uuid=xt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(on(r[t].image)):e.push(on(r[t]))}else e=on(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function on(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?nn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(N(`Texture: Unable to serialize Texture.`),{})}var sn=0,cn=new I,ln=class e extends gt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=A,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sn++}),this.uuid=xt(),this.name=``,this.source=new an(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(cn).x}get height(){return this.source.getSize(cn).y}get depth(){return this.source.getSize(cn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){N(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){N(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null,ln.DEFAULT_MAPPING=300,ln.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var un=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this.z=St(this.z,e.z,t.z),this.w=St(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this.z=St(this.z,e,t),this.w=St(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(St(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=un,r.prototype.isVector4=!0;var dn=class extends gt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new un(0,0,e,t),this.scissorTest=!1,this.viewport=new un(0,0,e,t),this.textures=[];let r=new ln({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new an(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},fn=class extends dn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},pn=class extends ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},mn=class extends ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hn=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/gn.setFromMatrixColumn(e,0).length(),i=1/gn.setFromMatrixColumn(e,1).length(),a=1/gn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vn,e,yn)}lookAt(e,t,n){let r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),bn.crossVectors(n,Sn),bn.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),bn.crossVectors(n,Sn)),bn.normalize(),xn.crossVectors(Sn,bn),r[0]=bn.x,r[4]=xn.x,r[8]=Sn.x,r[1]=bn.y,r[5]=xn.y,r[9]=Sn.y,r[2]=bn.z,r[6]=xn.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],k=r[6],te=r[10],ne=r[14],A=r[3],re=r[7],ie=r[11],ae=r[15];return i[0]=a*x+o*T+s*O+c*A,i[4]=a*S+o*E+s*k+c*re,i[8]=a*C+o*D+s*te+c*ie,i[12]=a*w+o*ee+s*ne+c*ae,i[1]=l*x+u*T+d*O+f*A,i[5]=l*S+u*E+d*k+f*re,i[9]=l*C+u*D+d*te+f*ie,i[13]=l*w+u*ee+d*ne+f*ae,i[2]=p*x+m*T+h*O+g*A,i[6]=p*S+m*E+h*k+g*re,i[10]=p*C+m*D+h*te+g*ie,i[14]=p*w+m*ee+h*ne+g*ae,i[3]=_*x+v*T+y*O+b*A,i[7]=_*S+v*E+y*k+b*re,i[11]=_*C+v*D+y*te+b*ie,i[15]=_*w+v*ee+y*ne+b*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,ee=d*g-f*h,O=_*ee-v*D+y*E+b*T-x*w+S*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/O;return e[0]=(o*ee-s*D+c*E)*k,e[1]=(r*D-n*ee-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*ee-c*w)*k,e[5]=(t*ee-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=gn.set(r[0],r[1],r[2]).length(),o=gn.set(r[4],r[5],r[6]).length(),s=gn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),_n.copy(this);let c=1/a,l=1/o,u=1/s;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=l,_n.elements[5]*=l,_n.elements[6]*=l,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=at,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=at,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=hn,i.prototype.isMatrix4=!0;var gn=new I,_n=new hn,vn=new I(0,0,0),yn=new I(1,1,1),bn=new I,xn=new I,Sn=new I,Cn=new hn,wn=new Wt,Tn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-St(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(St(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:N(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wn.setFromEuler(this),this.setFromQuaternion(wn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER=`XYZ`;var En=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Dn=0,On=new I,kn=new Wt,An=new hn,jn=new I,Mn=new I,Nn=new I,Pn=new Wt,Fn=new I(1,0,0),In=new I(0,1,0),Ln=new I(0,0,1),Rn={type:`added`},zn={type:`removed`},Bn={type:`childadded`,child:null},Vn={type:`childremoved`,child:null},Hn=class e extends gt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dn++}),this.uuid=xt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new I,n=new Tn,r=new Wt,i=new I(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new hn},normalMatrix:{value:new qt}}),this.matrix=new hn,this.matrixWorld=new hn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new En,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.multiply(kn),this}rotateOnWorldAxis(e,t){return kn.setFromAxisAngle(e,t),this.quaternion.premultiply(kn),this}rotateX(e){return this.rotateOnAxis(Fn,e)}rotateY(e){return this.rotateOnAxis(In,e)}rotateZ(e){return this.rotateOnAxis(Ln,e)}translateOnAxis(e,t){return On.copy(e).applyQuaternion(this.quaternion),this.position.add(On.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fn,e)}translateY(e){return this.translateOnAxis(In,e)}translateZ(e){return this.translateOnAxis(Ln,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jn.copy(e):jn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Mn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(Mn,jn,this.up):An.lookAt(jn,Mn,this.up),this.quaternion.setFromRotationMatrix(An),r&&(An.extractRotation(r.matrixWorld),kn.setFromRotationMatrix(An),this.quaternion.premultiply(kn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(P(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rn),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null):P(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rn),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mn,e,Nn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mn,Pn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Hn.DEFAULT_UP=new I(0,1,0),Hn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var L=class extends Hn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Un={type:`move`},Wn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new L,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new L,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new L,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Un)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new L;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Gn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},qn={h:0,s:0,l:0};function Jn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var R=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Qt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Qt.workingColorSpace){if(e=Ct(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Jn(i,r,e+1/3),this.g=Jn(i,r,e),this.b=Jn(i,r,e-1/3)}return Qt.colorSpaceToWorking(this,r),this}setStyle(e,t=Qe){function n(t){t!==void 0&&parseFloat(t)<1&&N(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:N(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);N(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qe){let n=Gn[e.toLowerCase()];return n===void 0?N(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$t(e.r),this.g=$t(e.g),this.b=$t(e.b),this}copyLinearToSRGB(e){return this.r=en(e.r),this.g=en(e.g),this.b=en(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qe){return Qt.workingToColorSpace(Yn.copy(this),e),Math.round(St(Yn.r*255,0,255))*65536+Math.round(St(Yn.g*255,0,255))*256+Math.round(St(Yn.b*255,0,255))}getHexString(e=Qe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qt.workingColorSpace){Qt.workingToColorSpace(Yn.copy(this),t);let n=Yn.r,r=Yn.g,i=Yn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Qt.workingColorSpace){return Qt.workingToColorSpace(Yn.copy(this),t),e.r=Yn.r,e.g=Yn.g,e.b=Yn.b,e}getStyle(e=Qe){Qt.workingToColorSpace(Yn.copy(this),e);let t=Yn.r,n=Yn.g,r=Yn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(qn);let n=Et(Kn.h,qn.h,t),r=Et(Kn.s,qn.s,t),i=Et(Kn.l,qn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yn=new R;R.NAMES=Gn;var Xn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new R(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zn=class extends Hn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qn=new I,$n=new I,er=new I,tr=new I,nr=new I,rr=new I,ir=new I,ar=new I,or=new I,sr=new I,cr=new un,lr=new un,ur=new un,dr=class e{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Qn.subVectors(e,t),r.cross(Qn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Qn.subVectors(r,t),$n.subVectors(n,t),er.subVectors(e,t);let a=Qn.dot(Qn),o=Qn.dot($n),s=Qn.dot(er),c=$n.dot($n),l=$n.dot(er),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,tr)!==null&&tr.x>=0&&tr.y>=0&&tr.x+tr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,tr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,tr.x),s.addScaledVector(a,tr.y),s.addScaledVector(o,tr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return cr.setScalar(0),lr.setScalar(0),ur.setScalar(0),cr.fromBufferAttribute(e,t),lr.fromBufferAttribute(e,n),ur.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(cr,i.x),a.addScaledVector(lr,i.y),a.addScaledVector(ur,i.z),a}static isFrontFacing(e,t,n,r){return Qn.subVectors(n,t),$n.subVectors(e,t),Qn.cross($n).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Qn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;nr.subVectors(r,n),rr.subVectors(i,n),ar.subVectors(e,n);let s=nr.dot(ar),c=rr.dot(ar);if(s<=0&&c<=0)return t.copy(n);or.subVectors(e,r);let l=nr.dot(or),u=rr.dot(or);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(nr,a);sr.subVectors(e,i);let f=nr.dot(sr),p=rr.dot(sr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(rr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return ir.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(ir,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(nr,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fr=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=mr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,mr):mr.fromBufferAttribute(r,t),mr.applyMatrix4(e.matrixWorld),this.expandByPoint(mr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),hr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),hr.copy(e.boundingBox)),hr.applyMatrix4(e.matrixWorld),this.union(hr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mr),mr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),Cr.subVectors(this.max,Sr),gr.subVectors(e.a,Sr),_r.subVectors(e.b,Sr),vr.subVectors(e.c,Sr),yr.subVectors(_r,gr),br.subVectors(vr,_r),xr.subVectors(gr,vr);let t=[0,-yr.z,yr.y,0,-br.z,br.y,0,-xr.z,xr.y,yr.z,0,-yr.x,br.z,0,-br.x,xr.z,0,-xr.x,-yr.y,yr.x,0,-br.y,br.x,0,-xr.y,xr.x,0];return!Er(t,gr,_r,vr,Cr)||(t=[1,0,0,0,1,0,0,0,1],!Er(t,gr,_r,vr,Cr))?!1:(wr.crossVectors(yr,br),t=[wr.x,wr.y,wr.z],Er(t,gr,_r,vr,Cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},pr=[new I,new I,new I,new I,new I,new I,new I,new I],mr=new I,hr=new fr,gr=new I,_r=new I,vr=new I,yr=new I,br=new I,xr=new I,Sr=new I,Cr=new I,wr=new I,Tr=new I;function Er(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Tr.fromArray(e,a);let o=i.x*Math.abs(Tr.x)+i.y*Math.abs(Tr.y)+i.z*Math.abs(Tr.z),s=t.dot(Tr),c=n.dot(Tr),l=r.dot(Tr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Dr=new I,Or=new Ut,kr=0,Ar=class extends gt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=rt,this.updateRanges=[],this.gpuType=w,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix3(e),this.setXY(t,Or.x,Or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXYZ(t,Dr.x,Dr.y,Dr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix4(e),this.setXYZ(t,Dr.x,Dr.y,Dr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyNormalMatrix(e),this.setXYZ(t,Dr.x,Dr.y,Dr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.transformDirection(e),this.setXYZ(t,Dr.x,Dr.y,Dr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Vt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},jr=class extends Ar{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Mr=class extends Ar{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Nr=class extends Ar{constructor(e,t,n){super(new Float32Array(e),t,n)}},Pr=new fr,Fr=new I,Ir=new I,Lr=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Pr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fr.subVectors(e,this.center);let t=Fr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Fr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ir.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fr.copy(e.center).add(Ir)),this.expandByPoint(Fr.copy(e.center).sub(Ir))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Rr=0,zr=new hn,Br=new Hn,Vr=new I,Hr=new fr,Ur=new fr,Wr=new I,Gr=class e extends gt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rr++}),this.uuid=xt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ot(e)?Mr:jr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new qt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return zr.makeRotationFromQuaternion(e),this.applyMatrix4(zr),this}rotateX(e){return zr.makeRotationX(e),this.applyMatrix4(zr),this}rotateY(e){return zr.makeRotationY(e),this.applyMatrix4(zr),this}rotateZ(e){return zr.makeRotationZ(e),this.applyMatrix4(zr),this}translate(e,t,n){return zr.makeTranslation(e,t,n),this.applyMatrix4(zr),this}scale(e,t,n){return zr.makeScale(e,t,n),this.applyMatrix4(zr),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vr).negate(),this.translate(Vr.x,Vr.y,Vr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Nr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&N(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){P(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Hr.setFromBufferAttribute(n),this.morphTargetsRelative?(Wr.addVectors(this.boundingBox.min,Hr.min),this.boundingBox.expandByPoint(Wr),Wr.addVectors(this.boundingBox.max,Hr.max),this.boundingBox.expandByPoint(Wr)):(this.boundingBox.expandByPoint(Hr.min),this.boundingBox.expandByPoint(Hr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&P(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){P(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(Hr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ur.setFromBufferAttribute(n),this.morphTargetsRelative?(Wr.addVectors(Hr.min,Ur.min),Hr.expandByPoint(Wr),Wr.addVectors(Hr.max,Ur.max),Hr.expandByPoint(Wr)):(Hr.expandByPoint(Ur.min),Hr.expandByPoint(Ur.max))}Hr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Wr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Wr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Wr.fromBufferAttribute(a,t),o&&(Vr.fromBufferAttribute(e,t),Wr.add(Vr)),r=Math.max(r,n.distanceToSquared(Wr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&P(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){P(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Ar(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new I,s[e]=new I;let c=new I,l=new I,u=new I,d=new Ut,f=new Ut,p=new Ut,m=new I,h=new I;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new I,y=new I,b=new I,x=new I;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Ar(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new I,i=new I,a=new I,o=new I,s=new I,c=new I,l=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wr.fromBufferAttribute(e,t),Wr.normalize(),e.setXYZ(t,Wr.x,Wr.y,Wr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Ar(a,r,i)}if(this.index===null)return N(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kr=0,qr=class extends gt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kr++}),this.uuid=xt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new R(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nt,this.stencilZFail=nt,this.stencilZPass=nt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){N(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){N(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new R().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors==`number`?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Ut().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ut().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Jr=new I,Yr=new I,Xr=new I,Zr=new I,Qr=new I,$r=new I,ei=new I,ti=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jr.copy(this.origin).addScaledVector(this.direction,t),Jr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Yr.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),Zr.copy(this.origin).sub(Yr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=Zr.dot(this.direction),s=-Zr.dot(Xr),c=Zr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Yr).addScaledVector(Xr,d),f}intersectSphere(e,t){Jr.subVectors(e.center,this.origin);let n=Jr.dot(this.direction),r=Jr.dot(Jr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Jr)!==null}intersectTriangle(e,t,n,r,i){Qr.subVectors(t,e),$r.subVectors(n,e),ei.crossVectors(Qr,$r);let a=this.direction.dot(ei),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zr.subVectors(this.origin,e);let s=o*this.direction.dot($r.crossVectors(Zr,$r));if(s<0)return null;let c=o*this.direction.dot(Qr.cross(Zr));if(c<0||s+c>a)return null;let l=-o*Zr.dot(ei);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ni=class extends qr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new R(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ri=new hn,ii=new ti,ai=new Lr,oi=new I,si=new I,ci=new I,li=new I,ui=new I,di=new I,fi=new I,pi=new I,z=class extends Hn{constructor(e=new Gr,t=new ni){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){di.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ui.fromBufferAttribute(s,e),a?di.addScaledVector(ui,r):di.addScaledVector(ui.sub(t),r))}t.add(di)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ai.copy(n.boundingSphere),ai.applyMatrix4(i),ii.copy(e.ray).recast(e.near),!(ai.containsPoint(ii.origin)===!1&&(ii.intersectSphere(ai,oi)===null||ii.origin.distanceToSquared(oi)>(e.far-e.near)**2))&&(ri.copy(i).invert(),ii.copy(e.ray).applyMatrix4(ri),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ii)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=hi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=hi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=hi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=hi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function mi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;pi.copy(s),pi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(pi);return l<n.near||l>n.far?null:{distance:l,point:pi.clone(),object:e}}function hi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,si),e.getVertexPosition(c,ci),e.getVertexPosition(l,li);let u=mi(e,t,n,r,si,ci,li,fi);if(u){let e=new I;dr.getBarycoord(fi,si,ci,li,e),i&&(u.uv=dr.getInterpolatedAttribute(i,s,c,l,e,new Ut)),a&&(u.uv1=dr.getInterpolatedAttribute(a,s,c,l,e,new Ut)),o&&(u.normal=dr.getInterpolatedAttribute(o,s,c,l,e,new I),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new I,materialIndex:0};dr.getNormal(si,ci,li,t.normal),u.face=t,u.barycoord=e}return u}var gi=class extends ln{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_i=class extends Ar{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},vi=new hn,yi=new hn,bi=[],xi=new fr,Si=new hn,Ci=new z,wi=new Lr,Ti=class extends z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _i(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Si)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),xi.copy(e.boundingBox).applyMatrix4(vi),this.boundingBox.union(xi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),wi.copy(e.boundingSphere).applyMatrix4(vi),this.boundingSphere.union(wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ci.geometry=this.geometry,Ci.material=this.material,Ci.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wi.copy(this.boundingSphere),wi.applyMatrix4(n),e.ray.intersectsSphere(wi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,vi),yi.multiplyMatrices(n,vi),Ci.matrixWorld=yi,Ci.raycast(e,bi);for(let e=0,n=bi.length;e<n;e++){let n=bi[e];n.instanceId=i,n.object=this,t.push(n)}bi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new _i(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new gi(new Float32Array(r*this.count),r,this.count,ae,w));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ei=new I,Di=new I,Oi=new qt,ki=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ei.subVectors(n,t).cross(Di.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ei),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Oi.getNormalMatrix(e),r=this.coplanarPoint(Ei).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ai=new Lr,ji=new Ut(.5,.5),Mi=new I,Ni=class{constructor(e=new ki,t=new ki,n=new ki,r=new ki,i=new ki,a=new ki){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=at,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476+ji.distanceTo(e.center),Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Mi.x=r.normal.x>0?e.max.x:e.min.x,Mi.y=r.normal.y>0?e.max.y:e.min.y,Mi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Mi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Pi=class extends qr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new R(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fi=new hn,Ii=new ti,Li=new Lr,Ri=new I,zi=class extends Hn{constructor(e=new Gr,t=new Pi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Li.copy(n.boundingSphere),Li.applyMatrix4(r),Li.radius+=i,e.ray.intersectsSphere(Li)===!1)return;Fi.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(Fi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ri.fromBufferAttribute(l,n),Bi(Ri,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ri.fromBufferAttribute(l,a),Bi(Ri,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Bi(e,t,n,r,i,a,o){let s=Ii.distanceSqToPoint(e);if(s<n){let n=new I;Ii.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Vi=class extends ln{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Hi=class extends ln{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=re,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new an(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ui=class extends Hi{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=re){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Wi=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},B=class e extends Gr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Nr(c,3)),this.setAttribute(`normal`,new Nr(l,3)),this.setAttribute(`uv`,new Nr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new I;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Gi=class e extends Gr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new I,l=new Ut;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Nr(a,3)),this.setAttribute(`normal`,new Nr(o,3)),this.setAttribute(`uv`,new Nr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ki=class e extends Gr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Nr(u,3)),this.setAttribute(`normal`,new Nr(d,3)),this.setAttribute(`uv`,new Nr(f,2));function _(){let a=new I,_=new I,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new Ut,m=new I,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qi=class e extends Ki{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ji=class e extends Gr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Nr(i,3)),this.setAttribute(`normal`,new Nr(i.slice(),3)),this.setAttribute(`uv`,new Nr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new I,r=new I,i=new I;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new I;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new I;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new I,t=new I,n=new I,r=new I,o=new Ut,s=new Ut,c=new Ut;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Yi=class e extends Ji{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Xi=class e extends Gr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Nr(p,3)),this.setAttribute(`normal`,new Nr(m,3)),this.setAttribute(`uv`,new Nr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Zi=class e extends Gr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new I,p=new Ut;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Nr(s,3)),this.setAttribute(`normal`,new Nr(c,3)),this.setAttribute(`uv`,new Nr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Qi=class e extends Gr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new I,d=new I,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Nr(p,3)),this.setAttribute(`normal`,new Nr(m,3)),this.setAttribute(`uv`,new Nr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function $i(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ta(i))i.isRenderTargetTexture?(N(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(ta(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function ea(e){let t={};for(let n=0;n<e.length;n++){let r=$i(e[n]);for(let e in r)t[e]=r[e]}return t}function ta(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function na(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ra(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var ia={clone:$i,merge:ea},aa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sa=class extends qr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=aa,this.fragmentShader=oa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=na(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new R().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Ut().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new I().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new un().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new qt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new hn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ca=class extends sa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},la=class extends qr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new R(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new R(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ua=class extends qr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new R(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new R(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},da=class extends qr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ze,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},fa=class extends qr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function pa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var ma=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ha=class extends ma{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Je,endingEnd:Je}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ye:i=e,o=2*t-n;break;case Xe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ye:a=e,s=2*n-t;break;case Xe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ga=class extends ma{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},_a=class extends ma{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},va=class extends ma{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},ya=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=pa(t,this.TimeBufferType),this.values=pa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:pa(e.times,Array),values:pa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new va(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case We:t=this.InterpolantFactoryMethodDiscrete;break;case Ge:t=this.InterpolantFactoryMethodLinear;break;case Ke:t=this.InterpolantFactoryMethodSmooth;break;case qe:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return N(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return We;case this.InterpolantFactoryMethodLinear:return Ge;case this.InterpolantFactoryMethodSmooth:return Ke;case this.InterpolantFactoryMethodBezier:return qe}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(P(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(P(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){P(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){P(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&st(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){P(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ke,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ya.prototype.ValueTypeName=``,ya.prototype.TimeBufferType=Float32Array,ya.prototype.ValueBufferType=Float32Array,ya.prototype.DefaultInterpolation=Ge;var ba=class extends ya{constructor(e,t,n){super(e,t,n)}};ba.prototype.ValueTypeName=`bool`,ba.prototype.ValueBufferType=Array,ba.prototype.DefaultInterpolation=We,ba.prototype.InterpolantFactoryMethodLinear=void 0,ba.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}};xa.prototype.ValueTypeName=`color`;var Sa=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}};Sa.prototype.ValueTypeName=`number`;var Ca=class extends ma{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Wt.slerpFlat(i,0,a,c-o,a,c,s);return i}},wa=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ca(this.times,this.values,this.getValueSize(),e)}};wa.prototype.ValueTypeName=`quaternion`,wa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends ya{constructor(e,t,n){super(e,t,n)}};Ta.prototype.ValueTypeName=`string`,Ta.prototype.ValueBufferType=Array,Ta.prototype.DefaultInterpolation=We,Ta.prototype.InterpolantFactoryMethodLinear=void 0,Ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}};Ea.prototype.ValueTypeName=`vector`;var Da=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Oa=class{constructor(e){this.manager=e===void 0?Da:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Oa.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var ka=class extends Hn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new R(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Aa=class extends ka{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Hn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new R(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ja=new hn,Ma=new I,Na=new I,Pa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new hn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ni,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ma.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ma),Na.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Na),t.updateMatrixWorld(),ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ja,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fa=new I,Ia=new Wt,La=new I,Ra=class extends Hn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new hn,this.projectionMatrix=new hn,this.projectionMatrixInverse=new hn,this.coordinateSystem=at,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fa,Ia,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ia,La.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fa,Ia,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ia,La.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},za=new I,Ba=new Ut,Va=new Ut,Ha=class extends Ra{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(yt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bt*2*Math.atan(Math.tan(yt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){za.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(za.x,za.y).multiplyScalar(-e/za.z),za.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(za.x,za.y).multiplyScalar(-e/za.z)}getViewSize(e,t){return this.getViewBounds(e,Ba,Va),t.subVectors(Va,Ba)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(yt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ua=class extends Pa{constructor(){super(new Ha(90,1,.5,500)),this.isPointLightShadow=!0}},Wa=class extends ka{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Ua}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ga=class extends Ra{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ka=class extends Pa{constructor(){super(new Ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},qa=class extends ka{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Hn.DEFAULT_UP),this.updateMatrix(),this.target=new Hn,this.shadow=new Ka}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ja=-90,Ya=1,Xa=class extends Hn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ha(Ja,Ya,e,t);r.layers=this.layers,this.add(r);let i=new Ha(Ja,Ya,e,t);i.layers=this.layers,this.add(i);let a=new Ha(Ja,Ya,e,t);a.layers=this.layers,this.add(a);let o=new Ha(Ja,Ya,e,t);o.layers=this.layers,this.add(o);let s=new Ha(Ja,Ya,e,t);s.layers=this.layers,this.add(s);let c=new Ha(Ja,Ya,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Za=class extends Ha{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qa=`\\[\\]\\.:\\/`,$a=RegExp(`[\\[\\]\\.:\\/]`,`g`),eo=`[^\\[\\]\\.:\\/]`,to=`[^`+Qa.replace(`\\.`,``)+`]`,no=`((?:WC+[\\/:])*)`.replace(`WC`,eo),ro=`(WCOD+)?`.replace(`WCOD`,to),io=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,eo),ao=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,eo),oo=RegExp(`^`+no+ro+io+ao+`$`),so=[`material`,`materials`,`bones`,`map`],co=class{constructor(e,t,n){let r=n||lo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},lo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace($a,``)}static parseTrackName(e){let t=oo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);so.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){N(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){P(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){P(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){P(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){P(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){P(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){P(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){P(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;P(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){P(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){P(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lo.Composite=co,lo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},lo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},lo.prototype.GetterByBindingType=[lo.prototype._getValue_direct,lo.prototype._getValue_array,lo.prototype._getValue_arrayElement,lo.prototype._getValue_toArray],lo.prototype.SetterByBindingTypeAndVersioning=[[lo.prototype._setValue_direct,lo.prototype._setValue_direct_setNeedsUpdate,lo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_array,lo.prototype._setValue_array_setNeedsUpdate,lo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_arrayElement,lo.prototype._setValue_arrayElement_setNeedsUpdate,lo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_fromArray,lo.prototype._setValue_fromArray_setNeedsUpdate,lo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uo=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,N(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function fo(e,t,n,r){let i=po(r);switch(n){case te:return e*t;case ae:return e*t/i.components*i.byteLength;case oe:return e*t/i.components*i.byteLength;case se:return e*t*2/i.components*i.byteLength;case ce:return e*t*2/i.components*i.byteLength;case ne:return e*t*3/i.components*i.byteLength;case A:return e*t*4/i.components*i.byteLength;case le:return e*t*4/i.components*i.byteLength;case ue:case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fe:case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:case _e:return Math.max(e,16)*Math.max(t,8)/4;case me:case ge:return Math.max(e,8)*Math.max(t,8)/2;case ve:case ye:case xe:case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case be:case Ce:case we:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ee:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case De:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Oe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ae:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case je:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Me:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ne:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Pe:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Fe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ie:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Le:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case j:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Re:case ze:case Be:return Math.ceil(e/4)*Math.ceil(t/4)*16;case M:case Ve:return Math.ceil(e/4)*Math.ceil(t/4)*8;case He:case Ue:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function po(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case O:case k:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?N(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function mo(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ho(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var go={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},V={common:{diffuse:{value:new R(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new R(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new R(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new R(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},_o={basic:{uniforms:ea([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.fog]),vertexShader:go.meshbasic_vert,fragmentShader:go.meshbasic_frag},lambert:{uniforms:ea([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new R(0)},envMapIntensity:{value:1}}]),vertexShader:go.meshlambert_vert,fragmentShader:go.meshlambert_frag},phong:{uniforms:ea([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new R(0)},specular:{value:new R(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:go.meshphong_vert,fragmentShader:go.meshphong_frag},standard:{uniforms:ea([V.common,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.roughnessmap,V.metalnessmap,V.fog,V.lights,{emissive:{value:new R(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:go.meshphysical_vert,fragmentShader:go.meshphysical_frag},toon:{uniforms:ea([V.common,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.gradientmap,V.fog,V.lights,{emissive:{value:new R(0)}}]),vertexShader:go.meshtoon_vert,fragmentShader:go.meshtoon_frag},matcap:{uniforms:ea([V.common,V.bumpmap,V.normalmap,V.displacementmap,V.fog,{matcap:{value:null}}]),vertexShader:go.meshmatcap_vert,fragmentShader:go.meshmatcap_frag},points:{uniforms:ea([V.points,V.fog]),vertexShader:go.points_vert,fragmentShader:go.points_frag},dashed:{uniforms:ea([V.common,V.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:go.linedashed_vert,fragmentShader:go.linedashed_frag},depth:{uniforms:ea([V.common,V.displacementmap]),vertexShader:go.depth_vert,fragmentShader:go.depth_frag},normal:{uniforms:ea([V.common,V.bumpmap,V.normalmap,V.displacementmap,{opacity:{value:1}}]),vertexShader:go.meshnormal_vert,fragmentShader:go.meshnormal_frag},sprite:{uniforms:ea([V.sprite,V.fog]),vertexShader:go.sprite_vert,fragmentShader:go.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:go.background_vert,fragmentShader:go.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:go.backgroundCube_vert,fragmentShader:go.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:go.cube_vert,fragmentShader:go.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:go.equirect_vert,fragmentShader:go.equirect_frag},distance:{uniforms:ea([V.common,V.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:go.distance_vert,fragmentShader:go.distance_frag},shadow:{uniforms:ea([V.lights,V.fog,{color:{value:new R(0)},opacity:{value:1}}]),vertexShader:go.shadow_vert,fragmentShader:go.shadow_frag}};_o.physical={uniforms:ea([_o.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new R(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new R(0)},specularColor:{value:new R(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:go.meshphysical_vert,fragmentShader:go.meshphysical_frag};var vo={r:0,b:0,g:0},yo=new hn,bo=new qt;bo.set(-1,0,0,0,1,0,0,0,1);function xo(e,t,n,r,i,a){let o=new R(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new z(new B(1,1,1),new sa({name:`BackgroundCubeMaterial`,uniforms:$i(_o.backgroundCube.uniforms),vertexShader:_o.backgroundCube.vertexShader,fragmentShader:_o.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bo),l.material.toneMapped=Qt.getTransfer(i.colorSpace)!==tt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new z(new Xi(2,2),new sa({name:`BackgroundMaterial`,uniforms:$i(_o.background.uniforms),vertexShader:_o.background.vertexShader,fragmentShader:_o.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(i.colorSpace)!==tt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(vo,ra(e)),n.buffers.color.setClear(vo.r,vo.g,vo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function So(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Co(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function wo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(N(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&N(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function To(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ki,s=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Eo=4,Do=[.125,.215,.35,.446,.526,.582],Oo=20,ko=256,Ao=new Ga,jo=new R,Mo=null,No=0,Po=0,Fo=!1,Io=new I,Lo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Io}=i;Mo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mo,No,Po),this._renderer.xr.enabled=Fo,e.scissorTest=!1,Bo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:h,minFilter:h,generateMipmaps:!1,type:T,format:A,colorSpace:$e,depthBuffer:!1},r=zo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ro(r)),this._blurMaterial=Ho(r,e,t),this._ggxMaterial=Vo(r,e,t)}return r}_compileMaterial(e){let t=new z(new Gr,e);this._renderer.compile(t,Ao)}_sceneToCubeUV(e,t,n,r,i){let a=new Ha(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(jo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new z(new B,new ni({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(jo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Bo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Bo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ao)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Eo?n-d+Eo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Bo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ao),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Bo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ao)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&P(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*Oo-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):Oo;m>Oo&&N(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oo}`);let h=[],g=0;for(let e=0;e<Oo;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Bo(t,3*v*(r>_-Eo?r-_+Eo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Ao)}};function Ro(e){let t=[],n=[],r=[],i=e,a=e-Eo+1+Do.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Eo?s=Do[o-e+Eo-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Gr;h.setAttribute(`position`,new Ar(f,3)),h.setAttribute(`uv`,new Ar(p,2)),h.setAttribute(`faceIndex`,new Ar(m,1)),r.push(new z(h,null)),i>Eo&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function zo(e,t,n){let r=new fn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Bo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Vo(e,t,n){return new sa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ko,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Go(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ho(e,t,n){let r=new Float32Array(Oo),i=new I(0,1,0);return new sa({name:`SphericalGaussianBlur`,defines:{n:Oo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Uo(){return new sa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wo(){return new sa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ko=class extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Vi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new B(5,5,5),i=new sa({name:`CubemapFromEquirect`,uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new z(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new Xa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function qo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new Ko(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Jo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&pt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Yo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Mr:jr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Xo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:P(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Qo(e,t,n){let r=new WeakMap,i=new un;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new pn(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Ut(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function $o(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var es={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ts(e,t,n,r,i,a){let o=new fn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Hi(t,n):void 0}),s=new fn(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new Gr;c.setAttribute(`position`,new Nr([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new Nr([0,2,0,0,2,0],2));let l=new ca({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new z(c,l),d=new Ga(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Qt.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=es[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var ns=new ln,rs=new Hi(1,1),is=new pn,as=new mn,os=new Vi,ss=[],cs=[],ls=new Float32Array(16),us=new Float32Array(9),ds=new Float32Array(4);function fs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ss[i];if(a===void 0&&(a=new Float32Array(i),ss[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ps(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ms(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function hs(e,t){let n=cs[t];n===void 0&&(n=new Int32Array(t),cs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function gs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function _s(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2fv(this.addr,t),ms(n,t)}}function vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ps(n,t))return;e.uniform3fv(this.addr,t),ms(n,t)}}function ys(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4fv(this.addr,t),ms(n,t)}}function bs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;ds.set(r),e.uniformMatrix2fv(this.addr,!1,ds),ms(n,r)}}function xs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;us.set(r),e.uniformMatrix3fv(this.addr,!1,us),ms(n,r)}}function Ss(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;ls.set(r),e.uniformMatrix4fv(this.addr,!1,ls),ms(n,r)}}function Cs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2iv(this.addr,t),ms(n,t)}}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ps(n,t))return;e.uniform3iv(this.addr,t),ms(n,t)}}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4iv(this.addr,t),ms(n,t)}}function Ds(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2uiv(this.addr,t),ms(n,t)}}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ps(n,t))return;e.uniform3uiv(this.addr,t),ms(n,t)}}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4uiv(this.addr,t),ms(n,t)}}function js(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(rs.compareFunction=n.isReversedDepthBuffer()?518:515,a=rs):a=ns,n.setTexture2D(t||a,i)}function Ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||as,i)}function Ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||os,i)}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||is,i)}function Fs(e){switch(e){case 5126:return gs;case 35664:return _s;case 35665:return vs;case 35666:return ys;case 35674:return bs;case 35675:return xs;case 35676:return Ss;case 5124:case 35670:return Cs;case 35667:case 35671:return ws;case 35668:case 35672:return Ts;case 35669:case 35673:return Es;case 5125:return Ds;case 36294:return Os;case 36295:return ks;case 36296:return As;case 35678:case 36198:case 36298:case 36306:case 35682:return js;case 35679:case 36299:case 36307:return Ms;case 35680:case 36300:case 36308:case 36293:return Ns;case 36289:case 36303:case 36311:case 36292:return Ps}}function Is(e,t){e.uniform1fv(this.addr,t)}function Ls(e,t){let n=fs(t,this.size,2);e.uniform2fv(this.addr,n)}function Rs(e,t){let n=fs(t,this.size,3);e.uniform3fv(this.addr,n)}function zs(e,t){let n=fs(t,this.size,4);e.uniform4fv(this.addr,n)}function Bs(e,t){let n=fs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vs(e,t){let n=fs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hs(e,t){let n=fs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Us(e,t){e.uniform1iv(this.addr,t)}function Ws(e,t){e.uniform2iv(this.addr,t)}function Gs(e,t){e.uniform3iv(this.addr,t)}function Ks(e,t){e.uniform4iv(this.addr,t)}function qs(e,t){e.uniform1uiv(this.addr,t)}function Js(e,t){e.uniform2uiv(this.addr,t)}function Ys(e,t){e.uniform3uiv(this.addr,t)}function Xs(e,t){e.uniform4uiv(this.addr,t)}function Zs(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?rs:ns;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qs(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||as,a[e])}function $s(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||os,a[e])}function ec(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||is,a[e])}function tc(e){switch(e){case 5126:return Is;case 35664:return Ls;case 35665:return Rs;case 35666:return zs;case 35674:return Bs;case 35675:return Vs;case 35676:return Hs;case 5124:case 35670:return Us;case 35667:case 35671:return Ws;case 35668:case 35672:return Gs;case 35669:case 35673:return Ks;case 5125:return qs;case 36294:return Js;case 36295:return Ys;case 36296:return Xs;case 35678:case 36198:case 36298:case 36306:case 35682:return Zs;case 35679:case 36299:case 36307:return Qs;case 35680:case 36300:case 36308:case 36293:return $s;case 36289:case 36303:case 36311:case 36292:return ec}}var nc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fs(t.type)}},rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tc(t.type)}},ic=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ac=/(\w+)(\])?(\[|\.)?/g;function oc(e,t){e.seq.push(t),e.map[t.id]=t}function sc(e,t,n){let r=e.name,i=r.length;for(ac.lastIndex=0;;){let a=ac.exec(r),o=ac.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){oc(n,l===void 0?new nc(s,e,t):new rc(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new ic(s),oc(n,e)),n=e}}}var cc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);sc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function lc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var uc=37297,dc=0;function fc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var pc=new qt;function mc(e){Qt._getMatrix(pc,Qt.workingColorSpace,e);let t=`mat3( ${pc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(e)){case et:return[t,`LinearTransferOETF`];case tt:return[t,`sRGBTransferOETF`];default:return N(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function hc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+fc(e.getShaderSource(t),r)}else return i}function gc(e,t){let n=mc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var _c={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function vc(e,t){let n=_c[t];return n===void 0?(N(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var yc=new I;function bc(){return Qt.getLuminanceCoefficients(yc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${yc.x.toFixed(4)}, ${yc.y.toFixed(4)}, ${yc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function xc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(wc).join(`
`)}function Sc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Cc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function wc(e){return e!==``}function Tc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ec(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Dc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(e){return e.replace(Dc,Ac)}var kc=new Map;function Ac(e,t){let n=go[t];if(n===void 0){let e=kc.get(t);if(e!==void 0)n=go[e],N(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Oc(n)}var jc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mc(e){return e.replace(jc,Nc)}function Nc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Pc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Fc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ic(e){return Fc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Lc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Rc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Lc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var zc={302:`ENVMAP_MODE_REFRACTION`};function Bc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:zc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Vc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Hc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Vc[e.combine]||`ENVMAP_BLENDING_NONE`}function Uc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Wc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ic(n),l=Rc(n),u=Bc(n),d=Hc(n),f=Uc(n),p=xc(n),m=Sc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wc).join(`
`),_.length>0&&(_+=`
`)):(g=[Pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(wc).join(`
`),_=[Pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:go.tonemapping_pars_fragment,n.toneMapping===0?``:vc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,go.colorspace_pars_fragment,gc(`linearToOutputTexel`,n.outputColorSpace),bc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(wc).join(`
`)),o=Oc(o),o=Tc(o,n),o=Ec(o,n),s=Oc(s),s=Tc(s,n),s=Ec(s,n),o=Mc(o),s=Mc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=lc(i,i.VERTEX_SHADER,y),S=lc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=hc(i,x,`vertex`),n=hc(i,S,`fragment`);P(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):N(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new cc(i,h),T=Cc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,uc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Gc=0,Kc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new qc(e),t.set(e,n)),n}},qc=class{constructor(e){this.id=Gc++,this.code=e,this.usedTimes=0}};function Jc(e){return e===1030||e===37490||e===36285}function Yc(e,t,n,r,i,a){let o=new En,s=new Kc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&N(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,O,k;if(C){let e=_o[C];D=e.vertexShader,ee=e.fragmentShader}else{D=i.vertexShader,ee=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let te=e.getRenderTarget(),ne=e.state.buffers.depth.getReversed(),A=h.isInstancedMesh===!0,re=h.isBatchedMesh===!0,ie=!!i.map,ae=!!i.matcap,oe=!!x,se=!!i.aoMap,ce=!!i.lightMap,le=!!i.bumpMap&&i.wireframe===!1,ue=!!i.normalMap,de=!!i.displacementMap,fe=!!i.emissiveMap,pe=!!i.metalnessMap,me=!!i.roughnessMap,he=i.anisotropy>0,ge=i.clearcoat>0,_e=i.dispersion>0,ve=i.iridescence>0,ye=i.sheen>0,be=i.transmission>0,xe=he&&!!i.anisotropyMap,Se=ge&&!!i.clearcoatMap,Ce=ge&&!!i.clearcoatNormalMap,we=ge&&!!i.clearcoatRoughnessMap,Te=ve&&!!i.iridescenceMap,Ee=ve&&!!i.iridescenceThicknessMap,De=ye&&!!i.sheenColorMap,Oe=ye&&!!i.sheenRoughnessMap,ke=!!i.specularMap,Ae=!!i.specularColorMap,je=!!i.specularIntensityMap,Me=be&&!!i.transmissionMap,Ne=be&&!!i.thicknessMap,Pe=!!i.gradientMap,Fe=!!i.alphaMap,Ie=i.alphaTest>0,Le=!!i.alphaHash,j=!!i.extensions,Re=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Re=e.toneMapping);let ze={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:re,batchingColor:re&&h._colorsTexture!==null,instancing:A,instancingColor:A&&h.instanceColor!==null,instancingMorph:A&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ie,matcap:ae,envMap:oe,envMapMode:oe&&x.mapping,envMapCubeUVHeight:S,aoMap:se,lightMap:ce,bumpMap:le,normalMap:ue,displacementMap:de,emissiveMap:fe,normalMapObjectSpace:ue&&i.normalMapType===1,normalMapTangentSpace:ue&&i.normalMapType===0,packedNormalMap:ue&&i.normalMapType===0&&Jc(i.normalMap.format),metalnessMap:pe,roughnessMap:me,anisotropy:he,anisotropyMap:xe,clearcoat:ge,clearcoatMap:Se,clearcoatNormalMap:Ce,clearcoatRoughnessMap:we,dispersion:_e,iridescence:ve,iridescenceMap:Te,iridescenceThicknessMap:Ee,sheen:ye,sheenColorMap:De,sheenRoughnessMap:Oe,specularMap:ke,specularColorMap:Ae,specularIntensityMap:je,transmission:be,transmissionMap:Me,thicknessMap:Ne,gradientMap:Pe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Fe,alphaTest:Ie,alphaHash:Le,combine:i.combine,mapUv:ie&&m(i.map.channel),aoMapUv:se&&m(i.aoMap.channel),lightMapUv:ce&&m(i.lightMap.channel),bumpMapUv:le&&m(i.bumpMap.channel),normalMapUv:ue&&m(i.normalMap.channel),displacementMapUv:de&&m(i.displacementMap.channel),emissiveMapUv:fe&&m(i.emissiveMap.channel),metalnessMapUv:pe&&m(i.metalnessMap.channel),roughnessMapUv:me&&m(i.roughnessMap.channel),anisotropyMapUv:xe&&m(i.anisotropyMap.channel),clearcoatMapUv:Se&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:De&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&m(i.sheenRoughnessMap.channel),specularMapUv:ke&&m(i.specularMap.channel),specularColorMapUv:Ae&&m(i.specularColorMap.channel),specularIntensityMapUv:je&&m(i.specularIntensityMap.channel),transmissionMapUv:Me&&m(i.transmissionMap.channel),thicknessMapUv:Ne&&m(i.thicknessMap.channel),alphaMapUv:Fe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ue||he),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ie||Fe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ue===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:ie&&i.map.isVideoTexture===!0&&Qt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:fe&&i.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:j&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(j&&i.extensions.multiDraw===!0||re)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=_o[t];n=ia.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Wc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Xc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Zc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Qc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $c(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||Zc),r.length>1&&r.sort(t||Qc),i.length>1&&i.sort(t||Qc),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function el(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new $c,e.set(t,[i])):n>=r.length?(i=new $c,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function tl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new I,color:new R};break;case`SpotLight`:n={position:new I,direction:new I,color:new R,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new I,color:new R,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new I,skyColor:new R,groundColor:new R};break;case`RectAreaLight`:n={color:new R,position:new I,halfWidth:new I,halfHeight:new I};break}return e[t.id]=n,n}}}function nl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var rl=0;function il(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function al(e){let t=new tl,n=nl(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new I);let i=new I,a=new hn,o=new hn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(il);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=V.LTC_FLOAT_1,r.rectAreaLTC2=V.LTC_FLOAT_2):(r.rectAreaLTC1=V.LTC_HALF_1,r.rectAreaLTC2=V.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=rl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function ol(e){let t=new al(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function sl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ol(e),t.set(n,[a])):r>=i.length?(a=new ol(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var cl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ll=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ul=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],dl=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],fl=new hn,pl=new I,ml=new I;function hl(e,t,n){let r=new Ni,i=new Ut,a=new Ut,o=new un,s=new da,c=new fa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new sa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:cl,fragmentShader:ll}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Gr;g.setAttribute(`position`,new Ar(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new z(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(N(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){N(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){N(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new fn(i.x,i.y,{format:se,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Hi(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=re,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new Ko(i.x),d.map.depthTexture=new Ui(i.x,C)):(d.map=new fn(i.x,i.y),d.map.depthTexture=new Hi(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=re,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}let v=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<v;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),pl.setFromMatrixPosition(l.matrixWorld),e.position.copy(pl),ml.copy(e.position),ml.add(ul[t]),e.up.copy(dl[t]),e.lookAt(ml),e.updateMatrixWorld(),n.makeTranslation(-pl.x,-pl.y,-pl.z),fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(fl,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),S(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new fn(i.x,i.y,{format:se,type:T})),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function gl(e,t){function n(){let t=!1,n=new un,r=null,i=new un(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?pe(e.DEPTH_TEST):me(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ht[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?pe(e.STENCIL_TEST):me(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new R(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,re=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),A=re>=2):(re=parseFloat(/^WebGL (\d)/.exec(ie)[1]),A=re>=1);let ae=null,oe={},se=e.getParameter(e.SCISSOR_BOX),ce=e.getParameter(e.VIEWPORT),le=new un().fromArray(se),ue=new un().fromArray(ce);function de(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let fe={};fe[e.TEXTURE_2D]=de(e.TEXTURE_2D,e.TEXTURE_2D,1),fe[e.TEXTURE_CUBE_MAP]=de(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[e.TEXTURE_2D_ARRAY]=de(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),fe[e.TEXTURE_3D]=de(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),pe(e.DEPTH_TEST),o.setFunc(3),Se(!1),Ce(1),pe(e.CULL_FACE),be(0);function pe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function me(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function he(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ge(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function _e(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let ve={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ve[103]=e.MIN,ve[104]=e.MAX;let ye={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function be(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(me(e.BLEND),g=!1);return}if(g===!1&&(pe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:P(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:P(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:P(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:P(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(ve[n],ve[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ye[r],ye[i],ye[o],ye[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function xe(t,n){t.side===2?me(e.CULL_FACE):pe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),Se(r),t.blending===1&&t.transparent===!1?be(0):be(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Te(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?pe(e.SAMPLE_ALPHA_TO_COVERAGE):me(e.SAMPLE_ALPHA_TO_COVERAGE)}function Se(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function Ce(t){t===0?me(e.CULL_FACE):(pe(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function we(t){t!==O&&(A&&e.lineWidth(t),O=t)}function Te(t,n,r){t?(pe(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):me(e.POLYGON_OFFSET_FILL)}function Ee(t){t?pe(e.SCISSOR_TEST):me(e.SCISSOR_TEST)}function De(t){t===void 0&&(t=e.TEXTURE0+ne-1),ae!==t&&(e.activeTexture(t),ae=t)}function Oe(t,n,r){r===void 0&&(r=ae===null?e.TEXTURE0+ne-1:ae);let i=oe[r];i===void 0&&(i={type:void 0,texture:void 0},oe[r]=i),(i.type!==t||i.texture!==n)&&(ae!==r&&(e.activeTexture(r),ae=r),e.bindTexture(t,n||fe[t]),i.type=t,i.texture=n)}function ke(){let t=oe[ae];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ae(){try{e.compressedTexImage2D(...arguments)}catch(e){P(`WebGLState:`,e)}}function je(){try{e.compressedTexImage3D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Me(){try{e.texSubImage2D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Ne(){try{e.texSubImage3D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Pe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Fe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Ie(){try{e.texStorage2D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Le(){try{e.texStorage3D(...arguments)}catch(e){P(`WebGLState:`,e)}}function j(){try{e.texImage2D(...arguments)}catch(e){P(`WebGLState:`,e)}}function Re(){try{e.texImage3D(...arguments)}catch(e){P(`WebGLState:`,e)}}function ze(t){return d[t]===void 0?e.getParameter(t):d[t]}function Be(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function M(t){le.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),le.copy(t))}function Ve(t){ue.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ue.copy(t))}function He(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ue(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function We(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ae=null,oe={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new R(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,le.set(0,0,e.canvas.width,e.canvas.height),ue.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:pe,disable:me,bindFramebuffer:he,drawBuffers:ge,useProgram:_e,setBlending:be,setMaterial:xe,setFlipSided:Se,setCullFace:Ce,setLineWidth:we,setPolygonOffset:Te,setScissorTest:Ee,activeTexture:De,bindTexture:Oe,unbindTexture:ke,compressedTexImage2D:Ae,compressedTexImage3D:je,texImage2D:j,texImage3D:Re,pixelStorei:Be,getParameter:ze,updateUBOMapping:He,uniformBlockBinding:Ue,texStorage2D:Ie,texStorage3D:Le,texSubImage2D:Me,texSubImage3D:Ne,compressedTexSubImage2D:Pe,compressedTexSubImage3D:Fe,scissor:M,viewport:Ve,reset:We}}function _l(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new Ut,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):ct(`canvas`)}function T(e,t,n){let r=1,i=ze(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),N(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&N(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function ee(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function O(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];N(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||N(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?et:Qt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function k(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,N(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function te(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),re(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),oe(t)}function re(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ae(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function ae(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function oe(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let se=0;function ce(){se=0}function le(){return se}function ue(e){se=e}function de(){let e=se;return e>=i.maxTextures&&N(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),se+=1,e}function fe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function pe(t,i){let a=r.get(t);if(t.isVideoTexture&&j(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)N(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)N(`WebGLRenderer: Texture marked for update but image is incomplete`);else{we(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){we(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function he(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){we(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ge(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){Te(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let _e={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},ve={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},ye={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function be(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&N(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,_e[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,_e[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,_e[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ve[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ve[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ye[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function xe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=fe(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ae(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Se(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Se(n.start,r.width,4),c=Se(t.start,r.width,4);n.start<=i+1&&a===c&&Se(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function we(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=xe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Qt.getPrimaries(Qt.workingColorSpace),r=o.colorSpace===``?null:Qt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=T(o.image,!1,i.maxTextureSize);t=Re(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=O(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);be(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=te(o,t);if(o.isDepthTexture)p=k(o.format===ie,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture)if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&Ce(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023)if(r!==null)if(g){if(v)if(o.layerUpdates.size>0){let t=fo(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0);else N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data)}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}else if(o.isDataArrayTexture)if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v)if(o.layerUpdates.size>0){let i=fo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_)if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=ze(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=ze(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);E(o)&&D(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,o,s){if(o.image.length!==6)return;let c=xe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Qt.getPrimaries(Qt.workingColorSpace),r=o.colorSpace===``?null:Qt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=T(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Re(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=O(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=te(o,h);be(e.TEXTURE_CUBE_MAP,o);let C;if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=ze(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(o)&&D(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ee(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=O(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Le(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ie(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=k(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Le(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ie(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ie(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=O(o.internalFormat,c,l,o.normalized,o.colorSpace);Le(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ie(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ie(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Oe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,ne)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),be(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else pe(i.depthTexture,0);let u=l.__webglTexture,d=Ie(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Le(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Le(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ke(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)Oe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Oe(i.__webglFramebuffer[0],t,0):Oe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),De(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),De(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(t,n,i){let a=r.get(t);n!==void 0&&Ee(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ke(t)}function je(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,A);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Le(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=O(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ie(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),De(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),be(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ee(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),be(c,a),Ee(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),E(a)&&D(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),be(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ee(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&ke(t)}function Me(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=ee(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Ne=[],Pe=[];function Fe(t){if(t.samples>0){if(Le(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ne.length=0,Pe.length=0,Ne.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Ne.push(l),Pe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Pe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ne))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ie(e){return Math.min(i.maxSamples,e.samples)}function Le(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function j(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Re(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Qt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&N(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):P(`WebGLTextures: Unsupported texture color space:`,n)),t}function ze(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=de,this.resetTextureUnits=ce,this.getTextureUnits=le,this.setTextureUnits=ue,this.setTexture2D=pe,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=Ae,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function vl(e,t){function n(n,r=``){let i,a=Qt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var yl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Wi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new sa({vertexShader:yl,fragmentShader:bl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new z(new Xi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sl=class extends gt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new xl,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new Ut,T=null,E=new Ha;E.viewport=new un;let D=new Ha;D.viewport=new un;let O=[E,D],k=new Za,te=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Wn,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Wn,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Wn,x[e]=t),t.getHandSpace()};function ae(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function oe(){r.removeEventListener(`select`,ae),r.removeEventListener(`selectstart`,ae),r.removeEventListener(`selectend`,ae),r.removeEventListener(`squeeze`,ae),r.removeEventListener(`squeezestart`,ae),r.removeEventListener(`squeezeend`,ae),r.removeEventListener(`end`,oe),r.removeEventListener(`inputsourceschange`,se);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}te=null,ne=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,ae),r.addEventListener(`selectstart`,ae),r.addEventListener(`selectend`,ae),r.addEventListener(`squeeze`,ae),r.addEventListener(`squeezestart`,ae),r.addEventListener(`squeezeend`,ae),r.addEventListener(`end`,oe),r.addEventListener(`inputsourceschange`,se),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ie:re,a=_.stencil?ee:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new fn(d.textureWidth,d.textureHeight,{format:A,type:v,depthTexture:new Hi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new fn(f.framebufferWidth,f.framebufferHeight,{format:A,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),he.setContext(r),he.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function se(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}let ce=new I,le=new I;function ue(e,t,n){ce.setFromMatrixPosition(t.matrixWorld),le.setFromMatrixPosition(n.matrixWorld);let r=ce.distanceTo(le),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function de(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),k.near=D.near=E.near=t,k.far=D.far=E.far=n,(te!==k.near||ne!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),te=k.near,ne=k.far),k.layers.mask=e.layers.mask|6,E.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;let i=e.parent,a=k.cameras;de(k,i);for(let e=0;e<a.length;e++)de(a[e],i);a.length===2?ue(k,E,D):k.projectionMatrix.copy(E.projectionMatrix),fe(e,k,i)};function fe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=bt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(k)},this.getCameraTexture=function(e){return g[e]};let pe=null;function me(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=O[n];o===void 0&&(o=new Ha,o.layers.enable(n),o.viewport=new un,O[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Wi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}pe&&pe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let he=new mo;he.setAnimationLoop(me),this.setAnimationLoop=function(e){pe=e},this.dispose=function(){}}},Cl=new hn,wl=new qt;wl.set(-1,0,0,0,1,0,0,0,1);function Tl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ra(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Cl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(wl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function El(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return P(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?N(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):N(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Dl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ol=null;function kl(){return Ol===null&&(Ol=new gi(Dl,16,16,se,T),Ol.name=`DFG_LUT`,Ol.minFilter=h,Ol.magFilter=h,Ol.wrapS=u,Ol.wrapT=u,Ol.generateMipmaps=!1,Ol.needsUpdate=!0),Ol}var Al=class{constructor(e={}){let{canvas:t=lt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([le,ce,oe]),g=new Set([v,C,x,ee,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S=new I,w=null,O=null,k=[],te=[],ne=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,re=!1,ie=null,ae=null,se=null,ue=null;this._outputColorSpace=Qe;let de=0,fe=0,pe=null,me=-1,he=null,ge=new un,_e=new un,ve=null,ye=new R(0),be=0,xe=t.width,Se=t.height,Ce=1,we=null,Te=null,Ee=new un(0,0,xe,Se),De=new un(0,0,xe,Se),Oe=!1,ke=new Ni,Ae=!1,je=!1,Me=new hn,Ne=new I,Pe=new un,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ie=!1;function Le(){return pe===null?Ce:1}let j=n;function Re(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,pt,!1),t.addEventListener(`webglcontextrestored`,ht,!1),t.addEventListener(`webglcontextcreationerror`,gt,!1),j===null){let t=`webgl2`;if(j=Re(t,e),j===null)throw Re(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw P(`WebGLRenderer: `+e.message),e}let ze,Be,M,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,$e,et,tt,nt,rt,it,ot,st,ct;function ut(){ze=new Jo(j),ze.init(),ot=new vl(j,ze),Be=new wo(j,ze,e,ot),M=new gl(j,ze),Be.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),ae=j.createFramebuffer(),se=j.createFramebuffer(),ue=j.createFramebuffer(),Ve=new Zo(j),He=new Xc,Ue=new _l(j,ze,M,He,Be,ot,Ve),We=new qo(A),Ge=new ho(j),st=new So(j,Ge),Ke=new Yo(j,Ge,Ve,st),qe=new $o(j,Ke,Ge,st,Ve),nt=new Qo(j,Be,Ue),$e=new To(He),Je=new Yc(A,We,ze,Be,st,$e),Ye=new Tl(A,He),Xe=new el,Ze=new sl(ze),tt=new xo(A,We,M,qe,p,s),et=new hl(A,qe,Be),ct=new El(j,Ve,Be,M),rt=new Co(j,ze,Ve),it=new Xo(j,ze,Ve),Ve.programs=Je.programs,A.capabilities=Be,A.extensions=ze,A.properties=He,A.renderLists=Xe,A.shadowMap=et,A.state=M,A.info=Ve}ut(),m!==1009&&(ne=new ts(m,t.width,t.height,o,r,i));let ft=new Sl(A,j);this.xr=ft,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let e=ze.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ze.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return Ce},this.setPixelRatio=function(e){e!==void 0&&(Ce=e,this.setSize(xe,Se,!1))},this.getSize=function(e){return e.set(xe,Se)},this.setSize=function(e,n,r=!0){if(ft.isPresenting){N(`WebGLRenderer: Can't change size while VR device is presenting.`);return}xe=e,Se=n,t.width=Math.floor(e*Ce),t.height=Math.floor(n*Ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ne!==null&&ne.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(xe*Ce,Se*Ce).floor()},this.setDrawingBufferSize=function(e,n,r){xe=e,Se=n,Ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){P(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){N(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ne.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ge)},this.getViewport=function(e){return e.copy(Ee)},this.setViewport=function(e,t,n,r){e.isVector4?Ee.set(e.x,e.y,e.z,e.w):Ee.set(e,t,n,r),M.viewport(ge.copy(Ee).multiplyScalar(Ce).round())},this.getScissor=function(e){return e.copy(De)},this.setScissor=function(e,t,n,r){e.isVector4?De.set(e.x,e.y,e.z,e.w):De.set(e,t,n,r),M.scissor(_e.copy(De).multiplyScalar(Ce).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(e){M.setScissorTest(Oe=e)},this.setOpaqueSort=function(e){we=e},this.setTransparentSort=function(e){Te=e},this.getClearColor=function(e){return e.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(pe!==null){let t=pe.texture.format;e=h.has(t)}if(e){let e=pe.texture.type,t=g.has(e),n=tt.getClearColor(),r=tt.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,j.clearBufferuiv(j.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,j.clearBufferiv(j.COLOR,0,b))}else r|=j.COLOR_BUFFER_BIT}t&&(r|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&j.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ie=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,pt,!1),t.removeEventListener(`webglcontextrestored`,ht,!1),t.removeEventListener(`webglcontextcreationerror`,gt,!1),tt.dispose(),Xe.dispose(),Ze.dispose(),He.dispose(),We.dispose(),qe.dispose(),st.dispose(),ct.dispose(),Je.dispose(),ft.dispose(),ft.removeEventListener(`sessionstart`,Ct),ft.removeEventListener(`sessionend`,wt),Tt.stop()};function pt(e){e.preventDefault(),dt(`WebGLRenderer: Context Lost.`),re=!0}function ht(){dt(`WebGLRenderer: Context Restored.`),re=!1;let e=Ve.autoReset,t=et.enabled,n=et.autoUpdate,r=et.needsUpdate,i=et.type;ut(),Ve.autoReset=e,et.enabled=t,et.autoUpdate=n,et.needsUpdate=r,et.type=i}function gt(e){P(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function _t(e){let t=e.target;t.removeEventListener(`dispose`,_t),vt(t)}function vt(e){yt(e),He.remove(e)}function yt(e){let t=He.get(e).programs;t!==void 0&&(t.forEach(function(e){Je.releaseProgram(e)}),e.isShaderMaterial&&Je.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Fe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ft(e,t,n,r,i);M.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ke.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;st.setup(i,r,s,n,c);let h,g=rt;if(c!==null&&(h=Ge.get(c),g=it,g.setIndex(h)),i.isMesh)r.wireframe===!0?(M.setLineWidth(r.wireframeLinewidth*Le()),g.setMode(j.LINES)):g.setMode(j.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),M.setLineWidth(e*Le()),i.isLineSegments?g.setMode(j.LINES):i.isLineLoop?g.setMode(j.LINE_LOOP):g.setMode(j.LINE_STRIP)}else i.isPoints?g.setMode(j.POINTS):i.isSprite&&g.setMode(j.TRIANGLES);if(i.isBatchedMesh)if(ze.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ge.get(c).bytesPerElement:1,o=He.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(j,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function bt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,jt(e,t,n),e.side=0,e.needsUpdate=!0,jt(e,t,n),e.side=2):jt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),O=Ze.get(n),O.init(t),te.push(O),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),O.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];bt(a,n,e),r.add(a)}else bt(t,n,e),r.add(t)}),O=te.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){He.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}ze.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let xt=null;function St(e){xt&&xt(e)}function Ct(){Tt.stop()}function wt(){Tt.start()}let Tt=new mo;Tt.setAnimationLoop(St),typeof self<`u`&&Tt.setContext(self),this.setAnimationLoop=function(e){xt=e,ft.setAnimationLoop(e),e===null?Tt.stop():Tt.start()},ft.addEventListener(`sessionstart`,Ct),ft.addEventListener(`sessionend`,wt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){P(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;ie!==null&&ie.renderStart(e,t);let n=ft.enabled===!0&&ft.isPresenting===!0,r=ne!==null&&(pe===null||n)&&ne.begin(A,pe);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ne===null||ne.isCompositing()===!1)&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(t),t=ft.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,pe),O=Ze.get(e,te.length),O.init(t),O.state.textureUnits=Ue.getTextureUnits(),te.push(O),Me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ke.setFromProjectionMatrix(Me,at,t.reversedDepth),je=this.localClippingEnabled,Ae=$e.init(this.clippingPlanes,je),w=Xe.get(e,k.length),w.init(),k.push(w),ft.enabled===!0&&ft.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&Et(e,t,-1/0,A.sortObjects)}Et(e,t,0,A.sortObjects),w.finish(),A.sortObjects===!0&&w.sort(we,Te,t.reversedDepth),Ie=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,Ie&&tt.addToRenderList(w,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ae===!0&&$e.beginShadows();let i=O.state.shadowsArray;if(et.render(i,e,t),Ae===!0&&$e.endShadows(),(r&&ne.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(O.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ot(n,r,e,a)}Ie&&tt.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Dt(w,e,n,n.viewport)}}else r.length>0&&Ot(n,r,e,t),Ie&&tt.render(e),Dt(w,e,t)}pe!==null&&fe===0&&(Ue.updateMultisampleRenderTarget(pe),Ue.updateRenderTargetMipmap(pe)),r&&ne.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),st.resetDefaultState(),me=-1,he=null,te.pop(),te.length>0?(O=te[te.length-1],Ue.setTextureUnits(O.state.textureUnits),Ae===!0&&$e.setGlobalState(A.clippingPlanes,O.state.camera)):O=null,k.pop(),w=k.length>0?k[k.length-1]:null,ie!==null&&ie.renderEnd()};function Et(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)O.pushLightProbeGrid(e);else if(e.isLight)O.pushLight(e),e.castShadow&&O.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ke.intersectsSprite(e)){r&&Pe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Me);let t=qe.update(e),i=e.material;i.visible&&w.push(e,t,i,n,Pe.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ke.intersectsObject(e))){let t=qe.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),Pe.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Pe.copy(e.boundingSphere.center)),Pe.applyMatrix4(e.matrixWorld).applyMatrix4(Me)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&w.push(e,t,s,n,Pe.z,o)}}else i.visible&&w.push(e,t,i,n,Pe.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Et(i[e],t,n,r)}function Dt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;O.setupLightsView(n),Ae===!0&&$e.setGlobalState(A.clippingPlanes,n),r&&M.viewport(ge.copy(r)),i.length>0&&kt(i,t,n),a.length>0&&kt(a,t,n),o.length>0&&kt(o,t,n),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Ot(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[r.id]===void 0){let e=ze.has(`EXT_color_buffer_half_float`)||ze.has(`EXT_color_buffer_float`);O.state.transmissionRenderTarget[r.id]=new fn(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Be.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}let a=O.state.transmissionRenderTarget[r.id],o=r.viewport||ge;a.setSize(o.z*A.transmissionResolutionScale,o.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(a),A.getClearColor(ye),be=A.getClearAlpha(),be<1&&A.setClearColor(16777215,.5),A.clear(),Ie&&tt.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),O.setupLightsView(r),Ae===!0&&$e.setGlobalState(A.clippingPlanes,r),kt(e,n,r),Ue.updateMultisampleRenderTarget(a),Ue.updateRenderTargetMipmap(a),ze.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,At(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ue.updateMultisampleRenderTarget(a),Ue.updateRenderTargetMipmap(a))}A.setRenderTarget(s,c,l),A.setClearColor(ye,be),d!==void 0&&(r.viewport=d),A.toneMapping=u}function kt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&At(o,t,n,s,l,c)}}function At(e,t,n,r,i,a){e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function jt(e,t,n){t.isScene!==!0&&(t=Fe);let r=He.get(e),i=O.state.lights,a=O.state.shadowsArray,o=i.state.version,s=Je.getParameters(e,i.state,a,t,n,O.state.lightProbeGridArray),c=Je.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=We.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,_t),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Nt(e,s),d}else s.uniforms=Je.getUniforms(e),ie!==null&&e.isNodeMaterial&&ie.build(e,n,s),e.onBeforeCompile(s,A),d=Je.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=$e.uniform),Nt(e,s),r.needsLights=Lt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=O.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Mt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=cc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Nt(e,t){let n=He.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Pt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];S.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(S))return n}return null}function Ft(e,t,n,r,i){t.isScene!==!0&&(t=Fe),Ue.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=pe===null?A.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Qt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=We.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=He.get(r),y=O.state.lights;if(Ae===!0&&(je===!0||e!==he)){let t=e===he&&r.id===me;$e.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==$e.numPlanes||v.numIntersection!==$e.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=O.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=jt(r,t,i),ie&&r.isNodeMaterial&&ie.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(M.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==me&&(me=r.id,C=!0),v.needsLights){let e=Pt(O.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||he!==e){M.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(j,`projectionMatrix`,e.projectionMatrix),T.setValue(j,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(j,Ne.setFromMatrixPosition(e.matrixWorld)),Be.logarithmicDepthBuffer&&T.setValue(j,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(j,`isOrthographic`,e.isOrthographicCamera===!0),he!==e&&(he=e,C=!0,w=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&T.setValue(j,`directionalShadowMap`,y.state.directionalShadowMap,Ue),y.state.spotShadowMap.length>0&&T.setValue(j,`spotShadowMap`,y.state.spotShadowMap,Ue),y.state.pointShadowMap.length>0&&T.setValue(j,`pointShadowMap`,y.state.pointShadowMap,Ue)),i.isSkinnedMesh){T.setOptional(j,i,`bindMatrix`),T.setOptional(j,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(j,`boneTexture`,e.boneTexture,Ue))}i.isBatchedMesh&&(T.setOptional(j,i,`batchingTexture`),T.setValue(j,`batchingTexture`,i._matricesTexture,Ue),T.setOptional(j,i,`batchingIdTexture`),T.setValue(j,`batchingIdTexture`,i._indirectTexture,Ue),T.setOptional(j,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(j,`batchingColorTexture`,i._colorsTexture,Ue));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&nt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(j,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=kl()),C){if(T.setValue(j,`toneMappingExposure`,A.toneMappingExposure),v.needsLights&&It(E,w),a&&r.fog===!0&&Ye.refreshFogUniforms(E,a),Ye.refreshMaterialUniforms(E,r,Ce,Se,O.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}cc.upload(j,Mt(v),E,Ue)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(cc.upload(j,Mt(v),E,Ue),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(j,`center`,i.center),T.setValue(j,`modelViewMatrix`,i.modelViewMatrix),T.setValue(j,`normalMatrix`,i.normalMatrix),T.setValue(j,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ct.update(n,x),ct.bind(n,x)}}return x}function It(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Lt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return de},this.getActiveMipmapLevel=function(){return fe},this.getRenderTarget=function(){return pe},this.setRenderTargetTextures=function(e,t,n){let r=He.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),He.get(e.texture).__webglTexture=t,He.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=He.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){pe=e,de=t,fe=n;let r=null,i=!1,a=!1;if(e){let o=He.get(e);if(o.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(j.FRAMEBUFFER,o.__webglFramebuffer),ge.copy(e.viewport),_e.copy(e.scissor),ve=e.scissorTest,M.viewport(ge),M.scissor(_e),M.setScissorTest(ve),me=-1;return}else if(o.__webglFramebuffer===void 0)Ue.setupRenderTarget(e);else if(o.__hasExternalTextures)Ue.rebindTextures(e,He.get(e.texture).__webglTexture,He.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&He.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ue.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=He.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ue.useMultisampledRTT(e)===!1?He.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ge.copy(e.viewport),_e.copy(e.scissor),ve=e.scissorTest}else ge.copy(Ee).multiplyScalar(Ce).floor(),_e.copy(De).multiplyScalar(Ce).floor(),ve=Oe;if(n!==0&&(r=ae),M.bindFramebuffer(j.FRAMEBUFFER,r)&&M.drawBuffers(e,r),M.viewport(ge),M.scissor(_e),M.setScissorTest(ve),i){let r=He.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=He.get(e.textures[t]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=He.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,t.__webglTexture,n)}me=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){P(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=He.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){M.bindFramebuffer(j.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s),!Be.textureFormatReadable(c)){P(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Be.textureTypeReadable(l)){P(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&j.readPixels(t,n,r,i,ot.convert(c),ot.convert(l),a)}finally{let e=pe===null?null:He.get(pe).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=He.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){M.bindFramebuffer(j.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s),!Be.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Be.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,d),j.bufferData(j.PIXEL_PACK_BUFFER,a.byteLength,j.STREAM_READ),j.readPixels(t,n,r,i,ot.convert(l),ot.convert(u),0);let f=pe===null?null:He.get(pe).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,f);let p=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await mt(j,p,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,d),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,a),j.deleteBuffer(d),j.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ue.setTexture2D(e,0),j.copyTexSubImage2D(j.TEXTURE_2D,n,0,0,o,s,i,a),M.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ot.convert(t.format),_=ot.convert(t.type),v;t.isData3DTexture?(Ue.setTexture3D(t,0),v=j.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ue.setTexture2DArray(t,0),v=j.TEXTURE_2D_ARRAY):(Ue.setTexture2D(t,0),v=j.TEXTURE_2D),M.activeTexture(j.TEXTURE0),M.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,t.flipY),M.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),M.pixelStorei(j.UNPACK_ALIGNMENT,t.unpackAlignment);let y=M.getParameter(j.UNPACK_ROW_LENGTH),b=M.getParameter(j.UNPACK_IMAGE_HEIGHT),x=M.getParameter(j.UNPACK_SKIP_PIXELS),S=M.getParameter(j.UNPACK_SKIP_ROWS),C=M.getParameter(j.UNPACK_SKIP_IMAGES);M.pixelStorei(j.UNPACK_ROW_LENGTH,h.width),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,h.height),M.pixelStorei(j.UNPACK_SKIP_PIXELS,l),M.pixelStorei(j.UNPACK_SKIP_ROWS,u),M.pixelStorei(j.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=He.get(e),r=He.get(t),h=He.get(n.__renderTarget),g=He.get(r.__renderTarget);M.bindFramebuffer(j.READ_FRAMEBUFFER,h.__webglFramebuffer),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,He.get(e).__webglTexture,i,d+n),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,He.get(t).__webglTexture,a,m+n)),j.blitFramebuffer(l,u,o,s,f,p,o,s,j.DEPTH_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||He.has(e)){let n=He.get(e),r=He.get(t);M.bindFramebuffer(j.READ_FRAMEBUFFER,se),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,ue);for(let e=0;e<c;e++)w?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,n.__webglTexture,i),T?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,r.__webglTexture,a),i===0?T?j.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):j.copyTexSubImage2D(v,a,f,p,l,u,o,s):j.blitFramebuffer(l,u,o,s,f,p,o,s,j.COLOR_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?j.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h);M.pixelStorei(j.UNPACK_ROW_LENGTH,y),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,b),M.pixelStorei(j.UNPACK_SKIP_PIXELS,x),M.pixelStorei(j.UNPACK_SKIP_ROWS,S),M.pixelStorei(j.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&j.generateMipmap(v),M.unbindTexture()},this.initRenderTarget=function(e){He.get(e).__webglFramebuffer===void 0&&Ue.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ue.setTextureCube(e,0):e.isData3DTexture?Ue.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ue.setTexture2DArray(e,0):Ue.setTexture2D(e,0),M.unbindTexture()},this.resetState=function(){de=0,fe=0,pe=null,M.reset(),st.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return at}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qt._getUnpackColorSpace()}},H=function(e){return e[e.Air=0]=`Air`,e[e.Road=1]=`Road`,e[e.Sidewalk=2]=`Sidewalk`,e[e.Grass=3]=`Grass`,e[e.Water=4]=`Water`,e[e.Dirt=5]=`Dirt`,e[e.WallGray=6]=`WallGray`,e[e.WallTan=7]=`WallTan`,e[e.WallBrick=8]=`WallBrick`,e[e.Window=9]=`Window`,e[e.WindowLit=10]=`WindowLit`,e[e.Glass=11]=`Glass`,e[e.Roof=12]=`Roof`,e[e.Trunk=13]=`Trunk`,e[e.Leaves=14]=`Leaves`,e[e.Red=15]=`Red`,e[e.White=16]=`White`,e[e.NeonPink=17]=`NeonPink`,e[e.NeonCyan=18]=`NeonCyan`,e[e.Sand=19]=`Sand`,e[e.Plaza=20]=`Plaza`,e[e.RoadLine=21]=`RoadLine`,e[e.Yellow=22]=`Yellow`,e[e.Flower=23]=`Flower`,e[e.Sakura=24]=`Sakura`,e[e.SakuraTrunk=25]=`SakuraTrunk`,e[e.Wood=26]=`Wood`,e[e.TempleRoof=27]=`TempleRoof`,e[e.Gold=28]=`Gold`,e[e.BridgeDeck=29]=`BridgeDeck`,e[e.Lantern=30]=`Lantern`,e[e.Puddle=31]=`Puddle`,e[e.LightRed=32]=`LightRed`,e[e.LightAmber=33]=`LightAmber`,e[e.LightGreen=34]=`LightGreen`,e[e.Pole=35]=`Pole`,e[e.Stone=36]=`Stone`,e[e.Snow=37]=`Snow`,e[e.Deck=38]=`Deck`,e[e.Crate=39]=`Crate`,e[e.CrateB=40]=`CrateB`,e[e.Steel=41]=`Steel`,e[e.RoofTile=42]=`RoofTile`,e[e.RoofTileB=43]=`RoofTileB`,e[e.BlockWall=44]=`BlockWall`,e[e.Tarmac=45]=`Tarmac`,e}({}),U=[];U[1]=9080222,U[2]=15001068,U[3]=11133090,U[4]=10409714,U[5]=13478536,U[6]=16316924,U[7]=16578022,U[8]=16179927,U[9]=13952754,U[10]=16773318,U[11]=15004411,U[12]=15132912,U[13]=12292208,U[14]=10148237,U[15]=15696760,U[16]=16777215,U[17]=16167381,U[18]=11136230,U[19]=16182478,U[20]=15659254,U[21]=16448253,U[22]=16310178,U[23]=16301272,U[24]=16237789,U[25]=10255736,U[26]=14203026,U[27]=14256754,U[28]=15978362,U[29]=14715514,U[30]=16767400,U[32]=16734802,U[33]=16761935,U[34]=6088314,U[35]=5988464,U[36]=10133675,U[37]=16449023,U[38]=12888194,U[39]=14715498,U[40]=7317712,U[41]=11975880,U[31]=8832488,U[42]=9346226,U[43]=12622470,U[44]=14473423,U[45]=13221806;function jl(e){return e!==0&&e!==4&&e!==31}var Ml=new Set([6,7,8,9,10,12,13,14,24,25,26,27,15,16,22,42,43]);function Nl(e){return Ml.has(e)}function Pl(e,t){let n=Math.imul(e|0,374761393)+Math.imul(t|0,668265263);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}function Fl(e,t,n){let r=Math.imul(e|0,374761393)+Math.imul(t|0,668265263)+Math.imul(n|0,2246822519);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function Il(e){return e*e*(3-2*e)}function Ll(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=Pl(n,r),s=Pl(n+1,r),c=Pl(n,r+1),l=Pl(n+1,r+1),u=Il(i),d=Il(a);return o+(s-o)*u+(c-o)*d+(o-s-c+l)*u*d}function Rl(e,t,n=3){let r=0,i=.5,a=1,o=0;for(let s=0;s<n;s++)r+=Ll(e*a,t*a)*i,o+=i,i*=.5,a*=2.07;return r/o}var zl=-230,Bl=190,Vl=205,Hl=34,Ul=54;function W(e,t){return(e%t+t)%t}var Wl=[{x:255,z:55,name:`EAST WARD`},{x:-155,z:150,name:`SOUTH WARD`},{x:65,z:-110,name:`RIVERSIDE`},{x:-30,z:-250,name:`NORTH GATE`},{x:-200,z:-30,name:`WEST RIDGE`}],Gl={x:0,z:0},Kl={x:520,z:-560},ql=820;function Jl(e,t){let n=Math.hypot(e-Kl.x,t-Kl.z);return Math.max(0,Math.min(1,1-n/ql))**1.6}function Yl(e,t,n){for(let r=1;r<=62;r++){let i=r/62,a=Math.max(2,Math.round(13*(1-i*i))),o=Math.abs(e),s=Math.abs(t);if(o<=a&&s<=a){let i=o===a||s===a,c=o===a&&s===a,l=r>=24&&r<=30?H.White:H.Red;i&&(c||r%3==0||W(e+t+r,4)===0)&&n(r,l),r>=24&&r<=27&&o<=a&&s<=a&&n(r,H.White),r>=45&&r<=47&&o<=a&&s<=a&&n(r,H.Red)}}if(e===0&&t===0)for(let e=62;e<=74;e++)n(e,e%2==0?H.Red:H.White)}function Xl(e,t,n){let r=Math.sqrt(e*e+t*t);for(let i=1;i<=78;i++){let a=7.2*(1-i/78)+2.2;Math.abs(r-a)<.75&&(i%2==0||W(e*3+t*5+i,3)!==0)&&n(i,Fl(e,i,t)<.25?H.Glass:H.White),i>=34&&i<=37&&r<=a+2&&n(i,H.White),i>=62&&i<=64&&r<=a+1.5&&n(i,H.NeonCyan)}if(e===0&&t===0)for(let e=78;e<=92;e++)n(e,H.White)}function Zl(e,t,n){for(let r=-1;r<=1;r++){let i=r*10;if(t===0&&(e===i-3||e===i+3))for(let e=1;e<=7;e++)n(e,H.Red);t===0&&e>=i-4&&e<=i+4&&n(8,H.Red),t===0&&e>=i-5&&e<=i+5&&n(9,H.Red)}}function Ql(e,t,n){let r=Math.abs(e),i=Math.abs(t);r<=9&&i<=9&&n(1,H.Sidewalk),r<=8&&i<=8&&n(2,H.Wood);let a=3;for(let e=0;e<5;e++){let t=5-e*.6,o=t+1.6;for(let e=0;e<3;e++)if(r<=t&&i<=t){let o=r>=t-1||i>=t-1;n(a+e,o?H.Red:H.White)}a+=3,r<=o&&i<=o&&n(a,H.TempleRoof),r<=o&&i<=o&&(r>=o-1||i>=o-1)&&n(a+1,H.TempleRoof),a+=1}if(e===0&&t===0)for(let e=0;e<6;e++)n(a+e,H.Gold)}function $l(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(r<=11&&i<=11&&n(1,H.Sidewalk),r<=9&&i<=9&&n(2,H.Sidewalk),t>=8&&t<=9){if(e===-3||e===3)for(let e=3;e<=8;e++)n(e,H.Red);r<=4&&n(9,H.Red),r<=5&&n(10,H.Red)}if(r<=6&&i<=5)for(let a=3;a<=7;a++){let o=(r===6||i===5)&&W(e+t,3)===0;n(a,o?H.Red:H.Wood)}if(r<=8&&i<=7&&n(8,H.TempleRoof),r<=7&&i<=6&&n(9,H.TempleRoof),r<=5&&i<=4&&n(10,H.TempleRoof),i<=1&&r<=4&&n(11,H.Gold),(e===-7||e===7)&&t===6){for(let e=3;e<=4;e++)n(e,H.Sidewalk);n(5,H.Lantern),n(6,H.Sidewalk)}}function eu(e,t,n){let r=Math.abs(e),i=Math.abs(t);for(let e=1;e<=6;e++){let t=13-e;r<=t&&i<=t&&n(e,H.Sidewalk)}let a=7;for(let e=0;e<3;e++){let t=8-e*2;for(let e=0;e<4;e++)if(r<=t&&i<=t){let o=r>=t-1||i>=t-1;n(a+e,o?H.White:H.WallGray)}a+=4;let o=t+1.5;r<=o&&i<=o&&n(a,H.TempleRoof),a+=1}r<=1&&i<=1&&(n(a,H.Gold),n(a+1,H.Gold))}function tu(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(i<=4&&(n(10,H.BridgeDeck),n(15,H.BridgeDeck),i===4)){n(11,H.White),n(16,H.White);let t=W(Math.floor((e+90)/5),3);n(17,t===0?H.NeonPink:t===1?H.NeonCyan:H.Lantern)}if(r===11&&i<=4)for(let e=1;e<=30;e++)n(e,H.White);if(r===11&&i<=4&&(i===4||i===0)&&n(30,H.White),r===11&&i<=4&&(n(21,H.White),n(28,H.White)),i===4&&r<=11){let e=r/11;n(Math.round(30-12*(1-e*e)),H.Steel)}if(i===4&&r<11&&W(e,3)===0){let e=r/11,t=Math.round(30-12*(1-e*e));for(let e=17;e<t;e++)n(e,H.Steel)}if(i<=3&&W(e,9)===0)for(let e=1;e<10;e++)n(e,H.WallGray)}function nu(e,t,n){let r=Math.abs(e),i=Math.abs(t),a=Ul;for(let e=0;e<=a;e++)r<=12&&i<=12&&n(e,e===a?H.Sidewalk:H.Stone);if(r<=2&&t>6)for(let e=0;e<=a;e++)n(e,H.Stone);if(t===7&&(e===-3||e===3))for(let e=1;e<=5;e++)n(a+e,H.Red);t===7&&r<=4&&n(60,H.Red);let o=55;for(let e=0;e<3;e++){let t=4.5-e*.8;for(let e=0;e<3;e++)r<=t&&i<=t&&n(o+e,r>=t-1||i>=t-1?H.Red:H.White);o+=3;let a=t+1.5;r<=a&&i<=a&&n(o,H.TempleRoof),o+=1}if(e===0&&t===0)for(let e=0;e<5;e++)n(o+e,H.Gold);(e===-8||e===8)&&i<=1&&(n(55,H.Stone),n(56,H.Lantern))}function ru(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(r<=11&&i<=11){let a=i<=9&&W(e,2)===0&&r>5||r<=9&&W(t,2)===0&&i>5,o=Math.abs(r-i)<=1&&W(e+t,2)===0;n(0,a||o?H.RoadLine:H.Road);return}if(r>12&&i>12){let r=W(e+100,11),i=W(t+100,11);if(r<9&&i<9){let a=20+Math.abs(e*7+t*3)%5*6,o=r===0||i===0||r===8||i===8;for(let e=1;e<=a;e++){if(!o){n(e,H.WallGray);continue}if(e<14){let t=Math.floor(e/4);n(e,t%3==0?H.NeonPink:t%3==1?H.NeonCyan:H.WindowLit)}else n(e,e%4==1?H.WallGray:H.Window)}n(a+1,H.Roof),r===4&&i===4&&(n(a+2,H.NeonPink),n(a+3,H.NeonPink))}}let a=e+15,o=t-15,s=Math.sqrt(a*a+o*o);if(s>6&&s<8.5){for(let e=1;e<=26;e++)n(e,e%5==0?H.White:H.Glass);n(27,H.White)}}function iu(e,t,n){let r=Math.abs(e);if(t>=15&&t<=17){if(r===6)for(let e=1;e<=11;e++)n(e,H.Red);if(r<=7&&(n(12,H.Red),n(13,H.TempleRoof)),r<=8&&n(14,H.TempleRoof),r<=2&&t===16)for(let e=5;e<=9;e++)n(e,r<=1?H.Red:H.Lantern)}if(t>-2&&t<15&&r<=5){if(n(0,H.Sidewalk),r===5){for(let e=1;e<=4;e++)n(e,H.Wood);n(5,H.TempleRoof)}r===4&&W(t,3)===0&&n(4,H.Lantern)}if(r<=10&&t>=-12&&t<=-3){n(1,H.Sidewalk),n(2,H.Wood);let e=r===10||t===-12||t===-3;for(let t=3;t<=9;t++)n(t,e?H.Red:H.White);n(10,H.TempleRoof),r<=9&&t>=-11&&t<=-4&&n(11,H.TempleRoof),r<=6&&t>=-9&&t<=-6&&n(12,H.TempleRoof),r<=1&&t>=-9&&t<=-6&&n(13,H.Gold)}let i=e+14,a=t+4,o=Math.abs(i),s=Math.abs(a);if(o<=6&&s<=6){let e=1;for(let t=0;t<5;t++){let r=3.4-t*.4;for(let t=0;t<3;t++)o<=r&&s<=r&&n(e+t,o>=r-1||s>=r-1?H.Red:H.White);e+=3;let i=r+1.6;o<=i&&s<=i&&n(e,H.TempleRoof),e+=1}if(o===0&&s===0)for(let t=0;t<5;t++)n(e+t,H.Gold)}}function au(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(r<=20&&i<=6){let t=i===6||r===20;for(let r=1;r<=9;r++)n(r,r===4||r===8?H.White:t&&W(e+r,3)===0?H.Window:H.WallBrick);n(10,H.Roof)}for(let r of[-14,0,14]){let i=e-r,a=Math.sqrt(i*i+t*t),o=r===0?7:5.5;if(a<=o){let e=Math.round(Math.sqrt(Math.max(0,o*o-a*a)));for(let t=10;t<=10+e;t++)n(t,t===10+e?H.Roof:H.WallBrick);a<1&&n(11+e,H.Gold)}}}function ou(e,t,n){let r=Math.abs(e),i=Math.abs(t),a=Math.sqrt(e*e+t*t);if(a<=13){let o=a>11.4,s=r<=1&&i<=9||i<=1&&r<=9,c=Math.abs(a-7.5)<.7;n(0,o||s||c?H.RoadLine:H.Plaza),o&&W(Math.round(Math.atan2(t,e)*8),3)===0&&n(1,H.Lantern);return}if(t<-14&&t>-30&&r<=15){let i=r===15||t===-29,a=t===-15&&r<=9;if(!a){for(let e=1;e<=13;e++)i?n(e,e%5==0?H.Steel:H.WallGray):t===-15&&n(e,e>10?H.Steel:H.Air);r<=15&&n(14,H.Roof),r<=15&&W(e,4)===0&&n(15,H.Steel)}a&&W(e,4)===0&&n(12,H.Lantern)}let o=e-20,s=t+6;if(Math.abs(o)<=3&&Math.abs(s)<=3){for(let e=1;e<=18;e++)n(e,H.WallGray);for(let e=19;e<=22;e++)n(e,H.Glass);n(23,H.Roof),o===0&&s===0&&(n(24,H.Pole),n(25,H.LightRed))}if(e<-16&&e>-26&&i<10&&W(e,3)===0&&W(t,4)===0){for(let e=1;e<=3;e++)n(e,H.Crate);n(4,H.Steel)}}function su(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(r<=13&&i<=13&&(r>9||i>9)){let e=13-Math.max(r,i);for(let t=1;t<=Math.max(1,e);t++)n(t,H.Stone);return}if(r<=9&&i<=9){for(let e=1;e<=7;e++)n(e,r===9||i===9?H.WallGray:H.Plaza);n(8,H.Steel),r<=7&&i<=7&&n(9,H.Steel),(r<=1&&i<=5||i<=1&&r<=5)&&n(10,H.Grass),i===9&&r<=2&&(n(1,H.Lantern),n(2,H.Lantern)),r===9&&W(t,4)===0&&n(6,H.WindowLit)}}function cu(e,t,n){let r=Math.abs(e),i=Math.abs(t);if(r<=13&&i<=9){let e=r===13||i===9;for(let t=1;t<=12;t++)n(t,e?t%3==0?H.Stone:H.Window:H.WallGray);n(13,H.Roof)}for(let r of[-8,8]){let a=Math.abs(e-r);if(a<=5&&i<=5){for(let r=13;r<=54;r++){let o=a===5||i===5,s=(Math.floor(r/3)+Math.floor((e+t)/3))%2==0;n(r,o?s?H.Stone:H.Window:H.WallGray)}n(55,H.Roof),a<=1&&i<=1&&(n(56,H.Pole),n(57,H.Pole),n(58,H.LightRed))}}if(r<=8&&i<=2)for(let e=40;e<=42;e++)n(e,e===41?H.Glass:H.White)}function lu(e,t,n){if(Math.abs(t)>2)return;let r=Math.hypot(e,0);for(let r=1;r<=46;r++){let i=r-26,a=Math.hypot(e,i);if(Math.abs(a-20)<.7){let a=Math.atan2(i,e)+Math.PI,o=Math.PI/8,s=a-Math.round(a/o)*o;n(r,t===0&&Math.abs(s)<.09?H.NeonPink:H.White)}else(a<20&&t===0&&Math.abs(Math.abs(e)-Math.abs(i))<.6||a<2&&t===0)&&n(r,H.Steel)}if(t===0)for(let t=1;t<26;t++){let r=Math.round((26-t)*.45);Math.abs(Math.abs(e)-r)<.6&&n(t,H.Steel)}r<=10&&Math.abs(t)<=2&&n(0,H.Plaza)}function uu(e,t,n){let r=Math.hypot(e/20,t/16);if(r>1.08)return;if(r<.72){n(0,H.Grass);return}if(r<.78){n(0,H.Tarmac);return}let i=(r-.78)/.3,a=2+Math.round(i*14);for(let e=1;e<=a;e++)n(e,e%3==0?H.Stone:H.WallGray);if(r>.9){let i=W(e+t,3)!==0;n(a+3,i?H.Wood:H.Air),r>1&&n(a+4,H.Wood)}}function du(e,t,n){let r=Math.abs(e),i=Math.abs(t),a=Math.hypot(e,t);if(r<=3&&i<=3)for(let e=1;e<=24;e++)n(e,r===3||i===3?H.Steel:H.WallGray);for(let e=23;e<=41;e++){let t=Math.sqrt(Math.max(0,81-(e-32)*(e-32)));Math.abs(a-t)<.75&&n(e,e===32||e===36||e===28?H.Steel:H.Glass)}a<=12&&n(0,H.Plaza)}function fu(e,t,n){if(Math.abs(t)>4)return;let r=Math.abs(t);if(W(e,8)===0&&r<=3)for(let e=1;e<=10;e++)n(e,H.Stone);r<=4&&n(11,H.Stone),r===4&&(n(12,H.Steel),n(13,H.Steel)),(r===1||r===2)&&n(12,H.Steel),r===3&&W(e,6)===0&&(n(13,H.Pole),n(14,H.Pole),n(15,H.LightAmber))}var pu=[{x:55,z:-45,r:17,build:Yl},{x:-70,z:-100,r:15,build:Xl},{x:6,z:58,r:16,build:Zl,ground:(e,t)=>Math.abs(t)<=1?H.Sand:H.Grass},{x:-40,z:70,r:13,build:Ql},{x:96,z:74,r:14,build:$l},{x:-128,z:24,r:16,build:eu},{x:120,z:-166,r:14,build:tu},{x:-152,z:-128,r:13,build:Ql},{x:150,z:40,r:14,build:$l},{x:-352,z:-46,r:15,build:nu},{x:-96,z:-34,r:24,build:ru,ground:()=>H.Road},{x:132,z:118,r:22,build:iu,ground:()=>H.Plaza},{x:-14,z:-118,r:23,build:au},{x:-190,z:196,r:26,build:tu,ground:()=>H.Water},{x:-226,z:-78,r:20,build:cu},{x:214,z:148,r:26,build:lu,ground:()=>H.Plaza},{x:62,z:214,r:24,build:uu,ground:()=>H.Plaza},{x:188,z:-108,r:16,build:du,ground:()=>H.Plaza},{x:-108,z:132,r:24,build:fu},{x:244,z:-30,r:17,build:Yl},{x:-272,z:118,r:15,build:eu},{x:168,z:210,r:16,build:Xl},{x:0,z:0,r:30,build:ou},...Wl.map(e=>({x:e.x,z:e.z,r:15,build:su}))];function mu(e,t){if(e>zl)return 0;let n=Math.min(1,(zl-e)/Bl),r=Rl(e*.0075+5.5,t*.0075-3.2,4),i=Rl(e*.03-12.1,t*.03+8.4,2)*.18,a=(10+r*70+i*40)*n*n;return Math.round(a)}function hu(e,t){if(t<Vl)return 0;let n=Rl(e*.013-21.7,t*.013+44.3,3);return n<.66?0:Math.round((n-.66)*46)}function gu(e,t){let n=mu(e,t);return n<5||n>48?!1:Pl(e*5+61,t*5-17)<.014}function _u(e){return-170+Math.round(28*Math.sin(e*.011)+14*Math.sin(e*.027))}function vu(e,t){for(let n of pu)if(Math.abs(e-n.x)<=n.r&&Math.abs(t-n.z)<=n.r)return{kind:6,lm:n};if(mu(e,t)>0)return{kind:7};if(t>=Vl)return hu(e,t)>0?{kind:9}:{kind:8};if(t>=Vl-Hl)return{kind:10};let n=Math.abs(t-_u(e));if(n<9)return{kind:4};if(n<12)return{kind:5};let r=W(e,26),i=W(t,26);if(r<5||i<5)return{kind:0};if(r===5||i===5||r===25||i===25)return{kind:1};let a=Math.floor(e/26),o=Math.floor(t/26);return Rl(e*.005+31.7,t*.005-12.3,3)<.34&&bu(a*26+26/2,o*26+26/2)!==4?{kind:2,lotX:a,lotZ:o}:{kind:3,lotX:a,lotZ:o}}function yu(e,t){let n=Math.round(e/860),r=Math.round(t/860);if(n===0&&r===0)return 0;let i=(Pl(n*13+1,r*7-5)-.5)*860*.45,a=(Pl(n*17-3,r*11+9)-.5)*860*.45,o=Math.hypot(e-(n*860+i),t-(r*860+a));return Math.max(0,1-o/230)}function bu(e,t){let n=Math.hypot(e,t),r=Rl(e*.005+31.7,t*.005-12.3,3),i=Rl(e*.0031-88.1,t*.0031+51.4,3),a=yu(e,t);if(n>210&&i>.7&&a<.3)return 4;if(r>.545+Math.max(0,(n-240)/900)-a*.62)return 0;let o=n>165&&a<.4;return r>.47-a*.2?i<.46?o?5:2:1:o&&i>.44?5:3}function xu(e,t){let n=Pl(e*3+7,t*5-3),r=Pl(e-91,t+44),i=bu(e*26+26/2,t*26+26/2),a,o=!1;switch(i){case 0:a=26+Math.floor(n*30),o=r<.3;break;case 1:a=10+Math.floor(n*16),o=r<.12;break;case 2:a=8+Math.floor(n*6);break;case 4:a=5+Math.floor(n*5);break;default:a=4+Math.floor(n*7)}let s=[H.WallGray,H.WallGray,H.White,H.WallTan,H.WallGray,H.WallBrick],c=o?H.Window:s[Math.floor(r*6)%6];i===2&&(c=r<.5?H.WallTan:H.WallBrick),i===4&&(c=r<.6?H.Steel:H.WallGray);let l=i===4?0:Math.floor(Pl(e+17,t-61)*3),u=0;(i===0||i===1)&&r>.2&&(u=n>.5?H.NeonPink:H.NeonCyan);let d=[H.Red,H.Yellow,H.NeonCyan,H.NeonPink][Math.floor(Pl(e-7,t+13)*4)%4],f=Pl(e*5-23,t*3+61),p;p=i===0?f<.34?1:f<.58?4:f<.78?0:2:i===1?f<.3?3:f<.55?2:f<.8?0:1:i===3&&f<.52?3:0;let m=p===2?3+Math.floor(Pl(e+3,t-8)*3):0;return{zone:i,height:a,wall:c,glassy:o,inset:l,neon:u,awning:d,form:p,pinch:m}}function Su(e,t){let n=W(e,26),r=W(t,26);return n!==5&&r!==5?!1:W(e*2+t,13)===0}function Cu(e,t){let n=vu(e,t);return n.kind===2?Pl(e+1e3,t-2e3)<.035:n.kind===1?Pl(e+1e3,t-2e3)<.012:n.kind===6&&n.lm===pu[2]&&Math.abs(t-n.lm.z)>2&&Pl(e+1e3,t-2e3)<.03}function wu(e,t){return 4+Math.floor(Pl(e-555,t+777)*3)}function Tu(e,t){return Pl(e+313,t-131)<.4}function Eu(e,t){let n=new Uint8Array(1024*96),r=(e,t,r,i)=>{t>=0&&t<96&&(n[(t*32+r)*32+e]=i)};for(let i=0;i<32;i++)for(let a=0;a<32;a++){let o=e*32+a,s=t*32+i,c=vu(o,s),l=(e,t)=>r(a,e,i,t),u=W(o,26)<5||W(s,26)<5;if((c.kind===4||c.kind===5)&&u){if(c.kind===4?l(0,H.Water):l(0,H.Sand),c.kind===4&&W(o,4)===0&&W(s,4)===0)for(let e=1;e<3;e++)l(e,H.BridgeDeck);l(3,H.BridgeDeck);let e=W(o,26),t=W(s,26);(e<5?e===0||e===4:t===0||t===4)&&(l(4,H.BridgeDeck),l(5,H.Red));continue}switch(c.kind){case 4:l(0,H.Water);break;case 7:{let e=mu(o,s);for(let t=0;t<=e;t++){let n=H.Stone;if(t===e){let t=Rl(o*.02+3.3,s*.02-7.7,2)*10;n=e+t>62?H.Snow:e+t<26?H.Grass:H.Stone}l(t,n)}for(let e=s-2;e<=s+2;e++)for(let t=o-2;t<=o+2;t++){if(!gu(t,e))continue;let n=mu(t,e),r=5+Math.floor(Pl(t-9,e+4)*5),i=Math.abs(o-t),a=Math.abs(s-e),c=Math.max(i,a);if(c===0)for(let e=1;e<=r;e++)l(n+e,H.Trunk);for(let e=0;e<6;e++)c<=(e<2?2:+(e<4))&&l(n+r-2+e,H.Leaves)}break}case 8:l(0,H.Water);break;case 9:{let e=hu(o,s);for(let t=0;t<=e;t++)l(t,t===e&&e>3?H.Grass:H.Sand);if(e>5&&Pl(o*3-77,s*3+22)<.09){for(let t=1;t<=4;t++)l(e+t,H.Trunk);for(let t=0;t<3;t++)l(e+5+t,H.Leaves)}break}case 10:{let e=Vl-s,t=W(o,42),n=t<9;if(e<=4&&n){if(l(0,H.Water),W(o,3)===0&&W(s,3)===0)for(let e=1;e<=3;e++)l(e,H.Trunk);l(4,H.Deck)}else if(e<=4)l(0,H.Water);else{l(0,H.Plaza);let r=Math.floor(o/6),i=Math.floor(s/6);if(W(o,6)<5&&W(s,6)<4&&Pl(r+3,i-8)<.3){let e=1+Math.floor(Pl(r-2,i+5)*3);for(let t=1;t<=e*2;t++)l(t,Pl(r,i+Math.floor((t-1)/2))<.5?H.Crate:H.CrateB)}if(n&&e>=6&&e<=8){if(t===0||t===8)for(let e=1;e<=18;e++)l(e,H.Steel);e===7&&l(19,H.Steel)}if(e>14){let e=Math.floor(o/22),t=Math.floor(s/14);if(W(o,22)<18&&W(s,14)<10&&Pl(e+11,t-4)<.55){let e=W(o,22)===0||W(o,22)===17||W(s,14)===0||W(s,14)===9;for(let t=1;t<=7;t++)l(t,e?H.WallGray:H.WallTan);l(8,H.Roof)}}}break}case 5:l(0,H.Sand);break;case 0:{let e=W(o,26),t=W(s,26),n=e<5,r=t<5,i=H.Road;n&&!r?(e===2&&W(s,6)<3&&(i=H.RoadLine),(t>=6&&t<=7||t>=24)&&(i=W(o,2)===0?H.RoadLine:H.Road)):r&&!n&&(t===2&&W(o,6)<3&&(i=H.RoadLine),(e>=6&&e<=7||e>=24)&&(i=W(s,2)===0?H.RoadLine:H.Road)),l(0,i);break}case 1:{l(0,H.Sidewalk);let e=W(o,26),t=W(s,26);if(bu(Math.floor(o/26)*26+26/2,Math.floor(s/26)*26+26/2)===5){if(Su(o,s)){for(let e=1;e<=8;e++)l(e,H.BlockWall);l(9,H.Steel),Pl(o+3,s-3)<.4&&l(7,H.Steel),l(10,H.Lantern)}else for(let e=-1;e<=1;e+=2)(Su(o+e,s)||Su(o,s+e))&&l(9,H.Steel);break}let n=e===5||t===5,r=t===5?W(o,22)===4:W(s,22)===4;if(n&&r&&!Cu(o,s)){for(let e=1;e<=5;e++)l(e,H.Pole);l(6,H.Roof),l(7,H.Lantern)}let i=e===5&&t===5;if(i)for(let e=1;e<=5;e++)l(e,H.Pole);if(!n&&!i&&!Cu(o,s)){let e=Pl(o*7-19,s*7+23);e<.02?(l(1,e<.01?H.Red:H.NeonCyan),l(2,H.WindowLit)):e<.032?l(1,H.Wood):e<.038?(l(1,H.Pole),l(2,H.Lantern)):e>.995&&(l(1,H.Pole),l(2,H.Pole),l(3,H.NeonCyan))}break}case 6:{let e=c.lm,t=o-e.x,n=s-e.z;l(0,e.ground?e.ground(t,n):H.Plaza),e.build(t,n,l);break}case 2:{let e=Pl(c.lotX+5,c.lotZ-5)<.5,t=W(o,26),n=W(s,26);if(bu(c.lotX*26+26/2,c.lotZ*26+26/2)===5&&Pl(c.lotX-21,c.lotZ+33)<.55){if(!(t>=6&&t<=24&&n>=6&&n<=24)){l(0,H.Sidewalk);break}if(l(0,H.Tarmac),(t===6||n===6||t===24||n===24)&&!(t===13||n===13)){l(1,H.BlockWall);break}if(n===9&&t>=8&&t<=13){if(t===8||t===13)for(let e=1;e<=4;e++)l(e,H.Steel);l(4,H.Steel),(t===10||t===12)&&l(2,H.Wood)}if(n===14&&t>=9&&t<=14){let e=t-9,n=e<=2?1+e:Math.max(1,5-(e-2));for(let e=1;e<=n;e++)l(e,t<=11?H.Steel:H.Yellow)}if(t>=17&&t<=21&&n>=16&&n<=20){let e=t===17||t===21||n===16||n===20;if(e&&W(t+n,2)===0)for(let e=1;e<=4;e++)l(e,H.Steel);e&&l(4,H.Steel)}t>=8&&t<=12&&n>=18&&n<=21&&l(0,H.Sand),n===20&&t===15&&l(1,H.Wood),n===19&&t===15&&(l(1,H.Steel),l(2,H.NeonCyan));break}let r=e&&(t===13||n===13);if(l(0,r?H.Sand:H.Grass),!r){let e=Pl(o+9,s+9);e<.05&&l(1,e<.025?H.Flower:H.Yellow)}break}case 3:{let e=xu(c.lotX,c.lotZ),t=W(o,26),n=W(s,26),r=6+e.inset+e.pinch,i=24-e.inset-e.pinch;if((e.zone===5||e.zone===3||e.zone===2)&&Pl(c.lotX*17-5,c.lotZ*23+11)<.052){let e=t-6,r=n-6;if(e<0||r<0||e>18||r>18){l(0,H.Sidewalk);break}if(l(0,H.Tarmac),(e===0||r===0||e===18||r===18)&&!(r===0&&e>=8&&e<=10)){l(1,H.BlockWall),W(e+r,3)!==0&&l(2,H.Pole);break}if(r>=2&&r<=6&&e>=1&&e<=17){let t=r===2||r===6||e===1||e===17;for(let e=1;e<=12;e++){let n=W(e-1,3);l(e,t&&n===1?Fl(o,e,s)<.4?H.WindowLit:H.Window:H.WallGray)}l(13,H.Roof),t&&l(14,H.Roof),r===2&&e===9&&l(11,H.Gold);break}if(r>=13&&r<=17&&e>=1&&e<=7){let t=r===13||r===17||e===1||e===7;for(let n=1;n<=6;n++)l(n,t?n===3&&W(e+r,2)===0?H.Window:H.WallTan:H.Air);let n=Math.max(0,2-Math.abs(r-15));for(let e=7;e<=7+n;e++)l(e,H.RoofTile);break}if(r>=13&&r<=16&&e>=10&&e<=16){l(0,r===13||r===16||e===10||e===16?H.Plaza:H.Water);break}if(r===11&&e>=9&&e<=15){for(let t=1;t<=5;t++)W(e+t,2)===0&&l(t,H.Steel);l(6,H.Steel);break}break}if(e.zone===5){if(!(t>=6&&t<=24&&n>=6&&n<=24)){l(0,H.Sidewalk);break}let e=t-6,r=n-6,i=e<9?0:1,a=r<9?0:1,u=e-i*9,d=r-a*9,f=Pl(c.lotX*7+i*131,c.lotZ*11+a*197);l(0,H.Plaza);let p=u===0||d===0||u===8||d===8;if(p&&!(u===4&&d===0)&&(l(1,H.BlockWall),f<.4&&l(2,H.BlockWall)),f>.84){if(!p){l(0,f>.93?H.Plaza:H.Grass);let e=Pl(o*3+5,s*3-8);f<=.93&&e<.1&&l(1,e<.05?H.Flower:H.Leaves)}break}if(!(u>=2&&u<=6&&d>=2&&d<=6))break;let m=1+(f<.22?3:2)*3,h=f<.5?H.WallGray:H.WallTan;for(let e=1;e<m;e++){let t=(e-1)%3==1&&W(u+d,2)===0;l(e,t?Fl(o,e,s)<.35?H.WindowLit:H.Window:h)}let g=f<.62?H.RoofTile:H.RoofTileB,_=f<.5?d-2:u-2,v=Math.max(0,Math.round(2-Math.abs(_-2)));for(let e=m;e<=m+v;e++)l(e,g);v===0&&l(m,g);break}if(e.zone===4){let a=Pl(c.lotX+29,c.lotZ-13)<.45;if(l(0,H.Plaza),a){if(t>=r+1&&t<=i-1&&n>=r+1&&n<=i-1&&W(t,4)<3&&W(n,6)<4){let e=1+Math.floor(Pl(o*2+3,s*2-7)*3);for(let t=1;t<=e;t++)l(t,Fl(o,t,s)<.5?H.Crate:H.CrateB)}if(n===r+1&&W(t,5)===0)for(let e=1;e<=9;e++)l(e,H.Steel);n===r+1&&t>=r&&t<=i&&l(10,H.Steel)}else{let a=t===r||t===i||n===r||n===i;if(t>=r&&t<=i&&n>=r&&n<=i){for(let r=1;r<e.height;r++)a&&l(r,r===2&&W(t+n,7)===0?H.Window:e.wall);if(l(e.height,H.Roof),Math.abs(t-(r+i)/2)<1.5&&l(e.height+1,H.Roof),Pl(c.lotX-41,c.lotZ+7)<.3&&Math.abs(t-(r+3))<1&&Math.abs(n-(r+3))<1){for(let t=1;t<=10;t++)l(e.height+t,H.WallGray);l(e.height+11,H.Red)}}}break}if(t>=r&&t<=i&&n>=r&&n<=i){l(0,H.Plaza);let a=t>=r+2&&t<=i-2&&n>=r+2&&n<=i-2,u=t>=r+4&&t<=i-4&&n>=r+4&&n<=i-4,d=e.height;if(e.form===1&&e.height>=22){let t=Math.floor(e.height*.55),n=Math.floor(e.height*.8);d=u?e.height:a?n:t}else e.form===4&&e.height>=26?d=Math.floor(u?e.height*1.22:e.height*.78):e.form===2&&(d=e.height);let f=Math.floor(e.height*.55),p=Math.floor(e.height*.8);for(let a=1;a<d;a++){let c=0;e.form===1&&e.height>=22?c=a>p?4:a>f?2:0:e.form===4&&e.height>=26&&(c=a>Math.floor(e.height*.78)?4:0);let u=c===4?t===r+4||t===i-4||n===r+4||n===i-4:c===2?t===r+2||t===i-2||n===r+2||n===i-2:t===r||t===i||n===r||n===i,d=e.wall;if(u){d=e.glassy?a%5==1||W(t+n,5)===0?H.WallGray:Fl(o,a,s)<.22?H.WindowLit:H.Window:a%4!=1&&W(t+n,3)!==0?Fl(o,a,s)<.3?H.WindowLit:H.Window:e.wall,e.height<14&&a===2&&(d=e.awning);let c=t===r||t===i,l=n===r||n===i;c&&l&&(d=e.wall),a===1&&(d=W(t+n,7)===3?H.WallGray:Pl(o,s)<.45?H.WindowLit:H.Glass),(e.zone===2||e.zone===3)&&a>2&&W(a,3)===0&&!(c&&l)&&(d=H.Stone),e.form===3&&c&&l&&t===r&&n===r&&a>2&&a<e.height-1&&(d=W(a,6)<3?H.NeonPink:H.NeonCyan)}l(a,d)}if(l(d,(t===r||t===i||n===r||n===i)&&e.neon?e.neon:H.Roof),d===e.height){let a=Fl(o,e.height,s),u=Math.abs(t-(r+i)/2),d=Math.abs(n-(r+i)/2),f=u<=2.5&&d<=2.5;if(e.height>=34&&Pl(c.lotX+5,c.lotZ-9)<.3&&u<=4&&d<=4){let t=u>=3.5||d>=3.5;l(e.height,t?H.Yellow:H.Plaza),u<=2&&(Math.abs(u-2)<.6||d<=.6)&&l(e.height,H.White)}else if(f&&e.height>=12&&Pl(c.lotX-3,c.lotZ+11)<.45){let t=u>=1.5||d>=1.5;l(e.height+1,t?H.Steel:H.Air);for(let t=2;t<=4;t++)l(e.height+t,H.Steel);l(e.height+5,H.Roof)}else a<.07&&l(e.height+1,H.Roof),a<.03&&l(e.height+2,H.WallGray),a<.008&&l(e.height+3,H.Steel);if(a>.994&&e.height>=18){for(let t=1;t<=5;t++)l(e.height+t,H.Pole);l(e.height+6,H.LightRed)}(t===r||t===i||n===r||n===i)&&!e.neon&&e.height>=8&&l(e.height+1,H.Roof)}}else l(0,H.Sidewalk);break}}for(let e=s-2;e<=s+2;e++)for(let t=o-2;t<=o+2;t++){if(!Cu(t,e))continue;let r=wu(t,e),c=Tu(t,e),u=c?H.SakuraTrunk:H.Trunk,d=c?H.Sakura:H.Leaves,f=Math.abs(o-t),p=Math.abs(s-e);if(f===0&&p===0)for(let e=1;e<r;e++)l(e,u);if(!(f===2&&p===2))for(let e=r-1;e<=r+1;e++)n[(Math.min(e,95)*32+i)*32+a]===H.Air&&l(e,d);f<=1&&p<=1&&!(f===1&&p===1)&&l(r+2,d)}}return n}function Du(e,t){return W(e,26)!==5||W(t,26)!==5?!1:vu(e,t).kind===1}function Ou(e,t){let n=vu(e,t).kind;return n===0||n===1||n===2}function ku(e,t){if(vu(e,t).kind!==0)return 0;let n=W(e,26)<5,r=W(t,26)<5;return n&&r?3:n?1:2}function Au(e){"@babel/helpers - typeof";return Au=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Au(e)}function ju(e,t){if(Au(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Au(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Mu(e){var t=ju(e,`string`);return Au(t)==`symbol`?t:t+``}function G(e,t,n){return(t=Mu(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Nu=class{constructor(){G(this,`chunks`,new Map)}key(e,t){return e+`,`+t}getChunk(e,t){let n=this.key(e,t),r=this.chunks.get(n);return r||(r=Eu(e,t),this.chunks.set(n,r)),r}hasChunk(e,t){return this.chunks.has(this.key(e,t))}getBlock(e,t,n){if(t<0)return H.Dirt;if(t>=96)return H.Air;let r=Math.floor(e/32),i=Math.floor(n/32),a=this.getChunk(r,i),o=e-r*32,s=n-i*32;return a[(t*32+s)*32+o]}setBlock(e,t,n,r){if(t<0||t>=96)return;let i=Math.floor(e/32),a=Math.floor(n/32),o=this.getChunk(i,a),s=e-i*32,c=n-a*32;o[(t*32+c)*32+s]=r}dirtyKeysFor(e,t){let n=Math.floor(e/32),r=Math.floor(t/32),i=[this.key(n,r)],a=e-n*32,o=t-r*32;return a===0&&i.push(this.key(n-1,r)),a===31&&i.push(this.key(n+1,r)),o===0&&i.push(this.key(n,r-1)),o===31&&i.push(this.key(n,r+1)),i}solidAt(e,t,n){return jl(this.getBlock(Math.floor(e),Math.floor(t),Math.floor(n)))}groundHeight(e,t,n=95){let r=Math.floor(e),i=Math.floor(t);for(let e=Math.min(n,95);e>=0;e--)if(jl(this.getBlock(r,e,i)))return e+1;return 0}destroySphere(e,t,n,r){let i=new Set,a=[],o=0,s=r*r,c=Math.floor(e-r),l=Math.ceil(e+r),u=Math.max(1,Math.floor(t-r)),d=Math.min(95,Math.ceil(t+r)),f=Math.floor(n-r),p=Math.ceil(n+r);for(let r=u;r<=d;r++)for(let u=f;u<=p;u++)for(let d=c;d<=l;d++){let c=d+.5-e,l=r+.5-t,f=u+.5-n;if(c*c+l*l+f*f>s)continue;let p=this.getBlock(d,r,u);if(p===H.Air||p===H.Water)continue;this.setBlock(d,r,u,H.Air),o++,a.length<6&&a.push(p);let m=Math.floor(d/32),h=Math.floor(u/32);i.add(this.key(m,h));let g=d-m*32,_=u-h*32;g===0&&i.add(this.key(m-1,h)),g===31&&i.add(this.key(m+1,h)),_===0&&i.add(this.key(m,h-1)),_===31&&i.add(this.key(m,h+1))}return{count:o,ids:a,dirty:i,cx:e,cy:t,cz:n}}collapseScan(e,t,n,r){let i=new Set,a=[],o=new Set,s=Math.ceil(r)+1,c=Math.floor(e),l=Math.floor(t),u=Math.floor(n);for(let e=Math.max(1,l-s);e<=Math.min(95,l+s+1);e++)for(let t=u-s;t<=u+s;t++)for(let n=c-s;n<=c+s;n++){if(!jl(this.getBlock(n,e,t)))continue;let r=n+`,`+e+`,`+t;if(i.has(r))continue;let s=[],l=[[n,e,t]];i.add(r);let d=!1;for(;l.length>0;){let[e,t,n]=l.pop();if(s.push([e,t,n]),s.length>22e3){d=!0;break}if(t<=1&&(d=!0),Math.abs(e-c)>48||Math.abs(n-u)>48){d=!0;continue}let r=[[e+1,t,n],[e-1,t,n],[e,t+1,n],[e,t-1,n],[e,t,n+1],[e,t,n-1]];for(let[e,t,n]of r){if(t<1||t>=96)continue;let r=e+`,`+t+`,`+n;i.has(r)||jl(this.getBlock(e,t,n))&&(i.add(r),l.push([e,t,n]))}}if(!d&&s.length>=4&&a.length+s.length<=22e3)for(let[e,t,n]of s){let r=this.getBlock(e,t,n);a.push([e,t,n,r]),this.setBlock(e,t,n,H.Air);let i=Math.floor(e/32),s=Math.floor(n/32);o.add(this.key(i,s));let c=e-i*32,l=n-s*32;c===0&&o.add(this.key(i-1,s)),c===31&&o.add(this.key(i+1,s)),l===0&&o.add(this.key(i,s-1)),l===31&&o.add(this.key(i,s+1))}}return a.length>0?{blocks:a,dirty:o}:null}foundationScan(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.min(95,Math.max(4,Math.round(n))+2),o=new Set,s=[];for(let e=-6;e<=6;e++)for(let t=-6;t<=6;t++)for(let n=0;n<=4;n++){let c=r+e,l=a+n,u=i+t;if(l>=96||!jl(this.getBlock(c,l,u)))continue;let d=c+`,`+l+`,`+u;o.has(d)||(o.add(d),s.push([c,l,u]))}if(s.length===0)return null;let c=[],l=new Set,u=new Set,d=!1;for(;s.length>0;){let[e,t,n]=s.pop();if(c.push([e,t,n]),c.length>4e4){d=!0;break}let a=e*8192+n;if(l.add(a),t<=2&&u.add(a),Math.abs(e-r)>26||Math.abs(n-i)>26){d=!0;continue}let f=[[e+1,t,n],[e-1,t,n],[e,t+1,n],[e,t-1,n],[e,t,n+1],[e,t,n-1]];for(let[e,t,n]of f){if(t<1||t>=96)continue;let r=e+`,`+t+`,`+n;o.has(r)||!jl(this.getBlock(e,t,n))||(o.add(r),s.push([e,t,n]))}}if(d||c.length<12||u.size>l.size*.7)return null;let f=[],p=new Set;for(let[e,t,n]of c){let r=this.getBlock(e,t,n);f.push([e,t,n,r]),this.setBlock(e,t,n,H.Air);let i=Math.floor(e/32),a=Math.floor(n/32);p.add(this.key(i,a));let o=e-i*32,s=n-a*32;o===0&&p.add(this.key(i-1,a)),o===31&&p.add(this.key(i+1,a)),s===0&&p.add(this.key(i,a-1)),s===31&&p.add(this.key(i,a+1))}return{blocks:f,dirty:p}}raycast(e,t,n,r,i,a,o){let s=Math.floor(e),c=Math.floor(t),l=Math.floor(n),u=r>0?1:-1,d=i>0?1:-1,f=a>0?1:-1,p=r===0?1/0:Math.abs(1/r),m=i===0?1/0:Math.abs(1/i),h=a===0?1/0:Math.abs(1/a),g=r===0?1/0:(r>0?s+1-e:e-s)*p,_=i===0?1/0:(i>0?c+1-t:t-c)*m,v=a===0?1/0:(a>0?l+1-n:n-l)*h,y=0;for(let b=0;b<512&&y<=o;b++){if(c>=0&&c<96&&jl(this.getBlock(s,c,l)))return{x:s,y:c,z:l,px:e+r*y,py:t+i*y,pz:n+a*y,dist:y};g<_&&g<v?(y=g,g+=p,s+=u):_<v?(y=_,_+=m,c+=d):(y=v,v+=h,l+=f)}return null}};function Pu(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Gr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Fu(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Fu(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Fu(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Ar(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Iu=2.2,K=16053752,Lu=14760752,Ru=2678770,zu=3816773,Bu=2303531,Vu=6553475,Hu=16720968,Uu=9015709;function Wu(e,t,n,r,i=0){return new z(new B(e,t,n),new la({color:r,emissive:i,emissiveIntensity:i?1.35:0,metalness:r===zu||r===Bu||r===Uu?.55:.12,roughness:r===K?.32:.42,flatShading:!0}))}function Gu(e,t,n,r=K){let i=Wu(e,t,n,r);return i.castShadow=!0,i.receiveShadow=!0,i}function Ku(e,t=0){return new la({color:e,emissive:t,emissiveIntensity:t?1.65:0,metalness:e===zu||e===Bu||e===Uu?.62:.18,roughness:e===K?.28:.38,flatShading:!0})}function qu(e,t,n=0){let r=new z(e,Ku(t,n));return r.castShadow=!0,r.receiveShadow=!0,r}function q(e,t,n,r,i,a=K){let o=[];for(let a=0;a<4;a++){let s=(a+.5)/4,c=F.lerp(e,t,s),l=F.lerp(r,i,s),u=new B(c,n/4*1.015,l);u.translate(0,-n/2+n*s,0),o.push(u)}return qu(Pu(o,!1),a)}function Ju(e,t,n,r=16){let i=[],a=new B(e*1.45,t,e*1.45);i.push(a);for(let[n,r]of[[-.72,0],[.72,0],[0,-.72],[0,.72]]){let a=new B(e*.58,t*.82,e*.58);a.translate(n*e,0,r*e),i.push(a)}return qu(Pu(i,!1),n)}function Yu(e,t,n){let r=[],i=t+e*2;for(let t=0;t<5;t++){let n=Math.abs(t-4/2)/(4/2),a=e*2*(1-n*.24),o=new B(a,i/5*1.02,a);o.translate(0,-i/2+i*(t+.5)/5,0),r.push(o)}return qu(Pu(r,!1),n)}function Xu(e,t,n=0){let r=[],i=new B(e*1.42,e*1.42,e*1.42);r.push(i);let a=e*.76;for(let[t,n,i]of[[-.7,0,0],[.7,0,0],[0,-.7,0],[0,.7,0],[0,0,-.7],[0,0,.7]]){let o=new B(a,a,a);o.translate(t*e,n*e,i*e),r.push(o)}return qu(Pu(r,!1),t,n)}function Zu(e,t){let n=t.clone();return n.position.x*=-1,n.rotation.z*=-1,e.add(t,n),n}var Qu=class{constructor(){G(this,`group`,new L),G(this,`legL`,void 0),G(this,`legR`,void 0),G(this,`armL`,void 0),G(this,`armR`,void 0),G(this,`elbowL`,void 0),G(this,`elbowR`,void 0),G(this,`torso`,void 0),G(this,`head`,void 0),G(this,`saberBlade`,void 0),G(this,`saberGlow`,void 0),G(this,`saberTrails`,[]),G(this,`crimsonEmitter`,void 0),G(this,`crimsonEdge`,!1),G(this,`aegisParts`,[]),G(this,`aegisBarrier`,void 0),G(this,`aegisEnabled`,!1),G(this,`aegisPulseT`,0),G(this,`thrusterL`,void 0),G(this,`thrusterR`,void 0),G(this,`dashJetL`,void 0),G(this,`dashJetR`,void 0),G(this,`swingT`,-1),G(this,`swingStyle`,0),G(this,`chainedSwing`,!1),G(this,`aiming`,!1),G(this,`kneeL`,void 0),G(this,`kneeR`,void 0),G(this,`landT`,0),G(this,`flinchT`,0),G(this,`recoilT`,0),G(this,`dashT`,0),G(this,`prevYaw`,0),G(this,`bank`,0),G(this,`lean`,0),G(this,`wasAirborne`,!1),G(this,`flying`,!1),G(this,`muzzle`,void 0),G(this,`aimT`,0);let e=this.group;e.scale.setScalar(Iu),this.legL=this.makeLeg(-.37),this.legR=this.makeLeg(.37),this.kneeL=this.legL.lower,this.kneeR=this.legR.lower,e.add(this.legL,this.legR);let t=t=>{let n=new L;n.position.set(t,.48,-.42);let r=new z(new B(.16,.16,2.1),new ni({color:12580863,toneMapped:!1}));r.position.z=-1.05;let i=new z(new B(.42,.42,2.5),new ni({color:1477887,transparent:!0,opacity:.48,blending:2,depthWrite:!1,toneMapped:!1}));i.position.z=-1.2;let a=new Wa(2399743,7,7,2);return a.position.z=-.65,n.add(i,r,a),n.visible=!1,e.add(n),n};this.dashJetL=t(-.37),this.dashJetR=t(.37);let n=Ju(.48,.34,Bu,12);n.position.y=2.08,n.rotation.z=Math.PI/2;let r=q(.82,.76,.2,.5,.46,Bu);r.position.y=2.08;let i=Gu(.26,.2,.11,Lu);i.position.set(0,2.08,.34);let a=Gu(.1,.1,.025,16768105);a.position.set(0,2.08,.405),e.add(n,r,i,a);for(let t of[-1,1]){let n=q(.25,.28,.24,.22,.25,K);n.position.set(t*.31,2.08,.27);let r=Gu(.075,.075,.025,16765774);r.position.set(t*.31,2.08,.405),e.add(n,r)}for(let t of[-1,1]){let n=q(.22,.32,.55,.12,.16,K);n.position.set(t*.25,1.8,.36),n.rotation.z=t*-.08,n.rotation.x=.12;let r=q(.16,.23,.48,.4,.33,K);r.position.set(t*.55,1.83,-.01),r.rotation.z=t*-.14;let i=q(.23,.3,.5,.12,.16,K);i.position.set(t*.24,1.82,-.36),i.rotation.x=-.12,e.add(n,r,i)}this.torso=new L,this.torso.position.y=2.25,e.add(this.torso);let o=Yu(.27,.3,Bu);o.position.y=.34,o.scale.z=.62,this.torso.add(o);for(let e of[.18,.34,.5]){let t=Ju(.3,.06,Uu,12);t.position.y=e,t.scale.z=.6,this.torso.add(t)}let s=q(.44,.36,.46,.2,.16,K);s.position.set(0,.36,-.2),this.torso.add(s);let c=q(1.1,1.48,.92,.62,.7,K);c.position.y=1.03,this.torso.add(c);for(let e of[-1,1]){let t=q(.24,.44,.18,.5,.62,K);t.position.set(e*.52,1.52,.13),t.rotation.z=e*-.28,t.rotation.x=-.08;let n=q(.1,.16,.3,.08,.11,Lu);n.position.set(e*.42,.67,.37),n.rotation.z=e*-.18,this.torso.add(t,n)}for(let e of[-1,1]){let t=q(.44,.54,.33,.09,.12,Lu);t.position.set(e*.34,1.27,.54),t.rotation.z=e*.22;let n=q(.23,.3,.17,.06,.08,Lu);n.position.set(e*.31,.99,.535),n.rotation.z=e*-.22;let r=q(.18,.28,.48,.08,.1,K);r.position.set(e*.72,1.13,.46),r.rotation.z=e*-.12,this.torso.add(t,n,r)}let l=q(.46,.54,.74,.17,.21,K);l.position.set(0,1.15,.5);let u=q(.09,.16,.3,.058,.092,Lu);u.position.set(0,1.08,.596),this.torso.add(l,u);for(let e of[-1,1]){let t=q(.08,.13,.66,.4,.52,K);t.position.set(e*.78,1.08,-.01),t.rotation.z=e*-.08;let n=Gu(.055,.25,.38,Bu);n.position.set(e*.84,.78,-.03),this.torso.add(t,n)}let d=Ju(.27,.31,zu,16);d.position.y=1.74;let f=q(.28,.48,.22,.46,.54,K);f.position.set(-.43,1.62,0),f.rotation.z=-.12,Zu(this.torso,f);let p=Gu(.3,.09,.06,16768105);p.position.set(0,1.5,.5);let m=Gu(.36,.05,.05,Bu);m.position.set(0,1.44,.5),this.torso.add(d,p,m);let h=q(.66,.76,.7,.22,.27,Bu);h.position.set(0,1.06,-.5);let g=q(.52,.58,.48,.1,.13,K);g.position.set(0,1.13,-.66);let _=Gu(.24,.28,.045,Bu);_.position.set(0,1.1,-.75);let v=q(.06,.08,.62,.34,.28,K);v.position.set(-.46,1.08,-.57);let y=v.clone();y.position.x=.46,this.torso.add(h,g,_,v,y),this.thrusterL=Ju(.14,.42,16756820,14),this.thrusterL.position.set(-.25,.65,-.69);let b=this.thrusterL.material;b.emissive.setHex(16739108),b.emissiveIntensity=4.5,b.toneMapped=!1;let x=new z(new B(.13,.82,.13),new ni({color:16773286,blending:2,depthWrite:!1,toneMapped:!1}));x.position.y=-.48;let S=new z(new B(.36,1.05,.36),new ni({color:16734751,transparent:!0,opacity:.38,blending:2,depthWrite:!1,toneMapped:!1}));S.position.y=-.5;let C=new Wa(16738858,9,7,2);C.position.set(0,-.62,0),this.thrusterL.add(S,x,C),this.thrusterL.visible=!1,this.thrusterR=this.thrusterL.clone(),this.thrusterR.position.x=.34,this.thrusterR.position.x=.25,this.torso.add(this.thrusterL,this.thrusterR),this.head=new L,this.head.position.y=1.93,this.head.scale.set(.95,.75,.84);let w=Gu(.46,.38,.42,Bu);w.position.set(0,.01,-.03);let T=Gu(.56,.099,.5,K);T.position.set(0,.1995,-.03);let E=Gu(.54,.09,.46,K);E.position.set(0,.2895,-.06);let D=Gu(.46,.081,.38,K);D.position.set(0,.34,-.1);let ee=Gu(.34,.072,.28,K);ee.position.set(0,.405,-.13);let O=Gu(.56,.34,.13,K);O.position.set(0,.12,-.27);let k=Gu(.58,.1,.2,K);k.position.set(0,.2,.25);let te=Gu(.5,.08,.14,K);te.position.set(0,.155,.38);let ne=Gu(.58,.17,.12,Bu);ne.position.set(0,.045,.35);let A=[];for(let e of[{w:.18,h:.05,y:.078,x:.095},{w:.15,h:.045,y:.032,x:.075},{w:.11,h:.038,y:-.008,x:.055}])for(let t of[-1,1]){let n=Gu(e.w,e.h,.04,Ru);n.material.emissive.setHex(Ru),n.material.emissiveIntensity=1.9,n.position.set(t*e.x,e.y,.426),A.push(n)}let re=Gu(.3,.09,.12,K);re.position.set(0,-.035,.43);let ie=Gu(.27,.085,.13,K);ie.position.set(0,-.125,.385);let ae=Gu(.3,.1,.18,K);ae.position.set(0,-.215,.29);let oe=Gu(.17,.08,.12,K);oe.position.set(0,-.29,.29);let se=Gu(.46,.09,.38,Bu);se.position.set(0,-.29,-.005),this.head.add(w,O,T,E,D,ee,k,te,ne,...A,re,ie,ae,oe,se);for(let e of[-1,1]){let t=Gu(.035,.18,.21,K);t.position.set(e*.301,.145,.115);let n=Gu(.035,.25,.2,K);n.position.set(e*.301,.065,-.155);let r=Gu(.035,.12,.23,K);r.position.set(e*.301,-.105,.01);let i=Gu(.035,.17,.2,K);i.position.set(e*.301,-.135,.245);let a=Gu(.035,.18,.22,Bu);a.position.set(e*.321,.04,.35);let o=Gu(.04,.17,.115,Bu);o.position.set(e*.322,.04,-.285);let s=Gu(.035,.115,.065,K);s.position.set(e*.344,.04,-.285),this.head.add(t,n,r,i,a,o,s)}let ce=Gu(.34,.22,.08,Bu);ce.position.set(0,-.12,-.405);let le=Gu(.16,.07,.04,Lu);le.position.set(0,.14,-.405),this.head.add(ce,le);for(let e of[-1,1]){let t=new L;for(let n=0;n<5;n++){let r=n/4,i=Gu(.095-r*.015,.11,.095-r*.015,Lu);i.position.set(e*n*.018,n*.105,-n*.014),t.add(i)}t.position.set(e*.23,.35,-.245),t.rotation.z=e*-.12,t.rotation.x=.03,this.head.add(t)}this.torso.add(this.head),this.armL=this.makeArm(-.9,!0),this.armR=this.makeArm(.9,!1),this.elbowL=this.armL.lower,this.elbowR=this.armR.lower,this.torso.add(this.armL,this.armR);let ue=Ju(.1,.48,Uu,14);ue.position.set(0,-1.01,.22),this.elbowR.add(ue),this.saberBlade=qu(new B(.13,3.15,.13),Vu,Vu),this.saberBlade.position.set(0,-2.82,.22),this.saberBlade.visible=!1,this.saberGlow=new z(new B(.3,3.2,.3),new ni({color:Vu,transparent:!0,opacity:.35,blending:2,depthWrite:!1})),this.saberBlade.add(this.saberGlow);for(let e=0;e<4;e++){let t=new z(new B(.08+e*.045,3.08,.09),new ni({color:Vu,transparent:!0,opacity:0,blending:2,depthWrite:!1,toneMapped:!1}));t.position.set(0,-2.82,.22),t.visible=!1,this.elbowR.add(t),this.saberTrails.push(t)}this.crimsonEmitter=Ju(.145,.18,Hu,12),this.crimsonEmitter.position.set(0,-1.23,.22);let de=this.crimsonEmitter.material;de.emissive.setHex(9307677),de.emissiveIntensity=2.2,this.crimsonEmitter.visible=!1,this.elbowR.add(this.crimsonEmitter),this.elbowR.add(this.saberBlade),this.buildAegisArmor(),this.aegisBarrier=new z(new Yi(2.35,1),new ni({color:4582143,transparent:!0,opacity:0,blending:2,depthWrite:!1,wireframe:!0,toneMapped:!1})),this.aegisBarrier.position.y=2.45,this.aegisBarrier.scale.set(.72,1.18,.72),this.aegisBarrier.visible=!1,this.group.add(this.aegisBarrier)}setCrimsonEdge(e){this.crimsonEdge=e,this.crimsonEmitter.visible=e;let t=this.saberBlade.material;t.color.setHex(e?Hu:Vu),t.emissive.setHex(e?16714546:Vu),t.emissiveIntensity=e?3.6:1.65,t.toneMapped=!e;let n=this.saberGlow.material;n.color.setHex(e?16717373:Vu),n.opacity=e?.58:.35;for(let t of this.saberTrails)t.material.color.setHex(e?16717636:Vu)}setAegisArmor(e){this.aegisEnabled=e;for(let t of this.aegisParts)t.visible=e;e||(this.aegisPulseT=0,this.aegisBarrier.visible=!1)}pulseAegis(){this.aegisEnabled&&(this.aegisPulseT=.34,this.aegisBarrier.visible=!0)}buildAegisArmor(){let e=(e,t)=>(t.visible=!1,e.add(t),this.aegisParts.push(t),t);for(let t of[-1,1]){let n=q(.42,.62,.72,.14,.2,K);n.position.set(t*.53,1.13,.67),n.rotation.z=t*-.17,e(this.torso,n);let r=Gu(.12,.56,.08,Ru);r.position.set(t*.29,1.12,.79),r.rotation.z=t*-.1;let i=r.material;i.emissive.setHex(556445),i.emissiveIntensity=1.8,e(this.torso,r);let a=q(.66,.46,.24,.76,.58,K);a.position.set(t*.08,.6,-.02),a.rotation.z=t*-.1,e(t<0?this.armL:this.armR,a);let o=q(.46,.36,.58,.16,.12,K);o.position.set(t*.05,-.42,.42),e(t<0?this.elbowL:this.elbowR,o);let s=q(.45,.33,.62,.14,.1,K);s.position.set(t*.04,-.48,.46),e(t<0?this.legL:this.legR,s);let c=q(.5,.36,.66,.16,.11,K);c.position.set(t*.04,-.55,.48),e(t<0?this.kneeL:this.kneeR,c)}let t=Gu(.26,.32,.1,Ru);t.position.set(0,1.2,.81);let n=t.material;n.emissive.setHex(Ru),n.emissiveIntensity=2.5,e(this.torso,t);for(let t of[-1,1]){let n=q(.13,.2,.74,.42,.3,K);n.position.set(t*.62,1.15,-.74),n.rotation.z=t*-.18,n.rotation.x=-.1,e(this.torso,n)}}makeLeg(e){let t=new L;t.position.set(e,2.08,0);let n=Xu(.25,zu),r=Yu(.2,.72,zu);r.position.y=-.58;let i=q(.34,.42,.92,.27,.35,K);i.position.set(0,-.53,.14);let a=q(.09,.14,.74,.31,.38,K);a.position.set(-.22,-.53,-.01);let o=a.clone();o.position.x=.22;let s=q(.2,.28,.22,.08,.1,Lu);s.position.set(e<0?-.16:.16,-.73,.31);let c=q(.3,.38,.35,.12,.18,Lu);c.position.set(e<0?-.1:.1,-1.18,.3);let l=q(.3,.38,.86,.24,.31,K);l.position.set(0,-.55,-.16);let u=Gu(.16,.3,.04,Bu);u.position.set(0,-.62,-.32),t.add(n,r,i,a,o,s,c,l,u);let d=new L;d.position.y=-1.2;let f=Ju(.25,.42,zu,14);f.rotation.z=Math.PI/2;let p=Yu(.18,.77,zu);p.position.y=-.62;let m=q(.43,.34,1.04,.36,.27,K);m.position.set(0,-.61,.08);let h=Gu(.15,.45,.035,Bu);h.position.set(0,-.58,.3);let g=q(.22,.31,.75,.1,.14,K);g.position.set(0,-.53,.35);let _=q(.07,.1,.26,.06,.075,Lu);_.position.set(e<0?-.19:.19,-.3,.42);let v=q(.05,.07,.3,.07,.1,Lu);v.position.set(e<0?.27:-.27,-.62,-.17);let y=Ju(.18,.28,zu,12);y.position.y=-1.27,y.rotation.z=Math.PI/2;let b=q(.41,.32,.31,.48,.42,K);b.position.set(0,-1.34,-.08);let x=q(.51,.43,.28,.82,.67,K);x.position.set(0,-1.48,.17);let S=Gu(.55,.1,.86,Lu);S.position.set(0,-1.63,.18);let C=q(.53,.43,.19,.34,.49,Lu);C.position.set(0,-1.48,.56);let w=q(.36,.29,.94,.3,.23,K);w.position.set(0,-.63,-.14);let T=Gu(.18,.34,.04,Bu);return T.position.set(0,-.52,-.3),d.add(f,p,m,h,g,_,v,y,b,x,S,C,w,T),t.add(d),t.lower=d,t}makeArm(e,t){let n=new L;n.position.set(e,1.3,0);let r=Xu(.29,zu),i=q(.6,.77,.46,.52,.65,K);i.scale.set(1,1,1),i.position.set(e>0?.05:-.05,.19,0),i.rotation.z=e>0?-.08:.08;let a=Xu(.37,Lu);a.scale.set(.15,.7,.42),a.position.set(e>0?.525:-.525,.17,0);let o=q(.42,.3,.14,.6,.5,K);o.position.set(0,.4,0),o.rotation.x=-.1;let s=q(.51,.66,.14,.27,.34,Lu);s.position.set(e>0?.05:-.05,.41,.02),s.rotation.z=e>0?-.06:.06;let c=Gu(.045,.22,.23,592397);c.position.set(e>0?.535:-.535,.07,-.015);let l=Gu(.052,.17,.3,K);l.position.set(e>0?.55:-.55,-.145,.015);let u=Gu(.055,.34,.1,Lu);u.position.set(e>0?.565:-.565,.1,.21);let d=u.clone();d.position.z=-.21;let f=Yu(.18,.5,zu);f.position.y=-.5;let p=q(.31,.38,.62,.27,.33,K);p.position.set(0,-.49,.08);let m=q(.05,.08,.22,.06,.075,Lu);m.position.set(e>0?.23:-.23,-.56,.21);let h=q(.27,.34,.58,.24,.29,K);h.position.set(0,-.49,-.1);let g=Ju(.21,.38,Bu,14);g.position.y=-.91,g.rotation.z=Math.PI/2;let _=new L;_.position.y=-.91;let v=Yu(.17,.56,zu);v.position.y=-.43;let y=q(.36,.28,.78,.38,.29,K);y.position.set(0,-.42,.04);let b=q(.13,.17,.24,.08,.1,Lu);b.position.set(0,-.34,.27);let x=Xu(.21,zu);return x.position.y=-.91,x.scale.set(.9,1.05,.9),_.add(v,y,b,x),n.add(r,i,a,o,f,p,s,c,l,u,d,m,h,g,_),t&&(this.muzzle=Xu(.05,16756968,16756968),this.muzzle.position.set(0,-1.07,.1),this.muzzle.visible=!1,_.add(this.muzzle)),n.lower=_,n}setThrusters(e){this.thrusterL.visible=e,this.thrusterR.visible=e,this.flying=e}setDashThrusters(e){this.dashJetL.visible=e,this.dashJetR.visible=e}flickerThrusters(e){if(!this.thrusterL.visible)return;let t=.85+Math.abs(Math.sin(e*31))*.5;this.thrusterL.scale.set(1,t,1),this.thrusterR.scale.set(1,1.35-(t-.85),1)}animate(e,t,n,r){if(this.flickerThrusters(e),this.dashJetL.visible){let t=.82+Math.abs(Math.sin(e*43))*.5;this.dashJetL.scale.set(1,1,t),this.dashJetR.scale.set(1,1,1.32-(t-.82))}if(this.landT=Math.max(0,this.landT-r),this.flinchT=Math.max(0,this.flinchT-r),this.recoilT=Math.max(0,this.recoilT-r),this.dashT=Math.max(0,this.dashT-r),this.aegisPulseT=Math.max(0,this.aegisPulseT-r),this.aegisBarrier.visible){let t=this.aegisPulseT/.34,n=Math.sin(Math.max(0,t)*Math.PI),i=this.aegisBarrier.material;i.opacity=n*.48;let a=1+(1-t)*.12;this.aegisBarrier.scale.set(.72*a,1.18*a,.72*a),this.aegisBarrier.rotation.y+=r*1.8,this.aegisBarrier.rotation.x=Math.sin(e*2.4)*.04,this.aegisPulseT<=0&&(this.aegisBarrier.visible=!1)}n&&this.wasAirborne&&(this.landT=.18),this.wasAirborne=!n;let i=this.group.rotation.y-this.prevYaw;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;this.prevYaw=this.group.rotation.y;let a=Math.min(1,t/20),o=n?a*.2+this.dashT*.9:this.flying?.38:.16,s=Math.max(-.32,Math.min(.32,-i*7));this.lean+=(o-this.lean)*Math.min(1,r*7),this.bank+=(s-this.bank)*Math.min(1,r*6);let c=Math.min(1,t/9),l=e*(7+a*5);if(n&&c>.05){let e=Math.sin(l),t=Math.sin(l+Math.PI);this.legL.rotation.x=e*.66*c,this.legR.rotation.x=t*.66*c,this.kneeL.rotation.x=(.18+Math.max(0,-e)*1.22)*c,this.kneeR.rotation.x=(.18+Math.max(0,-t)*1.22)*c,this.armL.rotation.x=t*.48*c,this.armR.rotation.x=e*.36*c+.08,this.elbowL.rotation.x=-(.16+Math.max(0,t)*.34)*c,this.elbowR.rotation.x=-(.2+Math.max(0,e)*.28)*c,this.legL.rotation.z=-.025*c,this.legR.rotation.z=.025*c,this.armL.rotation.z=-.04,this.armR.rotation.z=.04,this.group.position.y+=(.055+Math.abs(Math.sin(l))*.11)*c,this.torso.rotation.y=-e*.13*c,this.torso.rotation.z=-e*.035*c,this.head.rotation.y=e*.06*c,this.head.rotation.z=e*.025*c}else if(n){let t=1-Math.exp(-r*8),n=Math.sin(e*1.55),i=Math.sin(e*.68);this.legL.rotation.x=F.lerp(this.legL.rotation.x,-.045+i*.008,t),this.legR.rotation.x=F.lerp(this.legR.rotation.x,-.025-i*.008,t),this.kneeL.rotation.x=F.lerp(this.kneeL.rotation.x,.17-i*.018,t),this.kneeR.rotation.x=F.lerp(this.kneeR.rotation.x,.2+i*.018,t),this.legL.rotation.z=F.lerp(this.legL.rotation.z,-.055,t),this.legR.rotation.z=F.lerp(this.legR.rotation.z,.055,t),this.armL.rotation.x=F.lerp(this.armL.rotation.x,.055+n*.018,t),this.armR.rotation.x=F.lerp(this.armR.rotation.x,.035-n*.014,t),this.armL.rotation.z=F.lerp(this.armL.rotation.z,-.08,t),this.armR.rotation.z=F.lerp(this.armR.rotation.z,.08,t),this.elbowL.rotation.x=F.lerp(this.elbowL.rotation.x,-.24,t),this.elbowR.rotation.x=F.lerp(this.elbowR.rotation.x,-.28,t),this.torso.rotation.y=F.lerp(this.torso.rotation.y,i*.018,t),this.torso.rotation.z=F.lerp(this.torso.rotation.z,-i*.012,t),this.head.rotation.x=F.lerp(this.head.rotation.x,-.018,t),this.head.rotation.y=F.lerp(this.head.rotation.y,-i*.02,t),this.head.rotation.z=F.lerp(this.head.rotation.z,i*.008,t),this.torso.position.y=F.lerp(this.torso.position.y,2.25+n*.012,t)}else{let t=Math.sin(e*5.5),n=Math.sin(e*2.3);this.flying?(this.legL.rotation.x=-.88+t*.05,this.kneeL.rotation.x=1.65+t*.08,this.legR.rotation.x=.18-t*.035,this.kneeR.rotation.x=.2+t*.025,this.legL.rotation.z=.12,this.legR.rotation.z=-.05,this.armL.rotation.x=-.45+t*.05,this.armR.rotation.x=.22-t*.04,this.armL.rotation.z=-.34,this.armR.rotation.z=.24,this.elbowL.rotation.x=-(.82+t*.05),this.elbowR.rotation.x=-(.34-t*.03),this.torso.rotation.y=n*.07,this.torso.rotation.z=-.08+n*.025,this.head.rotation.x=-.18,this.head.rotation.y=-n*.06,this.head.rotation.z=.05,this.group.position.y+=t*.055):(this.legL.rotation.x=-.22+t*.08,this.legR.rotation.x=.3-t*.08,this.kneeL.rotation.x=.82,this.kneeR.rotation.x=.32,this.legL.rotation.z=0,this.legR.rotation.z=0,this.armL.rotation.x=-.12,this.armR.rotation.x=-.06,this.armL.rotation.z=-.34,this.armR.rotation.z=.34,this.elbowL.rotation.x=-.48,this.elbowR.rotation.x=-.42,this.torso.rotation.y*=.85,this.head.rotation.x=-.08,this.head.rotation.y*=.82,this.head.rotation.z*=.82)}if(this.landT>0){let e=this.landT/.18,t=Math.sin(e*Math.PI)*.28;this.kneeL.rotation.x+=t,this.kneeR.rotation.x+=t,this.legL.rotation.x+=t*.25,this.legR.rotation.x+=t*.25,this.group.position.y-=t*.62}if(this.group.rotation.z=this.bank,this.torso.rotation.x=this.lean+(this.flinchT>0?-Math.sin(this.flinchT/.22*Math.PI)*.28:0),this.swingT<0){let e=1-Math.exp(-r*11);this.armL.rotation.y=F.lerp(this.armL.rotation.y,0,e),this.armR.rotation.y=F.lerp(this.armR.rotation.y,0,e),this.elbowL.rotation.y=F.lerp(this.elbowL.rotation.y,0,e),this.elbowR.rotation.y=F.lerp(this.elbowR.rotation.y,0,e),this.elbowL.rotation.z=F.lerp(this.elbowL.rotation.z,0,e),this.elbowR.rotation.z=F.lerp(this.elbowR.rotation.z,0,e)}if(this.swingT>=0){this.swingT+=r/.62;let e=this.swingT,t=this.swingStyle,n=t===2,i=t===0,a=t===1,o=t===1?-1:1;this.saberBlade.visible=!0;let s=e<.14?e/.14:e>.86?Math.max(0,(1-e)/.14):1,c=this.crimsonEdge?1.28:1;this.saberBlade.scale.set(c,Math.max(.05,s),c),this.saberBlade.position.y=-2.82+(1-s)*1.58;let l=e>.2&&e<.74?Math.sin((e-.2)/.54*Math.PI):0;for(let e=0;e<this.saberTrails.length;e++){let n=this.saberTrails[e],r=n.material;n.visible=l>.01,r.opacity=l*(.24-e*.035)*(this.crimsonEdge?1.45:1),n.position.y=this.saberBlade.position.y,n.scale.set(c,Math.max(.05,s),c);let i=t===1?-1:1;n.rotation.z=a?i*(.015+e*.025)*l:i*(.055+e*.065)*l,n.rotation.y=-i*e*.035*l}if(e<.34){let t=1-(1-e/.34)*(1-e/.34);n?(this.armR.rotation.x=F.lerp(.035,-2.2,t),this.armR.rotation.z=F.lerp(.08,.14,t),this.armL.rotation.x=F.lerp(.055,-.78,t),this.armL.rotation.z=F.lerp(-.08,.24,t),this.elbowR.rotation.x=F.lerp(-.28,-1.02,t),this.elbowL.rotation.x=F.lerp(-.24,-.92,t),this.armR.rotation.y=-.12*t,this.armL.rotation.y=.22*t,this.elbowR.rotation.y=.18*t,this.elbowL.rotation.y=-.18*t,this.elbowR.rotation.z=-.1*t,this.elbowL.rotation.z=.05*t,this.torso.rotation.y=.22*t,this.torso.rotation.x=this.lean-.15*t):(this.armR.rotation.x=F.lerp(this.chainedSwing?-.72:.035,i?-1.48:.92,t),this.armR.rotation.z=F.lerp(.08,a?.16:-.48*o,t),this.armL.rotation.x=F.lerp(.055,-.62,t),this.armL.rotation.z=F.lerp(-.08,.18*o,t),this.elbowR.rotation.x=F.lerp(-.28,a?-1.45:-1.02,t),this.elbowL.rotation.x=F.lerp(-.24,-.78,t),this.armR.rotation.y=(a?.88:-.54*o)*t,this.armL.rotation.y=.18*o*t,this.elbowR.rotation.y=(a?-.08:.38*o)*t,this.elbowL.rotation.y=-.2*o*t,this.elbowR.rotation.z=(a?.04:-.13*o)*t,this.elbowL.rotation.z=.08*o*t,this.torso.rotation.y=(a?.66:.58*o)*t,this.torso.rotation.x=this.lean-(i?.16:.06)*t),this.torso.rotation.z=-.12*t*o,this.head.rotation.y=-.2*t*o,this.legL.rotation.x=F.lerp(-.045,-.12*o,t),this.legR.rotation.x=F.lerp(-.025,.12*o,t),this.legL.rotation.z=F.lerp(-.055,-.11,t),this.legR.rotation.z=F.lerp(.055,.11,t),this.kneeL.rotation.x=F.lerp(.17,o>0?.36:.58,t),this.kneeR.rotation.x=F.lerp(.2,o>0?.58:.36,t)}else if(e<.64){let t=1-(1-(e-.34)/.3)**3;n?(this.armR.rotation.x=-2.2+2.78*t,this.armR.rotation.z=.14-.3*t,this.armL.rotation.x=F.lerp(-.78,-.5,t),this.armL.rotation.z=F.lerp(.24,.12,t),this.elbowR.rotation.x=-(1.02-.74*t),this.elbowL.rotation.x=F.lerp(-.92,-.62,t),this.armR.rotation.y=F.lerp(-.12,.18,t),this.armL.rotation.y=F.lerp(.22,-.08,t),this.elbowR.rotation.y=F.lerp(.18,-.1,t),this.elbowL.rotation.y=F.lerp(-.12,.08,t),this.elbowR.rotation.z=F.lerp(-.1,.08,t),this.elbowL.rotation.z=F.lerp(.08,-.05,t),this.torso.rotation.y=.22-.38*t,this.torso.rotation.x=this.lean-.15+.49*t):(this.armR.rotation.x=i?F.lerp(-1.48,-.88,t):F.lerp(.92,1.16,t),this.armR.rotation.z=a?F.lerp(.16,.46,t):(-.48+1.26*t)*o,this.armL.rotation.x=-.62-.08*t,this.armL.rotation.z=(.18+.1*t)*o,this.elbowR.rotation.x=a?F.lerp(-1.45,-.52,t):-(1.02-.68*t),this.elbowL.rotation.x=-(.78-.18*t),this.armR.rotation.y=a?F.lerp(.88,-1.05,t):F.lerp(-.54,.82,t)*o,this.armL.rotation.y=F.lerp(.18,-.16,t)*o,this.elbowR.rotation.y=a?F.lerp(-.08,.08,t):F.lerp(.38,-.28,t)*o,this.elbowL.rotation.y=F.lerp(-.2,.16,t)*o,this.elbowR.rotation.z=a?F.lerp(.04,-.04,t):F.lerp(-.13,.12,t)*o,this.elbowL.rotation.z=F.lerp(.08,-.07,t)*o,this.torso.rotation.y=a?F.lerp(.66,-.92,t):(.58-1.25*t)*o,this.torso.rotation.x=i?this.lean-.16+.42*t:this.lean-.06+.18*t),this.torso.rotation.z=(-.12+.28*t)*o,this.head.rotation.y=(-.2+.34*t)*o,this.legL.rotation.x=(-.12+.22*t)*o,this.legR.rotation.x=(.12-.22*t)*o,this.legL.rotation.z=-.11,this.legR.rotation.z=.11;let r=o>0?.36:.58,s=o>0?.58:.36,c=o>0?.66:.3,l=o>0?.3:.66;this.kneeL.rotation.x=F.lerp(r,c,t),this.kneeR.rotation.x=F.lerp(s,l,t)}else if(e<1){let t=(e-.64)/.36,r=t*t*(3-2*t),s=Math.sin(t*Math.PI)*.12;if(n)this.armR.rotation.x=F.lerp(.58+s,.035,r),this.armR.rotation.z=F.lerp(-.16,.08,r),this.armL.rotation.x=F.lerp(-.5,.055,r),this.armL.rotation.z=F.lerp(.12,-.08,r),this.elbowR.rotation.x=F.lerp(-.28,-.28,r),this.elbowL.rotation.x=F.lerp(-.42,-.24,r),this.armR.rotation.y=F.lerp(.18,0,r),this.armL.rotation.y=F.lerp(-.12,0,r),this.elbowR.rotation.y=F.lerp(-.1,0,r),this.elbowL.rotation.y=F.lerp(.08,0,r),this.elbowR.rotation.z=F.lerp(.08,0,r),this.elbowL.rotation.z=F.lerp(-.05,0,r),this.torso.rotation.x=this.lean+.34*(1-r);else{let e=i?-.88:a?1.16:.12,t=this.chainedSwing?-.72:.035;this.armR.rotation.x=F.lerp(e-s,t,r),this.armR.rotation.z=F.lerp(a?.46:.78*o,.08,r),this.armL.rotation.x=F.lerp(-.7,.055,r),this.armL.rotation.z=F.lerp(.28*o,-.08,r),this.elbowR.rotation.x=F.lerp(a?-.52:-.34,-.28,r),this.elbowL.rotation.x=F.lerp(-.56,-.24,r),this.armR.rotation.y=F.lerp(a?-1.05:.82*o,0,r),this.armL.rotation.y=F.lerp(-.42*o,0,r),this.elbowR.rotation.y=F.lerp(-.28*o,0,r),this.elbowL.rotation.y=F.lerp(.16*o,0,r),this.elbowR.rotation.z=F.lerp(.12*o,0,r),this.elbowL.rotation.z=F.lerp(-.07*o,0,r),this.torso.rotation.x=this.lean+.2*(1-r)}this.torso.rotation.y=(n?-.16:a?-.92:-.67*o)*(1-r),this.torso.rotation.z=.16*o*(1-r),this.legL.rotation.x=F.lerp(o>0?.1:-.1,-.045,r),this.legR.rotation.x=F.lerp(o>0?-.1:.1,-.025,r),this.kneeL.rotation.x=F.lerp(o>0?.66:.3,.17,r),this.kneeR.rotation.x=F.lerp(o>0?.3:.66,.2,r),this.legL.rotation.z=F.lerp(-.11,-.055,r),this.legR.rotation.z=F.lerp(.11,.055,r),this.head.rotation.y=(n?.06:.14*o)*(1-r)}else{this.swingT=-1,this.chainedSwing=!1,this.saberBlade.visible=!1;let e=this.crimsonEdge?1.28:1;this.saberBlade.scale.set(e,1,e),this.saberBlade.position.y=-2.82;for(let e of this.saberTrails)e.visible=!1}}else n&&c>.05&&(this.armR.rotation.x=Math.sin(l)*.42*c);if(this.aimT-=r,this.aiming||this.aimT>0){let e=this.recoilT>0?Math.sin(this.recoilT/.18*Math.PI)*.5:0;this.armL.rotation.x=-Math.PI/2+e,this.armL.rotation.z=-.16,this.elbowL.rotation.x=-(.12+e*.22),this.armR.rotation.x=.28,this.armR.rotation.z=.2,this.elbowR.rotation.x=-.48,this.legL.rotation.x=.3,this.kneeL.rotation.x=1.02,this.legR.rotation.x=-.16,this.kneeR.rotation.x=.34,this.legL.rotation.z=-.13,this.legR.rotation.z=.13,this.torso.rotation.y+=.18+e*.12,this.torso.rotation.x+=.1,this.head.rotation.y=-.12,this.head.rotation.x=-.05}}fireRifle(e){this.aimT=.3,this.recoilT=.18,this.armL.rotation.x=-Math.PI/2,this.group.updateMatrixWorld(!0),this.muzzle.getWorldPosition(e)}startSwing(e=0,t=!1){return this.swingT>=0&&this.swingT<.7?!1:(this.chainedSwing=t,this.swingT=0,this.swingStyle=e%3,!0)}};function J(e,t,n,r,i=0){return new z(new B(e,t,n),new ua({color:r,emissive:i,emissiveIntensity:+!!i}))}var $u=class e{get tempo(){return this.phase===1?1:this.phase===2?1.3:1.7}get pace(){return this.phase===1?1:this.phase===2?1.18:1.42}get vulnerable(){return this.vulnT>0}get threatening(){return this.telegraph}rewardEvade(e=1.15){this.dying||this.openWindow(e)}constructor(e){G(this,`group`,new L),G(this,`hp`,void 0),G(this,`maxHp`,void 0),G(this,`dead`,!1),G(this,`dying`,!1),G(this,`phase`,1),G(this,`phaseAnnounce`,0),G(this,`vulnT`,0),G(this,`deathT`,0),G(this,`flashT`,0),G(this,`roarT`,0),G(this,`telegraph`,!1),G(this,`coreT`,0),G(this,`staggerT`,0),G(this,`staggerStrength`,0),G(this,`weakCore`,void 0),G(this,`hitRadius`,8),G(this,`centerY`,14),this.hp=e,this.maxHp=e}takeDamage(t,n){if(this.dying)return 0;let r=this.vulnerable?t*e.PUNISH:t;if(this.hp=Math.max(0,this.hp-r),this.flashT=.14,this.staggerT=Math.max(this.staggerT,.16),this.staggerStrength=Math.max(this.staggerStrength,Math.min(1,r/42)),this.hp<=0)return this.dying=!0,r;let i=this.hp/this.maxHp,a=i<=.25?3:i<=.6?2:1;return a>this.phase&&(this.phase=a,this.phaseAnnounce=a,this.roarT=1.1,this.vulnT=0,this.onPhase(a)),r}onPhase(e){}openWindow(e){this.vulnT=Math.max(this.vulnT,e)}updateFlash(e){this.coreT+=e,this.updateCore(this.coreT),this.flashT-=e,this.vulnT=Math.max(0,this.vulnT-e),this.roarT=Math.max(0,this.roarT-e),this.staggerT=Math.max(0,this.staggerT-e);let t=this.staggerT>0?Math.sin(this.staggerT/.16*Math.PI)*this.staggerStrength:0,n=this.vulnerable?Math.min(1,this.vulnT*2.5)*.06:0,r=this.roarT>0?Math.sin(this.roarT/1.1*Math.PI)*.07:0;this.group.scale.set(ed*(1+t*.018+n*.7+r),ed*(1-t*.035-n+r),ed*(1+t*.018+n*.7+r)),this.staggerT===0&&(this.staggerStrength=0);let i=this.flashT>0,a=!i&&this.roarT>0,o=!i&&!a&&this.vulnerable,s=!i&&!a&&!o&&this.telegraph;this.group.traverse(e=>{let t=e;if(t.isMesh){let e=t.material;if(!e||!e.emissive)return;i?(e.emissive.setHex(16720418),e.emissiveIntensity=.8):a?(e.emissive.setHex(16773328),e.emissiveIntensity=.5+Math.sin(this.coreT*34)*.35):o?(e.emissive.setHex(5104383),e.emissiveIntensity=.55+Math.sin(this.coreT*18)*.2):s?(e.emissive.setHex(16753455),e.emissiveIntensity=.65):(e.emissive.setHex(e.userData.baseEmissive??0),e.emissiveIntensity=+!!e.userData.baseEmissive)}})}addCore(e,t=-1.5){this.weakCore=new z(new B(2.6,2.6,2.6),new ua({color:16770140,emissive:16762394,emissiveIntensity:1})),this.weakCore.position.set(0,e,t),this.group.add(this.weakCore);let n=new ua({color:2366761,emissive:2229771,emissiveIntensity:.28});for(let r=0;r<5;r++){let i=new z(new B(.7,1.5+r*.32,.7),n.clone());i.position.set(r%2?.35:-.35,e-5+r*1.55,t-1.2),i.rotation.x=-.48-r*.04,i.rotation.z=(r%2?1:-1)*.12,this.group.add(i)}for(let t of[-1,1]){let r=new z(new B(.85,4.2,.85),n.clone());r.position.set(t*4.8,e-3.4,-.2),r.rotation.z=t*-.88,r.rotation.x=-.18,this.group.add(r);let i=J(1.15,.45,.35,4198425,16720920);i.position.set(t*2.2,e-3.2,2.6),this.group.add(i)}this.addCreatureDetail(e)}addCreatureDetail(e){let t=new ua({color:14209209}),n=new ua({color:2434090}),r=new ua({color:7478818,emissive:2425606,emissiveIntensity:.35}),i=(e,t,n,r,i,a,o)=>{let s=new z(new B(e,t,n),r.clone());return s.position.set(i,a,o),this.group.add(s),s},a=this.name===`VOLT SERPENT`||this.name===`DEEP MAW`,o=this.name===`MISSILE MAW`||this.name===`SKY REAVER`||this.name===`CINDER WYRM`,s=this.name===`IRON COLOSSUS`||this.name===`MAGMA GOLEM`||this.name===`TIDE LEVIATHAN`;if(a){for(let r=0;r<5;r++){let a=i(2.5-r*.22,.42,.42,t,0,e-4.2+r*1,2.05);a.rotation.x=.12-r*.025;for(let t of[-1,1]){let a=i(.28,.85+r*.08,.28,n,t*(1.55-r*.08),e-3.9+r,.15);a.rotation.z=t*-.58}}for(let n of[-1,1])for(let r of[0,1]){let a=i(.3,1.05-r*.18,.3,t,n*(.72+r*.38),e-.5,3.05-r*.25);a.rotation.x=.22}return}for(let a=0;a<4;a++){let o=i(1.85-a*.16,.5,.48,a===1?r:t,a%2?.08:-.08,e-5.2+a*1.08,2.65+a*.05);o.rotation.z=(a%2?1:-1)*.045;for(let t of[-1,1]){let r=i(1.65,.36,.42,n,t*1.72,e-5+a*1.08,2.2);r.rotation.z=t*(.22+a*.025)}}if(o)for(let n of[-1,1]){for(let r=0;r<3;r++){let a=i(3.4-r*.65,.25,.28,t,n*(3.8+r*1.45),e-1.8-r*.18,-.6-r*.55);a.rotation.z=n*(.12+r*.08)}for(let r=0;r<3;r++){let a=i(.28,1.15,.28,t,n*(1+r*.34),e-8.2,1.2+r*.35);a.rotation.x=-.5}}else for(let r of[-1,1]){let a=i(2.15,1.25,1.85,s?t:n,r*4,e-2.6,.45);a.rotation.z=r*-.24;let o=i(1.55,1,1.25,n,r*1.85,e-8.1,1);o.rotation.x=-.16;for(let n=0;n<3;n++){let a=i(.34,.42,1+n*.1,t,r*1.85+(n-1)*.5,e-11,2.05);a.rotation.x=-.12}}}corePos(e){return this.weakCore?this.weakCore.getWorldPosition(e):e.copy(this.group.position).setY(this.group.position.y+24),e}updateCore(e){if(!this.weakCore)return;let t=this.weakCore.material;this.vulnerable?(this.weakCore.scale.setScalar(1.5+Math.sin(e*20)*.3),t.color.setHex(12449023),t.emissive.setHex(5104383)):(this.weakCore.scale.setScalar(.85+Math.sin(e*6)*.15),t.color.setHex(16770140),t.emissive.setHex(16762394))}rememberEmissives(){this.group.traverse(e=>{let t=e;if(t.isMesh){let e=t.material;if(!e||!e.emissive)return;e.userData.baseEmissive=e.emissive.getHex()||0}})}updateDeath(e){return this.dying?(this.deathT+=e,this.deathT<1.6?this.group.rotation.z=Math.min(Math.PI/2,this.deathT*1.4):(this.group.position.y-=e*2.5,this.deathT>5&&(this.dead=!0)),!0):!1}};G($u,`PUNISH`,1.4);var ed=2.2,td=class extends $u{constructor(e,t){super(140),G(this,`name`,`GORGOSAUR`),G(this,`reward`,`beam`),G(this,`hitRadius`,19),G(this,`legL`,void 0),G(this,`legR`,void 0),G(this,`tail`,void 0),G(this,`heading`,0),G(this,`stompT`,0),G(this,`retargetT`,0),G(this,`target`,new I);let n=4805450,r=11775637,i=14674416,a=15262934,o=J(4.8,4.2,5.2,n);o.position.set(0,8.6,.8);let s=J(4.4,3.6,4.8,n);s.position.set(0,6.2,-.4);for(let e=0;e<5;e++){let t=J(3.1-e*.2,.8,.6,r);t.position.set(0,5.2+e*1.05,1.8+e*.35),this.group.add(t)}let c=J(2.3,2.4,2.4,n);c.position.set(0,11.2,2.6);let l=J(2.7,2.2,3.4,n);l.position.set(0,12.4,4.4);let u=J(2.9,.7,1.5,n);u.position.set(0,13.4,4.7);let d=J(1.9,1.1,2.4,n);d.position.set(0,12,6.4);let f=J(1.7,.8,2.8,r);f.position.set(0,11,5.9),f.rotation.x=.22;let p=J(.45,.4,.4,16752672,16752672);p.position.set(-1.05,12.9,5.5);let m=p.clone();m.position.x=1.05,this.group.add(c,l,u,d,f,p,m);for(let e=0;e<4;e++){let t=J(.24,.45,.24,a);t.position.set(-.62+e*.41,11.35,7.35),this.group.add(t)}for(let e=0;e<7;e++){let t=1.2+Math.sin(e*1.7)*.5+(e===3?1.1:0),n=J(.5,t,1.1,i);if(n.position.set(0,11.4-e*.55+t*.4,2.6-e*1.7),n.rotation.x=.35,this.group.add(n),e<6){let n=J(.4,t*.55,.8,i);n.position.set(-1.25,10.9-e*.55,1.8-e*1.7),n.rotation.x=.35;let r=n.clone();r.position.x=1.25,this.group.add(n,r)}}for(let e of[-1,1]){let t=J(1,2.2,1,n);t.position.set(e*2.7,8.6,2.2),t.rotation.x=-.5;let r=J(.85,1.6,.85,n);r.position.set(e*2.7,7.3,3.1),this.group.add(t,r);for(let t=0;t<3;t++){let n=J(.2,.55,.2,a);n.position.set(e*2.7-.25+t*.25,6.4,3.3),this.group.add(n)}}let h=e=>{let t=new L;t.position.set(e*2.2,6.4,-.8);let r=J(2.3,3.2,3,n);r.position.y=-1.2;let i=J(1.8,2.8,2.3,n);i.position.set(0,-3.4,.2);let o=J(2.2,1.1,3.1,n);o.position.set(0,-5,.7),t.add(r,i,o);for(let e=0;e<3;e++){let n=J(.4,.5,.8,a);n.position.set(-.7+e*.7,-5.2,2.4),t.add(n)}return t};this.legL=h(-1),this.legR=h(1),this.tail=new L;for(let e=0;e<6;e++){let t=2.4-e*.33,r=J(t,t,3,n);if(r.position.set(0,6-e*.85,-4.8-e*2.5),this.tail.add(r),e<5){let n=J(.4,.9-e*.12,.7,i);n.position.set(0,6-e*.85+t*.62,-4.8-e*2.5),n.rotation.x=.4,this.tail.add(n)}}this.group.add(o,s,this.legL,this.legR,this.tail),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(12),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;if(this.retargetT-=e,this.retargetT<=0){let e=Math.random()*Math.PI*2;this.target.set(n.playerPos.x+Math.sin(e)*30,0,n.playerPos.z+Math.cos(e)*30),this.retargetT=7+Math.random()*5}let r=this.target.x-this.group.position.x,i=this.target.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*1.5),this.group.rotation.y=this.heading,a>4&&!this.vulnerable){let t=4.5*this.pace;this.group.position.x+=Math.sin(this.heading)*t*e,this.group.position.z+=Math.cos(this.heading)*t*e}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);this.group.position.y+=((s>12?0:s)-this.group.position.y)*Math.min(1,e*3);let c=4*this.pace;if(this.legL.rotation.x=Math.sin(t*c)*.5,this.legR.rotation.x=-Math.sin(t*c)*.5,this.tail.rotation.y=Math.sin(t*1.7)*.25,this.telegraph=this.stompT<.5&&this.stompT>0,this.stompT-=e,this.stompT<=0&&!this.vulnerable){this.stompT=1.1/this.tempo;let e=new I(Math.sin(this.heading),0,Math.cos(this.heading)),t=this.group.position.clone().addScaledVector(e,11);t.y=this.group.position.y+8,n.destroyAt(t,8,.5);let r=this.group.position.clone();r.y+=2,n.destroyAt(r,6,.3),this.group.position.distanceTo(n.playerPos)<20&&n.damagePlayer(14),Math.random()<.2&&this.openWindow(1.2)}}},nd=class extends $u{constructor(e,t){super(160),G(this,`name`,`MISSILE MAW`),G(this,`reward`,`thrust`),G(this,`hitRadius`,15),G(this,`orbitA`,Math.random()*Math.PI*2),G(this,`fireT`,3),G(this,`salvo`,0),G(this,`salvoT`,0),G(this,`podL`,void 0),G(this,`podR`,void 0);let n=5982878,r=2894392,i=J(4.5,3.5,5.5,n);i.position.y=8;let a=J(2.2,.8,5.8,r);a.position.y=9.9;let o=J(5.2,1,2.2,r);o.position.set(0,9.8,1.6);let s=J(3.4,1.4,2.4,n);s.position.set(0,10.4,2.8),s.rotation.x=-.25;let c=J(2.6,2,2.8,r);c.position.set(0,9.6,3.4);let l=J(2.9,.6,1.2,n);l.position.set(0,10.5,4.2);let u=J(1.8,.5,.3,16724821,16724821);u.position.set(0,9.8,4.9);let d=J(2,.7,1,1710114);d.position.set(0,8.7,4.6);for(let e=0;e<4;e++){let t=J(.22,.5,.22,15262416);t.position.set(-.75+e*.5,8.8,5),this.group.add(t)}for(let e=0;e<4;e++)for(let t of[-1,1]){let n=J(.5,2.6-e*.3,.6,r);n.position.set(t*2.35,8.2,1.8-e*1.4),this.group.add(n)}this.group.add(a,o,s,l,d),this.podL=J(1.6,1.6,3,r),this.podL.position.set(-3.2,9.6,0),this.podR=this.podL.clone(),this.podR.position.x=3.2;let f=J(1.2,1.2,.4,16742959,16742959);f.position.set(-3.2,9.6,1.6);let p=f.clone();p.position.x=3.2;for(let e of[-1,1]){for(let t=0;t<4;t++){let n=e*3.2+(t%2?.38:-.38),r=9.6+(t<2?.38:-.38),i=J(.44,.44,.5,1315356);i.position.set(n,r,1.75),this.group.add(i)}let t=J(1,.7,1.4,n);t.position.set(e*2.5,9.4,-.2);let r=J(1.7,.3,.5,16761935);r.position.set(e*3.2,10.5,-.8);let i=J(.5,1,1.4,1315356);i.position.set(e*4.05,9.6,-.6),this.group.add(t,r,i)}let m=J(1.2,5,1.6,n);m.position.set(-1.6,4,0);let h=m.clone();h.position.x=1.6;for(let e of[-1,1]){let t=J(1.5,1.1,1.9,r);t.position.set(e*1.6,3.4,.1);let i=J(1,2.2,1.2,n);i.position.set(e*1.6,2.1,.2);let a=J(1.8,.7,2.6,r);a.position.set(e*1.7,.9,.5),this.group.add(t,i,a);for(let t=0;t<3;t++){let n=J(.4,.4,.8,15262416);n.position.set(e*1.7-.5+t*.5,.75,1.9),this.group.add(n)}}let g=J(.9,.6,.9,3794656,3794656);g.position.set(-1.6,1.2,0);let _=g.clone();_.position.x=1.6,this.group.add(i,c,u,this.podL,this.podR,f,p,m,h,g,_),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(11),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;if(!this.vulnerable){this.orbitA+=e*.15*this.pace;let t=n.playerPos.x+Math.sin(this.orbitA)*34,r=n.playerPos.z+Math.cos(this.orbitA)*34;this.group.position.x+=(t-this.group.position.x)*Math.min(1,e*.8),this.group.position.z+=(r-this.group.position.z)*Math.min(1,e*.8)}let r=n.world.groundHeight(this.group.position.x,this.group.position.z,40)+9+Math.sin(t*1.3)*2.5;this.group.position.y+=(r-this.group.position.y)*Math.min(1,e*2);let i=n.playerPos.x-this.group.position.x,a=n.playerPos.z-this.group.position.z;if(this.group.rotation.y=Math.atan2(i,a),this.telegraph=this.fireT<.7&&this.fireT>0,this.fireT-=e,this.fireT<=0&&n.fireRocket&&!this.vulnerable){this.fireT=3.2/this.tempo;let e=this.group.position.clone();e.y+=9.6*ed,n.fireRocket(e,n.playerPos.clone().setY(n.playerPos.y+2)),this.phase>1&&(this.salvo=this.phase===3?3:2,this.salvoT=.22)}if(this.salvo>0&&(this.salvoT-=e,this.salvoT<=0&&n.fireRocket)){this.salvoT=.22,this.salvo--;let e=this.group.position.clone();e.y+=9.6*ed,n.fireRocket(e,n.playerPos.clone().setY(n.playerPos.y+2)),this.salvo===0&&this.openWindow(1.9)}}},rd=class extends $u{constructor(e,t){super(200),G(this,`name`,`VOLT SERPENT`),G(this,`reward`,`nova`),G(this,`hitRadius`,13),G(this,`segments`,[]),G(this,`trail`,[]),G(this,`trailT`,0),G(this,`zapT`,5),G(this,`heading`,0);let n=9072600,r=16310178,i=new L,a=J(3.2,2.6,4,n);a.position.y=3;let o=J(2.4,1.8,2.2,n);o.position.set(0,2.9,2.6);let s=J(1.8,1.2,1.1,r);s.position.set(0,2.8,3.9);for(let e of[-1,1]){let t=J(1.1,.7,2.2,r);t.position.set(e*1.1,4.2,1.4),t.rotation.z=e*-.12;let n=J(.5,1.4,1.6,r);n.position.set(e*1.7,2.6,.9);let a=J(.25,1.9,2.4,3794656,1863544);a.position.set(e*1.9,3.4,-1.1),a.rotation.z=e*-.45,i.add(t,n,a);let o=J(.35,1.1,.35,16773808,16773808);o.position.set(e*1.9,4.4,-1.9),o.rotation.z=e*.5,i.add(o)}let c=J(2.6,.8,3.2,r);c.position.set(0,1.8,.6);let l=J(1.6,.7,1.2,r);l.position.set(0,1.7,2.6);for(let e=0;e<5;e++){let t=-1+e*.5,n=J(.22,.6,.22,16776690);n.position.set(t,2,3.1);let r=J(.2,.5,.2,16776690);r.position.set(t,2.4,2.9),i.add(n,r)}let u=J(.5,.5,.5,3794687,3794687);u.position.set(-1.2,3.6,1.8);let d=u.clone();d.position.x=1.2;let f=J(.5,1.8,.5,16773808,16773808);f.position.set(-1.1,5,-.8),f.rotation.z=.3;let p=f.clone();p.position.x=1.1,p.rotation.z=-.3;for(let e=0;e<5;e++){let t=(e/4-.5)*1.5,n=J(.3,1.5-Math.abs(t)*.5,.3,r);n.position.set(Math.sin(t)*1.5,4.6,-2.4-Math.cos(t)*.4),n.rotation.z=-t*.7,n.rotation.x=-.5,i.add(n)}let m=J(1.2,1.2,1.2,10479871,3794687);m.position.set(0,4,-2.9),i.add(a,o,s,c,l,u,d,f,p,m),this.group.add(i);for(let e=0;e<8;e++){let t=new L,i=2.6-e*.22,a=J(i,i,i+.8,e%2==0?n:r);a.position.y=i/2+.5;let o=J(i*.7,.35,i+.6,r);o.position.y=.5;let s=J(i*.5,.3,i+.4,n);s.position.y=i+.45;let c=J(.4,1.2,.4,3794656,3794656);c.position.y=i+1,t.add(a,o,s,c);for(let e of[-1,1]){let n=J(.22,.9,i*.8,3794656,1863544);n.position.set(e*(i*.5+.1),i*.55,0),n.rotation.z=e*-.6,t.add(n)}if(e%2==0){let e=J(.5,.5,.5,12580095,3794687);e.position.set(0,i*.5+.5,-(i*.5+.3)),t.add(e)}this.segments.push(t)}this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(5),this.rememberEmissives()}addSegmentsTo(e){for(let t of this.segments)e.add(t)}removeSegmentsFrom(e){for(let t of this.segments)e.remove(t)}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e)){for(let t of this.segments)t.position.y-=e*4;return}let r=n.playerPos.x-this.group.position.x,i=n.playerPos.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)+Math.sin(t*2.2)*.7-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*2.5),this.group.rotation.y=this.heading,a>14&&!this.vulnerable){let t=9*this.pace;this.group.position.x+=Math.sin(this.heading)*t*e,this.group.position.z+=Math.cos(this.heading)*t*e}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);this.group.position.y+=((s>14?0:s)-this.group.position.y)*Math.min(1,e*4),this.trailT-=e,this.trailT<=0&&(this.trailT=.09,this.trail.unshift(this.group.position.clone()),this.trail.length>60&&this.trail.pop());for(let e=0;e<this.segments.length;e++){let n=this.trail[Math.min((e+1)*5,this.trail.length-1)];if(n){this.segments[e].position.copy(n),this.segments[e].position.y=n.y+Math.sin(t*6+e)*.4,this.segments[e].scale.setScalar(ed);let r=this.trail[Math.min(e*5,this.trail.length-1)];r&&this.segments[e].lookAt(r.x,this.segments[e].position.y,r.z)}}if(this.telegraph=this.zapT<.7&&this.zapT>0,this.zapT-=e,this.zapT<=0&&a<70&&!this.vulnerable){this.zapT=4/this.tempo;let e=this.phase===3?3:1;for(let t=0;t<e;t++){let e=n.playerPos.clone();t>0&&(e.x+=(Math.random()-.5)*26,e.z+=(Math.random()-.5)*26),n.zapAt&&n.zapAt(e),n.destroyAt(e,3.2,.3),n.playerPos.distanceTo(e)<8&&n.damagePlayer(12)}e>1&&this.openWindow(1.6)}}},id=class extends $u{constructor(e,t){super(260),G(this,`name`,`IRON COLOSSUS`),G(this,`reward`,`shield`),G(this,`hitRadius`,17),G(this,`armL`,void 0),G(this,`armR`,void 0),G(this,`legL`,void 0),G(this,`legR`,void 0),G(this,`throwT`,4),G(this,`stompT`,0),G(this,`heading`,0);let n=9278366,r=12090974,i=3948616,a=J(7,6,4.5,n);a.position.y=9;let o=J(5.5,4,.8,r);o.position.set(0,9,2.4);let s=J(1.6,1.6,.5,16756820,16747055);s.position.set(0,9.5,2.7);let c=J(2.2,1.8,2.2,i);c.position.set(0,13,.8);let l=J(1.6,.4,.3,16724821,16724821);l.position.set(0,13.2,2);let u=J(3,2.5,3,r);u.position.set(-5,11.5,0);let d=u.clone();d.position.x=5,this.armL=J(2.2,6.5,2.4,n),this.armL.position.set(-5.2,7,0),this.armR=this.armL.clone(),this.armR.position.x=5.2;let f=J(2.6,2,2.6,i);f.position.set(-5.2,3.4,0);let p=f.clone();p.position.x=5.2,this.legL=J(2.6,6,3,i),this.legL.position.set(-2,3,0),this.legR=this.legL.clone(),this.legR.position.x=2,this.group.add(a,o,s,c,l,u,d,this.armL,this.armR,f,p,this.legL,this.legR);for(let e of[-1,1]){let t=J(3.4,1.6,3.6,r);t.position.set(e*5,12.6,0);let n=J(3.6,.5,3.8,i);n.position.set(e*5,11.6,0);let a=J(2.2,1.8,2.4,r);a.position.set(e*2.2,5.4,0);let o=J(.5,3.2,.5,i);o.position.set(e*3.4,8,-.9),this.group.add(t,n,a,o);for(let t=0;t<3;t++){let n=J(.35,.35,.35,i);n.position.set(e*5,13.5,-1.2+t*1.2),this.group.add(n)}}for(let e=0;e<4;e++){let t=J(.4,.4,.4,i);t.position.set(-1.5+e%2*3,10.6-Math.floor(e/2)*2.4,2.7),this.group.add(t)}let m=J(1.8,.7,1.4,i);m.position.set(0,12.1,1.4);let h=J(2.6,.6,.6,i);h.position.set(0,14.2,.4),this.group.add(m,h),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(13),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;let r=n.playerPos.x-this.group.position.x,i=n.playerPos.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*1.2),this.group.rotation.y=this.heading,a>26&&!this.vulnerable){let t=2.6*this.pace;this.group.position.x+=Math.sin(this.heading)*t*e,this.group.position.z+=Math.cos(this.heading)*t*e}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);this.group.position.y+=((s>14?0:s)-this.group.position.y)*Math.min(1,e*2.5);let c=2.2*this.pace;if(this.legL.rotation.x=Math.sin(t*c)*.3,this.legR.rotation.x=-Math.sin(t*c)*.3,this.telegraph=this.stompT<.6&&this.stompT>0,this.stompT-=e,this.stompT<=0&&!this.vulnerable){this.stompT=1.6/this.tempo;let e=this.group.position.clone();e.y+=2,n.destroyAt(e,7,.4),a<22&&n.damagePlayer(16)}if(this.telegraph=this.throwT<.8&&this.throwT>0,this.throwT-=e,this.throwT<=0&&n.throwBoulder&&a<90&&!this.vulnerable){this.throwT=5/this.tempo,this.armR.rotation.x=-2.2;let e=this.group.position.clone();e.y+=13*ed/2.2*2.2,n.throwBoulder(e,n.playerPos.clone()),this.openWindow(2.2)}this.armR.rotation.x*=1-Math.min(1,e*2)}},ad=class extends $u{constructor(e,t){super(190),G(this,`name`,`SKY REAVER`),G(this,`reward`,`railgun`),G(this,`hitRadius`,14),G(this,`wingL`,void 0),G(this,`wingR`,void 0),G(this,`orbitA`,Math.random()*Math.PI*2),G(this,`diveT`,6),G(this,`diving`,!1),G(this,`diveDir`,new I),G(this,`diveLife`,0),G(this,`strafeT`,0);let n=4885142,r=12572882,i=J(3.2,1.6,6.5,n);i.position.y=8;let a=J(1.4,1.3,4.6,r);a.position.set(0,6.9,.6);let o=J(2.6,.8,5.5,r);o.position.y=7.2;let s=J(4,1.2,2.6,n);s.position.set(0,8.5,1);let c=J(1.5,1.2,1.6,n);c.position.set(0,8.4,3);let l=J(1.8,1.2,2.2,n);l.position.set(0,8.2,4);let u=J(.9,.7,1.6,15917752);u.position.set(0,8.05,5.4);let d=J(.5,.5,.6,15917752);d.position.set(0,7.85,6.3);let f=J(.3,1.5,2,r);f.position.set(0,9.2,3.4),f.rotation.x=.3;let p=J(1.4,.35,.3,16769359,16769359);p.position.set(0,8.4,5.1),this.group.add(a,s,c,u,d,f),this.wingL=J(7,.4,4,n),this.wingL.geometry.translate(-3.5,0,0),this.wingL.position.set(-1.4,8.2,0),this.wingR=J(7,.4,4,n),this.wingR.geometry.translate(3.5,0,0),this.wingR.position.set(1.4,8.2,0);for(let[e,t]of[[this.wingL,-1],[this.wingR,1]]){let i=J(7,.7,.9,r);i.geometry.translate(t*3.5,0,0),i.position.set(0,.15,1.5);let a=J(.5,.5,1.4,15917752);a.position.set(t*6.6,.15,1.9),e.add(i,a);for(let r=0;r<4;r++){let i=1.4+r*1.5,a=J(1.4,.3,2.6-r*.35,n);a.position.set(t*i,0,-2.2-r*.25),a.rotation.y=t*(.1+r*.05),e.add(a)}}let m=J(.8,.5,4,n);m.position.set(0,8,-5);let h=J(.4,1.8,1.6,r);h.position.set(0,9,-5.5);for(let e of[-.35,0,.35]){let t=J(.9,.28,2.6,n);t.position.set(Math.sin(e)*1.5,7.95,-6.6),t.rotation.y=e,this.group.add(t)}for(let e of[-1,1]){let t=J(.7,1.6,.7,n);t.position.set(e*1,6.4,.4),t.rotation.x=.5;let i=J(.6,.5,1.3,r);i.position.set(e*1,5.6,1.1),this.group.add(t,i);for(let t=0;t<3;t++){let n=J(.18,.5,.18,15917752);n.position.set(e*1-.3+t*.3,5.2,1.6),n.rotation.x=.6,this.group.add(n)}}this.group.add(i,o,l,p,this.wingL,this.wingR,m,h),this.group.scale.setScalar(ed),this.group.position.set(e,26,t),this.addCore(9.5),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;if(this.diving){if(this.diveLife-=e,this.group.position.addScaledVector(this.diveDir,34*e),this.wingL.rotation.z=.85,this.wingR.rotation.z=-.85,this.strafeT-=e,this.strafeT<=0){this.strafeT=.22;let e=this.group.position.clone();e.y=Math.max(2,e.y-4),n.destroyAt(e,4.5,.3),this.group.position.distanceTo(n.playerPos)<16&&n.damagePlayer(10)}let t=n.world.groundHeight(this.group.position.x,this.group.position.z,40);(this.diveLife<=0||this.group.position.y<t+6)&&(this.diving=!1,this.diveT=(5+Math.random()*3)/this.tempo,this.openWindow(2.4));return}this.orbitA+=e*.35*this.pace;let r=n.playerPos.x+Math.sin(this.orbitA)*46,i=n.playerPos.z+Math.cos(this.orbitA)*46;this.group.position.x+=(r-this.group.position.x)*Math.min(1,e*1.2),this.group.position.z+=(i-this.group.position.z)*Math.min(1,e*1.2);let a=n.world.groundHeight(this.group.position.x,this.group.position.z,40)+(this.vulnerable?11:30)+Math.sin(t*.9)*3;this.group.position.y+=(a-this.group.position.y)*Math.min(1,e*1.5);let o=n.playerPos.x-this.group.position.x,s=n.playerPos.z-this.group.position.z;this.group.rotation.y=Math.atan2(o,s),this.wingL.rotation.z=Math.sin(t*2.5)*.35,this.wingR.rotation.z=-Math.sin(t*2.5)*.35,this.diveT-=e,this.diveT<=0&&(this.diving=!0,this.diveLife=3.2,this.diveDir.copy(n.playerPos).sub(this.group.position),this.diveDir.y-=4,this.diveDir.normalize())}},od=class extends $u{constructor(e,t){super(170),G(this,`name`,`CRIMSON MANTIS`),G(this,`reward`,`blades`),G(this,`hitRadius`,12),G(this,`scytheL`,void 0),G(this,`scytheR`,void 0),G(this,`legPhase`,0),G(this,`lungeT`,3),G(this,`slashT`,-1),G(this,`combo`,0),G(this,`heading`,0);let n=12600127,r=15780274,i=J(2.4,2.2,4.5,n);i.position.y=7;let a=J(2,1.8,3.5,r);a.position.set(0,6.6,-3.5),a.rotation.x=-.25;let o=J(1.2,1.2,1.6,n);o.position.set(0,8.2,2.6);let s=J(1.8,1.4,1.6,n);s.position.set(0,9,3.6);let c=J(.55,.55,.4,9371584,9371584);c.position.set(-.65,9.2,4.3);let l=c.clone();l.position.x=.65;let u=J(.15,1.6,.15,r);u.position.set(-.5,10.2,3.9),u.rotation.z=.4;let d=u.clone();d.position.x=.5,d.rotation.z=-.4;let f=e=>{let t=new L;t.position.set(e*1.4,8,2);let i=J(.6,2.2,.6,n);i.position.y=-1;let a=J(.35,3.6,.7,r);a.position.set(0,-2.2,1),a.rotation.x=.5;let o=J(.25,1.2,.4,16777215,6693410);return o.position.set(0,-3.8,2),o.rotation.x=.8,t.add(i,a,o),t};this.scytheL=f(-1),this.scytheR=f(1);for(let e=0;e<4;e++){let t=J(.4,6.5,.4,n);t.position.set(e%2==0?-1.2:1.2,3.4,e<2?1:-2),t.rotation.z=(e%2==0?1:-1)*.25,this.group.add(t)}this.group.add(i,a,o,s,c,l,u,d,this.scytheL,this.scytheR);for(let e=0;e<4;e++){let t=J(1.9-e*.22,.5,.8,r);t.position.set(0,6.5-e*.12,-2.4-e*.95),this.group.add(t)}for(let e of[-1,1]){let t=J(1.1,.35,3.6,n);t.position.set(e*.85,8,-1.6),t.rotation.z=e*.18;let i=J(.5,.5,.4,2823186);i.position.set(e*.72,9.35,4.15);let a=J(.25,.7,.5,r);a.position.set(e*.4,8.5,4.2),a.rotation.x=.4,this.group.add(t,i,a);for(let t=0;t<4;t++){let n=J(.16,.42,.16,r);n.position.set(e*1.4-e*.28,6.6-t*.75,2.7+t*.28),this.group.add(n)}}this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(9),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;let r=n.playerPos.x-this.group.position.x,i=n.playerPos.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*3),this.group.rotation.y=this.heading,a>16&&!this.vulnerable){let t=11*this.pace;this.group.position.x+=Math.sin(this.heading)*t*e,this.group.position.z+=Math.cos(this.heading)*t*e,this.legPhase+=e*10*this.pace}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);this.group.position.y+=((s>14?0:s)-this.group.position.y)*Math.min(1,e*4);let c=Math.sin(t*3)*.1;if(this.group.rotation.z=c*.3,this.slashT>=0){this.slashT+=e/.5;let t=Math.min(1,this.slashT),r=Math.sin(t*Math.PI)*2.2;if(this.scytheL.rotation.x=-.6-r,this.scytheR.rotation.x=-.6-r,t>.45&&t<.6){let e=this.group.position.clone(),t=new I(Math.sin(this.heading),0,Math.cos(this.heading));e.addScaledVector(t,14),e.y+=6,n.destroyAt(e,4,.25),a<26&&n.damagePlayer(13)}this.slashT>=1&&(this.slashT=-1,this.combo--,this.combo>0?this.slashT=0:this.openWindow(1.4))}else this.scytheL.rotation.x=-.6+Math.sin(t*2)*.1,this.scytheR.rotation.x=-.6-Math.sin(t*2)*.1,this.lungeT-=e,this.lungeT<=0&&a<30&&!this.vulnerable&&(this.lungeT=2.2/this.tempo,this.combo=this.phase===3?3:this.phase===2?2:1,this.slashT=0)}},sd=class extends $u{constructor(e,t){super(240),G(this,`name`,`MAGMA GOLEM`),G(this,`reward`,`quake`),G(this,`hitRadius`,16),G(this,`armL`,void 0),G(this,`armR`,void 0),G(this,`legL`,void 0),G(this,`legR`,void 0),G(this,`core`,void 0),G(this,`slamT`,3),G(this,`throwT`,5),G(this,`heading`,0);let n=5917252,r=8016712,i=16742959,a=J(6,5.5,4,n);a.position.y=9;let o=J(1.2,3.2,.4,i,i);o.position.set(-1.4,9,2.1),o.rotation.z=.3;let s=J(.9,2.4,.4,i,i);s.position.set(1.5,8.4,2.1),s.rotation.z=-.2,this.core=J(1.8,1.8,.6,16765024,16756768),this.core.position.set(0,9.6,2.2);let c=J(2.4,2,2.4,r);c.position.set(0,12.8,.4);let l=J(.6,.5,.3,i,i);l.position.set(-.6,13,1.6);let u=l.clone();u.position.x=.6;let d=J(2.6,2.6,3.2,r);d.position.set(-4.2,11.5,0);let f=d.clone();f.position.x=4.2,this.armL=J(2.2,6.5,2.4,n),this.armL.position.set(-4.4,7.5,0),this.armR=this.armL.clone(),this.armR.position.x=4.4;let p=J(3,2.6,3,r);p.position.set(-4.4,3.6,0);let m=p.clone();m.position.x=4.4,this.legL=J(2.6,6,3,n),this.legL.position.set(-1.8,3,0),this.legR=this.legL.clone(),this.legR.position.x=1.8,this.group.add(a,o,s,this.core,c,l,u,d,f,this.armL,this.armR,p,m,this.legL,this.legR);for(let e of[-1,1]){for(let t=0;t<3;t++){let n=J(1.6,.7,2-t*.35,r);n.position.set(e*(3+t*.35),12.4-t*1.5,-.6),n.rotation.z=e*(.25+t*.12),this.group.add(n)}let t=J(.3,3,.3,i,16734751);t.position.set(e*2.4,9.4,-1.9);let n=J(1.4,.8,1.4,r);n.position.set(e*4.4,4.6,.6),this.group.add(t,n)}for(let e=0;e<4;e++){let t=J(.6,1.4-e*.2,.6,n);t.position.set(-1.2+e*.8,14.2,-1),t.rotation.z=(e-1.5)*.25,this.group.add(t)}let h=J(1.6,.7,1.2,n);h.position.set(0,12.1,1.2);let g=J(1,.4,.5,i,16734751);g.position.set(0,12.3,1.6),this.group.add(h,g),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(12),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;let r=n.playerPos.x-this.group.position.x,i=n.playerPos.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*1.1),this.group.rotation.y=this.heading,a>22&&!this.vulnerable){let n=3.4*this.pace;this.group.position.x+=Math.sin(this.heading)*n*e,this.group.position.z+=Math.cos(this.heading)*n*e,this.legL.rotation.x=Math.sin(t*3*this.pace)*.4,this.legR.rotation.x=-Math.sin(t*3*this.pace)*.4}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);this.group.position.y+=((s>14?0:s)-this.group.position.y)*Math.min(1,e*2.5);let c=.7+Math.sin(t*4)*.3;if(this.core.material.emissiveIntensity=c,this.telegraph=this.slamT<.7&&this.slamT>0,this.slamT-=e,this.slamT<=0&&a<40&&!this.vulnerable){this.slamT=3.5/this.tempo,this.armL.rotation.x=1.4,this.armR.rotation.x=1.4;let e=this.group.position.clone();e.y+=2,n.destroyAt(e,8,.5);let t=this.phase===3?10:6,r=this.phase===3?20:14;for(let i=0;i<t;i++){let a=i/t*Math.PI*2,o=e.clone();o.x+=Math.sin(a)*r,o.z+=Math.cos(a)*r,n.destroyAt(o,4,.3)}a<30&&n.damagePlayer(18),this.openWindow(1.8)}if(this.armL.rotation.x*=1-Math.min(1,e*2.5),this.armR.rotation.x*=1-Math.min(1,e*2.5),this.telegraph=this.throwT<.8&&this.throwT>0,this.throwT-=e,this.throwT<=0&&n.throwBoulder&&a>24&&a<95&&!this.vulnerable){this.throwT=4.5/this.tempo;let e=this.group.position.clone();e.y+=26,n.throwBoulder(e,n.playerPos.clone())}}},cd=class extends $u{constructor(e,t){super(180),G(this,`name`,`DEEP MAW`),G(this,`reward`,`vulcan`),G(this,`hitRadius`,12),G(this,`segs`,[]),G(this,`mouth`,void 0),G(this,`submerged`,!0),G(this,`phaseT`,2.5),G(this,`surfaceY`,0);let n=6978138,r=13359280,i=14177870;this.mouth=new L;for(let e=0;e<6;e++){let t=3.2-e*.3,i=J(t,2.2,t,e%2==0?n:r);i.position.y=3+e*2.1,this.mouth.add(i),this.segs.push(i)}let a=J(2.4,1.2,2.4,i,5574929);a.position.y=16,this.mouth.add(a);for(let e=0;e<8;e++){let t=e/8*Math.PI*2,n=J(.5,1.6,.5,16052448);n.position.set(Math.sin(t)*1.7,16.6,Math.cos(t)*1.7),this.mouth.add(n)}this.group.add(this.mouth);for(let e=0;e<3;e++){let t=2.2-e*.45,n=16.2-e*1;for(let i=0;i<9;i++){let a=i/9*Math.PI*2+e*.3,o=J(.35,.9-e*.15,.35,r);o.position.set(Math.sin(a)*t,n,Math.cos(a)*t),o.rotation.x=Math.cos(a)*.4,o.rotation.z=-Math.sin(a)*.4,this.group.add(o)}}for(let e of[-1,1]){let t=J(.7,3,.9,n);t.position.set(e*2.6,15.2,.4),t.rotation.z=e*.35;let i=J(.5,1.2,.6,r);i.position.set(e*3.3,16.8,.4),i.rotation.z=e*.7,this.group.add(t,i)}let o=J(2,1.6,2,i,5905432);o.position.y=14.6,this.group.add(o),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(7),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;let r=n.world.groundHeight(this.group.position.x,this.group.position.z,20);if(this.surfaceY=r>14?0:r,this.phaseT-=e,this.submerged){let t=n.playerPos.x-this.group.position.x,r=n.playerPos.z-this.group.position.z,i=Math.hypot(t,r);if(i>2){let n=13*this.pace;this.group.position.x+=t/i*n*e,this.group.position.z+=r/i*n*e}this.group.position.y=this.surfaceY-30,Math.random()<.25&&n.destroyAt(this.group.position.clone().setY(this.surfaceY+1),2.4,.15),this.phaseT<=0&&i<30&&(this.submerged=!1,this.phaseT=3.5,n.destroyAt(this.group.position.clone().setY(this.surfaceY+2),7,.5),i<22&&n.damagePlayer(20),this.openWindow(3.5))}else{let n=this.surfaceY;this.group.position.y+=(n-this.group.position.y)*Math.min(1,e*6);for(let e=0;e<this.segs.length;e++)this.segs[e].position.x=Math.sin(t*4+e*.6)*.6,this.segs[e].position.z=Math.cos(t*4+e*.6)*.6;this.phaseT<=0&&(this.submerged=!0,this.phaseT=(2+Math.random()*1.5)/this.tempo)}}},ld=class extends $u{constructor(e,t){super(185),G(this,`name`,`CINDER WYRM`),G(this,`reward`,`flamer`),G(this,`hitRadius`,13),G(this,`wingL`,void 0),G(this,`wingR`,void 0),G(this,`maw`,void 0),G(this,`orbitA`,Math.random()*Math.PI*2),G(this,`breathT`,3),G(this,`breathing`,0);let n=9187108,r=15770186,i=3810336,a=J(3,2.6,6.5,n);a.position.y=8;let o=J(1.8,1.8,2.4,n);o.position.set(0,8.8,4);let s=J(2.2,1.8,2.6,n);s.position.set(0,9.2,6),this.maw=J(1.8,.9,1.4,16762458,16742959),this.maw.position.set(0,8.7,7.2);let c=J(.4,.4,.3,16769359,16769359);c.position.set(-.7,9.6,6.9);let l=c.clone();l.position.x=.7;let u=J(.35,1.4,.35,i);u.position.set(-.7,10.4,5.4),u.rotation.z=.35;let d=u.clone();d.position.x=.7,d.rotation.z=-.35;let f=J(2.2,.6,5.5,r,16747055);f.position.set(0,6.7,.4),this.wingL=J(7,.3,4.5,n),this.wingL.geometry.translate(-3.5,0,0),this.wingL.position.set(-1.3,9,0),this.wingR=J(7,.3,4.5,n),this.wingR.geometry.translate(3.5,0,0),this.wingR.position.set(1.3,9,0);let p=J(1.2,1.2,5,n);p.position.set(0,7.8,-5.5);let m=J(1.6,.4,1.6,r,16747055);m.position.set(0,7.8,-8),this.group.add(a,o,s,this.maw,c,l,u,d,f,this.wingL,this.wingR,p,m);for(let e=0;e<7;e++){let t=J(.3,1.3-e*.13,.4,i);t.position.set(0,9.4-e*.25,3-e*1.5),t.rotation.x=.3,this.group.add(t)}for(let e of[-1,1]){for(let t=0;t<3;t++){let n=J(4.2-t*.8,.22,.35,i);n.position.set(e*(2.4+t*.5),9,-.8-t*1.1),n.rotation.y=e*(.12+t*.16),this.group.add(n)}let t=J(.28,.9,.28,i);t.position.set(e*.8,8.4,6.4),t.rotation.z=e*.4;let n=J(.35,1.1,2.4,r,12871199);n.position.set(e*1.55,7.6,.6);let a=J(.5,1.1,.5,i);a.position.set(e*1.3,6.2,2.2),this.group.add(t,n,a)}let h=J(1.1,.7,1.3,r,16742959);h.position.set(0,8.3,6.2),this.group.add(h),this.group.scale.setScalar(ed),this.group.position.set(e,22,t),this.addCore(8),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;if(!this.vulnerable){this.orbitA+=e*.3*this.pace;let t=n.playerPos.x+Math.sin(this.orbitA)*40,r=n.playerPos.z+Math.cos(this.orbitA)*40;this.group.position.x+=(t-this.group.position.x)*Math.min(1,e*1.1),this.group.position.z+=(r-this.group.position.z)*Math.min(1,e*1.1)}let r=n.world.groundHeight(this.group.position.x,this.group.position.z,40)+(this.vulnerable?9:20)+Math.sin(t*.8)*3;this.group.position.y+=(r-this.group.position.y)*Math.min(1,e*1.5);let i=n.playerPos.x-this.group.position.x,a=n.playerPos.z-this.group.position.z;if(this.group.rotation.y=Math.atan2(i,a),this.wingL.rotation.z=Math.sin(t*3)*.4,this.wingR.rotation.z=-Math.sin(t*3)*.4,this.telegraph=this.breathT<.8&&this.breathT>0,this.breathT-=e,this.breathT<=0&&this.breathing<=0&&!this.vulnerable&&(this.breathing=this.phase===3?2.6:this.phase===2?2:1.6,this.breathT=(5+Math.random()*2)/this.tempo),this.maw.material.emissiveIntensity=this.breathing>0?1.4:1,this.breathing>0){let t=this.breathing;this.breathing-=e,t>0&&this.breathing<=0&&this.openWindow(2);let r=this.group.position.clone();r.y+=8;let i=n.playerPos.clone().setY(n.playerPos.y+4).sub(r).normalize();for(let e=8;e<=46;e+=6){let t=r.clone().addScaledVector(i,e);n.igniteAt&&n.igniteAt(t,4),n.destroyAt&&Math.random()<.15&&n.destroyAt(t,2,.1)}r.clone().addScaledVector(i,r.distanceTo(n.playerPos)).distanceTo(n.playerPos)<12&&n.damagePlayer(14*e)}}},ud=class extends $u{constructor(e,t){super(230),G(this,`name`,`TIDE LEVIATHAN`),G(this,`reward`,`aqua`),G(this,`hitRadius`,16),G(this,`finL`,void 0),G(this,`finR`,void 0),G(this,`cannon`,void 0),G(this,`heading`,0),G(this,`fireT`,2.5),G(this,`burst`,0),G(this,`shotT`,0);let n=3108748,r=12576494,i=5220548,a=J(5,5.5,5,n);a.position.y=9;let o=J(3.6,3.6,4,r);o.position.set(0,7.5,1.4);let s=J(3,2.6,3,n);s.position.set(0,13,1.2);let c=J(2.6,.9,2.6,r);c.position.set(0,11.6,1.8);let l=J(.5,.5,.4,10484991,10484991);l.position.set(-.9,13.4,2.5);let u=l.clone();u.position.x=.9;let d=J(.4,2.2,2.6,i);d.position.set(0,14.6,.6),this.finL=J(.5,3.5,3,i),this.finL.position.set(-2.8,9.5,0),this.finL.rotation.z=.4,this.finR=this.finL.clone(),this.finR.position.x=2.8,this.finR.rotation.z=-.4;let f=J(1.8,4.5,1.8,n);f.position.set(3.2,8,1.5),this.cannon=J(1.6,1.6,3.2,10484991,3121104),this.cannon.position.set(3.2,6.5,3.4);let p=J(2,5.5,2.4,n);p.position.set(-1.6,4,0);let m=p.clone();m.position.x=1.6,this.group.add(a,o,s,c,l,u,d,this.finL,this.finR,f,this.cannon,p,m);for(let e of[-1,1]){for(let t=0;t<3;t++){let n=J(.25,1.4-t*.2,.8,1194570);n.position.set(e*2.15,11.6,.4-t*.9),this.group.add(n)}let t=J(.2,1.8,2.6,i);t.position.set(e*3.4,9.5,-1.2),t.rotation.z=e*-.4;let n=J(.6,.5,1.2,r);n.position.set(e*2,4,1.8),this.group.add(t,n)}for(let e=0;e<5;e++){let t=J(.4,1.6-e*.2,.5,i);t.position.set(0,12.4-e*1.1,-2-e*.25),t.rotation.x=.35,this.group.add(t)}let h=J(.3,1.6,.3,r);h.position.set(-.9,11.2,2.3),h.rotation.x=.5;let g=h.clone();g.position.x=.9,this.group.add(h,g),this.group.scale.setScalar(ed),this.group.position.set(e,0,t),this.addCore(9),this.rememberEmissives()}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;let r=n.playerPos.x-this.group.position.x,i=n.playerPos.z-this.group.position.z,a=Math.hypot(r,i),o=Math.atan2(r,i)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(this.heading+=o*Math.min(1,e*1.3),this.group.rotation.y=this.heading,a>30&&!this.vulnerable){let t=4*this.pace;this.group.position.x+=Math.sin(this.heading)*t*e,this.group.position.z+=Math.cos(this.heading)*t*e}let s=n.world.groundHeight(this.group.position.x,this.group.position.z,20);if(this.group.position.y+=((s>14?0:s)-this.group.position.y)*Math.min(1,e*2.5),this.finL.rotation.x=Math.sin(t*2)*.2,this.finR.rotation.x=-Math.sin(t*2)*.2,this.telegraph=this.fireT<.7&&this.fireT>0,this.fireT-=e,this.fireT<=0&&this.burst<=0&&!this.vulnerable&&(this.burst=this.phase===3?2:this.phase===2?1.6:1.2,this.shotT=0,this.fireT=4.5/this.tempo),this.cannon.material.emissiveIntensity=this.burst>0?1.5:1,this.burst>0){let t=this.burst;if(this.burst-=e,t>0&&this.burst<=0&&this.openWindow(1.7),this.shotT-=e,this.shotT<=0){this.shotT=.24;let e=n.playerPos.clone();e.x+=(Math.random()-.5)*24,e.z+=(Math.random()-.5)*24,n.floodAt&&n.floodAt(e,5);let t=n.world.groundHeight(e.x,e.z,20);n.destroyAt(e.clone().setY(t+4),3.5,.2),e.distanceTo(n.playerPos)<6&&n.damagePlayer(7)}}}},dd=[[16053752,1907236],[14760752,7152466],[2678770,11565311],[6553475,13081599],[16720968,13081599],[9015709,4867669],[3816773,2433580],[2303531,1315096],[16765774,13672703],[16768105,13672703]],fd=240,pd=.28,md=9,hd=class extends $u{constructor(e,t){super(900),G(this,`name`,`REVENANT`),G(this,`reward`,`repair`),G(this,`hitRadius`,11),G(this,`model`,new Qu),G(this,`inner`,new L),G(this,`yaw`,0),G(this,`state`,`stalk`),G(this,`stateT`,1.2),G(this,`slashes`,0),G(this,`shots`,0),G(this,`shotT`,0),G(this,`vel`,new I),G(this,`orbitDir`,Math.random()<.5?1:-1),G(this,`bob`,0),G(this,`plowT`,0),G(this,`corruption`,new L),G(this,`learned`,new Map),G(this,`lastMult`,1),G(this,`adaptedTo`,null),G(this,`announced`,new Set),G(this,`resistFloor`,0),this.inner.scale.setScalar(1.18/ed),this.model.setCrimsonEdge(!0),this.inner.add(this.model.group),this.buildCorruption(),this.model.group.add(this.corruption),this.group.add(this.inner);let n=new Map(dd);this.model.group.traverse(e=>{let t=e;if(!t.isMesh)return;let r=t.material.clone();if(r.color){let e=n.get(r.color.getHex());e===void 0?r.color.multiplyScalar(.32):r.color.setHex(e)}r.emissive&&r.emissive.getHex()!==0&&r.emissive.setHex(8011728),t.material=r}),this.group.position.set(e,0,t),this.centerY=6.5,this.addCore(4.8,-.75),this.weakCore.scale.setScalar(.42),this.rememberEmissives()}buildCorruption(){let e=new la({color:3938124,emissive:8070312,emissiveIntensity:1.15,metalness:.48,roughness:.3,flatShading:!0}),t=new la({color:1051669,metalness:.7,roughness:.34,flatShading:!0}),n=(n,r,i,a,o,s,c=0,l=0,u=!1)=>{let d=new z(new qi(.5,1.8,4),u?t:e);d.position.set(n,r,i),d.scale.set(a,o,s),d.rotation.set(c,0,l),d.castShadow=!0,this.corruption.add(d)};n(-.47,5.02,-.05,.22,.5,.22,-.08,-.28),n(.5,4.9,-.18,.18,.38,.18,.12,.38,!0),n(-1.35,4.15,-.12,.42,.68,.42,.25,-.92),n(1.42,4,-.28,.34,.56,.34,-.2,.98),n(-.72,3.75,-.72,.3,.62,.3,-.75,-.28,!0),n(.58,3.55,-.78,.26,.5,.26,-.68,.25),n(-.67,1.25,-.05,.24,.42,.24,0,-.88),n(.65,.72,-.12,.2,.36,.2,0,.9,!0)}resistTo(e){let t=this.learned.get(e)??0,n=Math.max(pd,this.resistFloor);return Math.max(n,1-t/fd*(1-n))}adaptionTo(e){return Math.min(1,(this.learned.get(e)??0)/fd)}takeDamage(e,t){if(this.dying)return 0;let n=1;return t&&(n=this.resistTo(t),this.learned.set(t,(this.learned.get(t)??0)+e),!this.announced.has(t)&&this.adaptionTo(t)>=.85&&(this.announced.add(t),this.adaptedTo=t)),this.lastMult=n,super.takeDamage(e*n)}onPhase(e){this.state=`rush`,this.stateT=.9,e===3&&(this.orbitDir=Math.random()<.5?1:-1)}get reiPattern(){return this.phase===3}update(e,t,n){if(this.updateFlash(e),this.updateDeath(e))return;for(let[t,n]of this.learned){let r=n-md*e;r<=0?(this.learned.delete(t),this.announced.delete(t)):this.learned.set(t,r)}let r=this.group.position,i=n.playerPos.x-r.x,a=n.playerPos.z-r.z,o=Math.hypot(i,a),s=Math.atan2(i,a)-this.yaw;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;switch(this.yaw+=s*Math.min(1,e*(this.vulnerable?2:7)),this.group.rotation.y=this.yaw,this.stateT-=e,this.vel.multiplyScalar(Math.max(0,1-e*3.4)),this.state){case`stalk`:this.stalk(e,o);break;case`rush`:this.rush(e,i,a,o);break;case`slash`:this.slash(e,o,n);break;case`shoot`:this.shoot(e,n);break;case`recover`:this.stateT<=0&&this.pick(o);break}r.x+=this.vel.x*e,r.z+=this.vel.z*e;let c=n.world.groundHeight(r.x,r.z,14),l=c>14?0:c,u=n.playerPos.y-l>16?Math.min(n.playerPos.y-2,l+70):l;r.y+=(u-r.y)*Math.min(1,e*(u>r.y?1.5:4));let d=r.y>l+4;this.model.setThrusters(d),this.model.flying=d,this.bob+=e;let f=Math.hypot(this.vel.x,this.vel.z);if(this.model.animate(t,f,!d,e),this.inner.position.y=Math.sin(this.bob*3)*.06,this.corruption.rotation.y=Math.sin(t*1.7)*.012,this.plowT-=e,f>14&&this.plowT<=0){this.plowT=.1;let e=r.clone();e.y+=7,e.x+=this.vel.x/f*9,e.z+=this.vel.z/f*9,n.destroyAt(e,7,.12)}}stalk(e,t){let n=t>(this.reiPattern?26:42)?1:-.55,r=Math.sin(this.yaw),i=Math.cos(this.yaw),a=(this.reiPattern?21:15)*this.pace;this.vel.x+=(r*n+i*this.orbitDir*.85)*a*e*3,this.vel.z+=(i*n-r*this.orbitDir*.85)*a*e*3,this.telegraph=this.stateT<.45,this.stateT<=0&&this.pick(t)}rush(e,t,n,r){if(this.telegraph=!1,r>1){let i=78*this.pace;this.vel.x+=t/r*i*e*4,this.vel.z+=n/r*i*e*4}this.model.dashT=.2,(this.stateT<=0||r<20)&&(this.state=`slash`,this.slashes=this.phase===3?4:this.phase===2?3:2,this.stateT=0)}slash(e,t,n){if(this.telegraph=!1,!(this.stateT>0)){if(this.slashes<=0){this.state=`recover`,this.stateT=this.phase===3?.75:1.15,this.openWindow(this.phase===3?.85:1.3);return}if(this.slashes--,this.stateT=.42/this.tempo,this.model.startSwing(this.slashes===0?2:this.slashes%2),t<26){n.damagePlayer(this.phase===3?15:11);let e=new I(Math.sin(this.yaw),0,Math.cos(this.yaw)),t=this.group.position.clone().addScaledVector(e,16);t.y+=6,n.destroyAt(t,4.5,.25)}}}shoot(e,t){if(this.telegraph=this.shots>0&&this.shotT>.16,this.shotT-=e,this.shotT>0)return;if(this.shots<=0){this.state=`recover`,this.stateT=.8,this.openWindow(1.1);return}this.shots--,this.shotT=.26/this.tempo;let n=this.group.position.clone();n.y+=7.5,this.model.fireRifle(n),t.fireRocket&&t.fireRocket(n,t.playerPos.clone().setY(t.playerPos.y+3))}pick(e){if(this.reiPattern){this.state=`rush`,this.stateT=1.1;return}let t=Math.random();e>60&&t<.55?(this.state=`shoot`,this.shots=this.phase===2?4:3,this.shotT=.2):t<.75?(this.state=`rush`,this.stateT=1.2):(this.state=`stalk`,this.stateT=1.1+Math.random()*.9,this.orbitDir=Math.random()<.5?1:-1)}},gd=[{d:[1,0,0],s:.8,v:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]]},{d:[-1,0,0],s:.8,v:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]]},{d:[0,1,0],s:1,v:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]]},{d:[0,-1,0],s:.5,v:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},{d:[0,0,1],s:.7,v:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]]},{d:[0,0,-1],s:.7,v:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]]}],_d=new R;function vd(e,t,n){let r=e.getChunk(t,n),i=[],a=[],o=[],s=[],c=[],l=t*32,u=n*32;for(let t=0;t<96;t++)for(let n=0;n<32;n++)for(let d=0;d<32;d++){let f=r[(t*32+n)*32+d];if(f===H.Air)continue;let p=l+d,m=u+n;for(let l of gd){let u=d+l.d[0],h=t+l.d[1],g=n+l.d[2],_;if(_=u<0||u>=32||g<0||g>=32?e.getBlock(p+l.d[0],h,m+l.d[2]):h<0?H.Dirt:h>=96?H.Air:r[(h*32+g)*32+u],!(f===H.Water||f===H.Puddle?_===H.Air:_===H.Air||_===H.Water||_===H.Puddle))continue;let v=i.length/3,y=f===H.NeonCyan||f===H.NeonPink||f===H.WindowLit||f===H.Lantern||f===H.LightRed||f===H.LightAmber||f===H.LightGreen,b=.92+.08*Fl(p,t,m);_d.setHex(U[f]);let x=(y?1.15:l.s)*b,S=Math.min(1,_d.r*x),C=Math.min(1,_d.g*x),w=Math.min(1,_d.b*x),T=+!!y;for(let e of l.v)i.push(d+e[0],t+e[1],n+e[2]),a.push(l.d[0],l.d[1],l.d[2]),o.push(S,C,w),s.push(T);c.push(v,v+1,v+2,v,v+2,v+3)}}if(i.length===0)return null;let d=new Gr;return d.setAttribute(`position`,new Nr(i,3)),d.setAttribute(`normal`,new Nr(a,3)),d.setAttribute(`color`,new Nr(o,3)),d.setAttribute(`aGlow`,new Nr(s,1)),d.setIndex(c),d}var yd=6,bd=4,xd=2.5,Sd=4.5,Cd=5.5,wd=class{makeMaterial(){let e=new ua({vertexColors:!0});return e.onBeforeCompile=e=>{e.uniforms.uNight=this.nightAmount,e.vertexShader=`attribute float aGlow;
varying float vGlow;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vGlow = aGlow;`),e.fragmentShader=`uniform float uNight;
varying float vGlow;
`+e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance += vGlow * uNight * vec3(1.0, 0.84, 0.52);`)},e}constructor(e,t,n=!1){G(this,`world`,void 0),G(this,`scene`,void 0),G(this,`lastBudgetMs`,0),G(this,`ringCursor`,0),G(this,`meshR`,void 0),G(this,`dataR`,void 0),G(this,`dropR`,void 0),G(this,`meshes`,new Map),G(this,`nightAmount`,{value:0}),G(this,`material`,this.makeMaterial()),G(this,`dirty`,new Set),this.world=e,this.scene=t,this.meshR=n?bd:yd,this.dataR=this.meshR+1,this.dropR=this.meshR+2}get viewDistance(){return this.meshR*32}update(e,t){let n=Math.floor(e/32),r=Math.floor(t/32),i=performance.now(),a=()=>performance.now()-i;this.lastBudgetMs=0;let o=0;for(let e of this.dirty){if(o>=6||a()>xd)break;this.dirty.delete(e);let[t,i]=e.split(`,`).map(Number);Math.abs(t-n)>this.meshR||Math.abs(i-r)>this.meshR||(this.buildMesh(t,i),o++)}let s=0;for(let e=0;e<=this.meshR&&s<3;e++)for(let t=-e;t<=e&&s<3;t++)for(let i=-e;i<=e&&s<3;i++){if(Math.max(Math.abs(i),Math.abs(t))!==e)continue;if(a()>Sd){e=this.meshR+1,t=e;break}let o=n+i,c=r+t;this.meshes.has(this.world.key(o,c))||(this.buildMesh(o,c),s++)}let c=this.dataR*2+1,l=0;for(;l<c*c&&a()<Cd;){let e=this.ringCursor%(c*c);this.ringCursor=(this.ringCursor+1)%(c*c),l++;let t=n-this.dataR+e%c,i=r-this.dataR+Math.floor(e/c);if(!this.world.hasChunk(t,i)){this.world.getChunk(t,i);break}}this.lastBudgetMs=a();for(let[e,t]of this.meshes){let[i,a]=e.split(`,`).map(Number);(Math.abs(i-n)>this.dropR||Math.abs(a-r)>this.dropR)&&(t&&(this.scene.remove(t),t.geometry.dispose()),this.meshes.delete(e))}}markDirty(e){for(let t of e)this.dirty.add(t)}buildMesh(e,t){let n=this.world.key(e,t),r=this.meshes.get(n);r&&(this.scene.remove(r),r.geometry.dispose());let i=vd(this.world,e,t);if(!i){this.meshes.set(n,null);return}let a=new z(i,this.material);a.position.set(e*32,0,t*32),a.frustumCulled=!0,this.scene.add(a),this.meshes.set(n,a)}},Td=1.7,Ed=9.3,Dd=34,Od=17,kd=14,Ad=23,jd=15,Md=1.4,Nd=class{constructor(e){G(this,`world`,void 0),G(this,`model`,new Qu),G(this,`pos`,new I(2.5,2,2.5)),G(this,`vel`,new I),G(this,`yaw`,0),G(this,`grounded`,!1),G(this,`onPlatform`,!1),G(this,`hp`,100),G(this,`maxHp`,100),G(this,`abilities`,{beam:!1,boots:!0,thrust:!1,dash:!1,nova:!1,shield:!1,blades:!1,quake:!1}),G(this,`animT`,0),G(this,`dashVel`,new I),G(this,`dashTime`,0),G(this,`impulseDuration`,1),G(this,`invulnT`,0),this.world=e}respawn(){let{x:e,z:t}=Gl;this.pos.set(e,this.world.groundHeight(e,t)+1,t),this.vel.set(0,0,0),this.onPlatform=!1,this.hp=this.maxHp}update(e,t,n,r,i,a,o=!1){let s=a?this.abilities.thrust?Ad*1.45:Ad:kd,c=0,l=0;if(t!==0||n!==0){let i=Math.hypot(t,n),a=t/i,o=n/i,u=Math.sin(r),d=Math.cos(r);c=(a*d-o*u)*s,l=(a*-u-o*d)*s;let f=Math.atan2(c,l)-this.yaw;for(;f>Math.PI;)f-=Math.PI*2;for(;f<-Math.PI;)f+=Math.PI*2;this.yaw+=f*Math.min(1,e*12)}if(this.vel.x=c,this.vel.z=l,this.dashTime>0){this.dashTime-=e;let t=Math.max(0,this.dashTime/this.impulseDuration);this.vel.x+=this.dashVel.x*t,this.vel.z+=this.dashVel.z*t}let u=this.grounded||this.onPlatform;if(o&&!u)this.vel.y=Math.max(-32,this.vel.y-120*e),this.model.setThrusters(!1);else if(this.abilities.boots&&i&&!u){let t=this.abilities.thrust?150:80,n=this.abilities.thrust?jd*1.9:jd;this.vel.y=Math.min(this.vel.y+t*e,n),this.model.setThrusters(!0)}else this.model.setThrusters(this.abilities.boots&&i&&!u),this.vel.y-=Dd*e;i&&u&&(this.vel.y=Od,this.grounded=!1,this.onPlatform=!1),this.vel.y=Math.max(this.vel.y,-40),this.moveAxis(0,this.vel.x*e),this.moveAxis(2,this.vel.z*e),this.grounded=!1,this.moveAxis(1,this.vel.y*e),this.pos.y<.5&&(this.pos.y=.5,this.vel.y=0,this.grounded=!0),this.animT+=e;let d=Math.hypot(this.vel.x,this.vel.z);this.model.group.position.copy(this.pos),this.model.group.rotation.y=this.yaw,this.model.animate(this.animT,d,this.grounded||this.onPlatform,e)}collides(e,t,n){let r=Math.floor(e-Td),i=Math.floor(e+Td),a=Math.floor(t),o=Math.floor(t+Ed-.01),s=Math.floor(n-Td),c=Math.floor(n+Td);for(let e=a;e<=o;e++)for(let t=s;t<=c;t++)for(let n=r;n<=i;n++)if(this.world.solidAt(n,e,t))return!0;return!1}moveAxis(e,t){if(t===0)return;let n=this.pos,r=e===0?`x`:e===1?`y`:`z`;if(n[r]+=t,this.collides(n.x,n.y,n.z))if(e===1)t<0?(n.y=Math.floor(n.y)+1.001,this.grounded=!0):n.y=Math.floor(n.y+Ed)-Ed-.001,this.vel.y=0;else{if(Math.sign(t)>0?n[r]=Math.floor(n[r]+Td)-Td-.001:n[r]=Math.floor(n[r]-Td)+1+Td+.001,this.grounded&&!this.collides(n.x+(e===0?t:0),n.y+1.05,n.z+(e===2?t:0))){let e=n[r]+t,i=n[r];n[r]=e,n.y+=1.05,this.collides(n.x,n.y,n.z)&&(n[r]=i,n.y-=1.05)}e===0?this.vel.x=0:this.vel.z=0}}dash(e){let t=!this.grounded&&!this.onPlatform;this.dashVel.set(e.x,0,e.z).normalize().multiplyScalar(t?64:52),this.dashTime=this.impulseDuration=Md,this.grounded?this.vel.y=6:t&&(this.vel.y=Math.max(this.vel.y,-3)),this.yaw=Math.atan2(e.x,e.z)}knockback(e,t,n=0){this.dashVel.set(e.x,0,e.z).normalize().multiplyScalar(t),this.dashTime=Math.max(this.dashTime,.34),this.impulseDuration=this.dashTime,n&&(this.vel.y=Math.max(this.vel.y,n))}damage(e){this.invulnT>0||(this.hp=Math.max(0,this.hp-e))}heal(e){this.hp=Math.min(this.maxHp,this.hp+e)}},Pd=42,Fd=70,Id=110,Ld=[15902117,10862066,10475944,16310178,13217512,11069154,16171741,12962264],Rd=[15911333,14264440,11040335,16112061];function zd(e,t=!1){let n=new L,r=t?15895610:Ld[Math.floor(Pl(e,1)*Ld.length)],i=Rd[Math.floor(Pl(e,2)*Rd.length)],a=Pl(e,3)<.5?3028032:7036239,o=e=>new ua({color:e}),s=new z(new B(.34,.36,.2),o(r));s.position.y=.5;let c=new z(new B(.3,.32,.18),o(a));c.position.y=.16;let l=new z(new B(.22,.22,.22),o(i));l.position.y=.8;let u=new z(new B(.24,.08,.24),o(t?16309322:2763310));u.position.y=.93;let d=new z(new B(.09,.34,.09),o(r));d.position.set(-.23,.62,0),d.geometry.translate(0,-.14,0);let f=d.clone();return f.position.x=.23,n.add(s,c,l,u,d,f),{group:n,armL:d,armR:f}}function Bd(e){let t=new L,n=new ua({color:Pl(e,9)<.5?13213802:9080210}),r=new z(new B(.18,.16,.4),n);r.position.y=.2;let i=new z(new B(.16,.16,.16),n);i.position.set(0,.32,.26);let a=new z(new B(.05,.05,.16),n);return a.position.set(0,.3,-.26),a.rotation.x=-.6,t.add(r,i,a),t}var Vd=class{constructor(e){G(this,`world`,void 0),G(this,`group`,new L),G(this,`npcs`,[]),G(this,`seed`,1),this.world=e}update(e,t,n,r){for(;this.npcs.length<Pd;){let e=this.trySpawn(t);if(!e)break;this.npcs.push(e)}for(let i=this.npcs.length-1;i>=0;i--){let a=this.npcs[i];if(a.pos.distanceTo(t)>Id){this.group.remove(a.group),a.pet&&this.group.remove(a.pet),this.npcs.splice(i,1);continue}let o=null,s=38;for(let e of n){let t=a.pos.distanceTo(e);t<s&&(s=t,o=e)}if(o&&a.state!==`flee`&&(a.state=`flee`,a.timer=3+Math.random()*2,a.dir=Math.atan2(a.pos.x-o.x,a.pos.z-o.z)),a.life!==void 0&&(a.life-=e,a.life<=0)){this.group.remove(a.group),this.npcs.splice(i,1);continue}a.timer-=e;let c=0;if(a.state===`flee`?(c=5.5,o&&(a.dir=Math.atan2(a.pos.x-o.x,a.pos.z-o.z)+Math.sin(r*3+a.phase)*.3),a.timer<=0&&(a.state=`wander`,a.timer=2+Math.random()*4)):a.state===`wander`?(c=1.5,a.timer<=0&&(Math.random()<.3?(a.state=`idle`,a.timer=1+Math.random()*3):(a.dir+=(Math.random()-.5)*2,a.timer=2+Math.random()*4)),a.home&&a.pos.distanceTo(a.home)>14&&(a.dir=Math.atan2(a.home.x-a.pos.x,a.home.z-a.pos.z))):a.timer<=0&&(a.state=`wander`,a.timer=2+Math.random()*4),c>0){let t=a.pos.x+Math.sin(a.dir)*c*e,n=a.pos.z+Math.cos(a.dir)*c*e,r=Math.max(3,Math.ceil(a.pos.y+.9)),i=this.world.groundHeight(t,n,r);Ou(Math.floor(t),Math.floor(n))&&Math.abs(i-a.pos.y)<=.72&&this.world.getBlock(Math.floor(t),Math.max(0,i-1),Math.floor(n))!==4?(a.pos.x=t,a.pos.z=n,a.pos.y=i):a.dir+=Math.PI*(.5+Math.random()*.5)}a.group.position.copy(a.pos),a.group.rotation.y=a.dir;let l=c>0?Math.abs(Math.sin(r*(a.state===`flee`?16:8)+a.phase))*.06:0;if(a.group.position.y+=l,a.state===`flee`)a.armL.rotation.x=Math.PI-.3+Math.sin(r*14+a.phase)*.2,a.armR.rotation.x=Math.PI-.3-Math.sin(r*14+a.phase)*.2;else{let e=c>0?Math.sin(r*8+a.phase)*.5:0;a.armL.rotation.x=e,a.armR.rotation.x=-e}if(a.pet&&a.petPos){let t=new I(a.pos.x-Math.sin(a.dir)*.9,0,a.pos.z-Math.cos(a.dir)*.9);a.petPos.x+=(t.x-a.petPos.x)*Math.min(1,e*4),a.petPos.z+=(t.z-a.petPos.z)*Math.min(1,e*4);let n=Math.max(3,Math.ceil(a.pos.y+.9)),i=this.world.groundHeight(a.petPos.x,a.petPos.z,n);a.petPos.y=Math.abs(i-a.pos.y)<=.72?i:a.pos.y,a.pet.position.copy(a.petPos),a.pet.position.y+=c>0?Math.abs(Math.sin(r*12+a.phase))*.08:0,a.pet.rotation.y=Math.atan2(a.pos.x-a.petPos.x,a.pos.z-a.petPos.z)}}}spawnWorkers(e,t,n=2){for(let r=0;r<n;r++){let{group:n,armL:r,armR:i}=zd(this.seed++,!0),a=e+(Math.random()-.5)*8,o=t+(Math.random()-.5)*8,s=this.world.groundHeight(a,o,12);if(s>6)continue;let c={group:n,armL:r,armR:i,pos:new I(a,s,o),dir:Math.random()*Math.PI*2,state:`wander`,timer:1+Math.random()*2,phase:Math.random()*10,home:new I(e,0,t),life:40+Math.random()*15};this.group.add(n),this.npcs.push(c)}}scare(e,t){for(let n of this.npcs)n.pos.distanceTo(e)<t&&(n.state=`flee`,n.timer=3.5+Math.random()*2,n.dir=Math.atan2(n.pos.x-e.x,n.pos.z-e.z))}trySpawn(e){for(let t=0;t<12;t++){let t=Math.random()*Math.PI*2,n=20+Math.random()*(Fd-20),r=Math.floor(e.x+Math.sin(t)*n),i=Math.floor(e.z+Math.cos(t)*n);if(!Ou(r,i))continue;let a=this.world.groundHeight(r,i,12);if(a>4)continue;let o=this.seed++,{group:s,armL:c,armR:l}=zd(o),u={group:s,armL:c,armR:l,pos:new I(r+.5,a,i+.5),dir:Math.random()*Math.PI*2,state:`wander`,timer:2+Math.random()*3,phase:Math.random()*10};return Pl(o,77)<.28&&(u.pet=Bd(o),u.petPos=u.pos.clone(),this.group.add(u.pet)),this.group.add(s),u}return null}},Hd=700,Ud=3.2,Wd=.35,Gd=new hn,Kd=new Wt,qd=new I,Jd=new I,Yd=new R,Xd=class{constructor(){G(this,`group`,new L),G(this,`fires`,new Map),G(this,`inst`,void 0),G(this,`t`,0);let e=new B(.85,1.5,.85);e.translate(0,.6,0);let t=new ni({color:16777215,transparent:!0,opacity:.96,depthWrite:!1,vertexColors:!1});this.inst=new Ti(e,t,Hd),this.inst.instanceMatrix.setUsage(it),this.inst.instanceColor=new _i(new Float32Array(Hd*3),3),this.inst.count=0,this.inst.frustumCulled=!1,this.group.add(this.inst)}get count(){return this.fires.size}key(e,t,n){return e+`,`+t+`,`+n}light(e,t,n){if(this.fires.size>=Hd)return!1;let r=this.key(e,t,n);return this.fires.has(r)?!1:(this.fires.set(r,{x:e,y:t,z:n,age:0,spreadT:Wd*Math.random()}),!0)}igniteSphere(e,t,n,r,i){let a=0,o=Math.floor(t-i),s=Math.ceil(t+i),c=Math.max(1,Math.floor(n-i)),l=Math.ceil(n+i),u=Math.floor(r-i),d=Math.ceil(r+i),f=i*i;for(let i=c;i<=l;i++)for(let c=u;c<=d;c++)for(let l=o;l<=s;l++){let o=l+.5-t,s=i+.5-n,u=c+.5-r;o*o+s*s+u*u>f||Nl(e.getBlock(l,i,c))&&this.exposed(e,l,i,c)&&this.light(l,i,c)&&a++}return a}douse(e,t,n){let r=0,i=n*n;for(let[n,a]of this.fires){let o=a.x+.5-e,s=a.z+.5-t;o*o+s*s>i||(this.fires.delete(n),r++)}return r}exposed(e,t,n,r){return!jl(e.getBlock(t+1,n,r))||!jl(e.getBlock(t-1,n,r))||!jl(e.getBlock(t,n+1,r))||!jl(e.getBlock(t,n-1,r))||!jl(e.getBlock(t,n,r+1))||!jl(e.getBlock(t,n,r-1))}update(e,t){if(this.fires.size===0)return this.inst.count=0,null;this.t+=e;let n=new Set,r=[],i=[];for(let[a,o]of this.fires){if(o.age+=e,!Nl(t.getBlock(o.x,o.y,o.z))){this.fires.delete(a);continue}if(o.spreadT-=e,o.spreadT<=0&&this.fires.size<Hd){o.spreadT=Wd;let e=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]][Math.random()*6|0],n=o.x+e[0],r=o.y+e[1],a=o.z+e[2];r>=1&&Nl(t.getBlock(n,r,a))&&Math.random()<.6&&i.push([n,r,a])}o.age>=Ud&&(t.setBlock(o.x,o.y,o.z,0),r.push([o.x,o.y,o.z]),this.markDirty(t,o.x,o.y,o.z,n),this.fires.delete(a))}for(let[e,t,n]of i)this.light(e,t,n);return this.render(),r.length>0||n.size>0?{dirty:n,destroyed:r}:null}markDirty(e,t,n,r,i){for(let n of e.dirtyKeysFor(t,r))i.add(n)}render(){let e=0;for(let t of this.fires.values()){let n=.7+.5*Math.abs(Math.sin(this.t*13+t.x*1.7+t.z));Jd.set(t.x+.5,t.y,t.z+.5),qd.set(.8+Math.sin(this.t*9+t.x)*.2,n,.8+Math.cos(this.t*8+t.z)*.2),Gd.compose(Jd,Kd,qd),this.inst.setMatrixAt(e,Gd);let r=.5+.5*Math.abs(Math.sin(this.t*16+t.x*2.3+t.z*1.1));if(Yd.setRGB(1,.42+r*.5,.08+r*.25),this.inst.setColorAt(e,Yd),++e>=Hd)break}this.inst.count=e,this.inst.instanceMatrix.needsUpdate=!0,this.inst.instanceColor&&(this.inst.instanceColor.needsUpdate=!0)}},Zd=900,Qd=9,$d=.4,ef=class{constructor(){G(this,`cells`,new Map)}get count(){return this.cells.size}key(e,t,n){return e+`,`+t+`,`+n}floodSphere(e,t,n,r){let i=new Set,a=Math.floor(t-r),o=Math.ceil(t+r),s=Math.floor(n-r),c=Math.ceil(n+r),l=r*r;for(let r=s;r<=c;r++)for(let s=a;s<=o;s++){let a=s+.5-t,o=r+.5-n;a*a+o*o>l||this.wet(e,s,r,i)}return i}wet(e,t,n,r){if(this.cells.size>=Zd)return!1;let i=e.groundHeight(t,n,40);if(i<1||i>40||e.getBlock(t,i,n)!==H.Air)return!1;let a=this.key(t,i,n);if(this.cells.has(a))return!1;e.setBlock(t,i,n,H.Puddle),this.cells.set(a,{x:t,y:i,z:n,age:0,spreadT:$d*Math.random()});for(let i of e.dirtyKeysFor(t,n))r.add(i);return!0}update(e,t){if(this.cells.size===0)return null;let n=new Set,r=[];for(let[i,a]of this.cells){if(t.getBlock(a.x,a.y,a.z)!==H.Puddle){this.cells.delete(i);continue}if(a.age+=e,a.spreadT-=e,a.spreadT<=0&&this.cells.size<Zd){a.spreadT=$d;let e=[[1,0],[-1,0],[0,1],[0,-1]][Math.random()*4|0];r.push([a.x+e[0],a.z+e[1]])}if(a.age>=Qd){t.getBlock(a.x,a.y,a.z)===H.Puddle&&t.setBlock(a.x,a.y,a.z,H.Air);for(let e of t.dirtyKeysFor(a.x,a.z))n.add(e);this.cells.delete(i)}}for(let[e,i]of r)this.wet(t,e,i,n);return n.size>0?{dirty:n}:null}},tf=18,nf=120,rf=26,af=[15902117,10863858,16448250,10132656,16310178,11069154,16171741,12774066];function of(e){let t=new L,n=af[Math.floor(Pl(e,4)*af.length)],r=(e,t=0)=>new ua({color:e,emissive:t,emissiveIntensity:+!!t}),i=Pl(e,5)<.2,a=new z(new B(1.7,.55,3.4),r(i?16238920:n));a.position.y=.55;let o=new z(new B(1.5,.5,1.7),r(10409202));o.position.set(0,1.05,-.2);let s=new z(new B(1.4,.25,.1),r(2303531));s.position.set(0,.5,1.72);let c=new z(new B(.3,.18,.08),r(16773808,16773808));c.position.set(-.55,.68,1.72);let l=c.clone();l.position.x=.55,t.add(a,o,s,c,l);for(let[e,n]of[[-.85,1.1],[.85,1.1],[-.85,-1.1],[.85,-1.1]]){let i=new z(new B(.25,.55,.7),r(1842724));i.position.set(e,.28,n),t.add(i)}if(i){let e=new z(new B(.5,.2,.4),r(15220800));e.position.set(0,1.4,-.2),t.add(e)}return t}var sf=class{constructor(e){G(this,`world`,void 0),G(this,`group`,new L),G(this,`cars`,[]),G(this,`seed`,1),this.world=e}update(e,t){for(;this.cars.length<tf;){let e=this.trySpawn(t);if(!e)break;this.cars.push(e)}for(let n=this.cars.length-1;n>=0;n--){let r=this.cars[n];if(r.pos.distanceTo(t)>nf){this.group.remove(r.group),this.cars.splice(n,1);continue}r.panicT-=e;let i=r.panicT>0?r.baseSpeed*2.2:r.baseSpeed,a=t.clone().sub(r.pos),o=a.x*r.dir.x+a.z*r.dir.z,s=a.x*r.dir.z-a.z*r.dir.x;o>0&&o<14&&Math.abs(s)<4.5?(r.swerveTarget=s>0?-3:3,o<7&&(i=Math.max(0,i*((o-3)/4)))):r.swerveTarget=0,r.swerve+=(r.swerveTarget-r.swerve)*Math.min(1,e*3);let c=Math.floor(r.pos.x/rf)+`,`+Math.floor(r.pos.z/rf);if(ku(Math.floor(r.pos.x),Math.floor(r.pos.z))===3&&c!==r.lastCell){r.lastCell=c;let e=Math.random();if(e<.35){let t=new I(r.dir.z,0,-r.dir.x);e<.175&&t.negate(),r.dir.copy(t)}}let l=r.pos.clone().addScaledVector(r.dir,2.6),u=Math.floor(l.x),d=Math.floor(l.z);if(ku(u,d)===0||this.world.solidAt(u+.5,this.world.groundHeight(r.pos.x,r.pos.z,6)+.5,d+.5)){let e=new I(r.dir.z,0,-r.dir.x),t=e.clone().negate(),n=e=>ku(Math.floor(r.pos.x+e.x*2.6),Math.floor(r.pos.z+e.z*2.6))!==0;n(e)?r.dir.copy(e):n(t)?r.dir.copy(t):r.dir.negate()}else r.pos.addScaledVector(r.dir,i*e);let f=this.world.groundHeight(r.pos.x,r.pos.z,6);r.pos.y=f,r.group.position.copy(r.pos),r.group.position.x+=r.dir.z*r.swerve,r.group.position.z+=-r.dir.x*r.swerve,r.group.rotation.y=Math.atan2(r.dir.x,r.dir.z)-r.swerve*.12}}scare(e,t){for(let n of this.cars)n.pos.distanceTo(e)<t&&(n.panicT=3)}trySpawn(e){for(let t=0;t<14;t++){let t=Math.random()*Math.PI*2,n=25+Math.random()*75,r=Math.floor(e.x+Math.sin(t)*n),i=Math.floor(e.z+Math.cos(t)*n),a=ku(r,i);if(a!==1&&a!==2||this.world.groundHeight(r,i,6)>2)continue;let o=Math.random()<.5?1:-1,s=a===1?new I(0,0,o):new I(o,0,0),c=e=>Math.floor(e/rf)*rf,l=o>0?1.2:3.8,u=a===1?new I(c(r)+l,1,i+.5):new I(r+.5,1,c(i)+(o>0?3.8:1.2)),d=of(this.seed++);return this.group.add(d),{group:d,pos:u,dir:s,baseSpeed:7+Math.random()*4,panicT:0,lastCell:``,swerve:0,swerveTarget:0}}return null}},cf=new I,lf=new I,uf=4,df=620,ff=90;function pf(e,t,n,r,i=0){return new z(new B(e,t,n),new ua({color:r,emissive:i,emissiveIntensity:+!!i}))}function mf(e,t,n,r=!1){let i=new L,a=e*2,o=e*.83;for(let[e,r,s]of[[a,o,0],[o,a,0],[a*.78,a*.78,Math.PI/4]]){let a=pf(e,r,t,n);a.rotation.z=s,i.add(a)}if(r){let n=pf(e*1.05,e*1.05,t*.9,1777704);i.add(n)}return i}function hf(){let e=new L,t=16448511,n=13949156,r=15696760,i=3817290,a=(n,r,i,a,o=0,s=t)=>{let c=pf(n,r,i,s);return c.position.set(0,o,a),e.add(c),c};a(9.7,7.4,54,0,.15),a(8.3,1.8,53,0,4.35,t),a(8.5,2.1,52,-.2,-4.15,n),a(6.5,1,49,-.4,-5.45,i);for(let[e,t,n,r,i]of[[9.4,7,5,28.8,.05],[8.2,6.2,4,33.2,-.05],[6.7,5,3.2,36.7,-.25],[4.8,3.6,2.4,39.5,-.55],[2.7,2,1.6,41.5,-.85]])a(e,t,n,r,i);for(let[e,t,n,r,i]of[[9,6.8,5,-29,.25],[7.5,5.6,4,-33.4,.65],[5.8,4.3,3.2,-36.9,1.1],[4,3,2.6,-39.8,1.55],[2.2,1.8,2,-42.1,1.95]])a(e,t,n,r,i);let o=pf(6.2,1.35,1,i);o.position.set(0,2.25,35.5),o.rotation.x=-.12,e.add(o);for(let n of[-1,1]){let r=pf(2.45,1.15,.28,7194860,1455948);r.position.set(n*1.45,2.25,36.08),r.rotation.z=n*-.12,r.rotation.x=-.12;let i=pf(2.65,.22,.38,t);i.position.set(n*1.45,3.05,35.9),i.rotation.z=n*-.1,e.add(r,i)}for(let t=0;t<18;t++){let n=-25.5+t*3.05;for(let t of[-1,1]){let r=pf(.3,.62,1.28,9420776,2241348);r.position.set(t*4.98,1.35,n),e.add(r)}}for(let t of[-1,1]){let a=pf(.22,.7,51,r);a.position.set(t*4.96,-.85,0),e.add(a);for(let r of[-20,21]){let a=pf(.26,3,2,n);a.position.set(t*5.04,.05,r);let o=pf(.12,.18,.6,i);o.position.set(t*5.2,.7,r+.45),e.add(a,o)}let o=pf(.2,1.7,8,i);o.position.set(t*4.58,-3.3,-8),e.add(o)}let s=pf(.65,.35,.65,r,16717848);s.position.set(0,-5.95,-2),e.add(s);for(let a of[-1,1]){for(let i=0;i<7;i++){let o=19-i*2,s=pf(4.5,1.05-i*.08,o,i===6?r:t);s.position.set(a*(6.3+i*4.15),-1.15+i*.08,-1.5-i*1.85),s.rotation.y=a*-.018,e.add(s);let c=pf(4.2,.28,.55,n);c.position.set(s.position.x,s.position.y+.12,s.position.z+o/2),e.add(c)}let o=pf(1.15,5.2,3.1,r);o.position.set(a*31,1.3,-13.3),o.rotation.z=a*-.2,e.add(o);for(let[t,r,o]of[[12.5,2.1,1],[21.5,-3,.88]]){let s=mf(2.5*o,9.5,n);s.position.set(a*t,-4.2,r);let c=mf(2.62*o,.85,i,!0);c.position.set(a*t,-4.2,r+4.95);let l=mf(.78*o,.8,8884381);l.position.set(a*t,-4.2,r+5.33);let u=pf(2.7*o,2.7*o,.7,i);u.position.set(a*t,-4.2,r-4.9);let d=pf(1.1,2.4,3.8,n);d.position.set(a*t,-2.35,r-.3),d.rotation.x=-.1,e.add(s,c,l,u,d)}let s=pf(.65,.55,1,a<0?16724016:3669875,a<0?16715792:1113925);s.position.set(a*31.4,.2,-12),e.add(s)}for(let n=0;n<5;n++){let i=pf(1.15,3.1,9.5-n*1.45,n>2?r:t);i.position.set(0,5.1+n*2.8,-32.2-n*1.05),e.add(i)}let c=pf(1.8,1.2,11,n);c.position.set(0,5.3,-29.5),e.add(c);for(let n of[-1,1])for(let i=0;i<4;i++){let a=pf(3.7,.75,8.5-i*1.2,i===3?r:t);a.position.set(n*(5.7+i*3.45),3+i*.08,-32.5-i*1.2),e.add(a)}for(let t of[-1,1]){let n=pf(1.6,.2,5.4,i);n.position.set(t*2.1,-5.7,-5.5),e.add(n)}let l=pf(.5,.5,.55,t,16777215);return l.position.set(0,2.1,-43.2),e.add(l),e.traverse(e=>{let t=e;t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)}),{group:e,deckY:5.4*.96,halfLen:78/2,halfWide:62/2}}var gf=class{constructor(){G(this,`group`,new L),G(this,`planes`,[]);for(let e=0;e<uf;e++){let{group:e,deckY:t,halfLen:n,halfWide:r}=hf(),i=Math.random()*Math.PI*2;e.position.set((Math.random()-.5)*df,62+Math.random()*34,(Math.random()-.5)*df),e.rotation.y=i,this.group.add(e),this.planes.push({group:e,heading:i,deckY:t,halfLen:n,halfWide:r,speed:4+Math.random()*3.5,dx:0,dz:0,hp:ff,crashing:!1,fallVel:0,roll:0,smokeT:0})}}update(e,t,n){let r=[];for(let i of this.planes){if(i.crashing){i.fallVel=Math.min(70,i.fallVel+26*e),i.roll+=e*1.6,i.speed=Math.max(0,i.speed-e*1.2),i.dx=Math.sin(i.heading)*i.speed*e,i.dz=Math.cos(i.heading)*i.speed*e,i.group.position.x+=i.dx,i.group.position.z+=i.dz,i.group.position.y-=i.fallVel*e,i.group.rotation.z=Math.sin(i.roll)*.9,i.group.rotation.x=Math.min(1.1,i.fallVel/55),i.smokeT-=e;let a=n(i.group.position.x,i.group.position.z);i.group.position.y<=a+6&&(r.push({at:i.group.position.clone(),heading:i.heading}),this.reset(i,t));continue}i.dx=Math.sin(i.heading)*i.speed*e,i.dz=Math.cos(i.heading)*i.speed*e,i.group.position.x+=i.dx,i.group.position.z+=i.dz;let a=i.group.position.x-t.x,o=i.group.position.z-t.z;a>df/2&&(i.group.position.x-=df),a<-620/2&&(i.group.position.x+=df),o>df/2&&(i.group.position.z-=df),o<-620/2&&(i.group.position.z+=df)}return r}reset(e,t){let n=Math.random()*Math.PI*2;e.heading=Math.random()*Math.PI*2,e.group.position.set(t.x+Math.sin(n)*df*.45,62+Math.random()*34,t.z+Math.cos(n)*df*.45),e.group.rotation.set(0,e.heading,0),e.hp=ff,e.crashing=!1,e.fallVel=0,e.roll=0,e.speed=4+Math.random()*3.5}damageSphere(e,t,n){let r=[];for(let i of this.planes)i.crashing||this.overlaps(i,e,t)&&(i.hp-=n,i.hp<=0&&(i.crashing=!0,r.push(i)));return r}damageRay(e,t,n,r){let i=[];for(let a of this.planes){if(a.crashing)continue;cf.copy(a.group.position).sub(e);let o=cf.dot(t);o<0||o>n||(lf.copy(t).multiplyScalar(o),!(cf.sub(lf).length()>a.halfWide*.55)&&(a.hp-=r,a.hp<=0&&(a.crashing=!0,i.push(a))))}return i}overlaps(e,t,n){if(Math.abs(t.y-e.group.position.y)>10+n)return!1;let r=t.x-e.group.position.x,i=t.z-e.group.position.z,a=Math.sin(e.heading),o=Math.cos(e.heading),s=r*o-i*a,c=r*a+i*o,l=Math.abs(s)<=8+n&&Math.abs(c)<=e.halfLen+n,u=Math.abs(s)<=e.halfWide+n&&c>=-18-n&&c<=12+n;return l||u}deckUnder(e,t,n,r){for(let i of this.planes){let a=i.group.position.y+i.deckY;if(t<a-r||t>a+r+3)continue;let o=e-i.group.position.x,s=n-i.group.position.z,c=Math.sin(i.heading),l=Math.cos(i.heading),u=o*l-s*c,d=o*c+s*l,f=Math.abs(u)<=7&&Math.abs(d)<=i.halfLen,p=Math.abs(u)<=i.halfWide&&d>=-14&&d<=10;if(f||p)return i}return null}},_f=3,vf=26,yf=10;function bf(e,t,n,r,i=0){let a=new z(new B(e,t,n),new la({color:r,emissive:i,emissiveIntensity:i?2.1:0,metalness:.38,roughness:.36,flatShading:!0}));return a.castShadow=!0,a}function xf(){let e=new L,t=12239823,n=2435892,r=14238024,i=bf(2.2,1.55,8.2,t),a=bf(1.35,.65,7.4,14410216);a.position.y=.92;let o=bf(1.75,1.25,2.3,t);o.position.set(0,-.05,5.1);let s=bf(1.15,.82,1.7,t);s.position.set(0,-.18,7);let c=bf(.48,.42,1,n);c.position.set(0,-.23,8.3);let l=bf(1.25,.72,2.2,3508408,732488);l.position.set(0,1.18,2.1),l.rotation.x=-.12;let u=bf(1.55,1.15,2.4,t);u.position.set(0,.35,-5),e.add(i,a,o,s,c,l,u);for(let i of[-1,1]){for(let n=0;n<3;n++){let a=bf(2.7,.36,5.1-n*1.1,n===2?r:t);a.position.set(i*(2.3+n*2.35),-.15+n*.05,-.7-n*1.2),e.add(a)}let a=bf(2.4,.3,2.7,t);a.position.set(i*2.1,.5,-5.25),e.add(a);let o=bf(.85,.85,1.45,n);o.position.set(i*1.3,-.5,1);let s=bf(.28,.28,2.1,15198699);s.position.set(i*4.2,-.65,-.8);let c=bf(.18,.18,.45,r);c.position.set(i*4.2,-.65,.47),e.add(o,s,c)}for(let t of[-.65,.65]){let r=bf(.72,.72,.65,n);r.position.set(t,-.25,-6.25);let i=bf(.36,.36,1.6,7526911,1477887);i.position.set(t,-.25,-7.35),e.add(r,i)}for(let n=0;n<3;n++){let i=bf(.38,1.5,2.8-n*.55,n===2?r:t);i.position.set(0,1.45+n*1.2,-4.55-n*.35),e.add(i)}return e.scale.setScalar(.72),e}var Sf=class{constructor(){G(this,`group`,new L),G(this,`fighters`,[]),G(this,`tracers`,[]);for(let e=0;e<_f;e++){let t=xf();t.visible=!1,this.group.add(t),this.fighters.push({group:t,alive:!1,respawnT:2.5+e*2.2,fireT:.7+e*.3,dangerT:1.2,orbit:e*Math.PI*2/_f,slot:e})}}update(e,t,n,r){let i={hits:[],crashes:[],respawned:0};this.updateTracers(e);for(let a of this.fighters){if(!a.alive){a.respawnT-=e,a.respawnT<=0&&r&&!r.dying&&(this.deploy(a,n),i.respawned++);continue}if(!r||r.dying){a.orbit+=e*.16,this.flyToward(a,n.x+Math.sin(a.orbit)*70,n.y+38,n.z+Math.cos(a.orbit)*70,e);continue}a.orbit+=e*(.42+a.slot*.025);let o=38+a.slot*7,s=r.group.position,c=s.x+Math.sin(a.orbit)*o,l=s.z+Math.cos(a.orbit)*o,u=Math.max(s.y+r.centerY+18+a.slot*5,28);if(this.flyToward(a,c,u,l,e),a.fireT-=e,a.fireT<=0&&a.group.position.distanceTo(s)<105){a.fireT=.85+Math.random()*.55;let e=s.clone();e.y+=r.centerY+(Math.random()-.5)*5,this.fireTracer(a.group.position,e),i.hits.push({at:e,damage:1.5})}a.dangerT-=e;let d=r.hitRadius+32;a.dangerT<=0&&a.group.position.distanceTo(s)<d&&(a.dangerT=1.1+Math.random()*.8,(r.threatening||Math.random()<.48)&&(a.group.rotation.z+=(Math.random()-.5)*.35,this.destroy(a,i))),a.group.position.y+=Math.sin(t*15+a.slot*2.1)*.025}return i}reset(){for(let e of this.fighters)e.alive=!1,e.group.visible=!1,e.respawnT=2.5+e.slot*2.2;for(let e of this.tracers)this.group.remove(e.mesh);this.tracers.length=0}deploy(e,t){e.alive=!0,e.group.visible=!0,e.fireT=.4+Math.random()*.7,e.dangerT=1.2,e.group.position.set(t.x-130-e.slot*15,t.y+45+e.slot*4,t.z-110),e.group.rotation.set(0,0,0)}destroy(e,t){t.crashes.push(e.group.position.clone()),e.alive=!1,e.group.visible=!1,e.respawnT=vf+Math.random()*yf}flyToward(e,t,n,r,i){let a=t-e.group.position.x,o=n-e.group.position.y,s=r-e.group.position.z,c=Math.max(1,Math.hypot(a,o,s));e.group.position.x+=a/c*38*i,e.group.position.y+=o/c*38*i,e.group.position.z+=s/c*38*i;let l=Math.atan2(a,s)-e.group.rotation.y;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;e.group.rotation.y+=l*Math.min(1,i*3.4),e.group.rotation.z=F.lerp(e.group.rotation.z,-l*.75,Math.min(1,i*3)),e.group.rotation.x=F.lerp(e.group.rotation.x,F.clamp(-o/c,-.22,.22),Math.min(1,i*3))}fireTracer(e,t){let n=new z(new B(.24,.24,t.clone().sub(e).length()),new ni({color:8382719,transparent:!0,opacity:.9,toneMapped:!1}));n.position.copy(e).lerp(t,.5),n.lookAt(t),this.group.add(n),this.tracers.push({mesh:n,life:.11})}updateTracers(e){for(let t=this.tracers.length-1;t>=0;t--){let n=this.tracers[t];n.life-=e,n.mesh.material.opacity=Math.max(0,n.life/.11),!(n.life>0)&&(this.group.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.tracers.splice(t,1))}}},Cf=14,wf=new I,Tf=new I;function Ef(e,t,n,r,i=0){return new z(new B(e,t,n),new ua({color:r,emissive:i,emissiveIntensity:+!!i}))}var Df=class{constructor(){G(this,`group`,new L),G(this,`drones`,[]),G(this,`spawnT`,3),G(this,`target`,3)}get count(){return this.drones.length}build(){let e=new L,t=5923182,n=15690346,r=Ef(2.6,1.2,2.6,t),i=Ef(1.1,.45,.3,16731469,16720418);i.position.set(0,.1,1.4);let a=Ef(.34,.28,.18,16721703,16711680);a.position.set(-.78,.02,1.38);let o=a.clone();o.position.x=.78;let s=Ef(2.2,.5,2.2,n);s.position.y=-.75;let c=Ef(2.15,.42,1.85,7634317);c.position.set(0,.78,-.05),c.rotation.x=-.08;let l=Ef(1.75,.72,.48,2435379);l.position.set(0,-.12,1.48);let u=Ef(.74,.34,.36,8198176,16718125);u.position.set(0,-.48,1.7);let d=Ef(1.55,.85,1.85,3422531);d.position.set(0,-.75,-1.35);let f=Ef(.72,.3,1.25,15690346,9113624);f.position.set(0,-1.18,-1.3);for(let t of[-1,1]){for(let n=0;n<3;n++){let r=Ef(.18,.22,.72+n*.12,13357272);r.position.set(t*(.28+n*.3),-.52,1.82+n*.1),r.rotation.x=-.36,r.rotation.y=t*(.12+n*.08),e.add(r)}let r=Ef(.92,.2,.42,n);r.position.set(t*.62,.34,1.52),r.rotation.z=t*-.16,e.add(r)}for(let[n,r]of[[-1,-1],[1,-1],[-1,1],[1,1]]){let i=Ef(1.5,.3,.5,t);i.position.set(n*1.5,.35,r*1.5),i.rotation.y=Math.atan2(n,r),e.add(i);let a=Ef(.7,.5,.7,3093308);a.position.set(n*2.1,.35,r*2.1),e.add(a);let o=Ef(.22,1.15,.22,2369584);o.position.set(n*2.24,-.42,r*2.24),o.rotation.x=r*.24,o.rotation.z=n*-.24,e.add(o)}for(let t of[-1,1]){let r=Ef(.28,.34,1.5,n);r.position.set(t*.75,-.35,1.65),r.rotation.y=t*-.24;let i=Ef(.2,1.25,.7,3093308);i.position.set(t*1.1,.75,-.55),i.rotation.z=t*-.45,e.add(r,i)}let p=Ef(5.6,.12,.5,12173516);return p.position.y=.95,e.add(r,i,a,o,s,c,l,u,d,f,p),e.scale.setScalar(1.6),{group:e,rotor:p,body:r,hp:Cf,vel:new I,orbitA:Math.random()*Math.PI*2,radius:26+Math.random()*24,height:14+Math.random()*16,strikeT:2+Math.random()*4,diving:!1,flashT:0}}spawn(e){let t=this.build(),n=Math.random()*Math.PI*2;t.group.position.set(e.playerPos.x+Math.sin(n)*90,e.world.groundHeight(e.playerPos.x,e.playerPos.z,60)+t.height+10,e.playerPos.z+Math.cos(n)*90),this.group.add(t.group),this.drones.push(t)}update(e,t,n){this.spawnT-=e,this.spawnT<=0&&this.drones.length<this.target&&(this.spawnT=1.6,this.spawn(n));for(let r=this.drones.length-1;r>=0;r--){let i=this.drones[r];i.rotor.rotation.y+=e*26,i.flashT>0&&(i.flashT-=e,i.body.material.emissive.setHex(i.flashT>0?16724787:0));let a=n.world.groundHeight(i.group.position.x,i.group.position.z,60);if(i.diving){i.group.position.addScaledVector(i.vel,e),i.group.rotation.x=-.5;let t=i.group.position.distanceTo(n.playerPos)<11;if(t||i.group.position.y<a+3){t&&n.damagePlayer(7);let e=i.group.position.clone();n.destroyAt(e,3,.15),i.diving=!1,i.strikeT=3+Math.random()*3,i.group.rotation.x=0}continue}i.orbitA+=e*.5;let o=n.playerPos.x+Math.sin(i.orbitA)*i.radius,s=n.playerPos.z+Math.cos(i.orbitA)*i.radius,c=a+i.height+Math.sin(t*1.7+i.orbitA)*2;i.group.position.x+=(o-i.group.position.x)*Math.min(1,e*1.1),i.group.position.z+=(s-i.group.position.z)*Math.min(1,e*1.1),i.group.position.y+=(c-i.group.position.y)*Math.min(1,e*1.4),i.group.rotation.y=Math.atan2(n.playerPos.x-i.group.position.x,n.playerPos.z-i.group.position.z),i.strikeT-=e,i.strikeT<=0&&(i.diving=!0,wf.copy(n.playerPos).sub(i.group.position).normalize(),i.vel.copy(wf).multiplyScalar(38))}}damageSphere(e,t,n){let r=[];for(let i=this.drones.length-1;i>=0;i--){let a=this.drones[i];a.group.position.distanceTo(e)>t+3.5||(a.hp-=n,a.flashT=.1,a.hp<=0&&(r.push(a.group.position.clone()),this.remove(i)))}return r}damageRay(e,t,n,r){let i=[];for(let a=this.drones.length-1;a>=0;a--){let o=this.drones[a];wf.copy(o.group.position).sub(e);let s=wf.dot(t);s<0||s>n||(Tf.copy(t).multiplyScalar(s),!(wf.sub(Tf).length()>5)&&(o.hp-=r,o.flashT=.1,o.hp<=0&&(i.push(o.group.position.clone()),this.remove(a))))}return i}remove(e){let t=this.drones[e];this.group.remove(t.group),t.group.traverse(e=>{let t=e;t.isMesh&&(t.geometry.dispose(),t.material.dispose())}),this.drones.splice(e,1)}},Of=150,kf=6,Af=7,jf=18,Mf=2830136,Nf=16734802,Pf=16761935,Ff=6088314;function If(e,t){return(e%t+t)%t}var Lf=class{constructor(){G(this,`group`,new L),G(this,`live`,new Map),G(this,`pool`,[]),G(this,`scanT`,0)}build(){let e=new L,t=new z(new B(1.1,3.2,.9),new ua({color:3356735}));t.position.y=1.6,e.add(t);let n=[];for(let t=0;t<3;t++){let r=new z(new B(.7,.7,.3),new ua({color:Mf,emissive:0}));r.position.set(0,2.6-t*1,.55),e.add(r),n.push(r)}let r=new z(new B(1.3,.25,1.2),new ua({color:2237996}));return r.position.y=3.3,e.add(r),{group:e,lamps:n,axis:!0,key:``}}acquire(){let e=this.pool.pop()??this.build();return this.group.add(e.group),e}release(e){this.group.remove(e.group),this.pool.push(e)}update(e,t,n,r,i){if(this.scanT-=e,this.scanT<=0){this.scanT=.5;let e=new Set,t=Math.floor((n.x-Of)/26)*26,a=Math.floor((n.z-Of)/26)*26;for(let o=t;o<=n.x+Of;o+=26)for(let t=a;t<=n.z+Of;t+=26){let a=o+If(5-o,26),s=t+If(5-t,26);if(Math.hypot(a-n.x,s-n.z)>Of||!Du(a,s)||!i(a,s))continue;let c=a+`,`+s;if(e.add(c),this.live.has(c))continue;let l=this.acquire();l.key=c,l.axis=If(Math.floor(a/26)+Math.floor(s/26),2)===0,l.group.position.set(a,Math.max(r(a,s),kf),s),l.group.rotation.y=l.axis?0:Math.PI/2,this.live.set(c,l)}for(let[t,n]of this.live)e.has(t)&&i(n.group.position.x,n.group.position.z)||(this.release(n),this.live.delete(t))}for(let e of this.live.values()){let n=If(t+(e.axis?0:jf/2),jf),r=n<Af?2:+(n<9);for(let t=0;t<3;t++){let n=t===0&&r===0||t===1&&r===1||t===2&&r===2,i=e.lamps[t].material,a=t===0?Nf:t===1?Pf:Ff;i.color.setHex(n?a:Mf),i.emissive.setHex(n?a:0),i.emissiveIntensity=+!!n}}}},Rf={main:14696508,trim:16183264,metal:9278623,glass:8378600},zf=3093307;function Bf(e,t,n,r,i=0){let a=new z(new B(e,t,n),new la({color:r,emissive:i,emissiveIntensity:i?1.6:0,metalness:r===zf?.7:.2,roughness:.34,flatShading:!0}));return a.castShadow=!0,a.receiveShadow=!0,a}var Vf=class{constructor(e=Rf){G(this,`pal`,void 0),G(this,`group`,new L),G(this,`active`,!1),G(this,`legL`,void 0),G(this,`legR`,void 0),G(this,`torso`,void 0),G(this,`cannon`,void 0),G(this,`yaw`,0),G(this,`fireT`,2),G(this,`bob`,0),this.pal=e;let t=e.main,n=e.trim,r=e.metal,i=e.glass,a=this.group;a.scale.setScalar(2),this.legL=this.makeLeg(-.62),this.legR=this.makeLeg(.62),a.add(this.legL,this.legR);let o=Bf(1.5,.5,1,n);o.position.y=1.35;let s=Bf(.72,.38,.72,zf);s.position.y=1.25;let c=Bf(.34,.24,.12,i,2846586);c.position.set(0,1.36,.58),a.add(o,s,c);for(let e of[-1,1]){let n=Bf(.58,.52,.24,t);n.position.set(e*.34,1.03,.52),n.rotation.z=e*-.08;let r=Bf(.24,.48,.76,t);r.position.set(e*.86,1.08,0),r.rotation.z=e*-.12,a.add(n,r)}this.torso=new L,this.torso.position.y=1.6,a.add(this.torso);let l=Bf(1.9,1,1.25,t);l.position.y=.55;let u=Bf(1.5,.4,1.1,n);u.position.y=-.05;let d=Bf(.9,.22,.1,zf);d.position.set(0,.75,.65);let f=Bf(.34,.34,.14,i,2846586);f.position.set(0,.42,.66);let p=Bf(.42,.68,.16,n);p.position.set(0,.5,.67);let m=Bf(1,.22,.76,zf);m.position.set(0,1.08,0),this.torso.add(l,u,d,f,p,m);for(let e of[-1,1]){let t=Bf(.48,.2,.16,n);t.position.set(e*.55,.88,.68),t.rotation.z=e*-.18;let r=Bf(.28,.22,.08,zf);r.position.set(e*.58,.48,.71),this.torso.add(t,r)}for(let e of[-1,1]){let i=Bf(.86,.8,.94,t);i.position.set(e*1.28,.72,0);let a=Bf(.9,.2,.98,n);a.position.set(e*1.28,1.16,0);let o=Bf(.64,.46,.12,n);o.position.set(e*1.28,.75,.53);let s=Bf(.38,.13,.05,zf);s.position.set(e*1.28,.75,.61);let c=Bf(.14,.5,.6,r);i.position.y=.72,c.position.set(e*1.74,.72,0),this.torso.add(i,a,o,s,c);let l=Bf(.42,.42,.46,zf);l.position.set(e*1.28,.31,0);let u=Bf(.5,.62,.55,n);u.position.set(e*1.28,.05,0);let d=Bf(.48,.34,.5,zf);d.position.set(e*1.28,-.3,0);let f=Bf(.6,.44,.62,r);f.position.set(e*1.28,-.42,.05),this.torso.add(l,u,d,f)}let h=Bf(.22,1.5,1.25,n);h.position.set(-1.85,.2,.1);let g=Bf(.1,1.5,.3,t);g.position.set(-1.97,.2,.1);let _=Bf(.05,.82,.62,zf);_.position.set(-1.99,.2,.1);let v=Bf(.04,.28,.28,i,2846586);v.position.set(-2.03,.2,.1),this.torso.add(h,g,_,v),this.cannon=Bf(.46,.46,1.5,r),this.cannon.position.set(1.3,1.28,.35);let y=Bf(.3,.3,.28,zf);y.position.set(1.3,1.28,1.2);let b=Bf(.1,.1,1.35,n);b.position.set(1.03,1.52,.35);let x=b.clone();x.position.x=1.57,this.torso.add(this.cannon,y,b,x);let S=Bf(.62,.48,.6,n);S.position.y=1.32;let C=Bf(.5,.16,.1,i,2846586);C.position.set(0,1.34,.32);let w=Bf(.1,.34,.1,t);w.position.set(0,1.66,.16);let T=Bf(.38,.16,.2,zf);T.position.set(0,1.12,.22);let E=Bf(.42,.12,.48,t);E.position.set(0,1.61,-.02),this.torso.add(S,C,w,T,E),a.visible=!1}makeLeg(e){let t=this.pal.trim,n=this.pal.main,r=this.pal.metal,i=new L;i.position.set(e,1.3,0);let a=Bf(.66,.6,.72,t);a.position.y=-.34;let o=Bf(.46,.46,.5,zf);o.position.y=-.05;let s=Bf(.78,.6,.84,n);s.position.y=-.92;let c=Bf(.5,.3,.18,zf);c.position.set(0,-.65,.42);let l=Bf(.5,.38,.12,t);l.position.set(0,-.93,.48);let u=Bf(.94,.3,1.15,r);u.position.set(0,-1.32,.16);let d=Bf(.68,.18,.36,n);return d.position.set(0,-1.34,.77),i.add(o,a,c,s,l,u,d),i}deploy(e){this.active=!0,this.group.visible=!0,this.group.position.copy(e),this.fireT=1.5}retire(){this.active=!1,this.group.visible=!1}update(e,t,n){if(!this.active)return;let r=this.group.position,i=n.playerPos.clone();i.x+=Math.sin(t*.25)*4-13,i.z+=Math.cos(t*.25)*4+9;let a=i.x-r.x,o=i.z-r.z,s=Math.hypot(a,o),c=Math.min(26,6+s*.9);s>3&&(r.x+=a/s*c*e,r.z+=o/s*c*e);let l=n.world.groundHeight(r.x,r.z,60);r.y+=((l>40?0:l)-r.y)*Math.min(1,e*4);let u=n.target??i,d=Math.atan2(u.x-r.x,u.z-r.z)-this.yaw;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;this.yaw+=d*Math.min(1,e*4),this.group.rotation.y=this.yaw;let f=s>3;this.bob+=e*(f?9:1.6);let p=f?.5:.06;if(this.legL.rotation.x=Math.sin(this.bob)*p,this.legR.rotation.x=-Math.sin(this.bob)*p,this.group.rotation.z=Math.sin(this.bob)*(f?.06:.015),this.torso.position.y=1.6+Math.abs(Math.sin(this.bob))*(f?.1:.03),this.fireT-=e,n.target&&this.fireT<=0){this.fireT=1.1+Math.random()*.7;let e=r.clone();e.y+=2.6*2,this.cannon.position.z=.05,n.fire(e,n.target)}this.cannon.position.z+=(.35-this.cannon.position.z)*Math.min(1,e*6)}},Hf=5071986,Uf=14279398,Wf=8357778,Gf=2830648,Kf=9367752;function qf(e,t,n,r,i=0){let a=new z(new B(e,t,n),new la({color:r,emissive:i,emissiveIntensity:i?1.5:0,metalness:r===Wf||r===Gf?.78:.36,roughness:.42,flatShading:!0}));return a.castShadow=!0,a.receiveShadow=!0,a}var Jf=class{constructor(){G(this,`group`,new L),G(this,`active`,!1),G(this,`turret`,void 0),G(this,`barrel`,void 0),G(this,`wheels`,[]),G(this,`yaw`,0),G(this,`turretYaw`,0),G(this,`fireT`,4),G(this,`spread`,.16);let e=this.group;e.scale.setScalar(2);let t=qf(3.4,1.1,5,Hf);t.position.y=1.5;let n=qf(3.2,.7,1.4,Uf);n.position.set(0,1.4,2.5),n.rotation.x=-.4;let r=qf(3,.2,4.2,Uf);r.position.y=2.08;let i=qf(1.5,.34,.12,Gf);i.position.set(0,1.57,3.13),i.rotation.x=-.4;let a=qf(.34,.28,.12,Kf,2846554);a.position.set(-1.12,1.7,3.12);let o=a.clone();o.position.x=1.12,e.add(t,n,r,i,a,o);for(let t of[-1,1]){let n=qf(.9,1.5,5.6,Gf);n.position.set(t*2,.9,0);let r=qf(1.1,.25,5.2,Hf);r.position.set(t*2,1.75,0);let i=qf(.12,1.12,5.25,Wf);i.position.set(t*2.47,.9,0),e.add(n,r,i);for(let n=0;n<4;n++){let r=new z(new Ki(.5,.5,.5,8),new ua({color:Wf}));r.rotation.z=Math.PI/2,r.position.set(t*2,.75,-1.9+n*1.25),e.add(r),this.wheels.push(r);let i=qf(.14,.24,.24,Uf);i.position.set(t*2.29,.75,-1.9+n*1.25),e.add(i)}}this.turret=new L,this.turret.position.y=2.2,e.add(this.turret);let s=qf(2.2,.25,2.2,Wf),c=qf(2.4,1.1,2.8,Hf);c.position.y=.65;let l=qf(2,.24,2.35,Uf);l.position.set(0,1.16,.1);let u=qf(1.2,.9,.7,Uf);u.position.set(0,.65,1.5);let d=qf(.9,.5,.9,Uf);d.position.set(-.6,1.35,-.4);let f=qf(.5,.2,.1,Kf,2846554);f.position.set(-.6,1.4,.06);let p=qf(.9,.4,.7,14197322);p.position.set(.8,1.4,-.9);let m=qf(.55,.55,.55,13201498);m.position.set(.85,1.45,.2);let h=qf(.38,.62,1.7,Uf);h.position.set(-1.12,.62,.12);let g=h.clone();g.position.x=1.12;let _=qf(.08,1.25,.08,Wf);_.position.set(-.95,1.8,-.72),this.turret.add(s,c,l,u,d,f,p,m,h,g,_),this.barrel=qf(.5,.5,4.6,Wf),this.barrel.position.set(0,.65,3.6);let v=qf(.72,.72,.7,Gf);v.position.set(0,.65,5.9);let y=qf(.72,.72,1.35,Uf);y.position.set(0,.65,2.15);let b=qf(.3,.32,.74,Wf);b.position.set(0,.65,5.92),this.turret.add(this.barrel,y,v,b),e.visible=!1}deploy(e){this.active=!0,this.group.visible=!0,this.group.position.copy(e),this.fireT=3}retire(){this.active=!1,this.group.visible=!1}update(e,t,n){if(!this.active)return;let r=this.group.position,i=n.playerPos.clone();i.x+=22,i.z+=18;let a=i.x-r.x,o=i.z-r.z,s=Math.hypot(a,o),c=Math.min(5,1.4+s*.1),l=s>5;if(l){let t=n.world.groundHeight(r.x,r.z,6),i=r.x+a/s*c*e,l=r.z+o/s*c*e;n.world.groundHeight(i,l,6)<=t+1.1&&(r.x=i,r.z=l);let u=Math.atan2(a,o)-this.yaw;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;this.yaw+=u*Math.min(1,e*1.4)}this.group.rotation.y=this.yaw;let u=n.world.groundHeight(r.x,r.z,6);if(r.y+=(u-r.y)*Math.min(1,e*4),l)for(let t of this.wheels)t.rotation.x+=e*7;if(n.target){let t=Math.atan2(n.target.x-r.x,n.target.z-r.z)-this.yaw-this.turretYaw;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;this.turretYaw+=t*Math.min(1,e*1.1)}if(this.turret.rotation.y=this.turretYaw,this.fireT-=e,n.target&&this.fireT<=0&&Math.abs(this.turretYaw)<Math.PI){this.fireT=3.4+Math.random()*1.8;let e=r.clone();e.y+=2.85*2,this.barrel.position.z=3,n.fire(e,n.target)}this.barrel.position.z+=(3.6-this.barrel.position.z)*Math.min(1,e*4)}},Yf=14921013,Xf=15131087,Zf=5858155,Qf=2435888,$f=7396584;function ep(e,t,n,r,i=0){let a=new z(new B(e,t,n),new la({color:r,emissive:i,emissiveIntensity:i?1.5:0,metalness:r===Zf||r===Qf?.72:.22,roughness:.4,flatShading:!0}));return a.castShadow=!0,a.receiveShadow=!0,a}var tp=class{constructor(){G(this,`group`,new L),G(this,`active`,!1),G(this,`yaw`,0),G(this,`armL`,new L),G(this,`armR`,new L),G(this,`beacon`,void 0);let e=this.group;e.scale.setScalar(1.75);for(let t of[-1,1]){let n=ep(.62,.55,2.25,Qf);n.position.set(t*.58,.36,0);for(let n=0;n<3;n++){let r=ep(.38,.38,.18,Zf);r.position.set(t*.9,.36,-.68+n*.68),e.add(r)}let r=ep(.42,1.45,.55,Xf);r.position.set(t*.58,1.25,0);let i=ep(.18,.9,.18,Yf);i.position.set(t*.58,1.3,.34),e.add(n,r,i)}let t=ep(1.3,.42,.9,Zf);t.position.y=2;let n=ep(.72,.7,.65,Qf);n.position.y=2.5;let r=ep(1.15,1.55,.9,Yf);r.position.y=3.55;let i=ep(.7,.75,.16,Xf);i.position.set(0,3.65,.52);let a=ep(.36,.24,.08,$f,2586501);a.position.set(0,3.82,.63);let o=ep(.46,.12,.08,Qf);o.position.set(0,3.45,.63);let s=ep(1.42,.16,1,Zf);s.position.set(0,4.22,0),e.add(t,n,r,i,a,o,s);let c=ep(.58,.52,.58,Xf);c.position.y=4.7;let l=ep(.48,.16,.08,$f,2586501);l.position.set(0,4.72,.33);let u=ep(.36,.18,.18,Qf);u.position.set(0,4.48,.24);let d=ep(.12,.46,.66,Yf);d.position.set(-.4,4.7,0);let f=d.clone();f.position.x=.4,this.beacon=ep(.16,.18,.16,16738866,16724504),this.beacon.position.set(0,5.08,0),e.add(c,l,u,d,f,this.beacon);for(let t of[-1,1]){let n=t<0?this.armL:this.armR;n.position.set(t*.78,4,0);let r=ep(.34,1.35,.38,Yf);r.position.y=-.58;let i=ep(.14,1.05,.46,Xf);i.position.set(t*.16,-.58,0);let a=ep(.42,.38,.42,Zf);a.position.y=-1.28;let o=ep(.3,1.15,.34,Xf);o.position.set(0,-1.88,.18);let s=ep(.1,1.1,.1,Qf);if(s.position.set(-t*.21,-1.85,.08),n.add(r,i,a,o,s),t<0){let e=ep(.72,.5,.7,Qf);e.position.set(0,-2.55,.35),e.rotation.x=.35,n.add(e)}else{let e=ep(.28,.62,.3,$f,2586501);e.position.set(0,-2.55,.32),n.add(e)}e.add(n)}let p=ep(1,1.35,.7,Zf);p.position.set(0,3.45,-.82);let m=ep(1.18,.18,.86,Yf);m.position.set(0,4.1,-.82);let h=ep(.18,.8,.18,Qf);h.position.set(-.62,3.8,-.82);let g=h.clone();g.position.x=.62,e.add(p,m,h,g),e.visible=!1}deploy(e){this.active=!0,this.group.visible=!0,this.group.position.copy(e)}retire(){this.active=!1,this.group.visible=!1}update(e,t,n){if(!this.active)return;let r=this.group.position,i=n.workTarget??n.playerPos,a=i.x-r.x,o=i.z-r.z,s=Math.hypot(a,o);if(s>10){let t=Math.min(7,2.5+s*.025),i=r.x+a/s*t*e,c=r.z+o/s*t*e,l=n.world.groundHeight(r.x,r.z,6);n.world.groundHeight(i,c,6)<=l+1.2&&(r.x=i,r.z=c);let u=Math.atan2(a,o)-this.yaw;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;this.yaw+=u*Math.min(1,e*1.8)}this.group.rotation.y=this.yaw;let c=n.world.groundHeight(r.x,r.z,6);r.y+=(c-r.y)*Math.min(1,e*5);let l=s<28,u=l?Math.sin(t*4.2)*.3:Math.sin(t*1.8)*.06;this.armL.rotation.x=-.18+u,this.armR.rotation.x=-.18-u,this.beacon.material.emissiveIntensity=l?1.5+Math.sin(t*8)*.5:.35}},np=100,rp=46,ip=5.2,ap=26,op=1.6,sp=300,cp=2.5,lp=560,up=900,dp=1400,fp=class{constructor(e){G(this,`groundAt`,void 0),G(this,`group`,new L),G(this,`shelters`,[]),G(this,`lost`,null),this.groundAt=e;for(let t of Wl){let n=e(t.x,t.z),r=new z(new Zi(15,17.5,40),new ni({color:6091424,transparent:!0,opacity:.42,side:2,depthWrite:!1}));r.rotation.x=-Math.PI/2,r.position.set(t.x,n+.4,t.z),this.group.add(r),this.shelters.push({name:t.name,pos:new I(t.x,n,t.z),hp:np,underAttack:!1,ring:r,people:0,capacity:sp,maxCapacity:lp,retired:!1})}}get active(){return this.shelters.filter(e=>!e.retired)}get targets(){return this.shelters.map(e=>e.retired?null:e.pos)}get weakest(){return this.active.reduce((e,t)=>e.hp<=t.hp?e:t)}get anyUnderAttack(){return this.shelters.find(e=>e.underAttack&&!e.retired)??null}get fullest(){return this.active.reduce((e,t)=>e.people/e.capacity>=t.people/t.capacity?e:t)}admit(e){let t=null;for(let n=0;n<e.length&&n<this.shelters.length;n++){if(e[n]<=0)continue;let r=this.shelters[n];r.retired||(r.people+=e[n],r.people>r.capacity&&!t&&(t=r))}return t}consolidate(e,t){let n=this.shelters[0];if(this.active.length===1)return this.relocate(e,t),n;let r=0;for(let e of this.shelters)r+=e.people,e!==n&&(e.retired=!0,e.underAttack=!1,e.people=0,e.ring.visible=!1);return n.retired=!1,n.hp=np,n.capacity=up,n.maxCapacity=dp,n.people=Math.min(r*.45,up*.5),this.relocate(e,t),n}relocate(e,t){let n=this.shelters[0];n.name=t,n.pos.copy(e),n.ring.visible=!0,n.ring.position.set(e.x,e.y+.4,e.z)}release(e){for(let t of this.active)t.hp>0&&!t.underAttack&&t.people>0&&(t.people=Math.max(0,t.people-e*cp))}expand(e){for(let t of this.active)t.hp>0&&(t.capacity=Math.min(t.maxCapacity,t.capacity+e*3.2))}update(e,t,n,r){let i=null;for(let a of this.active){if(a.hp<=0)continue;let o=0;n&&n.distanceTo(a.pos)<rp&&(o+=ip);for(let e of r)e.distanceTo(a.pos)<ap&&(o+=op);a.underAttack=o>0,o>0&&(a.hp=Math.max(0,a.hp-o*e),a.hp===0&&(i=a));let s=a.ring.material;if(a.underAttack)s.color.setHex(16731469),s.opacity=.4+Math.sin(t*9)*.28;else{let e=a.hp/np;s.color.setHex(e>.5?6091424:16761935),s.opacity=.42}}return i&&!this.lost&&(this.lost=i),i}mend(e){for(let t of this.active)t.hp>0&&!t.underAttack&&(t.hp=Math.min(np,t.hp+e*.9))}reconstruct(e){let t=this.active.reduce((e,t)=>np-e.hp+e.people/e.capacity*70>=np-t.hp+t.people/t.capacity*70?e:t);return!t.underAttack&&t.hp>0&&(t.hp=Math.min(np,t.hp+e*2.4)),t.people=Math.max(0,t.people-e*.22),t}reset(){this.lost=null;for(let e=0;e<this.shelters.length;e++){let t=this.shelters[e],n=Wl[e];t.hp=np,t.underAttack=!1,t.people=0,t.capacity=sp,t.maxCapacity=lp,t.retired=!1,t.name=n.name,t.pos.set(n.x,this.groundAt(n.x,n.z),n.z),t.ring.visible=!0,t.ring.position.set(t.pos.x,t.pos.y+.4,t.pos.z)}}},pp=46,mp=7.5,hp=17,gp=.72,_p=class{constructor(e){G(this,`group`,new L),G(this,`walkers`,[]),G(this,`pool`,[]),G(this,`seed`,1),G(this,`arrived`,[]),this.arrived=Array(e).fill(0)}get walking(){return this.walkers.length}take(){let e=this.pool.pop();if(e)return e.group.visible=!0,this.group.add(e.group),e;let{group:t,armL:n,armR:r}=zd(this.seed++);return t.scale.setScalar(3.2),this.group.add(t),{group:t,armL:n,armR:r,pos:new I,target:new I,shelter:0,phase:Math.random()*10}}release(e){this.group.remove(e.group),e.group.visible=!1,this.pool.push(e)}displace(e,t,n,r){if(n.length===0)return;let i=Math.min(6,1+Math.floor(t));for(let t=0;t<i&&!(this.walkers.length>=pp);t++){let t=-1,i=1/0;for(let r=0;r<n.length;r++){let a=n[r];if(!a)continue;let o=a.distanceToSquared(e);o<i&&(i=o,t=r)}if(t<0)return;let a=n[t],o=e.x,s=e.z;for(let t=0;t<16;t++){let t=Math.random()*Math.PI*2,n=7+Math.random()*18,r=e.x+Math.sin(t)*n,i=e.z+Math.cos(t)*n;if(Ou(Math.floor(r),Math.floor(i))){o=r,s=i;break}}let c=this.take();c.pos.set(o,r.groundHeight(o,s,6),s),c.target=a,c.shelter=t,c.phase=Math.random()*10,this.walkers.push(c)}}update(e,t,n){let r=Array(this.arrived.length).fill(0);for(let i=this.walkers.length-1;i>=0;i--){let a=this.walkers[i],o=a.target.x-a.pos.x,s=a.target.z-a.pos.z;if(Math.hypot(o,s)<hp){this.arrived[a.shelter]++,r[a.shelter]++,this.release(a),this.walkers.splice(i,1);continue}let c=Math.atan2(o,s),l=mp*e,u=[0,.42,-.42,.82,-.82,1.25,-1.25,Math.PI],d=!1;for(let e of u){let t=c+e+Math.sin(a.phase)*.035,r=a.pos.x+Math.sin(t)*l,i=a.pos.z+Math.cos(t)*l;if(!Ou(Math.floor(r),Math.floor(i)))continue;let o=Math.max(3,Math.ceil(a.pos.y+gp+.2)),s=n.groundHeight(r,i,o);if(!(Math.abs(s-a.pos.y)>gp)&&n.getBlock(Math.floor(r),Math.max(0,s-1),Math.floor(i))!==4){a.pos.set(r,s,i),d=!0;break}}d||(a.phase+=.6),a.group.position.copy(a.pos),a.group.position.y+=Math.abs(Math.sin(t*16+a.phase))*.2,a.group.rotation.y=c,a.armL.rotation.x=Math.PI-.3+Math.sin(t*14+a.phase)*.2,a.armR.rotation.x=Math.PI-.3-Math.sin(t*14+a.phase)*.2}return r}reset(){for(let e of this.walkers)this.release(e);this.walkers.length=0,this.arrived.fill(0)}},vp=22,yp=26,bp=.45,xp=class{constructor(e){G(this,`world`,void 0),G(this,`damaged`,new Map),G(this,`sites`,new Map),G(this,`tickT`,0),this.world=e}noteDamage(e,t){for(let n of e)this.damaged.set(n,t),this.sites.delete(n)}update(e,t,n,r,i=1){if(this.tickT-=e*i,this.tickT>0)return null;this.tickT=bp;let a={dirty:new Set,restored:[],startedSites:[]};for(let[e,n]of this.damaged){if(this.sites.size>=3)break;if(t-n<vp||this.sites.has(e))continue;let[r,i]=e.split(`,`).map(Number);this.sites.set(e,{cx:r,cz:i,pristine:Eu(r,i),cursor:0,skipped:!1}),a.startedSites.push({x:r*32+32/2,z:i*32+32/2})}let o=Math.round(yp*i);for(let[e,i]of this.sites){if(o<=0)break;let s=this.world.getChunk(i.cx,i.cz),c=1024*96;for(;i.cursor<c&&o>0;){let e=i.cursor++,t=s[e],c=i.pristine[e];if(t===c||c===H.Air||t!==H.Air)continue;let l=Math.floor(e/1024),u=e-l*32*32,d=Math.floor(u/32),f=u-d*32,p=i.cx*32+f,m=i.cz*32+d,h=p-n,g=m-r;if(h*h+g*g<144){i.skipped=!0;continue}!jl(c)&&c!==H.Water||(this.world.setBlock(p,l,m,c),a.dirty.add(this.world.key(i.cx,i.cz)),a.restored.push({x:p,y:l,z:m,id:c}),o--)}i.cursor>=c&&(this.sites.delete(e),i.skipped?this.damaged.set(e,t):this.damaged.delete(e))}return a.dirty.size>0||a.startedSites.length>0?a:null}activeSiteCount(){return this.sites.size}},Sp=500,Cp=new Hn,wp=class{constructor(){G(this,`mesh`,void 0),G(this,`particles`,[]);let e=new B(1,1,1),t=new ua;this.mesh=new Ti(e,t,Sp),this.mesh.instanceMatrix.setUsage(it),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.setColorAt(0,new R(1,1,1))}burst(e,t,n){for(let r=0;r<n;r++){this.particles.length>=Sp&&this.particles.shift();let n=t[r%Math.max(1,t.length)]??6;this.particles.push({pos:e.clone().add(new I((Math.random()-.5)*3,(Math.random()-.5)*3,(Math.random()-.5)*3)),vel:new I((Math.random()-.5)*12,Math.random()*12+3,(Math.random()-.5)*12),life:1+Math.random()*.8,size:.25+Math.random()*.45,color:new R(U[n]??10066329)})}}sparks(e,t,n=10,r=!1){let i=t.lengthSq()>.001?t.clone().normalize():new I(0,1,0);for(let t=0;t<n;t++){this.particles.length>=Sp&&this.particles.shift();let t=9+Math.random()*(r?20:13),n=new I((Math.random()-.5)*1.1,Math.random()*.75,(Math.random()-.5)*1.1),a=i.clone().multiplyScalar(t).addScaledVector(n,t*.72);a.y+=3+Math.random()*8,this.particles.push({pos:e.clone().add(new I((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2)),vel:a,life:.28+Math.random()*(r?.5:.3),size:.1+Math.random()*(r?.22:.14),color:new R(Math.random()<.28?16777215:r?16742944:16764757)})}}update(e){for(let t=this.particles.length-1;t>=0;t--){let n=this.particles[t];if(n.life-=e,n.life<=0||n.pos.y<-2){this.particles.splice(t,1);continue}n.vel.y-=28*e,n.pos.addScaledVector(n.vel,e)}this.mesh.count=this.particles.length;for(let e=0;e<this.particles.length;e++){let t=this.particles[e],n=t.size*Math.min(1,t.life);Cp.position.copy(t.pos),Cp.scale.setScalar(n),Cp.rotation.set(t.life*3,t.life*5,0),Cp.updateMatrix(),this.mesh.setMatrixAt(e,Cp.matrix),this.mesh.setColorAt(e,t.color)}this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}},Tp=[{d:[1,0,0],s:.8,v:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]]},{d:[-1,0,0],s:.8,v:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]]},{d:[0,1,0],s:1,v:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]]},{d:[0,-1,0],s:.5,v:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},{d:[0,0,1],s:.7,v:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]]},{d:[0,0,-1],s:.7,v:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]]}],Ep=new R,Dp=new ua({vertexColors:!0});function Op(e,t){let n=1/0,r=1/0,i=1/0,a=-1/0,o=-1/0,s=new Set;for(let[t,c,l]of e)s.add(t+`,`+c+`,`+l),t<n&&(n=t),c<r&&(r=c),l<i&&(i=l),t>a&&(a=t),l>o&&(o=l);let c=(n+a+1)/2,l=(i+o+1)/2,u=[],d=[],f=[],p=[],m=[];for(let[t,n,i,a]of e){m.length<6&&m.push(a);for(let e of Tp){if(s.has(t+e.d[0]+`,`+(n+e.d[1])+`,`+(i+e.d[2])))continue;let o=u.length/3;Ep.setHex(U[a]??10066329);let m=e.s*(.92+.08*Fl(t,n,i));for(let a of e.v)u.push(t-c+a[0],n-r+a[1],i-l+a[2]),d.push(e.d[0],e.d[1],e.d[2]),f.push(Math.min(1,Ep.r*m),Math.min(1,Ep.g*m),Math.min(1,Ep.b*m));p.push(o,o+1,o+2,o,o+2,o+3)}}let h=new Gr;h.setAttribute(`position`,new Nr(u,3)),h.setAttribute(`normal`,new Nr(d,3)),h.setAttribute(`color`,new Nr(f,3)),h.setIndex(p);let g=new z(h,Dp);g.position.set(c,r,l);let _=a-n+1,v=o-i+1,y=e.length/Math.max(1,_*v),b=Math.random()*Math.PI*2,x=new I(Math.cos(b),0,Math.sin(b)),S=Math.min(2.2,.3+y*.06)*(Math.random()<.5?1:-1);return{mesh:g,vel:0,spin:(Math.random()-.5)*.25,tipAxis:x,tipRate:S,tip:0,yaw:0,bottomY:r,groundY:t,blockCount:e.length,sampleIds:m}}var kp=new Wt,Ap=new Wt,jp=new I(0,1,0);function Mp(e,t){return e.vel+=24*t,e.mesh.position.y-=e.vel*t,e.tip=Math.sign(e.tipRate)*Math.min(Math.PI/2,Math.abs(e.tip)+Math.abs(e.tipRate)*t),e.yaw+=e.spin*t,Ap.setFromAxisAngle(jp,e.yaw),kp.setFromAxisAngle(e.tipAxis,e.tip),e.mesh.quaternion.copy(Ap).multiply(kp),e.mesh.position.y<=e.groundY}var Np=800,Pp=new Hn,Fp=new R,Ip=new Qi(1,12,10),Lp=new Zi(.82,1,32),Rp=class{constructor(){G(this,`group`,new L),G(this,`flashes`,[]),G(this,`smoke`,void 0),G(this,`puffs`,[]),G(this,`rings`,[]);let e=new B(1,1,1),t=new ua({color:16777215,transparent:!0,opacity:.8});this.smoke=new Ti(e,t,Np),this.smoke.instanceMatrix.setUsage(it),this.smoke.count=0,this.smoke.frustumCulled=!1,this.smoke.setColorAt(0,new R(1,1,1)),this.group.add(this.smoke)}boom(e,t){let n=new z(Ip,new ni({color:16757354,transparent:!0,opacity:.95,blending:2,depthWrite:!1}));if(n.position.copy(e),n.scale.setScalar(t*.3),this.group.add(n),this.flashes.push({mesh:n,life:.28,maxLife:.28,size:t}),t>=5){let n=new z(Lp,new ni({color:16769192,transparent:!0,opacity:.8,blending:2,depthWrite:!1,side:2}));n.position.set(e.x,e.y-t*.4,e.z),n.rotation.x=-Math.PI/2,n.scale.setScalar(t*.5),this.group.add(n),this.rings.push({mesh:n,life:.5,maxLife:.5,size:t})}let r=Math.min(14,5+Math.floor(t*2));for(let n=0;n<r;n++){this.puffs.length>=Np&&this.puffs.shift();let n=Math.random()*Math.PI*2,r=Math.random()*t*.7;this.puffs.push({pos:new I(e.x+Math.sin(n)*r,e.y+(Math.random()-.4)*t*.5,e.z+Math.cos(n)*r),vel:new I((Math.random()-.5)*3,2.5+Math.random()*3.5,(Math.random()-.5)*3),life:0,maxLife:1.1+Math.random()*.9,size:1.2+Math.random()*t*.5,gray:.35+Math.random()*.4})}}smokePuff(e,t,n=4,r=!1){for(let i=0;i<n;i++){this.puffs.length>=Np&&this.puffs.shift();let n=Math.random()*Math.PI*2,i=Math.random()*t*.6;this.puffs.push({pos:new I(e.x+Math.sin(n)*i,e.y+(Math.random()-.5)*t*.4,e.z+Math.cos(n)*i),vel:new I((Math.random()-.5)*2,1+Math.random()*2.5,(Math.random()-.5)*2),life:0,maxLife:2.4+Math.random()*2.2,size:2.4+Math.random()*t*.8,gray:r?.06+Math.random()*.1:.35+Math.random()*.4})}}update(e){for(let t=this.flashes.length-1;t>=0;t--){let n=this.flashes[t];if(n.life-=e,n.life<=0){this.group.remove(n.mesh),n.mesh.material.dispose(),this.flashes.splice(t,1);continue}let r=1-n.life/n.maxLife;n.mesh.scale.setScalar(n.size*(.3+r*1.4)),n.mesh.material.opacity=.95*(1-r)}for(let t=this.rings.length-1;t>=0;t--){let n=this.rings[t];if(n.life-=e,n.life<=0){this.group.remove(n.mesh),n.mesh.material.dispose(),this.rings.splice(t,1);continue}let r=1-n.life/n.maxLife;n.mesh.scale.setScalar(n.size*(.5+r*2.6)),n.mesh.material.opacity=.8*(1-r)}for(let t=this.puffs.length-1;t>=0;t--){let n=this.puffs[t];n.life+=e,n.life>=n.maxLife&&this.puffs.splice(t,1)}this.smoke.count=this.puffs.length;for(let t=0;t<this.puffs.length;t++){let n=this.puffs[t],r=n.life/n.maxLife;n.pos.addScaledVector(n.vel,e),n.vel.multiplyScalar(1-e*.6);let i=n.size*(.6+r*.9)*(r>.75?(1-r)/.25:1);Pp.position.copy(n.pos),Pp.scale.setScalar(Math.max(.01,i)),Pp.rotation.set(r*2+t,r*3,0),Pp.updateMatrix(),this.smoke.setMatrixAt(t,Pp.matrix);let a=n.gray*(1-r*.4);Fp.setRGB(a,a,a*1.05),this.smoke.setColorAt(t,Fp)}this.smoke.instanceMatrix.needsUpdate=!0,this.smoke.instanceColor&&(this.smoke.instanceColor.needsUpdate=!0)}},zp=300,Bp=new R(1707819),Vp=new R(3809106),Hp=new R(16777215),Up=new R(10868213),Wp=new R(12838136),Gp=new R(15905932),Kp=new R(16173988),qp=new R(1054770),Jp=new R(1779012);function Yp(e,t,n,r=1,i){let a=1/0,o=-1/0,s=1/0,c=-1/0,l=1/0,u=-1/0;for(let e of t)a=Math.min(a,e.x-e.rx),o=Math.max(o,e.x+e.rx),s=Math.min(s,e.y-e.ry),c=Math.max(c,e.y+e.ry),l=Math.min(l,e.z-e.rz),u=Math.max(u,e.z+e.rz);let d=[],f=new B(e*1.02,e*1.02,e*1.02),p=(e,t,n)=>{let i=Math.sin(e*12.9898+t*78.233+n*37.719+r*4.1)*43758.5453;return i-Math.floor(i)},m=(e,n,r)=>{let i=0;for(let a of t){let t=(e-a.x)/a.rx,o=(n-a.y)/a.ry,s=(r-a.z)/a.rz;i=Math.max(i,1-(t*t+o*o+s*s))}return i>=.06+p(e,n,r)*.22};for(let t=a;t<=o;t+=e)for(let n=s;n<=c;n+=e)for(let r=l;r<=u;r+=e){if(!m(t,n,r)||m(t+e,n,r)&&m(t-e,n,r)&&m(t,n+e,r)&&m(t,n-e,r)&&m(t,n,r+e)&&m(t,n,r-e))continue;let a=f.clone();if(a.translate(t,n,r),i){let e=i((n-s)/Math.max(.001,c-s));if(e<=.02){a.dispose();continue}let t=a.getAttribute(`position`).count,r=new Float32Array(t*4);for(let n=0;n<t;n++)r[n*4]=1,r[n*4+1]=1,r[n*4+2]=1,r[n*4+3]=e;a.setAttribute(`color`,new Ar(r,4))}d.push(a)}f.dispose();let h=Xp(d);for(let e of d)e.dispose();return new z(h,n)}function Xp(e){let t=new Gr;if(!e.length)return t;let n=0,r=0;for(let t of e)n+=t.getAttribute(`position`).count,r+=t.getIndex().count;let i=!!e[0].getAttribute(`color`),a=new Float32Array(n*3),o=new Float32Array(n*3),s=i?new Float32Array(n*4):null,c=new Uint32Array(r),l=0,u=0;for(let t of e){let e=t.getAttribute(`position`),n=t.getAttribute(`normal`),r=t.getIndex();a.set(e.array,l*3),o.set(n.array,l*3),s&&s.set(t.getAttribute(`color`).array,l*4);for(let e=0;e<r.count;e++)c[u+e]=r.getX(e)+l;l+=e.count,u+=r.count}return t.setAttribute(`position`,new Ar(a,3)),t.setAttribute(`normal`,new Ar(o,3)),s&&t.setAttribute(`color`,new Ar(s,4)),t.setIndex(new Ar(c,1)),t.computeBoundingSphere(),t}var Zp=new R,Qp=new R,$p=class{buildFuji(){let e=new L;for(let t=0;t<15;t++){let n=t/15,r=n*250,i=400*(1-n)*(1-n*.15),a=17.666666666666668,o=new ni({color:n>.68?15923199:7176096,fog:!1,transparent:!0,opacity:.92}),s=new z(new Ki(i*.86,i,a,7,1),o);s.position.y=r+a/2,e.add(s)}let t=new z(new Ki(400*.12,400*.16,10,7),new ni({color:14213872,fog:!1}));t.position.y=252,e.add(t);let n=()=>new ni({color:15922939,fog:!1,transparent:!0,opacity:.85,depthWrite:!1,vertexColors:!0}),r=e=>Math.min(1,Math.max(0,e)**1.35*1.25+.04),i=(t,i,a,o,s,c,l)=>{let u=t/i*Math.PI*2+a,d=400*s,f=[];for(let e=0;e<3;e++){let n=1-Math.abs(e-2/2)/3;f.push({x:(e-2/2)*c*.8,y:n*c*.16,z:Math.sin(t+e)*c*.12,rx:c*.55,ry:c*(.16+n*.12),rz:c*.3})}let p=Yp(18,f,n(),l+t,r);p.position.set(Math.sin(u)*d,o,Math.cos(u)*d),p.rotation.y=-u,e.add(p)};for(let e=0;e<22;e++)i(e,22,Math.sin(e*3.1)*.18,34+Math.sin(e*1.3)*9,.93+Math.sin(e*2.3)*.07,400*.3,11);for(let e=0;e<16;e++)i(e,16,.4,12+Math.sin(e*2.1)*6,1.07+Math.sin(e*1.9)*.08,400*.38,57);return e.renderOrder=-1,e}buildRift(){let e=new L;for(let t=0;t<26;t++){let n=t/25,r=Math.sin(n**.8*Math.PI),i=4+r*30,a=18.53846153846154,o=new z(new B(i+22+r*34,a,1),new ni({color:1378080,fog:!1,transparent:!0,opacity:.55+r*.4,depthWrite:!1})),s=Math.sin(t*2.3)*9;o.position.set(s,n*430,-3);let c=new z(new B(i,a,1),new ni({color:13081599,fog:!1,transparent:!0,opacity:.5+r*.45,depthWrite:!1}));c.position.set(s,n*430,0);let l=new z(new B(Math.max(1.6,i*.22),a,1),new ni({color:16643327,fog:!1,transparent:!0,opacity:.5+r*.45,depthWrite:!1}));l.position.set(s,n*430,1.5),e.add(o,c,l)}return e.renderOrder=-1,e}constructor(){G(this,`group`,new L),G(this,`sun`,void 0),G(this,`fuji`,void 0),G(this,`rift`,void 0),G(this,`moon`,void 0),G(this,`clouds`,[]),G(this,`birds`,[]),G(this,`birdMat`,new ua({color:2895928})),G(this,`cloudMat`,void 0),G(this,`cirrusMat`,void 0),G(this,`ash`,void 0),G(this,`haze`,void 0),G(this,`ashPos`,void 0),G(this,`state`,{sunDir:new I(.6,1,.35).normalize(),sunIntensity:1.3,hemiIntensity:1.2,skyColor:Zp,fogColor:Qp}),this.fuji=this.buildFuji(),this.group.add(this.fuji),this.rift=this.buildRift(),this.rift.position.set(Kl.x,0,Kl.z),this.group.add(this.rift),this.sun=new L;let e=new z(new Gi(22,24),new ni({color:16774856,fog:!1})),t=new z(new Gi(44,24),new ni({color:16773296,fog:!1,transparent:!0,opacity:.28,depthWrite:!1}));t.position.z=-.5,this.sun.add(e,t),this.group.add(this.sun),this.moon=new z(new Gi(16,24),new ni({color:15265023,fog:!1,transparent:!0,opacity:.9})),this.group.add(this.moon),this.cloudMat=new ni({color:15922939,fog:!1,transparent:!0,opacity:.85,depthWrite:!1}),this.cirrusMat=new ni({color:16185855,fog:!1,transparent:!0,opacity:.4,depthWrite:!1}),this.ashPos=new Float32Array(720);for(let e=0;e<240;e++)this.ashPos[e*3]=(Math.random()-.5)*180,this.ashPos[e*3+1]=Math.random()*90,this.ashPos[e*3+2]=(Math.random()-.5)*180;let n=new Gr;n.setAttribute(`position`,new Ar(this.ashPos,3)),this.ash=new zi(n,new Pi({color:14141920,size:.65,transparent:!0,opacity:0,depthWrite:!1,blending:1})),this.group.add(this.ash);let r=Array.from({length:4},()=>({x:(Math.random()-.5)*620,z:(Math.random()-.5)*620})),i=[`stratus`,`stratus`,`stratus`,`stratus`,`stratus`,`cumulus`,`cumulus`,`cumulus`,`cumulus`,`cumulus`,`cumulus`,`cumulus`,`cirrus`,`cirrus`,`cirrus`,`cirrus`,`cirrus`,`cirrus`];for(let e=0;e<i.length;e++){let t=i[e],n=new L,a=[],o=0,s=2.4,c=0;if(t===`stratus`){s=3.2,c=74+Math.random()*16;let e=4+Math.floor(Math.random()*3);for(let t=0;t<e;t++){let e=13+Math.random()*10;a.push({x:o,y:(Math.random()-.5)*3,z:(Math.random()-.5)*14,rx:e,ry:2.6+Math.random()*1.8,rz:10+Math.random()*8}),o+=e*1.05}}else if(t===`cumulus`){s=2.4,c=106+Math.random()*40;let e=3+Math.floor(Math.random()*3);for(let t=0;t<e;t++){let n=1-Math.abs(t-(e-1)/2)/e,r=7+Math.random()*6;a.push({x:o,y:n*5+Math.random()*1.5,z:(Math.random()-.5)*5,rx:r,ry:4+n*7+Math.random()*2,rz:6+Math.random()*4}),o+=r*1.15}}else{s=2.8,c=168+Math.random()*55;let e=3+Math.floor(Math.random()*3);for(let t=0;t<e;t++){let e=16+Math.random()*14;a.push({x:o,y:(Math.random()-.5)*4,z:(Math.random()-.5)*6,rx:e,ry:1.7+Math.random()*1.2,rz:3.5+Math.random()*3}),o+=e*(.85+Math.random()*.4)}}let l=t===`cirrus`?this.cirrusMat:this.cloudMat;n.add(Yp(s,a,l,e+1));let u=r[e%r.length];n.position.set(u.x+(Math.random()-.5)*260,c,u.z+(Math.random()-.5)*260),n.rotation.y=Math.random()*Math.PI*2,this.group.add(n);let d=t===`cirrus`?2.4:t===`cumulus`?1:.55;this.clouds.push({group:n,speed:(1.1+Math.random()*.7)*d})}this.haze=new L;for(let e=0;e<44;e++){let t=e/44*Math.PI*2,n=430+Math.sin(e*2.7)*40,r=new L,i=[];for(let t=0;t<3;t++)i.push({x:(t-1)*44,y:Math.sin(e*2.1+t)*7,z:Math.sin(e+t*2)*12,rx:34+Math.sin(e+t)*10,ry:9+Math.sin(e*1.7+t)*4,rz:22});r.add(Yp(10,i,new ni({color:14478070,fog:!1,transparent:!0,opacity:.34+Math.sin(e*1.3)*.08,depthWrite:!1}),e+101)),r.position.set(Math.sin(t)*n,16+Math.sin(e*1.9)*14,Math.cos(t)*n),r.rotation.y=-t,this.haze.add(r)}this.haze.renderOrder=-1,this.group.add(this.haze);for(let e=0;e<3;e++){let e=new I((Math.random()-.5)*160,0,(Math.random()-.5)*160),t=4+Math.floor(Math.random()*3);for(let n=0;n<t;n++){let t=new L,n=new z(new B(.5,.35,1.4),this.birdMat),r=new z(new B(2,.1,.7),this.birdMat);r.geometry.translate(-1,0,0);let i=new z(new B(2,.1,.7),this.birdMat);i.geometry.translate(1,0,0),t.add(n,r,i),this.group.add(t),this.birds.push({group:t,wingL:r,wingR:i,center:e,radius:14+Math.random()*18,angle:Math.random()*Math.PI*2,speed:.35+Math.random()*.25,height:38+Math.random()*22,flap:Math.random()*10})}}}update(e,t,n,r,i=0){let a=(t/zp+.22)%1*Math.PI*2,o=Math.sin(a),s=this.state.sunDir;if(s.set(Math.cos(a)*.9,o,.35).normalize(),o>.25)Zp.copy(Up),Qp.copy(Wp);else if(o>0){let e=o/.25;Zp.lerpColors(Gp,Up,e),Qp.lerpColors(Kp,Wp,e)}else if(o>-.2){let e=-o/.2;Zp.lerpColors(Gp,qp,e),Qp.lerpColors(Kp,Jp,e)}else Zp.copy(qp),Qp.copy(Jp);i>.001&&(Zp.lerp(Bp,i),Qp.lerp(Vp,i));let c=Math.max(0,Math.min(1,o*3+.2));c*=1-i*.75,this.state.sunIntensity=.05+c*1.3,this.state.hemiIntensity=.38+c*.9,this.sun.position.copy(n).addScaledVector(s,430),this.sun.visible=o>-.06,this.sun.lookAt(r.position),this.moon.position.copy(n).addScaledVector(s,-430),this.moon.visible=o<.06,this.moon.lookAt(r.position),this.fuji.position.set(n.x-620,-168,n.z-880),this.fuji.traverse(e=>{let t=e;if(t.isMesh){let e=t.material,n=e.userData.base??(e.userData.base=e.color.clone());e.color.copy(n).multiplyScalar(.3+c*.7)}});let l=.86+Math.sin(t*.7)*.07+Math.sin(t*2.3)*.03;this.rift.scale.set(1+i*.35,l,1),this.rift.rotation.y=Math.atan2(r.position.x-this.rift.position.x,r.position.z-this.rift.position.z),this.rift.traverse(e=>{let t=e;if(t.isMesh){let e=t.material,n=e.userData.baseOpacity??(e.userData.baseOpacity=e.opacity);e.opacity=Math.min(1,n*(.75+i*.6)*l)}}),this.cloudMat.color.copy(Qp).lerp(Hp,.45+c*.35),this.cirrusMat.color.copy(Qp).lerp(Hp,.55+c*.3);let u=this.ash.material;if(u.opacity=Math.max(0,(i-.08)*.8),this.ash.visible=u.opacity>.01,this.ash.position.set(n.x,n.y,n.z),this.ash.visible){for(let t=0;t<this.ashPos.length;t+=3)this.ashPos[t]+=e*(1.4+i*2.2),this.ashPos[t+1]-=e*(2.1+t%7*.08),this.ashPos[t]>90&&(this.ashPos[t]=-90),this.ashPos[t+1]<0&&(this.ashPos[t+1]=90);this.ash.geometry.getAttribute(`position`).needsUpdate=!0}this.haze.position.set(n.x,0,n.z),this.haze.traverse(e=>{let t=e;t.isMesh&&t.material.color.copy(Qp).lerp(Zp,.35)});for(let t of this.clouds)t.group.position.x+=t.speed*.94*e,t.group.position.z+=t.speed*.34*e,t.group.position.x-n.x>330&&(t.group.position.x-=660),t.group.position.x-n.x<-330&&(t.group.position.x+=660),t.group.position.z-n.z>330&&(t.group.position.z-=660),t.group.position.z-n.z<-330&&(t.group.position.z+=660);let d=c>.25;for(let t of this.birds){if(t.group.visible=d,!d)continue;t.angle+=t.speed*e,t.flap+=e*(7+t.speed*6);let r=n.x+t.center.x+Math.sin(t.angle)*t.radius,i=n.z+t.center.z+Math.cos(t.angle)*t.radius;t.group.position.set(r,t.height+Math.sin(t.angle*3)*2,i),t.group.rotation.y=t.angle+Math.PI/2;let a=Math.sin(t.flap)*.6;t.wingL.rotation.z=a,t.wingR.rotation.z=-a}return this.state}},Y=new class{constructor(){G(this,`ctx`,null),G(this,`master`,void 0),G(this,`beamOsc`,null),G(this,`beamGain`,null),G(this,`musicGain`,null),G(this,`musicVoice`,null),G(this,`musicWet`,null),G(this,`musicTimer`,null),G(this,`panL`,null),G(this,`panR`,null),G(this,`nextBarTime`,0),G(this,`barIndex`,0),G(this,`musicMode`,`intro`),G(this,`requestedMode`,`intro`),G(this,`sfxVolume`,.4),G(this,`musicVolume`,.145),G(this,`lowHealth`,!1)}ensure(){if(this.ctx){this.ctx.state===`suspended`&&this.ctx.resume();return}this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=this.sfxVolume,this.master.connect(this.ctx.destination)}reverbImpulse(e,t){let n=this.ctx,r=Math.floor(n.sampleRate*e),i=n.createBuffer(2,r,n.sampleRate);for(let e=0;e<2;e++){let n=i.getChannelData(e);for(let e=0;e<r;e++){let i=e/r;n[e]=(Math.random()*2-1)*(1-i)**t*(i<.02?i/.02:1)}}return i}noiseBuffer(e){let t=this.ctx,n=t.createBuffer(1,Math.ceil(t.sampleRate*e),t.sampleRate),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.random()*2-1;return n}env(e,t,n,r){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(n,t+.01),e.gain.exponentialRampToValueAtTime(1e-4,t+r)}laser(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`square`,n.frequency.setValueAtTime(950,t),n.frequency.exponentialRampToValueAtTime(180,t+.16);let r=e.createGain();this.env(r,t,.25,.18),n.connect(r).connect(this.master),n.start(t),n.stop(t+.2)}swing(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noiseBuffer(.35);let r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.setValueAtTime(300,t),r.frequency.exponentialRampToValueAtTime(1400,t+.18),r.frequency.exponentialRampToValueAtTime(400,t+.32),r.Q.value=2.5;let i=e.createGain();this.env(i,t,.5,.34),n.connect(r).connect(i).connect(this.master),n.start(t)}explode(e,t=1){if(!this.ctx||t<=0)return;let n=this.ctx,r=n.currentTime,i=.35+e*.45,a=n.createBufferSource();a.buffer=this.noiseBuffer(i);let o=n.createBiquadFilter();o.type=`lowpass`,o.frequency.setValueAtTime(900+e*600,r),o.frequency.exponentialRampToValueAtTime(80,r+i);let s=n.createGain();this.env(s,r,(.25+e*.45)*t,i),a.connect(o).connect(s).connect(this.master),a.start(r);let c=n.createOscillator();c.type=`sine`,c.frequency.setValueAtTime(90,r),c.frequency.exponentialRampToValueAtTime(28,r+.3);let l=n.createGain();this.env(l,r,(.4+e*.3)*t,.32),c.connect(l).connect(this.master),c.start(r),c.stop(r+.35)}thud(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`sine`,n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(35,t+.25);let r=e.createGain();this.env(r,t,.5,.28),n.connect(r).connect(this.master),n.start(t),n.stop(t+.3)}impact(e=1,t=!1){if(!this.ctx)return;let n=this.ctx,r=n.currentTime,i=n.createBufferSource();i.buffer=this.noiseBuffer(.14);let a=n.createBiquadFilter();a.type=`bandpass`,a.frequency.value=t?1800:720,a.Q.value=t?1.8:.8;let o=n.createGain();this.env(o,r,Math.min(.65,.22+e*.25),.13),i.connect(a).connect(o).connect(this.master),i.start(r);let s=n.createOscillator();s.type=`triangle`,s.frequency.setValueAtTime(t?240:105,r),s.frequency.exponentialRampToValueAtTime(42,r+.16);let c=n.createGain();this.env(c,r,Math.min(.55,.18+e*.22),.18),s.connect(c).connect(this.master),s.start(r),s.stop(r+.2)}rocket(e=1){if(!this.ctx||e<=.04)return;let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noiseBuffer(.5);let i=t.createBiquadFilter();i.type=`highpass`,i.frequency.value=900;let a=t.createGain();this.env(a,n,.22*e,.5),r.connect(i).connect(a).connect(this.master),r.start(n)}zap(e=1){if(!this.ctx||e<=.04)return;let t=this.ctx,n=t.currentTime,r=t.createOscillator();r.type=`sawtooth`,r.frequency.setValueAtTime(2400,n),r.frequency.exponentialRampToValueAtTime(120,n+.22);let i=t.createGain();this.env(i,n,.35*e,.24),r.connect(i).connect(this.master),r.start(n),r.stop(n+.26);let a=t.createBufferSource();a.buffer=this.noiseBuffer(.2);let o=t.createBiquadFilter();o.type=`highpass`,o.frequency.value=2e3;let s=t.createGain();this.env(s,n,.25*e,.18),a.connect(o).connect(s).connect(this.master),a.start(n)}roar(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`sawtooth`,n.frequency.setValueAtTime(140,t),n.frequency.exponentialRampToValueAtTime(45,t+1.1);let r=e.createOscillator();r.frequency.value=9;let i=e.createGain();i.gain.value=22,r.connect(i).connect(n.frequency);let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=500;let o=e.createGain();this.env(o,t,.55,1.15),n.connect(a).connect(o).connect(this.master),n.start(t),r.start(t),n.stop(t+1.2),r.stop(t+1.2)}jingle(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime;[523,659,784,1047].forEach((n,r)=>{let i=e.createOscillator();i.type=`triangle`,i.frequency.value=n;let a=e.createGain();this.env(a,t+r*.12,.3,.5),i.connect(a).connect(this.master),i.start(t+r*.12),i.stop(t+r*.12+.55)})}beamOn(){if(!this.ctx||this.beamOsc)return;let e=this.ctx,t=e.currentTime;this.beamOsc=e.createOscillator(),this.beamOsc.type=`sawtooth`,this.beamOsc.frequency.value=70;let n=e.createOscillator();n.frequency.value=13;let r=e.createGain();r.gain.value=14,n.connect(r).connect(this.beamOsc.frequency),n.start(t),this.beamGain=e.createGain(),this.beamGain.gain.setValueAtTime(1e-4,t),this.beamGain.gain.exponentialRampToValueAtTime(.3,t+.08),this.beamOsc.connect(this.beamGain).connect(this.master),this.beamOsc.start(t),this.beamOsc._lfo=n}startMusic(e=`intro`){if(!this.ctx)return;if(this.musicTimer!==null){this.requestedMode=e;return}this.musicMode=this.requestedMode=e,this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.musicVolume,this.musicGain.connect(this.ctx.destination);let t=this.ctx,n=t.createBiquadFilter();n.type=`lowpass`,n.frequency.value=3200,n.Q.value=.4;let r=t.createGain();r.gain.value=.78;let i=t.createGain();i.gain.value=.42;let a=t.createConvolver();a.buffer=this.reverbImpulse(2.6,2.4),n.connect(r).connect(this.musicGain),n.connect(a).connect(i).connect(this.musicGain),this.musicVoice=n,this.musicWet=i,this.panL=t.createStereoPanner(),this.panL.pan.value=-.35,this.panL.connect(n),this.panR=t.createStereoPanner(),this.panR.pan.value=.35,this.panR.connect(n),this.nextBarTime=this.ctx.currentTime+.1,this.barIndex=0,this.musicTimer=window.setInterval(()=>this.scheduleMusic(),250)}setMusicIntensity(e){this.setMusicMode(e>.5?`boss`:`explore`)}setMusicMode(e){this.requestedMode=e}setVolumes(e,t){if(this.musicVolume=Math.max(0,Math.min(1,e))*.24,this.sfxVolume=Math.max(0,Math.min(1,t))*.65,!this.ctx)return;let n=this.ctx.currentTime;if(this.master.gain.setTargetAtTime(this.sfxVolume,n,.04),this.musicGain){let e=this.lowHealth?.72:1;this.musicGain.gain.setTargetAtTime(this.musicVolume*e,n,.18)}}setLowHealth(e){this.lowHealth!==e&&(this.lowHealth=e,!(!this.ctx||!this.musicGain)&&(this.musicGain.gain.setTargetAtTime(this.musicVolume*(e?.72:1),this.ctx.currentTime,.35),e&&this.warningPulse()))}footstep(e=1){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,r=t.createOscillator();r.type=`sine`,r.frequency.setValueAtTime(72,n),r.frequency.exponentialRampToValueAtTime(32,n+.12);let i=t.createGain();this.env(i,n,.18*e,.14),r.connect(i).connect(this.master),r.start(n),r.stop(n+.16)}servo(e=1){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,r=t.createOscillator();r.type=`triangle`,r.frequency.setValueAtTime(180,n),r.frequency.exponentialRampToValueAtTime(420,n+.09);let i=t.createGain();this.env(i,n,.06*e,.1),r.connect(i).connect(this.master),r.start(n),r.stop(n+.12)}bossStinger(e=!1){if(!this.ctx)return;let t=this.ctx.currentTime;(e?[55,77.78,58.27]:[73.42,110,146.83]).forEach((n,r)=>this.note(n,t+r*.13,.75,e?`sawtooth`:`triangle`,.18,this.master)),this.drum(t,.28,!1,this.master)}phaseStinger(e=!1){if(!this.ctx)return;let t=this.ctx.currentTime;[146.83,174.61,e?293.66:220].forEach((e,n)=>this.note(e,t+n*.08,.4,`sawtooth`,.12,this.master))}victoryStinger(){if(!this.ctx)return;let e=this.ctx.currentTime;[220,277.18,329.63,440].forEach((t,n)=>this.note(t,e+n*.14,.65,`triangle`,.16,this.master))}warningPulse(){if(!this.ctx)return;let e=this.ctx.currentTime;for(let t=0;t<2;t++)this.note(82.41,e+t*.22,.12,`square`,.06,this.master)}scheduleMusic(){let e=this.ctx,t=this.barLength(this.musicMode);for(;this.nextBarTime<e.currentTime+t*2;){this.musicMode!==this.requestedMode&&(this.musicMode=this.requestedMode,this.barIndex=0);let e=this.barLength(this.musicMode);this.scheduleBar(this.nextBarTime,e),this.nextBarTime+=e,this.barIndex++}}barLength(e){return e===`boss`?1.35:e===`revenant`?1.72:e===`intro`?2.4:2.05}note(e,t,n,r,i,a,o=.04,s=0){let c=this.ctx,l=c.createOscillator();l.type=r,l.frequency.value=e,s&&(l.detune.value=s);let u=c.createGain(),d=Math.min(o,n*.5);u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(i,t+d),u.gain.setValueAtTime(i,t+Math.min(n*.55,d+n*.3)),u.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(u).connect(a),l.start(t),l.stop(t+n+.08)}drum(e,t,n,r){let i=this.ctx,a=i.createBufferSource();a.buffer=this.noiseBuffer(n?.11:.2);let o=i.createBiquadFilter();o.type=n?`highpass`:`lowpass`,o.frequency.value=n?2600:240;let s=i.createGain();this.env(s,e,t,n?.1:.18),a.connect(o).connect(s).connect(r),a.start(e)}scheduleBar(e,t){let n=this.musicGain,r=this.musicMode,i={intro:[[146.83,220,293.66],[174.61,261.63,349.23],[196,293.66,392],[220,329.63,440]],explore:[[220,261.63,329.63],[174.61,220,261.63],[130.81,196,261.63],[196,246.94,293.66]],boss:[[146.83,174.61,220],[116.54,146.83,174.61],[130.81,164.81,196],[138.59,174.61,207.65]],revenant:[[110,155.56,164.81],[103.83,146.83,155.56],[92.5,130.81,138.59],[110,155.56,164.81]]}[r][this.barIndex%4],a=r===`boss`,o=r===`revenant`,s=r===`intro`,c=this.musicVoice??n,l=this.barIndex%2==0?this.panL??c:this.panR??c,u=Math.floor(this.barIndex/4)%2==1;for(let n of i)this.note(n,e,t*1.6,o?`sawtooth`:`triangle`,o?.025:.042,c,t*.3),this.note(n,e,t*1.6,o?`sawtooth`:`triangle`,o?.018:.03,l,t*.34,o?9:5),o||this.note(n*2.003,e,t*1.35,`sine`,(s?.04:.025)*(u?1.25:1),c,t*.4),a&&this.note(n*.997,e,t*.72,`sawtooth`,.025,c,.02);let d=i[0]/2;if(this.note(d,e,t*(o?1.15:.9),o?`triangle`:`sine`,o?.14:.11,n,.03),a){let r=u&&this.barIndex%4==3?[0,.25,.75]:[0,.25,.5,.75];for(let i of r)this.note(d,e+t*i,t*.18,`sawtooth`,.055,n,.012),this.drum(e+t*i,i===0?.12:.07,!1,n);this.drum(e+t*.5,.07,!0,n),u&&this.drum(e+t*.875,.05,!0,n)}else o?(this.drum(e,.11,!1,n),this.drum(e+t*.75,.045,!0,n)):this.drum(e,.05,!1,n);let f={intro:[[0,null,1,2],[2,1,null,0]],explore:[[0,null,2,1,null],[2,1,null,0,null]],boss:[[0,2,1,2,0,null,1,2],[0,1,2,null,2,1,0,null]],revenant:[[0,null,2],[2,null,1]]}[r][+!!u];for(let n=0;n<f.length;n++){let r=f[n];if(r===null)continue;let l=a?2:s&&n===f.length-1||u?4:2,d=i[r]*l,p=n===0?1.25:1;this.note(d,e+n/f.length*t,o?.62:a?.26:.44,o?`sine`:`triangle`,(a?.062:o?.035:.04)*p,n%2==0?this.panR??c:this.panL??c,a?.015:.06)}}beamOff(){if(!this.ctx||!this.beamOsc)return;let e=this.ctx.currentTime;this.beamGain.gain.cancelScheduledValues(e),this.beamGain.gain.setValueAtTime(this.beamGain.gain.value,e),this.beamGain.gain.exponentialRampToValueAtTime(1e-4,e+.12),this.beamOsc.stop(e+.15),this.beamOsc._lfo.stop(e+.15),this.beamOsc=null,this.beamGain=null}},X=`AYA · COMMAND`,Z=`DR. KUROSAWA`,Q=`KUROKI`,em=`REI · MEMORIAL`,$=`HINATA · PILOT`,tm=`KOTETSU · SUPPORT`,nm=`JOTETSU · ENGINEER`,rm=[{who:X,text:`Kuroki, are you even listening? The bay tore open fourteen hours ago.`},{who:Q,text:`Heard you the first time. Big hole, big monsters, big hero. Got it.`},{who:X,text:`Every defence line we had is GONE. This is not a joke!`},{who:Z,text:`The suit is a prototype. Untested. Please bring it back in one piece.`},{who:Q,text:`No promises on the suit. …The shelters. They full?`},{who:X,text:`…They are full.`},{who:X,text:`Kuroki. This is not the last one. Do you understand me? Not again.`},{who:Q,text:`Then nothing gets past me. Launching.`}],im=[{no:1,title:`FIRST CONTACT`,cold:`The bay is still open.<br/>Whatever came through is in the eastern wards, and it is not leaving.`,brief:[{who:X,text:`Contact in the eastern wards — it is tearing the district apart!`},{who:Q,text:`Finally. Thought I got dressed up for nothing.`},{who:X,text:`Kuroki, I swear— just get between it and the shelters!`}],debrief:[{who:Q,text:`One down. Did everyone see that, or should I go slower?`},{who:X,text:`You took a hit you did NOT need to take, showing off like that.`},{who:Z,text:`The carcass is venting plasma. I can route it into your rifle.`},{who:X,text:`…Good work. Do not let it go to your head.`},{who:Q,text:`Too late.`}]},{no:2,title:`THE SKY OPENS`,cold:`It has been circling since dawn without landing.<br/>It was not lost. It was choosing.`,brief:[{who:X,text:`Airborne contact. It has circled since dawn — it was WAITING.`},{who:Q,text:`Patient. I respect that. Does not change how this ends.`},{who:X,text:`You cannot outrun it on the ground. Please, for once, be careful.`},{who:X,text:`And you are not going alone. Kurosawa cleared the second frame this morning.`},{who:$,text:`HINATA, dropping in! Hi! Oh wow, you are TALLER than the file said.`},{who:Q,text:`…Aya. Who is this.`},{who:$,text:`Hinata! I am your wingman! Please look after me, senpai!`},{who:Q,text:`Do not call me that.`},{who:X,text:`Second-frame descent cleared. Hinata — deploy now!`}],debrief:[{who:Z,text:`Thrust core intact! Bolt it to your boots and you will fly properly.`},{who:Q,text:`You are telling me I did all that WITHOUT proper boots?`},{who:X,text:`They are not attacking at random. They are pushing inland. Together.`},{who:Q,text:`…Yeah. I noticed that too.`}]},{no:3,title:`BENEATH THE STREETS`,cold:`The seismographs under the subway line will not settle.<br/>Something is using the tunnels.`,brief:[{who:Z,text:`Seismic readings all down the subway line. It is underneath you.`},{who:Q,text:`Under me. Perfect. My favourite place for a two-hundred-tonne snake.`},{who:X,text:`It lights up before it strikes. Watch for it. WATCH for it, Kuroki.`},{who:X,text:`Heavy support is approaching from the south. Identify yourself.`},{who:tm,text:`Kotetsu. Kurogane support tank. I brought shells, tools, and several bad ideas.`},{who:Q,text:`You know how to drive that thing?`},{who:tm,text:`Drive, yes. Aim is currently more theoretical.`},{who:$,text:`Kotetsu fixes everything! Usually after he accidentally hits it.`},{who:X,text:`Kurogane descent cleared. Kotetsu, deploy!`}],debrief:[{who:Q,text:`Told you I would watch for it.`},{who:X,text:`You watched for NONE of it! I have the damage readout right here!`},{who:X,text:`…That last turn. Where did you learn that?`},{who:Q,text:`You know exactly where.`},{who:Z,text:`I can weaponise the discharge. Call it a nova pulse.`},{who:Z,text:`Kuroki… its spine had a seam. A machined seam.`},{who:Q,text:`Say that again.`}]},{no:4,title:`THE MACHINE IN THE MONSTER`,cold:`It came up the boulevard in daylight, in the open,<br/>and it did not hurry.`,brief:[{who:X,text:`This one is walking straight up the boulevard. No stealth. No fear.`},{who:Q,text:`Something we have in common.`},{who:X,text:`It has plating we cannot identify. And you are not going alone.`},{who:Q,text:`I work alone. You know I work alone.`},{who:$,text:`I am on your wing, senpai. I will cover the east side.`},{who:nm,text:`Jotetsu. Senior reconstruction engineer. Digger frame awaiting clearance.`},{who:tm,text:`My older brother. He is friendlier than he sounds. Marginally.`},{who:nm,text:`Kotetsu, you arrived one chapter ago and have already shelled a pharmacy.`},{who:tm,text:`The monster moved.`},{who:nm,text:`Of course it did. Even the monster understands what your aim means.`},{who:X,text:`Enough. Jotetsu, repair the shelters. Digger deployment cleared.`}],debrief:[{who:Z,text:`It is not armour. It is fabrication. These things are being BUILT.`},{who:Q,text:`Then somebody is aiming them. At us. On purpose.`},{who:X,text:`Built by WHO? Kurosawa, tell me you have something—`},{who:Z,text:`I have nothing. Salvage the plating. We will need it.`},{who:$,text:`I blocked four hits for you. Just so it is on the record.`},{who:Q,text:`Nobody asked you to.`},{who:X,text:`Nobody ever has to ask her. That is rather the point.`}]},{no:5,title:`WHAT CIRCLES ABOVE`,cold:`The shadow crossed three districts before anyone<br/>thought to look up.`,brief:[{who:Z,text:`It has been mapping us. Flight paths in a perfect survey grid.`},{who:X,text:`It is scouting. Something is using it to look at our city.`},{who:Q,text:`Then let us give it something to look at.`},{who:tm,text:`Kurogane is in position. I can miss it from here just as effectively.`},{who:nm,text:`Three shelter blocks restored. Try not to demolish them again before lunch.`},{who:$,text:`No promises! Senpai is already doing the hero pose.`}],debrief:[{who:Z,text:`Its spine houses a rail accelerator. That is yours now.`},{who:X,text:`Its logs point back to the bay. All of them. To the rift.`},{who:Q,text:`So that is where this ends. Good. I hate loose ends.`},{who:X,text:`You hate PAPERWORK. Which you still owe me, by the way.`}]},{no:6,title:`BLADE AND BONE`,cold:`It clears a city block in under four seconds.<br/>Nothing that big should move like that.`,brief:[{who:X,text:`Fast mover closing on the old quarter — do not let it flank you!`},{who:Q,text:`Relax. Nothing out here is faster than me.`},{who:X,text:`It hunts like it was TAUGHT to. Stop grinning and focus.`}],debrief:[{who:Z,text:`That scythe alloy holds an edge better than anything we make. Take both.`},{who:Q,text:`Two swords. Now we are talking.`},{who:X,text:`Casualty reports are dropping. People are starting to believe again.`},{who:X,text:`They are painting your suit on the shelter walls. Do not tell him, doctor.`},{who:Q,text:`Too late. Heard it. I am going to be unbearable now.`},{who:X,text:`They painted my sister up there too. Years ago. It is still there.`},{who:Q,text:`…I know. I walk past it every morning.`}]},{no:7,title:`THE GROUND BREAKS`,cold:`The asphalt has been warm since midnight.<br/>Kurosawa says that is the least of it.`,brief:[{who:Z,text:`Magma surge under the western hills. It is coming up through the rock.`},{who:X,text:`If it lands a slam it will BURY you. Do you understand me?`},{who:Q,text:`Loud and clear. You worry too much.`},{who:$,text:`She worries the correct amount, senpai.`},{who:X,text:`Thank you, Hinata.`}],debrief:[{who:Z,text:`I can push that shockwave through your legs. Do not stand near anything.`},{who:$,text:`Senpai, you took eleven hits I could have blocked. I counted!`},{who:Q,text:`Nobody asked you to count.`},{who:X,text:`Your integrity dropped to nine percent out there. NINE, Kuroki.`},{who:Q,text:`Nine is still a number.`},{who:X,text:`…The rift is widening. Whatever is sending them is out of patience.`}]},{no:8,title:`FROM BELOW`,cold:`No contact on any scope.<br/>Only the sound of something moving under the foundations.`,brief:[{who:X,text:`It burrows. No visual, no warning — then it is on top of you.`},{who:$,text:`I will watch the ground! If it moves under you I will shout!`},{who:Q,text:`Stay behind me.`},{who:$,text:`Nope!`},{who:X,text:`Keep moving. Kuroki. Please. Keep moving.`},{who:Q,text:`…You never say please.`},{who:X,text:`I said it once before. On a comm channel exactly like this one.`},{who:X,text:`So humour me.`}],debrief:[{who:Z,text:`Head repeaters recovered. Small calibre, very fast. You will like them.`},{who:Z,text:`I decoded part of its control signal. Kuroki — it is a countdown.`},{who:Q,text:`To what?`},{who:Z,text:`I do not know. But it is nearly finished.`}]},{no:9,title:`THE CITY BURNS`,cold:`Six wards are alight and the wind is turning.<br/>The fire is the weapon, not the wound.`,brief:[{who:Z,text:`The countdown ended. THIS is what it was waiting for.`},{who:X,text:`It is torching the wards faster than we can evacuate them!`},{who:Q,text:`How many are still down there?`},{who:X,text:`Too many. GO!`},{who:$,text:`I will take the east wards! You take the fire!`},{who:Q,text:`Hinata — do not plant yourself in front of it. It is not worth—`},{who:$,text:`That is literally what the shield is for, senpai!`}],debrief:[{who:Q,text:`Hinata. Report.`},{who:$,text:`…Shield is slag and I cannot feel my left arm. But I am here!`},{who:Q,text:`…Good.`},{who:$,text:`Was that concern? Aya, was that concern?`},{who:X,text:`That was absolutely concern.`},{who:Q,text:`How many did we lose.`},{who:X,text:`Kuroki—`},{who:Q,text:`How many, Aya.`},{who:X,text:`…Three districts. But thousands got out. Because you held the line.`},{who:Z,text:`Take its igniter. And — the rift is fully open. One signature left.`}]},{no:10,title:`WHAT CAME THROUGH FIRST`,cold:`Everything since the bay split has been an escort.<br/>This is what they were escorting.`,brief:[{who:Z,text:`This is the one that opened the bay. Everything else was an escort.`},{who:X,text:`If it reaches the mainland there is nothing after it. Nothing, Kuroki.`},{who:Q,text:`Then it does not reach the mainland.`},{who:$,text:`Senpai. I am on your wing. Say it properly this time.`},{who:Q,text:`…Hinata. On my wing. Match my turns and do not fall behind.`},{who:$,text:`YES! Aya, he said it!`},{who:X,text:`I heard. …Kuroki. Come back. That is an order.`},{who:Q,text:`You have never once made me follow one of those.`},{who:X,text:`Then do it for me. I have buried one pilot I loved. I am not burying two.`}],debrief:[{who:Z,text:`The rift is collapsing! You did it — you actually did it!`},{who:X,text:`Kuroki? Kuroki, answer me. ANSWER ME.`},{who:Q,text:`…Still here. Suit is a write-off though. Sorry, doc.`},{who:X,text:`You absolute IDIOT. I thought— …I thought we lost you.`},{who:Q,text:`Not this time. I kept talking. Like you asked.`},{who:X,text:`…You did. You kept talking the whole way down.`},{who:$,text:`And I caught him! Tell them I caught him!`},{who:Q,text:`She caught me.`}]},{no:11,title:`THE ROAD OUT`,cold:`Sealing the seam from this side has stopped working.<br/>So the line moves. Outward.`,advance:{frac:.22,name:`STAGING · THE CAUSEWAY`},brief:[{who:Z,text:`The seam is widening again. Sealing it from this side has stopped working.`},{who:X,text:`So we stop sealing it from this side. Command has approved the advance.`},{who:Q,text:`We go to it.`},{who:X,text:`We go to it. The wards are emptying into one staging shelter behind you — it moves as you move.`},{who:$,text:`Everyone we could not get onto the boats is in that shelter. Just so we are all clear.`},{who:tm,text:`I reinforced it myself. It will hold. …It will hold if nothing sits on it.`},{who:X,text:`Then nothing sits on it. Move out, Kuroki.`}],debrief:[{who:Z,text:`Curious. There is a Terra-Armor signature inside the rift.`},{who:X,text:`…Say that again.`},{who:Z,text:`Debris, almost certainly. We lost a frame near the bay three years ago.`},{who:Z,text:`The seam has been pulling wreckage in since it opened. This will be some of it.`},{who:X,text:`…Understood. Log it and move on.`},{who:Q,text:`Aya.`},{who:X,text:`Log it and move on, Kuroki.`}]},{no:12,title:`WHAT THE TIDE LEFT`,cold:`Past the causeway the maps stop being useful.<br/>Nothing out here has been surveyed since it opened.`,advance:{frac:.4,name:`STAGING · THE SHALLOWS`},brief:[{who:X,text:`City is behind you now. Everything ahead of this point is ours only while you are standing on it.`},{who:nm,text:`I have moved the shelter up. Do not make me move it again under fire.`},{who:$,text:`Senpai, the ground out here is wrong. It is not burnt. It is just… less.`},{who:Z,text:`Matter nearest the seam is being unmade slowly. Do not stand still for long.`}],debrief:[{who:Z,text:`The Terra-Armor signature has changed position.`},{who:X,text:`Drift. The seam moves everything.`},{who:Z,text:`It moved four kilometres against the pull, Commander. That is not drift.`},{who:Z,text:`…It is under power.`},{who:tm,text:`Nothing has power after three years in there. Nothing.`},{who:X,text:`…`},{who:$,text:`Aya? You have gone quiet. You never go quiet.`}]},{no:13,title:`DEAD GROUND`,cold:`This ground has been inside the seam and come back.<br/>Nothing grows on it now.`,advance:{frac:.58,name:`STAGING · DEAD GROUND`},brief:[{who:Z,text:`No terrain, no salvage, no life. This stretch has been inside the seam and come back out.`},{who:Q,text:`Kurosawa. The frame in there. Whose was it.`},{who:Z,text:`…You know whose it was.`},{who:X,text:`It was a prototype. It was the FIRST prototype. That is all it was.`},{who:Q,text:`Understood.`},{who:X,text:`…Contact inbound. Go.`}],debrief:[{who:Z,text:`Something is pressing against the carrier wave. No voice pattern yet.`},{who:$,text:`It is matching Kuroki's transponder rhythm.`},{who:Q,text:`Then it knows we are coming.`},{who:X,text:`Do not answer it. Not until we can see what is transmitting.`}]},{no:14,title:`IT WILL NOT ENGAGE`,cold:`It has matched your advance for two days<br/>and has not once taken a shot.`,advance:{frac:.76,name:`STAGING · THE APPROACH`},brief:[{who:X,text:`I am back on. I am fine. Do not ask.`},{who:Q,text:`I was not going to.`},{who:X,text:`…Thank you.`},{who:Z,text:`The Terra-Armor is holding station two kilometres out. It has matched your advance exactly.`},{who:X,text:`It is escorting you. Whatever else it is, it is escorting you.`}],debrief:[{who:$,text:`It watched the whole fight. It had a firing solution on me twice and it did not take it.`},{who:tm,text:`Maybe it is out of ammunition.`},{who:$,text:`It is not out of ammunition, Kotetsu.`},{who:$,text:`It looked at you, senpai. The entire time. Only you.`},{who:Q,text:`…I know.`},{who:X,text:`Kuroki. Whatever is in that frame, it is not her. Do you understand me?`},{who:Q,text:`Say that again when your voice is steadier and I will believe you.`}]},{no:15,title:`THE MOUTH`,cold:`Past this line the seam stops being a place<br/>and becomes a direction.`,advance:{frac:.9,name:`STAGING · THE MOUTH`},brief:[{who:Z,text:`This is the threshold. Past this the seam is not a place, it is a direction.`},{who:X,text:`Three signatures converging on you. They are trying to keep you off the rift.`},{who:$,text:`Then they are about to be very disappointed. Senpai — on your wing.`},{who:tm,text:`Shelter is as far forward as it goes. If we lose ground here, we lose it with people on it.`}],debrief:[{who:Z,text:`The Terra-Armor is moving to intercept. It is coming to you.`},{who:X,text:`All units break off. BREAK OFF.`},{who:Q,text:`It has locked onto my old wing channel.`},{who:X,text:`Do not open it. We identify the frame first.`},{who:Z,text:`It is powering weapons. Kuroki — it is powering weapons.`}]},{no:16,title:`THE FIRST PROTOTYPE`,cold:`It has been waiting three years for someone<br/>to answer the question.`,advance:{frac:.98,name:`STAGING · THE SEAM`},brief:[{who:Z,text:`Designation TA-00. That frame is not a copy of yours, Kuroki.`},{who:Z,text:`Yours is the copy of it. She flew the first one.`},{who:X,text:`Doctor, I am asking you once. Is my sister in there.`},{who:Z,text:`…Everything she was up to a particular moment is in there.`},{who:Z,text:`Nothing after it. The seam took an impression and it has been holding it since.`},{who:$,text:`So it does not know. It does not know that it—`},{who:X,text:`It does not know.`},{who:Q,text:`Then I will tell it. Everyone off this channel except Aya.`},{who:$,text:`Senpai—`},{who:Q,text:`Hinata. Off the channel. Please.`}],debrief:[{who:Q,text:`Rei. I did not leave.`},{who:em,text:`…`},{who:Q,text:`I called the turn and you followed it and I came back for you.`},{who:Q,text:`I came back four times. There was nothing to come back to.`},{who:em,text:`That is not— I have been waiting. I have been waiting the whole time.`},{who:Q,text:`I know. I am sorry it was this long.`},{who:X,text:`Rei. It is Aya.`},{who:em,text:`Aya? Aya, are the shelters clear? Tell me the shelters are clear.`},{who:X,text:`…The shelters are clear. Everyone got out. You did that.`},{who:X,text:`You can stop now. You are allowed to stop.`},{who:em,text:`…Good. That is good.`},{who:em,text:`Kuroki. Do not call that turn again.`},{who:Q,text:`I never have.`},{who:Z,text:`The seam is closing. It is closing from the inside — she is closing it.`},{who:X,text:`Kuroki, GET OUT OF THERE.`},{who:Q,text:`…Understood, Commander.`}]}],am={phase2:[{who:em,text:`You have changed the approach. You never came in that low.`},{who:Q,text:`I learned it after.`},{who:em,text:`After what?`},{who:Q,text:`…`},{who:em,text:`Kuroki. The bay. The bay is the wrong shape. Those towers are not— when did they build those?`},{who:Z,text:`It is comparing what it sees against what it remembers. Do not answer that.`},{who:X,text:`Doctor, shut up.`},{who:em,text:`Aya. Aya, how long have I been out here?`}],phase3:[{who:em,text:`I have been counting. I counted the whole time.`},{who:em,text:`I got to four hundred and something and then I started again.`},{who:X,text:`Rei—`},{who:em,text:`Do not. I know what you are going to say and I do not want it yet.`},{who:em,text:`I want the shelters first. Tell me about the shelters.`},{who:$,text:`…Senpai, I am so sorry. I am so sorry, I did not know.`},{who:em,text:`Who is that? Kuroki, who IS that?`},{who:Q,text:`That is my wing. You would like her.`},{who:em,text:`…Then I have been gone a long time.`}]},om=[{who:Z,text:`The seam is gone. Not sealed — gone. There is nothing there to reopen.`},{who:X,text:`Casualty report is zero. First one I have ever filed.`},{who:$,text:`Senpai. Are you… is he alright? He has not said anything.`},{who:X,text:`Give him a minute, Hinata.`},{who:Q,text:`…She asked about the shelters. Three years in there and that is what she asked.`},{who:X,text:`That is who she was. That is exactly who she was.`},{who:Q,text:`Yes. It was.`},{who:X,text:`Come home, Kuroki. That is not an order.`},{who:Q,text:`I know. I am coming anyway.`}],sm=[{who:Z,text:`The tear is sealed — but the seam never fully closed.`},{who:Z,text:`Smaller fractures are opening across the districts. They will keep coming.`},{who:X,text:`Then we keep flying. …And you keep coming back. Every time.`},{who:Q,text:`That is the arrangement.`},{who:X,text:`That is the arrangement. Call it in when you see one.`}],cm=[{who:X,text:`Another fracture, another contact. You know the drill by now.`},{who:Z,text:`Signature matches an earlier specimen. Stronger, though. Much stronger.`},{who:X,text:`Shelters are holding. Go buy them a little more time.`},{who:Q,text:`Same city. Same me. Should be over quickly.`},{who:X,text:`One of these days that mouth is going to get you killed.`},{who:Z,text:`Every one you put down slows the spread. Keep going.`}],lm={cityDamage:[{who:X,text:`HEY! Stop that! You are destroying the city!`},{who:X,text:`KUROKI! That was a residential block!`},{who:X,text:`Do you have ANY idea how long that took to build?!`},{who:X,text:`We are DEFENDING Neo Tokyo. Defending! Say it with me!`},{who:Q,text:`It was in my way.`},{who:X,text:`Everything is in your way!`},{who:X,text:`Those were HOMES, Kuroki. People lived in those.`},{who:X,text:`Every block you drop is another hundred people at a ward door!`},{who:X,text:`The wards are filling up because of YOU, not the kaiju!`},{who:X,text:`Stop. Just— stop swinging at things that are not the target!`},{who:X,text:`That was a school! Tell me you did not just hit a school!`},{who:Q,text:`It was empty. They evacuated it on day one.`},{who:X,text:`That is not the POINT and you know it is not the point!`},{who:X,text:`I am watching the damage bill climb in real time.`},{who:X,text:`You have cost this city more than the last three kaiju combined.`},{who:$,text:`Senpai, maybe fight it in the park? There is a park right there!`},{who:Q,text:`The park is full of trees.`},{who:$,text:`Trees grow BACK!`},{who:tm,text:`Every building you drop is another week of my life. Just so you know.`},{who:X,text:`Kuroki, I have the reconstruction office on the other line and they are CRYING.`},{who:X,text:`One district. Give me ONE district you have not touched.`},{who:Q,text:`…I will get back to you on that.`}],heavyDestruction:[{who:X,text:`You are levelling the district faster than the kaiju is!`},{who:X,text:`I genuinely cannot tell which one of you I am supposed to be tracking!`},{who:Z,text:`For the record, I am logging all of this.`},{who:Q,text:`Log it under "necessary".`},{who:X,text:`I am logging it under KUROKI!`}],buildingDown:[{who:X,text:`That entire building just came down! Was that you?!`},{who:Q,text:`Structurally it was already unwell.`},{who:X,text:`It was FINE until you leaned on it!`},{who:Z,text:`Collapse logged. The reconstruction office has stopped replying to me.`}],planeDown:[{who:X,text:`THAT WAS A PASSENGER FLIGHT! Watch your fire!`},{who:Q,text:`…That one is on me.`},{who:X,text:`Yes it is! Check your targets!`}],lowHealth:[{who:X,text:`Your integrity is critical — break off! BREAK OFF!`},{who:X,text:`Kuroki, you are one hit from gone. Please. Fall back.`},{who:Q,text:`I have been worse.`},{who:X,text:`You have NOT been worse!`},{who:Z,text:`The frame will not survive another impact. I am begging you.`}],repaired:[{who:Z,text:`Good — that salvage is patching the frame nicely.`},{who:X,text:`Integrity climbing. …Thank you for actually listening for once.`},{who:Q,text:`Do not get used to it.`}],died:[{who:X,text:`KUROKI! …Answer me. Answer me right now.`},{who:Q,text:`…Still here. Mostly.`},{who:X,text:`Do not EVER do that again!`},{who:X,text:`I have sat through one silent channel already. I am not doing a second.`},{who:Z,text:`Emergency reconstruction complete. Half integrity — all I could manage.`}],bigCombo:[{who:X,text:`The whole command deck just went quiet watching you.`},{who:Q,text:`They should. I am magnificent.`},{who:X,text:`And there it is. Ruined it.`},{who:Z,text:`You are performing beyond the suit rated limits. Please continue.`}],weakPoint:[{who:Z,text:`Direct hit on the core! That is the weak point!`},{who:X,text:`Its readings just fell off a cliff — keep hitting that spot!`},{who:Q,text:`Already ahead of you.`}],bossHurt:[{who:X,text:`It is faltering — finish it!`},{who:Q,text:`Say please.`},{who:X,text:`FINISH IT!`}],bossPhase:[{who:X,text:`Its output just jumped. Whatever it was doing before, that was not all of it.`},{who:Z,text:`It was measuring you. Now it has finished measuring.`},{who:Q,text:`Good. I was getting bored.`},{who:X,text:`Pattern change — it is moving differently. Do not fight the old one.`},{who:Z,text:`That is not desperation. That is a second gear. Be careful.`},{who:X,text:`Kuroki, it just stopped holding back. Please read that as the warning it is.`},{who:$,text:`Whoa — it got FAST. Captain, did you see that?`},{who:Q,text:`I saw it.`},{who:tm,text:`It sped up. Wonderful. I could barely hit it at the old speed.`}],bossEnrage:[{who:X,text:`It is dying and it knows it. That makes it more dangerous, not less.`},{who:Z,text:`A cornered animal spends everything. Do not trade blows now.`},{who:Q,text:`Then I will not miss.`},{who:X,text:`Vitals critical — and it has stopped defending itself entirely. It is all attack now.`},{who:$,text:`It is throwing everything at you! Captain, break off, break off!`},{who:Q,text:`No. This is where it ends.`},{who:X,text:`Last quarter. Whatever it does next, it only gets to do once.`},{who:tm,text:`If it is going to explode, tell me BEFORE and not after.`}],incoming:[{who:X,text:`New signature breaking atmosphere. Stand by, Kuroki.`},{who:Z,text:`Something is coming down. Get off the open ground.`},{who:X,text:`Contact in seconds. Wherever you are standing, be somewhere better.`},{who:Q,text:`I am always somewhere better.`},{who:X,text:`Second signature. That was a short rest, I am sorry.`},{who:$,text:`Another one?! Captain, I am with you — right behind you!`},{who:tm,text:`Give me ten more seconds. Please. Ten.`},{who:X,text:`You do not have ten. Nobody has ten.`},{who:Z,text:`They are coming faster than they used to. That means something.`}],revenantAdapt:[{who:Z,text:`It is compensating. Every hit you land teaches it the shape of that weapon.`},{who:X,text:`Switch, Kuroki. Do not give it a pattern to read.`},{who:Z,text:`It learned that one. Use something it has not seen yet.`},{who:X,text:`It is doing what you taught HER to do. Stop repeating yourself!`},{who:$,text:`Senpai, it is reading you! Change it up!`},{who:Z,text:`Its plating is reconfiguring mid-fight. Remarkable. Also very bad.`}],reiPattern:[{who:X,text:`Kuroki. Kuroki, that is her approach. That is the pattern she flew.`},{who:Z,text:`It has abandoned ranged engagement entirely. That is not a system decision.`},{who:X,text:`It is not calculating any more. It is just… coming at you.`},{who:Q,text:`I know the pattern. I taught her half of it.`},{who:X,text:`And she taught you the other half. …Do not let that make you slow.`}],bossFar:[{who:X,text:`Target is a long way out. Follow the marker, I will keep it lit.`},{who:Q,text:`You always know where I am going.`},{who:X,text:`Someone has to. You certainly never do.`}],droneSwarm:[{who:X,text:`Multiple contacts converging — watch your back!`},{who:Z,text:`They are herding you. Do not let them box you in.`},{who:Q,text:`Let them come. Saves me the walk.`}],hinataBanter:[{who:$,text:`Senpai! Look! I got one! Did you see it?`},{who:Q,text:`I saw it.`},{who:$,text:`You did not even turn around!`},{who:$,text:`I am keeping score, senpai. You are only four ahead.`},{who:Q,text:`I am eleven ahead.`},{who:$,text:`Four! I am counting the drones!`},{who:$,text:`Left side is clear, I am holding it. Go be dramatic somewhere else.`},{who:X,text:`She is a better wingman than you deserve, Kuroki.`},{who:Q,text:`…I know.`}],hinataWorried:[{who:$,text:`Senpai, your armour is really low. Get behind the shield. GET BEHIND IT.`},{who:$,text:`I can take the hits! That is the whole point of me!`},{who:Q,text:`Not for you. Never for me.`},{who:$,text:`That is not how wingmen work!`}],shelterAttacked:[{who:X,text:`It is on a SHELTER, Kuroki! There are people under that!`},{who:X,text:`Get it off the ward! Get it off RIGHT NOW!`},{who:$,text:`Senpai, it is standing on the shelter! Go, I will cover the drones!`},{who:Q,text:`I see it. Moving.`}],shelterCritical:[{who:X,text:`The shelter is caving in! KUROKI!`},{who:X,text:`They cannot evacuate in time — you are the evacuation!`},{who:$,text:`It is going to break! SENPAI!`}],shelterFilling:[{who:X,text:`The wards are filling up fast. Where do you think these people are coming from?`},{who:tm,text:`I am extending the frames as fast as I can weld.`},{who:X,text:`Weld faster. Kuroki, STOP KNOCKING THINGS DOWN.`},{who:$,text:`There is a queue at the east ward door. A real queue.`},{who:X,text:`If a ward overflows we have nowhere to put them. Nowhere, Kuroki.`}],shelterOverfull:[{who:X,text:`…They could not get in. There was no room left.`},{who:tm,text:`I ran out of ward to build. I am sorry. I ran out.`},{who:Q,text:`That one is on me. All of it is on me.`}],shelterLost:[{who:X,text:`…The ward is gone. Kuroki. It is gone.`},{who:Q,text:`How many.`},{who:X,text:`Do not ask me that. Please do not ask me that.`}],idle:[{who:X,text:`Sensors are quiet. Check your armour while you can.`},{who:X,text:`The shelters keep asking about you. I keep telling them you are fine.`},{who:Q,text:`Am I fine?`},{who:X,text:`No. But they do not need to know that.`},{who:Z,text:`Reactor is steady. Whatever you are doing, keep doing it.`},{who:X,text:`It is strange, seeing the city this still.`},{who:Q,text:`…It is worth keeping. The city. That is all I meant.`},{who:X,text:`I know what you meant, Kuroki.`}]},um={GORGOSAUR:[{who:X,text:`Please do not let that thing near my apartment block! Quickly, Kuroki, beat it!`},{who:X,text:`It just ate a bus shelter. An entire bus shelter. Why?`},{who:Q,text:`Roughage.`},{who:X,text:`Look at the SIZE of those teeth. How is that even structurally possible?`},{who:Z,text:`Jaw pressure is off my scale. Do not let it close on you.`}],"MISSILE MAW":[{who:X,text:`It fires without aiming. It does not even LOOK. Who builds that?`},{who:Q,text:`Someone who does not pay for the ammunition.`},{who:X,text:`Two more volleys inbound — Kuroki, MOVE!`},{who:Z,text:`Fascinating reload cycle. Terrible for everyone underneath it.`}],"VOLT SERPENT":[{who:X,text:`Yuck. That worm is far too slimy for my liking.`},{who:Q,text:`You are describing it like a menu item.`},{who:X,text:`It is dripping on the ROAD, Kuroki! Someone has to clean that!`},{who:X,text:`It went under again — I hate it when it does that. I HATE it.`}],"IRON COLOSSUS":[{who:X,text:`Every step it takes registers on the seismographs. Every single one.`},{who:Q,text:`Big and slow. My favourite combination.`},{who:X,text:`It is slow until it is NOT. Stop standing in front of it!`},{who:Z,text:`The plating is bolted. Bolted! Somebody assembled this by hand.`}],"SKY REAVER":[{who:X,text:`It keeps circling my sector like it is choosing a table.`},{who:Q,text:`Tell it the kitchen is closed.`},{who:X,text:`Incoming dive — pull up, PULL UP!`},{who:X,text:`I do not like things that watch you before they attack.`}],"CRIMSON MANTIS":[{who:X,text:`Oh, I hate this one. Look at those arms. Look at them!`},{who:Q,text:`You said that about the worm too.`},{who:X,text:`The worm was slimy! This one is POINTY! Different problems!`},{who:Z,text:`Its reflexes exceed yours by a comfortable margin. Sorry.`}],"MAGMA GOLEM":[{who:X,text:`It is melting the tram lines. The tram lines, Kuroki!`},{who:Q,text:`I will buy the city new trams.`},{who:X,text:`With WHAT? You do not even do your paperwork!`},{who:Z,text:`Surface temperature is absurd. Do not touch it. Obviously.`}],"DEEP MAW":[{who:X,text:`I lost it on sensors again. I hate that. Keep moving, please keep moving.`},{who:Q,text:`Relax. I can feel it coming.`},{who:X,text:`You CANNOT feel it coming, you are guessing!`},{who:X,text:`Tremors under the eastern blocks — it is surfacing, brace!`}],"CINDER WYRM":[{who:X,text:`It is burning the market district. That is where I get my lunch!`},{who:Q,text:`Priorities, Aya.`},{who:X,text:`THAT IS A PRIORITY!`},{who:X,text:`Fire crews cannot get within two blocks of it. Put it out. Please.`}],"TIDE LEVIATHAN":[{who:X,text:`The whole bay is rising with it. It is dragging the sea inland.`},{who:Z,text:`Displacement readings like nothing on record. This is the source.`},{who:X,text:`Kuroki, this is the one. Whatever you have left, use it now.`},{who:Q,text:`I always have something left.`}]},dm=[[{who:X,text:`You know you still fly exactly like you did in training.`},{who:Q,text:`Brilliantly?`},{who:X,text:`Recklessly. I wrote it in every single report I filed on you.`},{who:Q,text:`And they promoted me anyway. Devastating for you, that.`}],[{who:X,text:`I outranked you, you know. Before all this.`},{who:Q,text:`You outflew me too. Once.`},{who:X,text:`Twice.`},{who:Q,text:`…Twice.`}],[{who:Z,text:`Aya was in the seat before you, Kuroki. Did you know that?`},{who:X,text:`Doctor.`},{who:Z,text:`Best reflex scores the programme ever recorded. It is in the file.`},{who:X,text:`Doctor. Drop it.`}],[{who:Q,text:`Do you ever miss it? Flying.`},{who:X,text:`Every day.`},{who:Q,text:`Then why the command chair?`},{who:X,text:`Because somebody has to be on the other end of the radio.`},{who:X,text:`Nobody was on Rei's. Not really. Not in time.`}],[{who:X,text:`Rei used to fly the pattern you just pulled. Almost exactly.`},{who:Q,text:`I know. She taught it to me.`},{who:X,text:`…She taught it to me first. She taught me everything first.`},{who:Q,text:`She would. Older sisters are like that.`}],[{who:Q,text:`You never ask about that day.`},{who:X,text:`I was on comms that day, Kuroki. I do not need to ask.`},{who:X,text:`The last order on the recording was to clear the shelters. I heard it once. That was enough.`},{who:X,text:`I heard my sister go quiet. I do not need anybody to describe it to me.`}],[{who:Q,text:`I was lead. I called the turn. She followed it.`},{who:X,text:`I know exactly what you called. I was listening.`},{who:Q,text:`Then say it. Whatever it is you have not said for three years.`},{who:X,text:`…That I do not blame you. And that some mornings I do anyway.`},{who:X,text:`Both of those are true. I have stopped trying to fix it.`}],[{who:X,text:`You think I shout because you break things.`},{who:Q,text:`I break a LOT of things.`},{who:X,text:`I shout because the last time a signal went quiet on me it was my sister, and it stayed quiet.`},{who:Q,text:`…`},{who:X,text:`So keep talking out there. That is all I am asking.`}],[{who:Q,text:`Aya. If this one goes badly—`},{who:X,text:`No.`},{who:Q,text:`I am only saying—`},{who:X,text:`I said NO. You come back. You always come back. That is the arrangement.`},{who:Q,text:`…Understood, Commander.`}],[{who:X,text:`When this is over I am putting you back in front of a review board.`},{who:Q,text:`For what?`},{who:X,text:`Everything! Pick anything from the last month!`},{who:X,text:`…And then I am buying you a drink. Do not read into that.`},{who:Q,text:`Reading into it heavily.`}]],fm=[[{who:$,text:`Aya says you flew with someone before me.`},{who:Q,text:`Aya talks too much.`},{who:$,text:`She said Rei was better than you. She smiled when she said it.`},{who:Q,text:`Rei was her sister. And my wingwoman.`},{who:$,text:`And your ex. That part was not in the flight report.`},{who:Q,text:`That part is not for the flight report.`}],[{who:$,text:`Senpai, why do you always put yourself between me and it?`},{who:Q,text:`Habit.`},{who:X,text:`It is not habit.`},{who:Q,text:`Aya.`},{who:X,text:`…It is not habit, Hinata.`}],[{who:$,text:`I read the report from three years ago. The whole thing.`},{who:Q,text:`Then you know I called the turn. And whose sister followed it.`},{who:$,text:`I know she followed it because she trusted you. Those are different sentences.`},{who:Q,text:`…`},{who:$,text:`I am going to keep following them too, by the way. Just so you know.`}]],pm={arrival:[{who:tm,text:`KUROGANE rolling. Slowly. Everything about this is slow.`}],missed:[{who:tm,text:`…That was close. To something. Not the target.`},{who:X,text:`That was a BANK, Kotetsu!`},{who:tm,text:`The bank was between me and the kaiju. Physics.`},{who:tm,text:`In fairness nobody asked whether I could aim.`},{who:X,text:`I ASSUMED, Kotetsu! I assumed!`},{who:$,text:`Kotetsu that was my side! That was MY side!`},{who:tm,text:`Noted. Adjusting. Probably.`}],hit:[{who:tm,text:`Oh! That one connected. Nobody make a fuss.`},{who:$,text:`THAT WAS AMAZING! Do it again!`},{who:tm,text:`I would rather not press my luck.`}],mechanic:[{who:tm,text:`Reinforcing the east ward while you two argue. Do carry on.`},{who:tm,text:`I have extended the ward frames. They will hold more people now.`},{who:X,text:`How much more?`},{who:tm,text:`More than yesterday. Less than you would like.`},{who:tm,text:`If you all stopped flattening buildings I would have less to do.`}]},mm={damage:[{who:nm,text:`Kuroki, I rebuilt that façade twelve seconds ago. Your restraint remains inspiring.`},{who:nm,text:`Another building. Excellent. I was worried my work queue might become manageable.`},{who:nm,text:`Try aiming at the monster, Kuroki. The architecture has not declared war on you.`},{who:nm,text:`I am beginning to understand why Aya always sounds exhausted.`}],kotetsu:[{who:nm,text:`Kotetsu, if you cannot hit the target, at least miss away from my construction site.`},{who:nm,text:`My brother has turned incompetence into a weapons platform.`},{who:tm,text:`Good to hear your personality survived the launch, brother.`},{who:nm,text:`Somebody in this family had to bring standards.`}],repair:[{who:nm,text:`Ward integrity restored. You are welcome to preserve it this time.`},{who:nm,text:`Housing block is open. Civilians are leaving the shelter in an orderly fashion — observe and learn.`}]},hm=[[{who:$,text:`Aya, can I ask you something? About senpai.`},{who:X,text:`You can ask. He will not answer, but you can ask.`},{who:$,text:`Does he ever sleep?`},{who:X,text:`No. I have three years of logs proving it.`}],[{who:X,text:`Hinata. Your shield took forty percent that pass. Are you all right?`},{who:$,text:`Totally fine! That is what it is for!`},{who:X,text:`That is what he says. I do not like hearing it from you as well.`},{who:$,text:`…Sorry, Aya.`},{who:X,text:`Do not be sorry. Just be careful. One of you is enough.`}],[{who:$,text:`You shout at him a lot.`},{who:X,text:`He earns it a lot.`},{who:$,text:`You do not shout at me.`},{who:X,text:`…You listen the first time.`}],[{who:$,text:`Aya, when this is over, can I buy you lunch?`},{who:X,text:`Only if it is not in the market district. He levelled it.`},{who:Q,text:`That was the kaiju.`},{who:X,text:`That was HALF the kaiju!`}],[{who:X,text:`You are good at this, Hinata. I do not say that often.`},{who:$,text:`You do not say it EVER, Aya!`},{who:X,text:`Then treasure it.`},{who:tm,text:`She has never said it to me.`},{who:X,text:`You overslept.`}]],gm=[{id:`strike`,objective:`Cut the marked block — hold A or click`,say:[{who:Z,text:`Frame is live. That block ahead is condemned and empty — put the saber through it.`}],cleared:[`WEAPON HOT`,`The saber cuts anything the city is made of.`],done:(e,t)=>t.wrecked-e.wrecked>=30,nudge:{who:Z,text:`Stand against it and attack, Kuroki. It will come apart.`}},{id:`fly`,objective:`Get airborne — hold jump to climb`,say:[{who:X,text:`Now get off the ground. Hold the jump — hold it, do not tap — and stay up. The things coming through the bay do not stay down here.`}],cleared:[`LIFT JETS NOMINAL`,`Altitude is the whole fight. Use it.`],done:(e,t)=>t.altitude>=26,nudge:{who:X,text:`Hold the jump down. It is a throttle, not a button.`}}],_m=[{who:X,text:`Check done. Kuroki — sonar just lit up under the bay.`},{who:Z,text:`It is big. I am so sorry.`}],vm=class{constructor(){G(this,`index`,0),G(this,`from`,null),G(this,`stepT`,0),G(this,`nudged`,0),G(this,`complete`,!1),G(this,`justCleared`,null),G(this,`pending`,null)}get step(){return this.complete?null:gm[this.index]??null}update(e,t){if(this.justCleared=null,this.pending=null,this.complete)return;let n=gm[this.index];if(!n){this.complete=!0,this.pending=_m;return}if(this.from===null){this.from={...t},this.stepT=0,this.nudged=0,this.pending=n.say;return}if(this.stepT+=e,n.done(this.from,t)){this.justCleared=n.cleared,this.index++,this.from=null,this.index>=gm.length&&(this.complete=!0,this.pending=_m);return}this.nudged<2&&this.stepT>18+this.nudged*22&&n.nudge&&(this.nudged++,this.pending=[n.nudge])}},ym=[{id:`saber`,icon:`⚔`,label:`SABER`},{id:`rifle`,icon:`🔫`,label:`RIFLE`},{id:`railgun`,icon:`⚡`,label:`RAILGUN`},{id:`vulcan`,icon:`💥`,label:`VULCAN`},{id:`flamer`,icon:`🔥`,label:`FLAMER`},{id:`aqua`,icon:`💧`,label:`AQUA`}],bm={story:{label:`STORY`,blurb:`For the campaign, not the challenge`,incoming:.55,tempo:.84,bossHp:.82},normal:{label:`NORMAL`,blurb:`The fight as it was designed`,incoming:1,tempo:1,bossHp:1},veteran:{label:`VETERAN`,blurb:`They hit harder and move sooner`,incoming:1.4,tempo:1.12,bossHp:1.18}},xm=`▓▒░#%&/\\|=+*<>`,Sm=class{constructor(){G(this,`commsQueue`,[]),G(this,`typed`,0),G(this,`bled`,!1),G(this,`bledT`,0),G(this,`holdT`,0),G(this,`commsOn`,!1),G(this,`isTouch`,!1),G(this,`cardOpen`,!1),G(this,`root`,void 0),G(this,`hpFill`,void 0),G(this,`bossWrap`,void 0),G(this,`bossName`,void 0),G(this,`bossFill`,void 0),G(this,`toastEl`,void 0),G(this,`vignette`,void 0),G(this,`chips`,{}),G(this,`toastTimer`,0),G(this,`wheel`,void 0),G(this,`onSelectWeapon`,()=>{}),G(this,`blips`,[]),this.root=document.getElementById(`hud`),this.root.innerHTML=`
      <style>
        .hud-bar { position:absolute; left:24px; top:20px; width:260px; }
        .hud-label { color:#cfe6ff; font-size:11px; letter-spacing:2px; margin-bottom:4px; text-shadow:0 1px 3px #000a; }
        .hud-track { height:14px; background:#0008; border:1px solid #7fdcff55; border-radius:7px; overflow:hidden; }
        .hud-fill { height:100%; background:linear-gradient(90deg,#26e0a8,#7fdcff); transition:width .15s; }
        .boss { position:absolute; top:26px; left:50%; transform:translateX(-50%); width:min(560px,60vw); display:none; text-align:center; }
        .boss-name { color:#ffd0d0; font-size:14px; letter-spacing:6px; margin-bottom:5px; text-shadow:0 1px 4px #000; }
        .boss-state { min-height:14px; margin-top:5px; color:#ffb4c0; font-size:9px;
                      letter-spacing:3px; text-shadow:0 1px 3px #000; }
        .boss.open .boss-state { color:#7ff0ff; }
        .boss.enraged .boss-state { color:#ff786f; animation:openPulse .45s ease-in-out infinite alternate; }
        .boss-track { position:relative; height:12px; background:#0009; border:1px solid #ff5a5a66; border-radius:6px; overflow:hidden; }
        .boss-fill { height:100%; background:linear-gradient(90deg,#ff3b3b,#ff9a3b); transition:width .15s, background .25s; }
        /* the track itself reacts, so the fight state is readable even when
           the bar is nearly empty and there is no fill left to colour */
        .boss.enraged .boss-track { border-color:#ff3b5c; box-shadow:0 0 16px #ff3b5c66; }
        .boss.open .boss-track { border-color:#7ff0ff; box-shadow:0 0 20px #4de2ff88; }
        /* Sits on top of the track rather than below it — the objective line
           lives directly under the bar and cannot be pushed around. */
        .boss-open { display:none; position:absolute; inset:0; line-height:12px;
                     color:#eaffff; font-size:9px; letter-spacing:4px; font-weight:700;
                     text-shadow:0 0 6px #003a4a, 0 1px 2px #000;
                     animation:openPulse .5s ease-in-out infinite alternate; }
        .boss.open .boss-open { display:block; }
        @keyframes openPulse { from { opacity:.6; } to { opacity:1; } }
        .chips { position:absolute; left:24px; bottom:18px; display:flex; gap:7px; flex-wrap:wrap;
                 max-width:min(62vw, 760px); }
        .chip { padding:6px 10px; border-radius:6px; font-size:11px; letter-spacing:1px; color:#eaf6ff;
                background:#0a1626cc; border:1px solid #3a5a7a; text-shadow:0 1px 2px #000; }
        .chip.locked { opacity:.35; filter:grayscale(1); }
        .chip b { color:#7fdcff; }
        .toast { position:absolute; top:34%; left:50%; transform:translate(-50%,-50%); text-align:center;
                 opacity:0; transition:opacity .3s; }
        .toast h1 { color:#fff; font-size:34px; letter-spacing:8px; margin:0; text-shadow:0 0 18px #39e6e0, 0 2px 4px #000; }
        .toast p { color:#bfe9ff; font-size:14px; letter-spacing:3px; margin:8px 0 0; text-shadow:0 1px 3px #000; }
        .cross { position:absolute; left:50%; top:50%; width:6px; height:6px; margin:-3px; border-radius:50%;
                 background:#7fdcffcc; box-shadow:0 0 6px #39e6e0; }
        .target-lock { position:absolute; width:68px; height:68px; margin:-34px; display:none;
                       pointer-events:none; border:2px solid #ff6680; border-radius:50%;
                       box-shadow:0 0 15px #ff4d6a88, inset 0 0 12px #ff4d6a33;
                       transition:left .06s linear,top .06s linear,border-color .12s,box-shadow .12s;
                       animation:lockSpin 5s linear infinite; }
        .target-lock::before,.target-lock::after { content:''; position:absolute; background:#ff8da0; }
        .target-lock::before { width:86px; height:2px; left:-11px; top:31px; }
        .target-lock::after { width:2px; height:86px; left:31px; top:-11px; }
        .target-lock .target-data { position:absolute; top:72px; left:50%; transform:translateX(-50%);
                                   white-space:nowrap; color:#ffc1cb; font-size:9px; letter-spacing:2px;
                                   text-shadow:0 1px 4px #000; animation:lockSpinReverse 5s linear infinite; }
        .target-lock.evade { border-color:#ffcf4f; box-shadow:0 0 22px #ff8a2f; }
        .target-lock.evade::before,.target-lock.evade::after { background:#ffcf4f; }
        .target-lock.open { border-color:#58f4ff; box-shadow:0 0 25px #39e6e0; }
        .target-lock.open::before,.target-lock.open::after { background:#58f4ff; }
        @keyframes lockSpin { to { transform:rotate(360deg); } }
        @keyframes lockSpinReverse { to { transform:translateX(-50%) rotate(-360deg); } }
        .critical-state { position:absolute; inset:0; pointer-events:none; opacity:0;
                          box-shadow:inset 0 0 120px 24px #d5072d99;
                          background:radial-gradient(circle,transparent 54%,#8d001733 100%);
                          transition:opacity .3s; }
        .critical-state.on { animation:criticalPulse 1.05s ease-in-out infinite; }
        .critical-label { position:absolute; left:24px; top:43px; color:#ff8b9e; font-size:9px;
                          letter-spacing:3px; opacity:0; text-shadow:0 0 8px #ff2049; }
        .critical-label.on { opacity:1; animation:criticalText .7s ease-in-out infinite alternate; }
        @keyframes criticalPulse { 0%,100% { opacity:.24; } 50% { opacity:.62; } }
        @keyframes criticalText { to { color:#fff; } }
        .evade-flash { position:absolute; left:50%; top:42%; transform:translate(-50%,-50%);
                       color:#eaffff; font-size:28px; font-weight:800; letter-spacing:9px;
                       text-shadow:0 0 18px #39e6e0,0 2px 5px #000; opacity:0; pointer-events:none; }
        @keyframes perfectEvade { 0% { opacity:0; transform:translate(-50%,-40%) scale(.7); }
                                  20%,65% { opacity:1; transform:translate(-50%,-50%) scale(1); }
                                  100% { opacity:0; transform:translate(-50%,-70%) scale(1.08); } }
        .vig { position:absolute; inset:0; box-shadow:inset 0 0 140px #ff2020; opacity:0; transition:opacity .4s; }
        .impact-flash { position:absolute; inset:0; pointer-events:none; opacity:0;
                        background:radial-gradient(circle at center,transparent 42%,#ffcf7a33 70%,#ff713366 100%);
                        mix-blend-mode:screen; }
        .impact-flash.weak {
          background:radial-gradient(circle at center,transparent 32%,#fff3a855 62%,#39e6e099 100%);
        }
        @keyframes impact-hit {
          0% { opacity:.95; transform:scale(1.035); }
          100% { opacity:0; transform:scale(1); }
        }
        .boss-intro { position:absolute; inset:0; display:flex; flex-direction:column;
                      align-items:center; justify-content:center; pointer-events:none; opacity:0;
                      background:linear-gradient(180deg,transparent 20%,#02050acc 46%,#02050acc 58%,transparent 82%); }
        .boss-intro.show { animation:boss-reveal 3s ease-in-out both; }
        .boss-intro .threat { color:#ff6f61; font-size:12px; letter-spacing:9px; }
        .boss-intro .name { color:#fff; font-size:clamp(34px,6vw,76px); font-weight:800;
                            letter-spacing:12px; margin:8px 0; text-shadow:0 0 28px #ff3b3baa; }
        .boss-intro .subtitle { color:#ffd4c7; font-size:13px; letter-spacing:3px; max-width:760px; text-align:center; }
        @keyframes boss-reveal {
          0% { opacity:0; transform:scale(1.08); }
          14%,72% { opacity:1; transform:scale(1); }
          100% { opacity:0; transform:scale(.98); }
        }
        .start { position:absolute; inset:0; background:linear-gradient(90deg,#030815d9 0%,#07101abb 47%,#030815d9 100%),
                 url('/title-screen.png') center/cover no-repeat; display:flex; flex-direction:column;
                 align-items:center; justify-content:center; pointer-events:auto; cursor:pointer; }
        .start h1 { color:#fff; font-size:52px; letter-spacing:14px; margin:0 0 6px; text-shadow:0 0 30px #39e6e0; }
        .start h2 { color:#ff4fa3; font-size:15px; letter-spacing:8px; margin:0 0 34px; font-weight:400; }
        .start .keys { color:#9fc4e8; font-size:13px; line-height:2.1; letter-spacing:1px; text-align:center; }
        .start .keys b { color:#7fdcff; }
        .start .go.resume { border-color:#ffd86a; color:#ffe9b0; box-shadow:0 0 26px #ffd86a33; margin-top:30px; }
        .start .go.resume:hover { background:#3a3213; }
        /* Pushed well clear of CONTINUE — these two sat close enough that a
           slightly low click on the resume button started a new run instead,
           which wipes the checkpoint. */
        .start .go + .go { margin-top:42px; font-size:12px; opacity:.75; letter-spacing:3px; }
        .start .go { margin-top:30px; color:#fff; font-size:14px; letter-spacing:4px; border:1px solid #39e6e0;
                     padding:10px 26px; border-radius:4px; animation:pulse 1.6s infinite; }
        @keyframes pulse { 50% { box-shadow:0 0 22px #39e6e088; } }
        .hint { position:absolute; right:24px; bottom:18px; width:250px; color:#8fb4d8cc; font-size:10.5px;
                letter-spacing:.6px; text-align:right; line-height:1.8; text-shadow:0 1px 2px #000; }
        /* persistent objective, so the player always knows the current goal */
        .obj { position:absolute; top:76px; left:50%; transform:translateX(-50%); text-align:center;
               background:#0a1626bb; border:1px solid #7fdcff55; border-radius:20px; padding:6px 18px;
               color:#eaf6ff; font-size:12px; letter-spacing:2.5px; text-shadow:0 1px 3px #000;
               white-space:nowrap; }
        .obj b { color:#ffcf4f; }
        /* radio traffic from Command — speaker tag + typed-out line */
        .comms { position:absolute; left:50%; bottom:110px; transform:translateX(-50%);
                 width:min(760px, 80vw); background:#06121fee; border:1px solid #39e6e088;
                 border-left:4px solid #39e6e0; border-radius:6px; padding:12px 18px 14px;
                 box-shadow:0 6px 26px #0009; display:none; }
        .comms.show { display:block; }
        .comms-row { display:flex; align-items:center; gap:16px; }
        .comms-avatar { width:92px; height:92px; flex:0 0 92px; object-fit:cover; object-position:center;
                         border:1px solid #7fdcffaa; border-radius:50%; box-shadow:0 0 14px #39e6e066; }
        .comms-copy { min-width:0; flex:1; }
        .comms-who { color:#39e6e0; font-size:11px; letter-spacing:3px; margin-bottom:6px; }
        /* the pilot's own replies read back warm, so the exchange is legible */
        .comms.self { border-color:#ffcf4f88; border-left-color:#ffcf4f; }
        .comms.self .comms-who { color:#ffcf4f; }
        /* A transmission coming out of the seam. Rei's channel is three years
           dead, so it reads as something being pulled through rather than
           spoken: violet, unstable, and never quite locked. */
        .comms.bled { border-color:#8a5cff88; box-shadow:0 0 30px #6a2fbf44, inset 0 0 40px #2a0f4566; }
        .comms.bled .comms-who { color:#c79bff; }
        .comms.bled .comms-who::after { content:' · SIGNAL UNVERIFIED'; color:#8a5cff88; letter-spacing:2px; }
        .comms.bled .comms-text { color:#e8dbff; text-shadow:0 0 10px #8a5cff66; }
        .comms.bled .comms-avatar { filter:grayscale(.75) contrast(1.15) brightness(.72); }
        .comms.bled .comms-next { color:#c79bffaa; }
        /* a slow band of interference crawling down the panel */
        .comms.bled::after { content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit;
          background:linear-gradient(180deg, transparent 0%, #b078ff22 46%, #ffffff18 50%, #b078ff22 54%, transparent 100%);
          background-size:100% 260%; animation:bleed 3.4s linear infinite; }
        @keyframes bleed { from { background-position:0 -130%; } to { background-position:0 130%; } }
        .comms-text { color:#e8f4ff; font-size:16px; line-height:1.6; letter-spacing:.4px;
                      min-height:2.8em; }
        .comms-next { position:absolute; right:14px; bottom:8px; color:#7fdcff99;
                      font-size:10px; letter-spacing:2px; }
        /* On touch the bottom of the screen belongs to the joystick and the
           action buttons, so radio traffic moves up under the objective bar
           and stops short of the radar rather than hiding behind controls. */
        .tc-on .comms { left:10px; right:134px; bottom:auto; top:116px;
                        width:auto; transform:none; padding:10px 14px 12px; }
        .tc-on .comms-avatar { width:52px; height:52px; flex-basis:52px; }
        .tc-on .comms-text { font-size:13px; min-height:2.2em; }
        .tc-on .comms-who { font-size:9.5px; letter-spacing:2px; }
        /* The panel above already keeps radio traffic clear of the pad. It
           also has to be a tap target, because touch has no Enter key to
           hurry the radio with. */
        .tc-on .comms { pointer-events:auto; cursor:pointer; }
        .tc-on .comms-next { right:12px; bottom:6px; font-size:8.5px; letter-spacing:2px; }
        /* touch already has its own WEAPON button on the pad — the desktop
           dial would only collide with the radar */
        .tc-on .wbtn { display:none !important; }
        /* The phone top band has to hold five things in the space the desktop
           gives to two, so it is laid out as explicit rows rather than left
           to overlap: integrity and score share row one, the boss bar takes
           row two full width, the objective row three, radar below that. */
        .tc-on .hud-bar { left:10px; top:6px; width:118px; }
        .tc-on .hud-label { font-size:8px; letter-spacing:1.2px; margin-bottom:2px; }
        .tc-on .hud-track { height:8px; border-radius:4px; }
        /* Wave and score share one line so the block stays short enough to
           clear the boss bar; the combo drops below so a long "x9 COMBO"
           cannot widen the row into the integrity bar on the far side. */
        .tc-on .scorebox { left:auto; right:10px; top:6px; text-align:right; }
        .tc-on .score-wave { display:inline; font-size:9px; letter-spacing:1.5px; margin-right:5px; }
        .tc-on .score-val { display:inline; font-size:17px; line-height:1; }
        .tc-on .score-combo { display:block; font-size:11px; height:auto; line-height:1.25; }
        .tc-on .boss { width:92vw; top:44px; }
        .tc-on .boss-name { font-size:10px; letter-spacing:3px; margin-bottom:3px; }
        .tc-on .obj { top:84px; font-size:10px; letter-spacing:1.5px; padding:4px 12px;
                      max-width:74vw; overflow:hidden; text-overflow:ellipsis; }
        /* a smaller dial on touch, so dialogue has room beside it */
        .tc-on .minimap { width:112px; height:112px; right:10px; top:112px; }
        /* The boss reveal is a full-screen overlay and was never scaled for a
           phone: at clamp(34px,6vw,76px) with 12px letter-spacing, a name like
           TIDE LEVIATHAN is ~450px wide on a 390px screen, so it ran off both
           edges and sat on top of the objective and the radio panel. */
        /* Only appears below 25% integrity, which is why the layout audit
           never caught it: at its desktop position it lands straight on the
           boss name. Tucked under the compacted integrity bar instead. */
        .tc-on .critical-label { left:10px; top:32px; font-size:7.5px; letter-spacing:.8px; }
        .tc-on .boss-intro { padding:0 16px; }
        .tc-on .boss-intro .threat { font-size:9px; letter-spacing:clamp(2px,1.4vw,6px); }
        .tc-on .boss-intro .name { font-size:clamp(19px,6.4vw,34px);
                                   letter-spacing:clamp(1px,1vw,5px); margin:5px 0;
                                   max-width:100%; overflow-wrap:anywhere; }
        .tc-on .boss-intro .subtitle { font-size:10.5px; letter-spacing:1.4px;
                                       max-width:100%; line-height:1.5; }
        /* Landscape phones are short and wide. Everything moves up and the
           radio narrows so it clears the radar — these have to come after the
           portrait .tc-on rules or equal specificity lets those win. */
        @media (orientation:landscape) and (max-height:520px) {
          /* the top band is one row in landscape: integrity left, score right,
             boss between them — so it has to be narrow enough to fit */
          .tc-on .boss { top:8px; width:min(440px, 44vw); }
          .tc-on .boss-name { font-size:9px; margin-bottom:2px; }
          .tc-on .obj { top:58px; }
          .tc-on .minimap { width:104px; height:104px; top:58px; }
          .tc-on .comms { top:86px; right:164px; }
          .tc-on .comms-avatar { width:40px; height:40px; flex-basis:40px; }
          .tc-on .comms-text { font-size:12px; min-height:1.9em; }
        }
        .tc-on .mm-label { font-size:8px; bottom:2px; }
        @media (max-width:600px) { .comms { width:calc(100vw - 30px); bottom:96px; padding:9px 12px 12px; }
          .comms-avatar { width:44px; height:44px; flex-basis:44px; } .comms-text { font-size:13px; }
          .comms-who { font-size:9px; letter-spacing:2px; } }
        /* full-screen story card for the prologue / chapter titles / ending */
        .card { position:absolute; inset:0; background:#04070d; display:none;
                flex-direction:column; align-items:center; justify-content:center;
                pointer-events:auto; z-index:40; text-align:center; padding:0 8vw; }
        .card.show { display:flex; }
        .card .ch { color:#39e6e0; font-size:13px; letter-spacing:8px; margin-bottom:10px; }
        /* a loss should not read like a chapter break */
        .card.over { background:#120608; }
        .card.over .ch { color:#ff6b7f; }
        .card.over h1 { color:#ffd9df; text-shadow:0 0 26px #ff4d6aaa; }
        .card.over .go { border-color:#ff6b7faa; background:#2a0d13aa;
                         animation:overGlow 1.7s ease-in-out infinite; }
        @keyframes overGlow {
          0%,100% { color:#ffc2cc; text-shadow:0 0 8px #ff4d6a99;
                    box-shadow:0 0 14px #ff4d6a44; border-color:#ff6b7f66; }
          50%     { color:#ffffff; text-shadow:0 0 14px #ff8fa3,0 0 30px #ff4d6acc;
                    box-shadow:0 0 34px #ff4d6a99,0 0 62px #ff4d6a44; border-color:#ff9bb0cc; }
        }
        .card h1 { color:#fff; font-size:clamp(26px,5vw,46px); letter-spacing:10px; margin:0 0 26px;
                   text-shadow:0 0 26px #39e6e0aa; }
        .card .body { color:#cfe3f5; font-size:15px; line-height:2; letter-spacing:1px;
                      max-width:640px; }
        /* the continue prompt should glow enough to read as the way out */
        .card .go { margin-top:36px; color:#d6f7ff; font-size:13px; letter-spacing:5px;
                    padding:10px 26px; border:1px solid #39e6e0aa; border-radius:4px;
                    background:#0a2029aa; animation:goGlow 1.7s ease-in-out infinite; }
        @keyframes goGlow {
          0%, 100% { color:#bfeef7;
                     text-shadow:0 0 8px #39e6e0aa;
                     box-shadow:0 0 14px #39e6e044, inset 0 0 12px #39e6e015;
                     border-color:#39e6e066; }
          50%      { color:#ffffff;
                     text-shadow:0 0 14px #7ffcff, 0 0 30px #39e6e0cc;
                     box-shadow:0 0 34px #39e6e099, 0 0 62px #39e6e044, inset 0 0 18px #39e6e033;
                     border-color:#7ffcffcc; }
        }
        .minimap { position:absolute; right:24px; top:150px; width:168px; height:168px;
                   border-radius:50%; background:#08111ecc; border:2px solid #7fdcff55;
                   overflow:hidden; box-shadow:0 2px 14px #0007; }
        .mm-dot { position:absolute; border-radius:50%; transform:translate(-50%,-50%); }
        .mm-me { width:9px; height:9px; background:#7fdcff; box-shadow:0 0 8px #39e6e0;
                 left:50%; top:50%; }
        /* the view wedge never moves — up is always where you are looking */
        .mm-cone { position:absolute; left:50%; top:50%; width:0; height:0;
                   border-left:26px solid transparent; border-right:26px solid transparent;
                   border-bottom:74px solid #7fdcff1c;
                   margin-left:-26px; margin-top:-74px; }
        .mm-ring { position:absolute; left:50%; top:50%; border-radius:50%;
                   border:1px solid #7fdcff22; transform:translate(-50%,-50%); }
        .mm-fwd { position:absolute; left:50%; top:6px; transform:translateX(-50%);
                  color:#7fdcff; font-size:9px; letter-spacing:2px; font-weight:700; }
        /* compass ring turns with your heading so world north stays true */
        .mm-compass { position:absolute; inset:0; }
        .mm-card { position:absolute; left:50%; top:50%; width:0; height:0;
                   color:#ffcf4f; font-size:10px; font-weight:700; letter-spacing:1px; }
        .mm-card span { position:absolute; transform:translate(-50%,-50%); }
        .mm-label { position:absolute; left:0; right:0; bottom:4px; text-align:center;
                    color:#8fb4d8; font-size:9px; letter-spacing:2px; }
        /* off-screen boss pointer that hugs the edge of the view */
        .bossarrow { position:absolute; left:50%; top:50%; width:0; height:0; display:none;
                     border-left:15px solid transparent; border-right:15px solid transparent;
                     border-bottom:30px solid #ff5a7a; filter:drop-shadow(0 0 8px #ff5a7a);
                     transform-origin:50% 50%; }
        .bossdist { position:absolute; color:#ff9bb0; font-size:12px; font-weight:700;
                    letter-spacing:1px; text-shadow:0 1px 4px #000; display:none;
                    transform:translate(-50%,-50%); }
        .pause { position:absolute; inset:0; background:#060a14ee; display:none; flex-direction:column;
                 align-items:center; justify-content:center; pointer-events:auto; z-index:30; }
        .pause.open { display:flex; }
        .pause h1 { color:#fff; font-size:40px; letter-spacing:12px; margin:0 0 4px; text-shadow:0 0 26px #39e6e0; }
        .pause .stats { color:#9fc4e8; font-size:13px; letter-spacing:3px; margin-bottom:26px; }
        .pause .stats b { color:#7fdcff; }
        .pbtn { color:#fff; font-size:14px; letter-spacing:4px; border:1px solid #39e6e0; background:#0a1626;
                padding:11px 34px; border-radius:4px; margin:6px; cursor:pointer; min-width:220px; text-align:center; }
        .pbtn:hover { background:#12283f; box-shadow:0 0 18px #39e6e055; }
        .pkeys { margin-top:24px; color:#8fb4d8; font-size:11.5px; letter-spacing:1px; line-height:2;
                 text-align:center; max-width:520px; }
        .pkeys b { color:#7fdcff; }
        .settings { width:min(620px,88vw); margin:12px 0 4px; padding:14px 18px;
                    border:1px solid #31516d; border-radius:6px; background:#08111dcc; }
        .settings-title { color:#7fdcff; font-size:10px; letter-spacing:4px; margin-bottom:10px; text-align:center; }
        .settings-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; }
        .difficulty { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:14px; }
        .diff { display:flex; flex-direction:column; gap:3px; padding:8px 6px; cursor:pointer;
                border:1px solid #31516d; border-radius:8px; background:#0a1622; font:inherit; text-align:center; }
        .diff-name { color:#b9d6ed; font-size:11px; letter-spacing:3px; }
        .diff-blurb { color:#6f92b3; font-size:9px; letter-spacing:.5px; line-height:1.4; }
        .diff:hover { border-color:#4d7ea6; }
        .diff.on { border-color:#39e6e0; background:#0d2733; box-shadow:0 0 18px #39e6e033; }
        .diff.on .diff-name { color:#7fdcff; }
        .setting { display:grid; grid-template-columns:110px 1fr 34px; align-items:center; gap:8px;
                   color:#b9d6ed; font-size:10px; letter-spacing:1px; }
        .setting input[type=range] { width:100%; accent-color:#39e6e0; }
        .setting output { color:#7fdcff; text-align:right; }
        .setting.toggle { grid-template-columns:1fr auto; cursor:pointer; }
        .setting.toggle input { accent-color:#39e6e0; }
        .hc-on .boss-track, .hc-on .hud-track { border-color:#fff; }
        .hc-on .hud-label, .hc-on .hint { color:#fff; text-shadow:0 1px 4px #000,0 0 4px #000; }
        .subtitles-off #comms { display:none !important; }
        .reduced-motion *, .reduced-motion *::before, .reduced-motion *::after {
          animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important;
        }
        .shield-flash { position:absolute; inset:0; pointer-events:none; opacity:0;
                        border:5px solid #67e8ff; box-shadow:inset 0 0 90px #31cfff88; }
        .shield-flash.on { animation:shieldHit .32s ease-out both; }
        @keyframes shieldHit { 0%{opacity:.9;transform:scale(.985)} 100%{opacity:0;transform:scale(1)} }
        /* three blurbs side by side at phone width wrap to four lines each and
           push the sliders off the panel; the labels alone still read */
        @media(max-width:650px){ .diff-blurb{display:none} .diff{padding:10px 4px}
                                 .settings-grid{grid-template-columns:1fr}.settings{max-height:42vh;overflow:auto}.pkeys{display:none} }
        .perf { position:absolute; right:14px; bottom:14px; display:none; pointer-events:none;
                font:11px/1.55 ui-monospace,Menlo,monospace; color:#9fe8c4; white-space:pre;
                text-shadow:0 1px 3px #000; letter-spacing:.5px; }
        .perf.on { display:block; }
        .perf b { color:#ffd06a; font-weight:400; }
        .scorebox { position:absolute; left:24px; top:60px; }
        .score-wave { color:#ffd0a0; font-size:12px; letter-spacing:3px; text-shadow:0 1px 3px #000; }
        .score-val { color:#fff; font-size:32px; font-weight:700; letter-spacing:2px; line-height:1.1;
                     text-shadow:0 0 12px #39e6e0aa, 0 2px 4px #000; font-variant-numeric:tabular-nums; }
        .score-combo { color:#ffcf4f; font-size:20px; font-weight:700; letter-spacing:1px; height:24px;
                       text-shadow:0 0 12px #ff8a2f, 0 2px 3px #000; transition:transform .1s; }
        .dmgpop { position:absolute; left:50%; top:38%; transform:translateX(-50%); color:#fff3a0;
                  font-size:30px; font-weight:800; text-shadow:0 0 10px #ff8a2f,0 2px 4px #000; opacity:0;
                  pointer-events:none; }
        @keyframes dmgpop { 0%{opacity:1;transform:translate(-50%,0) scale(1.1)} 100%{opacity:0;transform:translate(-50%,-40px) scale(.8)} }
        .wbtn { position:absolute; right:24px; top:60px; width:74px; height:74px; border-radius:50%;
                background:#0a1626cc; border:2px solid #7fdcff88; color:#eaf6ff; font-size:11px; letter-spacing:1px;
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
                pointer-events:auto; cursor:pointer; text-shadow:0 1px 2px #000; }
        .wbtn b { color:#7fdcff; font-size:12px; }
        /* development tool: only revealed when bindChapterDebug is called,
           which now happens solely under ?debug */
        .debug-btn { display:none; position:absolute; right:24px; top:142px; pointer-events:auto; cursor:pointer; z-index:35;
                     color:#ffd86a; background:#17150dcc; border:1px solid #ffd86a99;
                     border-radius:4px; padding:7px 10px; font-size:9px; letter-spacing:2px; }
        .debug-btn:hover { background:#3a3213; box-shadow:0 0 14px #ffd86a55; }
        .dash-action { display:none; position:absolute; right:24px; top:182px; width:74px; height:42px;
                       pointer-events:auto; cursor:pointer; z-index:18; border-radius:5px;
                       border:1px solid #58c8ff; color:#eaffff; background:#09233ddd;
                       font-size:10px; letter-spacing:2px; box-shadow:0 0 15px #168cff44; }
        .dash-action.ready { display:block; }
        .dash-action:active { background:#168cff; transform:scale(.96); }
        .tc-on .dash-action { display:none !important; }
        .debug-panel { position:absolute; right:108px; top:60px; width:250px; padding:12px;
                       display:none; pointer-events:auto; z-index:36; background:#080d16f2;
                       border:1px solid #ffd86a88; border-radius:6px; box-shadow:0 8px 28px #000b; }
        .debug-panel.open { display:block; }
        .debug-title { color:#ffd86a; font-size:10px; letter-spacing:3px; margin-bottom:9px; }
        .debug-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:6px; }
        .debug-ch { cursor:pointer; color:#eaf6ff; background:#111d2c; border:1px solid #3a5a7a;
                    border-radius:3px; padding:7px 5px; font-size:9px; letter-spacing:1px; }
        .debug-ch:hover { border-color:#ffd86a; color:#ffd86a; }
        .wheel { position:absolute; inset:0; display:none; align-items:center; justify-content:center;
                 background:#04060cbb; pointer-events:auto; z-index:20; }
        .wheel.open { display:flex; }
        .wheel-ring { position:relative; width:320px; height:320px; }
        .wseg { position:absolute; width:96px; height:96px; margin:-48px; left:50%; top:50%; border-radius:50%;
                background:#0e1c30ee; border:2px solid #3a5a7a; color:#eaf6ff; cursor:pointer;
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
                font-size:11px; letter-spacing:1px; transition:border-color .1s, box-shadow .1s; }
        .wseg:hover, .wseg.sel { border-color:#39e6e0; box-shadow:0 0 22px #39e6e055; }
        /* weapons stay dimmed until their boss is defeated */
        .wseg.locked { opacity:.28; filter:grayscale(1); pointer-events:none; }
        .wseg .ico { font-size:26px; }
        .wheel-title { position:absolute; left:50%; top:calc(50% + 180px); transform:translateX(-50%);
                       color:#bfe9ff; font-size:13px; letter-spacing:4px; text-shadow:0 1px 3px #000; }
      </style>
      <div class="hud-bar">
        <div class="hud-label">MECHA INTEGRITY</div>
        <div class="hud-track"><div class="hud-fill" id="hpfill" style="width:100%"></div></div>
      </div>
      <div class="scorebox">
        <div class="score-wave" id="score-wave">WAVE 0</div>
        <div class="score-val" id="score-val">0</div>
        <div class="score-combo" id="score-combo"></div>
      </div>
      <div class="dmgpop" id="dmgpop"></div>
      <div class="obj" id="obj">OBJECTIVE · <b>Explore Neo Tokyo</b></div>
      <div class="boss" id="boss">
        <div class="boss-name" id="bossname"></div>
        <div class="boss-track">
          <div class="boss-fill" id="bossfill" style="width:100%"></div>
          <div class="boss-open">OPENING · STRIKE THE CORE</div>
        </div>
        <div class="boss-state" id="boss-state"></div>
      </div>
      <div class="chips">
        <div class="chip" id="chip-weapon"><b>A</b> ATTACK · <b>1-6</b> or WHEEL to switch</div>
        <div class="chip" id="chip-boots"><b>SPACE (hold)</b> ROCKET BOOTS</div>
        <div class="chip locked" id="chip-beam"><b>E</b> BEAM — ???</div>
        <div class="chip locked" id="chip-nova"><b>Q</b> NOVA — ???</div>
        <div class="chip locked" id="chip-blades">CRIMSON EDGE — ???</div>
        <div class="chip" id="chip-power" style="display:none"></div>
      </div>
      <div class="perf" id="perf"></div>
      <div class="toast" id="toast"><h1 id="toast-h"></h1><p id="toast-p"></p></div>
      <div class="impact-flash" id="impact-flash"></div>
      <div class="critical-state" id="critical-state"></div>
      <div class="critical-label" id="critical-label">⚠ INTEGRITY CRITICAL</div>
      <div class="evade-flash" id="evade-flash">PERFECT EVADE</div>
      <div class="target-lock" id="target-lock"><div class="target-data" id="target-data"></div></div>
      <div class="boss-intro" id="boss-intro">
        <div class="threat" id="boss-intro-threat">HOSTILE SIGNATURE</div>
        <div class="name" id="boss-intro-name"></div>
        <div class="subtitle" id="boss-intro-sub"></div>
      </div>
      <div class="cross"></div>
      <div class="wbtn" id="wbtn"><b id="wbtn-ico">⚔</b><span id="wbtn-name">SABER</span></div>
      <button class="debug-btn" id="debug-btn" type="button">DEBUG</button>
      <button class="dash-action" id="dash-action" type="button"><b>C</b> DASH</button>
      <div class="debug-panel" id="debug-panel">
        <div class="debug-title">JUMP TO CHAPTER</div>
        <div class="debug-grid" id="debug-grid"></div>
      </div>
      <div class="wheel" id="wheel">
        <div class="wheel-ring">${ym.map((e,t)=>{let n=t/ym.length*Math.PI*2-Math.PI/2,r=Math.round(Math.cos(n)*118),i=Math.round(Math.sin(n)*118);return`<div class="wseg locked" id="w-${e.id}" style="transform:translate(${r}px,${i}px)">
                    <span class="ico">${e.icon}</span>${e.label}</div>`}).join(``)}</div>
        <div class="wheel-title">SELECT WEAPON</div>
      </div>
      <div class="minimap" id="minimap">
        <div class="mm-ring" style="width:56px;height:56px"></div>
        <div class="mm-ring" style="width:112px;height:112px"></div>
        <div class="mm-cone"></div>
        <div class="mm-compass" id="mm-compass">
          <div class="mm-card" id="mm-n"><span>N</span></div>
          <div class="mm-card" id="mm-e"><span>E</span></div>
          <div class="mm-card" id="mm-s"><span>S</span></div>
          <div class="mm-card" id="mm-w"><span>W</span></div>
        </div>
        <div class="mm-dot mm-me"></div>
        <div class="mm-fwd">▲ FWD</div>
        <div class="mm-label">RADAR</div>
      </div>
      <div class="bossarrow" id="bossarrow"></div>
      <div class="bossdist" id="bossdist"></div>
      <div class="comms" id="comms">
        <div class="comms-row">
          <img class="comms-avatar" id="comms-avatar" src="/portraits/aya-command.png" alt="" />
          <div class="comms-copy"><div class="comms-who" id="comms-who"></div>
          <div class="comms-text" id="comms-text"></div></div>
        </div>
        <div class="comms-next" id="comms-next">ENTER ▸ SKIP</div>
      </div>
      <div class="card" id="card">
        <div class="ch" id="card-ch"></div>
        <h1 id="card-title"></h1>
        <div class="body" id="card-body"></div>
        <div class="go">CLICK TO CONTINUE</div>
      </div>
      <div class="vig" id="vig"></div>
      <div class="shield-flash" id="shield-flash"></div>
      <div class="pause" id="pause">
        <h1>PAUSED</h1>
        <div class="stats" id="pause-stats"></div>
        <div class="pbtn" id="p-resume">RESUME</div>
        <div class="pbtn" id="p-restart">RESTART RUN</div>
        <div class="settings">
          <div class="settings-title">SYSTEM CONFIGURATION</div>
          <div class="difficulty" id="set-difficulty">
            ${Object.keys(bm).map(e=>`<button type="button" class="diff" data-diff="${e}">
                 <span class="diff-name">${bm[e].label}</span>
                 <span class="diff-blurb">${bm[e].blurb}</span>
               </button>`).join(``)}
          </div>
          <div class="settings-grid">
            <label class="setting">MUSIC <input id="set-music" type="range" min="0" max="100"/><output id="out-music"></output></label>
            <label class="setting">EFFECTS <input id="set-effects" type="range" min="0" max="100"/><output id="out-effects"></output></label>
            <label class="setting">CAMERA SHAKE <input id="set-shake" type="range" min="0" max="100"/><output id="out-shake"></output></label>
            <label class="setting">LOOK SPEED <input id="set-sensitivity" type="range" min="40" max="160"/><output id="out-sensitivity"></output></label>
            <label class="setting toggle">SUBTITLES <input id="set-subtitles" type="checkbox"/></label>
            <label class="setting toggle">HIGH CONTRAST <input id="set-contrast" type="checkbox"/></label>
            <label class="setting toggle">REDUCED MOTION <input id="set-motion" type="checkbox"/></label>
          </div>
        </div>
        <div class="pkeys">
          <b>ARROWS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump / fly &nbsp; <b>C</b> dash<br/>
          <b>A</b> or <b>click</b> attack &nbsp; <b>1-6</b> switch weapon &nbsp; <b>E</b> beam &nbsp; <b>Q</b> nova pulse<br/>
          <b>L</b> or <b>middle-click</b> lock on &nbsp; <b>ESC</b> pause
        </div>
      </div>
      <div class="hint">ARROWS / WASD move · SHIFT boost · SPACE rise · X descend · C dash<br/>A / click attack · F Crimson Breaker · L or middle-click lock-on</div>
    `,this.hpFill=document.getElementById(`hpfill`),this.bossWrap=document.getElementById(`boss`),this.bossName=document.getElementById(`bossname`),this.bossFill=document.getElementById(`bossfill`),this.toastEl=document.getElementById(`toast`),this.vignette=document.getElementById(`vig`),this.chips={beam:document.getElementById(`chip-beam`),boots:document.getElementById(`chip-boots`),nova:document.getElementById(`chip-nova`),blades:document.getElementById(`chip-blades`)},this.wheel=document.getElementById(`wheel`),document.getElementById(`wbtn`).addEventListener(`click`,e=>{e.stopPropagation(),this.wheel.classList.toggle(`open`)});for(let e of ym)document.getElementById(`w-`+e.id).addEventListener(`click`,t=>{t.stopPropagation(),this.onSelectWeapon(e.id),this.wheel.classList.remove(`open`)});this.wheel.addEventListener(`click`,()=>this.wheel.classList.remove(`open`))}bindWeaponWheel(e){this.onSelectWeapon=e}bindDash(e){document.getElementById(`dash-action`).addEventListener(`click`,t=>{t.stopPropagation(),e()})}unlockDash(){document.getElementById(`dash-action`).classList.add(`ready`)}unlockWeapon(e){document.getElementById(`w-`+e).classList.remove(`locked`)}toggleWheel(){this.wheel.classList.toggle(`open`)}setScore(e,t){document.getElementById(`score-val`).textContent=e.toLocaleString();let n=document.getElementById(`score-combo`);n.textContent=t>1?`×`+t+` COMBO`:``,n.style.transform=t>1?`scale(1.15)`:`scale(1)`,setTimeout(()=>n.style.transform=`scale(1)`,90)}resetUnlocks(){document.getElementById(`dash-action`).classList.remove(`ready`);let e={beam:`<b>E</b> BEAM — ???`,nova:`<b>Q</b> NOVA — ???`,blades:`CRIMSON EDGE — ???`};for(let t of Object.keys(e)){let n=this.chips[t];n&&(n.classList.add(`locked`),n.innerHTML=e[t],n.style.borderColor=``)}let t=this.chips.boots;t&&(t.classList.remove(`locked`),t.innerHTML=`<b>SPACE (hold)</b> ROCKET BOOTS`,t.style.borderColor=``);for(let e of ym){let t=document.getElementById(`w-`+e.id),n=e.id===`saber`||e.id===`rifle`;t.classList.toggle(`locked`,!n)}let n=document.getElementById(`chip-power`);n.style.display=`none`}setPaused(e,t){document.getElementById(`pause`).classList.toggle(`open`,e),e&&t&&(document.getElementById(`pause-stats`).innerHTML=`SCORE <b>${t.score.toLocaleString()}</b> &nbsp;·&nbsp; WAVE <b>${t.wave}</b> &nbsp;·&nbsp; LOSSES <b>${t.deaths}</b>`)}bindPause(e,t){document.getElementById(`p-resume`).addEventListener(`click`,e),document.getElementById(`p-restart`).addEventListener(`click`,t)}bindSettings(e,t){let n=[[`music`,`music`,100],[`effects`,`effects`,100],[`shake`,`shake`,100],[`sensitivity`,`sensitivity`,100]],r=()=>{for(let[t,r,i]of n){let n=document.getElementById(`set-`+r);e[t]=Number(n.value)/i,document.getElementById(`out-`+r).textContent=Math.round(Number(n.value))+`%`}e.subtitles=document.getElementById(`set-subtitles`).checked,e.highContrast=document.getElementById(`set-contrast`).checked,e.reducedMotion=document.getElementById(`set-motion`).checked,this.root.classList.toggle(`subtitles-off`,!e.subtitles),this.root.classList.toggle(`hc-on`,e.highContrast),this.root.classList.toggle(`reduced-motion`,e.reducedMotion),t({...e})};for(let[t,i,a]of n){let n=document.getElementById(`set-`+i);n.value=String(Math.round(e[t]*a)),n.addEventListener(`input`,r)}document.getElementById(`set-subtitles`).checked=e.subtitles,document.getElementById(`set-contrast`).checked=e.highContrast,document.getElementById(`set-motion`).checked=e.reducedMotion;for(let e of[`set-subtitles`,`set-contrast`,`set-motion`])document.getElementById(e).addEventListener(`change`,r);let i=Array.from(document.querySelectorAll(`#set-difficulty .diff`)),a=()=>{for(let t of i)t.classList.toggle(`on`,t.dataset.diff===e.difficulty)};for(let t of i)t.addEventListener(`click`,n=>{n.stopPropagation(),e.difficulty=t.dataset.diff,a(),r()});a(),r()}bindChapterDebug(e,t){let n=document.getElementById(`debug-panel`),r=document.getElementById(`debug-btn`);r.style.display=`block`;let i=document.getElementById(`debug-grid`);i.innerHTML=e.map((e,t)=>`<button class="debug-ch" type="button" data-ch="${t}">CH ${e.no}<br/>${e.title}</button>`).join(``),r.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.toggle(`open`)}),i.querySelectorAll(`.debug-ch`).forEach(e=>{e.addEventListener(`click`,r=>{r.stopPropagation(),n.classList.remove(`open`),t(Number(e.dataset.ch))})})}say(e){this.commsQueue.push(...e)}skipLine(){let e=this.commsQueue[0];if(e&&this.commsOn){if(this.typed<e.text.length){this.typed=e.text.length,document.getElementById(`comms-text`).textContent=e.text,this.holdT=.35;return}this.commsQueue.shift(),this.commsOn=!1,this.typed=0,this.holdT=0,this.commsQueue.length===0&&document.getElementById(`comms`).classList.remove(`show`)}}get busy(){return this.commsQueue.length>0}closeCard(){document.getElementById(`card`).classList.remove(`show`),this.cardOpen=!1}clearComms(){this.commsQueue.length=0,this.typed=0,this.holdT=0,this.commsOn=!1,this.bled=!1;let e=document.getElementById(`comms`);e.classList.remove(`show`),e.classList.remove(`bled`)}updateComms(e){let t=document.getElementById(`comms`);if(!this.commsOn){if(this.commsQueue.length===0)return;this.commsOn=!0,this.typed=0,this.holdT=0;let e=this.commsQueue[0],n=document.getElementById(`comms-avatar`),r=e.who.includes(`KUROSAWA`)?`dr-kurosawa`:e.who.includes(`KUROKI`)?`kuroki-pilot`:e.who.includes(`HINATA`)?`hinata-pilot`:e.who.includes(`JOTETSU`)?`jotetsu-engineer`:e.who.includes(`KOTETSU`)?`kotetsu-support`:e.who.includes(`REI`)?`rei-memorial`:`aya-command`;n.onerror=()=>{n.style.display=`none`},n.style.display=``,n.src=`/portraits/${r}.png`,n.alt=e.who,document.getElementById(`comms-who`).textContent=e.who,document.getElementById(`comms-text`).textContent=``,t.classList.toggle(`self`,e.who.includes(`KUROKI`)),this.bled=e.who.includes(`REI`),t.classList.toggle(`bled`,this.bled),t.classList.add(`show`)}let n=this.commsQueue[0];if(!n){this.commsOn=!1,t.classList.remove(`show`);return}if(this.typed<n.text.length){if(this.bled){this.bledT-=e,this.bledT<=0&&(this.bledT=.03+Math.random()*.17,this.typed+=2+Math.floor(Math.random()*8));let t=Math.min(n.text.length,Math.floor(this.typed)),r=n.text.slice(0,Math.max(0,t-2)),i=n.text.slice(Math.max(0,t-2),t).split(``).map(e=>e===` `||Math.random()<.5?e:xm[Math.floor(Math.random()*14)]).join(``);document.getElementById(`comms-text`).textContent=r+i}else this.typed+=e*46,document.getElementById(`comms-text`).textContent=n.text.slice(0,Math.floor(this.typed));this.holdT=1.1+n.text.length*.028}else this.holdT-=e,this.holdT<=0&&(this.commsQueue.shift(),this.commsOn=!1,this.commsQueue.length===0&&t.classList.remove(`show`))}showGameOver(e,t,n){let r=document.getElementById(`card`);return document.getElementById(`card-ch`).textContent=e,document.getElementById(`card-title`).textContent=t,document.getElementById(`card-body`).innerHTML=n+`<br/><br/><span style="color:#ff9bb0">CAMPAIGN OVER</span>`,document.querySelector(`.card .go`).textContent=this.isTouch?`TAP TO RESTART FROM CHAPTER 1`:`PRESS SPACE TO RESTART FROM CHAPTER 1`,r.classList.add(`show`,`over`),this.cardOpen=!0,new Promise(e=>{let t=()=>{r.removeEventListener(`click`,t),window.removeEventListener(`keydown`,n,!0),r.classList.remove(`show`,`over`),this.cardOpen=!1,e()},n=e=>{e.code!==`Space`&&e.code!==`Enter`||(e.preventDefault(),t())};r.addEventListener(`click`,t),window.addEventListener(`keydown`,n,!0)})}showCard(e,t,n){let r=document.getElementById(`card`);return document.getElementById(`card-ch`).textContent=e,document.getElementById(`card-title`).textContent=t,document.getElementById(`card-body`).innerHTML=n,document.querySelector(`.card .go`).textContent=this.isTouch?`TAP TO CONTINUE`:`PRESS SPACE TO CONTINUE`,r.classList.add(`show`),this.cardOpen=!0,new Promise(e=>{let t=()=>{r.removeEventListener(`click`,t),window.removeEventListener(`keydown`,n,!0),r.classList.remove(`show`),this.cardOpen=!1,e()},n=e=>{e.code!==`Space`&&e.code!==`Enter`&&e.code!==`Escape`||(e.preventDefault(),t())};r.addEventListener(`click`,t),window.addEventListener(`keydown`,n,!0)})}setRadar(e,t,n){let r=document.getElementById(`minimap`),i=r.clientWidth||168,a=i/2,o=i*.46;for(;this.blips.length<e.length;){let e=document.createElement(`div`);e.className=`mm-dot`,r.appendChild(e),this.blips.push(e)}for(let t=0;t<this.blips.length;t++){let r=this.blips[t],i=e[t];if(!i){r.style.display=`none`;continue}let s=Math.hypot(i.dx,i.dz),c=s>n?n/s:1,l=a+i.dx/n*o*c,u=a+i.dz/n*o*c,d=i.kind===`boss`,f=i.kind===`shelter`||i.kind===`shelterHit`,p=d?13:f?11:i.kind===`pickup`?7:8;r.style.display=`block`,r.style.left=l+`px`,r.style.top=u+`px`,r.style.width=p+`px`,r.style.height=p+`px`,r.style.borderRadius=f?`2px`:`50%`,r.style.background=d?`#ff5a52`:i.kind===`shelterHit`?`#ff4d4d`:i.kind===`shelter`||i.kind===`pickup`?`#5cf2a0`:`#ffb454`,r.style.boxShadow=d?`0 0 10px #ff5a52`:i.kind===`shelterHit`?`0 0 12px #ff4d4d`:`none`,r.style.opacity=s>n?`0.65`:`1`}let s=[[`mm-n`,0],[`mm-e`,Math.PI/2],[`mm-s`,Math.PI],[`mm-w`,-Math.PI/2]];for(let[e,n]of s){let r=t+n,i=document.getElementById(e);i.style.left=a+a*.83*Math.sin(r)+`px`,i.style.top=a-a*.83*Math.cos(r)+`px`}}setBossPointer(e,t=0){let n=document.getElementById(`bossarrow`),r=document.getElementById(`bossdist`);if(e===null){n.style.display=`none`,r.style.display=`none`;return}let i=window.innerWidth*.36,a=window.innerHeight*.34,o=window.innerWidth/2+Math.sin(e)*i,s=window.innerHeight/2-Math.cos(e)*a;n.style.display=`block`,n.style.left=o+`px`,n.style.top=s+`px`,n.style.transform=`translate(-50%,-50%) rotate(${e+Math.PI}rad)`,r.style.display=`block`,r.style.left=o+`px`,r.style.top=s+34+`px`,r.textContent=Math.round(t)+`m`}setObjective(e){document.getElementById(`obj`).innerHTML=`OBJECTIVE · <b>`+e+`</b>`}togglePerf(){return document.getElementById(`perf`).classList.toggle(`on`)}get perfOn(){return document.getElementById(`perf`).classList.contains(`on`)}setPerf(e){document.getElementById(`perf`).innerHTML=e}setWave(e){document.getElementById(`score-wave`).textContent=`WAVE `+e}setLockOn(e){let t=document.querySelector(`.cross`);t.style.background=e?`#ff5a7a`:`#7fdcffcc`,t.style.boxShadow=e?`0 0 10px #ff5a7a, 0 0 0 8px #ff5a7a33`:`0 0 6px #39e6e0`,t.style.transform=e?`scale(1.6)`:`scale(1)`}popDamage(e,t=!1){let n=document.getElementById(`dmgpop`);n.textContent=t?`-`+Math.round(e)+`!`:`-`+Math.round(e),n.style.color=t?`#7ff0ff`:``,n.style.textShadow=t?`0 0 18px #4de2ff`:``,n.style.animation=`none`,n.offsetWidth,n.style.animation=t?`dmgpop .75s ease-out`:`dmgpop .6s ease-out`}impactFeedback(e,t=1){let n=document.getElementById(`impact-flash`);n.classList.toggle(`weak`,e),n.style.animation=`none`,n.offsetWidth,n.style.animation=`impact-hit ${Math.max(.12,.2+t*.05)}s ease-out`}showBossIntro(e,t){let n=document.getElementById(`boss-intro`);document.getElementById(`boss-intro-name`).textContent=e,document.getElementById(`boss-intro-sub`).textContent=t,n.classList.remove(`show`),n.offsetWidth,n.classList.add(`show`)}setWeapon(e,t){let n=ym.find(t=>t.id===e);document.getElementById(`wbtn-ico`).textContent=n.icon,document.getElementById(`wbtn-name`).textContent=t??n.label;for(let t of ym)document.getElementById(`w-`+t.id).classList.toggle(`sel`,t.id===e)}showStart(e,t=!1,n){if(this.isTouch=t,t){document.getElementById(`comms-next`).textContent=`TAP ▸ SKIP`;let e=document.getElementById(`comms`),t=e=>{e.preventDefault(),e.stopPropagation(),this.skipLine()};e.addEventListener(`touchstart`,t,{passive:!1}),e.addEventListener(`click`,t)}let r=document.createElement(`div`);r.className=`start`,r.innerHTML=`
      <h1>MECHA CITY</h1>
      <h2>NEO TOKYO · TERRA-ARMOR DEPLOYMENT</h2>
      <div class="keys">
        ${t?`<b>D-PAD / LEFT SIDE</b> move &nbsp; <b>RIGHT SIDE</b> drag to look around<br/>
         <b>SABER / RIFLE</b> attack &nbsp; <b>JUMP (hold)</b> fly with rocket boots<br/>`:`<b>ARROW KEYS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump<br/>
         <b>A / LEFT CLICK</b> attack &nbsp; <b>R (hold)</b> charge the rifle<br/>`}
        Everything breaks. Citizens can't be hurt — but they will run.<br/>
        Hunt the monsters. Every boss you defeat teaches you a new power.
      </div>
      ${n?`<div class="go resume" id="go-resume">CONTINUE · CHAPTER ${n.chapter} — ${n.title}</div>`:``}
      <div class="go" id="go-new">${n?`START A NEW RUN`:`${t?`TAP`:`CLICK`} TO DEPLOY`}</div>
    `;let i=e=>{r.remove(),e()};n?(r.querySelector(`#go-resume`).addEventListener(`click`,e=>{e.stopPropagation(),i(n.onResume)}),r.querySelector(`#go-new`).addEventListener(`click`,t=>{t.stopPropagation(),i(e)})):r.addEventListener(`click`,()=>i(e)),this.root.appendChild(r)}dismissStart(){this.root.querySelector(`.start`)?.remove()}setHP(e){this.hpFill.style.width=Math.max(0,e*100)+`%`,this.hpFill.style.background=e<.3?`linear-gradient(90deg,#ff3b3b,#ff9a3b)`:`linear-gradient(90deg,#26e0a8,#7fdcff)`;let t=e>0&&e<=.25;document.getElementById(`critical-state`).classList.toggle(`on`,t),document.getElementById(`critical-label`).classList.toggle(`on`,t)}setTargetLock(e,t=0,n=0,r=0,i=`track`){let a=document.getElementById(`target-lock`);a.style.display=e?`block`:`none`,e&&(a.style.left=t+`px`,a.style.top=n+`px`,a.classList.toggle(`evade`,i===`evade`),a.classList.toggle(`open`,i===`open`),document.getElementById(`target-data`).textContent=i===`open`?`PUNISH · ${Math.round(r)}m`:i===`evade`?`EVADE · ${Math.round(r)}m`:`LOCK · ${Math.round(r)}m`)}perfectEvade(){let e=document.getElementById(`evade-flash`);e.style.animation=`none`,e.offsetWidth,e.style.animation=`perfectEvade 1.05s ease-out`}showBoss(e){this.bossWrap.style.display=`block`,this.bossName.textContent=`⚠ `+e+` ⚠`}setBossHP(e,t=1,n=!1){this.bossFill.style.width=Math.max(0,e*100)+`%`,this.bossFill.style.background=n?`linear-gradient(90deg,#7ff0ff,#4de2ff)`:t===3?`linear-gradient(90deg,#ff3b5c,#ff8a3d)`:t===2?`linear-gradient(90deg,#ff7a3d,#ffc44f)`:`linear-gradient(90deg,#ff4d6a,#ff9bb0)`,this.bossWrap.classList.toggle(`open`,n),this.bossWrap.classList.toggle(`enraged`,!n&&t===3),document.getElementById(`boss-state`).textContent=n?`CORE EXPOSED · COUNTERATTACK`:t===3?`PHASE III · ENRAGED`:t===2?`PHASE II · ESCALATING`:`PHASE I · ENGAGED`}hideBoss(){this.bossWrap.style.display=`none`}toast(e,t,n=3.5){document.getElementById(`toast-h`).textContent=e,document.getElementById(`toast-p`).textContent=t,this.toastEl.style.opacity=`1`,this.toastTimer=n}unlock(e,t){let n=this.chips[e];n&&(n.classList.remove(`locked`),n.innerHTML=t,n.style.borderColor=`#39e6e0`)}setPowerLevel(e){let t=document.getElementById(`chip-power`);t.style.display=`block`,t.style.borderColor=`#f6b1d5`,t.innerHTML=`<b>PWR</b> Lv ${e}`}damageFlash(){this.vignette.style.opacity=`1`,setTimeout(()=>this.vignette.style.opacity=`0`,250)}shieldFlash(){let e=document.getElementById(`shield-flash`);e.classList.remove(`on`),e.offsetWidth,e.classList.add(`on`)}update(e){this.updateComms(e),this.toastTimer>0&&(this.toastTimer-=e,this.toastTimer<=0&&(this.toastEl.style.opacity=`0`))}};function Cm(){return new URLSearchParams(location.search).has(`touch`)?!0:window.matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0}var wm=52,Tm=class{constructor(e,t){G(this,`cb`,void 0),G(this,`moveX`,0),G(this,`moveZ`,0),G(this,`jump`,!1),G(this,`boost`,!1),G(this,`beam`,!1),G(this,`layer`,void 0),G(this,`stickBase`,void 0),G(this,`stickKnob`,void 0),G(this,`moveId`,null),G(this,`lookId`,null),G(this,`moveOrigin`,{x:0,y:0}),G(this,`lookLast`,{x:0,y:0}),G(this,`beamBtn`,void 0),G(this,`novaBtn`,void 0),this.cb=t,this.layer=document.createElement(`div`),this.layer.innerHTML=`
      <style>
        .tc-layer { position:absolute; inset:0; pointer-events:auto; touch-action:none;
                    font-family:inherit; user-select:none; -webkit-user-select:none; }
        .tc-stick { position:absolute; width:${wm*2}px; height:${wm*2}px; border-radius:50%;
                    border:2px solid #7fdcff66; background:#0a162655; display:none;
                    transform:translate(-50%,-50%); pointer-events:none; }
        .tc-knob { position:absolute; width:44px; height:44px; border-radius:50%;
                   background:#7fdcffbb; box-shadow:0 0 12px #39e6e088;
                   transform:translate(-50%,-50%); pointer-events:none; display:none; }
        /* Thumb-shaped pad rather than a column. The old 2-wide stack ran
           310px up the screen — over a third of a phone — which put the
           abilities out of reach. Attack sits in the corner where the thumb
           rests; movement is one reach away; abilities are a strip on top.
           Rounded rectangles rather than circles: they carry a word legibly
           at this size, and they tile without the wasted gaps discs leave. */
        .tc-btns { position:absolute; right:calc(10px + env(safe-area-inset-right));
                   bottom:calc(14px + env(safe-area-inset-bottom)); display:grid;
                   grid-template-columns:70px 70px 92px;
                   grid-template-rows:44px 48px 58px;
                   grid-template-areas:
                     ".     nova  beam"
                     "dash  wheel boost"
                     ".     jump  attack";
                   gap:7px; }
        .tc-btn { border-radius:13px; border:1px solid #4d76a0;
                  background:linear-gradient(180deg,#12263bd9,#0a1626e6);
                  color:#dfeeff; font-size:11px; font-weight:600; letter-spacing:1.2px;
                  display:flex; align-items:center; justify-content:center; text-align:center;
                  line-height:1.1; text-shadow:0 1px 2px #000a; touch-action:none;
                  box-shadow:0 1px 0 #ffffff14 inset, 0 2px 6px #0006; }
        /* situational abilities read quieter than the things used every second */
        .tc-btn.minor { font-size:9.5px; letter-spacing:1px; color:#a9c8e4;
                        border-color:#31536f; background:linear-gradient(180deg,#0e1e2fc4,#0a1626cc); }
        #tc-nova { grid-area:nova; } #tc-beam { grid-area:beam; }
        #tc-wheel { grid-area:wheel; } #tc-boost { grid-area:boost; } #tc-dash { grid-area:dash; }
        #tc-jump { grid-area:jump; } #tc-attack { grid-area:attack; }
        /* the primary action reads as the primary action */
        .tc-btn.big { border-color:#4fe6e0; color:#eaffff; font-size:12.5px; letter-spacing:1.6px;
                      background:linear-gradient(180deg,#12414ce0,#0a2630e6);
                      box-shadow:0 0 18px #39e6e03d, 0 1px 0 #ffffff1f inset, 0 2px 8px #0007; }
        .tc-btn.held { background:linear-gradient(180deg,#2ea9b0,#1d7f8a); border-color:#7ff5ef;
                       color:#f2ffff; box-shadow:0 0 22px #39e6e077; }
        .tc-btn.hidden { visibility:hidden; }
        /* Landscape phones are short. The portrait pad would take well over
           half the height, so it flattens into two rows and the abilities
           tuck in beside the movement keys instead of above them. */
        @media (orientation:landscape) and (max-height:520px) {
          .tc-btns { grid-template-columns:44px 48px 48px 64px;
                     grid-template-rows:44px 60px;
                     grid-template-areas:
                       ".    nova  beam  wheel"
                       "dash boost jump  attack";
                     gap:7px; bottom:calc(10px + env(safe-area-inset-bottom)); }
          .tc-btn { font-size:9px; }
          .tc-btn.big { font-size:10px; }
        }
        /* hint ring showing where the movement stick lives until first touch */
        .tc-hint { position:absolute; left:calc(64px + env(safe-area-inset-left));
                   bottom:calc(120px + env(safe-area-inset-bottom)); width:96px; height:96px;
                   margin:-48px 0 0 -48px; border-radius:50%; border:2px dashed #7fdcff33;
                   display:flex; align-items:center; justify-content:center;
                   color:#7fdcff66; font-size:10px; letter-spacing:1px; pointer-events:none; }
        .tc-hint.gone { display:none; }
        /* declutter the desktop HUD while touch controls are active */
        .tc-on .hint { display:none !important; }
        .tc-on .chips { display:none !important; }
        /* The title screen was laid out for a desktop width and ran off the
           side of a phone — the subtitle alone is 34 characters and clipped
           at both edges. Everything here scales with the viewport instead. */
        .tc-on .start { padding:0 18px; text-align:center; }
        .tc-on .start h1 { font-size:clamp(22px,8.5vw,34px) !important;
                           letter-spacing:clamp(3px,1.6vw,8px) !important; margin-bottom:4px !important; }
        .tc-on .start h2 { font-size:clamp(8px,2.7vw,12px) !important;
                           letter-spacing:clamp(1px,.9vw,4px) !important; margin-bottom:20px !important;
                           max-width:100%; }
        .tc-on .start .keys { font-size:clamp(9.5px,3vw,12px) !important; line-height:1.85;
                              padding:0; max-width:100%; }
        .tc-on .start .go { font-size:clamp(11px,3.2vw,14px); padding:12px 20px;
                            letter-spacing:clamp(2px,1vw,4px); max-width:calc(100vw - 44px); }
      </style>
      <div class="tc-stick" id="tc-stick"><div class="tc-knob" id="tc-knob"></div></div>
      <div class="tc-hint" id="tc-hint">DRAG<br/>TO MOVE</div>
      <div class="tc-btns">
        <div class="tc-btn minor hidden" id="tc-nova">NOVA</div>
        <div class="tc-btn minor hidden" id="tc-beam">BEAM</div>
        <div class="tc-btn" id="tc-wheel">WEAPON</div>
        <div class="tc-btn hidden" id="tc-dash">DASH</div>
        <div class="tc-btn" id="tc-boost">BOOST</div>
        <div class="tc-btn" id="tc-jump">JUMP</div>
        <div class="tc-btn big" id="tc-attack">ATTACK</div>
      </div>
    `,this.layer.className=`tc-layer`,e.classList.add(`tc-on`),e.appendChild(this.layer),this.stickBase=this.layer.querySelector(`#tc-stick`),this.stickKnob=this.layer.querySelector(`#tc-knob`),this.beamBtn=this.layer.querySelector(`#tc-beam`),this.novaBtn=this.layer.querySelector(`#tc-nova`),this.bindButtons(),this.bindTouches()}unlock(e){(e===`beam`?this.beamBtn:this.novaBtn)?.classList.remove(`hidden`)}unlockWeapon(e){}unlockDash(){this.layer.querySelector(`#tc-dash`)?.classList.remove(`hidden`)}setWeapon(e){let t=ym.find(t=>t.id===e),n=this.layer.querySelector(`#tc-attack`);n&&(n.textContent=t.label)}bindButtons(){let e=(e,t)=>{let n=this.layer.querySelector(`#`+e);n.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),n.classList.add(`held`),t(!0)});let r=e=>{e.preventDefault(),e.stopPropagation(),n.classList.remove(`held`),t(!1)};n.addEventListener(`touchend`,r),n.addEventListener(`touchcancel`,r)},t=(e,t)=>{let n=this.layer.querySelector(`#`+e);n.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),n.classList.add(`held`),t(),setTimeout(()=>n.classList.remove(`held`),120)})};t(`tc-wheel`,()=>this.cb.onWheel()),t(`tc-nova`,()=>this.cb.onNova()),t(`tc-dash`,()=>this.cb.onDash());let n=this.layer.querySelector(`#tc-attack`);n.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),n.classList.add(`held`),this.cb.onAttackDown()});let r=e=>{e.preventDefault(),e.stopPropagation(),n.classList.remove(`held`),this.cb.onAttackUp()};n.addEventListener(`touchend`,r),n.addEventListener(`touchcancel`,r),e(`tc-jump`,e=>this.jump=e),e(`tc-boost`,e=>this.boost=e),e(`tc-beam`,e=>this.beam=e)}bindTouches(){this.layer.addEventListener(`touchstart`,e=>{e.preventDefault();for(let t of Array.from(e.changedTouches))t.clientX<window.innerWidth*.45&&this.moveId===null?(this.moveId=t.identifier,this.moveOrigin={x:t.clientX,y:t.clientY},this.stickBase.style.left=t.clientX+`px`,this.stickBase.style.top=t.clientY+`px`,this.stickBase.style.display=`block`,this.stickKnob.style.display=`block`,this.layer.querySelector(`#tc-hint`).classList.add(`gone`),this.setKnob(0,0)):this.lookId===null&&(this.lookId=t.identifier,this.lookLast={x:t.clientX,y:t.clientY})}),this.layer.addEventListener(`touchmove`,e=>{e.preventDefault();for(let t of Array.from(e.changedTouches))if(t.identifier===this.moveId){let e=t.clientX-this.moveOrigin.x,n=t.clientY-this.moveOrigin.y,r=Math.hypot(e,n);r>wm&&(e*=wm/r,n*=wm/r),this.setKnob(e,n),this.moveX=Math.abs(e)>8?e/wm:0,this.moveZ=Math.abs(n)>8?-n/wm:0}else t.identifier===this.lookId&&(this.cb.onLook(t.clientX-this.lookLast.x,t.clientY-this.lookLast.y),this.lookLast={x:t.clientX,y:t.clientY})});let e=e=>{for(let t of Array.from(e.changedTouches))t.identifier===this.moveId?(this.moveId=null,this.moveX=0,this.moveZ=0,this.stickBase.style.display=`none`,this.stickKnob.style.display=`none`):t.identifier===this.lookId&&(this.lookId=null)};this.layer.addEventListener(`touchend`,e),this.layer.addEventListener(`touchcancel`,e)}setKnob(e,t){this.stickKnob.style.left=wm+e+`px`,this.stickKnob.style.top=wm+t+`px`}},Em=new I,Dm=.7,Om=.5,km=.62,Am=new R(4862048),jm=class e{constructor(){G(this,`renderer`,void 0),G(this,`scene`,new Zn),G(this,`camera`,void 0),G(this,`world`,new Nu),G(this,`chunks`,void 0),G(this,`player`,void 0),G(this,`npcs`,void 0),G(this,`cars`,void 0),G(this,`debris`,new wp),G(this,`planes`,new gf),G(this,`defenseWing`,new Sf),G(this,`defenseWingAnnounced`,!1),G(this,`defenseLossCursor`,0),G(this,`drones`,new Df),G(this,`traffic`,new Lf),G(this,`ally`,new Vf),G(this,`tank`,new Jf),G(this,`digger`,new tp),G(this,`shelters`,void 0),G(this,`evacuees`,void 0),G(this,`lateMemoryIdx`,0),G(this,`ayaHinataIdx`,0),G(this,`kotetsuCursor`,new Map),G(this,`jotetsuCursor`,new Map),G(this,`mechanicT`,40),G(this,`diggerChatterT`,32),G(this,`supportArrivalChapter`,-1),G(this,`supportArrivalArmed`,!1),G(this,`diggerWorkTarget`,null),G(this,`ridingPlane`,null),G(this,`hud`,new Sm),G(this,`touch`,null),G(this,`keys`,new Set),G(this,`mouseDown`,[!1,!1,!1]),G(this,`drag`,null),G(this,`lastCollapseScan`,0),G(this,`collapseQueue`,[]),G(this,`camYaw`,0),G(this,`camPitch`,.32),G(this,`locked`,!1),G(this,`started`,!1),G(this,`projectiles`,[]),G(this,`laserCooldown`,0),G(this,`beamMesh`,void 0),G(this,`beamTick`,0),G(this,`beamActive`,!1),G(this,`sky`,void 0),G(this,`falling`,[]),G(this,`lastBoomSound`,0),G(this,`explosions`,new Rp),G(this,`fire`,new Xd),G(this,`flood`,new ef),G(this,`repair`,void 0),G(this,`hemi`,void 0),G(this,`sun`,void 0),G(this,`novaCooldown`,0),G(this,`chargeT`,0),G(this,`charging`,!1),G(this,`power`,1),G(this,`powerLevel`,1),G(this,`unlockedWeapons`,new Set([`saber`,`rifle`])),G(this,`selectedWeapon`,`saber`),G(this,`railCooldown`,0),G(this,`vulcanCooldown`,0),G(this,`streamCooldown`,0),G(this,`attackHeld`,!1),G(this,`pickups`,[]),G(this,`deaths`,0),G(this,`taughtWeakPoint`,!1),G(this,`campaignOver`,!1),G(this,`gameOver`,!1),G(this,`barkT`,0),G(this,`lastBark`,``),G(this,`barkCursor`,new Map),G(this,`idleChatterT`,30),G(this,`supportCallT`,8),G(this,`blocksWrecked`,0),G(this,`tutorial`,null),G(this,`tutWrecked`,0),G(this,`tutMarker`,null),G(this,`monsterBarkT`,0),G(this,`monsterBarkFor`,``),G(this,`memoryIdx`,0),G(this,`paused`,!1),G(this,`monster`,null),G(this,`bossIndex`,0),G(this,`latestFinishedChapter`,-1),G(this,`bossTimer`,14),G(this,`corruption`,0),G(this,`frontLine`,null),G(this,`notedReiPattern`,!1),G(this,`revenantBeats`,new Set),G(this,`droneBase`,3),G(this,`warnedContact`,!1),G(this,`lastSpawnFar`,!1),G(this,`wave`,0),G(this,`score`,0),G(this,`combo`,1),G(this,`comboTimer`,0),G(this,`shake`,0),G(this,`kick`,new I),G(this,`camRoll`,0),G(this,`rollTarget`,0),G(this,`slowmo`,0),G(this,`hitStop`,0),G(this,`impactZoom`,0),G(this,`monsterSmokeT`,0),G(this,`dashCameraT`,0),G(this,`bossIntroT`,0),G(this,`bossIntroDuration`,3),G(this,`lockOn`,!1),G(this,`dashT`,0),G(this,`dashFxT`,0),G(this,`evadeT`,0),G(this,`counterWindow`,0),G(this,`crimsonCooldown`,0),G(this,`redeploying`,!1),G(this,`chapterStartScore`,0),G(this,`chapterStartDeaths`,0),G(this,`chapterStartDamage`,0),G(this,`bossTelegraph`,new z(new Zi(5.5,7.3,32),new ni({color:16734773,transparent:!0,opacity:.55,depthWrite:!1,side:2}))),G(this,`evadeRewarded`,!1),G(this,`comboWindow`,0),G(this,`comboStep`,0),G(this,`clock`,new uo),G(this,`perfFrames`,0),G(this,`perfSum`,0),G(this,`perfWorst`,0),G(this,`perfWindow`,0),G(this,`time`,0),G(this,`footstepT`,0),G(this,`servoT`,0),G(this,`settings`,{difficulty:`normal`,music:.62,effects:.68,shake:.85,sensitivity:1,subtitles:!0,highContrast:!1,reducedMotion:!1}),G(this,`bossPlowFrom`,new I),G(this,`plowPoint`,new I);try{let e=JSON.parse(localStorage.getItem(`mecha-city.settings.v1`)??`null`);e&&typeof e==`object`&&(this.settings={...this.settings,...e})}catch{}this.renderer=new Al({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),document.body.appendChild(this.renderer.domElement),this.camera=new Ha(65,window.innerWidth/window.innerHeight,.2,1600),this.scene.background=new R(10868213),this.scene.fog=new Xn(12838136,165,420),this.hemi=new Aa(15136511,9083526,1.25),this.sun=new qa(16774365,1.35),this.sun.position.set(.6,1,.35),this.scene.add(this.hemi,this.sun),this.sky=new $p,this.scene.add(this.sky.group),this.chunks=new wd(this.world,this.scene,Cm()),this.scene.fog.near=this.chunks.viewDistance*.55,this.scene.fog.far=this.chunks.viewDistance*1.5,this.player=new Nd(this.world),this.player.respawn(),this.scene.add(this.player.model.group),this.npcs=new Vd(this.world),this.cars=new sf(this.world),this.repair=new xp(this.world),this.shelters=new fp((e,t)=>this.world.groundHeight(e,t,60)),this.scene.add(this.shelters.group),this.evacuees=new _p(this.shelters.shelters.length),this.scene.add(this.evacuees.group),this.scene.add(this.npcs.group,this.cars.group,this.debris.mesh,this.explosions.group,this.fire.group),this.scene.add(this.planes.group,this.defenseWing.group,this.drones.group,this.traffic.group,this.ally.group,this.tank.group,this.digger.group),this.bossTelegraph.rotation.x=-Math.PI/2,this.bossTelegraph.visible=!1,this.scene.add(this.bossTelegraph),this.beamMesh=new z(new B(.7,.7,1),new ni({color:3794656,transparent:!0,opacity:.85})),this.beamMesh.visible=!1,this.scene.add(this.beamMesh),this.bindInput(),Cm()&&(this.touch=new Tm(document.getElementById(`hud`),{onAttackDown:()=>this.attackDown(),onAttackUp:()=>this.attackUp(),onNova:()=>this.novaPulse(),onDash:()=>this.dash(),onWheel:()=>this.hud.toggleWheel(),onLook:(e,t)=>{this.camYaw-=e*.006*this.settings.sensitivity,this.camPitch=Math.max(-.5,Math.min(1.2,this.camPitch+t*.005*this.settings.sensitivity))}})),window.addEventListener(`resize`,()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),window.__game=this,this.hud.bindWeaponWheel(e=>this.selectWeapon(e)),this.hud.bindDash(()=>this.dash()),this.hud.bindPause(()=>this.setPaused(!1),()=>this.restart()),this.hud.bindSettings(this.settings,e=>{this.settings=e,Y.setVolumes(e.music,e.effects);try{localStorage.setItem(`mecha-city.settings.v1`,JSON.stringify(e))}catch{}});let e=new URLSearchParams(location.search),t=e.has(`debug`)||e.has(`all`);if(t&&this.hud.bindChapterDebug(im,e=>this.jumpToChapter(e)),t)this.unlockEverything();else{for(let e of this.unlockedWeapons)this.hud.unlockWeapon(e);this.selectWeapon(`saber`)}this.hud.showStart(()=>{Y.ensure(),Y.startMusic(`intro`),this.hud.showCard(`PROLOGUE`,`THE BAY SPLIT OPEN`,`Fourteen hours ago something came through the water.<br/>The defence line is gone. The shelters are full.<br/><br/>You are the last Terra-Armor standing.`).then(()=>{Y.setMusicMode(`explore`),this.started=!0,this.touch||this.renderer.domElement.requestPointerLock(),this.hud.say(rm),this.hud.setObjective(`Hold Neo Tokyo`),this.beginTutorial()})},this.touch!==null,this.resumeOffer()),this.renderer.setAnimationLoop(()=>this.frame())}saveProgress(){if(this.campaignOver){this.clearProgress();return}try{let t={v:1,chapter:this.bossIndex,score:this.score,deaths:this.deaths,powerLevel:this.powerLevel,weapons:[...this.unlockedWeapons],abilities:{...this.player.abilities}};localStorage.setItem(e.SAVE_KEY,JSON.stringify(t))}catch{}}loadProgress(){try{let t=localStorage.getItem(e.SAVE_KEY);if(!t)return null;let n=JSON.parse(t);return n?.v!==1||typeof n.chapter!=`number`||n.chapter<=0||n.chapter>=im.length?null:n}catch{return null}}clearProgress(){try{localStorage.removeItem(e.SAVE_KEY)}catch{}}resumeOffer(){let e=this.loadProgress();if(!e)return;let t=im[e.chapter];return{chapter:t.no,title:t.title,onResume:()=>{Y.ensure(),Y.startMusic(`explore`),this.resumeFrom(e)}}}resumeFrom(e){this.hud.dismissStart(),this.restart(),this.started=!0,this.bossIndex=e.chapter,this.latestFinishedChapter=e.chapter-1,this.wave=e.chapter,this.score=e.score,this.deaths=e.deaths,this.powerLevel=e.powerLevel??1,this.bossTimer=7,this.player.invulnT=5,this.unlockedWeapons=new Set(e.weapons),this.player.abilities={...this.player.abilities,...e.abilities},this.player.model.setCrimsonEdge(this.player.abilities.blades),this.player.model.setAegisArmor(this.player.abilities.shield),this.player.abilities.thrust&&(this.player.abilities.dash=!0);for(let e of this.unlockedWeapons)this.hud.unlockWeapon(e),this.touch?.unlockWeapon(e);this.powerLevel>1&&this.hud.setPowerLevel(this.powerLevel),this.player.abilities.beam&&this.hud.unlock(`beam`,`<b>E (hold)</b> PLASMA BEAM`),this.player.abilities.thrust&&this.hud.unlock(`boots`,`<b>SPACE</b> OVERDRIVE THRUSTERS`),this.player.abilities.dash&&(this.hud.unlockDash(),this.touch?.unlockDash()),this.player.abilities.nova&&this.hud.unlock(`nova`,this.novaLabel()),this.player.abilities.blades&&this.hud.unlock(`blades`,`CRIMSON EDGE`),this.player.abilities.quake&&this.hud.unlock(`nova`,this.novaLabel()),this.selectWeapon(`saber`),this.droneBase=Math.min(14,4+Math.floor(e.chapter*.75)),this.drones.target=this.droneBase,this.deploySupportFromEarlierChapters(e.chapter),this.hud.setWave(e.chapter),this.hud.setScore(this.score,1),this.touch||this.renderer.domElement.requestPointerLock();let t=im[e.chapter];this.hud.toast(`RESUMING`,`Chapter ${t.no} · ${t.title}`,3.5),this.hud.setObjective(`Reacquire systems — next contact inbound`)}bindInput(){window.addEventListener(`keydown`,e=>{if((e.code.startsWith(`Arrow`)||e.code===`Space`)&&e.preventDefault(),!this.hud.cardOpen){if(this.keys.add(e.code),e.code===`Enter`||e.code===`NumpadEnter`){this.hud.skipLine();return}if(e.code===`KeyF`&&this.fireLaser(),e.code===`KeyQ`&&this.novaPulse(),e.code===`KeyC`&&!e.repeat&&this.dash(),(e.code===`KeyL`||e.code===`Tab`)&&!e.repeat&&(e.preventDefault(),this.toggleLockOn()),e.code===`KeyA`&&!e.repeat&&this.attackDown(),e.code===`KeyF`&&!e.repeat&&this.crimsonFinisher(),e.code.startsWith(`Digit`)){let t=Number(e.code.slice(5))-1;t>=0&&t<ym.length&&this.selectWeapon(ym[t].id)}e.code===`Escape`&&this.started&&this.setPaused(!this.paused),e.code===`F3`&&!e.repeat&&(e.preventDefault(),this.hud.togglePerf()),e.code===`KeyR`&&!e.repeat&&this.started&&(this.charging=!0,this.chargeT=0)}}),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code),e.code===`KeyR`&&this.charging&&this.releaseCharge(),e.code===`KeyA`&&this.attackUp()}),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===this.renderer.domElement}),this.renderer.domElement.addEventListener(`mousedown`,e=>{if(this.started){if(this.mouseDown[e.button]=!0,e.button===1){this.toggleLockOn();return}this.locked?(e.button===0&&this.attackDown(),e.button===2&&this.fireLaser()):this.drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,button:e.button,moved:!1}}}),window.addEventListener(`mouseup`,e=>{this.mouseDown[e.button]=!1,this.locked&&e.button===0&&this.attackUp(),this.drag&&e.button===this.drag.button&&(!this.drag.moved&&this.started&&(this.renderer.domElement.requestPointerLock(),e.button===0&&(this.attackDown(),this.attackUp()),e.button===2&&this.fireLaser()),this.drag=null)}),window.addEventListener(`contextmenu`,e=>e.preventDefault()),window.addEventListener(`mousemove`,e=>{if(this.locked)this.camYaw-=e.movementX*.0026*this.settings.sensitivity,this.camPitch=Math.max(-.5,Math.min(1.2,this.camPitch+e.movementY*.0022*this.settings.sensitivity));else if(this.drag){let t=e.clientX-this.drag.x,n=e.clientY-this.drag.y;Math.abs(e.clientX-this.drag.sx)+Math.abs(e.clientY-this.drag.sy)>5&&(this.drag.moved=!0),this.camYaw-=t*.005*this.settings.sensitivity,this.camPitch=Math.max(-.5,Math.min(1.2,this.camPitch+n*.004*this.settings.sensitivity)),this.drag.x=e.clientX,this.drag.y=e.clientY}})}aimDir(){if(this.lockOn&&this.monster&&!this.monster.dying){Em.copy(this.monster.group.position),Em.y+=this.monster.centerY;let e=this.player.pos.clone();return e.y+=6.6,Em.sub(e).normalize()}return new I(-Math.sin(this.camYaw)*Math.cos(this.camPitch),-Math.sin(this.camPitch)*.6+.05,-Math.cos(this.camYaw)*Math.cos(this.camPitch)).normalize()}toggleLockOn(){!this.lockOn&&(!this.monster||this.monster.dying)||(this.lockOn=!this.lockOn,this.hud.setLockOn(this.lockOn))}dash(){if(this.dashT>0||!this.started||!this.player.abilities.dash)return;this.dashT=Md,this.evadeT=.36,this.evadeRewarded=!1;let e=this.keys.has(`KeyD`)||this.keys.has(`ArrowRight`),t=this.keys.has(`ArrowLeft`),n=this.keys.has(`KeyS`)||this.keys.has(`ArrowDown`),r=this.keys.has(`KeyW`)||this.keys.has(`ArrowUp`),i=!!e-+!!t,a=!!r-+!!n;this.touch&&(i+=this.touch.moveX,a+=this.touch.moveZ);let o;if(i!==0||a!==0){let e=Math.hypot(i,a),t=i/e,n=a/e,r=Math.sin(this.camYaw),s=Math.cos(this.camYaw);o=new I(t*s-n*r,0,t*-r-n*s)}else o=new I(Math.sin(this.player.yaw),0,Math.cos(this.player.yaw));this.player.dash(o),this.player.model.dashT=.3,this.player.model.setDashThrusters(!0),this.dashFxT=Md,this.dashCameraT=.3,this.shake=Math.max(this.shake,.18),this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y+3),3),Y.rocket(.6),this.rumble(150,.2,.38)}swingSaber(){let e=this.comboWindow>0,t=e?(this.comboStep+1)%3:0;if(!this.player.model.startSwing(t,e))return;if(this.comboStep=t,this.comboWindow=this.player.abilities.blades?1:.7,this.lockOn&&this.monster&&!this.monster.dying){let e=this.monster.group.position;this.player.yaw=Math.atan2(e.x-this.player.pos.x,e.z-this.player.pos.z)}else this.player.yaw=this.camYaw+Math.PI;let n=this.counterWindow>0;n&&(this.counterWindow=0,this.hud.toast(`REVERSAL`,`Perfect-evade counter · amplified strike`,1.5));let r=!this.player.grounded&&!this.player.onPlatform,i=this.dashFxT>0;Y.swing(),this.rumble(55,.08,.16),setTimeout(()=>{let e=this.aimDir(),a=t===2,o=a?[-.7,-.35,0,.35,.7]:[-.45,0,.45],s=(a?11:9)+(r?2:0)+(i?3:0);for(let t of o){let n=Math.cos(t),r=Math.sin(t),i=new I(e.x*n-e.z*r,e.y,e.x*r+e.z*n),o=this.player.pos.clone().addScaledVector(i,s);o.y+=5.6,this.destroyAt(o,a?5.2:4.4,a?.5:.25)}let c=this.player.pos.clone().addScaledVector(e,s);c.y+=5.6;let l=this.player.abilities.blades?1.6:1,u=(n?2.15:1)*(r?1.25:1)*(i?1.35:1),d=(a?26:12+t*4)*this.power*l*u;this.hitMonster(c,a?14:11,d,a?1.6:1.05)&&a&&(this.shake=Math.max(this.shake,.8))},190)}crimsonFinisher(){!this.started||!this.player.abilities.blades||this.crimsonCooldown>0||this.player.model.startSwing(2)&&(this.crimsonCooldown=4.5,this.comboWindow=0,this.hud.toast(`CRIMSON BREAKER`,`Charged edge released`,1.25),Y.swing(),setTimeout(()=>{if(!this.started)return;let e=this.aimDir(),t=this.player.pos.clone().addScaledVector(e,14);t.y+=6,this.destroyAt(t,7.5,.75),this.hitMonster(t,16,48*this.power,1.9,`crimson-breaker`),this.shake=Math.max(this.shake,.8),this.rumble(180,.45,.85)},220))}fireLaser(){if(this.laserCooldown>0||!this.started)return;this.laserCooldown=.22,Y.laser(),this.player.yaw=this.camYaw+Math.PI,this.player.model.group.rotation.y=this.player.yaw;let e=this.aimDir(),t=new I;this.player.model.fireRifle(t),t.addScaledVector(e,1.2);let n=new z(new B(.3,.3,2.2),new ni({color:16756968}));n.position.copy(t),n.lookAt(t.clone().add(e)),this.scene.add(n),this.projectiles.push({pos:t,vel:e.multiplyScalar(70),life:2.5,kind:`laser`,mesh:n})}selectWeapon(e){this.unlockedWeapons.has(e)&&(this.selectedWeapon=e,this.hud.setWeapon(e,e===`saber`&&this.player.abilities.blades?`CRIMSON EDGE`:void 0),this.touch?.setWeapon(e))}attackDown(){if(!this.started)return;let e=this.selectedWeapon;e===`saber`?this.swingSaber():e===`railgun`?this.fireRailgun():e===`flamer`||e===`aqua`||e===`vulcan`?this.attackHeld=!0:(this.charging=!0,this.chargeT=0)}attackUp(){this.attackHeld=!1,this.selectedWeapon===`rifle`&&this.charging&&this.releaseCharge()}fireRailgun(){if(this.railCooldown>0||!this.started)return;this.railCooldown=1.6,Y.zap(1),this.player.yaw=this.camYaw+Math.PI,this.player.model.group.rotation.y=this.player.yaw;let e=this.aimDir(),t=new I;this.player.model.fireRifle(t);let n=new z(new B(1.1,1.1,150),new ni({color:12577023,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));n.position.copy(t).addScaledVector(e,150/2),n.lookAt(t.clone().addScaledVector(e,150)),this.scene.add(n);let r={t:.32},i=()=>{r.t-=.016,n.material.opacity=Math.max(0,r.t/.32)*.9,r.t>0?requestAnimationFrame(i):(this.scene.remove(n),n.geometry.dispose(),n.material.dispose())};i();for(let n=6;n<150;n+=5){let r=t.clone().addScaledVector(e,n);if(r.y<.5)break;this.destroyAt(r,3.4,.3)}this.hitMonsterRay(t,e,150,55*this.power),this.shake=Math.max(this.shake,.7)}fireVulcan(){if(this.vulcanCooldown>0||!this.started)return;this.vulcanCooldown=.08,this.player.yaw=this.camYaw+Math.PI,this.player.model.group.rotation.y=this.player.yaw;let e=this.aimDir();e.x+=(Math.random()-.5)*.06,e.y+=(Math.random()-.5)*.04,e.z+=(Math.random()-.5)*.06,e.normalize();let t=this.player.pos.clone();t.y+=9.6,t.addScaledVector(e,2);let n=new z(new B(.18,.18,1.1),new ni({color:16774064}));n.position.copy(t),n.lookAt(t.clone().add(e)),this.scene.add(n),this.projectiles.push({pos:t,vel:e.multiplyScalar(95),life:1.2,kind:`laser`,mesh:n,dmg:3*this.power}),Math.random()<.35&&Y.laser()}updateStreams(e){let t=this.selectedWeapon,n=this.attackHeld&&(t===`flamer`||t===`aqua`);if(this.player.model.aiming=n||this.player.model.aiming,this.attackHeld&&t===`vulcan`&&this.fireVulcan(),!n||(this.streamCooldown-=e,this.streamCooldown>0))return;this.streamCooldown=.09,this.player.yaw=this.camYaw+Math.PI;let r=this.aimDir(),i=this.player.pos.clone();i.y+=7;let a=this.world.raycast(i.x,i.y,i.z,r.x,r.y,r.z,46),o=a?a.dist:46,s=i.clone().addScaledVector(r,o);if(t===`flamer`)this.fire.igniteSphere(this.world,s.x,s.y,s.z,4),this.explosions.boom(s,3),this.hitMonsterRay(i,r,o+6,5*this.power),Y.rocket(.5);else{let e=this.flood.floodSphere(this.world,s.x,s.z,5);this.chunks.markDirty(e),this.hitMonsterRay(i,r,o+6,4*this.power),this.fire.douse(s.x,s.z,6),Y.rocket(.35)}}releaseCharge(){if(this.charging=!1,!this.started)return;let e=Math.min(1,this.chargeT/1.1);if(e<.25){this.fireLaser();return}Y.laser(),this.player.yaw=this.camYaw+Math.PI,this.player.model.group.rotation.y=this.player.yaw;let t=this.aimDir(),n=new I;this.player.model.fireRifle(n),n.addScaledVector(t,1.5);let r=.4+e*.9,i=new z(new B(r,r,2.6+e*2),new ni({color:12577023}));i.position.copy(n),i.lookAt(n.clone().add(t)),this.scene.add(i),this.explosions.boom(n.clone(),2+e*2),this.projectiles.push({pos:n,vel:t.multiplyScalar(85),life:2.5,kind:`charge`,mesh:i,dmg:(14+e*40)*this.power})}fireRocket(e,t){Y.rocket(1-Math.min(1,e.distanceTo(this.player.pos)/130));let n=t.clone().sub(e).normalize(),r=new z(new B(.5,.5,1.4),new ni({color:16742959}));r.position.copy(e),r.lookAt(t),this.scene.add(r),this.projectiles.push({pos:e.clone(),vel:n.multiplyScalar(26),life:6,kind:`rocket`,mesh:r})}novaLabel(){return this.player.abilities.quake?`<b>Q</b> NOVA PULSE · OVERCHARGED`:`<b>Q</b> NOVA PULSE`}novaPulse(){if(!this.player.abilities.nova||this.novaCooldown>0||!this.started)return;let e=this.player.abilities.quake;this.novaCooldown=e?7:6;let t=this.player.pos.clone();t.y+=4,this.explosions.boom(t,e?16:14),Y.explode(1,1),this.shake=Math.max(this.shake,e?1.1:.6);let n=e?[[10,8],[19,14]]:[[10,8]];for(let[e,r]of n)for(let n=0;n<r;n++){let i=n/r*Math.PI*2,a=t.clone();a.x+=Math.sin(i)*e,a.z+=Math.cos(i)*e,e>12&&(a.y=this.world.groundHeight(a.x,a.z,40)+1),this.destroyAt(a,e>12?5:4.5,e>12?.4:.3)}if(this.monster&&!this.monster.dying){let t=this.monster.group.position.distanceTo(this.player.pos),n=e?40:34,r=(e?75:45)*this.power*Dm*km;t<n&&this.monster.takeDamage(r,`nova`)}}zapAt(e){let t=new z(new B(1.2,60,1.2),new ni({color:12577023,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));t.position.set(e.x,e.y+30,e.z),this.scene.add(t),setTimeout(()=>{this.scene.remove(t),t.geometry.dispose(),t.material.dispose()},140),this.explosions.boom(e,5),Y.zap(1-Math.min(1,e.distanceTo(this.player.pos)/130))}throwBoulder(e,t){let n=t.clone().sub(e),r=n.length();n.normalize();let i=new z(new B(2.4,2.4,2.4),new ua({color:9278366}));i.position.copy(e),i.rotation.set(Math.random()*3,Math.random()*3,0),this.scene.add(i);let a=n.multiplyScalar(Math.min(30,r*.45));a.y+=14,this.projectiles.push({pos:e.clone(),vel:a,life:8,kind:`boulder`,mesh:i}),Y.rocket(1-Math.min(1,e.distanceTo(this.player.pos)/130))}updateBeam(e){let t=this.player.abilities.beam&&(this.keys.has(`KeyE`)||this.touch?.beam===!0)&&this.started;if(this.player.model.aiming=t,this.beamMesh.visible=t,t!==this.beamActive&&(this.beamActive=t,t?Y.beamOn():Y.beamOff()),!t)return;this.player.yaw=this.camYaw+Math.PI;let n=this.aimDir(),r=this.player.pos.clone();r.y+=7;let i=this.world.raycast(r.x,r.y,r.z,n.x,n.y,n.z,90),a=i?i.dist:90;this.beamMesh.position.copy(r).addScaledVector(n,a/2),this.beamMesh.scale.set(1,1,a),this.beamMesh.lookAt(r.clone().addScaledVector(n,a+1));let o=.8+Math.sin(this.time*40)*.2;if(this.beamMesh.material.opacity=o,this.beamTick-=e,this.beamTick<=0){this.beamTick=.12;let e=r.clone().addScaledVector(n,a);i&&this.destroyAt(e,3,.15),this.hitMonsterRay(r,n,a+8,6*this.power,`beam`)}}hitMonster(e,t,n,r=.7,i,a=Dm){let o=!1,s=n*a,c=a===Dm;this.killDrones(this.drones.damageSphere(e,t,s)),this.notePlanesDowned(this.planes.damageSphere(e,t,s));let l=this.monster;if(l&&!l.dying&&(Em.copy(l.group.position),Em.y+=l.centerY,Em.distanceTo(e)<t+l.hitRadius)){let t=this.weakPointBonus(e);t>1&&this.bark(`weakPoint`);let n=l.vulnerable,a=l.takeDamage(s*t*km,i??this.selectedWeapon),u=t>1||n,d=e.clone().sub(Em);this.debris.sparks(e,d,u?18:9,u||a>=14),this.monsterSmokeT<=0&&(u||a>=10)&&(this.monsterSmokeT=u?.22:.42,this.explosions.smokePuff(e.clone().addScaledVector(d.normalize(),.8),u?2.6:1.7,u?3:2,!0));let f=Math.min(1.9,Math.max(.25,a/28)*r);c&&(this.hitStop=Math.max(this.hitStop,.012+f*.03+(u?.018:0)+(n?.022:0)),this.shake=Math.max(this.shake,.18+f*.34),this.impactZoom=Math.max(this.impactZoom,f+(u?.35:0)),this.hud.impactFeedback(u,f),this.addKick(e.clone().sub(this.player.pos),f*(n?2.6:1.7)),Y.impact(f,u),this.rumble(u?135:80,Math.min(1,.22+f*.25),Math.min(1,.35+f*.38)),this.addScore(Math.round(a*2),!0),this.hud.popDamage(a,n)),this.debris.burst(e,[15],c?n?12:6:3),o=!0}return o}killDrones(e){for(let t of e)this.explosions.boom(t,4),this.debris.burst(t,[6,12],8),this.addScore(120,!0),Y.explode(.25,1-Math.min(1,t.distanceTo(this.player.pos)/120)),Math.random()<.55&&this.spawnPickup(t)}hitMonsterRay(e,t,n,r,i){let a=r*Dm;this.killDrones(this.drones.damageRay(e,t,n,a)),this.notePlanesDowned(this.planes.damageRay(e,t,n,a));let o=this.monster;if(!o||o.dying)return;Em.copy(o.group.position),Em.y+=o.centerY;let s=Em.clone().sub(e),c=s.dot(t);if(!(c<0||c>n)&&s.sub(t.clone().multiplyScalar(c)).length()<o.hitRadius){let n=o.vulnerable,r=o.takeDamage(a*km,i??this.selectedWeapon),s=e.clone().addScaledVector(t,c);this.debris.sparks(s,t.clone().negate(),n?14:6,n||r>=10),this.monsterSmokeT<=0&&(n||r>=10)&&(this.monsterSmokeT=n?.22:.5,this.explosions.smokePuff(s,n?2.4:1.5,n?3:1,!0)),this.addScore(Math.round(r*2),!0),this.hud.popDamage(r,n)}}addScore(e,t=!1){t?(this.combo=Math.min(9,this.combo+1),this.comboTimer=3.5):this.comboTimer<=0&&(this.combo=1),this.score+=Math.round(e*this.combo),this.hud.setScore(this.score,this.combo)}destroyAt(e,t,n,r=!0){let i=this.world.destroySphere(e.x,e.y,e.z,t);if(i.count>0){r&&(this.score+=i.count,this.hud.setScore(this.score,this.combo)),n>.25&&(this.shake=Math.max(this.shake,Math.min(1.4,n))),this.chunks.markDirty(i.dirty),this.repair.noteDamage(i.dirty,this.time),this.blocksWrecked+=i.count,r&&(this.tutWrecked+=i.count),i.count>12&&this.evacuees.displace(e,i.count/26,this.shelters.targets,this.world),this.debris.burst(e,i.ids,Math.min(26,6+i.count/3)),i.count>4&&this.explosions.boom(e,Math.min(9,2+t));let a=1-Math.min(1,e.distanceTo(this.player.pos)/110);a>.04&&this.time-this.lastBoomSound>.09&&(this.lastBoomSound=this.time,Y.explode(Math.min(1,i.count/60),a)),i.count>=4?this.checkCollapse(e,t):i.count>0&&this.queueCollapse(e)}this.npcs.scare(e,34),this.cars.scare(e,34)}queueCollapse(e){for(let t of this.collapseQueue)if(t.distanceToSquared(e)<100)return;this.collapseQueue.length<24&&this.collapseQueue.push(e.clone())}drainCollapseQueue(){if(this.collapseQueue.length===0||this.time-this.lastCollapseScan<.2)return;let e=this.collapseQueue.shift();this.checkCollapse(e,6)}checkCollapse(e,t){if(this.time-this.lastCollapseScan<.15){this.queueCollapse(e);return}this.lastCollapseScan=this.time;let n=this.world.collapseScan(e.x,e.y,e.z,t);if(!n&&e.y<26&&(n=this.world.foundationScan(e.x,e.z,e.y+t)),!n)return;if(this.chunks.markDirty(n.dirty),this.repair.noteDamage(n.dirty,this.time),this.falling.length>=7){this.debris.burst(e,n.blocks.slice(0,6).map(e=>e[3]),30);return}let r=this.world.groundHeight(e.x,e.z,40),i=Op(n.blocks,r);this.scene.add(i.mesh),this.falling.push(i),n.blocks.length>1500&&this.bark(`buildingDown`)}updateFalling(e){for(let t=this.falling.length-1;t>=0;t--){let n=this.falling[t];if(!Mp(n,e))continue;let r=n.mesh.position.clone();if(r.y=n.groundY+1,this.debris.burst(r,n.sampleIds,Math.min(40,10+n.blockCount/8)),this.explosions.boom(r,Math.min(12,4+n.blockCount/60)),n.blockCount>260){let e=r.clone().add(new I(-4,1.5,2)),t=r.clone().add(new I(4,2.5,-2));this.explosions.boom(e,5),this.explosions.boom(t,4),this.explosions.smokePuff(r.clone().setY(r.y+4),8,10,!0),n.blockCount>700&&this.fire.igniteSphere(this.world,r.x,r.y,r.z,4)}let i=1-Math.min(1,r.distanceTo(this.player.pos)/130);i>.04&&Y.explode(Math.min(1,n.blockCount/150),i),this.npcs.scare(r,40),this.cars.scare(r,40),this.scene.remove(n.mesh),n.mesh.geometry.dispose(),this.falling.splice(t,1)}}updatePlaneRiding(e){let t=this.player;if(this.ridingPlane){let n=this.ridingPlane.group.position.y+this.ridingPlane.deckY,r=this.planes.deckUnder(t.pos.x,t.pos.y,t.pos.z,2.5)===this.ridingPlane;if(e&&t.vel.y>0){this.ridingPlane=null,t.onPlatform=!1;return}if(!r){this.ridingPlane=null,t.onPlatform=!1;return}t.pos.y=n,t.vel.y=0,t.grounded=!0,t.onPlatform=!0;return}if(t.vel.y>0){t.onPlatform=!1;return}let n=this.planes.deckUnder(t.pos.x,t.pos.y,t.pos.z,2.5);if(!n){t.onPlatform=!1;return}this.ridingPlane=n,t.pos.y=n.group.position.y+n.deckY,t.vel.y=0,t.grounded=!0,t.onPlatform=!0,this.hud.toast(`AIRBORNE`,`Standing on a passing airliner`,2.5)}notePlanesDowned(e){for(let t of e){this.addScore(400,!0),this.hud.toast(`AIRLINER HIT`,`It is going down — clear the impact zone`,3),this.bark(`planeDown`,!0);let e=t.group.position.clone(),n=1-Math.min(1,e.distanceTo(this.player.pos)/150);this.explosions.boom(e,13),this.debris.burst(e,[16,6,12],26),this.explosions.smokePuff(e,9,10,!0),this.shake=Math.max(this.shake,.6),Y.explode(.7,n),this.ridingPlane===t&&(this.ridingPlane=null)}}trailCrashingPlanes(e){for(let t of this.planes.planes){if(!t.crashing||(t.smokeT-=e,t.smokeT>0))continue;t.smokeT=.05;let n=t.group.position.clone();this.explosions.smokePuff(n,7,3,!0),Math.random()<.5&&this.explosions.boom(n,3.5),Math.random()<.3&&this.debris.burst(n,[16,12],4)}}planeCrash(e){let t=new I(Math.sin(e.heading),0,Math.cos(e.heading));Y.explode(1,1-Math.min(1,e.at.distanceTo(this.player.pos)/200)),this.shake=Math.max(this.shake,1.5);for(let n=0;n<7;n++){let r=e.at.clone().addScaledVector(t,n*9);r.y=this.world.groundHeight(r.x,r.z,60)+2,this.destroyAt(r,n===0?13:10-n*.7,.6),this.explosions.boom(r,12-n),this.explosions.smokePuff(r,12-n,12-n,!0),this.debris.burst(r,[16,6,12,20],30-n*2),this.fire.igniteSphere(this.world,r.x,r.y,r.z,7)}for(let t=0;t<6;t++){let n=e.at.clone();n.y=this.world.groundHeight(n.x,n.z,60)+6+t*5,this.explosions.smokePuff(n,10,6,!0)}this.npcs.scare(e.at,90),this.cars.scare(e.at,90),e.at.distanceTo(this.player.pos)<26&&this.damagePlayer(28),this.addScore(800,!0),this.hud.toast(`AIRLINER DOWN`,`Wreckage burning in the streets`,3.5)}updateAlly(e){if(!this.ally.active)return;let t=null,n=190;if(this.monster&&!this.monster.dying){let e=this.monster.group.position.distanceTo(this.ally.group.position);e<n&&(n=e,t=this.monster.group.position.clone().setY(this.monster.group.position.y+14))}for(let e of this.drones.group.children){let r=e.position.distanceTo(this.ally.group.position);r<n&&(n=r,t=e.position.clone())}this.ally.update(e,this.time,{world:this.world,playerPos:this.player.pos,target:t,fire:(e,t)=>this.allyShot(e,t)})}updateTank(e){if(!this.tank.active)return;let t=null,n=230;if(this.monster&&!this.monster.dying){let e=this.monster.group.position.distanceTo(this.tank.group.position);e<n&&(n=e,t=this.monster.group.position.clone().setY(this.monster.group.position.y+14))}for(let e of this.drones.group.children){let r=e.position.distanceTo(this.tank.group.position);r<n&&(n=r,t=e.position.clone())}this.tank.update(e,this.time,{world:this.world,playerPos:this.player.pos,target:t,fire:(e,t)=>this.tankShell(e,t)})}updateSupportArrivals(){if(!this.supportArrivalArmed||this.hud.busy||this.hud.cardOpen)return;let e=this.supportArrivalChapter,t=[];if(e>=1&&!this.ally.active){let e=this.player.pos.clone();e.x-=14,e.z+=10,e.y=this.world.groundHeight(e.x,e.z,60),this.ally.deploy(e),t.push(`TSUBAKI`)}if(e>=2&&!this.tank.active){let e=this.player.pos.clone();e.x+=22,e.z+=18,e.y=this.world.groundHeight(e.x,e.z,60),this.tank.deploy(e),t.push(`KUROGANE`)}if(e>=3&&!this.digger.active){let e=this.shelters.weakest.pos.clone();e.x+=12,e.z+=10,e.y=this.world.groundHeight(e.x,e.z,60),this.digger.deploy(e),t.push(`DIGGER`)}this.supportArrivalArmed=!1,this.supportArrivalChapter=-1,t.length&&this.hud.toast(`SUPPORT DEPLOYED`,`${t.join(` · `)} now operating in Neo Tokyo`,4)}tankShell(e,t){let n=t.clone().sub(e).normalize(),r=(Math.random()-.5)*this.tank.spread*2,i=(Math.random()-.5)*this.tank.spread,a=Math.cos(r),o=Math.sin(r);n.set(n.x*a-n.z*o,n.y+i,n.x*o+n.z*a).normalize();let s=new z(new B(.7,.7,2),new ni({color:16769162}));s.position.copy(e),s.lookAt(e.clone().add(n)),this.scene.add(s),this.projectiles.push({pos:e.clone(),vel:n.multiplyScalar(54),life:4,kind:`shell`,mesh:s,dmg:36}),Y.explode(.45,1-Math.min(1,e.distanceTo(this.player.pos)/140)),Math.random()<.3&&this.sayKotetsu(`missed`)}sayKotetsu(e){if(!this.started||this.hud.busy||this.hud.cardOpen||this.barkT>0)return;let t=pm[e];if(!t||t.length===0)return;let n=this.kotetsuCursor.get(e)??0;this.kotetsuCursor.set(e,(n+1)%t.length),this.barkT=14,this.hud.say([t[n]])}sayJotetsu(e){if(!this.digger.active||!this.started||this.hud.busy||this.hud.cardOpen||this.barkT>0)return;let t=mm[e];if(!t||t.length===0)return;let n=this.jotetsuCursor.get(e)??0;this.jotetsuCursor.set(e,(n+1)%t.length),this.barkT=15,this.hud.say([t[n]])}allyShot(e,t){let n=t.clone().sub(e).normalize(),r=new z(new B(.4,.4,1.5),new ni({color:16761962}));r.position.copy(e),r.lookAt(t),this.scene.add(r),this.projectiles.push({pos:e.clone(),vel:n.multiplyScalar(78),life:2.4,kind:`ally`,mesh:r,dmg:7}),Y.laser()}updateRadar(){let e=Math.sin(this.camYaw),t=Math.cos(this.camYaw),n=(n,r)=>({dx:n*t-r*e,dz:n*e+r*t}),r=[];if(this.monster&&!this.monster.dying){let e=this.monster.group.position,t=n(e.x-this.player.pos.x,e.z-this.player.pos.z);r.push({...t,kind:`boss`})}for(let e of this.drones.group.children){let t=n(e.position.x-this.player.pos.x,e.position.z-this.player.pos.z);Math.hypot(t.dx,t.dz)<320*1.4&&r.push({...t,kind:`drone`})}for(let e of this.shelters.active){let t=n(e.pos.x-this.player.pos.x,e.pos.z-this.player.pos.z);r.push({...t,kind:e.underAttack?`shelterHit`:`shelter`})}for(let e of this.pickups){let t=n(e.mesh.position.x-this.player.pos.x,e.mesh.position.z-this.player.pos.z);Math.hypot(t.dx,t.dz)<320&&r.push({...t,kind:`pickup`})}if(this.hud.setRadar(r,this.camYaw,320),!this.monster||this.monster.dying){this.hud.setBossPointer(null);return}let i=this.monster.group.position;Em.set(i.x,i.y+this.monster.centerY,i.z);let a=Math.hypot(i.x-this.player.pos.x,i.z-this.player.pos.z),o=Em.clone().project(this.camera);if(o.z<1&&Math.abs(o.x)<.72&&Math.abs(o.y)<.72){this.hud.setBossPointer(null);return}let s=Math.atan2(i.x-this.player.pos.x,i.z-this.player.pos.z)-(this.camYaw+Math.PI);for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;this.hud.setBossPointer(s,a)}playDebrief(){let e=this.bossIndex-1,t=im[e];if(!t)return;this.saveProgress();let n=Math.max(0,this.score-this.chapterStartScore),r=Math.max(0,this.deaths-this.chapterStartDeaths),i=Math.max(0,this.blocksWrecked-this.chapterStartDamage),a=Math.round(this.player.hp/this.player.maxHp*100),o=r===0&&a>=75&&i<180?`S`:r===0&&a>=45&&i<350?`A`:r<=1?`B`:`C`;setTimeout(()=>{this.hud.cardOpen||this.hud.showCard(`CHAPTER ${t.no} COMPLETE`,`COMBAT RANK · ${o}`,`Score earned: <b>${n.toLocaleString()}</b><br/>Terra-Armor integrity: <b>${a}%</b><br/>City blocks damaged: <b>${i}</b><br/>Redeployments: <b>${r}</b>`)},1e3),this.hud.say(t.debrief),this.ally.active&&this.lateMemoryIdx<fm.length&&e%2==1?(this.hud.say(fm[this.lateMemoryIdx++]),this.idleChatterT=60):this.memoryIdx<dm.length&&(this.hud.say(dm[this.memoryIdx++]),this.idleChatterT=60),e===9&&(this.hud.setObjective(`The rift is sealed — hold the line`),setTimeout(()=>{this.hud.showCard(`EPILOGUE`,`NEO TOKYO STANDS`,`The bay is quiet for the first time in weeks.<br/>The rift is closed — but the seam it tore is still there,<br/>and the fractures are spreading.<br/><br/><b>Sealing it from this side has stopped working.</b>`).then(()=>this.hud.say(sm))},7e3)),e===im.length-1&&!this.campaignOver&&(this.campaignOver=!0,this.hud.setObjective(`The seam is gone — nothing left to hold`),setTimeout(()=>{this.hud.showCard(`EPILOGUE`,`THE SHELTERS ARE CLEAR`,`The seam is gone. Not sealed — gone.<br/>Rei closed it from the inside, three years late,<br/>and she asked about the shelters first.<br/><br/><b>Endless deployment begins now.</b>`).then(()=>this.hud.say(om))},9e3))}bark(e,t=!1){if(!this.started||this.hud.cardOpen||this.barkT>0&&!t||e===this.lastBark&&!t||this.hud.busy&&!t)return;let n=lm[e];if(!n||n.length===0)return;let r=this.barkCursor.get(e)??Math.floor(Math.random()*n.length),i=null;for(let e=0;e<n.length;e++){let t=n[(r+e)%n.length];if(this.hasJoined(t.who)){i=t,r=(r+e+1)%n.length;break}}i&&(this.barkCursor.set(e,r),this.barkT=t?9:16,this.lastBark=e,this.idleChatterT=34,this.hud.say([i]))}hasJoined(e){return e.includes(`HINATA`)?this.ally.active:e.includes(`KOTETSU`)?this.tank.active:!e.includes(`JOTETSU`)||this.digger.active}sayAbout(e){if(this.hud.busy||this.hud.cardOpen)return;let t=um[e];!t||t.length===0||(this.hud.say([t[Math.floor(Math.random()*t.length)]]),this.barkT=Math.max(this.barkT,8))}updateChatter(e){this.barkT-=e,this.idleChatterT-=e,this.supportCallT-=e;let t=this.player.hp/this.player.maxHp;t>0&&t<.28&&this.bark(`lowHealth`),this.combo>=5&&this.bark(`bigCombo`),this.ally.active&&(t>0&&t<.3?this.bark(`hinataWorried`):this.drones.count>0&&Math.random()<.02&&this.bark(`hinataBanter`)),this.drones.count>=6&&this.bark(`droneSwarm`),this.monster&&!this.monster.dying?(this.monster.hp/this.monster.maxHp<.2&&this.bark(`bossHurt`),this.monster.group.position.distanceTo(this.player.pos)>320&&this.bark(`bossFar`),this.monster.vulnerable&&this.supportCallT<=0&&!this.hud.busy&&(this.supportCallT=18,this.ally.active?this.hud.say([{who:`HINATA · PILOT`,text:`Core is open! I have your flank — go, senpai!`}]):this.tank.active&&this.hud.say([{who:`KOTETSU · SUPPORT`,text:`It stopped moving! Even I can hit that — probably!`}])),this.monster.name!==this.monsterBarkFor&&(this.monsterBarkFor=this.monster.name,this.monsterBarkT=12),this.monsterBarkT-=e,this.monsterBarkT<=0&&(this.monsterBarkT=20+Math.random()*14,this.sayAbout(this.monster.name))):this.monsterBarkFor=``,this.blocksWrecked>700&&this.blocksWrecked<=2600&&(this.digger.active?this.sayJotetsu(`damage`):this.bark(`cityDamage`)),this.blocksWrecked>2600&&(this.blocksWrecked=0,this.digger.active?this.sayJotetsu(`damage`):this.bark(`heavyDestruction`)),this.idleChatterT<=0&&!this.monster&&this.drones.count===0&&(this.idleChatterT=45,this.ally.active&&this.ayaHinataIdx<hm.length&&this.memoryIdx%2==1&&!this.hud.busy&&!this.hud.cardOpen?(this.hud.say(hm[this.ayaHinataIdx++]),this.barkT=20):this.memoryIdx<dm.length&&!this.hud.busy&&!this.hud.cardOpen?(this.hud.say(dm[this.memoryIdx++]),this.barkT=20):this.bark(`idle`))}warnShelters(){let e=this.shelters.anyUnderAttack;if(e){this.hud.setObjective(`DEFEND `+e.name+` — `+Math.round(e.hp)+`%`),this.bark(e.hp<40?`shelterCritical`:`shelterAttacked`,e.hp<40);return}let t=this.shelters.fullest,n=t.people/t.capacity;n>.6&&(this.hud.setObjective(t.name+` — `+Math.round(t.people)+`/`+Math.round(t.capacity)+` SHELTERED`),n>.8&&this.bark(`shelterFilling`,n>.92))}endRun(e,t){this.gameOver=!0,this.clearProgress(),this.slowmo=1.6,this.shake=1.6,Y.explode(1,1),this.hud.clearComms(),this.hud.say(t===`destroyed`?lm.shelterLost:lm.shelterOverfull);let n=`Score <b>${this.score.toLocaleString()}</b> · Wave <b>${this.wave}</b>`;this.hud.showGameOver(t===`destroyed`?`THE LINE BROKE`:`NO ROOM LEFT`,t===`destroyed`?e.name+` IS GONE`:e.name+` IS OVERWHELMED`,t===`destroyed`?`The shelter could not hold.<br/><br/>${n}<br/><br/>Neo Tokyo needed you somewhere else.`:`Too many people, too little city left standing.<br/>They had nowhere to put them.<br/><br/>${n}`).then(()=>this.restart())}retryLatestFinishedChapter(e){let t=this.latestFinishedChapter,n=Math.max(0,t),r={...this.player.abilities},i=new Set(this.unlockedWeapons),a=this.selectedWeapon,o=this.powerLevel,s=this.power,c=this.memoryIdx,l=this.lateMemoryIdx,u=this.ayaHinataIdx,d=new Map(this.kotetsuCursor);this.restart(),this.latestFinishedChapter=t,this.bossIndex=n,this.bossTimer=2,this.wave=n,this.player.abilities=r,this.player.model.setCrimsonEdge(r.blades),this.player.model.setAegisArmor(r.shield),this.unlockedWeapons=i,this.powerLevel=o,this.power=s,this.memoryIdx=c,this.lateMemoryIdx=l,this.ayaHinataIdx=u,this.kotetsuCursor=d,r.beam&&this.hud.unlock(`beam`,`<b>E (hold)</b> PLASMA BEAM`),r.thrust&&this.hud.unlock(`boots`,`<b>SPACE</b> OVERDRIVE THRUSTERS`),r.dash&&(this.hud.unlockDash(),this.touch?.unlockDash()),r.nova&&this.hud.unlock(`nova`,this.novaLabel()),r.quake&&this.hud.unlock(`nova`,this.novaLabel()),r.blades&&this.hud.unlock(`blades`,`CRIMSON EDGE`);for(let e of i)this.hud.unlockWeapon(e),this.touch?.unlockWeapon(e);o>1&&this.hud.setPowerLevel(o),this.selectWeapon(i.has(a)?a:`saber`),this.hud.setWave(this.wave),this.hud.setObjective(`RETRY CHAPTER ${n+1} — EVACUATE ${e.name}`),this.hud.toast(`SHELTER OVERFLOW`,`Returning to Chapter ${n+1}`,3.5)}jumpToChapter(e){let t=Math.max(0,Math.min(im.length-1,Math.floor(e)));this.hud.dismissStart(),this.started=!0,Y.ensure(),Y.startMusic(`explore`),this.restart(),this.unlockEverything(),this.bossIndex=t,this.latestFinishedChapter=t-1,this.wave=t,this.bossTimer=.2,this.droneBase=Math.min(14,4+Math.floor(t*.75)),this.drones.target=this.droneBase,this.deploySupportFromEarlierChapters(t),this.hud.setWave(t),this.hud.setObjective(`DEBUG · Preparing Chapter ${t+1}`),this.hud.toast(`DEBUG CHAPTER JUMP`,`Loading Chapter ${t+1} · ${im[t].title}`,2.5)}deploySupportFromEarlierChapters(e){let t=(e,t,n)=>{let r=this.player.pos.clone();r.x+=t,r.z+=n,r.y=this.world.groundHeight(r.x,r.z,60),e.deploy(r)};e>1&&t(this.ally,-14,10),e>2&&t(this.tank,22,18),e>3&&t(this.digger,30,-16)}setPaused(e){this.paused=e,this.hud.setPaused(e,{score:this.score,wave:this.wave,deaths:this.deaths}),e?(this.attackHeld=!1,this.charging=!1,this.keys.clear(),document.pointerLockElement&&document.exitPointerLock()):this.touch||this.renderer.domElement.requestPointerLock()}restart(){this.monster&&(this.scene.remove(this.monster.group),this.monster instanceof rd&&this.monster.removeSegmentsFrom(this.scene),this.monster=null),this.hud.hideBoss();for(let e of this.projectiles)this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();this.projectiles.length=0;for(let e of this.falling)this.scene.remove(e.mesh),e.mesh.geometry.dispose();this.falling.length=0;for(let e of this.pickups)this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();this.pickups.length=0,this.score=0,this.combo=1,this.comboTimer=0,this.wave=0,this.deaths=0,this.bossIndex=0,this.latestFinishedChapter=-1,this.bossTimer=14,this.powerLevel=1,this.power=1,this.droneBase=4,this.drones.target=this.droneBase,this.warnedContact=!1,this.lastSpawnFar=!1,this.frontLine=null,this.notedReiPattern=!1,this.revenantBeats.clear(),this.unlockedWeapons=new Set([`saber`,`rifle`]),this.player.abilities={beam:!1,boots:!0,thrust:!1,dash:!1,nova:!1,shield:!1,blades:!1,quake:!1},this.player.model.setCrimsonEdge(!1),this.player.model.setAegisArmor(!1),this.player.respawn(),this.ridingPlane=null,this.slowmo=0,this.hitStop=0,this.impactZoom=0,this.dashCameraT=0,this.dashT=0,this.dashFxT=0,this.player.model.setDashThrusters(!1),this.defenseWing.reset(),this.defenseWingAnnounced=!1,this.defenseLossCursor=0,this.evadeT=0,this.evadeRewarded=!1,this.counterWindow=0,this.crimsonCooldown=0,this.redeploying=!1,this.kick.set(0,0,0),this.camRoll=0,this.rollTarget=0,this.bossIntroT=0,this.shake=0,this.barkT=0,this.lastBark=``,this.barkCursor.clear(),this.blocksWrecked=0,this.monsterBarkFor=``,this.memoryIdx=0,this.lateMemoryIdx=0,this.ayaHinataIdx=0,this.kotetsuCursor.clear(),this.jotetsuCursor.clear(),this.diggerChatterT=32,this.ally.retire(),this.tank.retire(),this.digger.retire(),this.supportArrivalChapter=-1,this.supportArrivalArmed=!1,this.diggerWorkTarget=null,this.shelters.reset(),this.evacuees.reset(),this.gameOver=!1,this.hud.closeCard(),this.hud.clearComms(),this.campaignOver=!1,this.hud.resetUnlocks(),this.hud.setScore(0,1),this.hud.setWave(0),this.hud.setObjective(`Explore Neo Tokyo — something big is coming`),this.selectWeapon(`saber`),this.beginTutorial(),this.setPaused(!1),this.hud.toast(`REDEPLOYED`,`New run — the city is whole again`,3)}spawnPickup(e){let t=new z(new B(2.2,2.2,2.2),new ni({color:6091424,transparent:!0,opacity:.9}));t.position.copy(e),this.scene.add(t),this.pickups.push({mesh:t,spin:1+Math.random(),life:26})}updatePickups(e){for(let t=this.pickups.length-1;t>=0;t--){let n=this.pickups[t];n.life-=e,n.mesh.rotation.y+=n.spin*e,n.mesh.rotation.x+=n.spin*.4*e;let r=this.world.groundHeight(n.mesh.position.x,n.mesh.position.z,60)+2.5;n.mesh.position.y+=(r-n.mesh.position.y)*Math.min(1,e*2.2),n.mesh.position.y+=Math.sin(this.time*3+t)*.02,n.mesh.material.opacity=n.life<2?n.life/2*.9:.9;let i=n.mesh.position.distanceTo(this.player.pos)<9;i&&(this.player.heal(18),this.hud.toast(`+18 REPAIR`,`Salvage recovered`,1.2),this.bark(`repaired`),Y.jingle(),this.addScore(40,!1)),(i||n.life<=0)&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.pickups.splice(t,1))}}weakPointBonus(e){let t=this.monster;return t?(t.corePos(Em),Em.distanceTo(e)<8?2.1:1):1}announcePhase(e){let t=this.monster;if(!t||(t.phaseAnnounce=0,e===1))return;if(this.slowmo=e===3?.55:.35,this.shake=e===3?1.25:.85,this.hitStop=Math.max(this.hitStop,.06),t instanceof hd){Y.phaseStinger(e===3),this.revenantBeat(e),this.hud.toast(e===3?`IT HAS WORKED IT OUT`:`IT IS REMEMBERING`,e===3?`TA-00 has stopped defending itself entirely.`:`TA-00 is comparing what it sees against what it remembers.`,3.5);return}Y.explode(.8,1),Y.phaseStinger(e===3);let n=t.group.position.clone().setY(t.group.position.y+14);this.explosions.boom(n,e===3?13:9);let r=this.player.pos.clone().sub(t.group.position).setY(0),i=r.length();i>.001&&i<70&&(this.player.knockback(r,30+(1-i/70)*34,9),this.addKick(r,4)),this.hud.toast(e===3?`⚠ ENRAGED ⚠`:`IT IS CHANGING`,e===3?`${t.name} has nothing left to lose — it is faster and it is not stopping.`:`${t.name} is taking this seriously now.`,3),this.bark(e===3?`bossEnrage`:`bossPhase`,e===3)}revenantBeat(e){let t=e===3?`phase3`:`phase2`;this.revenantBeats.has(t)||(this.revenantBeats.add(t),this.hud.clearComms(),this.hud.say(am[t]))}warnNextContact(){if(this.campaignOver||this.monster||this.gameOver)return;let e=Math.max(0,this.bossTimer),t=e>7?.55:e>3?.85:1.15;this.drones.target=Math.max(2,Math.round(this.droneBase*t)),!(e>10)&&(this.shelters.anyUnderAttack||(this.hud.setObjective(e>3?`NEXT CONTACT IN ${Math.ceil(e)}s — hold the line`:`CONTACT IMMINENT — brace`),e<=5&&!this.warnedContact&&(this.warnedContact=!0,this.bark(`incoming`,!0))))}updateRevenant(e){let t=e.adaptionTo(this.selectedWeapon);if(e.adaptedTo){let t=ym.find(t=>t.id===e.adaptedTo);this.hud.toast(`IT HAS LEARNED THAT`,`${t?.label??e.adaptedTo.toUpperCase()} is barely scratching it now — switch.`,3.5),this.bark(`revenantAdapt`,!0),e.adaptedTo=null}if(!this.shelters.anyUnderAttack&&t>.3){let e=Math.round(t*100);this.hud.setObjective(t>.85?`IT HAS READ YOUR ${ym.find(e=>e.id===this.selectedWeapon)?.label??`WEAPON`} — SWITCH`:`ADAPTING TO YOUR LOADOUT — ${e}%`)}e.reiPattern&&!this.notedReiPattern&&(this.notedReiPattern=!0,this.bark(`reiPattern`,!0))}advanceLine(e){let t=new I(Kl.x*e.frac,0,Kl.z*e.frac);t.y=this.world.groundHeight(t.x,t.z,90),this.frontLine=t;let n=Math.max(0,e.frac-.11),r=new I(Kl.x*n,0,Kl.z*n);return r.y=this.world.groundHeight(r.x,r.z,90),this.shelters.consolidate(r,e.name),this.hud.toast(`THE LINE HAS MOVED`,`${e.name} — the shelter is behind you`,4),t}corruptMonster(e,t){e.maxHp=e.hp=Math.round(e.maxHp*(1.35+t*.6)),e.phase=2,e.group.traverse(e=>{let n=e;n.isMesh&&n.material.color.lerp(Am,.3+t*.34)})}tuneCampaignBoss(e,t){let n=e instanceof hd?1.68:t>=10?1.18+(t-10)*.025:1.14+t*.035;e.maxHp=e.hp=Math.round(e.maxHp*n*this.diff.bossHp),e instanceof hd&&(e.resistFloor=this.settings.difficulty===`story`?.55:0)}beginTutorial(){this.tutorial=new vm,this.drones.target=0,this.tutWrecked=0,this.clearTutorialMarker()}clearTutorialMarker(){this.tutMarker&&(this.scene.remove(this.tutMarker),this.tutMarker.geometry.dispose(),this.tutMarker.material.dispose(),this.tutMarker=null)}markCondemnedBuilding(){let e=null;for(let t=0;t<40;t++){let n=t/40*Math.PI*2;for(let t of[26,40,56]){let r=Math.round(this.player.pos.x+Math.sin(n)*t),i=Math.round(this.player.pos.z+Math.cos(n)*t),a=this.world.groundHeight(r,i);a>=8&&(!e||a>e.h)&&(e={x:r,z:i,h:a})}}if(!e)return;let t=new z(new B(9,46,9),new ni({color:16761935,transparent:!0,opacity:.16,depthWrite:!1}));t.position.set(e.x+.5,e.h+22,e.z+.5),this.scene.add(t),this.tutMarker=t}updateTutorial(e){let t=this.tutorial;if(!t)return;let n=this.world.groundHeight(this.player.pos.x,this.player.pos.z),r=t.step?.id;t.update(e,{altitude:this.player.pos.y-n,wrecked:this.tutWrecked}),t.justCleared&&(this.hud.toast(t.justCleared[0],t.justCleared[1],3),Y.jingle()),t.pending&&!this.hud.cardOpen&&this.hud.say(t.pending);let i=t.step;if(i&&i.id!==r&&(this.hud.setObjective(i.objective),this.clearTutorialMarker(),i.id===`strike`&&this.markCondemnedBuilding()),this.tutMarker){let e=this.tutMarker.material;e.opacity=.11+Math.sin(this.time*2.4)*.06}t.complete&&(this.clearTutorialMarker(),this.tutorial=null,this.hud.setObjective(`Hold the line — first contact inbound`),this.drones.target=this.droneBase,this.bossTimer=Math.max(this.bossTimer,8))}plowBoss(e){if(e.dying||e.dead)return;let t=e.group.position,n=this.bossPlowFrom;if(n.x===0&&n.z===0&&n.y===0){n.copy(t);return}if(Math.hypot(t.x-n.x,t.z-n.z)<3)return;n.copy(t);let r=Math.max(4,e.hitRadius*.5);this.plowPoint.set(t.x,t.y+e.centerY*.45,t.z),this.destroyAt(this.plowPoint,r,.18,!1),this.plowPoint.set(t.x,t.y+e.centerY*.12,t.z),this.destroyAt(this.plowPoint,r*.8,0,!1)}updateBosses(e){if(this.monster){let t={world:this.world,playerPos:this.player.pos,destroyAt:(e,t,n)=>this.destroyAt(e,t,n),damagePlayer:e=>this.damagePlayer(e),fireRocket:(e,t)=>this.fireRocket(e,t),throwBoulder:(e,t)=>this.throwBoulder(e,t),zapAt:e=>this.zapAt(e),igniteAt:(e,t)=>{this.fire.igniteSphere(this.world,e.x,e.y,e.z,t)},floodAt:(e,t)=>{let n=this.flood.floodSphere(this.world,e.x,e.z,t);n.size&&this.chunks.markDirty(n)}};if(this.monster.update(e*this.diff.tempo,this.time,t),this.plowBoss(this.monster),this.hud.setBossHP(this.monster.hp/this.monster.maxHp,this.monster.phase,this.monster.vulnerable),this.monster.phaseAnnounce&&this.announcePhase(this.monster.phaseAnnounce),this.monster instanceof hd&&this.updateRevenant(this.monster),this.monster.dying&&this.monster.hp<=0&&!this.monster.dead&&this.monster._rewarded!==!0){this.monster._rewarded=!0,this.hud.hideBoss(),this.addScore(1e3+this.wave*250,!0),this.slowmo=1.1,this.shake=1.4,this.explosions.boom(this.monster.group.position.clone().setY(this.monster.group.position.y+14),16),this.grantReward(this.monster.reward),Y.victoryStinger(),this.ally.active&&!this.hud.busy?this.hud.say([{who:`HINATA · PILOT`,text:`Confirmed down! That was incredible, senpai!`}]):this.tank.active&&!this.hud.busy&&this.hud.say([{who:`KOTETSU · SUPPORT`,text:`See? Perfect support fire. I definitely meant all of that.`}]);let e=this.bossIndex-1;im[e]&&(this.latestFinishedChapter=Math.max(this.latestFinishedChapter,e)),this.playDebrief()}this.monster.dead&&(this.scene.remove(this.monster.group),this.monster instanceof rd&&this.monster.removeSegmentsFrom(this.scene),this.monster=null,this.bossTimer=13,Y.setMusicMode(`explore`),this.campaignOver||this.hud.setObjective(`Clear the drones — next contact inbound`));return}if(this.tutorial){this.bossTimer=Math.max(this.bossTimer,6);return}if(this.bossTimer-=e,this.warnNextContact(),this.bossTimer>0||this.hud.busy||this.hud.cardOpen)return;let t=Math.random()*Math.PI*2,n=this.player.abilities.thrust&&!this.lastSpawnFar,r=Math.random(),i=n&&r>=.78,a=i?320+Math.random()*180:r<.42?90+Math.random()*40:170+Math.random()*110;this.lastSpawnFar=i;let o=this.player.pos.x+Math.sin(t)*a,s=this.player.pos.z+Math.cos(t)*a,c=[{make:(e,t)=>new td(e,t),toast:[`⚠ KAIJU SIGNAL ⚠`,`GORGOSAUR is tearing through the city. Defeat it to learn the BEAM.`]},{make:(e,t)=>new nd(e,t),toast:[`⚠ AIRBORNE THREAT ⚠`,`MISSILE MAW inbound. Defeat it for OVERDRIVE THRUSTERS.`]},{make:(e,t)=>new rd(e,t),toast:[`⚠ SEISMIC WEAVE ⚠`,`VOLT SERPENT surfacing. Defeat it to learn the NOVA PULSE.`]},{make:(e,t)=>new id(e,t),toast:[`⚠ HEAVY FOOTFALLS ⚠`,`IRON COLOSSUS approaching. Defeat it to earn the AEGIS SHIELD.`]},{make:(e,t)=>new ad(e,t),toast:[`⚠ SHADOW OVERHEAD ⚠`,`SKY REAVER circling above. Defeat it to salvage its RAILGUN.`]},{make:(e,t)=>new od(e,t),toast:[`⚠ RAPID MOVEMENT ⚠`,`CRIMSON MANTIS closing fast. Defeat it to forge the CRIMSON EDGE.`]},{make:(e,t)=>new sd(e,t),toast:[`⚠ MOLTEN MASS ⚠`,`MAGMA GOLEM erupting. Defeat it to overcharge the NOVA PULSE.`]},{make:(e,t)=>new cd(e,t),toast:[`⚠ TREMORS ⚠`,`DEEP MAW burrowing below. Defeat it to mount HEAD VULCANS.`]},{make:(e,t)=>new ld(e,t),toast:[`⚠ FIRESTORM ⚠`,`CINDER WYRM torching the district. Defeat it to claim its FLAMETHROWER.`]},{make:(e,t)=>new ud(e,t),toast:[`⚠ FLOOD WARNING ⚠`,`TIDE LEVIATHAN surfacing. Defeat it to claim its AQUA BLASTER.`]},{make:(e,t)=>new id(e,t),toast:[`⚠ SEAM-TOUCHED ⚠`,`A COLOSSUS is holding the causeway. It has been in there a long time.`]},{make:(e,t)=>new cd(e,t),toast:[`⚠ THE GROUND IS MOVING ⚠`,`Something is running under the shallows.`]},{make:(e,t)=>new od(e,t),toast:[`⚠ FAST MOVER ⚠`,`Contact on the dead ground — closing quickly.`]},{make:(e,t)=>new ad(e,t),toast:[`⚠ OVERHEAD ⚠`,`It has been circling the approach since before you arrived.`]},{make:(e,t)=>new sd(e,t),toast:[`⚠ THE MOUTH ⚠`,`The seam is defending itself. Break through.`]},{make:(e,t)=>new hd(e,t),toast:[`⚠ TA-00 · REVENANT ⚠`,`It has your moveset and it learns. Do not lean on one weapon.`]}];if(this.wave++,this.hud.setWave(this.wave),this.warnedContact=!1,this.droneBase=Math.min(14,4+Math.floor(this.wave*.75)),this.drones.target=this.droneBase,this.bossIndex<c.length){let e=this.bossIndex,t=c[this.bossIndex++],n=im[e]?.advance,r=o,i=s;if(n){let e=this.advanceLine(n),t=Math.random()*Math.PI*2,a=70+Math.random()*90;r=e.x+Math.sin(t)*a,i=e.z+Math.cos(t)*a}this.monster=t.make(r,i),this.bossPlowFrom.set(0,0,0),this.tuneCampaignBoss(this.monster,e),this.chapterStartScore=this.score,this.chapterStartDeaths=this.deaths,this.chapterStartDamage=this.blocksWrecked,e>=10&&!(this.monster instanceof hd)&&(this.monster.reward=`none`),n&&!(this.monster instanceof hd)&&this.corruptMonster(this.monster,n.frac),(e>=1&&!this.ally.active||e>=2&&!this.tank.active||e>=3&&!this.digger.active)&&(this.supportArrivalChapter=e,this.supportArrivalArmed=!1);let a=im[e];this.hud.showCard(`CHAPTER ${a.no}`,a.title,a.cold).then(()=>{this.beginBossIntro(this.monster?.name??t.toast[0],t.toast[1]),this.hud.say(a.brief),this.supportArrivalChapter===e&&(this.supportArrivalArmed=!0)})}else{let e=[td,nd,rd,id,ad,od,sd,cd,ld,ud],t=e[Math.floor(Math.random()*e.length)],n=new t(o,s);n.maxHp=n.hp=Math.round(n.maxHp*(1.45+this.powerLevel*.22+(this.wave-c.length)*.17)),n.reward=`repair`,this.monster=n,this.bossPlowFrom.set(0,0,0),this.hud.toast(`⚠ WAVE `+this.wave+` ⚠`,n.name+` detected.`,3),this.beginBossIntro(n.name,`Escalating hostile signature · endless deployment`),this.hud.say([cm[this.wave%cm.length]])}this.monster instanceof rd&&this.monster.addSegmentsTo(this.scene),this.scene.add(this.monster.group),this.hud.showBoss(this.monster.name),this.hud.setObjective(`Destroy `+this.monster.name),this.taughtWeakPoint||(this.taughtWeakPoint=!0,setTimeout(()=>{this.monster&&!this.monster.dying&&this.hud.toast(`WEAK POINT: DORSAL CORE`,`Strike high on its back for 2.1x damage`,4)},5200)),Y.setMusicMode(this.monster instanceof hd?`revenant`:`boss`),Y.bossStinger(this.monster instanceof hd)}beginBossIntro(e,t){this.bossIntroT=this.bossIntroDuration,this.hud.showBossIntro(e,t),this.shake=Math.max(this.shake,.3),Y.roar()}unlockEverything(){let e=this.player.abilities;e.beam=e.boots=e.thrust=e.dash=e.nova=e.shield=e.blades=e.quake=!0,this.player.model.setCrimsonEdge(!0),this.player.model.setAegisArmor(!0),this.hud.unlockDash(),this.touch?.unlockDash(),this.hud.unlock(`beam`,`<b>E (hold)</b> PLASMA BEAM`),this.hud.unlock(`boots`,`<b>SPACE</b> OVERDRIVE THRUSTERS`),this.hud.unlock(`nova`,`<b>Q</b> NOVA PULSE`),this.hud.unlock(`nova`,this.novaLabel()),this.hud.unlock(`blades`,`CRIMSON EDGE`),this.touch?.unlock(`beam`),this.touch?.unlock(`nova`);for(let e of ym)this.unlockedWeapons.add(e.id),this.hud.unlockWeapon(e.id);this.selectWeapon(`saber`)}grantWeapon(e,t,n){this.unlockedWeapons.add(e),this.hud.unlockWeapon(e),this.touch?.unlockWeapon(e),this.selectWeapon(e),this.hud.toast(t,n,5)}grantReward(e){if(e===`none`){this.player.heal(28),this.hud.toast(`SALVAGE RECOVERED`,`Integrity restored · no duplicate upgrade`,3.5);return}switch(Y.jingle(),e){case`beam`:this.player.abilities.beam=!0,this.touch?.unlock(`beam`),this.hud.unlock(`beam`,`<b>E (hold)</b> PLASMA BEAM`),this.hud.toast(`BEAM UNLOCKED`,`Hold E to fire the plasma beam`,5);break;case`thrust`:this.player.abilities.thrust=!0,this.player.abilities.dash=!0,this.hud.unlock(`boots`,`<b>SPACE</b> OVERDRIVE THRUSTERS`),this.hud.unlockDash(),this.touch?.unlockDash(),this.hud.toast(`OVERDRIVE DASH ONLINE`,`Press C or DASH for a blue-thruster evasive burst`,5);break;case`nova`:this.player.abilities.nova=!0,this.touch?.unlock(`nova`),this.hud.unlock(`nova`,this.novaLabel()),this.hud.toast(`NOVA PULSE UNLOCKED`,`Press Q for a devastating shockwave`,5);break;case`shield`:this.player.abilities.shield=!0,this.player.model.setAegisArmor(!0),this.hud.toast(`AEGIS ARMOR ONLINE`,`Reinforced plating deployed · incoming damage reduced by 35%`,5);break;case`blades`:this.player.abilities.blades=!0,this.player.model.setCrimsonEdge(!0),this.hud.unlock(`blades`,`CRIMSON EDGE`),this.selectWeapon(`saber`),this.hud.toast(`CRIMSON EDGE FORGED`,`Red laser saber · 60% stronger strikes`,5);break;case`quake`:this.player.abilities.quake=!0,this.player.abilities.nova||(this.player.abilities.nova=!0,this.touch?.unlock(`nova`)),this.hud.unlock(`nova`,this.novaLabel()),this.hud.toast(`NOVA PULSE OVERCHARGED`,`The pulse now ruptures the ground it lands on`,5);break;case`railgun`:this.grantWeapon(`railgun`,`RAILGUN ACQUIRED`,`Weapon 4 · a piercing lance that bores through city blocks`);break;case`vulcan`:this.grantWeapon(`vulcan`,`HEAD VULCANS ONLINE`,`Weapon 5 · hold ATTACK for rapid-fire chatter`);break;case`flamer`:this.grantWeapon(`flamer`,`FLAMETHROWER SALVAGED`,`Weapon 6 · hold ATTACK to set the city ablaze`);break;case`aqua`:this.grantWeapon(`aqua`,`AQUA BLASTER SALVAGED`,`Weapon 7 · hold ATTACK to flood streets and douse fires`);break;default:this.player.heal(100),this.powerLevel++,this.power=1+(this.powerLevel-1)*.25,this.hud.setPowerLevel(this.powerLevel),this.hud.toast(`POWER LEVEL `+this.powerLevel,`Weapons upgraded · full repairs delivered`,4)}}get diff(){return bm[this.settings.difficulty]}damagePlayer(e){if(this.redeploying)return;if(this.evadeT>0){this.evadeRewarded||(this.evadeRewarded=!0,this.slowmo=Math.max(this.slowmo,.5),this.impactZoom=Math.max(this.impactZoom,.75),this.shake=Math.max(this.shake,.32),this.monster?.rewardEvade(1.2),this.counterWindow=1.5,this.addScore(180,!0),this.hud.perfectEvade(),Y.impact(.65,!0));return}let t=1+Math.min(.42,Math.max(0,this.bossIndex-1)*.028);if(e*=t*this.diff.incoming,this.player.abilities.shield){e*=.65,this.player.model.pulseAegis();let t=this.player.pos.clone();t.y+=5,this.explosions.boom(t,3),this.hud.shieldFlash(),Y.impact(.45,!0),this.rumble(120,.3,.6)}this.player.damage(e),this.player.model.flinchT=.22,this.hud.damageFlash();let n=this.monster&&!this.monster.dying?this.monster.group.position:null;if(n&&this.addKick(this.player.pos.clone().sub(n),Math.min(3.4,.9+e*.09)),this.shake=Math.max(this.shake,Math.min(.9,.25+e*.022)),this.hitStop=Math.max(this.hitStop,Math.min(.05,e*.0022)),Y.thud(),this.player.hp<=0&&!this.redeploying){this.deaths++;let e=Math.round(this.score*.25);this.score=Math.max(0,this.score-e),this.combo=1,this.comboTimer=0,this.hud.setScore(this.score,this.combo),this.redeploying=!0,this.started=!1,this.slowmo=.8,this.shake=1.2,this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y+5),12),this.hud.say([{who:`AYA · COMMAND`,text:`Terra-Armor signal lost! Recovery team, lock onto Kuroki’s beacon. Emergency frame inbound.`}]),setTimeout(()=>{this.hud.showCard(`TERRA-ARMOR DESTROYED`,`EMERGENCY REDEPLOYMENT`,`Combat score lost: <b>${e.toLocaleString()}</b><br/>Combo chain terminated.<br/><br/>Command has restored the latest frame backup at 50% integrity.`).then(()=>{this.player.respawn(),this.player.hp=Math.round(this.player.maxHp*.5),this.player.invulnT=3.5,this.redeploying=!1,this.started=!0,this.hud.toast(`REDEPLOYED`,`Emergency invulnerability active`,2.5),this.touch||this.renderer.domElement.requestPointerLock()})},700)}}frame(){let e=this.hud.perfOn?performance.now():0,t=Math.min(.05,this.clock.getDelta());if(this.paused||this.hud.cardOpen){this.renderer.render(this.scene,this.camera);return}this.slowmo>0&&(this.slowmo-=t),this.hitStop>0&&(this.hitStop=Math.max(0,this.hitStop-t)),this.bossIntroT>0&&(this.bossIntroT=Math.max(0,this.bossIntroT-t)),this.impactZoom=Math.max(0,this.impactZoom-t*4.2),this.monsterSmokeT=Math.max(0,this.monsterSmokeT-t),this.dashCameraT=Math.max(0,this.dashCameraT-t),this.player.invulnT=Math.max(0,this.player.invulnT-t);let n=this.hitStop>0?0:this.bossIntroT>0?t*.16:this.slowmo>0?t*.35:t;this.time+=n,this.laserCooldown-=n,this.novaCooldown-=n,this.railCooldown-=n,this.vulcanCooldown-=n,this.crimsonCooldown-=n,this.dashT=Math.max(0,this.dashT-t),this.dashFxT=Math.max(0,this.dashFxT-t),this.player.model.setDashThrusters(this.dashFxT>0),this.evadeT=Math.max(0,this.evadeT-t),this.counterWindow=Math.max(0,this.counterWindow-t),this.comboWindow-=n,this.charging&&(this.chargeT+=n),this.lockOn&&(!this.monster||this.monster.dying)&&(this.lockOn=!1,this.hud.setLockOn(!1)),this.shake=Math.max(0,this.shake-t*2.2),this.kick.multiplyScalar(Math.max(0,1-t*7));let r=Math.hypot(this.player.vel.x,this.player.vel.z);if(r>1){let e=Math.atan2(this.player.vel.x,this.player.vel.z)-this.camYaw;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;let n=!this.player.grounded&&!this.player.onPlatform?.09:.05;this.rollTarget+=(Math.sin(e)*Math.min(1,r/34)*n-this.rollTarget)*Math.min(1,t*3)}else this.rollTarget*=Math.max(0,1-t*4);this.camRoll+=(this.rollTarget-this.camRoll)*Math.min(1,t*8),this.comboTimer>0&&(this.comboTimer-=t,this.comboTimer<=0&&this.combo>1&&(this.combo=1,this.hud.setScore(this.score,this.combo)));let i=!1,a=this.player.grounded||this.player.onPlatform,o=this.player.vel.y;if(this.started){let e=this.keys.has(`KeyD`)||this.keys.has(`ArrowRight`),t=this.keys.has(`ArrowLeft`),r=this.keys.has(`KeyS`)||this.keys.has(`ArrowDown`),a=this.keys.has(`KeyW`)||this.keys.has(`ArrowUp`),o=!!e-+!!t,s=!!a-+!!r;i=this.keys.has(`Space`);let c=this.keys.has(`ShiftLeft`)||this.keys.has(`ShiftRight`),l=this.keys.has(`KeyX`);this.touch&&(o+=this.touch.moveX,s+=this.touch.moveZ,i=i||this.touch.jump,c=c||this.touch.boost),this.ridingPlane&&(this.player.pos.x+=this.ridingPlane.dx,this.player.pos.z+=this.ridingPlane.dz),this.player.update(n,o,s,this.camYaw,i,c,l)}else this.player.update(n,0,0,this.camYaw,!1,!1,!1);let s=this.player.grounded||this.player.onPlatform;if(Y.setLowHealth(this.player.hp>0&&this.player.hp/this.player.maxHp<=.25),!a&&s&&o<-7){let e=Math.min(1,Math.abs(o)/28);this.shake=Math.max(this.shake,.28+e*.55),this.impactZoom=Math.max(this.impactZoom,.35+e*.35),this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y+.6),2.5+e*2),Y.thud()}let c=Math.hypot(this.player.vel.x,this.player.vel.z);if(this.footstepT-=n,this.servoT-=n,s&&c>2&&this.footstepT<=0){let e=c>24?.27:c>11?.38:.52;this.footstepT=e,Y.footstep(Math.min(1,.45+c/30)),this.servoT<=0&&(this.servoT=e*2,Y.servo(.7)),this.shake=Math.max(this.shake,.035+Math.min(.06,c*.002))}let l=this.planes.update(n,this.player.pos,(e,t)=>this.world.groundHeight(e,t,60));this.trailCrashingPlanes(n);for(let e of l)this.planeCrash(e);this.updatePlaneRiding(i);let u=this.defenseWing.update(n,this.time,this.player.pos,this.monster&&!this.monster.dying?this.monster:null);u.respawned>0&&!this.defenseWingAnnounced&&(this.defenseWingAnnounced=!0,this.hud.toast(`N.T.D.F. DEFENSE WING`,`Allied interceptors commencing attack runs`,4),this.hud.say([{who:`DEFENSE LEAD`,text:`Terra-Armor, Defense Wing is on station. We will keep its attention off the shelters.`}]));for(let e of u.hits){let t=this.monster;if(!t||t.dying)break;t.takeDamage(e.damage*Om,`defense-wing`),this.debris.burst(e.at,[15],2)}for(let e of u.crashes){this.explosions.boom(e,7),this.debris.burst(e,[6,12,15],14),this.shake=Math.max(this.shake,e.distanceTo(this.player.pos)<80?.3:.12),Y.explode(.45,1-Math.min(1,e.distanceTo(this.player.pos)/140));let t=[`Interceptor lost! Their airframes cannot survive a direct hit — keep that monster occupied.`,`Defense aircraft down. Search and rescue is moving, but replacement launch will take time.`,`We just lost another pilot. Kuroki, break the monster’s attack pattern before the next run.`,`One hit was all it took. Defense Wing, widen your spacing and stay out of its reach.`],n=t[this.defenseLossCursor++%t.length];this.hud.say([{who:`AYA · COMMAND`,text:n}])}this.chunks.update(this.player.pos.x,this.player.pos.z),this.traffic.update(n,this.time,this.player.pos,(e,t)=>this.world.groundHeight(e,t,40),(e,t)=>{for(let n=1;n<=5;n++)if(this.world.getBlock(e,n,t)===H.Pole)return!0;return!1});let d=[];if(this.monster&&!this.monster.dying&&d.push(this.monster.group.position),this.npcs.update(n,this.player.pos,d,this.time),this.cars.update(n,this.player.pos),this.updateTutorial(n),this.updateBosses(n),this.monster&&!this.monster.dying&&this.monster.threatening){this.bossTelegraph.visible=!0;let e=this.world.groundHeight(this.player.pos.x,this.player.pos.z,60);this.bossTelegraph.position.set(this.player.pos.x,e+.18,this.player.pos.z);let t=1+Math.sin(this.time*18)*.12;this.bossTelegraph.scale.setScalar(t),this.bossTelegraph.material.opacity=.42+Math.sin(this.time*18)*.18}else this.bossTelegraph.visible=!1;let f=this.drones.group.children.map(e=>e.position),p=this.monster&&!this.monster.dying?this.monster.group.position:null,m=this.shelters.update(n,this.time,p,f);this.shelters.mend(n),p||this.shelters.release(n),this.tank.active&&(this.shelters.expand(n),this.mechanicT-=n,this.mechanicT<=0&&(this.mechanicT=55,this.sayKotetsu(`mechanic`))),this.digger.active?(this.diggerWorkTarget=this.shelters.reconstruct(n).pos,this.diggerChatterT-=n,this.diggerChatterT<=0&&(this.diggerChatterT=48+Math.random()*24,this.sayJotetsu(Math.random()<.55?`repair`:`kotetsu`))):this.diggerWorkTarget=null;let h=this.evacuees.update(n,this.time,this.world),g=this.shelters.admit(h);m&&!this.gameOver?this.endRun(m,`destroyed`):g&&!this.gameOver&&this.retryLatestFinishedChapter(g),this.warnShelters(),this.updateAlly(n),this.updateTank(n),this.digger.update(n,this.time,{world:this.world,playerPos:this.player.pos,workTarget:this.diggerWorkTarget}),this.drones.update(n,this.time,{world:this.world,playerPos:this.player.pos,damagePlayer:e=>this.damagePlayer(e),destroyAt:(e,t,n)=>this.destroyAt(e,t,n)}),this.updateBeam(n),this.updateStreams(n),this.updateProjectiles(n),this.updateFalling(n),this.drainCollapseQueue(),this.updatePickups(n),this.debris.update(n),this.explosions.update(n),this.updateFire(n);let _=this.flood.update(n,this.world);_&&this.chunks.markDirty(_.dirty);let v=this.repair.update(n,this.time,this.player.pos.x,this.player.pos.z,this.digger.active?2.25:1);if(v){this.chunks.markDirty(v.dirty);for(let e of v.startedSites)this.npcs.spawnWorkers(e.x,e.z);for(let e=0;e<Math.min(3,v.restored.length);e++){let e=v.restored[Math.floor(Math.random()*v.restored.length)];this.debris.burst(new I(e.x+.5,e.y+1,e.z+.5),[18],2)}}this.corruption=Jl(this.player.pos.x,this.player.pos.z);let y=this.sky.update(n,this.time,this.player.pos,this.camera,this.corruption);this.scene.background.copy(y.skyColor),this.scene.fog.color.copy(y.fogColor),this.sun.intensity=y.sunIntensity,this.sun.position.copy(y.sunDir),this.hemi.intensity=y.hemiIntensity,this.chunks.nightAmount.value=Math.max(0,Math.min(1,1-y.sunIntensity/.75)),this.updateChatter(n),this.updateRadar(),this.hud.setHP(this.player.hp/this.player.maxHp),this.hud.update(n),this.updateSupportArrivals(),this.updateCamera(),this.updateTargetLock(),this.renderer.render(this.scene,this.camera),e&&this.samplePerf(performance.now()-e,t)}samplePerf(e,t){if(this.perfFrames++,this.perfSum+=e,this.perfWorst=Math.max(this.perfWorst,e),this.perfWindow+=t,this.perfWindow<1)return;let n=this.perfSum/Math.max(1,this.perfFrames),r=this.renderer.info,i=e=>e>16.6?`<b>${e.toFixed(1)}</b>`:e.toFixed(1);this.hud.setPerf(`fps  ${Math.round(this.perfFrames/this.perfWindow)}
mean ${i(n)} ms
worst ${i(this.perfWorst)} ms
chunks ${this.chunks.lastBudgetMs.toFixed(1)} ms
draws ${r.render.calls}  tris ${(r.render.triangles/1e3).toFixed(0)}k`),this.perfFrames=0,this.perfSum=0,this.perfWorst=0,this.perfWindow=0}updateFire(e){let t=this.fire.update(e,this.world);if(!t)return;t.dirty.size&&(this.chunks.markDirty(t.dirty),this.repair.noteDamage(t.dirty,this.time));let n=null;for(let e of t.destroyed)Math.random()<.5&&this.debris.burst(new I(e[0]+.5,e[1]+.5,e[2]+.5),[12],3),(!n||e[1]<n[1])&&(n=e);n&&n[1]<10&&(Em.set(n[0]+.5,n[1]+.5,n[2]+.5),this.checkCollapse(Em,5))}updateProjectiles(e){let t=e=>e===`laser`||e===`charge`||e===`ally`||e===`shell`;for(let n=this.projectiles.length-1;n>=0;n--){let r=this.projectiles[n];r.life-=e,r.kind===`rocket`&&(r.vel.y-=2*e),r.kind===`boulder`&&(r.vel.y-=16*e,r.mesh.rotation.x+=e*3,r.mesh.rotation.z+=e*2),r.pos.addScaledVector(r.vel,e),r.mesh.position.copy(r.pos);let i=!1;if((this.world.solidAt(r.pos.x,r.pos.y,r.pos.z)||r.pos.y<.2)&&(i=!0),t(r.kind)){let e=r.kind===`shell`?12:r.kind===`charge`?4:2,t=r.kind===`ally`||r.kind===`shell`,n=r.kind===`ally`?`hinata-support`:r.kind===`shell`?`kotetsu-support`:void 0;this.hitMonster(r.pos,e,(r.dmg??7)*(r.kind===`laser`?this.power:1),.7,n,t?Om:Dm)&&(i=!0)}else r.pos.distanceTo(this.player.pos)<(r.kind===`boulder`?8:7)&&(i=!0,this.damagePlayer(r.kind===`boulder`?22:16));if(i){let e=r.kind===`shell`?10:r.kind===`charge`?4.5:r.kind===`laser`?2.4:r.kind===`boulder`?5:3.6;this.destroyAt(r.pos,e,.2)}(i||r.life<=0)&&(this.scene.remove(r.mesh),r.mesh.geometry.dispose(),r.mesh.material.dispose(),this.projectiles.splice(n,1))}}addKick(e,t){e.lengthSq()<1e-6||(this.kick.addScaledVector(e.clone().normalize(),t),this.kick.length()>4.5&&this.kick.setLength(4.5),this.rollTarget+=(Math.random()<.5?-1:1)*t*.012,this.rollTarget=F.clamp(this.rollTarget,-.09,.09))}rumble(e,t,n){let r=navigator.getGamepads?.();if(r)for(let i of r){let r=i?.vibrationActuator;if(r?.playEffect){r.playEffect(`dual-rumble`,{duration:e,weakMagnitude:F.clamp(t,0,1),strongMagnitude:F.clamp(n,0,1)}).catch(()=>void 0);break}}}updateCamera(){let e=this.player.pos.clone();e.y+=9.9;let t=Math.hypot(this.player.vel.x,this.player.vel.z),n=this.dashCameraT>0?Math.sin(this.dashCameraT/.3*Math.PI):0,r=0;if(this.bossIntroT>0&&this.monster&&!this.monster.dying){let t=1-this.bossIntroT/this.bossIntroDuration;r=Math.sin(t*Math.PI)*.92,Em.copy(this.monster.group.position),Em.y+=this.monster.centerY,e.lerp(Em,r)}let i=28+Math.min(5,t*.18)+n*4.5+r*12-Math.min(4.2,this.impactZoom*2.8),a=65+Math.min(6,t*.16)+n*3+r*5-Math.min(5,this.impactZoom*3.4);this.camera.fov+=(a-this.camera.fov)*.16,this.camera.updateProjectionMatrix();let o=new I(Math.sin(this.camYaw)*Math.cos(this.camPitch),Math.sin(this.camPitch),Math.cos(this.camYaw)*Math.cos(this.camPitch)),s=this.world.raycast(e.x,e.y,e.z,o.x,o.y,o.z,i),c=s?Math.max(3.5,s.dist-.8):i;if(this.camera.position.copy(e).addScaledVector(o,c),this.camera.position.add(this.kick),this.shake>.01){let e=this.shake*1.6*this.settings.shake*(this.settings.reducedMotion?.2:1);this.camera.position.x+=(Math.random()-.5)*e,this.camera.position.y+=(Math.random()-.5)*e,this.camera.position.z+=(Math.random()-.5)*e}this.camera.lookAt(e),Math.abs(this.camRoll)>5e-4&&this.camera.rotateZ(this.camRoll)}updateTargetLock(){let e=this.monster;if(!this.lockOn||!e||e.dying){this.hud.setTargetLock(!1);return}Em.copy(e.group.position),Em.y+=e.centerY;let t=Em.distanceTo(this.player.pos);if(Em.project(this.camera),!(Em.z>-1&&Em.z<1&&Math.abs(Em.x)<1.1&&Math.abs(Em.y)<1.1)){this.hud.setTargetLock(!1);return}let n=(Em.x*.5+.5)*window.innerWidth,r=(-Em.y*.5+.5)*window.innerHeight,i=e.vulnerable?`open`:e.threatening?`evade`:`track`;this.hud.setTargetLock(!0,n,r,t,i)}};G(jm,`SAVE_KEY`,`mecha-city.progress.v1`),new jm;