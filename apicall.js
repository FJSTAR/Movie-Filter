
async function apicall(apipath){
    console.log(apipath);
    
    var res = await fetch(apipath);
    var ans = await res.json();
    return ans;
}
export default apicall