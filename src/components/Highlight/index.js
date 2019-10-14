import styled from 'styled-components'
import {colors} from '../../static/theme'
const Highlight = styled.span`
  display: inline-block;
  position: relative;
  ::after{
    content: '';
    width: ${`calc(100% - 3px )`};
    height: 40%;
    top: 60%;
    left: 5px;
    right: 0;
    position: absolute;
    opacity: .3;
    background-color: ${colors.red}
  }
`
export default Highlight