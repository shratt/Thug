import thugCore from "../API";
import autoRejoin from "../Mods/autoRejoin";
import autoUnmute from "../Mods/autoUnmute";
import botMeeting from "../Mods/Bot";
import chatSpammer from "../Mods/chatSpammer";
import handSpammer from "../Mods/handSpammer";
import nameSpammer from "../Mods/nameSpammer";
import reactionSpammer from "../Mods/reactionSpammer";
import UI from "./index"

function initializeMenu () {
    UI.menu.innerHTML += `<hr>
        <h3 style="margin: 10;">Name Spammer <span style="font-size: 15px;" id="delayValue">100ms</span></h3>`
    
    let slider = UI.addSlider("0", "1000", "100", function() {
        document.getElementById('delayValue').innerHTML = slider.value + "ms";
        nameSpammer.nameSpammerDelay = slider.value;
    })

    UI.addButton("Impersonate Guests", () => {
        window.namesList = [];
        thugCore.state.attendeesList.attendeesList.forEach(attendee => window.namesList.push(attendee.displayName));
    });
    
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

    let AutoRejoinButton = UI.addButton("Enable Auto Rejoin", () => {
        if (AutoRejoinButton.innerHTML == "Enable Auto Rejoin") {
            AutoRejoinButton.innerHTML = "Disable Auto Rejoin"
            autoRejoin();
    
        } else {
            AutoRejoinButton.innerHTML = "Enable Auto Rejoin"
            autoRejoin.stop();
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

    let chatSpamButton = UI.addButton("Enable Chat Spammer", () => {
        if (chatSpamButton.innerHTML == "Enable Chat Spammer") {
            chatSpamButton.innerHTML = "Disable Chat Spammer"
            chatSpammer(prompt("what do you want to spam?"));
    
        } else {
            chatSpamButton.innerHTML = "Enable Chat Spammer"
            chatSpammer.stop();
        }
    });

    let reactionSpamButton = UI.addButton("Enable Reaction Spammer", () => {
        if (reactionSpamButton.innerHTML == "Enable Reaction Spammer") {
            reactionSpamButton.innerHTML = "Disable Reaction Spammer"
            reactionSpammer();
    
        } else {
            reactionSpamButton.innerHTML = "Enable Reaction Spammer"
            reactionSpammer.stop();
        }
    });
    
    
    UI.addButton("Bot Meeting", () => {
        botMeeting(prompt("how many bots?"));
    });
    
    
    UI.menu.appendChild(document.createElement("hr"));

    let keyListener = (event) => {
        if (event.code === 'ShiftRight') {
            if (UI.menu.style.display == "block") {
                UI.menu.style.display = "none";
            } else {
                UI.menu.style.display = "block";
            }
        }
    };

    window.addEventListener('keydown', keyListener);
    thugCore.frame.addEventListener('keydown', keyListener);

    UI.dragElement(document.getElementById(UI.menu.id), document.getElementById(UI.header.id));
}

export default initializeMenu;