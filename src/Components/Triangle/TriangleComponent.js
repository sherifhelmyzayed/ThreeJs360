import React from 'react'
import {FixedContainer, FixedMap, Hotspot, UserLocation } from './TriangleElements';

const Triangle = (props) => {



    return (
      <>
        <FixedContainer>
            <FixedMap src={'/plan.png'}/>
            <UserLocation src={'/triangle.png'} rotate={props.position}/>
            <Hotspot></Hotspot>
            <p>{props.position}</p>
        </FixedContainer>
      </>
    )
  }

  export default Triangle;
