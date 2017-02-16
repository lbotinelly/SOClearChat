// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.6
// @author       OnoSendai
// @match        *://chat.stackoverflow.com/*
// @match        *://chat.meta.stackexchange.com/*
// @match        *://chat.stackexchange.com/*
// @resource     customCSS nightmode.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);

// GM_addStyle('body.nightmode#chat-body{background-color:#1e1e1e;background-image:none;color:#fff}body.nightmode #chat-body #searchbox,body.nightmode .messages{background-color:#3f3f46}body.nightmode #sidebar{color:#d0d0d0}body.nightmode a{color:#b2770a}body.nightmode a:hover{color:orange}body.nightmode .messages{-ms-border-radius:4px;border-radius:4px;color:#fff;border-width:0}body.nightmode #sidebar #info #roomtitle{text-shadow:0 1px 0 #666}body.nightmode .flair{color:#888}body.nightmode .message.neworedit{color:#fff;text-shadow:0 0 8px #fff}body.nightmode div#starred-posts>div>ul>li{border-bottom:1px dotted #3f3f46}body.nightmode div.reply-child,body.nightmode div.reply-parent{background-color:#55555e}body.nightmode .monologue.catchup-marker{border-top-width:1px}body.nightmode .monologue.catchup-marker-1{border-top-color:#3f3f46}body.nightmode .mention{background-color:inherit;color:orange;text-shadow:0 0 16px orange}body.nightmode .ob-post{padding:.8em 1.5em;background-color:#666;color:#eee}body.nightmode .ob-post a{color:#7cF!important}body.nightmode .ob-post a:hover{text-shadow:0 0 16px #7cF !important}');

setTimeout(function(){
    console.log('Hooking up!');

    $(function () {
        
        var r = $('<a title="Clear this chat window" href="javascript:void(0);" id="soc_clr">clear</a> | ' +
                 '<a title="Remove all media (videos, images)" href="javascript:void(0);" id="soc_wipeimg">remove media</a> | ' +
                 '<a title="Toggle Night Mode on/off" href="javascript:void(0);" id="soc_nightmode">night mode</a>' + 
                 '<span> | </span>');
        

        $("#sidebar-menu").prepend(r);

        $("#soc_clr").click(function (e) {
            e.preventDefault();

            $("div.monologue, div.system-message").remove();
        });

        $("#soc_wipeimg").click(function(e) {
            e.preventDefault();

            $("div.ob-image > a").addClass('deleted').text('(Image removed)');
            $("div.ob-youtube > a").addClass('deleted').text('(Video removed)');
            $("div.monologue .messages:contains('▒')").text('(Silly ASCII art removed)');
        });

        $("#soc_nightmode").click(function(e) {
            e.preventDefault();
            $("body").toggleClass('nightmode');
        });

        // Favorites image link-to-thumbnail monitor
        var style = document.createElement("style");

        rules = '.hoverable {' +
                '   display: none;' +
                '   position: absolute;' +
                '   z-index: 1;' +
                '   left: -142px;' +
                '   bottom: -1px;' +
                '   border: 4px solid white;' +
                '   width: 128px;' +
                '   box-shadow: 0 0 3px rgba(0,0,0,0.85);' +
                '} ' +
                'a:hover .hoverable {' +
                '   display: block;' +
                '}';

        if (style.styleSheet) {
            style.styleSheet.cssText = rules;
        } else {
            style.appendChild(document.createTextNode(rules));
        }

        document.head.appendChild(style);

        function doThumbnails()
        {
            var elms = $('#starred-posts .collapsible a[href$=".gif"],' +
                         '#starred-posts .collapsible a[href$=".jpeg"],' +
                         '#starred-posts .collapsible a[href$=".jpg"],' +
                         '#starred-posts .collapsible a[href$=".png"]');

            elms = elms.filter(':not(.thumbified)');

            elms.each(function() {
                var img = $('<img>', { 'src': this.href, 'class': 'hoverable' });

                $(this).addClass('thumbified').append(img);
            });
        }

        new MutationObserver(function(e) {
            doThumbnails();
        }).observe($("#starred-posts .collapsible").get(0), {
            childList: true,
            subtree: true
        });

        doThumbnails();
    });
}, 1000);
