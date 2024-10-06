// ==UserScript==
// @name         ThugWare
// @namespace    http://tampermonkey.net/
// @version      v69
// @description  rape zoom
// @author       wang, darian, niggasucker69
// @match        https://app.zoom.us/*
// ==/UserScript==

// prevent from loading in the client iframe
if (window.top === window) {
    // GET the build
    let data = await fetch("https://raw.githubusercontent.com/shratt/Thug/refs/heads/main/Build/Thug.min.js").then(e => e.text());
    let script = document.createElement("script");
    script.innerHTML = data;
    // append the script element
    document.head.appendChild(script);
}
