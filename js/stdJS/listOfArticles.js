
//TODO finish up colorBlind mode 8.5 uloha
function colorBlind(){
    document.getElementsByTagName('body').item(0).classList.toggle("color-blind");;
}

function toggleNav() {
    document.getElementById("navbarFoot").classList.toggle("show");
    // console.log("here");
}

function hideNav() {
    var menuClElmCList=document.getElementById("navbarFoot").classList;
    if(menuClElmCList.contains("show")) {
        menuClElmCList.remove("show");
    }
}

//iba ked chces po kliknuti kdekolvek prepnut...
document.addEventListener("click", //radsej takto ako do document.onclick, lebo to by vyradilo iné listenery
    function(e){
        if(!e.target.matches("#navbarFoot, #menuToggle")) {
            hideNav();
        }

        if(e.target.matches("#show")){
            articlesPerPage += index + 10;
            scroll({top: 0,left: 0,behavior: 'smooth'});
        }
    }
);



document.addEventListener("scroll",
    function (e) {

        var scrolled = window.scrollY;

        console.log(scrolled + " scrolled vs " + (1000*articlesPerPage/10))
        if(scrolled > 1000*articlesPerPage/10   ){
            articlesPerPage += 10;
            // writeArticles2Html(articlesCounts, articlesPerPage, server, 'clanky', 'navigacia');
            writeArticles2Html(index, articlesPerPage, server, 'clanky', 'navigacia');
        }else if(scrolled < 100) {
            articlesPerPage = 10;
            // writeArticles2Html(articlesCounts, articlesPerPage, server, 'clanky', 'navigacia');
            writeArticles2Html(index, articlesPerPage, server, 'clanky', 'navigacia');
        }

        if(articlesPerPage > totalArticles) {
            articlesPerPage = totalArticles;
            writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');
        }
        console.log(articlesPerPage);
    }
);


/*
document.addEventListener("click", //vypise do konzoly na co som klikol
    function(e){
        console.log(e.target);
    }
);
*/
