 /*!
 * Muploader - jQuery Plugin
 * @author: Kotlyarov Pavel [Monte-Carlo] <pk.raven@gmail.com>
 * @version: 1.1 (16.05.2014)
 * @requires jQuery v1.6 or later
 *
 * Licensed under the MIT License http://en.wikipedia.org/wiki/MIT_License.
 *
 */
 
(function($){
    $.fn.muploader = function(params) {
        var mu = {};
            mu.varName = params.varName || 'image', // variable name
            mu.pathTemp = params.pathTemp || '/gallery/temp', // image temp path
            mu.thumbSize = params.thumbSize || [100,75], // size thumbnail image width, height     [100,0] - only width   [100,100,1] -  ужимание по ширине и высоте
            mu.maxSize = params.maxSize || 10000, // maximum size Kb
            mu.maxNumber = params.maxNumber || 100, // maximum number of files
            mu.ext = params.ext || ['.gif','.jpg','.jpeg','.bmp'], // files extensions
            mu.crop = params.crop || false; // include crop
            mu.fileTemplate = params.fileTemplate || '/modules/muploader/templates/default/index.html', // templates link - полный путь, чтобы указывать темплейты даже на другом хосте
            mu.fileUploadPhp = params.fileUploadPhp || '/modules/muploader/upload.php'; // 
            mu.images = params.images || 0; // 
            mu.funcAfterLoad = params.funcAfterLoad || 0; // 
            mu.funcAfterDelete = params.funcAfterDelete || 0; // 
            mu.container = this;
            
        // грузим темплейт
        var iframe=mu_iframeCreate();
        iframe.mu = mu;
        iframe.onSendComplete = function() { mu_uploaderLoad(this); };
        iframe.src=mu.fileTemplate;
        
        return this; 
    }    
})(jQuery);

    //создание скрытого фрейма
    function mu_iframeCreate()
    {
        var div = $('<div><iframe style=\'display:none\' src=\'about:blank\' id=\'mu_frame\' name=\'mu_frame\' onload=\'mu_iframeSend(this);\'></iframe></div>');
        var div_new=div.appendTo('body');
        return div_new.find('iframe')[0];
    }
    
    // после загрузки запускаем функцию
    function mu_iframeSend(iframe)
    {
        if (iframe.onSendComplete && typeof(iframe.onSendComplete) == 'function')
        iframe.onSendComplete();
    }  
    
    // заполнение container
    function mu_uploaderLoad(iframe)
    {
        var data=iframe.mu;
        var container=data.container,
            template=$(iframe).contents().find('body');
        $(iframe).parent().remove();
            
        // расширение
        if (data.ext) $(template).find('.mu_info_ext span').html(data.ext.join(', '));
        
        // запоминаем шаблон итема
        data.exampleItem=template.find('.mu_item');
        template.find('.mu_item').remove();
        
        // запоминаем ошибки
        data.errors=template.find('.mu_errors');
        template.find('.mu_errors').remove();
        
        container.html(template.html()); 
        mu_buttonCreate(data);
        
        // выводим сохраненные картинки
        if (data.images)
        {
            var i=-1;
            while (i<data.images.length-1)
            {
                i++;
                if (data.images[i].error) errors.push(data.images[i]);
                
                // вывод картинок
                if (data.images[i].file)
                    mu_imagePrint(data.images[i],data);
            }
            mu_addActions(data);
        }
    }
    
    // создаем кнопку
    function mu_buttonCreate(data)
    {
        var button = $('<input type=\'file\' name=\''+data.varName+'[]\' multiple onchange=\'mu_imagesLoad(this);\'/>');
        button[0].data=data;
        button.width(data.container.find('.mu_button span').width()).height(data.container.find('.mu_button span').height());
        data.container.find('.mu_button').append(button);
    }   
    
    // загрузка картинок 
    function mu_imagesLoad(button)
    {   
        var data=button.data;
        data.maxNumberNow=data.maxNumber-data.container.find('.mu_item').length;
        var dataSend=JSON.stringify(data,function(key, value) {
            if (key == 'container' || key == 'exampleItem' || key == 'errors' || key == 'funcAfterLoad') return undefined;
            return value;
        });
        dataSend=dataSend.replace(/\"/g,'\'');
        
        var iframe = mu_iframeCreate();
        iframe.data = data;
        iframe.onSendComplete = function() { mu_imagesPrint(this); };
        
        // load icon show
        data.container.find('.mu_loading').show();
        
        // создаем  и вызываем форму - ее данные направляем в фрейм
        var form = $('<div><form id="mu_form" method=\'post\' onsubmit=\"return false;\" target=\'mu_frame\' enctype=\'multipart/form-data\' action=\''+data.fileUploadPhp+'\'></form></div>');
        form.appendTo('body'); 
        form=$('#mu_form');
        form.append('<input name=\'data\' type=\'text\' value="'+dataSend+'">');
        form.append(button);
        form[0].submit();  
        $(form).parent().remove();
        mu_buttonCreate(data);
    }

    // добавление загруженных картинок
    function mu_imagesPrint(iframe)
    {
        var images=$(iframe).contents().find('body');
        if (!images || $(images).html()=='') return;
        var images=images.html(); // получаем результат
       // alert(images);
        
        var data=iframe.data;
        var container=data.container;
        $(iframe).parent().remove();
        
        var errors=[];
        var images_data=JSON.parse(images);
        var i=-1;
        while (i<images_data.length-1)
        {
            i++;
            if (images_data[i].error) errors.push(images_data[i]);
            
            // вывод картинок
            if (images_data[i].file)
                mu_imagePrint(images_data[i],data);
        }
       
        mu_addActions(data);
        
        if (errors.length>0)
        {
            mu_errorsPrint(data,errors);
        }
    }
    
    function mu_addActions(data)
    {
        // load icon hide
        data.container.find('.mu_loading').hide();
        
        // number image
        data.container.find('.mu_info_number span').html(data.container.find('.mu_item').length);
        
        // buttons
        data.container.find('.mu_item_image').mouseover(function(){
            $(this).find('.mu_delete').show();
        }).mouseout(function(){
            $(this).find('.mu_delete').hide();
        });
        if (data.crop==true)
        {
            data.container.find('.mu_item_image').mouseover(function(){
                $(this).find('.mu_crop').show();
            }).mouseout(function(){
                $(this).find('.mu_crop').hide();
            });
        }
        data.container.find('.mu_delete').data(data);
        data.container.find('.mu_delete').click(function(){mu_imageRemove(this,data);});

        // checkbox radio button
        data.container.find('.mu_item_fields').find('input[type=radio], input[type=checkbox]').click(function(){
            if ($(this).attr('type')=='radio') 
            {
                data.container.find('.mu_item_fields input[type=radio]').each(function(i,elem){
                    $(elem).removeAttr('checked');
                    $(elem).parent().find('input[type=hidden]').val('0');
                });
                $(this).attr('checked','checked');
                $(this).parent().find('input[type=hidden]').val('1');
            }
            else if ($(this).attr('type')=='checkbox') 
            {
                if ($(this).attr('checked')=='checked')
                    $(this).parent().find('input[type=hidden]').val('1');
                else
                    $(this).parent().find('input[type=hidden]').val('0');
            }
        });
    }
    
    function mu_imagePrint(image_data,data)
    {
        if (!image_data.id)
            image_data.id = 'new_' + Math.floor(Math.random() * 99999);
            
        if (!image_data.path) 
            image_data.path=data.pathTemp;
        
        var image=data.exampleItem.clone();
        
        // заменяем вставки на значения
        var widthImg=((data.thumbSize[0]) ? data.thumbSize[0]+'px' : ''),
            heightImg=((data.thumbSize[1]) ? data.thumbSize[1]+'px' : ''),
            image_html=image.html().replace(/\[image_width\]/g,widthImg).replace(/\[image_height\]/g,heightImg);
        image.html(image_html);
        
        image.find('.mu_item_image a').attr('href',image_data.path+'/'+image_data.file).attr('rel',data.varName); // add link image
        image.find('.mu_item_image a img').attr('src',image_data.path+'/thumb_'+image_data.file); // add src image
        image.find('.mu_item_image a img').css('bottom',image_data.height/2+'px'); // выравниваем картинку по высоте
        
        // fields
        image.find('.mu_item_fields').find('input, select').each(function(y,elem){ // change names fields
            var name=$(elem).attr('name');
            if ($(elem).attr('type')=='checkbox' || $(elem).attr('type')=='radio')
            {
                $(elem).attr('name',image_data.id);
                if (image_data[name] && image_data[name]==1) $(elem).attr('checked','checked');
                else image_data[name]=0;
                $(elem).parent().append('<div><input type=\'hidden\' name=\''+data.varName+'['+image_data.id+']'+'['+name+']\' value=\''+image_data[name]+'\'/></div>'); 
            }   
            else if ($(elem).attr('type')=='text')
            {
                $(elem).attr('name',data.varName+'['+image_data.id+']'+'['+name+']');
                if (image_data[name]) $(elem).val(image_data[name]);
            }    
        });
        
        image.find('.mu_item_fields').append('<div><input type=\'hidden\' name=\''+data.varName+'['+image_data.id+'][file]\' value=\''+image_data.file+'\'/></div>'); // add file name
        
        data.container.find('.mu_gallery').append(image);
        
       // if (typeof fancybox == 'function') {
            data.container.find('.mu_gallery .mu_item_image a').fancybox();
        //}
        if (typeof data.funcAfterLoad == 'function')
            data.funcAfterLoad();
        
    }
    
    // вывод ошибок
    function mu_errorsPrint(data,errors)
    {
        var errors_print='';
        var i=0;
        while (i<errors.length)
        {
            i++;
            var error_text='';
            if (error_text=data.errors.find('span[name='+errors[i-1].error+']').html())
            {
                error_text=error_text.replace("[file]",errors[i-1].file_load);
                if (errors[i-1].error_params)
                {
                    var y=0;
                    while (y<errors[i-1].error_params.length)
                    {
                        y++;
                        error_text=error_text.replace("[error_params]["+y+"]",errors[i-1].error_params[y-1]);
                    }
                }
            }
            if (error_text) errors_print+=error_text+'\r\n';
        }
       // alert(errors_print);
    }
    
    // удаление картинки
    function mu_imageRemove(obj,data)
    {
        var container=$(obj).data('container');
        if (container)
        {
            var i=container.find('.mu_delete').index($(obj));
            container.find('.mu_item').eq(i).remove();
            container.find('.mu_info_number span').html(container.find('.mu_item').length);

            if (typeof data.funcAfterDelete == 'function')
            data.funcAfterDelete();
        }
    }
    