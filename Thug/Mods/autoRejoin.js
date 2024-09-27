function autoRejoin () {
    autoRejoin.autoRejoinInterval = setInterval(function () {
        if (thugCore.frame.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary")?.[0]?.innerText == "Exit") {
            localStorage.clear();
            sessionStorage.clear();
            thugCore.frame.location.reload();
            thugCore.initialized = false;
        }
    }, 1000);
}

autoRejoin.autoRejoinInterval = null;
autoRejoin.stop = () => clearInterval(autoRejoin.autoRejoinInterval);

export default autoRejoin;