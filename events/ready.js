module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setStatus('dnd');
        client.user.setActivity('coding tutorials', { type: 'WATCHING' });
		//while (true) {
	//		console.log(Math.random().toString(16).substr(2, 100))
		//}
	},
};