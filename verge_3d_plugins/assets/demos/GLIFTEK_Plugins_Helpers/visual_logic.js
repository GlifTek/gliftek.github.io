/**
 * Generated by Verge3D Puzzles v.3.7.0
 * Fri Aug 20 2021 17:17:57 GMT-0400 (Eastern Daylight Time)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

'use strict';

(function() {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();

var PL = v3d.PL = v3d.PL || {};

// a more readable alias for PL (stands for "Puzzle Logic")
v3d.puzzles = PL;

PL.procedures = PL.procedures || {};




PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    var PROC = {
    
};

// initSettings puzzle
_initGlob.output.initOptions.fadeAnnotations = true;
_initGlob.output.initOptions.useBkgTransp = true;
_initGlob.output.initOptions.preserveDrawBuf = false;
_initGlob.output.initOptions.useCompAssets = false;
_initGlob.output.initOptions.useFullscreen = true;

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}

this.procedures["MAIN"] = MAIN;

var PROC = {
    "MAIN": MAIN,
};


function createGridHelper() {
    return (function

//________________________________________________________________________________
// ALL ARGUMENTS USED FROM INPUTS

    (
        gridSize,
        divisions,
        colorGrid,
        colorCenterLine
    )
    {   //  BEGIN Plug.provide Function

//________________________________________________________________________________
//  MAIN FUNCTION

        mainFunction();
        function mainFunction()
        {
//________________________________________________________________________________
//  PUZZLE CORE CODE


            if (typeof gridHelperNumber == 'undefined')

                { window.gridHelperNumber = 1 }

            else {  gridHelperNumber++  };



            let gridHelperParent = new v3d.Object3D();

            let gridHelper = new v3d.GridHelper(gridSize, divisions, colorCenterLine, colorGrid);

            gridHelper.raycast = function() {};



            gridHelper.rotateX(v3d.Math.degToRad(-90));

            gridHelperParent.add(gridHelper);

            gridHelperParent.rotateX(v3d.Math.degToRad(-90));



            gridHelperParent.name = 'gridHelper_' + gridHelperNumber;

            app.scene.add(gridHelperParent);

//________________________________________________________________________________
        };  // END mainFunction
//________________________________________________________________________________
    }).apply(null, arguments);
}




// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            if (runTime) {
                _pGlob.objCache[objName] = objFound;
            }
        }
    });
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}





/**
 * Retrieve coordinate system from the loaded scene
 */
function getCoordSystem() {
    var scene = appInstance.scene;

    if (scene && "v3d" in scene.userData && "coordSystem" in scene.userData.v3d) {
        return scene.userData.v3d.coordSystem;
    } else {
        // COMPAT: <2.17, consider replacing to 'Y_UP_RIGHT' for scenes with unknown origin
        return 'Z_UP_RIGHT';
    }
}


/**
 * Transform coordinates from one space to another
 * Can be used with Vector3 or Euler.
 */
function coordsTransform(coords, from, to, noSignChange) {

    if (from == to)
        return coords;

    var y = coords.y, z = coords.z;

    if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
        coords.y = z;
        coords.z = noSignChange ? y : -y;
    } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
        coords.y = noSignChange ? z : -z;
        coords.z = y;
    } else {
        console.error('coordsTransform: Unsupported coordinate space');
    }

    return coords;
}


/**
 * Verge3D euler rotation to Blender/Max shortest.
 * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
 *    order) via reversion: XYZ -> ZYX
 * 2) swizzle ZYX->YZX
 * 3) choose the shortest rotation to resemble Blender's behavior
 */
var eulerV3DToBlenderShortest = function() {

    var eulerTmp = new v3d.Euler();
    var eulerTmp2 = new v3d.Euler();
    var vec3Tmp = new v3d.Vector3();

    return function(euler, dest) {

        var eulerBlender = eulerTmp.copy(euler).reorder('YZX');
        var eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

        var len = eulerBlender.toVector3(vec3Tmp).lengthSq();
        var lenAlt = eulerBlenderAlt.toVector3(vec3Tmp).lengthSq();

        dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
        return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
    }

}();




function RotationInterface() {
    /**
     * For user manipulations use XYZ extrinsic rotations (which
     * are the same as ZYX intrinsic rotations)
     *     - Blender/Max/Maya use extrinsic rotations in the UI
     *     - XYZ is the default option, but could be set from
     *       some order hint if exported
     */
    this._userRotation = new v3d.Euler(0, 0, 0, 'ZYX');
    this._actualRotation = new v3d.Euler();
}

Object.assign(RotationInterface, {
    initObject: function(obj) {
        if (obj.userData.v3d.puzzles === undefined) {
            obj.userData.v3d.puzzles = {}
        }
        if (obj.userData.v3d.puzzles.rotationInterface === undefined) {
            obj.userData.v3d.puzzles.rotationInterface = new RotationInterface();
        }

        var rotUI = obj.userData.v3d.puzzles.rotationInterface;
        rotUI.updateFromObject(obj);
        return rotUI;
    }
});

Object.assign(RotationInterface.prototype, {

    updateFromObject: function(obj) {
        var SYNC_ROT_EPS = 1e-8;

        if (!this._actualRotation.equalsEps(obj.rotation, SYNC_ROT_EPS)) {
            this._actualRotation.copy(obj.rotation);
            this._updateUserRotFromActualRot();
        }
    },

    getActualRotation: function(euler) {
        return euler.copy(this._actualRotation);
    },

    setUserRotation: function(euler) {
        // don't copy the order, since it's fixed to ZYX for now
        this._userRotation.set(euler.x, euler.y, euler.z);
        this._updateActualRotFromUserRot();
    },

    getUserRotation: function(euler) {
        return euler.copy(this._userRotation);
    },

    _updateUserRotFromActualRot: function() {
        var order = this._userRotation.order;
        this._userRotation.copy(this._actualRotation).reorder(order);
    },

    _updateActualRotFromUserRot: function() {
        var order = this._actualRotation.order;
        this._actualRotation.copy(this._userRotation).reorder(order);
    }

});




// setObjTransform puzzle
function setObjTransform(objSelector, mode, vector, offset){
    var x = vector[0];
      var y = vector[1];
      var z = vector[2];

    var objNames = retrieveObjectNames(objSelector);

    function setObjProp(obj, prop, val) {
        if (!offset) {
            obj[mode][prop] = val;
        } else {
            if (mode != "scale")
                obj[mode][prop] += val;
            else
                obj[mode][prop] *= val;
        }
    }

    var inputsUsed = _pGlob.vec3Tmp.set(Number(x !== ''), Number(y !== ''),
            Number(z !== ''));
    var coords = _pGlob.vec3Tmp2.set(x || 0, y || 0, z || 0);

    if (mode === 'rotation') {
        // rotations are specified in degrees
        coords.multiplyScalar(v3d.MathUtils.DEG2RAD);
    }

    var coordSystem = getCoordSystem();

    coordsTransform(inputsUsed, coordSystem, 'Y_UP_RIGHT', true);
    coordsTransform(coords, coordSystem, 'Y_UP_RIGHT', mode === 'scale');

    for (var i = 0; i < objNames.length; i++) {

        var objName = objNames[i];
        if (!objName) continue;

        var obj = getObjectByName(objName);
        if (!obj) continue;

        if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
            // Blender/Max coordinates

            // need all the rotations for order conversions, especially if some
            // inputs are not specified
            var euler = eulerV3DToBlenderShortest(obj.rotation, _pGlob.eulerTmp);
            coordsTransform(euler, coordSystem, 'Y_UP_RIGHT');

            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            /**
             * convert from Blender/Max default XYZ extrinsic order to v3d XYZ
             * intrinsic with reversion (XYZ -> ZYX) and axes swizzling (ZYX -> YZX)
             */
            euler.order = "YZX";
            euler.reorder(obj.rotation.order);
            obj.rotation.copy(euler);

        } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
            // Maya coordinates

            // Use separate rotation interface to fix ambiguous rotations for Maya,
            // might as well do the same for Blender/Max.

            var rotUI = RotationInterface.initObject(obj);
            var euler = rotUI.getUserRotation(_pGlob.eulerTmp);
            // TODO(ivan): this probably needs some reasonable wrapping
            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            rotUI.setUserRotation(euler);
            rotUI.getActualRotation(obj.rotation);
        } else {

            if (inputsUsed.x) setObjProp(obj, "x", coords.x);
            if (inputsUsed.y) setObjProp(obj, "y", coords.y);
            if (inputsUsed.z) setObjProp(obj, "z", coords.z);

        }

        obj.updateMatrixWorld(true);
    }

}



// createVector puzzle
function createVector(x, y, z) {
    return [x, y, z];
};



function createArrowHelper() {
    return (function

//________________________________________________________________________________
// ALL ARGUMENTS USED FROM INPUTS

    (
        dir,
        origin,
        length,
        hex,
        headLength,
        headWidth
    )
    {   //  BEGIN Plug.provide Function

//________________________________________________________________________________
//  MAIN FUNCTION

        mainFunction();
        function mainFunction()
        {
//________________________________________________________________________________
//  PUZZLE CORE CODE

            if (typeof arrowHelperNumber == 'undefined')

                { window.arrowHelperNumber = 1 }

            else {  arrowHelperNumber++ };



            const dirVar = new THREE.Vector3( dir[0],dir[1],dir[2] );

            //normalize the direction vector (convert to vector of length 1)
            dirVar.normalize();


            const originVar = new THREE.Vector3( origin[0],origin[1],origin[2] );


            let arrowHelper = new v3d.ArrowHelper(dirVar, originVar, length, hex);


            let arrowHelperParent = new v3d.Object3D();



            arrowHelperParent.add(arrowHelper);

            arrowHelperParent.rotateX(v3d.Math.degToRad(-90));



            arrowHelperParent.name = 'arrowHelper_' + arrowHelperNumber;

            app.scene.add(arrowHelperParent);



//________________________________________________________________________________
        };  // END mainFunction
//________________________________________________________________________________
    }).apply(null, arguments);
}



function createAxesHelper() {
    return (function

//________________________________________________________________________________
// ALL ARGUMENTS USED FROM INPUTS

    (
        axisSize
    )
    {   //  BEGIN Plug.provide Function

//________________________________________________________________________________
//  MAIN FUNCTION

        mainFunction();
        function mainFunction()
        {
//________________________________________________________________________________
//  PUZZLE CORE CODE

            if (typeof axesHelperNumber == 'undefined')

                { window.axesHelperNumber = 1 }

            else {  axesHelperNumber++ };



            let axesHelper = new v3d.AxesHelper(axisSize);

            axesHelper.raycast = function() {};



            let axesHelperParent = new v3d.Object3D();



            axesHelperParent.add(axesHelper);

            axesHelperParent.rotateX(v3d.Math.degToRad(-90));



            axesHelperParent.name = 'axesHelper_' + axesHelperNumber;

            app.scene.add(axesHelperParent);


//________________________________________________________________________________
        };  // END mainFunction
//________________________________________________________________________________
    }).apply(null, arguments);
}


// Describe this function...
function MAIN() {

          createGridHelper
          (
              10,
              10,
              'cyan',
              'white'
          )
      setObjTransform('gridHelper_1', 'rotation', ['', 90, ''], false);
  setObjTransform('gridHelper_1', 'position', [-5, '', 5], false);

          createGridHelper
          (
              10,
              10,
              'cyan',
              'white'
          )
      setObjTransform('gridHelper_2', 'rotation', ['', -90, -90], false);
  setObjTransform('gridHelper_2', 'position', ['', 5, 5], false);

          createGridHelper
          (
              10,
              10,
              'cyan',
              'white'
          )
      setObjTransform('Cube', 'position', ['', '', 1], false);

          createArrowHelper
          (
              createVector(0, -3, 0),
              createVector(0, 0, 0),
              3,
              '#4682B4',
              0.5,
              0.25
          )

          createAxesHelper
          (
              3
          )
      }


MAIN();



} // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */
