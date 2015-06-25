// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.1
// @author       OnoSendai
// @match        http://chat.stackexchange.com/rooms/11910/estouro-de-pilha
// @grant        none
// @run-at       document-start
// ==/UserScript==

setTimeout(function(){
    console.log('Hooking up!');

    $(function(){
        var r= $('<br/><a id="clsBtn" class="tag" style="cursor:pointer;">Limpar Chat</a><a id="clsiBtn" class="tag" style="cursor:pointer;">Remover Imagens/Videos</a>');
        $("#room-tags").append(r);

        $("#clsBtn").click(function (e) {
            $("div.monologue").remove();
            $("div.system-message").remove();
            event.preventDefault();
        });

        $("#clsiBtn").click(function (e) {
            $("div.ob-image > a").addClass('deleted').text('(Image removed)');
            $("div.ob-youtube > a").addClass('deleted').text('(Video removed)');
        });
    });
}, 1000);

// "Para funcionar no IE, baixe o Chrome" - emanuelsn
