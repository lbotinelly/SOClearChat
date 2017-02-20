// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.9
// @author       OnoSendai
// @match        *://chat.stackoverflow.com/*
// @match        *://chat.meta.stackexchange.com/*
// @match        *://chat.stackexchange.com/*
// @require      http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @resource     customCSS nightmode.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);

//GM_addStyle('');

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


        // Hotkeys for input

        var inputElem = document.getElementById("input");

        shortcut.add("Ctrl+I",function() {addDelimiters('*');},{'type':'keydown','propagate':false,'target':inputElem});
        shortcut.add("Ctrl+B",function() {addDelimiters('**');},{'type':'keydown','propagate':false,'target':inputElem});
        shortcut.add("Ctrl+S",function() {addDelimiters('---');},{'type':'keydown','propagate':false,'target':inputElem});
        shortcut.add("Ctrl+Q",function() {addDelimiters('> ', true);},{'type':'keydown','propagate':false,'target':inputElem});

        function addDelimiters(marker, useNewLine){
            var o = $('#input');
            var start = o.get(0).selectionStart;
            var end   = o.get(0).selectionEnd;
            var u = o.val();
            
            var final;

            if (!useNewLine){
                final = u.substring(0, start) + marker + u.substring(start, end) + marker + u.substring(end);
                o.val(final);
                o.get(0).selectionStart = start + marker.length;
                o.get(0).selectionEnd = end + marker.length;
            }else{

                if (start !== 0) marker = "\n" + marker;

                final = u.substring(0, start) + marker + u.substring(start, end) + "\n" + u.substring(end);
                o.val(final);
                o.get(0).selectionStart = end + marker.length;
                o.get(0).selectionEnd = end + marker.length;

            }
        }


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
