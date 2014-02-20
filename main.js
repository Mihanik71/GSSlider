function GSSlider(arr){
	var offsX, tmp, sliderWidth, handleWidth, point, sliderOffset, par = {}, value;
	var d = document;
	var isIE = d.all || window.opera;
	par = initParams(arr);
	var range_n = par.max-par.min;
	var el = d.getElementById(par.id);
	var bg = d.createElement('DIV');
	bg.className = 'gsSlider_background';
	el.appendChild(bg);
	var handle = d.createElement('DIV');
	handle.className = 'gsSlider_handle';
	el.appendChild(handle);
	resize();
	setValueFromVal(par.default);
	if(isIE){
		handle.onmousedown = start;
		bg.onclick = sliderClick;
		handle.onmouseup = end;
		bg.onmouseup = end;
	}else{
		handle.addEventListener("mousedown", start, true);
		el.addEventListener("click", sliderClick, true);
		el.addEventListener("mouseup", end, true);
	}
	function addClass(classname, element){
		var cn = element.className;
		if(cn.indexOf( classname) != -1)
			return;
		if(cn != '')
			classname = ' '+classname;
		element.className = cn+classname;
	}
	function removeClass(classname, element) {
		var cn = element.className;
		var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
		cn = cn.replace( rxp, '' );
		element.className = cn;
	}
	function updateValue(new_x){
		var val;
		if(new_x < point*((par.step)?par.step:1))
			val = par.min;
		else
		if(new_x > sliderWidth-point)
			val = par.max;
		else
			val = Math.round(new_x/(par.step*point))*((par.step)?par.step:1)+par.min;
		if(value != undefined)
			if(par.onUpdateValue != undefined && par.onUpdateValue({new_coor:new_x, old_value:value, new_value:val}) == false)
				return;
		handle.style.left = new_x+'px';
		value = val;
	}
	function setValue(x){
		var left;
		if(x < point*((par.step)?par.step:1))
			left = -handleWidth/2;
		else
		if(x > sliderWidth-point*((par.step)?par.step:1))
			left = (sliderWidth-handleWidth/2);
		else
		if(par.step == 0)
			left = x;
		else
			left = Math.round(x/(par.step * point)) * par.step * point;
		updateValue(left);
	}
	function setValueFromVal(val){
		var new_x;
		if(val <= par.min)
			new_x = -handleWidth/2;
		else
		if(val >= par.max)
			new_x = sliderWidth-handleWidth/2;
		else
			new_x = (val-par.min)*par.step*point;
		updateValue(new_x);
	}
	function getValue(){
		return value;
	}
	function sliderClick(e){
		var x;
		if(isIE){
			if(event.srcElement != el) return;
			x = event.offsetX;
		}else
			x = e.pageX-sliderOffset;
		if(par.onClick != undefined && par.onClick({event:e, new_x:x}) == false)
			return;
		setValue(x);
	}
	function start(e){
		if(par.onStart != undefined && par.onStart({event:e, value:value}) == false)
			return;
		console.log('start');
		if(isIE){
			offsX = event.clientX-parseInt(handle.style.left);
			el.onmousemove = move;
		}else{
			el.addEventListener("mousemove", move, true);
		}
	}
	function move(e){
		var x;
		console.log(e);
		if(isIE)
			x = event.clientX-offsX;
		else
			if(e.target == el || e.target == handle || e.target == bg)
				x = e.pageX-sliderOffset;
			else
				el.removeEventListener("mousemove", move, true);
		if(par.onMove != undefined && par.onMove({event:e, x:x}) == false)
			return;
		setValue(x);
	}
	function end(e){
		if(par.onEnd != undefined && par.onEnd({event:e, value:value}) == false)
			return;
		if(isIE){
			el.onmousemove = null;
		}else{
			el.removeEventListener("mousemove", move, true);
		}
	}
	function destroy(){
		el.removeChild(bg);
		el.removeChild(handle);
		removeClass('gsSlider', el);
		el.style.position = '';
	}
	function resize(){
		el.style.position = 'relative';
		bg.style.position = 'absolute';
		handle.style.position = 'absolute';
		sliderWidth = el.offsetWidth;
		handleWidth = handle.offsetWidth;
		point = (sliderWidth)/range_n;
		handle.style.left = -handleWidth/2+'px';
		addClass('gsSlider',el);
		sliderOffset = bg.offsetLeft;
		tmp = bg.offsetParent;
		while(tmp.tagName != 'BODY'){
			sliderOffset += tmp.offsetLeft;
			tmp = tmp.offsetParent;
		}
	}
	function initParams(arr){
		var par ={};
		if(arr.min > arr.max){
			par.max = arr.min;
			par.min = arr.max;
		}else{
			par.max = arr.max;
			par.min = arr.min;
		}
		if(arr.step >= 0)
			par.step = arr.step;
		else
			par.step = 0;
		if(document.getElementById(arr.id))
			par.id = arr.id;
		if(arr.hasOwnProperty('onStart'))
			par.onStart = arr.onStart;
		else
			par.onStart = undefined;
		if(arr.hasOwnProperty('onClick'))
			par.onClick = arr.onClick;
		else
			par.onClick = undefined;
		if(arr.hasOwnProperty('onEnd'))
			par.onEnd = arr.onEnd;
		else
			par.onEnd = undefined;
		if(arr.hasOwnProperty('onMove'))
			par.onMove = arr.onMove;
		else
			par.onMove = undefined;
		if(arr.hasOwnProperty('onUpdateValue'))
			par.onUpdateValue = arr.onUpdateValue;
		else
			par.onUpdateValue = undefined;
		if(arr.hasOwnProperty('default'))
			par.default = arr.default;
		else
			par.default = par.min;
		return par;
	}
	this.setValue = setValueFromVal;
	this.getValue = getValue;
	this.destroy = destroy;
	this.resize = resize;
	this.min = par.min;
	this.max = par.max;
}
