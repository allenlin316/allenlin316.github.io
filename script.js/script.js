const colBtn = document.getElementsByClassName("collapsible-btn");

colBtn[0].addEventListener('click', function () {
    this.classList.toggle("active"); // 切換類
    const content = this.nextElementSibling;

    if (content.style.display == "block")
        content.style.display = "none";
    else
        content.style.display = "block";
});