var getUser = (id,callback)=>{
  var user ={
    userId:id,
    userName:'Prakhar'
  };
  setTimeout(()=>{
    callback(user);
  },3000);
}

getUser(31,(user)=>{
  console.log('User '+user.userId+' '+user.userName);
});
