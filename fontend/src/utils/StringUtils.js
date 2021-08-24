export const subStringLastLength = (value) =>{
    if(value != undefined){
       return value.toString().substring(0, value.length-1);
    }
    return '';
}