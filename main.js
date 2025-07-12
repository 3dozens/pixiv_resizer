window.addEventListener("load", () => {
    setupMutationObserver();
    console.log("pixiv display extension activated");
});

function setupMutationObserver() {
    const main_panel = document.querySelector("body");
    const config = { childList: true, subtree: true };
    const mo = new MutationObserver((mutationList) => {
        mutationList.forEach(m => {
            if (m.addedNodes.length > 0) {
                m.addedNodes.forEach(n => { // NodeListにはforEachはあるけどfilterやsomeはないらしい（なんで？）
                    if (n.nodeName === '#text') return; // テキストノードはgetAttributeがなく例外が発生するのでcontinue
                    if (n.innerHTML?.includes("img-original")  // img-original（拡大版画像）が追加されたらサイズを調整
                        || n.getAttribute('src')?.includes("img-original")) // 複数枚画像の作品で拡大画像を前後に移動した際の対応
                        openFullscreen();
                    changeImageSize();
                });
            }

            if (m.removedNodes.length > 0) {
                m.removedNodes.forEach(n => {
                    if (n.innerHTML?.includes('img-original')) closeFullscreen();
                })
            }
        })
    });
    mo.observe(main_panel, config);
}

function changeImageSize() {
    const img_big = document.querySelectorAll("[src*=img-original]")[0]; // original resolution picture
    if (img_big === undefined) return; // なんか謎にこの関数が実行されてエラーになるときがあるのの対処
    const org_width = img_big.getAttribute('width');
    const org_height = img_big.getAttribute('height');
    const org_ratio = org_height / org_width;
    const screen_ratio = window.innerHeight / window.innerWidth;

    console.log(img_big);
    console.log("original width  = " + org_width);
    console.log("original height = " + org_height);
    console.log("ratio = " + org_ratio);
    console.log("screen_ratio = " + screen_ratio);

    // calculate appropriate width and height for full screen
    let mod_width;
    let mod_height;
    if (org_ratio >= screen_ratio) {
        // mod_height = window.innerHeight;
        mod_height = screen.availHeight; // innerHeightだとフルスクリーンにしてもなぜかフルスクリーン前のピクセル数が取れてしまうので画面サイズを直接取ってしまっている
        mod_width  = screen.availHeight / org_ratio;
    } else {
        // mod_width = window.innerWidth;
        mod_width  = screen.availWidth; // 同上
        mod_height = screen.availWidth / org_ratio;
    }
    console.log("changed width  = " + mod_width);
    console.log("changed height = " + mod_height);

    img_big.setAttribute('width', mod_width);
    img_big.setAttribute('height', mod_height);
}

function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
