// document.getElementById("data").textContent=JSONstring;

// writeArticles2Html("+ (index-articlesPerPage) + ", articlesPerPage, server, 'clanky', 'navigacia')
function setButtons(startIndex, articlesTotalCount){
    var button = {
        buttons: [
            {
                functionName: "writeArticles2Html((index - articlesPerPage) ,articlesPerPage, server, 'clanky', 'navigacia')",
                text: "Previous / Prev",
                idVal: (startIndex>0) ? "show" : "hide"
            },
            {
                functionName: "writeArticles2Html(index ,articlesPerPage, server, 'clanky', 'navigacia')",
                text: "Reload",
                idVal: "show"
            },
            {
                functionName: "writeArticles2Html((index + articlesPerPage) ,articlesPerPage, server, 'clanky', 'navigacia')",
                text: "Next",
                idVal: (startIndex+articlesPerPage<articlesTotalCount-1) ? "show" : "hide"
            },
            {
                functionName: "colorBlind()",
                text: "Color Blind",
                idVal: "colorBlind"
            }
        ]
        // actIndex: startIndex,
        // maxIndex: articlesTotalCount
    };

    console.log(button);
    var template=document.getElementById("buttonTemplate").innerHTML;

    document.getElementById("htmln").innerHTML=Mustache.render(template,button);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//just for 65mstchHtml.html:
//var person = {'name': 'Peter', 'surname': 'Novák', 'about': 'He is a <b>good</b> man.'};
//document.getElementById("HtmlResult").innerHTML=Mustache.render(document.getElementById("persTmpl").innerHTML,person);
