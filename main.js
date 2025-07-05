window.addEventListener("load", () => {
    setEventListenerToSmallImage();
    setupMutationObserverForPageTransition();
    console.log("pixiv display extension activated");    
});

function setEventListenerToSmallImage() {
    console.log("hoge");
    const small_imgs = document.querySelectorAll("[role=\"presentation\"] img"); // default size image(s)
    small_imgs.forEach((img) => {
        img.addEventListener("click", changeImageSize)}
    );
}

function changeImageSize() {
    setTimeout(() => {
        const img_big = document.querySelectorAll("[src*=img-original]")[0]; // original resolution picture
        const org_width  = img_big.getAttribute('width');
        const org_height = img_big.getAttribute('height');
        const org_ratio  = org_height / org_width;
        const screen_ratio = window.innerHeight / window.innerWidth
        
        console.log(img_big);
        console.log("original width  = " + org_width);
        console.log("original height = " + org_height);
        console.log("ratio = " + org_ratio);
        console.log("screen_ratio = " + screen_ratio);
        
        // calculate appropriate width and height for full screen
        let mod_width;
        let mod_height; 
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

function setupMutationObserverForPageTransition() {
    const main_panel = document.querySelectorAll("figure")[1]; // 特定できるクラスやIDがないため2番目を取得している
    console.log(main_panel);
    const config = { childList: true, subtree: true };
    const mo = new MutationObserver(setEventListenerToSmallImage);
    mo.observe(main_panel, config);    
}
