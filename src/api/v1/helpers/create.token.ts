export const  createToken = (number: number) =>{
    let charter:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678910"
    let result:string =""
    for(let i = 0 ; i < number; i++){
        result += charter.charAt(Math.floor(Math.random() * charter.length))
    }
    return result;
}