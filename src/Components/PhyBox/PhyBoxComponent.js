// import React from 'react'
// import { Box } from "@react-three/drei";
// import { useBox } from "@react-three/cannon";

// const PhyBox = (props) => {
//     const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));

//   return (
//     <Box
//     args={[1, 1, 1]}
//     ref={ref}
//     onClick={() => api.applyImpulse([0, 0, -10], [0, 0, 0])}
//     >
//     <meshNormalMaterial />
//   </Box>  )
// }

// export default PhyBox


// import React from 'react'

// const PhyBox = (props) => {
//     const mesh = useRef();
//     useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

//   return (
//     <mesh {...props} ref={mesh}>
//     <boxGeometry args={[3, 3, 3]} />
//     <meshStandardMaterial color={"orange"} />
//  </mesh> 
//   )
// }

// export default PhyBox

import React from 'react'

const PhyBox = () => {

  return (
    <></>
  )
}

export default PhyBox