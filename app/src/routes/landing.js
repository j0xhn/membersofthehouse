import React from 'react'
import styled from 'styled-components'
import Phone from '../components/phone'
import ExampleApp from '../static/exampleApp'
import {colors} from '../static/theme'
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


const Highlight = styled.span`
  display: inline-block;
  position: relative;
  ::after{
    content: '';
    width: 95%;
    height: 50%;
    top: 50%;
    left: 10%;
    right: 0;
    position: absolute;
    opacity: .3;
    background-color: ${colors.red}
  }
`
const The = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 48%;
  transform: rotate(-10deg); 
  font-weight: 600;
`
const handleSubscribe = () => {
  console.log('subscribe')
}
export default () => <div>
  <div className='tac mt50'>
    <div className='p50 relative pageContainer'>
      <div className='fs2 bold'> Hack</div>
      <The>- the -</The>
      <div className='fs2 bold'>Snack</div>
    </div>
    <div className='mt50 bgLightBlue p50'>
      <div className='fs20'>Giving <Highlight>feedback</Highlight> is boring.</div>
      <div className='fs20 mb20'>Voting on snacks is <Highlight>fun</Highlight>.</div>
      <div className='fs20'>We bridge the gap. </div>
      <span role='img' aria-label='happy' className='mt20 fs2'>🥳</span>
    </div>
    <div className='mt50 p50'>
      <Phone>
        <ExampleApp />
      </Phone>
    </div>
    <div className='mt50 p50'>
      <div className='mb20'>
        Want your workplace to adopt this model for choosing snacks?
      </div>
      {/* <div className='mb20'>
        Interested in crypto currency and how to transition this into a DAO
        that will one day replace our govt's tax system when the USD fails and
        we need a peaceful way of distributing collective funds without central 
        actors prone to oppression and corruption? 
      </div> */}
    <FormControl>
      <InputLabel htmlFor="adornment-password">email</InputLabel>
      <Input
        id="adornment-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleSubscribe}
            >
              <PlayArrow />
            </IconButton>
          </InputAdornment>
          }
        />
      </FormControl>
  </div>
  </div>
</div>