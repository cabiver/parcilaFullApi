let mysql = require('mysql');
require('dotenv').config()


// console.log(process.env.USERDATAbASE)
// console.log(process.env.HOST)
// console.log(process.env.PASSWORD)
// console.log(process.env.DATABASE)


let pool = mysql.createPool({
      host     : process.env.HOST,
      user     : process.env.USERDATAbASE,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      ssl:true
});

// let pool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'funeraria',
//     ssl:true

// });
const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
       reject( err )
     } else {
       connection.query(sql, values, ( err, rows) => {

         if ( err ) {
           reject( err )
         } else {
           resolve( rows )
         }
         connection.release()
       })
     }
   })
 })
}


module.exports =  query