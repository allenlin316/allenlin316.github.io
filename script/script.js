let moreVoc = document.getElementById("moreVoc")
let link = document.getElementById("link")
let dots = document.getElementById("dots")

// for Vocabulary (more...) link
function readMore() {
    if (moreVoc.style.display == "none") {
        moreVoc.style.display = "inline"
        dots.innerText = "show less"
    } else {
        moreVoc.style.display = "none"
        dots.innerText = "more..."
    }
}