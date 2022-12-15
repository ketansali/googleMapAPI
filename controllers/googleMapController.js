const  distance = require('google-distance-matrix');
const errorResponse = require('../middleware/error-response');
const { notFoundResponse, badRequestResponse, successResponse } = require('../middleware/response');
distance.key(process.env.GOOGLEMAPKEY);


exports.getDistanceAndTime =(req,res)=>{
    // var origins = ['San Francisco CA', '40.7421,-73.9914'];
    // var destinations = ['New York NY', 'Montreal', '41.8337329,-87.7321554', 'Honolulu'];
    const origins = [req.body.origins];
    const destinations = [req.body.destinations];
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return errorResponse(err,req,res)
        }
        if(!distances) {
            return notFoundResponse(res,{message:'No distances found'})
        } 
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        var duration = distances.rows[i].elements[j].duration.text;
                        return successResponse(res,{origin,destination,distance,duration})
                    } else {
                        return badRequestResponse(res,{message:`${destination} is not reachable by land from ${origin}`})
                    }
                }
            }
        }
    });
    
} 