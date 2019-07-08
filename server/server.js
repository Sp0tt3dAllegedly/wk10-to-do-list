// includes
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = process.env.PORT || 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
})

// routes
app.delete( '/tasks/:id', ( req, res )=>{
    console.log( '/tasks DELETE hit:', req.params.id );
    const query = `DELETE FROM "tasks" WHERE id=$1;`;
    const values = [ req.params.id ];
    pool.query( query, values ).then( ( response )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
}) // end /tasks delete

app.get( '/tasks', ( req, res )=>{
    console.log( 'in /tasks GET' );
    const query = `SELECT * from "tasks";`;
    pool.query( query ).then( ( results )=>{
        res.send( results.rows );
    }).catch( (err )=>{
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) // end /tasks GET

app.post( '/tasks', ( req, res )=>{
    console.log( 'in /tasks POST:', req.body );
    const query = `INSERT INTO "tasks" ( "taskType", "doBy", "taskIn", "name" ) VALUES ( $1, $2, $3, $4 );`;
    const values = [ req.body.taskType, req.body.doBy, req.body.taskIn, req.body.name ];
    pool.query( query, values ).then( ( results )=>{
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( 'ERROR with INSERT:', err );
        res.sendStatus( 500 );
    })
}) //end /tasks POST

app.put( '/tasks/:id', ( req, res )=>{
    console.log( '/tasks PUT:', req.params.id, req.body );
    const query = `UPDATE "tasks" SET done=$1 WHERE id=$2;`;
    const values =[ req.body.newStatus, req.params.id ];
    pool.query( query, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with update:', err );
        res.sendStatus( 500 );
    })
}) // end /tasks put