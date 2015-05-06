// form v.2.3. Monte-Carlo 346.11M2
var form_fields=new Array();
var form_initial_words=new Array();
var form_not_mandatory_fields=new Array();
var form_func_load_ok=false;

function length_array(ar)
{
	i=0;
	for (var key in ar)
	{
		i++;
	}
	return i;
}

$(document).ready(function(){
	// функция формы
	$.fn.form = function(param,func_ok,func_error) 
	{
		var forms=$(this);
			// находим все формы удовлетворяющие данному выражению и присваиваем им id
		$(forms).each(function(form_i,form_elem){
			id_form=Math.round(Math.random()*10000);
				// присваиваем id форме
			$(form_elem).attr('id','form_'+id_form);
				// собираем массив полей и начальных значений
			if (param.fields!=undefined)
			{	
				i=0;
				form_fields[id_form]=new Array();
				form_initial_words[id_form]=new Array();
				form_not_mandatory_fields[id_form]=new Array();
				while(i<(param.fields.length))
				{
					i++;
					if (param.fields[i-1]!=null)
					{
						name=param.fields[i-1][0];
						type=param.fields[i-1][1];
						name_p=name.replace(/\[/g,"\\[").replace(/\]/g,"\\]");
						val=$(form_elem).find("input[name="+name_p+"],textarea[name="+name_p+"]").val();
						form_fields[id_form][name]=type;
							// поля которые очищаются при первом клике
						if (param.fields[i-1][2]=='clear')
						{
							if (param.fields[i-1][4])
							{
								form_initial_words[id_form][name]=param.fields[i-1][4];
							}
							else
							{
								form_initial_words[id_form][name]=val;
							}
						}
							// поля которые проверяются, если есть новый текст
						if (param.fields[i-1][3]=='not')
						{
							form_not_mandatory_fields[id_form][name]='not';
						}
					}					
				}
			}
				/* if (length_array(form_initial_words[id_form])>0)
				{
					
				} */
				// ставим id на кнопку
			if (param.submit!=undefined)
			{
				$(param.submit).eq(form_i).attr('id','button_'+id_form);
			}
		});	
		
		//если есть кнопка, то проверка формы
		if (param.submit!=undefined)
		{	
			$(param.submit).click(function(){
                id_button=$(this)[0].id.split('button_')[1];
                id_form='form_'+id_button;
				check_form(id_form);
			});
		}
        else
        {
            $(forms).submit(function(){
                if (send_form==0)
                {
                    id_form=$(this).attr('id');
                    check_form(id_form);
                    return false;
                }
                else return true;
            });
        }
        
        var send_form=0;
        function check_form(id_form)
        {
        	
            // находим принадлежащую форму
            form_obj=$('#'+id_form); 
            // запускаем проверку
            if ($(form_obj).test_all_form()==true)
            {
                var vals='';
                for (var key in form_fields[id_form])
                {
                    field=$(form_obj).find("input[name="+key+"],textarea[name="+key+"],select[name="+key+"] option:selected");
                    val=$(field).val();
                    vals+=key+'='+val+'&'; 
                        // очищаем если начальное слово
                    if (form_initial_words[id_form][key]!=undefined) initial_words=form_initial_words[id_form][key]; else initial_words=false;
                    if (initial_words!=false)
                    {
                        if (val==initial_words) 
                        {
                            $(field).val('');
                        }
                    }
                }
                // если есть функция
                if (func_ok) 
                {
                    func_ok(vals);
                    form_func_load_ok=true;
                }
                else 
                {
                    if (form_func_load_ok==false)
                    {
                        send_form=1;
                        $(form_obj).submit();
                    }
                }
            }
            else
            {
                if (func_error) 
                {
                    func_error(vals);
                }
            }
        }
        
		// если набираем в поле
		$(forms).find("input,textarea").keypress(function(){
			$(this).test_event('key');
		});
		
		$(forms).find("input,textarea").keyup(function(){
			$(this).test_event('key');
		});
		
		$(forms).find("select[class!=no_form]").change(function(){
			obj=$(this);
			setTimeout(function(){
				$(obj).find('option:selected').test_event('change');
			},100);
		});
		
		$(forms).find("select[class!=no_form]").blur(function(){
			obj=$(this);
			setTimeout(function(){
				if ($(obj).find('option:selected').val()!=undefined)
				{
					$(obj).find('option:selected').test_event('change');
				}
				else
				{
					$(obj).test_event('change');
				}
			},100);
		});
		
		// если отпустили поле
		$(forms).find("input[type!=checkbox],textarea").blur(function(){
			obj=$(this);
			setTimeout(function(){
				$(obj).test_event('blur');
			},100);
		});
		
		// если нажали на поле
		$(forms).find("input[type!=checkbox],textarea").click(function(){
			$(this).test_event('click');
		});
		
		// если взяли в фокус
		$(forms).find("input[type!=checkbox],textarea").focus(function(){
			$(this).test_event('click');
		});
	}
	
	//функция действий над полем
	$.fn.test_event = function(type){
		field=$(this);
		var form=$(field).parents('form');
		id_form=$(form)[0].id.split('form_')[1];
		name=$(field).attr('name');
		val=$(field).val();
		if (form_initial_words[id_form][name]!=undefined) initial_words=form_initial_words[id_form][name]; else initial_words=false;
		switch (type)
		{
			case 'click':	
				// очищаем если начальное слово
				if (initial_words!=false)
				{
					if (val==initial_words) 
					{
						$(field).val('');
					}
				}

				// очищаем ошибку
				$(form).find(".form_"+name+" .sign_no").hide();
				$(form).find(".form_"+name+" .sign_no_message").hide();
				$(form).find(".form_"+name+" .sign_no_message2").hide();
				$(form).find(".form_"+name+" .sign_ok").hide();
				$(field).parent().css('border-color','#69bfff');
			break;
			case 'key':
				// если цифры
				if ((form_fields[id_form][name]!=undefined) && (form_fields[id_form][name]=='number'))
				{
					// очистка от букв
					reg_ex=/[^0-9.+]/i;
					if (reg_ex.test(val))
					{
						val = val.replace(reg_ex,'');
						$(field).val(val);
					}
				}	
				// если телефон
				/* if ((form_fields[id_form][name]!=undefined) && (form_fields[id_form][name]=='phone'))
				{
					// очистка от букв
					reg_ex=/[^0-9-.\(\)+]/i;
					if (reg_ex.test(val))
					{
						val = val.replace(reg_ex,'');
						$(field).val(val);
					}
				}	 */
				// если дата
				/* if ((form_fields[id_form][name]!=undefined) && (form_fields[id_form][name]=='date'))
				{
					// очистка от букв
					reg_ex=/[^0-9-.\/+]/i;
					if (reg_ex.test(val))
					{
						val = val.replace(reg_ex,'');
						$(field).val(val);
					}
				}	 */

				if ((form_fields[id_form][name]!=undefined) && (form_fields[id_form][name]=='email'))
				{
					reg_ex=/^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,4}$/;
					if (!reg_ex.test(val))
					{
						$(form).find(".form_"+name+" .sign_ok").hide();
					} 
					else 
					{
						$(form).find(".form_"+name+" .sign_ok").show();
					}
				}
			break;
			case 'blur':
				$(field).test_field(); 
				// вставляем если начальное слово
				if (initial_words!=false)
				{
					if (val=='') 
					{
						$(field).val(initial_words);
					}
				}
			break;
			case 'change':
				$(field).attr('name',$(field).parent().attr('name'));
				$(field).test_field(); 
			break;
		}
	}
	
	//функция проверки всех полей
	$.fn.test_all_form = function(){
		var form=$(this);
		id_form=$(form)[0].id.split('form_')[1];
		var yes=true;
		if (length_array(form_fields[id_form])>0)
		{
			// проверяем на все поля по одному
			for (var key in form_fields[id_form])
			{
				field=$(form).find("input[name="+key+"],textarea[name="+key+"],select[name="+key+"]");
				if ($(field)[0].tagName=='SELECT' && $(field).find('option:selected').val()!=undefined)
				{
					$(field).find('option:selected').attr('name',$(field).attr('name'));
					test=$(field).find('option:selected').test_field(); 
				}
				else
				{
					test=$(field).test_field(); 
				}
				if (test==false) yes=false;
			}
		}
		return yes;
	} 
	
	// функция проверки поля
	$.fn.test_field = function() {
		error=false;
		field=$(this);
		var name=$(field).attr('name');
		var val=$(field).val();
		//alert(val);
		if (name!=undefined && name!='')
		{
			var form=$(field).parents('form');
			id_form=$(form)[0].id.split('form_')[1];
			
			// определяем параметры для поля
			type=form_fields[id_form][name];
			if (form_not_mandatory_fields[id_form][name]!=undefined) not_mandatory=true; else not_mandatory=false;
			
			// очищаем если начальное слово
			if (form_initial_words[id_form][name]!=undefined) initial_words=form_initial_words[id_form][name]; else initial_words=false;
			if (initial_words!=false)
			{
				if (val==initial_words) 
				{
					$(field).val('');
					val='';
				}
			}	
			if (val!='' && val!=null)
			{
					// в зависимости от типа проверяем
				switch (type)
				{
					case 'email':
						reg_ex=/^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,4}$/;
						if (!reg_ex.test(val))
						{
							error=true;
							type_error=2;
						} 
						else error=false;
					break;
					case 'number':
						reg_ex=/^[0-9]+([\.]{0,1}[0-9]*){1}$/i;
						if (!reg_ex.test(val))
						{
							error=true;
							type_error=2;
						}
						else error=false;
					break;
					case 'phone':
						reg_ex=/^[\+0-9- .\(\)]{7,14}$/i;
						if (!reg_ex.test(val))
						{
							error=true;
							type_error=2;
						}
						else error=false;
					break;
					case 'full_name':
						reg_ex=/^[a-zA-Z]+([ ]+[a-zA-Z ]+)+$/i;
						if (!reg_ex.test(val))
						{
							error=true;
							type_error=2;
						}
						else error=false;
					break;
					case 'date':
						reg_ex=/^[0-9-.\/]{10}$/i;
						if (!reg_ex.test(val))
						{
							error=true;
							type_error=2;
						}
						else error=false;
					break;
					case 'text':
						error=false;
					break;
					case 'check':
						if ($(field).attr('checked')==false || $(field).attr('checked')==undefined)
						{
							error=true;
							type_error=2;
						}
						else error=false;
					break;
				}
			}
			else
			{
				// если пусто
				if (not_mandatory==true) {error='empty';} else {error=true;type_error=1;}
			}
			
			// вставляем если начальное слово
			if (initial_words!=false)
			{
				if (val=='') 
				{
					$(field).val(initial_words);
				}
			}
			
			if (error==true) // вывод ошибки
			{
				switch (type_error)
				{
					case 1: // выводится первое сообщение
						$('.fb_error').show();
						$(form).find(".form_"+name+" .sign_no").show();
						$(form).find(".form_"+name+" .sign_no_message").show();
						$(form).find(".form_"+name+" .sign_no_message2").hide();
						$(form).find(".form_"+name+" .sign_ok").hide();
						if ($(field)[0].tagName=='OPTION') $(field).parent().css('border-color','#fb0e02');
						else $(field).parent().css('border-color','#fb0e02');
					break;
					case 2: // выводится второе сообщение
						$('.fb_error').show();
						$(form).find(".form_"+name+" .sign_no").show();
						$(form).find(".form_"+name+" .sign_no_message").hide();
						$(form).find(".form_"+name+" .sign_no_message2").show();
						$(form).find(".form_"+name+" .sign_ok").hide();
						if ($(field)[0].tagName=='OPTION') $(field).parent().css('border-color','#fb0e02');
						else $(field).parent().css('border-color','#fb0e02');
					break;
				}
				return false;
			}
			if (error==false)
			{	
				// выводится ok
				$('.fb_error').hide();
				$(form).find(".form_"+name+" .sign_no").hide();
				$(form).find(".form_"+name+" .sign_no_message").hide();
				$(form).find(".form_"+name+" .sign_no_message2").hide();
				$(form).find(".form_"+name+" .sign_ok").show();
				if ($(field)[0].tagName=='OPTION') $(field).parent().css('border-color','#7AC943');
				else $(field).parent().css('border-color','#7AC943');
				return true;
			}
		}
	}
});