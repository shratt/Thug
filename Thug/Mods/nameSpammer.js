import actions from "../API/actions";

function nameSpammer () {
    if (nameSpammer.nameSpammerInterval) {
        clearInterval(nameSpammer.nameSpammerInterval);
    }

    nameSpammer.nameSpammerInterval = setInterval(() => {

        if (nameSpammer.currentNameIndex == (window.namesList.length - 1)) {
            nameSpammer.currentNameIndex = 0;
        } else {
            nameSpammer.currentNameIndex++;
        }

        actions.changeUsername(window.namesList[nameSpammer.currentNameIndex]);
    }, parseInt(nameSpammer.nameSpammerDelay));
}

nameSpammer.nameSpammerDelay = "100";
nameSpammer.nameSpammerInterval = null;
nameSpammer.currentNameIndex = 0;
nameSpammer.stop = () => clearInterval(nameSpammer.nameSpammerInterval);

export default nameSpammer;