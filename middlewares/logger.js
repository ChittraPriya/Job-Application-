const logger = async(req,res,next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
    console.log('-------------------------------')

    //write a log to the file
    const fs = require('fs');
    const logEntry = `${req.method} ${req.url} - ${new Date().toISOString()} \n 
    Body: ${JSON.stringify(req.body)} \n
    Cookies: ${JSON.stringify(req.cookies)}
    \n ---------------------------- \n `;

    const currentDate = new Date().toISOString().split('T')[0];   //Get the Current date in YYYY_MM_DD
    //create a logs directory if it doesn't exists
    if(!fs.existsSync('logs')) 
    {
        fs.mkdirSync('logs')
    }

    fs.appendFile(`logs/log=${currentDate}.txt`, logEntry, (err) => {
        if(err) {
            console.log('Error writing log to file:' , err)
        }
    });
    next();
}

module.exports = logger