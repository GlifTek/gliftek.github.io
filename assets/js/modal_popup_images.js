LIST_imgNames.forEach(modalFunction);

//________________________________________________________________________________

function modalFunction(imgName)
{
    // console.log('running modal Function with ' + imgName + ' as item / imgName');
    // Get the modal
    var modal = document.getElementById('modalDiv_' + imgName);

    // Get the image and insert it inside the modal - use its "alt" text as a caption
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


