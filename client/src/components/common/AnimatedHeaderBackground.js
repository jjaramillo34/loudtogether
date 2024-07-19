import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Plane, Mesh, Program } from "ogl";

const AnimatedHeaderBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderer = new Renderer({ canvas: canvasRef.current });
    const gl = renderer.gl;
    const canvas = gl.canvas;

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 5);

    function resize() {
      renderer.setSize(window.innerWidth, 300); // Adjust height to 300 for a taller canvas
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener("resize", resize, false);
    resize();

    const scene = new Transform();

    const geometry = new Plane(gl, { width: 4, height: 4 }); // Increase width and height for a larger plane
    const program = new Program(gl, {
      vertex: `
        attribute vec2 uv;
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          uv.x += sin(uTime + uv.y * 10.0) * 0.1;
          gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(uTime), 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let time = 0;
    function update() {
      requestAnimationFrame(update);
      time += 0.01;
      program.uniforms.uTime.value = time;
      renderer.render({ scene, camera });
    }
    update();

    return () => {
      window.removeEventListener("resize", resize);
      gl.canvas.parentNode && gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default AnimatedHeaderBackground;
