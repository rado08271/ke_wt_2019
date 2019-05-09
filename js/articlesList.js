/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu
//Code executed when the script is loaded



//Výpis prvých maximálne articlesPerPage článkov a zápis informácie do navigačného panela
//Write first articlesPerPage articles to html and create a navigation part
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');
// writeArticles2Html(0, articlesPerPage, server, 'clanky', '');

articlesPerPage = 10;
var totalArticles = 0;
var index = 0;
var articlesCounts = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie


/**
 * Vráti HTML kód pre navigačnú časť stránky
 * @param startIndex - index prvého zo zobrazených článkov
 * @param articlesCount - počet vypísaných článkov
 * @param articlesTotalCount  - celkový počet článkov v databáze servra
 * @returns {string} - HTML kód pre navigačnú časť stránky
 *
 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page
 */

function navHtml(startIndex, articlesCount, articlesTotalCount){
    var htmlCode="";

    // console.log("articles count " + articlesCount + " articles total count: " + articlesTotalCount);
    totalArticles = articlesTotalCount;
    index = startIndex;
    articlesCounts = articlesCount;
    // index = startIndex;

    // if(articlesCount>0){
    //     htmlCode+="<hr> ";
    //     htmlCode+="Vypisujem články  "+(startIndex+1)+" až "+(startIndex+articlesCount)+" z "+ articlesTotalCount +" článkov. <br />";
    //         htmlCode+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";
    // }

    setButtons(startIndex, articlesTotalCount);

    return htmlCode;
}

/**
 * Zapíše autorov a názvy článkov do daného html elementu
 * @param articles  - pole objektov s článkami
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 *
 * Writes authors and article names to the html element
 * @param articles - array of objects with articles
 * @param articlesElmId - Id of the element to  the articles are to be added
 * @param navElmId - Id of the element to which the navigation links are to be added
 * @param startIndex - the article sequence number (from 0) from which articles are written
 * @param max - maximum number of articles.
 */
function renderListOfArticles(articles, articlesElmId, navElmId, startIndex, max){
    var articlesElm=document.getElementById(articlesElmId);
    var navElm=document.getElementById(navElmId);
    if(articlesElm&&navElm){
        //mrenderObjectWithTemplateFromFile(articles, "templates/listOfArticles.mst", articlesElmId);
        mrenderObjectWithTemplateFromElm(articles, "listOfArticlesMTemplate", articlesElmId);
        mrenderObjectWithTemplateFromElm(articles, "popUp", 'navbarFoot');
        navElm.innerHTML=navHtml(startIndex, articles.articles.length,articles.meta.totalCount);
    }
}



/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= "+status);
}

/**
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 * @param server - doménové meno servera odkiaľ sa majú údaje stiahnuť.
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 *
 * Writes article data to the element with id=articlesElmId and HTML code for the navigation part to the element with id=navElmId
 * @param startIndex - index of the first article that is displayed. Articles are indexed from 0
 * @param max - maximum number of the displayed articles
 * @param server - domain name of the server with the article database
 * @param articlesElmId - id of the html element to which the authors and names of the articles are written
 * @param navElmId - id of the html element with the navigation part
 */
function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId){
    var restURL ="http://"+server+"/api/article/?max="+max+"&offset="+startIndex;

    console.log(restURL);

    getJSONAllBr(restURL,
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});

}

function getAll(tag, startIndex, max, server, articlesElmId, navElmId) {
    //change this to get search results
    var restURL ="http://"+server+"/api/article?title="+tag;

    console.log(restURL);

    getJSONAllBr(restURL,
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});
}


