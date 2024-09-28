import actions from "../API/actions";
import core from "../API";

function autoRejoin() {
    // yes
    localStorage.clear();
    sessionStorage.clear();

    autoRejoin.autoRejoinInterval = setInterval(function() {
        if (core.frame.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary")?.[0]?.innerText == "Exit" || document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue")?.[0]?.innerText === "Leave") {

            localStorage.clear();
            sessionStorage.clear();
            core.frame.location.reload();
            core.recache();

            // reset modules
            document.querySelectorAll('button').forEach(button => {
                const style = window.getComputedStyle(button);

                if (
                    // color related shit to identify thug buttons (if zoom makes a fake elem w this color to detect shit we are cooked)
                    style.color === 'rgb(255, 255, 255)' &&
                    style.backgroundColor === 'rgba(10, 10, 10, 0.75)'
                ) {
                    if (button.innerHTML === "antiKick") return
                    button.click()
                }
            });
        }
    }, 1000);
}

autoRejoin.autoRejoinInterval = null;
autoRejoin.stop = () => clearInterval(autoRejoin.autoRejoinInterval);

export default autoRejoin;