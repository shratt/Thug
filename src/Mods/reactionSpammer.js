import actions from "../API/actions";

function reactionSpammer () {
    if (reactionSpammer.reactionSpammerInterval) {
        clearInterval(reactionSpammer.reactionSpammerInterval);
    }

    reactionSpammer.reactionSpammerInterval = setInterval(() => {

        if (reactionSpammer.currentEmojiIndex == (window.reactionList.length - 1)) {
            reactionSpammer.currentEmojiIndex = 0;
        } else {
            reactionSpammer.currentEmojiIndex++;
        }

        actions.sendReaction(window.reactionList[reactionSpammer.currentEmojiIndex]);
    }, reactionSpammer.reactionSpammerDelay);
}

reactionSpammer.reactionSpammerDelay = 1;
reactionSpammer.reactionSpammerInterval = null;
reactionSpammer.currentEmojiIndex = 0;
reactionSpammer.stop = () => clearInterval(reactionSpammer.reactionSpammerInterval);

export default reactionSpammer;