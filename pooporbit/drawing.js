function canvas_to_cartesian(ctx, canvasX, canvasY) {
  let centreX = ctx.canvas.height / 2;
  let centreY = ctx.canvas.width / 2;
  let cartesianX = canvasX - centreX;
  let cartesianY = centreY - canvasY; // inverted Y axis; -(canvasY - centreY)
  return {x: cartesianX, y: cartesianY}
}

function cartesian_to_canvas(ctx, cartesianX, cartesianY) {
  let centreX = ctx.canvas.height / 2;
  let centreY = ctx.canvas.width / 2;
  let canvasX = cartesianX + centreX; // inverse of canvasX - centreX
  let canvasY = centreY - cartesianY; // inverse of centreY - canvasY
  // stated another way, the inverse of -(canvasY - centreY) is
  // -(cartesianY + centreY)
  return {x: canvasX, y: canvasY}
}

function draw_image_cartesian(ctx, image, x, y, width, height) {
  let coords = cartesian_to_canvas(ctx, x, y);
  ctx.drawImage(image, coords.x, coords.y, width, height);
}

function draw_image_cartesian_centre(ctx, image, x, y, width, height) {
  let coords = cartesian_to_canvas(ctx, x, y);
  upper_left_x = coords.x - width / 2;
  upper_left_y = coords.y - height / 2;
  ctx.drawImage(image, upper_left_x, upper_left_y, width, height);
}

function draw_image_cartesian_rotated(ctx, image, x, y, width, height, angle) {
  let coords = cartesian_to_canvas(ctx, x, y);

  // Matrix transformation
  ctx.save();
  ctx.translate(coords.x, coords.y);
  ctx.rotate(-angle * Math.PI / 180);
  ctx.translate(-coords.x, -coords.y);
  ctx.drawImage(image, coords.x, coords.y, width, height);
  ctx.restore();
}

function draw_image_cartesian_rotated_centre(ctx, image, x, y, width, height, angle) {
  let coords = cartesian_to_canvas(ctx, x, y);
  upper_left_x = coords.x - width / 2;
  upper_left_y = coords.y - height / 2;

  // Matrix transformation
  ctx.save();
  ctx.translate(coords.x, coords.y);
  ctx.rotate(-angle * Math.PI / 180);
  ctx.translate(-coords.x, -coords.y);
  ctx.drawImage(image, upper_left_x, upper_left_y, width, height);
  ctx.restore();
}


// outdated; needs a Cartesian version
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
