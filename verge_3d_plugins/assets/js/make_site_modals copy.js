


// window.makePage = function makePage( pluginPack_title_UpperCase, LIST_plugins )
// {
  window.page = (new URLSearchParams(window.location.search)).get('page');
  
  window.imgCounter = 1;

  window.LIST_imgNames = [];
  window.LIST_imgCSSNames = [];
  window.LIST_closeButtonCSSNames = [];
  window.LIST_closeButtonHoverCSSNames = [];
  window.LIST_closeButtonFocusCSSNames = [];


//________________________________________________________________________________



$.getJSON("./assets/js/siteData.json", function(json) {
  console.log(json); // this will show the info it in firebug console
  let siteData_File = json;    
  parseJSON(siteData_File)
});

let pageContentsList

function parseJSON(siteData_File)
{
    let gliftek_plugins_siteData = siteData_File.siteData;
    console.log('gliftek_plugins_siteData:',gliftek_plugins_siteData);

    window.gliftek_contactInfo = gliftek_plugins_siteData.contactInfo;
    console.log('gliftek_contactInfo:',gliftek_contactInfo);

    window.gliftek_pluginPacks = gliftek_plugins_siteData.pluginPacks;
    console.log('gliftek_pluginPacks:',gliftek_pluginPacks);

    window.LIST_allPluginPacks = gliftek_plugins_siteData.pluginPacks.allPluginPacks;
    console.log('LIST_allPluginPacks:',LIST_allPluginPacks);

    console.log('page:',page);

    window.pluginPack = eval(`gliftek_pluginPacks.${page}`);
    //  getting title is unecessary since it would be sent as the referring variable for dynamic pages
    console.log('pluginPack:',pluginPack);


    window.pluginPack_title_UpperCase = page.toUpperCase();
    console.log('pluginPack_title_UpperCase:',pluginPack_title_UpperCase);


    window.LIST_pluginPack_plugins = pluginPack.plugins;
    pageContentsList = LIST_pluginPack_plugins;
    console.log('LIST_pluginPack_plugins:',LIST_pluginPack_plugins);


    makeSitePage();

}
//________________________________________________________________________________


function makeSitePage()
{

title_HTML();

header_HTML(pluginPack);//just use referring variable in URL

nav_HTML();

intro_HTML();



store_HTML();

footer_HTML();

copyright_HTML();


//________________________________________________________________________________

makeAllPosts();

function makeAllPosts()
{
  for( let i = 0; i < ( LIST_pluginPack_plugins.length ); i++ )
  {

    let item = LIST_pluginPack_plugins[i];
    // console.log('LIST_pluginPack_plugins item: ',item);
    
    post_HTML( item, ( i ) );

  };

    makeAllDivs ( '_plugin', 'width: 75%');
    makeAllDivs( '_example', 'width: 85%');
    makeAllDivs( '_console', 'width: 35%');

};



//________________________________________________________________________________

  function makeAllDivs(suffix, width)
  {

    for( let i = 0; i < ( LIST_pluginPack_plugins.length + 1 ); i++ )
    {

      let item = LIST_pluginPack_plugins[i];
      
      modalImageForDiv ( item, suffix, width )

    };

  };


//________________________________________________________________________________

  function modalImageForDiv ( imageName, suffix, width )
  {

    
    let ImgSuffix;

    if ( suffix == '_plugin')
    { 
      ImgSuffix = '';
    }

    else
    {
      ImgSuffix = suffix;
    }


    let imageNameFull =
    './images/GLIFTEK_plugins_' + pluginPack_title_UpperCase + '_' + imageName + ImgSuffix + '.png';


//________________________________________________________________________________


    function checkIfImageExists(url, callback) 
    {
      // let img = new Image();
      let img = document.createElement('img');    
      
      img.src = url;
      
      if (img.complete) 
      {
        img.remove();
        callback(true);
      } 

      else 
      {
        img.onload = () => {

          img.remove();
          callback(true);

        };

        img.onerror = () => {

          img.remove();
          callback(false);

        };
      }

    } //  END checkIfImageExists


//________________________________________________________________________________


    checkIfImageExists(imageNameFull, checkIfImageExistsCallback)

    function checkIfImageExistsCallback(boolean)
    {

      if ( boolean == false )
      {
        console.log('does',imageNameFull,'exist?...',boolean);
      }

      else if ( boolean == true )
      {

        let pageImage = document.createElement('img');   
        pageImage.src = imageNameFull;

        console.log('imgCounter:',imgCounter);
        console.log('pageContentsList.length:',pageContentsList.length);

        let pic;

        if ( imgCounter < 10 )
        {
          pic = 'PIC_0' + imgCounter;               
        }

        else if ( imgCounter >= 10 )
        {
          pic = 'PIC_' + imgCounter;
        }


        pageImage.alt = imageName;
        pageImage.style = width;


        let divId  = 'div' + suffix + '_' + pic;
        console.log('divId:',divId);

        let div = document.getElementById(divId);
        div.appendChild(pageImage);
        console.log('modalPageImage result:',pageImage);


        let pageImageId;

        if ( ImgSuffix == '_example' )
        { 
          pageImageId = 'img_' + pic;
          console.log('pageImageId:',pageImageId);

          pageImage.id = pageImageId;
        }

        else if ( ImgSuffix == '_console' )
        {
          pageImageId = 'img_console_' + pic;
          console.log('pageImageId:',pageImageId);

          pageImage.id = pageImageId;
        }

        else if ( ImgSuffix == '' )
        {
          pageImageId = 'img_plugin_' + pic;
          console.log('pageImageId:',pageImageId);

          pageImage.id = pageImageId;
        }

      }


      else if ( imgCounter > ( LIST_pluginPack_plugins.length  ) )
      {
        imgCounter = 1;
        console.log('imgCounter reset:',imgCounter);
      }

      if ( imgCounter <= ( LIST_pluginPack_plugins.length - 1 ) )
      {
        imgCounter ++;
        console.log('imgCounter added:',imgCounter);
      }

      // if ( imgCounter < ( LIST_pluginPack_plugins.length  ) )
      // {
      //   imgCounter ++;
      //   console.log('imgCounter added:',imgCounter);
      // }
      
      // else if ( imgCounter > ( LIST_pluginPack_plugins.length  ) )
      // {
      //   imgCounter = 0;
      //   console.log('imgCounter reset:',imgCounter);
      // }
      
    } //  END checkIfImageExistsCallback

  };  //  END modalImageForDiv



//________________________________________________________________________________

make_ModalDivs_and_CSS_LISTS();

function make_ModalDivs_and_CSS_LISTS()
{
  for( let i = 1; i < ( pageContentsList.length ); i++ )
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
    console.log('imgPicName:',imgPicName);


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
  

} // END make_ModalDivs_and_CSS_LISTS()


//________________________________________________________________________________

setStyle();

function setStyle()
{
    let styleVar = setstyleVar();  //  sets all modal styles
    let style = document.createElement('style');
    style.id = 'modalSiteStyles';   
    style.innerHTML = styleVar;
    document.head.appendChild(style);
};


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
    return result;
  }


//________________________________________________________________________________

  window.addEventListener("load", event => {

    LIST_imgNames.forEach(modalFunction);

  });
  
//________________________________________________________________________________
  
  function modalFunction(imgName)
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


  // post_HTML();
  function post_HTML( pluginName, postNumber )
  {

      let pic, postNumberSuffix;

      if ( postNumber < 10 )
      {
        pic = 'PIC_0' + ( postNumber +1 );  
        postNumberSuffix = '0' + ( postNumber +1 );
      }

      else if ( postNumber >= 10 )
      {
        pic = 'PIC_' + ( postNumber +1 );
        postNumberSuffix = ( postNumber +1 );
      }


      let post_HTML_Var = set_post_HTML(pluginName, pic);
      let post_HTML_Div = document.createElement('div');
      post_HTML_Div.id = 'post_HTML_' + postNumberSuffix;
      console.log('post_HTML_Div.id:', post_HTML_Div.id );

      post_HTML_Div.innerHTML = post_HTML_Var;

      let postsDiv = document.getElementById('postsDiv');

      postsDiv.appendChild( post_HTML_Div, postNumber );
  };


/* Style the Image Used to Trigger the Modal */

  function set_post_HTML( pluginName, pic )
  {

    let pluginName_NoUnderscores = pluginName.replace(/_/g, ' ');;
    let pluginName_UpperCase = pluginName_NoUnderscores.toUpperCase();

    let divPluginPic = 'div_plugin_' + pic;
    let divExamplePic = 'div_example_' + pic;
    let divConsolePic = 'div_console_' + pic;

    console.log('divPluginPic:',divPluginPic);
    console.log('divExamplePic:',divExamplePic);
    console.log('divConsolePic:',divConsolePic);

    let pluginText = eval(`pluginPack.${pluginName}.pluginText`);
    let exampleText = eval(`pluginPack.${pluginName}.exampleText`);
    let consoleText = eval(`pluginPack.${pluginName}.consoleText`);

    let extraText = '';

    let extraHTML = '';

    let result =
    `<!-- ${pluginName_UpperCase} -->

      <section class="post">

      <br/>
      <div class="align-center">

        <h2><a id="${pluginName}" href="#${pluginName}">[ ${pluginName_UpperCase} ]</a></h2>

        <p class="align-center">
          The [ ${pluginName_UpperCase} ] Plugin ${pluginText}
        </p>

        <div id='${divPluginPic}'></div>
        
        <p class="align-center">
        ${exampleText}
        </p>

        <p class="align-center">Example:</p>
        
        <a class="image main">
        <div id='${divExamplePic}' class='modal-content' style = 'width: 70%'></div>
        </a>
        
        <p class="align-center">Click image to enlarge.</p>
        
        <p class="align-center">
        ${consoleText}
        </p>

        <div id='${divConsolePic}'></div>
        
        <p class="align-center">
        ${extraText}
        </p>

        ${extraHTML}

        <br/>
        <br/>

      </div>
      <hr/ style = 'border: 0; border-bottom: solid 4px; margin: 5rem 0;'>
    </section>`;

    return result;
  }






  function title_HTML()
  {
      let title_HTML_Var = set_title_HTML();
      let titleTag = document.getElementById('titleTag');
      titleTag.innerHTML = title_HTML_Var;
  };


  function set_title_HTML()
  {
    let result =
    `GLIFTEK [ ${pluginPack_title_UpperCase} ] Plugin Pack User Documentation`;

    return result;
  }






  function copyright_HTML()
  {
      let copyright_HTML_Var = set_copyright_HTML();
      let copyright_HTML_Div = document.createElement('div');
      copyright_HTML_Div.id = 'copyright_HTML_Div';   
      copyright_HTML_Div.innerHTML = copyright_HTML_Var;
  
      let copyrightDiv = document.getElementById('copyrightDiv');
      copyrightDiv.appendChild( copyright_HTML_Div );
  };

  function set_copyright_HTML()
  {
    let result = `<ul><li>&copy; [ GLIFTEK ] 2021 </li>`;
    // `<ul><li>&copy; [ GLIFTEK ] 2021 - ${year}</li>`;
    return result;
  };






  function header_HTML(pluginName)
  {
      let header_HTML_Var = set_header_HTML(pluginName);
      let header_HTML_Div = document.createElement('div');
      header_HTML_Div.id = 'header_HTML_Div';   
      header_HTML_Div.innerHTML = header_HTML_Var;

      let headerDiv = document.getElementById ( 'headerDiv' );
      headerDiv.appendChild( header_HTML_Div );
  };

  function set_header_HTML( pluginName )
  {
    let result =
    `<header id="header">
    <a href="user_docs_${pluginName}.html" class="logo">[ ${pluginPack_title_UpperCase} ]</a>
    </header>`;

    return result;
  }




  function nav_HTML()
  {
    let nav_HTML_Var = set_nav_HTML();
    let nav_HTML_Div = document.createElement('div');
    nav_HTML_Div.id = 'nav_HTML_Div';   
    nav_HTML_Div.innerHTML = nav_HTML_Var;

    let navDiv = document.getElementById('navDiv');
    navDiv.appendChild( nav_HTML_Div );
  }

  function set_nav_HTML()
  // loop to get all plugins from JSON and CAPStitles also remove "user_docs" 
  // make link be one page with variable "?var=value" "?page=pageName"
  // to fit so many, make dropdown instead of topBar menu?

  {
    let result =
    `<nav id="nav">
    <ul class="links">
      <li><a href="user_docs_main.html">[ MAIN ]</a></li>
      <li><a href="user_docs_lensflare_deluxe.html">[ LENS FLARE DELUXE ]</a></li>
      <li><a href="user_docs_bounding_boxes.html">[ BOUNDING BOXES ]</a></li>
      <li class="active"><a href="user_docs.html?page=helpers">[ HELPERS ]</a></li>
      <li><a href="user_docs.html?page=utility">[ UTILITY ]</a></li>

    </ul>
    <ul class="icons">
      <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
      <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
      <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
      <li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
    </ul>
  </nav>`;

    return result;
  }


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

    for( let i = 0; i < ( LIST_pluginPack_plugins.length ); i++ )
    {

      let item = LIST_pluginPack_plugins[i];

      let tableItem = 
      `<li><a href="#${item}">${item.replace(/_/g, ' ')}</a></li>`;

      tableOfContents.push(tableItem);

    }


    let result =
    `<header class="major" style='font-style: italic'>
    <span class="date">User Documentation</span>						
    ${pluginPack.intro}
    </header>
    <hr>
    <div style='text-align: left; font-style: italic' >
      <ul id = 'pageContentsList' >  
      ${tableOfContents.join('')}
      </ul>
    </div>`;

    return result;
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
        <ul class="icons alt">
          <li><a href="${gliftek_contactInfo.twitter}" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
          <!-- <li><a href="${gliftek_contactInfo.facebook}" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
          <li><a href="${gliftek_contactInfo.instagram}" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
          <li><a href="${gliftek_contactInfo.github}" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
        </ul>
      </section>
    </section>
  </footer> `;

    return result;
  }

} // END makeSitePage()

