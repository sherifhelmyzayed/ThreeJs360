import React, { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  Dom
} from "react-three-fiber";
import "./styles.css";
import Controls from "./Components/Controls";
import Triangle from "./Components/Triangle/TriangleComponent";
// import PhyBox from "./Components/PhyBox/PhyBoxComponent";
// import { CameraShake } from '@react-three/drei'


extend({ OrbitControls });


// hotspot places in 360
const places = [
  // Photo by Bryan Goff on Unsplash
  { color: "green", position: [0, 0, 100], url: "/pic1.jpeg", link: 1 },
  // { color: "orange", position: [0, 50, 100], url: "/docks.jpg", link: 0 },
  // { color: "green", position: [0, 0, 100], url: "/pic1.jpeg", link: 1 },
  // Photo by Timothy Oldfield on Unsplash
  { color: "white", position: [0, 50, 100], url: "/docks.jpg", link: 0 }
];


function Dome({ position, color, texture, onClick, setHotspotLoc }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const clickHandler = (e) => (
    (e.shiftKey) ? (
      setHotspotLoc({ x: e.face.normal.x * 200, y: e.face.normal.y * 200, z: e.face.normal.z * 200 })
    ) : ''
  )
  useEffect(
    () => {
      console.log(ref)
      void (document.body.style.cursor = hovered ? "pointer" : "auto")
    },
    [hovered]
  );
  return (
    <group>
      <mesh
        onClick={clickHandler}
        onDoubleClick={()=>(console.log("SSDSD"))}
      >
        <sphereBufferGeometry attach="geometry" args={[200, 200, 200]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
        />
      </mesh>


      <mesh
        scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry attach="geometry" args={[5, 30, 30]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>


      {/* <mesh
        position={[0, 0, 1]}
        onClick={(e) => console.log('click')}

      >
        <sphereGeometry attach="geometry" args={[50, 30, 30]} />
        <meshBasicMaterial attach="material" side={THREE.BackSide}
          opacity={.3} color={'orange'} transparent />
      </mesh> */}

    </group>
  );
}

function Portals(props) {
  const { setHotspotLoc } = props

  const [which, set] = useState(0);
  const { color, position, link } = places[which];
  const clickHandler = () => {
    console.log("Clicked")
    set(link)
  }
  const maps = useLoader(
    THREE.TextureLoader,
    places.map((place) => place.url)
  );
  return (
    <Dome
      onClick={clickHandler}
      setHotspotLoc={setHotspotLoc}
      color={color}
      position={position}
      texture={maps[which]}
    />
  );
}

function Preload() {
  // This component pre-loads textures in order to lessen loading impact when clicking portals
  const { gl } = useThree();
  const maps = useLoader(
    THREE.TextureLoader,
    places.map((place) => place.url)
  );
  useEffect(() => maps.forEach(gl.initTexture), [maps, gl.initTexture]);
  return null;
}

function Box(props) {
  const mesh = useRef();
  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[6, 10, 10]} />
      {/* <boxGeometry attach="geometry" args={[30, 30, 30]} /> */}

      <meshBasicMaterial attach="material" color={"orange"} />
    </mesh>
  );
}





export default function App() {
  const [camPos, setCamPos] = useState(1);
  const position = useRef(null);
  const [hotspotLoc, setHotspotLoc] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const location = position.current.getLocation.position;
      let loc1 = 0;
      let loc2;
      if (location) {
        if (location.z >= 0 && location.x >= 0) {
          loc1 = Math.atan(location.z / location.x);
          loc2 = loc1 * (180 / Math.PI);
        } else if (location.z >= 0 && location.x < 0) {
          loc1 = Math.atan(location.x / location.z);
          loc2 = Math.abs(loc1) * (180 / Math.PI) + 90;
        } else if (location.z < 0 && location.x < 0) {
          loc1 = Math.atan(location.z / location.x);
          loc2 = Math.abs(loc1) * (180 / Math.PI) + 180;
        } else if (location.z < 0 && location.x >= 0) {
          loc1 = Math.atan(location.x / location.z);
          loc2 = Math.abs(loc1) * (180 / Math.PI) + 270;
        }
        setCamPos(loc2)
      }
    }, 100);
    return () => clearInterval(interval);
  }, [camPos]);


  return (
    <div className="home">
      <Canvas concurrent camera={{ fov: 60, position: [0, 0, 1] }}>
        <Controls
          ref={position}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          autoRotate={true}
          rotateSpeed={1}
        >
        </Controls>
        <Suspense fallback={<Dom center>Loading...</Dom>}>
          <Preload />
          <Portals setHotspotLoc={setHotspotLoc} />
        </Suspense>
        {
          (hotspotLoc) ? (

            <Box position={[hotspotLoc.x, hotspotLoc.y, hotspotLoc.z]} />
          ) : ''
        }
      </Canvas>

      <Triangle setHotspotLoc={setHotspotLoc} coord={position.current} position={Math.round(camPos)} />

    </div>
  );
}
