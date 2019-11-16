// import React, {useRef, useState, useContext} from 'react'
import React from 'react'
import styled from 'styled-components'
import Phone from '../components/Phone'
import ExampleApp from '../static/exampleApp'
import logo from '../static/images/logo.png'
import {Highlight} from '../components'
// import {ToastContext, Highlight} from '../components'
// import base from '../airtable'
import {colors} from '../static/theme'
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import { PlayArrow } from '@material-ui/icons'
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';

const Section = styled.div`
  margin-top: 50px;
  padding: 50px;
  background-color: ${({color})=> color};
`
export default () => {
  // const toastContext = useContext(ToastContext)
  // const betaInput = useRef()
  // const workplaceInput = useRef()
  // const [showBeta, setShowBeta] = useState()
  // const emailSubmit = (input) => {
  //   const anchorOrigin = input.current.id === 'beta' 
  //     ? { vertical: 'top', horizontal: 'center' }
  //     : undefined
  //   base('emails').create({
  //     email: input.current.value, 
  //     type: input.current.id}, 
  //     function(err, record) {
  //       if (err) {
  //         toastContext.set({message: err.toString(), anchorOrigin})
  //       } else {
  //         toastContext.set({
  //           message: 'Success!',
  //           anchorOrigin
  //         })
  //         input.current.value = ''
  //         setShowBeta(false)
  //       }
  //   });
  // }
return <div>
  <div className='tac mt50'>
    <Section>
      <img 
        className="mb30 mr10"
        src={logo} 
        width='400px' 
        alt="logo" 
      />
    <div className='flex column aic m0a'>
    {/* {showBeta 
      ? <FormControl>
      <InputLabel htmlFor="adornment-password">email</InputLabel>
      <Input
        id="beta"
        inputRef={betaInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => emailSubmit(betaInput)}
            >
              <PlayArrow />
            </IconButton>
          </InputAdornment>
          }
        />
      </FormControl>
      : <Button 
          color="primary" 
          variant='contained' 
          onClick={()=>setShowBeta(true)} 
        >Join Free Beta</Button>  
    } */}
    </div>
    </Section>
    <Section color={colors.lightBlue}>
      <div className='fs20'>Giving <Highlight>feedback</Highlight> can be boring.</div>
      <div className='fs20 mb20'>Voting on snacks is <Highlight>fun</Highlight>.</div>
      <div className='fs20 mb10'><Highlight color='green'>Feed your culture</Highlight>.</div>
      <span role='img' aria-label='happy' className='fs3 mt20'>🍌🥳🌮</span>
    </Section>
    <div className='pt50 pb50'>
      <Phone>
        <ExampleApp />
      </Phone>
    </div>
    {/* <Section color={colors.lightYellow}>
      <div className='mb20'>
        Want <Highlight>your workplace</Highlight> to use this app?
      </div>
    <FormControl>
      <InputLabel htmlFor="adornment-password">email</InputLabel>
      <Input
        id="workplace"
        inputRef={workplaceInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>emailSubmit(workplaceInput)}
            >
              <PlayArrow />
            </IconButton>
          </InputAdornment>
          }
        />
      </FormControl>
  </Section> */}
  {/* <Section>
    <div className='fs3 bold'>Features</div>
    <div>Anonymous</div>
    <div>Delivery</div>
    <div>Data</div>
  </Section> */}
  </div>
</div>
}