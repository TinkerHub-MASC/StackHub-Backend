const redis = require('redis');

const client = redis.createClient({
    port:process.env.redisPort,
    host:process.env.redisHost
})



client.on('connect',()=>{
    console.log('Client connected to Redis')
})

client.on('ready',()=>{

    console.log('client connected to redis and ready to use...');
})

client.on('error',(err)=>{
    console.log(err.message)
})

client.on('end',()=>{
    console.log('client ended the connection');
})

process.on('SIGINT',()=>{
    client.quit()
})

module.exports = client