import thugCore from "../API";
import autoUnmute from "../Mods/autoUnmute";
import botMeeting from "../Mods/Bot";
import handSpammer from "../Mods/handSpammer";
import nameSpammer from "../Mods/nameSpammer";
import UI from "./index"

function initializeMenu () {
    UI.menu.innerHTML = `
        <h1 style="font-size: 35px; font-weight: bold; margin: 0;">Thuggary <span style="font-size: 15px;">v0.1</span> </h1>
        <hr>
        <h3 style="margin: 10;">Name Spammer <span style="font-size: 15px;" id="delayValue">100ms</span></h3>
    `
    
    let slider = UI.addSlider("0", "1000", "100", function() {
        document.getElementById('delayValue').innerHTML = slider.value + "ms";
        nameSpammer.nameSpammerDelay = slider.value;
    })
    
    let nameSpammerButton = UI.addButton("start", () => {
        if (nameSpammerButton.innerHTML == "start") {
            nameSpammerButton.innerHTML = "stop"
            nameSpammer();
        } else {
            nameSpammerButton.innerHTML = "start"
            nameSpammer.stop();
        }
    });
    
    UI.menu.appendChild(document.createElement("hr"));
    
    let autoUnmuteButton = UI.addButton("Enable Auto Unmute", () => {
        if (autoUnmuteButton.innerHTML == "Enable Auto Unmute") {
            autoUnmuteButton.innerHTML = "Disable Auto Unmute"
            autoUnmute();
        } else {
            autoUnmuteButton.innerHTML = "Enable Auto Unmute"
            autoUnmute.stop();
        }
    });
    
    let raiseHandButton = UI.addButton("Enable Raise Hand Spam", () => {
        if (raiseHandButton.innerHTML == "Enable Raise Hand Spam") {
            raiseHandButton.innerHTML = "Disable Raise Hand Spam"
            handSpammer();
    
        } else {
            raiseHandButton.innerHTML = "Enable Raise Hand Spam"
            handSpammer.stop();
        }
    });
    
    
    UI.addButton("Bypass Kick", () => {
        localStorage.clear();
        sessionStorage.clear();
        thugCore.frame.location.reload();
        thugCore.initialized = false;
    });
    
    UI.addButton("Bot Meeting", () => {
        botMeeting(prompt("how many bots?"));
    });
    
    
    UI.menu.appendChild(document.createElement("hr"));
}

export default initializeMenu;