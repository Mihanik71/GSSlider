function GSSlider(arr){
	/*Var*/
	var offsX, tmp, sliderWidth, handleWidth, point, sliderOffset, par = {}, value, timer, range_n, el, bg,handle;
	var bg_segment = {};
	var d = document;
	var isIE = d.all || window.opera;

	/*System*/
	function addClass(classname, element){
		var cn = element.className;
		if(cn.indexOf( classname) != -1)
			return;
		if(cn != '')
			classname = ' '+classname;
		element.className = cn+classname;
	}
	function removeClass(classname, element){
		var cn = element.className;
		var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
		cn = cn.replace( rxp, '' );
		element.className = cn;
	}

	/*Private*/
	function initParams(arr){
		if(arr.hasOwnProperty('min') && arr.hasOwnProperty('max')){
			if(arr.min > arr.max){
				par.max = parseInt(arr.min);
				par.min = parseInt(arr.max);
			}else{
				par.max = parseInt(arr.max);
				par.min = parseInt(arr.min);
			}
			range_n = par.max-par.min;
		}
		if(arr.hasOwnProperty('step'))
			if(arr.step >= 0)
				par.step = parseInt(arr.step);
			else
				par.step = 0;
		if(arr.hasOwnProperty('id'))
			if(document.getElementById(arr.id))
				par.id = arr.id;
		if(arr.hasOwnProperty('onStart'))
			par.onStart = arr.onStart;
		else
			par.onStart = par.onStart || undefined;
		if(arr.hasOwnProperty('onClick'))
			par.onClick = arr.onClick;
		else
			par.onClick = par.onClick || undefined;
		if(arr.hasOwnProperty('onEnd'))
			par.onEnd = arr.onEnd;
		else
			par.onEnd = par.onEnd || undefined;
		if(arr.hasOwnProperty('onMove'))
			par.onMove = arr.onMove;
		else
			par.onMove = par.onMove || undefined;
		if(arr.hasOwnProperty('onUpdateValue'))
			par.onUpdateValue = arr.onUpdateValue;
		else
			par.onUpdateValue = par.onUpdateValue || undefined;
		if(arr.hasOwnProperty('default'))
			par.default = arr.default;
		else
			par.default = par.default || par.min;
		par.disable = false;
		if(arr.hasOwnProperty('disable'))
			if(arr.disable == true)
				par.disable = true;
		par.addSegments = false;
		if(arr.hasOwnProperty('addSegments'))
			if(arr.addSegments == true)
				par.addSegments = true;
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
		animate((new_x-handleWidth/2), handle);
		value = val;
	}
	function setValue(x){
		var left;
		if(x < point*((par.step)?par.step:1)/2)
			left = 0;
		else
		if(x > sliderWidth-(point*((par.step)?par.step:1)/2))
			left = sliderWidth;
		else
		if(par.step == 0)
			left = x;
		else
			left = Math.round(x/(par.step * point)) * par.step * point;
		updateValue(left);
	}
	function animate(x, element){
		clearTimeout(timer);
		x = parseInt(x);
		var left = parseInt(element.style.left);
		if(left == x){

		}else{
			var new_left = left;
			var update_x = (Math.abs(left-x) >= 50)?10:1;
			new_left += (x > left)?update_x:-update_x;
			element.style.left = new_left+'px';
			timer = window.setTimeout(function(){
				animate(x, element);
			}, 1);
		}
	}
	function createElements(){
		if(el != d.getElementById(par.id)){
			el = d.getElementById(par.id);
			el.innerHTML = '';
		}
		addClass('gsSlider', el);
		if(!bg){
			bg = d.createElement('DIV');
			bg.className = 'gsSlider_background';
			el.appendChild(bg);
		}
		bg.innerHTML = '';
		if(!handle){
			handle = d.createElement('DIV');
			handle.className = 'gsSlider_handle';
			el.appendChild(handle);
		}
		if(par.addSegments)
			for(var i=0; i < range_n; i++){
				bg_segment[i] = d.createElement('DIV');
				var prefix = 'gsSlider_bg_segment';
				var even =(i%2 == 0)?'even':'not_even';
				bg_segment[i].className = prefix+' '+prefix+'_'+i+' '+prefix+'_'+even;
				if(i == 0) bg_segment[i].className +=' '+prefix+'_start';
				if(i == range_n-1) bg_segment[i].className +=' '+prefix+'_end';
				bg.appendChild(bg_segment[i]);
			}
	}
	function addEvents(){
		if(par.disable == false){
			if(isIE){
				handle.onmousedown = start;
				bg.onclick = sliderClick;
				handle.onmouseup = end;
				bg.onmouseup = end;
			}else{
				handle.addEventListener("mousedown", start, true);
				el.addEventListener("click", sliderClick, true);
				el.addEventListener("mouseup", end, true);
				el.addEventListener("touchstart", start, true);
				el.addEventListener("touchend", end, true);
			}
			removeClass('disable', el);
		}else{
			addClass('disable', el);
			if(isIE){
				handle.onmousedown = null;
				bg.onclick = null;
				handle.onmouseup = null;
				bg.onmouseup = null;
			}else{
				handle.removeEventListener("mousedown", start, true);
				el.removeEventListener("click", sliderClick, true);
				el.removeEventListener("mouseup", end, true);
				el.removeEventListener("touchstart", start, true);
				el.removeEventListener("touchend", end, true);
			}
		}

	}

	/*Events*/
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
		if(isIE){
			offsX = event.clientX-parseInt(handle.style.left);
			el.onmousemove = move;
		}else{
			el.addEventListener("mousemove", move, true);
			el.addEventListener("mouseout", out, true);
			el.addEventListener("touchmove", start, true);
		}
		addClass('active', handle);
	}
	function out(e){
		e = e || event;
		var target = e.target || e.srcElement;
		if(!(target != el && target != el.parentNode && target != el.parentNode.parentNode != el.parentNode.parentNode.parentNode))
			end(e);
	}
	function move(e){
		var x;
		if(isIE)
			x = event.clientX-offsX;
		else
			x = e.pageX-sliderOffset;
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
			el.removeEventListener("touchmove", start, true);
		}
		removeClass('active', handle);
	}

	/*To public*/
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
		addClass('gsSlider', el);
		sliderOffset = bg.offsetLeft;
		tmp = bg.offsetParent;
		while(tmp.tagName != 'BODY'){
			sliderOffset += tmp.offsetLeft;
			tmp = tmp.offsetParent;
		}
		if(par.addSegments)
			for(var i=0; i < range_n; i++){
				bg_segment[i].style.left = (i*par.step*point)+'px';
				bg_segment[i].style.width = par.step*point+'px';
			}
		setValueFromVal(value || par.default);
	}
	function getValue(){
		return value;
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
		setValue(new_x);
	}
	function update(arr){
		initParams(arr);
		createElements();
		resize();
		addEvents();
	}

	/*Public*/
	this.setValue = setValueFromVal;
	this.getValue = getValue;
	this.destroy = destroy;
	this.resize = resize;
	this.updateParams = update;
	this.min = par.min;
	this.max = par.max;

	/*Code*/
	update(arr);
}
