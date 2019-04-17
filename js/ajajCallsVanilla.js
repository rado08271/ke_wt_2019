/*
 * Created by Stefan Korecko, 2016-18
 */

/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate.
 *                         Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe.
 *                       Jej parametrom by malo byt cislo so statusom odpovede
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version also works with old browsers (IE 5, 6)
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 *
 *
 */
function getJSONAllBr(url, successHandler, errorHandler){


    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() { //alternativne mozem pouzit xhr.addEventListener("readystatechange",funkcia, false),
        // ale tu je pouzita anonymna funkcia a bolo by to iba neprehladnejsie
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE, alternativne sa da pouzit XMLHttpRequest.DONE
            status = xhr.status;
            if (status === 200) { //uspesne vybavena poziadavka
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send();

};

/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna pre novsie prehliadace, ktore poznaju hodnotu "json" pre XMLHttpRequest.responseType
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate. Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe. Jej parametrom by malo byt cislo so statusom odpovede
 *
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version works with modern browsers, which know the value "json" of the XMLHttpRequest.responseType
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 *
 */
function getJSONModernBr(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            successHandler && successHandler(xhr.response);
        } else {
            errorHandler && errorHandler(status);
        }
    };
    xhr.send();
};


/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe retazca (typ DOMString).
 * Pouziva sa na ziskanie Mustache sablony, ktora je v samostatnom subore.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * Je to vlastne funkcia getJSONAllBr bez spracovania odpovede z JSON retazca na JavaScript objekt.
 * @param url - URL ziadosti
 * @param paramObj - objekt s dalsimi parametrami pre handler-y
 * @param successHandler - funkcia, ktora spracuje retazec ziskany z odpovede. Retazec je jej prvym parametrom. Druhym je objekt s nastaveniami a udajmi spracovania.
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe. Jej parametrami su cislo chyby a  objekt s nastaveniami a udajmi spracovania.
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of a string (DOMString type).
 * It is used to get Mustache templates from separate files.
 * This version also works with old browsers (IE 5, 6)
 * It's like the function getJSONAllBr, but without processing the response to JSON.
 * @param url - URL of the request
 * @param paramObj - object with additional parameters for handlers
 * @param successHandler - function, which processes the string, obtained from the response. The string is its first parameter. The second parameter is an object with processing settings and data.
 * @param errorHandler   - function, which is called when error occurs.
 *                       Its parameters are the error status number and the object with processing settings and data.
 *
 */
function getTextFromUrl(url, paramObj, successHandler, errorHandler){
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() { //alternatively you can use xhr.addEventListener("readystatechange",function, false),
            var status;
            var data;
            if (xhr.readyState === 4) { // DONE, alternatively you can use XMLHttpRequest.DONE
                status = xhr.status;
                if (status === 200) { //successfully executed request
                    successHandler && successHandler(xhr.responseText,paramObj);
                } else {
                    errorHandler && errorHandler(status,paramObj);
                }
            }
        };
        xhr.send();
};
