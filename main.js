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

thugAPI.init();

let nameSpammerDelay = 100;
let nameSpammerInterval = null;

let menu = document.createElement('div');
menu.style.position = 'fixed';
menu.style.top = "0%";
menu.style.right = "0%";
menu.style.zIndex = '99999';
menu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
menu.style.color = "white";
menu.style.backdropFilter = 'blur(4px)';
menu.style.border = "1px solid rgba(255, 255, 255, 0.8)";
menu.style.padding = '15px';
menu.style.borderRadius = '4px';
menu.style.width = '350px';

menu.innerHTML = `
    <h1 style="margin: 0;">Thug</h1>
    <hr>
    <h3 style="margin: 0;">Name Changer</h3>
    <div style="margin: 10px 0;">
        <label for="scale">Delay: <span id="delayValue">200</span> ms</label><br>
        <input type="range" min="1" max="1000" value="200" class="slider" id="scale">
        <button id="start" style="background-color: #ff5722; color: white; border: none; border-radius: 4px;">Apply</button>
        <button id="stop" style="background-color: #ff5722; color: white; border: none; border-radius: 4px;">Stop</button>
    </div>
`

document.body.appendChild(menu);

document.getElementById('scale').addEventListener('input', (event) => {
    const delayValue = document.getElementById('delayValue');
    delayValue.textContent = event.target.value;
    nameSpammerDelay = event.target.value;
});

document.getElementById('start').addEventListener("click", () => {
    if (nameSpammerInterval) {
        clearInterval(nameSpammerInterval);
    }
    nameSpammerInterval = setInterval(() => {
        changeUsername(Math.random().toString(36).substring(2,7))
    }, nameSpammerDelay);
});

document.getElementById('stop').addEventListener("click", () => {
    if (nameSpammerInterval) {
        clearInterval(nameSpammerInterval);
    }
});
