const lunch = require('../src/common/');

const testLabel = (name) => `${name} result is correct`;

function assertProviderResult(result) {
  expect(result).not.toBe(null);
}

async function getProviderResult(providerName) {
  const provider = await lunch.getProvider(providerName);
  return await provider();
}

test(testLabel('drake'), async () => {
  const result = await getProviderResult('drake');
  assertProviderResult(result);
});

test(testLabel('hemo'), async () => {
  const result = await getProviderResult('hemo');
  assertProviderResult(result);
});

test(testLabel('halasz'), async () => {
  const result = await getProviderResult('halasz');
  assertProviderResult(result);
});

test(testLabel('newyork'), async () => {
  const result = await getProviderResult('newyork');
  assertProviderResult(result);
});

test(testLabel('sorarium'), async () => {
  const result = await getProviderResult('sorarium');
  assertProviderResult(result);
});