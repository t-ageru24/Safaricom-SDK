const SDK = require('../lib/SDK');
const sdk = new SDK();

test('SDK should authenticate successfully', async () => {
    sdk.authenticate = jest.fn().mockResolvedValue('test-token');
    const token = await sdk.authenticate();
    expect(token).toBe('test-token');
});