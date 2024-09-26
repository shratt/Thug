// ==UserScript==
// @name         Thug
// @namespace    http://tampermonkey.net/
// @version      2024-09-26
// @description  try to take over the world!
// @author       You
// @match        https://app.zoom.us/*
// @grant        none
// ==/UserScript==

let data = await fetch("https://raw.githubusercontent.com/shratt/Thug/refs/heads/main/Build/Thug.min.js").then(e => e.text());
let script = document.createElement("script");
script.innerHTML = data;
document.head.appendChild(script);
