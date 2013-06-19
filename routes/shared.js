var fs = require('fs'),
    path=require("path"),
    sharedPath='./shared/';

exports.routes=function(app){
    var appSettings=app.get("appSettings");
    if(appSettings && appSettings.sharedPath)
        sharedPath=appSettings.sharedPath;

    app.get('/shared/:cmd/:prm', function(req,res,next){
        var cmd=req.param('cmd'),
            prm=req.param('prm');
        switch (cmd){
            case "list":{
                //var listDir=prm ? prm : ""; //path.join(sharedPath,prm);
                renderPathList(req,res,prm);
                break;
            }
            case "down": {
                var filePath=path.join(sharedPath,prm);
                res.download(filePath);
                break;
            }
            default :
                next();
        }
    });
    app.get('/shared', function(req,res){
        //res.redirect('http://localhost:3000/shared/list/');
        renderPathList(req,res,"");
    });

    app.post('/shared/list/:pathprm(*)',function(req,res,next){
            if(req.files && req.files.fileToUpload)
            {
                var virPath=req.param('pathprm'),
                    tempPath=req.files.fileToUpload.path,
                    fName= req.files.fileToUpload.name,
                    savePath=path.join(sharedPath,virPath,fName);
                fs.readFile(tempPath,function(err,data){
                    if(err){
                        next(err);
                    }
                    fs.writeFile(savePath,data,function(err){
                        if(err){
                            next(err);
                        }
                        renderPathList(req,res,virPath);
                    });
                });
            }
    });
};

var renderPathList=function(req,res,listDir)
{
    var fList=getFileList(listDir);
    res.render('shared',{title:'N-lab file sharing',list:fList});
}

var getFileList= function(listDir)
{
    var files=fs.readdirSync(path.join( sharedPath,listDir));
	var fList={files:[],folders:[],path:listDir};
	for(var i=0;files!=null && i<files.length;i++)
	{
		var file=files[i],
            virPath=path.join(listDir,file),
            actPath=path.join(sharedPath,virPath);
		var stat=fs.statSync(actPath);
		if(stat.isFile())
		{
			fList.files.push({name:file,fullPath:virPath});
		}
		else if(stat.isDirectory())
		{
			fList.folders.push({name:file,fullPath:virPath});
		}
	}
    return fList;
};
