https://www.npmjs.com/package/@azure/identity/v/1.3.0
https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/how-to-use-vm-token
https://docs.bmc.com/docs/cloudlifecyclemanagement/46/setting-up-a-tenant-id-client-id-and-client-secret-for-azure-resource-manager-provisioning-669202145.html
https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-azure-active-directory-application


const subscriptionId = "2ffe8e65-0d7c-4f44-ba21-c3661a2de893";
const resourceGroupName = "crafters";
const vmName = "crafters";
const token = "";

const options = {
    url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2020-12-01`,
    method: "POST",
    headers: {
        "Authorization": "Bearer " + token
    }
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