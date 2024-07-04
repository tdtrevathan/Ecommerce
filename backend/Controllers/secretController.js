const { SecretClient } = require('@azure/keyvault-secrets');
const { ClientSecretCredential } = require('@azure/identity');

const getSecret = async (secretName) => {
    const vaultName = process.env.AZURE_KEY_VAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;

    const clientId = process.env.AZURE_CLIENT_ID;
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;

    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const client = new SecretClient(url, credential);

    try {
        const secret = await client.getSecret(secretName);
        return secret.value;
    } catch (err) {
        console.error('Error retrieving secret:', err);
        throw err;
    }
};

exports.getSecretFromVault = async (secretName) => {
    try {
        const secretValue = await getSecret(secretName);

        return secretValue;
    } catch (err) {
        console.log("Error retreiving secret",err)
    }
};


