function fetchWithRetry(fetcher,maxRetry){
    return new Promise((resolve,reject)=>{
        let retries = 0;
        const caller = ()=>{
            fetcher().then((data)=>{
                resolve(data);
            }).catch((error)=>{
                if(retries < maxRetry){
                    retries++;
                    caller()
                }
                else{
                    reject(error);
                }
            })
        }
        retries++;
        caller();
    })
}

export default fetchWithRetry;