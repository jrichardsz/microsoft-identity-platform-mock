const include = require('nodejs-require-enhancer').include;
const chai = require('chai');
const should = chai.should();

describe('Index: start', function() {
  it('Index', async () => {
    const Index = include('/src/main/node/Index.js');
    should.exist(Index);
  });    
});
