var loading = "<img src=\"/images/load_icon.gif\" class='img_load'/>";
//отправка запроса
function get_ajax(url,send,func)
{
	$.ajax({
		type: "POST",
		url: url,
		cache: false,
		data: send,
		success: function(html){
			if (typeof func == 'function')
			{
				func(html);
			}
		}
	});
}