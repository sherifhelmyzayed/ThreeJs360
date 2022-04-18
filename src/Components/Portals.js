import React, { useRef, useState, useEffect } from 'react'
import * as THREE from "three";
import {
    useLoader,
} from "react-three-fiber";

import { places, hotspots } from '../Shared/Portals'

const Portals = (props) => {
    const { setHotspotLoc, portalID, setPortalID } = props
    const { color, coord, link } = places[portalID];

    const newData = hotspots.filter(el => el.id === portalID)[0]

    const { id, title, description, mapTexture, panoCoord } = newData
    console.log(panoCoord[0].coord)

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



    // click handler
    const clickHandlerPortal = () => {
        // setPortalID(link)
    }


    // loading map texture
    const maps = useLoader(
        THREE.TextureLoader,
        mapTexture
        // places.map((place) => place.url)
    );

    return (
        <>
            <mesh
                onClick={clickHandler}
                onDoubleClick={() => (console.log("Doubled clicked"))}
            >
                <sphereBufferGeometry attach="geometry" args={[200, 200, 200]} />
                <meshBasicMaterial
                    attach="material"
                    map={maps}
                    side={THREE.BackSide}
                />
            </mesh>
            {panoCoord.map((item, key) => (
                <mesh
                    scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
                    position={item.coord}
                    onClick={clickHandlerPortal}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry attach="geometry" args={[5, 30, 30]} />
                    <meshBasicMaterial attach="material" color={'blue'} />
                </mesh>
            ))}
            {/* <mesh
                scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
                position={coord}
                onClick={clickHandlerPortal}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry attach="geometry" args={[5, 30, 30]} />
                <meshBasicMaterial attach="material" color={color} />
            </mesh> */}
        </>
    )
}

export default Portals