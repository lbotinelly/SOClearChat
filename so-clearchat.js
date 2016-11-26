// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.3
// @author       OnoSendai
// @match        http://chat.stackexchange.com/rooms/*
// @match        https://chat.stackexchange.com/rooms/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

setTimeout(function(){
    console.log('Hooking up!');

    $(function () {
        var r = $('<a title="Clear this chat window" href="javascript:void(0);" id="soc_clr">clear</a> | ' +
                 '<a title="Clear this chat window" href="javascript:void(0);" id="soc_wipeimg">remove media</a>' +
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

        // Favorites image link-to-thumbnail monitor
        var style = document.createElement("style");

        rules = '.hoverable {' +
                '   display: none;' +
                '   position: absolute;' +
                '   z-index: 1;' +
                '   left: -142px;' +
                '   top:-1px;' +
                '   border: 4px solid white;' +
                '   width:128px;' +
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
