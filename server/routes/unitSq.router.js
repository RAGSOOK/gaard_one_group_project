const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */


//This route will fill the unit square table with data, 
//result should be ~ 260,400 inserts for belwin
router.get('/fishnet', (req, res) => {
    (async () => {//wraps around everything we want to 'await'

        //opens a connection until it's closed later
        const client = await pool.connect();

        try{
            //SQL thing, tells where to ROLLBACK to
            await client.query('BEGIN');

            //bottom left corner coordinates
            let bl_lat = 44.93637;
            let bl_lon = -92.82045;
            //top right corner coordinates
            let tr_lat = 44.93727;
            let tr_lon = -92.81737;
            // the width of the area in feet
            let widthFt = 794;
            // the height of the area in feet
            let heightFt = 328;

            //increments in latitude and longitude
            let lat_inc = (tr_lat - bl_lat)/heightFt;
            let lon_inc = (tr_lon - bl_lon)/widthFt;

            //loop over entire area in 1 foot square pieces
            for(i = 0; i < widthFt; i++){
                for(j = 0; j < heightFt; j++){
                    queryText = `INSERT INTO "unit_squares" 
                                 ("bl_corner_lat", "bl_corner_lon")
                                 VALUES ($1, $2);`;
                    await client.query(queryText, 
                                      [(bl_lat + (lat_inc * j) ), 
                                      (bl_lon + (lon_inc * i))]);
                }
            }

            //once you hit this you can't ROLLBACK
            await client.query('COMMIT');
            res.sendStatus(201);
        }catch (error) {
            console.log('Rollback', error);
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});

module.exports = router;