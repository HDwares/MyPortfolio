function openNav() {
    if (window.innerWidth<=600) {
        document.getElementById("mySidenav").style.width = "84%";
    }
    else {
        document.getElementById("mySidenav").style.width = "38%";
    }
} function closeNav(event) {
    if (event.target.className != "burgerMenu") {
        document.getElementById("mySidenav").style.width = "0px";
    }
    closeFlyout(event);
}
// Hides all elements excluding provided className
function hideAll() {
    let frames = document.getElementsByClassName("frame");
    for (let i = 0;
        i < frames.length;
        i++) {
        frames[i].style.display = "none"
    }
    return true;
}
function openPage(evt, pageName) {
    let i, tabcontent, tabLinks;
    hideAll();
    tabLinks = document.getElementsByClassName("tabLinks");
    for (let i = 0;
        i < tabLinks.length;
        i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    } document.getElementById(pageName).style.display = "block";
    document.getElementsByClassName("PageTitle")[0].innerHTML = evt.currentTarget.innerHTML;
    evt.currentTarget.className += " active";
    if (pageName === "MyWork") {
        let thumbnails = document.getElementsByClassName("thumbnail");
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].addEventListener("mousemove", (event) => {
                event.target.style.objectFit = "none";
                event.target.style.objectPosition = event.offsetX / thumbnails[i].width * 100 + "% " + event.offsetY / thumbnails[i].height * 100 + "%";
            });
            thumbnails[i].addEventListener("mouseleave", (event) => {
                event.target.style.objectFit = "cover";
                event.target.style.objectPosition = "0 0";
            });
        }
    }
    else if (pageName === "Contact") {
        createColoredShadow(document.getElementById("hdSymbol"));
        contactTiles = document.querySelectorAll("#Contact .tile");
        for (let i = 0; i < contactTiles.length; i++) {
            createColoredBorder(contactTiles[i]);
        }
    }
} function modalUI(evt) {
    let modal = document.getElementById('modalUI');
    let modalCarousel = document.getElementsByClassName('modal-carousel');
    let modalDesc = document.getElementsByClassName('modal-desc')[0];
    let utility;
    let elName = evt.currentTarget.getAttribute("data-title");
    for (let i = 0; i < utilities.length; i++) {
        if (elName.trim() === utilities[i].name.trim()) {
            utility = utilities[i];
            break;
        }
    }
    let leftArrow = document.querySelector(".fa-angle-left");
    let rightArrow = document.querySelector(".fa-angle-right");
    for (let i = 0; i < utility.imgData.length; i++) {
        modalCarousel[0].innerHTML += `<img class="modal-content" src="` + 'img/' + utility.name.replace(/ /g, "_") + "/" + utility.imgData[i].fileName + `"/>`//+`" style="transform: scale(` + (utility.imgData.length-i)/utility.imgData.length + `)"/>`;
    }
    let modalCntnts = document.getElementsByClassName('modal-content');
    modalCntnts[0].classList.add("infocus");
    modalDesc.innerHTML = utility.imgData[0].description;
    let j = 0;
    let activateKey = (i) => {
        if (j === 0) {
            leftArrow.classList.add("active");
        }
        else {
            leftArrow.classList.remove("active");
        }
        if (j == utility.imgData.length - 1) {
            rightArrow.classList.add("active");
        }
        else {
            rightArrow.classList.remove("active");
        }
    }
    //Image slideshow;
    leftArrow.addEventListener("click", ()=> addFocus(utility, "leftArrow"));
    rightArrow.addEventListener("click", ()=> addFocus(utility, "rightArrow"));
    let modalTitle = document.getElementsByClassName("modalTitle");
    modal.style.display = "block";
    modalTitle[0].innerHTML = evt.currentTarget.parentElement.getElementsByTagName("h2")[0].innerHTML;
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        modalDesc.innerHTML = "";
        modalCarousel[0].innerHTML = "";
        leftArrow.classList.add("active");
        rightArrow.classList.remove("active");
    };
    window.onkeyup = (e) =>{
        var key = e.which;
        if(key == 13 || key == 39) { // the enter key code or right arrow
          rightArrow.click();
          return false;  
        } else if(key == 37) { // left arrow
          leftArrow.click();
          return false;  
        }
      };
      function addFocus(utility, keyType){
        (keyType==="leftArrow")?j--:(keyType==="rightArrow")?j++:j;
        if (j < 0) { j = 0 }
        else if (j >= utility.imgData.length) { j = utility.imgData.length - 1 }
        if (j < utility.imgData.length && j >= 0) {
            modalCarousel[0].innerHTML = modalCarousel[0].innerHTML.replace(/ infocus/g, "");
            // for (let j=i;j>=0;j--){
            //     modalCntnts[i].style.transform= "scale("+j/i+")";
            // }
            modalCntnts[j].classList.add("infocus");
            modalDesc.innerHTML = utility.imgData[j].description;
        }
        activateKey(j);
    }
}
function crtSybl(lineColor) {
    let c = document.getElementById("linkCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 19;
    ctx.strokeStyle = lineColor;
    if (lineColor === "rgb(12,12,12)") {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.shadowColor = "none";
    } else {
        ctx.shadowColor = "rgb(140,100,160)";
        ctx.shadowBlur = 90;
    } ctx.moveTo(198, 59);
    ctx.lineTo(157, 317);
    ctx.lineTo(105, 193);
    ctx.lineTo(392, 145);
    ctx.lineTo(350, 40);
    ctx.lineTo(296, 369);
    ctx.moveTo(263, 390);
    ctx.bezierCurveTo(460, 287, 380, 256, 270, 260);
    ctx.stroke();
    return c.toDataURL();
} function createColoredShadow(element) {
    let elementBorder = event.target.style.boxShadow;
    element.addEventListener("mousemove", function (event) {
        event.target.style.boxShadow = "0px 0px 91px rgb(" + event.offsetX + ", " + (event.offsetY - event.offsetX) + ", " + (192 - event.offsetY) + ")";
        event.target.style.border = "10px solid rgb(12,12,12)";
        hdSymbol.src = light;
    });
    element.addEventListener("mouseleave", function (event) {
        event.target.style.boxShadow = "none";
        event.target.style.border = elementBorder;
        hdSymbol.src = dark;
    });
} function createColoredBorder(element) {
    let elementBorder = event.target.style.border;
    element.addEventListener("mousemove", function (event) {
        element.style.border = ".6rem solid rgb(" + event.offsetX + ", " + (3 * event.offsetY - event.offsetX) + ", " + (192 - 3 * event.offsetY) + ")";
    });
    element.addEventListener("mouseleave", function (event) {
        element.style.border = elementBorder;
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function crtUtilityTiles() {
    let carousel = document.getElementsByClassName("utilities")[0]
    let thumbnailImg, imgLocation;
    for (let i = 0; i < utilities.length; i++) {
        for (j = 0; j < utilities[i].imgData.length; j++) {
            if (utilities[i].imgData[j].fileName.split(".")[0].replace(/_/g, " ").trim() === utilities[i].name.trim()) {
                thumbnailImg = utilities[i].imgData[j].fileName;
                imgLocation = 'img/' + thumbnailImg.split('.')[0] + '/' + thumbnailImg;
                break;
            }
        }
        carousel.innerHTML += `<div class="utility-tile tile col-3"><img class="thumbnail" data-title="${utilities[i].name}" src="${imgLocation}" onclick="modalUI(event);">
        <i class="moreActions" title="More Actions" onclick="showFlyout(event);">...
            <div class="moreActionsFlyout">
                <a href="">facebook</a>
                <a href="">twitter</a>
                <a href="">linkedIn</a>
            </div>
        </i>
        <h2 onclick="modalUI(event);" title="${utilities[i].name}" data-title="${utilities[i].name}"><span class="primary-txt">${utilities[i].name.split(' ')[0]}</span>${utilities[i].name.replace(utilities[i].name.split(' ')[0], '')}</h2>`;
    }
}
function showFlyout(event) {
    let moreActionIcon = document.getElementsByClassName("moreActions");
    for (let i = 0; i < moreActionIcon.length; i++) {
        moreActionIcon[i].classList.remove("active");
    }
    event.currentTarget.classList.add("active");
}
function closeFlyout(event) {
    let moreActionIcon = document.getElementsByClassName("moreActions");
    if (event.target.className != "moreActions active") {
        for (let i = 0; i < moreActionIcon.length; i++) {
            moreActionIcon[i].classList.remove("active");
        }
    }
}
let pageYOffsetPlus;
const utilities = [
    {
        name: 'HD Report', imgData: [
            {
                fileName: "HD_Report.png",
                description: "This utility is used to generate real time status of test case execution."
            },
            {
                fileName: "TableFocus.png",
                description: "It has expand collapse feature using which user can view parent test set(if any) at a glance in collapsed view and status of child modules in expanded view."
            },
            {
                fileName: "flyout_Menu.png",
                description: "Click on the burger menu to get flyout menu consisting of links for more pages."
            },
            {
                fileName: "Percent_Analysis.png",
                description: "Percentage Analysis page gives detailed percentage of test case status in all the applications."
            },
            {
                fileName: "defect.png",
                description: "Defects page gives the defects status for that perticular cycle."
            },
            {
                fileName: "defects_search.png",
                description: "It also has feature of search."
            },
            {
                fileName: "HD_symbol.png",
                description: "Author page contains author details with cool hover effect."
            }],
        date: 'Sep 2018'
    },
    {
        name: 'Metadata Compare utility', imgData: [
            {
                fileName: "Metadata_Compare_utility.png",
                description: "Report gets generated in nice HTML format with passed and failed status highlighted."
            }],
        date: 'March 2018'
    },
    {
        name: 'Replace Content', imgData: [
            {
                fileName: "Replace_Content.png",
                description: "Finds and replaces provided text from UFT test cases. Used to replace function or object name after renaming in shared object repository or function library respectively."
            },
            {
                fileName: "findText.png",
                description: "User inputs the term it wants to find in all the UFT test case"
            },
            {
                fileName: "ReplaceText.png",
                description: "Test scripts and number of occurances displayed in poped out notepad. User can now provide term to replace or close inputBox."
            },
            {
                fileName: "replacementCount.png",
                description: "On proceeding receives the count of files in which replacement are done."
            }],
        date: 'March 2018'
    }];
document.getElementById("home").style.display = "block";
crtUtilityTiles();
let header = document.querySelector(".header");
setTimeout(() => header.style.marginTop = "0", 1200);
let lightGrey = "rgb(71,71,71)";
let darkGrey = "rgb(17, 17, 17)";
let pgLink = document.getElementById("pgLink");
let hdSymbol = document.getElementById("hdSymbol");
document.getElementsByClassName("container")[0].style.visibility = "visible";
let dark = crtSybl("rgb(12,12,12)");
let light = crtSybl("rgb(200,200,250)");
pgLink.href = dark;
hdSymbol.src = dark;
window.onscroll = () => {
    if (window.pageYOffset > pageYOffsetPlus) {
        header.style.marginTop = "-2.8rem";
    } else {
        header.style.marginTop = "0";
    }
    pageYOffsetPlus = window.pageYOffset;
}