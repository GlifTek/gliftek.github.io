// makeSiteModals();
// function makeSiteModals()
// {

window.imgCounter = 1;

window.LIST_pageContentsList = [];
window.LIST_imgNames = [];
window.LIST_imgCSSNames = [];
window.LIST_closeButtonCSSNames = [];
window.LIST_closeButtonHoverCSSNames = [];
window.LIST_closeButtonFocusCSSNames = [];

//____________________________________________________________________________________________________

//  GET PAGE TABLE OF CONTENTS LIST OF PLUGINS, ANC THEIR COUNT, MAKE A LIST
let pageContentsList = document.getElementById('pageContentsList').getElementsByTagName('li');
console.log('pageContentsList:',pageContentsList);

//____________________________________________________________________________________________________


makeLIST_pageContents();

function makeLIST_pageContents()
{

  for( let i = 0; i < ( pageContentsList.length ); i++ )
  {
      let li = pageContentsList[i];
      
      let li_href_nodeValue = li.firstChild.attributes.href.nodeValue;
      console.log('li_href_nodeValue:',li_href_nodeValue);

      let slice_nodeValue = li_href_nodeValue.slice(1);
      console.log('slice_nodeValue:',slice_nodeValue);

      LIST_pageContentsList.push(slice_nodeValue);
  }

  console.log('LIST_pageContentsList:',LIST_pageContentsList);

};

//____________________________________________________________________________________________________

makeAllModals();

function makeAllModals()
{
  // let numberOfModals = LIST_pageContentsList.length;

  for( let i = 1; i < ( LIST_pageContentsList.length + 1 ); i++ )
  {

    let n; 

    if ( i < 10 )
    {
        n = 'PIC_0' + i;               
    }

    else if ( i >= 10 )
    {
        n = 'PIC_' + i;
    }


    LIST_imgNames.push(n);        

    let modalDiv = document.createElement('div');
    modalDiv.id = 'modalDiv_' + n ;
    modalDiv.className = 'modal';
    document.body.appendChild(modalDiv);

    let modalSpan = document.createElement('span');
    modalSpan.id = 'close_' + n ;
    modalSpan.innerHTML = '&times;';
    modalDiv.appendChild(modalSpan);

    let modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modalImg.id = 'modal_' + n ;
    modalDiv.appendChild(modalImg);

    let modalCaption = document.createElement('div');
    modalCaption.id = 'caption_' + n ;
    modalDiv.appendChild(modalCaption);


    let imgPicName = 
    '#img_' + n;
    LIST_imgCSSNames.push(imgPicName);

    let closeButtonName = 
    '#close_' + n;
    LIST_closeButtonCSSNames.push(closeButtonName);

    let closeButtonHoverName = 
    '#close_' + n + ':hover';
    LIST_closeButtonHoverCSSNames.push(closeButtonHoverName);

    let closeButtonFocusName = 
    '#close_' + n + ':focus';
    LIST_closeButtonFocusCSSNames.push(closeButtonFocusName);

  };  //  END for loop

  console.log('LIST_imgNames: ',LIST_imgNames);

};


//____________________________________________________________________________________________________


window.modalPageImageInfo = function modalPageImageInfo ( pluginPack )
{
  window.modalPageImage_pluginPack = pluginPack;
  console.log('modalPageImage_pluginPack:',modalPageImage_pluginPack);

  makeAllDivs ( '_plugin', 'width: 75%');
  makeAllDivs( '_example', 'width: 85%');
  makeAllDivs( '_console', 'width: 85%');

};

//____________________________________________________________________________________________________

function makeAllDivs(suffix, width)
{
  for( let i = 0; i < ( LIST_pageContentsList.length ); i++ )
  {

    let item = LIST_pageContentsList[i];
    console.log('LIST_pageContentsList item: ',item);

    // modalPageImage ( item, 'width: 85%' );
    
    makeSingleDiv ( item, suffix, width )

  };
};

//____________________________________________________________________________________________________


function makeSingleDiv ( imageName, suffix, width )
{

  console.log('imgCounter:',imgCounter);

  console.log('LIST_pageContentsList.length:',LIST_pageContentsList.length);


  for( let i = 1; i < ( LIST_pageContentsList.length + 1 ); i++ )
  {


    let i = imgCounter;

    if ( i < 10 )
    {
        n = 'PIC_0' + i;               
    }

    else if ( i >= 10 )
    {
        n = 'PIC_' + i;
    }


    console.log('suffix before:',suffix);


    let imgSuffix;

    if ( suffix == '_plugin')
    { 
      imgSuffix = '';
    }

    else
    {
      imgSuffix = suffix;
    }


    console.log('imgSuffix:',imgSuffix);

    let imageNameFull =
    './images/GLIFTEK_plugins_' + modalPageImage_pluginPack + '_' + imageName + imgSuffix + '.png';
    console.log('imageNameFull:',imageNameFull);



    try 
    {
      let requiredFile = require(imageNameFull);

      if ( typeof requiredFile !== 'undefined' )
      {
        console.log('imageNameFull',imageNameFull, 'exists!');
        doImageDivs(n);
      }
      
    }

    catch (error) 
    {
      console.log('imageNameFull',imageNameFull, 'does not exist!')
    }



    function doImageDivs(n)
    {

      let pageImage = document.createElement('img');
      pageImage.className = 'modal-content';
      pageImage.id = 'img_' + n;


      let divName  = 'div' + suffix + '_' + n;
      console.log('divName:',divName);
      let div = document.getElementById(divName);

      
    // if ( !div )
    // {console.log('div',div, 'does not exist.')}
    // else 
    // { 



      div.appendChild(pageImage);
      console.log('modalPageImage result:',pageImage);

      pageImage.src = imageNameFull;
      pageImage.alt = imageName;
      pageImage.style = width;

    }//  END doImageDivs()



    if ( imgCounter >= ( LIST_pageContentsList.length  ) )
    {
      imgCounter = 1;
    }

    else
    {
      imgCounter ++;
    }

  } //  end for

}; // END modalImageForDiv


//____________________________________________________________________________________________________

    /* Style the Image Used to Trigger the Modal */

    function setstyleVar()
    {
        let result = 
        `
        :root
        {
          counter-reset: id;
        }

        ${LIST_imgCSSNames}
        {
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }

        ${LIST_closeButtonCSSNames}
        {
            position: relative;
            top: 15px;            
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
        }

        ${LIST_closeButtonHoverCSSNames},
        ${LIST_closeButtonFocusCSSNames}
        {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
        }


        /* The Modal (background) */
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
        }
        
        /* Modal Content (Image) */
        .modal-content {
          margin: auto;
          display: block;
          width: 150%;
          /* max-width: 700px; */
          
        }
        
        /* Caption of Modal Image (Image Text) - Same Width as the Image */
        #caption {
          margin: auto;
          display: block;
          width: 80%;
          max-width: 700px;
          text-align: center;
          color: #ccc;
          padding: 10px 0;
          height: 150px;
        }
        

        /* incriment image div id's */

        .imgDiv
        {
          counter-increment: id;
        }

        .imgDiv:empty::after
        {
          content: '[' id counter(id) ']';
          
        }


        /* Add Animation - Zoom in the Modal */
        .modal-content, #caption {
          animation-name: zoom;
          animation-duration: 0.6s;
        }
        
        @keyframes zoom {
          from {transform:scale(0)}
          to {transform:scale(1)}
        }
        `
        // console.log('LIST_imgCSSNames result: ',result);
        return result;
    }

    setStyle();

    function setStyle()
    {
        let styleVar = setstyleVar();  //  sets all modal styles
        let style = document.createElement('style');
        style.id = 'modalSiteStyles';   
        style.innerHTML = styleVar;
        document.head.appendChild(style);
    };



//________________________________________________________________________________

    window.addEventListener("load", event => {

      LIST_imgNames.forEach(modalFunction);
  
    });
  
//________________________________________________________________________________
  
    function modalFunction(imgName)
    {
        // console.log('running modal Function with ' + imgName + ' as item / imgName');
        // Get the modal
    
        var modal = document.getElementById('modalDiv_' + imgName);    
    
        var img = document.getElementById('img_' + imgName);
    
        var modalImg = document.getElementById('modal_' + imgName);
    
        var captionText = document.getElementById('caption_' + imgName);
    
        img.onclick = function(){
            modal.style.display = "block";        
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    
        // Get the <span> element that closes the modal
        var span = document.getElementById('close_' + imgName);
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        // console.log('close button for ' + imgName + ' clicked.');
        modal.style.display = "none";
        } 
    
    };  //  END modalFunction();

// }; // END makeSiteModals
