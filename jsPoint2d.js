var jsPoint2d = function(x, y) {
  this.init(x, y);
};

jsPoint2d.prototype.init = function(x, y) {
  this.x = x;
  this.y = y;
  this.w = 1;
};

jsPoint2d.prototype.degToRad = function(d) {
  return d * Math.PI / 180;
};

jsPoint2d.prototype.radToDeg = function(r) {
  return r * 180 / Math.PI;
};

jsPoint2d.prototype.log = function() {
  console.log("x: " + this.x + " y: " + this.y);
};

jsPoint2d.prototype.magnitude = function(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
};

jsPoint2d.prototype.angle = function(p) {
  return Math.atan2(-p.y, -p.x) / Math.PI * 180 + 180;
};

jsPoint2d.prototype.subtract = function(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
};

jsPoint2d.prototype.add = function(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
};

jsPoint2d.prototype.scale = function(v1, s) {
  return {
    x: v1.x * s,
    y: v1.y * s
  };
};

jsPoint2d.prototype.normalize = function(v) {
  var length = Math.sqrt(v.x * v.x + v.y * v.y);
  return {
    x: v.x / length,
    y: v.y / length
  };
};

jsPoint2d.prototype.distance = function(v1, v2) {
  return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
};

jsPoint2d.prototype.dot = function(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
};

jsPoint2d.prototype.lerp = function(v1, v2, t) {
  return {
    x: (v2.x - v1.x) * t + v1.x,
    y: (v2.y - v1.y) * t + v1.y
  };
};


var jsMatrix2d = function() {
  this.m = [];
  this.m[0] = [];
  this.m[1] = [];
  this.m[2] = [];
};

jsMatrix2d.prototype.log = function() {
  var i;
  for (i = 0; i < 3; i += 1) {
    console.log("[" + this.m[i][0] + "," + this.m[i][1] + "," + this.m[i][2] + "]");
  }
};

jsMatrix2d.prototype.identity = function() {
  this.m[0][0] = 1;
  this.m[0][1] = 0;
  this.m[0][2] = 0;

  this.m[1][0] = 0;
  this.m[1][1] = 1;
  this.m[1][2] = 0;

  this.m[2][0] = 0;
  this.m[2][1] = 0;
  this.m[2][2] = 1;

  return this;
};

jsMatrix2d.prototype.translate = function(x, y) {
  this.m[0][0] = 1;
  this.m[0][1] = 0;
  this.m[0][2] = 0;

  this.m[1][0] = 0;
  this.m[1][1] = 1;
  this.m[1][2] = 0;

  this.m[2][0] = x;
  this.m[2][1] = y;
  this.m[2][2] = 1;

  return this;
};

jsMatrix2d.prototype.scale = function(x, y) {
  this.m[0][0] = x;
  this.m[0][1] = 0;
  this.m[0][2] = 0;

  this.m[1][0] = 0;
  this.m[1][1] = y;
  this.m[1][2] = 0;

  this.m[2][0] = 0;
  this.m[2][1] = 0;
  this.m[2][2] = 1;

  return this;
};

jsMatrix2d.prototype.rotate = function(deg) {
  if (deg === 0) {
    return this.identity();
  }

  var rad = deg * (Math.PI / 180),
    c = Math.cos(rad),
    s = Math.sin(rad);

  this.m[0][0] = c;
  this.m[0][1] = s;
  this.m[0][2] = 0;

  this.m[1][0] = -s;
  this.m[1][1] = c;
  this.m[1][2] = 0;

  this.m[2][0] = 0;
  this.m[2][1] = 0;
  this.m[2][2] = 1;

  return this;
};

jsMatrix2d.prototype.multiply = function(m1, m2) {
  var x, y, z, sum, d = new jsMatrix2d();
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y += 1) {
      sum = 0;
      for (z = 0; z < 3; z += 1) {
        sum += m1.m[x][z] * m2.m[z][y];
      }
      d.m[x][y] = sum;
    }
  }

  return d;
};

jsMatrix2d.prototype.multiplyVec = function(v, m) {
  return {
    x: v.x * m.m[0][0] + v.y * m.m[1][0] + v.w * m.m[2][0],
    y: v.x * m.m[0][1] + v.y * m.m[1][1] + v.w * m.m[2][1],
    w: v.x * m.m[0][2] + v.y * m.m[1][2] + v.w * m.m[2][2]
  };
};
