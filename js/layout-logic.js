
timer_slider = 400000000;
var max_comm_slide = 3;
var gallery=[{'text':'Доверительное управление квартирами в&nbsp;Санкт‑Петербурге','info':'', 'img':'/gallery/lease_slider/1_3_5611.jpg'},];
var curr_q = 0;
var max_q = 8;
var answers=[{'text':'Мы обслуживаем собственников арендных квартир и инвесторов в доходное жилье, и находим для них арендаторов. Мудрое отношение к инвестированию и эффективному управлению уже существующими активами сильно сказывается на долгосрочном состоянии человека и общества в целом. С опытом крупнейшего профессионального инвестора в жилье в Санкт Петербурге и в Финляндии, наша задача помочь вам разумно инвестировать и эффективно управлять своими инвестициями.'},{'text':'Наш продукт - это хорошие квартиры в аренду хорошим людям. Мы находим арендаторов для наших собственников и отвечаем за квартиру перед ними. Мы заключаем договор аренды с собственником, а затем договор субаренды с арендатором. Для собственника это означает меньше проблем и меньше рисков. Фактически, мы работаем, как управляющий квартирами, где работает логика &ldquo;чем больше дохода у вас, тем больше и наш заработок&rdquo;. За наши услуги мы берем всего 10% от аренды в месяц. За первичную сдачу квартиры мы оставляем себе первый месяц аренды.'},{'text':'Мы стремимся работать с добросовестными арендаторами, поэтому, прежде чем заключить договор, мы проверяем с кем имеем дело &ndash; просим предоставить справку о доходах или документы, подтверждающие наличие доходного бизнеса. Мы также понимаем, что у всех бывают непредсказуемые повороты событий, и не каждый знает, как у него сложиться через год. Поэтому своим арендаторам мы даем право расторгнуть договор, предупреждая нас за один месяц. Если это случается, мы делаем все, чтобы найти нового арендатора до конца оплаченного месяца. Если арендатор не нашелся, то мы расторгаем договор с собственником и продолжаем поиски нового арендатора. Когда появляется новый арендатор, мы заключаем новый договор аренды с собственником квартиры. Комиссию за сдачу мы повторно не берем.'},{'text':'Как правило мы включаем коммунальные услуги в стоимость аренды. Это проще для арендатора, и у нас остается контроль за тем, что все оплачивается, и собственник не получает неприятных сюрпризов в виде не оплаченных счетов. Мы оплачиваем все счета коммунальных услуг и вычитаем их с суммы, которую получает собственник.'},{'text':'Мы следим за тем, чтобы квартира оставалась в хорошем состоянии. После первого месяца и далее ежеквартально мы проводим инспекцию квартиры. Если в квартире возникли неполадки, то мы координируем их устранение. Для обеспечения оплаты компенсации в случае повреждения по вине арендатора, при заключении договора мы взимаем депозит в размере месячной арендной ставки. Мы ожидаем, что собственник предоставит страховку на квартиру против пожара, наводнения и других несчастных случаев не по вине арендатора.&nbsp;'},{'text':'Доверительное управление означает, что Касабу принимает на себя все аспекты, связанные со сдачей и управлением объекта жилой недвижимости от лица собственника актива.<br /><br />Касабу представляет финансовые интересы собственника, сдает объект в аренду, регулярно контролирует состояние квартиры, осуществляет контроль платежей, работает с запросами арендатора, отслеживает текущиие коммунальные платажи, &nbsp;предоставляет ежемесячную отчетность по электронной почте и гарантирует своевременное получение арендной платы.'},{'text':'Уплата налога и заключение официального договора является гарантией того, что сделка имеет официальный статус, и если что-то пойдет не так, собственник может обратиться в суд.&nbsp;'},{'text':'Взимаются пени в размере 0,5% от суммы платежа за каждый день просрочки. При сроке задолженности 15-30 дней происходит расторжение договора.'},];    


var timer_slider = 0;
var current_img = 0;
var current_comm_slide = 0;
var form_active = 0;
var form_sent = 0;
var active_person = -1;
var current_question = 0;


onload = function(){

    // if timer is set
    if(timer_slider){
	if(timer_slider < 2000)
	    timer_slider = 2000;
	slider_interval = setInterval(function(){slide_show(gallery, 1)}, timer_slider);
    }

    if(answers.length)
	faq(current_question);
};
onresize = layout;

$('html').click(function (e) {
    if ($('#form').data('hover')) {

    } else {
	if(e.target.className == 'eval-button')
	    toggleForm();
	else
	    if(form_active)
		toggleForm();
    }

    if((active_person >= 0) && (e.target.nodeName != 'U')){
	if(!$('#person-info-'+active_person).data('hover'))
	    activate_person(active_person);
    }
});

function slide_show(slides, inc){
    var slide_text = $('#head-slide-text'),
    	slide_info = $('#head-slide-info');
    current_img += inc;
    if(current_img >= gallery.length)
	current_img = 0;
    if(current_img < 0)
	current_img = gallery.length - 1;

    slide_text.html(gallery[current_img]['text']);

    if (gallery[current_img]['info']!='')
    	slide_info.show().html(gallery[current_img]['info']);
    else 
    	slide_info.hide();

    adjust_background();
}

/* scrolling handling */
(function () {
    var previousScroll = 0;
    $(window).scroll(function () {
		var sh = $('#screen-head');
		var currentScroll = $(this).scrollTop();

		if (currentScroll > previousScroll){
		    if(currentScroll >= 100)
			$('#header').css('opacity', 0);
		}
		else 
		{
		    $('#header').css('opacity', 1);
		    menuChange();
		}

		
		previousScroll = currentScroll;
    });
}());

function menuChange()
{
	var currentScroll = $(this).scrollTop();
	if (menuActive==0)
    {
	    if (currentScroll==0)
			$('#header').attr('class','site-top');
		else
			$('#header').attr('class','site-top site-top-active');
	}
}

/* layout handling */
function layout(){
    var min_marg = 100;

    if($('#form').attr('class') == 'error_contact'){
	toggleForm();
	$('#form').attr('class', '')
    }

    // slider buttons
    var sl_left = $('.slide-left');
    var sl_right = $('.slide-right');
    //set left/right arrows width to 5% margin or 40px min
    var five_per = 0.05*window.innerWidth;
    if(five_per < 40){
	sl_left.width(46 + 40);
	sl_right.width(46 + 40);
    }else{
	sl_left.width(46 + five_per);
	sl_right.width(46 + five_per);	
    }


    var sh = $('#screen-head');
    if(sh.length){
		var hd_cnt = $('#head-screen-content');

		// set width to inner width

		$('#header').width($('html').width());
		// if 5% of the width of the screen is less 50px, margin elements 50px, else 5%
		if(window.innerWidth*0.05 < 50){
		    $('#logo').css('margin-left', 50);
		    $('#head-contact').css('margin-right', 50);
		}
		else{
		    $('#logo').css('margin-left', '5%');
		    $('#head-contact').css('margin-right', '5%');
		}

		/* slide show layer */
		adjust_top_and_height(sh, hd_cnt, min_marg, 150, 110);

		sh.backstretch(gallery[current_img]['img']);
		$('#head-slide-text').html(gallery[current_img]['text']);

		if (gallery[current_img]['info']!='')
			$('#head-slide-info').show().html(gallery[current_img]['info']);
		else
			$('#head-slide-info').hide();

    }

    adjust_top_and_height($('#screen-video'), $('#video-content'), min_marg, 60, 0);

    /* advantages you get layer */
    var s_adv = $('#screen-adv');
    if(s_adv.length){
	var yg_cnt = $('#youget-content');

	adjust_top_and_height(s_adv, yg_cnt, min_marg, 60, 0);

	// prices layer
	var s_pr = $('#screen-prices');
	var pr_cnt = $('#prices-content');
	var pr_undr = $('#prices-underlay');

	adjust_top_and_height(s_pr, pr_cnt, min_marg, 60, 0);

	pr_undr.width(s_pr.width());
	pr_undr.height(s_pr.height());
    }

    // comments layer
    var s_cm = $('#screen-comments');
    if(s_cm.length){
	var cm_cnt = $('#comments-content');
	var cm_slides = $('.comment-slide');

	// set comments content div height, because it's contents are absolute positioned
	var i = 0, height = 0; max_height = 0;

	for(i; i<max_comm_slide; i++){
	    height = ( $('#slide-'+i).outerHeight(true)+
		       $('.bottom-space').outerHeight(true) +
		       $('#slide-indicator').outerHeight(true) ) ;
	    if( max_height < height){
		max_height = height;
	    }
	    
	}
	cm_cnt.height(max_height);

	// top offset
	adjust_top_and_height(s_cm, cm_cnt, min_marg, 60, 0);

	// slide show for comments
	cm_slides.width(cm_cnt.width());

	for(i=0; i< max_comm_slide; i++){
	    slide_name = '#slide-'+i;
	    $(slide_name).css('right', -(current_comm_slide-i)*cm_cnt.width());
	}

	$('#ind-'+current_comm_slide).attr('class','circle circle-active');
    }

    // faq screen
    var s_fq = $('#screen-faq');
    if(s_fq.length){
	var fq_cnt = $('#faq-content');
	// set the height of th content window with respect to the maximum possible size
	if(answers.length){
	    var fq_txt = $('#faq-answer');
	    var fq_cnt_max_height = 0;
	    for(i=0; i < answers.length; i++){
		fq_txt.html(answers[i]['text']);
		if(fq_cnt_max_height < fq_cnt.height())
		    fq_cnt_max_height = fq_cnt.height();
	    }
	    fq_cnt.height(fq_cnt_max_height);
	}
	adjust_top_and_height(s_fq, fq_cnt, min_marg, 60, 0);
	faq(current_question);
    }

    // screen about
    var s_ab = $('#screen-about');
    if(s_ab.length){
	var ab_cnt = $('#about-content');
	adjust_top_and_height(s_ab, ab_cnt, min_marg, 60 , 0);
    }

    // screen apartments
    var s_ap = $('#screen-apart');
    if(s_ap.length){
	var ap_cnt = $('#apart-content');
	adjust_top_and_height(s_ap, ap_cnt, min_marg, 60 , 100);
    }

    // philosophy screen
    var s_ph = $('#screen-phil');
    if(s_ph.length){
	var ph_cnt = $('#phil-content');
	adjust_top_and_height(s_ph, ph_cnt, min_marg, 60, 0);
    }
    
    // staff screen
    var s_st = $('#screen-staff');
    if(s_st.length){
	var rate = $('#staff-foto').width()/f_w;
	var div_height = f_h * rate;
	$('#staff-foto').height(div_height);
    }
}

function adjust_top_and_height(screen, content, top, bottom, add){
    var min_height = content.outerHeight(true) + top + add;
    if(min_height < window.innerHeight)
    {
		screen.height(window.innerHeight);
		content.css('top', (screen.height() - content.height() - bottom)/2 + add);
    }
    else
    {
		screen.height(min_height + add);
		content.css('top', top + add);
    }
}


function adjust_background(){
    var sh = $('#screen-head');

    sh.backstretch(gallery[current_img]['img'], {
                fade: 500,
                duration: 0,
            });
}

function adjust_screen_head(){
    var sh = $('#screen-head');
    var sh_bkg = $('#screen-head-background');
    var shcf = $('#screen-head-crossfade');

    // resize height of the screen with respect to content
    hs_cnt = $('#head-screen-content');
    // ns_div = $('.next-screen');
    var layer_min_height = hs_cnt.outerHeight(true) + parseInt(hs_cnt.css('top'));

    if(layer_min_height < window.innerHeight)
	sh.height(window.innerHeight);
    else
	sh.height(layer_min_height);

    sh_bkg.height(sh.height());
    sh_bkg.width(sh.width());
    shcf.height(sh.height());
    shcf.width(sh.width());


}

function column_shadow(column, add){
    if(add)
	column.attr('class', 'column shadow');
    else
	column.attr('class', 'column inactive');
}

function comments_slide_show(direction){
    // slide show for comments
    var i;
    var width = $('#comments-content').width();
    var curr;

    // forward
    if(direction > 0){
	// we can move only if current slide is not the last

	$('#ind-'+current_comm_slide).attr('class','circle');
	if(current_comm_slide == max_comm_slide-1)
	    current_comm_slide = 0;
	else
	    current_comm_slide++;
	$('#ind-'+current_comm_slide).attr('class','circle circle-active');
	for(i=0; i<max_comm_slide; i++){
	    curr = $('#slide-'+i);
	    curr.css('right', // parseInt(curr.css('right')) +
		     (current_comm_slide-i)*width)
	}
    }
    else{		   // backward
	// we can move only if current slide is > 0

	$('#ind-'+current_comm_slide).attr('class','circle');
	if(current_comm_slide == 0)
	    current_comm_slide = max_comm_slide - 1;
	else
	    current_comm_slide--;
	$('#ind-'+current_comm_slide).attr('class','circle circle-active');
	for(i=0; i<max_comm_slide; i++){
	    curr = $('#slide-'+i);
	    curr.css('right', // parseInt(curr.css('right')) +
		     (current_comm_slide-i)*width)
	}
    }
}


function faq(q){
    if(q < max_q){
	$('#q-'+curr_q).attr('class', '');
	$('#q-'+curr_q+' u').attr('class', 'dotted');
	curr_q = q;
	$('#q-'+curr_q).attr('class', 'active');
	$('#q-'+curr_q+' u').attr('class', '');
	$('#faq-answer').html(answers[curr_q]['text']);;
	current_question = q;
    }
}

function toggleForm(){

    var currentScroll = $(window).scrollTop();

    if($('#form').outerHeight(true) < $(window).innerHeight()){
	var height =($(window).innerHeight() - $('#form').outerHeight(true)) / 2 + currentScroll;
	$('#form').css('top', height);
    }
    else
	$('#form').css('top', 10 + currentScroll);

    if($('#form').outerWidth(true) < $(window).innerWidth())
	$('#form').css('left', ($(window).innerWidth() - $('#form').outerWidth(true)) / 2);
    else
	$('#form').css('left', 10);

    if(form_active){
	$('#form').fadeOut('slow');
	form_active = 0;
    }else{
	$('#form').fadeIn('slow');
	form_active = 1;
    }

    $('#input_name').focus();
}

function activate_person(i) 	// =)
{
    var pers = $('#person-'+i);
    var pers_inf = $('#person-info-'+i);

    if(active_person >= 0){
	var pers_act = $('#person-'+active_person);
	var pers_inf_act = $('#person-info-'+active_person);	

	pers_act.attr('class', 'person'); 	// deactivate
	pers_inf_act.fadeOut(100);
	pers_act.find('u').attr('class', 'dotted white');
    }
    if(active_person != i){
	pers.attr('class', 'person act'); 	// deactivate
	pers_inf.fadeIn(100);
	pers.find('u').attr('class', '');
	active_person = i;
    }
    else
	active_person = -1;
}

function change_slide(inc){
    if(slider_interval)
	clearInterval(slider_interval);
    slide_show(gallery, inc);
    if(timer_slider){
	if(timer_slider < 2000)
	    timer_slider = 2000;
	slider_interval = setInterval(function(){slide_show(gallery, 1)}, timer_slider);
    }
}
