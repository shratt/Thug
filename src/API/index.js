let core = {
    _sendSocketMessage: null,
    _sendChatPacket: null,
    _wpRequire: null,

    get frame() { 
        return document.getElementById("webclient")?.contentWindow || window;
    },
    get store() { 
        return Object.values(core.frame.document.querySelector("#root"))[0].memoizedState.element.props.store;
    },
    get state() { 
        return core.store.getState();
    },
    get packets() { 
        return Object.values(core.wpRequire.c).find(m => m.exports?.WS_CONF_RENAME_REQ).exports;
    },
    get morePackets() { 
        return Object.values(core.wpRequire.c).find(m => m.exports?.USER_NODE_AUDIO_STATUS_LIST).exports;
    },
    
    get sendSocketMessage() { 
        if (!this._sendSocketMessage) {
            Object.values(core.wpRequire.c).forEach(module => {
                if (!module?.exports) return;
                Object.values(module.exports).forEach(prop => {
                    if (typeof prop === "function" && prop.toString().includes("case a.WS_AUDIO_DIALOUT_REQ:")) {
                        this._sendSocketMessage = prop;
                    }
                });
            });
        }
        return this._sendSocketMessage;
    },
    
    get sendChatPacket() { 
        if (!this._sendChatPacket) {
            Object.values(core.wpRequire.c).forEach(module => {
                if (!module?.exports) return;
                Object.values(module.exports).forEach(prop => {
                    if (typeof prop === "function") {
                        let fnString = prop.toString();
                        if (fnString.includes("{meeting:{currentUser:") && fnString.includes("localXmppMsgId")) {
                            this._sendChatPacket = prop;
                        }
                    }
                });
            });
        }
        return this._sendChatPacket;
    },

    get wpRequire() { 
        if (!this._wpRequire) {
            (core.frame.webpackChunkwebclient = core.frame.webpackChunkwebclient || []).push([[Symbol()], {}, function (require) {
                core.frame.Object.prototype.__defineGetter__(Symbol.for("cache"), function() {
                    require.c = this;
                    delete core.frame.Object.prototype[Symbol.for("cache")];
                    return { exports: {} };
                });
                require(Symbol.for("cache"));
                core._wpRequire = require;
            }]);
        }
        return this._wpRequire;
    },

    recache () {
        this._wpRequire = null;
        this._sendSocketMessage = null;
        this._sendChatPacket = null;
    }
};

window.core = core;

export default core;