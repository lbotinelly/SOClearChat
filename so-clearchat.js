// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.1
// @author       OnoSendai
// @match        http://chat.stackexchange.com/rooms/*
// @match        https://chat.stackexchange.com/rooms/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

setTimeout(function(){
    console.log('Hooking up!');

    $(function(){
        
        
        var r= $('<a title="Clear this chat window" target="_self" id="soc_clr" style="cursor:pointer;">clear</a> | ' + 
                 '<a title="Clear this chat window" target="_self" id="soc_wipeimg" style="cursor:pointer;">remove media</a>' + 
                 '<span> | </span>');
        $("#sidebar-menu").prepend(r);

        $("#soc_clr").click(function (e) {
            $("div.monologue").remove();
            $("div.system-message").remove();
            event.preventDefault();
        });

        $("#soc_wipeimg").click(function (e) {
            $("div.ob-image > a").addClass('deleted').text('(Image removed)');
            $("div.ob-youtube > a").addClass('deleted').text('(Video removed)');
            $("div.monologue .messages:contains('▒')").text('(Silly ASCII art removed)');
        });
    });
}, 1000);

// "Para funcionar no IE, baixe o Chrome" - emanuelsn
