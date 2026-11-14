(()=>{var t0=Object.defineProperty;var e0=(r,t,e)=>t in r?t0(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var po=(r,t,e)=>e0(r,typeof t!="symbol"?t+"":t,e);var n0=0,wu=1,i0=2;var zd=1,Dh=2,li=3,Di=0,we=1,De=2,Zn=0,Pi=1,Ke=2,Su=3,Eu=4,s0=5,Qi=100,r0=101,o0=102,a0=103,l0=104,c0=200,h0=201,u0=202,d0=203,oc=204,ac=205,f0=206,p0=207,m0=208,g0=209,x0=210,v0=211,y0=212,_0=213,M0=214,lc=0,cc=1,hc=2,zs=3,uc=4,dc=5,fc=6,pc=7,Vd=0,b0=1,w0=2,Ii=0,Uh=1,Nh=2,kh=3,Kr=4,S0=5,Bh=6,Fh=7;var Gd=300,Vs=301,Gs=302,mc=303,gc=304,Ia=306,_n=1e3,ts=1001,xc=1002,yn=1003,E0=1004;var mo=1005;var qn=1006,wl=1007;var es=1008;var fi=1009,Wd=1010,Xd=1011,Br=1012,Oh=1013,ns=1014,$n=1015,bn=1016,Hh=1017,zh=1018,Ws=1020,Yd=35902,qd=1021,$d=1022,Hn=1023,Zd=1024,Kd=1025,Fs=1026,Xs=1027,Vh=1028,Gh=1029,Jd=1030,Wh=1031;var Xh=1033,$o=33776,Zo=33777,Ko=33778,Jo=33779,vc=35840,yc=35841,_c=35842,Mc=35843,bc=36196,wc=37492,Sc=37496,Ec=37808,Tc=37809,Ac=37810,Rc=37811,Cc=37812,Pc=37813,Ic=37814,Lc=37815,Dc=37816,Uc=37817,Nc=37818,kc=37819,Bc=37820,Fc=37821,Qo=36492,Oc=36494,Hc=36495,Qd=36283,zc=36284,Vc=36285,Gc=36286;var jo=2300,Wc=2301,Sl=2302,Tu=2400,Au=2401,Ru=2402;var T0=3200,A0=3201;var jd=0,R0=1,Ri="",Ce="srgb",tr="srgb-linear",La="linear",xe="srgb";var xs=7680;var Cu=519,C0=512,P0=513,I0=514,tf=515,L0=516,D0=517,U0=518,N0=519,Xc=35044,Cn=35048;var Pu="300 es",hi=2e3,ta=2001,Ui=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var El=Math.PI/180,ea=180/Math.PI;function ui(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[r&255]+nn[r>>8&255]+nn[r>>16&255]+nn[r>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function $e(r,t,e){return Math.max(t,Math.min(e,r))}function k0(r,t){return(r%t+t)%t}function Tl(r,t,e){return(1-e)*r+e*t}function Yn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _e(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var ut=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},te=class r{constructor(t,e,n,i,s,o,a,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],x=i[0],g=i[3],m=i[6],_=i[1],v=i[4],y=i[7],S=i[2],b=i[5],T=i[8];return s[0]=o*x+a*_+l*S,s[3]=o*g+a*v+l*b,s[6]=o*m+a*y+l*T,s[1]=c*x+h*_+u*S,s[4]=c*g+h*v+u*b,s[7]=c*m+h*y+u*T,s[2]=d*x+f*_+p*S,s[5]=d*g+f*v+p*b,s[8]=d*m+f*y+p*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(h*e-i*l)*x,t[5]=(i*s-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Al.makeScale(t,e)),this}rotate(t){return this.premultiply(Al.makeRotation(-t)),this}translate(t,e){return this.premultiply(Al.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Al=new te;function ef(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function na(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function B0(){let r=na("canvas");return r.style.display="block",r}var Iu={};function Lr(r){r in Iu||(Iu[r]=!0,console.warn(r))}function F0(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function O0(r){let t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function H0(r){let t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var he={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===xe&&(r.r=di(r.r),r.g=di(r.g),r.b=di(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===xe&&(r.r=Os(r.r),r.g=Os(r.g),r.b=Os(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ri?La:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function di(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Os(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Lu=[.64,.33,.3,.6,.15,.06],Du=[.2126,.7152,.0722],Uu=[.3127,.329],Nu=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ku=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[tr]:{primaries:Lu,whitePoint:Uu,transfer:La,toXYZ:Nu,fromXYZ:ku,luminanceCoefficients:Du,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:Lu,whitePoint:Uu,transfer:xe,toXYZ:Nu,fromXYZ:ku,luminanceCoefficients:Du,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}});var vs,Yc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{vs===void 0&&(vs=na("canvas")),vs.width=t.width,vs.height=t.height;let n=vs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=vs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=na("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=di(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(di(e[n]/255)*255):e[n]=di(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},z0=0,ia=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=ui(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Rl(i[o].image)):s.push(Rl(i[o]))}else s=Rl(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Rl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Yc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var V0=0,dn=class r extends Ui{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=ts,i=ts,s=qn,o=es,a=Hn,l=fi,c=r.DEFAULT_ANISOTROPY,h=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=ui(),this.name="",this.source=new ia(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _n:t.x=t.x-Math.floor(t.x);break;case ts:t.x=t.x<0?0:1;break;case xc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _n:t.y=t.y-Math.floor(t.y);break;case ts:t.y=t.y<0?0:1;break;case xc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Gd;dn.DEFAULT_ANISOTROPY=1;var Me=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,y=(f+1)/2,S=(m+1)/2,b=(h+d)/4,T=(u+x)/4,R=(p+g)/4;return v>y&&v>S?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=b/n,s=T/n):y>S?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=b/i,s=R/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=T/s,i=R/s),this.set(n,i,s,e),this}let _=Math.sqrt((g-p)*(g-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(u-x)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qc=class extends Ui{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new dn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ia(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ze=class extends qc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sa=class extends dn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var $c=class extends dn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ze=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],f=s[o+1],p=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=x;return}if(u!==x||l!==d||c!==f||h!==p){let g=1-a,m=l*d+c*f+h*p+u*x,_=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let S=Math.sqrt(v),b=Math.atan2(S,m*_);g=Math.sin(g*b)/S,a=Math.sin(a*b)/S}let y=a*_;if(l=l*g+d*y,c=c*g+f*y,h=h*g+p*y,u=u*g+x*y,g===1-a){let S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return t[e]=a*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-a*f,t[e+2]=c*p+h*f+a*d-l*u,t[e+3]=h*p-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Cl.copy(this).projectOnVector(t),this.sub(Cl)}reflect(t){return this.sub(Cl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Cl=new I,Bu=new Ze,pi=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(s,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Mr),xo.subVectors(this.max,Mr),ys.subVectors(t.a,Mr),_s.subVectors(t.b,Mr),Ms.subVectors(t.c,Mr),bi.subVectors(_s,ys),wi.subVectors(Ms,_s),Xi.subVectors(ys,Ms);let e=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Xi.z,Xi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Xi.z,0,-Xi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Xi.y,Xi.x,0];return!Pl(e,ys,_s,Ms,xo)||(e=[1,0,0,0,1,0,0,0,1],!Pl(e,ys,_s,Ms,xo))?!1:(vo.crossVectors(bi,wi),e=[vo.x,vo.y,vo.z],Pl(e,ys,_s,Ms,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ii),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ii=[new I,new I,new I,new I,new I,new I,new I,new I],Bn=new I,go=new pi,ys=new I,_s=new I,Ms=new I,bi=new I,wi=new I,Xi=new I,Mr=new I,xo=new I,vo=new I,Yi=new I;function Pl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Yi.fromArray(r,s);let a=i.x*Math.abs(Yi.x)+i.y*Math.abs(Yi.y)+i.z*Math.abs(Yi.z),l=t.dot(Yi),c=e.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var G0=new pi,br=new I,Il=new I,mi=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):G0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;br.subVectors(t,this.center);let e=br.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(br,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(br.copy(t.center).add(Il)),this.expandByPoint(br.copy(t.center).sub(Il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},si=new I,Ll=new I,yo=new I,Si=new I,Dl=new I,_o=new I,Ul=new I,Ys=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(si.copy(this.origin).addScaledVector(this.direction,e),si.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ll.copy(t).add(e).multiplyScalar(.5),yo.copy(e).sub(t).normalize(),Si.copy(this.origin).sub(Ll);let s=t.distanceTo(e)*.5,o=-this.direction.dot(yo),a=Si.dot(this.direction),l=-Si.dot(yo),c=Si.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=s*h,u>=0)if(d>=-p)if(d<=p){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ll).addScaledVector(yo,d),f}intersectSphere(t,e){si.subVectors(t.center,this.origin);let n=si.dot(this.direction),i=si.dot(si)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,si)!==null}intersectTriangle(t,e,n,i,s){Dl.subVectors(e,t),_o.subVectors(n,t),Ul.crossVectors(Dl,_o);let o=this.direction.dot(Ul),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Si.subVectors(this.origin,t);let l=a*this.direction.dot(_o.crossVectors(Si,_o));if(l<0)return null;let c=a*this.direction.dot(Dl.cross(Si));if(c<0||l+c>o)return null;let h=-a*Si.dot(Ul);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class r{constructor(t,e,n,i,s,o,a,l,c,h,u,d,f,p,x,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,f,p,x,g)}set(t,e,n,i,s,o,a,l,c,h,u,d,f,p,x,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/bs.setFromMatrixColumn(t,0).length(),s=1/bs.setFromMatrixColumn(t,1).length(),o=1/bs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=o*h,f=o*u,p=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,p=c*h,x=c*u;e[0]=d+x*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,p=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,p=a*h,x=a*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,p=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,f=o*c,p=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(W0,t,X0)}lookAt(t,e,n){let i=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Ei.crossVectors(n,xn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Ei.crossVectors(n,xn)),Ei.normalize(),Mo.crossVectors(xn,Ei),i[0]=Ei.x,i[4]=Mo.x,i[8]=xn.x,i[1]=Ei.y,i[5]=Mo.y,i[9]=xn.y,i[2]=Ei.z,i[6]=Mo.z,i[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],x=n[6],g=n[10],m=n[14],_=n[3],v=n[7],y=n[11],S=n[15],b=i[0],T=i[4],R=i[8],w=i[12],M=i[1],C=i[5],D=i[9],k=i[13],B=i[2],$=i[6],G=i[10],ct=i[14],H=i[3],X=i[7],gt=i[11],_t=i[15];return s[0]=o*b+a*M+l*B+c*H,s[4]=o*T+a*C+l*$+c*X,s[8]=o*R+a*D+l*G+c*gt,s[12]=o*w+a*k+l*ct+c*_t,s[1]=h*b+u*M+d*B+f*H,s[5]=h*T+u*C+d*$+f*X,s[9]=h*R+u*D+d*G+f*gt,s[13]=h*w+u*k+d*ct+f*_t,s[2]=p*b+x*M+g*B+m*H,s[6]=p*T+x*C+g*$+m*X,s[10]=p*R+x*D+g*G+m*gt,s[14]=p*w+x*k+g*ct+m*_t,s[3]=_*b+v*M+y*B+S*H,s[7]=_*T+v*C+y*$+S*X,s[11]=_*R+v*D+y*G+S*gt,s[15]=_*w+v*k+y*ct+S*_t,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],x=t[7],g=t[11],m=t[15];return p*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+x*(+e*l*f-e*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+g*(+e*c*u-e*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+m*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],x=t[13],g=t[14],m=t[15],_=u*g*c-x*d*c+x*l*f-a*g*f-u*l*m+a*d*m,v=p*d*c-h*g*c-p*l*f+o*g*f+h*l*m-o*d*m,y=h*x*c-p*u*c+p*a*f-o*x*f-h*a*m+o*u*m,S=p*u*l-h*x*l-p*a*d+o*x*d+h*a*g-o*u*g,b=e*_+n*v+i*y+s*S;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/b;return t[0]=_*T,t[1]=(x*d*s-u*g*s-x*i*f+n*g*f+u*i*m-n*d*m)*T,t[2]=(a*g*s-x*l*s+x*i*c-n*g*c-a*i*m+n*l*m)*T,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*T,t[4]=v*T,t[5]=(h*g*s-p*d*s+p*i*f-e*g*f-h*i*m+e*d*m)*T,t[6]=(p*l*s-o*g*s-p*i*c+e*g*c+o*i*m-e*l*m)*T,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*f+e*l*f)*T,t[8]=y*T,t[9]=(p*u*s-h*x*s-p*n*f+e*x*f+h*n*m-e*u*m)*T,t[10]=(o*x*s-p*a*s+p*n*c-e*x*c-o*n*m+e*a*m)*T,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*f-e*a*f)*T,t[12]=S*T,t[13]=(h*x*i-p*u*i+p*n*d-e*x*d-h*n*g+e*u*g)*T,t[14]=(p*a*i-o*x*i-p*n*l+e*x*l+o*n*g-e*a*g)*T,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*T,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,p=s*u,x=o*h,g=o*u,m=a*u,_=l*c,v=l*h,y=l*u,S=n.x,b=n.y,T=n.z;return i[0]=(1-(x+m))*S,i[1]=(f+y)*S,i[2]=(p-v)*S,i[3]=0,i[4]=(f-y)*b,i[5]=(1-(d+m))*b,i[6]=(g+_)*b,i[7]=0,i[8]=(p+v)*T,i[9]=(g-_)*T,i[10]=(1-(d+x))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=bs.set(i[0],i[1],i[2]).length(),o=bs.set(i[4],i[5],i[6]).length(),a=bs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Fn.copy(this);let c=1/s,h=1/o,u=1/a;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=h,Fn.elements[5]*=h,Fn.elements[6]*=h,Fn.elements[8]*=u,Fn.elements[9]*=u,Fn.elements[10]*=u,e.setFromRotationMatrix(Fn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=hi){let l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,p;if(a===hi)f=-(o+s)/(o-s),p=-2*o*s/(o-s);else if(a===ta)f=-o/(o-s),p=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=hi){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,f=(n+i)*h,p,x;if(a===hi)p=(o+s)*u,x=-2*u;else if(a===ta)p=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},bs=new I,Fn=new Qt,W0=new I(0,0,0),X0=new I(1,1,1),Ei=new I,Mo=new I,xn=new I,Fu=new Qt,Ou=new Ze,rn=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ou.setFromEuler(this),this.setFromQuaternion(Ou,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rn.DEFAULT_ORDER="XYZ";var Fr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Y0=0,Hu=new I,ws=new Ze,ri=new Qt,bo=new I,wr=new I,q0=new I,$0=new Ze,zu=new I(1,0,0),Vu=new I(0,1,0),Gu=new I(0,0,1),Wu={type:"added"},Z0={type:"removed"},Ss={type:"childadded",child:null},Nl={type:"childremoved",child:null},Ue=class r extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new I,e=new rn,n=new Ze,i=new I(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new te}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(zu,t)}rotateY(t){return this.rotateOnAxis(Vu,t)}rotateZ(t){return this.rotateOnAxis(Gu,t)}translateOnAxis(t,e){return Hu.copy(t).applyQuaternion(this.quaternion),this.position.add(Hu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zu,t)}translateY(t){return this.translateOnAxis(Vu,t)}translateZ(t){return this.translateOnAxis(Gu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?bo.copy(t):bo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(wr,bo,this.up):ri.lookAt(bo,wr,this.up),this.quaternion.setFromRotationMatrix(ri),i&&(ri.extractRotation(i.matrixWorld),ws.setFromRotationMatrix(ri),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wu),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Z0),Nl.child=t,this.dispatchEvent(Nl),Nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wu),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,t,q0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,$0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ue.DEFAULT_UP=new I(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=new I,oi=new I,kl=new I,ai=new I,Es=new I,Ts=new I,Xu=new I,Bl=new I,Fl=new I,Ol=new I,Hl=new Me,zl=new Me,Vl=new Me,Ci=class r{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),On.subVectors(t,e),i.cross(On);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){On.subVectors(i,e),oi.subVectors(n,e),kl.subVectors(t,e);let o=On.dot(On),a=On.dot(oi),l=On.dot(kl),c=oi.dot(oi),h=oi.dot(kl),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ai.x),l.addScaledVector(o,ai.y),l.addScaledVector(a,ai.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return Hl.setScalar(0),zl.setScalar(0),Vl.setScalar(0),Hl.fromBufferAttribute(t,e),zl.fromBufferAttribute(t,n),Vl.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Hl,s.x),o.addScaledVector(zl,s.y),o.addScaledVector(Vl,s.z),o}static isFrontFacing(t,e,n,i){return On.subVectors(n,e),oi.subVectors(t,e),On.cross(oi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return On.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),On.cross(oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;Es.subVectors(i,n),Ts.subVectors(s,n),Bl.subVectors(t,n);let l=Es.dot(Bl),c=Ts.dot(Bl);if(l<=0&&c<=0)return e.copy(n);Fl.subVectors(t,i);let h=Es.dot(Fl),u=Ts.dot(Fl);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Es,o);Ol.subVectors(t,s);let f=Es.dot(Ol),p=Ts.dot(Ol);if(p>=0&&f<=p)return e.copy(s);let x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Ts,a);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Xu.subVectors(s,i),a=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Xu,a);let m=1/(g+x+d);return o=x*m,a=d*m,e.copy(n).addScaledVector(Es,o).addScaledVector(Ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},wo={h:0,s:0,l:0};function Gl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var St=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=he.workingColorSpace){return this.r=t,this.g=e,this.b=n,he.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=he.workingColorSpace){if(t=k0(t,1),e=$e(e,0,1),n=$e(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Gl(o,s,t+1/3),this.g=Gl(o,s,t),this.b=Gl(o,s,t-1/3)}return he.toWorkingColorSpace(this,i),this}setStyle(t,e=Ce){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){let n=nf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}copyLinearToSRGB(t){return this.r=Os(t.r),this.g=Os(t.g),this.b=Os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return he.fromWorkingColorSpace(sn.copy(this),t),Math.round($e(sn.r*255,0,255))*65536+Math.round($e(sn.g*255,0,255))*256+Math.round($e(sn.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(sn.copy(this),e);let n=sn.r,i=sn.g,s=sn.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=Ce){he.fromWorkingColorSpace(sn.copy(this),t);let e=sn.r,n=sn.g,i=sn.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(wo);let n=Tl(Ti.h,wo.h,e),i=Tl(Ti.s,wo.s,e),s=Tl(Ti.l,wo.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sn=new St;St.NAMES=nf;var K0=0,Kn=class extends Ui{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=ui(),this.name="",this.blending=Pi,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oc,this.blendDst=ac,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oc&&(n.blendSrc=this.blendSrc),this.blendDst!==ac&&(n.blendDst=this.blendDst),this.blendEquation!==Qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},re=class extends Kn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Oe=new I,So=new ut,oe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Xc,this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)So.fromBufferAttribute(this,e),So.applyMatrix3(t),this.setXY(e,So.x,So.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xc&&(t.usage=this.usage),t}};var ra=class extends oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var oa=class extends oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ht=class extends oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},J0=0,Tn=new Qt,Wl=new Ue,As=new I,vn=new pi,Sr=new pi,qe=new I,Kt=class r extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J0++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ef(t)?oa:ra)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new te().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,n){return Tn.makeTranslation(t,e,n),this.applyMatrix4(Tn),this}scale(t,e,n){return Tn.makeScale(t,e,n),this.applyMatrix4(Tn),this}lookAt(t){return Wl.lookAt(t),Wl.updateMatrix(),this.applyMatrix4(Wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(n,3))}else{for(let n=0,i=e.count;n<i;n++){let s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];vn.setFromBufferAttribute(s),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(vn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(qe.addVectors(vn.min,Sr.min),vn.expandByPoint(qe),qe.addVectors(vn.max,Sr.max),vn.expandByPoint(qe)):(vn.expandByPoint(Sr.min),vn.expandByPoint(Sr.max))}vn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)qe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(qe));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)qe.fromBufferAttribute(a,c),l&&(As.fromBufferAttribute(t,c),qe.add(As)),i=Math.max(i,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new I,l[R]=new I;let c=new I,h=new I,u=new I,d=new ut,f=new ut,p=new ut,x=new I,g=new I;function m(R,w,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,w),p.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),a[R].add(x),a[w].add(x),a[M].add(x),l[R].add(g),l[w].add(g),l[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let R=0,w=_.length;R<w;++R){let M=_[R],C=M.start,D=M.count;for(let k=C,B=C+D;k<B;k+=3)m(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let v=new I,y=new I,S=new I,b=new I;function T(R){S.fromBufferAttribute(i,R),b.copy(S);let w=a[R];v.copy(w),v.sub(S.multiplyScalar(S.dot(w))).normalize(),y.crossVectors(b,w);let C=y.dot(l[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,C)}for(let R=0,w=_.length;R<w;++R){let M=_[R],C=M.start,D=M.count;for(let k=C,B=C+D;k<B;k+=3)T(t.getX(k+0)),T(t.getX(k+1)),T(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new I,s=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){let p=t.getX(d+0),x=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new oe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yu=new Qt,qi=new Ys,Eo=new mi,qu=new I,To=new I,Ao=new I,Ro=new I,Xl=new I,Co=new I,$u=new I,Po=new I,Mt=class extends Ue{constructor(t=new Kt,e=new re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Co.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(Xl.fromBufferAttribute(u,t),o?Co.addScaledVector(Xl,h):Co.addScaledVector(Xl.sub(e),h))}e.add(Co)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(s),qi.copy(t.ray).recast(t.near),!(Eo.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Eo,qu)===null||qi.origin.distanceToSquared(qu)>(t.far-t.near)**2))&&(Yu.copy(s).invert(),qi.copy(t.ray).applyMatrix4(Yu),!(n.boundingBox!==null&&qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qi)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=o[g.materialIndex],_=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,S=v;y<S;y+=3){let b=a.getX(y),T=a.getX(y+1),R=a.getX(y+2);i=Io(this,m,t,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){let _=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);i=Io(this,o,t,n,c,h,u,_,v,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=o[g.materialIndex],_=Math.max(g.start,f.start),v=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,S=v;y<S;y+=3){let b=y,T=y+1,R=y+2;i=Io(this,m,t,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){let _=g,v=g+1,y=g+2;i=Io(this,o,t,n,c,h,u,_,v,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function Q0(r,t,e,n,i,s,o,a){let l;if(t.side===we?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Di,a),l===null)return null;Po.copy(a),Po.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Po);return c<e.near||c>e.far?null:{distance:c,point:Po.clone(),object:r}}function Io(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,To),r.getVertexPosition(l,Ao),r.getVertexPosition(c,Ro);let h=Q0(r,t,e,n,To,Ao,Ro,$u);if(h){let u=new I;Ci.getBarycoord($u,To,Ao,Ro,u),i&&(h.uv=Ci.getInterpolatedAttribute(i,a,l,c,u,new ut)),s&&(h.uv1=Ci.getInterpolatedAttribute(s,a,l,c,u,new ut)),o&&(h.normal=Ci.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new I,materialIndex:0};Ci.getNormal(To,Ao,Ro,d.normal),h.face=d,h.barycoord=u}return h}var zt=class r extends Kt{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(u,2));function p(x,g,m,_,v,y,S,b,T,R,w){let M=y/T,C=S/R,D=y/2,k=S/2,B=b/2,$=T+1,G=R+1,ct=0,H=0,X=new I;for(let gt=0;gt<G;gt++){let _t=gt*C-k;for(let wt=0;wt<$;wt++){let It=wt*M-D;X[x]=It*_,X[g]=_t*v,X[m]=B,c.push(X.x,X.y,X.z),X[x]=0,X[g]=0,X[m]=b>0?1:-1,h.push(X.x,X.y,X.z),u.push(wt/T),u.push(1-gt/R),ct+=1}}for(let gt=0;gt<R;gt++)for(let _t=0;_t<T;_t++){let wt=d+_t+$*gt,It=d+_t+$*(gt+1),J=d+(_t+1)+$*(gt+1),dt=d+(_t+1)+$*gt;l.push(wt,It,dt),l.push(It,J,dt),H+=6}a.addGroup(f,H,w),f+=H,d+=ct}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qs(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function cn(r){let t={};for(let e=0;e<r.length;e++){let n=qs(r[e]);for(let i in n)t[i]=n[i]}return t}function j0(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function sf(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var ti={clone:qs,merge:cn},tm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ve=class extends Kn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tm,this.fragmentShader=em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=j0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},aa=class extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=hi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ai=new I,Zu=new ut,Ku=new ut,Be=class extends aa{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ea*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(El*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ea*2*Math.atan(Math.tan(El*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,Zu,Ku),e.subVectors(Ku,Zu)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(El*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Rs=-90,Cs=1,Zc=class extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Be(Rs,Cs,t,e);i.layers=this.layers,this.add(i);let s=new Be(Rs,Cs,t,e);s.layers=this.layers,this.add(s);let o=new Be(Rs,Cs,t,e);o.layers=this.layers,this.add(o);let a=new Be(Rs,Cs,t,e);a.layers=this.layers,this.add(a);let l=new Be(Rs,Cs,t,e);l.layers=this.layers,this.add(l);let c=new Be(Rs,Cs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===hi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ta)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},la=class extends dn{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Vs,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Kc=class extends ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new la(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new zt(5,5,5),s=new ve({name:"CubemapFromEquirect",uniforms:qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:we,blending:Zn});s.uniforms.tEquirect.value=e;let o=new Mt(i,s),a=e.minFilter;return e.minFilter===es&&(e.minFilter=qn),new Zc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},Yl=new I,nm=new I,im=new te,ci=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Yl.subVectors(n,e).cross(nm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Yl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||im.getNormalMatrix(t),i=this.coplanarPoint(Yl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},$i=new mi,Lo=new I,Or=class{constructor(t=new ci,e=new ci,n=new ci,i=new ci,s=new ci,o=new ci){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hi){let n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],x=i[10],g=i[11],m=i[12],_=i[13],v=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-m).normalize(),n[1].setComponents(l+s,d+c,g+f,y+m).normalize(),n[2].setComponents(l+o,d+h,g+p,y+_).normalize(),n[3].setComponents(l-o,d-h,g-p,y-_).normalize(),n[4].setComponents(l-a,d-u,g-x,y-v).normalize(),e===hi)n[5].setComponents(l+a,d+u,g+x,y+v).normalize();else if(e===ta)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Lo.x=i.normal.x>0?t.max.x:t.min.x,Lo.y=i.normal.y>0?t.max.y:t.min.y,Lo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function rf(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function sm(r){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let x=u[f];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Se=class r extends Kt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],p=[],x=[],g=[];for(let m=0;m<h;m++){let _=m*d-o;for(let v=0;v<c;v++){let y=v*u-s;p.push(y,-_,0),x.push(0,0,1),g.push(v/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<a;_++){let v=_+c*m,y=_+c*(m+1),S=_+1+c*(m+1),b=_+1+c*m;f.push(v,y,b),f.push(y,S,b)}this.setIndex(f),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}},rm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
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
#endif`,am=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,um=`#ifdef USE_AOMAP
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
#endif`,dm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fm=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vm=`#ifdef USE_IRIDESCENCE
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
#endif`,ym=`#ifdef USE_BUMPMAP
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
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Rm=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,Cm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pm=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",km=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Om=`#ifdef USE_ENVMAP
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
#endif`,Hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ym=`#ifdef USE_GRADIENTMAP
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
}`,qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$m=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Km=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,Jm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
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
#endif`,Qm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ng=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,ig=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sg=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,og=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ag=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ug=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pg=`#if defined( USE_POINTS_UV )
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
#endif`,mg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_g=`#ifdef USE_MORPHTARGETS
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
#endif`,Mg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ag=`#ifdef USE_NORMALMAP
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
#endif`,Rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ng=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
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
#endif`,Gg=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,Wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xg=`#ifdef USE_SKINNING
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
#endif`,Yg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qg=`#ifdef USE_SKINNING
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
#endif`,$g=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qg=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jg=`#ifdef USE_TRANSMISSION
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
#endif`,t1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,n1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,i1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,s1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,r1=`uniform sampler2D t2D;
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
}`,o1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h1=`#include <common>
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
}`,u1=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,d1=`#define DISTANCE
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
}`,f1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,p1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g1=`uniform float scale;
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
}`,x1=`uniform vec3 diffuse;
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
}`,v1=`#include <common>
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
}`,y1=`uniform vec3 diffuse;
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
}`,_1=`#define LAMBERT
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
}`,M1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,b1=`#define MATCAP
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
}`,w1=`#define MATCAP
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
}`,S1=`#define NORMAL
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
}`,E1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,T1=`#define PHONG
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
}`,A1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,R1=`#define STANDARD
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
}`,C1=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,P1=`#define TOON
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
}`,I1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,L1=`uniform float size;
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
}`,D1=`uniform vec3 diffuse;
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
}`,U1=`#include <common>
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
}`,N1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,k1=`uniform float rotation;
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
}`,B1=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:rm,alphahash_pars_fragment:om,alphamap_fragment:am,alphamap_pars_fragment:lm,alphatest_fragment:cm,alphatest_pars_fragment:hm,aomap_fragment:um,aomap_pars_fragment:dm,batching_pars_vertex:fm,batching_vertex:pm,begin_vertex:mm,beginnormal_vertex:gm,bsdfs:xm,iridescence_fragment:vm,bumpmap_pars_fragment:ym,clipping_planes_fragment:_m,clipping_planes_pars_fragment:Mm,clipping_planes_pars_vertex:bm,clipping_planes_vertex:wm,color_fragment:Sm,color_pars_fragment:Em,color_pars_vertex:Tm,color_vertex:Am,common:Rm,cube_uv_reflection_fragment:Cm,defaultnormal_vertex:Pm,displacementmap_pars_vertex:Im,displacementmap_vertex:Lm,emissivemap_fragment:Dm,emissivemap_pars_fragment:Um,colorspace_fragment:Nm,colorspace_pars_fragment:km,envmap_fragment:Bm,envmap_common_pars_fragment:Fm,envmap_pars_fragment:Om,envmap_pars_vertex:Hm,envmap_physical_pars_fragment:Jm,envmap_vertex:zm,fog_vertex:Vm,fog_pars_vertex:Gm,fog_fragment:Wm,fog_pars_fragment:Xm,gradientmap_pars_fragment:Ym,lightmap_pars_fragment:qm,lights_lambert_fragment:$m,lights_lambert_pars_fragment:Zm,lights_pars_begin:Km,lights_toon_fragment:Qm,lights_toon_pars_fragment:jm,lights_phong_fragment:tg,lights_phong_pars_fragment:eg,lights_physical_fragment:ng,lights_physical_pars_fragment:ig,lights_fragment_begin:sg,lights_fragment_maps:rg,lights_fragment_end:og,logdepthbuf_fragment:ag,logdepthbuf_pars_fragment:lg,logdepthbuf_pars_vertex:cg,logdepthbuf_vertex:hg,map_fragment:ug,map_pars_fragment:dg,map_particle_fragment:fg,map_particle_pars_fragment:pg,metalnessmap_fragment:mg,metalnessmap_pars_fragment:gg,morphinstance_vertex:xg,morphcolor_vertex:vg,morphnormal_vertex:yg,morphtarget_pars_vertex:_g,morphtarget_vertex:Mg,normal_fragment_begin:bg,normal_fragment_maps:wg,normal_pars_fragment:Sg,normal_pars_vertex:Eg,normal_vertex:Tg,normalmap_pars_fragment:Ag,clearcoat_normal_fragment_begin:Rg,clearcoat_normal_fragment_maps:Cg,clearcoat_pars_fragment:Pg,iridescence_pars_fragment:Ig,opaque_fragment:Lg,packing:Dg,premultiplied_alpha_fragment:Ug,project_vertex:Ng,dithering_fragment:kg,dithering_pars_fragment:Bg,roughnessmap_fragment:Fg,roughnessmap_pars_fragment:Og,shadowmap_pars_fragment:Hg,shadowmap_pars_vertex:zg,shadowmap_vertex:Vg,shadowmask_pars_fragment:Gg,skinbase_vertex:Wg,skinning_pars_vertex:Xg,skinning_vertex:Yg,skinnormal_vertex:qg,specularmap_fragment:$g,specularmap_pars_fragment:Zg,tonemapping_fragment:Kg,tonemapping_pars_fragment:Jg,transmission_fragment:Qg,transmission_pars_fragment:jg,uv_pars_fragment:t1,uv_pars_vertex:e1,uv_vertex:n1,worldpos_vertex:i1,background_vert:s1,background_frag:r1,backgroundCube_vert:o1,backgroundCube_frag:a1,cube_vert:l1,cube_frag:c1,depth_vert:h1,depth_frag:u1,distanceRGBA_vert:d1,distanceRGBA_frag:f1,equirect_vert:p1,equirect_frag:m1,linedashed_vert:g1,linedashed_frag:x1,meshbasic_vert:v1,meshbasic_frag:y1,meshlambert_vert:_1,meshlambert_frag:M1,meshmatcap_vert:b1,meshmatcap_frag:w1,meshnormal_vert:S1,meshnormal_frag:E1,meshphong_vert:T1,meshphong_frag:A1,meshphysical_vert:R1,meshphysical_frag:C1,meshtoon_vert:P1,meshtoon_frag:I1,points_vert:L1,points_frag:D1,shadow_vert:U1,shadow_frag:N1,sprite_vert:k1,sprite_frag:B1},Nt={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Xn={basic:{uniforms:cn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:cn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new St(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:cn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:cn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:cn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new St(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:cn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:cn([Nt.points,Nt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:cn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:cn([Nt.common,Nt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:cn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:cn([Nt.sprite,Nt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:cn([Nt.common,Nt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:cn([Nt.lights,Nt.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Xn.physical={uniforms:cn([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var Do={r:0,b:0,g:0},Zi=new rn,F1=new Qt;function O1(r,t,e,n,i,s,o){let a=new St(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function x(_){let v=!1,y=p(_);y===null?m(a,l):y&&y.isColor&&(m(y,1),v=!0);let S=r.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(_,v){let y=p(v);y&&(y.isCubeTexture||y.mapping===Ia)?(h===void 0&&(h=new Mt(new zt(1,1,1),new ve({name:"BackgroundCubeMaterial",uniforms:qs(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Zi.copy(v.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(F1.makeRotationFromEuler(Zi)),h.material.toneMapped=he.getTransfer(y.colorSpace)!==xe,(u!==y||d!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Mt(new Se(2,2),new ve({name:"BackgroundMaterial",uniforms:qs(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=he.getTransfer(y.colorSpace)!==xe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,v){_.getRGB(Do,sf(r)),n.buffers.color.setClear(Do.r,Do.g,Do.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(a,l)},render:x,addToRenderList:g}}function H1(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,o=!1;function a(M,C,D,k,B){let $=!1,G=u(k,D,C);s!==G&&(s=G,c(s.object)),$=f(M,k,D,B),$&&p(M,k,D,B),B!==null&&t.update(B,r.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(M,C,D,k),B!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,C,D){let k=D.wireframe===!0,B=n[M.id];B===void 0&&(B={},n[M.id]=B);let $=B[C.id];$===void 0&&($={},B[C.id]=$);let G=$[k];return G===void 0&&(G=d(l()),$[k]=G),G}function d(M){let C=[],D=[],k=[];for(let B=0;B<e;B++)C[B]=0,D[B]=0,k[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,C,D,k){let B=s.attributes,$=C.attributes,G=0,ct=D.getAttributes();for(let H in ct)if(ct[H].location>=0){let gt=B[H],_t=$[H];if(_t===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),gt===void 0||gt.attribute!==_t||_t&&gt.data!==_t.data)return!0;G++}return s.attributesNum!==G||s.index!==k}function p(M,C,D,k){let B={},$=C.attributes,G=0,ct=D.getAttributes();for(let H in ct)if(ct[H].location>=0){let gt=$[H];gt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(gt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(gt=M.instanceColor));let _t={};_t.attribute=gt,gt&&gt.data&&(_t.data=gt.data),B[H]=_t,G++}s.attributes=B,s.attributesNum=G,s.index=k}function x(){let M=s.newAttributes;for(let C=0,D=M.length;C<D;C++)M[C]=0}function g(M){m(M,0)}function m(M,C){let D=s.newAttributes,k=s.enabledAttributes,B=s.attributeDivisors;D[M]=1,k[M]===0&&(r.enableVertexAttribArray(M),k[M]=1),B[M]!==C&&(r.vertexAttribDivisor(M,C),B[M]=C)}function _(){let M=s.newAttributes,C=s.enabledAttributes;for(let D=0,k=C.length;D<k;D++)C[D]!==M[D]&&(r.disableVertexAttribArray(D),C[D]=0)}function v(M,C,D,k,B,$,G){G===!0?r.vertexAttribIPointer(M,C,D,B,$):r.vertexAttribPointer(M,C,D,k,B,$)}function y(M,C,D,k){x();let B=k.attributes,$=D.getAttributes(),G=C.defaultAttributeValues;for(let ct in $){let H=$[ct];if(H.location>=0){let X=B[ct];if(X===void 0&&(ct==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),ct==="instanceColor"&&M.instanceColor&&(X=M.instanceColor)),X!==void 0){let gt=X.normalized,_t=X.itemSize,wt=t.get(X);if(wt===void 0)continue;let It=wt.buffer,J=wt.type,dt=wt.bytesPerElement,F=J===r.INT||J===r.UNSIGNED_INT||X.gpuType===Oh;if(X.isInterleavedBufferAttribute){let O=X.data,Z=O.stride,ht=X.offset;if(O.isInstancedInterleavedBuffer){for(let it=0;it<H.locationSize;it++)m(H.location+it,O.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let it=0;it<H.locationSize;it++)g(H.location+it);r.bindBuffer(r.ARRAY_BUFFER,It);for(let it=0;it<H.locationSize;it++)v(H.location+it,_t/H.locationSize,J,gt,Z*dt,(ht+_t/H.locationSize*it)*dt,F)}else{if(X.isInstancedBufferAttribute){for(let O=0;O<H.locationSize;O++)m(H.location+O,X.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let O=0;O<H.locationSize;O++)g(H.location+O);r.bindBuffer(r.ARRAY_BUFFER,It);for(let O=0;O<H.locationSize;O++)v(H.location+O,_t/H.locationSize,J,gt,_t*dt,_t/H.locationSize*O*dt,F)}}else if(G!==void 0){let gt=G[ct];if(gt!==void 0)switch(gt.length){case 2:r.vertexAttrib2fv(H.location,gt);break;case 3:r.vertexAttrib3fv(H.location,gt);break;case 4:r.vertexAttrib4fv(H.location,gt);break;default:r.vertexAttrib1fv(H.location,gt)}}}}_()}function S(){R();for(let M in n){let C=n[M];for(let D in C){let k=C[D];for(let B in k)h(k[B].object),delete k[B];delete C[D]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let D in C){let k=C[D];for(let B in k)h(k[B].object),delete k[B];delete C[D]}delete n[M.id]}function T(M){for(let C in n){let D=n[C];if(D[M.id]===void 0)continue;let k=D[M.id];for(let B in k)h(k[B].object),delete k[B];delete D[M.id]}}function R(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function z1(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let x=0;x<u;x++)p+=h[x]*d[x];e.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function V1(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Hn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let R=T===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==fi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==$n&&!R)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=p>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:S,maxSamples:b}}function G1(r){let t=this,e=null,n=0,i=!1,s=!1,o=new ci,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{let _=s?0:n,v=_*4,y=m.clippingState||null;l.value=y,y=h(p,d,v,f);for(let S=0;S!==v;++S)y[S]=e[S];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=l.value,p!==!0||g===null){let m=f+x*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let v=0,y=f;v!==x;++v,y+=4)o.copy(u[v]).applyMatrix4(_,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function W1(r){let t=new WeakMap;function e(o,a){return a===mc?o.mapping=Vs:a===gc&&(o.mapping=Gs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===mc||a===gc)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Kc(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var $s=class extends aa{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ks=4,Ju=[.125,.215,.35,.446,.526,.582],ji=20,ql=new $s,Qu=new St,$l=null,Zl=0,Kl=0,Jl=!1,Ji=(1+Math.sqrt(5))/2,Ps=1/Ji,ju=[new I(-Ji,Ps,0),new I(Ji,Ps,0),new I(-Ps,0,Ji),new I(Ps,0,Ji),new I(0,Ji,-Ps),new I(0,Ji,Ps),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Ni=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$l=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($l,Zl,Kl),this._renderer.xr.enabled=Jl,t.scissorTest=!1,Uo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vs||t.mapping===Gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$l=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:bn,format:Hn,colorSpace:tr,depthBuffer:!1},i=td(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=td(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=X1(s)),this._blurMaterial=Y1(s,t,e)}return i}_compileMaterial(t){let e=new Mt(this._lodPlanes[0],t);this._renderer.compile(e,ql)}_sceneToCubeUV(t,e,n,i){let a=new Be(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Qu),h.toneMapping=Ii,h.autoClear=!1;let f=new re({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),p=new Mt(new zt,f),x=!1,g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,x=!0):(f.color.copy(Qu),x=!0);for(let m=0;m<6;m++){let _=m%3;_===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):_===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let v=this._cubeSize;Uo(i,_*v,m>2?v:0,v,v),h.setRenderTarget(i),x&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Vs||t.mapping===Gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ed());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new Mt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;Uo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ql)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ju[(i-s-1)%ju.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Mt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ji-1),x=s/p,g=isFinite(s)?1+Math.floor(h*x):ji;g>ji&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ji}`);let m=[],_=0;for(let T=0;T<ji;++T){let R=T/x,w=Math.exp(-R*R/2);m.push(w),T===0?_+=w:T<g&&(_+=2*w)}for(let T=0;T<m.length;T++)m[T]=m[T]/_;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=p,d.mipInt.value=v-n;let y=this._sizeLods[i],S=3*y*(i>v-ks?i-v+ks:0),b=4*(this._cubeSize-y);Uo(e,S,b,3*y,2*y),l.setRenderTarget(e),l.render(u,ql)}};function X1(r){let t=[],e=[],n=[],i=r,s=r-ks+1+Ju.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>r-ks?l=Ju[o-r+ks-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,x=3,g=2,m=1,_=new Float32Array(x*p*f),v=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let b=0;b<f;b++){let T=b%3*2/3-1,R=b>2?0:-1,w=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];_.set(w,x*p*b),v.set(d,g*p*b);let M=[b,b,b,b,b,b];y.set(M,m*p*b)}let S=new Kt;S.setAttribute("position",new oe(_,x)),S.setAttribute("uv",new oe(v,g)),S.setAttribute("faceIndex",new oe(y,m)),t.push(S),i>ks&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function td(r,t,e){let n=new ze(r,t,e);return n.texture.mapping=Ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Uo(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Y1(r,t,e){let n=new Float32Array(ji),i=new I(0,1,0);return new ve({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ed(){return new ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function nd(){return new ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Yh(){return`

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
	`}function q1(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===mc||l===gc,h=l===Vs||l===Gs;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Ni(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ni(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function $1(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Lr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Z1(r,t,e,n){let i={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let p in d.attributes)t.remove(d.attributes[p]);for(let p in d.morphAttributes){let x=d.morphAttributes[p];for(let g=0,m=x.length;g<m;g++)t.remove(x[g])}d.removeEventListener("dispose",o),delete i[d.id];let f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)t.update(d[p],r.ARRAY_BUFFER);let f=u.morphAttributes;for(let p in f){let x=f[p];for(let g=0,m=x.length;g<m;g++)t.update(x[g],r.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,p=u.attributes.position,x=0;if(f!==null){let _=f.array;x=f.version;for(let v=0,y=_.length;v<y;v+=3){let S=_[v+0],b=_[v+1],T=_[v+2];d.push(S,b,b,T,T,S)}}else if(p!==void 0){let _=p.array;x=p.version;for(let v=0,y=_.length/3-1;v<y;v+=3){let S=v+0,b=v+1,T=v+2;d.push(S,b,b,T,T,S)}}else return;let g=new(ef(d)?oa:ra)(d,1);g.version=x;let m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function K1(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function c(d,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,d*o,p),e.update(f,n,p))}function h(d,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function u(d,f,p,x){if(p===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,x,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_]*x[_];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function J1(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Q1(r,t,e){let n=new WeakMap,i=new Me;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let w=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],v=0;f===!0&&(v=1),p===!0&&(v=2),x===!0&&(v=3);let y=a.attributes.position.count*v,S=1;y>t.maxTextureSize&&(S=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let b=new Float32Array(y*S*4*u),T=new sa(b,y,S,u);T.type=$n,T.needsUpdate=!0;let R=v*4;for(let M=0;M<u;M++){let C=g[M],D=m[M],k=_[M],B=y*S*4*M;for(let $=0;$<C.count;$++){let G=$*R;f===!0&&(i.fromBufferAttribute(C,$),b[B+G+0]=i.x,b[B+G+1]=i.y,b[B+G+2]=i.z,b[B+G+3]=0),p===!0&&(i.fromBufferAttribute(D,$),b[B+G+4]=i.x,b[B+G+5]=i.y,b[B+G+6]=i.z,b[B+G+7]=0),x===!0&&(i.fromBufferAttribute(k,$),b[B+G+8]=i.x,b[B+G+9]=i.y,b[B+G+10]=i.z,b[B+G+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:T,size:new ut(y,S)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function j1(r,t,e,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var ca=class extends dn{constructor(t,e,n,i,s,o,a,l,c,h=Fs){if(h!==Fs&&h!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fs&&(n=ns),n===void 0&&h===Xs&&(n=Ws),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:yn,this.minFilter=l!==void 0?l:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},of=new dn,id=new ca(1,1),af=new sa,lf=new $c,cf=new la,sd=[],rd=[],od=new Float32Array(16),ad=new Float32Array(9),ld=new Float32Array(4);function er(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=sd[i];if(s===void 0&&(s=new Float32Array(i),sd[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ve(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ge(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Da(r,t){let e=rd[t];e===void 0&&(e=new Int32Array(t),rd[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function tx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function ex(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2fv(this.addr,t),Ge(e,t)}}function nx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;r.uniform3fv(this.addr,t),Ge(e,t)}}function ix(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4fv(this.addr,t),Ge(e,t)}}function sx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;ld.set(n),r.uniformMatrix2fv(this.addr,!1,ld),Ge(e,n)}}function rx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;ad.set(n),r.uniformMatrix3fv(this.addr,!1,ad),Ge(e,n)}}function ox(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;od.set(n),r.uniformMatrix4fv(this.addr,!1,od),Ge(e,n)}}function ax(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function lx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2iv(this.addr,t),Ge(e,t)}}function cx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;r.uniform3iv(this.addr,t),Ge(e,t)}}function hx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4iv(this.addr,t),Ge(e,t)}}function ux(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function dx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2uiv(this.addr,t),Ge(e,t)}}function fx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;r.uniform3uiv(this.addr,t),Ge(e,t)}}function px(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4uiv(this.addr,t),Ge(e,t)}}function mx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(id.compareFunction=tf,s=id):s=of,e.setTexture2D(t||s,i)}function gx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||lf,i)}function xx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||cf,i)}function vx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||af,i)}function yx(r){switch(r){case 5126:return tx;case 35664:return ex;case 35665:return nx;case 35666:return ix;case 35674:return sx;case 35675:return rx;case 35676:return ox;case 5124:case 35670:return ax;case 35667:case 35671:return lx;case 35668:case 35672:return cx;case 35669:case 35673:return hx;case 5125:return ux;case 36294:return dx;case 36295:return fx;case 36296:return px;case 35678:case 36198:case 36298:case 36306:case 35682:return mx;case 35679:case 36299:case 36307:return gx;case 35680:case 36300:case 36308:case 36293:return xx;case 36289:case 36303:case 36311:case 36292:return vx}}function _x(r,t){r.uniform1fv(this.addr,t)}function Mx(r,t){let e=er(t,this.size,2);r.uniform2fv(this.addr,e)}function bx(r,t){let e=er(t,this.size,3);r.uniform3fv(this.addr,e)}function wx(r,t){let e=er(t,this.size,4);r.uniform4fv(this.addr,e)}function Sx(r,t){let e=er(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Ex(r,t){let e=er(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Tx(r,t){let e=er(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Ax(r,t){r.uniform1iv(this.addr,t)}function Rx(r,t){r.uniform2iv(this.addr,t)}function Cx(r,t){r.uniform3iv(this.addr,t)}function Px(r,t){r.uniform4iv(this.addr,t)}function Ix(r,t){r.uniform1uiv(this.addr,t)}function Lx(r,t){r.uniform2uiv(this.addr,t)}function Dx(r,t){r.uniform3uiv(this.addr,t)}function Ux(r,t){r.uniform4uiv(this.addr,t)}function Nx(r,t,e){let n=this.cache,i=t.length,s=Da(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),Ge(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||of,s[o])}function kx(r,t,e){let n=this.cache,i=t.length,s=Da(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),Ge(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||lf,s[o])}function Bx(r,t,e){let n=this.cache,i=t.length,s=Da(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),Ge(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||cf,s[o])}function Fx(r,t,e){let n=this.cache,i=t.length,s=Da(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),Ge(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||af,s[o])}function Ox(r){switch(r){case 5126:return _x;case 35664:return Mx;case 35665:return bx;case 35666:return wx;case 35674:return Sx;case 35675:return Ex;case 35676:return Tx;case 5124:case 35670:return Ax;case 35667:case 35671:return Rx;case 35668:case 35672:return Cx;case 35669:case 35673:return Px;case 5125:return Ix;case 36294:return Lx;case 36295:return Dx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Nx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Bx;case 36289:case 36303:case 36311:case 36292:return Fx}}var Jc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=yx(e.type)}},Qc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ox(e.type)}},jc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},Ql=/(\w+)(\])?(\[|\.)?/g;function cd(r,t){r.seq.push(t),r.map[t.id]=t}function Hx(r,t,e){let n=r.name,i=n.length;for(Ql.lastIndex=0;;){let s=Ql.exec(n),o=Ql.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){cd(e,c===void 0?new Jc(a,r,t):new Qc(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new jc(a),cd(e,u)),e=u}}}var Hs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Hx(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function hd(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var zx=37297,Vx=0;function Gx(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var ud=new te;function Wx(r){he._getMatrix(ud,he.workingColorSpace,r);let t=`mat3( ${ud.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(r)){case La:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function dd(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Gx(r.getShaderSource(t),o)}else return i}function Xx(r,t){let e=Wx(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Yx(r,t){let e;switch(t){case Uh:e="Linear";break;case Nh:e="Reinhard";break;case kh:e="Cineon";break;case Kr:e="ACESFilmic";break;case Bh:e="AgX";break;case Fh:e="Neutral";break;case S0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var No=new I;function qx(){he.getLuminanceCoefficients(No);let r=No.x.toFixed(4),t=No.y.toFixed(4),e=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $x(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function Zx(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kx(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Dr(r){return r!==""}function fd(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(r){return r.replace(Jx,jx)}var Qx=new Map;function jx(r,t){let e=ne[t];if(e===void 0){let n=Qx.get(t);if(n!==void 0)e=ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return th(e)}var tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(r){return r.replace(tv,ev)}function ev(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gd(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function nv(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===zd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Dh?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===li&&(t="SHADOWMAP_TYPE_VSM"),t}function iv(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Vs:case Gs:t="ENVMAP_TYPE_CUBE";break;case Ia:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sv(r){let t="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Gs&&(t="ENVMAP_MODE_REFRACTION"),t}function rv(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Vd:t="ENVMAP_BLENDING_MULTIPLY";break;case b0:t="ENVMAP_BLENDING_MIX";break;case w0:t="ENVMAP_BLENDING_ADD";break}return t}function ov(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function av(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=nv(e),c=iv(e),h=sv(e),u=rv(e),d=ov(e),f=$x(e),p=Zx(s),x=i.createProgram(),g,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Dr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Dr).join(`
`),m.length>0&&(m+=`
`)):(g=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),m=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ii?"#define TONE_MAPPING":"",e.toneMapping!==Ii?ne.tonemapping_pars_fragment:"",e.toneMapping!==Ii?Yx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,Xx("linearToOutputTexel",e.outputColorSpace),qx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Dr).join(`
`)),o=th(o),o=fd(o,e),o=pd(o,e),a=th(a),a=fd(a,e),a=pd(a,e),o=md(o),a=md(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=_+g+o,y=_+m+a,S=hd(i,i.VERTEX_SHADER,v),b=hd(i,i.FRAGMENT_SHADER,y);i.attachShader(x,S),i.attachShader(x,b),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function T(C){if(r.debug.checkShaderErrors){let D=i.getProgramInfoLog(x).trim(),k=i.getShaderInfoLog(S).trim(),B=i.getShaderInfoLog(b).trim(),$=!0,G=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,S,b);else{let ct=dd(i,S,"vertex"),H=dd(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+ct+`
`+H)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(k===""||B==="")&&(G=!1);G&&(C.diagnostics={runnable:$,programLog:D,vertexShader:{log:k,prefix:g},fragmentShader:{log:B,prefix:m}})}i.deleteShader(S),i.deleteShader(b),R=new Hs(i,x),w=Kx(i,x)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,zx)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vx++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=b,this}var lv=0,eh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new nh(t),e.set(t,n)),n}},nh=class{constructor(t){this.id=lv++,this.code=t,this.usedTimes=0}};function cv(r,t,e,n,i,s,o){let a=new Fr,l=new eh,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,M,C,D,k){let B=D.fog,$=k.geometry,G=w.isMeshStandardMaterial?D.environment:null,ct=(w.isMeshStandardMaterial?e:t).get(w.envMap||G),H=ct&&ct.mapping===Ia?ct.image.height:null,X=p[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let gt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,_t=gt!==void 0?gt.length:0,wt=0;$.morphAttributes.position!==void 0&&(wt=1),$.morphAttributes.normal!==void 0&&(wt=2),$.morphAttributes.color!==void 0&&(wt=3);let It,J,dt,F;if(X){let Vt=Xn[X];It=Vt.vertexShader,J=Vt.fragmentShader}else It=w.vertexShader,J=w.fragmentShader,l.update(w),dt=l.getVertexShaderID(w),F=l.getFragmentShaderID(w);let O=r.getRenderTarget(),Z=r.state.buffers.depth.getReversed(),ht=k.isInstancedMesh===!0,it=k.isBatchedMesh===!0,Rt=!!w.map,et=!!w.matcap,lt=!!ct,L=!!w.aoMap,Bt=!!w.lightMap,N=!!w.bumpMap,nt=!!w.normalMap,W=!!w.displacementMap,Q=!!w.emissiveMap,K=!!w.metalnessMap,A=!!w.roughnessMap,E=w.anisotropy>0,U=w.clearcoat>0,z=w.dispersion>0,tt=w.iridescence>0,j=w.sheen>0,bt=w.transmission>0,mt=E&&!!w.anisotropyMap,ft=U&&!!w.clearcoatMap,xt=U&&!!w.clearcoatNormalMap,st=U&&!!w.clearcoatRoughnessMap,yt=tt&&!!w.iridescenceMap,Ct=tt&&!!w.iridescenceThicknessMap,Ft=j&&!!w.sheenColorMap,Et=j&&!!w.sheenRoughnessMap,$t=!!w.specularMap,Yt=!!w.specularColorMap,pe=!!w.specularIntensityMap,V=bt&&!!w.transmissionMap,Lt=bt&&!!w.thicknessMap,at=!!w.gradientMap,pt=!!w.alphaMap,Ut=w.alphaTest>0,Dt=!!w.alphaHash,Zt=!!w.extensions,ye=Ii;w.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ye=r.toneMapping);let ke={shaderID:X,shaderType:w.type,shaderName:w.name,vertexShader:It,fragmentShader:J,defines:w.defines,customVertexShaderID:dt,customFragmentShaderID:F,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:it,batchingColor:it&&k._colorsTexture!==null,instancing:ht,instancingColor:ht&&k.instanceColor!==null,instancingMorph:ht&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:O===null?r.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:tr,alphaToCoverage:!!w.alphaToCoverage,map:Rt,matcap:et,envMap:lt,envMapMode:lt&&ct.mapping,envMapCubeUVHeight:H,aoMap:L,lightMap:Bt,bumpMap:N,normalMap:nt,displacementMap:d&&W,emissiveMap:Q,normalMapObjectSpace:nt&&w.normalMapType===R0,normalMapTangentSpace:nt&&w.normalMapType===jd,metalnessMap:K,roughnessMap:A,anisotropy:E,anisotropyMap:mt,clearcoat:U,clearcoatMap:ft,clearcoatNormalMap:xt,clearcoatRoughnessMap:st,dispersion:z,iridescence:tt,iridescenceMap:yt,iridescenceThicknessMap:Ct,sheen:j,sheenColorMap:Ft,sheenRoughnessMap:Et,specularMap:$t,specularColorMap:Yt,specularIntensityMap:pe,transmission:bt,transmissionMap:V,thicknessMap:Lt,gradientMap:at,opaque:w.transparent===!1&&w.blending===Pi&&w.alphaToCoverage===!1,alphaMap:pt,alphaTest:Ut,alphaHash:Dt,combine:w.combine,mapUv:Rt&&x(w.map.channel),aoMapUv:L&&x(w.aoMap.channel),lightMapUv:Bt&&x(w.lightMap.channel),bumpMapUv:N&&x(w.bumpMap.channel),normalMapUv:nt&&x(w.normalMap.channel),displacementMapUv:W&&x(w.displacementMap.channel),emissiveMapUv:Q&&x(w.emissiveMap.channel),metalnessMapUv:K&&x(w.metalnessMap.channel),roughnessMapUv:A&&x(w.roughnessMap.channel),anisotropyMapUv:mt&&x(w.anisotropyMap.channel),clearcoatMapUv:ft&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:xt&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Et&&x(w.sheenRoughnessMap.channel),specularMapUv:$t&&x(w.specularMap.channel),specularColorMapUv:Yt&&x(w.specularColorMap.channel),specularIntensityMapUv:pe&&x(w.specularIntensityMap.channel),transmissionMapUv:V&&x(w.transmissionMap.channel),thicknessMapUv:Lt&&x(w.thicknessMap.channel),alphaMapUv:pt&&x(w.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(nt||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(Rt||pt),fog:!!B,useFog:w.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Z,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:wt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ye,decodeVideoTexture:Rt&&w.map.isVideoTexture===!0&&he.getTransfer(w.map.colorSpace)===xe,decodeVideoTextureEmissive:Q&&w.emissiveMap.isVideoTexture===!0&&he.getTransfer(w.emissiveMap.colorSpace)===xe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===De,flipSided:w.side===we,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Zt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&w.extensions.multiDraw===!0||it)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function m(w){let M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(let C in w.defines)M.push(C),M.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(_(M,w),v(M,w),M.push(r.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){let M=p[w.type],C;if(M){let D=Xn[M];C=ti.clone(D.uniforms)}else C=w.uniforms;return C}function S(w,M){let C;for(let D=0,k=h.length;D<k;D++){let B=h[D];if(B.cacheKey===M){C=B,++C.usedTimes;break}}return C===void 0&&(C=new av(r,M,w,s),h.push(C)),C}function b(w){if(--w.usedTimes===0){let M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function T(w){l.remove(w)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:S,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:R}}function hv(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function uv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function xd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function vd(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,p,x,g){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:x,group:g},r[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=x,m.group=g),t++,m}function a(u,d,f,p,x,g){let m=o(u,d,f,p,x,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,p,x,g){let m=o(u,d,f,p,x,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||uv),n.length>1&&n.sort(d||xd),i.length>1&&i.sort(d||xd)}function h(){for(let u=t,d=r.length;u<d;u++){let f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function dv(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new vd,r.set(n,[o])):i>=s.length?(o=new vd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function fv(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new St};break;case"SpotLight":e={position:new I,direction:new I,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new I,halfWidth:new I,halfHeight:new I};break}return r[t.id]=e,e}}}function pv(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var mv=0;function gv(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function xv(r){let t=new fv,e=pv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let i=new I,s=new Qt,o=new Qt;function a(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,_=0,v=0,y=0,S=0,b=0,T=0;c.sort(gv);for(let w=0,M=c.length;w<M;w++){let C=c[w],D=C.color,k=C.intensity,B=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=D.r*k,u+=D.g*k,d+=D.b*k;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],k);T++}else if(C.isDirectionalLight){let G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let ct=C.shadow,H=e.get(C);H.shadowIntensity=ct.intensity,H.shadowBias=ct.bias,H.shadowNormalBias=ct.normalBias,H.shadowRadius=ct.radius,H.shadowMapSize=ct.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=C.shadow.matrix,_++}n.directional[f]=G,f++}else if(C.isSpotLight){let G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(D).multiplyScalar(k),G.distance=B,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[x]=G;let ct=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,ct.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[x]=ct.matrix,C.castShadow){let H=e.get(C);H.shadowIntensity=ct.intensity,H.shadowBias=ct.bias,H.shadowNormalBias=ct.normalBias,H.shadowRadius=ct.radius,H.shadowMapSize=ct.mapSize,n.spotShadow[x]=H,n.spotShadowMap[x]=$,y++}x++}else if(C.isRectAreaLight){let G=t.get(C);G.color.copy(D).multiplyScalar(k),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=G,g++}else if(C.isPointLight){let G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){let ct=C.shadow,H=e.get(C);H.shadowIntensity=ct.intensity,H.shadowBias=ct.bias,H.shadowNormalBias=ct.normalBias,H.shadowRadius=ct.radius,H.shadowMapSize=ct.mapSize,H.shadowCameraNear=ct.camera.near,H.shadowCameraFar=ct.camera.far,n.pointShadow[p]=H,n.pointShadowMap[p]=$,n.pointShadowMatrix[p]=C.shadow.matrix,v++}n.point[p]=G,p++}else if(C.isHemisphereLight){let G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(k),G.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[m]=G,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Nt.LTC_FLOAT_1,n.rectAreaLTC2=Nt.LTC_FLOAT_2):(n.rectAreaLTC1=Nt.LTC_HALF_1,n.rectAreaLTC2=Nt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==x||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==_||R.numPointShadows!==v||R.numSpotShadows!==y||R.numSpotMaps!==S||R.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+S-b,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,R.directionalLength=f,R.pointLength=p,R.spotLength=x,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=_,R.numPointShadows=v,R.numSpotShadows=y,R.numSpotMaps=S,R.numLightProbes=T,n.version=mv++)}function l(c,h){let u=0,d=0,f=0,p=0,x=0,g=h.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){let v=c[m];if(v.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(v.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let y=n.rectArea[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(v.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function yd(r){let t=new xv(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function vv(r){let t=new WeakMap;function e(i,s=0){let o=t.get(i),a;return o===void 0?(a=new yd(r),t.set(i,[a])):s>=o.length?(a=new yd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var ih=class extends Kn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=T0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},sh=class extends Kn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_v=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mv(r,t,e){let n=new Or,i=new ut,s=new ut,o=new Me,a=new ih({depthPacking:A0}),l=new sh,c={},h=e.maxTextureSize,u={[Di]:we,[we]:Di,[De]:De},d=new ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:yv,fragmentShader:_v}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new Kt;p.setAttribute("position",new oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Mt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zd;let m=this.type;this.render=function(b,T,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;let w=r.getRenderTarget(),M=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),D=r.state;D.setBlending(Zn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let k=m!==li&&this.type===li,B=m===li&&this.type!==li;for(let $=0,G=b.length;$<G;$++){let ct=b[$],H=ct.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",ct,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let X=H.getFrameExtents();if(i.multiply(X),s.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,H.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,H.mapSize.y=s.y)),H.map===null||k===!0||B===!0){let _t=this.type!==li?{minFilter:yn,magFilter:yn}:{};H.map!==null&&H.map.dispose(),H.map=new ze(i.x,i.y,_t),H.map.texture.name=ct.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();let gt=H.getViewportCount();for(let _t=0;_t<gt;_t++){let wt=H.getViewport(_t);o.set(s.x*wt.x,s.y*wt.y,s.x*wt.z,s.y*wt.w),D.viewport(o),H.updateMatrices(ct,_t),n=H.getFrustum(),y(T,R,H.camera,ct,this.type)}H.isPointLightShadow!==!0&&this.type===li&&_(H,R),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(w,M,C)};function _(b,T){let R=t.update(x);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ze(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(T,null,R,d,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(T,null,R,f,x,null)}function v(b,T,R,w){let M=null,C=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)M=C;else if(M=R.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let D=M.uuid,k=T.uuid,B=c[D];B===void 0&&(B={},c[D]=B);let $=B[k];$===void 0&&($=M.clone(),B[k]=$,T.addEventListener("dispose",S)),M=$}if(M.visible=T.visible,M.wireframe=T.wireframe,w===li?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let D=r.properties.get(M);D.light=R}return M}function y(b,T,R,w,M){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===li)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);let k=t.update(b),B=b.material;if(Array.isArray(B)){let $=k.groups;for(let G=0,ct=$.length;G<ct;G++){let H=$[G],X=B[H.materialIndex];if(X&&X.visible){let gt=v(b,X,w,M);b.onBeforeShadow(r,b,T,R,k,gt,H),r.renderBufferDirect(R,null,k,gt,b,H),b.onAfterShadow(r,b,T,R,k,gt,H)}}}else if(B.visible){let $=v(b,B,w,M);b.onBeforeShadow(r,b,T,R,k,$,null),r.renderBufferDirect(R,null,k,$,b,null),b.onAfterShadow(r,b,T,R,k,$,null)}}let D=b.children;for(let k=0,B=D.length;k<B;k++)y(D[k],T,R,w,M)}function S(b){b.target.removeEventListener("dispose",S);for(let R in c){let w=c[R],M=b.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}var bv={[lc]:cc,[hc]:fc,[uc]:pc,[zs]:dc,[cc]:lc,[fc]:hc,[pc]:uc,[dc]:zs};function wv(r,t){function e(){let V=!1,Lt=new Me,at=null,pt=new Me(0,0,0,0);return{setMask:function(Ut){at!==Ut&&!V&&(r.colorMask(Ut,Ut,Ut,Ut),at=Ut)},setLocked:function(Ut){V=Ut},setClear:function(Ut,Dt,Zt,ye,ke){ke===!0&&(Ut*=ye,Dt*=ye,Zt*=ye),Lt.set(Ut,Dt,Zt,ye),pt.equals(Lt)===!1&&(r.clearColor(Ut,Dt,Zt,ye),pt.copy(Lt))},reset:function(){V=!1,at=null,pt.set(-1,0,0,0)}}}function n(){let V=!1,Lt=!1,at=null,pt=null,Ut=null;return{setReversed:function(Dt){if(Lt!==Dt){let Zt=t.get("EXT_clip_control");Lt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);let ye=Ut;Ut=null,this.setClear(ye)}Lt=Dt},getReversed:function(){return Lt},setTest:function(Dt){Dt?O(r.DEPTH_TEST):Z(r.DEPTH_TEST)},setMask:function(Dt){at!==Dt&&!V&&(r.depthMask(Dt),at=Dt)},setFunc:function(Dt){if(Lt&&(Dt=bv[Dt]),pt!==Dt){switch(Dt){case lc:r.depthFunc(r.NEVER);break;case cc:r.depthFunc(r.ALWAYS);break;case hc:r.depthFunc(r.LESS);break;case zs:r.depthFunc(r.LEQUAL);break;case uc:r.depthFunc(r.EQUAL);break;case dc:r.depthFunc(r.GEQUAL);break;case fc:r.depthFunc(r.GREATER);break;case pc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}pt=Dt}},setLocked:function(Dt){V=Dt},setClear:function(Dt){Ut!==Dt&&(Lt&&(Dt=1-Dt),r.clearDepth(Dt),Ut=Dt)},reset:function(){V=!1,at=null,pt=null,Ut=null,Lt=!1}}}function i(){let V=!1,Lt=null,at=null,pt=null,Ut=null,Dt=null,Zt=null,ye=null,ke=null;return{setTest:function(Vt){V||(Vt?O(r.STENCIL_TEST):Z(r.STENCIL_TEST))},setMask:function(Vt){Lt!==Vt&&!V&&(r.stencilMask(Vt),Lt=Vt)},setFunc:function(Vt,ee,ue){(at!==Vt||pt!==ee||Ut!==ue)&&(r.stencilFunc(Vt,ee,ue),at=Vt,pt=ee,Ut=ue)},setOp:function(Vt,ee,ue){(Dt!==Vt||Zt!==ee||ye!==ue)&&(r.stencilOp(Vt,ee,ue),Dt=Vt,Zt=ee,ye=ue)},setLocked:function(Vt){V=Vt},setClear:function(Vt){ke!==Vt&&(r.clearStencil(Vt),ke=Vt)},reset:function(){V=!1,Lt=null,at=null,pt=null,Ut=null,Dt=null,Zt=null,ye=null,ke=null}}}let s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,v=null,y=null,S=null,b=null,T=new St(0,0,0),R=0,w=!1,M=null,C=null,D=null,k=null,B=null,$=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ct=0,H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=ct>=1):H.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=ct>=2);let X=null,gt={},_t=r.getParameter(r.SCISSOR_BOX),wt=r.getParameter(r.VIEWPORT),It=new Me().fromArray(_t),J=new Me().fromArray(wt);function dt(V,Lt,at,pt){let Ut=new Uint8Array(4),Dt=r.createTexture();r.bindTexture(V,Dt),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<at;Zt++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(Lt,0,r.RGBA,1,1,pt,0,r.RGBA,r.UNSIGNED_BYTE,Ut):r.texImage2D(Lt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ut);return Dt}let F={};F[r.TEXTURE_2D]=dt(r.TEXTURE_2D,r.TEXTURE_2D,1),F[r.TEXTURE_CUBE_MAP]=dt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),F[r.TEXTURE_2D_ARRAY]=dt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),F[r.TEXTURE_3D]=dt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(r.DEPTH_TEST),o.setFunc(zs),N(!1),nt(wu),O(r.CULL_FACE),L(Zn);function O(V){h[V]!==!0&&(r.enable(V),h[V]=!0)}function Z(V){h[V]!==!1&&(r.disable(V),h[V]=!1)}function ht(V,Lt){return u[V]!==Lt?(r.bindFramebuffer(V,Lt),u[V]=Lt,V===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=Lt),V===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=Lt),!0):!1}function it(V,Lt){let at=f,pt=!1;if(V){at=d.get(Lt),at===void 0&&(at=[],d.set(Lt,at));let Ut=V.textures;if(at.length!==Ut.length||at[0]!==r.COLOR_ATTACHMENT0){for(let Dt=0,Zt=Ut.length;Dt<Zt;Dt++)at[Dt]=r.COLOR_ATTACHMENT0+Dt;at.length=Ut.length,pt=!0}}else at[0]!==r.BACK&&(at[0]=r.BACK,pt=!0);pt&&r.drawBuffers(at)}function Rt(V){return p!==V?(r.useProgram(V),p=V,!0):!1}let et={[Qi]:r.FUNC_ADD,[r0]:r.FUNC_SUBTRACT,[o0]:r.FUNC_REVERSE_SUBTRACT};et[a0]=r.MIN,et[l0]=r.MAX;let lt={[c0]:r.ZERO,[h0]:r.ONE,[u0]:r.SRC_COLOR,[oc]:r.SRC_ALPHA,[x0]:r.SRC_ALPHA_SATURATE,[m0]:r.DST_COLOR,[f0]:r.DST_ALPHA,[d0]:r.ONE_MINUS_SRC_COLOR,[ac]:r.ONE_MINUS_SRC_ALPHA,[g0]:r.ONE_MINUS_DST_COLOR,[p0]:r.ONE_MINUS_DST_ALPHA,[v0]:r.CONSTANT_COLOR,[y0]:r.ONE_MINUS_CONSTANT_COLOR,[_0]:r.CONSTANT_ALPHA,[M0]:r.ONE_MINUS_CONSTANT_ALPHA};function L(V,Lt,at,pt,Ut,Dt,Zt,ye,ke,Vt){if(V===Zn){x===!0&&(Z(r.BLEND),x=!1);return}if(x===!1&&(O(r.BLEND),x=!0),V!==s0){if(V!==g||Vt!==w){if((m!==Qi||y!==Qi)&&(r.blendEquation(r.FUNC_ADD),m=Qi,y=Qi),Vt)switch(V){case Pi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ke:r.blendFunc(r.ONE,r.ONE);break;case Su:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Eu:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Pi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ke:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Su:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Eu:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}_=null,v=null,S=null,b=null,T.set(0,0,0),R=0,g=V,w=Vt}return}Ut=Ut||Lt,Dt=Dt||at,Zt=Zt||pt,(Lt!==m||Ut!==y)&&(r.blendEquationSeparate(et[Lt],et[Ut]),m=Lt,y=Ut),(at!==_||pt!==v||Dt!==S||Zt!==b)&&(r.blendFuncSeparate(lt[at],lt[pt],lt[Dt],lt[Zt]),_=at,v=pt,S=Dt,b=Zt),(ye.equals(T)===!1||ke!==R)&&(r.blendColor(ye.r,ye.g,ye.b,ke),T.copy(ye),R=ke),g=V,w=!1}function Bt(V,Lt){V.side===De?Z(r.CULL_FACE):O(r.CULL_FACE);let at=V.side===we;Lt&&(at=!at),N(at),V.blending===Pi&&V.transparent===!1?L(Zn):L(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),s.setMask(V.colorWrite);let pt=V.stencilWrite;a.setTest(pt),pt&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Q(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?O(r.SAMPLE_ALPHA_TO_COVERAGE):Z(r.SAMPLE_ALPHA_TO_COVERAGE)}function N(V){M!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),M=V)}function nt(V){V!==n0?(O(r.CULL_FACE),V!==C&&(V===wu?r.cullFace(r.BACK):V===i0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Z(r.CULL_FACE),C=V}function W(V){V!==D&&(G&&r.lineWidth(V),D=V)}function Q(V,Lt,at){V?(O(r.POLYGON_OFFSET_FILL),(k!==Lt||B!==at)&&(r.polygonOffset(Lt,at),k=Lt,B=at)):Z(r.POLYGON_OFFSET_FILL)}function K(V){V?O(r.SCISSOR_TEST):Z(r.SCISSOR_TEST)}function A(V){V===void 0&&(V=r.TEXTURE0+$-1),X!==V&&(r.activeTexture(V),X=V)}function E(V,Lt,at){at===void 0&&(X===null?at=r.TEXTURE0+$-1:at=X);let pt=gt[at];pt===void 0&&(pt={type:void 0,texture:void 0},gt[at]=pt),(pt.type!==V||pt.texture!==Lt)&&(X!==at&&(r.activeTexture(at),X=at),r.bindTexture(V,Lt||F[V]),pt.type=V,pt.texture=Lt)}function U(){let V=gt[X];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function bt(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function mt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ft(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xt(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function st(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function yt(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ct(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ft(V){It.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),It.copy(V))}function Et(V){J.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),J.copy(V))}function $t(V,Lt){let at=c.get(Lt);at===void 0&&(at=new WeakMap,c.set(Lt,at));let pt=at.get(V);pt===void 0&&(pt=r.getUniformBlockIndex(Lt,V.name),at.set(V,pt))}function Yt(V,Lt){let pt=c.get(Lt).get(V);l.get(Lt)!==pt&&(r.uniformBlockBinding(Lt,pt,V.__bindingPointIndex),l.set(Lt,pt))}function pe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},X=null,gt={},u={},d=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,v=null,y=null,S=null,b=null,T=new St(0,0,0),R=0,w=!1,M=null,C=null,D=null,k=null,B=null,It.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:O,disable:Z,bindFramebuffer:ht,drawBuffers:it,useProgram:Rt,setBlending:L,setMaterial:Bt,setFlipSided:N,setCullFace:nt,setLineWidth:W,setPolygonOffset:Q,setScissorTest:K,activeTexture:A,bindTexture:E,unbindTexture:U,compressedTexImage2D:z,compressedTexImage3D:tt,texImage2D:yt,texImage3D:Ct,updateUBOMapping:$t,uniformBlockBinding:Yt,texStorage2D:xt,texStorage3D:st,texSubImage2D:j,texSubImage3D:bt,compressedTexSubImage2D:mt,compressedTexSubImage3D:ft,scissor:Ft,viewport:Et,reset:pe}}function _d(r,t,e,n){let i=Sv(n);switch(e){case qd:return r*t;case Zd:return r*t;case Kd:return r*t*2;case Vh:return r*t/i.components*i.byteLength;case Gh:return r*t/i.components*i.byteLength;case Jd:return r*t*2/i.components*i.byteLength;case Wh:return r*t*2/i.components*i.byteLength;case $d:return r*t*3/i.components*i.byteLength;case Hn:return r*t*4/i.components*i.byteLength;case Xh:return r*t*4/i.components*i.byteLength;case $o:case Zo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ko:case Jo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case yc:case Mc:return Math.max(r,16)*Math.max(t,8)/4;case vc:case _c:return Math.max(r,8)*Math.max(t,8)/2;case bc:case wc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Sc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ec:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Rc:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Pc:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Uc:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Nc:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case kc:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Fc:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Qo:case Oc:case Hc:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Qd:case zc:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Vc:case Gc:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sv(r){switch(r){case fi:case Wd:return{byteLength:1,components:1};case Br:case Xd:case bn:return{byteLength:2,components:1};case Hh:case zh:return{byteLength:2,components:4};case ns:case Oh:case $n:return{byteLength:4,components:1};case Yd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Ev(r,t,e,n,i,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return f?new OffscreenCanvas(A,E):na("canvas")}function x(A,E,U){let z=1,tt=K(A);if((tt.width>U||tt.height>U)&&(z=U/Math.max(tt.width,tt.height)),z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let j=Math.floor(z*tt.width),bt=Math.floor(z*tt.height);u===void 0&&(u=p(j,bt));let mt=E?p(j,bt):u;return mt.width=j,mt.height=bt,mt.getContext("2d").drawImage(A,0,0,j,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+j+"x"+bt+")."),mt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){r.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(A,E,U,z,tt=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=E;if(E===r.RED&&(U===r.FLOAT&&(j=r.R32F),U===r.HALF_FLOAT&&(j=r.R16F),U===r.UNSIGNED_BYTE&&(j=r.R8)),E===r.RED_INTEGER&&(U===r.UNSIGNED_BYTE&&(j=r.R8UI),U===r.UNSIGNED_SHORT&&(j=r.R16UI),U===r.UNSIGNED_INT&&(j=r.R32UI),U===r.BYTE&&(j=r.R8I),U===r.SHORT&&(j=r.R16I),U===r.INT&&(j=r.R32I)),E===r.RG&&(U===r.FLOAT&&(j=r.RG32F),U===r.HALF_FLOAT&&(j=r.RG16F),U===r.UNSIGNED_BYTE&&(j=r.RG8)),E===r.RG_INTEGER&&(U===r.UNSIGNED_BYTE&&(j=r.RG8UI),U===r.UNSIGNED_SHORT&&(j=r.RG16UI),U===r.UNSIGNED_INT&&(j=r.RG32UI),U===r.BYTE&&(j=r.RG8I),U===r.SHORT&&(j=r.RG16I),U===r.INT&&(j=r.RG32I)),E===r.RGB_INTEGER&&(U===r.UNSIGNED_BYTE&&(j=r.RGB8UI),U===r.UNSIGNED_SHORT&&(j=r.RGB16UI),U===r.UNSIGNED_INT&&(j=r.RGB32UI),U===r.BYTE&&(j=r.RGB8I),U===r.SHORT&&(j=r.RGB16I),U===r.INT&&(j=r.RGB32I)),E===r.RGBA_INTEGER&&(U===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),U===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),U===r.UNSIGNED_INT&&(j=r.RGBA32UI),U===r.BYTE&&(j=r.RGBA8I),U===r.SHORT&&(j=r.RGBA16I),U===r.INT&&(j=r.RGBA32I)),E===r.RGB&&U===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),E===r.RGBA){let bt=tt?La:he.getTransfer(z);U===r.FLOAT&&(j=r.RGBA32F),U===r.HALF_FLOAT&&(j=r.RGBA16F),U===r.UNSIGNED_BYTE&&(j=bt===xe?r.SRGB8_ALPHA8:r.RGBA8),U===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),U===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(A,E){let U;return A?E===null||E===ns||E===Ws?U=r.DEPTH24_STENCIL8:E===$n?U=r.DEPTH32F_STENCIL8:E===Br&&(U=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ns||E===Ws?U=r.DEPTH_COMPONENT24:E===$n?U=r.DEPTH_COMPONENT32F:E===Br&&(U=r.DEPTH_COMPONENT16),U}function S(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==yn&&A.minFilter!==qn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){let E=A.target;E.removeEventListener("dispose",b),R(E),E.isVideoTexture&&h.delete(E)}function T(A){let E=A.target;E.removeEventListener("dispose",T),M(E)}function R(A){let E=n.get(A);if(E.__webglInit===void 0)return;let U=A.source,z=d.get(U);if(z){let tt=z[E.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(A),Object.keys(z).length===0&&d.delete(U)}n.remove(A)}function w(A){let E=n.get(A);r.deleteTexture(E.__webglTexture);let U=A.source,z=d.get(U);delete z[E.__cacheKey],o.memory.textures--}function M(A){let E=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(E.__webglFramebuffer[z]))for(let tt=0;tt<E.__webglFramebuffer[z].length;tt++)r.deleteFramebuffer(E.__webglFramebuffer[z][tt]);else r.deleteFramebuffer(E.__webglFramebuffer[z]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[z])}else{if(Array.isArray(E.__webglFramebuffer))for(let z=0;z<E.__webglFramebuffer.length;z++)r.deleteFramebuffer(E.__webglFramebuffer[z]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let z=0;z<E.__webglColorRenderbuffer.length;z++)E.__webglColorRenderbuffer[z]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[z]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let U=A.textures;for(let z=0,tt=U.length;z<tt;z++){let j=n.get(U[z]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(U[z])}n.remove(A)}let C=0;function D(){C=0}function k(){let A=C;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),C+=1,A}function B(A){let E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function $(A,E){let U=n.get(A);if(A.isVideoTexture&&W(A),A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){let z=A.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(U,A,E);return}}e.bindTexture(r.TEXTURE_2D,U.__webglTexture,r.TEXTURE0+E)}function G(A,E){let U=n.get(A);if(A.version>0&&U.__version!==A.version){J(U,A,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,U.__webglTexture,r.TEXTURE0+E)}function ct(A,E){let U=n.get(A);if(A.version>0&&U.__version!==A.version){J(U,A,E);return}e.bindTexture(r.TEXTURE_3D,U.__webglTexture,r.TEXTURE0+E)}function H(A,E){let U=n.get(A);if(A.version>0&&U.__version!==A.version){dt(U,A,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+E)}let X={[_n]:r.REPEAT,[ts]:r.CLAMP_TO_EDGE,[xc]:r.MIRRORED_REPEAT},gt={[yn]:r.NEAREST,[E0]:r.NEAREST_MIPMAP_NEAREST,[mo]:r.NEAREST_MIPMAP_LINEAR,[qn]:r.LINEAR,[wl]:r.LINEAR_MIPMAP_NEAREST,[es]:r.LINEAR_MIPMAP_LINEAR},_t={[C0]:r.NEVER,[N0]:r.ALWAYS,[P0]:r.LESS,[tf]:r.LEQUAL,[I0]:r.EQUAL,[U0]:r.GEQUAL,[L0]:r.GREATER,[D0]:r.NOTEQUAL};function wt(A,E){if(E.type===$n&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===qn||E.magFilter===wl||E.magFilter===mo||E.magFilter===es||E.minFilter===qn||E.minFilter===wl||E.minFilter===mo||E.minFilter===es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,X[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,X[E.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,X[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,gt[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,gt[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,_t[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===yn||E.minFilter!==mo&&E.minFilter!==es||E.type===$n&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function It(A,E){let U=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));let z=E.source,tt=d.get(z);tt===void 0&&(tt={},d.set(z,tt));let j=B(E);if(j!==A.__cacheKey){tt[j]===void 0&&(tt[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,U=!0),tt[j].usedTimes++;let bt=tt[A.__cacheKey];bt!==void 0&&(tt[A.__cacheKey].usedTimes--,bt.usedTimes===0&&w(E)),A.__cacheKey=j,A.__webglTexture=tt[j].texture}return U}function J(A,E,U){let z=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(z=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(z=r.TEXTURE_3D);let tt=It(A,E),j=E.source;e.bindTexture(z,A.__webglTexture,r.TEXTURE0+U);let bt=n.get(j);if(j.version!==bt.__version||tt===!0){e.activeTexture(r.TEXTURE0+U);let mt=he.getPrimaries(he.workingColorSpace),ft=E.colorSpace===Ri?null:he.getPrimaries(E.colorSpace),xt=E.colorSpace===Ri||mt===ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let st=x(E.image,!1,i.maxTextureSize);st=Q(E,st);let yt=s.convert(E.format,E.colorSpace),Ct=s.convert(E.type),Ft=v(E.internalFormat,yt,Ct,E.colorSpace,E.isVideoTexture);wt(z,E);let Et,$t=E.mipmaps,Yt=E.isVideoTexture!==!0,pe=bt.__version===void 0||tt===!0,V=j.dataReady,Lt=S(E,st);if(E.isDepthTexture)Ft=y(E.format===Xs,E.type),pe&&(Yt?e.texStorage2D(r.TEXTURE_2D,1,Ft,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,Ft,st.width,st.height,0,yt,Ct,null));else if(E.isDataTexture)if($t.length>0){Yt&&pe&&e.texStorage2D(r.TEXTURE_2D,Lt,Ft,$t[0].width,$t[0].height);for(let at=0,pt=$t.length;at<pt;at++)Et=$t[at],Yt?V&&e.texSubImage2D(r.TEXTURE_2D,at,0,0,Et.width,Et.height,yt,Ct,Et.data):e.texImage2D(r.TEXTURE_2D,at,Ft,Et.width,Et.height,0,yt,Ct,Et.data);E.generateMipmaps=!1}else Yt?(pe&&e.texStorage2D(r.TEXTURE_2D,Lt,Ft,st.width,st.height),V&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,yt,Ct,st.data)):e.texImage2D(r.TEXTURE_2D,0,Ft,st.width,st.height,0,yt,Ct,st.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Yt&&pe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Lt,Ft,$t[0].width,$t[0].height,st.depth);for(let at=0,pt=$t.length;at<pt;at++)if(Et=$t[at],E.format!==Hn)if(yt!==null)if(Yt){if(V)if(E.layerUpdates.size>0){let Ut=_d(Et.width,Et.height,E.format,E.type);for(let Dt of E.layerUpdates){let Zt=Et.data.subarray(Dt*Ut/Et.data.BYTES_PER_ELEMENT,(Dt+1)*Ut/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,at,0,0,Dt,Et.width,Et.height,1,yt,Zt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,at,0,0,0,Et.width,Et.height,st.depth,yt,Et.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,at,Ft,Et.width,Et.height,st.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?V&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,at,0,0,0,Et.width,Et.height,st.depth,yt,Ct,Et.data):e.texImage3D(r.TEXTURE_2D_ARRAY,at,Ft,Et.width,Et.height,st.depth,0,yt,Ct,Et.data)}else{Yt&&pe&&e.texStorage2D(r.TEXTURE_2D,Lt,Ft,$t[0].width,$t[0].height);for(let at=0,pt=$t.length;at<pt;at++)Et=$t[at],E.format!==Hn?yt!==null?Yt?V&&e.compressedTexSubImage2D(r.TEXTURE_2D,at,0,0,Et.width,Et.height,yt,Et.data):e.compressedTexImage2D(r.TEXTURE_2D,at,Ft,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?V&&e.texSubImage2D(r.TEXTURE_2D,at,0,0,Et.width,Et.height,yt,Ct,Et.data):e.texImage2D(r.TEXTURE_2D,at,Ft,Et.width,Et.height,0,yt,Ct,Et.data)}else if(E.isDataArrayTexture)if(Yt){if(pe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Lt,Ft,st.width,st.height,st.depth),V)if(E.layerUpdates.size>0){let at=_d(st.width,st.height,E.format,E.type);for(let pt of E.layerUpdates){let Ut=st.data.subarray(pt*at/st.data.BYTES_PER_ELEMENT,(pt+1)*at/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,pt,st.width,st.height,1,yt,Ct,Ut)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,yt,Ct,st.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ft,st.width,st.height,st.depth,0,yt,Ct,st.data);else if(E.isData3DTexture)Yt?(pe&&e.texStorage3D(r.TEXTURE_3D,Lt,Ft,st.width,st.height,st.depth),V&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,yt,Ct,st.data)):e.texImage3D(r.TEXTURE_3D,0,Ft,st.width,st.height,st.depth,0,yt,Ct,st.data);else if(E.isFramebufferTexture){if(pe)if(Yt)e.texStorage2D(r.TEXTURE_2D,Lt,Ft,st.width,st.height);else{let at=st.width,pt=st.height;for(let Ut=0;Ut<Lt;Ut++)e.texImage2D(r.TEXTURE_2D,Ut,Ft,at,pt,0,yt,Ct,null),at>>=1,pt>>=1}}else if($t.length>0){if(Yt&&pe){let at=K($t[0]);e.texStorage2D(r.TEXTURE_2D,Lt,Ft,at.width,at.height)}for(let at=0,pt=$t.length;at<pt;at++)Et=$t[at],Yt?V&&e.texSubImage2D(r.TEXTURE_2D,at,0,0,yt,Ct,Et):e.texImage2D(r.TEXTURE_2D,at,Ft,yt,Ct,Et);E.generateMipmaps=!1}else if(Yt){if(pe){let at=K(st);e.texStorage2D(r.TEXTURE_2D,Lt,Ft,at.width,at.height)}V&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,yt,Ct,st)}else e.texImage2D(r.TEXTURE_2D,0,Ft,yt,Ct,st);g(E)&&m(z),bt.__version=j.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function dt(A,E,U){if(E.image.length!==6)return;let z=It(A,E),tt=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+U);let j=n.get(tt);if(tt.version!==j.__version||z===!0){e.activeTexture(r.TEXTURE0+U);let bt=he.getPrimaries(he.workingColorSpace),mt=E.colorSpace===Ri?null:he.getPrimaries(E.colorSpace),ft=E.colorSpace===Ri||bt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let xt=E.isCompressedTexture||E.image[0].isCompressedTexture,st=E.image[0]&&E.image[0].isDataTexture,yt=[];for(let pt=0;pt<6;pt++)!xt&&!st?yt[pt]=x(E.image[pt],!0,i.maxCubemapSize):yt[pt]=st?E.image[pt].image:E.image[pt],yt[pt]=Q(E,yt[pt]);let Ct=yt[0],Ft=s.convert(E.format,E.colorSpace),Et=s.convert(E.type),$t=v(E.internalFormat,Ft,Et,E.colorSpace),Yt=E.isVideoTexture!==!0,pe=j.__version===void 0||z===!0,V=tt.dataReady,Lt=S(E,Ct);wt(r.TEXTURE_CUBE_MAP,E);let at;if(xt){Yt&&pe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,$t,Ct.width,Ct.height);for(let pt=0;pt<6;pt++){at=yt[pt].mipmaps;for(let Ut=0;Ut<at.length;Ut++){let Dt=at[Ut];E.format!==Hn?Ft!==null?Yt?V&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut,0,0,Dt.width,Dt.height,Ft,Dt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut,$t,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?V&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut,0,0,Dt.width,Dt.height,Ft,Et,Dt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut,$t,Dt.width,Dt.height,0,Ft,Et,Dt.data)}}}else{if(at=E.mipmaps,Yt&&pe){at.length>0&&Lt++;let pt=K(yt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,$t,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(st){Yt?V&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,yt[pt].width,yt[pt].height,Ft,Et,yt[pt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,$t,yt[pt].width,yt[pt].height,0,Ft,Et,yt[pt].data);for(let Ut=0;Ut<at.length;Ut++){let Zt=at[Ut].image[pt].image;Yt?V&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut+1,0,0,Zt.width,Zt.height,Ft,Et,Zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut+1,$t,Zt.width,Zt.height,0,Ft,Et,Zt.data)}}else{Yt?V&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Ft,Et,yt[pt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,$t,Ft,Et,yt[pt]);for(let Ut=0;Ut<at.length;Ut++){let Dt=at[Ut];Yt?V&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut+1,0,0,Ft,Et,Dt.image[pt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut+1,$t,Ft,Et,Dt.image[pt])}}}g(E)&&m(r.TEXTURE_CUBE_MAP),j.__version=tt.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function F(A,E,U,z,tt,j){let bt=s.convert(U.format,U.colorSpace),mt=s.convert(U.type),ft=v(U.internalFormat,bt,mt,U.colorSpace),xt=n.get(E),st=n.get(U);if(st.__renderTarget=E,!xt.__hasExternalTextures){let yt=Math.max(1,E.width>>j),Ct=Math.max(1,E.height>>j);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,j,ft,yt,Ct,E.depth,0,bt,mt,null):e.texImage2D(tt,j,ft,yt,Ct,0,bt,mt,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,z,tt,st.__webglTexture,0,N(E)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,z,tt,st.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function O(A,E,U){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let z=E.depthTexture,tt=z&&z.isDepthTexture?z.type:null,j=y(E.stencilBuffer,tt),bt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,mt=N(E);nt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,mt,j,E.width,E.height):U?r.renderbufferStorageMultisample(r.RENDERBUFFER,mt,j,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,j,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,A)}else{let z=E.textures;for(let tt=0;tt<z.length;tt++){let j=z[tt],bt=s.convert(j.format,j.colorSpace),mt=s.convert(j.type),ft=v(j.internalFormat,bt,mt,j.colorSpace),xt=N(E);U&&nt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xt,ft,E.width,E.height):nt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xt,ft,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ft,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Z(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let z=n.get(E.depthTexture);z.__renderTarget=E,(!z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),$(E.depthTexture,0);let tt=z.__webglTexture,j=N(E);if(E.depthTexture.format===Fs)nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(E.depthTexture.format===Xs)nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ht(A){let E=n.get(A),U=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let z=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),z){let tt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,z.removeEventListener("dispose",tt)};z.addEventListener("dispose",tt),E.__depthDisposeCallback=tt}E.__boundDepthTexture=z}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");Z(E.__webglFramebuffer,A)}else if(U){E.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[z]),E.__webglDepthbuffer[z]===void 0)E.__webglDepthbuffer[z]=r.createRenderbuffer(),O(E.__webglDepthbuffer[z],A,!1);else{let tt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer[z];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),O(E.__webglDepthbuffer,A,!1);else{let z=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,z,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function it(A,E,U){let z=n.get(A);E!==void 0&&F(z.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),U!==void 0&&ht(A)}function Rt(A){let E=A.texture,U=n.get(A),z=n.get(E);A.addEventListener("dispose",T);let tt=A.textures,j=A.isWebGLCubeRenderTarget===!0,bt=tt.length>1;if(bt||(z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture()),z.__version=E.version,o.memory.textures++),j){U.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(E.mipmaps&&E.mipmaps.length>0){U.__webglFramebuffer[mt]=[];for(let ft=0;ft<E.mipmaps.length;ft++)U.__webglFramebuffer[mt][ft]=r.createFramebuffer()}else U.__webglFramebuffer[mt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){U.__webglFramebuffer=[];for(let mt=0;mt<E.mipmaps.length;mt++)U.__webglFramebuffer[mt]=r.createFramebuffer()}else U.__webglFramebuffer=r.createFramebuffer();if(bt)for(let mt=0,ft=tt.length;mt<ft;mt++){let xt=n.get(tt[mt]);xt.__webglTexture===void 0&&(xt.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&nt(A)===!1){U.__webglMultisampledFramebuffer=r.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let mt=0;mt<tt.length;mt++){let ft=tt[mt];U.__webglColorRenderbuffer[mt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,U.__webglColorRenderbuffer[mt]);let xt=s.convert(ft.format,ft.colorSpace),st=s.convert(ft.type),yt=v(ft.internalFormat,xt,st,ft.colorSpace,A.isXRRenderTarget===!0),Ct=N(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct,yt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,U.__webglColorRenderbuffer[mt])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(U.__webglDepthRenderbuffer=r.createRenderbuffer(),O(U.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture),wt(r.TEXTURE_CUBE_MAP,E);for(let mt=0;mt<6;mt++)if(E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)F(U.__webglFramebuffer[mt][ft],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,ft);else F(U.__webglFramebuffer[mt],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);g(E)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let mt=0,ft=tt.length;mt<ft;mt++){let xt=tt[mt],st=n.get(xt);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),wt(r.TEXTURE_2D,xt),F(U.__webglFramebuffer,A,xt,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,0),g(xt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let mt=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(mt=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(mt,z.__webglTexture),wt(mt,E),E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)F(U.__webglFramebuffer[ft],A,E,r.COLOR_ATTACHMENT0,mt,ft);else F(U.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,mt,0);g(E)&&m(mt),e.unbindTexture()}A.depthBuffer&&ht(A)}function et(A){let E=A.textures;for(let U=0,z=E.length;U<z;U++){let tt=E[U];if(g(tt)){let j=_(A),bt=n.get(tt).__webglTexture;e.bindTexture(j,bt),m(j),e.unbindTexture()}}}let lt=[],L=[];function Bt(A){if(A.samples>0){if(nt(A)===!1){let E=A.textures,U=A.width,z=A.height,tt=r.COLOR_BUFFER_BIT,j=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=n.get(A),mt=E.length>1;if(mt)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),mt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let xt=n.get(E[ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xt,0)}r.blitFramebuffer(0,0,U,z,0,0,U,z,tt,r.NEAREST),l===!0&&(lt.length=0,L.length=0,lt.push(r.COLOR_ATTACHMENT0+ft),A.depthBuffer&&A.resolveDepthBuffer===!1&&(lt.push(j),L.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),mt)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let xt=n.get(E[ft]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,xt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function N(A){return Math.min(i.maxSamples,A.samples)}function nt(A){let E=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function W(A){let E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function Q(A,E){let U=A.colorSpace,z=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||U!==tr&&U!==Ri&&(he.getTransfer(U)===xe?(z!==Hn||tt!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),E}function K(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=ct,this.setTextureCube=H,this.rebindTextures=it,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=F,this.useMultisampledRTT=nt}function Tv(r,t){function e(n,i=Ri){let s,o=he.getTransfer(i);if(n===fi)return r.UNSIGNED_BYTE;if(n===Hh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===zh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Yd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Wd)return r.BYTE;if(n===Xd)return r.SHORT;if(n===Br)return r.UNSIGNED_SHORT;if(n===Oh)return r.INT;if(n===ns)return r.UNSIGNED_INT;if(n===$n)return r.FLOAT;if(n===bn)return r.HALF_FLOAT;if(n===qd)return r.ALPHA;if(n===$d)return r.RGB;if(n===Hn)return r.RGBA;if(n===Zd)return r.LUMINANCE;if(n===Kd)return r.LUMINANCE_ALPHA;if(n===Fs)return r.DEPTH_COMPONENT;if(n===Xs)return r.DEPTH_STENCIL;if(n===Vh)return r.RED;if(n===Gh)return r.RED_INTEGER;if(n===Jd)return r.RG;if(n===Wh)return r.RG_INTEGER;if(n===Xh)return r.RGBA_INTEGER;if(n===$o||n===Zo||n===Ko||n===Jo)if(o===xe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===$o)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===$o)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ko)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===yc||n===_c||n===Mc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===vc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_c)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bc||n===wc||n===Sc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===bc||n===wc)return o===xe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Sc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Uc||n===Nc||n===kc||n===Bc||n===Fc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ec)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ac)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ic)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===kc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fc)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qo||n===Oc||n===Hc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Qo)return o===xe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qd||n===zc||n===Vc||n===Gc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Qo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===zc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var rh=class extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},de=class extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}},Av={type:"move"},Ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Av)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new de;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cv=`
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

}`,oh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new dn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ve({vertexShader:Rv,fragmentShader:Cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Mt(new Se(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ah=class extends Ui{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,x=new oh,g=e.getContextAttributes(),m=null,_=null,v=[],y=[],S=new ut,b=null,T=new Be;T.viewport=new Me;let R=new Be;R.viewport=new Me;let w=[T,R],M=new rh,C=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let dt=v[J];return dt===void 0&&(dt=new Ur,v[J]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(J){let dt=v[J];return dt===void 0&&(dt=new Ur,v[J]=dt),dt.getGripSpace()},this.getHand=function(J){let dt=v[J];return dt===void 0&&(dt=new Ur,v[J]=dt),dt.getHandSpace()};function k(J){let dt=y.indexOf(J.inputSource);if(dt===-1)return;let F=v[dt];F!==void 0&&(F.update(J.inputSource,J.frame,c||o),F.dispatchEvent({type:J.type,data:J.inputSource}))}function B(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",$);for(let J=0;J<v.length;J++){let dt=y[J];dt!==null&&(y[J]=null,v[J].disconnect(dt))}C=null,D=null,x.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,_=null,It.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",B),i.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(S),i.renderState.layers===void 0){let dt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,dt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new ze(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let dt=null,F=null,O=null;g.depth&&(O=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=g.stencil?Xs:Fs,F=g.stencil?Ws:ns);let Z={colorFormat:e.RGBA8,depthFormat:O,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Z),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new ze(d.textureWidth,d.textureHeight,{format:Hn,type:fi,depthTexture:new ca(d.textureWidth,d.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),It.setContext(i),It.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(J){for(let dt=0;dt<J.removed.length;dt++){let F=J.removed[dt],O=y.indexOf(F);O>=0&&(y[O]=null,v[O].disconnect(F))}for(let dt=0;dt<J.added.length;dt++){let F=J.added[dt],O=y.indexOf(F);if(O===-1){for(let ht=0;ht<v.length;ht++)if(ht>=y.length){y.push(F),O=ht;break}else if(y[ht]===null){y[ht]=F,O=ht;break}if(O===-1)break}let Z=v[O];Z&&Z.connect(F)}}let G=new I,ct=new I;function H(J,dt,F){G.setFromMatrixPosition(dt.matrixWorld),ct.setFromMatrixPosition(F.matrixWorld);let O=G.distanceTo(ct),Z=dt.projectionMatrix.elements,ht=F.projectionMatrix.elements,it=Z[14]/(Z[10]-1),Rt=Z[14]/(Z[10]+1),et=(Z[9]+1)/Z[5],lt=(Z[9]-1)/Z[5],L=(Z[8]-1)/Z[0],Bt=(ht[8]+1)/ht[0],N=it*L,nt=it*Bt,W=O/(-L+Bt),Q=W*-L;if(dt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Q),J.translateZ(W),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Z[10]===-1)J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{let K=it+W,A=Rt+W,E=N-Q,U=nt+(O-Q),z=et*Rt/A*K,tt=lt*Rt/A*K;J.projectionMatrix.makePerspective(E,U,z,tt,K,A),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function X(J,dt){dt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(dt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let dt=J.near,F=J.far;x.texture!==null&&(x.depthNear>0&&(dt=x.depthNear),x.depthFar>0&&(F=x.depthFar)),M.near=R.near=T.near=dt,M.far=R.far=T.far=F,(C!==M.near||D!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,D=M.far),T.layers.mask=J.layers.mask|2,R.layers.mask=J.layers.mask|4,M.layers.mask=T.layers.mask|R.layers.mask;let O=J.parent,Z=M.cameras;X(M,O);for(let ht=0;ht<Z.length;ht++)X(Z[ht],O);Z.length===2?H(M,T,R):M.projectionMatrix.copy(T.projectionMatrix),gt(J,M,O)};function gt(J,dt,F){F===null?J.matrix.copy(dt.matrixWorld):(J.matrix.copy(F.matrixWorld),J.matrix.invert(),J.matrix.multiply(dt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ea*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let _t=null;function wt(J,dt){if(h=dt.getViewerPose(c||o),p=dt,h!==null){let F=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let O=!1;F.length!==M.cameras.length&&(M.cameras.length=0,O=!0);for(let ht=0;ht<F.length;ht++){let it=F[ht],Rt=null;if(f!==null)Rt=f.getViewport(it);else{let lt=u.getViewSubImage(d,it);Rt=lt.viewport,ht===0&&(t.setRenderTargetTextures(_,lt.colorTexture,d.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(_))}let et=w[ht];et===void 0&&(et=new Be,et.layers.enable(ht),et.viewport=new Me,w[ht]=et),et.matrix.fromArray(it.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(it.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),ht===0&&(M.matrix.copy(et.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),O===!0&&M.cameras.push(et)}let Z=i.enabledFeatures;if(Z&&Z.includes("depth-sensing")){let ht=u.getDepthInformation(F[0]);ht&&ht.isValid&&ht.texture&&x.init(t,ht,i.renderState)}}for(let F=0;F<v.length;F++){let O=y[F],Z=v[F];O!==null&&Z!==void 0&&Z.update(O,dt,c||o)}_t&&_t(J,dt),dt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:dt}),p=null}let It=new rf;It.setAnimationLoop(wt),this.setAnimationLoop=function(J){_t=J},this.dispose=function(){}}},Ki=new rn,Pv=new Qt;function Iv(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,sf(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,v,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),x(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,_,v):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===we&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===we&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let _=t.get(m),v=_.envMap,y=_.envMapRotation;v&&(g.envMap.value=v,Ki.copy(y),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),g.envMapRotation.value.setFromMatrix4(Pv.makeRotationFromEuler(Ki)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,v){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=v*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===we&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Lv(r,t,e,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){let y=v.program;n.uniformBlockBinding(_,y)}function c(_,v){let y=i[_.id];y===void 0&&(p(_),y=h(_),i[_.id]=y,_.addEventListener("dispose",g));let S=v.program;n.updateUBOMapping(_,S);let b=t.render.frame;s[_.id]!==b&&(d(_),s[_.id]=b)}function h(_){let v=u();_.__bindingPointIndex=v;let y=r.createBuffer(),S=_.__size,b=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,S,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let v=i[_.id],y=_.uniforms,S=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,T=y.length;b<T;b++){let R=Array.isArray(y[b])?y[b]:[y[b]];for(let w=0,M=R.length;w<M;w++){let C=R[w];if(f(C,b,w,S)===!0){let D=C.__offset,k=Array.isArray(C.value)?C.value:[C.value],B=0;for(let $=0;$<k.length;$++){let G=k[$],ct=x(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,D+B,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,B),B+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,v,y,S){let b=_.value,T=v+"_"+y;if(S[T]===void 0)return typeof b=="number"||typeof b=="boolean"?S[T]=b:S[T]=b.clone(),!0;{let R=S[T];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return S[T]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function p(_){let v=_.uniforms,y=0,S=16;for(let T=0,R=v.length;T<R;T++){let w=Array.isArray(v[T])?v[T]:[v[T]];for(let M=0,C=w.length;M<C;M++){let D=w[M],k=Array.isArray(D.value)?D.value:[D.value];for(let B=0,$=k.length;B<$;B++){let G=k[B],ct=x(G),H=y%S,X=H%ct.boundary,gt=H+X;y+=X,gt!==0&&S-gt<ct.storage&&(y+=S-gt),D.__data=new Float32Array(ct.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=ct.storage}}}let b=y%S;return b>0&&(y+=S-b),_.__size=y,_.__cache={},this}function x(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function g(_){let v=_.target;v.removeEventListener("dispose",g);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(let _ in i)r.deleteBuffer(i[_]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}var ha=class{constructor(t={}){let{canvas:e=B0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let p=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,_=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ce,this.toneMapping=Ii,this.toneMappingExposure=1;let y=this,S=!1,b=0,T=0,R=null,w=-1,M=null,C=new Me,D=new Me,k=null,B=new St(0),$=0,G=e.width,ct=e.height,H=1,X=null,gt=null,_t=new Me(0,0,G,ct),wt=new Me(0,0,G,ct),It=!1,J=new Or,dt=!1,F=!1,O=new Qt,Z=new Qt,ht=new I,it=new Me,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function lt(){return R===null?H:1}let L=n;function Bt(P,Y){return e.getContext(P,Y)}try{let P={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",Ut,!1),e.addEventListener("webglcontextcreationerror",Dt,!1),L===null){let Y="webgl2";if(L=Bt(Y,P),L===null)throw Bt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let N,nt,W,Q,K,A,E,U,z,tt,j,bt,mt,ft,xt,st,yt,Ct,Ft,Et,$t,Yt,pe,V;function Lt(){N=new $1(L),N.init(),Yt=new Tv(L,N),nt=new V1(L,N,t,Yt),W=new wv(L,N),nt.reverseDepthBuffer&&d&&W.buffers.depth.setReversed(!0),Q=new J1(L),K=new hv,A=new Ev(L,N,W,K,nt,Yt,Q),E=new W1(y),U=new q1(y),z=new sm(L),pe=new H1(L,z),tt=new Z1(L,z,Q,pe),j=new j1(L,tt,z,Q),Ft=new Q1(L,nt,A),st=new G1(K),bt=new cv(y,E,U,N,nt,pe,st),mt=new Iv(y,K),ft=new dv,xt=new vv(N),Ct=new O1(y,E,U,W,j,f,l),yt=new Mv(y,j,nt),V=new Lv(L,Q,nt,W),Et=new z1(L,N,Q),$t=new K1(L,N,Q),Q.programs=bt.programs,y.capabilities=nt,y.extensions=N,y.properties=K,y.renderLists=ft,y.shadowMap=yt,y.state=W,y.info=Q}Lt();let at=new ah(y,L);this.xr=at,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let P=N.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=N.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(P){P!==void 0&&(H=P,this.setSize(G,ct,!1))},this.getSize=function(P){return P.set(G,ct)},this.setSize=function(P,Y,rt=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=P,ct=Y,e.width=Math.floor(P*H),e.height=Math.floor(Y*H),rt===!0&&(e.style.width=P+"px",e.style.height=Y+"px"),this.setViewport(0,0,P,Y)},this.getDrawingBufferSize=function(P){return P.set(G*H,ct*H).floor()},this.setDrawingBufferSize=function(P,Y,rt){G=P,ct=Y,H=rt,e.width=Math.floor(P*rt),e.height=Math.floor(Y*rt),this.setViewport(0,0,P,Y)},this.getCurrentViewport=function(P){return P.copy(C)},this.getViewport=function(P){return P.copy(_t)},this.setViewport=function(P,Y,rt,ot){P.isVector4?_t.set(P.x,P.y,P.z,P.w):_t.set(P,Y,rt,ot),W.viewport(C.copy(_t).multiplyScalar(H).round())},this.getScissor=function(P){return P.copy(wt)},this.setScissor=function(P,Y,rt,ot){P.isVector4?wt.set(P.x,P.y,P.z,P.w):wt.set(P,Y,rt,ot),W.scissor(D.copy(wt).multiplyScalar(H).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(P){W.setScissorTest(It=P)},this.setOpaqueSort=function(P){X=P},this.setTransparentSort=function(P){gt=P},this.getClearColor=function(P){return P.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(P=!0,Y=!0,rt=!0){let ot=0;if(P){let q=!1;if(R!==null){let At=R.texture.format;q=At===Xh||At===Wh||At===Gh}if(q){let At=R.texture.type,kt=At===fi||At===ns||At===Br||At===Ws||At===Hh||At===zh,Gt=Ct.getClearColor(),Wt=Ct.getClearAlpha(),Jt=Gt.r,jt=Gt.g,Xt=Gt.b;kt?(p[0]=Jt,p[1]=jt,p[2]=Xt,p[3]=Wt,L.clearBufferuiv(L.COLOR,0,p)):(x[0]=Jt,x[1]=jt,x[2]=Xt,x[3]=Wt,L.clearBufferiv(L.COLOR,0,x))}else ot|=L.COLOR_BUFFER_BIT}Y&&(ot|=L.DEPTH_BUFFER_BIT),rt&&(ot|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",Ut,!1),e.removeEventListener("webglcontextcreationerror",Dt,!1),ft.dispose(),xt.dispose(),K.dispose(),E.dispose(),U.dispose(),j.dispose(),pe.dispose(),V.dispose(),bt.dispose(),at.dispose(),at.removeEventListener("sessionstart",an),at.removeEventListener("sessionend",hn),Ye.stop()};function pt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Ut(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let P=Q.autoReset,Y=yt.enabled,rt=yt.autoUpdate,ot=yt.needsUpdate,q=yt.type;Lt(),Q.autoReset=P,yt.enabled=Y,yt.autoUpdate=rt,yt.needsUpdate=ot,yt.type=q}function Dt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Zt(P){let Y=P.target;Y.removeEventListener("dispose",Zt),ye(Y)}function ye(P){ke(P),K.remove(P)}function ke(P){let Y=K.get(P).programs;Y!==void 0&&(Y.forEach(function(rt){bt.releaseProgram(rt)}),P.isShaderMaterial&&bt.releaseShaderCache(P))}this.renderBufferDirect=function(P,Y,rt,ot,q,At){Y===null&&(Y=Rt);let kt=q.isMesh&&q.matrixWorld.determinant()<0,Gt=Jp(P,Y,rt,ot,q);W.setMaterial(ot,kt);let Wt=rt.index,Jt=1;if(ot.wireframe===!0){if(Wt=tt.getWireframeAttribute(rt),Wt===void 0)return;Jt=2}let jt=rt.drawRange,Xt=rt.attributes.position,fe=jt.start*Jt,Ee=(jt.start+jt.count)*Jt;At!==null&&(fe=Math.max(fe,At.start*Jt),Ee=Math.min(Ee,(At.start+At.count)*Jt)),Wt!==null?(fe=Math.max(fe,0),Ee=Math.min(Ee,Wt.count)):Xt!=null&&(fe=Math.max(fe,0),Ee=Math.min(Ee,Xt.count));let Te=Ee-fe;if(Te<0||Te===1/0)return;pe.setup(q,ot,Gt,rt,Wt);let un,me=Et;if(Wt!==null&&(un=z.get(Wt),me=$t,me.setIndex(un)),q.isMesh)ot.wireframe===!0?(W.setLineWidth(ot.wireframeLinewidth*lt()),me.setMode(L.LINES)):me.setMode(L.TRIANGLES);else if(q.isLine){let qt=ot.linewidth;qt===void 0&&(qt=1),W.setLineWidth(qt*lt()),q.isLineSegments?me.setMode(L.LINES):q.isLineLoop?me.setMode(L.LINE_LOOP):me.setMode(L.LINE_STRIP)}else q.isPoints?me.setMode(L.POINTS):q.isSprite&&me.setMode(L.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)me.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(N.get("WEBGL_multi_draw"))me.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let qt=q._multiDrawStarts,ni=q._multiDrawCounts,ge=q._multiDrawCount,kn=Wt?z.get(Wt).bytesPerElement:1,gs=K.get(ot).currentProgram.getUniforms();for(let gn=0;gn<ge;gn++)gs.setValue(L,"_gl_DrawID",gn),me.render(qt[gn]/kn,ni[gn])}else if(q.isInstancedMesh)me.renderInstances(fe,Te,q.count);else if(rt.isInstancedBufferGeometry){let qt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,ni=Math.min(rt.instanceCount,qt);me.renderInstances(fe,Te,ni)}else me.render(fe,Te)};function Vt(P,Y,rt){P.transparent===!0&&P.side===De&&P.forceSinglePass===!1?(P.side=we,P.needsUpdate=!0,fo(P,Y,rt),P.side=Di,P.needsUpdate=!0,fo(P,Y,rt),P.side=De):fo(P,Y,rt)}this.compile=function(P,Y,rt=null){rt===null&&(rt=P),m=xt.get(rt),m.init(Y),v.push(m),rt.traverseVisible(function(q){q.isLight&&q.layers.test(Y.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),P!==rt&&P.traverseVisible(function(q){q.isLight&&q.layers.test(Y.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),m.setupLights();let ot=new Set;return P.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let At=q.material;if(At)if(Array.isArray(At))for(let kt=0;kt<At.length;kt++){let Gt=At[kt];Vt(Gt,rt,q),ot.add(Gt)}else Vt(At,rt,q),ot.add(At)}),v.pop(),m=null,ot},this.compileAsync=function(P,Y,rt=null){let ot=this.compile(P,Y,rt);return new Promise(q=>{function At(){if(ot.forEach(function(kt){K.get(kt).currentProgram.isReady()&&ot.delete(kt)}),ot.size===0){q(P);return}setTimeout(At,10)}N.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ee=null;function ue(P){ee&&ee(P)}function an(){Ye.stop()}function hn(){Ye.start()}let Ye=new rf;Ye.setAnimationLoop(ue),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(P){ee=P,at.setAnimationLoop(P),P===null?Ye.stop():Ye.start()},at.addEventListener("sessionstart",an),at.addEventListener("sessionend",hn),this.render=function(P,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(Y),Y=at.getCamera()),P.isScene===!0&&P.onBeforeRender(y,P,Y,R),m=xt.get(P,v.length),m.init(Y),v.push(m),Z.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),J.setFromProjectionMatrix(Z),F=this.localClippingEnabled,dt=st.init(this.clippingPlanes,F),g=ft.get(P,_.length),g.init(),_.push(g),at.enabled===!0&&at.isPresenting===!0){let At=y.xr.getDepthSensingMesh();At!==null&&yi(At,Y,-1/0,y.sortObjects)}yi(P,Y,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(X,gt),et=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,et&&Ct.addToRenderList(g,P),this.info.render.frame++,dt===!0&&st.beginShadows();let rt=m.state.shadowsArray;yt.render(rt,P,Y),dt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let ot=g.opaque,q=g.transmissive;if(m.setupLights(),Y.isArrayCamera){let At=Y.cameras;if(q.length>0)for(let kt=0,Gt=At.length;kt<Gt;kt++){let Wt=At[kt];vu(ot,q,P,Wt)}et&&Ct.render(P);for(let kt=0,Gt=At.length;kt<Gt;kt++){let Wt=At[kt];ho(g,P,Wt,Wt.viewport)}}else q.length>0&&vu(ot,q,P,Y),et&&Ct.render(P),ho(g,P,Y);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),P.isScene===!0&&P.onAfterRender(y,P,Y),pe.resetDefaultState(),w=-1,M=null,v.pop(),v.length>0?(m=v[v.length-1],dt===!0&&st.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function yi(P,Y,rt,ot){if(P.visible===!1)return;if(P.layers.test(Y.layers)){if(P.isGroup)rt=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(Y);else if(P.isLight)m.pushLight(P),P.castShadow&&m.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||J.intersectsSprite(P)){ot&&it.setFromMatrixPosition(P.matrixWorld).applyMatrix4(Z);let kt=j.update(P),Gt=P.material;Gt.visible&&g.push(P,kt,Gt,rt,it.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||J.intersectsObject(P))){let kt=j.update(P),Gt=P.material;if(ot&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),it.copy(P.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),it.copy(kt.boundingSphere.center)),it.applyMatrix4(P.matrixWorld).applyMatrix4(Z)),Array.isArray(Gt)){let Wt=kt.groups;for(let Jt=0,jt=Wt.length;Jt<jt;Jt++){let Xt=Wt[Jt],fe=Gt[Xt.materialIndex];fe&&fe.visible&&g.push(P,kt,fe,rt,it.z,Xt)}}else Gt.visible&&g.push(P,kt,Gt,rt,it.z,null)}}let At=P.children;for(let kt=0,Gt=At.length;kt<Gt;kt++)yi(At[kt],Y,rt,ot)}function ho(P,Y,rt,ot){let q=P.opaque,At=P.transmissive,kt=P.transparent;m.setupLightsView(rt),dt===!0&&st.setGlobalState(y.clippingPlanes,rt),ot&&W.viewport(C.copy(ot)),q.length>0&&uo(q,Y,rt),At.length>0&&uo(At,Y,rt),kt.length>0&&uo(kt,Y,rt),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function vu(P,Y,rt,ot){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[ot.id]===void 0&&(m.state.transmissionRenderTarget[ot.id]=new ze(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")||N.has("EXT_color_buffer_float")?bn:fi,minFilter:es,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let At=m.state.transmissionRenderTarget[ot.id],kt=ot.viewport||C;At.setSize(kt.z,kt.w);let Gt=y.getRenderTarget();y.setRenderTarget(At),y.getClearColor(B),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),et&&Ct.render(rt);let Wt=y.toneMapping;y.toneMapping=Ii;let Jt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),m.setupLightsView(ot),dt===!0&&st.setGlobalState(y.clippingPlanes,ot),uo(P,rt,ot),A.updateMultisampleRenderTarget(At),A.updateRenderTargetMipmap(At),N.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Xt=0,fe=Y.length;Xt<fe;Xt++){let Ee=Y[Xt],Te=Ee.object,un=Ee.geometry,me=Ee.material,qt=Ee.group;if(me.side===De&&Te.layers.test(ot.layers)){let ni=me.side;me.side=we,me.needsUpdate=!0,yu(Te,rt,ot,un,me,qt),me.side=ni,me.needsUpdate=!0,jt=!0}}jt===!0&&(A.updateMultisampleRenderTarget(At),A.updateRenderTargetMipmap(At))}y.setRenderTarget(Gt),y.setClearColor(B,$),Jt!==void 0&&(ot.viewport=Jt),y.toneMapping=Wt}function uo(P,Y,rt){let ot=Y.isScene===!0?Y.overrideMaterial:null;for(let q=0,At=P.length;q<At;q++){let kt=P[q],Gt=kt.object,Wt=kt.geometry,Jt=ot===null?kt.material:ot,jt=kt.group;Gt.layers.test(rt.layers)&&yu(Gt,Y,rt,Wt,Jt,jt)}}function yu(P,Y,rt,ot,q,At){P.onBeforeRender(y,Y,rt,ot,q,At),P.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),q.onBeforeRender(y,Y,rt,ot,P,At),q.transparent===!0&&q.side===De&&q.forceSinglePass===!1?(q.side=we,q.needsUpdate=!0,y.renderBufferDirect(rt,Y,ot,q,P,At),q.side=Di,q.needsUpdate=!0,y.renderBufferDirect(rt,Y,ot,q,P,At),q.side=De):y.renderBufferDirect(rt,Y,ot,q,P,At),P.onAfterRender(y,Y,rt,ot,q,At)}function fo(P,Y,rt){Y.isScene!==!0&&(Y=Rt);let ot=K.get(P),q=m.state.lights,At=m.state.shadowsArray,kt=q.state.version,Gt=bt.getParameters(P,q.state,At,Y,rt),Wt=bt.getProgramCacheKey(Gt),Jt=ot.programs;ot.environment=P.isMeshStandardMaterial?Y.environment:null,ot.fog=Y.fog,ot.envMap=(P.isMeshStandardMaterial?U:E).get(P.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&P.envMap===null?Y.environmentRotation:P.envMapRotation,Jt===void 0&&(P.addEventListener("dispose",Zt),Jt=new Map,ot.programs=Jt);let jt=Jt.get(Wt);if(jt!==void 0){if(ot.currentProgram===jt&&ot.lightsStateVersion===kt)return Mu(P,Gt),jt}else Gt.uniforms=bt.getUniforms(P),P.onBeforeCompile(Gt,y),jt=bt.acquireProgram(Gt,Wt),Jt.set(Wt,jt),ot.uniforms=Gt.uniforms;let Xt=ot.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Xt.clippingPlanes=st.uniform),Mu(P,Gt),ot.needsLights=jp(P),ot.lightsStateVersion=kt,ot.needsLights&&(Xt.ambientLightColor.value=q.state.ambient,Xt.lightProbe.value=q.state.probe,Xt.directionalLights.value=q.state.directional,Xt.directionalLightShadows.value=q.state.directionalShadow,Xt.spotLights.value=q.state.spot,Xt.spotLightShadows.value=q.state.spotShadow,Xt.rectAreaLights.value=q.state.rectArea,Xt.ltc_1.value=q.state.rectAreaLTC1,Xt.ltc_2.value=q.state.rectAreaLTC2,Xt.pointLights.value=q.state.point,Xt.pointLightShadows.value=q.state.pointShadow,Xt.hemisphereLights.value=q.state.hemi,Xt.directionalShadowMap.value=q.state.directionalShadowMap,Xt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Xt.spotShadowMap.value=q.state.spotShadowMap,Xt.spotLightMatrix.value=q.state.spotLightMatrix,Xt.spotLightMap.value=q.state.spotLightMap,Xt.pointShadowMap.value=q.state.pointShadowMap,Xt.pointShadowMatrix.value=q.state.pointShadowMatrix),ot.currentProgram=jt,ot.uniformsList=null,jt}function _u(P){if(P.uniformsList===null){let Y=P.currentProgram.getUniforms();P.uniformsList=Hs.seqWithValue(Y.seq,P.uniforms)}return P.uniformsList}function Mu(P,Y){let rt=K.get(P);rt.outputColorSpace=Y.outputColorSpace,rt.batching=Y.batching,rt.batchingColor=Y.batchingColor,rt.instancing=Y.instancing,rt.instancingColor=Y.instancingColor,rt.instancingMorph=Y.instancingMorph,rt.skinning=Y.skinning,rt.morphTargets=Y.morphTargets,rt.morphNormals=Y.morphNormals,rt.morphColors=Y.morphColors,rt.morphTargetsCount=Y.morphTargetsCount,rt.numClippingPlanes=Y.numClippingPlanes,rt.numIntersection=Y.numClipIntersection,rt.vertexAlphas=Y.vertexAlphas,rt.vertexTangents=Y.vertexTangents,rt.toneMapping=Y.toneMapping}function Jp(P,Y,rt,ot,q){Y.isScene!==!0&&(Y=Rt),A.resetTextureUnits();let At=Y.fog,kt=ot.isMeshStandardMaterial?Y.environment:null,Gt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:tr,Wt=(ot.isMeshStandardMaterial?U:E).get(ot.envMap||kt),Jt=ot.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,jt=!!rt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Xt=!!rt.morphAttributes.position,fe=!!rt.morphAttributes.normal,Ee=!!rt.morphAttributes.color,Te=Ii;ot.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Te=y.toneMapping);let un=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,me=un!==void 0?un.length:0,qt=K.get(ot),ni=m.state.lights;if(dt===!0&&(F===!0||P!==M)){let En=P===M&&ot.id===w;st.setState(ot,P,En)}let ge=!1;ot.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==ni.state.version||qt.outputColorSpace!==Gt||q.isBatchedMesh&&qt.batching===!1||!q.isBatchedMesh&&qt.batching===!0||q.isBatchedMesh&&qt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&qt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&qt.instancing===!1||!q.isInstancedMesh&&qt.instancing===!0||q.isSkinnedMesh&&qt.skinning===!1||!q.isSkinnedMesh&&qt.skinning===!0||q.isInstancedMesh&&qt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&qt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&qt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&qt.instancingMorph===!1&&q.morphTexture!==null||qt.envMap!==Wt||ot.fog===!0&&qt.fog!==At||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==st.numPlanes||qt.numIntersection!==st.numIntersection)||qt.vertexAlphas!==Jt||qt.vertexTangents!==jt||qt.morphTargets!==Xt||qt.morphNormals!==fe||qt.morphColors!==Ee||qt.toneMapping!==Te||qt.morphTargetsCount!==me)&&(ge=!0):(ge=!0,qt.__version=ot.version);let kn=qt.currentProgram;ge===!0&&(kn=fo(ot,Y,q));let gs=!1,gn=!1,yr=!1,Ae=kn.getUniforms(),Wn=qt.uniforms;if(W.useProgram(kn.program)&&(gs=!0,gn=!0,yr=!0),ot.id!==w&&(w=ot.id,gn=!0),gs||M!==P){W.buffers.depth.getReversed()?(O.copy(P.projectionMatrix),O0(O),H0(O),Ae.setValue(L,"projectionMatrix",O)):Ae.setValue(L,"projectionMatrix",P.projectionMatrix),Ae.setValue(L,"viewMatrix",P.matrixWorldInverse);let _i=Ae.map.cameraPosition;_i!==void 0&&_i.setValue(L,ht.setFromMatrixPosition(P.matrixWorld)),nt.logarithmicDepthBuffer&&Ae.setValue(L,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Ae.setValue(L,"isOrthographic",P.isOrthographicCamera===!0),M!==P&&(M=P,gn=!0,yr=!0)}if(q.isSkinnedMesh){Ae.setOptional(L,q,"bindMatrix"),Ae.setOptional(L,q,"bindMatrixInverse");let En=q.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Ae.setValue(L,"boneTexture",En.boneTexture,A))}q.isBatchedMesh&&(Ae.setOptional(L,q,"batchingTexture"),Ae.setValue(L,"batchingTexture",q._matricesTexture,A),Ae.setOptional(L,q,"batchingIdTexture"),Ae.setValue(L,"batchingIdTexture",q._indirectTexture,A),Ae.setOptional(L,q,"batchingColorTexture"),q._colorsTexture!==null&&Ae.setValue(L,"batchingColorTexture",q._colorsTexture,A));let _r=rt.morphAttributes;if((_r.position!==void 0||_r.normal!==void 0||_r.color!==void 0)&&Ft.update(q,rt,kn),(gn||qt.receiveShadow!==q.receiveShadow)&&(qt.receiveShadow=q.receiveShadow,Ae.setValue(L,"receiveShadow",q.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(Wn.envMap.value=Wt,Wn.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&Y.environment!==null&&(Wn.envMapIntensity.value=Y.environmentIntensity),gn&&(Ae.setValue(L,"toneMappingExposure",y.toneMappingExposure),qt.needsLights&&Qp(Wn,yr),At&&ot.fog===!0&&mt.refreshFogUniforms(Wn,At),mt.refreshMaterialUniforms(Wn,ot,H,ct,m.state.transmissionRenderTarget[P.id]),Hs.upload(L,_u(qt),Wn,A)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Hs.upload(L,_u(qt),Wn,A),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Ae.setValue(L,"center",q.center),Ae.setValue(L,"modelViewMatrix",q.modelViewMatrix),Ae.setValue(L,"normalMatrix",q.normalMatrix),Ae.setValue(L,"modelMatrix",q.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){let En=ot.uniformsGroups;for(let _i=0,Mi=En.length;_i<Mi;_i++){let bu=En[_i];V.update(bu,kn),V.bind(bu,kn)}}return kn}function Qp(P,Y){P.ambientLightColor.needsUpdate=Y,P.lightProbe.needsUpdate=Y,P.directionalLights.needsUpdate=Y,P.directionalLightShadows.needsUpdate=Y,P.pointLights.needsUpdate=Y,P.pointLightShadows.needsUpdate=Y,P.spotLights.needsUpdate=Y,P.spotLightShadows.needsUpdate=Y,P.rectAreaLights.needsUpdate=Y,P.hemisphereLights.needsUpdate=Y}function jp(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(P,Y,rt){K.get(P.texture).__webglTexture=Y,K.get(P.depthTexture).__webglTexture=rt;let ot=K.get(P);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=rt===void 0,ot.__autoAllocateDepthBuffer||N.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,Y){let rt=K.get(P);rt.__webglFramebuffer=Y,rt.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(P,Y=0,rt=0){R=P,b=Y,T=rt;let ot=!0,q=null,At=!1,kt=!1;if(P){let Wt=K.get(P);if(Wt.__useDefaultFramebuffer!==void 0)W.bindFramebuffer(L.FRAMEBUFFER,null),ot=!1;else if(Wt.__webglFramebuffer===void 0)A.setupRenderTarget(P);else if(Wt.__hasExternalTextures)A.rebindTextures(P,K.get(P.texture).__webglTexture,K.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let Xt=P.depthTexture;if(Wt.__boundDepthTexture!==Xt){if(Xt!==null&&K.has(Xt)&&(P.width!==Xt.image.width||P.height!==Xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(P)}}let Jt=P.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(kt=!0);let jt=K.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(jt[Y])?q=jt[Y][rt]:q=jt[Y],At=!0):P.samples>0&&A.useMultisampledRTT(P)===!1?q=K.get(P).__webglMultisampledFramebuffer:Array.isArray(jt)?q=jt[rt]:q=jt,C.copy(P.viewport),D.copy(P.scissor),k=P.scissorTest}else C.copy(_t).multiplyScalar(H).floor(),D.copy(wt).multiplyScalar(H).floor(),k=It;if(W.bindFramebuffer(L.FRAMEBUFFER,q)&&ot&&W.drawBuffers(P,q),W.viewport(C),W.scissor(D),W.setScissorTest(k),At){let Wt=K.get(P.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Wt.__webglTexture,rt)}else if(kt){let Wt=K.get(P.texture),Jt=Y||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Wt.__webglTexture,rt||0,Jt)}w=-1},this.readRenderTargetPixels=function(P,Y,rt,ot,q,At,kt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=K.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt){W.bindFramebuffer(L.FRAMEBUFFER,Gt);try{let Wt=P.texture,Jt=Wt.format,jt=Wt.type;if(!nt.textureFormatReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=P.width-ot&&rt>=0&&rt<=P.height-q&&L.readPixels(Y,rt,ot,q,Yt.convert(Jt),Yt.convert(jt),At)}finally{let Wt=R!==null?K.get(R).__webglFramebuffer:null;W.bindFramebuffer(L.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(P,Y,rt,ot,q,At,kt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=K.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt){let Wt=P.texture,Jt=Wt.format,jt=Wt.type;if(!nt.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Y>=0&&Y<=P.width-ot&&rt>=0&&rt<=P.height-q){W.bindFramebuffer(L.FRAMEBUFFER,Gt);let Xt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Xt),L.bufferData(L.PIXEL_PACK_BUFFER,At.byteLength,L.STREAM_READ),L.readPixels(Y,rt,ot,q,Yt.convert(Jt),Yt.convert(jt),0);let fe=R!==null?K.get(R).__webglFramebuffer:null;W.bindFramebuffer(L.FRAMEBUFFER,fe);let Ee=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await F0(L,Ee,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Xt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,At),L.deleteBuffer(Xt),L.deleteSync(Ee),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,Y=null,rt=0){P.isTexture!==!0&&(Lr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Y=arguments[0]||null,P=arguments[1]);let ot=Math.pow(2,-rt),q=Math.floor(P.image.width*ot),At=Math.floor(P.image.height*ot),kt=Y!==null?Y.x:0,Gt=Y!==null?Y.y:0;A.setTexture2D(P,0),L.copyTexSubImage2D(L.TEXTURE_2D,rt,0,0,kt,Gt,q,At),W.unbindTexture()},this.copyTextureToTexture=function(P,Y,rt=null,ot=null,q=0){P.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture function signature has changed."),ot=arguments[0]||null,P=arguments[1],Y=arguments[2],q=arguments[3]||0,rt=null);let At,kt,Gt,Wt,Jt,jt,Xt,fe,Ee,Te=P.isCompressedTexture?P.mipmaps[q]:P.image;rt!==null?(At=rt.max.x-rt.min.x,kt=rt.max.y-rt.min.y,Gt=rt.isBox3?rt.max.z-rt.min.z:1,Wt=rt.min.x,Jt=rt.min.y,jt=rt.isBox3?rt.min.z:0):(At=Te.width,kt=Te.height,Gt=Te.depth||1,Wt=0,Jt=0,jt=0),ot!==null?(Xt=ot.x,fe=ot.y,Ee=ot.z):(Xt=0,fe=0,Ee=0);let un=Yt.convert(Y.format),me=Yt.convert(Y.type),qt;Y.isData3DTexture?(A.setTexture3D(Y,0),qt=L.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(A.setTexture2DArray(Y,0),qt=L.TEXTURE_2D_ARRAY):(A.setTexture2D(Y,0),qt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,Y.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,Y.unpackAlignment);let ni=L.getParameter(L.UNPACK_ROW_LENGTH),ge=L.getParameter(L.UNPACK_IMAGE_HEIGHT),kn=L.getParameter(L.UNPACK_SKIP_PIXELS),gs=L.getParameter(L.UNPACK_SKIP_ROWS),gn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Te.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Te.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Wt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Jt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,jt);let yr=P.isDataArrayTexture||P.isData3DTexture,Ae=Y.isDataArrayTexture||Y.isData3DTexture;if(P.isRenderTargetTexture||P.isDepthTexture){let Wn=K.get(P),_r=K.get(Y),En=K.get(Wn.__renderTarget),_i=K.get(_r.__renderTarget);W.bindFramebuffer(L.READ_FRAMEBUFFER,En.__webglFramebuffer),W.bindFramebuffer(L.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let Mi=0;Mi<Gt;Mi++)yr&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,K.get(P).__webglTexture,q,jt+Mi),P.isDepthTexture?(Ae&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,K.get(Y).__webglTexture,q,Ee+Mi),L.blitFramebuffer(Wt,Jt,At,kt,Xt,fe,At,kt,L.DEPTH_BUFFER_BIT,L.NEAREST)):Ae?L.copyTexSubImage3D(qt,q,Xt,fe,Ee+Mi,Wt,Jt,At,kt):L.copyTexSubImage2D(qt,q,Xt,fe,Ee+Mi,Wt,Jt,At,kt);W.bindFramebuffer(L.READ_FRAMEBUFFER,null),W.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ae?P.isDataTexture||P.isData3DTexture?L.texSubImage3D(qt,q,Xt,fe,Ee,At,kt,Gt,un,me,Te.data):Y.isCompressedArrayTexture?L.compressedTexSubImage3D(qt,q,Xt,fe,Ee,At,kt,Gt,un,Te.data):L.texSubImage3D(qt,q,Xt,fe,Ee,At,kt,Gt,un,me,Te):P.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,q,Xt,fe,At,kt,un,me,Te.data):P.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,q,Xt,fe,Te.width,Te.height,un,Te.data):L.texSubImage2D(L.TEXTURE_2D,q,Xt,fe,At,kt,un,me,Te);L.pixelStorei(L.UNPACK_ROW_LENGTH,ni),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kn),L.pixelStorei(L.UNPACK_SKIP_ROWS,gs),L.pixelStorei(L.UNPACK_SKIP_IMAGES,gn),q===0&&Y.generateMipmaps&&L.generateMipmap(qt),W.unbindTexture()},this.copyTextureToTexture3D=function(P,Y,rt=null,ot=null,q=0){return P.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,ot=arguments[1]||null,P=arguments[2],Y=arguments[3],q=arguments[4]||0),Lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,Y,rt,ot,q)},this.initRenderTarget=function(P){K.get(P).__webglFramebuffer===void 0&&A.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?A.setTextureCube(P,0):P.isData3DTexture?A.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?A.setTexture2DArray(P,0):A.setTexture2D(P,0),W.unbindTexture()},this.resetState=function(){b=0,T=0,R=null,W.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var Zs=class r{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new St(t),this.near=e,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Jn=class extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},ua=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Xc,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ln=new I,Hr=class r{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.applyMatrix4(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.applyNormalMatrix(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.transformDirection(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},zr=class extends Kn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Is,Er=new I,Ls=new I,Ds=new I,Us=new ut,Tr=new ut,hf=new Qt,ko=new I,Ar=new I,Bo=new I,Md=new ut,jl=new ut,bd=new ut,da=class extends Ue{constructor(t=new zr){if(super(),this.isSprite=!0,this.type="Sprite",Is===void 0){Is=new Kt;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ua(e,5);Is.setIndex([0,1,2,0,2,3]),Is.setAttribute("position",new Hr(n,3,0,!1)),Is.setAttribute("uv",new Hr(n,2,3,!1))}this.geometry=Is,this.material=t,this.center=new ut(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ls.setFromMatrixScale(this.matrixWorld),hf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ds.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ls.multiplyScalar(-Ds.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let o=this.center;Fo(ko.set(-.5,-.5,0),Ds,o,Ls,i,s),Fo(Ar.set(.5,-.5,0),Ds,o,Ls,i,s),Fo(Bo.set(.5,.5,0),Ds,o,Ls,i,s),Md.set(0,0),jl.set(1,0),bd.set(1,1);let a=t.ray.intersectTriangle(ko,Ar,Bo,!1,Er);if(a===null&&(Fo(Ar.set(-.5,.5,0),Ds,o,Ls,i,s),jl.set(0,1),a=t.ray.intersectTriangle(ko,Bo,Ar,!1,Er),a===null))return;let l=t.ray.origin.distanceTo(Er);l<t.near||l>t.far||e.push({distance:l,point:Er.clone(),uv:Ci.getInterpolation(Er,ko,Ar,Bo,Md,jl,bd,new ut),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Fo(r,t,e,n,i,s){Us.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Tr.x=s*Us.x-i*Us.y,Tr.y=i*Us.x+s*Us.y):Tr.copy(Us),r.copy(t),r.x+=Tr.x,r.y+=Tr.y,r.applyMatrix4(hf)}var lh=class extends dn{constructor(t=null,e=1,n=1,i,s,o,a,l,c=yn,h=yn,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qn=class extends oe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ns=new Qt,wd=new Qt,Oo=[],Sd=new pi,Dv=new Qt,Rr=new Mt,Cr=new mi,ki=class extends Mt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Dv)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new pi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ns),Sd.copy(t.boundingBox).applyMatrix4(Ns),this.boundingBox.union(Sd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ns),Cr.copy(t.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(Cr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),t.ray.intersectsSphere(Cr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ns),wd.multiplyMatrices(n,Ns),Rr.matrixWorld=wd,Rr.raycast(t,Oo);for(let o=0,a=Oo.length;o<a;o++){let l=Oo[o];l.instanceId=s,l.object=this,e.push(l)}Oo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new lh(new Float32Array(i*this.count),i,this.count,Vh,$n));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var ch=class extends Kn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},fa=new I,pa=new I,Ed=new Qt,Pr=new Ys,Ho=new mi,tc=new I,Td=new I,hh=class extends Ue{constructor(t=new Kt,e=new ch){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)fa.fromBufferAttribute(e,i-1),pa.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=fa.distanceTo(pa);t.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(i),Ho.radius+=s,t.ray.intersectsSphere(Ho)===!1)return;Ed.copy(i).invert(),Pr.copy(t.ray).applyMatrix4(Ed);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let x=f,g=p-1;x<g;x+=c){let m=h.getX(x),_=h.getX(x+1),v=zo(this,t,Pr,l,m,_);v&&e.push(v)}if(this.isLineLoop){let x=h.getX(p-1),g=h.getX(f),m=zo(this,t,Pr,l,x,g);m&&e.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let x=f,g=p-1;x<g;x+=c){let m=zo(this,t,Pr,l,x,x+1);m&&e.push(m)}if(this.isLineLoop){let x=zo(this,t,Pr,l,p-1,f);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function zo(r,t,e,n,i,s){let o=r.geometry.attributes.position;if(fa.fromBufferAttribute(o,i),pa.fromBufferAttribute(o,s),e.distanceSqToSegment(fa,pa,tc,Td)>n)return;tc.applyMatrix4(r.matrixWorld);let l=t.ray.origin.distanceTo(tc);if(!(l<t.near||l>t.far))return{distance:l,point:Td.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}var Ad=new I,Rd=new I,ma=class extends hh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Ad.fromBufferAttribute(e,i),Rd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ad.distanceTo(Rd);t.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Vr=class extends Kn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Cd=new Qt,uh=new Ys,Vo=new mi,Go=new I,is=class extends Ue{constructor(t=new Kt,e=new Vr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(i),Vo.radius+=s,t.ray.intersectsSphere(Vo)===!1)return;Cd.copy(i).invert(),uh.copy(t.ray).applyMatrix4(Cd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,x=f;p<x;p++){let g=c.getX(p);Go.fromBufferAttribute(u,g),Pd(Go,g,l,i,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,x=f;p<x;p++)Go.fromBufferAttribute(u,p),Pd(Go,p,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Pd(r,t,e,n,i,s,o){let a=uh.distanceSqToPoint(r);if(a<e){let l=new I;uh.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Mn=class extends dn{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},An=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,s=n.length,o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new ut:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new I,i=[],s=[],o=[],a=new I,l=new Qt;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new I)}s[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos($e(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos($e(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Gr=class extends An{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ut){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);let a=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},dh=class extends Gr{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function qh(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return r+t*s+e*o+n*a}}}var Wo=new I,ec=new qh,nc=new qh,ic=new qh,zn=class extends An{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){let n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Wo.subVectors(i[0],i[1]).add(i[0]),c=Wo);let u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Wo.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Wo),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),ec.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,x,g),nc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,x,g),ic.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(ec.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),nc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ic.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ec.calc(l),nc.calc(l),ic.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Id(r,t,e,n,i){let s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function Uv(r,t){let e=1-r;return e*e*t}function Nv(r,t){return 2*(1-r)*r*t}function kv(r,t){return r*r*t}function Nr(r,t,e,n){return Uv(r,t)+Nv(r,e)+kv(r,n)}function Bv(r,t){let e=1-r;return e*e*e*t}function Fv(r,t){let e=1-r;return 3*e*e*r*t}function Ov(r,t){return 3*(1-r)*r*r*t}function Hv(r,t){return r*r*r*t}function kr(r,t,e,n,i){return Bv(r,t)+Fv(r,e)+Ov(r,n)+Hv(r,i)}var ga=class extends An{constructor(t=new ut,e=new ut,n=new ut,i=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ut){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(kr(t,i.x,s.x,o.x,a.x),kr(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},fh=class extends An{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(kr(t,i.x,s.x,o.x,a.x),kr(t,i.y,s.y,o.y,a.y),kr(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},xa=class extends An{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ph=class extends An{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},va=class extends An{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Nr(t,i.x,s.x,o.x),Nr(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ya=class extends An{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Nr(t,i.x,s.x,o.x),Nr(t,i.y,s.y,o.y),Nr(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_a=class extends An{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Id(a,l.x,c.x,h.x,u.x),Id(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ut().fromArray(i))}return this}},Ma=Object.freeze({__proto__:null,ArcCurve:dh,CatmullRomCurve3:zn,CubicBezierCurve:ga,CubicBezierCurve3:fh,EllipseCurve:Gr,LineCurve:xa,LineCurve3:ph,QuadraticBezierCurve:va,QuadraticBezierCurve3:ya,SplineCurve:_a}),mh=class extends An{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ma[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Ma[i.type]().fromJSON(i))}return this}},Wr=class extends mh{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new xa(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new va(this.currentPoint.clone(),new ut(t,e),new ut(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){let a=new ga(this.currentPoint.clone(),new ut(t,e),new ut(n,i),new ut(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new _a(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){let c=new Gr(t,e,n,i,s,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ks=class r extends Kt{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=$e(i,0,Math.PI*2);let s=[],o=[],a=[],l=[],c=[],h=1/e,u=new I,d=new ut,f=new I,p=new I,x=new I,g=0,m=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-g,f.z=m*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(p)}for(let _=0;_<=e;_++){let v=n+_*h*i,y=Math.sin(v),S=Math.cos(v);for(let b=0;b<=t.length-1;b++){u.x=t[b].x*y,u.y=t[b].y,u.z=t[b].x*S,o.push(u.x,u.y,u.z),d.x=_/e,d.y=b/(t.length-1),a.push(d.x,d.y);let T=l[3*b+0]*y,R=l[3*b+1],w=l[3*b+0]*S;c.push(T,R,w)}}for(let _=0;_<e;_++)for(let v=0;v<t.length-1;v++){let y=v+_*t.length,S=y,b=y+t.length,T=y+t.length+1,R=y+1;s.push(S,b,R),s.push(T,R,b)}this.setIndex(s),this.setAttribute("position",new Ht(o,3)),this.setAttribute("uv",new Ht(a,2)),this.setAttribute("normal",new Ht(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.points,t.segments,t.phiStart,t.phiLength)}},ba=class r extends Ks{constructor(t=1,e=1,n=4,i=8){let s=new Wr;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new r(t.radius,t.length,t.capSegments,t.radialSegments)}},He=class r extends Kt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let s=[],o=[],a=[],l=[],c=new I,h=new ut;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(a,3)),this.setAttribute("uv",new Ht(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ie=class r extends Kt{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],p=0,x=[],g=n/2,m=0;_(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(f,2));function _(){let y=new I,S=new I,b=0,T=(e-t)/n;for(let R=0;R<=s;R++){let w=[],M=R/s,C=M*(e-t)+t;for(let D=0;D<=i;D++){let k=D/i,B=k*l+a,$=Math.sin(B),G=Math.cos(B);S.x=C*$,S.y=-M*n+g,S.z=C*G,u.push(S.x,S.y,S.z),y.set($,T,G).normalize(),d.push(y.x,y.y,y.z),f.push(k,1-M),w.push(p++)}x.push(w)}for(let R=0;R<i;R++)for(let w=0;w<s;w++){let M=x[w][R],C=x[w+1][R],D=x[w+1][R+1],k=x[w][R+1];(t>0||w!==0)&&(h.push(M,C,k),b+=3),(e>0||w!==s-1)&&(h.push(C,D,k),b+=3)}c.addGroup(m,b,0),m+=b}function v(y){let S=p,b=new ut,T=new I,R=0,w=y===!0?t:e,M=y===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;let C=p;for(let D=0;D<=i;D++){let B=D/i*l+a,$=Math.cos(B),G=Math.sin(B);T.x=w*G,T.y=g*M,T.z=w*$,u.push(T.x,T.y,T.z),d.push(0,M,0),b.x=$*.5+.5,b.y=G*.5*M+.5,f.push(b.x,b.y),p++}for(let D=0;D<i;D++){let k=S+D,B=C+D;y===!0?h.push(B,B+1,k):h.push(B+1,B,k),R+=3}c.addGroup(m,R,y===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gh=class r extends Kt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Ht(s,3)),this.setAttribute("normal",new Ht(s.slice(),3)),this.setAttribute("uv",new Ht(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let v=new I,y=new I,S=new I;for(let b=0;b<e.length;b+=3)f(e[b+0],v),f(e[b+1],y),f(e[b+2],S),l(v,y,S,_)}function l(_,v,y,S){let b=S+1,T=[];for(let R=0;R<=b;R++){T[R]=[];let w=_.clone().lerp(y,R/b),M=v.clone().lerp(y,R/b),C=b-R;for(let D=0;D<=C;D++)D===0&&R===b?T[R][D]=w:T[R][D]=w.clone().lerp(M,D/C)}for(let R=0;R<b;R++)for(let w=0;w<2*(b-R)-1;w++){let M=Math.floor(w/2);w%2===0?(d(T[R][M+1]),d(T[R+1][M]),d(T[R][M])):(d(T[R][M+1]),d(T[R+1][M+1]),d(T[R+1][M]))}}function c(_){let v=new I;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(_),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function h(){let _=new I;for(let v=0;v<s.length;v+=3){_.x=s[v+0],_.y=s[v+1],_.z=s[v+2];let y=g(_)/2/Math.PI+.5,S=m(_)/Math.PI+.5;o.push(y,1-S)}p(),u()}function u(){for(let _=0;_<o.length;_+=6){let v=o[_+0],y=o[_+2],S=o[_+4],b=Math.max(v,y,S),T=Math.min(v,y,S);b>.9&&T<.1&&(v<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),S<.2&&(o[_+4]+=1))}}function d(_){s.push(_.x,_.y,_.z)}function f(_,v){let y=_*3;v.x=t[y+0],v.y=t[y+1],v.z=t[y+2]}function p(){let _=new I,v=new I,y=new I,S=new I,b=new ut,T=new ut,R=new ut;for(let w=0,M=0;w<s.length;w+=9,M+=6){_.set(s[w+0],s[w+1],s[w+2]),v.set(s[w+3],s[w+4],s[w+5]),y.set(s[w+6],s[w+7],s[w+8]),b.set(o[M+0],o[M+1]),T.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),S.copy(_).add(v).add(y).divideScalar(3);let C=g(S);x(b,M+0,_,C),x(T,M+2,v,C),x(R,M+4,y,C)}}function x(_,v,y,S){S<0&&_.x===1&&(o[v]=_.x-1),y.x===0&&y.z===0&&(o[v]=S/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.vertices,t.indices,t.radius,t.details)}};var fn=class extends Wr{constructor(t){super(t),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Wr().fromJSON(i))}return this}},zv={triangulate:function(r,t,e=2){let n=t&&t.length,i=n?t[0]*e:r.length,s=uf(r,0,i,e,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,f;if(n&&(s=Yv(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let p=e;p<i;p+=e)u=r[p],d=r[p+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Xr(s,o,e,a,l,f,0),o}};function uf(r,t,e,n,i){let s,o;if(i===iy(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Ld(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Ld(s,r[s],r[s+1],o);return o&&Ua(o,o.next)&&(qr(o),o=o.next),o}function ss(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Ua(e,e.next)||Ie(e.prev,e,e.next)===0)){if(qr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Xr(r,t,e,n,i,s,o){if(!r)return;!o&&s&&Jv(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Gv(r,n,i,s):Vv(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),qr(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=Wv(ss(r),t,e),Xr(r,t,e,n,i,s,2)):o===2&&Xv(r,t,e,n,i,s):Xr(ss(r),t,e,n,i,s,1);break}}}function Vv(r){let t=r.prev,e=r,n=r.next;if(Ie(t,e,n)>=0)return!1;let i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c,p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Bs(i,a,s,l,o,c,p.x,p.y)&&Ie(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Gv(r,t,e,n){let i=r.prev,s=r,o=r.next;if(Ie(i,s,o)>=0)return!1;let a=i.x,l=s.x,c=o.x,h=i.y,u=s.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=xh(f,p,t,e,n),_=xh(x,g,t,e,n),v=r.prevZ,y=r.nextZ;for(;v&&v.z>=m&&y&&y.z<=_;){if(v.x>=f&&v.x<=x&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Bs(a,h,l,u,c,d,v.x,v.y)&&Ie(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Bs(a,h,l,u,c,d,y.x,y.y)&&Ie(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=x&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Bs(a,h,l,u,c,d,v.x,v.y)&&Ie(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=_;){if(y.x>=f&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Bs(a,h,l,u,c,d,y.x,y.y)&&Ie(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Wv(r,t,e){let n=r;do{let i=n.prev,s=n.next.next;!Ua(i,s)&&df(i,n,n.next,s)&&Yr(i,s)&&Yr(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),qr(n),qr(n.next),n=r=s),n=n.next}while(n!==r);return ss(n)}function Xv(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ty(o,a)){let l=ff(o,a);o=ss(o,o.next),l=ss(l,l.next),Xr(o,t,e,n,i,s,0),Xr(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Yv(r,t,e,n){let i=[],s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=uf(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(jv(c));for(i.sort(qv),s=0;s<i.length;s++)e=$v(i[s],e);return e}function qv(r,t){return r.x-t.x}function $v(r,t){let e=Zv(r,t);if(!e)return t;let n=ff(e,r);return ss(n,n.next),ss(e,e.next)}function Zv(r,t){let e=t,n=-1/0,i,s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;let a=i,l=i.x,c=i.y,h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&Bs(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),Yr(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&Kv(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function Kv(r,t){return Ie(r.prev,r,t.prev)<0&&Ie(t.next,r,r.next)<0}function Jv(r,t,e,n){let i=r;do i.z===0&&(i.z=xh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Qv(i)}function Qv(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function xh(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function jv(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Bs(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function ty(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!ey(r,t)&&(Yr(r,t)&&Yr(t,r)&&ny(r,t)&&(Ie(r.prev,r,t.prev)||Ie(r,t.prev,t))||Ua(r,t)&&Ie(r.prev,r,r.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Ua(r,t){return r.x===t.x&&r.y===t.y}function df(r,t,e,n){let i=Yo(Ie(r,t,e)),s=Yo(Ie(r,t,n)),o=Yo(Ie(e,n,r)),a=Yo(Ie(e,n,t));return!!(i!==s&&o!==a||i===0&&Xo(r,e,t)||s===0&&Xo(r,n,t)||o===0&&Xo(e,r,n)||a===0&&Xo(e,t,n))}function Xo(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Yo(r){return r>0?1:r<0?-1:0}function ey(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&df(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Yr(r,t){return Ie(r.prev,r,r.next)<0?Ie(r,t,r.next)>=0&&Ie(r,r.prev,t)>=0:Ie(r,t,r.prev)<0||Ie(r,r.next,t)<0}function ny(r,t){let e=r,n=!1,i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function ff(r,t){let e=new vh(r.i,r.x,r.y),n=new vh(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ld(r,t,e,n){let i=new vh(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function qr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function vh(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function iy(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}var Li=class r{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return r.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];Dd(t),Ud(n,t);let o=t.length;e.forEach(Dd);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Ud(n,e[l]);let a=zv.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Dd(r){let t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Ud(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}var rs=class r extends Kt{constructor(t=new fn([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Ht(i,3)),this.setAttribute("uv",new Ht(s,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:sy,v,y=!1,S,b,T,R;m&&(v=m.getSpacedPoints(h),y=!0,d=!1,S=m.computeFrenetFrames(h,!1),b=new I,T=new I,R=new I),d||(g=0,f=0,p=0,x=0);let w=a.extractPoints(c),M=w.shape,C=w.holes;if(!Li.isClockWise(M)){M=M.reverse();for(let et=0,lt=C.length;et<lt;et++){let L=C[et];Li.isClockWise(L)&&(C[et]=L.reverse())}}let k=Li.triangulateShape(M,C),B=M;for(let et=0,lt=C.length;et<lt;et++){let L=C[et];M=M.concat(L)}function $(et,lt,L){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(lt,L)}let G=M.length,ct=k.length;function H(et,lt,L){let Bt,N,nt,W=et.x-lt.x,Q=et.y-lt.y,K=L.x-et.x,A=L.y-et.y,E=W*W+Q*Q,U=W*A-Q*K;if(Math.abs(U)>Number.EPSILON){let z=Math.sqrt(E),tt=Math.sqrt(K*K+A*A),j=lt.x-Q/z,bt=lt.y+W/z,mt=L.x-A/tt,ft=L.y+K/tt,xt=((mt-j)*A-(ft-bt)*K)/(W*A-Q*K);Bt=j+W*xt-et.x,N=bt+Q*xt-et.y;let st=Bt*Bt+N*N;if(st<=2)return new ut(Bt,N);nt=Math.sqrt(st/2)}else{let z=!1;W>Number.EPSILON?K>Number.EPSILON&&(z=!0):W<-Number.EPSILON?K<-Number.EPSILON&&(z=!0):Math.sign(Q)===Math.sign(A)&&(z=!0),z?(Bt=-Q,N=W,nt=Math.sqrt(E)):(Bt=W,N=Q,nt=Math.sqrt(E/2))}return new ut(Bt/nt,N/nt)}let X=[];for(let et=0,lt=B.length,L=lt-1,Bt=et+1;et<lt;et++,L++,Bt++)L===lt&&(L=0),Bt===lt&&(Bt=0),X[et]=H(B[et],B[L],B[Bt]);let gt=[],_t,wt=X.concat();for(let et=0,lt=C.length;et<lt;et++){let L=C[et];_t=[];for(let Bt=0,N=L.length,nt=N-1,W=Bt+1;Bt<N;Bt++,nt++,W++)nt===N&&(nt=0),W===N&&(W=0),_t[Bt]=H(L[Bt],L[nt],L[W]);gt.push(_t),wt=wt.concat(_t)}for(let et=0;et<g;et++){let lt=et/g,L=f*Math.cos(lt*Math.PI/2),Bt=p*Math.sin(lt*Math.PI/2)+x;for(let N=0,nt=B.length;N<nt;N++){let W=$(B[N],X[N],Bt);O(W.x,W.y,-L)}for(let N=0,nt=C.length;N<nt;N++){let W=C[N];_t=gt[N];for(let Q=0,K=W.length;Q<K;Q++){let A=$(W[Q],_t[Q],Bt);O(A.x,A.y,-L)}}}let It=p+x;for(let et=0;et<G;et++){let lt=d?$(M[et],wt[et],It):M[et];y?(T.copy(S.normals[0]).multiplyScalar(lt.x),b.copy(S.binormals[0]).multiplyScalar(lt.y),R.copy(v[0]).add(T).add(b),O(R.x,R.y,R.z)):O(lt.x,lt.y,0)}for(let et=1;et<=h;et++)for(let lt=0;lt<G;lt++){let L=d?$(M[lt],wt[lt],It):M[lt];y?(T.copy(S.normals[et]).multiplyScalar(L.x),b.copy(S.binormals[et]).multiplyScalar(L.y),R.copy(v[et]).add(T).add(b),O(R.x,R.y,R.z)):O(L.x,L.y,u/h*et)}for(let et=g-1;et>=0;et--){let lt=et/g,L=f*Math.cos(lt*Math.PI/2),Bt=p*Math.sin(lt*Math.PI/2)+x;for(let N=0,nt=B.length;N<nt;N++){let W=$(B[N],X[N],Bt);O(W.x,W.y,u+L)}for(let N=0,nt=C.length;N<nt;N++){let W=C[N];_t=gt[N];for(let Q=0,K=W.length;Q<K;Q++){let A=$(W[Q],_t[Q],Bt);y?O(A.x,A.y+v[h-1].y,v[h-1].x+L):O(A.x,A.y,u+L)}}}J(),dt();function J(){let et=i.length/3;if(d){let lt=0,L=G*lt;for(let Bt=0;Bt<ct;Bt++){let N=k[Bt];Z(N[2]+L,N[1]+L,N[0]+L)}lt=h+g*2,L=G*lt;for(let Bt=0;Bt<ct;Bt++){let N=k[Bt];Z(N[0]+L,N[1]+L,N[2]+L)}}else{for(let lt=0;lt<ct;lt++){let L=k[lt];Z(L[2],L[1],L[0])}for(let lt=0;lt<ct;lt++){let L=k[lt];Z(L[0]+G*h,L[1]+G*h,L[2]+G*h)}}n.addGroup(et,i.length/3-et,0)}function dt(){let et=i.length/3,lt=0;F(B,lt),lt+=B.length;for(let L=0,Bt=C.length;L<Bt;L++){let N=C[L];F(N,lt),lt+=N.length}n.addGroup(et,i.length/3-et,1)}function F(et,lt){let L=et.length;for(;--L>=0;){let Bt=L,N=L-1;N<0&&(N=et.length-1);for(let nt=0,W=h+g*2;nt<W;nt++){let Q=G*nt,K=G*(nt+1),A=lt+Bt+Q,E=lt+N+Q,U=lt+N+K,z=lt+Bt+K;ht(A,E,U,z)}}}function O(et,lt,L){l.push(et),l.push(lt),l.push(L)}function Z(et,lt,L){it(et),it(lt),it(L);let Bt=i.length/3,N=_.generateTopUV(n,i,Bt-3,Bt-2,Bt-1);Rt(N[0]),Rt(N[1]),Rt(N[2])}function ht(et,lt,L,Bt){it(et),it(lt),it(Bt),it(lt),it(L),it(Bt);let N=i.length/3,nt=_.generateSideWallUV(n,i,N-6,N-3,N-2,N-1);Rt(nt[0]),Rt(nt[1]),Rt(nt[3]),Rt(nt[1]),Rt(nt[2]),Rt(nt[3])}function it(et){i.push(l[et*3+0]),i.push(l[et*3+1]),i.push(l[et*3+2])}function Rt(et){s.push(et.x),s.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ry(e,n,t)}static fromJSON(t,e){let n=[];for(let s=0,o=t.shapes.length;s<o;s++){let a=e[t.shapes[s]];n.push(a)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ma[i.type]().fromJSON(i)),new r(n,t.options)}},sy={generateTopUV:function(r,t,e,n,i){let s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ut(s,o),new ut(a,l),new ut(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],x=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ut(o,1-l),new ut(c,1-u),new ut(d,1-p),new ut(x,1-m)]:[new ut(a,1-l),new ut(h,1-u),new ut(f,1-p),new ut(g,1-m)]}};function ry(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var wa=class r extends gh{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new r(t.radius,t.detail)}};var Sa=class r extends Kt{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/i,f=new I,p=new ut;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let m=s+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let x=0;x<i;x++){let g=x*(n+1);for(let m=0;m<n;m++){let _=m+g,v=_,y=_+n+1,S=_+n+2,b=_+1;a.push(v,y,b),a.push(y,S,b)}}this.setIndex(a),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(c,3)),this.setAttribute("uv",new Ht(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},$r=class r extends Kt{constructor(t=new fn([new ut(0,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],s=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ht(i,3)),this.setAttribute("normal",new Ht(s,3)),this.setAttribute("uv",new Ht(o,2));function c(h){let u=i.length/3,d=h.extractPoints(e),f=d.shape,p=d.holes;Li.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let _=p[g];Li.isClockWise(_)===!0&&(p[g]=_.reverse())}let x=Li.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let _=p[g];f=f.concat(_)}for(let g=0,m=f.length;g<m;g++){let _=f[g];i.push(_.x,_.y,0),s.push(0,0,1),o.push(_.x,_.y)}for(let g=0,m=x.length;g<m;g++){let _=x[g],v=_[0]+u,y=_[1]+u,S=_[2]+u;n.push(v,y,S),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return oy(e,t)}static fromJSON(t,e){let n=[];for(let i=0,s=t.shapes.length;i<s;i++){let o=e[t.shapes[i]];n.push(o)}return new r(n,t.curveSegments)}};function oy(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){let i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}var We=class r extends Kt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new I,d=new I,f=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let _=[],v=m/n,y=0;m===0&&o===0?y=.5/e:m===n&&l===Math.PI&&(y=-.5/e);for(let S=0;S<=e;S++){let b=S/e;u.x=-t*Math.cos(i+b*s)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(i+b*s)*Math.sin(o+v*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(b+y,1-v),_.push(c++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){let v=h[m][_+1],y=h[m][_],S=h[m+1][_],b=h[m+1][_+1];(m!==0||o>0)&&f.push(v,y,b),(m!==n-1||l<Math.PI)&&f.push(y,S,b)}this.setIndex(f),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Rn=class r extends Kt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new I,u=new I,d=new I;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){let x=p/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){let x=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,_=(i+1)*f+p;o.push(x,g,_),o.push(g,m,_)}this.setIndex(o),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var jn=class r extends Kt{constructor(t=new ya(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};let o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new I,l=new I,c=new ut,h=new I,u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(f,2));function x(){for(let v=0;v<e;v++)g(v);g(s===!1?e:0),_(),m()}function g(v){h=t.getPointAt(v/e,h);let y=o.normals[v],S=o.binormals[v];for(let b=0;b<=i;b++){let T=b/i*Math.PI*2,R=Math.sin(T),w=-Math.cos(T);l.x=w*y.x+R*S.x,l.y=w*y.y+R*S.y,l.z=w*y.z+R*S.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=e;v++)for(let y=1;y<=i;y++){let S=(i+1)*(v-1)+(y-1),b=(i+1)*v+(y-1),T=(i+1)*v+y,R=(i+1)*(v-1)+y;p.push(S,b,R),p.push(b,T,R)}}function _(){for(let v=0;v<=e;v++)for(let y=0;y<=i;y++)c.x=v/e,c.y=y/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new r(new Ma[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Ea=class extends ve{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}},Pt=class extends Kn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jd,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Vn=class extends Pt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new St(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new St(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new St(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function qo(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function ay(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Js=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yh=class extends Js{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tu,endingEnd:Tu}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Au:s=t,a=2*e-n;break;case Ru:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Au:o=t,l=2*n-e;break;case Ru:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),x=p*p,g=x*p,m=-d*g+2*d*x-d*p,_=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*p+1,v=(-1-f)*g+(1.5+f)*x+.5*p,y=f*g-f*x;for(let S=0;S!==a;++S)s[S]=m*o[h+S]+_*o[c+S]+v*o[l+S]+y*o[u+S];return s}},_h=class extends Js{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},Mh=class extends Js{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Gn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=qo(e,this.TimeBufferType),this.values=qo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:qo(t.times,Array),values:qo(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Mh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new _h(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new yh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case jo:e=this.InterpolantFactoryMethodDiscrete;break;case Wc:e=this.InterpolantFactoryMethodLinear;break;case Sl:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return jo;case this.InterpolantFactoryMethodLinear:return Wc;case this.InterpolantFactoryMethodSmooth:return Sl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&ay(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Sl,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let x=e[u+p];if(x!==e[d+p]||x!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Gn.prototype.TimeBufferType=Float32Array;Gn.prototype.ValueBufferType=Float32Array;Gn.prototype.DefaultInterpolation=Wc;var os=class extends Gn{constructor(t,e,n){super(t,e,n)}};os.prototype.ValueTypeName="bool";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=jo;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;var bh=class extends Gn{};bh.prototype.ValueTypeName="color";var wh=class extends Gn{};wh.prototype.ValueTypeName="number";var Sh=class extends Js{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ze.slerpFlat(s,0,o,c-a,o,c,l);return s}},Ta=class extends Gn{InterpolantFactoryMethodLinear(t){return new Sh(this.times,this.values,this.getValueSize(),t)}};Ta.prototype.ValueTypeName="quaternion";Ta.prototype.InterpolantFactoryMethodSmooth=void 0;var as=class extends Gn{constructor(t,e,n){super(t,e,n)}};as.prototype.ValueTypeName="string";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=jo;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;var Eh=class extends Gn{};Eh.prototype.ValueTypeName="vector";var Th=class{constructor(t,e,n){let i=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}},ly=new Th,Ah=class{constructor(t){this.manager=t!==void 0?t:ly,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ah.DEFAULT_MATERIAL_NAME="__DEFAULT";var Qs=class extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},js=class extends Qs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},sc=new Qt,Nd=new I,kd=new I,Zr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Or,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Nd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nd),kd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kd),e.updateMatrixWorld(),sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Rh=class extends Zr{constructor(){super(new Be(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=ea*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},ls=class extends Qs{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Rh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Bd=new Qt,Ir=new I,rc=new I,Ch=class extends Zr{constructor(){super(new Be(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new Me(2,1,1,1),new Me(0,1,1,1),new Me(3,1,1,1),new Me(1,1,1,1),new Me(3,0,1,1),new Me(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ir.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ir),rc.copy(n.position),rc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(rc),n.updateMatrixWorld(),i.makeTranslation(-Ir.x,-Ir.y,-Ir.z),Bd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bd)}},Aa=class extends Qs{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ch}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ph=class extends Zr{constructor(){super(new $s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ra=class extends Qs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new Ph}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Ca=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Fd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Fd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Fd(){return performance.now()}var $h="\\[\\]\\.:\\/",cy=new RegExp("["+$h+"]","g"),Zh="[^"+$h+"]",hy="[^"+$h.replace("\\.","")+"]",uy=/((?:WC+[\/:])*)/.source.replace("WC",Zh),dy=/(WCOD+)?/.source.replace("WCOD",hy),fy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zh),py=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zh),my=new RegExp("^"+uy+dy+fy+py+"$"),gy=["material","materials","bones","map"],Ih=class{constructor(t,e,n){let i=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cy,"")}static parseTrackName(t){let e=my.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);gy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=Ih;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var n_=new Float32Array(1);var Od=new Qt,Pa=class{constructor(t,e,n=0,i=1/0){this.ray=new Ys(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Fr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Od.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Od),this}intersectObject(t,e=!0,n=[]){return Lh(t,this,n,e),n.sort(Hd),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Lh(t[i],this,n,e);return n.sort(Hd),n}};function Hd(r,t){return r.distance-t.distance}function Lh(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)Lh(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var vt=(r,t,e)=>r<t?t:r>e?e:r,Tt=(r,t,e)=>r+(t-r)*e,xy=(r,t,e)=>vt((e-r)/(t-r),0,1),ae=(r,t,e)=>{let n=xy(r,t,e);return n*n*(3-2*n)},Pn=(r,t,e,n)=>Tt(r,t,1-Math.exp(-e*n)),vy=r=>{for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;return r},pf=(r,t,e,n)=>r+vy(t-r)*(1-Math.exp(-e*n)),In=2.2369363,cs=3.6,hs=1/In,Kh=1/1609.344;function Xe(r){let t=r>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function gi(r,t=0,e=0){let n=(r|0)*374761393+(t|0)*668265263+(e|0)*2147483647;return n=(n^n>>>13)*1274126177,n=n^n>>>16,(n>>>0)/4294967296}function Bi(r,t=0){let e=Math.floor(r),n=r-e,i=n*n*(3-2*n),s=gi(e,t)*2-1,o=gi(e+1,t)*2-1;return s+(o-s)*i}function Fi(r,t,e=0){let n=Math.floor(r),i=Math.floor(t),s=r-n,o=t-i,a=s*s*(3-2*s),l=o*o*(3-2*o),c=gi(n,i,e),h=gi(n+1,i,e),u=gi(n,i+1,e),d=gi(n+1,i+1,e);return(c+(h-c)*a+(u-c)*l+(c-h-u+d)*a*l)*2-1}function mf(r,t,e=0,n=4){let i=.5,s=1,o=0,a=0;for(let l=0;l<n;l++)o+=i*Fi(r*s,t*s,e+l*17),a+=i,i*=.5,s*=2.03;return o/a}function Jh(r,t){let e=0;for(let i of r)e+=i[1];let n=t*e;for(let i of r)if(n-=i[1],n<=0)return i[0];return r[r.length-1][0]}function Qh(r){let t=r.length,e=r.map(o=>o[0]),n=r.map(o=>o[1]),i=new Array(t-1),s=new Array(t);for(let o=0;o<t-1;o++)i[o]=(n[o+1]-n[o])/(e[o+1]-e[o]||1e-6);s[0]=i[0],s[t-1]=i[t-2];for(let o=1;o<t-1;o++)s[o]=i[o-1]*i[o]<=0?0:(i[o-1]+i[o])/2;for(let o=0;o<t-1;o++){if(i[o]===0){s[o]=0,s[o+1]=0;continue}let a=s[o]/i[o],l=s[o+1]/i[o],c=a*a+l*l;if(c>9){let h=3/Math.sqrt(c);s[o]=h*a*i[o],s[o+1]=h*l*i[o]}}return o=>{if(o<=e[0])return n[0];if(o>=e[t-1])return n[t-1];let a=0;for(;a<t-2&&o>e[a+1];)a++;let l=e[a+1]-e[a],c=(o-e[a])/l,h=c*c,u=h*c;return(2*u-3*h+1)*n[a]+(u-2*h+c)*l*s[a]+(-2*u+3*h)*n[a+1]+(u-h)*l*s[a+1]}}function jh(r,t){if(t<=r[0][0])return r[0][1];for(let e=1;e<r.length;e++)if(t<=r[e][0]){let[n,i]=r[e-1],[s,o]=r[e];return i+(o-i)*(t-n)/(s-n)}return r[r.length-1][1]}function Fe(r){return Math.floor(r).toLocaleString("en-US")}function gf(r){r=Math.max(0,r);let t=Math.floor(r/60),e=Math.floor(r%60),n=Math.floor(r*10%10);return`${t}:${e.toString().padStart(2,"0")}.${n}`}var Je=2,Na=class{constructor(){this.configure({road:{}},1)}configure(t,e){let n=t.road||{};this.p={straightMin:n.straightMin??250,straightMax:n.straightMax??900,radiusMin:n.radiusMin??900,radiusMax:n.radiusMax??2600,curveMin:n.curveMin??150,curveMax:n.curveMax??500,transition:n.transition??140,gradeMax:n.gradeMax??.025,holdMin:n.holdMin??200,holdMax:n.holdMax??700},this.rng=Xe(e*7919+13),this.X=[0],this.Y=[0],this.E=[0],this.H=[0],this.base=0,this.state={x:0,y:0,e:0,h:0},this.kQueue=[{len:420,k0:0,k1:0,pos:0}],this.gQueue=[{len:500,g0:0,g1:0,pos:0}],this.curGrade=0}get sMax(){return(this.base+this.X.length-1)*Je}get sMin(){return this.base*Je}_planCurve(){let t=this.p,e=this.rng,n=Tt(t.straightMin,t.straightMax,e());this.kQueue.push({len:n,k0:0,k1:0,pos:0});let i=Tt(t.radiusMin,t.radiusMax,e()*e()),s=e()<.5?-1:1,o=s/i,a=t.transition*(.7+e()*.6);if(this.kQueue.push({len:a,k0:0,k1:o,pos:0}),this.kQueue.push({len:Tt(t.curveMin,t.curveMax,e()),k0:o,k1:o,pos:0}),e()<.3){let l=-s/Tt(t.radiusMin,t.radiusMax,e());this.kQueue.push({len:a*1.6,k0:o,k1:l,pos:0}),this.kQueue.push({len:Tt(t.curveMin,t.curveMax,e())*.7,k0:l,k1:l,pos:0}),this.kQueue.push({len:a,k0:l,k1:0,pos:0})}else this.kQueue.push({len:a,k0:o,k1:0,pos:0})}_planGrade(){let t=this.p,e=this.rng,n=vt(-this.state.e/400,-1,1)*t.gradeMax*.6,i=vt((e()*2-1)*t.gradeMax+n,-t.gradeMax,t.gradeMax);this.gQueue.push({len:160+e()*160,g0:this.curGrade,g1:i,pos:0}),this.gQueue.push({len:Tt(t.holdMin,t.holdMax,e()),g0:i,g1:i,pos:0}),this.curGrade=i}_step(){this.kQueue.length||this._planCurve(),this.gQueue.length||this._planGrade();let t=this.kQueue[0],e=this.gQueue[0],n=Tt(t.k0,t.k1,vt(t.pos/t.len,0,1)),i=Tt(e.g0,e.g1,vt(e.pos/e.len,0,1));t.pos+=Je,e.pos+=Je,t.pos>=t.len&&this.kQueue.shift(),e.pos>=e.len&&this.gQueue.shift();let s=this.state,o=s.h+n*Je*.5;s.x+=Math.sin(o)*Je,s.y+=Math.cos(o)*Je,s.h+=n*Je,s.e+=i*Je,this.X.push(s.x),this.Y.push(s.y),this.E.push(s.e),this.H.push(s.h)}ensure(t){for(;this.sMax<t;)this._step()}trim(t){let e=Math.floor(t/Je)-this.base;e>600&&(this.X.splice(0,e),this.Y.splice(0,e),this.E.splice(0,e),this.H.splice(0,e),this.base+=e)}sample(t,e={}){t>this.sMax&&this.ensure(t+50);let n=t/Je-this.base;n<0&&(n=0);let i=Math.floor(n),s=this.X.length;i>=s-1&&(i=s-2);let o=n-i;return e.X=this.X[i]+(this.X[i+1]-this.X[i])*o,e.Y=this.Y[i]+(this.Y[i+1]-this.Y[i])*o,e.E=this.E[i]+(this.E[i+1]-this.E[i])*o,e.H=this.H[i]+(this.H[i+1]-this.H[i])*o,e.G=(this.E[i+1]-this.E[i])/Je,e.K=(this.H[i+1]-this.H[i])/Je,e}pos(t,e,n={}){this.sample(t,n);let i=Math.cos(n.H),s=Math.sin(n.H);return n.X+=i*e,n.Y-=s*e,n}project(t,e,n,i={}){let s=n,o=this._tmp||(this._tmp={});for(let c=0;c<3;c++){this.sample(s,o);let h=Math.sin(o.H),u=Math.cos(o.H),d=t-o.X,f=e-o.Y,p=Math.max(-150,Math.min(150,d*h+f*u));if(s+=p,Math.abs(p)<.01)break}this.sample(s,o);let a=Math.cos(o.H),l=-Math.sin(o.H);return i.s=s,i.d=(t-o.X)*a+(e-o.Y)*l,i.H=o.H,i.E=o.E,i.G=o.G,i}};function xf(r){let e=r.lanes,n=.35,i=n+1.5,s=i+e*3.7,o=s+(r.outerShoulder??3);return{LW:3.7,n:e,medianHalf:n,laneStart:i,lanesEnd:s,roadEdge:o,wallD:o+.3,oppLanes:r.oppLanes??e,laneCenter:a=>i+(a+.5)*3.7,laneOf:a=>vt(Math.floor((a-i)/3.7),0,e-1)}}var tu={anisotropy:4};function Ne(r,t){let e=document.createElement("canvas");return e.width=r,e.height=t,e}function Pe(r,{srgb:t=!0,repeat:e=!0,aniso:n=!0}={}){let i=new Mn(r);return t&&(i.colorSpace=Ce),e&&(i.wrapS=i.wrapT=_n),n&&(i.anisotropy=tu.anisotropy),i.needsUpdate=!0,i}function Oi(r,t,e,n=4,i=.5){let s=new Float32Array(r*r),o=Xe(e),a=1,l=0;for(let c=0;c<n;c++){let h=t<<c,u=new Float32Array(h*h);for(let f=0;f<u.length;f++)u[f]=o();let d=h/r;for(let f=0;f<r;f++){let p=f*d,x=Math.floor(p),g=p-x;g=g*g*(3-2*g);let m=x%h*h,_=(x+1)%h*h;for(let v=0;v<r;v++){let y=v*d,S=Math.floor(y),b=y-S;b=b*b*(3-2*b);let T=S%h,R=(S+1)%h,w=u[m+T],M=u[m+R],C=u[_+T],D=u[_+R];s[f*r+v]+=a*(w+(M-w)*b+(C-w)*g+(w-M-C+D)*b*g)}}l+=a,a*=i}for(let c=0;c<s.length;c++)s[c]/=l;return s}function yy(r,t,e){let n=Ne(t,t),i=n.getContext("2d"),s=i.createImageData(t,t);for(let o=0;o<t;o++)for(let a=0;a<t;a++){let l=r[o*t+(a-1+t)%t],c=r[o*t+(a+1)%t],h=r[(o-1+t)%t*t+a],u=r[(o+1)%t*t+a],d=(l-c)*e,f=(u-h)*e,p=1,x=Math.hypot(d,f,p),g=(o*t+a)*4;s.data[g]=(d/x*.5+.5)*255,s.data[g+1]=(f/x*.5+.5)*255,s.data[g+2]=(p/x*.5+.5)*255,s.data[g+3]=255}return i.putImageData(s,0,0),n}function yf(r,t=1){let n=Xe(t*31+7),i=Oi(1024,128,t+1,2,.6),s=Oi(1024,6,t+2,4,.55),o=Ne(1024,1024),a=o.getContext("2d"),l=a.createImageData(1024,1024),c=r==="concrete",h=new Float32Array(1024*1024),u=new Uint8ClampedArray(1024*1024);for(let v=0;v<1024*1024;v++){let y=i[v],S=s[v],b;c?(b=.8+(S-.5)*.16+(y-.5)*.1,n()<.012&&(b-=.12*n())):(b=.62+(S-.5)*.2+(y-.5)*.3,n()<.03&&(b+=.25*n()));let T=b*255;l.data[v*4]=T,l.data[v*4+1]=T,l.data[v*4+2]=T*(c?.985:1.01),l.data[v*4+3]=255,h[v]=y*.8+S*.2,u[v]=210+(y-.5)*60}a.putImageData(l,0,0),a.lineCap="round";let d=c?5:9;for(let v=0;v<d;v++){a.strokeStyle=c?"rgba(60,58,55,0.35)":"rgba(18,18,20,0.55)",a.lineWidth=c?1.5:2+n()*3,a.beginPath();let y=n()*1024,S=n()*1024;a.moveTo(y,S);let b=6+n()*10,T=n()*Math.PI*2;for(let R=0;R<b;R++)T+=(n()-.5)*1.4,y+=Math.cos(T)*28,S+=Math.sin(T)*28,a.lineTo(y,S);a.stroke()}if(!c)for(let v=0;v<3;v++){a.fillStyle=`rgba(30,30,32,${.12+n()*.12})`;let y=80+n()*220,S=60+n()*240;a.fillRect(n()*1024,n()*1024,y,S)}if(c){for(let v of[0,1024/2])a.fillStyle="rgba(45,43,40,0.75)",a.fillRect(0,v,1024,3),a.fillStyle="rgba(255,255,255,0.08)",a.fillRect(0,v+3,1024,2);a.fillStyle="rgba(0,0,0,0.035)";for(let v=0;v<1024;v+=6)a.fillRect(v,0,2,1024)}let f=Pe(o),p=Pe(yy((h.map,h),1024,c?1.5:3),{srgb:!1}),x=Ne(1024,1024),g=x.getContext("2d"),m=g.createImageData(1024,1024);for(let v=0;v<1024*1024;v++)m.data[v*4]=m.data[v*4+1]=m.data[v*4+2]=u[v],m.data[v*4+3]=255;g.putImageData(m,0,0);let _=Pe(x,{srgb:!1});return{map:f,normalMap:p,roughnessMap:_}}function _f(r=5){let e=Oi(512,8,r,5,.55),n=Oi(512,96,r+3,2,.5),i=Ne(512,512),s=i.getContext("2d"),o=s.createImageData(512,512);for(let l=0;l<512*512;l++){let c=.78+(e[l]-.5)*.22+(n[l]-.5)*.08;o.data[l*4]=c*255,o.data[l*4+1]=c*252,o.data[l*4+2]=c*246,o.data[l*4+3]=255}s.putImageData(o,0,0);let a=Xe(r);for(let l=0;l<40;l++){let c=a()*512,h=2+a()*10,u=s.createLinearGradient(0,0,0,512);u.addColorStop(0,"rgba(40,38,34,0.20)"),u.addColorStop(1,"rgba(40,38,34,0)"),s.fillStyle=u,s.fillRect(c,0,h,512*(.3+a()*.7))}return s.fillStyle="rgba(0,0,0,0.25)",s.fillRect(0,0,2,512),s.fillRect(512/2,0,1,512),Pe(i)}function Mf(r=9){let e=Oi(512,16,r,4,.5),n=Ne(512,512),i=n.getContext("2d"),s=i.createImageData(512,512);for(let l=0;l<512*512;l++){let c=.82+(e[l]-.5)*.18;s.data[l*4]=s.data[l*4+1]=s.data[l*4+2]=c*255,s.data[l*4+3]=255}i.putImageData(s,0,0);let o=8,a=4;i.strokeStyle="rgba(60,55,50,0.45)",i.lineWidth=3;for(let l=0;l<o;l++){let c=l/o*512;i.beginPath(),i.moveTo(0,c),i.lineTo(512,c),i.stroke();for(let h=0;h<=a;h++){let u=(h+l%2*.5)/a*512;i.beginPath(),i.moveTo(u,c),i.lineTo(u,c+512/o),i.stroke()}}return Pe(n)}function bf(r=11){let e=Oi(512,8,r,5,.6),n=Oi(512,128,r+1,2,.6),i=Ne(512,512),s=i.getContext("2d"),o=s.createImageData(512,512);for(let a=0;a<512*512;a++){let l=.7+(e[a]-.5)*.45+(n[a]-.5)*.3;o.data[a*4]=l*255,o.data[a*4+1]=l*255,o.data[a*4+2]=l*250,o.data[a*4+3]=255}return s.putImageData(o,0,0),Pe(i)}function wf(r,t){let i=Xe(t),s=Ne(256,512),o=Ne(256,512),a=s.getContext("2d"),l=o.getContext("2d"),c={low:["#cdbf9f","#bfae8c","#d8cfbd","#a99b85"],warehouse:["#9b9a92","#b2aa99","#8e8a80"],mid:["#c8c3b8","#a7a39b","#d7d1c3","#8f949a"],tower:["#6f7c88","#8a96a0","#5b6670","#9aa4ab"],tall:["#4e5b68","#64717c","#3f4a55"],glass:["#3f5a70","#2e4a63","#4b6a80"]},h=c[r][Math.floor(i()*c[r].length)];a.fillStyle=h,a.fillRect(0,0,256,512),l.fillStyle="#000",l.fillRect(0,0,256,512);let u=r==="low"?4:r==="warehouse"?3:16,d=r==="warehouse"?6:r==="low"?5:8,f=512/u,p=256/d,x=r==="glass"||r==="tall";for(let g=0;g<u;g++){for(let m=0;m<d;m++){let _=m*p,v=g*f;if(r==="warehouse"){g===u-1&&m%2===0&&(a.fillStyle="#5b5d60",a.fillRect(_+4,v+f*.2,p-8,f*.8));continue}let y=x?2:p*.18,S=x?2:f*.22,b=30+i()*40;a.fillStyle=x?`rgb(${b+40},${b+70},${b+95})`:`rgb(${b+20},${b+35},${b+50})`,a.fillRect(_+y,v+S,p-y*2,f-S*1.6);let T=a.createLinearGradient(_,v,_+p,v+f);if(T.addColorStop(0,"rgba(255,255,255,0.18)"),T.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=T,a.fillRect(_+y,v+S,p-y*2,f-S*1.6),i()<(r==="low"?.35:.5)){let w=i()<.7,M=.5+i()*.5;l.fillStyle=w?`rgb(${255*M},${200*M},${130*M})`:`rgb(${190*M},${220*M},${255*M})`,l.fillRect(_+y,v+S,p-y*2,f-S*1.6)}}!x&&r!=="warehouse"&&(a.fillStyle="rgba(0,0,0,0.12)",a.fillRect(0,g*f,256,2))}if(x){a.fillStyle="rgba(20,25,30,0.6)";for(let g=0;g<=d;g++)a.fillRect(g*p-1,0,2,512)}return{map:Pe(s),emissive:Pe(o)}}function Sf(r,t,e,n=1){let o=Ne(512,300),a=o.getContext("2d"),l=/^Exit/i.test(r);a.fillStyle="#0b6b3a",a.fillRect(0,0,512,300),a.strokeStyle="#f2f2ee",a.lineWidth=8,by(a,10,10,492,280,18),a.stroke(),a.fillStyle="#f4f4f0",a.textAlign="center",a.textBaseline="middle",t&&(_y(a,512/2-(e?50:0),78,t),e&&(a.font='bold 44px "Barlow Condensed", "Arial Narrow", Arial, sans-serif',a.fillStyle="#f4f4f0",a.fillText(e==="N"?"NORTH":e==="S"?"SOUTH":e==="E"?"EAST":"WEST",512/2+70,80))),a.fillStyle="#f4f4f0",a.font=`600 ${r.length>14?56:66}px "Barlow Condensed", "Arial Narrow", Arial, sans-serif`,a.fillText(r,512/2,t?185:130);let c=Xe(n),h=l?1:1+Math.floor(c()*2);for(let u=0;u<h;u++){let d=256+(u-(h-1)/2)*110;My(a,d,t?250:220)}return l&&(a.fillStyle="#f2c230",a.fillRect(512/2-110,242,220,44),a.fillStyle="#111",a.font='bold 34px "Barlow Condensed", Arial, sans-serif',a.fillText("EXIT ONLY",512/2,264)),Pe(o,{repeat:!1})}function _y(r,t,e,n){r.save(),r.translate(t,e),r.fillStyle="#f4f4f0",r.beginPath(),r.moveTo(-46,-46),r.quadraticCurveTo(0,-36,46,-46),r.quadraticCurveTo(54,10,0,50),r.quadraticCurveTo(-54,10,-46,-46),r.fill(),r.fillStyle="#1f4ea3",r.beginPath(),r.moveTo(-40,-22),r.lineTo(40,-22),r.quadraticCurveTo(44,14,0,44),r.quadraticCurveTo(-44,14,-40,-22),r.fill(),r.fillStyle="#c8262c",r.beginPath(),r.moveTo(-41,-40),r.quadraticCurveTo(0,-31,41,-40),r.lineTo(40,-26),r.lineTo(-40,-26),r.fill(),r.fillStyle="#f4f4f0",r.font='bold 36px "Barlow Condensed", Arial, sans-serif',r.textAlign="center",r.textBaseline="middle",r.fillText(n,0,10),r.restore()}function My(r,t,e){r.fillStyle="#f4f4f0",r.fillRect(t-7,e-26,14,30),r.beginPath(),r.moveTo(t-22,e),r.lineTo(t+22,e),r.lineTo(t,e+24),r.fill()}function by(r,t,e,n,i,s){r.beginPath(),r.moveTo(t+s,e),r.arcTo(t+n,e,t+n,e+i,s),r.arcTo(t+n,e+i,t,e+i,s),r.arcTo(t,e+i,t,e,s),r.arcTo(t,e,t+n,e,s),r.closePath()}function Ef(){let r=Ne(128,160),t=r.getContext("2d");return t.fillStyle="#f2f2ee",t.fillRect(0,0,128,160),t.strokeStyle="#111",t.lineWidth=5,t.strokeRect(6,6,116,148),t.fillStyle="#111",t.textAlign="center",t.font="bold 22px Arial, sans-serif",t.fillText("SPEED",64,36),t.fillText("LIMIT",64,60),t.font="bold 70px Arial, sans-serif",t.fillText("65",64,130),Pe(r,{repeat:!1})}function Fa(r,t="ca"){let e=Ne(256,128),n=e.getContext("2d");return t==="jdm"?(n.fillStyle="#f0f0e8",n.fillRect(0,0,256,128),n.strokeStyle="#2a6b3a",n.lineWidth=6,n.strokeRect(3,3,250,122),n.fillStyle="#2a6b3a"):t==="yellow"?(n.fillStyle="#f2c230",n.fillRect(0,0,256,128),n.fillStyle="#111"):(n.fillStyle="#f4f4f2",n.fillRect(0,0,256,128),n.fillStyle="#b32020",n.font="italic bold 24px Georgia, serif",n.textAlign="center",n.fillText("California",128,28),n.fillStyle="#18306e"),n.textAlign="center",n.textBaseline="middle",n.font='bold 60px "Barlow Condensed", "Arial Narrow", Arial, sans-serif',n.fillText(r,128,t==="ca"?80:68),Pe(e,{repeat:!1})}function Tf(r,t,e){let s=Ne(2048,256),o=s.getContext("2d");if(o.fillStyle="#000",o.fillRect(0,0,2048,256),t<=0)return Pe(s,{srgb:!1});let a=Xe(r),l=0;for(;l<2048;){let c=a()<.35*t+.1,h=8+a()*34,u=c?.25+a()*.7:.05+a()*.18,d=Math.min(248,u*256*e*(.6+.4*t));o.fillStyle="#ff0000",o.fillRect(l,256-d,h,d),c&&a()<.4&&(o.fillRect(l+h*.4,256-d-12-a()*20,2,30),a()<.5&&o.fillRect(l+h*.2,256-d-8,h*.6,8));for(let f=256-d+4;f<252;f+=5)for(let p=l+2;p<l+h-2;p+=4)a()<.28&&(o.fillStyle="#ffff00",o.fillRect(p,f,2,2));l+=h+(c?a()*3:a()*25)}return Pe(s,{srgb:!1,aniso:!1})}function Af(r,t){let i=Ne(2048,256),s=i.getContext("2d");if(s.fillStyle="#000",s.fillRect(0,0,2048,256),t<=0)return Pe(i,{srgb:!1});let o=Xe(r),a=2;for(let l=0;l<a;l++){let c=[],u=[o()*10,o()*10,o()*10];for(let p=0;p<=128;p++){let x=p/128,g=Math.PI*2*x,m=.35+.25*Math.sin(g*2+u[0])+.18*Math.sin(g*5+u[1])+.08*Math.sin(g*13+u[2]);m+=(o()-.5)*.04,m=Math.max(.05,m)*t*(l===0?.8:.55),c.push([x*2048,256-m*256*.9])}let d=s.createLinearGradient(0,0,0,256),f=l===0?120:220;d.addColorStop(0,`rgb(255,${f},0)`),d.addColorStop(1,`rgb(255,${f*.6},0)`),s.fillStyle=d,s.beginPath(),s.moveTo(0,256);for(let p of c)s.lineTo(p[0],p[1]);s.lineTo(2048,256),s.fill()}return Pe(i,{srgb:!1,aniso:!1})}function Rf(r=3){let e=Oi(512,4,r,6,.55),n=Ne(512,512),i=n.getContext("2d"),s=i.createImageData(512,512);for(let o=0;o<512*512;o++){let a=Math.max(0,Math.min(1,(e[o]-.42)*3.2));s.data[o*4]=s.data[o*4+1]=s.data[o*4+2]=255,s.data[o*4+3]=a*255}return i.putImageData(s,0,0),Pe(n,{srgb:!1,aniso:!1})}function Ln(r=64,t=0,e=1.6){let n=Ne(r,r),i=n.getContext("2d"),s=i.createImageData(r,r);for(let o=0;o<r;o++)for(let a=0;a<r;a++){let l=(a+.5)/r*2-1,c=(o+.5)/r*2-1,h=Math.sqrt(l*l+c*c),u=h<t?1:Math.max(0,1-(h-t)/(1-t));u=Math.pow(u,e);let d=(o*r+a)*4;s.data[d]=s.data[d+1]=s.data[d+2]=255,s.data[d+3]=u*255}return i.putImageData(s,0,0),Pe(n,{srgb:!1,repeat:!1,aniso:!1})}function Cf(){let e=Ne(64,128),n=e.getContext("2d"),i=n.createImageData(64,128);for(let s=0;s<128;s++)for(let o=0;o<64;o++){let a=(o+.5)/64*2-1,l=(s+.5)/128,c=.35+l*.65,h=Math.max(0,1-Math.abs(a)/c),u=Math.pow(Math.sin(Math.min(1,l*1.2)*Math.PI*.9),.8)*(1-l*.6),d=Math.pow(h,1.5)*u,f=(s*64+o)*4;i.data[f]=i.data[f+1]=i.data[f+2]=255,i.data[f+3]=d*255}return n.putImageData(i,0,0),Pe(e,{srgb:!1,repeat:!1,aniso:!1})}function Pf(){let e=Ne(32,128),n=e.getContext("2d"),i=n.createImageData(32,128);for(let s=0;s<128;s++)for(let o=0;o<32;o++){let a=(o+.5)/32*2-1,l=(s+.5)/128,c=Math.pow(Math.max(0,1-Math.abs(a)),2)*Math.pow(1-l,1.5)*Math.min(1,l*8),h=(s*32+o)*4;i.data[h]=i.data[h+1]=i.data[h+2]=255,i.data[h+3]=c*255}return n.putImageData(i,0,0),Pe(e,{srgb:!1,repeat:!1,aniso:!1})}var vf=[{t:"DON'T LIFT",s:"NO HESI RADIO 104.7",bg:["#14060a","#3a0b18"],fg:"#ff2e4d",glow:"#ff2e4d"},{t:"TURBO COFFEE",s:"BOOST YOUR MORNING",bg:["#081018","#0f2a40"],fg:"#38d6ff",glow:"#38d6ff"},{t:"APEX ENERGY",s:"STAY IN THE ZONE",bg:["#0a1406","#1d3a0d"],fg:"#b6ff3b",glow:"#9dff2e"},{t:"MIDNIGHT MOTEL",s:"NEXT EXIT \xB7 VACANCY",bg:["#140a18","#341447"],fg:"#ff6bf0",glow:"#ff4fe8"},{t:"SAKURA TIRES",s:"GRIP THAT HOLDS ON",bg:["#161208","#3d2c0a"],fg:"#ffbf3b",glow:"#ffaa00"}];function If(r){let t=vf[r%vf.length],e=512,n=256,i=Ne(e,n),s=Ne(e,n),o=i.getContext("2d"),a=s.getContext("2d"),l=o.createLinearGradient(0,0,e,n);l.addColorStop(0,t.bg[0]),l.addColorStop(1,t.bg[1]),o.fillStyle=l,o.fillRect(0,0,e,n),a.fillStyle="#000",a.fillRect(0,0,e,n);for(let[c,h,u]of[[o,t.fg,18],[a,t.glow,14]])c.textAlign="center",c.textBaseline="middle",c.shadowColor=h,c.shadowBlur=u,c.fillStyle=h,c.font='italic 800 76px "Barlow Condensed", "Arial Narrow", Arial, sans-serif',c.fillText(t.t,e/2,n*.42),c.shadowBlur=0,c.font='600 30px "Barlow Condensed", Arial, sans-serif',c.fillStyle=c===o?"#e9e9e9":"#777",c.fillText(t.s,e/2,n*.76);return o.strokeStyle="rgba(255,255,255,0.15)",o.lineWidth=6,o.strokeRect(3,3,e-6,n-6),{map:Pe(i,{repeat:!1}),emissive:Pe(s,{repeat:!1})}}var ka=null;function Qr(){if(ka)return ka;let r=64,t=128,e=Ne(r,t),n=e.getContext("2d"),i=n.createImageData(r,t),s=.36,o=.42,a=.16,l=.13;for(let c=0;c<t;c++)for(let h=0;h<r;h++){let u=(h+.5)/r-.5,d=(c+.5)/t-.5,f=Math.abs(u)-(s-a),p=Math.abs(d)-(o-a),x=Math.hypot(Math.max(f,0),Math.max(p,0))+Math.min(Math.max(f,p),0)-a,g=1-Math.min(1,Math.max(0,(x+l*.35)/l));g=g*g*(3-2*g);let m=Math.exp(-(u*u)/.03-d*d/.09);g=Math.min(1,g*(.72+.28*m));let _=(c*r+h)*4;i.data[_]=i.data[_+1]=i.data[_+2]=0,i.data[_+3]=Math.round(g*255)}return n.putImageData(i,0,0),ka=Pe(e,{srgb:!1,repeat:!1,aniso:!1}),ka}var Ba=null;function eu(){if(Ba)return Ba;let r=128,t=Ne(r,r),e=t.getContext("2d");e.fillStyle="#050506",e.fillRect(0,0,r,r);let n=r/4,i=n*Math.sqrt(3)/2;e.lineWidth=7;for(let s=-1;s<5;s++)for(let o=-1;o<4;o++){let a=o*n*1.5*2/1.5+(s%2?n:0),l=s*i;e.beginPath();for(let c=0;c<6;c++){let h=c/6*Math.PI*2,u=a+Math.cos(h)*n*.62,d=l+Math.sin(h)*n*.62;c===0?e.moveTo(u,d):e.lineTo(u,d)}e.closePath(),e.strokeStyle="#2b2d31",e.stroke()}return Ba=Pe(t,{srgb:!0,repeat:!0,aniso:!0}),Ba}var Jr=null;function nu(){if(Jr)return Jr;let r=2048,t=256,e=Ne(r,t),n=e.getContext("2d");n.fillStyle="#1c1c1d",n.fillRect(0,0,r,t);let i=(c,h)=>[(1-h)*t,(1-c)*t],[s,o]=i(3/7,4/7);n.fillStyle="#121213";for(let c of[.18,.42,.66,.86])n.fillRect(0,s+(o-s)*c,r,2.5);n.fillStyle="#161617";for(let c=0;c<180;c++){let h=c/180*r;n.fillRect(h,s+2,2,(o-s)*.16),n.fillRect(h+5,o-(o-s)*.14,2,(o-s)*.12)}let[a,l]=i(6/7,7/7);n.save(),n.fillStyle="#4e4f52",n.textBaseline="middle",n.font="bold 24px Arial, sans-serif";for(let c of[0,r/2])n.save(),n.translate(c+120,(a+l)/2),n.scale(2.6,-1),n.fillText("NO HESI",0,0),n.restore(),n.save(),n.translate(c+620,(a+l)/2),n.scale(1.6,-1),n.font="600 18px Arial, sans-serif",n.fillText("PERFORMANCE  265/35 ZR19",0,0),n.restore();return n.restore(),n.fillStyle="#242426",n.fillRect(0,a+1,r,2),Jr=Pe(e,{srgb:!0,repeat:!1,aniso:!0}),Jr.wrapS=_n,Jr}function jr(r,t=!1){let e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,l=new Kt,c=0;for(let h=0;h<r.length;++h){let u=r[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<r.length;++d){let f=r[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=Df(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let p=Df(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function Df(r){let t,e,n,i=-1,s=0;for(let c=0;c<r.length;++c){let h=r[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}let o=new t(s),a=new oe(o,e,n),l=0;for(let c=0;c<r.length;++c){let h=r[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<e;p++){let x=h.getComponent(d,p);a.setComponent(d+u,p,x)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}var Uf=new Qt,Nf=new Ze,kf=new rn,xi=new I,Bf=new I,Ff=new Qt().makeScale(0,0,0);function wy(r){let t=["position","normal","uv"];for(let e of Object.keys(r.attributes))t.includes(e)||r.deleteAttribute(e);if(!r.attributes.uv){let e=r.attributes.position.count;r.setAttribute("uv",new oe(new Float32Array(e*2),2))}return r.index?r.toNonIndexed():r}function Qe(r){return jr(r.map(wy),!1)}function Of(r,t,e,n,i=8){let s=new I().subVectors(t,r),o=s.length(),a=new ie(n,e,o,i,1,!1);a.translate(0,o/2,0);let l=new Ze().setFromUnitVectors(new I(0,1,0),s.normalize());return a.applyQuaternion(l),a.translate(r.x,r.y,r.z),a}function nr(r,t,e,n,i,s){let o=new zt(r,t,e);return o.translate(n,i,s),o}function Hf(r){let t=[],e=[],n=[],s=[];if(r==="double"){let a=new ie(.42,.56,1,4,1).rotateY(Math.PI/4).scale(1,1,2.2).translate(0,.5,0);s.push(a),t.push(new ie(.11,.17,10,8).translate(0,1+10/2,0)),t.push(new ie(.24,.27,.22,8).translate(0,1.11,0))}else t.push(new ie(.11,.2,11,8).translate(0,11/2,0)),t.push(new ie(.32,.36,.5,8).translate(0,.25,0));let o=r==="double"?[-1,1]:[-1];for(let a of o){let l=new I(0,10.4,0),c=new I(a*1.4,11+.05,0),h=new I(a*4.6,11+.35,0);t.push(Of(l,c,.08,.07,6)),t.push(Of(c,h,.07,.06,6));let u=nr(1,.2,.42,a*5,11+.3,0);t.push(u),e.push(nr(.75,.05,.3,a*5,11+.18,0)),n.push([a*5,11+.12,0])}return{metal:Qe(t),lamp:Qe(e),lampPos:n,base:s.length?Qe(s):null}}function zf(r=1){let t=Xe(r),e=15,n=new ie(.17,.3,e,7,10);n.translate(0,e/2,0);let i=n.attributes.position;for(let a=0;a<i.count;a++){let l=i.getY(a),c=l/e;i.setX(a,i.getX(a)+c*c*.9);let h=1+.06*Math.sin(l*9);i.setX(a,i.getX(a)*h),i.setZ(a,i.getZ(a)*h)}n.computeVertexNormals();let s=[],o=11;for(let a=0;a<o;a++){let l=a/o*Math.PI*2+t()*.3,c=4.2+t()*1.2,h=.6+t()*.5,u=5,d=[],f=[];for(let x=0;x<=u;x++){let g=x/u,m=g*c,_=Math.sin(g*Math.PI*.55)*1.2-g*g*h*3.2,v=Math.sin(g*Math.PI)*.75+.05,y=Math.cos(l)*m,S=Math.sin(l)*m,b=-Math.sin(l)*v,T=Math.cos(l)*v;if(d.push(y+b,_-v*.25,S+T,y-b,_-v*.25,S-T,y,_+.05,S),x>0){let R=(x-1)*3,w=x*3;f.push(R,w,R+2,w,w+2,R+2,R+1,R+2,w+1,w+1,R+2,w+2)}}let p=new Kt;p.setAttribute("position",new Ht(d,3)),p.setIndex(f),p.computeVertexNormals(),p.translate(.9,e,0),s.push(p)}return s.push(new We(.45,6,5).translate(.9,e-.1,0)),{trunk:n,crown:Qe(s)}}function Oa(r,t,e,n=1){let i=new wa(r,t),s=i.attributes.position;for(let o=0;o<s.count;o++){xi.fromBufferAttribute(s,o);let a=1+.22*Fi(xi.x*1.7+e,xi.z*1.7+xi.y*.8,e);s.setXYZ(o,xi.x*a,xi.y*a*n,xi.z*a)}return i.computeVertexNormals(),i}function Vf(r=2){let t=new ie(.16,.28,4.2,6).translate(0,2.1,0),e=Xe(r),n=[];for(let i=0;i<4;i++){let s=1.8+e()*1.2;n.push(Oa(s,1,r+i,.85).translate((e()-.5)*2,4.4+e()*2.4,(e()-.5)*2))}return{trunk:t,leaves:Qe(n)}}function Gf(r=3){return Qe([Oa(1,1,r,.7).translate(0,.5,0),Oa(.8,1,r+9,.7).translate(.8,.4,.3)])}function Wf(){let r=[];r.push(new ie(.32,.36,6,8).translate(0,3,0)),r.push(new We(.32,8,5,0,Math.PI*2,0,Math.PI/2).translate(0,6,0));for(let[t,e,n]of[[1,2.4,2.2],[-1,3.2,1.8]])r.push(new ie(.22,.22,1,7).rotateZ(Math.PI/2).translate(t*.7,e,0)),r.push(new ie(.22,.24,n,7).translate(t*1.15,e+n/2,0)),r.push(new We(.22,7,4,0,Math.PI*2,0,Math.PI/2).translate(t*1.15,e+n,0));return Qe(r)}function Xf(r=4){let t=Oa(1.2,1,r,.6);return t.translate(0,.25,0),t}function Yf(r,t,e,n,i){let s=new zt(r,t,e);s.translate(0,t/2,0);let o=s.attributes.uv,a=s.attributes.position,l=s.attributes.normal,c=3.6*n,h=4*i;for(let u=0;u<o.count;u++){let d=Math.abs(l.getX(u)),f=Math.abs(l.getY(u)),p=a.getX(u),x=a.getY(u),g=a.getZ(u);if(f>.5)o.setXY(u,.02,.02);else{let m=d>.5?g:p;o.setXY(u,m/h,x/c)}}return s}function qf(){let r=[];r.push(new ie(.25,.3,9,8).translate(0,4.5,0)),r.push(nr(12.4,.3,.4,0,9,0)),r.push(nr(12.4,.3,.4,0,15.2,0)),r.push(nr(12.6,6.6,.25,0,12.1,0));let t=new Se(12,6).translate(0,12.1,.14);return{frame:Qe(r),panel:t}}function $f(){let r=Qe([nr(.08,2.4,.08,0,1.2,0)]),t=new Se(.75,.95).translate(0,2.3,.05);return{post:r,plate:t}}var mn=class{constructor(t,e,n,{colors:i=!1}={}){this.capacity=n,this.meshes=e.map(s=>{let o=new ki(s.geometry,s.material,n);o.frustumCulled=!1,o.castShadow=!!s.castShadow,o.receiveShadow=!!s.receiveShadow,o.instanceMatrix.setUsage(Cn),s.renderOrder&&(o.renderOrder=s.renderOrder);for(let a=0;a<n;a++)o.setMatrixAt(a,Ff);return i&&(o.instanceColor=new Qn(new Float32Array(n*3).fill(1),3)),t.add(o),o}),this.data=new Float64Array(n*8),this.active=new Uint8Array(n),this.dirty=!1,this.hi=0;for(let s of this.meshes)s.count=0}add(t,e,n,i,s,o,a,l,c,h=0){let u=-1;for(let p=0;p<this.capacity;p++)if(!this.active[p]){u=p;break}if(u<0)return-1;let d=u*8,f=this.data;if(f[d]=t,f[d+1]=e,f[d+2]=n,f[d+3]=i,f[d+4]=s,f[d+5]=o,f[d+6]=a,f[d+7]=h,this.active[u]=1,u+1>this.hi){this.hi=u+1;for(let p of this.meshes)p.count=this.hi}if(this._write(u,l),c)for(let p of this.meshes)p.instanceColor&&(p.setColorAt(u,c),p.instanceColor.needsUpdate=!0);return u}remove(t){if(!(t<0||!this.active[t])){this.active[t]=0;for(let e of this.meshes)e.setMatrixAt(t,Ff);for(;this.hi>0&&!this.active[this.hi-1];)this.hi--;for(let e of this.meshes)e.count=this.hi;this.dirty=!0}}_write(t,e){let n=this.data,i=t*8;xi.set(n[i]-e.x,n[i+2],-(n[i+1]-e.y)),kf.set(n[i+7],-n[i+3],0,"YXZ"),Nf.setFromEuler(kf),Bf.set(n[i+4],n[i+5],n[i+6]),Uf.compose(xi,Nf,Bf);for(let s of this.meshes)s.setMatrixAt(t,Uf);this.dirty=!0}rebase(t){for(let e=0;e<this.capacity;e++)this.active[e]&&this._write(e,t)}flush(){if(this.dirty){for(let t of this.meshes)t.instanceMatrix.needsUpdate=!0;this.dirty=!1}}clear(){for(let t=0;t<this.capacity;t++)this.active[t]&&this.remove(t)}dispose(t){for(let e of this.meshes)t.remove(e),e.dispose()}},to=class{constructor(t){this.factory=t,this.free=[]}get(){return this.free.pop()||this.factory()}release(t){t.visible=!1,this.free.push(t)}};var tn=64,je=tn/Je,Sy=[[-.3,0],[-.29,.08],[-.17,.33],[-.08,.95],[.08,.95],[.17,.33],[.29,.08],[.3,0]],Ha=class{constructor(t,e){this.scene=t,this.road=e,this.group=new de,this.group.name="highway",t.add(this.group),this.chunks=new Map,this.origin={x:0,y:0},this.viewDist=900,this.behind=140,this.propDensity=1,this.night=0,this.wet=0,this.pools={},this.env=null,this._tmp={},this._tmp2={}}setEnvironment(t,e,n){this.clear(),this._disposeEnv(),this.env=t,this.layout=e,this.viewDist=n.viewDist,this.propDensity=n.propDensity,this.castPropShadows=n.shadows,this._buildColumns(),this._buildMaterials(),this._buildPools(),this.features=[];let i=Xe(t.seed*97+5);this._featRng=i,this._nextGantry=260+i()*200,this._nextOverpass=520+i()*300}_buildColumns(){let t=this.layout,e=[0,.55,.88,1.3,1.85,2.4,2.82,3.15],n=[1,1,.82,.99,.9,.99,.82,1],i=[],s=(a,l)=>i.push([a,l]);s(-t.roadEdge,1.06);let o=t.laneStart+t.oppLanes*t.LW;s(-o-.01,1.06);for(let a=t.oppLanes-1;a>=0;a--){let l=t.laneStart+a*t.LW;for(let c=e.length-1;c>=0;c--)s(-(l+t.LW-e[c]),n[c])}s(-t.laneStart+.01,1.05),s(-t.medianHalf,1.06),s(t.medianHalf,1.06),s(t.laneStart-.01,1.05);for(let a=0;a<t.n;a++){let l=t.laneStart+a*t.LW;for(let c=0;c<e.length;c++)s(l+e[c],n[c])}s(t.lanesEnd+.01,1.06),s(t.roadEdge,1.06),i.sort((a,l)=>a[0]-l[0]),this.cols=i.filter((a,l)=>l===0||a[0]-i[l-1][0]>.005)}_buildMaterials(){let t=this.env,e=yf(t.surface,t.seed);this.textures=[e.map,e.normalMap,e.roughnessMap];let n=_f(t.seed+1),i=Mf(t.seed+2),s=bf(t.seed+3);this.textures.push(n,i,s),this.roadColor=new St(t.roadColor),this.mat={road:new Pt({map:e.map,normalMap:e.normalMap,roughnessMap:e.roughnessMap,color:this.roadColor.clone(),vertexColors:!0,roughness:1,metalness:0,normalScale:new ut(.6,.6)}),marking:new Pt({vertexColors:!0,roughness:.55,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4,emissive:16777215,emissiveIntensity:0}),concrete:new Pt({map:n,color:14276303,roughness:.92}),wall:new Pt({map:i,color:t.wallColor,roughness:.95}),metal:new Pt({color:11449272,metalness:.75,roughness:.38,side:De}),terrain:new Pt({map:s,vertexColors:!0,roughness:1}),steel:new Pt({color:9278104,metalness:.6,roughness:.5}),signBack:new Pt({color:7238520,metalness:.5,roughness:.6}),rpm:new re({vertexColors:!0,toneMapped:!1,side:De,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4})},this.mat.marking.emissive.set(0),this.signMats=t.signs.map(([o,a,l],c)=>new Pt({map:Sf(o,a,l,c+t.seed),roughness:.45,metalness:0,emissive:16777215,emissiveIntensity:0}));for(let o of this.signMats)o.emissiveMap=o.map;this.speedSignMat=new Pt({map:Ef(),roughness:.5})}_buildPools(){let t=this.env,e=this.group,n=this.pools,i=this.castPropShadows,s=new St(t.lights.color);this.lampColor=s;let o=Hf(t.lights.style);this.lampLocal=o.lampPos,this.lampMat=new re({color:s.clone().multiplyScalar(.25),toneMapped:!1});let a=[{geometry:o.metal,material:this.mat.steel,castShadow:i},{geometry:o.lamp,material:this.lampMat}];o.base&&a.push({geometry:o.base,material:this.mat.concrete,castShadow:i,receiveShadow:!0}),n.light=new mn(e,a,64),this.poolTex=Ln(128,0,1.3),this.textures.push(this.poolTex),this.poolMat=new re({map:this.poolTex,color:s,transparent:!0,opacity:0,depthWrite:!1,blending:Ke,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-8});let l=new Se(1,1).rotateX(-Math.PI/2);n.lightPool=new mn(e,[{geometry:l,material:this.poolMat}],140);let c=zf(t.seed);this.mat.palmTrunk=new Pt({color:8021584,roughness:1}),this.mat.palmLeaf=new Pt({color:5204780,roughness:.9,side:De}),n.palm=new mn(e,[{geometry:c.trunk,material:this.mat.palmTrunk,castShadow:i},{geometry:c.crown,material:this.mat.palmLeaf,castShadow:i}],320);let h=Vf(t.seed+1);this.mat.trunk=new Pt({color:5916214,roughness:1}),this.mat.leaves=new Pt({color:t.id==="desert"?8160336:4020780,roughness:.95}),n.tree=new mn(e,[{geometry:h.trunk,material:this.mat.trunk,castShadow:i},{geometry:h.leaves,material:this.mat.leaves,castShadow:i}],320,{colors:!0}),this.mat.bush=new Pt({color:t.id==="desert"?9079386:4940086,roughness:1}),n.bush=new mn(e,[{geometry:Gf(t.seed),material:this.mat.bush}],420,{colors:!0}),this.mat.cactus=new Pt({color:5599295,roughness:.85}),n.cactus=new mn(e,[{geometry:Wf(),material:this.mat.cactus,castShadow:i}],260),this.mat.rock=new Pt({color:10254942,roughness:1,flatShading:!0}),n.rock=new mn(e,[{geometry:Xf(t.seed),material:this.mat.rock}],260,{colors:!0});let u={low:[26,9,18,4,5],warehouse:[44,11,30,3,6],mid:[22,34,22,16,8],tower:[28,80,28,16,8],tall:[32,150,32,16,8],glass:[30,110,26,16,8]};this.buildingPools={};let d=t.seed*3;for(let x of new Set(t.props.buildingKinds)){let[g,m,_,v,y]=u[x],S=Yf(g,m,_,v,y),b=wf(x,d++);this.textures.push(b.map,b.emissive);let T=new Pt({map:b.map,emissiveMap:b.emissive,emissive:16777215,emissiveIntensity:0,roughness:x==="glass"||x==="tall"?.25:.85,metalness:x==="glass"||x==="tall"?.5:.05});this.buildingPools[x]=new mn(e,[{geometry:S,material:T,receiveShadow:!1}],90,{colors:!0}),this.buildingPools[x].dims=[g,m,_],this.buildingPools[x].mat=T}let f=qf();this.billboardPools=[];for(let x=0;x<3;x++){let g=If(t.seed+x);this.textures.push(g.map,g.emissive);let m=new Pt({map:g.map,emissiveMap:g.emissive,emissive:16777215,emissiveIntensity:.4,roughness:.6});this.billboardPools.push(new mn(e,[{geometry:f.frame,material:this.mat.steel,castShadow:i},{geometry:f.panel,material:m}],16)),this.billboardPools[x].panelMat=m}let p=$f();n.speedSign=new mn(e,[{geometry:p.post,material:this.mat.steel},{geometry:p.plate,material:this.speedSignMat}],12),n.pier=new mn(e,[{geometry:new zt(2.2,1,1.6).translate(0,-.5,0),material:this.mat.concrete}],120),this.gantryPool=new to(()=>this._makeGantry()),this.overpassPool=new to(()=>this._makeOverpass())}_makeGantry(){let t=this.layout,e=new de,n=this.mat.steel,i=7.6,s=.6,o=t.roadEdge+1.4,a=o-s,l=[];for(let h of[s,o])l.push(new zt(.45,i,.45).translate(h,i/2,0));l.push(new zt(a,.18,.18).translate((s+o)/2,i-.2,-.45)),l.push(new zt(a,.18,.18).translate((s+o)/2,i-.2,.45)),l.push(new zt(a,.18,.18).translate((s+o)/2,i-1.4,-.45)),l.push(new zt(a,.18,.18).translate((s+o)/2,i-1.4,.45));for(let h=s;h<o;h+=1.2)l.push(new zt(.08,1.3,.08).translate(h,i-.8,-.45)),l.push(new zt(.08,1.3,.08).translate(h,i-.8,.45));let c=new Mt(Qe(l),n);c.castShadow=this.castPropShadows,e.add(c),e.userData.signs=[];for(let h=0;h<3;h++){let u=new Mt(new Se(5.2,3.05),this.signMats[0]),d=new Mt(new zt(5.3,3.15,.12),this.mat.signBack);d.position.z=-.1;let f=new de;f.add(u,d),f.position.set(0,i-.8,.75),u.castShadow=!1,d.castShadow=this.castPropShadows,e.add(f),e.userData.signs.push({holder:f,face:u})}return this.group.add(e),e}_makeOverpass(){let t=this.layout,e=new de,n=this.mat.concrete,i=t.wallD+140,s=7.4,o=[];o.push(new zt(i*2,1.6,15).translate(0,s+.8,0)),o.push(new zt(i*2,1.1,.4).translate(0,s+2.15,7.3)),o.push(new zt(i*2,1.1,.4).translate(0,s+2.15,-7.3)),o.push(new zt(i*2,.5,13).translate(0,s-.2,0));let a=[0,t.wallD+3,-(t.wallD+3),t.wallD+40,-(t.wallD+40)];for(let c of a)o.push(new zt(c===0?.7:1.2,s+12,9).translate(c,(s-12)/2,0)),o.push(new zt(c===0?1.4:2.2,.8,12).translate(c,s-.5,0));let l=new Mt(Qe(o),n);return l.castShadow=!0,l.receiveShadow=!0,e.add(l),this.group.add(e),e}groundOffset(t,e,n){let i=this.env;if(i.elevated)return-i.elevated-.2+(e>30?Fi(t*.004,e*.004+n*50,7)*.4:0);let s=i.terrain,o=-.25-.55*ae(0,10,e),a=s.hill*ae(s.flat,s.flat+260,e)*(.6+.6*mf(t*.0035,e*.004+n*31,3,3)),l=1.4*ae(6,60,e)*Fi(t*.012,e*.02+n*9,11);return o+a+l}_ensureFeatures(t){let e=this.env,n=this._featRng;for(;this._nextGantry<t||this._nextOverpass<t;)this._nextGantry<=this._nextOverpass?(this.features.push({s:this._nextGantry,type:"gantry",seed:Math.floor(n()*1e9)}),this._nextGantry+=Tt(e.gantry[0],e.gantry[1],n())):(Math.abs(this._nextOverpass-this._nextGantry)<160&&(this._nextOverpass=this._nextGantry+200),this.features.push({s:this._nextOverpass,type:"overpass",seed:Math.floor(n()*1e9)}),this._nextOverpass+=Tt(e.overpass[0],e.overpass[1],n()));for(this.features.sort((i,s)=>i.s-s.s);this.features.length&&this.features[0].s<this._sMinKeep-500;)this.features.shift()}update(t,e=!1){if(!this.env)return;let n=Math.floor((t-this.behind)/tn),i=Math.floor((t+this.viewDist)/tn);this._sMinKeep=n*tn,this.road.ensure((i+2)*tn+50),this._ensureFeatures((i+2)*tn);for(let[o,a]of this.chunks)(o<n||o>i+1)&&(this._freeChunk(a),this.chunks.delete(o));let s=e?999:2;for(let o=n;o<=i&&s>0;o++)this.chunks.has(o)||(this.chunks.set(o,this._buildChunk(o)),s--);this.road.trim(t-400);for(let o of this._allPools())o.flush()}_allPools(){let t=Object.values(this.pools);for(let e of Object.values(this.buildingPools||{}))t.push(e);for(let e of this.billboardPools||[])t.push(e);return t}rebase(t){this.origin.x=t.x,this.origin.y=t.y;for(let e of this.chunks.values())this._placeObj(e.group,e.anchor);for(let e of this.chunks.values())for(let n of e.objs)this._placeObj(n.obj,n.anchor,n.yaw);for(let e of this._allPools())e.rebase(t),e.flush()}_placeObj(t,e,n){t.position.set(e.X-this.origin.x,e.E,-(e.Y-this.origin.y)),n!==void 0&&t.rotation.set(0,-n,0)}clear(){for(let t of this.chunks.values())this._freeChunk(t);this.chunks.clear()}_freeChunk(t){this.group.remove(t.group);for(let e of t.meshes)e.geometry.dispose();for(let[e,n]of t.props)e.remove(n);for(let e of t.objs)(e.type==="gantry"?this.gantryPool:this.overpassPool).release(e.obj)}_buildChunk(t){let e=this.road,n=this.layout,i=this.env,s=t*tn,o={...e.sample(s)},a=[];for(let p=0;p<=je;p++)a.push({...e.sample(s+p*Je),s:s+p*Je});let l={k:t,anchor:o,group:new de,meshes:[],props:[],objs:[],lamps:[]},c=(p,x,g,m,_)=>{let v=Math.cos(p.H),y=Math.sin(p.H);m[_]=p.X+v*x-o.X,m[_+1]=p.E+g-o.E,m[_+2]=-(p.Y-y*x-o.Y)},h=Math.floor(s/8)*8;{let p=this.cols,x=p.length,g=new Float32Array((je+1)*x*3),m=new Float32Array((je+1)*x*2),_=new Float32Array((je+1)*x*3),v=[];for(let y=0;y<=je;y++){let S=a[y],b=1+.035*Fi(S.s*.02,0,77);for(let T=0;T<x;T++){let R=y*x+T;c(S,p[T][0],0,g,R*3),m[R*2]=p[T][0]/8,m[R*2+1]=(S.s-h)/8;let w=p[T][1]*b;if(_[R*3]=_[R*3+1]=_[R*3+2]=w,y<je&&T<x-1){let M=R,C=R+1,D=R+x,k=R+x+1;v.push(M,C,D,C,k,D)}}}l.meshes.push(this._mesh(g,m,_,v,this.mat.road,{receive:!0}))}{let p=[],x=[],g=[],m=[.95,.95,.92],_=[.95,.72,.12],v={},y={},S=[0,0,0],b=(wt,It,J,dt,F)=>{e.sample(wt,v),e.sample(It,y);let O=p.length/3;for(let[Z,ht]of[[v,J-dt/2],[v,J+dt/2],[y,J-dt/2],[y,J+dt/2]])c(Z,ht,.012,S,0),p.push(S[0],S[1],S[2]),x.push(F[0],F[1],F[2]);g.push(O,O+1,O+2,O+1,O+3,O+2)},T=n.laneStart+n.oppLanes*n.LW,R=[[n.laneStart+.12,_],[n.lanesEnd-.12,m],[-n.laneStart-.12,_],[-T+.12,m]];for(let[wt,It]of R)for(let J=0;J<je;J++)b(a[J].s,a[J+1].s,wt,.15,It);let w=[];for(let wt=1;wt<n.n;wt++)w.push(n.laneStart+wt*n.LW);for(let wt=1;wt<n.oppLanes;wt++)w.push(-(n.laneStart+wt*n.LW));let M=Math.ceil((s-3)/12),C=Math.floor((s+tn)/12);for(let wt=M;wt<=C;wt++){let It=Math.max(s,wt*12),J=Math.min(s+tn,wt*12+3);if(!(J-It<.05))for(let dt of w)b(It,J,dt,.13,m)}l.meshes.push(this._mesh(new Float32Array(p),null,new Float32Array(x),g,this.mat.marking,{receive:!0}));let D=[],k=[],B=[],$=[0,0,0],G=[0,0,0],ct=(wt,It,J,dt)=>{e.sample(wt-.05,v),e.sample(wt+.05,y);let F=D.length/3;for(let[ht,it,Rt]of[[v,It-.05,.026],[v,It+.05,.026],[y,It-.05,.026],[y,It+.05,.026]])c(ht,it,Rt,$,0),D.push($[0],$[1],$[2]),k.push(J[0]*.55,J[1]*.55,J[2]*.55);B.push(F,F+1,F+2,F+1,F+3,F+2);let O=dt>0?v:y,Z=D.length/3;for(let[ht,it]of[[It-.05,.008],[It+.05,.008],[It-.05,.026],[It+.05,.026]])c(O,ht,it,G,0),D.push(G[0],G[1],G[2]),k.push(J[0],J[1],J[2]);dt>0?B.push(Z,Z+2,Z+1,Z+1,Z+2,Z+3):B.push(Z,Z+1,Z+2,Z+1,Z+3,Z+2)},H=[1,1,1],X=[1,.72,.16],gt=Math.ceil((s-7.5)/12),_t=Math.floor((s+tn-7.5)/12);for(let wt=gt;wt<=_t;wt++){let It=wt*12+7.5;if(!(It<s||It>=s+tn)){for(let J of w)ct(It,J,H,J>0?1:-1);wt%2===0&&(ct(It,n.laneStart+.12,X,1),ct(It,-n.laneStart-.12,X,-1))}}if(B.length){let wt=this._mesh(new Float32Array(D),null,new Float32Array(k),B,this.mat.rpm,{});l.meshes.push(wt)}}let u=(p,x,g,m,_=1,v=.5)=>{let y=p.length,S=new Float32Array((je+1)*y*3),b=new Float32Array((je+1)*y*2),T=[],R=[0];for(let w=1;w<y;w++)R.push(R[w-1]+Math.hypot(p[w][0]-p[w-1][0],p[w][1]-p[w-1][1]));for(let w=0;w<=je;w++)for(let M=0;M<y;M++){let C=w*y+M,[D,k]=p[M];if(c(a[w],x+(g?-D:D),k,S,C*3),b[C*2]=R[M]*_,b[C*2+1]=(a[w].s-h)*v/4,w<je&&M<y-1){let B=C,$=C+1,G=C+y,ct=C+y+1;g?T.push(B,G,$,$,G,ct):T.push(B,$,G,$,ct,G)}}l.meshes.push(this._mesh(S,b,null,T,m,{cast:!0,receive:!0}))};u(Sy,0,!1,this.mat.concrete);let f=(()=>{if(i.outer==="wall"){let p=i.wallHeight;return[[-.3,0],[-.29,.08],[-.17,.33],[-.1,.9],[-.1,p],[.12,p+.05],[.25,p],[.25,-1]]}return i.outer==="parapet"?[[-.3,0],[-.29,.08],[-.17,.33],[-.1,1.1],[.22,1.12],[.25,-1.9],[-3.5,-1.9]]:null})();if(f)u(f,n.wallD,!1,i.outer==="wall"?this.mat.wall:this.mat.concrete),u(f,-n.wallD,!0,i.outer==="wall"?this.mat.wall:this.mat.concrete);else{let p=[[0,.52],[-.07,.6],[0,.68],[-.07,.76],[0,.84]];u(p,n.wallD-.1,!1,this.mat.metal,1,.5),u(p,-n.wallD+.1,!0,this.mat.metal,1,.5);let x=[];for(let m=0;m<je;m+=1)for(let _ of[1,-1]){let v=a[m],y=[0,0,0];c(v,_*(n.wallD+.05),0,y,0),x.push(new zt(.12,.84,.12).translate(y[0],y[1]+.42,y[2]))}let g=new Mt(Qe(x),this.mat.steel);l.meshes.push(g)}{let p=[0,2.5,7,16,32,60,105,170,260,400];for(let x of[1,-1]){let g=p.length,m=new Float32Array((je+1)*g*3),_=new Float32Array((je+1)*g*2),v=new Float32Array((je+1)*g*3),y=[],S=new St(i.terrain.near),b=new St(i.terrain.far),T=new St,R=n.wallD+(i.outer==="parapet"?.25:.35);for(let w=0;w<=je;w++)for(let M=0;M<g;M++){let C=w*g+M,D=p[M]+0,k=M===0&&!i.elevated?-.05:this.groundOffset(a[w].s,D,x);c(a[w],x*(R+D),k,m,C*3),_[C*2]=x*(R+D)/10,_[C*2+1]=(a[w].s-h)/10;let B=Fi(a[w].s*.02,D*.03+x*13,5);if(T.copy(S).lerp(b,ae(10,300,D)),T.multiplyScalar(.88+.22*B),v[C*3]=T.r,v[C*3+1]=T.g,v[C*3+2]=T.b,w<je&&M<g-1){let $=C,G=C+1,ct=C+g,H=C+g+1;x>0?y.push($,G,ct,G,H,ct):y.push($,ct,G,G,ct,H)}}l.meshes.push(this._mesh(m,_,v,y,this.mat.terrain,{receive:!0}))}}for(let p of l.meshes)l.group.add(p);return this._placeObj(l.group,o),this.group.add(l.group),this._placeProps(l,s),l}_mesh(t,e,n,i,s,{cast:o=!1,receive:a=!1}={}){let l=new Kt;l.setAttribute("position",new oe(t,3)),e&&l.setAttribute("uv",new oe(e,2)),n&&l.setAttribute("color",new oe(n,3)),l.setIndex(i),l.computeVertexNormals(),l.computeBoundingSphere();let c=new Mt(l,s);return c.castShadow=o,c.receiveShadow=a,c}_addProp(t,e,n,i,s,o,a,l,c,h,u){let d=this.road.pos(n,i,this._tmp2),f=e.add(d.X,d.Y,d.E+s,d.H+o,a,l,c,this.origin,h,u);return f>=0&&t.props.push([e,f]),d}_foot(t,e,n,i,s){return{X:t,Y:e,cx:Math.cos(n),sx:-Math.sin(n),hx:i,hz:s}}_footHit(t,e,n=0){let i=[[t.cx,t.sx],[-t.sx,t.cx],[e.cx,e.sx],[-e.sx,e.cx]],s=e.X-t.X,o=e.Y-t.Y;for(let[a,l]of i){let c=t.hx*Math.abs(t.cx*a+t.sx*l)+t.hz*Math.abs(-t.sx*a+t.cx*l),h=e.hx*Math.abs(e.cx*a+e.sx*l)+e.hz*Math.abs(-e.sx*a+e.cx*l);if(Math.abs(s*a+o*l)>c+h+n)return!1}return!0}_clear(t,e,n,i,s=.5,o=null){let a=this.layout,l=Math.max(e.hx,e.hz)+s,c=a.wallD+1+(o??l);for(let u=-480;u<=480;u+=24){let d=this.road.sample(n+u,this._tmpS||(this._tmpS={}));if(Math.hypot(d.X-e.X,d.Y-e.Y)<c)return!1}for(let u of this.features){if(Math.abs(u.s-n)>420)continue;let d=this._featAnchor(u);if(u.type==="overpass"){if(this._footHit(this._foot(d.X,d.Y,d.yaw,a.wallD+140,9.5),e,s))return!1}else if(Math.abs(u.s-n)<8+l&&i<a.wallD+6)return!1}let h=this.env.lights.spacing;if(h>0&&this.env.lights.style!=="double"&&i<a.wallD+7){let u=Math.round(n/h)*h;if(Math.abs(n-u)<3+l)return!1}for(let u of this.chunks.values())if(u.foot&&u!==t){for(let d of u.foot)if(this._footHit(d,e,s))return!1}if(t.foot){for(let u of t.foot)if(this._footHit(u,e,s))return!1}return!0}_featAnchor(t){if(!t.anchor){let e={...this.road.sample(t.s)},n=e.H;t.type==="overpass"&&(n+=(gi(t.seed)-.5)*.35),t.anchor={X:e.X,Y:e.Y,yaw:n}}return t.anchor}_placeProps(t,e){let n=this.env,i=this.layout,s=this.pools,o=Xe(n.seed*100003+t.k*7919),a=this.propDensity,l=new St,c=e+tn,h=n.lights.spacing;if(h>0)for(let p=Math.ceil(e/h)*h;p<c;p+=h){let g=n.lights.style==="double"?0:i.wallD+1.4,m=!1;for(let S of this.features){let b=Math.abs(S.s-p);if(S.type==="overpass"&&b<12+Math.abs(g)*.2||S.type==="gantry"&&b<3){m=!0;break}}if(m)continue;let _=this._addProp(t,s.light,p,g,0,0,1,1,1),v=Math.cos(_.H),y=Math.sin(_.H);for(let S of this.lampLocal){let b=g+S[0],T=_.X+v*S[0],R=_.Y-y*S[0];t.lamps.push([T,R,_.E+S[1]]),this._addProp(t,s.lightPool,p,b,.03,0,15,1,19)}}for(let p of this.features){if(p.s<e||p.s>=c)continue;let g=(p.type==="gantry"?this.gantryPool:this.overpassPool).get();g.visible=!0;let m={...this.road.sample(p.s)},_=m.H;if(p.type==="overpass"&&(_+=(gi(p.seed)-.5)*.35),p.type==="gantry"){let v=Xe(p.seed),y=this.layout,S=v()<.5?2:3,b=g.userData.signs;for(let T=0;T<3;T++){let R=b[T];if(R.holder.visible=T<S,T>=S)continue;let w=S===2?T===0?1:y.n-2:Math.round(T/2*(y.n-1));R.holder.position.x=y.laneCenter(w),R.face.material=this.signMats[Math.floor(v()*this.signMats.length)]}}this._placeObj(g,m,_),t.objs.push({obj:g,anchor:m,yaw:_,type:p.type})}if(n.outer!=="wall"&&o()<.12&&this._addProp(t,s.speedSign,e+o()*tn,i.wallD+1.2,(n.elevated,0),0,1,1,1),n.elevated)for(let p=Math.ceil(e/32)*32;p<c;p+=32)for(let x of[0,i.roadEdge-4,-(i.roadEdge-4)])this._addProp(t,s.pier,p,x,-1.9,0,1,n.elevated-1.6,1);t.foot=[];let u=i.wallD+1.2,d=n.props;if(d.buildings>0){let p=d.buildingKinds,x=n.elevated?[[18,50],[65,120],[140,230],[250,360]]:[[30,70],[85,150],[170,260],[280,380]];for(let g of[1,-1])for(let m=0;m<x.length;m++){if(o()>d.buildings*(m===0&&!n.elevated?.55:.9)*Math.min(1,a+.2))continue;let _=p[Math.floor(o()*p.length)];m===0&&(_==="tall"||_==="tower")&&n.id==="la"&&(_="mid");let v=this.buildingPools[_];if(!v)continue;let[y,,S]=v.dims,b=.8+o()*.45,T=b*(.7+o()*.7),R=(o()-.5)*.15,w=.75+o()*.35,M=x[m],C=y*b/2+2,D=S*b/2+2,k=M[0]+C,B=Math.max(k,M[1]-C);for(let $=0;$<3;$++){let G=Tt(k,B,o()),ct=e+tn*.5+(o()-.5)*Math.max(0,tn-D),H=u+G,X=this.road.pos(ct,g*H,this._tmp2),gt=this._foot(X.X,X.Y,X.H+R,C-2,D-2);if(!this._clear(t,gt,ct,H-C,2.5))continue;let _t=n.elevated?this.groundOffset(ct,G,g):this.groundOffset(ct,G,g)-.5;l.setRGB(w,w*(.97+o()*.06),w*(.95+o()*.1)),this._addProp(t,v,ct,g*H,_t,R,b,T,b,l),t.foot.push(gt);break}}}if(o()<d.billboards){let p=o()<.65?1:-1,x=this.billboardPools[Math.floor(o()*this.billboardPools.length)],g=6+o()*18,m=e+o()*tn,_=this.road.pos(m,p*(u+g),this._tmp2),v=this._foot(_.X,_.Y,_.H-p*.35,7.5,2);if(this._clear(t,v,m,u+g-7.5,1.5)){let y=this.groundOffset(m,g,p)+(n.elevated?n.elevated*.9:0);this._addProp(t,x,m,p*(u+g),y,-p*.35,1,1,1),t.foot.push(v)}}let f=(p,x,g,m,_,v,y={})=>{if(!p)return;let S=x*a;S=Math.floor(S)+(o()<S-Math.floor(S)?1:0);for(let b=0;b<S;b++){let T=o()<.5?1:-1,R=g+Math.pow(o(),y.bias??1)*(m-g),w=e+o()*tn,M=Tt(_,v,o()),C=o()*Math.PI*2,D=y.stretch?Tt(.85,1.25,o()):1;y.color&&l.setHSL(y.color[0]+(o()-.5)*.04,y.color[1],y.color[2]*(.8+o()*.4));let k=(y.r??1)*M,B=u+R,$=this.road.pos(w,T*B,this._tmp2),G=this._foot($.X,$.Y,0,k,k);if(y.tall?!this._clear(t,G,w,B-k,.3,.6):!this._clearSmall(t,G))continue;let ct=this.groundOffset(w,R,T);this._addProp(t,p,w,T*B,ct,C,M,M*D,M,y.color?l:null),y.tall&&t.foot.push(this._foot($.X,$.Y,0,.6*M,.6*M))}};n.elevated?f(s.tree,d.trees*3,4,60,.8,1.3,{color:[.28,.35,.45],r:3,tall:!0}):(f(s.palm,d.palms*4.5,2.5,70,.8,1.25,{bias:1.4,stretch:!0,r:4,tall:!0}),f(s.tree,d.trees*5,6,160,.7,1.4,{color:[.26,.38,.5],r:3,tall:!0}),f(s.bush,d.bushes*9,1,90,.6,1.5,{color:n.id==="desert"?[.17,.25,.55]:[.25,.32,.45],r:1.2}),f(s.cactus,d.cacti*5,4,140,.6,1.3,{r:1}),f(s.rock,d.rocks*6,3,200,.5,2.6,{color:[.07,.3,.55],r:1.5}))}_clearSmall(t,e){for(let n of this.chunks.values())if(n.foot){for(let i of n.foot)if(i.hx>1&&this._footHit(i,e,.2))return!1}for(let n of t.foot)if(n.hx>1&&this._footHit(n,e,.2))return!1;return!0}forEachLamp(t){for(let e of this.chunks.values())for(let n of e.lamps)t(n)}setAmbient(t,e){if(this.night=t,this.wet=e,!this.mat)return;let n=ae(.25,.75,t);this.lampMat.color.copy(this.lampColor).multiplyScalar(.25+n*2.5),this.poolMat.opacity=n*(.42+e*.25);for(let s of Object.values(this.buildingPools))s.mat.emissiveIntensity=n*1.6;for(let s of this.billboardPools)s.panelMat.emissiveIntensity=.35+n*1.4;for(let s of this.signMats)s.emissiveIntensity=n*.12;this.mat.marking.emissive.setScalar(n*.06),this.mat.rpm.color.setScalar(Tt(.62,1.05,n)*(1-this.wet*.15));let i=this.mat.road;i.color.copy(this.roadColor).multiplyScalar(1-e*.42),i.roughness=1-e*.72,i.envMapIntensity=1+e*1.6,i.normalScale.setScalar(.6+e*.5),this.mat.marking.roughness=.55-e*.35,this.mat.concrete.color.setHex(14276303).multiplyScalar(1-e*.25)}_disposeEnv(){for(let t of this._allPools())t.dispose(this.group);if(this.pools={},this.buildingPools={},this.billboardPools=[],this.gantryPool)for(let t of this.gantryPool.free)this.group.remove(t);if(this.overpassPool)for(let t of this.overpassPool.free)this.group.remove(t);for(let t of this.textures||[])t.dispose();if(this.textures=[],this.mat)for(let t of Object.values(this.mat))t.dispose();for(let t of this.signMats||[])t.map.dispose(),t.dispose()}};var ir=class r extends Mt{constructor(){let t=r.SkyShader,e=new ve({name:t.name,uniforms:ti.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:we,depthWrite:!1});super(new zt(1,1,1),e),this.isSky=!0}};ir.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},up:{value:new I(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Hi=[{el:-14,light:9348054,lightI:.32,sky:2831958,gnd:1446927,hemiI:.55,fog:790813,exp:1.05,envI:.35},{el:-5,light:7307192,lightI:.22,sky:4280442,gnd:1973016,hemiI:.6,fog:2634064,exp:1,envI:.45},{el:0,light:16738869,lightI:.9,sky:8224680,gnd:3812386,hemiI:.62,fog:9401455,exp:.85,envI:.55},{el:5,light:16752984,lightI:2.4,sky:10135752,gnd:5915696,hemiI:.6,fog:13606780,exp:.7,envI:.6},{el:15,light:16766630,lightI:3,sky:11125734,gnd:6969928,hemiI:.6,fog:12897494,exp:.56,envI:.62},{el:45,light:16774116,lightI:3.3,sky:12046832,gnd:7234648,hemiI:.6,fog:12176352,exp:.5,envI:.66}];function Ey(r){if(r<=Hi[0].el)return{...Hi[0],t:0};for(let t=1;t<Hi.length;t++)if(r<=Hi[t].el){let e=Hi[t-1],n=Hi[t],i=(r-e.el)/(n.el-e.el);return{a:e,b:n,t:i}}return{...Hi[Hi.length-1],t:0}}var Zf=new St,Kf=new St;function za(r,t,e,n){return Zf.setHex(r),Kf.setHex(t),n.copy(Zf).lerp(Kf,e)}var Qf=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,Ty=`
uniform sampler2D map; uniform vec3 color; uniform vec3 haze; uniform float hazeAmt; uniform float night;
uniform vec3 winColor; uniform vec2 arc; uniform float opacity;
varying vec2 vUv;
void main(){
  vec4 t = texture2D(map, vUv);
  float u = fract(vUv.x);
  float m = 1.0;
  if (arc.y - arc.x < 0.999) {
    m = smoothstep(arc.x, arc.x + 0.05, u) * (1.0 - smoothstep(arc.y - 0.05, arc.y, u));
  }
  float a = t.r * m * opacity;
  if (a < 0.01) discard;
  vec3 c = mix(color * (0.7 + 0.3 * t.g), haze, hazeAmt) + winColor * step(0.5, t.g) * night * 1.6;
  gl_FragColor = vec4(c, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Ay=`
varying vec3 vWorld;
void main(){ vec4 w = modelMatrix * vec4(position,1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,Ry=`
uniform sampler2D map; uniform vec3 lit; uniform vec3 shade; uniform float coverage; uniform float overcast;
uniform vec2 offset; uniform vec3 camPos; uniform float opacity;
varying vec3 vWorld;
void main(){
  vec2 uv = (vWorld.xz + offset) / 2600.0;
  float a = texture2D(map, uv).a;
  float b = texture2D(map, uv * 2.3 + 0.37).a;
  float dens = clamp(a * 0.75 + b * 0.35 - (1.0 - coverage) * 0.6, 0.0, 1.0);
  dens = mix(dens, 0.85 + 0.15 * b, overcast);
  float dist = length(vWorld.xz - camPos.xz);
  float fade = 1.0 - smoothstep(2500.0, 5200.0, dist);
  vec3 c = mix(lit, shade, clamp(dens * 1.2 - 0.2, 0.0, 1.0));
  gl_FragColor = vec4(c, dens * fade * opacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Jf=Qf.replace("vUv = uv;","vUv = uv; vDir = normalize(position);").replace("varying vec2 vUv;","varying vec2 vUv; varying vec3 vDir;"),Cy=`
uniform vec3 top; uniform vec3 horizon; uniform float amount;
varying vec2 vUv; varying vec3 vDir;
void main(){
  float h = clamp(vDir.y, -0.1, 1.0);
  vec3 c = mix(horizon, top, pow(smoothstep(-0.02, 0.5, h), 0.6));
  gl_FragColor = vec4(c * amount, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Py=`
uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir; uniform float amount;
varying vec2 vUv; varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  float h = clamp(d.y, -0.1, 1.0);
  vec3 c = mix(horizon, top, smoothstep(-0.05, 0.6, h));
  c *= 1.0 + 0.35 * pow(max(dot(d, sunDir), 0.0), 6.0);
  gl_FragColor = vec4(c, amount * smoothstep(-0.12, 0.02, d.y + 0.1));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Va=class{constructor(t,e){this.renderer=t,this.scene=e,this.hours=12,this.cycle=!1,this.weather="clear",this.wet=0,this.rainAmt=0,this.overcast=0,this.night=0,this.golden=0,this.elevation=30,this.env=null,this.sunDir=new I(0,1,0),this.lightDir=new I(0,1,0),this.fogColor=new St,this.exposure=.6,this.sky=new ir,this.sky.scale.setScalar(4500),this.sky.material.depthWrite=!1,this.sky.renderOrder=-10,this.sky.frustumCulled=!1,e.add(this.sky),this.glow=new Mt(new We(4300,32,16),new ve({vertexShader:Jf,fragmentShader:Cy,side:we,uniforms:{top:{value:new St(395798)},horizon:{value:new St(3811884)},amount:{value:0}},transparent:!0,blending:Ke,depthWrite:!1,fog:!1})),this.glow.renderOrder=-9,this.glow.frustumCulled=!1,e.add(this.glow),this.ovc=new Mt(new We(4250,32,16),new ve({vertexShader:Jf,fragmentShader:Py,side:we,uniforms:{top:{value:new St(8225418)},horizon:{value:new St(10133672)},sunDir:{value:new I(0,1,0)},amount:{value:0}},transparent:!0,depthWrite:!1,fog:!1})),this.ovc.renderOrder=-9.5,this.ovc.frustumCulled=!1,e.add(this.ovc);let n=1800,i=new Float32Array(n*3);for(let c=0;c<n;c++){let h=Math.random(),u=Math.random()*.95+.03,d=h*Math.PI*2,f=u,p=Math.sqrt(1-f*f);i[c*3]=Math.cos(d)*p*4e3,i[c*3+1]=f*4e3,i[c*3+2]=Math.sin(d)*p*4e3}let s=new Kt;s.setAttribute("position",new oe(i,3)),this.stars=new is(s,new Vr({color:16777215,size:1.6,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1})),this.stars.renderOrder=-8,this.stars.frustumCulled=!1,e.add(this.stars);let o=Ln(64,.55,1);this.moon=new da(new zr({map:o,color:14673663,transparent:!0,depthWrite:!1,fog:!1,opacity:0})),this.moon.scale.setScalar(140),this.moon.renderOrder=-7,e.add(this.moon),this.cloudTex=Rf(5),this.clouds=new Mt(new Se(11e3,11e3).rotateX(Math.PI/2),new ve({vertexShader:Ay,fragmentShader:Ry,transparent:!0,depthWrite:!1,fog:!1,side:De,uniforms:{map:{value:this.cloudTex},lit:{value:new St(1,1,1)},shade:{value:new St(.6,.62,.66)},coverage:{value:.3},overcast:{value:0},offset:{value:new ut},camPos:{value:new I},opacity:{value:1}}})),this.clouds.renderOrder=-6,this.clouds.frustumCulled=!1,e.add(this.clouds),this.cloudOffset=new ut(Math.random()*5e3,Math.random()*5e3);let a=()=>new ve({vertexShader:Qf,fragmentShader:Ty,transparent:!0,depthWrite:!1,fog:!1,side:we,uniforms:{map:{value:null},color:{value:new St},haze:{value:new St},hazeAmt:{value:.5},night:{value:0},winColor:{value:new St(1,.78,.5)},arc:{value:new ut(0,1)},opacity:{value:1}}});this.mountains=new Mt(new ie(3600,3600,520,64,1,!0),a()),this.mountains.renderOrder=-5,this.mountains.frustumCulled=!1,this.skyline=new Mt(new ie(3e3,3e3,420,64,1,!0),a()),this.skyline.renderOrder=-4,this.skyline.frustumCulled=!1,e.add(this.mountains,this.skyline),this.hemi=new js(12046832,7234648,.6),e.add(this.hemi),this.sun=new Ra(16777215,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048);let l=this.sun.shadow.camera;l.left=-42,l.right=42,l.top=42,l.bottom=-42,l.near=1,l.far=400,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.03,e.add(this.sun,this.sun.target),e.fog=new Zs(12570850,200,1100),this.pmrem=new Ni(t),this.envScene=new Jn,this.envSky=new ir,this.envSky.scale.setScalar(900),this.envSky.material=this.sky.material.clone(),this.envSky.material.fragmentShader=this.envSky.material.fragmentShader.replace("19000.0","0.0"),this.envSky.material.needsUpdate=!0,this.envScene.add(this.envSky),this.envGlow=new Mt(new We(850,24,12),this.glow.material),this.envScene.add(this.envGlow),this.envGround=new Mt(new He(800,32).rotateX(-Math.PI/2),new re({color:3355443})),this.envGround.position.y=-8,this.envScene.add(this.envGround),this.envCloud=new Mt(new We(820,24,12,0,Math.PI*2,0,Math.PI/2),new re({color:7829367,side:we,transparent:!0,opacity:0})),this.envScene.add(this.envCloud);{let c=document.createElement("canvas");c.width=1024,c.height=128;let h=c.getContext("2d");h.clearRect(0,0,1024,128),h.fillStyle="#fff";let u=11,d=()=>(u=u*16807%2147483647)/2147483647;h.fillRect(0,100,1024,28);for(let p=0;p<1024;){let x=8+d()*46,g=18+Math.pow(d(),2)*90;d()<.35?(h.beginPath(),h.ellipse(p+x/2,128-g*.6,x*.6,g*.45,0,0,Math.PI*2),h.fill()):h.fillRect(p,128-g,x,g),p+=x+d()*10}let f=new Mn(c);f.wrapS=_n,f.repeat.x=3,this.envHorizon=new Mt(new ie(700,700,70,48,1,!0).translate(0,27,0),new re({color:3355443,alphaMap:f,transparent:!0,side:we,depthWrite:!1})),this.envScene.add(this.envHorizon)}this.envLights=new de;for(let c=0;c<10;c++){let h=new Mt(new Se(60,14),new re({color:16760960,side:De})),u=c/10*Math.PI*2;h.position.set(Math.cos(u)*600,120+c%3*30,Math.sin(u)*600),h.lookAt(0,0,0),this.envLights.add(h)}this.envScene.add(this.envLights),this.envRT=null,this._envKey="",this.shadowSize=42}setQuality(t){if(this.sun.castShadow=t.shadows,t.shadows){let e=t.shadowMap;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.mapSize.set(e,e),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null))}this.viewDist=t.viewDist,this._envKey=""}setEnvironment(t){this.env=t;for(let[e,n]of[[this.skyline,Tf(t.seed,t.skyline.density,t.skyline.height)],[this.mountains,Af(t.seed+1,t.mountains.height)]]){let i=e.material.uniforms;i.map.value&&i.map.value.dispose(),i.map.value=n,n.wrapS=_n}this.skyline.material.uniforms.arc.value.set(t.skyline.arc[0],t.skyline.arc[1]),this.skyline.visible=t.skyline.density>0,this.mountains.visible=t.mountains.height>0,this.envGround.material.color.setHex(t.terrain.far).multiplyScalar(.6),this._envKey=""}setTime(t,e){this.hours=(t%24+24)%24,this.cycle=!!e,this._envKey=""}setWeather(t){this.weather=t,this.overcastTarget=t==="rain"?1:t==="cloudy"?.75:0,this.rainTarget=t==="rain"?1:0,this._envKey=""}snapWeather(){this.overcast=this.overcastTarget??0,this.rainAmt=this.rainTarget??0,this.wet=this.rainAmt}sunElevation(t){if(t>=6.4&&t<=19.1)return 64*Math.sin((t-6.4)/12.7*Math.PI);let e=t<6.4?t+24:t;return-38*Math.sin((e-19.1)/11.3*Math.PI)}update(t,e,n){this.cycle&&(this.hours=(this.hours+t/40)%24);let i=this.overcastTarget??0,s=this.rainTarget??0;this.overcast+=vt(i-this.overcast,-t*.15,t*.15),this.rainAmt+=vt(s-this.rainAmt,-t*.2,t*.2),this.wet+=vt(this.rainAmt-this.wet,-t*.03,t*.08);let o=this.env,a=this.sunElevation(this.hours),l=(o?.sunAz??70)*Math.PI/180,c=vt((this.hours-6.4)/12.7,0,1),h=Tt(Math.PI*.5,Math.PI*1.5,c)+l,u=a*Math.PI/180;this.sunDir.set(Math.cos(u)*Math.sin(h),Math.sin(u),-Math.cos(u)*Math.cos(h)).normalize(),this.night=ae(3,-8,a),this.elevation=a,this.golden=ae(22,4,a)*ae(-4,1,a);let d=this.sky.material.uniforms,f=Tt(o?.sky.turbidity??4,16,this.overcast);d.turbidity.value=f,d.rayleigh.value=Tt(o?.sky.rayleigh??2,.6,this.overcast),d.mieCoefficient.value=Tt(.005,.02,this.overcast),d.mieDirectionalG.value=.8,d.sunPosition.value.copy(this.sunDir);let p=Ey(a),x=new St,g=new St,m=new St,_=new St,v,y,S,b;p.a?(za(p.a.light,p.b.light,p.t,x),za(p.a.sky,p.b.sky,p.t,g),za(p.a.gnd,p.b.gnd,p.t,m),za(p.a.fog,p.b.fog,p.t,_),v=Tt(p.a.lightI,p.b.lightI,p.t),y=Tt(p.a.hemiI,p.b.hemiI,p.t),S=Tt(p.a.exp,p.b.exp,p.t),b=Tt(p.a.envI,p.b.envI,p.t)):(x.setHex(p.light),g.setHex(p.sky),m.setHex(p.gnd),_.setHex(p.fog),v=p.lightI,y=p.hemiI,S=p.exp,b=p.envI);let T=this.overcast,R=new St().setScalar((x.r+x.g+x.b)/3);x.lerp(R,T*.7),v*=1-T*.78,y*=1+T*.35;let w=new St(9146777).multiplyScalar(Tt(1,.12,this.night));_.lerp(w,T*.75),S+=T*.12;let M=o?.id==="night"||o?.id==="urban"||o?.id==="la"?1:.35;if(this.night>0){let gt=new St(3811876).multiplyScalar(M);_.lerp(new St(1316900).add(gt.clone().multiplyScalar(.4)),this.night*.6)}let C=new I(-this.sunDir.x*.6+.2,.75,-this.sunDir.z*.6-.3).normalize();this.lightDir.copy(a>-2?this.sunDir:C),a>-2&&a<2&&(v*=ae(-2,2,a)),this.sun.color.copy(x),this.sun.intensity=v,this.hemi.color.copy(g),this.hemi.groundColor.copy(m),this.hemi.intensity=y,this.fogColor.copy(_),this.scene.fog.color.copy(_);let D=this.viewDist??900,k=o?.fogScale??1,B=Tt(D*1.08*Math.min(1.25,k),380,this.rainAmt*.85+T*.15);this.scene.fog.far=B,this.scene.fog.near=Tt(D*.12*k,25,this.rainAmt),this.exposure=S,this.envIntensity=b*(1-T*.3);let $=this.glow.material.uniforms;$.amount.value=this.night*(.6+M*.6)+T*.25*(1-this.night),$.horizon.value.setHex(4862760).multiplyScalar(M).lerp(new St(3159100),T*.6),$.top.value.setHex(330004).lerp(new St(1382172),T),this.stars.material.opacity=this.night*(1-T)*(M>.5?.55:1),this.moon.material.opacity=ae(.4,1,this.night)*(1-T*.9);let G=this.clouds.material.uniforms;G.coverage.value=Tt(o?.clouds??.3,1,T),G.overcast.value=ae(.4,1,T);let ct=new St().copy(x).multiplyScalar(.5+.5*(1-this.night)).lerp(new St(1,1,1),ae(5,30,a)*.6);G.lit.value.copy(ct).multiplyScalar(Tt(1.4,.25,this.night)).lerp(_,T*.5),G.shade.value.copy(_).multiplyScalar(Tt(.85,.6,T)),this.cloudOffset.x+=t*6,this.cloudOffset.y+=t*2;for(let[gt,_t,wt]of[[this.mountains,o?.mountains.color??7829367,.62],[this.skyline,6121074,.45]]){let It=gt.material.uniforms;It.color.value.setHex(_t).multiplyScalar(Tt(1,.12,this.night)),It.haze.value.copy(_),It.hazeAmt.value=Tt(wt,.95,T*.8+this.rainAmt*.15),It.night.value=gt===this.skyline?this.night*(1-this.rainAmt*.6):0,It.opacity.value=1}let H=this.ovc.material.uniforms;H.amount.value=ae(.35,1,T)*.93,H.horizon.value.copy(_).multiplyScalar(1.08),H.top.value.copy(_).multiplyScalar(.82),H.sunDir.value.copy(this.sunDir),this.ovc.visible=H.amount.value>.002,this.ovc.position.copy(e),this.sky.position.copy(e),this.glow.position.copy(e),this.stars.position.copy(e),this.moon.position.copy(e).addScaledVector(C,3800),this.clouds.position.set(e.x,n+1100,e.z),G.camPos.value.copy(e),G.offset.value.copy(this.cloudOffset),this.mountains.position.set(e.x,n+120+260-40,e.z),this.skyline.position.set(e.x,n+210-25,e.z);let X=`${Math.round(this.hours*4)}|${Math.round(T*10)}|${o?.id}`;X!==this._envKey&&(this._envKey=X,this._rebuildEnv(_)),this.scene.environmentIntensity=this.envIntensity}updateShadow(t){let e=this.sun,i=this.shadowSize*2/e.shadow.mapSize.x,s=Math.round(t.x/i)*i,o=Math.round(t.z/i)*i;e.target.position.set(s,t.y,o),e.position.set(s+this.lightDir.x*150,t.y+Math.max(.15,this.lightDir.y)*150,o+this.lightDir.z*150),e.target.updateMatrixWorld()}_rebuildEnv(t){let e=this.sky.material.uniforms,n=this.envSky.material.uniforms;for(let s of["turbidity","rayleigh","mieCoefficient","mieDirectionalG"])n[s].value=e[s].value;n.sunPosition.value.copy(e.sunPosition.value),this.envCloud.material.opacity=this.overcast*.9,this.envCloud.material.color.copy(t).multiplyScalar(1.1),this.envGround.material.color.copy(t).multiplyScalar(.24),this.envHorizon&&this.envHorizon.material.color.copy(t).multiplyScalar(Tt(.42,.3,this.night)).lerp(t,this.overcast*.35),this.envLights.visible=this.night>.4;for(let s of this.envLights.children)s.material.color.setHex(this.env?.lights?.color??16760960).multiplyScalar(1.5);let i=this.envRT;this.envRT=this.pmrem.fromScene(this.envScene,0,.1,2e3),this.scene.environment=this.envRT.texture,i&&i.dispose()}};var zi=[{id:"kaze",name:"Kaze WRS",maker:"KAZE",cls:"Japanese Sports Sedan",blurb:"Turbo flat-four, all-wheel drive and a rally-bred chassis. Forgiving and quick through traffic.",cost:0,seats:4,body:{L:4.6,W:1.8,H:1.47,wb:2.67,fa:.2065,wr:.33,tw:.245,top:[[0,.56],[.012,.66],[.04,.72],[.1,.78],[.2,.83],[.3,.9],[.34,.93],[.55,.97],[.76,1],[.88,1.02],[.95,1.02],[.985,.95],[1,.8]],bottom:[[0,.33],[.03,.22],[.1,.16],[.9,.17],[.97,.26],[1,.42]],plan:{f:.07,r:.05,fp:2.6,rp:2.8,hips:.02,flare:.025},sect:{s:.46,nt:3,nb:7},cabin:{t0:.325,t1:.445,t2:.685,t3:.81,roof:1.47,wBot:.86,tumble:.2,tB:.565},lights:{head:"slim",headY:.66,headX:.6,tail:"split",tailY:.9,tailX:.58},grille:"wide",scoop:.17,exhaust:"quad",deckT:.95},phys:{mass:1520,hp:310,redline:6800,limiter:7100,idle:850,curve:"turbo",gears:[3.64,2.24,1.52,1.13,.92,.78],topSpeed:158,drive:"AWD",frontSplit:.41,weightFront:.6,cgH:.52,grip:1.08,tireB:15,brakeG:1.15,steerLock:34,inertia:1,downforce:.2,rollGain:.0065,susFreq:1.6,turboLag:.55,shiftTime:.2},engine:{type:"boxer4",turbo:!0,flutter:!0,label:"2.5L Turbo Flat-4"},defaults:{color:"#1d4fbf",finish:"pearl",wheels:"five",rimColor:"#c9a34a",tint:1,suspension:"stock",spoiler:"wing",kit:"stock",exhaust:"stock",caliper:"#c8102e"}},{id:"sakura",name:"Sakura Type-S",maker:"SAKURA",cls:"Modified Street Hatch",blurb:"High-revving front-drive hot hatch. Light, sharp on turn-in, grips hard when you hold the throttle.",cost:0,seats:4,body:{L:4.56,W:1.88,H:1.42,wb:2.7,fa:.21,wr:.335,tw:.245,top:[[0,.55],[.012,.64],[.04,.71],[.1,.77],[.2,.84],[.3,.92],[.32,.94],[.6,.99],[.85,1.02],[.95,1],[.99,.9],[1,.72]],bottom:[[0,.3],[.03,.2],[.1,.14],[.9,.16],[.97,.25],[1,.4]],plan:{f:.075,r:.05,fp:2.4,rp:3,hips:.03,flare:.03},sect:{s:.46,nt:3,nb:7},cabin:{t0:.32,t1:.45,t2:.63,t3:.97,roof:1.42,wBot:.85,tumble:.22,tB:.54,quarter:.86,rearCurve:1.6},lights:{head:"slim",headY:.66,headX:.64,tail:"split",tailY:.9,tailX:.62,tailW:.38},grille:"wide",exhaust:"center",deckT:.93},phys:{mass:1390,hp:320,redline:7e3,limiter:7300,idle:900,curve:"turbo",gears:[3.63,2.12,1.53,1.13,.91,.73],topSpeed:169,drive:"FWD",frontSplit:1,weightFront:.62,cgH:.5,grip:1.1,tireB:16,brakeG:1.2,steerLock:35,inertia:.95,downforce:.25,rollGain:.006,susFreq:1.75,turboLag:.45,shiftTime:.18},engine:{type:"i4",turbo:!0,label:"2.0L Turbo I4"},defaults:{color:"#f2f2f0",finish:"gloss",wheels:"multi",rimColor:"#1a1a1c",tint:2,suspension:"lowered",spoiler:"wing",kit:"street",exhaust:"sport",caliper:"#c8102e"}},{id:"raiden",name:"Raiden RX",maker:"RAIDEN",cls:"Japanese Rotary Coupe",blurb:"Twin-rotor turbo screamer with a featherweight chassis. Balanced, playful, revs to the moon.",cost:15e3,seats:2,body:{L:4.29,W:1.76,H:1.23,wb:2.43,fa:.2,wr:.315,tw:.245,top:[[0,.5],[.015,.57],[.05,.62],[.12,.66],[.2,.7],[.3,.75],[.37,.78],[.6,.83],[.8,.86],[.92,.85],[.98,.8],[1,.66]],bottom:[[0,.29],[.04,.19],[.1,.14],[.9,.15],[.97,.24],[1,.38]],plan:{f:.09,r:.06,fp:2.2,rp:2.6,hips:.05,waist:.03,flare:.02},sect:{s:.5,nt:2.6,nb:6},cabin:{t0:.37,t1:.5,t2:.62,t3:.91,roof:1.23,wBot:.8,tumble:.3,quarter:.73,rearCurve:1.1,crown:.04},lights:{head:"popup",headY:.52,headX:.56,tail:"round",tailY:.76,tailX:.58},grille:"wide",grilleY:.12,exhaust:"dual",deckT:.95},phys:{mass:1290,hp:360,redline:8200,limiter:8500,idle:950,curve:"turbo",gears:[3.48,2.02,1.39,1,.72],topSpeed:176,drive:"RWD",frontSplit:0,weightFront:.5,cgH:.46,grip:1.08,tireB:17,brakeG:1.2,steerLock:36,inertia:.93,downforce:.2,rollGain:.006,susFreq:1.8,turboLag:.7,shiftTime:.2},engine:{type:"rotary",turbo:!0,flutter:!0,label:"1.3L Twin-Turbo Rotary"},defaults:{color:"#b3121c",finish:"gloss",wheels:"mesh",rimColor:"#b9bcc0",tint:1,suspension:"lowered",spoiler:"wing",kit:"stock",exhaust:"sport",caliper:"#c9a34a"}},{id:"kessler",name:"Kessler GT",maker:"KESSLER",cls:"German Luxury Super-Sedan",blurb:"600+ hp twin-turbo V8 in a business suit. Heavy but planted, devastating roll-on pace.",cost:4e4,seats:5,body:{L:4.98,W:1.9,H:1.47,wb:2.98,fa:.189,wr:.35,tw:.275,top:[[0,.6],[.012,.7],[.04,.76],[.1,.81],[.2,.86],[.3,.93],[.33,.95],[.55,.99],[.76,1.02],[.9,1.04],[.96,1.03],[.99,.94],[1,.78]],bottom:[[0,.34],[.03,.22],[.1,.15],[.9,.16],[.97,.27],[1,.42]],plan:{f:.065,r:.05,fp:2.8,rp:3,hips:.02,flare:.015},sect:{s:.47,nt:3.2,nb:7},cabin:{t0:.32,t1:.435,t2:.69,t3:.825,roof:1.47,wBot:.86,tumble:.2,tB:.56},lights:{head:"slim",headY:.72,headX:.66,headW:.42,tail:"split",tailY:.93,tailX:.62,tailW:.44},grille:"kidney",exhaust:"quad",deckT:.96},phys:{mass:1910,hp:617,redline:7e3,limiter:7200,idle:700,curve:"turbo",gears:[5,3.2,2.14,1.72,1.31,1,.82,.64],topSpeed:190,drive:"AWD",frontSplit:.32,weightFront:.53,cgH:.52,grip:1.12,tireB:14,brakeG:1.25,steerLock:33,inertia:1.1,downforce:.25,rollGain:.006,susFreq:1.55,turboLag:.5,shiftTime:.15},engine:{type:"v8",turbo:!0,label:"4.4L Twin-Turbo V8"},defaults:{color:"#2b2f33",finish:"metallic",wheels:"split",rimColor:"#2a2c30",tint:2,suspension:"stock",spoiler:"lip",kit:"stock",exhaust:"stock",caliper:"#1f4ea3"}},{id:"strada",name:"Strada 4S",maker:"STRADA",cls:"High-Performance Coupe",blurb:"Rear-engined twin-turbo flat-six. Enormous traction and brakes; the tail bites if you lift mid-corner.",cost:8e4,seats:2,body:{L:4.52,W:1.85,H:1.3,wb:2.45,fa:.23,wr:.35,tw:.28,top:[[0,.52],[.015,.6],[.05,.66],[.12,.71],[.23,.76],[.31,.81],[.34,.83],[.6,.92],[.8,.96],[.9,.96],[.97,.9],[1,.74]],bottom:[[0,.3],[.04,.19],[.1,.14],[.9,.15],[.97,.24],[1,.38]],plan:{f:.08,r:.07,fp:2.2,rp:2.2,hips:.07,waist:.03},sect:{s:.5,nt:2.5,nb:6},cabin:{t0:.34,t1:.47,t2:.58,t3:.975,roof:1.3,wBot:.82,tumble:.26,quarter:.72,rearCurve:1.5,crown:.04},lights:{head:"round",headY:.68,headX:.62,tail:"bar",tailY:.88,tailH:.05},grille:"super",grilleY:.24,exhaust:"center",deckT:.95},phys:{mass:1530,hp:540,redline:7500,limiter:7600,idle:850,curve:"turbo",gears:[4.89,3.17,2.15,1.56,1.18,.94,.76,.61],topSpeed:193,drive:"RWD",frontSplit:0,weightFront:.39,cgH:.46,grip:1.16,rearGrip:1.05,tireB:17,brakeG:1.35,steerLock:34,inertia:1.05,downforce:.35,rollGain:.005,susFreq:1.9,turboLag:.35,shiftTime:.1},engine:{type:"flat6",turbo:!0,label:"3.8L Twin-Turbo Flat-6"},defaults:{color:"#c9cfd4",finish:"metallic",wheels:"five",rimColor:"#2a2c30",tint:1,suspension:"stock",spoiler:"duck",kit:"stock",exhaust:"stock",caliper:"#e8c21c"}},{id:"ironhorse",name:"Ironhorse 7.0",maker:"IRONHORSE",cls:"American Muscle",blurb:"Supercharged V8 with 760 hp and a whine you can hear in the next county. Heavy, loud, a handful.",cost:13e4,seats:4,body:{L:4.95,W:1.93,H:1.38,wb:2.85,fa:.186,wr:.36,tw:.285,top:[[0,.66],[.012,.76],[.04,.82],[.1,.86],[.2,.89],[.3,.93],[.41,.97],[.6,.99],[.8,1],[.92,1],[.97,.98],[.995,.9],[1,.78]],bottom:[[0,.36],[.03,.24],[.1,.16],[.9,.17],[.97,.28],[1,.44]],plan:{f:.05,r:.04,fp:3.5,rp:3.5,hips:.04},sect:{s:.5,nt:3.6,nb:8},cabin:{t0:.41,t1:.52,t2:.64,t3:.88,roof:1.38,wBot:.84,tumble:.24,quarter:.7,rearCurve:1.2},lights:{head:"slim",headY:.77,headX:.68,headW:.36,headH:.08,tail:"tri",tailY:.9,tailX:.62},grille:"wide",grilleY:.32,scoop:.2,exhaust:"quad",deckT:.96},phys:{mass:1880,hp:760,redline:6500,limiter:6600,idle:750,curve:"sc",gears:[3.01,2.07,1.43,1,.84,.56],topSpeed:196,drive:"RWD",frontSplit:0,weightFront:.55,cgH:.55,grip:1.06,rearGrip:1.1,tireB:13,brakeG:1.12,steerLock:33,inertia:1.12,downforce:.15,rollGain:.0085,susFreq:1.4,turboLag:0,shiftTime:.22},engine:{type:"v8cross",sc:!0,label:"7.0L Supercharged V8"},defaults:{color:"#e05a12",finish:"gloss",wheels:"deep",rimColor:"#1a1a1c",tint:2,suspension:"stock",spoiler:"lip",kit:"stock",exhaust:"sport",caliper:"#1a1a1c"}},{id:"veloce",name:"Veloce SV-R",maker:"VELOCE",cls:"Mid-Engine Supercar",blurb:"Naturally aspirated V10, all-wheel drive, 8,500 rpm. Razor-sharp turn-in and real downforce.",cost:22e4,seats:2,body:{L:4.52,W:1.95,H:1.17,wb:2.62,fa:.221,wr:.35,tw:.29,top:[[0,.42],[.015,.5],[.06,.56],[.14,.62],[.22,.67],[.26,.7],[.45,.86],[.6,.93],[.8,.97],[.92,.97],[.98,.9],[1,.72]],bottom:[[0,.26],[.04,.16],[.1,.12],[.9,.13],[.97,.2],[1,.32]],plan:{f:.1,r:.05,fp:2,rp:3,hips:.06,waist:.05,flare:.02},sect:{s:.48,nt:2.4,nb:6},cabin:{t0:.26,t1:.43,t2:.56,t3:.86,roof:1.17,wBot:.78,tumble:.3,quarter:.66,rearCurve:.85,crown:.03,wsCurve:.7},lights:{head:"wide",headY:.56,headX:.66,headW:.38,headH:.05,tail:"bar",tailY:.86,tailH:.04},grille:"super",grilleY:.14,exhaust:"center",deckT:.96},phys:{mass:1420,hp:640,redline:8500,limiter:8700,idle:1e3,curve:"na",gears:[3.13,2.59,1.96,1.58,1.3,1.07,.89],topSpeed:202,drive:"AWD",frontSplit:.3,weightFront:.43,cgH:.42,grip:1.22,tireB:18,brakeG:1.45,steerLock:33,inertia:1,downforce:.6,rollGain:.0045,susFreq:2.1,turboLag:0,shiftTime:.08},engine:{type:"v10",label:"5.2L V10"},defaults:{color:"#7cc42d",finish:"pearl",wheels:"turbine",rimColor:"#1a1a1c",tint:2,suspension:"stock",spoiler:"none",kit:"aggressive",exhaust:"stock",caliper:"#c8102e"}},{id:"aether",name:"Aether X1",maker:"AETHER",cls:"Hypercar",blurb:"1,150 hp twin-turbo V8 and active aero. Absurd speed: 250 mph is on the table if the road is clear.",cost:4e5,seats:2,body:{L:4.6,W:2.04,H:1.15,wb:2.71,fa:.224,wr:.36,tw:.3,top:[[0,.44],[.015,.52],[.06,.58],[.14,.64],[.22,.68],[.28,.72],[.45,.88],[.6,.94],[.8,.97],[.92,.97],[.98,.88],[1,.7]],bottom:[[0,.24],[.04,.15],[.1,.11],[.9,.12],[.97,.18],[1,.3]],plan:{f:.11,r:.06,fp:1.9,rp:2.6,hips:.08,waist:.07,flare:.04},sect:{s:.46,nt:2.2,nb:5.5},cabin:{t0:.28,t1:.43,t2:.55,t3:.78,roof:1.15,wBot:.72,tumble:.32,quarter:.62,rearCurve:.9,crown:.04,wsCurve:.7},lights:{head:"wide",headY:.58,headX:.7,headW:.34,headH:.05,tail:"bar",tailY:.84,tailH:.035},grille:"super",grilleY:.12,exhaust:"center",deckT:.95},phys:{mass:1430,hp:1150,redline:8250,limiter:8400,idle:950,curve:"turbo",gears:[3.4,2.5,1.93,1.53,1.24,1.02,.85],topSpeed:255,drive:"RWD",frontSplit:0,weightFront:.44,cgH:.4,grip:1.3,rearGrip:1.08,tireB:18,brakeG:1.55,steerLock:32,inertia:1,downforce:1,rollGain:.004,susFreq:2.2,turboLag:.4,shiftTime:.06},engine:{type:"v8flat",turbo:!0,label:"5.0L Twin-Turbo V8"},defaults:{color:"#14161a",finish:"gloss",wheels:"turbine",rimColor:"#c9a34a",tint:3,suspension:"stock",spoiler:"gt",kit:"aggressive",exhaust:"sport",caliper:"#c9a34a"}}],wn=Object.fromEntries(zi.map(r=>[r.id,r])),tp={colors:["#f2f2f0","#c9cfd4","#7d848b","#2b2f33","#0c0d0f","#b3121c","#e05a12","#f2c230","#7cc42d","#0f7a4a","#1d4fbf","#38b6e0","#5b2d8f","#e04f9a","#8a6a3c","#c9a34a"],finishes:[["gloss","Gloss"],["metallic","Metallic"],["pearl","Pearl"],["matte","Matte"],["chrome","Chrome"]],wheels:[["five","5-Spoke"],["split","Split Spoke"],["mesh","Mesh"],["multi","Multi-Spoke"],["deep","Deep Dish"],["turbine","Turbine"]],rimColors:["#c9ccd0","#5c6066","#1a1a1c","#c9a34a","#8a5a2c","#f2f2f0"],calipers:["#c8102e","#e8c21c","#1f4ea3","#1a1a1c","#c9a34a","#7cc42d"],tints:[["0","Light"],["1","Medium"],["2","Dark"],["3","Limo"]],suspension:[["stock","Stock"],["lowered","Lowered"],["slammed","Slammed"]],spoilers:[["none","None"],["lip","Lip"],["duck","Ducktail"],["wing","Wing"],["gt","GT Wing"]],kits:[["stock","Stock"],["street","Street"],["aggressive","Aggressive"],["wide","Widebody"]],exhausts:[["stock","Stock"],["sport","Sport"],["straight","Straight Pipe"]]},Iy=[[0,.6],[.012,.69],[.04,.75],[.1,.8],[.2,.84],[.3,.91],[.34,.94],[.55,.98],[.76,1],[.9,1.02],[.96,1],[.99,.9],[1,.76]],jf=[[0,.36],[.03,.24],[.1,.17],[.9,.18],[.97,.28],[1,.44]],ep=[{id:"sedan",weight:26,mass:1550,laneBias:0,body:{L:4.88,W:1.84,H:1.44,wb:2.82,fa:.2,wr:.33,tw:.235,top:Iy,bottom:jf,cabin:{t0:.34,t1:.46,t2:.66,t3:.8,roof:1.44,wBot:.86,tumble:.2,tB:.56},lights:{head:"slim",headY:.7,headX:.62,tail:"split",tailY:.9,tailX:.58},grille:"wide",exhaust:"dual"}},{id:"compact",weight:16,mass:1350,laneBias:.3,body:{L:4.63,W:1.78,H:1.44,wb:2.7,fa:.2,wr:.315,tw:.225,top:[[0,.6],[.012,.68],[.04,.74],[.1,.79],[.2,.84],[.3,.92],[.34,.95],[.55,.99],[.76,1],[.9,1.01],[.96,.99],[.99,.9],[1,.76]],bottom:jf,cabin:{t0:.34,t1:.46,t2:.67,t3:.81,roof:1.44,wBot:.86,tumble:.2,tB:.56},lights:{head:"slim",headY:.7,headX:.6,tail:"bar",tailY:.9,tailH:.07},grille:"wide",exhaust:"single"}},{id:"hatch",weight:7,mass:1300,laneBias:.4,body:{L:4.28,W:1.79,H:1.46,wb:2.63,fa:.21,wr:.315,tw:.225,top:[[0,.58],[.012,.67],[.04,.73],[.1,.78],[.2,.83],[.3,.92],[.33,.95],[.6,1],[.85,1.03],[.97,1],[.995,.9],[1,.75]],bottom:[[0,.34],[.03,.22],[.1,.16],[.9,.17],[.97,.27],[1,.42]],cabin:{t0:.33,t1:.46,t2:.78,t3:.985,roof:1.46,wBot:.86,tumble:.18,tB:.56,quarter:.88,rearCurve:2.2},lights:{head:"slim",headY:.7,headX:.6,tail:"split",tailY:.95,tailX:.6,tailW:.3},grille:"wide",exhaust:"single"}},{id:"suv",weight:16,mass:2100,laneBias:-.1,body:{L:4.95,W:1.97,H:1.78,wb:2.95,fa:.19,wr:.38,tw:.255,trimH:.2,top:[[0,.78],[.012,.88],[.04,.95],[.1,1],[.2,1.04],[.29,1.1],[.32,1.12],[.6,1.15],[.85,1.17],[.97,1.16],[.995,1.05],[1,.9]],bottom:[[0,.45],[.04,.3],[.1,.24],[.9,.25],[.97,.35],[1,.5]],sect:{s:.5,nt:3.6,nb:8},plan:{f:.06,r:.04,fp:3,rp:3.5},cabin:{t0:.32,t1:.45,t2:.92,t3:.99,roof:1.78,wBot:.88,tumble:.12,tB:.55,quarter:.86,rearCurve:3},lights:{head:"slim",headY:.92,headX:.66,tail:"vertical",tailY:1.02},grille:"wide",grilleY:.5,exhaust:"dual",roofRails:!0}},{id:"crossover",weight:15,mass:1700,laneBias:.1,body:{L:4.6,W:1.86,H:1.68,wb:2.69,fa:.2,wr:.36,tw:.235,trimH:.18,top:[[0,.72],[.012,.82],[.04,.88],[.1,.93],[.2,.98],[.3,1.04],[.33,1.06],[.6,1.1],[.85,1.12],[.97,1.1],[.995,1],[1,.86]],bottom:[[0,.42],[.04,.28],[.1,.22],[.9,.23],[.97,.33],[1,.48]],sect:{s:.5,nt:3.2,nb:7},cabin:{t0:.33,t1:.47,t2:.88,t3:.985,roof:1.68,wBot:.87,tumble:.15,tB:.56,quarter:.84,rearCurve:2.2},lights:{head:"slim",headY:.86,headX:.62,tail:"split",tailY:1,tailX:.62,tailW:.34},grille:"wide",grilleY:.42,exhaust:"dual"}},{id:"pickup",weight:9,mass:2400,laneBias:0,body:{L:5.9,W:2.03,H:1.95,wb:3.68,fa:.161,wr:.41,tw:.27,trimH:.12,top:[[0,.95],[.012,1.05],[.04,1.12],[.1,1.18],[.2,1.22],[.3,1.25],[.34,1.27],[.5,1.27],[.55,1.28],[.9,1.28],[.98,1.27],[.995,1.2],[1,1.05]],bottom:[[0,.5],[.03,.36],[.1,.3],[.9,.32],[.97,.42],[1,.55]],sect:{s:.52,nt:4,nb:9},plan:{f:.04,r:.025,fp:3.5,rp:4},cabin:{t0:.3,t1:.38,t2:.55,t3:.565,roof:1.95,wBot:.9,tumble:.1,tB:.45,rearCurve:1},lights:{head:"slim",headY:1.05,headX:.7,headW:.38,headH:.14,tail:"vertical",tailY:1.05},grille:"wide",grilleY:.62,exhaust:"single",bed:.58}},{id:"van",weight:6,mass:2050,laneBias:.3,body:{L:5.1,W:1.99,H:1.77,wb:3.03,fa:.19,wr:.35,tw:.235,trimH:.1,top:[[0,.68],[.012,.78],[.04,.85],[.1,.9],[.18,.98],[.22,1.02],[.5,1.06],[.8,1.08],[.97,1.06],[.995,.95],[1,.8]],bottom:[[0,.4],[.04,.27],[.1,.2],[.9,.21],[.97,.3],[1,.45]],sect:{s:.5,nt:3.4,nb:8},cabin:{t0:.22,t1:.36,t2:.94,t3:.995,roof:1.77,wBot:.88,tumble:.1,tB:.46,rearCurve:3.5},lights:{head:"slim",headY:.85,headX:.66,tail:"vertical",tailY:1.05},grille:"wide",exhaust:"single"}},{id:"sport",weight:3,mass:1500,laneBias:-.5,body:{...zi[4].body,lights:{...zi[4].body.lights}}},{id:"box",kind:"truck",weight:4,mass:7500,laneBias:.8,truck:!0,body:{L:7.6,W:2.44,H:3.5,wr:.48,cabL:2,cabH:2.7,hoodL:.9,cargoFloor:1.1,axles:[{z:-3.8+1.25,steer:!0},{z:3.8-1.7,dual:!0}]}},{id:"semi",kind:"truck",weight:3,mass:16e3,laneBias:1,truck:!0,body:{L:19,W:2.6,H:4.05,wr:.52,cabL:2.3,cabH:3,hoodL:1.9,fairing:.9,cargoZ0:-9.5+.25+1.9+2.3+.7,cargoFloor:1.25,stacks:!0,axles:[{z:-9.5+1.35,steer:!0},{z:-9.5+5.2,dual:!0},{z:-9.5+6.5,dual:!0},{z:9.5-2.6,dual:!0},{z:9.5-1.35,dual:!0}]}}],np=[["#f0f0ee",22],["#151618",17],["#6d7278",15],["#b7bcc1",13],["#1f3a6e",8],["#8e1015",7],["#9b8a70",4],["#24402f",3],["#5b0f16",3],["#2f5f9a",3],["#d9a21b",1.5],["#c4561a",1.5],["#e7e2d4",2]];var eo=new I;function Dn(r,t,e,n,i,s){let o=2*Math.PI*i/4,a=Math.max(s-2*i,0),l=Math.PI/4;eo.copy(t),eo[n]=0,eo.normalize();let c=.5*o/(o+a),h=1-eo.angleTo(r)/l;return Math.sign(eo[e])===1?h*c:a/(o+a)+c+c*(1-h)}var sr=class extends zt{constructor(t=1,e=1,n=1,i=2,s=.1){if(i=i*2+1,s=Math.min(t/2,e/2,n/2,s),super(1,1,1,i,i,i),i===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new I,l=new I,c=new I(t,e,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,p=new I,x=.5/i;for(let g=0,m=0;g<h.length;g+=3,m+=2)switch(a.fromArray(h,g),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[g+0]=c.x*Math.sign(a.x)+l.x*s,h[g+1]=c.y*Math.sign(a.y)+l.y*s,h[g+2]=c.z*Math.sign(a.z)+l.z*s,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/f)){case 0:p.set(1,0,0),d[m+0]=Dn(p,l,"z","y",s,n),d[m+1]=1-Dn(p,l,"y","z",s,e);break;case 1:p.set(-1,0,0),d[m+0]=1-Dn(p,l,"z","y",s,n),d[m+1]=1-Dn(p,l,"y","z",s,e);break;case 2:p.set(0,1,0),d[m+0]=1-Dn(p,l,"x","z",s,t),d[m+1]=Dn(p,l,"z","x",s,n);break;case 3:p.set(0,-1,0),d[m+0]=1-Dn(p,l,"x","z",s,t),d[m+1]=1-Dn(p,l,"z","x",s,n);break;case 4:p.set(0,0,1),d[m+0]=1-Dn(p,l,"x","y",s,t),d[m+1]=1-Dn(p,l,"y","x",s,e);break;case 5:p.set(0,0,-1),d[m+0]=Dn(p,l,"x","y",s,t),d[m+1]=1-Dn(p,l,"y","x",s,e);break}}};var rr=(r,t,e,n)=>new sr(r,t,e,2,Math.min(n,r/2-.001,t/2-.001,e/2-.001));function Ly(r,t=24){let{s:e,nt:n,nb:i}=r,s=r.tuck??.05,o=r.crease??.011,a=e+(r.creaseY??.07),l=r.creaseW??.022,c=r.scallop??.012,h=r.scallopY??e*.55,u=[],d=90;for(let S=0;S<=d;S++){let b=-Math.PI/2+S/d*(Math.PI/2),T=Math.cos(b),R=Math.sin(b);u.push([Math.pow(Math.abs(T),2/i),e+e*Math.sign(R)*Math.pow(Math.abs(R),2/i)])}for(let S=1;S<=d;S++){let b=S/d*(Math.PI/2);u.push([Math.pow(Math.cos(b),2/n),e+(1-e)*Math.pow(Math.sin(b),2/n)])}u[0][0]=0,u[u.length-1][0]=0;let f=(S,b)=>{if(S<=0)return 0;let T=1-s*Math.pow(1-Math.min(1,b/(e*.75)),2),R=S*T,w=Math.min(1,Math.max(0,(S-.82)/.12));return R+=w*(o*Math.exp(-Math.pow((b-a)/l,2))-c*Math.exp(-Math.pow((b-h)/.09,2))),R},p=u.map(([S,b])=>[f(S,b),b]),x=[0];for(let S=1;S<p.length;S++)x.push(x[S-1]+Math.hypot(p[S][0]-p[S-1][0],(p[S][1]-p[S-1][1])*1.6));let g=x[x.length-1],m=[a-l*1.2,a-l*.45,a,a+l*.45,a+l*1.2,e],_=[],v=0;for(let S=0;S<=t;S++){let b=S/t*g;for(;v<x.length-2&&x[v+1]<b;)v++;let T=(b-x[v])/Math.max(1e-9,x[v+1]-x[v]);_.push([p[v][0]+(p[v+1][0]-p[v][0])*T,p[v][1]+(p[v+1][1]-p[v][1])*T])}for(let S of m){if(S<=.01||S>=.99)continue;let b=1;for(;b<p.length&&p[b][1]<S;)b++;if(b>=p.length)continue;let[T,R]=p[b-1],[w,M]=p[b];_.push([T+(w-T)*((S-R)/(M-R||1e-6)),S])}_.sort((S,b)=>S[1]-b[1]||b[0]-S[0]);let y=[_[0]];for(let S=1;S<_.length;S++){let b=_[S],T=y[y.length-1];Math.abs(b[1]-T[1])<1e-4&&Math.abs(b[0]-T[0])<.001||y.push(b)}return y.sort((S,b)=>Math.abs(S[1]-b[1])>1e-6?S[1]-b[1]:S[1]<.5?S[0]-b[0]:b[0]-S[0]),y[0]=[0,0],y[y.length-1]=[0,1],y}function op(r,t){if(t<=0)return r[1][0]*0+r[0][0];for(let e=1;e<r.length;e++)if(t<=r[e][1]){let[n,i]=r[e-1],[s,o]=r[e];return n+(s-n)*((t-i)/(o-i||1e-6))}return 0}function no(r,t,e){let n=(r-t)/e;return Math.abs(n)>=1?0:.5+.5*Math.cos(n*Math.PI)}function Dy(r,t={},e=!0){let n=r.L,i=r.W,s=t.kit==="wide"?.07:0,o=t.suspension==="slammed"?.07:t.suspension==="lowered"?.035:0,a=Qh(r.top),l=Qh(r.bottom),c={f:.075,r:.06,fp:2.6,rp:2.6,hips:0,flare:0,waist:0,...r.plan||{}};c.rp=Math.max(c.rp,3.4);let h={s:.45,nt:3,nb:7,...r.sect||{}};h.nt=Math.max(h.nt,3)*1.35;let u=Ly(h,e?30:12),d=r.fa,f=-n/2+d*n,p=f+r.wb,x=(p+n/2)/n,g=r.wr,m=r.tw??.25,_=t.suspension==="slammed"?.07:t.suspension==="lowered"?.035:0,v=g+.045+_*.85,y=M=>-n/2+M*n,S=M=>{let C=i/2;M<c.f&&(C*=Math.pow(Math.max(0,1-Math.pow((c.f-M)/c.f,c.fp)),1/c.fp)),M>1-c.r&&(C*=Math.pow(Math.max(0,1-Math.pow((M-(1-c.r))/c.r,c.rp)),1/c.rp));let D=1+c.hips*no(M,x,.16)+c.flare*no(M,d,.12)-c.waist*no(M,(d+x)/2,.22);return C*D+s*(no(M,x,.11)+no(M,d,.1))*.5},b=M=>g+v-o,T=M=>{let C=l(M),D=y(M);for(let k of[f,p]){let B=D-k;Math.abs(B)<v&&(C=Math.max(C,g-o+Math.sqrt(v*v-B*B)))}return Math.min(C,a(M)-.05)},R={b:r,L:n,W:i,H:r.H,wr:g,tw:m,zf:f,zr:p,tFA:d,tRA:x,archR:v,z:y,hw:S,top:a,bot:l,botA:T,tpl:u,plan:c,sect:h,lower:o,widen:s,archTop:b},w=r.cabin;return R.dip=(M,C)=>{let D=Math.abs(C);if(D>=.8||!w)return 0;let k=0,B=r.hoodDip??.028;return M<w.t0?k=B*Math.min(1,Math.max(0,(M-.015)/.06))*Math.min(1,Math.max(0,(w.t0-M)/.03)):M>w.t3&&(k=(r.deckDip??.012)*Math.min(1,(M-w.t3)/.03)*Math.min(1,Math.max(0,(.985-M)/.04))),k*Math.pow(1-D/.8*(D/.8),1.5)},R.track=i-m-.05+s*2,R.frontZ=(M,C)=>Le(R,M,C,!0)??y(.04),R.rearZ=(M,C)=>Le(R,M,C,!1)??y(.96),R.halfWAt=(M,C)=>{let D=T(M),k=a(M),B=(C-D)/(k-D);return B<0||B>1?0:S(M)*op(u,B)},R}function Le(r,t,e,n){let s=n?0:1,o=Math.abs(t);for(let a=0;a<=70;a++){let l=n?a/70*.35:1-a/70*.35,c=r.halfWAt(l,e);if(c>5e-4&&c>=o){if(a===0)return r.z(l);let h=s,u=l;for(let d=0;d<10;d++){let f=(h+u)/2,p=r.halfWAt(f,e);p>5e-4&&p>=o?u=f:h=f}return r.z(u)}s=l}return null}function Uy(r=64){let t=[0,.003,.008,.015,.024,.035,.048,.062],e=[...t],n=.075,i=.925;for(let s=0;s<=r;s++)e.push(n+(i-n)*s/r);for(let s=t.length-1;s>=0;s--)e.push(1-t[s]);return e}function Ny(r,t=.06,e=!0){let n=Uy(e?72:34),i=r.tpl,s=r.sect.s,o=vt((r.track/2-r.tw/2-.03)/(r.W/2),.4,.86),a=[[0,0],[o*.5,0],[o-.004,0],[o+.012,.002]];for(let v of i)v[1]>.002&&v[0]>o+.03&&a.push([v[0],v[1]]);a.push([0,1]);let l=i.filter(v=>v[1]>s&&v[0]<=o+.03&&v[0]>0);a.splice(a.length-1,0,...l),a.sort((v,y)=>v[1]-y[1]||v[0]-y[0]);let c=[];for(let v of a)c.push([v[0],v[1]]);for(let v=a.length-2;v>=1;v--)c.push([-a[v][0],a[v][1]]);let h=c.length,u=c.map(([v,y])=>Math.abs(Math.abs(v)-(o-.004))<1e-6&&y===0?1:Math.abs(Math.abs(v)-(o+.012))<1e-6&&y===.002?2:0),d=r.track/2-r.tw/2-.03,f=new Float32Array(n.length*h*3),p=.065;for(let v=0;v<n.length;v++){let y=n[v],S=r.hw(y),b=r.bot(y),T=r.top(y),R=r.z(y),w=-1/0;for(let D of[r.zf,r.zr]){let k=R-D;Math.abs(k)<r.archR&&(w=Math.max(w,r.wr+Math.sqrt(r.archR*r.archR-k*k)-r.lower))}let M=!1;for(let D of[r.zf,r.zr])Math.abs(R-D)<r.archR*1.2&&(M=!0);let C=vt(d/Math.max(.3,S),.3,.97);for(let D=0;D<h;D++){let k=(v*h+D)*3,[B,$]=c[D];M&&u[D]&&(B=Math.sign(B)*(u[D]===1?Math.min(o-.004,C-.004):Math.min(o+.012,C+.012)));let G=b+$*(T-b)-r.lower;$>s&&(G-=r.dip(y,B)*Math.min(1,($-s)/(1-s)*2.5)),Math.abs(B)>Math.min(o,C)&&u[D]!==1&&w>-1&&($<=s+1e-4?G=Math.max(G,w):G=Math.max(G,w+p*(.6+.4*Math.min(1,(Math.abs(B)-o)/.15))));let ct=B*S;if(Math.abs(B)>o&&$>s*.5&&$<.97){let H=0;for(let gt of[r.zf,r.zr]){let _t=(R-gt)/(r.archR*1.55);Math.abs(_t)<1&&(H=Math.max(H,.5+.5*Math.cos(_t*Math.PI)))}let X=Math.min(1,($-s*.5)/(s*.5))*Math.min(1,(.97-$)/.25);ct*=1+(r.b.haunch??.022)*H*X}f[k]=ct,f[k+1]=G,f[k+2]=R}}let x=[],g=[],m=[],_=r.b.cabin;for(let v=0;v<n.length-1;v++){let y=(n[v]+n[v+1])/2,S=_&&y>_.t0+.004&&y<_.t3-.004;for(let b=0;b<h;b++){let T=v*h+b,R=v*h+(b+1)%h,w=(v+1)*h+b,M=(v+1)*h+(b+1)%h,C=(c[b][1]+c[(b+1)%h][1])/2,D=Math.max(Math.abs(c[b][0]),Math.abs(c[(b+1)%h][0]));(C<t?g:S&&C>.7&&D<.9?m:x).push(T,R,w,R,M,w)}}return[ar(f,x),ar(f,g),ar(f,m)]}function ar(r,t){let e=new Kt;return e.setAttribute("position",new oe(r.slice(),3)),e.setIndex(t),e.computeVertexNormals(),e}function ky(r,t=!0){let e=r.b.cabin,n=t?40:18,i=[];for(let v=0;v<=n;v++)i.push(e.t0+(e.t3-e.t0)*v/n);let s=v=>{let y=r.top(v);if(v<=e.t1){let T=(v-e.t0)/(e.t1-e.t0);return y+(e.roof-y)*Math.pow(Math.sin(T*Math.PI/2),e.wsCurve??.85)}if(v<=e.t2){let T=(v-e.t1)/(e.t2-e.t1);return e.roof+(e.roofArc??.02)*Math.sin(T*Math.PI)}let S=(v-e.t2)/(e.t3-e.t2),b=r.top(e.t3);return e.roof+(b-e.roof)*Math.pow(S,e.rearCurve??1.25)},o=4,a=v=>{let y=r.hw(v)*(e.wBot??.86),S=Math.min(r.top(v)-.02,io(r,v,y)+.004)-r.lower,b=Math.max(S+.002,s(v)-r.lower),T=y*(1-(e.tumble??.2)),R=b-S,w=Math.min(.075,R*.3,T*.3),M=(e.crown??.03)*Math.min(1,R/.3),C=[],D=Math.max(.001,R-w),k=1-Math.min(.3,.03/D);for(let B of[0,k/3,2*k/3,k,1])C.push([Tt(y,T,B),Tt(S,b-w,B)]);for(let B=1;B<=3;B++){let $=B/3*(Math.PI/2);C.push([T-w+Math.cos($)*w,b-w+Math.sin($)*w])}return C.push([(T-w)*.5,b+M*.75]),C.push([0,b+M]),C},c=a(i[0]).length,h=c*2-1,u=new Float32Array(i.length*h*3);for(let v=0;v<i.length;v++){let y=i[v],S=a(y),b=r.z(y);for(let T=0;T<h;T++){let R=T<c?T:h-1-T,w=T<c?1:-1,M=S[R],C=(v*h+T)*3;u[C]=M[0]*w,u[C+1]=M[1],u[C+2]=b}}let d=[],f=[],p=[],x=[],g=e.tB,m=e.quarter??2,_=e.blackPillars?p:f;for(let v=0;v<i.length-1;v++){let y=(i[v]+i[v+1])/2;for(let S=0;S<h-1;S++){let b=S<c-1?S:h-2-S,T=b<o-1?"side":b===o-1?"frame":b<o+3?"corner":"roof",R,w=y<e.t1||y<=m&&!(g&&Math.abs(y-g)<.016);T==="side"?R=w?d:g&&Math.abs(y-g)<.016?p:f:T==="frame"?R=w||g&&Math.abs(y-g)<.016?x:f:T==="corner"?R=y<e.t1?_:f:R=y<e.t1||y>e.t2?d:f;let M=v*h+S,C=v*h+S+1,D=(v+1)*h+S,k=(v+1)*h+S+1;R.push(M,C,D,C,k,D)}}return{glass:ar(u,d),paint:ar(u,f),pillar:ar(u,[...p,...x])}}function ap(r,t,e,n=!0){let i=n?28:14,s=r*(n?.7:.66),o=[[s,-t/2],[r-.035,-t/2],[r-.008,-t/2+.03],[r,-t/2+.06],[r,t/2-.06],[r-.008,t/2-.03],[r-.035,t/2],[s,t/2]].map(([m,_])=>new ut(m,_)),a=new Ks(o,i).rotateZ(-Math.PI/2),l=[],c=new Ks([new ut(s*.98,t/2-.012),new ut(s*.96,t/2-.05),new ut(s*.94,-t/2+.03),new ut(s*.9,-t/2+.02)],i).rotateZ(-Math.PI/2);l.push(c);let h=e==="deep"?.06:.025;l.push(new ie(s,s,.02,i,1,!0).rotateZ(Math.PI/2).translate(t/2-.02,0,0)),l.push(new Sa(s-h,s*1.005,i).rotateY(Math.PI/2).translate(t/2-.012,0,0));let u=t/2-(e==="deep"?.07:.035),d=s*.24;l.push(new ie(d,d*1.1,.06,12).rotateZ(Math.PI/2).translate(u,0,0));let f=(m,_,v,y,S,b=0)=>{let T=new zt(v,S-y,_);return T.translate(0,(y+S)/2,0),b&&T.rotateY(b),T.rotateX(m),T.translate(u,0,0),T};if(!n)l.push(new ie(s*.92,s*.92,.02,i).rotateZ(Math.PI/2).translate(u-.01,0,0));else if(e==="mesh")for(let m=0;m<10;m++){let _=m/10*Math.PI*2;l.push(f(_+.16,.022,.03,d*.8,s*.97)),l.push(f(_-.16,.022,.03,d*.8,s*.97))}else if(e==="multi")for(let m=0;m<10;m++)l.push(f(m/10*Math.PI*2,.035,.04,d*.8,s*.97));else if(e==="deep")for(let m=0;m<6;m++)l.push(f(m/6*Math.PI*2,.07,.04,d*.8,s*.9));else if(e==="turbine")for(let m=0;m<14;m++)l.push(f(m/14*Math.PI*2,.05,.03,d*.9,s*.95,.5));else if(e==="split")for(let m=0;m<5;m++){let _=m/5*Math.PI*2;l.push(f(_+.09,.03,.045,d*.8,s*.97)),l.push(f(_-.09,.03,.045,d*.8,s*.97))}else for(let m=0;m<5;m++)l.push(f(m/5*Math.PI*2,.075,.045,d*.8,s*.97));let p=Qe(l),x=new ie(s*.82,s*.82,.028,24).rotateZ(Math.PI/2).translate(-.01,0,0),g=new zt(.07,s*.55,.16).translate(.035,s*.55,0);return{tire:a,rim:p,disc:x,caliper:g,rimR:s}}function By(r,t,e,n){let s=Le(r,e,n,t),o=Le(r,e+.02,n,t),a=Le(r,e,n+.02,t);if(s===null||o===null||a===null)return new I(0,0,t?-1:1);let l=(o-s)/.02,c=(a-s)/.02;return(t?new I(l,c,-1):new I(-l,-c,1)).normalize()}function be(r,t,e,n=.004,i=8,s=3){let o=[],a=[],l=[],c=i+1,h=null;for(let d=0;d<=s;d++){let f=d/s;for(let p=0;p<=i;p++){let x=p/i,g=Tt(e[0][0],e[1][0],x),m=Tt(e[0][1],e[1][1],x),_=Tt(e[3][0],e[2][0],x),v=Tt(e[3][1],e[2][1],x),y=Tt(g,_,f),S=Tt(m,v,f),b=Le(r,y,S,t);b===null&&(b=h??r.z(t?.05:.95)),h=b,o.push(y,S-r.lower,b+(t?-n:n)),a.push(x,1-f)}}for(let d=0;d<s;d++)for(let f=0;f<i;f++){let p=d*c+f,x=p+1,g=p+c,m=g+1;t?l.push(p,x,g,x,m,g):l.push(p,g,x,x,g,m)}let u=new Kt;return u.setAttribute("position",new Ht(o,3)),u.setAttribute("uv",new Ht(a,2)),u.setIndex(l),u.computeVertexNormals(),u}var vi=r=>[[-r[1][0],r[1][1]],[-r[0][0],r[0][1]],[-r[3][0],r[3][1]],[-r[2][0],r[2][1]]],en=(r,t,e,n)=>[[r,n],[t,n],[t,e],[r,e]];function Vi(r,t,e,n,i,s,o=18){let a=Le(r,e,n,t),l=By(r,t,e,n),c=new He(i,o);return c.applyQuaternion(new Ze().setFromUnitVectors(new I(0,0,1),l)),c.translate(e+l.x*s,n-r.lower+l.y*s,(a??r.z(t?.05:.95))+l.z*s),c}function io(r,t,e){let n=r.botA(t),i=r.top(t);for(let s=1;s>=0;s-=.01)if(r.hw(t)*op(r.tpl,s)>=e)return n+s*(i-n)-(s>r.sect.s?r.dip(t,e/Math.max(.001,r.hw(t))):0);return n+.5*(i-n)}function iu(r,t,e,n,i,s=.007,o=.003,a=8){let l=[],c=[],h=r.z(t);for(let d=0;d<=a;d++){let f=Tt(e,n,d/a),p=Math.max(r.halfWAt(t,f),.05)+o;l.push(i*p,f-r.lower,h-s/2,i*p,f-r.lower,h+s/2)}for(let d=0;d<a;d++){let f=d*2,p=f+1,x=f+2,g=f+3;i>0?c.push(f,x,p,p,x,g):c.push(f,p,x,p,g,x)}let u=new Kt;return u.setAttribute("position",new Ht(l,3)),u.setIndex(c),u.computeVertexNormals(),u}function Fy(r,t,e,n,i=.014,s=24){let o=r.b.cabin,a=[],l=[];for(let h=0;h<=s;h++){let u=Tt(t,e,h/s),d=r.hw(u)*(o.wBot??.86),f=io(r,u,d*.985)+.006,p=n*(d*.985+.004);a.push(p,f-r.lower,r.z(u),p,f+i-r.lower,r.z(u))}for(let h=0;h<s;h++){let u=h*2,d=u+1,f=u+2,p=u+3;n>0?l.push(u,d,f,d,p,f):l.push(u,f,d,d,f,p)}let c=new Kt;return c.setAttribute("position",new Ht(a,3)),c.setIndex(l),c.computeVertexNormals(),c}function or(r,t,e=.007,n=6){let i=[],s=[],o=[];for(let u=0;u<t.length-1;u++)for(let d=0;d<n;d++){let f=d/n;o.push([Tt(t[u][0],t[u+1][0],f),Tt(t[u][1],t[u+1][1],f)])}o.push(t[t.length-1]);let a=o.map(([u,d])=>[d,io(r,u,Math.abs(d))-r.lower+.0035,r.z(u)]);for(let u=0;u<a.length;u++){let d=a[Math.max(0,u-1)],f=a[Math.min(a.length-1,u+1)],p=f[0]-d[0],x=f[2]-d[2],g=Math.hypot(p,x)||1;p/=g,x/=g;let[m,_,v]=a[u];i.push(m-x*e/2,_,v+p*e/2,m+x*e/2,_,v-p*e/2)}for(let u=0;u<a.length-1;u++){let d=u*2;s.push(d,d+2,d+1,d+1,d+2,d+3)}let l=new Kt;l.setAttribute("position",new Ht(i,3)),l.setIndex(s),l.computeVertexNormals();let c=l.attributes.normal,h=0;for(let u=0;u<c.count;u++)h+=c.getY(u);if(h<0){let u=l.index.array;for(let d=0;d<u.length;d+=3){let f=u[d+1];u[d+1]=u[d+2],u[d+2]=f}l.computeVertexNormals()}return l}function Ga(r,t=1){let e=r.attributes.position,n=r.attributes.uv;for(let i=0;i<e.count;i++)n.setXY(i,e.getX(i)*t,e.getY(i)*t);return r}function ip(r,t,e,n,i,s,o=.02,a=14){let l=[],c=[];for(let u=0;u<=a;u++){let d=Tt(-n,n,u/a),f=Le(r,d,e+.03,t);f===null&&(f=r.z(t?.04:.96));let p=t?f-i:f+i,x=t?p+s:p-s,g=e-r.lower;l.push(d,g,p,d,g,x,d,g-o,p,d,g-o,x)}for(let u=0;u<a;u++){let d=u*4,f=d+4;t?(c.push(d,d+1,f,d+1,f+1,f),c.push(d+2,f+2,d+3,d+3,f+2,f+3),c.push(d,f,d+2,f,f+2,d+2)):(c.push(d,f,d+1,d+1,f,f+1),c.push(d+2,d+3,f+2,d+3,f+3,f+2),c.push(d,d+2,f,f,d+2,f+2))}let h=new Kt;return h.setAttribute("position",new Ht(l,3)),h.setIndex(c),h.computeVertexNormals(),h}function Oy(r,t,e,n,i,s,o,a=.01,l=0){let c=Le(r,e,n,t)??r.z(t?.05:.95),h=Le(r,e-.04,n,t)??c,d=((Le(r,e+.04,n,t)??c)-h)/.08,f=-Math.atan(d)+l,p=new zt(i,s,o),x=t?c-a+o/2:c+a-o/2;return p.rotateY(f),p.translate(e,n-r.lower,x),p}function su(r){let t=r.b.cabin,e=t.t0+.04,n=r.hw(e)*(t.wBot??.86),i=r.top(e)-r.lower+.075;return{tm:e,z:r.z(e)+.03,y:i,xIn:n-.03,x:n+.14,rx:.1,ry:.058,rz:.07}}function lp(r,t={},e=!0){let n=r.body,i=Dy(n,t,e),s={paint:[],glass:[],trim:[],decal:[],mesh:[],amber:[],chrome:[],head:[],tail:[],plate:[],interior:[],kit:[],body2:[],cabinTop:[]},o={head:[],tail:[],ind:[],exhaust:[]},a=i.L,l=i.W,c=i.lower,h=e?8:4,u=e?3:2,[d,f,p]=Ny(i,n.trimH??.115,e);if(s.paint.push(d),s.trim.push(f),e?s.cabinTop.push(p):s.paint.push(p),n.cabin){let F=ky(i,e);s.glass.push(F.glass),s.paint.push(F.paint),s.decal.push(F.pillar)}s.trim.push(new zt(l*.84,.03,a*.78).translate(0,(n.bottom[2]?.[1]??.2)-c+.03,0));let x=n.lights||{},g=x.headY??i.top(.03)-.06,m=x.tailY??i.top(.97)-.07,_=x.headX??l/2-.3,v=x.head||"slim",y=F=>{for(let O of[-1,1])F(O)};if(v==="round"||v==="quad"){let F=v==="quad"?[-.085,.085]:[0],O=v==="quad"?.058:.085;y(Z=>{for(let ht of F){let it=Z*(_+ht);s.chrome.push(Vi(i,!0,it,g,O+.016,.003)),s.head.push(Vi(i,!0,it,g,O,.006)),e&&s.chrome.push(Vi(i,!0,it,g,O*.38,.009,12)),o.head.push([it,g-c,(Le(i,it,g,!0)??i.z(.04))-.02])}})}else{let F=x.headW??(v==="wide"?.36:v==="popup"?.3:.4),O=x.headH??(v==="wide"?.06:v==="popup"?.05:.1),Z=v==="wide"?.05:.025,ht=[[_-F/2,g+O/2],[_+F/2,g+O/2+Z*.4],[_+F/2,g-O/2+O*.45+Z*.4],[_-F/2,g-O/2]],it=[[ht[0][0]-.018,ht[0][1]+.016],[ht[1][0]+.014,ht[1][1]+.016],[ht[2][0]+.014,ht[2][1]-.016],[ht[3][0]-.018,ht[3][1]-.016]];y(Rt=>{let et=Rt>0?ht:vi(ht),lt=Rt>0?it:vi(it);if(s.decal.push(be(i,!0,lt,.003,h,u)),s.head.push(be(i,!0,et,.006,h,u)),e){for(let Bt of[.28,.6])s.chrome.push(Vi(i,!0,Rt*(_-F/2+F*Bt),g+.005,O*.28,.009,14));let L=[[_-F/2+.02,g-O/2+.022],[_+F/2-.02,g-O/2+O*.45+Z*.4+.012],[_+F/2-.02,g-O/2+O*.45+Z*.4+.002],[_-F/2+.02,g-O/2+.01]];s.head.push(be(i,!0,Rt>0?L:vi(L),.009,6,1))}o.head.push([Rt*_,g-c,(Le(i,Rt*_,g,!0)??i.z(.04))-.03])})}let S=x.grilleY??n.bottom[0][1]+.18,b=n.grille||"wide",T=(F,O,Z,ht,it,Rt)=>{if(e)for(let et=1;et<it;et++){let lt=et/it;if(Rt){let L=Tt(F,O,lt);s.chrome.push(be(i,!0,en(L-.006,L+.006,Z+.01,ht-.01),.007,1,2))}else{let L=Tt(Z,ht,lt);s.chrome.push(be(i,!0,en(F+.01,O-.01,L-.005,L+.005),.007,4,1))}}};if(b==="kidney")y(F=>{let O=F>0?.035:-.235,Z=O+.2;s.chrome.push(be(i,!0,en(O-.012,Z+.012,S-.02,S+.19),.003,4,2)),s.mesh.push(Ga(be(i,!0,en(O,Z,S-.008,S+.178),.005,4,2),9)),T(O,Z,S-.008,S+.178,7,!0)});else if(b==="wide"){let F=l*.21;s.decal.push(be(i,!0,[[-F-.014,S+.154],[F+.014,S+.154],[F*.92+.012,S-.034],[-F*.92-.012,S-.034]],.003,h,u)),s.mesh.push(Ga(be(i,!0,[[-F,S+.14],[F,S+.14],[F*.92,S-.02],[-F*.92,S-.02]],.005,h,u),9)),T(-F,F,S-.02,S+.14,4,!1)}else b==="super"&&y(F=>{let O=l/2-.36,Z=[[O-.2,S+.08],[O+.18,S+.1],[O+.22,S-.07],[O-.17,S-.07]];s.mesh.push(Ga(be(i,!0,F>0?Z:vi(Z),.005,h,u),9))});if(b!=="none"){let F=n.bottom[0][1];s.mesh.push(Ga(be(i,!0,[[-l*.27,F+.11],[l*.27,F+.11],[l*.25,F+.03],[-l*.25,F+.03]],.005,h,2),9)),e&&(v==="slim"||v==="round")&&y(O=>{let Z=O*l*.335,ht=F+.075;Math.abs(Z)<i.halfWAt(.03,ht+i.lower*0)&&(s.decal.push(Vi(i,!0,Z,ht,.05,.004,16)),s.head.push(Vi(i,!0,Z,ht,.036,.007,16)))})}let R=x.tail||"split",w=x.tailX??l/2-.26,M=F=>Math.max(.3,i.halfWAt(1-.15/a,F)-.012);if(R==="bar"){let F=x.tailH??.055,O=Math.min(l*.42,M(m));s.decal.push(be(i,!1,en(-O,O,m-F/2-.015,m+F/2+.015),.003,e?16:6,2)),s.tail.push(be(i,!1,en(-O+.012,O-.012,m-F/2,m+F/2),.006,e?16:6,2)),e&&s.decal.push(be(i,!1,en(-O+.03,O-.03,m-.004,m+.004),.009,16,1)),y(Z=>o.tail.push([Z*w,m-c,(Le(i,Z*w,m,!1)??i.z(.97))+.03]))}else if(R==="round")s.decal.push(be(i,!1,en(-l*.43,l*.43,m-.09,m+.09),.003,e?12:6,2)),y(F=>{for(let O of[-.09,.09]){let Z=F*(w+O);s.tail.push(Vi(i,!1,Z,m,.068,.006)),e&&s.chrome.push(Vi(i,!1,Z,m,.022,.008,10)),o.tail.push([Z,m-c,(Le(i,Z,m,!1)??i.z(.97))+.03])}});else if(R==="vertical")y(F=>{let O=l/2-.17,Z=l/2-.05,ht=en(O,Z,m-.17,m+.17);s.decal.push(be(i,!1,F>0?en(O-.012,Z+.01,m-.185,m+.185):vi(en(O-.012,Z+.01,m-.185,m+.185)),.003,3,4)),s.tail.push(be(i,!1,F>0?ht:vi(ht),.006,3,4)),o.tail.push([F*(O+Z)/2,m-c,(Le(i,F*(O+Z)/2,m,!1)??i.z(.97))+.03])});else if(R==="tri")y(F=>{let O=en(w-.18,w+.18,m-.1,m+.1);s.decal.push(be(i,!1,F>0?O:vi(O),.003,6,2));for(let Z=0;Z<3;Z++){let ht=w-.11+Z*.11,it=en(ht-.035,ht+.035,m-.075,m+.075);s.tail.push(be(i,!1,F>0?it:vi(it),.006,2,3))}o.tail.push([F*w,m-c,(Le(i,F*w,m,!1)??i.z(.97))+.03])});else{let F=x.tailW??.42,O=x.tailH??.11,Z=Math.min(w+F/2,M(m+O/2),M(m-O/2)),ht=Z-F,it=[[ht,m+O*.5-.022],[Z,m+O*.5],[Z,m-O*.5+.012],[ht+.05,m-O*.5+.03]],Rt=[[it[0][0]-.012,it[0][1]+.012],[it[1][0]+.008,it[1][1]+.012],[it[2][0]+.008,it[2][1]-.012],[it[3][0]-.012,it[3][1]-.012]];y(et=>{let lt=L=>et>0?L:vi(L);if(s.decal.push(be(i,!1,lt(Rt),.003,h,u)),s.tail.push(be(i,!1,lt(it),.006,h,u)),e){let L=[[ht+.06,m-.004],[Z-.02,m-.004],[Z-.02,m-O*.5+.024],[ht+.09,m-O*.5+.036]];s.decal.push(be(i,!1,lt(L),.008,6,1));let Bt=en(ht+.018,ht+.075,m-.012,m+.012);s.chrome.push(be(i,!1,lt(Bt),.009,2,1));let N=[[ht+.09,m+O*.5-.034],[Z-.018,m+O*.5-.016],[Z-.018,m+O*.5-.026],[ht+.09,m+O*.5-.042]];s.tail.push(be(i,!1,lt(N),.009,6,1))}o.tail.push([et*(ht+Z)/2,m-c,(Le(i,et*(ht+Z)/2,m,!1)??i.z(.97))+.03])})}y(F=>{o.ind.push([F*(l/2-.12),m-c,(Le(i,F*(l/2-.15),m,!1)??i.z(.97))+.04]),o.ind.push([F*(l/2-.12),g-c,(Le(i,F*(l/2-.15),g,!0)??i.z(.03))-.04])});let C=n.bottom[n.bottom.length-1][1],D=x.plateY??C+.16;if(s.plate.push(be(i,!1,en(-.155,.155,D-.0775,D+.0775),.008,2,1)),s.decal.push(be(i,!1,en(-.17,.17,D-.09,D+.09),.004,2,1)),s.decal.push(be(i,!1,[[-l*.33,C+.1],[l*.33,C+.1],[l*.3,C+.02],[-l*.3,C+.02]],.005,h,2)),e){let F=b==="kidney"?S+.215:b==="wide"?S+.07:g-.03,Z=new Pa(new I(0,F-c,-a),new I(0,0,1),0,a*2).intersectObject(new Mt(d,new re({side:De})))[0];if(Z&&Z.face){let it=Z.face.normal.clone();it.z>0&&it.negate();let Rt=new He(1,20).scale(.05,.03,1);Rt.applyQuaternion(new Ze().setFromUnitVectors(new I(0,0,1),it)),s.chrome.push(Rt.translate(Z.point.x+it.x*.006,Z.point.y+it.y*.006,Z.point.z+it.z*.006))}let ht=m+(R==="bar"?.07:0);s.chrome.push(be(i,!1,en(-.06,.06,ht-.012,ht+.012),.009,2,1));for(let[it,Rt]of[[.045,s.amber],[.955,s.tail]]){let et=(it<.5?g:m)-.07;y(lt=>{i.halfWAt(it,et+.012)>.3&&Rt.push(iu(i,it,et,et+.024,lt,.075,.004,2))})}if(n.cabin&&n.cabin.t3<.995){let it=n.cabin,Rt=it.roof+(it.crown??.03)-c;s.decal.push(new zt(.3,.022,.05).translate(0,Rt+.004,i.z(it.t2)+.012)),s.tail.push(new zt(.26,.012,.004).translate(0,Rt+.004,i.z(it.t2)+.038))}}let k=n.exhaust||"dual",B=C+.04,$=t.exhaust==="straight"||t.exhaust==="sport"?1.25:1,G=k==="single"?[-l*.3]:k==="quad"?[-l*.32,-l*.24,l*.24,l*.32]:k==="center"?[-.07,.07]:[-l*.3,l*.3],ct=.045*$;for(let F of G){let O=Math.max(Le(i,F,B+ct,!1)??i.z(.97),Le(i,F,B-ct,!1)??i.z(.97))+.06;s.chrome.push(new ie(ct,ct*.94,.12,16,1,!0).rotateX(Math.PI/2).translate(F,B-c,O-.06)),s.chrome.push(new Rn(ct*.97,.006,6,16).translate(F,B-c,O)),s.trim.push(new He(ct*.9,14).translate(F,B-c,O-.035)),o.exhaust.push([F,B-c,O+.02])}if(n.cabin){let F=n.cabin,O=su(i);if(y(N=>{let nt=new We(1,e?16:8,e?12:6),W=nt.attributes.position;for(let K=0;K<W.count;K++){let A=W.getX(K),E=W.getY(K),U=W.getZ(K);A=Math.sign(A)*Math.pow(Math.abs(A),.55),E=Math.sign(E)*Math.pow(Math.abs(E),.6),U=Math.sign(U)*Math.pow(Math.abs(U),.7);let z=1-.22*(1-A*N)/2;W.setXYZ(K,A*O.rx,E*O.ry*z,U<0?U*O.rz*1.15:U*O.rz*.7)}nt.computeVertexNormals(),nt.translate(N*O.x,O.y,O.z),s.paint.push(nt);let Q=O.x-O.rx*.6-O.xIn;s.trim.push(new zt(Q,.026,.05).translate(N*(O.xIn+Q/2),O.y-.025,O.z)),s.glass.push(new He(1,e?20:10).scale(O.rx*.86,O.ry*.8,1).translate(N*O.x,O.y,O.z+O.rz*.7+.002))}),e){y(W=>s.trim.push(Fy(i,F.t0+.015,Math.min(F.t3,F.quarter??F.t3)-.01,W)));let N=Math.max(F.t0+.005,i.tFA+i.archR/a+.02),nt=F.tB?[F.tB,Math.min(F.t2+.02,i.tRA-i.archR/a-.025)]:[Math.min((F.quarter??F.t2)-.015,i.tRA-i.archR/a-.03)];y(W=>{for(let Q of[N,...nt]){let K=i.hw(Q)*(F.wBot??.86),A=io(i,Q,K)-.02,E=Math.max(i.botA(Q)+.1,i.bot(Q)+.1);A>E+.1&&s.decal.push(iu(i,Q,E,A,W))}for(let Q of nt){let K=Q-.045,A=i.hw(K)*(F.wBot??.86),E=io(i,K,A)-.085,U=i.halfWAt(K,E)+.006;U>.2&&s.chrome.push(new zt(.018,.024,.13).translate(W*U,E-c,i.z(K)))}})}if(e){let N=F.t0-.01,nt=[];for(let A=0;A<=8;A++){let E=Tt(.035,N,A/8);nt.push([E,i.hw(E)*.64])}y(A=>s.decal.push(or(i,nt.map(([E,U])=>[E,A*U]))));let W=(A,E)=>{let U=[];for(let z=0;z<=10;z++)U.push([A,Tt(-1,1,z/10)*i.hw(A)*E]);return U};if(s.decal.push(or(i,W(.035,.64))),s.decal.push(or(i,W(N,.82))),F.t3<.93){let A=F.t3+.012,E=.972,U=[];for(let z=0;z<=6;z++){let tt=Tt(A,E,z/6);U.push([tt,i.hw(tt)*.7])}y(z=>s.decal.push(or(i,U.map(([tt,j])=>[tt,z*j])))),s.decal.push(or(i,W(A,.7))),s.decal.push(or(i,W(E,.7)))}let Q=i.tFA-i.archR*.72/a,K=i.tRA+i.archR*.72/a;y(A=>{for(let[E,U]of[[Q,g-.05],[K,m-.08]]){let z=(E-(E<.5?i.tFA:i.tRA))*a,tt=i.wr-c+Math.sqrt(Math.max(0,i.archR*i.archR-z*z))+.03+c;U>tt+.08&&s.decal.push(iu(i,E,tt,U,A,.006,.003,6))}})}let Z=(F.t1+F.t2)/2,ht=i.z(Z),it=i.top(Z)-c,Rt=F.roof-c-.09;it+=Math.min(0,Rt-(it+.44));let et=i.hw(Z)*.42;if(y(N=>{s.interior.push(rr(.48,.6,.13,.05).rotateX(.2).translate(N*et,it-.07,ht+.12)),s.interior.push(rr(.25,.16,.1,.04).translate(N*et,it+.3,ht+.19));for(let nt of[-.06,.06])s.interior.push(new ie(.008,.008,.12,6).translate(N*et+nt,it+.2,ht+.18));s.interior.push(rr(.48,.14,.5,.04).translate(N*et,it-.35,ht-.14)),s.interior.push(new zt(.36,Math.max(.05,it-.42-(i.bot((F.t1+F.t2)/2)-c)),.36).translate(N*et,(it-.42+i.bot((F.t1+F.t2)/2)-c)/2,ht-.14))}),r.seats!==2&&F.t2-F.t1>.16){s.interior.push(rr(l*.62,.48,.14,.05).rotateX(.22).translate(0,it-.12,ht+.78)),s.interior.push(rr(l*.62,.14,.42,.04).translate(0,it-.38,ht+.56));let N=i.bot((F.t1+F.t2)/2)-c;s.interior.push(new zt(l*.5,Math.max(.05,it-.45-N),.36).translate(0,(it-.45+N)/2,ht+.56))}let lt=F.t0+.035,L=i.top(lt)-c-.015,Bt=i.hw(lt)*.8;if(s.interior.push(rr(Bt*2,.22,.42,.06).translate(0,L-.11,i.z(lt)+.2)),e){let N=new Rn(.18,.02,6,20).rotateX(-.32);s.interior.push(N.translate(-et,it+.06,ht-.44))}}let H=t.kit||"stock",X=n.bottom[2]?.[1]??.18,gt=n.bottom[0][1];if(H!=="stock"){let F=H==="aggressive"||H==="wide",O=1/0;for(let it=0;it<=.09;it+=.005)O=Math.min(O,i.bot(it));let Z=Math.max(O+.012,Math.min(gt-.004,O+.06));s.kit.push(ip(i,!0,Z,l*(F?.46:.42),F?.07:.035,.32,.02));let ht=i.zr-i.zf-i.archR*2-.08;if(y(it=>{let Rt=(i.tFA+i.tRA)/2,et=i.halfWAt(Rt,X+.06);s.kit.push(new zt(.05,.07,ht).translate(it*(Math.max(et,i.hw(Rt)*.9)-.005),X+.02-c,(i.zf+i.zr)/2))}),s.kit.push(ip(i,!1,C-.006,l*.32,.03,.34,.025)),e)for(let it=-2;it<=2;it++){let Rt=Le(i,it*.16,C+.03,!1)??i.z(.97);s.kit.push(new zt(.012,.09,.26).translate(it*.16,C-.05-c,Rt-.1))}if(F&&y(it=>s.kit.push(Oy(i,!0,it*(l/2-.13),gt+.11,.16,.012,.12,.035,it*.25))),H==="wide")for(let it of[i.zf,i.zr])y(Rt=>{let et=(it+a/2)/a,lt=new Rn(i.archR+.02,.05,6,16,Math.PI).rotateY(Math.PI/2);lt.translate(Rt*(i.hw(et)-.01),i.wr-c,it),s.kit.push(lt)})}if(n.scoop){let F=n.scoop;s.paint.push(new We(1,12,6,0,Math.PI*2,0,Math.PI/2).scale(.26,.06,.2).translate(0,i.top(F)-c-i.dip(F,0)-.005,i.z(F))),s.decal.push(new He(1,20,0,Math.PI).scale(.17,.042,1).rotateY(Math.PI).translate(0,i.top(F)-c-i.dip(F,0)-.004,i.z(F)-.15))}let _t=t.spoiler??n.spoiler??"none",wt=n.deckT??.94,It=i.top(wt)-c-i.dip(wt,0),J=i.z(wt),dt=i.hw(wt)*2*.92;if(_t==="lip")s.paint.push(new zt(dt,.03,.12).translate(0,It+.012,J+.02));else if(_t==="duck"){let F=new fn;F.moveTo(0,0),F.lineTo(.3,0),F.lineTo(.3,.09),F.lineTo(0,.01),F.lineTo(0,0);let O=new rs(F,{depth:dt,bevelEnabled:!1});O.translate(0,0,-dt/2).rotateY(-Math.PI/2),O.translate(0,It-.015,J-.18),s.paint.push(O)}else if(_t==="wing"||_t==="gt"){let F=_t==="gt"?.38:.24,O=_t==="gt"?.34:.26,Z=new fn;Z.moveTo(0,0),Z.bezierCurveTo(O*.2,.045,O*.7,.03,O,0),Z.bezierCurveTo(O*.7,.008,O*.2,-.012,0,0);let ht=new rs(Z,{depth:dt*1.02,bevelEnabled:!1,curveSegments:8});ht.translate(0,0,-dt*.51).rotateY(-Math.PI/2).rotateX(.12),ht.translate(0,It+F,J-O*.3),(_t==="gt"?s.kit:s.paint).push(ht),y(it=>{s.kit.push(new zt(.02,F+.04,.1).translate(it*dt*.33,It+F/2-.02,J)),s.kit.push(new zt(.012,.16,O*1.1).translate(it*dt*.51,It+F,J-O*.3+O*.5))})}if(n.roofRails&&y(F=>s.trim.push(new zt(.04,.05,a*.4).translate(F*l*.32,n.cabin.roof+.03-c,i.z((n.cabin.t1+n.cabin.t2)/2)))),n.bed){let F=n.bed,O=i.z(F),Z=i.z(.985);s.trim.push(new zt(l*.84,.03,Z-O).translate(0,i.top(.8)-c+.012,(O+Z)/2))}return{S:s,ctx:i,lamps:o}}function Hy(r){let t=r.body,e={paint:[],glass:[],trim:[],chrome:[],head:[],tail:[],plate:[],interior:[],kit:[],body2:[]},n={head:[],tail:[],ind:[],exhaust:[]},i=t.L,s=t.W,o=t.cabL,a=t.cabH,l=-i/2,c=(v,y,S,b,T,R)=>new zt(v,y,S).translate(b,T,R);e.trim.push(c(1,.25,i-.6,0,.75,.1));let h=t.hoodL??0,u=t.wr,d=2*u+.05,f=s-.32;h>0?(e.paint.push(c(s*.88,1.6-d,h,0,(1.6+d)/2,l+h/2+.25)),e.trim.push(c(s*.6,1.55-.74,.06,0,(1.55+.74)/2,l+.24)),e.chrome.push(c(s*.95,.25,.25,0,.6,l+.12)),e.trim.push(c(s*.5,d-.5,h,0,(d+.5)/2,l+h/2+.25))):e.trim.push(c(s*.98,.3,.3,0,.6,l+.15));for(let v of t.axles||[])if(v.steer)for(let y of[-1,1]){let S=new ie(u+.1,u+.1,.42,14,1,!0,0,Math.PI).rotateZ(Math.PI/2);e.paint.push(S.translate(y*f/2,u,v.z))}let p=l+.25+h,x=.875;e.paint.push(c(s,a-1,o,0,1+(a-1)/2,p+o/2)),e.trim.push(c(s*.94,1-x+.02,o*.96,0,(1+x)/2,p+o/2));for(let v of[-1,1])e.chrome.push(c(.12,.03,o*.35,v*(s*.47+.04),.85,p+o*.35));e.glass.push(c(s*.9,.85,.04,0,a-.65,p-.005));for(let v of[-1,1])e.glass.push(c(.04,.6,o*.45,v*(s/2+.001),a-.62,p+o*.3));t.fairing&&e.paint.push(c(s*.95,t.fairing,o*.7,0,a+t.fairing/2,p+o*.55));for(let v of[-1,1]){let y=h>0?s*.44:s/2,S=h>0?(1.6+d)/2-.12:1.18,b=y-.2;e.head.push(c(.28,.15,.05,v*b,S,l+.245)),n.head.push([v*b,S,l+.18]),e.trim.push(c(.16,.03,.03,v*(s/2+.07),a-.45,p+.1)),e.trim.push(c(.06,.4,.22,v*(s/2+.145),a-.6,p+.1))}let g=t.cargoZ0??p+o+.15,m=i/2-g,_=t.cargoFloor??1.05;e.body2.push(c(s,t.H-_,m,0,_+(t.H-_)/2,g+m/2));for(let v of[-1,1])e.trim.push(c(.14,_-x+.02,m-.2,v*.42,(_+x)/2,g+m/2));for(let v=g+.4;v<i/2-.3;v+=.9)e.trim.push(c(s*.9,.08,.08,0,_-.05,v));for(let v of t.axles||[])e.trim.push(new ie(.07,.07,s-.3,10).rotateZ(Math.PI/2).translate(0,t.wr,v.z));e.trim.push(c(s*.98,.12,.05,0,_-.05,i/2-.01));for(let v of[-1,1])e.tail.push(c(.2,.1,.04,v*(s/2-.2),_-.12,i/2+.01)),n.tail.push([v*(s/2-.2),_-.12,i/2+.05]),n.ind.push([v*(s/2-.05),_-.12,i/2+.05]),n.ind.push([v*(s/2-.05),1,l+.1]),e.trim.push(c(.04,.4,m*.45,v*(s/2-.05),.75,g+m*.35));e.trim.push(c(s*.9,.12,.1,0,.62,i/2-.12));for(let v of[-1,1])e.trim.push(c(.08,_-.62,.08,v*.5,(_+.62)/2,i/2-.14));if(e.plate.push(new Se(.31,.155).translate(0,.62,i/2-.065)),t.stacks)for(let v of[-1,1])e.chrome.push(new ie(.08,.08,2.4,10).translate(v*(s/2-.1),a-.2,p+o+.08));return{S:e,lamps:n,ctx:{L:i,W:s,H:t.H,wr:t.wr,tw:.3,track:s-.32}}}function cp(r,t){let e=r.body;return e.axles?e.axles.map(n=>({z:n.z,dual:n.dual,r:e.wr,steer:!!n.steer})):[{z:t.zf,r:e.wr,steer:!0},{z:t.zr,r:e.wr,steer:!1}]}function hp(r){let t=r.kind==="truck",{S:e,lamps:n,ctx:i}=t?Hy(r):lp(r,r.custom||{},!1),s=ap(r.body.wr,t?.3:i.tw,"five",!1),o=cp(r,i),a=[...e.trim,...e.interior,...e.kit],l=[...e.chrome];for(let d of o)for(let f of[-1,1]){let p=d.dual?[i.track/2-.16,i.track/2+.16]:[i.track/2];for(let x of p){let g=s.tire.clone(),m=s.rim.clone();f<0&&(g.rotateY(Math.PI),m.rotateY(Math.PI)),g.translate(f*x,d.r-(i.lower||0)*0,d.z),m.translate(f*x,d.r,d.z),a.push(g),l.push(m)}}let c={},u={shadow:[new Se(i.W*1.28,i.L*1.1).rotateX(-Math.PI/2).translate(0,.03,0)],paint:e.paint,glass:[...e.glass,...e.decal||[],...e.mesh||[],...e.amber||[]],dark:a,metal:l,head:e.head,tail:e.tail,plate:e.plate,body2:e.body2};for(let[d,f]of Object.entries(u))f.length&&(c[d]=Qe(f));return{groups:c,lamps:n,dims:{L:i.L,W:i.W,H:r.body.H}}}var sp={gloss:{metalness:.05,roughness:.3,clearcoat:1,clearcoatRoughness:.04},metallic:{metalness:.62,roughness:.36,clearcoat:1,clearcoatRoughness:.05},pearl:{metalness:.35,roughness:.3,clearcoat:1,clearcoatRoughness:.03,iridescence:.7,iridescenceIOR:1.6},matte:{metalness:.08,roughness:.72,clearcoat:0,clearcoatRoughness:.5},chrome:{metalness:1,roughness:.07,clearcoat:.6,clearcoatRoughness:.02}},rp=[{color:2041388,opacity:.66},{color:1119514,opacity:.8},{color:526603,opacity:.9},{color:131587,opacity:.96}];function Wa(r,t,e="NO HESI"){let{S:n,ctx:i,lamps:s}=lp(r,t,!0),o=sp[t.finish]||sp.metallic,a={paint:new Vn({color:t.color,envMapIntensity:1.55,...o}),glass:new Vn({color:rp[t.tint??1].color,metalness:.25,roughness:.03,transparent:!0,opacity:rp[t.tint??1].opacity,envMapIntensity:2.4,clearcoat:1,clearcoatRoughness:.02,depthWrite:!0}),trim:new Pt({color:855568,roughness:.55,metalness:.2}),interior:new Pt({color:723724,roughness:.8}),chrome:new Pt({color:t.exhaust==="straight"?7036832:14211804,metalness:1,roughness:.18}),head:new Pt({color:13621474,emissive:15922943,emissiveIntensity:.25,roughness:.05,metalness:.4}),tail:new Pt({color:4851206,emissive:16718354,emissiveIntensity:.35,roughness:.15}),plate:new Pt({map:Fa(e,r.plate||"ca"),roughness:.4}),decal:new Vn({color:460810,roughness:.18,metalness:.35,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.2}),mesh:new Pt({map:eu(),roughness:.55,metalness:.4}),amber:new Pt({color:9062918,emissive:16747024,emissiveIntensity:.25,roughness:.15}),kit:new Pt({color:t.kitColor==="body"?t.color:1381914,roughness:t.kitColor==="body"?.3:.45,metalness:.25}),body2:new Pt({color:14606046,roughness:.6}),rim:new Pt({color:t.rimColor??13225168,metalness:.85,roughness:.28}),tire:new Pt({map:nu(),color:12105912,roughness:.9}),disc:new Pt({color:7830400,metalness:.9,roughness:.42}),caliper:new Pt({color:t.caliper??13111342,roughness:.35,metalness:.2})},l=new de,c=new de;l.add(c);let h={};a.cabinTop=a.paint;for(let _ of["decal","mesh","amber","head","tail","plate","chrome"])Object.assign(a[_],{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});for(let[_,v]of Object.entries(n)){if(!v.length)continue;let y=new Mt(Qe(v),a[_]);y.castShadow=!["glass","head","tail","plate","interior","decal","mesh","amber"].includes(_),y.receiveShadow=["paint","trim","kit","cabinTop","decal","mesh","interior"].includes(_),_==="glass"&&(y.renderOrder=2),c.add(y),h[_]=y}let u=ap(r.body.wr,i.tw,t.wheels||"five",!0),d=[],f=cp(r,i);for(let _ of f)for(let v of[-1,1]){let y=new de;y.position.set(v*i.track/2,_.r,_.z);let S=new de;v<0&&(S.rotation.y=Math.PI),y.add(S);let b=new de;S.add(b);let T=new Mt(u.tire,a.tire),R=new Mt(u.rim,a.rim);T.castShadow=!0,R.castShadow=!0,b.add(T,R);let w=new Mt(u.disc,a.disc);b.add(w);let M=new Mt(u.caliper,a.caliper);M.position.x=-.06,M.rotation.x=(_.steer?.6:-.6)*v,S.add(M),l.add(y),d.push({pivot:y,spin:b,side:v,front:_.steer,r:_.r,baseY:_.r})}a.blob=new re({map:Qr(),color:0,transparent:!0,opacity:.62,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});let p=new Mt(new Se(i.W*1.3,i.L*1.12).rotateX(-Math.PI/2).translate(0,.025,0),a.blob);p.renderOrder=-1,l.add(p),h.blob=p;let x=i.top,g=r.body.cabin,m={L:i.L,W:i.W,H:r.body.H,wb:r.body.wb,wr:r.body.wr,track:i.track,zf:i.zf,zr:i.zr,lower:i.lower,hoodY:x(Math.max(.05,g?g.t0-.06:.25))-i.lower,hoodZ:i.z(Math.max(.05,g?g.t0-.08:.25)),eyeY:(g?g.roof:r.body.H)-.178-i.lower,eyeZ:g?i.z(g.t1+(g.t2-g.t1)*.5):0,dashZ:g?i.z(g.t0+.03):-.5,beltY:g?x((g.t1+g.t2)/2)-i.lower:.9,wsBaseY:g?x(g.t0)-i.lower:.9,wsTopZ:g?i.z(g.t1):-.2,roofY:(g?g.roof:r.body.H)-i.lower,frontZ:-i.L/2,rearZ:i.L/2,cabinW:g?i.hw((g.t1+g.t2)/2)*(g.wBot??.86):i.W/2};return{root:l,body:c,meshes:h,mats:a,wheels:d,lamps:s,dims:m,ctx:i}}function Xa(r){r.root.traverse(t=>{t.isMesh&&t.geometry.dispose()});for(let t of new Set(Object.values(r.mats)))t.map&&t.map!==Qr()&&t.map!==eu()&&t.map!==nu()&&t.map.dispose(),t.dispose()}var zy={sedan:34,compact:24,hatch:14,suv:24,crossover:22,pickup:16,van:12,sport:6,box:10,semi:8},us=new Qt().makeScale(0,0,0),Gi=new Qt,lr=new Ze,cr=new rn,up=new I,hr=new I(1,1,1),on=new I,ei=new St,Ya=class{constructor(t,e){this.scene=t,this.road=e,this.group=new de,this.group.name="traffic",t.add(this.group),this.mats={paint:new Vn({color:16777215,metalness:.4,roughness:.34,envMapIntensity:1.2,clearcoat:.7,clearcoatRoughness:.08}),glass:new Pt({color:724498,metalness:.3,roughness:.06,envMapIntensity:1.5,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),dark:new Pt({color:1118740,roughness:.75,metalness:.1}),metal:new Pt({color:12106944,metalness:.9,roughness:.3}),head:new re({color:14542578,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),tail:new re({color:16720916,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),plate:new Pt({map:Fa("8NHS204","ca"),roughness:.5,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),body2:new Pt({color:15329766,roughness:.62,metalness:.05}),shadow:new re({map:Qr(),color:0,transparent:!0,opacity:.6,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4})},this.types=ep.map((i,s)=>{let o=hp(i),a=zy[i.id]||10,l={};for(let[c,h]of Object.entries(o.groups)){let u=new ki(h,this.mats[c],a);u.frustumCulled=!1,u.castShadow=c==="paint"||c==="body2",c==="shadow"&&(u.renderOrder=-1),u.receiveShadow=c==="paint"||c==="body2",u.instanceMatrix.setUsage(Cn),(c==="paint"||c==="tail"||c==="head")&&(u.instanceColor=new Qn(new Float32Array(a*3).fill(1),3),u.instanceColor.setUsage(Cn));for(let d=0;d<a;d++)u.setMatrixAt(d,us);this.group.add(u),l[c]=u}for(let c of Object.values(l))c.count=0;return{def:i,ti:s,dims:o.dims,lamps:o.lamps,meshes:l,slots:[],n:0,cap:a,dirty:!0}}),this.typeWeights=this.types.map(i=>[i,i.def.weight]);let n=new Se(1,1).rotateX(-Math.PI/2);this.beamMat=new re({map:Cf(),color:16773590,transparent:!0,opacity:0,depthWrite:!1,blending:Ke,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-8}),this.beams=new ki(n,this.beamMat,160),this.beams.frustumCulled=!1,this.streakMat=new re({map:Pf(),color:16722458,transparent:!0,opacity:0,depthWrite:!1,blending:Ke,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-8}),this.streaks=new ki(n,this.streakMat,160),this.streaks.instanceColor=new Qn(new Float32Array(480).fill(1),3),this.streaks.frustumCulled=!1;for(let i=0;i<160;i++)this.beams.setMatrixAt(i,us),this.streaks.setMatrixAt(i,us);this.group.add(this.beams,this.streaks),this.cars=[],this.opp=[],this.pool=[],this.events=[],this.night=0,this.wet=0,this.blink=0,this._tmp={},this._tmp2={},this.enabled=!0}reset(t,e,n,i,s={}){for(let o of[...this.cars,...this.opp])this._release(o);this.cars.length=0,this.opp.length=0,this.layout=t,this.baseDensity=e,this.densityMul=1,this.spawnAhead=s.spawnAhead??650,this.speedScale=s.speedScale??1,this.laneNext=new Array(t.n).fill(0),this.oppNext=new Array(t.oppLanes).fill(0);for(let o=0;o<t.n;o++){let a=n-140+Math.random()*30;for(;a<n+this.spawnAhead;){if(!(Math.abs(a-n)<(o===i?45:Math.abs(o-i)===1?14:0))){let c=this._spawn(o,a,!1);c&&(a+=c.len)}a+=this._spacing(o)}}for(let o=0;o<t.oppLanes;o++){let a=n-150+Math.random()*40;for(;a<n+this.spawnAhead;){let l=this._spawn(o,a,!0);l&&(a+=l.len),a+=this._spacing(o)*1.3}}}_spacing(t){let n=74/(this.baseDensity*this.densityMul),i=Math.random();return Math.max(9,n*(.35+i*i*1.6+(Math.random()<.08?1.5:0)))}_laneSpeed(t,e){let n=e?this.layout.oppLanes:this.layout.n,i=n>1?t/(n-1):0,s=Tt(77,58,i),o=vt((this.baseDensity*this.densityMul-1.2)*.25,0,.3);return s*hs*(1-o)*this.speedScale}_pickType(t,e){let n=e?this.layout.oppLanes:this.layout.n;for(let i=0;i<6;i++){let s=Jh(this.typeWeights,Math.random());if(!(s.def.truck&&t<n-2)&&!(s.n>=s.cap))return s}for(let i of this.types)if(!i.def.truck&&i.n<i.cap)return i;return null}_spawn(t,e,n){let i=this._pickType(t,n);if(!i)return null;let s=this.pool.pop()||{};s.t=i,s.slot=i.n++,i.slots[s.slot]=s;for(let l of Object.values(i.meshes))l.count=i.n;s.opp=n,s.lane=t,s.targetLane=t;let o=this.layout;s.d=n?-o.laneCenter(t):o.laneCenter(t),s.fromD=s.d,s.toD=s.d,s.laneT=-1,s.changeDur=3.5,s.s=e,s.len=i.dims.L,s.wid=i.dims.W,s.mass=i.def.mass,s.truck=!!i.def.truck,s.desired=this._laneSpeed(t,n)*(s.truck?.88:1)+(Math.random()-.5)*4.5,s.speed=s.desired,s.accel=0,s.aMax=s.truck?.7:1.3+Math.random()*.5,s.T=1.1+Math.random()*.8,s.brake=0,s.signal=0,s.signalT=0,s.decide=2+Math.random()*6,s.honkCD=0,s.crashed=!1,s.vd=0,s.yaw=0,s.yawRate=0,s.hazard=!1,s.ov=!1,s.minGap=99,s.scored=!1,s.startAhead=!1,s.whoosh=!1,s.hit=!1;let a=Jh(np,Math.random());return ei.set(a),i.meshes.paint?.setColorAt(s.slot,ei),i.meshes.paint&&(i.meshes.paint.instanceColor.needsUpdate=!0),(n?this.opp:this.cars).push(s),s}_release(t){let e=t.t,n=--e.n;if(t.slot!==n){let i=e.slots[n];i.slot=t.slot,e.slots[t.slot]=i;let s=e.meshes.paint;if(s&&(s.getColorAt(n,ei),s.setColorAt(t.slot,ei),s.instanceColor.needsUpdate=!0),i.matrix)for(let o of Object.values(e.meshes))o.setMatrixAt(i.slot,i.matrix)}e.slots[n]=null;for(let i of Object.values(e.meshes))i.count=e.n;e.dirty=!0,t.t=null,this.pool.push(t)}update(t,e){if(!this.layout)return;this.blink+=t;let n=this.layout;this.densityMul=1+Math.min(.6,(e.runDist||0)/9e3);let i=this.cars;i.sort((l,c)=>l.s-c.s);let s=i.length;for(let l=0;l<s;l++){let c=i[l];if(c.crashed){c.speed=Math.max(0,c.speed-7*t),c.d+=c.vd*t,c.vd*=Math.max(0,1-t*1.5),c.yaw+=c.yawRate*t,c.yawRate*=Math.max(0,1-t*1.2),c.d=vt(c.d,n.medianHalf+c.wid/2,n.roadEdge-c.wid/2),c.s+=c.speed*t,c.brake=1;continue}let h=c.laneT>=0?[c.lane,c.targetLane]:[c.lane],u=1e9,d=0;for(let m=l+1;m<s&&i[m].s-c.s<260;m++){let _=i[m];if(!this._overlapsLane(_,h,c))continue;let v=_.s-_.len/2-(c.s+c.len/2);v<u&&(u=v,d=_.speed);break}let f=!1;if(Math.abs(e.pd-c.d)<c.wid/2+e.pw+.35&&e.ps>c.s){let m=e.ps-e.pl-(c.s+c.len/2);m<u&&(u=Math.max(.1,m),d=e.pv,f=!0)}let x=this._idm(c,u,d);c.accel=x,c.speed=Math.max(0,c.speed+x*t),c.s+=c.speed*t;let g=x<-.6?vt(-x/4,.4,1):0;if(c.brake+=(g-c.brake)*Math.min(1,t*8),f&&x<-4.2&&c.honkCD<=0&&u<30&&(c.honkCD=6,this.events.push({type:"honk",s:c.s,d:c.d})),c.honkCD-=t,c.laneT>=0)if(c.signalT>0)c.signalT-=t;else{c.laneT+=t/c.changeDur;let m=c.laneT>=1?1:.5-.5*Math.cos(c.laneT*Math.PI),_=c.d;c.d=Tt(c.fromD,c.toD,m),c.yaw=Math.atan2((c.d-_)/Math.max(t,1e-4),Math.max(c.speed,1)),c.laneT>=1&&(c.lane=c.targetLane,c.laneT=-1,c.signal=0,c.yaw=0,c.decide=5+Math.random()*10)}else c.yaw*=Math.max(0,1-t*4),c.decide-=t,c.decide<=0&&(c.decide=2+Math.random()*5,this._considerLaneChange(c,l,e,x))}this._updateOpp(t,e);let o=e.ps-230,a=e.ps+this.spawnAhead+320;for(let l=i.length-1;l>=0;l--){let c=i[l];(c.s<o||c.s>a)&&(this._release(c),i.splice(l,1))}this._spawnLanes(e)}_overlapsLane(t,e,n){if(t.crashed)return Math.abs(t.d-n.d)<(t.wid+n.wid)/2+.4;for(let i of e)if(t.lane===i||t.laneT>=0&&t.targetLane===i)return!0;return!1}_idm(t,e,n){let i=t.speed,s=Math.max(1,t.desired),o=t.truck?4:2.5,a=2.6,l=i-n,c=o+Math.max(0,i*t.T+i*l/(2*Math.sqrt(t.aMax*a))),h=Math.max(.2,e),u=t.aMax*(1-Math.pow(i/s,4)-(e<1e8?c/h*(c/h):0));return vt(u,-9,t.aMax)}_neighbours(t,e,n,i){let s=this.layout,o=s.laneCenter(t),a=null,l=1e9,c=null,h=1e9;for(let u of this.cars)if(!(u===n||!(u.lane===t||u.laneT>=0&&u.targetLane===t||u.crashed&&Math.abs(u.d-o)<2.4)))if(u.s>=e){let f=u.s-u.len/2-(e+n.len/2);f<l&&(l=f,a=u)}else{let f=e-n.len/2-(u.s+u.len/2);f<h&&(h=f,c=u)}if(Math.abs(i.pd-o)<s.LW*.5+i.pw+.4)if(i.ps>=e){let u=i.ps-i.pl-(e+n.len/2);u<l&&(l=u,a={speed:i.pv,player:!0})}else{let u=e-n.len/2-(i.ps+i.pl);u<h&&(h=u,c={speed:i.pv,player:!0,T:1,aMax:3,truck:!1})}return{ahead:a,aGap:l,behind:c,bGap:h}}_considerLaneChange(t,e,n,i){let s=this.layout,o=[];t.lane>0&&!(t.truck&&t.lane-1<s.n-2)&&o.push(-1),t.lane<s.n-1&&o.push(1);let a=null,l=.35;for(let c of o){let h=t.lane+c,u=this._neighbours(h,t.s,t,n);if(u.aGap<Math.max(10,t.speed*.7)||u.bGap<8)continue;if(u.behind){let p=u.behind.speed,x=p-t.speed,g=8+Math.max(0,x)*(u.behind.player?3.2:2.2)+p*.4;if(u.bGap<g)continue}let f=this._idm(t,u.aGap,u.ahead?u.ahead.speed:t.desired)-i;f+=c>0?.12:-.05,Math.random()<.06&&(f+=.5),f>l&&(l=f,a=c)}a!==null&&(t.targetLane=t.lane+a,t.fromD=t.d,t.toD=s.laneCenter(t.targetLane),t.laneT=0,t.signal=a,t.signalT=1+Math.random()*.8,t.changeDur=(t.truck?5:3.2)+Math.random()*1.2)}_updateOpp(t,e){let n=this.opp;n.sort((i,s)=>s.s-i.s);for(let i=0;i<n.length;i++){let s=n[i],o=1e9,a=0;for(let l=i+1;l<n.length&&s.s-n[l].s<200;l++){let c=n[l];if(c.lane===s.lane){o=s.s-s.len/2-(c.s+c.len/2),a=c.speed;break}}s.accel=this._idm(s,o,a),s.speed=Math.max(0,s.speed+s.accel*t),s.s-=s.speed*t,s.brake+=((s.accel<-.8?1:0)-s.brake)*Math.min(1,t*8)}for(let i=n.length-1;i>=0;i--){let s=n[i];(s.s<e.ps-220||s.s>e.ps+this.spawnAhead+400)&&(this._release(s),n.splice(i,1))}}_spawnLanes(t){let e=this.layout,n=t.ps+this.spawnAhead;for(let i=0;i<e.n;i++){let s=-1e9,o=1e9;for(let l of this.cars)l.lane!==i&&!(l.laneT>=0&&l.targetLane===i)||(l.s>s&&(s=l.s),l.s<o&&(o=l.s));if(this.laneNext[i]||(this.laneNext[i]=this._spacing(i)),s<n-this.laneNext[i]){let l=Math.max(s+this.laneNext[i],n-40);this._spawn(i,l,!1)&&(this.laneNext[i]=this._spacing(i))}let a=this._laneSpeed(i,!1);if(t.pv<a-4&&o>t.ps-120){let l=Math.min(o-this._spacing(i),t.ps-170);(!(Math.abs(t.pd-e.laneCenter(i))<2.5)||l<t.ps-60)&&this._spawn(i,l,!1)}}for(let i=0;i<e.oppLanes;i++){let s=-1e9;for(let o of this.opp)o.lane===i&&o.s>s&&(s=o.s);this.oppNext[i]||(this.oppNext[i]=this._spacing(i)*1.3),s<n-this.oppNext[i]&&this._spawn(i,Math.max(s+this.oppNext[i],n-40),!0)&&(this.oppNext[i]=this._spacing(i)*1.3)}}clearAround(t,e,n){for(let i=this.cars.length-1;i>=0;i--){let s=this.cars[i];Math.abs(s.s-t)<n&&Math.abs(s.d-e)<6&&(this._release(s),this.cars.splice(i,1))}}impact(t,e,n){t.speed=Math.max(0,t.speed+e),t.vd+=n,!t.crashed&&Math.hypot(e,n)>1.2&&(t.crashed=!0,t.hazard=!0,t.yawRate=(Math.random()-.5)*1.4+Math.sign(n)*.4,t.laneT=-1)}render(t,e,n){this.night=e,this.wet=n;let i=this.road,s=this._tmp,o=this.blink%.8<.42,a=0;for(let h of this.types)h.dirty=!0;let l=this.cars.concat(this.opp),c=.32+ae(.2,.8,e)*.38;for(let h of l){i.pos(h.s,h.d,s);let u=(h.opp?s.H+Math.PI:s.H)+h.yaw,d=(h.opp?-1:1)*Math.atan(s.G)-h.brake*.012+(h.accel>.5?.004:0);up.set(s.X-t.x,s.E,-(s.Y-t.y)),cr.set(d,-u,0,"YXZ"),lr.setFromEuler(cr),Gi.compose(up,lr,hr),h.matrix=h.matrix||new Qt,h.matrix.copy(Gi);let f=h.t;for(let x of Object.values(f.meshes))x.setMatrixAt(h.slot,Gi);let p=h.brake>.3?1:c;if(f.meshes.tail&&(ei.setRGB(p,p,p),f.meshes.tail.setColorAt(h.slot,ei)),f.meshes.head){let x=.55+ae(.2,.8,e)*.45;ei.setRGB(x,x,x),f.meshes.head.setColorAt(h.slot,ei)}if(h.blinkL=(h.hazard||h.signal<0)&&o,h.blinkR=(h.hazard||h.signal>0)&&o,a<160){if(e>.15?(on.set(0,.05,-h.len/2-13).applyMatrix4(Gi),cr.set(0,-u,0,"YXZ"),lr.setFromEuler(cr),hr.set(5.2,1,24),Gi.compose(on,lr,hr),this.beams.setMatrixAt(a,Gi)):this.beams.setMatrixAt(a,us),n>.1&&!h.opp){on.set(0,.04,h.len/2+4.5).applyMatrix4(h.matrix),cr.set(0,-u+Math.PI,0,"YXZ"),lr.setFromEuler(cr),hr.set(1.7,1,9),Gi.compose(on,lr,hr),this.streaks.setMatrixAt(a,Gi);let x=h.brake>.3?1:c*.9;ei.setRGB(x,x,x),this.streaks.setColorAt(a,ei)}else this.streaks.setMatrixAt(a,us);hr.set(1,1,1),a++}}for(let h=a;h<160;h++)this.beams.setMatrixAt(h,us),this.streaks.setMatrixAt(h,us);this._lastBeams=a,this.beamMat.opacity=ae(.15,.8,e)*.38,this.streakMat.opacity=n*(.35+.45*e),this.beams.instanceMatrix.needsUpdate=!0,this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.instanceColor&&(this.streaks.instanceColor.needsUpdate=!0);for(let h of this.types)if(h.dirty){for(let u of Object.values(h.meshes))u.instanceMatrix.needsUpdate=!0,u.instanceColor&&(u.instanceColor.needsUpdate=!0);h.dirty=!1}}forEachLamp(t){let e=this.night;for(let n of[this.cars,this.opp])for(let i of n){if(!i.matrix)continue;let s=i.t.lamps,o=i.brake>.3?1:.25+e*.45;for(let a of s.tail)on.set(a[0],a[1],a[2]).applyMatrix4(i.matrix),t(on.x,on.y,on.z,"tail",o);if(e>.2)for(let a of s.head)on.set(a[0],a[1],a[2]).applyMatrix4(i.matrix),t(on.x,on.y,on.z,"head",e);if(i.blinkL||i.blinkR)for(let a of s.ind)(a[0]<0&&i.blinkL||a[0]>0&&i.blinkR)&&(on.set(a[0],a[1],a[2]).applyMatrix4(i.matrix),t(on.x,on.y,on.z,"ind",1))}}setVisible(t){this.group.visible=t}};var ur=9.81,ru=1.225,dp=.86,fp={na:[[0,.5],[.15,.58],[.3,.7],[.45,.82],[.6,.92],[.72,.98],[.8,1],[.9,.97],[1,.9],[1.08,.7],[1.2,.3]],turbo:[[0,.42],[.15,.55],[.25,.86],[.33,1],[.62,1],[.75,.95],[.88,.86],[1,.76],[1.08,.55],[1.2,.25]],sc:[[0,.62],[.15,.75],[.3,.88],[.45,.96],[.6,1],[.75,.98],[.88,.93],[1,.86],[1.08,.62],[1.2,.3]]};function pp(r,t,e=1.45,n=-.2){let i=t*r;return Math.sin(e*Math.atan(i-n*(i-Math.atan(i))))}var dr=class{constructor(t,e={}){this.configure(t,e),this.reset(0,0,0,0)}configure(t,e={}){let n=t.phys,i=t.body;this.def=t,this.m=n.mass,this.L=i.wb,this.b=this.L*n.weightFront,this.a=this.L-this.b;let s=e.suspension==="slammed"?2:e.suspension==="lowered"?1:0;this.h=n.cgH-s*.02,this.track=i.W-.3,this.Iz=this.m*this.a*this.b*(n.inertia??1),this.rw=i.wr,this.mu=n.grip,this.B=n.tireB,this.brakeForce=n.brakeG*this.m*ur,this.brakeBias=.64,this.lockRad=n.steerLock*Math.PI/180,this.drive=n.drive,this.frontSplit=n.drive==="FWD"?1:n.drive==="RWD"?0:n.frontSplit,this.rollStiffFront=n.drive==="FWD"?.62:.55,this.idle=n.idle,this.redline=n.redline,this.limiter=n.limiter,this.curve=fp[n.curve]||fp.na,this.isTurbo=!!t.engine.turbo,this.turboLag=n.turboLag||.5,this.shiftTime=n.shiftTime??.18,this.downforce=(n.downforce??.2)*(e.spoiler==="gt"?1.35:e.spoiler==="wing"?1.15:1)*(e.kit==="aggressive"||e.kit==="wide"?1.1:1),this.gripBonus=(e.kit==="wide"?1.03:1)*(s?1.01:1),this.rollGain=n.rollGain*(1-s*.18),this.susFreq=n.susFreq*(1+s*.12);let o=e.exhaust==="straight"?1.06:e.exhaust==="sport"?1.03:1;this.hp=n.hp*o;let a=0,l=.8;for(let p=.2;p<=1;p+=.005){let x=jh(this.curve,p)*p;x>a&&(a=x,l=p)}let c=this.redline*2*Math.PI/60;this.Tpeak=this.hp*745.7/(a*c),this.powerRpm=l*this.redline,this.gears=n.gears.slice();let h=n.topSpeed*hs,u=this.powerRpm*1.02*2*Math.PI/60;this.finalDrive=u*this.rw/(h*this.gears[this.gears.length-1]),this.reverseRatio=3.3;let d=this.hp*745.7*dp,f=.013*this.m*ur*h;this.CdA=Math.max(.45,2*(d-f)/(ru*h*h*h)),this.ClA=this.downforce,this.vTop=h,this.gripMul=1}reset(t,e,n,i){this.X=t,this.Y=e,this.heading=n,this.VX=Math.sin(n)*i,this.VY=Math.cos(n)*i,this.omega=0,this.u=i,this.v=0,this.ax=0,this.ay=0,this.axS=0,this.ayS=0,this.gear=i>1?this._bestGear(i):1,this.rpm=this.idle,this.shiftT=0,this.limiterT=0,this.boost=0,this.throttleEff=0,this.steerAngle=0,this.slipF=0,this.slipR=0,this.wheelspin=0,this.skid=0,this.revHold=0,this.events=[],this.wheelRot=0,this.wheelRotF=0,this.lastThrottle=0,this.offThrottleT=0,this.shiftCooldown=0,this.manualHold=0}_bestGear(t){for(let e=1;e<=this.gears.length;e++)if(this._rpmFor(t,e)<this.redline*.82)return e;return this.gears.length}_rpmFor(t,e){let n=this.gears[e-1]*this.finalDrive;return Math.abs(t)/this.rw*n*60/(2*Math.PI)}torqueAt(t){return this.Tpeak*jh(this.curve,t/this.redline)}steerLimit(t=1){let e=Math.max(Math.abs(this.u),1),i=this.mu*this.gripMul*ur*1.02;return Math.min(this.lockRad,(this.L*i/(e*e)+.0085+.03/(1+e*.12))*t)}shiftUp(){if(this.gear<1){this.gear=1;return}this.gear>=this.gears.length||this.shiftT>0||(this.gear++,this.shiftT=this.shiftTime,this.events.push({type:"shift",dir:1}))}shiftDown(){if(!(this.shiftT>0))if(this.gear>1){if(this._rpmFor(this.u,this.gear-1)>this.limiter*1.02)return;this.gear--,this.shiftT=this.shiftTime*.8,this.events.push({type:"shift",dir:-1})}else this.gear===1&&Math.abs(this.u)<1.5&&(this.gear=-1)}step(t,e){let n=Math.max(1,Math.ceil(t/.004166666666666667)),i=t/n;for(let s=0;s<n;s++)this._sub(i,e);this._post(t,e)}_sub(t,e){let n=this.m,i=this.a,s=this.b,o=this.L;this.gripMul=e.gripMul??1;let a=Math.sin(this.heading),l=Math.cos(this.heading),c=this.VX*a+this.VY*l,h=this.VX*l-this.VY*a;this.u=c,this.v=h;let u=Math.hypot(c,h),d=e.throttle,f=e.brake;this.gear===-1?(d=e.brake,f=e.throttle,e.throttle>.1&&c>-.8&&(this.gear=1)):e.brake>.5&&e.throttle<.1&&Math.abs(c)<.6?(this.revHold+=t,this.revHold>.35&&(this.gear=-1,this.revHold=0)):this.revHold=0;let p=this.gear===-1?-this.reverseRatio*this.finalDrive:this.gears[this.gear-1]*this.finalDrive,x=c/this.rw*p*60/(2*Math.PI),g=1;this.shiftT>0&&(this.shiftT-=t,g=0);let m=this.idle+d*(this.redline*.42-this.idle),_=Math.max(x,this.idle*.95),v=!1;Math.abs(x)<m&&Math.abs(c)<12&&(_=Tt(m,Math.abs(x),vt(Math.abs(c)/12,0,1)),v=!0),g===0?this.rpm+=(Math.max(this.idle,Math.abs(x))-this.rpm)*Math.min(1,t*18):this.rpm+=(Math.abs(_)-this.rpm)*Math.min(1,t*(v?10:40));let y=d;if(this.rpm>=this.limiter&&(this.limiterT=.06,this.rpm=this.limiter),this.limiterT>0&&(this.limiterT-=t,y=0),this.isTurbo){let ft=vt((this.rpm/this.redline-.25)/.35,0,1),xt=y>.5?ft:y*.25,st=xt>this.boost?1/this.turboLag*(.4+.6*ft):4;this.boost+=vt(xt-this.boost,-st*t,st*t)}let S=this.isTurbo?.62+.38*this.boost:1,b;y>.01?b=this.torqueAt(this.rpm)*y*S:b=-this.Tpeak*(.1+.16*(this.rpm/this.redline))*(this.gear===-1?.2:1),this.rpm<this.idle*1.05&&y<.01&&(b=0),this.throttleEff=y;let T=g*b*p*dp/this.rw;Math.abs(c)<.5&&y<.01&&(T=0);let R=n*ur,w=.5*ru*this.ClA*c*c,M=R*s/o-n*this.axS*this.h/o+w*.45,C=R*i/o+n*this.axS*this.h/o+w*.55;M=Math.max(M,R*.12),C=Math.max(C,R*.12);let D=n*Math.abs(this.ayS)*this.h/this.track,k=.12,B=(ft,xt)=>{let st=D*xt,yt=ft/2+st,Ct=Math.max(0,ft/2-st),Ft=ft/2,Et=1-k*(yt/Ft-1),$t=1-k*(Ct/Ft-1);return(Et*yt+$t*Ct)/ft},$=this.mu*this.gripBonus*this.gripMul,G=$*B(M,this.rollStiffFront),ct=$*B(C,1-this.rollStiffFront)*(this.def.phys.rearGrip??1),H=G*M,X=ct*C,gt=this.steerAngle,_t=Math.max(Math.abs(c),3),wt=c>=-.5?1:-1,It=Math.atan2(h+i*this.omega,_t)-gt*wt,J=Math.atan2(h-s*this.omega,_t),dt=vt(u/2.5,0,1),F=-H*pp(It,this.B)*dt,O=-X*pp(J,this.B*.95)*dt,Z=T*this.frontSplit,ht=T*(1-this.frontSplit),it=0;if(T>0){let ft=Math.min(.97,Math.abs(F)/(H+1)),xt=Math.min(.97,Math.abs(O)/(X+1)),st=H*(e.tc?Math.max(.3,.97*Math.sqrt(1-ft*ft)):1),yt=X*(e.tc?Math.max(.3,.97*Math.sqrt(1-xt*xt)):1),Ct=this.frontSplit>0?Z/st:0,Ft=this.frontSplit<1?ht/yt:0,Et=Math.max(Ct,Ft);Et>1&&(it=Math.max(Ct*st/H,Ft*yt/X)-1,e.tc&&(Z/=Et,ht/=Et,it=Math.max(0,it)*.2))}let Rt=Math.abs(c)>.3?Math.sign(c):0,et=f*this.brakeForce;Rt!==0&&(Z-=Rt*et*this.brakeBias,ht-=Rt*et*(1-this.brakeBias));let lt=e.handbrake;lt>0&&Rt!==0&&(ht=Tt(ht,-Rt*X*.8,lt));let L=Math.abs(Z)>H?H/Math.abs(Z):1,Bt=Math.abs(ht)>X?X/Math.abs(ht):1;Z*=L,ht*=Bt,Rt===0&&f>.1&&this.gear!==-1&&(this.VX*=Math.max(0,1-t*12),this.VY*=Math.max(0,1-t*12)),F*=Math.sqrt(Math.max(0,1-Math.pow(Math.abs(Z)/(H+1),2)));let N=Math.sqrt(Math.max(0,1-Math.pow(Math.abs(ht)/(X+1),2)));O*=lt>0?Tt(N,.28,lt):N,it>0&&!e.tc&&this.frontSplit<1&&(O*=Math.max(.35,1-it*.8)),it>0&&!e.tc&&this.frontSplit>0&&(F*=Math.max(.5,1-it*.5));let nt=0;if(e.assist&&lt<.05&&u>7&&wt>0){let ft=c*Math.tan(gt)/o,xt=$*ur/Math.max(c,5),st=vt(ft,-xt*1.05,xt*1.05),yt=this.omega-st,Ct=Math.atan2(h,Math.abs(c)),Ft=Math.sign(yt)===Math.sign(this.omega)&&Math.abs(this.omega)>Math.abs(st),Et=Math.abs(Ct)>.06;Math.abs(yt)>.04||Et?(nt=-yt*this.Iz*(Ft||Et?3.2:.7),(Ft||Et)&&(ht>0&&(ht*=.65),Z>0&&(Z*=.65)),this.escActive=Ft||Et?1:0):this.escActive=0}let W=.5*ru*this.CdA*c*Math.abs(c),Q=.013*n*ur*vt(c,-1,1),K=Math.cos(gt),A=Math.sin(gt),E=ht+Z*K-F*A-W-Q,U=O+F*K+Z*A,z=i*(F*K+Z*A)-s*O+nt,tt=E*a+U*l,j=E*l-U*a;if(this.VX+=tt/n*t,this.VY+=j/n*t,this.omega+=z/this.Iz*t,u<3){let ft=(1-u/3)*Math.min(1,t*20),xt=c*Math.tan(gt)/o;this.omega+=(xt-this.omega)*ft;let st=this.VX*l-this.VY*a;this.VX-=st*l*ft,this.VY+=st*a*ft}this.omega=vt(this.omega,-9,9),this.heading+=this.omega*t,this.X+=this.VX*t,this.Y+=this.VY*t,Number.isFinite(this.X+this.Y+this.VX+this.VY+this.omega+this.heading)?this._safe?(this._safe.X=this.X,this._safe.Y=this.Y,this._safe.heading=this.heading):this._safe={X:this.X,Y:this.Y,heading:this.heading}:(this.X=this._safe?.X??0,this.Y=this._safe?.Y??0,this.heading=this._safe?.heading??0,this.VX=this.VY=this.omega=0),this.ax=E/n,this.ay=U/n;let bt=Math.min(1,t*12);this.axS+=(this.ax-this.axS)*bt,this.ayS+=(this.ay-this.ayS)*bt;let mt=1.15/this.B;this.slipF=Math.max(0,Math.abs(It)-mt)*u,this.slipR=Math.max(0,Math.abs(J)-mt)*u,this.wheelspin=it,this.hbSlide=lt>0?lt*u:0,this.capF=H,this.capR=X,this.alphaF=It,this.alphaR=J,this.wheelRot+=c/this.rw*t*(1+(this.frontSplit<1?it*1.5:0)),this.wheelRotF+=c/this.rw*t*(1+(this.frontSplit>0?it*1.5:0))}_post(t,e){let n=this.steerLimit(e.sens??1),i=e.steer*n;if(e.assist&&Math.abs(this.u)>5){let s=Math.atan2(this.v,Math.abs(this.u)),o=.55*(1-Math.abs(e.steer)*.5);i+=s*o}if(i=vt(i,-this.lockRad,this.lockRad),this.steerAngle+=(i-this.steerAngle)*Math.min(1,t*18),this.shiftCooldown-=t,e.auto&&this.gear>0&&this.shiftT<=0&&this.shiftCooldown<=0){let s=e.throttle,o=Tt(this.redline*.55,this.redline*.985,vt(s,0,1)),a=this.gear;if(this.rpm>o&&a<this.gears.length&&Math.abs(this.u)>3)this.shiftUp(),this.shiftCooldown=.35;else if(a>1){let l=Tt(this.redline*.3,this.redline*.6,vt(s,0,1)),c=this._rpmFor(this.u,a-1);this.rpm<l&&c<this.redline*.9&&(this.shiftDown(),this.shiftCooldown=.35)}}this.lastThrottle>.6&&e.throttle<.2&&this.events.push({type:"lift",boost:this.boost,rpm:this.rpm}),this.lastThrottle=e.throttle,this.skid=vt(Math.max(this.slipF,this.slipR)*.12+this.wheelspin*1.2+(this.hbSlide||0)*.04,0,1)}get speed(){return Math.hypot(this.VX,this.VY)}applyImpulse(t,e,n,i){this.VX+=t/this.m,this.VY+=e/this.m,this.omega+=(i*t-n*e)/this.Iz}pointVelocity(t,e){return[this.VX+this.omega*e,this.VY-this.omega*t]}};var fr=(r,t,e)=>r<t?Math.min(t,r+e):Math.max(t,r-e),qa=class{constructor(t){this.scene=t,this.model=null,this.phys=null,this.steer=0,this.thr=0,this.brk=0,this.hb=0,this.proj={s:0,d:0,H:0,E:0,G:0},this.pitch=0,this.pitchV=0,this.roll=0,this.rollV=0,this.heave=0,this.heaveV=0,this.nextBump=60,this.bumpT=0,this.bumpAmp=0,this.events=[],this.headOn=0,this.brakeLight=0,this._v=new I,this._q=new Ze,this._e=new rn}build(t,e,n="NO HESI"){this.model&&(this.scene.remove(this.model.root),Xa(this.model)),this.def=t,this.custom=e,this.model=Wa(t,e,n),this.dims=this.model.dims,this.scene.add(this.model.root);let i=this.phys;this.phys=new dr(t,e),i&&this.phys.reset(i.X,i.Y,i.heading,i.speed),this.spots=[];let s=this.model.lamps.head,o=s.length>2?[s[0],s[s.length-1]]:s;for(let a of o){let l=new ls(16773852,0,140,.42,.7,.8);l.position.set(a[0]*.9,a[1],a[2]),l.target.position.set(a[0]*.6,.15,a[2]-34),l.castShadow=!1,this.model.body.add(l,l.target),this.spots.push(l)}this.halfW=this.dims.W/2,this.halfL=this.dims.L/2}place(t,e,n,i){let s=t.pos(e,n,{});this.phys.reset(s.X,s.Y,s.H,i),this.proj.s=e,this.proj.d=n,this.steer=0,this.thr=0,this.brk=0,this.pitch=this.roll=this.heave=0,this.pitchV=this.rollV=this.heaveV=0}control(t,e,n){let i=Math.abs(this.phys.u),s=vt(t.steer,-1,1);if(t.analog)this.steer=Pn(this.steer,s,22,e);else{let o=n.steerSpeed??1,a=Tt(3.4,1.55,vt(i/60,0,1))*o,l=5.2;s===0?this.steer=fr(this.steer,0,l*e):this.steer!==0&&Math.sign(s)!==Math.sign(this.steer)?this.steer=fr(this.steer,s,(l+a)*e):this.steer=fr(this.steer,s,a*e)}return this.thr=fr(this.thr,t.throttle,(t.throttle>this.thr?5:9)*e),this.brk=fr(this.brk,t.brake,(t.brake>this.brk?7:10)*e),this.hb=fr(this.hb,t.handbrake?1:0,10*e),{throttle:this.thr,brake:this.brk,steer:this.steer,handbrake:this.hb,auto:n.transmission!=="manual",tc:n.tc,assist:n.assist,sens:n.steerSens??1,gripMul:n.gripMul??1}}step(t,e){this.lastInput=e,this.phys.step(t,e)}sync(t,e,n,i,s){let o=this.phys,a=t.project(o.X,o.Y,this.proj.s,this.proj),l=this.model,c=2*Math.PI*o.susFreq,h=c*c,u=2*.45*c,d=vt(o.axS*.0042,-.05,.04),f=vt(o.ayS*o.rollGain,-.07,.07),p=Math.max(1,Math.ceil(n/(1/120))),x=n/p;for(let R=0;R<p;R++)this.pitchV+=(h*(d-this.pitch)-u*this.pitchV)*x,this.pitch+=this.pitchV*x,this.rollV+=(h*(f-this.roll)-u*this.rollV)*x,this.roll+=this.rollV*x;let g=o.speed,m=a.s;m>this.nextBump&&(this.nextBump=m+45+Math.random()*110,g>8&&(this.bumpAmp=.012+Math.random()*.02,this.heaveV-=this.bumpAmp*22,this.events.push({type:"bump",amp:this.bumpAmp})));let _=Bi(m*.9,3)*.0025*vt(g/30,0,1)+Bi(m*3.1,5)*.001*vt(g/40,0,1);for(let R=0;R<p;R++)this.heaveV+=(h*1.6*(_-this.heave)-u*1.2*this.heaveV)*x,this.heave+=this.heaveV*x;Number.isFinite(this.heave+this.pitch+this.roll)||(this.heave=this.heaveV=this.pitch=this.pitchV=this.roll=this.rollV=0),this.heave=vt(this.heave,-.08,.08);let v=l.root;v.position.set(o.X-e.x,a.E,-(o.Y-e.y));let y=o.heading-a.H,S=Math.atan(a.G)*Math.cos(y);this._e.set(S,-o.heading,0,"YXZ"),v.quaternion.setFromEuler(this._e),l.body.position.y=this.heave,l.body.rotation.set(this.pitch,0,this.roll);for(let R of l.wheels){R.front&&(R.pivot.rotation.y=-o.steerAngle*1.25);let w=R.front?o.wheelRotF:o.wheelRot;R.spin.rotation.x=-w*R.side,R.pivot.position.y=R.baseY+vt(this.heave*.4,-.02,.02)}let b=this.brk>.15||o.gear===-1&&this.thr>.1;this.brakeLight=Pn(this.brakeLight,b?1:0,20,n);let T=ae(.15,.6,i+s*.3);this.headOn=Pn(this.headOn,T,3,n),l.mats.tail.emissiveIntensity=.35+this.headOn*.9+this.brakeLight*3.2,l.mats.head.emissiveIntensity=.3+this.headOn*3;for(let R of this.spots)R.intensity=this.headOn*120}lampWorld(t,e=[]){e.length=0;let n=this.model.body;n.updateWorldMatrix(!0,!1);for(let i of t){let s=new I(i[0],i[1],i[2]).applyMatrix4(n.matrixWorld);e.push(s)}return e}corners(t=[]){let e=this.phys,n=this.halfW,i=this.halfL,s=Math.sin(e.heading),o=Math.cos(e.heading),a=s,l=o,c=o,h=-s;t.length=0;for(let[u,d]of[[1,1],[1,-1],[-1,-1],[-1,1]])t.push([e.X+a*i*u+c*n*d,e.Y+l*i*u+h*n*d]);return t}setInteriorDummyVisible(t){this.model.meshes.interior&&(this.model.meshes.interior.visible=t),this.model.meshes.cabinTop&&(this.model.meshes.cabinTop.visible=t)}setVisible(t){this.model&&(this.model.root.visible=t)}};var $a=["chase","far","cockpit","hood","bumper","cinematic"],ou={chase:"Chase",far:"Chase Far",cockpit:"Cockpit",hood:"Hood",bumper:"Bumper",cinematic:"Cinematic"},Vy=new I,ds=new I,Za=new I,Y_=new Qt,Ka=class{constructor(t){this.camera=t,this.mode="chase",this.yaw=0,this.pos=new I,this.look=new I,this.t=0,this.impact=0,this.bump=0,this.fovBase=62,this.snap=!0,this.cine={shot:"trackside",t:0,pos:new I,ang:0,side:1},this.lookBackAmt=0,this.headX=0,this.headZ=0,this.headYaw=0}setMode(t){$a.includes(t)||(t="chase"),this.mode=t,this.snap=!0,t==="cinematic"&&this._newShot(null,!0)}next(){let t=$a.indexOf(this.mode);return this.setMode($a[(t+1)%$a.length]),this.mode}addImpact(t){this.impact=Math.min(1.5,this.impact+t)}addBump(t){this.bump=Math.min(.06,this.bump+t)}update(t,e){let n=this.camera,i=e.car,s=i.phys,o=i.model,a=i.dims,l=e.settings;this.t+=t;let c=s.speed,h=this.mode;this.lookBackAmt=Pn(this.lookBackAmt,e.lookBack?1:0,14,t);let u=this.lookBackAmt>.5,d=o.root,f=o.body;d.updateMatrixWorld(!0);let p=Vy.copy(d.position),x=s.heading,g=Math.sin(x),m=-Math.cos(x),_=l.fov??62,v=.2,y=l.shake??1,S=ae(38,95,c)*.012*y;if(this.impact=Math.max(0,this.impact-t*1.8),this.bump=Math.max(0,this.bump-t*.25),h==="chase"||h==="far"){let T=h==="far",R=-x;if(c>4){let $=Math.atan2(s.VX,s.VY);R=-(x+vt($-x,-.5,.5)*.35)}this.snap&&(this.yaw=R),this.yaw=pf(this.yaw,R,T?4:5.5,t);let w=vt(a.L/4.6,.85,1.6),M=(T?7.8:5.5)*w+vt(s.axS*.035,-.35,.45),C=(T?2.35:1.5)+(a.H-1.35)*.8,D=-Math.sin(this.yaw),k=-Math.cos(this.yaw),B=u?-1:1;ds.set(p.x-D*M*B,p.y+C,p.z-k*M*B),this.snap&&this.pos.copy(ds),this.pos.lerp(ds,1-Math.exp(-18*t)),Za.set(p.x+D*5.5*B,p.y+.85+(T?.2:0),p.z+k*5.5*B),this.look.copy(Za),_+=ae(10,95,c)*(T?10:13),n.position.copy(this.pos)}else if(h==="cockpit"||h==="hood"||h==="bumper"){let T=h==="cockpit";f.updateMatrixWorld(!0);let R=h==="bumper"?d.matrixWorld:f.matrixWorld,w,M,C;T?(this.headX=Pn(this.headX,vt(-s.ayS*.004,-.05,.05),6,t),this.headZ=Pn(this.headZ,vt(s.axS*.0035,-.04,.05),6,t),w=-a.cabinW*.46+this.headX,M=a.eyeY+Math.sin(this.t*1.7)*.002,C=a.eyeZ+this.headZ,v=.04,_=(l.cockpitFov??68)+ae(20,95,c)*4):h==="hood"?(w=0,M=a.wsBaseY+.16,C=a.dashZ-.45,v=.08,_=64+ae(20,95,c)*8):(w=0,M=.45,C=a.frontZ-.08,u&&(C=a.rearZ+.1),v=.08,_=70+ae(20,95,c)*8),ds.set(w,M,C).applyMatrix4(R),n.position.copy(ds),this.headYaw=Pn(this.headYaw,T?vt(s.omega*.09+i.steer*.025,-.12,.12):0,5,t);let D=this.headYaw+(u?Math.PI:0);Za.set(w+Math.sin(-D)*-10,M-(T?1.3:.15),C-Math.cos(D)*10).applyMatrix4(R),this.look.copy(Za),this.pos.copy(n.position)}else this._cinematic(t,e,p),_=this.cine.fov;let b=S+this.impact*.06*y+this.bump*y;if(b>1e-4){let T=Bi(this.t*23,1),R=Bi(this.t*19,2);n.position.x+=T*b,n.position.y+=R*b,this.look.x+=Bi(this.t*11,3)*b*2}n.position.y=Math.max(n.position.y,p.y+.18),n.lookAt(this.look),this.impact>.05&&n.rotateZ(Bi(this.t*17,4)*this.impact*.03*y),(Math.abs(n.fov-_)>.01||n.near!==v)&&(n.fov=this.snap?_:Pn(n.fov,_,4,t),n.near=v,n.updateProjectionMatrix()),this.snap=!1}_newShot(t,e=!1){let n=["trackside","orbit","low","trackside","heli","low"],i=this.cine,s=n[Math.floor(Math.random()*n.length)];!e&&s===i.shot&&(s=n[(n.indexOf(s)+1)%n.length]),i.shot=e?"orbit":s,i.t=0,i.ang=Math.random()*Math.PI*2,i.side=Math.random()<.5?-1:1,i.placed=!1}_blocked(t,e){if(!e)return!1;for(let n of[e.cars,e.opp])for(let i of n){if(!i.matrix)continue;let s=i.matrix.elements,o=t.x-s[12],a=t.y-s[13],l=t.z-s[14];if(o*o+l*l>400)continue;let c=o*s[0]+a*s[1]+l*s[2],h=o*s[4]+a*s[5]+l*s[6],u=o*s[8]+a*s[9]+l*s[10];if(Math.abs(c)<i.wid/2+.6&&Math.abs(u)<i.len/2+.7&&h<(i.t?.dims.H??1.5)+.5&&h>-.6)return!0}return!1}_cinematic(t,e,n){let i=this.cine,s=this.camera;i.t>.3&&this._blocked(s.position,e.traffic)&&(this._newShot(e),i.shot=i.shot==="heli"?"orbit":"heli",i.t=0);let o=e.car,a=o.phys;i.t+=t;let l=a.heading,c=Math.sin(l),h=-Math.cos(l);if(i.fov=50,i.shot==="trackside"){if(!i.placed){let f=e.layout,p=40+a.speed*2.2,x=i.side>0?f.roadEdge-1:f.medianHalf+.9,g=e.road.pos(o.proj.s+p,x,{});i.pos.set(g.X-e.origin.x,g.E+.9+Math.random()*2.2,-(g.Y-e.origin.y)),i.placed=!0}s.position.copy(i.pos),this.look.copy(n).y+=.7;let u=s.position.distanceTo(n);i.fov=vt(1400/Math.max(u,8),14,60),((n.x-i.pos.x)*c+(n.z-i.pos.z)*h>30||i.t>11)&&this._newShot(e)}else if(i.shot==="orbit"){i.ang+=t*.32;let u=7.5;s.position.set(n.x+Math.cos(i.ang)*u,n.y+1.4+Math.sin(i.t*.4)*.4,n.z+Math.sin(i.ang)*u),this.look.copy(n).y+=.6,i.fov=48,i.t>9&&this._newShot(e)}else if(i.shot==="low"){let u=Math.cos(l),d=Math.sin(l),f=2.5*i.side,p=ds.set(n.x+u*f-c*(1.5+Math.sin(i.t*.5)*2),n.y+.55,n.z+d*f-h*(1.5+Math.sin(i.t*.5)*2));i.placed||(s.position.copy(p),i.placed=!0),s.position.lerp(p,1-Math.exp(-6*t)),this.look.set(n.x+c*1.5,n.y+.5,n.z+h*1.5),i.fov=40,i.t>7&&this._newShot(e)}else{let u=ds.set(n.x-c*26,n.y+13,n.z-h*26);i.placed||(s.position.copy(u),i.placed=!0),s.position.lerp(u,1-Math.exp(-2*t)),this.look.set(n.x+c*10,n.y,n.z+h*10),i.fov=42,i.t>8&&this._newShot(e)}}};var le={};function Un(r,t){let e=document.createElement("canvas");return e.width=r,e.height=t,e}function Nn(r,{srgb:t=!0,repeat:e=!0}={}){let n=new Mn(r);return t&&(n.colorSpace=Ce),e&&(n.wrapS=n.wrapT=_n),n.anisotropy=4,n.needsUpdate=!0,n}function Ja(r){let t=r>>>0||1;return()=>(t=t*16807%2147483647)/2147483647}function au(){if(le.leather)return le.leather;let r=256,t=Un(r,r),e=t.getContext("2d"),n=Ja(7);e.fillStyle="#808080",e.fillRect(0,0,r,r);for(let i=0;i<2600;i++){let s=n()*r,o=n()*r,a=1.2+n()*2.6,l=110+Math.floor(n()*60);e.fillStyle=`rgb(${l},${l},${l})`;for(let[c,h]of[[0,0],[r,0],[-r,0],[0,r],[0,-r]])e.beginPath(),e.arc(s+c,o+h,a,0,Math.PI*2),e.fill()}return le.leather=Nn(t,{srgb:!1})}function mp(){if(le.plastic)return le.plastic;let r=256,t=Un(r,r),e=t.getContext("2d"),n=e.createImageData(r,r),i=Ja(13);for(let s=0;s<r*r;s++){let o=120+Math.floor(i()*30);n.data[s*4]=n.data[s*4+1]=n.data[s*4+2]=o,n.data[s*4+3]=255}return e.putImageData(n,0,0),le.plastic=Nn(t,{srgb:!1})}function lu(){if(le.carbon)return le.carbon;let r=128,t=Un(r,r),e=t.getContext("2d"),n=8,i=r/n;for(let s=0;s<n;s++)for(let o=0;o<n;o++){let a=(o+s>>1)%2===0,l=a?e.createLinearGradient(0,s*i,0,(s+1)*i):e.createLinearGradient(o*i,0,(o+1)*i,0);l.addColorStop(0,"#0b0c0e"),l.addColorStop(.5,a?"#2c3036":"#23262b"),l.addColorStop(1,"#0b0c0e"),e.fillStyle=l,e.fillRect(o*i,s*i,i,i)}return le.carbon=Nn(t)}function gp(){if(le.brushed)return le.brushed;let r=256,t=Un(r,r),e=t.getContext("2d"),n=Ja(21);e.fillStyle="#9a9ea4",e.fillRect(0,0,r,r);for(let i=0;i<900;i++){let s=n()*r,o=130+Math.floor(n()*90);e.fillStyle=`rgba(${o},${o+2},${o+5},0.35)`,e.fillRect(0,s,r,1)}return le.brushed=Nn(t)}function Qa(){if(le.speaker)return le.speaker;let r=128,t=Un(r,r),e=t.getContext("2d");e.fillStyle="#1c1d20",e.fillRect(0,0,r,r),e.fillStyle="#060607";for(let n=0;n<16;n++)for(let i=0;i<16;i++)e.beginPath(),e.arc(i*8+4+n%2*4,n*8+4,2.2,0,Math.PI*2),e.fill();return le.speaker=Nn(t)}function xp(){if(le.knurl)return le.knurl;let r=Un(256,32),t=r.getContext("2d");t.fillStyle="#b8bcc2",t.fillRect(0,0,256,32),t.strokeStyle="#55595f",t.lineWidth=1.5;for(let e=0;e<256;e+=4)t.beginPath(),t.moveTo(e,0),t.lineTo(e+8,32),t.stroke(),t.beginPath(),t.moveTo(e+8,0),t.lineTo(e,32),t.stroke();return le.knurl=Nn(r)}function ja(r,t,e,n,i,s){r.beginPath(),r.moveTo(t+s,e),r.arcTo(t+n,e,t+n,e+i,s),r.arcTo(t+n,e+i,t,e+i,s),r.arcTo(t,e+i,t,e,s),r.arcTo(t,e,t+n,e,s),r.closePath()}function cu(){if(le.climate)return le.climate;let r=512,t=128,e=Un(r,t),n=e.getContext("2d"),i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,"#16181b"),i.addColorStop(1,"#060708"),n.fillStyle=i,n.fillRect(0,0,r,t),n.fillStyle="#e8edf2",n.font="600 30px Arial, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText("21.5\xB0",60,64),n.fillText("21.5\xB0",r-60,64);let s=["A/C","AUTO","\u2744","\u2668","\u27F3","MAX"];n.font="600 20px Arial, sans-serif";for(let o=0;o<s.length;o++){let a=140+o*47;n.strokeStyle="#3a3e44",n.lineWidth=2,ja(n,a-20,40,40,48,8),n.stroke(),n.fillStyle=o===1?"#5cc8ff":"#cfd5dc",n.fillText(s[o],a,64)}return le.climate=Nn(e,{repeat:!1})}function vp(r){let t="spoke"+r;if(le[t])return le[t];let e=256,n=128,i=Un(e,n),s=i.getContext("2d");s.fillStyle="#121315",s.fillRect(0,0,e,n);let o=r<0?["SET","RES","+","\u2212","\u23FB","LIM"]:["\u266A","\u260E","\u25B2","\u25BC","\u25C0","\u25B6"];s.font="bold 22px Arial, sans-serif",s.textAlign="center",s.textBaseline="middle";for(let a=0;a<6;a++){let l=50+a%3*78,c=36+Math.floor(a/3)*56,h=s.createLinearGradient(0,c-22,0,c+22);h.addColorStop(0,"#2c2f34"),h.addColorStop(1,"#16181b"),s.fillStyle=h,ja(s,l-32,c-22,64,44,10),s.fill(),s.fillStyle="#d6dbe1",s.fillText(o[a],l,c+1)}return le[t]=Nn(i,{repeat:!1})}function yp(){if(le.winsw)return le.winsw;let r=256,t=128,e=Un(r,t),n=e.getContext("2d");n.fillStyle="#0b0c0d",n.fillRect(0,0,r,t);for(let i=0;i<4;i++){let s=32+i*64,o=n.createLinearGradient(0,30,0,98);o.addColorStop(0,"#3a3d42"),o.addColorStop(1,"#17191c"),n.fillStyle=o,ja(n,s-22,30,44,68,10),n.fill(),n.fillStyle="#c9ced4",n.beginPath(),n.moveTo(s,46),n.lineTo(s-7,56),n.lineTo(s+7,56),n.fill()}return le.winsw=Nn(e,{repeat:!1})}function _p(r,t){let e="badge"+r;if(le[e])return le[e];let n=256,i=Un(n,n),s=i.getContext("2d");s.clearRect(0,0,n,n);let o=n/2;s.fillStyle="#c9ccd0",s.beginPath(),s.arc(o,o,126,0,Math.PI*2),s.fill(),s.fillStyle="#0b0c0e",s.beginPath(),s.arc(o,o,116,0,Math.PI*2),s.fill();let a=t||["#1c69d4","#e8eaec"];for(let h=0;h<4;h++)s.fillStyle=a[h%2],s.beginPath(),s.moveTo(o,o),s.arc(o,o,70,h*Math.PI/2-Math.PI/2,(h+1)*Math.PI/2-Math.PI/2),s.closePath(),s.fill();s.strokeStyle="#c9ccd0",s.lineWidth=4,s.beginPath(),s.arc(o,o,70,0,Math.PI*2),s.stroke(),s.fillStyle="#e9ecef",s.font="bold 30px Arial, sans-serif",s.textAlign="center",s.textBaseline="middle";let l=String(r).toUpperCase().slice(0,8),c=l.length;for(let h=0;h<c;h++){let u=-Math.PI/2+(h-(c-1)/2)*.27;s.save(),s.translate(o+Math.cos(u)*93,o+Math.sin(u)*93),s.rotate(u+Math.PI/2),s.fillText(l[h],0,0),s.restore()}return le[e]=Nn(i,{repeat:!1})}function Mp(){if(le.glove)return le.glove;let r=256,t=Un(r,r),e=t.getContext("2d");e.fillStyle="#9a9ea6",e.fillRect(0,0,r,r);let n=Ja(5);for(let i=0;i<4e3;i++){let s=140+Math.floor(n()*40);e.fillStyle=`rgba(${s},${s+2},${s+8},0.25)`,e.fillRect(n()*r,n()*r,2,2)}e.fillStyle="#4a4e56",ja(e,30,60,196,70,30),e.fill(),e.strokeStyle="rgba(40,42,48,0.8)",e.lineWidth=2;for(let i=0;i<4;i++)e.beginPath(),e.moveTo(40+i*55,140),e.lineTo(40+i*55,250),e.stroke();return le.glove=Nn(t,{repeat:!1})}function bp(){if(le.glowStrip)return le.glowStrip;let r=Un(4,64),t=r.getContext("2d"),e=t.createLinearGradient(0,0,0,64);return e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,4,64),le.glowStrip=Nn(r,{srgb:!1,repeat:!1})}function Gy(){let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d"),n=7,i=()=>(n=n*16807%2147483647)/2147483647;for(let o=0;o<420;o++){let a=i()*512,l=i()*512,c=1.2+Math.pow(i(),3)*7,h=1+i()*.35;for(let[u,d]of[[0,0],[512,0],[-512,0],[0,512],[0,-512]]){let f=a+u,p=l+d;if(f<-10||f>522||p<-10||p>522)continue;let x=e.createRadialGradient(f,p+c*.35,c*.1,f,p,c*1.05);x.addColorStop(0,"rgba(255,255,255,0.10)"),x.addColorStop(.6,"rgba(210,220,230,0.22)"),x.addColorStop(.85,"rgba(255,255,255,0.55)"),x.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=x,e.beginPath(),e.ellipse(f,p,c,c*h,0,0,Math.PI*2),e.fill(),e.fillStyle="rgba(0,0,0,0.28)",e.beginPath(),e.ellipse(f,p-c*.45,c*.7,c*.32,0,0,Math.PI*2),e.fill()}}e.strokeStyle="rgba(230,236,240,0.16)";for(let o=0;o<40;o++){let a=i()*512,l=i()*512,c=20+i()*60;e.lineWidth=1+i()*1.5,e.beginPath(),e.moveTo(a,l),e.lineTo(a+(i()-.5)*8,l-c),e.stroke()}let s=new Mn(t);return s.wrapS=s.wrapT=_n,s.colorSpace=Ce,s}var se=(r,t,e,n=.03,i=2)=>new sr(r,t,e,i,Math.max(1e-4,Math.min(n,r/2-.001,t/2-.001,e/2-.001))),wp=new I(0,1,0);function tl(r,t,e=0,n=.006,i=10){let s=Math.max(.002,t-n*2),o=new rs(r,{depth:s,bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelSegments:2,curveSegments:i});return o.translate(0,0,-s/2),o.rotateY(-Math.PI/2),o.translate(e,0,0),o}function el(r,t,e,n,i=12){let s=Math.max(.001,r.distanceTo(t)),o=new ie(n,e,s,i,1,!1),a=new Mt(o);return a.position.copy(r).lerp(t,.5),a.quaternion.setFromUnitVectors(wp,t.clone().sub(r).normalize()),a}var Sp=[];function so(r,t,e=t){let n=r.clone();return n.repeat.set(t,e),n.needsUpdate=!0,Sp.push(n),n}var nl=class{constructor(t){po(this,"_tmp",new I);po(this,"_tmp2",new I);po(this,"_inv",new Qt);this.renderer=t,this.group=null,this.visible=!1,this.mirrorRT=new ze(512,160,{samples:0}),this.mirrorRT.texture.colorSpace=Ce,this.mirrorCam=new Be(28,512/160,.3,900),this.frame=0;let e=(n,i)=>{let s=document.createElement("canvas");s.width=n,s.height=i;let o=new Mn(s);return o.colorSpace=Ce,o.anisotropy=4,[s,o]};[this.gaugeCanvas,this.gaugeTex]=e(1024,384),[this.navCanvas,this.navTex]=e(1024,512),[this.hudCanvas,this.hudTex]=e(512,160),this.gaugeT=0,this.navT=0,this.hudT=0,this.accent="#ff2e4d",this.ambientColor=new St("#2fd9ff"),this.dropTex=Gy(),this.dropT=0,this.odo=12873,this.tripT=0,this.mats=[],this.geos=[]}build(t,e){if(this.group){this.group.parent?.remove(this.group),this.group.traverse(N=>{N.isMesh&&!this.shared?.has(N.geometry)&&N.geometry.dispose()});for(let N of this.mats)N.dispose();for(let N of Sp.splice(0))N.dispose()}this.mats=[];let n=t.dims,i=t.model.ctx,s=e.body.cabin;this.def=e;let o=new de;o.name="cockpit";let a=N=>(this.mats.push(N),N),l=(N,nt,W=o)=>{let Q=new Mt(N,nt);return W.add(Q),Q},c=so(au(),9),h=so(mp(),14),u=a(new Pt({color:3224119,roughness:.8,bumpMap:h,bumpScale:.35})),d=a(new Pt({color:2763567,roughness:.62,bumpMap:c,bumpScale:.8})),f=a(new Pt({color:2894896,roughness:.6,bumpMap:c,bumpScale:.9})),p=a(new Pt({color:3881792,roughness:.62,bumpMap:c,bumpScale:.9})),x=a(new Vn({color:263173,roughness:.1,metalness:.1,clearcoat:1,clearcoatRoughness:.04})),g=a(new Vn({map:so(lu(),5,1),roughness:.3,metalness:.2,clearcoat:1,clearcoatRoughness:.05})),m=a(new Pt({map:gp(),metalness:.9,roughness:.32})),_=a(new Pt({color:14278115,metalness:1,roughness:.14})),v=a(new Pt({color:723724,roughness:.95})),y=a(new Pt({color:new St(this.accent).multiplyScalar(.55),roughness:.8}));this.ambientMat=a(new re({color:this.ambientColor.clone(),toneMapped:!1,transparent:!0,opacity:.6})),this.ambientGlow=a(new re({color:this.ambientColor.clone(),map:bp(),transparent:!0,opacity:0,depthWrite:!1,blending:Ke,toneMapped:!1}));let S=a(new Pt({map:Mp(),roughness:.82})),b=a(new Pt({color:4080201,roughness:.75})),T=a(new Pt({color:1513500,roughness:.78,metalness:.05})),R=a(new Pt({color:new St(this.accent),roughness:.6})),w=n.cabinW,M=-w*.46;this.driverX=M;let C=n.eyeY,D=n.eyeZ,k=N=>(N+i.L/2)/i.L,B=(N,nt)=>{let W=vt(k(N),0,1);return i.halfWAt(W,Math.min(nt+i.lower,i.top(W)-.03))},$=N=>Math.min(n.beltY,i.top(vt(k(N),0,1))-i.lower-.006),G=i.z(s.t0),ct=N=>{let nt=vt(k(N),s.t0,s.t1),W=(nt-s.t0)/Math.max(.001,s.t1-s.t0),Q=i.top(nt);return Q+(s.roof-Q)*Math.pow(Math.sin(W*Math.PI/2),s.wsCurve??.85)-i.lower};{let N=a(new Pt({vertexColors:!0,roughness:.93,side:we})),nt=a(new re({color:0,transparent:!0,opacity:.12,side:we,depthWrite:!1})),W=new St("#5d5e63"),Q=new St("#25262a"),K=["paint","trim","decal","kit","cabinTop","body2"];for(let A of K){let E=t.model.meshes[A];if(!E)continue;let U=E.geometry;if(!U.attributes.color||U.userData.shellBelt!==n.beltY){let z=U.attributes.position,tt=new Float32Array(z.count*3);for(let j=0;j<z.count;j++){let bt=z.getY(j),mt=vt((bt-(n.beltY+.02))/.06,0,1);tt[j*3]=Tt(Q.r,W.r,mt),tt[j*3+1]=Tt(Q.g,W.g,mt),tt[j*3+2]=Tt(Q.b,W.b,mt)}U.setAttribute("color",new oe(tt,3)),U.userData.shellBelt=n.beltY}l(U,N)}if(t.model.meshes.glass){let A=l(t.model.meshes.glass.geometry,nt);A.renderOrder=3}this.shared=new Set(K.concat("glass").map(A=>t.model.meshes[A]?.geometry).filter(Boolean))}let H=Math.max(D-.62,G+.17),X=C-.325,gt=G+.025,_t=ct(gt)-.012,wt=Math.max(.45,Math.min(B(H,X-.12),B(H,X),B(gt+.1,_t-.06))-.014);this.dash={zLip:H,yLip:X,dashHW:wt};{let N=Tt(gt,H,.5),nt=Math.min(ct(N)-.03,Math.max(_t,X)+.012),W=new fn;W.moveTo(gt,_t),W.quadraticCurveTo(N,nt,H-.05,X),W.quadraticCurveTo(H+.002,X+.002,H+.006,X-.04),W.quadraticCurveTo(H+.03,X-.15,H+.05,X-.25),W.quadraticCurveTo(H+.07,X-.33,H+.02,X-.38),W.lineTo(gt+.06,X-.42),W.lineTo(gt,_t-.1),W.lineTo(gt,_t),l(tl(W,wt*2,0,.008,14),u);let Q=new fn;Q.moveTo(H-.16,X+.004),Q.quadraticCurveTo(H-.06,X+.016,H-.01,X+.004),Q.quadraticCurveTo(H+.012,X-.012,H+.012,X-.035),Q.lineTo(H+.004,X-.038),Q.quadraticCurveTo(H,X-.012,H-.02,X-.004),Q.lineTo(H-.16,X-.008),l(tl(Q,wt*2-.02,0,.004,8),d),l(new zt(wt*2-.08,.0025,.0025),y).position.set(0,X-.022,H+.0135);let A=gt+.05,E=Tt(_t,X,.12)+.004;l(se(wt*1.5,.004,.025,.002),v).position.set(0,E,A);for(let z of[-1,1])l(new He(.035,24).rotateX(-Math.PI/2+.12),a(new Pt({map:Qa(),roughness:.6,metalness:.4}))).position.set(z*(wt-.14),E+.004,A+.06)}let It=N=>H+.006+.008+(X-.04-N)/.21*.044,J=-.21,dt=D-.71,F=C-.275;{let N=new Se(.31,.112,20,1),nt=N.attributes.position;for(let z=0;z<nt.count;z++)nt.setZ(z,nt.getX(z)*nt.getX(z)*.7);N.computeVertexNormals();let W=l(N,a(new re({map:this.gaugeTex,toneMapped:!1})));W.position.set(M,F,dt),W.rotation.x=-.22;let Q=l(se(.335,.132,.03,.012),x);Q.position.set(M,F-.002,dt-.018),Q.rotation.x=-.22;let K=new fn,A=dt-.075,E=X-.01;K.moveTo(A,E),K.quadraticCurveTo(A-.005,F+.1,dt+.005,F+.098),K.quadraticCurveTo(dt+.045,F+.097,dt+.048,F+.084),K.quadraticCurveTo(dt+.03,F+.078,dt+.004,F+.074),K.lineTo(dt-.03,F+.066),K.lineTo(dt-.035,E),K.lineTo(A,E),l(tl(K,.38,M,.016,12),d),l(new zt(.36,.002,.002),y).position.set(M,F+.093,dt+.03)}let O=M+.43;{let N=l(new Se(.3,.15),a(new re({map:this.navTex,toneMapped:!1})));N.position.set(O,X+.088,D-.705),N.rotation.set(-.12,-.3,0,"YXZ");let nt=l(se(.318,.168,.016,.01),x);nt.position.copy(N.position).add(new I(Math.sin(.3)*.009,0,-Math.cos(.3)*.009)),nt.rotation.copy(N.rotation);let W=l(se(.12,.05,.06,.012),x);W.position.set(O+.01,X+.012,D-.72),W.rotation.y=-.3}let Z=(N,nt,W,Q)=>{let K=new de,A=se(W,Q,.028,.012);K.add(new Mt(A,x));let E=new Mt(new zt(W-.018,Q-.014,.004),v);E.position.z=.006,K.add(E);let U=Math.max(3,Math.round(Q/.012));for(let tt=0;tt<U;tt++){let j=new Mt(new zt(W-.022,.0035,.018),tt===Math.floor(U/2)?m:u);j.position.set(0,-Q/2+.01+tt/(U-1)*(Q-.02),.012),j.rotation.x=.25,K.add(j)}let z=new Mt(se(.012,.016,.012,.004),_);z.position.set(0,0,.022),K.add(z),K.position.set(N,nt,It(nt)+.008),K.rotation.x=J,o.add(K)},ht=X-.085;Z(O-.075,ht,.13,.052),Z(O+.075,ht,.13,.052),Z(-wt+.085,X-.07,.11,.056),Z(wt-.085,X-.07,.11,.056);{let N=X-.165,nt=l(new Se(.25,.0625),a(new Pt({map:cu(),roughness:.15,metalness:.2,emissive:16777215,emissiveMap:cu(),emissiveIntensity:.15})));nt.position.set(O,N,It(N)+.004),nt.rotation.x=J;let W=X-.13,Q=l(new ie(.017,.017,.012,24).rotateX(Math.PI/2),x);Q.position.set(M+.24,W,It(W)+.006),Q.rotation.x=J;let K=l(new Rn(.018,.0022,6,24),_),A=l(new He(.012,20),a(new Pt({color:5900816,emissive:16719920,emissiveIntensity:.25,roughness:.3})));A.position.copy(Q.position).add(new I(0,.0013,.0066)),A.rotation.x=J,K.position.copy(Q.position).add(new I(0,0,.007)),K.rotation.x=J;let E=O+.16,U=wt-.16;if(U>E+.05){let mt=X-.092,ft=l(se(U-E,.042,.01,.004),g);ft.position.set((E+U)/2,mt,It(mt)+.004),ft.rotation.x=J}let z=X-.052,tt=l(se(wt*2-.2,.008,.006,.002),m);tt.position.set(0,z,It(z)+.004),tt.rotation.x=J;let j=X-.112,bt=(mt,ft,xt)=>{let st=Math.max(.05,ft-mt);l(new zt(st,.005,.005),this.ambientMat).position.set((mt+ft)/2,xt,It(xt)+.005);let Ct=l(new Se(st+.03,.045),this.ambientGlow);Ct.position.set((mt+ft)/2,xt,It(xt)+.008),Ct.rotation.x=J,Ct.renderOrder=6};bt(O+.16,wt-.02,X-.064),bt(-wt+.02,M-.21,X-.064)}{let N=C-.725,nt=D+.4,W=new fn;W.moveTo(H+.045,X-.21),W.lineTo(H+.075,X-.21),W.quadraticCurveTo(H+.2,X-.24,Math.max(H+.25,D-.56),N),W.lineTo(nt,N),W.lineTo(nt,C-1.02),W.lineTo(H+.045,C-1.02),W.lineTo(H+.045,X-.21),l(tl(W,.25,0,.012,10),u);let Q=l(se(.17,.006,Math.max(.1,nt-.38-(D-.56)),.003),x),K=Math.max(H+.25,D-.56);Q.position.set(0,N+.004,(K+D+.02)/2);let A=new de,E=new Mt(se(.052,.09,.1,.022),f);E.position.y=.045;let U=new Mt(se(.054,.012,.102,.005),_);U.position.y=.075;let z=new Mt(se(.085,.012,.14,.01),m);A.add(E,U,z),A.position.set(0,N+.006,D-.42),A.rotation.x=-.18,o.add(A),l(new ie(.032,.033,.026,32),[a(new Pt({map:xp(),metalness:.9,roughness:.3})),x,x]).position.set(0,N+.019,D-.26);for(let[mt,ft]of[[-.055,-.03],[.055,-.03],[-.055,.03],[.055,.03]])l(se(.03,.008,.022,.004),x).position.set(mt,N+.009,D-.26+ft);for(let mt of[-.045,.045])l(new He(.036,24).rotateX(-Math.PI/2),v).position.set(mt,N+.0075,D-.53);l(se(.2,.07,.34,.03),f).position.set(0,N+.05,D+.2),l(new zt(.002,.002,.3),y).position.set(0,N+.0855,D+.2)}{let N=H+.06,nt=D+.62,W=n.beltY-.46,Q=n.beltY-.03,K=12,A=8,E=a(new Pt({color:3158326,roughness:.72,bumpMap:h,bumpScale:.3,side:De}));for(let U of[-1,1]){let z=[],tt=[],j=[];for(let Vt=0;Vt<=K;Vt++){let ee=Tt(N,nt,Vt/K),ue=Math.max(W+.1,$(ee)-.03);for(let an=0;an<=A;an++){let hn=Tt(W,ue,an/A),Ye=an/A,yi=.012*Math.exp(-Math.pow((Ye-.45)/.12,2))-.006*Math.exp(-Math.pow((Ye-.75)/.1,2)),ho=Math.max(.3,B(ee,hn)-.035-yi);z.push(U*ho,hn,ee),tt.push(ee*4,hn*4)}}for(let Vt=0;Vt<K;Vt++)for(let ee=0;ee<A;ee++){let ue=Vt*(A+1)+ee,an=ue+1,hn=ue+A+1,Ye=hn+1;U>0?j.push(ue,an,hn,an,Ye,hn):j.push(ue,hn,an,an,hn,Ye)}let bt=new Kt;bt.setAttribute("position",new Ht(z,3)),bt.setAttribute("uv",new Ht(tt,2)),bt.setIndex(j),bt.computeVertexNormals(),l(bt,E);let mt=[];for(let Vt=0;Vt<=12;Vt++){let ee=Tt(N-.02,nt,Vt/12),ue=$(ee);mt.push(new I(U*(Math.max(.3,B(ee,ue-.02))-.03),ue-.018,ee))}l(new jn(new zn(mt),24,.022,10,!1),f);let ft=(N+nt)/2+.06,xt=n.beltY-.215,st=Math.max(.3,B(ft,xt)-.035);l(se(.012,.09,nt-N-.22,.006),p).position.set(U*(Math.max(.3,B(ft,xt+.075))-.042),xt+.075,ft-.04),l(se(.085,.055,.44,.022),f).position.set(U*(st-.04),xt,ft),l(se(.022,.03,.15,.008),m).position.set(U*(st-.022),xt+.075,ft-.12);let Et=n.beltY-.085,$t=N+.14,Yt=Math.max(.3,B($t,Et)-.036);if(l(se(.01,.04,.13,.004),x).position.set(U*Yt,Et,$t),l(se(.014,.018,.1,.006),_).position.set(U*(Yt-.008),Et,$t),U<0){let Vt=l(new Se(.1,.05),a(new Pt({map:yp(),roughness:.25})));Vt.rotation.x=-Math.PI/2,Vt.position.set(U*(st-.04),xt+.029,ft-.12)}let Lt=n.beltY-.37,at=N+.2,pt=Math.max(.3,B(at,Lt)-.04),Ut=l(new He(.075,32),a(new Pt({map:Qa(),roughness:.7,metalness:.4})));Ut.position.set(U*pt,Lt,at),Ut.rotation.y=-U*Math.PI/2;let Dt=l(new Rn(.076,.004,6,32),m);Dt.position.copy(Ut.position),Dt.rotation.y=-U*Math.PI/2;let Zt=[];for(let Vt=0;Vt<=10;Vt++){let ee=Tt(N-.01,nt-.05,Vt/10),ue=$(ee)-.06;Zt.push(new I(U*(Math.max(.3,B(ee,ue))-.042),ue,ee))}l(new jn(new zn(Zt),20,.0045,6,!1),m);{let Vt=N-.02,ee=$(Vt),ue=new fn,an=-U;ue.moveTo(0,0),ue.lineTo(.2*an,0),ue.lineTo(.02*an,.12),ue.lineTo(0,.1);let hn=new $r(ue),Ye=l(hn,x);Ye.position.set(U*(Math.max(.3,B(Vt,ee-.02))-.045),ee-.04,Vt),Ye.rotation.y=-U*Math.PI/2,Ye.material=x;let yi=l(new He(.022,20),a(new Pt({map:Qa(),roughness:.5,metalness:.5})));yi.position.copy(Ye.position).add(new I(-U*.002,.035,-.05)),yi.rotation.y=-U*Math.PI/2}let ye=[];for(let Vt=0;Vt<=8;Vt++){let ee=Tt(N+.03,nt-.1,Vt/8),ue=$(ee)-.105;ye.push(new I(U*(Math.max(.3,B(ee,ue))-.039),ue,ee))}l(new jn(new zn(ye),16,.003,5,!1),this.ambientMat);let ke=l(new jn(new zn(ye),16,.012,6,!1),this.ambientGlow);ke.renderOrder=6}}{let N=n.roofY-.03;for(let W of[M+.02,-M-.02]){let Q=l(se(.34,.02,.165,.009),a(new Pt({color:4079428,roughness:.95})));Q.position.set(W,N-.012,n.wsTopZ+.14),Q.rotation.x=.06,l(se(.03,.012,.02,.004),u).position.set(W+(W<0?.19:-.19),N-.004,n.wsTopZ+.08)}l(se(.2,.034,.13,.012),u).position.set(0,N-.01,n.wsTopZ+.13);for(let W of[-.05,.05])l(se(.04,.004,.03,.002),a(new Pt({color:12567496,roughness:.3}))).position.set(W,N-.028,n.wsTopZ+.14)}let it=a(new re({map:this.mirrorRT.texture}));{let N=Math.max(D-.58,n.wsTopZ+.07),nt=Math.min(C+.05,n.roofY-.11),W=.02,Q=new de;Q.position.set(W,nt,N),Q.rotation.y=-.3,Q.add(new Mt(se(.27,.075,.035,.03,3),x));let K=new fn,A=.125,E=.031,U=.026;K.moveTo(-A+U,-E),K.lineTo(A-U,-E),K.quadraticCurveTo(A,-E,A,-E+U),K.lineTo(A,E-U),K.quadraticCurveTo(A,E,A-U,E),K.lineTo(-A+U,E),K.quadraticCurveTo(-A,E,-A,E-U),K.lineTo(-A,-E+U),K.quadraticCurveTo(-A,-E,-A+U,-E);let z=new $r(K,8),tt=z.attributes.uv,j=z.attributes.position;for(let yt=0;yt<tt.count;yt++)tt.setXY(yt,1-(j.getX(yt)+A)/(2*A),(j.getY(yt)+E)/(2*E));let bt=new Mt(z,it);bt.position.z=.0185,Q.add(bt),o.add(Q);let mt=new I(W+.01,n.roofY-.03,N-.05),ft=new I(W,nt+.03,N-.01),xt=el(ft,mt,.009,.012,10);xt.material=u,o.add(xt),l(se(.05,.03,.06,.01),u).position.copy(mt)}{let N=su(i);for(let nt of[-1,1]){let W=new He(1,24).scale(N.rx*.86,N.ry*.8,1),Q=W.attributes.uv.array,K=nt<0?1:.38,A=nt<0?.62:0;for(let U=0;U<Q.length;U+=2)Q[U]=K+(A-K)*Q[U];l(W,it).position.set(nt*N.x,N.y,N.z+N.rz*.7+.004)}}{let N=i.z(s.t0)+.03,nt=i.top(s.t0)-i.lower+.03,W=i.z(s.t1)-.04,Q=s.roof-i.lower-.05,K=i.hw(s.t0)*(s.wBot??.86)*.86,A=i.hw(s.t1)*(s.wBot??.86)*(1-(s.tumble??.2))*.86,E=new Kt;E.setAttribute("position",new Ht([-K,nt,N,K,nt,N,-A,Q,W,A,Q,W],3)),E.setAttribute("uv",new Ht([0,0,1.6,0,.1,.9,1.5,.9],2)),E.setIndex([0,1,2,1,3,2]),this.dropMat=a(new re({map:this.dropTex,transparent:!0,opacity:0,depthWrite:!1,side:De}));let U=l(E,this.dropMat);U.renderOrder=5}{this.hudMat=a(new re({map:this.hudTex,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1,blending:Ke,toneMapped:!1}));let N=l(new Se(.21,.066),this.hudMat);N.position.set(M,C-.19,D-1.45),N.rotation.x=-.12,N.renderOrder=20}let Rt=new de;Rt.position.set(M,C-.34,D-.53),Rt.rotation.x=-.33;let et=new de;Rt.add(et);let lt=.182;{let N=new Mt(new ie(.03,.04,.3,16).rotateX(Math.PI/2),u);N.position.z=-.17,Rt.add(N);let nt=new Mt(se(.13,.1,.2,.035),u);nt.position.set(0,-.035,-.16),Rt.add(nt);for(let xt of[-1,1]){let st=el(new I(xt*.06,-.02,-.1),new I(xt*.17,-.045,-.085),.006,.005,8);st.material=x,Rt.add(st);let yt=new Mt(se(.03,.016,.016,.006),x);yt.position.set(xt*.175,-.046,-.085),Rt.add(yt)}let W=[],Q=96,K=-lt*.83;for(let xt=0;xt<Q;xt++){let st=xt/Q*Math.PI*2,yt=Math.cos(st)*lt,Ct=Math.sin(st)*lt;Ct<K&&(Ct=K+(Ct-K)*.12),W.push(new I(yt,Ct,0))}let A=new zn(W,!0),E=new jn(A,180,.0205,14,!0);E.scale(1,1,1.32);let U=a(new Pt({color:2302759,roughness:.58,bumpMap:so(au(),20,2),bumpScale:1}));et.add(new Mt(E,U));let z=e.maker==="KESSLER"?["#4fb3ff","#1b3fa0","#e0182d"]:[this.accent],tt=.028;z.forEach((xt,st)=>{let yt=Math.PI/2+(st-(z.length-1)/2)*tt,Ct=[];for(let Et=0;Et<=4;Et++){let $t=yt-tt/2+Et/4*tt;Ct.push(new I(Math.cos($t)*lt,Math.sin($t)*lt,0))}let Ft=new jn(new zn(Ct),4,.0212,14,!1);Ft.scale(1,1,1.32),et.add(new Mt(Ft,a(new Pt({color:new St(xt),roughness:.5}))))});let j=new Mt(new Rn(lt-.0196,6e-4,3,96),y);j.position.z=.012,et.add(j);for(let xt of[-1,1]){let st=lt-.065,yt=new Mt(se(st,.058,.024,.01),u);yt.position.set(xt*(.06+st/2),-.012,.004),et.add(yt);let Ct=new Mt(new Se(st*.82,.046),a(new Pt({map:vp(xt),roughness:.35,metalness:.2})));Ct.position.set(xt*(.06+st/2),-.012,.0165),et.add(Ct);let Ft=new Mt(se(st,.007,.026,.003),m);Ft.position.set(xt*(.06+st/2),-.044,.004),et.add(Ft);let Et=new Mt(se(.06,.1,.006,.003),g);Et.position.set(xt*(lt+.012),.03,-.042),Et.rotation.z=xt*.18,et.add(Et)}for(let xt of[-1,1]){let st=new Mt(se(.014,lt*.62,.016,.005),m);st.position.set(xt*.022,-.06-lt*.31,0),et.add(st)}let bt=new Mt(se(.135,.115,.05,.03,3),f);bt.position.set(0,-.004,.012),et.add(bt);let mt={KESSLER:["#1c69d4","#e8eaec"],KAZE:["#1d4fbf","#c9a34a"],STRADA:["#c9a34a","#111"],VELOCE:["#7cc42d","#111"],AETHER:["#c9a34a","#222"]},ft=new Mt(new He(.023,32),a(new Pt({map:_p(e.maker,mt[e.maker]||[this.accent,"#e8eaec"]),transparent:!0,roughness:.3,metalness:.4})));ft.position.set(0,.004,.0385),et.add(ft)}this.hands=[];for(let N of[-1,1]){let nt=N<0?Math.PI-.24:.24,W=new I(Math.cos(nt)*lt,Math.sin(nt)*lt,0),Q=new I(Math.cos(nt),Math.sin(nt),0),K=new I(-Math.sin(nt),Math.cos(nt),0),A=N>0?K.clone():K.clone().negate(),E=N>0?Q.clone():Q.clone().negate(),U=N>0?1:-1,z=new de;z.scale.setScalar(1.12),z.position.copy(W),z.quaternion.setFromRotationMatrix(new Qt().makeBasis(E,A,new I(0,0,1)));let tt=.0355;for(let pt=0;pt<4;pt++){let Ut=-.043+pt*.0195,Dt=[],Zt=-.45,ye=pt===3?2.45:2.7;for(let ee=0;ee<=10;ee++){let ue=Tt(Zt,ye,ee/10);Dt.push(new I(U*Math.cos(ue)*tt,Ut+ee/10*.003,-Math.sin(ue)*tt*1.2))}let ke=pt===3?.0084:.0097;z.add(new Mt(new jn(new zn(Dt),18,ke,8,!1),S));let Vt=new Mt(new We(ke,8,6),S);Vt.position.copy(Dt[Dt.length-1]),z.add(Vt)}let j=new I(U*.62,0,.78).normalize(),bt=new Mt(new We(1,18,12),S);bt.scale.set(.024,.05,.046),bt.position.copy(j.clone().multiplyScalar(.036)).add(new I(0,-.012,0)),bt.rotation.y=Math.atan2(-j.z,j.x),z.add(bt);let mt=new Mt(new ba(.0135,.06,4,10),b);mt.position.set(U*.034,-.014,-.004),z.add(mt);let ft=new I(U*.014,.03,.036),xt=new I(-U*.046,.022,.041),st=el(ft,xt,.0122,.0108,10);st.material=S,z.add(st);let yt=new Mt(new We(.0108,10,8),S);yt.position.copy(xt),z.add(yt);let Ct=new I(U*.32,-.42,.85).normalize(),Ft=bt.position.clone().add(Ct.clone().multiplyScalar(.03)),Et=bt.position.clone().add(Ct.clone().multiplyScalar(.105)),$t=el(Ft,Et,.032,.037,14);$t.material=b,z.add($t);let Yt=new Ue;Yt.position.copy(Et),z.add(Yt),et.add(z);let pe=new Mt(new ie(.038,.046,1,14),T),V=new Mt(new ie(.048,.052,1,14),T),Lt=new Mt(new We(.048,12,8),T),at=new Mt(new ie(.0395,.0395,.018,14),R);o.add(pe,V,Lt,at),this.hands.push({hand:z,wrist:Yt,fore:pe,upper:V,elbow:Lt,band:at,side:N})}o.add(Rt),this.wheelGroup=Rt,this.rotor=et,this.shoulders=[new I(M-.2,C-.26,D+.1),new I(M+.2,C-.26,D+.1)];{let N=f,nt=a(new Pt({color:2894897,roughness:.9,bumpMap:so(lu(),20),bumpScale:.6})),W=C-.92,Q=(tt,j,bt,mt,ft=!0)=>{let xt=new de,st=Math.max(.3,mt-.17-(W+.24)),yt=new Mt(se(bt,st,.13,.05),N);yt.position.set(0,W+.24+st/2,.02),yt.rotation.x=-.13;let Ct=new Mt(se(bt*.5,st*.8,.02,.008),nt);Ct.position.set(0,yt.position.y,-.045),Ct.rotation.x=-.13;let Ft=new Mt(se(bt*.52,.15,.1,.04),N);Ft.position.set(0,mt-.08,.06);let Et=new Mt(se(bt,.12,.5,.05),N);if(Et.position.set(0,W+.2,-.27),xt.add(yt,Ct,Ft,Et),ft)for(let $t of[-1,1]){let Yt=new Mt(se(.08,st*.75,.17,.035),N);Yt.position.set($t*(bt/2-.01),W+.24+st*.42,-.01),Yt.rotation.x=-.13,Yt.rotation.y=$t*.25,xt.add(Yt)}for(let $t of[-bt*.26,bt*.26]){let Yt=new Mt(new zt(.004,st*.75,.004),y);Yt.position.set($t,yt.position.y,-.058),Yt.rotation.x=-.13,xt.add(Yt)}return xt.position.set(tt,0,j),xt},K=Math.min(C+.12,n.roofY-.1);o.add(Q(-M,D+.22,.5,K));for(let tt of[-1,1])l(se(.08,.5,.25,.035),N).position.set(M+tt*.27,C-.55,D+.15);let A=D+.95,E=B(A,C-.4)>.5&&n.roofY-W>.95&&(e.seats??4)>2,U;if(E){let tt=Math.min(w*.85,B(A,C-.5)-.04),j=Math.min(C+.02,n.roofY-.12);for(let bt of[-1,1])o.add(Q(bt*tt*.5,A+.2,tt*.98,j,!1));U=A+.3}else{let tt=D+.55,j=Math.max(.6,(B(tt,C-.3)-.04)*2);l(se(j,Math.max(.3,n.beltY-W),.05,.02),u).position.set(0,(n.beltY+W)/2,tt),U=tt}let z=i.z(Math.min(1,s.t3+.02));if(z>U+.05){let j=[],bt=[];for(let ft=0;ft<=8;ft++){let xt=Tt(U,z,ft/8),st=vt(k(xt),0,1),yt=Math.min(i.top(st)-i.lower-.012,n.beltY+.06),Ct=Math.max(.2,B(xt,yt-.03)-.005);j.push(-Ct,yt,xt,Ct,yt,xt)}for(let ft=0;ft<8;ft++){let xt=ft*2;bt.push(xt,xt+2,xt+1,xt+1,xt+2,xt+3)}let mt=new Kt;mt.setAttribute("position",new Ht(j,3)),mt.setIndex(bt),mt.computeVertexNormals(),l(mt,a(new Pt({color:1381655,roughness:.95,side:De})))}}let L=(N,nt=new Set)=>{N.updateMatrixWorld(!0);let W=new Qt().copy(N.matrixWorld).invert(),Q=new Map,K=[];N.traverse(A=>{if(!A.isMesh||nt.has(A)||Array.isArray(A.material)||A.renderOrder!==0)return;let E=A.parent,U=!1;for(;E&&E!==N;)nt.has(E)&&(U=!0),E=E.parent;if(U)return;let z=A.geometry.index?A.geometry.toNonIndexed():A.geometry.clone();for(let tt of Object.keys(z.attributes))["position","normal","uv"].includes(tt)||z.deleteAttribute(tt);z.attributes.uv||z.setAttribute("uv",new Ht(new Float32Array(z.attributes.position.count*2),2)),z.attributes.normal||z.computeVertexNormals(),z.clearGroups(),z.applyMatrix4(new Qt().multiplyMatrices(W,A.matrixWorld)),Q.has(A.material)||Q.set(A.material,[]),Q.get(A.material).push(z),K.push(A)});for(let A of K)A.parent.remove(A),A.geometry.dispose();for(let[A,E]of Q){let U=jr(E,!1);for(let z of E)z.dispose();U&&N.add(new Mt(U,A))}};for(let N of this.hands)L(N.hand);L(et,new Set(this.hands.map(N=>N.hand))),L(Rt,new Set([et]));{o.updateMatrixWorld(!0);let N=new Set;Rt.traverse(Q=>N.add(Q));for(let Q of this.hands)for(let K of[Q.fore,Q.upper,Q.elbow,Q.band])N.add(K);let nt=new Map,W=[];o.traverse(Q=>{if(!Q.isMesh||N.has(Q)||this.shared.has(Q.geometry)||Array.isArray(Q.material)||Q.renderOrder!==0)return;let K=Q.geometry.index?Q.geometry.toNonIndexed():Q.geometry.clone();for(let A of Object.keys(K.attributes))["position","normal","uv"].includes(A)||K.deleteAttribute(A);K.attributes.uv||K.setAttribute("uv",new Ht(new Float32Array(K.attributes.position.count*2),2)),K.attributes.normal||K.computeVertexNormals(),K.clearGroups(),K.applyMatrix4(Q.matrixWorld),nt.has(Q.material)||nt.set(Q.material,[]),nt.get(Q.material).push(K),W.push(Q)});for(let Q of W)Q.parent.remove(Q),Q.geometry.dispose();for(let[Q,K]of nt){let A=jr(K,!1);for(let E of K)E.dispose();A&&l(A,Q)}}let Bt=new Set([this.ambientMat,this.ambientGlow,this.hudMat,this.dropMat,it,y]);o.traverse(N=>{if(!N.isMesh)return;N.castShadow=!1;let nt=Array.isArray(N.material)?N.material:[N.material];N.receiveShadow=!this.shared.has(N.geometry)&&!nt.some(W=>Bt.has(W)||W.map===this.gaugeTex||W.map===this.navTex)}),t.model.body.add(o),this.group=o,o.visible=this.visible,this.maxSpeed=Math.ceil(e.phys.topSpeed*1.08/20)*20}setVisible(t){this.visible=t,this.group&&(this.group.visible=t)}update(t,e,n){if(!this.group||!this.visible)return;let i=e.phys,s=vt(i.steerAngle*14+e.steer*.12,-7.8,7.8);this.rotor.rotation.z=-s,this._solveArms();let o=n.night??0;if(this.ambientMat.opacity=.18+o*.75,this.ambientGlow.opacity=.03+o*.22,this.hudMat.opacity=.55+o*.3,this.dropMat){let a=n.rain??0;this.dropMat.opacity=vt(a*1.2,0,1)*(.55+.45*(1-o)),this.dropMat.color.setScalar(Tt(1,.35,o));let l=i.speed;this.dropTex.offset.y-=t*(l>12?l*.012:-.02),this.dropTex.offset.x+=t*.004*Math.sin(this.dropT+=t)}this.odo+=i.speed*t/1e3,this.tripT+=t,this.gaugeT-=t,this.gaugeT<=0&&(this.gaugeT=1/30,this._drawGauges(i,n)),this.hudT-=t,this.hudT<=0&&(this.hudT=1/20,this._drawHud(i,n)),this.navT-=t,this.navT<=0&&(this.navT=.25,this._drawNav(e,n))}_solveArms(){let t=this.group;t.updateMatrixWorld(!0),this._inv.copy(t.matrixWorld).invert();let e=.3,n=.29;for(let i=0;i<2;i++){let s=this.hands[i],o=this.shoulders[i],a=s.wrist.getWorldPosition(this._tmp).applyMatrix4(this._inv).clone(),l=Math.min(e+n-.002,Math.max(.05,o.distanceTo(a))),c=a.clone().sub(o).normalize(),h=(e*e-n*n+l*l)/(2*l),u=Math.sqrt(Math.max(0,e*e-h*h)),d=new I(s.side*.55,-.82,.12);d.sub(c.clone().multiplyScalar(d.dot(c))).normalize();let f=o.clone().add(c.clone().multiplyScalar(h)).add(d.multiplyScalar(u)),p=(g,m,_)=>{let v=m.distanceTo(_);g.scale.set(1,v,1),g.position.copy(m).lerp(_,.5),g.quaternion.setFromUnitVectors(wp,this._tmp2.copy(_).sub(m).normalize())};p(s.fore,a,f),p(s.upper,f,o),s.elbow.position.copy(f);let x=a.clone().lerp(f,.06);s.band.position.copy(x),s.band.quaternion.copy(s.fore.quaternion)}}renderMirror(t,e,n){if(!this.group||!this.visible||(this.frame++,this.frame%2))return;let i=n.model.body;i.updateMatrixWorld(!0);let s=n.dims,o=this.mirrorCam,a=new I(0,s.roofY-.12,s.wsTopZ+.4).applyMatrix4(i.matrixWorld),l=new I(0,s.roofY-.5,s.wsTopZ+30).applyMatrix4(i.matrixWorld);o.position.copy(a),o.lookAt(l);let c=t.getRenderTarget();this.group.visible=!1;let h=n.model.meshes.interior,u=h?.visible;h&&(h.visible=!1),t.setRenderTarget(this.mirrorRT),t.render(e,o),t.setRenderTarget(c),this.group.visible=!0,h&&(h.visible=u)}_drawGauges(t,e){let n=this.gaugeCanvas.getContext("2d"),i=n.canvas.width,s=n.canvas.height,o=e.units,a=o==="kmh"?t.speed*cs:t.speed*In,l=this.def.phys.redline,c=Math.ceil((this.def.phys.limiter+500)/1e3)*1e3,h=vt(t.rpm/c,0,1),d=t.rpm>l*.97&&performance.now()%140<70,f=n.createLinearGradient(0,0,0,s);f.addColorStop(0,"#071a3a"),f.addColorStop(.55,"#0b2a63"),f.addColorStop(1,"#04102a"),n.fillStyle="#000",n.fillRect(0,0,i,s);let p=70,x=i-70,g=26,m=s-34,_=70,v=()=>{n.beginPath(),n.moveTo(p+_,g),n.lineTo(x-_,g),n.lineTo(x,(g+m)/2),n.lineTo(x-_,m),n.lineTo(p+_,m),n.lineTo(p,(g+m)/2),n.closePath()};v(),n.fillStyle=f,n.fill(),n.save(),v(),n.clip(),n.strokeStyle="rgba(80,140,255,0.08)",n.lineWidth=1;for(let D=g;D<m;D+=22)for(let k=p+D/22%2*19;k<x;k+=38){n.beginPath();for(let B=0;B<6;B++){let $=B/6*Math.PI*2;n.lineTo(k+Math.cos($)*12,D+Math.sin($)*12)}n.closePath(),n.stroke()}let y=40;for(let D=0;D<y;D++){let k=D/y,B=p+_+10+k*(x-p-2*_-20),$=k<h,G=k*c>=l;n.fillStyle=$?d?"#ffffff":G?"#ff2a3d":k>.7?"#ffb02e":"#5fd0ff":G?"rgba(255,42,61,0.22)":"rgba(120,170,255,0.16)",n.beginPath(),n.moveTo(B,g+8),n.lineTo(B+14,g+8),n.lineTo(B+11,g+30),n.lineTo(B-3,g+30),n.closePath(),n.fill()}n.fillStyle="rgba(210,225,255,0.75)",n.font='600 18px "Barlow Condensed", Arial, sans-serif',n.textAlign="center",n.textBaseline="middle";for(let D=0;D<=c/1e3;D++){let k=p+_+10+D*1e3/c*(x-p-2*_-20);n.fillText(String(D),k,g+46)}n.restore(),n.lineWidth=5,n.strokeStyle="#2f7dff",n.beginPath(),n.moveTo(i/2,g),n.lineTo(p+_,g),n.lineTo(p,(g+m)/2),n.lineTo(p+_,m),n.lineTo(i/2,m),n.stroke(),n.strokeStyle=d?"#ffffff":"#ff2a3d",n.beginPath(),n.moveTo(i/2,g),n.lineTo(x-_,g),n.lineTo(x,(g+m)/2),n.lineTo(x-_,m),n.lineTo(i/2,m),n.stroke(),n.textAlign="right",n.fillStyle="#f3f7ff",n.font='700 120px "Barlow Condensed", Arial, sans-serif',n.fillText(String(Math.round(a)),i/2+40,s/2+28),n.textAlign="left",n.fillStyle="#8fb6ff",n.font='600 26px "Barlow Condensed", Arial, sans-serif',n.fillText(o==="kmh"?"km/h":"mph",i/2+50,s/2+58);let S=x-_-70,b=s/2+22;n.strokeStyle="#ff2a3d",n.lineWidth=3,n.strokeRect(S-42,b-58,84,104),n.fillStyle="#ffffff",n.textAlign="center",n.font='700 92px "Barlow Condensed", Arial, sans-serif',n.fillText(t.gear===-1?"R":t.gear===0?"N":String(t.gear),S,b),n.fillStyle="#8fb6ff",n.font='600 20px "Barlow Condensed", Arial, sans-serif',n.fillText(e.manual?"MANUAL":"SPORT",S,b+62),n.textAlign="left";let T=p+_-10;n.fillStyle="#8fb6ff",n.font='600 20px "Barlow Condensed", Arial, sans-serif',n.fillText(t.isTurbo?"BOOST":"OIL",T,s/2-30),n.fillStyle="rgba(120,170,255,0.2)",n.fillRect(T,s/2-12,150,10),n.fillStyle=t.isTurbo?"#5fd0ff":"#7cff9a",n.fillRect(T,s/2-12,150*(t.isTurbo?vt(t.boost,0,1):.62),10),n.fillStyle="#8fb6ff",n.fillText("FUEL",T,s/2+26),n.fillStyle="rgba(120,170,255,0.2)",n.fillRect(T,s/2+44,150,10),n.fillStyle="#e9f0ff",n.fillRect(T,s/2+44,150*.71,10);let R=e.hours??12,w=Math.floor(R),M=Math.floor((R-w)*60);n.fillStyle="#cfdcff",n.font='600 22px "Barlow Condensed", Arial, sans-serif',n.textAlign="center",n.fillText(`${String(w).padStart(2,"0")}:${String(M).padStart(2,"0")}`,i/2-220,m-22);let C=o==="kmh"?this.odo:this.odo*.6214;n.fillText(`${Math.floor(C).toLocaleString()} ${o==="kmh"?"km":"mi"}`,i/2,m-22),n.fillText(`RANGE ${o==="kmh"?412:256}`,i/2+220,m-22),d&&(n.fillStyle="rgba(255,40,60,0.18)",v(),n.fill()),this.gaugeTex.needsUpdate=!0}_drawHud(t,e){let n=this.hudCanvas.getContext("2d"),i=n.canvas.width,s=n.canvas.height;n.clearRect(0,0,i,s);let o=e.units,a=o==="kmh"?t.speed*cs:t.speed*In,l=this.def.phys.redline;n.fillStyle="#d9f5ff",n.textAlign="right",n.textBaseline="middle",n.font='700 92px "Barlow Condensed", Arial, sans-serif',n.fillText(String(Math.round(a)),i/2+30,s/2+4),n.textAlign="left",n.font='600 26px "Barlow Condensed", Arial, sans-serif',n.fillStyle="#9fdcff",n.fillText(o==="kmh"?"km/h":"mph",i/2+40,s/2+26),n.font='700 46px "Barlow Condensed", Arial, sans-serif',n.fillStyle=t.rpm>l*.97?"#ff5a6a":"#d9f5ff",n.fillText(t.gear===-1?"R":String(t.gear),i/2+40,s/2-18);let c=vt(t.rpm/(this.def.phys.limiter+300),0,1);for(let h=0;h<14;h++){let u=h/14<c;n.fillStyle=u?h>10?"#ff5a6a":"#7fe3ff":"rgba(127,227,255,0.12)",n.fillRect(70+h*12,s/2-8,8,16)}this.hudTex.needsUpdate=!0}_drawNav(t,e){let n=this.navCanvas.getContext("2d"),i=n.canvas.width,s=n.canvas.height,o=Math.round(i*.64),a=n.createLinearGradient(0,0,0,s);a.addColorStop(0,"#0d1520"),a.addColorStop(1,"#070b11"),n.fillStyle=a,n.fillRect(0,0,i,s),n.save(),n.beginPath(),n.rect(0,40,o,s-40),n.clip(),n.strokeStyle="rgba(90,120,150,0.12)",n.lineWidth=2;for(let S=-10;S<20;S++)n.beginPath(),n.moveTo(S*60,40),n.lineTo(S*60+300,s),n.stroke(),n.beginPath(),n.moveTo(0,60+S*50),n.lineTo(o,20+S*50),n.stroke();let l=e.road,c=t.proj.s,h=l.sample(c,{}),u=Math.cos(h.H),d=Math.sin(h.H),f={},p=()=>{n.beginPath();for(let S=0;S<=34;S++){l.sample(c-120+S*25,f);let b=f.X-h.X,T=f.Y-h.Y,R=b*u-T*d,w=b*d+T*u,M=o/2+R*.5,C=s*.8-w*.5;S===0?n.moveTo(M,C):n.lineTo(M,C)}};n.lineCap="round",n.lineJoin="round",n.strokeStyle="#2c3a4c",n.lineWidth=44,p(),n.stroke(),n.strokeStyle="#3b8cff",n.lineWidth=12,p(),n.stroke(),n.fillStyle="#ffffff",n.beginPath(),n.moveTo(o/2,s*.8-22),n.lineTo(o/2+15,s*.8+14),n.lineTo(o/2,s*.8+5),n.lineTo(o/2-15,s*.8+14),n.fill(),n.restore(),n.fillStyle="#0f151d",n.fillRect(o,40,i-o,s-40),n.fillStyle="#e9edf1",n.textAlign="left",n.textBaseline="middle",n.font='700 44px "Barlow Condensed", Arial, sans-serif',n.fillText("\u2191  12 mi",o+26,104),n.font='500 24px "Barlow Condensed", Arial, sans-serif',n.fillStyle="#8b98a8",n.fillText("Continue on freeway",o+26,146),n.fillStyle="#18212c",n.fillRect(o+20,190,i-o-40,1),n.fillStyle="#e9edf1",n.font='600 26px "Barlow Condensed", Arial, sans-serif',n.fillText("NO HESI FM 104.7",o+26,236),n.fillStyle="#8b98a8",n.font='500 22px "Barlow Condensed", Arial, sans-serif',n.fillText("Night Drive Mix",o+26,268);let x=this.tripT%214/214;n.fillStyle="#26303c",n.fillRect(o+26,300,i-o-52,6),n.fillStyle="#3b8cff",n.fillRect(o+26,300,(i-o-52)*x,6),n.font="600 34px Arial, sans-serif",n.fillStyle="#d9dee4",n.textAlign="center";let g=o+(i-o)/2;n.fillText("\u23EE",g-80,370),n.fillText("\u23F8",g,370),n.fillText("\u23ED",g+80,370),n.fillStyle="#05080c",n.fillRect(0,0,i,40),n.fillStyle="#e9edf1",n.font='600 22px "Barlow Condensed", Arial, sans-serif',n.textAlign="left";let m=e.hours??12,_=Math.floor(m),v=Math.floor((m-_)*60);n.fillText(`${(_+11)%12+1}:${String(v).padStart(2,"0")} ${_<12?"AM":"PM"}`,18,21),n.textAlign="right",n.fillText("72\xB0F   LTE \u25AE\u25AE\u25AE",i-18,21),n.fillStyle="rgba(5,8,12,0.85)",n.fillRect(0,s-54,o,54),n.textAlign="center",n.font='600 22px "Barlow Condensed", Arial, sans-serif';let y=["NAV","MEDIA","PHONE","CAR","CLIMATE"];y.forEach((S,b)=>{n.fillStyle=b===0?"#3b8cff":"#aab4c0",n.fillText(S,(b+.5)*(o/y.length),s-26)}),this.navTex.needsUpdate=!0}};var Wy=`
attribute vec3 color;
attribute float size;
varying vec3 vColor;
uniform float scale;
void main(){
  vColor = color;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(size * scale / -mv.z, 0.0, 180.0);
}`,Xy=`
uniform sampler2D map;
varying vec3 vColor;
void main(){
  float a = texture2D(map, gl_PointCoord).a;
  gl_FragColor = vec4(vColor * a, a);
}`,il=class{constructor(t,e=900){this.max=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e);let n=new Kt;n.setAttribute("position",new oe(this.pos,3).setUsage(Cn)),n.setAttribute("color",new oe(this.col,3).setUsage(Cn)),n.setAttribute("size",new oe(this.size,1).setUsage(Cn)),this.mat=new ve({vertexShader:Wy,fragmentShader:Xy,uniforms:{map:{value:Ln(64,.05,2.2)},scale:{value:600}},transparent:!0,depthWrite:!1,blending:Ke}),this.points=new is(n,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=5,t.add(this.points),this.n=0}begin(){this.n=0}add(t,e,n,i,s,o,a){if(this.n>=this.max)return;let l=this.n++;this.pos[l*3]=t,this.pos[l*3+1]=e,this.pos[l*3+2]=n,this.col[l*3]=i,this.col[l*3+1]=s,this.col[l*3+2]=o,this.size[l]=a}end(t,e){let n=this.points.geometry;n.setDrawRange(0,this.n),n.attributes.position.needsUpdate=!0,n.attributes.color.needsUpdate=!0,n.attributes.size.needsUpdate=!0,this.mat.uniforms.scale.value=e/(2*Math.tan(t.fov*Math.PI/360))}},fs=class{constructor(t,e,{additive:n=!1,texture:i,sizeMul:s=1,depthBias:o=0}={}){this.max=e,this.p=[],this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e);let a=new Kt;a.setAttribute("position",new oe(this.pos,3).setUsage(Cn)),a.setAttribute("rgba",new oe(this.col,4).setUsage(Cn)),a.setAttribute("size",new oe(this.size,1).setUsage(Cn)),this.mat=new ve({vertexShader:`
        attribute vec4 rgba; attribute float size; varying vec4 vC; uniform float scale; uniform float depthBias;
        void main(){ vC = rgba; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = clamp(size * scale / -mv.z, 0.0, 400.0);
          // pull the sprite toward the camera by part of its size so the ground doesn't slice it with a hard edge
          mv.z = min(mv.z + size * depthBias, -0.05);
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        uniform sampler2D map; varying vec4 vC;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vC.a; if (a < 0.003) discard; gl_FragColor = vec4(vC.rgb, a);
          #include <colorspace_fragment>
        }`,uniforms:{map:{value:i||Ln(64,0,1.4)},scale:{value:600},depthBias:{value:o}},transparent:!0,depthWrite:!1,blending:n?Ke:Pi}),this.points=new is(a,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=4,t.add(this.points);for(let l=0;l<e;l++)this.p.push({life:0});this.next=0,this.sizeMul=s}emit(t,e,n,i,s,o,a,l,c,h,u,d,f,p=0,x=0){let g=this.p[this.next];this.next=(this.next+1)%this.max,Object.assign(g,{x:t,y:e,z:n,vx:i,vy:s,vz:o,life:a,max:a,size:l,grow:c,r:h,g:u,b:d,a:f,gravity:p,drag:x})}update(t,e,n){let i=0;for(let o of this.p){if(o.life<=0||(o.life-=t,o.life<=0))continue;o.vy-=o.gravity*t;let a=Math.max(0,1-o.drag*t);o.vx*=a,o.vy*=a,o.vz*=a,o.x+=o.vx*t,o.y+=o.vy*t,o.z+=o.vz*t,o.size+=o.grow*t;let l=o.life/o.max;this.pos[i*3]=o.x,this.pos[i*3+1]=o.y,this.pos[i*3+2]=o.z,this.col[i*4]=o.r,this.col[i*4+1]=o.g,this.col[i*4+2]=o.b,this.col[i*4+3]=o.a*Math.min(1,l*2.5),this.size[i]=o.size*this.sizeMul,i++}let s=this.points.geometry;s.setDrawRange(0,i),s.attributes.position.needsUpdate=!0,s.attributes.rgba.needsUpdate=!0,s.attributes.size.needsUpdate=!0,this.mat.uniforms.scale.value=n/(2*Math.tan(e.fov*Math.PI/360))}clear(){for(let t of this.p)t.life=0}},sl=class{constructor(t,e=5e3){let n=new Float32Array(e*2*3),i=new Float32Array(e*2*4);for(let o=0;o<e;o++){let a=Math.random()*60-30,l=Math.random()*30,c=Math.random()*70-35,h=.8+Math.random()*.4;for(let u=0;u<2;u++){let d=o*2+u;n[d*3]=a,n[d*3+1]=l,n[d*3+2]=c,i[d*4]=u,i[d*4+1]=h,i[d*4+2]=Math.random(),i[d*4+3]=0}}let s=new Kt;s.setAttribute("position",new oe(n,3)),s.setAttribute("seed",new oe(i,4)),this.mat=new ve({vertexShader:`
        attribute vec4 seed; uniform float time; uniform vec3 cam; uniform vec3 vel; uniform float amount;
        varying float vA;
        void main(){
          vec3 box = vec3(60.0, 30.0, 70.0);
          vec3 p = position;
          p.y -= time * 11.0 * seed.y;
          vec3 rel = mod(p - cam + box * 0.5, box) - box * 0.5;
          vec3 wp = cam + rel;
          // streak: tail end trails along relative wind (fall + car motion)
          vec3 wind = vec3(0.0, -11.0 * seed.y, 0.0) - vel;
          wp += seed.x * wind * 0.011;
          float dist = length(rel);
          vA = step(seed.z, amount) * (0.12 + 0.2 * seed.x) * smoothstep(1.5, 6.0, dist);
          gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
        }`,fragmentShader:`
        uniform vec3 color; varying float vA;
        void main(){ if (vA < 0.01) discard; gl_FragColor = vec4(color, vA);
          #include <colorspace_fragment>
        }`,uniforms:{time:{value:0},cam:{value:new I},vel:{value:new I},amount:{value:0},color:{value:new St(.75,.8,.88)}},transparent:!0,depthWrite:!1}),this.lines=new ma(s,this.mat),this.lines.frustumCulled=!1,this.lines.renderOrder=6,t.add(this.lines),this.t=0}update(t,e,n,i,s){this.t+=t;let o=this.mat.uniforms;o.time.value=this.t,o.cam.value.copy(e),o.vel.value.copy(n),o.amount.value=i,o.color.value.setScalar(.35+s*.5),this.lines.visible=i>.01}setCount(t){this.lines.geometry.setDrawRange(0,Math.floor(this.lines.geometry.attributes.position.count*t))}};var rl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Sn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Yy=new $s(-1,1,1,-1,0,1),hu=class extends Kt{constructor(){super(),this.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ht([0,2,0,0,2,0],2))}},qy=new hu,Wi=class{constructor(t){this._mesh=new Mt(qy,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Yy)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var ps=class extends Sn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ve?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ti.clone(t.uniforms),this.material=new ve({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Wi(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var ro=class extends Sn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},ol=class extends Sn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var al=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new ut);this._width=n.width,this._height=n.height,e=new ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ps(rl),this.copyPass.material.blending=Zn,this.clock=new Ca}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ro!==void 0&&(o instanceof ro?n=!0:o instanceof ol&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ll=class extends Sn{constructor(t,e,n=null,i=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new St}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}};var Ep={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var cl=class extends Sn{constructor(){super();let t=Ep;this.uniforms=ti.clone(t.uniforms),this.material=new Ea({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Wi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},he.getTransfer(this._outputColorSpace)===xe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Nh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Kr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Fh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Tp={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new St(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var pr=class r extends Sn{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new St(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ze(s,o,{type:bn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new ze(s,o,{type:bn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new ze(s,o,{type:bn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}let a=Tp;this.highPassUniforms=ti.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ve({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ut(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=rl;this.copyUniforms=ti.clone(h.uniforms),this.blendMaterial=new ve({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ke,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new St,this.oldClearAlpha=1,this.basic=new re,this.fsQuad=new Wi(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ut(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ve({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new ve({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};pr.BlurDirectionX=new ut(1,0);pr.BlurDirectionY=new ut(0,1);var Ap={uniforms:{tDiffuse:{value:null},strength:{value:0},center:{value:new ut(.5,.56)},fringe:{value:0},aspect:{value:1.7}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float strength; uniform vec2 center; uniform float fringe; uniform float aspect;
    varying vec2 vUv;
    void main(){
      vec2 dir = vUv - center;
      vec2 dA = dir * vec2(aspect, 1.0);
      float d = length(dA) / aspect * 1.6;
      float k = strength * smoothstep(0.18, 0.85, d);
      vec4 col;
      if (k > 0.0005) {
        vec4 acc = vec4(0.0);
        for (int i = 0; i < 9; i++) {
          float t = float(i) / 8.0;
          acc += texture2D(tDiffuse, vUv - dir * k * t);
        }
        col = acc / 9.0;
      } else {
        col = texture2D(tDiffuse, vUv);
      }
      if (fringe > 0.0) {
        float r = texture2D(tDiffuse, vUv + dir * fringe * d).r;
        float b = texture2D(tDiffuse, vUv - dir * fringe * d).b;
        col.r = mix(col.r, r, 0.6);
        col.b = mix(col.b, b, 0.6);
      }
      gl_FragColor = col;
    }`},$y={uniforms:{tDiffuse:{value:null},contrast:{value:1.08},saturation:{value:1.08},shadowTint:{value:new St(0,.012,.03)},highTint:{value:new St(.03,.012,-.012)},vignette:{value:.35},aspect:{value:1.7},grain:{value:.025},time:{value:0},sunPos:{value:new ut(-9,-9)},sunColor:{value:new St(1,.85,.6)},flare:{value:0}},vertexShader:Ap.vertexShader,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float contrast; uniform float saturation;
    uniform vec3 shadowTint; uniform vec3 highTint; uniform float vignette; uniform float aspect;
    uniform float grain; uniform float time; uniform vec2 sunPos; uniform vec3 sunColor; uniform float flare;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float lum(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      // S-curve contrast around mid grey
      c = clamp((c - 0.5) * contrast + 0.5, 0.0, 1.0);
      c = mix(c, c * c * (3.0 - 2.0 * c), (contrast - 1.0) * 1.5);
      float L = lum(c);
      // split toning: cool shadows, warm highlights
      c += shadowTint * (1.0 - smoothstep(0.0, 0.5, L)) + highTint * smoothstep(0.45, 1.0, L);
      c = mix(vec3(lum(c)), c, saturation);
      // sun flare: visibility from how bright the sky is right at the sun
      if (flare > 0.001) {
        vec2 sp = sunPos;
        float vis = 0.0;
        if (sp.x > -0.1 && sp.x < 1.1 && sp.y > -0.1 && sp.y < 1.1) {
          vec2 px = vec2(0.004 / aspect, 0.004);
          for (int i = 0; i < 5; i++) {
            float a = float(i) * 1.2566;
            vec3 s = texture2D(tDiffuse, clamp(sp + vec2(cos(a), sin(a)) * px * float(i > 0 ? 1 : 0), 0.001, 0.999)).rgb;
            vis += smoothstep(0.82, 0.97, lum(s));
          }
          vis /= 5.0;
        }
        float f = flare * vis;
        if (f > 0.001) {
          vec2 toC = vec2(0.5) - sp;
          vec2 uvA = (vUv - sp) * vec2(aspect, 1.0);
          float dist = length(uvA);
          // soft halo + anamorphic streak
          vec3 add = sunColor * (exp(-dist * 9.0) * 0.55 + exp(-abs(uvA.y) * 160.0) * exp(-abs(uvA.x) * 2.4) * 0.35);
          // ghosts along the line through the screen centre
          for (int i = 1; i <= 4; i++) {
            float t = float(i) * 0.42;
            vec2 gp = sp + toC * t * 2.0;
            float r = 0.025 + 0.02 * float(i);
            float gd = length((vUv - gp) * vec2(aspect, 1.0));
            vec3 tint = i == 1 ? vec3(0.6, 0.8, 1.0) : i == 2 ? vec3(1.0, 0.7, 0.4) : i == 3 ? vec3(0.5, 1.0, 0.7) : vec3(0.9, 0.6, 1.0);
            add += tint * sunColor * smoothstep(r, r * 0.6, gd) * 0.06 * (1.0 - smoothstep(0.0, 1.2, length(toC)) * 0.5);
          }
          // ring halo
          add += sunColor * vec3(0.8, 0.9, 1.0) * smoothstep(0.012, 0.0, abs(dist - 0.32)) * 0.05;
          c += add * f;
        }
      }
      // vignette
      vec2 dA = (vUv - 0.5) * vec2(aspect, 1.0);
      float v = 1.0 - smoothstep(0.45, 1.25, length(dA) / aspect * 1.9);
      c *= mix(1.0, v, vignette);
      // film grain (subtle, luminance weighted)
      float n = hash(vUv * 1000.0 + fract(time) * 37.0) - 0.5;
      c += n * grain * (1.0 - L * 0.6);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`},hl=class{constructor(t,e,n){this.renderer=t,this.scene=e,this.camera=n,this.enabled=!0,this.samples=4,this.bloomOn=!1,this._build()}_build(){let t=this.renderer.getDrawingBufferSize(new ut),e=new ze(t.x,t.y,{type:bn,samples:this.samples});this.composer=new al(this.renderer,e),this.renderPass=new ll(this.scene,this.camera),this.bloomPass=new pr(new ut(Math.max(2,t.x/2),Math.max(2,t.y/2)),.35,.55,.92),this.bloomPass.enabled=this.bloomOn,this.speedPass=new ps(Ap),this.outPass=new cl,this.gradePass=new ps($y),this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(this.speedPass),this.composer.addPass(this.outPass),this.composer.addPass(this.gradePass)}setScene(t,e){this.renderPass.scene=t,this.renderPass.camera=e}setSamples(t){t!==this.samples&&(this.samples=t,this.composer.dispose(),this._build())}setBloom(t){this.bloomOn=t,this.bloomPass.enabled=t}setSize(t,e,n){this.composer.setPixelRatio(n),this.composer.setSize(t,e),this.speedPass.uniforms.aspect.value=t/e,this.gradePass.uniforms.aspect.value=t/e}set(t,e,n){let i=this.speedPass.uniforms;i.strength.value=t*.075,i.fringe.value=n,this.gradePass.uniforms.vignette.value=e}look(t){let e=this.gradePass.uniforms,n=t.night,i=t.golden,s=t.wet;e.contrast.value=1.07+i*.04-s*.03,e.saturation.value=1.1+i*.08-n*.06-s*.12,e.shadowTint.value.setRGB(-.004-n*.004,.006+n*.004,.022+n*.03+s*.01),e.highTint.value.setRGB(.018+i*.05,.008+i*.016,-.01-i*.03+n*.02),e.grain.value=.018+n*.03,e.time.value=t.time,t.sunNdc&&t.sunNdc.z<1?(e.sunPos.value.set(t.sunNdc.x*.5+.5,t.sunNdc.y*.5+.5),e.flare.value=t.flare,e.sunColor.value.copy(t.sunColor)):e.flare.value=0,this.bloomOn&&(this.bloomPass.strength=.2+n*.32+s*.08,this.bloomPass.threshold=.95-n*.1,this.bloomPass.radius=.45+n*.15)}render(){this.composer.render()}};var Rp={boxer4:{pulses:4,amp:[1,.7,.95,.66],off:[0,.06,0,.06],ring:165,noise:.42,lp:3600,res:[[92,5,1.3],[255,4,.9],[760,3,.45],[1900,3,.15]],drive:1.7,jitter:.1},i4:{pulses:4,amp:[1,.93,.98,.9],off:[0,0,0,0],ring:245,noise:.34,lp:4600,res:[[128,5,1],[410,4,.85],[1250,3,.4],[2800,3,.15]],drive:1.9,jitter:.07},rotary:{pulses:4,amp:[1,.97,1,.97],off:[0,.01,0,.01],ring:390,noise:.62,lp:5600,res:[[170,4,1],[590,4,1],[1750,3,.55],[3600,3,.2]],drive:2.6,jitter:.2},i6:{pulses:6,amp:[1,.95,.98,.96,.99,.94],off:[0,0,0,0,0,0],ring:300,noise:.26,lp:5400,res:[[148,5,1],[510,4,.9],[1500,3,.5],[3200,3,.15]],drive:1.8,jitter:.05},flat6:{pulses:6,amp:[1,.84,.97,.82,.99,.86],off:[0,.02,0,.02,0,.02],ring:335,noise:.42,lp:6e3,res:[[160,5,1],[560,4,1.05],[1700,3,.65],[3400,3,.25]],drive:2.1,jitter:.06},v8:{pulses:8,amp:[1,.66,.92,.95,.6,.97,.7,.98],off:[0,.015,0,.01,.02,0,.01,0],ring:125,noise:.3,lp:3800,res:[[82,6,1.3],[235,4,.95],[680,3,.45],[1700,3,.15]],drive:1.7,jitter:.08},v8cross:{pulses:8,amp:[1,.52,.9,.96,.48,.98,.6,1],off:[0,.03,0,.02,.035,0,.02,0],ring:98,noise:.32,lp:3e3,res:[[68,6,1.5],[196,4,.95],[600,3,.4],[1500,3,.12]],drive:1.9,jitter:.1},v8flat:{pulses:8,amp:[1,.94,.98,.93,1,.95,.97,.94],off:[0,0,0,0,0,0,0,0],ring:285,noise:.35,lp:6200,res:[[140,5,1],[470,4,1],[1450,3,.65],[3300,3,.25]],drive:2.3,jitter:.05},v10:{pulses:10,amp:[1,.88,.97,.87,1,.91,.96,.88,.99,.9],off:[0,.01,0,.012,0,.01,0,.012,0,.01],ring:365,noise:.32,lp:7200,res:[[172,5,1],[620,4,1.1],[1950,3,.7],[4e3,3,.28]],drive:2.3,jitter:.05}},mr=class{constructor(t,e,n,i){let s=2*Math.PI*e/i,o=Math.cos(s),a=Math.sin(s),l=a/(2*n),c,h,u,d,f,p;t==="lp"?(c=(1-o)/2,h=1-o,u=(1-o)/2,d=1+l,f=-2*o,p=1-l):t==="hp"?(c=(1+o)/2,h=-(1+o),u=(1+o)/2,d=1+l,f=-2*o,p=1-l):(c=l,h=0,u=-l,d=1+l,f=-2*o,p=1-l),this.b0=c/d,this.b1=h/d,this.b2=u/d,this.a1=f/d,this.a2=p/d,this.x1=this.x2=this.y1=this.y2=0}run(t){let e=this.b0*t+this.b1*this.x1+this.b2*this.x2-this.a1*this.y1-this.a2*this.y2;return this.x2=this.x1,this.x1=t,this.y2=this.y1,this.y1=e,e}};function Zy(r,t,e,n=1,i={}){let s=120/t,o=Math.max(6,Math.round(.75/s)),a=Math.round(o*s*r),l=a/o,c=a*3,h=new Float32Array(c),u=Xe(n),d=e.pulses,f=(e.jitter??.06)*(i.rough??1),p=new Float32Array(o*d),x=new Float32Array(o*d),g=new Float32Array(o*d),m=new Int32Array(o*d);for(let X=0;X<o*d;X++)p[X]=1+(u()-.5)*2*f,x[X]=(u()-.5)*.012*(i.rough??1),g[X]=u()*.6,m[X]=Math.floor(u()*4e3);let _=s/d,v=Math.max(.0012,_*.42),y=v*.45,S=Math.min(Math.floor(v*6*r),Math.floor(l*1.5)),b=2*Math.PI*e.ring*(i.ringMul??1)/r,T=e.noise*(i.noiseMul??1),R=new Float32Array(4096);for(let X=0;X<R.length;X++)R[X]=u()*2-1;for(let X=0;X<o*3;X++){let gt=X%o;for(let _t=0;_t<d;_t++){let wt=gt*d+_t,It=(X+(_t+(e.off?.[_t]??0))/d+x[wt])*l,J=Math.floor(It),dt=e.amp[_t]*p[wt],F=g[wt],O=m[wt];for(let Z=0;Z<S;Z++){let ht=J+Z;if(ht<0||ht>=c)continue;let it=Z/r,et=Math.exp(-it/v)*Math.sin(b*Z+F),lt=Z<r*.0012?(1-Z/(r*.0012))*.9:0,L=R[O+Z&4095]*Math.exp(-it/y)*T;h[ht]+=dt*(et+lt+L)}}}let w=new mr("hp",28,.7,r),M=e.res.map(([X,gt,_t])=>({f:new mr("bp",X*(i.resMul??1),gt,r),g:_t})),C=new mr("lp",e.lp*(i.lpMul??1),.75,r),D=new mr("lp",e.lp*1.6*(i.lpMul??1),.6,r),k=e.drive*(i.driveMul??1),B=Math.tanh(k);for(let X=0;X<c;X++){let gt=w.run(h[X]),_t=gt*.45;for(let wt of M)_t+=wt.f.run(gt)*wt.g*2.2;_t=D.run(C.run(_t)),h[X]=Math.tanh(_t*k)/B}let $=h.slice(a,a*2),G=0;for(let X=0;X<$.length;X++)G+=$[X]*$[X];let H=.22/(Math.sqrt(G/$.length)||1);for(let X=0;X<$.length;X++)$[X]=Math.max(-1,Math.min(1,$[X]*H));return $}function Cp(r,t,e,n={}){let i=Rp[t.type]||Rp.i4;return[e*.2,e*.48,e*.8].map((o,a)=>{let l=Zy(r.sampleRate,o,i,11+a*7,n),c=r.createBuffer(1,l.length,r.sampleRate);return c.copyToChannel(l,0),{rpm:o,buffer:c}})}function ul(r,t=2,e="white"){let n=Math.floor(r.sampleRate*t),i=r.createBuffer(1,n,r.sampleRate),s=i.getChannelData(0),o=0,a=0,l=0,c=0;for(let h=0;h<n;h++){let u=Math.random()*2-1;e==="brown"?(o=(o+.02*u)/1.02,s[h]=o*3.5):e==="pink"?(a=.99765*a+u*.099046,l=.963*l+u*.2965164,c=.57*c+u*1.0526913,s[h]=(a+l+c+u*.1848)*.2):s[h]=u}return i}var uu=r=>440*Math.pow(2,(r-69)/12),du=[[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],[[50,53,57],[46,50,53],[48,52,55],[45,49,52]],[[52,55,59],[48,52,55],[55,59,62],[50,54,57]]],dl=class{constructor(t,e){this.ctx=t,this.out=t.createGain(),this.out.gain.value=.9,this.out.connect(e),this.tempo=100,this.playing=!1,this.verb=t.createConvolver();let n=t.sampleRate*2.2,i=t.createBuffer(2,n,t.sampleRate);for(let a=0;a<2;a++){let l=i.getChannelData(a);for(let c=0;c<n;c++)l[c]=(Math.random()*2-1)*Math.pow(1-c/n,3)}this.verb.buffer=i,this.verbGain=t.createGain(),this.verbGain.gain.value=.35,this.verb.connect(this.verbGain).connect(this.out),this.delay=t.createDelay(1),this.delay.delayTime.value=60/this.tempo*.75,this.fb=t.createGain(),this.fb.gain.value=.32,this.delay.connect(this.fb).connect(this.delay),this.delayOut=t.createGain(),this.delayOut.gain.value=.35,this.delay.connect(this.delayOut).connect(this.out);let s=t.sampleRate;this.noise=t.createBuffer(1,s,s);let o=this.noise.getChannelData(0);for(let a=0;a<s;a++)o[a]=Math.random()*2-1;this.prog=du[0]}start(){this.playing||(this.playing=!0,this.step=0,this.prog=du[Math.floor(Math.random()*du.length)],this.next=this.ctx.currentTime+.15,this.timer=setInterval(()=>this._schedule(),25),this.out.gain.cancelScheduledValues(this.ctx.currentTime),this.out.gain.setTargetAtTime(.9,this.ctx.currentTime,.4))}stop(){this.playing&&(this.playing=!1,clearInterval(this.timer),this.out.gain.setTargetAtTime(0,this.ctx.currentTime,.15))}_schedule(){let t=60/this.tempo/4;for(;this.next<this.ctx.currentTime+.15;)this._play(this.step,this.next),this.next+=t,this.step++}_play(t,e){let n=t%16,i=Math.floor(t/16)%4,s=Math.floor(t/64)%4,o=this.prog[i],a=60/this.tempo/4;if(n%4===0&&this._kick(e),(n===4||n===12)&&this._snare(e),n%2===0&&s>0&&this._hat(e,n%4===2?.07:.035,n%4===2?.09:.03),n%2===0&&this._bass(uu(o[0]-24+(n%8===6?12:0)),e,a*1.7),s!==0||i>1){let c=o[[0,1,2,1,0,2,1,2][n%8]]+12+(n>=8?12:0);this._pluck(uu(c),e,a*.9)}if(n===0)for(let l of o)this._pad(uu(l),e,a*16)}_kick(t){let e=this.ctx,n=e.createOscillator(),i=e.createGain();n.frequency.setValueAtTime(150,t),n.frequency.exponentialRampToValueAtTime(42,t+.12),i.gain.setValueAtTime(.9,t),i.gain.exponentialRampToValueAtTime(.001,t+.32),n.connect(i).connect(this.out),n.start(t),n.stop(t+.35)}_snare(t){let e=this.ctx,n=e.createBufferSource();n.buffer=this.noise;let i=e.createBiquadFilter();i.type="bandpass",i.frequency.value=1900,i.Q.value=.8;let s=e.createGain();s.gain.setValueAtTime(.45,t),s.gain.exponentialRampToValueAtTime(.001,t+.2),n.connect(i).connect(s),s.connect(this.out),s.connect(this.verb),n.start(t,Math.random()*.5,.25);let o=e.createOscillator();o.type="triangle",o.frequency.setValueAtTime(200,t),o.frequency.exponentialRampToValueAtTime(120,t+.08);let a=e.createGain();a.gain.setValueAtTime(.3,t),a.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(a).connect(this.out),o.start(t),o.stop(t+.12)}_hat(t,e,n){let i=this.ctx,s=i.createBufferSource();s.buffer=this.noise;let o=i.createBiquadFilter();o.type="highpass",o.frequency.value=7500;let a=i.createGain();a.gain.setValueAtTime(e,t),a.gain.exponentialRampToValueAtTime(.001,t+n),s.connect(o).connect(a).connect(this.out),s.start(t,Math.random()*.5,n+.02)}_bass(t,e,n){let i=this.ctx,s=i.createOscillator();s.type="sawtooth",s.frequency.value=t;let o=i.createBiquadFilter();o.type="lowpass",o.Q.value=4,o.frequency.setValueAtTime(900,e),o.frequency.exponentialRampToValueAtTime(180,e+n);let a=i.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(.22,e+.01),a.gain.exponentialRampToValueAtTime(.001,e+n),s.connect(o).connect(a).connect(this.out),s.start(e),s.stop(e+n+.02)}_pluck(t,e,n){let i=this.ctx,s=i.createOscillator();s.type="square",s.frequency.value=t;let o=i.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(3200,e),o.frequency.exponentialRampToValueAtTime(500,e+n);let a=i.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(.05,e+.005),a.gain.exponentialRampToValueAtTime(.001,e+n),s.connect(o).connect(a),a.connect(this.out),a.connect(this.delay),s.start(e),s.stop(e+n+.02)}_pad(t,e,n){let i=this.ctx,s=i.createGain();s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.035,e+.6),s.gain.setValueAtTime(.035,e+n-.4),s.gain.exponentialRampToValueAtTime(1e-4,e+n+.3);let o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=1400,o.connect(s),s.connect(this.out),s.connect(this.verb);for(let a of[-9,0,8]){let l=i.createOscillator();l.type="sawtooth",l.frequency.value=t,l.detune.value=a,l.connect(o),l.start(e),l.stop(e+n+.35)}}};var fl=class{constructor(){this.ctx=null,this.ready=!1,this.vol={master:.8,engine:.9,sfx:.8,music:.5},this.interior=!1,this.musicOn=!1,this.engineGainMul=1,this.muted=!1}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let e=this.ctx=new t({latencyHint:"interactive"});this.master=e.createGain(),this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-14,this.comp.knee.value=10,this.comp.ratio.value=4,this.comp.attack.value=.004,this.comp.release.value=.2,this.master.connect(this.comp).connect(e.destination),this.engineBus=e.createGain(),this.sfxBus=e.createGain(),this.envBus=e.createGain(),this.musicBus=e.createGain(),this.engineBus.connect(this.master),this.sfxBus.connect(this.master),this.envBus.connect(this.master),this.musicBus.connect(this.master),this.white=ul(e,2,"white"),this.pink=ul(e,3,"pink"),this.brown=ul(e,3,"brown"),this.engTone=e.createBiquadFilter(),this.engTone.type="lowpass",this.engTone.Q.value=.6,this.engLow=e.createBiquadFilter(),this.engLow.type="lowshelf",this.engLow.frequency.value=180,this.engMix=e.createGain(),this.engMix.connect(this.engTone).connect(this.engLow).connect(this.engineBus),this.loops=[],this.intake=this._noiseLoop(this.pink,"bandpass",900,.8,this.engMix),this.turboOsc=e.createOscillator(),this.turboOsc.type="sine",this.turboGain=e.createGain(),this.turboGain.gain.value=0,this.turboOsc.connect(this.turboGain).connect(this.engineBus),this.turboOsc.start(),this.turboHiss=this._noiseLoop(this.white,"bandpass",4e3,4,this.engineBus),this.scOsc=e.createOscillator(),this.scOsc.type="sawtooth",this.scF=e.createBiquadFilter(),this.scF.type="bandpass",this.scF.Q.value=6,this.scGain=e.createGain(),this.scGain.gain.value=0,this.scOsc.connect(this.scF).connect(this.scGain).connect(this.engineBus),this.scOsc.start(),this.squealA=this._noiseLoop(this.white,"bandpass",900,14,this.sfxBus),this.squealB=this._noiseLoop(this.white,"bandpass",1350,12,this.sfxBus),this.wind=this._noiseLoop(this.pink,"bandpass",600,.5,this.envBus),this.road=this._noiseLoop(this.brown,"lowpass",380,.7,this.envBus),this.hiss=this._noiseLoop(this.white,"highpass",3500,.7,this.envBus),this.rain=this._noiseLoop(this.pink,"highpass",1500,.5,this.envBus),this.scrape=this._noiseLoop(this.white,"bandpass",2600,3,this.sfxBus),this.music=new dl(e,this.musicBus),this.applyVolumes(),this.ready=!0,this.state={rpm:1e3,load:0,speed:0}}_noiseLoop(t,e,n,i,s){let o=this.ctx.createBufferSource();o.buffer=t,o.loop=!0,o.loopStart=Math.random()*.5;let a=this.ctx.createBiquadFilter();a.type=e,a.frequency.value=n,a.Q.value=i;let l=this.ctx.createGain();return l.gain.value=0,o.connect(a).connect(l).connect(s),o.start(0,Math.random()*1.5),{src:o,f:a,g:l}}applyVolumes(){if(!this.ctx)return;let t=this.vol,e=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:t.master,e,.05),this.engineBus.gain.setTargetAtTime(t.engine*.95,e,.05),this.sfxBus.gain.setTargetAtTime(t.sfx,e,.05),this.envBus.gain.setTargetAtTime(t.sfx*.9,e,.05),this.musicBus.gain.setTargetAtTime(t.music*.55,e,.05)}setMusic(t){this.musicOn=t,this.ctx&&(t?this.music.start():this.music.stop())}setMuted(t){this.muted=t,this.applyVolumes()}suspend(t){this.ctx&&(t?this.ctx.suspend():this.ctx.resume())}setCar(t,e){if(!this.ctx){this._pendingCar=[t,e];return}for(let o of this.loops){try{o.src.stop()}catch{}o.src.disconnect(),o.g.disconnect()}this.loops=[];let n=e?.exhaust||"stock",i={lpMul:n==="straight"?1.45:n==="sport"?1.2:1,driveMul:n==="straight"?1.35:n==="sport"?1.15:1,noiseMul:n==="straight"?1.3:1,rough:n==="straight"?1.4:1},s=Cp(this.ctx,t.engine,t.phys.redline,i);for(let o of s){let a=this.ctx.createBufferSource();a.buffer=o.buffer,a.loop=!0;let l=this.ctx.createGain();l.gain.value=0,a.connect(l).connect(this.engMix),a.start(0,Math.random()*o.buffer.duration),this.loops.push({src:a,g:l,rpm:o.rpm})}this.car=t,this.exhaust=n,this.engLow.gain.value=t.engine.type.startsWith("v8")?4:2}update(t,e){if(!this.ready||this.ctx.state!=="running")return;this._pendingCar&&(this.setCar(...this._pendingCar),this._pendingCar=null);let n=this.ctx.currentTime,i=.03,s=this.state;s.rpm=Tt(s.rpm,e.rpm,Math.min(1,t*30)),s.load=Tt(s.load,e.load,Math.min(1,t*(e.load>s.load?10:6)));let o=e.active?1:0,a=e.interior,l=this.loops;if(l.length===3){let v=s.rpm,y=[0,0,0];if(v<=l[0].rpm)y[0]=1;else if(v<=l[1].rpm){let T=(v-l[0].rpm)/(l[1].rpm-l[0].rpm);y[0]=Math.cos(T*Math.PI/2),y[1]=Math.sin(T*Math.PI/2)}else if(v<=l[2].rpm){let T=(v-l[1].rpm)/(l[2].rpm-l[1].rpm);y[1]=Math.cos(T*Math.PI/2),y[2]=Math.sin(T*Math.PI/2)}else y[2]=1;let S=Tt(.42,1,s.load),b=e.limiter?.55:1;for(let T=0;T<3;T++)l[T].src.playbackRate.setTargetAtTime(vt(v/l[T].rpm,.25,3.5),n,.015),l[T].g.gain.setTargetAtTime(y[T]*S*b*o*.55,n,i)}let c=s.rpm/(e.redline||7e3),h=Tt(900,7500,Math.pow(s.load,.8)*.75+c*.25)*(this.exhaust==="straight"?1.3:1);this.engTone.frequency.setTargetAtTime(a?h*.4:h,n,i),this.intake.f.frequency.setTargetAtTime(500+c*1600,n,i),this.intake.g.gain.setTargetAtTime(o*s.load*c*.12,n,i);let u=this.car?.engine.turbo?e.boost:0;this.turboOsc.frequency.setTargetAtTime(1800+u*5200*(.6+c*.4),n,.05),this.turboGain.gain.setTargetAtTime(o*u*u*.035*(a?.6:1),n,.05),this.turboHiss.f.frequency.setTargetAtTime(2500+u*4e3,n,.05),this.turboHiss.g.gain.setTargetAtTime(o*u*u*.06,n,.05);let d=this.car?.engine.sc?1:0,f=s.rpm/60*7.5;this.scOsc.frequency.setTargetAtTime(f,n,.02),this.scF.frequency.setTargetAtTime(f,n,.02),this.scGain.gain.setTargetAtTime(o*d*(.012+s.load*.05)*c,n,.03);let p=ae(.08,.7,e.skid)*o,x=Math.sin(n*7.3)*40+Math.sin(n*3.1)*60;this.squealA.f.frequency.setTargetAtTime(820+e.skid*220+x,n,.03),this.squealB.f.frequency.setTargetAtTime(1260+e.skid*300-x,n,.03),this.squealA.g.gain.setTargetAtTime(p*.22*(e.wet?.35:1),n,.04),this.squealB.g.gain.setTargetAtTime(p*.14*(e.wet?.35:1),n,.04);let g=e.speed,m=Math.pow(vt(g/85,0,1.4),2)*o;this.wind.f.frequency.setTargetAtTime(380+g*14,n,.1),this.wind.g.gain.setTargetAtTime(m*(a?.09:.2),n,.1);let _=vt(g/60,0,1.3)*o;this.road.f.frequency.setTargetAtTime(160+g*4,n,.1),this.road.g.gain.setTargetAtTime(_*(a?.36:.24)*(e.concrete?1.25:1),n,.1),this.hiss.g.gain.setTargetAtTime(_*(.012+(e.wetRoad||0)*.14),n,.1),this.rain.f.frequency.setTargetAtTime(a?900:1600,n,.2),this.rain.g.gain.setTargetAtTime((e.rain||0)*(a?.16:.1),n,.3),this.scrape.g.gain.setTargetAtTime(vt(e.scrape||0,0,1)*.35,n,.02)}_env(t,e,n,i,s){t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(i,e+n),t.gain.exponentialRampToValueAtTime(1e-4,e+n+s)}_burst(t,e,n,i,s,o,a,l,c=0,h=0){let u=this.ctx,d=u.currentTime+h,f=u.createBufferSource();f.buffer=t;let p=u.createBiquadFilter();p.type=e,p.Q.value=s,p.frequency.setValueAtTime(n,d),p.frequency.exponentialRampToValueAtTime(Math.max(20,i),d+o);let x=u.createGain();this._env(x,d,.004,a,o);let g=x;if(c&&u.createStereoPanner){let m=u.createStereoPanner();m.pan.value=vt(c,-1,1),x.connect(m),g=m}f.connect(p).connect(x),g.connect(l),f.start(d,Math.random()*1,o+.05)}_tone(t,e,n,i,s,o,a=0,l=0){let c=this.ctx,h=c.currentTime+a,u=c.createOscillator();u.type=t,u.frequency.setValueAtTime(e,h),u.frequency.exponentialRampToValueAtTime(Math.max(20,n),h+i);let d=c.createGain();this._env(d,h,.003,s,i);let f=d;if(l&&c.createStereoPanner){let p=c.createStereoPanner();p.pan.value=vt(l,-1,1),d.connect(p),f=p}u.connect(d),f.connect(o),u.start(h),u.stop(h+i+.05)}pop(t=1){if(!this.ready)return;let e=this.exhaust==="straight"?1.4:this.exhaust==="sport"?1.15:.85,n=t*e;this._burst(this.white,"bandpass",900+Math.random()*900,400,1.2,.05+Math.random()*.04,.5*n,this.engineBus),this._tone("sine",110+Math.random()*40,45,.08,.6*n,this.engineBus)}blowOff(t,e){if(!this.ready||t<.35)return;let i=this.ctx.currentTime;if(e)for(let s=0;s<6;s++)this._burst(this.white,"bandpass",1800-s*120,900,2,.035,.18*t*(1-s*.12),this.engineBus,0,s*.045);else this._burst(this.white,"bandpass",3200,800,1.4,.42,.28*t,this.engineBus)}shift(t){this.ready&&(this._burst(this.white,"bandpass",2400,1600,3,.03,.12,this.sfxBus),this._tone("triangle",t?140:110,70,.06,.15,this.sfxBus))}bump(t){this.ready&&(this._tone("sine",85,40,.12,vt(t*14,.05,.4),this.envBus),this._tone("sine",85,40,.1,vt(t*10,.04,.3),this.envBus,.09))}whoosh(t,e,n){if(!this.ready)return;let i=vt(.5-n*.006,.18,.45);this._burst(this.pink,"bandpass",1500,380,.8,i,vt(e,0,1)*.55,this.sfxBus,t*.75)}horn(t,e){if(!this.ready)return;let n=.55+Math.random()*.4;for(let i of[415,523]){let s=this.ctx,o=s.currentTime,a=s.createOscillator();a.type="square",a.frequency.value=i*(.97+Math.random()*.06);let l=s.createBiquadFilter();l.type="lowpass",l.frequency.value=1800;let c=s.createGain();c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(.08*e,o+.02),c.gain.setValueAtTime(.08*e,o+n),c.gain.exponentialRampToValueAtTime(1e-4,o+n+.08);let h=s.createStereoPanner?s.createStereoPanner():null;a.connect(l).connect(c),h?(h.pan.value=vt(t,-1,1),c.connect(h).connect(this.sfxBus)):c.connect(this.sfxBus),a.start(o),a.stop(o+n+.1)}}crash(t){if(!this.ready)return;let e=vt(t,.2,1.5);this._tone("sine",120,35,.35,.9*e,this.sfxBus),this._burst(this.white,"bandpass",1200,300,.9,.5,.7*e,this.sfxBus),this._burst(this.brown,"lowpass",600,120,.7,.6,.8*e,this.sfxBus);for(let n of[1150,1720,2480,3300])this._tone("triangle",n,n*.94,.5+Math.random()*.4,.06*e,this.sfxBus,Math.random()*.03);if(e>.7)for(let n=0;n<7;n++)this._tone("sine",3500+Math.random()*3e3,3e3,.08,.04,this.sfxBus,.05+Math.random()*.35)}chime(t){if(!this.ready)return;let e=660*Math.pow(2,vt(t,0,12)/12);this._tone("sine",e,e,.28,.12,this.sfxBus),this._tone("triangle",e*1.5,e*1.5,.22,.05,this.sfxBus,.06)}bigChime(){if(this.ready)for(let[t,e]of[523,659,784,1047].entries())this._tone("triangle",e,e,.32,.08,this.sfxBus,t*.07)}click(){this.ready&&this._tone("triangle",1400,900,.04,.06,this.sfxBus)}fail(){this.ready&&this._tone("sawtooth",300,110,.6,.08,this.sfxBus)}};var fu={KeyW:"throttle",ArrowUp:"throttle",KeyS:"brake",ArrowDown:"brake",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",Space:"handbrake",KeyC:"camera",KeyR:"reset",Escape:"pause",KeyP:"pause",ShiftLeft:"gearUp",ShiftRight:"gearUp",KeyE:"gearUp",ControlLeft:"gearDown",ControlRight:"gearDown",KeyQ:"gearDown",KeyB:"lookBack",KeyH:"hud",KeyM:"music",KeyF:"fullscreen"},Ky=new Set(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ControlLeft","ControlRight"]),pl=class{constructor(){this.held=new Set,this.queue=[],this.enabled=!0,this.pad=null,this.padPrev=[],this.padActive=!1,this.lastPadUse=0,window.addEventListener("keydown",t=>{let e=fu[t.code];t.target&&(t.target.tagName==="INPUT"||t.target.tagName==="SELECT"||t.target.tagName==="TEXTAREA")&&t.code!=="Escape"||(e&&this.captureKeys&&(Ky.has(t.code)||t.ctrlKey)&&t.preventDefault(),e&&(this.padActive=!1,t.repeat||this.queue.push(e),this.held.add(e)))},{passive:!1}),window.addEventListener("keyup",t=>{let e=fu[t.code];if(e&&this.held.delete(e),e)for(let[n,i]of Object.entries(fu))i===e&&n!==t.code&&this._down?.has(n)&&this.held.add(e)}),this._down=new Set,window.addEventListener("keydown",t=>this._down.add(t.code)),window.addEventListener("keyup",t=>this._down.delete(t.code)),window.addEventListener("blur",()=>{this.held.clear(),this._down.clear()}),window.addEventListener("gamepadconnected",t=>{this.padName=t.gamepad.id}),this.captureKeys=!1}take(t){let e=this.queue.indexOf(t);return e>=0?(this.queue.splice(e,1),!0):!1}flush(){this.queue.length=0}isHeld(t){return this.held.has(t)||this.padHeld&&this.padHeld.has(t)}poll(){let t=[];try{t=navigator.getGamepads?navigator.getGamepads()||[]:[]}catch{t=[]}let e=null;for(let l of t)if(l&&l.connected){e=l;break}if(this.pad=e,this.padHeld=new Set,!e)return;let n=e.buttons.map(l=>l.pressed),i=l=>n[l]&&!this.padPrev[l],s={0:"handbrake",1:"lookBack",2:"reset",3:"camera",4:"gearDown",5:"gearUp",9:"pause",8:"hud"};for(let[l,c]of Object.entries(s))n[l]&&this.padHeld.add(c),i(+l)&&(this.queue.push(c),this.padActive=!0);i(12)&&this.queue.push("navUp"),i(13)&&this.queue.push("navDown"),i(14)&&this.queue.push("navLeft"),i(15)&&this.queue.push("navRight"),i(0)&&this.queue.push("confirm"),i(1)&&this.queue.push("back");let o=e.axes[0]||0,a=e.axes[1]||0;Math.abs(a)>.6&&!this._stickY&&(this.queue.push(a<0?"navUp":"navDown"),this._stickY=!0),Math.abs(a)<.3&&(this._stickY=!1),(Math.abs(o)>.2||(e.buttons[7]?.value??0)>.1||(e.buttons[6]?.value??0)>.1)&&(this.padActive=!0),this.padPrev=n}controls(){let t={throttle:this.held.has("throttle")?1:0,brake:this.held.has("brake")?1:0,steer:(this.held.has("right")?1:0)-(this.held.has("left")?1:0),handbrake:this.held.has("handbrake"),analog:!1},e=this.pad;if(e&&this.padActive){let n=e.axes[0]||0,i=.07;n=Math.abs(n)<i?0:Math.sign(n)*(Math.abs(n)-i)/(1-i),n=Math.sign(n)*Math.pow(Math.abs(n),1.6);let s=e.buttons[7]?.value??0,o=e.buttons[6]?.value??0;return{throttle:Math.max(t.throttle,s),brake:Math.max(t.brake,o),steer:t.steer!==0?t.steer:vt(n,-1,1),analog:t.steer===0,handbrake:t.handbrake||this.padHeld.has("handbrake")}}return t}};var Pp="nohesi.save.v1",Jy={quality:"high",autoQuality:!0,motionBlur:!0,shake:1,fov:62,cockpitFov:68,units:"mph",transmission:"auto",tc:!0,assist:!0,steerSpeed:1,steerSens:1,master:.8,engine:.9,sfx:.8,music:.5,musicOn:!1,showHud:!0,unlockAll:!1,camera:"chase",plate:"NO HESI"};function pu(){return{v:1,career:0,best:{endless:0,timeattack:0},selectedCar:"kaze",customs:{},challenges:{},settings:{...Jy},stats:{distance:0,nearMisses:0,runs:0,topSpeed:0,crashes:0},last:{mode:"endless",env:"la",time:"default",weather:"clear",density:"normal"}}}var Ip=null;function Lp(){let r=pu();try{let t=window.localStorage.getItem(Pp);if(t){let e=JSON.parse(t);return{...r,...e,best:{...r.best,...e.best||{}},settings:{...r.settings,...e.settings||{}},stats:{...r.stats,...e.stats||{}},last:{...r.last,...e.last||{}},customs:e.customs||{},challenges:e.challenges||{}}}}catch{}return Ip||r}function Dp(r){Ip=r;try{window.localStorage.setItem(Pp,JSON.stringify(r))}catch{}}var Qy={xclose:{label:"EXTREMELY CLOSE",base:300,mult:.5,combo:7},close:{label:"CLOSE PASS",base:100,mult:.25,combo:7},hsover:{label:"HIGH-SPEED OVERTAKE",base:75,mult:.1,combo:3.5},over:{label:"OVERTAKE",base:25,mult:.05,combo:2.5}},ml=class{constructor(){this.events=[],this.sounds=[],this.reset()}reset(){this.score=0,this.mult=1,this.combo=0,this.comboMax=7,this.chain=0,this.nearMisses=0,this.closePasses=0,this.xclose=0,this.splits=0,this.overtakes=0,this.distance=0,this.topSpeed=0,this.time=0,this.streak=0,this.streakAwarded=0,this.slowT=0,this.speedPts=0,this.recentPasses=[],this.dense=1}update(t,e){let n=e.speed*In;this.time+=t,n>this.topSpeed&&(this.topSpeed=n);let i=0;for(let o of e.cars)Math.abs(o.s-e.ps)<55&&Math.abs(o.d-e.pd)<8&&i++;this.dense=1+Math.min(.5,Math.max(0,i-1)*.07);let s=this.time;for(let o of e.cars){if(o.hit)continue;let a=o.s-e.ps,l=o.len/2+e.pl+1.2,c=Math.abs(e.pd-o.d)-(o.wid/2+e.pw);if(Math.abs(a)<l){if(o.ov||(o.ov=!0,o.minGap=c,o.startAhead=a>0,o.side=Math.sign(o.d-e.pd)||1),c<o.minGap&&(o.minGap=c),!o.whoosh&&a<0&&o.startAhead&&c<3.2){o.whoosh=!0;let h=e.speed-o.speed;h>6&&this.sounds.push({type:"whoosh",side:o.side,intensity:vt((3.2-c)/3,.15,1)*vt(h/35,.3,1),rel:h})}}else o.ov&&(o.ov=!1,o.startAhead&&a<0&&!o.scored&&!o.crashed&&(o.scored=!0,this.recentPasses.push({t:s,side:o.side,gap:o.minGap}),e.scoring&&n>50&&this._pass(o,n)))}for(;this.recentPasses.length&&s-this.recentPasses[0].t>.6;)this.recentPasses.shift();if(e.scoring){if(n>80){let o=(n-80)*.8*t*this.mult;this.score+=o,this.speedPts+=o}if(n>120){this.streak+=t;let o=Math.floor(this.streak/10);if(o>this.streakAwarded){this.streakAwarded=o;let a=Math.round(200*o*this.mult);this.score+=a,this.mult=Math.min(10,this.mult+.2),this.combo=Math.max(this.combo,4),this.events.push({text:`SPEED STREAK ${o*10}s`,pts:a,kind:"streak"}),this.sounds.push({type:"big"})}}else this.streak=0,this.streakAwarded=0;this.combo>0?this.combo-=t:this.mult>1&&(this.mult=Math.max(1,this.mult-t*.6),this.chain&&(this.chain=0)),n<40&&this.time>3?(this.slowT+=t,this.slowT>4&&this.mult>1&&(this.mult=1,this.chain=0,this.combo=0,this.events.push({text:"TOO SLOW",pts:0,kind:"bad"}))):this.slowT=0}}_pass(t,e){let n=t.minGap,i=null;if(n<.5?i="xclose":n<1.2?i="close":n<4&&(i=e>=130?"hsover":"over"),!i)return;let s=Qy[i],o=vt(e/100,.5,2.5),a=i==="xclose"||i==="close"?this.dense:1,l=Math.round(s.base*o*a*this.mult);if(this.score+=l,this.mult=Math.min(10,this.mult+s.mult),this.combo=Math.max(this.combo,s.combo),this.comboMax=7,i==="xclose"||i==="close"?(this.closePasses++,i==="xclose"&&this.xclose++,this.nearMisses++,this.chain++):(this.overtakes++,n<2&&this.nearMisses++),this.events.push({text:s.label,pts:l,kind:i,dense:a>1.15?a:0,gap:n}),this.sounds.push({type:"chime",level:Math.min(12,(this.mult-1)*2)+(i==="xclose"?4:0)}),n<1.6){let c=this.recentPasses.find(h=>h.side!==t.side&&h.gap<1.6&&!h.used);if(c){c.used=!0,this.splits++;let h=Math.round(400*o*this.mult);this.score+=h,this.mult=Math.min(10,this.mult+.5),this.combo=7,this.events.push({text:"THREAD THE NEEDLE",pts:h,kind:"split"}),this.sounds.push({type:"big"})}}if((i==="xclose"||i==="close")&&this.chain>0&&this.chain%5===0){let c=Math.round(this.chain*60*o*this.mult);this.score+=c,this.events.push({text:`${this.chain}x CHAIN`,pts:c,kind:"chain"}),this.sounds.push({type:"big"})}}contact(){(this.mult>1||this.chain>0)&&this.events.push({text:"CONTACT",pts:0,kind:"bad"}),this.mult=1,this.chain=0,this.combo=0}addDistance(t){t>0&&(this.distance+=t)}summary(){return{score:Math.floor(this.score),nearMisses:this.nearMisses,closePasses:this.closePasses,xclose:this.xclose,splits:this.splits,overtakes:this.overtakes,distance:this.distance,topSpeed:this.topSpeed,time:this.time,maxMult:this.mult}}};var Up=(r,t,e,n)=>t*e-r*n,Fp={};function Op(r,t,e,n,i,s,o,a,l=[0,0]){let[c,h]=r.pointVelocity(t,e),u=c-l[0],d=h-l[1],f=u*n+d*i;if(f>=0)return{j:0,vn:0,vt:0};let p=Up(t,e,n,i),x=-(1+s)*f/(1/r.m+p*p/r.Iz+a);r.applyImpulse(x*n,x*i,t,e);let g=-i,m=n,_=u*g+d*m,v=Up(t,e,g,m),y=-_/(1/r.m+v*v/r.Iz+a);return y=vt(y,-o*x,o*x),r.applyImpulse(y*g,y*m,t,e),{j:x,jt:y,vn:-f,vt:Math.abs(_),tx:g,ty:m}}function Hp(r,t,e){let n=r.phys,i=r.corners(),s=e.wallD-.32,o=.32,a=null;for(let[u,d]of i){let f=t.project(u,d,r.proj.s,Fp),p=Math.cos(f.H),x=Math.sin(f.H),g=0,m=0,_=0;f.d>s?(g=f.d-s,m=-p,_=x):f.d<o&&(g=o-f.d,m=p,_=-x),g>0&&(!a||g>a.pen)&&(a={pen:g,nx:m,ny:_,cx:u,cy:d})}if(!a)return null;n.X+=a.nx*a.pen,n.Y+=a.ny*a.pen;let l=a.cx-n.X,c=a.cy-n.Y;return{severity:Op(n,l,c,a.nx,a.ny,.12,.45,0).vn,scrape:n.speed>2?vt(n.speed/30,0,1):0,point:[a.cx,a.cy],normal:[a.nx,a.ny]}}function Np(r,t,e,n,i){let s=Math.sin(e),o=Math.cos(e),a=Math.cos(e),l=-Math.sin(e);return{X:r,Y:t,fx:s,fy:o,rx:a,ry:l,hw:n,hl:i,corners:[[1,1],[1,-1],[-1,-1],[-1,1]].map(([c,h])=>[r+s*i*c+a*n*h,t+o*i*c+l*n*h])}}function kp(r,t,e){let n=r.X*t+r.Y*e,i=r.hl*Math.abs(r.fx*t+r.fy*e)+r.hw*Math.abs(r.rx*t+r.ry*e);return[n-i,n+i]}function Bp(r,t,e){let n=t-r.X,i=e-r.Y;return Math.abs(n*r.fx+i*r.fy)<=r.hl&&Math.abs(n*r.rx+i*r.ry)<=r.hw}function zp(r,t,e){let n=r.phys,i=[],s=r.proj.s,o=r.proj.d,a=Np(n.X,n.Y,n.heading,r.halfW,r.halfL);for(let l of t.cars){if(Math.abs(l.s-s)>l.len/2+r.halfL+2||Math.abs(l.d-o)>l.wid/2+r.halfW+1.5)continue;let c=e.pos(l.s,l.d,Fp),h=c.H+l.yaw,u=Np(c.X,c.Y,h,l.wid/2,l.len/2),d=1/0,f=0,p=0,x=!1;for(let[S,b]of[[a.fx,a.fy],[a.rx,a.ry],[u.fx,u.fy],[u.rx,u.ry]]){let[T,R]=kp(a,S,b),[w,M]=kp(u,S,b),C=Math.min(R,M)-Math.max(T,w);if(C<=0){x=!0;break}if(C<d){d=C;let D=(a.X-u.X)*S+(a.Y-u.Y)*b;f=D>=0?S:-S,p=D>=0?b:-b}}if(x)continue;let g=0,m=0,_=0;for(let S of a.corners)Bp(u,S[0],S[1])&&(g+=S[0],m+=S[1],_++);for(let S of u.corners)Bp(a,S[0],S[1])&&(g+=S[0],m+=S[1],_++);_?(g/=_,m/=_):(g=(a.X+u.X)/2,m=(a.Y+u.Y)/2),n.X+=f*d*.95,n.Y+=p*d*.95;let v=[Math.sin(c.H)*l.speed+Math.cos(c.H)*l.vd,Math.cos(c.H)*l.speed-Math.sin(c.H)*l.vd],y=Op(n,g-n.X,m-n.Y,f,p,.22,.3,1/l.mass,v);if(y.j>0){let S=-(y.j*f)/l.mass,b=-(y.j*p)/l.mass,T=S*Math.sin(c.H)+b*Math.cos(c.H),R=S*Math.cos(c.H)-b*Math.sin(c.H);t.impact(l,T,R)}i.push({car:l,severity:y.vn,point:[g,m]})}return i}var gl=class{constructor(){this.targetLane=2,this.timer=0,this.cruise=92*hs}reset(t,e=92){this.targetLane=t,this.timer=1,this.cruise=e*hs}_gapAhead(t,e,n,i,s){let o=e.laneCenter(n),a=1e9,l=0;for(let c of t.cars){if(Math.abs(c.d-o)>2.3)continue;let h=c.s-c.len/2-i-2.4;h>-1&&h<a&&(a=h,l=c.speed)}return{gap:a,v:l}}_sideClear(t,e,n,i,s){let o=e.laneCenter(n);for(let a of t.cars){if(Math.abs(a.d-o)>2.6)continue;let l=a.s-i;if(l>-9&&l<9+Math.max(0,s-a.speed)*1.2)return!1}return!0}update(t,e,n,i,s){let o=e.phys,a=e.proj.s,l=e.proj.d,c=s.laneOf(l);if(this.timer-=t,this.timer<=0){this.timer=.35;let R=this._gapAhead(n,s,this.targetLane,a,l),w=o.speed*2.6+25;if(R.gap<w&&Math.abs(l-s.laneCenter(this.targetLane))<1.2){let M=this.targetLane,C=R.gap;for(let D of Math.random()<.5?[-1,1]:[1,-1]){let k=c+D;if(k<0||k>=s.n)continue;let B=this._gapAhead(n,s,k,a,l).gap;B>C+15&&this._sideClear(n,s,k,a,o.speed)&&(M=k,C=B)}this.targetLane=M}}let h=Math.max(14,o.speed*.95),u=i.pos(a+h,s.laneCenter(this.targetLane),{}),d=u.X-o.X,f=u.Y-o.Y,p=Math.sin(o.heading),x=Math.cos(o.heading),g=d*p+f*x,m=d*x-f*p,_=2*m/Math.max(1,g*g+m*m),v=Math.atan(_*o.L),y=vt(v/Math.max(.002,o.steerLimit()),-1,1),S=this._gapAhead(n,s,this.targetLane,a,l);for(let R of n.cars){if(Math.abs(R.d-l)>R.wid/2+1.25)continue;let w=R.s-R.len/2-a-2.4;w>-1&&w<S.gap&&(S.gap=w,S.v=R.speed)}let b=this.cruise;S.gap<o.speed*1.6+10&&(b=Math.min(b,S.v-1+(S.gap-10)*.35));let T=b-o.u;return{throttle:vt(T*.35,0,1),brake:vt(-T*.25-.1,0,1),steer:y,analog:!0,handbrake:!1}}};var xl=class extends Jn{constructor(){super();let t=new zt;t.deleteAttribute("uv");let e=new Pt({side:we}),n=new Pt,i=new Aa(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let s=new Mt(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new Mt(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new Mt(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let l=new Mt(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let c=new Mt(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let h=new Mt(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let u=new Mt(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let d=new Mt(t,gr(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let f=new Mt(t,gr(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let p=new Mt(t,gr(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);let x=new Mt(t,gr(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);let g=new Mt(t,gr(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);let m=new Mt(t,gr(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function gr(r){let t=new re;return t.color.setScalar(r),t}var vl=class{constructor(t){this.renderer=t,this.scene=new Jn,this.scene.background=new St(460810),this.camera=new Be(32,1,.1,200);let e=new Ni(t);this.env=e.fromScene(new xl,.04).texture,this.scene.environment=this.env,this.scene.environmentIntensity=.38,this.scene.fog=new Zs(460810,14,34);let n=document.createElement("canvas");n.width=n.height=512;let i=n.getContext("2d"),s=i.createRadialGradient(256,256,20,256,256,256);s.addColorStop(0,"#2a2d32"),s.addColorStop(.5,"#15171a"),s.addColorStop(1,"#07080a"),i.fillStyle=s,i.fillRect(0,0,512,512),i.strokeStyle="rgba(255,255,255,0.05)";for(let f=0;f<=512;f+=32)i.beginPath(),i.moveTo(f,0),i.lineTo(f,512),i.stroke(),i.beginPath(),i.moveTo(0,f),i.lineTo(512,f),i.stroke();let o=new Mn(n);o.colorSpace=Ce;let a=new Mt(new He(30,64),new Pt({map:o,roughness:.9,metalness:0,envMapIntensity:.08}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.scene.add(a),this.table=new de;let l=new Mt(new ie(3.6,3.7,.08,64),new Pt({color:1711136,roughness:.3,metalness:.6}));l.position.y=.04,l.receiveShadow=!0,this.table.add(l);let c=new Mt(new Rn(3.62,.015,8,128),new re({color:16723533,toneMapped:!1}));c.rotation.x=Math.PI/2,c.position.y=.085,this.table.add(c),this.scene.add(this.table);let h=new ls(16777215,200,40,.5,.6,1.2);h.position.set(4,9,5),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),h.shadow.bias=-3e-4,this.scene.add(h,h.target);let u=new ls(10470655,140,40,.6,.7,1.2);u.position.set(-6,5,-6),this.scene.add(u,u.target);let d=new js(12568790,1052688,.6);this.scene.add(d);for(let f=-2;f<=2;f++){let p=new Mt(new zt(.15,.05,9),new re({color:16777215,toneMapped:!1}));p.position.set(f*1.6,7,0),this.scene.add(p)}this.car=null,this.angle=.6,this.spin=.18,this.dragging=!1,this.zoom=1,this.pitch=.17}show(t,e,n){this.car&&(this.table.remove(this.car.root),Xa(this.car)),this.car=Wa(t,e,n),this.car.root.position.y=.08,this.car.mats.head.emissiveIntensity=1.2,this.car.mats.tail.emissiveIntensity=1.4,this.table.add(this.car.root),this.def=t,this.dist=Math.max(10.8,t.body.L*2.3)}setAspect(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}drag(t,e){this.angle+=t*.008,this.pitch=Math.max(.02,Math.min(.6,this.pitch+e*.003)),this.spin=0,clearTimeout(this._resume),this._resume=setTimeout(()=>this.spin=.18,2500)}update(t,e=0,n=1){this.angle+=this.spin*t,this.table.rotation.y=this.angle;let i=this.dist*this.zoom*n,s=this.camera,o=Math.cos(.9)*i,a=Math.sin(.9)*i;if(s.position.set(o*Math.cos(this.pitch),.8+Math.sin(this.pitch)*i,a*Math.cos(this.pitch)),s.lookAt(0,.55,0),s.setViewOffset(1e3,1e3,e*1e3,0,1e3,1e3),this.car)for(let l of this.car.wheels)l.spin.rotation.x=0}render(t){t.render(this.scene,this.camera)}};var xr={la:{id:"la",name:"Los Angeles Freeway",short:"LA FREEWAY",desc:"Five-lane concrete freeway, sound walls, palm trees and a hazy downtown skyline.",seed:101,lanes:5,outerShoulder:3,road:{straightMin:220,straightMax:700,radiusMin:950,radiusMax:2300,curveMin:160,curveMax:460,gradeMax:.03},surface:"concrete",roadColor:12170926,median:"jersey",outer:"wall",wallColor:13352098,wallHeight:3.4,elevated:0,terrain:{near:9076056,far:7301704,hill:26,flat:40},lights:{spacing:54,style:"double",color:16762250},props:{palms:.75,trees:.35,bushes:.7,cacti:0,rocks:.05,buildings:.55,buildingKinds:["low","warehouse","mid","low","mid","tower"],billboards:.12},gantry:[650,1150],overpass:[700,1500],signs:[["Los Angeles","10","W"],["Santa Monica","10","W"],["Downtown LA","110","N"],["Pasadena","110","N"],["Long Beach","710","S"],["LAX Airport","405","S"],["Hollywood","101","N"],["Sherman Oaks","405","N"],["Venice Blvd","",""],["Exit 14B","",""]],skyline:{density:.55,height:.85,arc:[.15,.45]},mountains:{height:1,color:8023933},sky:{turbidity:4.5,rayleigh:2.6},fogScale:.95,clouds:.4,defaultTime:18.55},urban:{id:"urban",name:"Modern Urban Highway",short:"URBAN",desc:"Elevated four-lane expressway threading glass towers and concrete parapets.",seed:202,lanes:4,outerShoulder:2.4,road:{straightMin:160,straightMax:520,radiusMin:800,radiusMax:1800,curveMin:140,curveMax:400,gradeMax:.025},surface:"asphalt",roadColor:9079436,median:"jersey",outer:"parapet",wallColor:11842736,wallHeight:1.2,elevated:9,terrain:{near:6053728,far:5724764,hill:0,flat:0},lights:{spacing:46,style:"double",color:15331839},props:{palms:.05,trees:.35,bushes:.2,cacti:0,rocks:0,buildings:1,buildingKinds:["tower","mid","tall","tower","mid","tall","glass"],billboards:.15},gantry:[500,900],overpass:[900,1700],signs:[["City Center","5","N"],["Harbor Dr","",""],["Financial District","",""],["Airport","405","S"],["Stadium Way","",""],["Riverside","60","E"],["Exit 3A","",""]],skyline:{density:1,height:1.3,arc:[0,1]},mountains:{height:.4,color:7239300},sky:{turbidity:4,rayleigh:1.6},fogScale:.9,clouds:.5,defaultTime:11.5},desert:{id:"desert",name:"Desert Highway",short:"DESERT",desc:"Long sweeping interstate across open desert, mesas and endless horizon.",seed:303,lanes:4,outerShoulder:3.2,road:{straightMin:600,straightMax:1600,radiusMin:1600,radiusMax:3500,curveMin:200,curveMax:600,gradeMax:.022},surface:"asphalt",roadColor:7171439,median:"jersey",outer:"guardrail",wallColor:12761254,wallHeight:.8,elevated:0,terrain:{near:13081194,far:12094044,hill:14,flat:70},lights:{spacing:0,style:"single",color:16767400},props:{palms:.02,trees:0,bushes:.9,cacti:.9,rocks:.8,buildings:.02,buildingKinds:["low","warehouse"],billboards:.06},gantry:[1200,2200],overpass:[2200,4e3],signs:[["Las Vegas","15","N"],["Barstow","15","S"],["Needles","40","E"],["Phoenix","10","E"],["Rest Area 2 Mi","",""],["Gas Food Lodging","",""],["Kingman","40","E"]],skyline:{density:0,height:0,arc:[0,0]},mountains:{height:1.6,color:10121052},sky:{turbidity:2.4,rayleigh:2},fogScale:1.4,clouds:.15,defaultTime:15.5},night:{id:"night",name:"Night City Highway",short:"NIGHT CITY",desc:"Sodium-lit five-lane highway through a neon downtown that never sleeps.",seed:404,lanes:5,outerShoulder:2.8,road:{straightMin:200,straightMax:650,radiusMin:850,radiusMax:2e3,curveMin:150,curveMax:420,gradeMax:.028},surface:"asphalt",roadColor:8158336,median:"jersey",outer:"wall",wallColor:10196364,wallHeight:2.2,elevated:0,terrain:{near:5197896,far:4605759,hill:6,flat:30},lights:{spacing:40,style:"double",color:16755021},props:{palms:.25,trees:.25,bushes:.4,cacti:0,rocks:0,buildings:1,buildingKinds:["tower","tall","mid","glass","tower","mid"],billboards:.45},gantry:[550,950],overpass:[800,1500],signs:[["Downtown","110","N"],["Port District","710","S"],["Neon Ave","",""],["Uptown","101","N"],["Sunset Blvd","",""],["Exit 22","",""],["Arts District","",""]],skyline:{density:1,height:1.2,arc:[0,1]},mountains:{height:.5,color:3948370},sky:{turbidity:6,rayleigh:2.5},fogScale:.75,clouds:.45,defaultTime:23}},Vp=["la","urban","desert","night"],oo=[{id:"default",name:"Default"},{id:"dawn",name:"Dawn",h:6.35},{id:"morning",name:"Morning",h:9},{id:"noon",name:"Noon",h:13},{id:"golden",name:"Golden Hour",h:18.25},{id:"dusk",name:"Dusk",h:19.05},{id:"night",name:"Night",h:23},{id:"cycle",name:"Day/Night Cycle",h:17.5,cycle:!0}],Gp=[{id:"clear",name:"Clear"},{id:"cloudy",name:"Overcast"},{id:"rain",name:"Rain"}],ao=[{id:"light",name:"Light",v:.55},{id:"normal",name:"Normal",v:1},{id:"heavy",name:"Heavy",v:1.45},{id:"rush",name:"Rush Hour",v:1.95}];var lo=[{id:"tonup",title:"Ton Up",desc:"Reach 100 mph.",env:"la",time:"morning",weather:"clear",density:"normal",goal:{type:"speed",value:100},reward:2e3,failOnCrash:!1},{id:"closecalls",title:"Close Calls",desc:"Make 10 close passes (under 1.2 m) in one run.",env:"la",time:"golden",weather:"clear",density:"heavy",goal:{type:"close",value:10},reward:6e3,failOnCrash:!0},{id:"commute",title:"Clean Commute",desc:"Drive 3 miles through heavy traffic without crashing.",env:"urban",time:"morning",weather:"clear",density:"heavy",goal:{type:"distance",value:3},reward:6e3,failOnCrash:!0},{id:"rookie",title:"Score Rookie",desc:"Score 15,000 points in one run.",env:"la",time:"noon",weather:"clear",density:"normal",goal:{type:"score",value:15e3},reward:6e3,failOnCrash:!0},{id:"needle",title:"Thread the Needle",desc:"Split between two cars 3 times in one run.",env:"urban",time:"dusk",weather:"clear",density:"rush",goal:{type:"splits",value:3},reward:9e3,failOnCrash:!0},{id:"bullet",title:"Desert Bullet",desc:"Reach 170 mph on the desert interstate.",env:"desert",time:"noon",weather:"clear",density:"light",goal:{type:"speed",value:170},reward:1e4,failOnCrash:!1},{id:"nightshift",title:"Night Shift",desc:"Score 40,000 points at night in the rain.",env:"night",time:"night",weather:"rain",density:"normal",goal:{type:"score",value:4e4},reward:18e3,failOnCrash:!0},{id:"rushhour",title:"Rush Hour Hero",desc:"Get 25 near misses in rush-hour traffic.",env:"la",time:"dusk",weather:"clear",density:"rush",goal:{type:"near",value:25},reward:16e3,failOnCrash:!0},{id:"doubleton",title:"Double Ton",desc:"Reach 200 mph. You will need serious horsepower.",env:"desert",time:"golden",weather:"clear",density:"light",goal:{type:"speed",value:200},reward:3e4,failOnCrash:!1},{id:"legend",title:"No Hesi Legend",desc:"Score 150,000 points in a single run.",env:"night",time:"night",weather:"clear",density:"heavy",goal:{type:"score",value:15e4},reward:6e4,failOnCrash:!0}],co={speed:r=>`${r} MPH`,close:r=>`${r} CLOSE PASSES`,near:r=>`${r} NEAR MISSES`,distance:r=>`${r} MILES CLEAN`,score:r=>`${r.toLocaleString("en-US")} PTS`,splits:r=>`${r} SPLITS`};var Ot=r=>document.getElementById(r),ce=(r,t,e)=>{let n=document.createElement(r);return t&&(n.className=t),e!==void 0&&(n.innerHTML=e),n},_l=[{id:"endless",name:"Endless Highway",desc:"Weave through endless traffic. Crashing ends the run."},{id:"free",name:"Free Drive",desc:"No score, no pressure. Cruise and explore."},{id:"timeattack",name:"Time Attack",desc:"Cover the most distance in 2 minutes. Crashes cost 5 seconds."}],jy={la:"#ff9a4a",urban:"#5aa9ff",desert:"#ffc15a",night:"#b45aff"},yl=class{constructor(t){this.game=t,this.screen="loading",this.history=[],this.cuTab="paint",this.garageSel=null,this._bind()}_bind(){document.querySelectorAll("[data-go]").forEach(s=>{s.addEventListener("click",()=>{this.game.audio.click(),this.go(s.dataset.go)})}),Ot("btn-go").addEventListener("click",()=>this._startFromSetup()),Ot("btn-select").addEventListener("click",()=>this._selectCar()),Ot("btn-tocustom").addEventListener("click",()=>{this.game.audio.click(),this.go("custom")}),Ot("btn-cu-drive").addEventListener("click",()=>{this.game.audio.click(),this.go("setup")}),Ot("btn-cu-reset").addEventListener("click",()=>this._resetCustom()),Ot("btn-cu-rev").addEventListener("click",()=>this.game.revPreview()),Ot("settings-back").addEventListener("click",()=>{this.game.audio.click(),this.go(this.settingsReturn||"menu")}),Ot("p-resume").addEventListener("click",()=>this.game.resume()),Ot("p-restart").addEventListener("click",()=>this.game.restart()),Ot("p-camera").addEventListener("click",()=>{this.game.cycleCamera(),this.updatePause()}),Ot("p-settings").addEventListener("click",()=>{this.settingsReturn="pause",this.go("settings")}),Ot("p-garage").addEventListener("click",()=>this.game.exitToMenu("garage")),Ot("p-menu").addEventListener("click",()=>this.game.exitToMenu("menu")),Ot("r-retry").addEventListener("click",()=>this.game.restart()),Ot("r-menu").addEventListener("click",()=>this.game.exitToMenu("menu"));let t=Ot("gl"),e=null,n=(s,o)=>{(this.screen==="garage"||this.screen==="custom")&&(e=[s,o])},i=(s,o)=>{e&&(this.game.garage.drag(s-e[0],o-e[1]),e=[s,o])};for(let s of["s-garage","s-custom"]){let o=Ot(s);o.addEventListener("pointerdown",a=>{(a.target===o||a.target.classList.contains("drag-hint"))&&n(a.clientX,a.clientY)})}window.addEventListener("pointermove",s=>i(s.clientX,s.clientY)),window.addEventListener("pointerup",()=>e=null),t.addEventListener("wheel",s=>{(this.screen==="garage"||this.screen==="custom")&&(this.game.garage.zoom=Math.max(.7,Math.min(1.5,this.game.garage.zoom+s.deltaY*8e-4)))},{passive:!0});for(let s of["s-garage","s-custom"])Ot(s).addEventListener("wheel",o=>{o.target===Ot(s)&&(this.game.garage.zoom=Math.max(.7,Math.min(1.5,this.game.garage.zoom+o.deltaY*8e-4)))},{passive:!0})}go(t){let e=this.game;(t==="garage"||t==="custom")&&(t==="garage"&&!this.garageSel&&(this.garageSel=e.save.selectedCar),t==="custom"&&(this.garageSel=this.garageSel&&e.isUnlocked(this.garageSel)?this.garageSel:e.save.selectedCar)),t==="settings"&&this.screen!=="pause"&&this.screen!=="settings"&&(this.settingsReturn="menu"),this.show(t),t==="menu"&&this.renderMenu(),t==="setup"&&this.renderSetup(),t==="garage"&&this.renderGarage(),t==="custom"&&this.renderCustom(),t==="challenges"&&this.renderChallenges(),t==="settings"&&this.renderSettings(),e.onScreen(t)}show(t){this.screen=t,document.querySelectorAll(".screen").forEach(n=>n.classList.remove("active"));let e=Ot("s-"+t);e&&e.classList.add("active"),setTimeout(()=>{let n=e?.querySelector(".menu-item, .btn.primary, .card.sel, .car-item.sel, button");n&&this.game.input.padActive&&n.focus()},30)}nav(t){let e=Ot("s-"+this.screen)||Ot("confirm");if(!e)return;let n=[...e.querySelectorAll("button, input")].filter(s=>s.offsetParent!==null);if(!n.length)return;let i=n.indexOf(document.activeElement);if(i<0){n[0].focus();return}i=(i+(t>0?1:-1)+n.length)%n.length,n[i].focus()}confirm(t,e,n){Ot("cf-title").textContent=t,Ot("cf-text").textContent=e;let i=Ot("confirm");i.classList.add("active");let s=()=>i.classList.remove("active");Ot("cf-yes").onclick=()=>{s(),n()},Ot("cf-no").onclick=s}toast(t,e=""){let n=ce("div","toast "+e,t);Ot("toasts").appendChild(n),setTimeout(()=>n.remove(),4300)}setLoading(t,e){Ot("load-fill").style.width=`${Math.round(t*100)}%`,e&&(Ot("load-text").textContent=e)}showStart(t){Ot("load-text").textContent="Ready";let e=Ot("btn-start");e.classList.remove("hidden"),e.focus();let n=!1,i=()=>{n||(n=!0,window.removeEventListener("keydown",s),t())},s=o=>{(o.code==="Enter"||o.code==="Space")&&(o.preventDefault(),i())};e.onclick=i,window.addEventListener("keydown",s)}renderMenu(){let t=this.game;Ot("m-career").textContent=Fe(t.save.career),Ot("m-best").textContent=Fe(t.save.best.endless),Ot("m-car").textContent=wn[t.save.selectedCar].name}renderSetup(){let t=this.game,e=t.save.last,n=Ot("mode-cards");n.innerHTML="";for(let a of _l){let l=ce("button","card"+(e.mode===a.id?" sel":""),`<div class="c-t">${a.name}</div><div class="c-d">${a.desc}</div>`);l.onclick=()=>{e.mode=a.id,t.audio.click(),this.renderSetup()},n.appendChild(l)}let i=Ot("env-cards");i.innerHTML="";for(let a of Vp){let l=xr[a],c=ce("button","card"+(e.env===a?" sel":""),`<div class="swatch" style="background:${jy[a]}"></div><div class="c-t">${l.name}</div><div class="c-d">${l.desc}</div>`);c.onclick=()=>{e.env=a,t.audio.click(),this.renderSetup(),t.previewEnv(a)},i.appendChild(c)}let s=(a,l,c)=>{a.innerHTML="";for(let h of l){let u=ce("button","chip"+(e[c]===h.id?" sel":""),h.name);u.onclick=()=>{e[c]=h.id,t.audio.click(),this.renderSetup()},a.appendChild(u)}};s(Ot("time-chips"),oo,"time"),s(Ot("weather-chips"),Gp,"weather"),s(Ot("density-chips"),ao,"density");let o=wn[t.save.selectedCar];Ot("setup-car-name").textContent=o.name,Ot("setup-car-cls").textContent=`${o.cls} \xB7 ${o.phys.hp} hp \xB7 ${o.phys.drive}`}_startFromSetup(){let t=this.game;t.audio.click(),t.saveNow(),t.startDrive({...t.save.last})}renderGarage(){let t=this.game,e=Ot("car-list");e.innerHTML="";for(let u of zi){let d=t.isUnlocked(u.id),f=t.save.selectedCar===u.id,p=ce("button","car-item"+(this.garageSel===u.id?" sel":"")+(d?"":" locked"),`<div><div class="n">${u.name}</div><div class="k">${u.cls}</div></div><div class="tag ${f?"cur":""}">${f?"SELECTED":d?"":"\u{1F512} "+Fe(u.cost)}</div>`);p.onclick=()=>{t.audio.click(),this.garageSel=u.id,this.renderGarage()},e.appendChild(p)}let n=wn[this.garageSel];t.showGarageCar(n.id),Ot("ci-maker").textContent=n.maker,Ot("ci-name").textContent=n.name,Ot("ci-cls").textContent=`${n.cls} \xB7 ${n.engine.label}`,Ot("ci-blurb").textContent=n.blurb;let i=t.carStats(n),s=t.save.settings.units,o=[["TOP SPEED",i.topSpeed/260,s==="kmh"?`${Math.round(i.topSpeed*1.609)} km/h`:`${Math.round(i.topSpeed)} mph`],["0-60 MPH",(6.5-i.zeroSixty)/4.5,`${i.zeroSixty.toFixed(1)} s`],["POWER",i.hp/1200,`${i.hp} hp`],["WEIGHT",1-(i.mass-1200)/900,s==="kmh"?`${i.mass} kg`:`${Fe(i.mass*2.2046)} lb`],["HANDLING",i.handling/10,i.handling.toFixed(1)],["BRAKING",i.braking/10,i.braking.toFixed(1)],["DRIVETRAIN",-1,n.phys.drive]],a=Ot("ci-stats");a.innerHTML="";for(let[u,d,f]of o)a.appendChild(ce("div","stat-row",`<span>${u}</span>${d>=0?`<div class="stat-bar"><i style="width:${Math.max(4,Math.min(100,d*100))}%"></i></div>`:"<div></div>"}<b>${f}</b>`));let l=t.isUnlocked(n.id),c=Ot("btn-select");c.disabled=!l,c.textContent=t.save.selectedCar===n.id?"SELECTED":l?"SELECT":"LOCKED",Ot("btn-tocustom").classList.toggle("hidden",!l);let h=Ot("ci-lock");h.classList.toggle("hidden",l),l||(h.textContent=`Unlocks at ${Fe(n.cost)} career points (you have ${Fe(t.save.career)}). Earn points in any mode.`)}_selectCar(){let t=this.game;t.isUnlocked(this.garageSel)&&(t.audio.click(),t.save.selectedCar=this.garageSel,t.saveNow(),t.onCarChanged(),this.renderGarage(),this.toast(`${wn[this.garageSel].name} selected`,"good"))}renderCustom(){let t=this.game,e=this.garageSel||t.save.selectedCar,n=wn[e],i=t.getCustom(e);Ot("cu-car").textContent=n.name.toUpperCase(),t.showGarageCar(e);let s=[["paint","PAINT"],["wheels","WHEELS"],["body","AERO & KIT"],["stance","STANCE & TINT"],["exhaust","EXHAUST"],["plate","PLATE"]],o=Ot("cu-tabs");o.innerHTML="";for(let[d,f]of s){let p=ce("button","tab"+(this.cuTab===d?" sel":""),f);p.onclick=()=>{this.cuTab=d,t.audio.click(),this.renderCustom()},o.appendChild(p)}let a=Ot("cu-body");a.innerHTML="";let l=tp,c=(d,f,p=!0)=>{i[d]=f,t.setCustom(e,i,p),this.renderCustom()},h=(d,f,p,x=!1)=>{a.appendChild(ce("h3","",d));let g=ce("div","swatches");for(let m of f){let _=ce("button","sw"+(i[p]?.toLowerCase()===m.toLowerCase()?" sel":""));_.style.background=m,_.title=m,_.setAttribute("aria-label",`${d} ${m}`),_.onclick=()=>{t.audio.click(),c(p,m,x)},g.appendChild(_)}a.appendChild(g)},u=(d,f,p,x=!0,g=!1)=>{a.appendChild(ce("h3","",d));let m=ce("div","chips");for(let[_,v]of f){let y=g?+_:_,S=ce("button","chip"+(i[p]===y?" sel":""),v);S.onclick=()=>{t.audio.click(),c(p,y,x)},m.appendChild(S)}a.appendChild(m)};if(this.cuTab==="paint"){h("COLOR",l.colors,"color");let d=ce("div","color-input","<span>CUSTOM</span>"),f=ce("input");f.type="color",f.value=i.color,f.oninput=()=>{i.color=f.value,t.setCustom(e,i,!1)},f.onchange=()=>this.renderCustom(),d.appendChild(f),a.appendChild(d),u("FINISH",l.finishes,"finish",!0)}else if(this.cuTab==="wheels")u("STYLE",l.wheels,"wheels"),h("RIM COLOR",l.rimColors,"rimColor"),h("BRAKE CALIPERS",l.calipers,"caliper");else if(this.cuTab==="body")u("SPOILER",l.spoilers,"spoiler"),u("BODY KIT",l.kits,"kit"),a.appendChild(ce("p","c-d",'<span style="color:#8d949c;font-size:13px">Wings and aggressive kits add downforce: more grip at speed, slightly lower top speed feel.</span>'));else if(this.cuTab==="stance")u("SUSPENSION",l.suspension,"suspension"),u("WINDOW TINT",l.tints,"tint",!0,!0);else if(this.cuTab==="exhaust")u("EXHAUST",l.exhausts,"exhaust"),a.appendChild(ce("p","",'<span style="color:#8d949c;font-size:13px">Sport and straight-pipe exhausts are louder, pop and crackle more on lift-off, and add a little power.</span>'));else{a.appendChild(ce("h3","","LICENSE PLATE"));let d=ce("input");d.type="text",d.maxLength=7,d.value=t.save.settings.plate||"NO HESI",d.onchange=()=>{t.save.settings.plate=(d.value||"NO HESI").toUpperCase().slice(0,7),t.saveNow(),t.setCustom(e,i,!0)},a.appendChild(d),a.appendChild(ce("p","",'<span style="color:#8d949c;font-size:13px">Up to 7 characters. Applies to all your cars.</span>'))}}_resetCustom(){let t=this.game,e=this.garageSel||t.save.selectedCar;t.audio.click(),t.setCustom(e,{...wn[e].defaults},!0),this.renderCustom()}renderChallenges(){let t=this.game,e=Ot("ch-list");e.innerHTML="";let n=0;for(let i of lo){let s=t.save.challenges[i.id]||{};s.done&&n++;let o=xr[i.env],a=ce("div","ch"+(s.done?" done":""),`${s.done?'<div class="ch-badge">\u2713 COMPLETE</div>':""}
         <div class="ch-t">${i.title}</div>
         <div class="ch-d">${i.desc}</div>
         <div class="ch-meta"><span>GOAL <b>${co[i.goal.type](i.goal.value)}</b></span><span>REWARD <b>${Fe(i.reward)}</b></span><span>${o.short} \xB7 ${i.weather.toUpperCase()}</span></div>
         ${s.best?`<div class="ch-meta"><span>BEST <b>${Fe(s.best)}</b></span></div>`:""}`),l=ce("button","btn primary small",s.done?"PLAY AGAIN":"START");l.onclick=()=>{t.audio.click(),t.startChallenge(i.id)},a.appendChild(l),e.appendChild(a)}Ot("ch-progress").textContent=`${n} / ${lo.length} COMPLETE`}renderSettings(){let t=this.game,e=t.save.settings,n=Ot("settings-body");n.innerHTML="";let i=v=>{let y=ce("div","set-group");return y.appendChild(ce("h3","",v)),n.appendChild(y),y},s=(v,y,S)=>{let b=ce("div","set-row");b.appendChild(ce("label","",y)),b.appendChild(S),v.appendChild(b)},o=()=>{t.saveNow(),t.applySettings()},a=(v,y)=>{let S=ce("button","toggle"+(e[v]?" on":""));return S.setAttribute("aria-pressed",!!e[v]),S.onclick=()=>{e[v]=!e[v],t.audio.click(),o(),y?.(),this.renderSettings()},S},l=(v,y)=>{let S=ce("div","seg");for(let[b,T]of y){let R=ce("button",e[v]===b?"sel":"",T);R.onclick=()=>{e[v]=b,t.audio.click(),o(),this.renderSettings()},S.appendChild(R)}return S},c=(v,y,S,b,T=R=>R)=>{let R=ce("div","set-ctrl"),w=ce("input");w.type="range",w.min=y,w.max=S,w.step=b,w.value=e[v];let M=ce("span","val",T(e[v]));return w.oninput=()=>{e[v]=+w.value,M.textContent=T(e[v]),t.applySettings()},w.onchange=()=>t.saveNow(),R.appendChild(w),R.appendChild(M),R},h=v=>`${Math.round(v*100)}`,u=i("GRAPHICS");s(u,"Quality",l("quality",[["low","LOW"],["medium","MED"],["high","HIGH"],["ultra","ULTRA"]])),s(u,"Auto-adjust for smooth framerate",a("autoQuality")),s(u,"Motion blur",a("motionBlur")),s(u,"Camera shake",c("shake",0,1.5,.05,h)),s(u,"Chase camera FOV",c("fov",50,80,1)),s(u,"Cockpit FOV",c("cockpitFov",55,90,1));let d=i("DRIVING");s(d,"Units",l("units",[["mph","MPH"],["kmh","KM/H"]])),s(d,"Transmission",l("transmission",[["auto","AUTO"],["manual","MANUAL"]])),s(d,"Traction control",a("tc")),s(d,"Countersteer assist",a("assist")),s(d,"Keyboard steering speed",c("steerSpeed",.5,1.6,.05,h)),s(d,"Steering sensitivity at speed",c("steerSens",.6,1.5,.05,h));let f=i("AUDIO");s(f,"Master volume",c("master",0,1,.01,h)),s(f,"Engine",c("engine",0,1,.01,h)),s(f,"Effects & ambience",c("sfx",0,1,.01,h)),s(f,"Music volume",c("music",0,1,.01,h)),s(f,"Background music (M)",a("musicOn"));let p=i("GAME");s(p,"Show HUD (H)",a("showHud")),s(p,"Sandbox: unlock all cars",a("unlockAll"));let x=ce("button","btn ghost small","RESET");x.onclick=()=>this.confirm("RESET PROGRESS?","Career points, best scores, unlocks, challenges and customisations will be erased.",()=>{t.resetProgress(),this.renderSettings(),this.toast("Progress reset")}),s(p,"Reset all progress",x);let g=i("CONTROLS"),m=[["Accelerate","W / \u2191 \xB7 RT"],["Brake / reverse","S / \u2193 \xB7 LT"],["Steer","A D / \u2190 \u2192 \xB7 Left stick"],["Handbrake","Space \xB7 A"],["Change camera","C \xB7 Y"],["Look back","B (hold) \xB7 B"],["Reset car","R \xB7 X"],["Pause","Esc / P \xB7 Start"],["Gear up / down","Shift / Ctrl (also E / Q) \xB7 RB / LB"],["Toggle HUD","H \xB7 View"],["Music on/off","M"],["Fullscreen","F"]],_=ce("table","keys");for(let[v,y]of m)_.appendChild(ce("tr","",`<td>${v}</td><td>${y}</td>`));g.appendChild(_),g.appendChild(ce("p","",'<span style="color:#8d949c;font-size:12.5px;line-height:1.5">Tip: in a browser, Ctrl+W closes the tab. Use E/Q for gears with WASD, or play fullscreen (F), where the game can capture those keys.</span>'))}updatePause(){let t=this.game;Ot("p-camera").textContent=`CAMERA: ${t.cameraName().toUpperCase()}`;let e=t.scoring.summary(),n=Ot("pause-stats"),i=t.save.settings.units;n.innerHTML=t.session?.mode==="free"?`<div><span>DISTANCE</span><b>${t.fmtDist(e.distance)}</b></div><div><span>TOP SPEED</span><b>${t.fmtSpeed(e.topSpeed/2.2369363)}</b></div>`:`<div><span>SCORE</span><b>${Fe(e.score)}</b></div><div><span>MULTIPLIER</span><b>\xD7${t.scoring.mult.toFixed(1)}</b></div>
         <div><span>NEAR MISSES</span><b>${e.nearMisses}</b></div><div><span>DISTANCE</span><b>${t.fmtDist(e.distance)}</b></div>`}showResults(t){Ot("r-kicker").textContent=t.kicker||"",Ot("r-title").textContent=t.title,Ot("r-big").textContent=t.big||"",Ot("r-stats").innerHTML=(t.stats||[]).map(([e,n])=>`<div><span>${e}</span><b>${n}</b></div>`).join(""),Ot("r-note").textContent=t.note||"",Ot("r-retry").textContent=t.retryLabel||"RETRY",this.show("results")}};var Wp=r=>document.getElementById(r),ms=86,Xp=100,Yp=100,qp=Math.PI*.75,xu=Math.PI*1.5,mu=ms*xu;function gu(r,t){let e=qp+xu*r,n=qp+xu*t,i=Xp+Math.cos(e)*ms,s=Yp+Math.sin(e)*ms,o=Xp+Math.cos(n)*ms,a=Yp+Math.sin(n)*ms,l=n-e>Math.PI?1:0;return`M ${i.toFixed(2)} ${s.toFixed(2)} A ${ms} ${ms} 0 ${l} 1 ${o.toFixed(2)} ${a.toFixed(2)}`}var Ml=class{constructor(){this.el=Wp("hud"),this.e={};for(let t of["h-score","h-mult","h-combo","h-best","h-dist","h-dist-l","h-near","h-gear","h-speed","h-unit","h-boost","h-mode","h-timer","h-obj","h-obj-t","h-obj-fill","h-pops","h-banner","h-cam","h-hint","h-scorebox","g-rpm","g-red","g-track"])this.e[t]=Wp(t);this.e["g-track"].setAttribute("d",gu(0,1)),this.e["g-rpm"].setAttribute("d",gu(0,1)),this.e["g-rpm"].style.strokeDasharray=`${mu} ${mu}`,this.last={},this.bannerT=0,this.camT=0,this.hintT=0}show(t){this.el.classList.toggle("hidden",!t)}setMinimal(t){this.el.classList.toggle("minimal",t)}setup({mode:t,modeLabel:e,scoring:n,timer:i,objective:s,redFrac:o,units:a,best:l}){this.e["h-mode"].textContent=e,this.e["h-scorebox"].style.display=n||i?"":"none",this.e["h-score"].style.display=n?"":"none",this.e["h-mult"].parentElement.style.display=n?"":"none",this.e["h-timer"].classList.toggle("hidden",!i),this.e["h-obj"].classList.toggle("hidden",!s),this.e["h-best"].parentElement.style.display=l!==void 0?"":"none",this.e["h-near"].parentElement.style.display=n?"":"none",this.e["g-red"].setAttribute("d",gu(vt(o,0,1),1)),this.e["h-unit"].textContent=a==="kmh"?"KM/H":"MPH",this.units=a,this.e["h-pops"].innerHTML="",this.last={},this.mode=t}_set(t,e){this.last[t]!==e&&(this.last[t]=e,this.e[t].textContent=e)}update(t,e){let n=this.units==="kmh"?e.speed*cs:e.speed*In;this._set("h-speed",String(Math.round(n))),this._set("h-gear",e.gear===-1?"R":e.gear===0?"N":String(e.gear));let i=vt(e.rpm/e.rpmMax,0,1);this.e["g-rpm"].style.strokeDashoffset=(mu*(1-i)).toFixed(1);let s=e.rpm>e.redline*.96;if(this.last.hot!==s&&(this.last.hot=s,this.e["g-rpm"].classList.toggle("hot",s)),this.e["h-boost"].style.width=`${Math.round(vt(e.boost,0,1)*100)}%`,e.scoring){let o=Fe(e.score);this.last["h-score"]!==o&&this._set("h-score",o),this._set("h-mult",`\xD7${e.mult.toFixed(1)}`);let a=e.mult>=3;this.last.hotM!==a&&(this.last.hotM=a,this.e["h-mult"].classList.toggle("hot",a)),this.e["h-combo"].style.width=`${Math.round(vt(e.combo/7,0,1)*100)}%`,this._set("h-near",String(e.nearMisses))}if(e.best!==void 0&&this._set("h-best",Fe(e.best)),this._set("h-dist",e.distText),this._set("h-dist-l",e.distLabel||"DIST"),e.timer!==void 0){this._set("h-timer",gf(e.timer));let o=e.timer<10;this.last.low!==o&&(this.last.low=o,this.e["h-timer"].classList.toggle("low",o))}e.objective&&(this._set("h-obj-t",e.objective.text),this.e["h-obj-fill"].style.width=`${Math.round(vt(e.objective.frac,0,1)*100)}%`),this.bannerT>0&&(this.bannerT-=t,this.bannerT<=0&&this.e["h-banner"].classList.remove("show")),this.camT>0&&(this.camT-=t,this.camT<=0&&this.e["h-cam"].classList.remove("show")),this.hintT>0&&(this.hintT-=t,this.hintT<=0&&this.e["h-hint"].classList.add("fade"))}bumpScore(){let t=this.e["h-score"];t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")}pop(t){let e=this.e["h-pops"],n=document.createElement("div");n.className="pop "+t.kind;let i=t.text;for(t.pts&&(i+=`<span class="p-pts">+${Fe(t.pts)}</span>`),t.dense&&(i+=`<span class="p-tag">DENSE \xD7${t.dense.toFixed(1)}</span>`),n.innerHTML=i,e.prepend(n);e.children.length>4;)e.lastChild.remove();setTimeout(()=>n.remove(),1550),t.pts&&this.bumpScore()}banner(t,e,n,i=3){let s=this.e["h-banner"];s.innerHTML=`<div class="b-k">${t}</div><div class="b-t">${e}</div>${n?`<div class="b-s">${n}</div>`:""}`,s.classList.add("show"),this.bannerT=i}hideBanner(){this.e["h-banner"].classList.remove("show"),this.bannerT=0}camLabel(t){let e=this.e["h-cam"];e.textContent=t.toUpperCase()+" CAM",e.classList.add("show"),this.camT=1.6}hint(t,e=9){let n=this.e["h-hint"];n.innerHTML=t,n.classList.remove("fade"),this.hintT=e}};var $p={low:{pixelRatio:.75,shadows:!1,shadowMap:1024,post:!1,bloom:!1,samples:0,viewDist:520,propDensity:.45,rain:.35,mirror:!1},medium:{pixelRatio:1,shadows:!0,shadowMap:1024,post:!0,bloom:!0,samples:0,viewDist:700,propDensity:.7,rain:.6,mirror:!0},high:{pixelRatio:1.25,shadows:!0,shadowMap:2048,post:!0,bloom:!0,samples:4,viewDist:900,propDensity:1,rain:1,mirror:!0},ultra:{pixelRatio:2,shadows:!0,shadowMap:4096,post:!0,bloom:!0,samples:4,viewDist:1150,propDensity:1.25,rain:1,mirror:!0}},Zp=["low","medium","high","ultra"],vr=()=>new Promise(r=>requestAnimationFrame(()=>r())),bl=class{constructor(){this.state="loading",this.origin={x:0,y:0},this.popQueue=[],this.crashCD=0,this.hudMode=0,this.frameTimes=[],this.qualityDropT=0,this.revT=-1,this.lastS=0,this.stuckT=0,this.hintShown=!1,this._tmpV=new I,this._lamps=[]}async init(){this.save=Lp(),this.input=new pl,this.audio=new fl,this.ui=new yl(this),this.hud=new Ml;let t=this.ui;t.setLoading(.05,"Starting renderer\u2026"),await vr();let e=document.getElementById("gl"),n;try{n=new ha({canvas:e,antialias:!0,powerPreference:"high-performance",stencil:!1})}catch(i){throw t.setLoading(0,"WebGL is not available in this browser. Try Chrome, Edge or Firefox with hardware acceleration on."),i}this.renderer=n,n.outputColorSpace=Ce,n.toneMapping=Kr,n.shadowMap.enabled=!0,n.shadowMap.type=Dh,tu.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),this.scene=new Jn,this.camera=new Be(62,1,.2,6e3);try{await Promise.race([Promise.all([document.fonts.load('700 40px "Barlow Condensed"'),document.fonts.load('600 40px "Barlow Condensed"'),document.fonts.load('italic 800 40px "Barlow Condensed"')]),new Promise(i=>setTimeout(i,1500))])}catch{}t.setLoading(.15,"Generating highway\u2026"),await vr(),this.road=new Na,this.highway=new Ha(this.scene,this.road),this.sky=new Va(n,this.scene),t.setLoading(.3,"Building traffic\u2026"),await vr(),this.traffic=new Ya(this.scene,this.road),t.setLoading(.5,"Preparing cars\u2026"),await vr(),this.player=new qa(this.scene),this.camRig=new Ka(this.camera),this.cockpit=new nl(n),this.glows=new il(this.scene),this.smoke=new fs(this.scene,260,{texture:Ln(64,0,1.2),depthBias:.35}),this.sparks=new fs(this.scene,220,{additive:!0,texture:Ln(32,.2,1.5)}),this.flames=new fs(this.scene,120,{additive:!0,texture:Ln(32,.1,1.3)}),this.rain=new sl(this.scene,5e3),this.spray=new fs(this.scene,520,{texture:Ln(64,0,1),depthBias:.5}),this.postfx=new hl(n,this.scene,this.camera),this.garage=new vl(n),this.scoring=new ml,this.autopilot=new gl,t.setLoading(.65,"Lighting the sky\u2026"),await vr(),this.applySettings(!0),window.addEventListener("resize",()=>this.resize()),this.resize(),window.addEventListener("beforeunload",i=>{(this.state==="playing"||this.state==="paused")&&(i.preventDefault(),i.returnValue="")}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.pause()}),t.setLoading(.8,"Starting engines\u2026"),await vr(),this.startSession(this._attractCfg(),!0),this.renderer.compile(this.scene,this.camera),t.setLoading(1,"Ready"),this.state="intro",this._loop=this._loop.bind(this),this.lastT=performance.now(),requestAnimationFrame(this._loop),t.showStart(()=>{this.audio.init(),this.applySettings(),this.audio.setCar(this.carDef,this.getCustom(this.carDef.id)),t.go("menu")}),window.NOHESI=this}get S(){return this.save.settings}applySettings(t=!1){let e=this.S,n=$p[e.quality]||$p.high,i=this.Q&&this.Q!==n;this.Q=n,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.pixelRatio)),this.renderer.shadowMap.enabled=n.shadows,this.sky.setQuality(n),this.highway.viewDist=n.viewDist,this.highway.propDensity=n.propDensity,this.postfx.setSamples(n.samples),this.postfx.setBloom(!!n.bloom),this.rain.setCount(n.rain),this.resize(),this.audio.vol={master:e.master,engine:e.engine,sfx:e.sfx,music:e.music},this.audio.applyVolumes(),this.audio.ready&&this.audio.musicOn!==e.musicOn&&this.audio.setMusic(e.musicOn),i&&!t&&this.session&&this.env&&(this.highway.setEnvironment(this.env,this.layout,n),this.highway.rebase(this.origin),this.highway.update(this.player.proj.s,!0),this.traffic.spawnAhead=n.viewDist*.75),this.hud&&this.hud.setup&&this.session&&this._setupHud()}resize(){let t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.postfx.setSize(t,e,this.renderer.getPixelRatio()),this.garage?.setAspect(t/e)}saveNow(){Dp(this.save)}resetProgress(){let t=pu();t.settings=this.save.settings,t.settings.unlockAll=!1,this.save=t,this.saveNow(),this.onCarChanged()}isUnlocked(t){return this.S.unlockAll||wn[t].cost<=this.save.career}getCustom(t){return this.save.customs[t]||(this.save.customs[t]={...wn[t].defaults}),this.save.customs[t]}setCustom(t,e,n){this.save.customs[t]=e,this.saveNow(),this.garage.def?.id===t&&(n?this.garage.show(wn[t],e,this.S.plate):this.garage.car.mats.paint.color.set(e.color)),t===this.save.selectedCar&&(this.carDirty=!0),t===this.save.selectedCar&&n&&(this.audioDirty=!0)}showGarageCar(t){(this.garage.def?.id!==t||this._garageCustomKey!==JSON.stringify(this.getCustom(t))+this.S.plate)&&(this.garage.show(wn[t],this.getCustom(t),this.S.plate),this._garageCustomKey=JSON.stringify(this.getCustom(t))+this.S.plate)}onCarChanged(){this.carDirty=!0,this.audioDirty=!0}revPreview(){if(!this.audio.ready)return;let t=this.garage.def;this.audio.setCar(t,this.getCustom(t.id)),this.audioDirty=!0,this.revT=0}carStats(t){if(this._stats=this._stats||{},this._stats[t.id])return this._stats[t.id];let e=new dr(t,t.defaults);e.reset(0,0,0,0);let n=0,i={throttle:1,brake:0,steer:0,handbrake:0,auto:!0,tc:!0,assist:!1,sens:1,gripMul:1};for(;n<15&&e.speed<26.82;)e.step(1/120,i),n+=1/120;let s=t.phys,o=vt(s.grip*7.2-(s.mass-1300)/380+s.downforce*1.3+(s.tireB-14)*.22,1,10),a=vt(s.brakeG*6.6-(s.mass-1400)/520,1,10),l={topSpeed:s.topSpeed,zeroSixty:n,hp:s.hp,mass:s.mass,handling:o,braking:a};return this._stats[t.id]=l,l}get carDef(){return wn[this.save.selectedCar]||zi[0]}_ensurePlayerCar(){let t=this.carDef,e=this.getCustom(t.id),n=t.id+JSON.stringify(e)+this.S.plate;(this._carKey!==n||!this.player.model)&&(this.player.build(t,e,this.S.plate),this.cockpit.build(this.player,t),this._carKey=n),this.carDirty=!1,this.audio.ready&&(this.audioDirty||this.audio.car!==t)&&(this.audio.setCar(t,e),this.audioDirty=!1)}_attractCfg(){return{mode:"attract",env:this.save.last.env||"la",time:"default",weather:"clear",density:"normal"}}previewEnv(t){this.state==="menu"&&this.startSession({...this._attractCfg(),env:t},!0)}startDrive(t){this.save.last={mode:t.mode,env:t.env,time:t.time,weather:t.weather,density:t.density},this.saveNow(),this.startSession(t,!1)}startChallenge(t){let e=lo.find(n=>n.id===t);this.startSession({mode:"challenge",env:e.env,time:e.time,weather:e.weather,density:e.density,challenge:e},!1)}startSession(t,e){let n=xr[t.env]||xr.la,i=this.Q,s=this.envId!==n.id||this._envQ!==i;this.env=n,this.envId=n.id,this._envQ=i,this.layout=xf(n),this.road.configure(n,n.seed*31+Math.floor(Math.random()*1e5)),s?(this.highway.setEnvironment(n,this.layout,i),this.sky.setEnvironment(n)):this.highway.clear();let o=oo.find(f=>f.id===t.time)||oo[0],a=o.id==="default"?n.defaultTime:o.h;this.sky.setTime(a,!!o.cycle),this.sky.setWeather(t.weather||"clear"),this.sky.snapWeather(),this.sky.update(0,this.camera.position,0),this._ensurePlayerCar();let l=Math.floor(this.layout.n/2),c=80,h=e?36:22;this.player.place(this.road,c,this.layout.laneCenter(l),h);let u=this.player.phys;this.origin.x=Math.round(u.X),this.origin.y=Math.round(u.Y),this.highway.rebase(this.origin),this.highway.update(c,!0);let d=(ao.find(f=>f.id===t.density)||ao[1]).v;if(this.traffic.reset(this.layout,d,c,l,{spawnAhead:i.viewDist*.75}),this.scoring.reset(),this.autopilot.reset(l,88+Math.random()*10),this.smoke.clear(),this.spray?.clear(),this.sparks.clear(),this.flames.clear(),this.popQueue.length=0,this.lastS=c,this.crashCD=0,this.stuckT=0,this.sessionCfg=t,this.session={mode:e?"attract":t.mode,cfg:t,challenge:t.challenge||null,timeLeft:t.mode==="timeattack"?120:0,done:!1,runs:0,t:0},this.camRig.setMode(e?"cinematic":this.S.camera||"chase"),this.cockpit.setVisible(!e&&this.camRig.mode==="cockpit"),this.player.setInteriorDummyVisible(this.camRig.mode!=="cockpit"),this.hud.hideBanner(),e)this.hud.show(!1),this.input.captureKeys=!1;else{this.state="playing",this.ui.show("none"),this.hud.show(!0),this._setupHud(),this.input.captureKeys=!0,this.input.flush(),this.hintShown||(this.hintShown=!0,this.hud.hint("<kbd>W</kbd><kbd>S</kbd> throttle / brake &nbsp; <kbd>A</kbd><kbd>D</kbd> steer &nbsp; <kbd>Space</kbd> handbrake<br><kbd>C</kbd> camera &nbsp; <kbd>B</kbd> look back &nbsp; <kbd>R</kbd> reset &nbsp; <kbd>Esc</kbd> pause &nbsp; <kbd>E</kbd>/<kbd>Q</kbd> gears &nbsp; <kbd>H</kbd> HUD",10));let f=t.mode==="challenge"?t.challenge.title.toUpperCase():_l.find(p=>p.id===t.mode).name.toUpperCase();this.hud.banner(t.mode==="challenge"?"CHALLENGE":n.short,f,t.mode==="challenge"?t.challenge.desc:this.carDef.name,2.6),this.audio.bigChime()}this.camRig.snap=!0}_setupHud(){let t=this.session;if(!t||t.mode==="attract")return;let e=this.player.phys,n=Math.ceil((e.limiter+400)/1e3)*1e3;this.rpmMax=n;let i=t.mode==="challenge"?`CHALLENGE \xB7 ${t.challenge.title.toUpperCase()}`:`${_l.find(s=>s.id===t.mode).name.toUpperCase()} \xB7 ${this.env.short}`;this.hud.setup({mode:t.mode,modeLabel:i,scoring:t.mode!=="free",timer:t.mode==="timeattack",objective:t.mode==="challenge",redFrac:e.redline/n,units:this.S.units,best:t.mode==="endless"?this.save.best.endless:t.mode==="timeattack"?this.save.best.timeattack:void 0}),this._applyHudMode()}_applyHudMode(){let t=this.S.showHud!==!1;this.hud.show(this.state==="playing"&&t&&this.hudMode<2),this.hud.setMinimal(this.hudMode===1)}pause(){this.state==="playing"&&(this.state="paused",this.ui.updatePause(),this.ui.show("pause"),this.input.captureKeys=!1)}resume(){this.state==="paused"&&(this.audio.click(),this.state="playing",this.ui.show("none"),this.input.captureKeys=!0,this.input.flush(),this.lastT=performance.now())}restart(){this.audio.click(),this.session?.mode==="endless"&&this._bankRun(!1),this.startSession(this.sessionCfg,!1)}exitToMenu(t){this.audio.click(),this.session?.mode==="endless"&&this.state!=="results"&&this._bankRun(!1),this.session?.mode==="timeattack"&&this.state!=="results"&&this._bankScore(this.scoring.score),this.hud.show(!1),this.state="menu",this.startSession(this._attractCfg(),!0),this.ui.go(t)}onScreen(t){(this.state==="paused"||this.state==="results")&&(t==="settings"||t==="pause"||t==="results")||(t==="garage"||t==="custom"?this.state="garage":t!=="none"&&(this.state!=="menu"&&(this.state="menu",this.carDirty&&(this._ensurePlayerCar(),this.startSession(this._attractCfg(),!0))),this.audioDirty&&this.audio.ready&&(this.audio.setCar(this.carDef,this.getCustom(this.carDef.id)),this.audioDirty=!1)))}cycleCamera(){let t=this.camRig.next();t!=="cinematic"&&(this.S.camera=t),this.saveNow(),this.cockpit.setVisible(t==="cockpit"),this.player.setInteriorDummyVisible(t!=="cockpit"),this.hud.camLabel(ou[t])}cameraName(){return ou[this.camRig.mode]}fmtDist(t){return this.S.units==="kmh"?`${(t/1e3).toFixed(1)} km`:`${(t*Kh).toFixed(1)} mi`}fmtSpeed(t){return this.S.units==="kmh"?`${Math.round(t*cs)} km/h`:`${Math.round(t*In)} mph`}_bankScore(t){let e=this.save.career;this.save.career+=Math.floor(t),this._checkUnlocks(e,this.save.career)}_checkUnlocks(t,e){for(let n of zi)n.cost>t&&n.cost<=e&&(this.ui.toast(`NEW CAR UNLOCKED \xB7 ${n.name.toUpperCase()}`,"gold"),this.audio.bigChime())}_bankRun(t){let e=this.scoring.summary(),n=this.save.stats;n.runs++,n.distance+=e.distance,n.nearMisses+=e.nearMisses,n.topSpeed=Math.max(n.topSpeed,e.topSpeed),t&&n.crashes++;let i=e.score>this.save.best.endless;return i&&(this.save.best.endless=e.score),this._bankScore(e.score),this.saveNow(),{sum:e,newBest:i}}_loop(t){if(requestAnimationFrame(this._loop),this.halt){this.lastT=t;return}let e=(t-this.lastT)/1e3;this.lastT=t,e>0||(e=1/60);let n=e;e=Math.min(e,1/20),this.input.poll(),this._globalActions();let i=this.state;if(i==="garage")this._garageFrame(e);else{let s=i==="playing"||i==="menu"||i==="intro";s&&this._simulate(e,i!=="playing"),this._render(s?e:0)}i==="playing"&&this._autoQuality(n),this.input.flush()}_globalActions(){let t=this.input,e=this.state;if(t.take("fullscreen")&&this._toggleFullscreen(),t.take("music")&&this.audio.ready&&(this.S.musicOn=!this.S.musicOn,this.audio.setMusic(this.S.musicOn),this.saveNow(),this.ui.toast(this.S.musicOn?"Music on":"Music off")),e==="intro"&&t.take("confirm")&&document.getElementById("btn-start").click(),e==="playing"){if(t.take("pause")){this.pause();return}t.take("camera")&&this.cycleCamera(),t.take("hud")&&(this.hudMode=(this.hudMode+1)%3,this._applyHudMode()),t.take("reset")&&this._resetCar()}else if(e==="paused")(t.take("pause")||t.take("back"))&&this.resume(),this._menuNav();else if(e==="menu"||e==="garage"||e==="results"){if(t.take("pause")||t.take("back")){let n=this.ui.screen,i={setup:"menu",garage:"menu",custom:"garage",challenges:"menu",settings:this.ui.settingsReturn||"menu"};i[n]&&(this.audio.click(),this.ui.go(i[n]))}this._menuNav()}}_menuNav(){let t=this.input;if((t.take("navDown")||t.take("navRight"))&&this.ui.nav(1),(t.take("navUp")||t.take("navLeft"))&&this.ui.nav(-1),t.take("confirm")){let e=document.activeElement;e&&e.tagName==="BUTTON"&&e.click()}}_toggleFullscreen(){let t=document;t.fullscreenElement?t.exitFullscreen?.():t.documentElement.requestFullscreen?.().then(()=>{navigator.keyboard?.lock?.(["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","ControlLeft","ControlRight","Space"]).catch(()=>{})}).catch(()=>this.ui.toast("Fullscreen is not available here"))}_resetCar(){let t=this.player.phys,e=this.layout,n=this.player.proj.s+4,i=e.laneOf(vt(this.player.proj.d,e.laneStart,e.lanesEnd-.1)),s=e.laneCenter(i);this.traffic.clearAround(n,s,45),this.player.place(this.road,n,s,Math.max(18,Math.min(t.speed,30))),this.scoring.mult=1,this.scoring.chain=0,this.scoring.combo=0,this.camRig.snap=!0,this.audio.click()}_autoQuality(t){if(!this.S.autoQuality||(this.frameTimes.push(t),this.frameTimes.length<180))return;let e=this.frameTimes.reduce((n,i)=>n+i,0)/this.frameTimes.length;if(this.frameTimes.length=0,this.qualityDropT-=3,e>1/40&&this.qualityDropT<=0){let n=Zp.indexOf(this.S.quality);n>0&&(this.S.quality=Zp[n-1],this.saveNow(),this.applySettings(),this.qualityDropT=20,this.ui.toast(`Graphics lowered to ${this.S.quality.toUpperCase()} to keep things smooth`))}}_simulate(t,e){let n=this.player.phys,i=this.player,s=this.S,o=this.layout,a=this.session;a.t+=t;let l;e?l=this.autopilot.update(t,i,this.traffic,this.road,o):l=this.input.controls();let c=1-this.sky.wet*.27,h=i.control(l,t,{...s,gripMul:c});e&&(h.auto=!0,h.tc=!0,h.assist=!0),e||(this.input.take("gearUp")&&n.shiftUp(),this.input.take("gearDown")&&n.shiftDown()),i.step(t,h),this.crashCD-=t;let u=0,d=Hp(i,this.road,o);d&&(u=d.scrape,d.severity>.3&&this._impact(d.severity,d.point,!0,e),d.scrape>.05&&Math.random()<d.scrape&&this._sparkAt(d.point,2));let f=zp(i,this.traffic,this.road);for(let T of f)T.car.hit=!0,T.severity>.25&&this._impact(T.severity,T.point,!1,e);this.scrapeLevel=Pn(this.scrapeLevel||0,u,12,t);let p=this.road.project(n.X,n.Y,i.proj.s,i.proj);Math.hypot(n.X-this.origin.x,n.Y-this.origin.y)>1500&&this._rebase(),this.highway.update(p.s);let x=n.heading-p.H,g=Math.abs(Math.cos(x)),m=Math.abs(Math.sin(x)),_=i.halfW*g+i.halfL*m,v=i.halfL*g+i.halfW*m,y=n.VX*Math.sin(p.H)+n.VY*Math.cos(p.H);this.traffic.update(t,{ps:p.s,pd:p.d,pv:y,pw:_,pl:v,runDist:this.scoring.distance});let S=!e&&a.mode!=="free"&&!a.done;this.scoring.update(t,{speed:Math.max(0,y),cars:this.traffic.cars,ps:p.s,pd:p.d,pw:_,pl:v,scoring:S});let b=p.s-this.lastS;b>0&&b<50&&this.scoring.addDistance(b),this.lastS=p.s;for(let T of this.scoring.events)e||this.hud.pop(T);this.scoring.events.length=0;for(let T of this.scoring.sounds)T.type==="whoosh"?this.audio.whoosh(T.side,T.intensity*(e?.4:1),T.rel):!e&&T.type==="chime"?this.audio.chime(T.level):!e&&T.type==="big"&&this.audio.bigChime();this.scoring.sounds.length=0;for(let T of this.traffic.events)if(T.type==="honk"&&!e){let R=vt((T.d-p.d)/6,-1,1),w=vt(1-Math.abs(T.s-p.s)/120,.2,1);this.audio.horn(R,w)}this.traffic.events.length=0,this._vehicleEvents(t,e),e||this._modeLogic(t),!e&&n.speed<2&&Math.abs(Math.sin(x))>.6?(this.stuckT+=t,this.stuckT>2.5&&(this.stuckT=-20,this.hud.hint("Stuck? Press <kbd>R</kbd> to reset your car onto the road.",5))):this.stuckT>0&&(this.stuckT=0)}_impact(t,e,n,i){let s=this.session;if(this.camRig.addImpact(vt(t/12,.1,1.2)),this._sparkAt(e,Math.floor(vt(t*3,4,30))),this.crashCD>0)return;let a=t>(n?6.5:2.4);if(a||t>1.2?this.audio.crash(vt(t/14,.25,1.4)*(i?.4:1)):this.audio.bump(.02),this.crashCD=.6,!i){if(!a){t>.6&&s.mode!=="free"&&this.scoring.contact();return}if(this.crashCD=1.5,s.mode==="endless"){let{sum:l,newBest:c}=this._bankRun(!0);this.hud.banner(c&&l.score>0?"NEW BEST":"CRASHED \xB7 RUN OVER",Fe(l.score),`${l.nearMisses} near misses \xB7 ${this.fmtDist(l.distance)} \xB7 top ${Math.round(this.S.units==="kmh"?l.topSpeed*1.609:l.topSpeed)} ${this.S.units==="kmh"?"km/h":"mph"}`,3.8),this.scoring.reset(),this.hud.setup&&this._setupHud(),this.audio.fail()}else s.mode==="timeattack"?(s.timeLeft=Math.max(0,s.timeLeft-5),this.scoring.contact(),this.hud.pop({text:"CRASH \u22125s",pts:0,kind:"bad"})):s.mode==="challenge"&&(s.challenge.failOnCrash&&!s.done?this._challengeEnd(!1):this.scoring.contact())}}_sparkAt(t,e){let n=this.player.phys,i=t[0]-this.origin.x,s=-(t[1]-this.origin.y),o=this.player.proj.E+.3;for(let a=0;a<e;a++)this.sparks.emit(i,o,s,n.VX*.6+(Math.random()-.5)*6,Math.random()*4+1,-n.VY*.6+(Math.random()-.5)*6,.25+Math.random()*.35,.07,0,1,.6,.2,1,9.8,.5)}_vehicleEvents(t,e){let n=this.player.phys,i=this.carDef,s=this.getCustom(i.id).exhaust||"stock";for(let a of n.events)if(a.type==="shift")e||this.audio.shift(a.dir>0),a.dir>0&&this.player.thr>.85&&s!=="stock"&&this._queuePops(1,.02);else if(a.type==="lift"&&(i.engine.turbo&&this.audio.blowOff(a.boost,i.engine.flutter),a.rpm>i.phys.redline*.5&&n.speed>8)){let l=s==="straight"?6+Math.floor(Math.random()*6):s==="sport"?3+Math.floor(Math.random()*4):1+Math.floor(Math.random()*2);this._queuePops(l,.06)}n.events.length=0;for(let a of this.player.events)a.type==="bump"&&(this.audio.bump(a.amp),this.camRig.addBump(a.amp*.25));this.player.events.length=0;let o=this.session.t;for(;this.popQueue.length&&this.popQueue[0]<=o;){if(this.popQueue.shift(),this.player.thr>.3)continue;this.audio.pop(.6+Math.random()*.5);let a=this.player.lampWorld(this.player.model.lamps.exhaust,this._lamps),l=this._tmpV.set(-Math.sin(n.heading),0,Math.cos(n.heading));for(let c of a){for(let h=0;h<3;h++){let u=2+Math.random()*3;this.flames.emit(c.x,c.y,c.z,l.x*u+n.VX*.9,.2,l.z*u-n.VY*.9,.06+Math.random()*.05,.22+Math.random()*.15,1.5,1,.45+Math.random()*.2,.12,1,0,0)}this.flames.emit(c.x,c.y,c.z,n.VX*.9,0,-n.VY*.9,.05,.12,.5,.4,.6,1,.9,0,0)}}}_queuePops(t,e){let n=this.session.t+e;for(let i=0;i<t;i++)n+=.04+Math.random()*.14,this.popQueue.push(n);this.popQueue.sort((i,s)=>i-s)}_modeLogic(t){let e=this.session;if(!e.done){if(e.mode==="timeattack"){if(e.timeLeft-=t,e.timeLeft<=0){e.timeLeft=0,e.done=!0;let n=this.scoring.summary(),i=this.save.best.timeattack,s=n.distance>i;s&&(this.save.best.timeattack=Math.floor(n.distance)),this._bankScore(n.score),this.saveNow(),this._showResults({kicker:s?"NEW PERSONAL BEST":"TIME ATTACK",title:"TIME UP",big:this.fmtDist(n.distance),stats:[["SCORE",Fe(n.score)],["BEST",this.fmtDist(Math.max(i,n.distance))],["TOP SPEED",this.fmtSpeed(n.topSpeed/In)],["NEAR MISSES",n.nearMisses]],note:`+${Fe(n.score)} career points`})}}else if(e.mode==="challenge"){let n=e.challenge,i=n.goal;this._goalValue(i.type)>=i.value&&this._challengeEnd(!0)}}}_goalValue(t){let e=this.scoring;switch(t){case"speed":return e.topSpeed;case"close":return e.closePasses;case"near":return e.nearMisses;case"distance":return e.distance*Kh;case"score":return e.score;case"splits":return e.splits;default:return 0}}_challengeEnd(t){let e=this.session;e.done=!0;let n=e.challenge,i=this.save.challenges[n.id]||{},s=this._goalValue(n.goal.type);i.best=Math.max(i.best||0,Math.floor(s));let o="";if(t){let l=!i.done;i.done=!0;let c=l?n.reward:Math.round(n.reward*.1);this._bankScore(c),o=`+${Fe(c)} career points${l?"":" (replay bonus)"}`,this.audio.bigChime()}else this.audio.fail();this.save.challenges[n.id]=i,this.saveNow();let a=this.scoring.summary();this._showResults({kicker:n.title.toUpperCase(),title:t?"CHALLENGE COMPLETE":"CHALLENGE FAILED",big:co[n.goal.type](n.goal.type==="distance"?+s.toFixed(1):Math.floor(s)),stats:[["SCORE",Fe(a.score)],["NEAR MISSES",a.nearMisses],["DISTANCE",this.fmtDist(a.distance)],["TOP SPEED",this.fmtSpeed(a.topSpeed/In)]],note:t?o:"You crashed. Shake it off and go again.",retryLabel:t?"PLAY AGAIN":"RETRY"})}_showResults(t){this.state="results",this.input.captureKeys=!1,this.hud.show(!1),this.ui.showResults(t)}_rebase(){let t=this.player.phys,e=Math.round(t.X),n=Math.round(t.Y),i=-(e-this.origin.x),s=n-this.origin.y;this.origin.x=e,this.origin.y=n,this.highway.rebase(this.origin),this.camRig.pos.x+=i,this.camRig.pos.z+=s,this.camera.position.x+=i,this.camera.position.z+=s,this.camRig.cine.pos.x+=i,this.camRig.cine.pos.z+=s;for(let o of[this.smoke,this.sparks,this.flames,this.spray])for(let a of o.p)a.life>0&&(a.x+=i,a.z+=s)}_render(t){let e=this.player,n=e.phys,i=this.sky;t>0&&e.sync(this.road,this.origin,t,i.night,i.wet);let s=this.state==="playing"||this.state==="paused"||this.state==="results";this.camRig.update(t||1e-4,{car:e,road:this.road,origin:this.origin,settings:this.S,lookBack:s&&this.input.isHeld("lookBack"),layout:this.layout,traffic:this.traffic});let o=this.camera;i.update(t,o.position,e.proj.E),i.updateShadow(e.model.root.position);let a=i.night,l=i.wet;t>0&&this.traffic.render(this.origin,a,l),this.highway.setAmbient(a,l),this.renderer.toneMappingExposure=i.exposure;let c=this.camRig.mode,h=c==="cockpit";if(t>0){let f=n.skid;if(f>.28&&n.speed>2.5){let p=Math.random()<f?2:1;for(let x of e.model.wheels){let g=!x.front;if(g&&(n.slipR>.3||n.wheelspin>.1||(n.hbSlide||0)>1)||!g&&n.slipF>3){x.pivot.getWorldPosition(this._tmpV);for(let m=0;m<p;m++){let _=.75+Math.random()*.15;this.smoke.emit(this._tmpV.x+(Math.random()-.5)*.3,this._tmpV.y-.15,this._tmpV.z+(Math.random()-.5)*.3,n.VX*.25+(Math.random()-.5),.6+Math.random()*.6,-n.VY*.25+(Math.random()-.5),1.6+Math.random(),.6,2.6,_,_,_+.02,.22*f*(1-l*.6),-.3,.9)}}}}}t>0&&l>.25&&this._emitSpray(t,l,a);let u=this.renderer.getDrawingBufferSize(this._sz||(this._sz=new ut)).y;if(this.smoke.update(t,o,u),this.spray.update(t,o,u),this.sparks.update(t,o,u),this.flames.update(t,o,u),this._glows(u,h),this.rain.update(t,o.position,this._tmpV.set(n.VX,0,-n.VY),i.rainAmt,1-a*.75),this.cockpit.setVisible(h),h&&(this.cockpit.update(t,e,{night:a,units:this.S.units,road:this.road,hours:i.hours,rain:i.rainAmt,manual:this.S.transmission==="manual"}),this.Q.mirror&&this.cockpit.renderMirror(this.renderer,this.scene,e)),this.audio.ready){let f=this.state==="playing"?1:this.state==="menu"?.32:0;this.audio.update(t,{rpm:n.rpm,load:n.throttleEff,boost:n.boost,speed:n.speed,skid:n.skid,limiter:n.limiterT>0,interior:h,rain:i.rainAmt*(f>0?1:.3),wetRoad:l,scrape:this.state==="playing"?this.scrapeLevel:0,active:f,redline:n.redline,concrete:this.env.surface==="concrete",wet:l>.3})}this.state==="playing"&&this._updateHud(t);let d=this.S.motionBlur?ae(28,100,n.speed)*(h?.55:1)*(c==="cinematic"?.4:1):0;if(this.Q.post){this.postfx.setScene(this.scene,o),this.postfx.set(d,h?.3:.38,d*.0025);let f=this._sunNdc||(this._sunNdc=new I);f.copy(i.sunDir).multiplyScalar(2e3).add(o.position).project(o);let p=i.sunDir.dot(o.getWorldDirection(this._tmpV2||(this._tmpV2=new I)))>0;this.postfx.look({night:a,golden:i.golden,wet:l,time:this._lookT=((this._lookT||0)+t)%1e3,sunNdc:p?f:null,sunColor:i.sun.color,flare:(1-a)*(1-i.overcast)*ae(-1,4,i.elevation)*(h?.7:1)}),this.postfx.render()}else this.renderer.setRenderTarget(null),this.renderer.render(this.scene,o)}_emitSpray(t,e,n){let i=this.spray,s=this.road,o=this.origin,a=Tt(.82,.16,n),l=this._sprayTmp||(this._sprayTmp={}),c=this.player.proj.s,h=(f,p,x,g,m,_,v)=>{if(g<9)return;let y=v*t*ae(9,45,g)*e;if(y=Math.floor(y)+(Math.random()<y-Math.floor(y)?1:0),!y)return;let S=f-x*m*.5;s.pos(S,p,l);let b=l.H,T=Math.sin(b)*x,R=Math.cos(b)*x,w=Math.cos(b),M=-Math.sin(b);for(let C=0;C<y;C++){let D=(Math.random()<.5?-1:1)*_*.36,k=l.X+w*D,B=l.Y+M*D,$=g*(.45+Math.random()*.2),G=T*$+(Math.random()-.5)*2.4,ct=R*$+(Math.random()-.5)*2.4;i.emit(k-o.x,l.E+.25+Math.random()*.3,-(B-o.y),G,.6+Math.random()*1.2,-ct,.55+Math.random()*.5,1.1+Math.random()*.7,2.8,a,a*1.02,a*1.06,.05+.04*e,.8,2.2)}},u=this.player.phys;h(c,this.player.proj.d,1,u.speed,this.player.dims.L,this.player.dims.W,70);let d=0;for(let f of[this.traffic.cars,this.traffic.opp])for(let p of f)if(!(Math.abs(p.s-c)>110||p.crashed)&&(h(p.s,p.d,p.opp?-1:1,p.speed,p.len,p.wid,p.truck?70:38),++d>14))return}_glows(t,e){let n=this.glows,i=this.sky,s=this.camera,o=i.night,a=this.scene.fog.far,l=s.position.x,c=s.position.y,h=s.position.z,u=(p,x,g)=>{let m=Math.hypot(p-l,x-c,g-h);return 1-ae(a*.4,a*1.05,m)*.85};n.begin();let d=.35+o*.65;if(this.traffic.forEachLamp((p,x,g,m,_)=>{let v=u(p,x,g);if(m==="tail"){let y=_*v*d;n.add(p,x,g,y,y*.06,y*.035,_>.9?.95:.55+o*.2)}else if(m==="head"){let y=_*v;n.add(p,x,g,y,y*.94,y*.82,1.5)}else{let y=v;n.add(p,x,g,y,y*.5,y*.04,.75)}}),o>.2){let p=this.highway.lampColor,x=ae(.2,.8,o),g=this.origin.x,m=this.origin.y;this.highway.forEachLamp(_=>{let v=_[0]-g,y=_[2],S=-(_[1]-m),b=u(v,y,S)*x;n.add(v,y,S,p.r*b,p.g*b,p.b*b,3.4)})}let f=this.player;if(!e&&this.camRig.mode!=="hood"){let p=f.brakeLight,x=f.lampWorld(f.model.lamps.tail,this._lamps);for(let g of x){let m=(.25+o*.4+p*.8)*d;n.add(g.x,g.y,g.z,m,m*.07,m*.04,.5+p*.45)}if(f.headOn>.1&&this.camRig.mode!=="bumper"){let g=f.lampWorld(f.model.lamps.head,[]);for(let m of g)n.add(m.x,m.y,m.z,f.headOn,f.headOn*.96,f.headOn*.9,1.1)}}n.end(s,t)}_updateHud(t){let e=this.player.phys,n=this.scoring,i=this.session,s={speed:Math.abs(e.u),gear:e.gear,rpm:e.rpm,rpmMax:this.rpmMax||9e3,redline:e.redline,boost:e.isTurbo?e.boost:0,scoring:i.mode!=="free",score:n.score,mult:n.mult,combo:n.combo,nearMisses:n.nearMisses,distText:this.fmtDist(n.distance)};if(i.mode==="endless"&&(s.best=Math.max(this.save.best.endless,Math.floor(n.score))),i.mode==="timeattack"&&(s.timer=i.timeLeft,s.best=void 0),i.mode==="challenge"){let o=i.challenge.goal,a=this._goalValue(o.type),l=o.type==="distance"?a.toFixed(1):Fe(Math.min(a,o.value));s.objective={text:`${l} / ${co[o.type](o.value)}`,frac:a/o.value}}this.hud.update(t,s)}_garageFrame(t){let e=this.garage;if(!this._gfit||(this._gfitT=(this._gfitT||0)+1)%20===0||this._gfit.screen!==this.ui.screen){let n=window.innerWidth,i=0,s=n;if(this.ui.screen==="garage"){let l=document.getElementById("car-list").getBoundingClientRect(),c=document.querySelector("#s-garage .car-info").getBoundingClientRect();i=l.right,s=c.left}else s=document.querySelector("#s-custom .custom-panel").getBoundingClientRect().left;let o=Math.max(200,s-i),a=(i+s)/2;this._gfit={screen:this.ui.screen,offset:(n/2-a)/n,fit:vt(.5*n/(.95*o),1,2.2)}}if(e.update(t,this._gfit.offset,this._gfit.fit),this.revT>=0&&this.audio.ready){this.revT+=t;let n=this.revT,i=e.def.phys.redline,s=n<.25?e.def.phys.idle:n<1?Tt(e.def.phys.idle,i*.92,(n-.25)/.75):n<1.9?Tt(i*.92,e.def.phys.idle,(n-1)/.9):e.def.phys.idle,o=n>.25&&n<1?1:0;if(n>1&&n-t<=1){e.def.engine.turbo&&this.audio.blowOff(.8,e.def.engine.flutter);let a=this.getCustom(e.def.id).exhaust,l=a==="straight"?8:a==="sport"?5:2;for(let c=0;c<l;c++)setTimeout(()=>this.audio.pop(.8),60+c*(70+Math.random()*60))}this.audio.update(t,{rpm:s,load:o,boost:o?vt((n-.4)*2,0,1):0,speed:0,skid:0,limiter:!1,interior:!1,rain:0,active:1,redline:i}),n>2.6&&(this.revT=-1)}else this.audio.ready&&this.audio.update(t,{rpm:900,load:0,boost:0,speed:0,skid:0,limiter:!1,interior:!1,rain:0,active:0,redline:7e3});this.renderer.toneMappingExposure=.9,this.renderer.setRenderTarget(null),e.render(this.renderer)}};function Kp(r){let t=document.getElementById("load-text");t&&(t.textContent=`Something went wrong while starting: ${r&&r.message?r.message:r}`),console.error(r)}window.addEventListener("error",r=>{window.NOHESI||Kp(r.error||r.message)});var t_=new bl;t_.init().catch(Kp);})();
