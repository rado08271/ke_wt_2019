/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Kód, ktorý sa vykoná pri načítaní skriptu
// Code executed when the script is loaded

var artId = queryString2obj().id;
var restURL ="http://"+server+"/api/article/"+artId;

writeArticle2Html(restURL,"article",artId);


//Pridanie funkcionality pre kliknutie na tlacidla
//Adding functionality for buttons

document.getElementById("btUpdate").addEventListener("click", function(){
    console.log("ouch");
    window.location.href='articleForm.html?id='+artId;
});

document.getElementById("btDelete").addEventListener("click", function(){
    console.log("ouch arghhh");
    deleteArticle(restURL);
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie
//functions



/**
 * ako v predchadzajucich prikladoch
 * as in the previous examples
 */
function writeArticle2Html(sourceURL,articleElmId, articleId) {
    if (isFinite(articleId)) {
        AJAXGetCall(sourceURL,
            function (xhr) {
                mrenderObjectWithTemplateFromFileAJAX(JSON.parse(xhr.responseText), "templates/article.mst", articleElmId);
            },
            function (xhr) {
                errorAlert("Načitanie článku zlyhalo (article loading failed).",xhr);
            }
        );
    }
}


/**
 * Vymazanie článku aj s komentármi
 * @param articleId - id článku na vymazanie
 *
 * Deletes an article, including its comments
 * @param articleId - id of the article to be deleted
 */
function deleteArticle(sourceURL){
    if(window.confirm("Skutočne si želáte vymazať článok aj s jeho komentármi? \nDo you really wish to delete the article, including its comments?")) {

        AJAXCall('DELETE', sourceURL,
            "", null,
            function (xhr) {
                var status = xhr.status;
                console.log(status + " " + xhr.statusText + " " + xhr.responseText);
                if (status == 204) { //204 = no content
                    window.alert("Článok úspešne vymazaný (article successfully deleted).");
                    window.location.href = "listOfArticles.html";
                }
                else{
                    errorAlert("Vymazanie neúspešné (delete failed).",xhr);
                }
            }
        );
    }
}

