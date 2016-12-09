var axios = require('axios');
var helpers = {
  getTableData: function(){
    return axios.get('http://api.local/?q=getTableData')
  }
};
module.exports = helpers;
