let offset = 0;

function botMeeting (invisible = false) {

    let amount = prompt("how many bots?")

    localStorage.clear();
    window.meetingURL = window.meetingURL || document.querySelector("#webclient").src;

    let botWindow = window.open("about:blank", "Bot Panel - " + offset, "width=500,height=400,left=100,top=100")

    offset++;

    botWindow.document.title = "Bot Panel";
    botWindow.document.body.style.backgroundColor = "black";

    let container = document.createElement("div");
    container.style.display = "column wrap";
    botWindow.document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {
        
        let frame = document.createElement('iframe');
        frame.src = meetingURL;
        if (!invisible) {
            frame.style.resize = "both";
            frame.style.border = "none";
            frame.style.margin = "5px";
        } else {
            frame.style.width = "0%";
            frame.style.height = "0%";
            frame.style.display = "none";
        }
        container.appendChild(frame);

        let scope = frame.contentWindow;  
        (scope.webpackChunkwebclient = scope.webpackChunkwebclient || []).push([[Symbol()], {}, function (require) {
            require(22665).$c.webClient_meetingUqiueId = Math.random().toString(36).substring(2,7); // bypass zoom checking UID
        }])
    }
}

export default botMeeting;