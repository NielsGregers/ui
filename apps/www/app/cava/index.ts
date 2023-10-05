export const vizito = 1

// fetch("https://backoffice.vizito.be/api/knownvisitors", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "authorization": "Basic bmdqb2hAbmV0cy5ldTpFbWxuMzA2MCE=",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "cookie": "connect.sid=s%3A472d4a0d-789b-4098-886d-f0098e1e4f9e.R6ZgCJqoN%2FMcPT4Y6yW%2FGOPf7HhzdgR6jQR%2Fbrf1zLg; TawkConnectionTime=0; twk_uuid_5acf062d4b401e45400e8f66=%7B%22uuid%22%3A%221.PUmcK5RgNNomVxb7GpFTD8ZVESIp2kpSY3yMLuZDp1svEQT63c02oOhtoaDC7iDPtgebc6uAJpBMSbrjZuQQxBovHAWk8W9ZG9FlenXRmRK2lx3RE%22%2C%22version%22%3A3%2C%22domain%22%3A%22vizito.be%22%2C%22ts%22%3A1696244124855%7D",
//     "Referer": "https://backoffice.vizito.be/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"visit_type\":\"5f6c9e621706c4335c94ad47\",\"first_name\":\"Santa\",\"last_name\":\"Claus\",\"recipient\":\"Niels Gregers Johansen\",\"company\":\"Winter Service\",\"email\":\"santa@north.pole\",\"reason\":\"Privat\",\"registeredbynameofreceptionistsecurityguard\":\"Niels Gregers Johansen\",\"visiting_on\":{\"startDate\":\"2023-12-23T23:00:00.000Z\",\"endDate\":\"2023-12-24T22:59:59.999Z\"},\"company_id\":\"5f6c9e611706c4335c94ad2c\"}",
//   "method": "POST"
// });

// fetch("https://backoffice.vizito.be/api/knownvisitors/bycompany/5f6c9e611706c4335c94ad2c?count=10&filter%5Bfirst_name%5D=&page=1&sorting%5Bcreate_date%5D=desc", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "authorization": "Basic bmdqb2hAbmV0cy5ldTpFbWxuMzA2MCE=",
//     "if-none-match": "W/\"1177-6O8qvrTllK077hOWtni6WnXJBuU\"",
//     "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://backoffice.vizito.be/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

const visit = {
  visit_type: "5f6c9e621706c4335c94ad47",
  first_name: "Santa",
  last_name: "Claus",
  recipient: "Niels Gregers Johansen",
  company: "Winter Service",
  email: "santa@north.pole",
  reason: "Privat",
  registeredbynameofreceptionistsecurityguard: "Niels Gregers Johansen",
  visiting_on: {
    startDate: "2023-12-23T23:00:00.000Z",
    endDate: "2023-12-24T22:59:59.999Z",
  },
  company_id: "5f6c9e611706c4335c94ad2c",
}
