export default async function handler(req, res){
    let fetchOptions = {method: req.method, headers: {'Content-Type': 'application/json'}}
    switch(req.method){
        case "POST":
        case "PUT":
            fetchOptions.body = req.body
            break
    }
    try {
        const response = await fetch(`${process.env.DB_URL}/users/`, fetchOptions)
        let data = await response.json()
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(data));
    } catch (error) {
        res.json(error);
        res.status(405).end();
    }
}