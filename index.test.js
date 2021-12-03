const init = require('./index');

test('Send 0', async() => {
  expect(await init('0')).toBe("No matches found");
});

test('Send A', async() => {
    expect(await init('A')).toBe("No matches found");
});

test('Send 70', async() => {
    expect((await init('70')).length).toBe(2);
});
