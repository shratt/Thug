import actions from "../API/actions";

function chatSpammer (message) {
    chatSpammer.chatSpammerInterval = setInterval(() => {
        actions.sendMessage(message);
    }, 1);
}

chatSpammer.chatSpammerInterval = null;
chatSpammer.stop = () => clearInterval(chatSpammer.chatSpammerInterval);

export default chatSpammer;