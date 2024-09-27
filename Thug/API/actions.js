import thugCore from ".";

let actions = {
    changeUsername (username) {
        thugCore.sendSocketMessage({
            "evt": thugCore.packets.WS_CONF_RENAME_REQ,
            "body": {
                id: thugCore.state.meeting.currentUser.userId,
                dn2: btoa(username),
                olddn2: btoa(thugCore.state.meeting.currentUser.displayName)
            }
        })();
    },
    
    unmute () {
        thugCore.sendSocketMessage({
            "evt": thugCore.morePackets.USER_NODE_AUDIO_STATUS_LIST,
            "body": {
                "add": null,
                "remove": null,
                "update": [{
                        "id": thugCore.state.meeting.currentUser.userId,
                        "muted": false
                    }]
             }
        })();
        
        thugCore.sendSocketMessage({
                "evt": thugCore.packets.WS_AUDIO_MUTE_REQ,
                "body": {
                    "id": thugCore.state.meeting.currentUser.userId,
                    "bMute": false
                }
        })();
    },

    raiseHand () {
        thugCore.sendSocketMessage({
            "evt": thugCore.packets.WS_CONF_RAISE_LOWER_HAND_REQ,
            "body": {
                "id": thugCore.state.meeting.currentUser.userId,
                "bOn": true
            }
        })(()=>{});
    },

    lowerHand () {
        thugCore.sendSocketMessage({
            "evt": thugCore.packets.WS_CONF_RAISE_LOWER_HAND_REQ,
            "body": {
                "id": thugCore.state.meeting.currentUser.userId,
                "bOn": false
            }
        })(()=>{});
    },
    
    turnOnVideo () {
        thugCore.sendSocketMessage({
            evt: thugCore.packets.WS_VIDEO_MUTE_VIDEO_REQ,
            body: {
                id: thugCore.state.meeting.currentUser.userId,
                bOn: false
            }
        })(()=>{});
    },

    sendReaction (emoji) {
        thugCore.sendSocketMessage({
            evt: thugCore.packets.WS_CONF_SEND_REACTION_REQ,
            body: {
                uNodeID: thugCore.state.meeting.currentUser.userId,
                strEmojiContent: emoji
            }
        })();
    },

    sendMessage (text) {
        // ill automatically get module ID later
        thugCore.sendChatPacket({
            "text": text,
            "styleItems": [],
            "mention": []
        }, 0)(thugCore.store.dispatch, thugCore.store.getState);
    }
}

export default actions;