import Airtable from 'airtable'
// import { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom'

// function useBase({ match }) {
//   const [base, setBase] = useState({});

//   useEffect(() => {
//     setBase(new Airtable({
//       apiKey: process.env.REACT_APP_AIRTABLE_KEY
//     }).base(match.params.baseId))
//   }, [match.params.baseId]);

//   return baseZ
// }

// export default withRouter(useBase)

export const getBase = (baseId = 'appDnaTYaw2E07vY8') => {
  console.log('baseId', baseId)
  return new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_KEY
  }).base(baseId);
}

export default getBase