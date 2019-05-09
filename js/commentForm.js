var commentForm = document.getElementById("commentForm");
var artId = queryString2obj().id;
var commentId = queryString2obj().commentId;

if (isFinite(commentId)) {
    console.log("edit comment "+commentId);
    AJAXGetCall("http://"+server+"/api/comment/"+ commentId,
        function(xhr){
            var comment=JSON.parse(xhr.responseText);
            console.log(comment);
            document.getElementById("authorName").value=comment.author;
            document.getElementById("text").value=comment.text;
        },
        function(xhr){
            errorAlert("Načitanie komentaru zlyhalo (comment loading failed).",xhr);
        }
    );
}

// var gAuth = (profile !== undefined && profile !== null) ? (profile.getGivenName() + " " + profile.getFamilyName()) : undefined;
//
// if(gAuth !== undefined) {
//     // document.getElementById("author").value = gAuth;
// }


console.log(commentForm);

commentForm.addEventListener("submit", function(e){
    console.log("sending data")
    event.preventDefault();

    //uploadnes komentar pri put pri post pridas komentar k clanku...k CLANKU
    if (isFinite(artId))
        prepareAndSendComment(commentForm,"POST",   "http://" + server + "/api/article/" + artId + "/comment");
    else if (isFinite(commentId)) {
        prepareAndSendComment(commentForm, "PUT","http://" + server + "/api/comment/" + commentId);
    }
});


/**
 * Spracuje údaje o článku z formulára a odošle na uloženie na server
 * @param form - formulár s článkom
 * @param method - metóda, "POST" (pridanie článku) alebo "PUT" (úprava článku)
 * @param restURL - url zdroja na serveri
 *
 * Processes article data from the form and sends them to the server.
 * @param form - article form
 * @param method - method, "POST" (add article) or "PUT" (edit article)
 * @param restURL - url of the resource at the server
 */
function prepareAndSendComment(commentForm, method, restURL) {

    //1. Uloží údaje z formulára do objektu
    //1. Puts form data to the object data
    var data = form2trimmedStringsObject(commentForm);

    console.log(restURL);
    console.log(commentForm);
    console.log(data);

    console.log("prepareAndSendComment> Data from the form in the data object:");
    console.log(JSON.stringify(data));

    //3.Kontrola, či boli zadané povinné polia
    //3.Required/format validation
    if(!data.author){
        alert("Chyba autor komentára.");
        return;
    }
    if(!data.text){
        alert("Chyba obsah komentára pouzi iba povolene znaky!");
        return;
    }

    console.log("prepareAndSendArticle> Form data successfully converted to:");
    console.log(JSON.stringify(data));


    console.log("prepareAndSendArticle> Form data validated.");


    //4. odoslanie údajov
    //4. sending the data
    if(window.confirm("Skutočne si želáte komentár zapísať do databázy?\nDo you really wish to upload the comment?")){
        AJAXCall(method, restURL,
            "application/json;charset=UTF-8",
            JSON.stringify(data),
            function(xhr){
                var status=xhr.status;
                if(status==200 || status==201){
                    var response=JSON.parse(xhr.responseText);
                    if(response.id){
                        console.log(response.id);
                        window.location.href = "article.html?id=" + artId;
                    }
                    console.log("Spracovanie úspešné. Údaje boli zapísané");
                }else if(status==202){ //Spracovanie úspešné. Údaje sa zapisujú (successful processing but upload not finished)
                    window.location.href="articleForm.html";

                } else{
                    errorAlert("Zapísanie komentára zlyhalo (comment uploading failed).",xhr);

                }
                console.log(status+" "+xhr.statusText+" "+xhr.responseText);
            }
        );
    }
}

/*
 * Created by Stefan Korecko, 2016-18
 */

/**
 *
 * Pomocná funkcia pre addTrmSrtVal2ObjIfNotEmpty(...) a form2trimmedStringsObject(...).
 * Ak element elmWVal má atribút value, vráti jeho hodnotu po prevode na reťazec a aplikácii funkcie trim().
 * Ak ho nemá alebo elmWVal neexistuje, vráti prázdny reťayec.
 * @param elmWVal - element, ktorého hodnota sa spracuváva.
 * @returns {String} - viď. všeobecný popis funkcie
 *
 * A helper function for addTrmSrtVal2ObjIfNotEmpty(...) and form2trimmedStringsObject(...).
 * If the element elmWVal has the value attribute, it returns converted to a trimmed string.
 * If there is no value attribute or elmWVal doesn't exist, it returns an empty string.
 * @param elmWVal - element, which value is processed
 * @returns {String} - see above
 *
 */
function elmValue2TrimmedString(elmWVal){
    if(elmWVal && elmWVal.value!==undefined && elmWVal.value!==null)
        return elmWVal.value.toString().trim();
    else
        console.log(elmWVal.name+" nema value");
    return "";
}

/**
 * Pomocná funkcia pre form2trimmedStringsObject(...). Pridá hodnotu elmWVal.value k objektu obj ako reťazec, ale len v prípade, že
 * nebude po aplikácii funkcie trim() prázdny. Meno novej položky bude elmWVal.name.
 * Ak už položka s týmto menom existuje, prepíše ju.
 * Funkcia  trim() odstráni biele znaky na začiatku a konci reťazca
 * @param elmWVal - formulárový prvok, ktorý v sebe má danú hodnotu, ktorá sa má pridať
 * @param obj - objekt, ku ktorému sa hodnota má pridať ako nová položka
 *
 * A helper function for form2trimmedStringsObject(...). It adds the value elmWVal.value to the object obj as a string
 * but only if the value will not be an empty string after applying the trim() function. The nema of the new item will be  elmWVal.name.
 * If the item already exists, it is rewritten.
 * @param elmWVal - form element that includes a value that should be added.
 * @param obj - object to which the value should be added as a new item (string).
 */
function addTrmSrtVal2ObjIfNotEmpty(elmWVal, obj){
    if(elmWVal  && elmWVal.value!==undefined && elmWVal.value!==null){ //ak daný element existuje a má atribút value
        var valTrimmed= elmValue2TrimmedString(elmWVal); //valTrimmed = val skonvertovaná na reťazec a s odstránenými bielimi znakmi na začiatku a konci
        if(valTrimmed.length>0){ //ak reťazec nie je prázdny (stačilo dať aj if(valTrimmed), ale takto je to jasnejšie)
            obj[elmWVal.name]=valTrimmed;
        }
    } else console.log("XXX");
}

/**
 * Spracuje údaje z formulára do podoby objektu, kde
 *  - meno položky     = hodnota vlastnosti 'name' daného prvku formulára
 *  - hodnota položky  = hodnota vlastnosti 'value' daného prvku formulára ako reťazec
 *                       s dstránenými bielymi znakmi na začiatku a konci
 * Ak hodnota nebola zadaná alebo je prázdny reťazec alebo obsahuje iba biele znaky, daná položka v objekte nebude.
 * POZOR: funkcia predpokladá JEDINEČNÉ MENÁ PRVKOV FORMULÁRA. Ak je viac prvkov s tým istým menom, do objektu sa uloží
 *        iba hodnota posledného z nich.
 * @param form - DOM objekt formulára
 * @returns {{}} objekt s údajmi z formulára
 *
 * Processes form data to an object, where
 *  - an item name   = value of the 'name' attribute of the given form element
 *  - an item value  = value of the 'value' attribute of the given form element as a trimmed string
 *  If the value is not set or reduces to an empty string after trimming, the given item will not be added to the object.
 * Warning! If there are multiple form items with the same id, only the last one is added into the corresponding item of the object.
 * @param form - DOM object of the form
 * @returns {{}} object with the form data
 */
function form2trimmedStringsObject(form){
    if (!form || form.nodeName !== "FORM") {
        return null;
    }
    var i, j, dataObj = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue; //prejdem na koniec cyklu
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            addTrmSrtVal2ObjIfNotEmpty(form.elements[i],dataObj);
                        }
                        break;
                    default: //ostatne: text, hidden, password, ...
                        addTrmSrtVal2ObjIfNotEmpty(form.elements[i],dataObj);
                        break;
                }
                break;
            case 'TEXTAREA':
                addTrmSrtVal2ObjIfNotEmpty(form.elements[i],dataObj);
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        addTrmSrtVal2ObjIfNotEmpty(form.elements[i],dataObj);
                        //dataObj[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'select-multiple':
                        var selected=[];
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                var selValue=elmValue2TrimmedString(form.elements[i].options[j]);
                                if(selValue.length>0) selected.push(selValue);
                            }
                            dataObj[form.elements[i].name] = selected;
                        }
                        break;
                }
                break;
        }
    }
    return dataObj;
}