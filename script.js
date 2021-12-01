var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText; 

        var response = JSON.parse(xhttp.responseText);
        var data = response.data;


        console.log(data);
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
        }

        const timeFrames = document.querySelectorAll('.timeframe');
        timeFrames.forEach(timeFrame => {
            timeFrame.addEventListener('click', (e) => {
                console.log(e.target.innerHTML);
                if (e.target.innerHTML === "Daily") {

                }
            })
        })


    }
};
xhttp.open("GET", "data.json", true);
xhttp.send();