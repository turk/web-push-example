
const applicationServerPublicKey = '<FCM Web Push certificates>';
var isSubscribed = false;
var swRegistration = null;


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendTokenToServer(token){
	
	fetch('http://127.0.0.1/token', {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(token)
	});
	
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');
    console.log(JSON.stringify(subscription));

    sendTokenToServer(subscription);
  })
  .catch(function(err) {
    console.log(err.message);
  });
}

function init(){
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      console.log('User is subscribed.');
    } else {
      console.log('User is not subscribed.');
	  subscribeUser();
    }

  });
}


if ('serviceWorker' in navigator && 'PushManager' in window) {
navigator.serviceWorker.register('sw.js').then(function(swRegister) {
	swRegistration = swRegister;
    init();
  })
  .catch(function(error) {
    console.log('Service Worker Error');
    console.log(error);
  });
} else {
  console.log('Push messaging is not supported');
}