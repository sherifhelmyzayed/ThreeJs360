import React, {useRef, forwardRef, useImperativeHandle,useEffect, useState} from "react";
import {
  useThree} from "react-three-fiber";

const Controls = forwardRef((props, ref2) => {
    const [pos, setPos] = useState(0)
    const orbitRef = useRef();
    const { camera, gl } = useThree();

    useEffect(() => {
        // setPos(orbitRef.current.object.position);
        
        orbitRef.current.object.filmGauge = 75
        setPos(orbitRef.current.object);
      }, [orbitRef]);

    useImperativeHandle(ref2, ()=>({
        getLocation: pos,
        getCam: camera
    }));

    return (
      <orbitControls
        ref={orbitRef}
        target={[0, 0, 0]}
        args={[camera, gl.domElement]}
        enableZoom
        {...props}
      />
    );
})

export default Controls