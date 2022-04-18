import React, { useState, useEffect, useCallback } from 'react'
import { FixedContainer, FixedMap, Hotspot, UserLocation } from './TriangleElements';

const Triangle = (props) => {
  const {
    position,
    coord,
    setHotspotLoc,
    newRef,
  } = props

  const [camPos, setCamPos] = useState(1);

  const memoizedCallback = useCallback(
    () => {
      if (newRef.current) {
        console.log(newRef.current)
        let loc;
        const location = newRef.current.getLocation.position;
        console.log(location)
        if (location.z >= 0 && location.x >= 0) {
          loc = Math.atan(location.z / location.x) * (180 / Math.PI);
        } else if (location.z >= 0 && location.x < 0) {
          loc = Math.abs(Math.atan(location.x / location.z)) * (180 / Math.PI) + 90;
        } else if (location.z < 0 && location.x < 0) {
          loc = Math.abs(Math.atan(location.z / location.x)) * (180 / Math.PI) + 180;
        } else if (location.z < 0 && location.x >= 0) {
          loc = Math.abs(Math.atan(location.x / location.z)) * (180 / Math.PI) + 270;
        }
        setCamPos(loc)
      }
      console.log("memo")
    },
    [newRef.current]
  );


  const [data, setData] = useState([[37, 37], [60, 60]])

  const getCenter = () => {
    console.log(coord.getLocation.position)
    const x = coord.getLocation.position.x * -200
    const y = coord.getLocation.position.y * -200
    const z = coord.getLocation.position.z * -200
    console.log(x)
    console.log(y)
    console.log(z)
    setHotspotLoc({ x: x, y: y, z: z })
  }

  const clickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;
    console.log(x)
    console.log(y)
    setData(current => ([...current, [x, y]]))
    console.log(data)
  }

  console.log(memoizedCallback())

  // camera rotation  changes reflect on 2D map

  // useEffect(() => {
  //   if (newRef.current) {
  //     console.log(newRef.current)
  //     let loc;
  //     const location = newRef.current.getLocation.position;
  //     console.log(location)
  //     if (location.z >= 0 && location.x >= 0) {
  //       loc = Math.atan(location.z / location.x) * (180 / Math.PI);
  //     } else if (location.z >= 0 && location.x < 0) {
  //       loc = Math.abs(Math.atan(location.x / location.z)) * (180 / Math.PI) + 90;
  //     } else if (location.z < 0 && location.x < 0) {
  //       loc = Math.abs(Math.atan(location.z / location.x)) * (180 / Math.PI) + 180;
  //     } else if (location.z < 0 && location.x >= 0) {
  //       loc = Math.abs(Math.atan(location.x / location.z)) * (180 / Math.PI) + 270;
  //     }
  //     setCamPos(loc)
  //   }
  //   setCamPos(newRef)
  // }, [newRef]);


  return (
    <>
      <FixedContainer onDoubleClick={clickHandler}>
        <FixedMap src={'/plan.png'} />
        <UserLocation position={[37, 37]} src={'/triangle.png'} rotate={position} />
        {data.map((item) => (
          <Hotspot position={item} />
        ))}
        <p>{position}</p>
      </FixedContainer>
      <button onClick={getCenter}>Click Me</button>
    </>
  )
}

export default Triangle;
