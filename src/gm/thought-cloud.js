export default function(VIRT_WIDTH) {
  let puppetPos = { x : 0 , y : 0 };
  let updated = true;
  return {
    followPuppet(virtX, virtY) {
      puppetPos = {x: virtX, y: virtY };
      updated = true;
    },

    draw(ctx, scale) {
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
      let ang = targetAng - 1;
      const delta = Math.sqrt(Math.pow((cloudX / 2) - puppetPos.x, 2) + Math.pow(cloudY - puppetPos.y, 2));
      let x = puppetPos.x, y = puppetPos.y;
      for (let s = 0; s < 10; s++) {
        ang += 0.1;
        x += Math.cos(ang) * (delta * (s / 30)) * scale;
        y += Math.sin(ang) * (delta * (s / 30)) * scale;
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, (s + 1) * scale, 2 * Math.PI, false);
        ctx.fill();
      }

      updated = false;
    },
    clear(ctx, scale) {
      console.log(new Date().getTime());
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    },
    updated: () => updated
  }
}
