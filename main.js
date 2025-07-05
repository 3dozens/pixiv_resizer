window.addEventListener("load", function(e) {
    console.log("pixiv display extension activated");
    var img_small = document.querySelectorAll("[src*=img-master]")[0]; // default picture
    img_small.addEventListener("click", changeImagesize)
});

function changeImagesize() {
    setTimeout(function() {
        const img_big = document.querySelectorAll("[src*=img-original]")[0]; // original resolution picture
        console.log(img_big);
        const org_width  = img_big.getAttribute('width');
        const org_height = img_big.getAttribute('height');
        const org_ratio  = org_height / org_width;
        const screen_ratio = window.innerHeight / window.innerWidth
    
        console.log("original width  = " + org_width);
        console.log("original height = " + org_height);
        console.log("ratio = " + org_ratio);
        console.log("screen_ratio = " + screen_ratio);
        
        // calculate appropriate width and height for full screen
        var mod_width;
        var mod_height; 
        if (org_ratio >= screen_ratio) {
            mod_height = window.innerHeight;
            mod_width  = window.innerHeight / org_ratio;
        } else {
            mod_width  = window.innerWidth;
            mod_height = window.innerWidth / org_ratio;
        }
        console.log("changed width  = " + mod_width);
        console.log("changed height = " + mod_height);
    
        img_big.setAttribute('width', mod_width);
        img_big.setAttribute('height', mod_height);
    },100);
}