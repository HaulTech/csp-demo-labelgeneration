const axios = require('axios');
const fs = require('fs');

/* Per CSP Variables */
let apiUrl = '';
let token = '';
let tmsJobId = -1;

/* Below is a simple example of retreiving a PDF lebel */
axios.get(`${apiUrl}/api/Label/GenerateByTmsId/${tmsJobId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then((response) => {
    let labelUrl = response.data;
    console.log('PDF generated successfully.');
    axios.get(labelUrl).then(response => {
      try {
        fs.writeFileSync(`${tmsJobId}.pdf`, response.data);
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
