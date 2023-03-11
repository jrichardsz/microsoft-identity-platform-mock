const express = require('express');
const bodyParser = require('body-parser');

function MockServer() {

    this.app = express();
    this.port;
    this.serverInstance;

    this.siginTemplate = `
    <link rel="icon" href="data:,">
    <div class="imgcontainer" style="text-align: center;" >
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar" width="250">
    </div>
    <br><br>
    <div style="text-align: center;" >
        <fieldset id="details" style="border: unset;" >
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" value="janedoe@mail.com" disabled/>
            <br><br>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="changeme" disabled/>
        </fieldset>
        <fieldset style="border: unset;" >        
        <button onclick="location.href = '@redirect_uri';" " >Login</button>
        </fieldset>
    </div>
    `;

    this.config = (port) => {
        this.port = port;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.get("/*/oauth2/v2.0/authorize", this.authorize);
        this.app.post("/*/oauth2/v2.0/token", this.getAccessToken);
        this.app.get("/v1.0/me", this.getUserDetails);
        
    };

    this.start = async () => {
        this.serverInstance = await this.app.listen(this.port);
        console.log('mock server was started: '+this.port);
    };

    this.stop = async () => {
        await this.serverInstance.close()
        console.log('server was stopped');
    };

    this.authorize = async (req, res) => {
        res.type('text/html');
        res.send(this.siginTemplate.replace("@redirect_uri", req.query.redirect_uri+"?code=123456789"));
    };

    this.getAccessToken = async (req, res) => {
        res.json({
            "access_token":"*****"
        });
    };

    this.getUserDetails = async (req, res) => {
        var mail = process.env.expected_mail || "jane@doe.com";
        res.json({
            displayName: "Jane Doe",
            mail: mail,
            userPrincipalName: mail
        });
    };    

}

module.exports = MockServer;