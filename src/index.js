import Menu from "./menu"
import autoRejoin from "./Mods/autoRejoin";
import autoUnmute from "./Mods/autoUnmute";
import botMeeting from "./Mods/bot";
import chatSpammer from "./Mods/chatSpammer";
import handSpammer from "./Mods/handSpammer";
import nameSpammer from "./Mods/nameSpammer";
import reactionSpammer from "./Mods/reactionSpammer";
import "./config"

Menu();

Menu.addButton('Name Spammer', true, nameSpammer, nameSpammer.stop);
Menu.addButton('Hand Spammer', true, handSpammer, handSpammer.stop);
Menu.addButton('Chat Spammer', true, chatSpammer, chatSpammer.stop);
Menu.addButton('Reaction Spammer', true, reactionSpammer, reactionSpammer.stop);

Menu.addButton('Auto Unmute', true, autoUnmute, autoUnmute.stop);
Menu.addButton('Auto Rejoin', true, autoRejoin, autoRejoin.stop);
Menu.addButton('Bot Meeting', false, botMeeting);