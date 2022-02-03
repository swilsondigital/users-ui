export default async function handler(req, res){

    let fetchOptions = {method: req.method, headers: {'Content-Type': 'application/json'}}
    switch(req.method){
        case "POST":
        case "PUT":
            fetchOptions.body = req.body
            break
    }

    try {
        const {id} = req.query
        const response = await fetch(`${process.env.DB_URL}/users/${id}`, fetchOptions)
        let data = await response.json()
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    } catch (error) {
        res.json(error);
        res.status(405).end();
    }
}