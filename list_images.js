function listImages() {
    function unicodeToString(string) {
        var x = string;
        var r = /\\u([\d\w]{4})/gi;
        x = x.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16)); } );
        x = unescape(x);
        return x;
    }

    var imageScript = document.evaluate('//div[@id="JSDF"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

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
        var image_url_start = imageScript.indexOf('maxImageUrl', current_pos);
        if (image_url_start == -1) {
            break;
            }
        
        // URL structure:
        // "maxImageUrl": "http ... ",
        var url_start = imageScript.indexOf('http', image_url_start);
        
        // URLs can have commas in them - look for the ending quotation mark instead
        // example problematic URL: http://i.ebayimg.com/00/s/MTE5NVgxNjAw/z/POQAAOxyoA1RUJNd/$T2eC16N,!ykE9s7tvVDiBRUJNb7(1w~~60_57.JPG
        var url_end = imageScript.indexOf('"', url_start);
        
        // Unescape and decode url
        image_url = unicodeToString(imageScript.substring(url_start, url_end));
        
        images.push(image_url);

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
        img_tag.style.maxWidth = '100%';
        img_tag.style.height = 'auto';
        img_tag.style.margin = '20px 0px 20px 0px';
        img_tag.src = images[image];
        // img_div.appendChild(link_tag);
        img_div.appendChild(img_tag);
        img_div.appendChild(document.createElement('br'));
        
    }
    var body = document.getElementsByTagName('body')[0];
    body.insertBefore(img_div, body.firstChild);
}
listImages();
