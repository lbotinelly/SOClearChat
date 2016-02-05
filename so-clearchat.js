// ==UserScript==
// @name         SO ClearChat
// @namespace    com.onosendai
// @version      0.3.1
// @author       OnoSendai
// @match        http://chat.stackexchange.com/rooms/11910/estouro-de-pilha
// @grant        none
// @run-at       document-start
// ==/UserScript==


 $(function(){

    setTimeout(function(){

        console.log('Hooking up!');

           // jQueryize the element criation :D
           // Magaiver dus jQuery

            var r = $('<br/>').after({

                html: [

                    $('<a/>', {
                        'id' : 'clsBtn',
                        'class' : 'tag',
                        'html'  : 'Limpar Chat',
                        'css': {
                            'cursor' : 'pointer'
                        }
                    }),

                    $('<a/>', {

                        'class' : 'tag',
                        'id' : 'clsiBtn',
                        'html' : 'Remover Imagens/Videos',
                        'css': {
                            'cursor' : 'pointer'
                        }
                    })
                ]
                
            });

            $("#room-tags").append(r);

            $("#clsBtn").click(function (e) {
                $("div.monologue").remove();
                $("div.system-message").remove();
                e.preventDefault();
            });

            $("#clsiBtn").click(function (e) {

                var $imageA = $("div.ob-image > a"),
                    $youtubeA = $("div.ob-youtube > a");

                // $("div.ob-image > a").addClass('deleted').text('(Image removed)');
                // $("div.ob-youtube > a").addClass('deleted').text('(Video removed)');

                $imageA.add($youtubeA).addClass('deleted');

                $imageA.text('(Image removed)');

                $youtubeA.text('(Video removed)');
            });
       
    }, 1000);

 });

// "Para funcionar no IE, baixe o Chrome" - emanuelsn
