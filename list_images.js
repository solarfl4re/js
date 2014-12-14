function listImages() {
    function unicodeToString(string) {
        var x = string;
        var r = /\\u([\d\w]{4})/gi;
        x = x.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16)); } );
        x = unescape(x);
        return x;
    }

    var imageScript = document.evaluate('//div[@id="JSDF"]/script[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    var imageScript = imageScript.singleNodeValue.innerHTML;

    var images = [];

    var image_list = document.getElementsByClassName('lst icon')[0];
    
    // We get the num of images from the image list/carsel, which isn't present if the listing only has 1 image
    if (image_list == undefined) {
        num_images = 1;
    } else {
        var num_images = image_list.getElementsByTagName('li').length;
    }
    

    current_pos = 0

    for (i = 0; i < num_images; i++) {
        var url_start = imageScript.indexOf('maxImageUrl', current_pos);
        if (url_start == -1) {
            break;
            }

        var url_end = imageScript.indexOf(',', url_start);

        images[images.length] = unicodeToString(imageScript.substring(url_start + 14, url_end - 1));

        current_pos = url_end
    }

    function getTitle() {
        var end_pos = document.title.indexOf('|');
        var title = document.title.substring(0, end_pos - 1);
        return title;
    }

    var img_div = document.createElement('div')
    for (image in images) {
        // var link_tag = document.createElement('a');
        // link_tag.href = images[image];
        // link_tag.download = getTitle() + ' ' + (image + 1) + ' of ' + (images.length + 1) + '.jpg';
        // link_tag.innerText = 'Download Image';
        var img_tag = document.createElement('img');
        img_tag.style = 'width: 600px; height: auto;';
        img_tag.src = images[image];
        // img_div.appendChild(link_tag);
        img_div.appendChild(img_tag);
        img_div.appendChild(document.createElement('br'));
        
    }
    var body = document.getElementsByTagName('body')[0];
    body.insertBefore(img_div, body.firstChild);
}
listImages();
