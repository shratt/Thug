import actions from "../API/actions";

function handSpammer () {
    handSpammer.handSpammerInterval = setInterval(() => {
        actions.raiseHand();
        actions.lowerHand();
    }, 10);
}

handSpammer.handSpammerInterval = null;
handSpammer.stop = () => clearInterval(handSpammer.handSpammerInterval);

export default handSpammer;