let thugAPI = {
    "initialized": false,
    "onInit": function () {},
    "frame": document.getElementById("webclient")?.contentWindow || window,
    "init": function () {
        thugAPI.reactStore = Object.values(thugAPI.frame.document.querySelector("#root"))[0].memoizedState.element.props.store;
        thugAPI.frame.webpackChunkwebclient.push([[Symbol()], {}, function (require) {
            thugAPI.frame.Object.prototype.__defineGetter__(Symbol.for("cache"), function() {
                require.c = this;
                delete thugAPI.frame.Object.prototype[Symbol.for("cache")];
                return { exports: {} };
            });
            require(Symbol.for("cache"));
            thugAPI.wpRequire = require;
        }]);
        
        thugAPI.packets = Object.values(thugAPI.wpRequire.c).find(m => m.exports?.WS_CONF_RENAME_REQ).exports;
        thugAPI.morePackets = Object.values(thugAPI.wpRequire.c).find(m => m.exports?.USER_NODE_AUDIO_STATUS_LIST).exports;
        Object.values(thugAPI.wpRequire.c).forEach(module => {
            if (!module?.exports) return;
            Object.values(module.exports).forEach(prop => {
                if (typeof prop === "function" && prop.toString().includes("case a.WS_AUDIO_DIALOUT_REQ:")) {
                    thugAPI.sendSocketMessage = prop;
                }
            });
        });

        thugAPI.initialized = true;
        thugAPI.onInit();
    }
};

function changeUsername (username) {
    thugAPI.sendSocketMessage({
        "evt": thugAPI.packets.WS_CONF_RENAME_REQ,
        "body": {
            id: thugAPI.reactStore.getState().meeting.currentUser.userId,
            dn2: btoa(username),
            olddn2: btoa(thugAPI.reactStore.getState().meeting.currentUser.displayName)
        }
    })();
};

function unmute () {
    thugAPI.sendSocketMessage({
        "evt": thugAPI.morePackets.USER_NODE_AUDIO_STATUS_LIST,
        "body": {
            "add": null,
            "remove": null,
            "update": [{
                    "id": thugAPI.reactStore.getState().meeting.currentUser.userId,
                    "muted": false
                }]
         }
    })();
    
    thugAPI.sendSocketMessage({
            "evt": thugAPI.packets.WS_AUDIO_MUTE_REQ,
            "body": {
                "id": thugAPI.reactStore.getState().meeting.currentUser.userId,
                "bMute": false
            }
    })();
};


thugAPI.init();

let nameSpammerDelay = "100";
let nameSpammerInterval = null;

let menu = document.createElement('div');
menu.style.position = 'fixed';
menu.style.top = "0%";
menu.style.right = "0%";
menu.style.zIndex = '99999';
menu.style.backgroundColor = 'rgba(36, 36, 36, 0.9)';
menu.style.color = "white";
menu.style.backdropFilter = 'blur(4px)';
menu.style.boxShadow = "0 8px 24px #0000004d";
menu.style.padding = '15px';
menu.style.borderRadius = '0px 0px 0px 8px';
menu.style.width = '350px';
menu.style.height = "40%";

menu.innerHTML = `
    <h1 style="font-size: 35px; font-weight: bold; margin: 0;">Thuggary <span style="font-size: 15px;">v0.1</span> </h1>
    <hr>
    <h3 style="margin: 10;">Name Spammer <span style="font-size: 15px;" id="delayValue">100ms</span></h3>
`;

function addButton (name, callback) {
    let button = document.createElement('button');
    button.innerHTML = name;
    button.style.padding = '2px 15px';
    button.style.backgroundColor = 'rgba(52, 52, 52, 1)';
    button.style.width = "100%";
    button.style.height = "10%";
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';
    button.style.transition = 'background-color 0.3s, transform 0.3s';
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'rgba(75, 75, 75, 1)';
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'rgba(52, 52, 52, 1)';
    });
    button.addEventListener('click', callback);
    menu.appendChild(button);
    return button;
}

function addSlider (min, max, value, callback) {
    let sliderInput = document.createElement('input');
    sliderInput.type = 'range';
    sliderInput.min = min;
    sliderInput.max = max;
    sliderInput.value = value;
    sliderInput.style.flexGrow = '1';
    sliderInput.style.height = '5%';
    sliderInput.style.width = '100%';
    sliderInput.style.marginBottom = '5px';
    sliderInput.style.appearance = 'none';
    sliderInput.style.background = 'transparent';
    sliderInput.style.border = 'none';
    sliderInput.style.cursor = 'pointer';
    sliderInput.style.borderRadius = '5px';
    sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    sliderInput.style.transition = 'background-color 0.3s ease';
    menu.appendChild(sliderInput);

    sliderInput.addEventListener('input', callback);
    
    return sliderInput;
}

let slider = addSlider("0", "1000", "100", function() {
    document.getElementById('delayValue').innerHTML = slider.value + "ms";
    nameSpammerDelay = slider.value;
})

let nameSpammerButton = addButton("start", () => {
    if (nameSpammerButton.innerHTML == "start") {
        nameSpammerButton.innerHTML = "stop"

        if (nameSpammerInterval) {
            clearInterval(nameSpammerInterval);
        }

        nameSpammerInterval = setInterval(() => {
            changeUsername(Math.random().toString(36).substring(2,7))
        }, parseInt(nameSpammerDelay));

    } else {
        nameSpammerButton.innerHTML = "start"

        if (nameSpammerInterval) {
            clearInterval(nameSpammerInterval);
        }
    }
});

menu.appendChild(document.createElement("hr"));

let autoUnmuteInterval;

let autoUnmuteButton = addButton("Enable Auto Unmute", () => {
    if (autoUnmuteButton.innerHTML == "Enable Auto Unmute") {
        autoUnmuteButton.innerHTML = "Disable Auto Unmute"

        autoUnmuteInterval = setInterval(function () {
            if (thugAPI.reactStore.getState().meeting.currentUser.muted) {
                unmute();
            }
        }, 10);

    } else {
        autoUnmuteButton.innerHTML = "Enable Auto Unmute"
        clearInterval(autoUnmuteInterval);
    }
});

document.body.appendChild(menu);

let keyListener = (event) => {
    if (event.code === 'ShiftRight') {
        if (menu.style.display == "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    }
};

window.addEventListener('keydown', keyListener);
thugAPI.frame.addEventListener('keydown', keyListener);