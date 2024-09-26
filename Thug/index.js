import thugCore from "./API";
import initializeMenu from "./UI/menu"

if (document.readyState == "complete") { 
    thugCore.init();
} else {
    window.addEventListener("load", thugCore.init);
}

initializeMenu();