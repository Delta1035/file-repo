import KcAdminClient from "@keycloak/keycloak-admin-client";

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080',
//   realmName: 'master',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }

try {
  const kcAdminClient = new KcAdminClient({
    baseUrl: "https://124.221.95.189:8443",
    realmName: "master",
    requestConfig: {
    //   withCredentials: true,
      rejectUnauthorized:false
    },
  });
  // Authorize with username / password
  await kcAdminClient.auth({
    username: "delta",
    password: "123456",
    grantType: "password",
    clientId: "admin-cli",
    //   totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
  });
  const users = await kcAdminClient.users.find();
  console.log(users);
} catch (error) {
  console.log(error);
}
