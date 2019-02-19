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

self.addEventListener('push', function(event) {
	// TODO: Send receive report to server
	console.log('Push Received.');
	data = JSON.parse(event.data.text());
	console.log(data);
	console.log(data.body);

	const title = data.title;
	const options = {
	body: data.body,
	icon: data.icon,
	actions: [
		{action: 'explore', title: data.actions[0].title,icon: data.actions[0].icon},
		{action: 'close', title: data.actions[1].title,icon: data.actions[1].icon},
		]
	};
	
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
	// TODO: Send click report to server
	console.log('Notification click');
	event.notification.close();
	event.waitUntil(
	clients.openWindow(event.currentTarget.data.link)
  );
});

