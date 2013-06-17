var http= require('http')
    ,socketio=require('socket.io');

var started=false;
exports.start=function(app)
{
    if(started)return;

    var svr =http.createServer(app),
        io=socketio.listen(svr);

    io.sockets.on('connection',function(sok){
        sok.broadcast.emit('message','welcome new friend');
        console.log('new user come in.');
        sok.emit('news',{hello:'world'});

        sok.on('chatme',function(data){
            console.log(data);
        });
        sok.on('disconnect',function(){
            console.log('user disconnected');
        });
        sok.on('message',function(msg){
            console.log('received msg :',msg);
            sok.broadcast.emit('message',msg);
        });
    });

    started=true;
}
