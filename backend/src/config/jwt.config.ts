export const jwtConfig = ()=>({
    jwt : {
        accessKey : process.env.ACCESS_TOKEN_KEY,        
        accessTime : process.env.ACCESS_TOKEN_TIME,        
        refreshKey : process.env.REFRESH_TOKEN_KEY,        
        refreshTime : process.env.REFRESH_TOKEN_TIME,   
    }
})