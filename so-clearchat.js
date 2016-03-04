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

        // Favorites image link-to-thumbnail monitor
        var sheet = (function() {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style.sheet;
        })();


        sheet.insertRule(".hoverable { display: none; position: absolute; z-index: 1; bottom: 30px; border: 4px solid white;}", 0);
        sheet.insertRule("a:hover .hoverable { display: block; }", 0);
        
        function doThumbnails(){
            
            var elms = $('#starred-posts .collapsible a[href$=".gif"], #starred-posts .collapsible a[href$=".jpg"], #starred-posts .collapsible a[href$=".png"]')
            .filter(':not(.thumbified)');
            
            console.log(elms.size());
            
            elms            
                .each(function() {
                
            console.log(this.href);
                

                $(this).addClass('thumbified');
                
                var img = $('<img>',{src: this.href, height:'80px', class:'hoverable'});
                
                $(this).append(img);
            });
        };

        $("#starred-posts .collapsible").bind("DOMNodeInserted",function(){
            doThumbnails();    
        });

        doThumbnails();

    });
}, 1000);

// "Para funcionar no IE, baixe o Chrome" - emanuelsn

// Changelog:
