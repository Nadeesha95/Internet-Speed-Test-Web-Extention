document.addEventListener("DOMContentLoaded", function () {
  
  function getInternetSpeed() {

    document.getElementById("loading").innerText = "Connecting...";
    
    if (navigator.connection) {
      var connection = navigator.connection;

     

      fetch('https://www.google.com', { mode: 'no-cors' })
                .then(() => {
                  document.getElementById("loading").style.display = "none";

                  if (connection.downlink) {
                    document.getElementById("downlink").innerText =
                        connection.downlink + " Mbps";
                  }

                  if (connection.effectiveType) {
                    document.getElementById("effectiveType").innerText =
                       connection.effectiveType;
                  }

                  if (connection.rtt) {
                    document.getElementById("rtt").innerText =
                      connection.rtt + " ms";
                  }
            
                  if (connection.saveData) {
                    document.getElementById("saveData").innerText = "ON";
                  } else {
                    document.getElementById("saveData").innerText = "OFF";
                  }

            
                })
                .catch(() => {

              
      if (connection.downlink) {
        document.getElementById("downlink").innerText =
             "No Internet";
      }


      if (connection.effectiveType) {
        document.getElementById("effectiveType").innerText =
        "No Internet";
      }

      if (connection.rtt) {
        document.getElementById("rtt").innerText =
        "No Internet";
      }

      if (connection.saveData) {
        document.getElementById("saveData").innerText =  "No Internet";
      } else {
        document.getElementById("saveData").innerText =  "No Internet";
      }

    });


  
    } else {
      document.getElementById("result").innerText =
        "The navigator.connection API is not supported.";
    }

 fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(response => response.text())
  .then(data => {
    data = data.trim().split('\n').reduce(function(obj, pair) {
      pair = pair.split('=');
      obj[pair[0]] = pair[1];
      return obj;
    }, {});

    const myip = data.ip;


    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=238ddfee87bb4f17a1350abd75ef8ba8&ip=${myip}`)
      .then((response) => response.json())
      .then((data) => {
        const organization = data.organization.substring(0, 18);
        const city = data.city;
        const country_name = data.country_name;
        const flag = data.country_flag;

        document.getElementById("isp").innerText += organization;
        document.getElementById("city").innerText += city;
        document.getElementById("country_name").innerText += country_name;
        document.getElementById("flag").src = flag;
      });
    document.getElementById("isp").innerText += "";
  });
  }


  getInternetSpeed();
});
