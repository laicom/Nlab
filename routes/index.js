var chat=require('./chat'),
    shared=require('./shared');

module.exports=function(app)
{
    app.get('/', function(req, res){
      res.render('index', { title: 'N-lab' });
    });
    app.get('/chat', function(req,res){
        res.render('chat', { title: 'N-lab chat room' });
    });

    //app.get('/chat', chat.start);

    shared.routes(app);

    chat.start(app);
        /*
        app.get('/shared/:cmd/:prm(*)', shared.routes);

        app.get('/shared', function(req,res){
        res.redirect('/shared/getFileList/');
    });
    */
};
