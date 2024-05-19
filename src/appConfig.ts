// TODO: Read from config file
const appConfig  = {
    backendURL: "http://localhost:8800",
    supportEmail: "support@cfforum.com",
    testMessage: "Hello",
    searchDelay: 1000,                  // Delay after user last types after which search is started
    downloadCSVDelimiter: "\t",         // Column delimiter for CSV download
    downloadCSVExtension: ".txt"        // File exenstion for CSV download
  };

  //http://localhost:8800/security/logout

export default appConfig