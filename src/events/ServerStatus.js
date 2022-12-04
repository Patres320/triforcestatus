require('dotenv').config();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { FooterText, FooterImage, ThumnailImage, EmbedColour, DonationWebsite, FiveMChannelID, FiveMMessageID, FiveMServerID, FiveMEmbedUpdateTime, FiveMShowPlayerInformation } = process.env
const cfx = require('cfx-api');
module.exports = {
    name: 'ready',
    once: false,
    async execute(client)
    {
        const liveServerStatus = async () =>
        {
            var liveStatus = await cfx.fetchStatus()
            var liveServer = await cfx.fetchServer(FiveMServerID)
            var showPlayerInfo = (FiveMShowPlayerInformation === 'true')
            if (FiveMChannelID !== '')
            {
                const liveChannelName = client.channels.cache.find(channel => channel.id == (FiveMChannelID))
                if (FiveMMessageID !== '') 
                {

                
                    if (liveServer !== undefined)
                    {
                        liveChannelName.messages.fetch(FiveMMessageID).then((message) =>
                        {
                            const liveStatusMessage = new EmbedBuilder()
                            .setThumbnail(ThumnailImage)
                            .setColor(EmbedColour)
                            .setTitle('TriForce | Liberty City <:greentick:1004083276106961048><:greentick:1004083273011576953><:greentick:1004083274534092891>')
                            .addFields(
                                { name: 'Server-Status', value: '`Online` <:greentick:1004081331396948120><:greentick:1004081333154353293>', inline: true },
                                { name: 'CFX-Status', value: liveStatus.everythingOk ? "`Online` <:greentick:1004081331396948120><:greentick:1004081333154353293>" : "Issues: ⚠️", inline: true },
                                { name: 'Online-Players', value: `${liveServer.playersCount}/${liveServer.maxPlayers}`, inline: true },
                            )
                            .setFooter({ text: 'TriForce RolePlay | ServerStatus • Last update: ', iconURL: FooterImage })
                            .setTimestamp()
                        
                            if (showPlayerInfo === true) 
                            {
                                const livePlayerNames = []
                            for (var player in liveServer.players)
                            {
                                livePlayerNames.push(`ID: ${liveServer.players[player].id} | ${liveServer.players[player].name}\n`)
                            }

                            for (let i = 0; i < livePlayerNames.length; i += 10)
                            {
                                liveStatusMessage.addFields({ name: 'Player Information', value: `${livePlayerNames.sort().slice(i, i + 10).join('')}`, inline: true },)
                            }
                            }
                            message.edit({ embeds: [liveStatusMessage] });
                        
                        })
                        client.user?.setActivity(`Players: ${liveServer.playersCount}/${liveServer.maxPlayers}`, { type: 'WATCHING' });
                    }
                    else
                    {
                        liveChannelName.messages.fetch(FiveMMessageID).then((message) =>
                        {
                            const liveStatusMessage = new EmbedBuilder()
                                .setThumbnail('https://media.discordapp.net/attachments/987057169545445376/1002242388258988072/triforce.png?width=493&height=532')
                                .setColor('#eafafb')
                                .setTitle('<:greentick:1004083276106961048><:greentick:1004083273011576953><:greentick:1004083274534092891>TriForce | Liberty City')
                                .addFields(
                                    { name: 'Server-Status', value: '`Offline` <:greentick:1004081329392058489><:greentick:1004081334530097372>', inline: true },
                                    //{ name: '• Conected Players •', value: `0/0`, inline: true },
                                    { name: '• Restart Time •', value: `3PM BST (London)`, inline: true },
                                   // { name: 'Player Information', value: `None to Display`, inline: false },
                                )
                                .setFooter({ text: 'TriForce RolePlay | ServerStatus • Last update: ', iconURL: FooterImage })
                                .setTimestamp()
                                if (showPlayerInfo === false) 
                                {
                                    liveStatusMessage.addFields(
                                        { name: 'Player Information', value: `None to Display`, inline: false },
                                    )
                                }
                            message.edit({ embeds: [liveStatusMessage] });
                        })
                    }
                    setTimeout(liveServerStatus, 1000 * parseInt(FiveMEmbedUpdateTime, 10))
                } else 
                {
                    const Button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Website')
                            .setStyle('Link')
                            .setURL(`http://135.125.253.222/`),

                        new ButtonBuilder()
                            .setLabel('VIP')
                            .setStyle('Link')
                            .setURL(DonationWebsite),

                        new ButtonBuilder()
                            .setLabel('Instagram')
                            .setStyle('Link')
                            .setURL(DonationWebsite),

                        new ButtonBuilder()
                            .setLabel('Connect')
                            .setStyle('Link')
                            .setURL(`https://cfx.re/join/${FiveMServerID}`),
                    );
                    
                    const exampleEmbed = new EmbedBuilder()
                        .setColor(EmbedColour)
                        .setDescription('• **Server Status** •')
                        .setThumbnail(ThumnailImage)
                        .setTimestamp()
                        .setFooter({ text: FooterText, iconURL: FooterImage });
                    await liveChannelName.send({embeds: [exampleEmbed], components: [Button]})
                }
            }
            else
            {
                console.log('Please fill in the .env file, you need to define : FiveMChannelID')
                return
            }
        }
        liveServerStatus()
    }
}