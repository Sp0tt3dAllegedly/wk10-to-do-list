// require 
const pg = require( 'pg' );

//globals
const Pool = pg.Pool;

// Both Local and Heroku database config
let config ={}

if ( process.env.DATABASE_URL){
        // Heroku config
        const url = require('url');
        const params = url.parse ( process.env.DATABASE_URL );
        const auth = params.auth.split(':');

        config = {
        // heroku puts security on the database
            user: auth[0],
            password: auth[1],
        // need to get remote server and port
            host: params.host,
            port: params.port,
        // get the database name by splitting the pathname
        // and taking the 2nd part (array item 1, second in list)
            database: params.pathname.split('/')[1],
        // last two items don't change
            max: 12,
            idleTimeOutMillis: 30000
        }
}
else {
    // local config set up   
  config = {
    database: 'playfair_inventory',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeOutMillis: 30000
           } 
}//end config
const pool = new Pool( config );

// db connection
pool.on( 'connect', ()=>{
    console.log( 'connected to db' );
}) // end db error

pool.on( 'error', ( err )=>{
    console.log( 'ERROR connecting to BD:', err );
}) //end db error

// exports
module.exports = pool;