"use strict";!function(){var LIST_NONE="<none>",_pGlob={objCache:{},fadeAnnotations:!0,pickedObject:"",hoveredObject:"",mediaElements:{},loadedFile:"",states:[],percentage:0,openedFile:"",xrSessionAcquired:!1,xrSessionCallbacks:[]};_pGlob.screenCoords=new v3d.Vector2,_pGlob.intervalTimers={},_pGlob.AXIS_X=new v3d.Vector3(1,0,0),_pGlob.AXIS_Y=new v3d.Vector3(0,1,0),_pGlob.AXIS_Z=new v3d.Vector3(0,0,1),_pGlob.MIN_DRAG_SCALE=.001,_pGlob.SET_OBJ_ROT_EPS=1e-8,_pGlob.vec2Tmp=new v3d.Vector2,_pGlob.vec2Tmp2=new v3d.Vector2,_pGlob.vec3Tmp=new v3d.Vector3,_pGlob.vec3Tmp2=new v3d.Vector3,_pGlob.vec3Tmp3=new v3d.Vector3,_pGlob.vec3Tmp4=new v3d.Vector3,_pGlob.eulerTmp=new v3d.Euler,_pGlob.eulerTmp2=new v3d.Euler,_pGlob.quatTmp=new v3d.Quaternion,_pGlob.quatTmp2=new v3d.Quaternion,_pGlob.colorTmp=new v3d.Color,_pGlob.mat4Tmp=new v3d.Matrix4,_pGlob.planeTmp=new v3d.Plane,_pGlob.raycasterTmp=new v3d.Raycaster;var PL=v3d.PL=v3d.PL||{};v3d.puzzles=PL,PL.procedures=PL.procedures||{},PL.execInitPuzzles=function(e){var t={percentage:0,output:{initOptions:{fadeAnnotations:!0,useBkgTransp:!1,preserveDrawBuf:!1,useCompAssets:!1,useFullscreen:!0,useCustomPreloader:!1,preloaderStartCb:function(){},preloaderProgressCb:function(){},preloaderEndCb:function(){}}}};return t.container=void 0!==e&&"container"in e?e.container:"",t.output.initOptions.fadeAnnotations=!0,t.output.initOptions.useBkgTransp=!0,t.output.initOptions.preserveDrawBuf=!1,t.output.initOptions.useCompAssets=!1,t.output.initOptions.useFullscreen=!0,t.output},PL.init=function(appInstance,initOptions){var app=appInstance;initOptions=initOptions||{},"fadeAnnotations"in initOptions&&(_pGlob.fadeAnnotations=initOptions.fadeAnnotations),this.procedures.MAIN=MAIN,this.procedures["INACTIVE PROCEDURE FOR INSTRUCTIONS"]=INACTIVE_PROCEDURE_FOR_INSTRUCTIONS,this.procedures.SET_VARIABLES=SET_VARIABLES,this.procedures.AFTER_COPY_PROCEDURES=AFTER_COPY_PROCEDURES,this.procedures.SET_LIST_object_copies=SET_LIST_object_copies,this.procedures.CHANGE_MATERIALS=CHANGE_MATERIALS,this.procedures.RENAME_OBJECTS_AND_MATERIALS=RENAME_OBJECTS_AND_MATERIALS,this.procedures.SET_LIST_object_copies_groups=SET_LIST_object_copies_groups,this.procedures.GROUP_OBJECTS=GROUP_OBJECTS,this.procedures.POSITION_GROUPS=POSITION_GROUPS,this.procedures.COPY_MATERIALS=COPY_MATERIALS,this.procedures.COPY_OBJECTS_ORDERED_GROUP=COPY_OBJECTS_ORDERED_GROUP,this.procedures.COPY_OBJECTS_UN_ORDERED_GROUP=COPY_OBJECTS_UN_ORDERED_GROUP,this.procedures.HOVER_GROUPS=HOVER_GROUPS,this.procedures.HOVER_LOOP=HOVER_LOOP,this.procedures.CLICK_MENU_ITEMS=CLICK_MENU_ITEMS,this.procedures.RESET_SCENE=RESET_SCENE,this.procedures.HOVER_3D_BUTTON_HITBOXES=HOVER_3D_BUTTON_HITBOXES;var PROC={MAIN:MAIN,"INACTIVE PROCEDURE FOR INSTRUCTIONS":INACTIVE_PROCEDURE_FOR_INSTRUCTIONS,SET_VARIABLES:SET_VARIABLES,AFTER_COPY_PROCEDURES:AFTER_COPY_PROCEDURES,SET_LIST_object_copies:SET_LIST_object_copies,CHANGE_MATERIALS:CHANGE_MATERIALS,RENAME_OBJECTS_AND_MATERIALS:RENAME_OBJECTS_AND_MATERIALS,SET_LIST_object_copies_groups:SET_LIST_object_copies_groups,GROUP_OBJECTS:GROUP_OBJECTS,POSITION_GROUPS:POSITION_GROUPS,COPY_MATERIALS:COPY_MATERIALS,COPY_OBJECTS_ORDERED_GROUP:COPY_OBJECTS_ORDERED_GROUP,COPY_OBJECTS_UN_ORDERED_GROUP:COPY_OBJECTS_UN_ORDERED_GROUP,HOVER_GROUPS:HOVER_GROUPS,HOVER_LOOP:HOVER_LOOP,CLICK_MENU_ITEMS:CLICK_MENU_ITEMS,RESET_SCENE:RESET_SCENE,HOVER_3D_BUTTON_HITBOXES:HOVER_3D_BUTTON_HITBOXES},hovering,LIST_hover_buttons,LIST_object_copies,LIST_object_copies_groups,my_New_GroupName,list_in_move_loop,ordered_list_boolean,scene_reset,LIST_buttons_text,i,this_group_name,LIST_Buttons,LIST_my_New_Group,list_number,LIST_Objects_To_Remove,LIST_Original_Objects,this_group;function MAIN(){SET_VARIABLES(),HOVER_3D_BUTTON_HITBOXES(),CLICK_MENU_ITEMS(),RENAME_OBJECTS_AND_MATERIALS(),GROUP_OBJECTS()}function dictSet(e,t,o){e&&"object"==typeof e&&(e[t]=o)}function INACTIVE_PROCEDURE_FOR_INSTRUCTIONS(){dictSet(window,"copyObjectsGroupNames",null),dictSet(window,"allCopyObjects",null)}function notIgnoredObj(e){return!("AmbientLight"===e.type||""===e.name||e.isMesh&&e.isMaterialGeneratedMesh||e.isAuxClippingMesh)}function getObjectByName(e){var t,o=void 0!==_pGlob;return(t=o?_pGlob.objCache[e]:null)&&t.name===e?t:(appInstance.scene.traverse(function(n){!t&&notIgnoredObj(n)&&n.name==e&&(t=n,o&&(_pGlob.objCache[e]=t))}),t)}function getAllObjectNames(){var e=[];return appInstance.scene.traverse(function(t){notIgnoredObj(t)&&e.push(t.name)}),e}function getObjectNamesByGroupName(e){var t=[];return appInstance.scene.traverse(function(o){if(notIgnoredObj(o)){var n=o.groupNames;if(!n)return;for(var r=0;r<n.length;r++){n[r]==e&&t.push(o.name)}}}),t}function retrieveObjectNames(e){var t=[];return retrieveObjectNamesAcc(e,t),t.filter(function(e){return e})}function retrieveObjectNamesAcc(e,t){if("string"==typeof e)t.push(e);else if(Array.isArray(e)&&"GROUP"==e[0])for(var o=getObjectNamesByGroupName(e[1]),n=0;n<o.length;n++)t.push(o[n]);else if(Array.isArray(e)&&"ALL_OBJECTS"==e[0])for(o=getAllObjectNames(),n=0;n<o.length;n++)t.push(o[n]);else if(Array.isArray(e))for(n=0;n<e.length;n++)retrieveObjectNamesAcc(e[n],t)}function isMeshObj(e){if(e.isMesh)return!0;for(var t=0;t<e.children.length;t++){var o=e.children[t];if(o.isMesh&&o.isMaterialGeneratedMesh)return!0}return!1}function getObjectsFromCollect(e,t,o){if(notIgnoredObj(e)){switch(t){case"ALL":o.indexOf(e.name)<0&&o.push(e.name);break;case"ANNOTATION":e.isAnnotation&&o.indexOf(e.name)<0&&o.push(e.name);break;case"BONE":e.isBone&&o.indexOf(e.name)<0&&o.push(e.name);break;case"CAMERA":e.isCamera&&o.indexOf(e.name)<0&&o.push(e.name);break;case"EMPTY":e.isAnnotationControl||e.isBone||e.isCamera||e.isGroup||e.isLine||e.isLOD||e.isLight||isMeshObj(e)||e.isPoints||e.isScene||e.isSprite||!(o.indexOf(e.name)<0)||o.push(e.name);break;case"LIGHT":e.isLight&&o.indexOf(e.name)<0&&o.push(e.name);break;case"MESH":isMeshObj(e)&&o.indexOf(e.name)<0&&o.push(e.name);break;default:console.error("getObjectsFrom: Unknown object type: "+t)}for(var n=0;n<e.children.length;n++){getObjectsFromCollect(e.children[n],t,o)}}}function getObjectsFrom(e,t){for(var o=[],n=retrieveObjectNames(e),r=0;r<n.length;r++){var a=n[r];if(a){var s=getObjectByName(a);s&&getObjectsFromCollect(s,t,o)}}return o}function SET_VARIABLES(){LIST_hover_buttons=getObjectsFrom(["GROUP","buttons_hover"],"MESH"),LIST_buttons_text=getObjectsFrom(["GROUP","buttons_text"],"MESH"),LIST_Buttons=getObjectsFrom(["GROUP","Buttons"],"MESH"),LIST_Original_Objects=getObjectsFrom(["GROUP","Original_Objects"],"MESH"),LIST_Objects_To_Remove=["myCube.000","myCube.001","myCube.002","Monkey.000","Monkey.001","Monkey.002","Torus.000","Torus.001","Torus.002"],ordered_list_boolean=null,scene_reset=!0}function AFTER_COPY_PROCEDURES(){SET_LIST_object_copies(),SET_LIST_object_copies_groups(),POSITION_GROUPS(),CHANGE_MATERIALS(),HOVER_GROUPS(),COPY_MATERIALS()}function getAllObjectCopies(){return function(copySessionId){const puzzleName="Get All Object Copies";let result;function mainFunction(){let copySessionID_allCopyObjects_ToEval=`if ( typeof window.${copySessionId}.allCopyObjects !== 'undefined')\n            {\n                result = window.${copySessionId}.allCopyObjects;\n\n            }`;eval(copySessionID_allCopyObjects_ToEval)}return mainFunction(),result}.apply(null,arguments)}function changeVis(e,t){for(var o=retrieveObjectNames(e),n=0;n<o.length;n++){var r=o[n];if(r){var a=getObjectByName(r);a&&(a.visible=t)}}}function SET_LIST_object_copies(){LIST_object_copies=getAllObjectCopies(ordered_list_boolean?"Ordered_Copy_Session_01":"Unordered_Copy_Session_01"),console.log("LIST_object_copies: "),console.log(LIST_object_copies),changeVis(LIST_my_New_Group,!1)}function matGetColors(e){var t=v3d.SceneUtils.getMaterialByName(appInstance,e);return t?t.isMeshNodeMaterial?Object.keys(t.nodeRGBMap):t.isMeshStandardMaterial?["color","emissive"]:[]:[]}function setMaterialColor(e,t,o,n,r,a){if(!(matGetColors(e).indexOf(t)<0)){if(a){var s=new v3d.Color(a);s.convertSRGBToLinear(),o=s.r,n=s.g,r=s.b}for(var i=v3d.SceneUtils.getMaterialsByName(appInstance,e),c=0;c<i.length;c++){var l=i[c];if(l.isMeshNodeMaterial){var u=l.nodeRGBMap[t];l.nodeRGB[u].x=o,l.nodeRGB[u].y=n,l.nodeRGB[u].z=r}else l[t].r=o,l[t].g=n,l[t].b=r;l.needsUpdate=!0,null!==appInstance.scene&&l===appInstance.scene.worldMaterial&&appInstance.updateEnvironment(l)}}}function matGetEditableTextures(e,t){var o=[];if(t)o=v3d.SceneUtils.getMaterialsByName(appInstance,e);else{var n=v3d.SceneUtils.getMaterialByName(appInstance,e);null!==n&&(o=[n])}return o.reduce(function(e,t){var o=[];switch(t.type){case"MeshNodeMaterial":o=Object.values(t.nodeTextures);break;case"MeshStandardMaterial":o=[t.map,t.lightMap,t.aoMap,t.emissiveMap,t.bumpMap,t.normalMap,t.displacementMap,t.roughnessMap,t.metalnessMap,t.alphaMap,t.envMap];break;default:console.error("matGetEditableTextures: Unknown material type "+t.type)}return Array.prototype.push.apply(e,o),e},[]).filter(function(e){return e&&(e.constructor==v3d.Texture||e.constructor==v3d.DataTexture||e.constructor==v3d.VideoTexture)})}function matReplaceEditableTexture(e,t,o){switch(e.type){case"MeshNodeMaterial":for(var n in e.nodeTextures)e.nodeTextures[n]==t&&(e.nodeTextures[n]=o);break;case"MeshStandardMaterial":["map","lightMap","aoMap","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap","envMap"].forEach(function(n){e[n]==t&&(e[n]=o)});break;default:console.error("matReplaceEditableTexture: Unsupported material type "+e.type)}o.encoding=t.encoding,o.wrapS=t.wrapS,o.wrapT=t.wrapT}function replaceTexture(e,t,o,n){var r=matGetEditableTextures(e,!0).filter(function(e){return e.name==t});if(r.length)if(o instanceof Promise)o.then(function(e){a(e)},function(e){});else if("string"==typeof o)a(o);else if(o instanceof Object&&o.source instanceof HTMLVideoElement)!function(o){var a=new v3d.VideoTexture(o);a.flipY=!1,a.name=t;var s=!1;v3d.SceneUtils.getMaterialsByName(appInstance,e).forEach(function(e){r.forEach(function(t){matReplaceEditableTexture(e,t,a)}),e.needsUpdate=!0,s=!0}),s&&n()}(o.source);else{if(!(o instanceof HTMLCanvasElement))return;!function(o){var a=new v3d.CanvasTexture(o);a.flipY=!1,a.name=t;var s=!1;v3d.SceneUtils.getMaterialsByName(appInstance,e).forEach(function(e){r.forEach(function(t){matReplaceEditableTexture(e,t,a)}),e.needsUpdate=!0,s=!0}),s&&(v3d.PL&&(v3d.PL.canvasTextures=v3d.PL.canvasTextures||{},v3d.PL.canvasTextures[a.image.id]=a),n())}(o)}function a(e){var t,o=e.search(/\.hdr$/)>0;o?(t=new v3d.FileLoader).setResponseType("arraybuffer"):(t=new v3d.ImageLoader).setCrossOrigin("Anonymous");t.load(e,function(t){var a=e.search(/\.(jpg|jpeg)$/)>0||0===e.search(/^data\:image\/jpeg/);r.forEach(function(e){if(o){var n=(new v3d.RGBELoader).parse(t);e.type=v3d.UnsignedByteType,e.encoding=v3d.RGBEEncoding,e.image={data:n.data,width:n.width,height:n.height},e.magFilter=v3d.LinearFilter,e.minFilter=v3d.LinearFilter,e.generateMipmaps=!1,e.isDataTexture=!0}else e.image=t;if(e.format=a?v3d.RGBFormat:v3d.RGBAFormat,e.needsUpdate=!0,null!==appInstance.scene&&null!==appInstance.scene.worldMaterial){var r=appInstance.scene.worldMaterial;for(var s in r.nodeTextures)r.nodeTextures[s]==e&&appInstance.updateEnvironment(r)}}),n()})}}function CHANGE_MATERIALS(){setMaterialColor("Monkey_ear.001","Principled BSDF Color",0,0,0,"green"),setMaterialColor("Monkey_ear.002","Principled BSDF Color",0,0,0,"lightblue"),replaceTexture("Cube_Texture_P_BSDF.001","rock_texture_01.jpg","./rock_texture_02.jpg",function(){}),setMaterialColor("Cube_Texture_P_BSDF.001","Principled BSDF Color",0,0,0,"black"),replaceTexture("Cube_Texture_P_BSDF.002","rock_texture_01.jpg","./rock_texture_03.jpg",function(){}),setMaterialColor("Cube_Texture_P_BSDF.002","Principled BSDF Color",0,0,0,"blue"),setMaterialColor("Cube_RGB.001","RGB",0,0,0,"green"),setMaterialColor("Cube_RGB.002","RGB",0,0,0,"lightblue"),setMaterialColor("Torus_02.001","Principled BSDF Color",0,0,0,"green"),setMaterialColor("Torus_02.002","Principled BSDF Color",0,0,0,"lightblue"),COPY_MATERIALS()}function renameObject(){return function(e,t){e&&"<none>"!=e?function(){let o;o=e instanceof v3d.Mesh?e:app.scene.getObjectByName(e);o.name=t}():console.log("Rename Object Puzzle needs an object!")}.apply(null,arguments)}function renameMaterial(){return function(e,t){let o;function n(e,t){app.scene.traverse(function(o){o instanceof v3d.Mesh&&(console.log("rename material Puzzle is a mesh."),o.material.name==e&&(o.material.name=t))})}e instanceof v3d.Mesh?o=e:n(o=app.scene.getObjectByName(e),t),n(e,t)}.apply(null,arguments)}function RENAME_OBJECTS_AND_MATERIALS(){renameObject("Cube","myCube"),renameMaterial("Cube_2_material_1","myCube_1_material_1"),renameMaterial("Cube_2_material_2","myCube_2_material_1")}function getAllObjectCopiesGroups(){return function(copySessionId){const puzzleName="Get All Object Copies Groups";let result;function mainFunction(){let copySessionID_copyObjectsGroupNames_ToEval=`if ( typeof window.${copySessionId}.copyObjectsGroupNames !== 'undefined')\n        {\n            result = window.${copySessionId}.copyObjectsGroupNames;\n\n        }`;eval(copySessionID_copyObjectsGroupNames_ToEval)}return void 0===copySessionId||""==copySessionId?console.log("[ GLIFTEK ]: The ",puzzleName,"plugin puzzle is missing an input!"):mainFunction(),result}.apply(null,arguments)}function SET_LIST_object_copies_groups(){LIST_object_copies_groups=getAllObjectCopiesGroups(ordered_list_boolean?"Ordered_Copy_Session_01":"Unordered_Copy_Session_01"),console.log("LIST_object_copies_groups: "),console.log(LIST_object_copies_groups),changeVis(LIST_my_New_Group,!1)}function addObjectsToGroup(){return function(e,t,o){const n="Add Object(s) to Group";t&&"<none>"!=t?function(){function r(o){function r(t){for(let i=0;i<t.length;i++){let c=t[i];if(null==c||"undefined"==c)console.log("[ GLIFTEK ]: The ",n,"plugin puzzle is missing an input in list slot",i+1);else if(c instanceof v3d.Mesh==1){const e=c;r(e)}else if(c instanceof v3d.Mesh==0){const e=app.scene.getObjectByName(c);r(e)}function r(t){"add"==e?a(t):"remove"==e&&s(t)}function a(e){e.groupNames.push(o)}function s(e){for(let t=0;t<e.groupNames.length;t++)e.groupNames[t]==o?e.groupNames.pop(o):console.log("[ GLIFTEK ]: The ",n,"plugin puzzle says",o,"is not an existing group.")}}}!function(){if(Array.isArray(t)){if(Array.isArray(t)){const e=t;r(e)}}else{const e=[];e.push(t),r(e)}}()}!function(e){e[0]?"GROUP"==e[0]?r(e=e[1]):"GROUP"!==e[0]&&r(e):r(e)}(o)}():console.log("[ GLIFTEK ]: The ",n,"plugin puzzle is missing an input!")}.apply(null,arguments)}function getGroupByName(){return function(e){let t;return e?t=["GROUP",e]:console.log("[ GLIFTEK ]: The","Get Group By Variable Name","plugin puzzle is missing an input!"),t}.apply(null,arguments)}function outline(e,t){var o=retrieveObjectNames(e);if(appInstance.postprocessing&&appInstance.postprocessing.outlinePass)for(var n=appInstance.postprocessing.outlinePass.selectedObjects,r=0;r<o.length;r++){var a=getObjectByName(o[r]);if(a)if("ENABLE"==t)-1==n.indexOf(a)&&n.push(a);else{var s=n.indexOf(a);s>-1&&n.splice(s,1)}}}function initObjectPicking(e,t,o,n){var r=appInstance.renderer.domElement;if(r.addEventListener(t,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([r,t,l]),"mousedown"==t){var a=o?"touchstart":"touchend";r.addEventListener(a,l),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([r,a,l])}else if("dblclick"==t){var s=0;function i(e){var t=(new Date).getTime()-s;if(t<600&&t>0)return l(e),void(s=0);s=(new Date).getTime()}a=o?"touchstart":"touchend";r.addEventListener(a,i),v3d.PL.editorEventListeners&&v3d.PL.editorEventListeners.push([r,a,i])}var c=new v3d.Raycaster;function l(t){if(appInstance.getCamera()){t.preventDefault();var o=0,a=0;if(t instanceof MouseEvent){if(n&&-1==n.indexOf(t.button))return;o=t.offsetX/r.clientWidth,a=t.offsetY/r.clientHeight}else if(t instanceof TouchEvent){var s=r.getBoundingClientRect();o=(t.changedTouches[0].clientX-s.left)/s.width,a=(t.changedTouches[0].clientY-s.top)/s.height}_pGlob.screenCoords.x=2*o-1,_pGlob.screenCoords.y=2*-a+1,c.setFromCamera(_pGlob.screenCoords,appInstance.getCamera(!0));var i=[];appInstance.scene.traverse(function(e){i.push(e)});var l=c.intersectObjects(i);e(l,t)}}}function objectsIncludeObj(e,t){if(!t)return!1;for(var o=0;o<e.length;o++){if(t==e[o])return!0;var n=getObjectByName(e[o]);if(n&&"Group"==n.type)for(var r=0;r<n.children.length;r++)if(t==n.children[r].name)return!0}return!1}function getPickedObjectName(e){return e.isMesh&&e.isMaterialGeneratedMesh&&e.parent?e.parent.name:e.name}function registerOnHover(e,t,o,n){_pGlob.objHoverInfo=_pGlob.objHoverInfo||[],_pGlob.objHoverInfo.push({objSelector:e,callbacks:[o,n],xRay:t})}function GROUP_OBJECTS(){addObjectsToGroup("add",["myCube","Monkey","Torus"],my_New_GroupName="my_New_GroupName"),registerOnHover(LIST_my_New_Group=getObjectsFrom(getGroupByName(my_New_GroupName),"MESH"),!1,function(){outline(_pGlob.hoveredObject,"ENABLE")},function(){outline(_pGlob.hoveredObject,"DISABLE")})}function subsequenceFromEndLast(e,t){var o=e.length-1-t,n=e.length-1+1;return e.slice(o,n)}function getCoordSystem(){var e=appInstance.scene;return e&&"v3d"in e.userData&&"coordSystem"in e.userData.v3d?e.userData.v3d.coordSystem:"Z_UP_RIGHT"}function coordsTransform(e,t,o,n){if(t==o)return e;var r=e.y,a=e.z;return"Z_UP_RIGHT"==t&&"Y_UP_RIGHT"==o?(e.y=a,e.z=n?r:-r):"Y_UP_RIGHT"==t&&"Z_UP_RIGHT"==o?(e.y=n?a:-a,e.z=r):console.error("coordsTransform: Unsupported coordinate space"),e}initObjectPicking(function(e,t){var o=_pGlob.hoveredObject,n="";_pGlob.objHoverInfo=_pGlob.objHoverInfo||[];var r=1/0;_pGlob.objHoverInfo.forEach(function(t){for(var o=t.xRay?e.length:Math.min(1,e.length),a=0;a<o;a++){var s=getPickedObjectName(e[a].object);objectsIncludeObj(retrieveObjectNames(t.objSelector),s)&&a<=r&&(n=s,r=a)}}),o!=n&&(_pGlob.objHoverInfo.forEach(function(e){objectsIncludeObj(retrieveObjectNames(e.objSelector),o)&&(_pGlob.hoveredObject=o,e.callbacks[1](t))}),_pGlob.objHoverInfo.forEach(function(e){objectsIncludeObj(retrieveObjectNames(e.objSelector),n)&&(_pGlob.hoveredObject=n,e.callbacks[0](t))}),_pGlob.hoveredObject=n)},"mousemove",!1);var eulerV3DToBlenderShortest=(eulerTmp=new v3d.Euler,eulerTmp2=new v3d.Euler,vec3Tmp=new v3d.Vector3,function(e,t){var o=eulerTmp.copy(e).reorder("YZX"),n=eulerTmp2.copy(o).makeAlternative(),r=o.toVector3(vec3Tmp).lengthSq(),a=n.toVector3(vec3Tmp).lengthSq();return t.copy(r<a?o:n),coordsTransform(t,"Y_UP_RIGHT","Z_UP_RIGHT")}),eulerTmp,eulerTmp2,vec3Tmp;function RotationInterface(){this._userRotation=new v3d.Euler(0,0,0,"ZYX"),this._actualRotation=new v3d.Euler}function setObjTransform(e,t,o,n,r){var a=n[0],s=n[1],i=n[2],c=retrieveObjectNames(e);function l(e,t,n){r?"scale"!=o?e[o][t]+=n:e[o][t]*=n:e[o][t]=n}var u=_pGlob.vec3Tmp.set(Number(""!==a),Number(""!==s),Number(""!==i)),p=_pGlob.vec3Tmp2.set(a||0,s||0,i||0);"rotation"===o&&p.multiplyScalar(v3d.MathUtils.DEG2RAD);var _=getCoordSystem();coordsTransform(u,_,"Y_UP_RIGHT",!0),coordsTransform(p,_,"Y_UP_RIGHT","scale"===o);for(var d=0;d<c.length;d++){var m=c[d];if(m){var b=getObjectByName(m);if(b){if(t&&b.parent)b.matrixWorld.decomposeE(b.position,b.rotation,b.scale),u.x&&l(b,"x",p.x),u.y&&l(b,"y",p.y),u.z&&l(b,"z",p.z),b.matrixWorld.composeE(b.position,b.rotation,b.scale),b.matrix.multiplyMatrices(_pGlob.mat4Tmp.copy(b.parent.matrixWorld).invert(),b.matrixWorld),b.matrix.decompose(b.position,b.quaternion,b.scale);else if("rotation"===o&&"Z_UP_RIGHT"==_){coordsTransform(f=eulerV3DToBlenderShortest(b.rotation,_pGlob.eulerTmp),_,"Y_UP_RIGHT"),u.x&&(f.x=r?f.x+p.x:p.x),u.y&&(f.y=r?f.y+p.y:p.y),u.z&&(f.z=r?f.z+p.z:p.z),f.order="YZX",f.reorder(b.rotation.order),b.rotation.copy(f)}else if("rotation"===o&&"Y_UP_RIGHT"==_){var O=RotationInterface.initObject(b),f=O.getUserRotation(_pGlob.eulerTmp);u.x&&(f.x=r?f.x+p.x:p.x),u.y&&(f.y=r?f.y+p.y:p.y),u.z&&(f.z=r?f.z+p.z:p.z),O.setUserRotation(f),O.getActualRotation(b.rotation)}else u.x&&l(b,"x",p.x),u.y&&l(b,"y",p.y),u.z&&l(b,"z",p.z);b.updateMatrixWorld(!0)}}}}function POSITION_GROUPS(){for(var e in LIST_object_copies_groups){var t=getObjectsFrom(getGroupByName(list_in_move_loop=LIST_object_copies_groups[e]),"MESH");for(var o in t)i=t[o],list_number=subsequenceFromEndLast(String(i),1),setObjTransform(i,!1,"position",["",3*list_number,""],!1)}}function copyMaterialFunction(){return function(e,t){let o,n,r;e&&"<none>"!=e&&t&&"<none>"!=t?function(){"undefined"==typeof matCopiesNumber?window.matCopiesNumber=1:matCopiesNumber++;console.log("matCopiesNumber: ",matCopiesNumber),app.scene.traverse(function(t){t instanceof THREE.Mesh&&t.material.name==e&&(o=t.material)}),app.scene.traverse(function(e){e instanceof THREE.Mesh&&e.material.name==t&&(r=e,n=e.material)}),n=o.clone();if(n.name=o.name+"_Copy."+matCopiesNumber,n instanceof v3d.MeshNodeMaterial){if(console.log("material IS MeshNodeMaterial"),1===Object.keys(n.nodeTextures).length){n.nodeTextures=Object.assign({},n.nodeTextures);for(let e in n.nodeTextures){console.log("matOutputMat.nodeTextures[id]",n.nodeTextures[e]);let t=n.nodeTextures[e],o=t.clone();n.nodeTextures[e]=o,n.nodeTextures[e].needsUpdate=!0}}if(1===Object.keys(n.nodeRGB).length){let e=n.nodeRGB[0],t=e.clone();n.nodeRGB[0]=t,console.log("matOutputMat.nodeRGB[0]",n.nodeRGB[0])}n.depthWrite=!0,n.needsUpdate=!0}void 0!==r&&(r.material=n)}():console.log("[ GLIFTEK ]: The ","Copy Material","plugin puzzle is missing an input!")}.apply(null,arguments)}function COPY_MATERIALS(){copyMaterialFunction("Cube_Texture_P_BSDF.001","Monkey_mouth.000"),setMaterialColor("Cube_Texture_P_BSDF.001_Copy.2","Principled BSDF Color",0,0,0,"teal"),copyMaterialFunction("Cube_Texture_P_BSDF.001","Monkey_ear.000"),setMaterialColor("Cube_Texture_P_BSDF.001_Copy.1","Principled BSDF Color",0,0,0,"purple"),copyMaterialFunction("Cube_Texture_P_BSDF.002","Torus_02.001"),setMaterialColor("Cube_Texture_P_BSDF.002_Copy.3","Principled BSDF Color",0,0,0,"green")}function copyObjects(){return function(objCount,mainInput,suffixInput,groupNameInput,copySessionId,orderedGroupsCheckbox){let copySessionID_copyObjectsGroupNames_ToEval=`window.${copySessionId} = [];\n    window.${copySessionId}.copyObjectsGroupNames = [];`;eval(copySessionID_copyObjectsGroupNames_ToEval);let copySessionID_allCopyObjects_ToEval=`window.${copySessionId}.allCopyObjects = [];`,objArray_ItemCount,objArray,newObjectCopy,objInputObj;eval(copySessionID_allCopyObjects_ToEval);let objInput_Parts=[],objInput_Materials,LIST_objectCopies=[],group,singleObj,copy_Material_Type;const puzzleName="Copy Objects";function mainFunction(){let sourceObjectsMAP=new Map,sourceObjectsCount;function formatNumber(e){return(e=e.toLocaleString(void 0,{minimumIntegerDigits:3})).replace(/,/g,"")}function arrayCheck(){if(Array.isArray(mainInput)){if(Array.isArray(mainInput)){for(let e=0;e<mainInput.length;e++){let t=mainInput[e];sourceObjectsMAP.set(t,formatNumber(e))}checkOrderedGroupsCheckbox()}}else sourceObjectsMAP.set(mainInput,"000"),checkOrderedGroupsCheckbox()}function checkOrderedGroupsCheckbox(){1==orderedGroupsCheckbox?makeGroups_ORDERED():0==orderedGroupsCheckbox&&makeGroups_UN_ORDERED()}function makeGroups_ORDERED(){for(let entry of sourceObjectsMAP.entries()){let groupName=groupNameInput+"."+entry[1],sessionID_andGroupNames_Push_groupName_Evaled=eval(`window.${copySessionId}.copyObjectsGroupNames.push(groupName);`);console.log("sessionID_andGroupNames_Push_groupName_Evaled",sessionID_andGroupNames_Push_groupName_Evaled);let objGroup=new THREE.Group;objGroup.name=groupName}make_ORDERED_Copies()}function makeGroups_UN_ORDERED(){for(let c=0;c<objCount;c++){let groupNumber=formatNumber(c),groupName=groupNameInput+"."+groupNumber,sessionID_andGroupNames_Push_groupName_Evaled=eval(`window.${copySessionId}.copyObjectsGroupNames.push(groupName);`);console.log("sessionID_andGroupNames_Push_groupName_Evaled",sessionID_andGroupNames_Push_groupName_Evaled);let objGroup=new THREE.Group;objGroup.name=groupName}make_UN_ORDERED_Copies()}function make_ORDERED_Copies(){console.log("making ORDERED list of object copies");let suffix="_Copy_";for(let entry of sourceObjectsMAP.entries())for(let c=0;c<objCount;c++){let copyNumber=formatNumber(c),thisNewObject=copyObjects(entry[0]),suffix=suffixInput,nameEnd=suffix+"."+copyNumber,thisGroupName=groupNameInput+"."+entry[1];if(thisNewObject.name=thisNewObject.name+nameEnd,console.log("thisNewObject.name",thisNewObject.name),thisNewObject instanceof v3d.Group){let e=thisNewObject.children.length;console.log("objParts_Amount",e);for(let t=0;t<e;t++)thisNewObject.children[t].material.name=thisNewObject.children[t].material.name+nameEnd,console.log("thisNewObject.children[i].material.name",thisNewObject.children[t].material.name)}else thisNewObject.material.name=thisNewObject.material.name+nameEnd;thisNewObject.groupNames.push(thisGroupName);let sessionID_andAllCopyObjects_Push_thisNewObject=`window.${copySessionId}.allCopyObjects.push(thisNewObject.name);`,sessionID_andAllCopyObjects_Push_thisNewObject_Evaled=eval(sessionID_andAllCopyObjects_Push_thisNewObject);console.log("sessionID_andAllCopyObjects_Push_thisNewObject_Evaled",sessionID_andAllCopyObjects_Push_thisNewObject_Evaled),app.scene.add(thisNewObject)}}function make_UN_ORDERED_Copies(){console.log("making UN-ordered list of object copies");for(let a=0;a<eval(`window.${copySessionId}.copyObjectsGroupNames`).length;a++){let groupNumber=formatNumber(a),thisGroupName=eval(`window.${copySessionId}.copyObjectsGroupNames[a];`),objCountNumber=formatNumber(a);for(let entry of sourceObjectsMAP.entries()){let thisNewObject=copyObjects(entry[0]);console.log("entry[0]:",entry[0]);let suffix=suffixInput,nameEnd=suffix+"."+groupNumber;if(thisNewObject.name=thisNewObject.name+nameEnd,console.log("thisNewObject:",thisNewObject),thisNewObject instanceof v3d.Group){let e=thisNewObject.children.length;console.log("objParts_Amount",e);for(let t=0;t<e;t++)thisNewObject.children[t].material.name=thisNewObject.children[t].material.name+nameEnd,console.log("thisNewObject.children[i].material.name",thisNewObject.children[t].material.name)}else thisNewObject.material.name=thisNewObject.material.name+nameEnd;thisNewObject.groupNames.push(thisGroupName);let sessionID_andAllCopyObjects_Push_thisNewObject=`window.${copySessionId}.allCopyObjects.push(thisNewObject.name);`,sessionID_andAllCopyObjects_Push_thisNewObject_Evaled=eval(sessionID_andAllCopyObjects_Push_thisNewObject);console.log("sessionID_andAllCopyObjects_Push_thisNewObject_Evaled",sessionID_andAllCopyObjects_Push_thisNewObject_Evaled),app.scene.add(thisNewObject)}}}function copyObjects(e){let t;function o(){let e=objInputObj.children.length;console.log("objParts_Amount",e),(group=new v3d.Group).name=objInputObj.name;for(let t=0;t<e;t++){let o=objInputObj.children[t];console.log("objPart",o);let r=n(o);console.log("objPartCopy",r),console.log("i iteration : ",t),group.add(r),console.log("group",group),t==e&&(console.log("i iteration : ",t,"equals objParts_Amount:",e),app.scene.add(group))}}function n(e){let t=e.clone();t.geometry.dispose();e.geometry.clone();let o=e.material.clone();if(t.material.dispose(),t.material=o,e.material instanceof v3d.MeshNodeMaterial){if(console.log("material IS MeshNodeMaterial"),1===Object.keys(e.material.nodeTextures).length){t.material.nodeTextures=Object.assign({},t.material.nodeTextures);for(let e in t.material.nodeTextures){console.log("copyPart.material.nodeTextures[id]",t.material.nodeTextures[e]);let o=t.material.nodeTextures[e].clone();t.material.nodeTextures[e]=o,t.material.nodeTextures[e].needsUpdate=!0}}if(1===Object.keys(e.material.nodeRGB).length){console.log(t.name,".material.nodeRGB.length: ",t.material.nodeRGB.length);let o=e.material.nodeRGB[0].clone();t.material.nodeRGB[0]=o,console.log("copyPart.material.nodeRGB[0]",t.material.nodeRGB[0])}t.material.depthWrite=!0,t.material.needsUpdate=!0}return singleObj=t,t}return e instanceof v3d.Group?(console.log("objInputObj",objInputObj,"is a GROUP"),objInputObj.children.length>0&&(objInputObj.children.forEach(e=>objInput_Parts.push(e)),console.log("objInputObj",objInputObj.name,"objInput_Parts:",objInput_Parts),objInput_Materials=new Set,objInputObj.traverse(function(e){if(e.material){e.material.name=e.material.name+nameEnd;let t=e.material;objInput_Materials.add(t)}}),console.log("objInputObj",objInputObj.name,"objInput_Parts materials:",objInput_Materials),o())):e instanceof v3d.Mesh||e instanceof v3d.Object3D?(console.log("objInputObj",e,"is a MESH"),n(objInputObj=e)):(console.log("objInputObj",e,"is a STRING, getting object..."),(objInputObj=app.scene.getObjectByName(e))instanceof v3d.Group?(console.log("objInputObj",objInputObj.name,"is a GROUP"),copy_Material_Type="multiple",o()):objInputObj instanceof v3d.Mesh&&(copy_Material_Type="single",n(objInputObj))),"single"==copy_Material_Type?(t=singleObj,console.log("result at END",t),t):"multiple"==copy_Material_Type?(t=group,console.log("result at END",t),t):void 0}arrayCheck()}mainInput&&"<none>"!=mainInput?mainFunction():console.log("[ GLIFTEK ]: The ",puzzleName,"plugin puzzle is missing an input!")}.apply(null,arguments)}function COPY_OBJECTS_ORDERED_GROUP(){ordered_list_boolean=!0,scene_reset=!1,copyObjects(3,LIST_my_New_Group,"","Ordered_Group","Ordered_Copy_Session_01",!0),AFTER_COPY_PROCEDURES()}function COPY_OBJECTS_UN_ORDERED_GROUP(){ordered_list_boolean=!1,scene_reset=!1,copyObjects(3,LIST_my_New_Group,"","UnOrdered_Group","Unordered_Copy_Session_01",!1),AFTER_COPY_PROCEDURES()}function HOVER_GROUPS(){registerOnHover(["ALL_OBJECTS"],!1,function(){HOVER_LOOP(!0)},function(){HOVER_LOOP(!1)})}function getGroupsFromObject(){return function(e){let t;return e&&void 0!==e?function(){let o;o=e instanceof v3d.Mesh?e:app.scene.getObjectByName(e);t=o.groupNames}():console.log("[ GLIFTEK ]: The","Get Object Groups","plugin puzzle is missing an input!"),t}.apply(null,arguments)}function HOVER_LOOP(e){for(var t in LIST_object_copies_groups)this_group_name=LIST_object_copies_groups[t],getGroupsFromObject(_pGlob.hoveredObject)==this_group_name&&(this_group=getGroupByName(this_group_name),outline(e?this_group:null,"ENABLE"),outline(e?null:this_group,"DISABLE"))}function registerOnClick(e,t,o,n,r,a){_pGlob.objClickInfo=_pGlob.objClickInfo||[],_pGlob.objClickInfo.push({objSelector:e,callbacks:[r,a]}),initObjectPicking(function(o,n){for(var s=!1,i=t?o.length:Math.min(1,o.length),c=0;c<i;c++){var l=getPickedObjectName(o[c].object);objectsIncludeObj(retrieveObjectNames(e),l)&&(_pGlob.pickedObject=l,s=!0,r(n))}s||(_pGlob.pickedObject="",a(n))},o?"dblclick":"mousedown",!1,n)}function CLICK_MENU_ITEMS(){registerOnClick("ordered_hitbox",!1,!1,[0,1,2],function(){console.log("button_copy_objects_ordered_groups CLICKED!"),1==scene_reset&&COPY_OBJECTS_ORDERED_GROUP()},function(){}),registerOnClick("un-ordered_hitbox",!1,!1,[0,1,2],function(){console.log("button_copy_objects_UN_ordered_groups CLICKED!"),1==scene_reset&&COPY_OBJECTS_UN_ORDERED_GROUP()},function(){}),registerOnClick("reset_hitbox",!1,!1,[0,1,2],function(){console.log("button_reset CLICKED!"),0==scene_reset&&RESET_SCENE()},function(){})}function removeObject(e){for(var t=retrieveObjectNames(e),o=0;o<t.length;o++){var n=t[o];if(n){var r=getObjectByName(n);r&&r.parent&&(r.parent.remove(r),_pGlob.objCache={})}}}function RESET_SCENE(){scene_reset=!0,removeObject(LIST_Objects_To_Remove),changeVis(["myCube","Monkey","Torus"],!0)}function getElements(e,t){var o=[];if(Array.isArray(e)&&"CONTAINER"!=e[0]&&"WINDOW"!=e[0]&&"DOCUMENT"!=e[0]&&"BODY"!=e[0]&&"QUERYSELECTOR"!=e[0])for(var n=0;n<e.length;n++)o.push(getElement(e[n],t));else o.push(getElement(e,t));return o}function getElement(e,t){var o;if(Array.isArray(e)&&"CONTAINER"==e[0]){if(null!==appInstance)o=appInstance.container;else if("undefined"!=typeof _initGlob){e=_initGlob.container;o=t?parent.document.getElementById(e):document.getElementById(e)}}else o=Array.isArray(e)&&"WINDOW"==e[0]?t?parent:window:Array.isArray(e)&&"DOCUMENT"==e[0]?t?parent.document:document:Array.isArray(e)&&"BODY"==e[0]?t?parent.document.body:document.body:Array.isArray(e)&&"QUERYSELECTOR"==e[0]?t?parent.document.querySelector(e):document.querySelector(e):t?parent.document.getElementById(e):document.getElementById(e);return o}function setHTMLElemStyle(e,t,o,n){for(var r=getElements(o,n),a=0;a<r.length;a++){var s=r[a];s&&s.style&&(s.style[e]=t)}}function HOVER_3D_BUTTON_HITBOXES(){registerOnHover(LIST_hover_buttons,!0,function(){setHTMLElemStyle("cursor","pointer",["CONTAINER"],!1)},function(){setHTMLElemStyle("cursor","default",["CONTAINER"],!1)})}Object.assign(RotationInterface,{initObject:function(e){void 0===e.userData.v3d.puzzles&&(e.userData.v3d.puzzles={}),void 0===e.userData.v3d.puzzles.rotationInterface&&(e.userData.v3d.puzzles.rotationInterface=new RotationInterface);var t=e.userData.v3d.puzzles.rotationInterface;return t.updateFromObject(e),t}}),Object.assign(RotationInterface.prototype,{updateFromObject:function(e){this._actualRotation.equalsEps(e.rotation,1e-8)||(this._actualRotation.copy(e.rotation),this._updateUserRotFromActualRot())},getActualRotation:function(e){return e.copy(this._actualRotation)},setUserRotation:function(e){this._userRotation.set(e.x,e.y,e.z),this._updateActualRotFromUserRot()},getUserRotation:function(e){return e.copy(this._userRotation)},_updateUserRotFromActualRot:function(){var e=this._userRotation.order;this._userRotation.copy(this._actualRotation).reorder(e)},_updateActualRotFromUserRot:function(){var e=this._actualRotation.order;this._actualRotation.copy(this._userRotation).reorder(e)}}),MAIN()}}();