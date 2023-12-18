function responseReturn(res,status,success,data){
    res.send(status, {
        success: success,
        data: data
      });
}
module.exports={
    responseReturn:responseReturn,
}