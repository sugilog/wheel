class Wheel {
  constructor( element ) {
    this.context = element.getContext("2d");
    const rect = element.getBoundingClientRect();
    this.centerX = rect.width / 2;
    this.centerY = rect.height / 2
    this.radius = Math.min(rect.width, rect.height) / 2;
  }

  draw(cells) {
    const pos = new WheelPoint(this.centerX, this.centerY, this.radius, cells);

    while (!pos.end()) {
      this.context.beginPath();
      this.context.moveTo(pos.centerX, pos.centerY);
      this.context.lineTo(pos.arcStartX, pos.arcStartY);
      this.context.arc(pos.centerX, pos.centerY, pos.radius, pos.arcStartAngle, pos.arcEndAngle);
      this.context.lineTo(pos.centerX, pos.centerY);
      this.context.fillStyle = RGB.generate(pos.tick, pos.cells);
      this.context.closePath();
      this.context.fill();
      pos.next();
    }
  }
}

class WheelPoint {
  constructor(centerX, centerY, radius, cells) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.cells = cells;
    this.radius = radius;
    this.radian = 2 * Math.PI / cells;

    this.tick = 0;
  }

  next() {
    this.tick++;
  }

  end() {
    return this.tick === this.cells;
  }

  get arcStartX() {
      return this.centerX + this.radius * Math.cos(this.radian * this.tick);
    }

  get arcStartY() {
      return this.centerY + this.radius * Math.sin(this.radian * this.tick);
    }

  get arcStartAngle() {
    return this.radian * this.tick;
  }

  get arcEndAngle() {
    return this.radian * (this.tick + 1);
  }
}

class RGB {
  static generate(num, count) {
    const code = num * 256 / count;
    return `rgb(${code}, ${code}, ${code})`;
  }
}
