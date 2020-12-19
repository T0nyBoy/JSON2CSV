// let url = document.querySelector("input").value;
// console.log(url);
let btn=document.querySelector(".convertButton");

// Getting JSON data to a csv format
async function getjson(){

    // fetching the URL to get the JSON
    // using the input value here as it gives empty string outside of function. 
    // value is grabbed before we enter it and thus it is empty.
   let data = await fetch(document.querySelector(".urlFillIn").value)
   .then(console.log(document.querySelector(".urlFillIn").value))
    .then(response => response.json())
    .then(json =>{
        document.querySelector(".onSuccess").style.display = "flex";
        setTimeout(function(){document.querySelector(".onSuccess").style.display = "none"; }, 2000);
        return json
    })
    .catch(error=>{
        document.querySelector(".onError").style.display = "flex";
        setTimeout(function(){document.querySelector(".onError").style.display = "none"; }, 2000);
        console.log(error);
    });

        // After we have the JSON we need to split the file to a csv format
        let header = Object.keys(data[0]);
        let dataLength = header.length;
        let rowNumber = data.length;

        // creating the csv format
        let csv="";
        for(k=0; k<dataLength;k++){
            if(k<dataLength-1){
                csv+=header[k]+","
            } else if(k=dataLength-1){
                csv+=header[k]+"\r\n"
            }
        };
        for(j=0; j<rowNumber;j++){
        for(i=0; i<dataLength;i++){
            if(i<dataLength-1){
                csv += data[j][header[i]]+","
            } else if (i=dataLength-1){
                csv+=data[j][header[i]]+"\r\n"
                }
            }
        };

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'YourData.csv';
    hiddenElement.click();
}


btn.addEventListener("click",(e)=>{
    e.preventDefault();
    getjson();
    document.querySelector(".theForm").reset();
})
