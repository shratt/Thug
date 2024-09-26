function botMeeting (amount) {
    localStorage.clear();
    window.meetingURL = window.meetingURL || document.querySelector("#webclient").src;
    document.getElementById("root").innerHTML = "";
    
    let offset = 0;
    
    for (let i = 0; i < amount; i++) {
        let menu = document.createElement('iframe');
        menu.width = "250"
        menu.src = meetingURL;
        document.getElementById("root").appendChild(menu);
    
        offset += menu.width;
    
        let scope = menu.contentWindow;  
        (scope.webpackChunkwebclient = scope.webpackChunkwebclient || []).push([[Symbol()], {}, function (require) {
            require(22665).$c.webClient_meetingUqiueId = Math.random().toString(36).substring(2,7); // bypass zoom checking UID
        }])
    }
}

export default botMeeting;