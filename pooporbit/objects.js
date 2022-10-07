function extend(ChildClass, ParentClass) {
  var parent = new ParentClass();
  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

function Satellite(r, th, dps, width, height, image_file, planet) {
  this.r = r;
  this.th = th;
  this.dps = dps;
  this.width = width;
  this.height = height;
  this.image = new Image(width, height);
  this.image.src = image_file;
  this.planet = planet;
}

Satellite.prototype.draw = function(ctx) {
  // we want to draw the Satellite at an angle 90 degrees to the
  // line segment that connects it to the Planet
  // (th is the angle of that line segment)
  draw_image_cartesian_rotated_centre(ctx, this.image, this.x, this.y, this.width, this.height, this.th - 90);
}

Satellite.prototype.update = function(elapsed) {
  // elapsed is 0 the first frame, so we get to calculate x and y
  // without actually incrementing th
  const th_delta = elapsed * this.dps;
  // turn dps degrees every second, or one revolution every 360/dps seconds
  this.th += th_delta;
  this.th %= 360;

  this.orbit_cx = this.planet.x;
  this.orbit_cy = this.planet.y;
  // convert polar coordinates to Cartesian and add planet offset
  this.x = this.r * Math.cos(this.th * Math.PI / 180) + this.orbit_cx;
  this.y = this.r * Math.sin(this.th * Math.PI / 180) + this.orbit_cy;
}

function Planet(x, y, width, height, image_file) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image(width, height);
  this.image.src = image_file;
}

Planet.prototype.draw = function(ctx) {
  draw_image_cartesian_centre(ctx, this.image, this.x, this.y, this.width, this.height);
}

Planet.prototype.update = function(elapsed) {
  // do nothing
}
