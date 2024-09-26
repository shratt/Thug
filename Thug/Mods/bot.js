import actions from "../API/actions";

function botMeeting (amount) {
    localStorage.clear();
    window.meetingURL = window.meetingURL || document.querySelector("#webclient").src;
    
    for (let i = 0; i < amount; i++) {
        let menu = document.createElement('iframe');
        menu.id = "webclient";
        menu.width = "100%"
        menu.height = "0%"
        menu.style.display = "none"
        menu.src = meetingURL;
        document.getElementById("root").appendChild(menu);

        let scope = menu.contentWindow;  
        (scope.webpackChunkwebclient = scope.webpackChunkwebclient || []).push([[Symbol()], {}, function (require) {
            require(22665).$c.webClient_meetingUqiueId = Math.random().toString(36).substring(2,7); // bypass zoom checking UID
        }])
    }
}

export default botMeeting;