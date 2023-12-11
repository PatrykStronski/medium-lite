const util = require('util');
const bcrypt = require('bcrypt')

bcrypt.genSalt(8, (s,r)=> {
  console.log(r);
})
