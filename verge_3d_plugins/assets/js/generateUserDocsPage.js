// window.makePage = function makePage( pluginPack_title_UpperCase, LIST_plugins )
// {
//________________________________________________________________________________
//  SET GLOBALS

set_Globals();

function set_Globals()
{
  window.page = (new URLSearchParams(window.location.search)).get('page');
  console.log('page:',page);

  if ( page == 'main_menu' )
  {
    makeMainMenuPage();
    let div = document.createElement('div');
    div.id = menMenuList;
    // div.innerHTML = 
  }

  else
  {
    // ADD EXTRA PADDING TO # LINKS
    function offsetAnchor() {
      if(location.hash.length !== 0) {
          window.scrollTo(window.scrollX, window.scrollY - 90);
      }
    }

    // This will capture hash changes while on the page
    window.addEventListener("hashchange", offsetAnchor);

    window.setTimeout(offsetAnchor, 10);
    // The delay of 1 is arbitrary and may not always work right (although it did in my testing).

    makePluginPage()
  }

  function makeMainMenuPage()
  {

  };





  function makePluginPage()
  {

  window.imgCounter = 1;

  window.LIST_PICs = [];
  window.LIST_imgCSSNames = [];
  window.LIST_closeButtonCSSNames = [];
  window.LIST_closeButtonHoverCSSNames = [];
  window.LIST_closeButtonFocusCSSNames = [];

  LIST_images_puzzle = [];
  LIST_images_example = [];
  LIST_images_console = [];
  LIST_images_extra = [];

  loadJSON();

};


//________________________________________________________________________________
//  LOAD AND PARSE JSON SITE DATA 

function loadJSON()
{
  $.getJSON("./assets/js/user_docs_siteData.json", function(json) 
  {
    // console.log(json);
    let siteData_File = json;    
    parseJSON(siteData_File)
  });
}

function parseJSON(siteData_File)
{

  let gliftek_plugins_siteData =
  siteData_File.siteData;
  console.log('gliftek_plugins_siteData:',gliftek_plugins_siteData);

  window.gliftek_contactInfo =
  gliftek_plugins_siteData.contactInfo;
  console.log('gliftek_contactInfo:',gliftek_contactInfo);

  window.gliftek_pluginPacks =
  gliftek_plugins_siteData.pluginPacks;
  console.log('gliftek_pluginPacks:',gliftek_pluginPacks);

  window.LIST_allPluginPacks =
  gliftek_plugins_siteData.pluginPacks.allPluginPacks;
  console.log('LIST_allPluginPacks:',LIST_allPluginPacks);

  window.pluginPack = eval(`gliftek_pluginPacks.${page}`);
  console.log('pluginPack:',pluginPack);

  window.pluginPack_title_UpperCase =
  page.toUpperCase();
  console.log('pluginPack_title_UpperCase:',pluginPack_title_UpperCase);

  window.LIST_pluginPack_plugins =
  pluginPack.plugins;
  console.log('LIST_pluginPack_plugins:',LIST_pluginPack_plugins);

  window.LIST_pluginPack_plugins_LENGTH =
  ( LIST_pluginPack_plugins.length );
  console.log('LIST_pluginPack_plugins_LENGTH:',LIST_pluginPack_plugins_LENGTH);

  window.LIST_pluginPack_plugins_LENGTH_minus_1 =
  ( LIST_pluginPack_plugins.length - 1 );
  console.log('LIST_pluginPack_plugins_LENGTH_minus_1:',LIST_pluginPack_plugins_LENGTH_minus_1);

  window.imageDir = gliftek_pluginPacks.imageDir;
  console.log('imageDir:',imageDir);

  window.imagePrefix = gliftek_pluginPacks.imagePrefix;
  console.log('imagePrefix:',imagePrefix);

  make_ALL_LISTS( );

};


function make_ALL_LISTS()
{
  make_LIST ( LIST_PICs, '', '', '' );
  make_LIST ( LIST_imgCSSNames, '#img_', '', '' );
  make_LIST ( LIST_closeButtonCSSNames, '#close_', '' );
  make_LIST ( LIST_closeButtonHoverCSSNames, '#close_', ':focus', '' );
  make_LIST ( LIST_closeButtonFocusCSSNames, '#close_', ':hover', '' );

  setTimeout(function(){ setStyle() }, 250);
}


function make_LIST ( list, prefix, suffix, callback )
{

  for( let i = 0; i < LIST_pluginPack_plugins_LENGTH; i++ )
  {

    let pic = setPicNumberingVar(i);

    let picName = prefix + pic + i + suffix; 
      
    // whenFinished(i, picName, list, null);

  
    // function whenFinished(i, picName, list, callback)
    // {
      list.push(picName);

      //  WHEN FINISHED, DO:
      // if ( i == LIST_pluginPack_plugins_LENGTH_minus_1 )
      // {         
      //   console.log('list:',list );
      // };

    // }// END whenFinished

  };  //  END for loop

}// END make_LIST


//________________________________________________________________________________
//  SET CSS STYLE

function setstyleVar()
{
  let result = 
  `
  :root
  {
    counter-reset: id;
  }

  /* Style the Image Used to Trigger the Modal */

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
  return result;
}


function setStyle()
{
  let styleVar = setstyleVar();
  let style = document.createElement('style');
  style.id = 'modalSiteStyles';   
  style.innerHTML = styleVar;
  document.head.appendChild(style);

  make_site_HTML();
  makeALL_OF_ALLPageImages();
};


//________________________________________________________________________________
//  MAKE ALL PAGE HTML PARTS

function makeALL_OF_ALLPageImages()
{
  console.log('MAKING ALL OF ALL PAGE IMAGES.');

  makeALLPageImages ( LIST_images_puzzle, 'puzzle' );
  makeALLPageImages ( LIST_images_example, 'example' );
  makeALLPageImages ( LIST_images_console, 'console' );
  makeALLPageImages ( LIST_images_extra, 'extra' );

}


function make_site_HTML()
{

  window.menuHeaderFooter =
`<ul class="icons">
<li><a href="${gliftek_contactInfo.discordVerge3D}" class="icon brands alt fa-discord"><span class="label">Discord</span></a></li>        
<li><a href="${gliftek_contactInfo.facebook}" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
<li><a href="${gliftek_contactInfo.instagram}" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
<li><a href="${gliftek_contactInfo.twitter}" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
<li><a href="${gliftek_contactInfo.github}" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>    
</ul>`;

  title_HTML();

  header_HTML(page);

  nav_HTML();

  storeSmall_HTML();

  intro_HTML();

  make_All_post_HTML();

  store_HTML();

  footer_HTML();

  copyright_HTML();

  

  setTimeout(doEndScript(), 500);

  function doEndScript()
  {
    console.log('DOING END SCRIPT MAIN')
    let endScript = document.createElement('script');
    
    endScript.crossOrigin = 'anonymous';
    endScript.src="./assets/js/main.js";
    // endScript.src="./main.js";
    
    
    
    endScript.onload = function () {

      console.log('MAIN.JS loaded!')
      //do stuff with the script
  };

  document.head.appendChild(endScript);   


    // var script = document.createElement('script');
    
// script.src = something;

// document.head.appendChild(script); //or something of the likes




    // jQuery.loadScript = function (url, callback) {
    //   jQuery.ajax({
    //       url: url,
    //       dataType: 'script',
    //       success: callback,
    //       async: true
    //   });

    //   if (typeof someObject == 'undefined') $.loadScript('./assets/js/main.js', function(){
    //     //Stuff to do after someScript has loaded
    // });
  // }


  }



};


//________________________________________________________________________________


function make_All_post_HTML()
{
  
  for( let i = 0; i < ( LIST_pluginPack_plugins_LENGTH ); i++ )
  {

    let item = LIST_pluginPack_plugins[i];
    
    post_HTML ( item, ( i ) );

  };

};


//________________________________________________________________________________

function setPicNumberingVar(i)
{

  if ( i < 10 )
  {
    let pic = '_PIC_0';
    return pic;
  }

  else if ( i >= 10 )
  {
    let pic = '_PIC_';
    return pic;
  }

}

function makeALLPageImages( list, suffix )
{

  for( let i = 0; i < ( LIST_pluginPack_plugins_LENGTH ); i++ )
  {

    let item = LIST_pluginPack_plugins[i];

    makeSingleImage ( i, list, item, suffix )

  };

};


//________________________________________________________________________________

function makeSingleImage ( i, list, imageName, suffix )
{

  let imageNameFull =
  imageDir + page + '/' + imageName + '_' + suffix + '.png';

  console.log('imageNameFull: ',imageNameFull);  


  checkIfImageExists( i, imageNameFull, suffix, checkIfImageExistsCallback)

  function checkIfImageExists( i, url, suffix, callback) 
  {

    let img = document.createElement('img');    

    img.src = url;
    
    if (img.complete) 
    {
      img.remove();
      callback(i, true, suffix );
    } 

    else 
    {
      img.onload = () => {

        img.remove();
        callback(i, true, suffix );

      };

      img.onerror = () => {

        img.remove();
        callback(i, false, suffix );

      };
    }

  } //  END checkIfImageExists


  function checkIfImageExistsCallback( i, boolean, suffix )
  {

    if ( boolean == false )
    {
      console.log('does',imageNameFull,'exist?...',boolean);
    }

    else if ( boolean == true )
    {

      console.log('imageNameFull:',imageNameFull);
      let pluginPackEvaled = eval(`pluginPack.${imageName}`);


      let imageWidth;

      if ( suffix == 'puzzle' )
      {
        imageWidth = pluginPackEvaled.pluginWidth;        
      }

      else if ( suffix == 'example' )
      {
        imageWidth = pluginPackEvaled.exampleWidth;
      }

      else if ( suffix == 'console' )
      {
        imageWidth = pluginPackEvaled.consoleWidth;
      }

      else if ( suffix == 'extra' )
      {
        imageWidth = pluginPackEvaled.extraWidth;
      }


      console.log('imageWidth:',imageWidth);

      let pageImage = document.createElement('img');   
      pageImage.src = imageNameFull;
      pageImage.alt = imageName;
      pageImage.style.width = imageWidth;
      pageImage.style.textAlign = 'center';
      console.log('pageImage.style.width:',pageImage.style.width);

      let pic = setPicNumberingVar(i);

      let nameEnd = suffix + pic + i;

      let pageImageId = 'img_' + nameEnd;
      console.log('pageImageId:',pageImageId);
      pageImage.id = pageImageId;
      





      list.push(pageImageId);
      
      let div_Id  = 'div_' + nameEnd;
      console.log('div_Id:',div_Id);
    
      let div = document.getElementById(div_Id);
      div.appendChild(pageImage);
      console.log('modalPageImage result:',pageImage);


      //  WHEN FINISHED, DO:
      if ( i == LIST_pluginPack_plugins_LENGTH_minus_1 )
      {         
        console.log('list:',list );

        console.log('done list images:',suffix);

      };

    }

  } //  END checkIfImageExistsCallback

};  //  END makeSinglePageImage


//________________________________________________________________________________



// function add_all_Images_to_divs(list)
// {
//   console.log('list in add_all_Images_to_divs :',list);
//   console.log('list LENGTH in add_all_Images_to_divs :',list.length);

//   for( let i = 0; i < list.length; i++ )
//   {
//     let item = list[i];

//     add_SINGLE_Image_to_div(item);
//   }

// }



// function add_SINGLE_Image_to_div(item)
// {
//   console.log('item:',item);

//   let itemImage = document.getElementById(item.toString());
//   console.log('itemImage:',itemImage);

//   let substring = item.toString().substr(4, item.length);
//   console.log('substring:',substring);

//   let div_Id  = 'div_' + substring;
//   console.log('div_Id:',div_Id);

//   let div = document.getElementById(div_Id);
//   div.appendChild(itemImage);
//   console.log('modalPageImage result:',item);

// }



//________________________________________________________________________________

function make_Modals()
{

  for( let i = 0; i < ( LIST_pluginPack_plugins_LENGTH ); i++ )
  {

    let pic = setPicNumberingVar(i);

    let modalDiv = document.createElement('div');
    modalDiv.id = 'modalDiv_' + pic ;
    modalDiv.className = 'modal';
    document.body.appendChild(modalDiv);

    let modalSpan = document.createElement('span');
    modalSpan.id = 'close_' + pic ;
    modalSpan.innerHTML = '&times;';
    modalDiv.appendChild(modalSpan);

    let modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modalImg.id = 'modal_' + pic ;
    modalDiv.appendChild(modalImg);

    let modalCaption = document.createElement('div');
    modalCaption.id = 'caption_' + pic ;
    modalDiv.appendChild(modalCaption);


    //  WHEN FINISHED, DO:
    if ( i = LIST_pluginPack_plugins_LENGTH )
    {
      set_ALL_ModalFunction();
    };
    
  };  //  END for loop


}; // END make_Modals()


//________________________________________________________________________________

// window.addEventListener("load", event => {
//  });

function set_ALL_ModalFunction()
{

  window.addEventListener("load", event => {

    
  // console.log('LIST_PICs: ',LIST_PICs);

    for( let i = 0; i < ( LIST_PICs.length ); i++ )
    {
      let item = LIST_PICs[i];
      set_ModalFunction(item);

      //  WHEN FINISHED, DO:
      if ( i == LIST_PICs.length -1 )
      {
        console.log('SCRIPT END.');
      };
      
    };
    

  });

};

//________________________________________________________________________________


function set_ModalFunction(imgName)
{
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


//________________________________________________________________________________


function title_HTML()
{
    let titleTag = document.getElementById('titleTag');
    titleTag.innerHTML = `GLIFTEK [ ${pluginPack_title_UpperCase} ] Plugin Pack User Documentation`;
};


function header_HTML(pluginName)
{
    let headerDiv = document.getElementById ( 'headerDiv' );

    headerDiv.innerHTML = `<header id="header">
    <a href="user_docs_${pluginName}.html" class="logo">[ ${pluginPack_title_UpperCase} ]</a>
    </header>`;
};


function nav_HTML()
{
  let navDiv = document.getElementById('nav');
  navDiv.innerHTML = set_nav_HTML();
};

function set_nav_HTML()
// loop to get all plugins from JSON and CAPStitles also remove "user_docs" 
// make link be one page with variable "?var=value" "?page=pageName"
// to fit so many, make dropdown instead of topBar menu?
{

  let navMenuList_1 = [];

  for( let i = 0; i < (  ( LIST_allPluginPacks.length - ( LIST_allPluginPacks.length / 2 )  )  ); i++ )
  {
    let item = LIST_allPluginPacks[i];

    let navItemClass;


    if ( item == page )
    {
      navItemClass = 'active';
    }
    else
    {
      navItemClass = '';
    }

    let navMenuItem = 
    `<li class = '${navItemClass}'><a href="user_docs.html?page=${item}">${item}</a></li>`;

    navMenuList_1.push(navMenuItem);

    // const list = [1, 2, 3, 4, 5, 6]
    // const half = Math.ceil(list.length / 2);    

    // const firstHalf = list.slice(0, half)
    // const secondHalf = list.slice(-half)

  }

  let result =
  `<ul class="links">
    ${navMenuList_1.join('')}   
  </ul>
  ${menuHeaderFooter}`;

  return result;
};


function intro_HTML()
{
  let intro_HTML_Var = set_intro_HTML();
  let intro_HTML_Div = document.createElement('div');
  intro_HTML_Div.id = 'intro_HTML_Div';   
  intro_HTML_Div.innerHTML = intro_HTML_Var;

  let introDiv = document.getElementById('introDiv');
  introDiv.appendChild( intro_HTML_Div );
}

function set_intro_HTML()
{
  let tableOfContents = [];

  for( let i = 0; i < ( LIST_pluginPack_plugins_LENGTH ); i++ )
  {

    let item = LIST_pluginPack_plugins[i];

    let tableItem = 
    `<li><a href="#${item}">${item.replace(/_/g, ' ')}</a></li>`;

    tableOfContents.push(tableItem);

  }

  let result =
  `<header class="major" style='font-style: italic'>
  <span class="date">User Documentation</span>
  The [ ${pluginPack_title_UpperCase} ] Plugin Pack ${pluginPack.intro}
  </header>
  <hr>
  <div style='text-align: left; font-style: italic' >
    <ul id = 'pageContentsList' >  
    ${tableOfContents.join('')}
    </ul>
  </div>`;

  return result;
}






function post_HTML( pluginName, postNumber )
{

    let pic, postNumberSuffix;

    
    if ( postNumber < 10 )
    {
      pic = 'PIC_0' + ( postNumber );  
      postNumberSuffix = '0' + ( postNumber );
    }

    else if ( postNumber >= 10 )
    {
      pic = 'PIC_' + ( postNumber );
      postNumberSuffix = ( postNumber );
    }


    let post_HTML_Var = set_post_HTML(pluginName, pic);
    let post_HTML_Div = document.createElement('div');
    post_HTML_Div.id = 'post_HTML_' + postNumberSuffix;
    console.log('post_HTML_Div.id:', post_HTML_Div.id );

    post_HTML_Div.innerHTML = post_HTML_Var;

    let postsDiv = document.getElementById('postsDiv');

    postsDiv.appendChild( post_HTML_Div, postNumber );

};


function set_post_HTML( pluginName, pic )
{

  let pluginName_NoUnderscores = pluginName.replace(/_/g, ' ');;
  let pluginName_UpperCase = pluginName_NoUnderscores.toUpperCase();

  let divPuzzlePic = 'div_puzzle_' + pic;
  let divExamplePic = 'div_example_' + pic;
  let divConsolePic = 'div_console_' + pic;
  let divExtraPic = 'div_extra_' + pic;

  console.log('divPuzzlePic:',divPuzzlePic);
  console.log('divExamplePic:',divExamplePic);
  console.log('divConsolePic:',divConsolePic);
  console.log('divExtraPic:',divExtraPic);

  let pluginPackEvaled = eval(`pluginPack.${pluginName}`);

  let puzzleText = pluginPackEvaled.puzzleText;
  let exampleText = pluginPackEvaled.exampleText;
  let consoleText = pluginPackEvaled.consoleText;
  let extraText = pluginPackEvaled.extraText;
  let customHTML = pluginPackEvaled.customHTML;



  let puzzleHTML;

  if ( puzzleText == '' || puzzleText == 'undefined' )
  {
    puzzleHTML =
    `<div id='${divPuzzlePic}' style='display:none'></div>`;
  }
  else if ( puzzleText !== '' || puzzleText !== 'undefined' )
  {
    puzzleHTML =
    `<p class="align-center">The [ ${pluginName_UpperCase} ] Plugin ${puzzleText}</p>    
    <div id='${divPuzzlePic}' class='modal-content' style='width: 100%'></div><br />`;
  };




  let exampleHTML;

  if ( exampleText == '' || exampleText == 'undefined' )
  {
    exampleHTML =
    `<div id='${divExamplePic}' style='display:none'></div>`;
  }
  else if ( exampleText !== '' || exampleText !== 'undefined' )
  {
    exampleHTML =
    `<p class="align-center">${exampleText}</p>
    <p class="align-center">Click example to enlarge.</p>    
    <div id='${divExamplePic}' class='modal-content' style='width: 100%'></div><br />`;
  };




  let consoleHTML;

  if ( consoleText == '' || consoleText == 'undefined' )
  {
    consoleHTML =
    `<div id='${divConsolePic}' style='display:none'></div>`;
  }
  else if ( consoleText !== '' || consoleText !== 'undefined' )
  {

    consoleHTML =
    `<p class="align-center">${consoleText}</p>
    <div id='${divConsolePic}' class='modal-content' style='width: 100%'></div><br />`;

  };




  let extraHTML;

  if ( extraText == '' || extraText == 'undefined' )
  {
    extraHTML =
    `<div id='${divExtraPic}' style='display:none'></div>`;
  }
  else if ( extraText !== '' || extraText !== 'undefined' )
  {

    extraHTML =
    `<p class="align-center">${extraText}</p>
    <div id='${divExtraPic}' class='modal-content' style='width: 100%'></div><br />`;

  };

  


  let result =
  `<section class="post" >

    <br />

    <div class="align-center" >

      <h2><a id="${pluginName}" href="#${pluginName}">[ ${pluginName_UpperCase} ]</a></h2>

      ${puzzleHTML}

      ${exampleHTML}
      
      ${consoleHTML}

      ${extraHTML}

      ${customHTML}

      <div style="width: 100%; height: 1px; background: #ffffff;"></div>

      <br />

    </div>

  </section>`;

  return result;
};




function storeSmall_HTML()
{
  let storeSmallDiv = document.getElementById('storeSmallDiv');
  storeSmallDiv.innerHTML = `<div class="align-center"><a href="${gliftek_contactInfo.gumroadStore}" target="_blank" rel="noreferrer noopener"class="button small">PURCHASE AT STORE</a></div><br />`;
}




function store_HTML()
{
  let store_HTML_Var = set_store_HTML();
  let store_HTML_Div = document.createElement('div');
  store_HTML_Div.id = 'store_HTML_Div';   
  store_HTML_Div.innerHTML = store_HTML_Var;

  let storeDiv = document.getElementById('storeDiv');
  storeDiv.appendChild( store_HTML_Div );
}



function set_store_HTML()
{
  let result =
  `<section class="post">

  <div class="align-center">
  
    <header class="major">
      <span class="date"><i>Visit The Store!</i></span>
    </header>
  
    <a href="${gliftek_contactInfo.gumroadStore}" 
      target="_blank" rel="noreferrer noopener"
      class="button small">
      Purchase These Plugins Here
    </a>
    <br/>
    <br/>
  </div>    
  </section>`;

  return result;
}




function footer_HTML()
{
  let footer_HTML_Var = set_footer_HTML();
  let footer_HTML_Div = document.createElement('div');
  footer_HTML_Div.id = 'footer_HTML_Div';   
  footer_HTML_Div.innerHTML = footer_HTML_Var;

  let footerDiv = document.getElementById('footerDiv');
  footerDiv.appendChild( footer_HTML_Div );
}


function set_footer_HTML()
{
  let result =
  `<footer id="footer">
  <section>

    <header class="major">
      <span class="date"><i>Contact GlifTek</i></span>
    </header>
    
    <form method="post" action="#">
      <div class="fields">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea name="message" id="message" rows="3"></textarea>
        </div>
      </div>
      <ul class="actions">
        <li><input type="submit" value="Send Message" /></li>
      </ul>
    </form>
  </section>

  <section class="split contact">
    <section>
      <h3>Email</h3>
      <p><a href="#">${gliftek_contactInfo.email}</a></p>
    </section>

    <section>
      <h3>Social</h3>
      ${menuHeaderFooter}      
    </section>
  </section>
</footer>`;

return result;
};


function copyright_HTML()
{
  copyrightDiv = document.getElementById('copyright');
  copyrightDiv.innerHTML = '<ul><li>&copy; [ GLIFTEK ] 2021 </li>';
};


};  //  END makePluginPage()