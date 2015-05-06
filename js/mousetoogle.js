// ��������� � �������� ���� (��������� �� �������, � �� �� ����), ���������� ���� �� ������� (���� ������ ���������, ��������, � ���� ���)
// Monte-Carlo

var mt_play=0;
var mt_interval;
var mt_coords=[];
var mt_coords_add=[];
var mt_func={};
var mt_x;
var mt_y;
var m_under=0;
var m_add_obj=0;
var mt_active=1;
	
$(document).mousemove(function(e){
	if (!e) e = window.event;  
	if (e.pageX || e.pageY)  
	{  
		mt_x = e.pageX;  
		mt_y = e.pageY;  
	}  
	else if (e.clientX || e.clientY)  
	{  
		mt_x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;  
		mt_y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;  
	}  
});	


	
// ������� ��������� / ������� �������� / ������������� ������ ����� / ��������� ����������� ���� / �������, ������� ����������� ��� ���� �������� ��� �������������
$.fn.mousetoggle=function(func_over,func_out,under,add_obj,func_begin){
	if (under) m_under=under;
	if (add_obj) m_add_obj=add_obj;
	
	//������� ������ �������
	if (mt_func)
	{
		for (var key in mt_func) 
		{
			if (mt_func[key] && mt_func[key]['func'])
			{
				for (var i in mt_func[key]['func']) 
				{
					var elem=$(".mt_mousetoogle_"+key+'_'+i);
					if ($(elem)[0]==undefined)
					{
						delete mt_func[key];
					}
				}
			}
		}
	}
	
	// ������� ������ ��������
	var mt_rand=Math.round(Math.random()*10000);
	mt_func[mt_rand]={'over':func_over,'out':func_out,'func':{}};
	
	// ����������� ��� �������
	$(this).each(function(i,elem){
		var class_name=$(elem).attr('class');
		if (!class_name || !class_name.match(/mt_mousetoogle/))
		{
			$(elem).addClass("mt_mousetoogle_"+mt_rand+'_'+i);
			mt_func[mt_rand]['func'][i]=2;
			if (func_begin) func_begin($(elem));
		}
	});

	if (mt_play==0)
	{
		mt_play=1; 
		mt_f();
	}
}

// ���������� � ������� ��������������� �������
$.fn.mousetoggle_add=function(obj){	
	var class_this=$(this).attr('class').match(/mt_mousetoogle_([0-9]+)_([0-9]+)/i);
	var class_obj=$(obj).attr('class');
	if (class_this && class_this[0] && (!class_obj || !class_obj.match(/mt_mousetoogle/)))
	{
		$(obj).addClass(class_this[0]+'_add');
	}
}

function mt_f()
{
	clearInterval(mt_interval);
	mt_interval=setInterval(function(){
		for (var key in mt_func) {
			var func_over=mt_func[key]['over'];
			var func_out=mt_func[key]['out'];
			var add=0;
			var over_mouse={};
			var over_mouse_add=-1;
			var out_mouse={};
			var last_over_i=-1;
			
			// ������� ����� ������� ������ ��� �����
			for (var i in mt_func[key]['func']) 
			{
				//$('#show').html($('#show').html()+key);

				var elem=$(".mt_mousetoogle_"+key+'_'+i);
				mt_coords['x11']=$(elem).offset().left;
				mt_coords['y11']=$(elem).offset().top;	
				mt_coords['x22']=mt_coords['x11']+$(elem).width();
				mt_coords['y22']=mt_coords['y11']+$(elem).height();

				// ###### �������������� ���� (���� ���������� �����-�� ��� ���� (��� ���������), ������� ��������� � ��������� (�������� ��� � ����))
				if (m_add_obj==1)
				{
					var classname_add=".mt_mousetoogle_"+key+'_'+i+"_add";
					$(classname_add).each(function(i_add,elem_add){
						if ($(elem_add).is(':visible'))
						{
							mt_coords_add['x11']=$(elem_add).offset().left;
							mt_coords_add['y11']=$(elem_add).offset().top;	
							mt_coords_add['x22']=mt_coords_add['x11']+$(elem_add).width();
							mt_coords_add['y22']=mt_coords_add['y11']+$(elem_add).height();
							if (((mt_x>=mt_coords_add['x11']) && (mt_x<=mt_coords_add['x22'])) && ((mt_y>=mt_coords_add['y11']) && (mt_y<=mt_coords_add['y22'])))
							{
								add=1;
							}
							else add=0;
						}
						else add=0;
					});
				}
				//#########
				
				if ((((mt_x>=mt_coords['x11']) && (mt_x<=mt_coords['x22'])) && ((mt_y>=mt_coords['y11']) && (mt_y<=mt_coords['y22']))) || (add==1))
				{
					over_mouse[i]=1;
					if (add==1) over_mouse_add=i;
					last_over_i=i;
				}
				else 
				{
					out_mouse[i]=1;
				}
			}
			
			// ������� ������� ������
			if (m_under==1)
			{
				for (var i in over_mouse) 
				{
					if ((over_mouse_add!=-1 && over_mouse_add!=i) || (over_mouse_add==-1 && i!=last_over_i))// ���� ����� �� add �������( �� �� ����������� ������ �������) ��� �������� ������ �������(����������� ������ ������� ������)
					{
						delete over_mouse[i];
						out_mouse[i]=1; // ������� ��� � out
					}
				}
			}
			
			// ������������ �� ������� �� ������
			for (var i in out_mouse) 
			{
				if (mt_func[key]['func'][i]==1)
				{
					var elem=$(".mt_mousetoogle_"+key+'_'+i);
					func_out($(elem));
					mt_func[key]['func'][i]=2;
				}
			}
			
			// ������� ������ ��� �����
			for (var i in over_mouse) 
			{	
				if (mt_active==1)
				{
					if (mt_func[key]['func'][i]==2)
					{
						var elem=$(".mt_mousetoogle_"+key+'_'+i);
						func_over($(elem));
						mt_func[key]['func'][i]=1;
					}
				}
			}
			
			
		}
	},10); 
}