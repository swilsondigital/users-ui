export default async function handler(req, res){
    // set initial options
    let fetchOptions = {method: req.method, headers: {'Content-Type': 'application/json'}}
    // setup body for api request
    switch(req.method){
        case "POST":
        case "PUT":
            fetchOptions.body = JSON.stringify(req.body)
            break
    }

    try {
        const {id} = req.query
        // make api request
        const response = await fetch(`${process.env.DB_URL}/users/${id}`, fetchOptions)
        let data = await response.json()
        // set response to frontend
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    } catch (error) {
        // pass error info back
        res.json(error);
        res.status(405).end();
    }
}