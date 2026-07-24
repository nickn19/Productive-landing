import { useEffect, useRef } from 'react'
import { Clock, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector3, WebGLRenderer } from 'three'
import './FloatingLines.css'

const vertexShader = `void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`
const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform float animationSpeed;
uniform int lineCount;
uniform float lineDistance;
uniform vec3 wavePosition;
uniform vec3 colorA;
uniform vec3 colorB;

mat2 rotate(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));}
float wave(vec2 uv,float offset){
  float time=iTime*animationSpeed;
  float amp=sin(offset+time*.2)*.28;
  float y=sin(uv.x+offset+time*.1)*amp;
  return .0175/max(abs(uv.y-y)+.01,1e-3)+.01;
}
void main(){
  vec2 uv=(2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
  uv.y*=-1.0;
  float angle=wavePosition.z*log(length(uv)+1.0);
  vec2 ruv=uv*rotate(angle);
  vec3 col=vec3(0.0);
  for(int i=0;i<32;i++){
    if(i>=lineCount) break;
    float fi=float(i);
    float t=fi/max(float(lineCount-1),1.0);
    vec3 lineColor=mix(colorA,colorB,t);
    col+=lineColor*wave(ruv+vec2(lineDistance*fi+wavePosition.x,wavePosition.y),2.0+.15*fi)*.34;
  }
  float alpha=clamp(max(max(col.r,col.g),col.b),0.0,.42);
  gl_FragColor=vec4(col,alpha);
}`

const toColor = hex => {
  const value = hex.replace('#', '')
  return new Vector3(parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255)
}

export default function FloatingLines({ lineCount = 15, lineDistance = 12, animationSpeed = .35, middleWavePosition = { x: 1.5, y: 0, rotate: .2 }, linesGradient = ['#69766d', '#b98b38'] }) {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.position.z = 1
    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)
    const uniforms = {
      iTime: { value: 0 }, iResolution: { value: new Vector3(1, 1, 1) }, animationSpeed: { value: animationSpeed },
      lineCount: { value: Math.min(lineCount, 32) }, lineDistance: { value: lineDistance * .01 },
      wavePosition: { value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
      colorA: { value: toColor(linesGradient[0]) }, colorB: { value: toColor(linesGradient.at(-1)) }
    }
    const geometry = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true })
    scene.add(new Mesh(geometry, material))
    const resize = () => {
      const width = container.clientWidth || 1, height = container.clientHeight || 1
      renderer.setSize(width, height, false)
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    const clock = new Clock()
    let frame
    const render = () => { uniforms.iTime.value = clock.getElapsedTime(); renderer.render(scene, camera); frame = requestAnimationFrame(render) }
    render()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove() }
  }, [animationSpeed, lineCount, lineDistance, linesGradient, middleWavePosition])
  return <div ref={containerRef} className="floating-lines-container" />
}
