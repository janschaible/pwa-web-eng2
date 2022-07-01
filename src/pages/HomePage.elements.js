import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`

//${props=>props.visible?"translate(0)":"translate(0, calc(1.5rem+100%))"}