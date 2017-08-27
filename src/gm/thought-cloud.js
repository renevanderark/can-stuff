export default function(VIRT_WIDTH) {
  let puppetPos = { x : 0 , y : 0 };
  let updated = true, visible = false;
  let currentText = "...";
  let timeouts = [];

  const disappear = () => {
    timeouts.forEach(t => clearTimeout(t));
    visible = false;
    updated = true;
    currentText = "...";
  };

  return {
    isVisible: () => visible,
    followPuppet(virtX, virtY) {
      puppetPos = {x: virtX, y: virtY };
      updated = true;
    },

    disappear: disappear,

    setTrainOfThoughtAndAppear(thoughts) {
      const interval = 2500;
      currentText = thoughts.shift();
      timeouts.forEach(t => clearTimeout(t));
      thoughts.forEach((t, i) => {
        timeouts.push(setTimeout(() => {currentText = t; updated = true}, interval * (i+1)));
      });
      timeouts.push(setTimeout(disappear, (thoughts.length + 1) * interval))
      visible = true;
      updated = true;
    },

    draw(ctx, scale) {
      if (!visible) { return; }
      const cloudY = puppetPos.y > 250 ? 150 : 450;
      const cloudX = VIRT_WIDTH / 2;
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1 * scale;
      ctx.save();
      ctx.translate(cloudX * scale, cloudY * scale);

      ctx.scale(3, 1);
      ctx.beginPath();
      ctx.arc(0,0, 150 * scale, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      const targetAng = Math.atan2(cloudY - puppetPos.y, (cloudX / 2) -  puppetPos.x);
      let ang = targetAng - 1.5;
      const delta = Math.sqrt(Math.pow((cloudX / 2) - puppetPos.x, 2) + Math.pow(cloudY - puppetPos.y, 2));
      let x = puppetPos.x - 10, y = puppetPos.y;
      for (let s = 0; s < 10; s++) {
        ang += 0.2;
        x += Math.cos(ang) * (delta * (s / 70)) ;
        y += Math.sin(ang) * (delta * (s / 70)) ;
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, (s + 1) * scale, 2 * Math.PI, false);
        ctx.fill();
      }
      ctx.font = `bold ${28 * scale}px sans-serif`;
			ctx.fillStyle = "black";
			ctx.fillText(currentText, (cloudX * scale) - (ctx.measureText(currentText).width / 2), (14 + cloudY) * scale);
      updated = false;
    },
    clear(ctx) {
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    },
    forceUpdate() { updated = true; },
    updated: () => updated
  }
}
