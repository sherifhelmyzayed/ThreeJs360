import React, {useState} from 'react'
import { FixedContainer, FixedMap, Hotspot, UserLocation } from './TriangleElements';

const Triangle = (props) => {
  const {
    position,
    coord,
    setHotspotLoc
  } = props

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
    setData(current => ([...current, [x,y]]))
    console.log(data)
  }


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
