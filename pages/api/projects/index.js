export default async function handler(req, res){
    // set initial options
    let fetchOptions = {method: req.method, headers: {'Content-Type': 'application/json'}},
        fetchURL = (req.method === "POST" ? `/clients/${req.body.ClientID}/projects/` : '/projects/')
    // setup body for api request
    switch(req.method){
        case "POST":
        case "PUT":
            fetchOptions.body = JSON.stringify(req.body)
            break
    }

    try {
        // submit request to api
        const response = await fetch(`${process.env.DB_URL + fetchURL}`, fetchOptions)
        let data = await response.json()
        // set response data
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    } catch (error) {
        // return error info
        res.json(error);
        res.status(405).end();
    }
}