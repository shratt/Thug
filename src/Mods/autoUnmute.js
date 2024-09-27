import core from "../API";
import actions from "../API/actions";

function autoUnmute () {
    autoUnmute.autoUnmuteInterval = setInterval(function () {
        if (core.state.meeting.currentUser.muted) {
            actions.unmute();
        }
    }, 10);
}

autoUnmute.autoUnmuteInterval = null;
autoUnmute.stop = () => clearInterval(autoUnmute.autoUnmuteInterval);

export default autoUnmute;