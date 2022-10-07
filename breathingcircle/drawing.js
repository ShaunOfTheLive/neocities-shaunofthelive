function draw_grid(ctx, minor, major, stroke, fill) {
  // default values
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";

  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  let width = ctx.canvas.width, height = ctx.canvas.height;
  for (var x = 0; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if (x % major == 0) {ctx.fillText(x, x, 10);}
  }
  for (var y = 0; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if (y % major == 0) {ctx.fillText(y, 0, y + 10);}
  }
  ctx.restore();
}

function draw_image_at_angle_from_top_left(ctx, image, x, y, width, height, angle) {
  ctx.save();

  // Matrix transformation
  let center_x = x + (width / 2);
  let center_y = y + (height / 2);
  ctx.translate(center_x, center_y);
  ctx.rotate(angle * Math.PI / 180);
  ctx.translate(-center_x, -center_y);

  ctx.drawImage(image, x, y, width, height);

  ctx.restore();
}

// doesn't work yet
function draw_image_at_angle_from_center(ctx, image, x, y, width, height, angle) {
  ctx.save();

  // Matrix transformation
  let center_x = x + (width / 2);
  let center_y = y + (height / 2);
  ctx.translate(center_x, center_y);
  ctx.rotate(angle * Math.PI / 2);
  ctx.translate(-center_x, -center_y);

  ctx.drawImage(image, x, y, width, height);

  ctx.restore();
}

function draw_breathing_circle(ctx, r) {
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

