import styled from "styled-components";



export const FixedContainer = styled.div`
position: fixed;
top: 0;
left: 0;
opacity: .3;
transition: opacity 1s;

&:hover {
    opacity: 1;
  }
`

export const UserLocation = styled.img`
width: 50px;
position: absolute; 
top: calc(${(props) => (props.position[0])}px - 25px);
left: calc(${(props) => (props.position[1])}px - 25px);
transform: rotate(${(props) => (props.rotate)}deg);
`
export const FixedMap = styled.img`
width: 200px;
heigth: 200px;
position: relative;
`

export const Hotspot = styled.div`
    height: 15px;
    width: 15px;
    background-color: white;
    border-radius: 50%;
    position: absolute;

    top: calc(${(props) => (props.position[1])}px - 8px);
    left: calc(${(props) => (props.position[0])}px - 8px);
    &:hover {
        background-color: grey;
        cursor: pointer;
      }
`

// height: 25px;
// width: 25px;
// background-color: #bbb;
// border-radius: 50%;
// display: inline-block;