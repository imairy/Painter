export default class LastMayday {
  palette() {
    return ({
      width: '600rpx',
      height: '1500rpx',
      background: '#eee',
      views: [
        _textDecoration('overline', 0),
        _textDecoration('underline', 1),
        _textDecoration('line-through', 2),
        _textDecoration('overline underline line-through', 3, 'red'),
        {
          type: 'rect',
          css: {
            width: '200rpx',
            right: '20rpx',
            top: '30rpx',
            height: '100rpx',
            borderRadius: '100%',
            shadow: '10rpx 10rpx 5rpx #888888',
            color: 'linear-gradient(-135deg, #fedcba 0%, rgba(18, 52, 86, 1) 20%, #987 80%)',
          },
        },
        {
          id: 'my_text_id',
          type: 'text',
          text: "fontWeight: 'bold'",
          css: [{
            top: `${startTop + 4 * gapSize}rpx`,
            shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        {
          type: 'rect',
          css: {
            width: '20rpx',
            height: '20rpx',
            color: 'red',
            left: 'calc(my_text_id.right + 20rpx)',
            top: `${startTop + 4 * gapSize + 15}rpx`,
          },
        },
        {
          id: 'text_id_2',
          type: 'text',
          text: '我是把width设置为400rpx后，我就换行了xx行了',
          css: [{
            top: `${startTop + 5 * gapSize}rpx`,
            align: 'center',
            width: '400rpx',
            background: '#538e60',
            textAlign: 'center',
            padding: '10rpx',
            scalable: true,
            deletable: true,
          }, common, { left: '300rpx' }],
        },
        {
          type: 'rect',
          css: {
            width: '20rpx',
            height: '20rpx',
            color: 'red',
            left: '200rpx',
            top: 'calc(text_id_2.bottom + 20rpx)',
          },
        },

        {
          type: 'text',
          text: '我设置了maxLines为1，看看会产生什么效果',
          css: [{
            top: `${startTop + 7 * gapSize}rpx`,
            width: '500rpx',
            maxLines: 1,
          }, common],
        },
        _image(0),
        _des(0, '普通'),
        _image(1, 30),
        _des(1, 'rotate: 30'),
        _image(2, 30, '20rpx'),
        _des(2, 'borderRadius: 30rpx'),
        _image(3, 0, '60rpx'),
        _des(3, '圆形'),
        {
          type: 'image',
          url: '/palette/avatar.jpg',
          css: {
            top: `${startTop + 8.5 * gapSize + 180}rpx`,
            left: '40rpx',
            borderRadius: '50rpx',
            borderWidth: '10rpx',
            borderColor: 'yellow',
            width: '100rpx',
            height: '100rpx',
          },
        },
        {
          id: 'qrcode_id',
          type: 'qrcode',
          content: 'https://github.com/Kujiale-Mobile/Painter',
          css: {
            top: `${startTop + 8.5 * gapSize + 180}rpx`,
            left: '180rpx',
            color: 'red',
            borderWidth: '10rpx',
            borderColor: 'blue',
            borderStyle: 'dashed',
            width: '120rpx',
            height: '120rpx',
          },
        },
        {
          id: 'rect',
          type: 'rect',
          css: {
            scalable: true,
            top: `${startTop + 8.5 * gapSize + 180}rpx`,
            right: '40rpx',
            color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)',
            borderRadius: '20rpx',
            borderWidth: '10rpx',
            width: '120rpx',
            height: '120rpx',
          },
        },
        {
          id: 'border_width_text',
          type: 'text',
          text: 'borderWidth',
          css: {
            top: `${startTop + 8.5 * gapSize + 180}rpx`,
            right: '200rpx',
            color: 'green',
            borderWidth: '2rpx',
          },
        },
        {
          type: 'seal',
          content: 'Painter',
          shape: 'ellipse',
          outerBorder: {
            width: 4,
            radius: 100,
          },
          innerBorder: {
            radius: 90,
          },
          innerLoopLine: {
            radius: 65,
          },
          mainText: {
            radius: 85,
            fontSize: 18,
            startDegree: 15,
          },
          subText: {
            visible: false,
          },
          serNo:{
            radius: 80,
            startDegree: 45,
            visible: false,
          },
          css: {
            width: '400rpx',
            height: '400rpx',
            color: 'rgba(0,0,0,1)',
            align: 'center',
            top: 'calc(qrcode_id.top)',
          }
        },

      ],
    });
  }
}

const startTop = 50;
const startLeft = 20;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '40rpx',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return (
    {
      id: `image-${index}`,
      type: 'image',
      url: '/palette/avatar.jpg',
      css: {
        top: `${startTop + 8.5 * gapSize}rpx`,
        left: `${startLeft + 160 * index}rpx`,
        width: '120rpx',
        height: '120rpx',
        shadow: '10rpx 10rpx 5rpx #888888',
        rotate: rotate,
        minWidth: '60rpx',
        borderRadius: borderRadius,
        scalable: true,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 9.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
