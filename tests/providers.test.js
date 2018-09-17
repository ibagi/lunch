const lunch = require('../src/common/');

function assertProviderResult(result) {
  expect(result).not.toBe(null);
}

async function getProviderResult(providerName) {
  const provider = await lunch.getProvider(providerName);
  return await provider();
}

test('drake', async () => {
  const result = await getProviderResult('drake');
  assertProviderResult(result);
});

test('hemo', async () => {
  const result = await getProviderResult('hemo');
  assertProviderResult(result);
});

test('halasz', async () => {
  const result = await getProviderResult('halasz');
  assertProviderResult(result);
});

test('newyork', async () => {
  const result = await getProviderResult('newyork');
  assertProviderResult(result);
});

test('sorarium', async () => {
  const result = await getProviderResult('sorarium');
  assertProviderResult(result);
});

test('heaven', async () => {
  const result = await getProviderResult('heaven');
  assertProviderResult(result);
});