"use strict";!function(){var LIST_NONE="<none>",_pGlob={objCache:{},fadeAnnotations:!0,pickedObject:"",hoveredObject:"",mediaElements:{},loadedFile:"",states:[],percentage:0,openedFile:"",xrSessionAcquired:!1,xrSessionCallbacks:[]};_pGlob.screenCoords=new v3d.Vector2,_pGlob.intervalTimers={},_pGlob.AXIS_X=new v3d.Vector3(1,0,0),_pGlob.AXIS_Y=new v3d.Vector3(0,1,0),_pGlob.AXIS_Z=new v3d.Vector3(0,0,1),_pGlob.MIN_DRAG_SCALE=.001,_pGlob.SET_OBJ_ROT_EPS=1e-8,_pGlob.vec2Tmp=new v3d.Vector2,_pGlob.vec2Tmp2=new v3d.Vector2,_pGlob.vec3Tmp=new v3d.Vector3,_pGlob.vec3Tmp2=new v3d.Vector3,_pGlob.vec3Tmp3=new v3d.Vector3,_pGlob.vec3Tmp4=new v3d.Vector3,_pGlob.eulerTmp=new v3d.Euler,_pGlob.eulerTmp2=new v3d.Euler,_pGlob.quatTmp=new v3d.Quaternion,_pGlob.quatTmp2=new v3d.Quaternion,_pGlob.colorTmp=new v3d.Color,_pGlob.mat4Tmp=new v3d.Matrix4,_pGlob.planeTmp=new v3d.Plane,_pGlob.raycasterTmp=new v3d.Raycaster;var PL=v3d.PL=v3d.PL||{};v3d.puzzles=PL,PL.procedures=PL.procedures||{},PL.execInitPuzzles=function(e){var n={percentage:0,output:{initOptions:{fadeAnnotations:!0,useBkgTransp:!1,preserveDrawBuf:!1,useCompAssets:!1,useFullscreen:!0,useCustomPreloader:!1,preloaderStartCb:function(){},preloaderProgressCb:function(){},preloaderEndCb:function(){}}}};return n.container=void 0!==e&&"container"in e?e.container:"",n.output.initOptions.fadeAnnotations=!0,n.output.initOptions.useBkgTransp=!0,n.output.initOptions.preserveDrawBuf=!1,n.output.initOptions.useCompAssets=!1,n.output.initOptions.useFullscreen=!0,n.output},PL.init=function(appInstance,initOptions){var app=appInstance;initOptions=initOptions||{},"fadeAnnotations"in initOptions&&(_pGlob.fadeAnnotations=initOptions.fadeAnnotations),this.procedures.HOVER_NEXT=HOVER_NEXT,this.procedures.CHANGE_OBJECT_WIREFRAME=CHANGE_OBJECT_WIREFRAME,this.procedures.DISABLE_RENDERING=DISABLE_RENDERING,this.procedures.CHANGE_EXAMPLES=CHANGE_EXAMPLES,this.procedures.CHANGE_VISIBILITY_OF_ITEMS=CHANGE_VISIBILITY_OF_ITEMS,this.procedures.CHANGE_VISIBILITY_OF_HELPERS=CHANGE_VISIBILITY_OF_HELPERS,this.procedures.SHOW_OBJECTS=SHOW_OBJECTS,this.procedures.FADE_IN_SCREEN=FADE_IN_SCREEN,this.procedures.MAIN=MAIN,this.procedures.HIDE_ALL_OBJECTS=HIDE_ALL_OBJECTS,this.procedures.MAKE_LISTS=MAKE_LISTS,this.procedures.MAKE_HELPERS=MAKE_HELPERS,this.procedures.MAKE_OBJECTS=MAKE_OBJECTS,this.procedures.MAKE_INFINITE_GRID=MAKE_INFINITE_GRID,this.procedures.MAKE_TEAPOT=MAKE_TEAPOT,this.procedures.SET_MATERIALS=SET_MATERIALS,this.procedures.MAKE_GRID_POLAR=MAKE_GRID_POLAR,this.procedures.MAKE_TORUS=MAKE_TORUS,this.procedures.MAKE_BOX=MAKE_BOX,this.procedures.MAKE_OTHER_HELPERS=MAKE_OTHER_HELPERS,this.procedures.MAKE_GRID_CUBE=MAKE_GRID_CUBE;var PROC={HOVER_NEXT:HOVER_NEXT,CHANGE_OBJECT_WIREFRAME:CHANGE_OBJECT_WIREFRAME,DISABLE_RENDERING:DISABLE_RENDERING,CHANGE_EXAMPLES:CHANGE_EXAMPLES,CHANGE_VISIBILITY_OF_ITEMS:CHANGE_VISIBILITY_OF_ITEMS,CHANGE_VISIBILITY_OF_HELPERS:CHANGE_VISIBILITY_OF_HELPERS,SHOW_OBJECTS:SHOW_OBJECTS,FADE_IN_SCREEN:FADE_IN_SCREEN,MAIN:MAIN,HIDE_ALL_OBJECTS:HIDE_ALL_OBJECTS,MAKE_LISTS:MAKE_LISTS,MAKE_HELPERS:MAKE_HELPERS,MAKE_OBJECTS:MAKE_OBJECTS,MAKE_INFINITE_GRID:MAKE_INFINITE_GRID,MAKE_TEAPOT:MAKE_TEAPOT,SET_MATERIALS:SET_MATERIALS,MAKE_GRID_POLAR:MAKE_GRID_POLAR,MAKE_TORUS:MAKE_TORUS,MAKE_BOX:MAKE_BOX,MAKE_OTHER_HELPERS:MAKE_OTHER_HELPERS,MAKE_GRID_CUBE:MAKE_GRID_CUBE},list_number,LIST_to_use,LIST_objects,obj_to_show_transparent,EXEC_updateQuadWireframe,grid_Cube_color,wireframe_object,obj_number,list_length,_g_list_number,current_object,LIST_cube_grid_helpers,grid_Cube_Center_color,obj_to_show,TOGGLE_wireframe_is_see_through,LIST_polar_grid_helpers,COLOR_object_transparent,LIST_helpers,COLOR_object_wireframe;function getElements(e,n){var r=[];if(Array.isArray(e)&&"CONTAINER"!=e[0]&&"WINDOW"!=e[0]&&"DOCUMENT"!=e[0]&&"BODY"!=e[0]&&"QUERYSELECTOR"!=e[0])for(var t=0;t<e.length;t++)r.push(getElement(e[t],n));else r.push(getElement(e,n));return r}function getElement(e,n){var r;if(Array.isArray(e)&&"CONTAINER"==e[0]){if(null!==appInstance)r=appInstance.container;else if("undefined"!=typeof _initGlob){e=_initGlob.container;r=n?parent.document.getElementById(e):document.getElementById(e)}}else r=Array.isArray(e)&&"WINDOW"==e[0]?n?parent:window:Array.isArray(e)&&"DOCUMENT"==e[0]?n?parent.document:document:Array.isArray(e)&&"BODY"==e[0]?n?parent.document.body:document.body:Array.isArray(e)&&"QUERYSELECTOR"==e[0]?n?parent.document.querySelector(e):document.querySelector(e):n?parent.document.getElementById(e):document.getElementById(e);return r}function setHTMLElemStyle(e,n,r,t){for(var o=getElements(r,t),a=0;a<o.length;a++){var i=o[a];i&&i.style&&(i.style[e]=n)}}function notIgnoredObj(e){return!("AmbientLight"===e.type||""===e.name||e.isMesh&&e.isMaterialGeneratedMesh||e.isAuxClippingMesh)}function getObjectByName(e){var n,r=void 0!==_pGlob;return(n=r?_pGlob.objCache[e]:null)&&n.name===e?n:(appInstance.scene.traverse(function(t){!n&&notIgnoredObj(t)&&t.name==e&&(n=t,r&&(_pGlob.objCache[e]=n))}),n)}function getAllObjectNames(){var e=[];return appInstance.scene.traverse(function(n){notIgnoredObj(n)&&e.push(n.name)}),e}function getObjectNamesByGroupName(e){var n=[];return appInstance.scene.traverse(function(r){if(notIgnoredObj(r)){var t=r.groupNames;if(!t)return;for(var o=0;o<t.length;o++){t[o]==e&&n.push(r.name)}}}),n}function retrieveObjectNames(e){var n=[];return retrieveObjectNamesAcc(e,n),n.filter(function(e){return e})}function retrieveObjectNamesAcc(e,n){if("string"==typeof e)n.push(e);else if(Array.isArray(e)&&"GROUP"==e[0])for(var r=getObjectNamesByGroupName(e[1]),t=0;t<r.length;t++)n.push(r[t]);else if(Array.isArray(e)&&"ALL_OBJECTS"==e[0])for(r=getAllObjectNames(),t=0;t<r.length;t++)n.push(r[t]);else if(Array.isArray(e))for(t=0;t<e.length;t++)retrieveObjectNamesAcc(e[t],n)}function initObjectPicking(e,n,r,t){var o=appInstance.renderer.domElement;if(o.addEventListener(n,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([o,n,l]),"mousedown"==n){var a=r?"touchstart":"touchend";o.addEventListener(a,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([o,a,l])}else if("dblclick"==n){var i=0;function s(e){var n=(new Date).getTime()-i;if(n<600&&n>0)return l(e),void(i=0);i=(new Date).getTime()}a=r?"touchstart":"touchend";o.addEventListener(a,s),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([o,a,s])}var c=new v3d.Raycaster;function l(n){if(appInstance.getCamera()){n.preventDefault();var r=0,a=0;if(n instanceof MouseEvent){if(t&&-1==t.indexOf(n.button))return;r=n.offsetX/o.clientWidth,a=n.offsetY/o.clientHeight}else if(n instanceof TouchEvent){var i=o.getBoundingClientRect();r=(n.changedTouches[0].clientX-i.left)/i.width,a=(n.changedTouches[0].clientY-i.top)/i.height}_pGlob.screenCoords.x=2*r-1,_pGlob.screenCoords.y=2*-a+1,c.setFromCamera(_pGlob.screenCoords,appInstance.getCamera(!0));var s=[];appInstance.scene.traverse(function(e){s.push(e)});var l=c.intersectObjects(s);e(l,n)}}}function objectsIncludeObj(e,n){if(!n)return!1;for(var r=0;r<e.length;r++){if(n==e[r])return!0;var t=getObjectByName(e[r]);if(t&&"Group"==t.type)for(var o=0;o<t.children.length;o++)if(n==t.children[o].name)return!0}return!1}function getPickedObjectName(e){return e.isMesh&&e.isMaterialGeneratedMesh&&e.parent?e.parent.name:e.name}function registerOnHover(e,n,r,t){_pGlob.objHoverInfo=_pGlob.objHoverInfo||[],_pGlob.objHoverInfo.push({objSelector:e,callbacks:[r,t],xRay:n})}function HOVER_NEXT(){registerOnHover(["black space",LIST_objects],!0,function(){setHTMLElemStyle("cursor","pointer",["CONTAINER"],!1)},function(){setHTMLElemStyle("cursor","default",["CONTAINER"],!1)})}function setWireframeFunction(){return function(objInput,typeVar){const puzzleName="Quad Wireframe Toggle";function mainFunction(){let isWireInput_boolean,objArray=[];function arrayCheck(){Array.isArray(objInput)?Array.isArray(objInput)&&objInput.forEach(e=>{meshCheck(e)}):(objArray.push(objInput),objArray.forEach(e=>{meshCheck(e)}))}function meshCheck(objArrayItem){let objInputObj;function checkWireframe(obj){if(void 0!==window.WIN_quadWireframeFunction){function getKeyValue(myKey){let result=eval(`quadWireframe_Objects_Data.${obj.name}.${myKey}`);return result}function setKeyValue(myKey,myValue){let result=eval(`quadWireframe_Objects_Data.${obj.name}.${myKey} = ${myValue}`)}let myProperty=`${obj.name}`;console.log("myProperty:",myProperty),quadWireframe_Objects_Data.hasOwnProperty(myProperty)&&(console.log(obj.name," is in : quadWireframe_Objects_Data"),isWireInput_boolean=getKeyValue("isWireInput"),console.log(obj.name," isWireInput_boolean : ",isWireInput_boolean),setKeyValue("isWireInput","!isWireInput_boolean"),WIN_quadWireframeFunction(obj,!isWireInput_boolean,!0))}else void 0===window.WIN_quadWireframeFunction&&alert("[ GLIFTEK ] Plugins - Quad Wireframe Toggle needs a 'Quad Wireframe Shader' plugin used somewhere BEFORE it in the app!")}objArrayItem instanceof v3d.Mesh?(objInputObj=objArrayItem,checkWireframe(objInputObj)):(objInputObj=app.scene.getObjectByName(objArrayItem),checkWireframe(objInputObj))}arrayCheck()}objInput?mainFunction():console.log("[ GLIFTEK ]: The",puzzleName,"plugin puzzle is missing an input!")}.apply(null,arguments)}function registerOnClick(e,n,r,t,o,a){_pGlob.objClickInfo=_pGlob.objClickInfo||[],_pGlob.objClickInfo.push({objSelector:e,callbacks:[o,a]}),initObjectPicking(function(r,t){for(var i=!1,s=n?r.length:Math.min(1,r.length),c=0;c<s;c++){var l=getPickedObjectName(r[c].object);objectsIncludeObj(retrieveObjectNames(e),l)&&(_pGlob.pickedObject=l,i=!0,o(t))}i||(_pGlob.pickedObject="",a(t))},r?"dblclick":"mousedown",!1,t)}function CHANGE_OBJECT_WIREFRAME(){registerOnClick(LIST_objects,!1,!1,[0,1,2],function(){setWireframeFunction(wireframe_object=LIST_objects[LIST_objects.indexOf(_pGlob.pickedObject)],"")},function(){})}function disableRendering(e){appInstance.ssaaOnPause=e,appInstance.disableRendering(1)}function enableRendering(){appInstance.enableRendering()}function whenMoved(e,n,r,t,o){function a(e,n,r){if(_pGlob.objMovementInfos[e]){(t=_pGlob.objMovementInfos[e]).prevPosX=n.position.x,t.prevPosY=n.position.y,t.prevPosZ=n.position.z,t.prevRotX=n.rotation.x,t.prevRotY=n.rotation.y,t.prevRotZ=n.rotation.z,t.prevScaX=n.scale.x,t.prevScaY=n.scale.y,t.prevScaZ=n.scale.z,t.prevIsMoving=r}else{var t={prevPosX:n.position.x,prevPosY:n.position.y,prevPosZ:n.position.z,prevRotX:n.rotation.x,prevRotY:n.rotation.y,prevRotZ:n.rotation.z,prevScaX:n.scale.x,prevScaY:n.scale.y,prevScaZ:n.scale.z,prevIsMoving:r};_pGlob.objMovementInfos[e]=t}return t}function i(e,i,s){var c=_pGlob.objMovementInfos[e]||a(e,i,!1),l=n*s,u=Math.abs(i.position.x-c.prevPosX)>l||Math.abs(i.position.y-c.prevPosY)>l||Math.abs(i.position.z-c.prevPosZ)>l||Math.abs(i.rotation.x-c.prevRotX)>l||Math.abs(i.rotation.y-c.prevRotY)>l||Math.abs(i.rotation.z-c.prevRotZ)>l||Math.abs(i.scale.x-c.prevScaX)>l||Math.abs(i.scale.y-c.prevScaY)>l||Math.abs(i.scale.z-c.prevScaZ)>l;!c.prevIsMoving&&u?(r(e),a(e,i,!0)):c.prevIsMoving&&u?(t(e),a(e,i,!0)):c.prevIsMoving&&!u?(o(e),a(e,i,!1)):a(e,i,!1)}_pGlob.objMovementInfos=_pGlob.objMovementInfos||{},function(e){function n(n,r){for(var t=retrieveObjectNames(e),o=0;o<t.length;o++){var a=t[o],s=getObjectByName(a);if(!s)return;i(a,s,n)}}appInstance.renderCallbacks.push(n),v3d.PL.editorRenderCallbacks&&v3d.PL.editorRenderCallbacks.push([appInstance,n])}(e)}function eventHTMLElem(e,n,r,t){for(var o=getElements(n,r),a=0;a<o.length;a++){var i=o[a];i&&(i.addEventListener(e,t),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([i,e,t]))}}function DISABLE_RENDERING(){disableRendering(!1),whenMoved("Camera",.01,function(){enableRendering()},function(){},function(){disableRendering(!1)}),eventHTMLElem("pointerdown",["CONTAINER"],!1,function(e){enableRendering()}),eventHTMLElem("pointerup",["CONTAINER"],!1,function(e){disableRendering(!1)})}function CHANGE_EXAMPLES(){registerOnClick("black space",!0,!1,[0,1,2],function(){CHANGE_VISIBILITY_OF_ITEMS(obj_number=LIST_objects.indexOf(current_object),LIST_objects),CHANGE_VISIBILITY_OF_HELPERS(obj_number,LIST_helpers)},function(){})}function changeVis(e,n){for(var r=retrieveObjectNames(e),t=0;t<r.length;t++){var o=r[t];if(o){var a=getObjectByName(o);a&&(a.visible=n)}}}function CHANGE_VISIBILITY_OF_ITEMS(e,n){changeVis(n[e],!1),list_length=n.length-1,obj_number<list_length?(obj_to_show=n[obj_number+1],SHOW_OBJECTS(),current_object=obj_to_show):obj_number>=list_length&&(obj_to_show=n[0],SHOW_OBJECTS(),current_object=obj_to_show)}function CHANGE_VISIBILITY_OF_HELPERS(e,n){changeVis(n[e],!1),list_length=n.length-1,obj_number<list_length?(obj_to_show=n[obj_number+1],SHOW_OBJECTS()):obj_number>=list_length&&(obj_to_show=n[0],SHOW_OBJECTS())}function SHOW_OBJECTS(){obj_to_show_transparent=String(obj_to_show)+"_transparent",console.log("obj_to_show: "+String(obj_to_show)),changeVis(obj_to_show,!0)}function setScreenScale(e){appInstance.useHiDPIRenderPass||appInstance.renderer.setPixelRatio(e),appInstance.postprocessing&&appInstance.postprocessing.composer.setPixelRatio(e),appInstance.onResize()}function screenFade(){return function(screenFade_ID_Input,screenFade_Z_Index_Input,typeDropdown,screenFade_Pause_Input,screenFade_Duration_Input,colorInput_1_PICKER,colorInput_1_TEXT,delete_When_Done_Checkbox,whenDone_Statement_Input){const puzzleName="Print To Modal Card";function mainFunction(){function setColorFromInputs(e,n){let r;return void 0===e||null==typeof e||""==e?(r=n,console.log(n,"supplied. using PICKER.")):(r=e,console.log(e,"supplied. using TEXT.")),r}const colorInput_1esc=setColorFromInputs(colorInput_1_TEXT,colorInput_1_PICKER);console.log("colorInput_1esc:",colorInput_1esc);let computedColorDiv=document.createElement("div");function RGBA_from_color_input(e,n){if("transparent"==e||null==e||void 0===e)return"rgba(0, 0, 0, 0)";{computedColorDiv.style.color=e;let r=window.getComputedStyle(computedColorDiv).color;console.log("computedColor for: ",e,":",r);let t=r.length,o="rgba("+r.substring(4,t-1)+", "+n+")";return console.log("computedColor_RGBA for: ",e,":",o),o}}computedColorDiv.id="computedColorDiv-"+screenFade_ID_Input,document.body.appendChild(computedColorDiv);const screenFadeColor=RGBA_from_color_input(colorInput_1esc,1);console.log("screenFadeColor: ",screenFadeColor),computedColorDiv.remove();let styleVar=setstyleVar(),style=document.createElement("style");style.id="screenFade-"+screenFade_ID_Input,style.innerHTML=styleVar,document.head.appendChild(style);let screenFade_Div=document.createElement("div");function getBGcolor(){"in"==typeDropdown?(screenFade_Div.style.backgroundColor="rgba(0,0,0,0)",console.log("screenFade_Div.style.backgroundColor:",screenFade_Div.style.backgroundColor)):"out"==typeDropdown&&(screenFade_Div.style.backgroundColor=screenFadeColor,console.log("screenFade_Div.style.backgroundColor:",screenFade_Div.style.backgroundColor))}screenFade_Div.id=screenFade_ID_Input,screenFade_Div.className="screenFade-"+screenFade_ID_Input,getBGcolor();const container=document.getElementById("v3d-container");function animateScreenFade(){const animationType="animation-screen-fade-"+typeDropdown+"-"+screenFade_ID_Input;function screenFadeDisplay(){"in"==typeDropdown?(screenFade_Div.style.display="block",console.log("screenFade_Div.style.display:",screenFade_Div.style.display),deleteWhenDone()):"out"==typeDropdown&&(screenFade_Div.style.display="none",console.log("screenFade_Div.style.display:",screenFade_Div.style.display),deleteWhenDone())}function deleteWhenDone(){1==delete_When_Done_Checkbox&&screenFade_Div.remove()}screenFade_Div.style.animationName=animationType,console.log("screenFade_Div.style.animationName:",screenFade_Div.style.animationName),screenFade_Div.addEventListener("animationend",function(event){event.animationName;{screenFade_Div.removeEventListener("animationend",null),screenFadeDisplay();let screenFadeState=eval(`${screenFade_ID_Input}.faded = '${typeDropdown}';`);console.log("screenFadeState:",screenFadeState),whenDone_Statement_Input()}})}function setstyleVar(){return`\n                #computedColorDiv-${screenFade_ID_Input}\n                {\n                    height: 0px;\n                    width: 0px;\n                    display: none;\n                    z-index = -10;\n                }\n\n                .screenFade-${screenFade_ID_Input}\n                {\n                    display: block;\n                    position: fixed;\n                    z-index: ${screenFade_Z_Index_Input};\n                    left: 0;\n                    top: 0;\n                    height: 100%;\n                    width: 100%;\n                    overflow: hidden;\n                    pointer-events: none;\n\n                    animation-duration: ${screenFade_Duration_Input}s;\n                    animation-timing-function: ease-in-out;\n                }\n\n\n                @keyframes animation-screen-fade-in-${screenFade_ID_Input}\n                {\n                    from {\n                        background-color: rgba(0,0,0,0);\n                    }\n                    to {\n                        background-color: ${screenFadeColor};\n                    }\n                }\n\n\n                @keyframes animation-screen-fade-out-${screenFade_ID_Input}\n                {\n                    from {\n                        background-color: ${screenFadeColor};\n                    }\n                    to {\n                        background-color: rgba(0,0,0,0);\n                    }\n                }\n\n                `}container.appendChild(screenFade_Div),setTimeout(function(){animateScreenFade()},1e3*screenFade_Pause_Input)}eval(`window.${screenFade_ID_Input} = { faded: null };`),screenFade_ID_Input?mainFunction():console.log("[ GLIFTEK ]: The",puzzleName,"plugin puzzle is missing an input!")}.apply(null,arguments)}function FADE_IN_SCREEN(){setScreenScale(1.5),screenFade("screenFade_1",10,"out",1.5,1,"#000000","",!0,function(){DISABLE_RENDERING()})}function MAIN(){EXEC_updateQuadWireframe="window.updateQuadWireframe = true;",_g_list_number=0,obj_number=null,FADE_IN_SCREEN(),MAKE_LISTS(),MAKE_HELPERS(),MAKE_OBJECTS(),HIDE_ALL_OBJECTS(),HOVER_NEXT(),CHANGE_EXAMPLES(),CHANGE_OBJECT_WIREFRAME()}function HIDE_ALL_OBJECTS(){changeVis(["ALL_OBJECTS"],!1),current_object="Teapot",TOGGLE_wireframe_is_see_through=!1,changeVis("Teapot",!0),changeVis("infiniteGridHelper_1",!0),changeVis("black space",!0),changeVis("Text_Next",!0)}function MAKE_LISTS(){LIST_objects=["Teapot","Torus","Box"],LIST_helpers=["infiniteGridHelper_1",LIST_polar_grid_helpers=["polarGridHelper_1","polarGridHelper_2","polarGridHelper_3","polarGridHelper_4","Cylinder"],LIST_cube_grid_helpers=["gridHelper_1","gridHelper_2","gridHelper_3","gridHelper_4"]]}function MAKE_HELPERS(){MAKE_INFINITE_GRID(),MAKE_GRID_CUBE(),MAKE_GRID_POLAR()}function MAKE_OBJECTS(){MAKE_TEAPOT(),MAKE_TORUS(),MAKE_BOX(),SET_MATERIALS()}function createInfiniteGridHelper(){return function(e,n,r,t){!function(){"undefined"==typeof infiniteGridHelperNumber?window.infiniteGridHelperNumber=1:infiniteGridHelperNumber++;if(THREE.InfiniteGridHelper=function(e,n,r,t,o="xzy"){r=r||new THREE.Color("white"),e=e||10,n=n||100,t=t||8e3;const a=o.substr(0,2),i=new THREE.PlaneBufferGeometry(2,2,1,1),s=new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:{uSize1:{value:e},uSize2:{value:n},uColor:{value:r},uDistance:{value:t}},transparent:!0,vertexShader:`\n\n            varying vec3 worldPosition;\n\n            uniform float uDistance;\n\n            void main() {\n\n                    vec3 pos = position.${o} * uDistance;\n                    pos.${a} += cameraPosition.${a};\n\n                    worldPosition = pos;\n\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n\n            }\n            `,fragmentShader:`\n\n            varying vec3 worldPosition;\n\n            uniform float uSize1;\n            uniform float uSize2;\n            uniform vec3 uColor;\n            uniform float uDistance;\n\n\n\n                float getGrid(float size) {\n\n                    vec2 r = worldPosition.${a} / size;\n\n\n                    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);\n                    float line = min(grid.x, grid.y);\n\n\n                    return 1.0 - min(line, 1.0);\n                }\n\n            void main() {\n\n\n                    float d = 1.0 - min(distance(cameraPosition.${a}, worldPosition.${a}) / uDistance, 1.0);\n\n                    float g1 = getGrid(uSize1);\n                    float g2 = getGrid(uSize2);\n\n\n                    gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));\n                    gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);\n\n                    if ( gl_FragColor.a <= 0.0 ) discard;\n\n\n            }\n\n            `,extensions:{derivatives:!0}});THREE.Mesh.call(this,i,s),this.frustumCulled=!1},THREE.InfiniteGridHelper.prototype={...THREE.Mesh.prototype,...THREE.Object3D.prototype,...THREE.EventDispatcher.prototype},parseInt(THREE.REVISION)>126){class e extends THREE.Mesh{constructor(e,n,r,t,o="xzy"){r=r||new THREE.Color("white"),e=e||10,n=n||100,t=t||8e3;const a=o.substr(0,2),i=new THREE.PlaneBufferGeometry(2,2,1,1),s=new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:{uSize1:{value:e},uSize2:{value:n},uColor:{value:r},uDistance:{value:t}},transparent:!0,vertexShader:`\n\n            varying vec3 worldPosition;\n\n            uniform float uDistance;\n\n            void main() {\n\n                    vec3 pos = position.${o} * uDistance;\n                    pos.${a} += cameraPosition.${a};\n\n                    worldPosition = pos;\n\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n\n            }\n            `,fragmentShader:`\n\n            varying vec3 worldPosition;\n\n            uniform float uSize1;\n            uniform float uSize2;\n            uniform vec3 uColor;\n            uniform float uDistance;\n\n\n\n                float getGrid(float size) {\n\n                    vec2 r = worldPosition.${a} / size;\n\n\n                    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);\n                    float line = min(grid.x, grid.y);\n\n\n                    return 1.0 - min(line, 1.0);\n                }\n\n            void main() {\n\n\n                    float d = 1.0 - min(distance(cameraPosition.${a}, worldPosition.${a}) / uDistance, 1.0);\n\n                    float g1 = getGrid(uSize1);\n                    float g2 = getGrid(uSize2);\n\n\n                    gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));\n                    gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);\n\n                    if ( gl_FragColor.a <= 0.0 ) discard;\n\n\n            }\n\n            `,extensions:{derivatives:!0}});super(i,s),this.frustumCulled=!1}}Object.assign(e.prototype,THREE.InfiniteGridHelper.prototype),THREE.InfiniteGridHelper=e}let o=new THREE.Color(t);!function(){const t=new THREE.InfiniteGridHelper(e,n,o,r);t.name="infiniteGridHelper_"+infiniteGridHelperNumber,app.scene.add(t),t.visible=!0,console.log("infiniteGridHelper:",t)}()}()}.apply(null,arguments)}function MAKE_INFINITE_GRID(){createInfiniteGridHelper(5,50,3e3,"pink")}function createObject(e,n,r,t,o,a,i,s,c,l,u){var p,d,_=appInstance.scene.getObjectByName(n);switch(_&&_.parent.remove(_),e){case"BOX":d=new v3d.BoxGeometry(r,t,o);break;case"CAMERA":var f=appInstance.container.offsetWidth/appInstance.container.offsetHeight;if("PERSPECTIVE"==c)p=new v3d.PerspectiveCamera(u,f,1,1e3);else{r=u*f;p=new v3d.OrthographicCamera(-r/2,r/2,u/2,-u/2,-1e3,1e3)}p.lookAt(_pGlob.vec3Tmp.set(0,0,0));break;case"CIRCLE":d=new v3d.CircleGeometry(a,s);break;case"CONE":d=new v3d.ConeGeometry(a,t,s);break;case"CYLINDER":d=new v3d.CylinderGeometry(a,a,t,s);break;case"EMPTY":p=new v3d.Object3D;break;case"LIGHT":var E=16777215;switch(l){case"AMBIENT":p=new v3d.AmbientLight(E,.5);break;case"AREA":v3d.RectAreaLightUniformsLib.init(LTC_MAT_1,LTC_MAT_2),p=new v3d.RectAreaLight(E,.5,1,1);break;case"DIRECTIONAL":p=new v3d.DirectionalLight(E,.5);break;case"HEMISPHERE":p=new v3d.HemisphereLight(E,0,.5);break;case"POINT":p=new v3d.PointLight(E,.5);break;case"SPOT":p=new v3d.SpotLight(E,.5)}p.isFreeLight=!0;break;case"PLANE":d=new v3d.PlaneGeometry(r,t,1,1);break;case"SPHERE":d=new v3d.SphereGeometry(a,32,32);break;case"TEAPOT":d=new v3d.TeapotGeometry(r);break;case"TORUS":d=new v3d.TorusGeometry(a,i,32,32)}if(d){var m=new v3d.MeshStandardMaterial({color:"white",roughness:1,metalness:0,side:"CIRCLE"==e||"PLANE"==e||"TEAPOT"==e?v3d.DoubleSide:v3d.FrontSide});m.name=n+"Material",p=new v3d.Mesh(d,m)}p.name=n,appInstance.scene.add(p),_pGlob.objCache={}}function getCoordSystem(){var e=appInstance.scene;return e&&"v3d"in e.userData&&"coordSystem"in e.userData.v3d?e.userData.v3d.coordSystem:"Z_UP_RIGHT"}function coordsTransform(e,n,r,t){if(n==r)return e;var o=e.y,a=e.z;return"Z_UP_RIGHT"==n&&"Y_UP_RIGHT"==r?(e.y=a,e.z=t?o:-o):"Y_UP_RIGHT"==n&&"Z_UP_RIGHT"==r?(e.y=t?a:-a,e.z=o):console.error("coordsTransform: Unsupported coordinate space"),e}initObjectPicking(function(e,n){var r=_pGlob.hoveredObject,t="";_pGlob.objHoverInfo=_pGlob.objHoverInfo||[];var o=1/0;_pGlob.objHoverInfo.forEach(function(n){for(var r=n.xRay?e.length:Math.min(1,e.length),a=0;a<r;a++){var i=getPickedObjectName(e[a].object);objectsIncludeObj(retrieveObjectNames(n.objSelector),i)&&a<=o&&(t=i,o=a)}}),r!=t&&(_pGlob.objHoverInfo.forEach(function(e){objectsIncludeObj(retrieveObjectNames(e.objSelector),r)&&(_pGlob.hoveredObject=r,e.callbacks[1](n))}),_pGlob.objHoverInfo.forEach(function(e){objectsIncludeObj(retrieveObjectNames(e.objSelector),t)&&(_pGlob.hoveredObject=t,e.callbacks[0](n))}),_pGlob.hoveredObject=t)},"mousemove",!1);var eulerV3DToBlenderShortest=(eulerTmp=new v3d.Euler,eulerTmp2=new v3d.Euler,vec3Tmp=new v3d.Vector3,function(e,n){var r=eulerTmp.copy(e).reorder("YZX"),t=eulerTmp2.copy(r).makeAlternative(),o=r.toVector3(vec3Tmp).lengthSq(),a=t.toVector3(vec3Tmp).lengthSq();return n.copy(o<a?r:t),coordsTransform(n,"Y_UP_RIGHT","Z_UP_RIGHT")}),eulerTmp,eulerTmp2,vec3Tmp;function RotationInterface(){this._userRotation=new v3d.Euler(0,0,0,"ZYX"),this._actualRotation=new v3d.Euler}function setObjTransform(e,n,r,t){var o=r[0],a=r[1],i=r[2],s=retrieveObjectNames(e);function c(e,r,o){t?"scale"!=n?e[n][r]+=o:e[n][r]*=o:e[n][r]=o}var l=_pGlob.vec3Tmp.set(Number(""!==o),Number(""!==a),Number(""!==i)),u=_pGlob.vec3Tmp2.set(o||0,a||0,i||0);"rotation"===n&&u.multiplyScalar(v3d.MathUtils.DEG2RAD);var p=getCoordSystem();coordsTransform(l,p,"Y_UP_RIGHT",!0),coordsTransform(u,p,"Y_UP_RIGHT","scale"===n);for(var d=0;d<s.length;d++){var _=s[d];if(_){var f=getObjectByName(_);if(f){if("rotation"===n&&"Z_UP_RIGHT"==p)coordsTransform(m=eulerV3DToBlenderShortest(f.rotation,_pGlob.eulerTmp),p,"Y_UP_RIGHT"),l.x&&(m.x=t?m.x+u.x:u.x),l.y&&(m.y=t?m.y+u.y:u.y),l.z&&(m.z=t?m.z+u.z:u.z),m.order="YZX",m.reorder(f.rotation.order),f.rotation.copy(m);else if("rotation"===n&&"Y_UP_RIGHT"==p){var E=RotationInterface.initObject(f),m=E.getUserRotation(_pGlob.eulerTmp);l.x&&(m.x=t?m.x+u.x:u.x),l.y&&(m.y=t?m.y+u.y:u.y),l.z&&(m.z=t?m.z+u.z:u.z),E.setUserRotation(m),E.getActualRotation(f.rotation)}else l.x&&c(f,"x",u.x),l.y&&c(f,"y",u.y),l.z&&c(f,"z",u.z);f.updateMatrixWorld(!0)}}}}function MAKE_TEAPOT(){createObject("TEAPOT","Teapot",2,0,0,0,0,0,"PERSPECTIVE","AMBIENT",0),setObjTransform("Teapot","position",["","",5],!1),setObjTransform("Teapot","rotation",["","",90],!1)}function matGetColors(e){var n=v3d.SceneUtils.getMaterialByName(appInstance,e);return n?n.isMeshNodeMaterial?Object.keys(n.nodeRGBMap):n.isMeshStandardMaterial?["color","emissive"]:[]:[]}function setMaterialColor(e,n,r,t,o,a){if(!(matGetColors(e).indexOf(n)<0)){if(a){var i=new v3d.Color(a);i.convertSRGBToLinear(),r=i.r,t=i.g,o=i.b}for(var s=v3d.SceneUtils.getMaterialsByName(appInstance,e),c=0;c<s.length;c++){var l=s[c];if(l.isMeshNodeMaterial){var u=l.nodeRGBMap[n];l.nodeRGB[u].x=r,l.nodeRGB[u].y=t,l.nodeRGB[u].z=o}else l[n].r=r,l[n].g=t,l[n].b=o;l.needsUpdate=!0,null!==appInstance.scene&&l===appInstance.scene.worldMaterial&&appInstance.updateEnvironment(l)}}}function setMaterialTransparency(){return function(e,n){e&&"<none>"!=e?app.scene.traverse(function(r){r instanceof v3d.Mesh&&r.material.name==e&&(r.material.opacity=n,r.material.transparent=!0,r.material.needsUpdate=!0)}):console.log("[ GLIFTEK ]: The","Set Material Transparency","plugin puzzle is missing an input!")}.apply(null,arguments)}function quadWireframeFunction(){return function(objInput,colorInput,segUinput,segVinput,isWireInput,wireWidthInput,wireColorInput){let objInputObj;function mainFunction(){function set_quadWireframe_Objects_Data(){let quadWireframeToEval=`quadWireframe_Objects_Data.${objInput} =\n                {\n                    objInput: objInput,\n                    colorInput: colorInput,\n                    segUinput: segUinput,\n                    segVinput: segVinput,\n                    isWireInput: isWireInput,\n                    wireWidthInput: wireWidthInput,\n                    wireColorInput: wireColorInput\n                };\n                `;eval(quadWireframeToEval),WIN_quadWireframeFunction(objInputObj,isWireInput,!1)}window.WIN_quadWireframeFunction=function(objForWireframe,isWireInputValue,isForToggle){function getKeyValue(myKey){let result=eval(`quadWireframe_Objects_Data.${objForWireframe.name}.${myKey}`);return result}0==isForToggle&&(objForWireframe=objInputObj);let uniforms={segU:{value:getKeyValue("segUinput")},segV:{value:getKeyValue("segVinput")},isWire:{value:isWireInputValue},wireWidthFactor:{value:getKeyValue("wireWidthInput")},wireColor:{value:new THREE.Color(getKeyValue("wireColorInput"))}},quadMaterial=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,onBeforeCompile:e=>{e.uniforms.segU=uniforms.segU,e.uniforms.segV=uniforms.segV,e.uniforms.wireColor=uniforms.wireColor,e.uniforms.isWire=uniforms.isWire,e.uniforms.wireWidthFactor=uniforms.wireWidthFactor,e.fragmentShader=`\n\n                uniform float segU;\n                uniform float segV;\n                uniform vec3 wireColor;\n                uniform float isWire;\n                uniform float wireWidthFactor;\n\n                ${e.fragmentShader}\n                `.replace("#include <dithering_fragment>","#include <dithering_fragment>\n\n                    // http://madebyevan.com/shaders/grid/\n                    vec2 coord = vUv * vec2(segU, segV);\n\n                    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);\n                    float line = min(grid.x, grid.y) / wireWidthFactor;\n                    line = 1.0 - min(line, 1.0);\n\n                    if (isWire > 0.5 && line < 0.5) discard;\n                    if (isWire > 0.5) gl_FragColor = vec4(0);\n                    gl_FragColor = mix(gl_FragColor, vec4(wireColor, 1.0), line);\n                ")}});quadMaterial.color=new THREE.Color(colorInput),quadMaterial.defines={USE_UV:""},quadMaterial.opacity=0,objForWireframe.material=quadMaterial,objForWireframe.material.needsUpdate=!0,window.quadMaterialWin=quadMaterial},objInputObj=objInput instanceof v3d.Mesh?objInput:app.scene.getObjectByName(objInput),void 0===window.quadWireframe_Objects_Data?(window.quadWireframe_Objects_Data={},set_quadWireframe_Objects_Data()):void 0!==window.quadWireframe_Objects_Data&&set_quadWireframe_Objects_Data()}objInput&&colorInput&&wireColorInput&&segUinput&&segVinput&&wireWidthInput&&wireColorInput?mainFunction():console.log("Quad Material Puzzle missing input!")}.apply(null,arguments)}function SET_MATERIALS(){setMaterialColor("CylinderMaterial","emissive",0,0,0,"cyan"),setMaterialTransparency("CylinderMaterial",.1),COLOR_object_transparent="black",quadWireframeFunction("Teapot","white",4,4,!1,3,COLOR_object_wireframe="cyan"),quadWireframeFunction("Torus","black",8,8,!1,3,COLOR_object_wireframe),quadWireframeFunction("Box","black",4,4,!1,3,COLOR_object_wireframe)}function createPolarGridHelper(){return function(e,n,r,t,o,a){!function(){"undefined"==typeof polarGridHelperNumber?window.polarGridHelperNumber=1:polarGridHelperNumber++;let i=new v3d.PolarGridHelper(e,n,r,t,o,a);i.raycast=function(){},i.name="polarGridHelper_"+polarGridHelperNumber,i.up.set(0,0,1),app.scene.add(i)}()}.apply(null,arguments)}function setObjectSelectability(){return function(e,n){e?function(){let r;function t(e){let r;r=e instanceof v3d.Mesh?e:app.scene.getObjectByName(e),window.raycastFunction||(window.raycastFunction=r.raycast),"selectable"==n?r.raycast=window.raycastFunction:"unselectable"==n&&(r.raycast=function(){})}!function(){if(Array.isArray(e))Array.isArray(e)&&(r=e).forEach(t);else{const n=[];n.push(e),n.forEach(t)}}()}():console.log("[ GLIFTEK ]: The","Set Object Selectability","plugin puzzle is missing an input!")}.apply(null,arguments)}function MAKE_GRID_POLAR(){createPolarGridHelper(5,8,6,64,"gray","gray"),createPolarGridHelper(5,8,6,64,"gray","gray"),setObjTransform("polarGridHelper_2","position",["","",10],!1),createPolarGridHelper(50,8,6,64,"magenta","magenta"),createPolarGridHelper(50,8,6,64,"magenta","magenta"),setObjTransform("polarGridHelper_4","position",["","",10],!1),createObject("CYLINDER","Cylinder",0,10,0,5,0,32,"PERSPECTIVE","AMBIENT",0),setObjectSelectability("Cylinder","unselectable"),setObjTransform("Cylinder","position",["","",5],!1)}function MAKE_TORUS(){createObject("TORUS","Torus",0,0,0,2,1,0,"PERSPECTIVE","AMBIENT",0),setObjTransform("Torus","position",["","",5],!1),setObjTransform("Torus","rotation",[90,"",""],!1)}function MAKE_BOX(){createObject("BOX","Box",4,4,4,0,0,0,"PERSPECTIVE","AMBIENT",0),setObjTransform("Box","position",["","",5],!1)}function createVector(e,n,r){return[e,n,r]}function createArrowHelper(){return function(e,n,r,t,o,a){!function(){"undefined"==typeof arrowHelperNumber?window.arrowHelperNumber=1:arrowHelperNumber++;const o=new THREE.Vector3(e[0],e[1],e[2]);o.normalize();const a=new THREE.Vector3(n[0],n[1],n[2]);let i=new v3d.ArrowHelper(o,a,r,t);i.up.set(0,0,1),i.name="arrowHelper_"+arrowHelperNumber,app.scene.add(i)}()}.apply(null,arguments)}function createAxesHelper(){return function(e){!function(){"undefined"==typeof axesHelperNumber?window.axesHelperNumber=1:axesHelperNumber++;let n=new v3d.AxesHelper(e);n.raycast=function(){},n.up.set(0,0,1),n.name="axesHelper_"+axesHelperNumber,app.scene.add(n)}()}.apply(null,arguments)}function MAKE_OTHER_HELPERS(){createArrowHelper(createVector(0,-3,0),createVector(0,0,0),3,"#4682B4",.5,.25),createAxesHelper(3)}function createGridHelper(){return function(e,n,r,t){!function(){"undefined"==typeof gridHelperNumber?window.gridHelperNumber=1:gridHelperNumber++;let o=new v3d.GridHelper(e,n,t,r);o.raycast=function(){},o.up.set(0,0,1),o.name="gridHelper_"+gridHelperNumber,app.scene.add(o)}()}.apply(null,arguments)}function MAKE_GRID_CUBE(){createGridHelper(10,10,grid_Cube_color="magenta",grid_Cube_Center_color="gray"),setObjTransform("gridHelper_1","rotation",["",90,""],!1),setObjTransform("gridHelper_1","position",[-5,"",5],!1),createGridHelper(10,10,grid_Cube_color,grid_Cube_Center_color),setObjTransform("gridHelper_2","rotation",["",-90,-90],!1),setObjTransform("gridHelper_2","position",["",5,5],!1),createGridHelper(10,10,grid_Cube_color,grid_Cube_Center_color),createGridHelper(100,20,"purple",grid_Cube_Center_color)}Object.assign(RotationInterface,{initObject:function(e){void 0===e.userData.v3d.puzzles&&(e.userData.v3d.puzzles={}),void 0===e.userData.v3d.puzzles.rotationInterface&&(e.userData.v3d.puzzles.rotationInterface=new RotationInterface);var n=e.userData.v3d.puzzles.rotationInterface;return n.updateFromObject(e),n}}),Object.assign(RotationInterface.prototype,{updateFromObject:function(e){this._actualRotation.equalsEps(e.rotation,1e-8)||(this._actualRotation.copy(e.rotation),this._updateUserRotFromActualRot())},getActualRotation:function(e){return e.copy(this._actualRotation)},setUserRotation:function(e){this._userRotation.set(e.x,e.y,e.z),this._updateActualRotFromUserRot()},getUserRotation:function(e){return e.copy(this._userRotation)},_updateUserRotFromActualRot:function(){var e=this._userRotation.order;this._userRotation.copy(this._actualRotation).reorder(e)},_updateActualRotFromUserRot:function(){var e=this._actualRotation.order;this._actualRotation.copy(this._userRotation).reorder(e)}}),setWireframeFunction(LIST_objects,""),MAIN()}}();