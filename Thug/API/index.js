window.thugCore = {
    "config": {},
    "initialized": false,
    "onInit": function () {},
    get frame() { 
        return document.getElementById("webclient")?.contentWindow || window
    },
    "init": function () {
        if (thugCore.frame.document.querySelector("#root")) {
            thugCore.getState = () => Object.values(thugCore.frame.document.querySelector("#root"))[0].memoizedState.element.props.store.getState();
            thugCore.frame.webpackChunkwebclient.push([[Symbol()], {}, function (require) {
                thugCore.frame.Object.prototype.__defineGetter__(Symbol.for("cache"), function() {
                    require.c = this;
                    delete thugCore.frame.Object.prototype[Symbol.for("cache")];
                    return { exports: {} };
                });
                require(Symbol.for("cache"));
                thugCore.wpRequire = require;
            }]);
            
            thugCore.packets = Object.values(thugCore.wpRequire.c).find(m => m.exports?.WS_CONF_RENAME_REQ).exports;
            thugCore.morePackets = Object.values(thugCore.wpRequire.c).find(m => m.exports?.USER_NODE_AUDIO_STATUS_LIST).exports;
            Object.values(thugCore.wpRequire.c).forEach(module => {
                if (!module?.exports) return;
                Object.values(module.exports).forEach(prop => {
                    if (typeof prop === "function" && prop.toString().includes("case a.WS_AUDIO_DIALOUT_REQ:")) {
                        thugCore.sendSocketMessage = prop;
                    }
                });
            });

            thugCore.initialized = true;
            thugCore.onInit();
        }
    },
    "check": function () {
        if (thugCore.initialized == false) {
            thugCore.init();
            console.log("refreshing thugCore");
        }
    }
};

export default thugCore;