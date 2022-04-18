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
import Portals from "./Components/Portals";


// import portals data 
import { places, hotspots } from './Shared/Portals'


// import PhyBox from "./Components/PhyBox/PhyBoxComponent";
// import { CameraShake } from '@react-three/drei'


extend({ OrbitControls });


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
  // initial Scene ID
  const [portalID, setPortalID] = useState(0);

  // Camera rotation
  const position = useRef(null);
  const [hotspotLoc, setHotspotLoc] = useState(null)

  if (position.current) {
    console.log(position.current.getLocation.position)
  }


  console.log("Render App")

  return (
    <div className="home">
      <Canvas concurrent
        onPointerMove={(e) => console.log('move')}
        camera={{ fov: 60, position: [0, 0, 1] }}>
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
          <Portals setHotspotLoc={setHotspotLoc}
            portalID={portalID}
            setPortalID={setPortalID}
          />

        </Suspense>
        {
          (hotspotLoc) ? (

            <Box position={[hotspotLoc.x, hotspotLoc.y, hotspotLoc.z]} />
          ) : ''
        }
      </Canvas>

      <Triangle setHotspotLoc={setHotspotLoc} coord={position.current}
        //  position={Math.round(camPos)} 
        newRef={position} />

    </div>
  );
}
