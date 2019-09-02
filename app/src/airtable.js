import Airtable from 'airtable'
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base('appVnznDLeNrQGLnE');
export default base