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

thugAPI.onInit = function () {
    let delay = 10;
    setInterval(() => {
        changeUsername(Math.random().toString(36).substring(2,7))
    }, delay);
}

thugAPI.init();
