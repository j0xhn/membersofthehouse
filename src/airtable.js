import Airtable from 'airtable'
// const appId = window.location.pathname.length > 1 
//   ? window.location.pathname.split('/')[1]
//   : 'appDnaTYaw2E07vY8' // production for email signups
// console.log('loading', appId)
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_KEY
}).base('appDnaTYaw2E07vY8');

export default base