import core from ".";

let actions = {
    changeUsername (username) {
        core.sendSocketMessage({
            "evt": core.packets.WS_CONF_RENAME_REQ,
            "body": {
                id: core.state.meeting.currentUser.userId,
                dn2: btoa(username),
                olddn2: btoa(core.state.meeting.currentUser.displayName)
            }
        })();
    },
    
    unmute () {
        core.sendSocketMessage({
            "evt": core.morePackets.USER_NODE_AUDIO_STATUS_LIST,
            "body": {
                "add": null,
                "remove": null,
                "update": [{
                        "id": core.state.meeting.currentUser.userId,
                        "muted": false
                    }]
             }
        })();
        
        core.sendSocketMessage({
                "evt": core.packets.WS_AUDIO_MUTE_REQ,
                "body": {
                    "id": core.state.meeting.currentUser.userId,
                    "bMute": false
                }
        })();
    },

    raiseHand () {
        core.sendSocketMessage({
            "evt": core.packets.WS_CONF_RAISE_LOWER_HAND_REQ,
            "body": {
                "id": core.state.meeting.currentUser.userId,
                "bOn": true
            }
        })(()=>{});
    },

    lowerHand () {
        core.sendSocketMessage({
            "evt": core.packets.WS_CONF_RAISE_LOWER_HAND_REQ,
            "body": {
                "id": core.state.meeting.currentUser.userId,
                "bOn": false
            }
        })(()=>{});
    },
    
    turnOnVideo () {
        core.sendSocketMessage({
            evt: core.packets.WS_VIDEO_MUTE_VIDEO_REQ,
            body: {
                id: core.state.meeting.currentUser.userId,
                bOn: false
            }
        })(()=>{});
    },

    sendReaction (emoji) {
        core.sendSocketMessage({
            evt: core.packets.WS_CONF_SEND_REACTION_REQ,
            body: {
                uNodeID: core.state.meeting.currentUser.userId,
                strEmojiContent: emoji
            }
        })();
    },

    sendMessage (text) {
        // ill automatically get module ID later
        core.sendChatPacket({
            "text": text,
            "styleItems": [],
            "mention": []
        }, 0)(core.store.dispatch, core.store.getState);
    }
}

export default actions;