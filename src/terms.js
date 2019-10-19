import React from 'react'
const uid = localStorage.getItem('hasa_uid')
const terms = <>
<div className='mb20'>We do not track any of your personal information
or tie this feedback to your employee id or account.  This app
creates it's own unique id for the purposes of tracking
unique vs return votes.  You user id is <strong className='underline'>{uid}</strong>.</div>
<div>
If for any reason this app makes you feel uncomfortable
or you have any other feedback please send your thoughts
in an email to jstorey@wayfair.com.  Thank you, have
a nice day :)</div>
</>
export default terms