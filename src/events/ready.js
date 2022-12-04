module.exports = {
    name: 'ready',
    once: true,
    async execute(client)
    {
        

        console.log('---<------>----<>----<------>---')
        console.log('--- >> TriForce is now ONLINE << ---')
        console.log(`--- >> Logged in as ${client.user.tag} << ---`);
        console.log('---<------>----<>----<------>---')
        console.log('-- rPatr3s320')

        //client.user.setActivity('Nothing', { type: "PLAYING"}).catch(console.error);
    }
}