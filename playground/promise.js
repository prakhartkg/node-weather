var somePromise = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('hey!!! it worked');
  },3000);
});


somePromise.then((message)=>{
  console.log('success' ,message);
});
