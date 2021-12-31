export function logWithDebug(message: string){
    if(localStorage.getItem('DoItNow.debug') || null === true) {
        console.log(message)
    } 
}