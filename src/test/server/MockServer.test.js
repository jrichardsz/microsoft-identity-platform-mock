const include = require('nodejs-require-enhancer').include;
const chai = require('chai');
const axios = require('axios');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const MockServer = include('/src/main/node/server/MockServer.js');

describe('MockServer: start', function() {
  it('/*/oauth2/v2.0/authorize should work', async () => {
    should.exist(MockServer);
    var mockServer = new MockServer();
    mockServer.config(8081);
    await mockServer.start();
    var response = await axios.get('http://localhost:8081/foo/oauth2/v2.0/authorize?redirect_uri=acme.com/foo_callback');
    expect(response.data.includes("acme.com/foo_callback")).to.eql(true);
    await mockServer.stop();
  });
  it('/*/oauth2/v2.0/token should work', async () => {
    should.exist(MockServer);
    var mockServer = new MockServer();
    mockServer.config(8082);
    await mockServer.start();
    var response = await axios.post('http://localhost:8082/foo/oauth2/v2.0/token',{});
    should.exist(response.data.access_token);
    await mockServer.stop();
  });  

  it('/v1.0/me should work with mail as env var', async () => {
    should.exist(MockServer);
    process.env.expected_mail="alice@sword-art-online.com"
    var mockServer = new MockServer();
    mockServer.config(8083);
    await mockServer.start();
    var response = await axios.get('http://localhost:8083/v1.0/me',{});
    should.exist(response.data.mail);
    expect(response.data.mail).to.equal("alice@sword-art-online.com");
    await mockServer.stop();
    delete process.env.expected_mail;
  });    

  it('/v1.0/me should work with default mailr', async () => {
    should.exist(MockServer);
    var mockServer = new MockServer();
    mockServer.config(8084);
    await mockServer.start();
    var response = await axios.get('http://localhost:8084/v1.0/me',{});
    should.exist(response.data.mail);
    expect(response.data.mail).to.equal("jane@doe.com");
    await mockServer.stop();
  });      
});
