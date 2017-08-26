var Color = function(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	
	this.to_style = function() {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
	}
	this.to_style_transp = function(a) {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + a + ")";
	}
	this.delta = function(color) {
		return Math.abs(this.r - color.r) + Math.abs(this.g - color.g) + Math.abs(this.b - color.b);
	}
	this.clone = function() {
		return new Color(this.r, this.g, this.b, this.a);
	}
	this.transp = function(ratio) {
		return new Color(this.r, this.g, this.b, this.a * ratio);
	}
	this.linear_plugin = function(color, ratio) {
		var r = Math.round((this.r * ratio) + (color.r * (1 - ratio)));
		var g = Math.round((this.g * ratio) + (color.g * (1 - ratio)));
		var b = Math.round((this.b * ratio) + (color.b * (1 - ratio)));
		var a = Math.round((this.a * ratio) + (color.a * (1 - ratio)));
		return new Color(r, g, b, a);
	}
	this.str = function() {
		return "(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
	}
}

var ColorHandler = {};

ColorHandler.COLOR_LINE = new Color(0, 0, 0, 1);
ColorHandler.COLOR_TRIANGLE = new Color(0, 0, 255, 0.25);
ColorHandler.COLOR_BACKGROUND = new Color(255, 255, 127, 1);
ColorHandler.COLOR_TEXT_RIGHT = new Color(0, 255, 0, 1);
ColorHandler.COLOR_TEXT_WRONG = new Color(255, 0, 0, 1);




