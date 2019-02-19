const webpush = require('web-push');


webpush.setGCMAPIKey('<Legacy server key>');
webpush.setVapidDetails(
  '<email>',
  '<FCM Web Push Certificate>',
  '<FCM Web Push Certificate Private Key>'
);

const pushSubscription = {
  endpoint: 'token.endPoint',
  keys: {
    auth: 'token.auth',
    p256dh: 'token.p256dh'
  }
};

var payload = {
	"link": "https://digitaltimes.md/",
	"title": "Are You Ready!",
	"body": "Are you ready for notification?",
	"icon": "https://media.licdn.com/dms/image/C4D0BAQEEYaZzvZXRcA/company-logo_100_100/0?e=1558569600&v=beta&t=IUBFMRGIUyLJvk-HVWGdkzbYjx5oSC4bDHMd4pwbo6Y",
	"actions": [
		{
			"action": "yes",
			"title": "Yes",
			"icon": "https://www.freeiconspng.com/uploads/hand-ok-icon-5.png"
		},
			{"action": "no",
			"title": "No",
			"icon": "https://findicons.com/files/icons/697/red_candybar/128/stop.png"
			}
	]
};
try{
webpush.sendNotification(pushSubscription, JSON.stringify(payload));
}catch(err){
	console.log(err);
}