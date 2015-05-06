define("app",['jquery','fancybox','fancybox-thumbs'], function(){
    
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


    timer_slider = 400000000;
    var max_comm_slide = 3;
    var gallery=[{'text':'Доверительное управление квартирами в&nbsp;Санкт‑Петербурге','info':'', 'img':'/gallery/lease_slider/1_3_5611.jpg'},];
    var curr_q = 0;
    var max_q = 8;
    var answers=[{'text':'Мы обслуживаем собственников арендных квартир и инвесторов в доходное жилье, и находим для них арендаторов. Мудрое отношение к инвестированию и эффективному управлению уже существующими активами сильно сказывается на долгосрочном состоянии человека и общества в целом. С опытом крупнейшего профессионального инвестора в жилье в Санкт Петербурге и в Финляндии, наша задача помочь вам разумно инвестировать и эффективно управлять своими инвестициями.'},{'text':'Наш продукт - это хорошие квартиры в аренду хорошим людям. Мы находим арендаторов для наших собственников и отвечаем за квартиру перед ними. Мы заключаем договор аренды с собственником, а затем договор субаренды с арендатором. Для собственника это означает меньше проблем и меньше рисков. Фактически, мы работаем, как управляющий квартирами, где работает логика &ldquo;чем больше дохода у вас, тем больше и наш заработок&rdquo;. За наши услуги мы берем всего 10% от аренды в месяц. За первичную сдачу квартиры мы оставляем себе первый месяц аренды.'},{'text':'Мы стремимся работать с добросовестными арендаторами, поэтому, прежде чем заключить договор, мы проверяем с кем имеем дело &ndash; просим предоставить справку о доходах или документы, подтверждающие наличие доходного бизнеса. Мы также понимаем, что у всех бывают непредсказуемые повороты событий, и не каждый знает, как у него сложиться через год. Поэтому своим арендаторам мы даем право расторгнуть договор, предупреждая нас за один месяц. Если это случается, мы делаем все, чтобы найти нового арендатора до конца оплаченного месяца. Если арендатор не нашелся, то мы расторгаем договор с собственником и продолжаем поиски нового арендатора. Когда появляется новый арендатор, мы заключаем новый договор аренды с собственником квартиры. Комиссию за сдачу мы повторно не берем.'},{'text':'Как правило мы включаем коммунальные услуги в стоимость аренды. Это проще для арендатора, и у нас остается контроль за тем, что все оплачивается, и собственник не получает неприятных сюрпризов в виде не оплаченных счетов. Мы оплачиваем все счета коммунальных услуг и вычитаем их с суммы, которую получает собственник.'},{'text':'Мы следим за тем, чтобы квартира оставалась в хорошем состоянии. После первого месяца и далее ежеквартально мы проводим инспекцию квартиры. Если в квартире возникли неполадки, то мы координируем их устранение. Для обеспечения оплаты компенсации в случае повреждения по вине арендатора, при заключении договора мы взимаем депозит в размере месячной арендной ставки. Мы ожидаем, что собственник предоставит страховку на квартиру против пожара, наводнения и других несчастных случаев не по вине арендатора.&nbsp;'},{'text':'Доверительное управление означает, что Касабу принимает на себя все аспекты, связанные со сдачей и управлением объекта жилой недвижимости от лица собственника актива.<br /><br />Касабу представляет финансовые интересы собственника, сдает объект в аренду, регулярно контролирует состояние квартиры, осуществляет контроль платежей, работает с запросами арендатора, отслеживает текущиие коммунальные платажи, &nbsp;предоставляет ежемесячную отчетность по электронной почте и гарантирует своевременное получение арендной платы.'},{'text':'Уплата налога и заключение официального договора является гарантией того, что сделка имеет официальный статус, и если что-то пойдет не так, собственник может обратиться в суд.&nbsp;'},{'text':'Взимаются пени в размере 0,5% от суммы платежа за каждый день просрочки. При сроке задолженности 15-30 дней происходит расторжение договора.'},];    


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

