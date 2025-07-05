window.addEventListener("load", function(e) {
    console.log("pixiv display extension activated");
    var img_small = document.querySelectorAll("[src*=img-master]")[0];
    img_small.addEventListener("click", changeImagesize)
});

function changeImagesize() {
    setTimeout(function() {
        const img_big = document.querySelectorAll("[src*=img-original]")[0]; // original resolution picture
        console.log(img_big);
        const org_width  = img_big.getAttribute('width');  // width of original picture
        const org_height = img_big.getAttribute('height'); // height of original picture
        var org_ratio; // ratio of original width and height
    
        // calculate height vs width ratio of original picture
        if (org_width > org_height) {
            org_ratio = org_height / org_width;
        } else {
            org_ratio = org_width / org_height
        }
        console.log("original width  = " + org_width);
        console.log("original height = " + org_height);
        console.log("ratio = " + org_ratio);
        
        // calculate appropriate width and height for full screen
        var mod_width;
        var mod_height; 
        if (org_width > org_height) {
            mod_width  = window.innerWidth;
            mod_height = mod_width * org_ratio;
        } else {
            mod_height = window.innerHeight;
            mod_width  = mod_height * org_ratio;
        }
        console.log("changed width  = " + mod_width);
        console.log("changed height = " + mod_height);
    
        // handle a case that even reduced height exceeds innerHeight
        var _ratio;
        if (mod_height > window.innerHeight) {
            _ratio     = window.innerHeight / org_height;
            mod_height = window.innerHeight;
            mod_width  = org_width * _ratio;
            console.log("changed width (modified) = " + mod_width);
            console.log("changed height(modified) = " + mod_height);
        }
    
        // apply appropriate width and height to the picture
        img_big.setAttribute('width', mod_width);
        img_big.setAttribute('height', mod_height);
    },100);
}