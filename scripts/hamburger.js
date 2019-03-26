var toggle = false;

function logiIt() {
    console.log("changed " + toggle);
    if (!toggle) {
        document.getElementById("wow").style.visibility = "hidden";
        toggle = true;
    } else {
        document.getElementById("wow").style.visibility = "visible";
        toggle = false;
    }

}
