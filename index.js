const fetch = require('node-fetch'); 
const fs = require('fs'); 


const filePath = './package.json';


function triggerCameraMeasurement() {
    console.log("Opening camera for distance measurement...");

    
    fetch('http://127.0.0.1:5000/measure-distance', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                console.log("Failed to measure distance.");
            } else {
                const distance = data.distance.toFixed(2); 
                console.log(`Measured Distance: ${distance} inches`);

                
                saveDistanceToFile({ distance: distance });
            }
        })
        .catch(error => {
            console.error("Error:", error);
            console.log("Failed to execute camera measurement.");
        });
}


function saveDistanceToFile(distanceObject) {
    fs.writeFile(filePath, JSON.stringify(distanceObject, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`Distance saved successfully to ${filePath}`);
        }
    });
}

// Simulate a button click or export this function for event-based triggers
triggerCameraMeasurement();
