const axios = require('axios');


axios.get('http://localhost:8888/sfa/Students/1').then((result)=>{
	console.log("Result", result.data)
})
