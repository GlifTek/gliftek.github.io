"use strict";!function(){var e="<none>",t={objCache:{},fadeAnnotations:!0,pickedObject:"",hoveredObject:"",mediaElements:{},loadedFile:"",states:[],percentage:0,openedFile:"",xrSessionAcquired:!1,xrSessionCallbacks:[]};t.screenCoords=new v3d.Vector2,t.intervalTimers={},t.AXIS_X=new v3d.Vector3(1,0,0),t.AXIS_Y=new v3d.Vector3(0,1,0),t.AXIS_Z=new v3d.Vector3(0,0,1),t.MIN_DRAG_SCALE=.001,t.SET_OBJ_ROT_EPS=1e-8,t.vec2Tmp=new v3d.Vector2,t.vec2Tmp2=new v3d.Vector2,t.vec3Tmp=new v3d.Vector3,t.vec3Tmp2=new v3d.Vector3,t.vec3Tmp3=new v3d.Vector3,t.vec3Tmp4=new v3d.Vector3,t.eulerTmp=new v3d.Euler,t.eulerTmp2=new v3d.Euler,t.quatTmp=new v3d.Quaternion,t.quatTmp2=new v3d.Quaternion,t.colorTmp=new v3d.Color,t.mat4Tmp=new v3d.Matrix4,t.planeTmp=new v3d.Plane,t.raycasterTmp=new v3d.Raycaster;var r=v3d.PL=v3d.PL||{};v3d.puzzles=r,r.procedures=r.procedures||{},r.execInitPuzzles=function(e){var t={percentage:0,output:{initOptions:{fadeAnnotations:!0,useBkgTransp:!1,preserveDrawBuf:!1,useCompAssets:!1,useFullscreen:!0,useCustomPreloader:!1,preloaderStartCb:function(){},preloaderProgressCb:function(){},preloaderEndCb:function(){}}}};return t.container=void 0!==e&&"container"in e?e.container:"",t.output.initOptions.fadeAnnotations=!0,t.output.initOptions.useBkgTransp=!0,t.output.initOptions.preserveDrawBuf=!1,t.output.initOptions.useCompAssets=!1,t.output.initOptions.useFullscreen=!0,t.output},r.init=function(r,n){var o=r;"fadeAnnotations"in(n=n||{})&&(t.fadeAnnotations=n.fadeAnnotations),this.procedures.BATCH=h,this.procedures.CHANGE_EXAMPLES_LOOP=_,this.procedures.HIDE_ALL=w,this.procedures.CHANGE_EXAMPLE_PROCEDURE=A,this.procedures.DISABLE_RENDERING=O,this.procedures.MAKE_OBJECTS=M,this.procedures.MAIN=C,this.procedures["do something"]=I,this.procedures.MAKE_LIST_TEXT=S,this.procedures.MAKE_LISTS=H,this.procedures.MAKE_HELPERS=L,this.procedures.MAKE_GRID_CUBE=j,this.procedures.MAKE_TEAPOT=W,this.procedures.SET_MATERIALS=Z,this.procedures.MAKE_TORUS=Q,this.procedures.MAKE_GRID_POLAR=J,this.procedures.MAKE_SPHERE=$,this.procedures.MAKE_OTHER_HELPERS=te,this.procedures.MAKE_BOX=re;var a,i,s,u,c,d;function l(){return function(e,t,r){const n="Add Object(s) to Group";t&&"<none>"!=t?function(){function a(r){function a(t){for(let u=0;u<t.length;u++){let c=t[u];if(null==c||"undefined"==c)console.log("[ GLIFTEK ]: The ",n,"plugin puzzle is missing an input in list slot",u+1);else if(c instanceof v3d.Mesh==1){const e=c;a(e)}else if(c instanceof v3d.Mesh==0){const e=o.scene.getObjectByName(c);a(e)}function a(t){"add"==e?i(t):"remove"==e&&s(t)}function i(e){e.groupNames.push(r)}function s(e){for(let t=0;t<e.groupNames.length;t++)e.groupNames[t]==r?e.groupNames.pop(r):console.log("[ GLIFTEK ]: The ",n,"plugin puzzle says",r,"is not an existing group.")}}}!function(){if(Array.isArray(t)){if(Array.isArray(t)){const e=t;a(e)}}else{const e=[];e.push(t),a(e)}}()}!function(e){e[0]?"GROUP"==e[0]?a(e=e[1]):"GROUP"!==e[0]&&a(e):a(e)}(r)}():console.log("[ GLIFTEK ]: The ",n,"plugin puzzle is missing an input!")}.apply(null,arguments)}function p(e){return!("AmbientLight"===e.type||""===e.name||e.isMesh&&e.isMaterialGeneratedMesh||e.isAuxClippingMesh)}function f(e){var n,o=void 0!==t;return(n=o?t.objCache[e]:null)&&n.name===e?n:(r.scene.traverse(function(r){!n&&p(r)&&r.name==e&&(n=r,o&&(t.objCache[e]=n))}),n)}function v(e){var t=[];return function e(t,n){if("string"==typeof t)n.push(t);else if(Array.isArray(t)&&"GROUP"==t[0])for(var o=(i=t[1],s=[],r.scene.traverse(function(e){if(p(e)){var t=e.groupNames;if(!t)return;for(var r=0;r<t.length;r++)t[r]==i&&s.push(e.name)}}),s),a=0;a<o.length;a++)n.push(o[a]);else if(Array.isArray(t)&&"ALL_OBJECTS"==t[0])for(var o=function(){var e=[];return r.scene.traverse(function(t){p(t)&&e.push(t.name)}),e}(),a=0;a<o.length;a++)n.push(o[a]);else if(Array.isArray(t))for(var a=0;a<t.length;a++)e(t[a],n);var i,s}(e,t),t.filter(function(e){return e})}function m(e){for(var t=v(e),n=[],o=0;o<t.length;o++){var a=t[o];if(a){var i=f(a);i&&i.resolveMultiMaterial().forEach(function(e){e.isMesh&&e.geometry&&n.push(e)})}}n.length>=2&&v3d.BufferGeometryUtils.batchMeshes(n,r.scene)}function h(){l("add",["Box","Box_transparent"],"GROUP_Box"),m(["GROUP","GROUP_Box"]),l("add",["Torus","Torus_transparent"],"GROUP_Torus"),m(["GROUP","GROUP_Torus"]),l("add",["Teapot","Teapot_transparent"],"GROUP_Teapot"),m(["GROUP","GROUP_Teapot"])}function T(e,t){if(!t)return!1;for(var r=0;r<e.length;r++){if(t==e[r])return!0;var n=f(e[r]);if(n&&"Group"==n.type)for(var o=0;o<n.children.length;o++)if(t==n.children[o].name)return!0}return!1}function E(e){return e.isMesh&&e.isMaterialGeneratedMesh&&e.parent?e.parent.name:e.name}function g(e,n,o,a,i,s){t.objClickInfo=t.objClickInfo||[],t.objClickInfo.push({objSelector:e,callbacks:[i,s]}),function(e,n,o,a){var i=r.renderer.domElement;if(i.addEventListener(n,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([i,n,l]),"mousedown"==n){var s=o?"touchstart":"touchend";i.addEventListener(s,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([i,s,l])}else if("dblclick"==n){var u=0;function c(e){var t=(new Date).getTime()-u;if(t<600&&t>0)return l(e),void(u=0);u=(new Date).getTime()}s=o?"touchstart":"touchend",i.addEventListener(s,c),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([i,s,c])}var d=new v3d.Raycaster;function l(n){if(r.getCamera()){n.preventDefault();var o=0,s=0;if(n instanceof MouseEvent){if(a&&-1==a.indexOf(n.button))return;o=n.offsetX/i.clientWidth,s=n.offsetY/i.clientHeight}else if(n instanceof TouchEvent){var u=i.getBoundingClientRect();o=(n.changedTouches[0].clientX-u.left)/u.width,s=(n.changedTouches[0].clientY-u.top)/u.height}t.screenCoords.x=2*o-1,t.screenCoords.y=2*-s+1,d.setFromCamera(t.screenCoords,r.getCamera(!0));var c=[];r.scene.traverse(function(e){c.push(e)});var l=d.intersectObjects(c);e(l,n)}}}(function(r,o){for(var a=!1,u=n?r.length:Math.min(1,r.length),c=0;c<u;c++){var d=E(r[c].object);T(v(e),d)&&(t.pickedObject=d,a=!0,i(o))}a||(t.pickedObject="",s(o))},o?"dblclick":"mousedown",!1,a)}function _(){g(s,!1,!1,[0,1,2],function(){A(t.pickedObject)},function(){})}function R(e,t){for(var r=v(e),n=0;n<r.length;n++){var o=r[n];if(o){var a=f(o);a&&(a.visible=t)}}}function y(e){r.ssaaOnPause=e,r.disableRendering(1)}function w(){R(["ALL_OBJECTS"],!1),y(!0),R("Teapot",!0),R("Teapot_transparent",!0)}function A(e){a=String(e)+"_transparent",R(e,!1),R(a,!1),c=s.length-1,(d=s.indexOf(e))<c?(u=s[d+1],I()):d>=c&&(u=s[0],I())}function b(e,t){var n;if(Array.isArray(e)&&"CONTAINER"==e[0]){if(null!==r)n=r.container;else if("undefined"!=typeof _initGlob){e=_initGlob.container;n=t?parent.document.getElementById(e):document.getElementById(e)}}else n=Array.isArray(e)&&"WINDOW"==e[0]?t?parent:window:Array.isArray(e)&&"DOCUMENT"==e[0]?t?parent.document:document:Array.isArray(e)&&"BODY"==e[0]?t?parent.document.body:document.body:Array.isArray(e)&&"QUERYSELECTOR"==e[0]?t?parent.document.querySelector(e):document.querySelector(e):t?parent.document.getElementById(e):document.getElementById(e);return n}function P(e,t,r,n){for(var o=function(e,t){var r=[];if(Array.isArray(e)&&"CONTAINER"!=e[0]&&"WINDOW"!=e[0]&&"DOCUMENT"!=e[0]&&"BODY"!=e[0]&&"QUERYSELECTOR"!=e[0])for(var n=0;n<e.length;n++)r.push(b(e[n],t));else r.push(b(e,t));return r}(t,r),a=0;a<o.length;a++){var i=o[a];i&&(i.addEventListener(e,n),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([i,e,n]))}}function O(){P("pointerdown",["CONTAINER"],!1,function(e){r.enableRendering()}),P("pointerup",["CONTAINER"],!1,function(e){y(!0)})}function M(){var e,t;W(),Q(),re(),e=.1,t=function(){Z(),w(),_()},window.setTimeout(t,1e3*e)}function C(){var e;e=1.5,r.useHiDPIRenderPass||r.renderer.setPixelRatio(e),r.postprocessing&&r.postprocessing.composer.setPixelRatio(e),r.onResize(),R("Suzanne",!1),S(),L(),M(),O()}function I(){i=String(u)+"_transparent",R(u,!0),R(i,!0)}function S(){s=["Teapot","Torus","Box"],["Teapot","Torus","Box","Teapot_transparent","Torus_transparent","Box_transparent"],["gridHelper_1","gridHelper_2","gridHelper_3"]}function H(){s=["Teapot","Torus","Sphere"],["gridHelper_1","gridHelper_2","gridHelper_3"]}function L(){j(),J(),te()}function G(){return function(e,t,r,n){!function(){"undefined"==typeof gridHelperNumber?window.gridHelperNumber=1:gridHelperNumber++;let a=new v3d.Object3D,i=new v3d.GridHelper(e,t,n,r);i.raycast=function(){},i.rotateX(v3d.Math.degToRad(-90)),a.add(i),a.rotateX(v3d.Math.degToRad(-90)),a.name="gridHelper_"+gridHelperNumber,o.scene.add(a)}()}.apply(null,arguments)}function N(e,t,r,n){if(t==r)return e;var o=e.y,a=e.z;return"Z_UP_RIGHT"==t&&"Y_UP_RIGHT"==r?(e.y=a,e.z=n?o:-o):"Y_UP_RIGHT"==t&&"Z_UP_RIGHT"==r?(e.y=n?a:-a,e.z=o):console.error("coordsTransform: Unsupported coordinate space"),e}var B,U,x,z=(B=new v3d.Euler,U=new v3d.Euler,x=new v3d.Vector3,function(e,t){var r=B.copy(e).reorder("YZX"),n=U.copy(r).makeAlternative(),o=r.toVector3(x).lengthSq(),a=n.toVector3(x).lengthSq();return t.copy(o<a?r:n),N(t,"Y_UP_RIGHT","Z_UP_RIGHT")});function D(){this._userRotation=new v3d.Euler(0,0,0,"ZYX"),this._actualRotation=new v3d.Euler}function k(e,n,o,a){var i=o[0],s=o[1],u=o[2],c=v(e);function d(e,t,r){a?"scale"!=n?e[n][t]+=r:e[n][t]*=r:e[n][t]=r}var l=t.vec3Tmp.set(Number(""!==i),Number(""!==s),Number(""!==u)),p=t.vec3Tmp2.set(i||0,s||0,u||0);"rotation"===n&&p.multiplyScalar(v3d.MathUtils.DEG2RAD);var m,h=(m=r.scene)&&"v3d"in m.userData&&"coordSystem"in m.userData.v3d?m.userData.v3d.coordSystem:"Z_UP_RIGHT";N(l,h,"Y_UP_RIGHT",!0),N(p,h,"Y_UP_RIGHT","scale"===n);for(var T=0;T<c.length;T++){var E=c[T];if(E){var g=f(E);if(g){if("rotation"===n&&"Z_UP_RIGHT"==h)N(R=z(g.rotation,t.eulerTmp),h,"Y_UP_RIGHT"),l.x&&(R.x=a?R.x+p.x:p.x),l.y&&(R.y=a?R.y+p.y:p.y),l.z&&(R.z=a?R.z+p.z:p.z),R.order="YZX",R.reorder(g.rotation.order),g.rotation.copy(R);else if("rotation"===n&&"Y_UP_RIGHT"==h){var _=D.initObject(g),R=_.getUserRotation(t.eulerTmp);l.x&&(R.x=a?R.x+p.x:p.x),l.y&&(R.y=a?R.y+p.y:p.y),l.z&&(R.z=a?R.z+p.z:p.z),_.setUserRotation(R),_.getActualRotation(g.rotation)}else l.x&&d(g,"x",p.x),l.y&&d(g,"y",p.y),l.z&&d(g,"z",p.z);g.updateMatrixWorld(!0)}}}}function j(){"teal","cyan",G(10,10,"teal","cyan"),k("gridHelper_1","rotation",["",90,""],!1),k("gridHelper_1","position",[-5,"",5],!1),G(10,10,"teal","cyan"),k("gridHelper_2","rotation",["",-90,-90],!1),k("gridHelper_2","position",["",5,5],!1),G(10,10,"teal","cyan"),k("Cube","position",["","",1],!1)}function V(e,n,o,a,i,s,u,c,d,l,p){var f,v,m=r.scene.getObjectByName(n);switch(m&&m.parent.remove(m),e){case"BOX":v=new v3d.BoxGeometry(o,a,i);break;case"CAMERA":var h=r.container.offsetWidth/r.container.offsetHeight;if("PERSPECTIVE"==d)f=new v3d.PerspectiveCamera(p,h,1,1e3);else{o=p*h;f=new v3d.OrthographicCamera(-o/2,o/2,p/2,-p/2,-1e3,1e3)}f.lookAt(t.vec3Tmp.set(0,0,0));break;case"CIRCLE":v=new v3d.CircleGeometry(s,c);break;case"CONE":v=new v3d.ConeGeometry(s,a,c);break;case"CYLINDER":v=new v3d.CylinderGeometry(s,s,a,c);break;case"EMPTY":f=new v3d.Object3D;break;case"LIGHT":var T=16777215;switch(l){case"AMBIENT":f=new v3d.AmbientLight(T,.5);break;case"AREA":v3d.RectAreaLightUniformsLib.init(LTC_MAT_1,LTC_MAT_2),f=new v3d.RectAreaLight(T,.5,1,1);break;case"DIRECTIONAL":f=new v3d.DirectionalLight(T,.5);break;case"HEMISPHERE":f=new v3d.HemisphereLight(T,0,.5);break;case"POINT":f=new v3d.PointLight(T,.5);break;case"SPOT":f=new v3d.SpotLight(T,.5)}f.isFreeLight=!0;break;case"PLANE":v=new v3d.PlaneGeometry(o,a,1,1);break;case"SPHERE":v=new v3d.SphereGeometry(s,32,32);break;case"TEAPOT":v=new v3d.TeapotGeometry(o);break;case"TORUS":v=new v3d.TorusGeometry(s,u,32,32)}if(v){var E=new v3d.MeshStandardMaterial({color:"white",roughness:1,metalness:0,side:"CIRCLE"==e||"PLANE"==e||"TEAPOT"==e?v3d.DoubleSide:v3d.FrontSide});E.name=n+"Material",f=new v3d.Mesh(v,E)}f.name=n,r.scene.add(f),t.objCache={}}function F(t,r){if(t){var n=f(t);if(n){if(r&&r!==e){var o=f(r);if(!o)return}else n.traverseAncestors(function(e){"Scene"==e.type&&(o=e)});var a=new v3d.Matrix4;a.copy(o.matrixWorld).invert(),a.multiply(n.matrixWorld),a.decompose(n.position,n.quaternion,n.scale),o.add(n),n.updateMatrixWorld(!0)}}}function W(){V("TEAPOT","Teapot",2,0,0,0,0,0,"PERSPECTIVE","AMBIENT",0),V("TEAPOT","Teapot_transparent",2,0,0,0,0,0,"PERSPECTIVE","AMBIENT",0),F("Teapot_transparent","Teapot"),k("Teapot","position",["","",5],!1)}function X(e,t,n,o,a,i){if(!(function(e){var t=v3d.SceneUtils.getMaterialByName(r,e);return t?t.isMeshNodeMaterial?Object.keys(t.nodeRGBMap):t.isMeshStandardMaterial?["color","emissive"]:[]:[]}(e).indexOf(t)<0)){if(i){var s=new v3d.Color(i);s.convertSRGBToLinear(),n=s.r,o=s.g,a=s.b}for(var u=v3d.SceneUtils.getMaterialsByName(r,e),c=0;c<u.length;c++){var d=u[c];if(d.isMeshNodeMaterial){var l=d.nodeRGBMap[t];d.nodeRGB[l].x=n,d.nodeRGB[l].y=o,d.nodeRGB[l].z=a}else d[t].r=n,d[t].g=o,d[t].b=a;d.needsUpdate=!0,null!==r.scene&&d===r.scene.worldMaterial&&r.updateEnvironment(d)}}}function Y(e){for(var t=v(e),r=0;r<t.length;r++){var n=t[r];if(n){var o=f(n);if(o&&(o=o.resolveMultiMaterial()[0]).material&&"string"==typeof o.material.name)return o.material.name}}return""}function K(){return function(e,t){e&&"<none>"!=e?o.scene.traverse(function(r){r instanceof v3d.Mesh&&r.material.name==e&&(r.material.opacity=t,r.material.transparent=!0,r.material.needsUpdate=!0)}):console.log("[ GLIFTEK ]: The","Set Material Transparency","plugin puzzle is missing an input!")}.apply(null,arguments)}function q(){return function(e,t,r,n,a,i,s){let u;return e&&t&&s&&r&&n&&i&&s?function(){let c={segU:{value:r},segV:{value:n},isWire:{value:a},wireWidthFactor:{value:i},wireColor:{value:new THREE.Color(s)}},d=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,onBeforeCompile:e=>{e.uniforms.segU=c.segU,e.uniforms.segV=c.segV,e.uniforms.wireColor=c.wireColor,e.uniforms.isWire=c.isWire,e.uniforms.wireWidthFactor=c.wireWidthFactor,e.fragmentShader=`\n\n                uniform float segU;\n                uniform float segV;\n                uniform vec3 wireColor;\n                uniform float isWire;\n                uniform float wireWidthFactor;\n\n                ${e.fragmentShader}\n                `.replace("#include <dithering_fragment>","#include <dithering_fragment>\n\n                    // http://madebyevan.com/shaders/grid/\n                    vec2 coord = vUv * vec2(segU, segV);\n\n                    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);\n                    float line = min(grid.x, grid.y) / wireWidthFactor;\n                    line = 1.0 - min(line, 1.0);\n\n                    if (isWire > 0.5 && line < 0.5) discard;\n                    if (isWire > 0.5) gl_FragColor = vec4(0);\n                    gl_FragColor = mix(gl_FragColor, vec4(wireColor, 1.0), line);\n                ")}});d.color=new THREE.Color(t),d.defines={USE_UV:""},d.opacity=0,(u=o.scene.getObjectByName(e)).material=d,window.quadMaterialWin=d}():console.log("Quad Material Puzzle missing input!"),u}.apply(null,arguments)}function Z(){"#29293d","white",X("Teapot_transparentMaterial","color",0,0,0,"#29293d"),K(Y("Teapot_transparent"),.6),X("Torus_transparentMaterial","color",0,0,0,"#29293d"),K(Y("Torus_transparent"),.8),X("Box_transparentMaterial","color",0,0,0,"#29293d"),K(Y("Box_transparent"),.8),q("Teapot","black",4,4,!0,3,"white"),q("Torus","black",8,8,!0,3,"white"),q("Box","black",4,4,!0,3,"white")}function Q(){V("TORUS","Torus",0,0,0,2,1,0,"PERSPECTIVE","AMBIENT",0),V("TORUS","Torus_transparent",0,0,0,2,1,0,"PERSPECTIVE","AMBIENT",0),F("Torus_transparent","Torus"),k("Torus","position",["","",5],!1),k("Torus","rotation",[90,"",""],!1)}function J(){!function(){(function(e,t,r,n,a,i){!function(){"undefined"==typeof polarGridHelperNumber?window.polarGridHelperNumber=1:polarGridHelperNumber++;let s=new v3d.Object3D,u=new v3d.PolarGridHelper(e,t,r,n,a,i);u.raycast=function(){},u.rotateX(v3d.Math.degToRad(-90)),s.add(u),s.rotateX(v3d.Math.degToRad(-90)),s.name="polarGridHelper_"+polarGridHelperNumber,o.scene.add(s)}()}).apply(null,arguments)}(5,8,6,64,"cyan","cyan")}function $(){V("SPHERE","Sphere",0,0,0,2,0,0,"PERSPECTIVE","AMBIENT",0),k("Sphere","position",["","",5],!1)}function ee(e,t,r){return[e,t,r]}function te(){!function(){(function(e,t,r,n,a,i){!function(){"undefined"==typeof arrowHelperNumber?window.arrowHelperNumber=1:arrowHelperNumber++;const a=new THREE.Vector3(e[0],e[1],e[2]);a.normalize();const i=new THREE.Vector3(t[0],t[1],t[2]);let s=new v3d.ArrowHelper(a,i,r,n),u=new v3d.Object3D;u.add(s),u.rotateX(v3d.Math.degToRad(-90)),u.name="arrowHelper_"+arrowHelperNumber,o.scene.add(u)}()}).apply(null,arguments)}(ee(0,-3,0),ee(0,0,0),3,"#4682B4",.5,.25),function(){(function(e){!function(){"undefined"==typeof axesHelperNumber?window.axesHelperNumber=1:axesHelperNumber++;let t=new v3d.AxesHelper(e);t.raycast=function(){};let r=new v3d.Object3D;r.add(t),r.rotateX(v3d.Math.degToRad(-90)),r.name="axesHelper_"+axesHelperNumber,o.scene.add(r)}()}).apply(null,arguments)}(3)}function re(){V("BOX","Box",4,4,4,0,0,0,"PERSPECTIVE","AMBIENT",0),V("BOX","Box_transparent",4,4,4,0,0,0,"PERSPECTIVE","AMBIENT",0),F("Box_transparent","Box"),k("Box","position",["","",5],!1)}Object.assign(D,{initObject:function(e){void 0===e.userData.v3d.puzzles&&(e.userData.v3d.puzzles={}),void 0===e.userData.v3d.puzzles.rotationInterface&&(e.userData.v3d.puzzles.rotationInterface=new D);var t=e.userData.v3d.puzzles.rotationInterface;return t.updateFromObject(e),t}}),Object.assign(D.prototype,{updateFromObject:function(e){this._actualRotation.equalsEps(e.rotation,1e-8)||(this._actualRotation.copy(e.rotation),this._updateUserRotFromActualRot())},getActualRotation:function(e){return e.copy(this._actualRotation)},setUserRotation:function(e){this._userRotation.set(e.x,e.y,e.z),this._updateActualRotFromUserRot()},getUserRotation:function(e){return e.copy(this._userRotation)},_updateUserRotFromActualRot:function(){var e=this._userRotation.order;this._userRotation.copy(this._actualRotation).reorder(e)},_updateActualRotFromUserRot:function(){var e=this._actualRotation.order;this._actualRotation.copy(this._userRotation).reorder(e)}}),C()}}();