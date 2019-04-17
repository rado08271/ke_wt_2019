/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu
//Code executed when the script is loaded
writeArticle2Html("article");
writeComments2Html("comment");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funkcie
//Functions



/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera.\nError reading data from the server.\nStatus= "+status);
}


/**
 * Zapíše údaje o článku do elementu s id=articleElmId.
 * @param articleElmId - Id elementu do ktorého sa článok má vypísať
 *
 * Writes article data to the element with id=articleElmId.
 * @param articleElmId - id of the html element to which the article data are written
 */
function writeArticle2Html(articleElmId){
    var artId = queryString2obj().id;

    if (isFinite(artId)){
        var restURL ="http://"+server+"/api/article/"+artId;
        console.log(restURL);
        getJSONAllBr(restURL,
            function(article){ mrenderObjectWithTemplateFromFile(article, "templates/article.mst", articleElmId);},
            function(status){errorDialog(status)});
    }

}

function writeComments2Html(commentsElmId) {
    var artId = queryString2obj().id;

    console.log("ArtId"+ artId);
    if(isFinite(artId)){
        // var restURL ="http://"+server+"/api/article/"+artId;

        var restURL = "http://"+server+"/api/article/"+artId+"/comment";
        console.log(restURL);
        getJSONAllBr(restURL,
            function (comment) { mrenderObjectWithTemplateFromFile(comment, "templates/comment.mst", commentsElmId);},
            function (status) {errorDialog(status)});
    }

}
