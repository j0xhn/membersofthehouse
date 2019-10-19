import React from 'react'
import styled from 'styled-components'
const width= '300px'
const Smartphone = styled.div`
  position: relative;
  width: ${width};
  height: 640px;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
/* The horizontal line on the top of the device */
::before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
::after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.content {
  width: 270px;
  height: 640px;
}
`
export default ({children}) => <Smartphone>
  <div className="content">
    {children}
  </div>
</Smartphone>