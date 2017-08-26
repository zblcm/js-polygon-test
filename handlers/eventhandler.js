var EventHandler = {};

EventHandler.MOUSE_DOWN = 0;
EventHandler.MOUSE_MOVE = 1;
EventHandler.MOUSE_UP = 2;

EventHandler.MOUSE_LEFT_BUTTON = 0;
EventHandler.MOUSE_MIDDLE_BUTTON = 1;
EventHandler.MOUSE_RIGHT_BUTTON = 2;

EventHandler.KEY_UP = 87;
EventHandler.KEY_DOWN = 83;
EventHandler.KEY_LEFT = 65;
EventHandler.KEY_RIGHT = 68;

EventHandler.KEY_GROUP = 69;
EventHandler.KEY_BREAK = 81;

EventHandler.init = function() {
	EventHandler.mouse_position = new Point2(0, 0);
}

EventHandler.handleMouseDown = function(event) {
	EventHandler.mouse_position = new Point2(event.clientX, event.clientY);
	ViewHandler.mouse_event(EventHandler.MOUSE_DOWN, event.button, 0);
}

EventHandler.handleMouseUp = function(event) {
	EventHandler.mouse_position = new Point2(event.clientX, event.clientY);
	ViewHandler.mouse_event(EventHandler.MOUSE_UP, event.button, 0);
}

EventHandler.handleMouseMove = function(event) {
	EventHandler.mouse_position = new Point2(event.clientX, event.clientY);
	ViewHandler.mouse_event(EventHandler.MOUSE_MOVE, event.button, 0);
}

EventHandler.handleMouseWheel = function(event) {
	EventHandler.mouse_position = new Point2(event.clientX, event.clientY);
	ViewHandler.mouse_event(EventHandler.MOUSE_MOVE, EventHandler.MOUSE_MIDDLE_BUTTON, event.deltaY);
}