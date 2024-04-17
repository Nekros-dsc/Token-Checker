const fs = require('fs');

let nitroTokens = [];
let validTokens = [];
let invalidTokens = [];

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split('\n');

(async () => {
    console.clear();
    const startTime = Date.now();
    for (const token of tokens) {
        try {
            const userResponse = await fetch('https://discordapp.com/api/v7/users/@me',{ method: 'GET', headers: { authorization: token } });
            const userJson = await userResponse.json()

            if (userJson.id) {
                const tokenInfo = `${token} | Username: ${userJson.username} | Email: ${userJson.email ? 'Verified' : 'Not verified'} | Phone: ${userJson.phone ? 'Verified' : 'Not verified'} | Nitro: ${userJson.premium_type !== 0 ? 'True' : 'False'}`;
                console.log(`\x1b[32m[+] —\x1b[0m \x1b[34m${token.substring(0, 24)}... |\x1b[0m \x1b[30mUSERNAME:\x1b[0m \x1b[33m${userJson.username}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mEMAIL:\x1b[0m \x1b[33m${userJson.email ? 'Verified' : 'Not verified'}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mPHONE:\x1b[0m \x1b[33m${userJson.phone ? 'Verified' : 'Not verified'}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mNITRO:\x1b[0m \x1b[33m${userJson.premium_type !== 0 ? 'True' : 'False'}\x1b[0m`);    

                if (userJson.premium_type !== 0) nitroTokens.push(tokenInfo);
                validTokens.push(tokenInfo);
            } else {
                console.log(`\x1b[31m[-] — ${token}\x1b[0m`);
                invalidTokens.push(token);
            }
        } catch {}
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const endTime = Date.now();
    fs.writeFileSync(`./Output/nitro.txt`, nitroTokens.join('\n'));
    fs.writeFileSync(`./Output/valid.txt`, validTokens.join('\n'));
    fs.writeFileSync(`./Output/invalid.txt`, invalidTokens.join('\n'));

    console.log(`\x1b[34m[!] —\x1b[0m \x1b[35mChecked\x1b[0m \x1b[36m${tokens.length}\x1b[0m \x1b[35mtokens in\x1b[0m ${Math.floor((endTime - startTime) / 1000 / 60) > 0 ? `\x1b[36m${Math.floor((endTime - startTime) / 1000 / 60)}\x1b[0m \x1b[35m${Math.floor((endTime - startTime) / 1000 / 60) > 1 ? 'minutes' : 'minute'} and\x1b[0m ` : ''}\x1b[36m${Math.floor((endTime - startTime) / 1000 % 60)}\x1b[0m \x1b[35m${Math.floor((endTime - startTime) / 1000 % 60) > 1 ? 'seconds' : 'second'}\x1b[0m`);    
    console.log(`\x1b[34m[!] —\x1b[0m \x1b[35mFinished checking tokens:\x1b[0m \x1b[30mChecked:\x1b[0m \x1b[36m${tokens.length}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mValid:\x1b[0m \x1b[36m${validTokens.length}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mInvalid:\x1b[0m \x1b[36m${invalidTokens.length}\x1b[0m \x1b[34m|\x1b[0m \x1b[30mNitro:\x1b[0m \x1b[36m${nitroTokens.length}\x1b[0m`);
})();