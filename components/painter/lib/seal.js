// ./config
export const defaultOpts = {
  type: 'company',
  shape: 'circle',
  color: 'red',
  width: 300,
  height: 300,
  showTransparent: true,
};

export const defaultBorderOpts = {
  visible: true,
  width: 6,
  radius: 140,
};

export const defaultInnerBorderOpts = {
  visible: true,
  width: 1,
  radius: 130,
};

export const defaultInnerLoopLineOpts = {
  visible: false,
  width: 2,
  radius: 80,
};

export const defaultFiveStarOpts = {
  visible: true,
  size: 30,
};

export const defaultTextOpts = {
  text: 'xx科技有限责任公司',
  visible: true,
  fontSize: 30,
  fontWeight: 600,
  radius: 120,
  startDegree: 25,
  position: 'top',
};

export const defaultSubTextOpts = {
  text: '地址：xx市xx区xx路xx号',
  visible: true,
  fontSize: 24,
  fontWeight: 600,
  distance: 75,
  textBaseline: 'bottom',
};

export const defaultCenterTextOpts = {
  text: '电子印章',
  visible: false,
  fontSize: 24,
  fontWeight: 600,
  textBaseline: 'middle',
  distance: 0,
};

export const defaultSerNoOpts = {
  visible: true,
  fontSize: 18,
  fontWeight: 600,
  radius: 120,
  text: '01234566667890',
  startDegree: 45,
  position: 'bottom',
};

/**
 * 获取透明背景数据
 * @param width
 * @param height
 * @param ctx
 * @returns
 */
export function getTransparentData(width, height, ctx) {
  console.log(ctx)
  let emptyBox = ctx.createImageData(width, height);
  let emptyBoxData = emptyBox.data;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let point = (i * width + j) << 2;
      // >> 2 相当于 / 4 取整， & 1相当于 % 2
      let rgbData = (i >> 2) + (j >> 2) & 1 === 1 ? 240 : 255;

      emptyBoxData[point] = rgbData;
      emptyBoxData[point + 1] = rgbData;
      emptyBoxData[point + 2] = rgbData;
      emptyBoxData[point + 3] = 255;
    }
  }

  return emptyBox;
}

export const getFontStr = (opts) => {
  return `normal normal ${opts.fontWeight} ${opts.fontSize}px serif`;
};

export const Seal = {
  draw(ctx, w, h, color, outerBorder, innerBorder, innerLoopLine, fiveStar, mainText, subText, centerText, serNo, type = 'company', shape = 'circle', transparent = true) {
    outerBorder = Object.assign({}, defaultBorderOpts, { color, shape }, outerBorder);
    innerBorder = Object.assign({}, defaultInnerBorderOpts, { color, shape }, innerBorder);
    innerLoopLine = Object.assign({}, defaultInnerLoopLineOpts, { color, shape }, innerLoopLine);
    fiveStar = Object.assign({}, defaultFiveStarOpts, { color }, fiveStar);
    mainText = Object.assign({}, defaultTextOpts, { color }, mainText);
    subText = Object.assign({}, defaultSubTextOpts, { color }, subText);
    centerText = Object.assign({}, defaultCenterTextOpts, { color }, centerText);
    serNo = Object.assign({}, defaultSerNoOpts, { color }, serNo);

    const centerPoint = [w / 2, h / 2];
    // if (transparent) {
    //   ctx.putImageData(getTransparentData(w, h, ctx), 0, 0);
    // }
    const maxRadius = w / 2;
    if (outerBorder.visible) {
      outerBorder.radius = outerBorder.radius > maxRadius ? maxRadius : outerBorder.radius;
      this._drawCircle(ctx, outerBorder.width, outerBorder.color, outerBorder.radius, centerPoint);
    }

    if (innerBorder.visible) {
      const maxInnerRadius = outerBorder.radius - outerBorder.width;
      innerBorder.radius = innerBorder.radius > maxInnerRadius ? maxInnerRadius : innerBorder.radius;
      this._drawCircle(ctx, innerBorder.width, innerBorder.color, innerBorder.radius, centerPoint);
    }

    if (innerLoopLine.visible) {
      const maxInnerLoopRadius = innerBorder.radius - innerBorder.width;
      innerLoopLine.radius = innerLoopLine.radius > maxInnerLoopRadius ? maxInnerLoopRadius : innerLoopLine.radius;
      this._drawCircle(ctx, innerLoopLine.width, innerLoopLine.color, innerLoopLine.radius, centerPoint);
    }

    if (fiveStar.visible) {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.fillStyle = fiveStar.color;
      ctx.strokeStyle = fiveStar.color;

      ctx.translate(...centerPoint);
      ctx.rotate(Math.PI);
      ctx.beginPath();

      const dig = Math.PI / 5 * 4;

      for (let i = 0; i < 5; i++) {
        const x = Math.sin(i * dig);
        const y = Math.cos(i * dig);
        ctx.lineTo(x * fiveStar.size, y * fiveStar.size);
      }

      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    if (mainText.visible) {
      this._writeSurroundText(ctx, mainText, centerPoint);
    }

    if (subText.visible) {
      this._writeHorizontalText(ctx, subText, centerPoint);
    }

    if (centerText.visible) {
      this._writeHorizontalText(ctx, centerText, centerPoint);
    }
    if (serNo.visible) {
      this._writeSurroundText(ctx, serNo, centerPoint);
    }

  },

  _writeHorizontalText(ctx, options, centerPoint) {
    ctx.font = getFontStr({
      fontWeight: options.fontWeight,
      fontSize: options.fontSize,
    });
    ctx.fillStyle = options.color;
    ctx.textBaseline = options.textBaseline;
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    ctx.fillText(options.text, centerPoint[0], centerPoint[1] + options.distance);
  },

  _writeSurroundText(ctx, options, centerPoint, startDegree = 25) {
    ctx.font = getFontStr({
      fontWeight: options.fontWeight,
      fontSize: options.fontSize,
    });
    ctx.fillStyle = options.color;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.translate(...centerPoint);

    const count = options.text.length;
    const chars = options.text.split('').reverse();

    const textDegree = options.position === 'top'
      ? -(startDegree * 2 + 180) / (count - 1)
      : (startDegree * 2) / (count - 1);

    for (let i = 0; i < count; i++) {
      const char = chars[i];

      ctx.rotate((i === 0 ? startDegree : textDegree) * Math.PI / 180);

      const { width } = ctx.measureText(char);

      ctx.save();
      ctx.translate(options.radius - width / 2, 0);
      ctx.rotate((options.position === 'top' ? 90 : -90) * Math.PI / 180);
      ctx.fillText(char, 0, 5);
      ctx.restore();
    }

    ctx.restore();
  },

  _drawCircle(ctx, width, color, radius, circleCenter) {
    ctx.translate(0, 0);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(circleCenter[0], circleCenter[1], radius - width / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.save();
  },
};