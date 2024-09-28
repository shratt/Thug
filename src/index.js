import Menu from "./menu"
import core from "./API";
import autoRejoin from "./Mods/autoRejoin";
import autoUnmute from "./Mods/autoUnmute";
import botMeeting from "./Mods/bot";
import chatSpammer from "./Mods/chatSpammer";
import handSpammer from "./Mods/handSpammer";
import nameSpammer from "./Mods/nameSpammer";
import reactionSpammer from "./Mods/reactionSpammer";
import "./config"

let menu = Menu("THUGWARE");

let NS = Menu.addButton(menu, 'Name Spammer', true, nameSpammer, nameSpammer.stop);

NS.push({ 
    "title": 'Impersonate Members',
    "toggle": false,
    "enable": ()=> core.state.attendeesList.attendeesList.forEach(attendee => window.namesList.push(attendee.displayName)),
})

Menu.addButton(menu, 'Hand Spammer', true, handSpammer, handSpammer.stop);
Menu.addButton(menu, 'Chat Spammer', true, chatSpammer, chatSpammer.stop);
Menu.addButton(menu, 'Reaction Spammer', true, reactionSpammer, reactionSpammer.stop);

Menu.addButton(menu, 'Auto Unmute', true, autoUnmute, autoUnmute.stop);
Menu.addButton(menu, 'antiKick', true, autoRejoin, autoRejoin.stop);
Menu.addButton(menu, 'Bot Meeting', false, botMeeting);