var ViewHandler = {};

ViewHandler.points = [];
ViewHandler.triangles = [];
ViewHandler.size = new Point2(DoubleBuff.max_x, DoubleBuff.max_y);

ViewHandler.mouse_event = function(type, key, special) {
	// Add
	if ((type == EventHandler.MOUSE_DOWN) && (key == EventHandler.MOUSE_LEFT_BUTTON)) {
		ViewHandler.points.push(EventHandler.mouse_position.clone());
		ViewHandler.update_triangles();
	}
	
	// Remove
	if ((type == EventHandler.MOUSE_DOWN) && (key == EventHandler.MOUSE_RIGHT_BUTTON)) {
		var result = -1;
		for (var index = 0; index < ViewHandler.points.length; index ++) {
			if ((result < 0) || (ViewHandler.points[result].sub(EventHandler.mouse_position).length() > ViewHandler.points[index].sub(EventHandler.mouse_position).length())) {
				result = index;
			}
		}
		if (result > 0) {
			ViewHandler.points.splice(result, 1);
			ViewHandler.update_triangles();
		}
	}
}

ViewHandler.on_draw = function(ctx) {
	// Draw points.
	if (ViewHandler.points.length > 1) {
		ctx.strokeStyle = ColorHandler.COLOR_LINE.to_style();
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(Math.round(ViewHandler.points[0].x), Math.round(ViewHandler.points[0].y));
		for (var index = 1; index < ViewHandler.points.length; index ++) {
			ctx.lineTo(Math.round(ViewHandler.points[index].x), Math.round(ViewHandler.points[index].y));
		}
		ctx.closePath();
		ctx.stroke();
	}
	var count = ViewHandler.count_inside(EventHandler.mouse_position);
	
	ctx.strokeStyle = ColorHandler.COLOR_TRIANGLE.to_style();
	ctx.lineWidth = 3;
	// Draw triangles.
	for (var index = 0; index < count.length; index ++) {
		var p1 = ViewHandler.triangles[count[index]].p1;
		var p2 = ViewHandler.triangles[count[index]].p2;
		var p3 = ViewHandler.triangles[count[index]].p3;
		ctx.beginPath();
		ctx.moveTo(Math.round(p1.x), Math.round(p1.y));
		ctx.lineTo(Math.round(p2.x), Math.round(p2.y));
		ctx.lineTo(Math.round(p3.x), Math.round(p3.y));
		ctx.closePath();
		ctx.stroke();
	}
	
	// Draw text.
	ctx.font = "18px consola";
	ctx.fillStyle = ColorHandler.COLOR_TEXT_RIGHT.to_style();
	ctx.fillText("coordinate: (" + EventHandler.mouse_position.x + ", " + EventHandler.mouse_position.y + ")", 20 + 0, 20 + 20);
	if (count.length % 2 == 1) {
		ctx.fillStyle = ColorHandler.COLOR_TEXT_WRONG.to_style();
	}
	ctx.fillText("inside triangles: " + count.length, 20 + 0, 20 + 40);
	
}

ViewHandler.update_triangles = function() {
	ViewHandler.triangles = [];
	if (ViewHandler.points < 2) {
		return;
	}
	var p1 = ViewHandler.points[0];
	var p2 = ViewHandler.points[1];
	for (var index = 2;  index < ViewHandler.points.length; index ++) {
		ViewHandler.triangles.push(new Triangle2(p1, p2, ViewHandler.points[index]));
		p2 = ViewHandler.points[index];
	}
}

ViewHandler.count_inside = function(point) {
	var result = [];
	for (var index = 0; index <  ViewHandler.triangles.length; index ++) {
		if (ViewHandler.triangles[index].inside(point)) {
			result.push(index);
		}
	}
	return result;
}