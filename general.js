var General = {};

General.import_file = function(filename) {
    var fileref=document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
	
    if (typeof fileref!="undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
	}
}

General.log = function(base, number) {
	return Math.log(number) / Math.log(base);
}

General.copy_list = function(list) {
	var new_list = [];
	for (var key in list) {
		new_list.push(list[key]);
	}
	return new_list;
}
General.copy_map = function(map) {
	var new_map = {};
	for (var key in map) {
		new_map[key] = map[key];
	}
	return new_map;
}

General.delta_radius = function(r1, r2) {
	var ans = r1 - r2;
	
	while (ans > Math.PI) {
		ans = ans - (2 * Math.PI);
	}
	while (ans < -Math.PI) {
		ans = ans + (2 * Math.PI);
	}
	return ans;
};

General.add_0_to_num = function(num, length) {
	return (Array(length).join('0') + num).slice(-length);
}

General.format_time = function(time) {
	var second = Math.floor(time);
	var remind = Math.floor((time - second) * 100);
	var minute = Math.floor(second / 60);
	var second = second % 60;
	return General.add_0_to_num(minute, 2) + ":" + General.add_0_to_num(second, 2) + ":" + General.add_0_to_num(remind, 2);
}

var Point2 = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.add = function(point) {
		return new Point2(this.x + point.x, this.y + point.y);
	};
	this.sub = function(point) {
		return new Point2(this.x - point.x, this.y - point.y);
	};
	this.mul = function(scale) {
		return new Point2(this.x * scale, this.y * scale);
	};
	this.div = function(scale) {
		return new Point2(this.x / scale, this.y / scale);
	};
	this.dot = function(point) {
		return (this.x * point.x) + (this.y * point.y);
	};
	this.clone = function() {
		return new Point2(this.x, this.y);
	};
	this.length = function() {
		return Math.sqrt(this.dot(this));
	};
	this.rotate = function(radius) {
		var new_x = this.x * Math.cos(radius) - this.y * Math.sin(radius);
		var new_y = this.y * Math.cos(radius) + this.x * Math.sin(radius);
		return new Point2(new_x, new_y);
	};
	this.unit = function() {
		var len = this.length();
		if (len == 0) {
			return new Point2(0, 0);
		}
		else {
			return this.div(this.length());
		}
	};
	this.linear_plugin = function(point, ratio) {
		return this.mul(ratio).add(point.mul(1 - ratio));
	};
	this.pack = function() {
		var dict = {};
		dict["x"] = this.x;
		dict["y"] = this.y;
		return dict;
	};
	this.str = function() {
		return "(" + this.x + ", " + this.y + ")";
	}
	this.radius = function() {
		return Math.atan2(this.y, this.x);
	}
};

var Line2 = function(A, B, C) {
	this.A = A;
	this.B = B;
	this.C = C;
	
	this.sub = function(point) {
		return this.A * point.x + this.B * point.y + this.C;
	};
	this.cross = function(line) {
		var A1 = this.A;
		var B1 = this.B;
		var C1 = this.C;
		var A2 = line.A;
		var B2 = line.B;
		var C2 = line.C;
		var x = (B1 * C2 - B2 * C1)/(B2 * A1 - B1 * A2);
		var y = (A1 * C2 - A2 * C1)/(A2 * B1 - A1 * B2);
		return new Point2(x, y);
	};
	this.clone = function() {
		return new Line2(this.A, this.B, this.C);
	};
	this.dis_p = function(point) {
		return Math.abs(this.sub(point)) / Math.pow(this.A * this.A + this.B * this.B, 0.5);
	};
	this.dis_l = function(line) {
		return Math.abs(this.C - line.C) / Math.pow(this.A * this.A + this.B * this.B, 0.5);
	};
};

Line2_pp = function(p1, p2) {
	var A = p2.y - p1.y
	var B = p1.x - p2.x
	var C = p1.y * p2.x - p1.x * p2.y
	return new Line2(A, B, C);
};

var Triangle2 = function(p1, p2, p3) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.l1 = Line2_pp(p2, p3);
	this.l2 = Line2_pp(p1, p3);
	this.l3 = Line2_pp(p1, p2);
	
	this.inside = function(point) {
		var b1 = (this.l1.sub(this.p1) * this.l1.sub(point) > 0);
		var b2 = (this.l2.sub(this.p2) * this.l2.sub(point) > 0);
		var b3 = (this.l3.sub(this.p3) * this.l3.sub(point) > 0);
		return (b1 && b2 && b3);
	};
	this.clone = function() {
		return new Triangle(this.p1, this.p2, this.p3);
	};
}

var Point3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.add = function(point) {
		return new Point3(this.x + point.x, this.y + point.y, this.z + point.z);
	};
	this.sub = function(point) {
		return new Point3(this.x - point.x, this.y - point.y, this.z - point.z);
	};
	this.mul = function(scale) {
		return new Point3(this.x * scale, this.y * scale, this.z * scale);
	};
	this.div = function(scale) {
		return new Point3(this.x / scale, this.y / scale, this.z / scale);
	};
	this.dot = function(point) {
		return (this.x * point.x) + (this.y * point.y) + (this.z * point.z);
	};
	this.cross = function(point) {
        var new_x = this.y * point.z - this.z * point.y;
        var new_y = this.z * point.x - this.x * point.z;
        var new_z = this.x * point.y - this.y * point.x;
        return new Point3(new_x, new_y, new_z);
    };
	this.clone = function() {
		return new Point3(this.x, this.y, this.z);
	};
	this.length = function() {
		return Math.sqrt(this.dot(this));
	};
	this.delta_radius = function(point) {
		var u = this.dot(point);
		var d = this.length() * point.length();
		if (d == 0) {
			return 0;
		}
		return Math.acos(u / d);
	};
	this.rotate_around = function(axis, radius) {
		axis = axis.unit();
        var q = new Quaternion(Math.cos(radius / 2), Math.sin(radius / 2) * axis.x, Math.sin(radius / 2) * axis.y, Math.sin(radius / 2) * axis.z);
        var p = q.conjugate();
        var a = new Quaternion(0, this.x, this.y, this.z);
        var b = q.grassmann(a).grassmann(p);
        return new Point3(b.y, b.z, b.w);
    };
	this.rotate_to = function(target, radius) {
        var delta = this.delta_radius(target);
        if (delta <= radius) {
            return target.clone();
        }
        var axis = this.cross(target).unit();
        return this.rotate_around(axis, radius);
    };
	this.rotate_y = function(radius) {
		var new_x = this.x * Math.cos(radius) - this.z * Math.sin(radius);
		var new_z = this.z * Math.cos(radius) + this.x * Math.sin(radius);
		return new Point3(new_x, this.y, new_z);
	};
	this.rotate_z = function(radius) {
		var new_x = this.x * Math.cos(radius) - this.y * Math.sin(radius);
		var new_y = this.y * Math.cos(radius) + this.x * Math.sin(radius);
		return new Point3(new_x, new_y, this.z);
	};
	this.unit = function() {
		var len = this.length();
		if (len == 0) {
			return new Point3(0, 0, 0);
		}
		else {
			return this.div(this.length());
		}
	};
	this.linear_plugin = function(point, ratio) {
		return this.mul(ratio).add(point.mul(1 - ratio));
	};
	this.linear_plugin_rotate = function(point, ratio) {
        var radius = this.delta_radius(point);
        var axis = this.cross(point).unit();
        return this.rotate(axis, radius * (1 - ratio));
    };
	this.pack = function() {
		var dict = {};
		dict["x"] = this.x;
		dict["y"] = this.y;
		dict["z"] = this.z;
		return dict;
	};
	this.str = function() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
};

var Quaternion = function(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.add = function(quaternion) {
        return new Quaternion(this.x + quaternion.x, this.y + quaternion.y, this.z + quaternion.z, this.w + quaternion.w);
    };
    this.sub = function(quaternion) {
        return new Quaternion(this.x - quaternion.x, this.y - quaternion.y, this.z - quaternion.z, this.w - quaternion.w);
    };
    this.mul = function(scale) {
        return new Quaternion(this.x * scale, this.y * scale, this.z * scale, this.w * scale);
    };
    this.div = function(scale) {
        return new Quaternion(this.x / scale, this.y / scale, this.z / scale, this.w / scale);
    };
    this.dot = function(quaternion) {
        return (this.x * quaternion.x) + (this.y * quaternion.y) + (this.z * quaternion.z) + (this.w * quaternion.w);
    };
    this.grassmann = function(quaternion) {
        var x1 = this.x;
        var y1 = this.y;
        var z1 = this.z;
        var w1 = this.w;
        var x2 = quaternion.x;
        var y2 = quaternion.y;
        var z2 = quaternion.z;
        var w2 = quaternion.w;
        var x = (x1 * x2) - (y1 * y2) - (z1 * z2) - (w1 * w2);
        var y = (x1 * y2) + (y1 * x2) + (z1 * w2) - (w1 * z2);
        var z = (x1 * z2) - (y1 * w2) + (z1 * x2) + (w1 * y2);
        var w = (x1 * w2) + (y1 * z2) - (z1 * y2) + (w1 * x2);
        return new Quaternion(x, y, z, w);
    };
    this.conjugate = function() {
        return new Quaternion(this.x, -this.y, -this.z, -this.w);
    };
    this.length = function() {
        return Math.sqrt(this.dot(this));
    };
};

var circle_contact_square = function(center, radius, ltp, rbp) {
	// Judge sides.
	if ((center.x >= ltp.x) && (center.x <= rbp.x) && (center.y >= ltp.y - radius) && (center.y <= rbp.y + radius)) {
		return true;
	}
	if ((center.y >= ltp.y) && (center.y <= rbp.y) && (center.x >= ltp.x - radius) && (center.x <= rbp.x + radius)) {
		return true;
	}
	
	// Judge 4 points.
	if (center.sub(ltp).length() <= radius) {
		return true;
	}
	if (center.sub(rbp).length() <= radius) {
		return true;
	}
	if (center.sub(new Point2(ltp.x, rbp.y)).length() <= radius) {
		return true;
	}
	if (center.sub(new Point2(rbp.x, ltp.y)).length() <= radius) {
		return true;
	}
	return false;
};