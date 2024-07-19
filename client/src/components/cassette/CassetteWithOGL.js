import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Box, Mesh, Program, Orbit } from "ogl";

const CassetteWithOGL = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderer = new Renderer({ canvas: canvasRef.current });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 5);

    const controls = new Orbit(camera);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener("resize", resize, false);
    resize();

    const scene = new Transform();

    const geometry = new Box(gl);
    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec3 normal;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec3 vNormal;
        void main() {
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        varying vec3 vNormal;
        void main() {
          gl_FragColor = vec4(abs(vNormal), 1.0);
        }
      `,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    requestAnimationFrame(update);
    function update() {
      requestAnimationFrame(update);
      controls.update();
      renderer.render({ scene, camera });
    }

    return () => {
      gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};

export default CassetteWithOGL;
