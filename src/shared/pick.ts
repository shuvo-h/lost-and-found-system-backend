export const pick = <T extends Record<string,unknown>,k extends keyof T>(queryObj:T,validKeys:k[]):Partial<T> =>{
    
    const finalObj:Partial<T> = {};
    for(const key of validKeys){
        if (queryObj && Object.hasOwnProperty.call(queryObj,key)) {
            
            finalObj[key] = queryObj[key];
        }
    }
    return finalObj;
}