// ==UserScript==
// @name         Thug
// @namespace    http://tampermonkey.net/
// @version      v69
// @description  rape zoom
// @author       wang, darian, niggasucker69
// @match        https://app.zoom.us/*
// ==/UserScript==

if (window.top === window) {
    let data = await fetch("https://raw.githubusercontent.com/shratt/Thug/refs/heads/main/Build/Thug.min.js").then(e => e.text());
    let script = document.createElement("script");
    script.innerHTML = data;
    document.head.appendChild(script);
}
