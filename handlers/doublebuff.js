var DoubleBuff = {};

DoubleBuff.init = function(canvas_0, canvas_1) {
	DoubleBuff.canvas_show = canvas_0;
	DoubleBuff.canvas_hide = canvas_1;
	DoubleBuff.canvas_show.style.visibility = "visible";
	DoubleBuff.canvas_hide.style.visibility = "hidden";
	DoubleBuff.ctx = DoubleBuff.canvas_hide.getContext("2d");
	DoubleBuff.locked = false;
	
	DoubleBuff.max_x = DoubleBuff.canvas_show.width;
	DoubleBuff.max_y = DoubleBuff.canvas_show.height;
}

DoubleBuff.flip = function() {
	var temp = DoubleBuff.canvas_show;
	DoubleBuff.canvas_show = DoubleBuff.canvas_hide;
	DoubleBuff.canvas_hide = temp;
	DoubleBuff.canvas_show.style.visibility = "visible";
	DoubleBuff.canvas_hide.style.visibility = "hidden";
	DoubleBuff.ctx = DoubleBuff.canvas_hide.getContext("2d");
	
	DoubleBuff.ctx.fillStyle = ColorHandler.COLOR_BACKGROUND.to_style();
	DoubleBuff.ctx.fillRect(0, 0, DoubleBuff.max_x, DoubleBuff.max_y);
	// console.log(this.canvas_show);
}

DoubleBuff.inside = function(x, y) {
	return (x >= 0) && (x < DoubleBuff.max_x) && (y > 0) && (y < DoubleBuff.max_y);
}