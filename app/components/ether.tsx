import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Ether() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(0.5);

    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -aspectRatio,
      aspectRatio,
      1,
      -1,
      0.1,
      100
    );
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(2 * aspectRatio, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: `
      // Ether by nimitz 2014 (twitter: @stormoid)
      // https://www.shadertoy.com/view/MsjSW3
      // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
      // Contact the author for other licensing options

      uniform vec3 iResolution;
      uniform float iTime;
      
      mat2 m(float a) {
        float c = cos(a);
        float s = sin(a);
        return mat2(c, -s, s, c);
      }
      float map(vec3 p) {
        p.xz *= m(iTime * 0.4);
        p.xy *= m(iTime * 0.3);
        vec3 q = p * 2.0 + iTime;
        return length(p + vec3(sin(iTime * 0.7))) * log(length(p) + 1.0) + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy/iResolution.y - vec2(0.9, 0.5);
        vec3 cl = vec3(0.0);
        float d = 2.5;
          
        for(int i = 0; i <= 5; i++) {
          vec3 p = vec3(0.0, 0.0, 5.0) + normalize(vec3(uv, -1.0)) * d;
          float rz = map(p);
          float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
          vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
          cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.7 * l;
          d += min(rz, 1.0);
        }
          
        gl_FragColor = vec4(cl, 1.0);
      }`,
      uniforms: {
        iResolution: {
          value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1.0),
        },
        iTime: { value: 0.0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.01;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -aspectRatio;
      camera.right = aspectRatio;
      camera.updateProjectionMatrix();

      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
        1.0
      );

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute" />;
}
