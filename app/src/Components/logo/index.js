import React from 'react'
import './style.css'
export default ({ text, orbit = true }) =>
<div className="container">
  <div className="outer"></div>
  <div className="text">{text}</div>
  <div className="red-top-left"></div>
  <div className="red-top-right"></div>
  <div className="red-bot-left"></div>
  <div className="red-bot-right"></div>
  {orbit && <div className="orbit"></div>}
  {orbit && <div className="drop"></div>}
  <div className="dropmask"></div>
  <div className="lstar" id="l1"></div>
  <div className="lstar" id="l2"></div>
  <div className="lstar" id="l3"></div>
  <div className="lstar" id="l4"></div>
  <div className="lstar" id="l5"></div>
  <div className="lstar" id="l6"></div>
  <div className="lstar" id="l7"></div>
  <div className="lstar" id="l8"></div>
  <div className="lstar" id="l9"></div>
  <div className="lstar" id="l10"></div>
  <div className="lstar" id="l11"></div>
  <div className="lstar" id="l12"></div>
  <div className="lstar" id="l13"></div>
  <div className="lstar" id="l14"></div>
  <div className="lstar" id="l15"></div>
  <div className="lstar" id="l16"></div>
  <div className="lstar" id="l17"></div>
  <div className="lstar" id="l18"></div>
  <div className="lstar" id="l19"></div>
  <div className="lstar" id="l20"></div>
  <div className="lstar" id="l21"></div>
  <div className="mstar" id="m1"></div>
  <div className="mstar" id="m2"></div>
  <div className="mstar" id="m3"></div>
  <div className="mstar" id="m4"></div>
  <div className="mstar" id="m5"></div>
  <div className="mstar" id="m6"></div>
  <div className="mstar" id="m7"></div>
  <div className="mstar" id="m8"></div>
  <div className="mstar" id="m9"></div>
  <div className="mstar" id="m10"></div>
  <div className="mstar" id="m11"></div>
  <div className="mstar" id="m12"></div>
  <div className="mstar" id="m13"></div>
  <div className="mstar" id="m14"></div>
  <div className="bstar" id="big1"><div></div><div></div><div></div><div></div></div>
  <div className="bstar" id="big2"><div></div><div></div><div></div><div></div></div>
  <div className="bstar" id="big3"><div></div><div></div><div></div><div></div></div>
  <div className="bstar" id="big4"><div></div><div></div><div></div><div></div></div>
  <div className="bstar" id="big5"><div></div><div></div><div></div><div></div></div>
</div>