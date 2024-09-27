import actions from "../API/actions";

function botMeeting (amount) {
    localStorage.clear();
    window.meetingURL = window.meetingURL || document.querySelector("#webclient").src;

    let botWindow = window.open("about:blank", "bot panel", "width=500,height=400,left=100,top=100")
    
    let container = document.createElement("div");
    container.style.display = "column wrap";
    botWindow.document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {
        
        let frame = document.createElement('iframe');
        frame.src = meetingURL;
        frame.style.resize = "both";
        container.appendChild(frame);

        let scope = frame.contentWindow;  
        (scope.webpackChunkwebclient = scope.webpackChunkwebclient || []).push([[Symbol()], {}, function (require) {
            require(22665).$c.webClient_meetingUqiueId = Math.random().toString(36).substring(2,7); // bypass zoom checking UID
        }])
    }
}

export default botMeeting;