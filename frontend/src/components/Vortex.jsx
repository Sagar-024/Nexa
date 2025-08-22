import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "@motionone/react";


// Usage: <Vortex height="100vh">...</Vortex>  or  <Vortex height="64px">navbar here</Vortex>
const Vortex = (props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameId = useRef();

  // Default, but can be overridden by props
  const particleCount = props.particleCount || 120;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 600;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.05;
  const rangeSpeed = props.rangeSpeed || 0.02;
  const baseRadius = props.baseRadius || 0.7;
  const rangeRadius = props.rangeRadius || 0.3;
  const backgroundColor = props.backgroundColor || "#0a0c18";
  let tick = 0;
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(particlePropsLength);
  let center = [0, 0];

  const rand = (n) => n * Math.random();
  const randRange = (n) => n - rand(2 * n);
  const fadeInOut = (t, m) => {
    let hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

  const setup = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  };

  const initParticles = () => {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let x = rand(canvas.width);
    let y = center[1] + randRange(rangeY);
    let vx = 0;
    let vy = 0;
    let life = 0;
    let ttl = baseTTL + rand(rangeTTL);
    let speed = baseSpeed + rand(rangeSpeed);
    let radius = baseRadius + rand(rangeRadius);
    // hue ignored, always white
    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, 0], i);
  };

  const draw = (canvas, ctx) => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx);
    animationFrameId.current = window.requestAnimationFrame(() =>
      draw(canvas, ctx)
    );
  };

  const drawParticles = (ctx) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const updateParticle = (i, ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let x = particleProps[i];
    let y = particleProps[i + 1];
    let vx = particleProps[i + 2];
    let vy = particleProps[i + 3];
    let life = particleProps[i + 4];
    let ttl = particleProps[i + 5];
    let speed = particleProps[i + 6];
    let radius = particleProps[i + 7];
    let n = noise3D(x * 0.00125, y * 0.00125, tick * 0.0005) * 3 * Math.PI * 2;
    vx = lerp(vx, Math.cos(n), 0.5);
    vy = lerp(vy, Math.sin(n), 0.5);
    let x2 = x + vx * speed;
    let y2 = y + vy * speed;
    drawParticle(x, y, x2, y2, life, ttl, radius, ctx);
    life++;
    particleProps[i] = x2;
    particleProps[i + 1] = y2;
    particleProps[i + 2] = vx;
    particleProps[i + 3] = vy;
    particleProps[i + 4] = life;
    if (checkBounds(x, y, canvas) || life > ttl) initParticle(i);
  };

  const drawParticle = (
    x,
    y,
    x2,
    y2,
    life,
    ttl,
    radius,
    ctx
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    // Force crisp white
    ctx.strokeStyle = `rgba(255,255,255,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const checkBounds = (x, y, canvas) => {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  };

  // Now height is flexible!
  const resize = (canvas) => {
    const parent = canvas.parentElement;
    // Try prop.height, fallback to default
    let h = props.height || props.h || "100vh";
    // If a string like '64px', parseInt finds 64
    let pxHeight =
      typeof h === "number"
        ? h
        : parseInt(h) && h.includes("px")
        ? parseInt(h)
        : window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = pxHeight;
    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
    if (parent) parent.style.height = `${pxHeight}px`;
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      resize(canvas);
    }
  };

  useEffect(() => {
    setup();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line
  }, [props.height, props.h]);

  // Use height prop for main wrapper
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: props.height || props.h || "100vh",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle} className={props.className || ""}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          height: "100%",
          width: "100%",
          background: "transparent",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </motion.div>
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
        {props.children}
      </div>
    </div>
  );
};

export default Vortex;
