module.exports = (dashboard) => {

    const helloValidator = (value) => value.length < 100;
    const helloSetter = (client, guild, value) => client.db.set(`${guild.id}.helloMsg`, value);
    const helloGetter = (client, guild, value) => client.db.get(`${guild.id}.helloMsg`) || 'Hey !';
    
    dashboard.addTextInput('Hello message', 'The message that will be sent when the /hello command is used. Max 100 chars.', helloValidator, helloSetter, helloGetter);


    const getSelectorEntries = (client, guild) => guild.roles.cache.map(role => [role.id, role.name]);
    const adminRoleSetter = (client, guild, value) => client.db.set(`${guild.id}.adminRole`, value);
    const adminRoleGetter = (client, guild) => {
        const roleID = client.db.get(`${guild.id}.adminRole`);
        const roleName = guild.roles.cache.get(roleID)?.name
        return [roleID, roleName];
    };
    dashboard.addSelector('Admin role', 'The only role authorized to execute the /admin command', getSelectorEntries, adminRoleSetter, adminRoleGetter);

    
    const pingSetter = (client, guild, value) => client.db.set(`${guild.id}.enablePing`, value);
    const pingGetter = (client, guild) => client.db.get(`${guild.id}.enablePing`);
    dashboard.addBooleanInput('Enable ping command', 'Whether the /ping command should be enabled or not.', pingSetter, pingGetter);

}