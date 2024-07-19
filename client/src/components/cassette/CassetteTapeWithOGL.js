import React, { useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Box, Mesh, Program, Orbit } from "ogl";

const CassetteTapeWithOGL = () => {
  const canvasRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    const renderer = new Renderer({ canvas: canvasRef.current });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 5);

    const controls = new Orbit(camera);

    const scene = new Transform();

    const createReel = () => {
      const geometry = new Box(gl, { width: 0.5, height: 0.5, depth: 0.1 });
      const program = new Program(gl, {
        vertex: `
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
        fragment: `
          precision highp float;
          varying vec3 vNormal;
          void main() {
            gl_FragColor = vec4(abs(vNormal), 1.0);
          }
        `,
      });

      const mesh = new Mesh(gl, { geometry, program });
      return mesh;
    };

    const leftReel = createReel();
    leftReel.position.set(-1, 0, 0);
    leftReel.setParent(scene);

    const rightReel = createReel();
    rightReel.position.set(1, 0, 0);
    rightReel.setParent(scene);

    let time = 0;
    const update = () => {
      time += 0.01;
      leftReel.rotation.y = time;
      rightReel.rotation.y = time;
      controls.update();
      renderer.render({ scene, camera });
      requestAnimationFrame(update);
    };
    update();

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    return () => {
      renderer.gl.canvas.parentNode &&
        renderer.gl.canvas.parentNode.removeChild(renderer.gl.canvas);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-gray-800 w-48 h-96 rounded-lg shadow-2xl border-4 border-gray-700 transform rotate-90">
        <div className="absolute inset-1 bg-gray-900 rounded-lg border-4 border-gray-800">
          <div className="flex justify-between p-2">
            <div className="w-16 h-8 bg-gray-600 rounded shadow-inner"></div>
            <div className="w-16 h-8 bg-gray-600 rounded shadow-inner"></div>
          </div>
          <div className="flex justify-between items-center p-2 mt-12">
            <div className="relative w-24 h-24 bg-gray-700 rounded-full border-8 border-gray-600 flex justify-center items-center">
              <canvas ref={canvasRef} className="absolute w-full h-full" />
            </div>
            <div className="relative w-24 h-24 bg-gray-700 rounded-full border-8 border-gray-600 flex justify-center items-center">
              <canvas ref={canvasRef} className="absolute w-full h-full" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-12 px-4">
            <div className="w-full h-8 bg-gray-700 rounded shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CassetteTapeWithOGL;
