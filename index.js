const axios = require('axios');
const fs = require('fs');

/* Per CSP Variables */
let apiUrl = ''; // Root API url, e.g. https://api-haultechdemo.httms.uk
let token = ''; // Can be retreived using https://github.com/HaulTech/csp-demo-oauthtoken
let jobId = 1; // The confirmed Job ID as returned from /api/Job/Confirm

/* Below is a simple example of retreiving a PDF lebel */
axios.get(`${apiUrl}/api/Label/GenerateByTmsId/${jobId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then((response) => {
    let labelUrl = response.data;
    console.log('PDF generated successfully.');
    axios.get(labelUrl).then(response => {
      try {
        fs.writeFileSync(`${jobId}.pdf`, response.data);
        console.log('PDF downloaded successfully.');
      } catch (error) {
        console.error('Failed to write PDF.');
        console.error(error);
      }
    }).catch((error) => {
      console.error('Failed to retreive PDF.');
      console.error({ error });
    });
  })
  .catch((error) => {
    console.error('Failed to generate label.')
    console.error({ error });
  });
