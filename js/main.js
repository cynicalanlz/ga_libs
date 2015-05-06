define("app",[
                'jquery',
                'jquery-mousewheel',
                'fancybox',
                'fancybox-thumbs',
                'form',
                'mslider',
                'mousetoogle',
                'muploader',                
                'jquery-backstretch',
                'smoothscroll'], 
    function($){



    var menuActive=0; 

    // $(window).load(function(){
    //     $(".loader_bg").fadeOut("slow");
    //     $(".loader").fadeOut("slow");
    // });
    // var resizePage=0,
    //     resizePageCur=0,
    //     interR;
    // $(window).resize(function(){
    //     $(".loader_bg").show();
    //     $(".loader").show();

    //     resizePage++;
    //     if (resizePageCur==0)
    //     {
    //         interR=setInterval(function(){
    //             if (resizePage==resizePageCur) 
    //             {
    //                 clearInterval(interR);
    //                 resizePage=0;
    //                 resizePageCur=0;
    //                 $(".loader_bg").fadeOut("slow");
    //                 $(".loader").fadeOut("slow");
    //             }
    //         },1000);
    //     }
    //     resizePageCur=resizePage;
    // });

    // form contacts
    var gridCols=115,
    gridInd=40,
    inputInt;


     $(document).ready(function(){

        $("#form_contacts").form({
        fields:[
            ['name','text',0,'not'],
            ['rooms','text',0,'not'],
            ['address','text',0,'not'],
            ['price','number',0,'not'],
            ['phone','phone'],
            ['email','email',0,'not']
        ],
        submit: $('.form_button')
        });

        $('#upload_image').muploader({
            images: 0,
            fileTemplate: '/modules/muploader/templates/qasabo/index.html',
            varName: 'image',
            thumbSize: [0,60],
            maxNumber: 5,
            funcAfterLoad: function(){changeLoadButton();},
            funcAfterDelete: function(){changeLoadButton();}
        });

        $('.fc_input').each(function(i,elem){
            var div=$("<div class='fc_holder_div'>"+$(elem).find('input').attr('placeholder')+"</div>").appendTo($('body')),
            width=$(div).width();
            $(div).remove();
            $(elem).width(width);
            $(elem).find('input').width(width+15);
        });

        $('.fc_input input').click(function(){resizeInput($(this));}).blur(function(){
            clearInterval(inputInt);}).focus(function(){resizeInput($(this));});


        
        function resizeInput(elem)
        {
            clearInterval(inputInt);
            inputInt=setInterval(function(){
                var divInput=$("<div class='fc_input_div'>"+$(elem).val()+"</div>").appendTo($('body')),
                    widthInput=$(divInput).width(),

                    divHolder=$("<div class='fc_holder_div'>"+$(elem).attr('placeholder')+"</div>").appendTo($('body')),
                    widthHolder=$(divHolder).width();

                $(divInput).remove();
                $(divHolder).remove();

                if ($(elem).val()!='')
                {
                    $(elem).width(widthInput+15);
                    $(elem).parent().width(widthInput);
                }
                else
                {
                    $(elem).width(widthHolder+15);
                    $(elem).parent().width(widthHolder);
                }
            },10);
        }

        function changeLoadButton()
        {
            if ($('.mu_gallery .mu_item').html()!=null)
            {
                $('.mu_button').attr('class','mu_button mu_button_q');
                $('.fbi_title').hide();
            }
            else
            {
                $('.mu_button').attr('class','mu_button');
                $('.fbi_title').show();
            }
        }

        // end old form code

        $('#form').hover(
        function() { $.data(this, 'hover', true); },
        function() { $.data(this, 'hover', false); }
        ).data('hover', false);

        // if sent successfully
        if(form_sent){
        var widthC=$('.form_block form').width(),
        heightC=$('.form_block form').height();
        $('.form_ok').width(widthC).height(heightC);
        $('.form_ok div').css('margin-top',(heightC-$('.form_ok div').height())/2-5+'px');
        $('.form_block form').hide();
        $('.form_ok').show();

        /* var interv=setInterval(function(){
           gotoScroll();
           clearInterval(interv);
           },200); */
        toggleForm();
        }

    });

    // slider




    // set the height of th content window with respect to the maximum possible size
    if(gallery.length){
          var txt = $('#head-slide-text');
          var max_height = 0;
          var max_width = 0;
          for(i=0; i < gallery.length; i++){
            txt.html(gallery[i]['text']);
            if(max_height < txt.height())
              max_height = txt.height();
          }
          txt.height(max_height);
          txt.width($('#head-screen-content').width());

          $('#head-slide-info').width($('#head-screen-content').width());
    }

    layout();

    faq(0);

});

