import core from "../API";

function autoRejoin () {
    autoRejoin.autoRejoinInterval = setInterval(function () {
        if (core.frame.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary")?.[0]?.innerText == "Exit" || document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue")?.[0]?.innerText === "Leave") {
            localStorage.clear();
            sessionStorage.clear();
            core.frame.location.reload();
            core.initialized = false;
        }
    }, 1000);
}

autoRejoin.autoRejoinInterval = null;
autoRejoin.stop = () => clearInterval(autoRejoin.autoRejoinInterval);

export default autoRejoin;
