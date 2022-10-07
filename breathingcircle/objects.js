function extend(ChildClass, ParentClass) {
  var parent = new ParentClass();
  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

function BreathingCircle(x, y, min_r, max_r, speed) {
  this.x = x;
  this.y = y;
  this.min_r = min_r;
  this.max_r = max_r;
  this.speed = speed;

  this.r = min_r;
  this.th = 270; // start at smallest (-1 sin output)
}

BreathingCircle.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  //ctx.rotate(this.angle);
  draw_breathing_circle(ctx, this.r);
  ctx.restore();
}

BreathingCircle.prototype.update = function(elapsed) {
  const th_delta = elapsed * this.speed;
  this.th += th_delta;
  this.th %= 360;

  // Steeper sine wave by Joshua Cheek
  // https://math.stackexchange.com/a/2019541
  const sin_th = Math.sin(Math.sin(Math.sin(this.th * Math.PI / 180))) / Math.sin(Math.sin(1));
  this.r = (sin_th + 1) * (this.max_r - this.min_r) / 2 + this.min_r;
}

