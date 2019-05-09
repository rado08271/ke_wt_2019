var toggle = false;

function logiIt() {
    // console.log("changed " + toggle);
    if (!toggle) {
        document.getElementById("googleSignIn").classList.add("hide");
        document.getElementById("facebookLogin").classList.add("hide");
        document.getElementById("wow").classList.remove("hide");
        toggle = true;
    } else {
        document.getElementById("googleSignIn").classList.remove("hide");
        document.getElementById("facebookLogin").classList.remove("hide");
        document.getElementById("wow").classList.add("hide");
        toggle = false;
    }
    // document.getElementById("wow").classList.toggle= "hide";

}
