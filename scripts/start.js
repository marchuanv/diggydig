const http = require("http");

const subscriptionId = "2ffe8e65-0d7c-4f44-ba21-c3661a2de893";
const resourceGroupName = "crafters";
const vmName = "crafters";

const options = {
    url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2020-12-01`,
    method: "POST",
    headers: {}
};
const req = http.request(options,(response) => {
    callback(JSON.stringify({
        statusCode: response.statusCode,
        statusMessage: response.statusMessage
    }));
});
req.on('error', async (error) => {
    console.log(error);
});
req.write("");
req.end();