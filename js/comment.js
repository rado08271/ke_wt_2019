var artid = queryString2obj().id;
restURL = "http://"+server+"/api/article/"+artid;

//todo ziskaj id komentu

writeComments2Html("comment");

function deleteComment(commentId) {

    if (commentId == null) return;

    if(window.confirm("Skutočne si želáte vymazať komentár ?\nDo you really want to delete comment ?")) {
        AJAXCall("DELETE",
            "http://" + server + "/api/comment/" + commentId, null, null,
            function (xhr) {
                if (xhr.status == 204) { //Spracovanie úspešné. Údaje boli zapísané (successful processing and upload)
                    window.location.href = "article.html?id=" + artId;
                    console.log("Spracovanie úspešné. Údaje boli zapísané");
                } else {
                    errorAlert("Vymazanie komentára zlyhalo (comment delete failed).", xhr);
                }
            }
        );
    }
}
