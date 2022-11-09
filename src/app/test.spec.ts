import { Calculator } from './testservice';

describe('testservice', () => {
  it('Should add 2 numbers', () => {
    const service = new Calculator();
    expect(service.add(2,2)).toBe(4);
  });
  it('Should sub 2 numbers', () => {
    const service = new Calculator();
    expect(service.subtract(2,2)).toBe(0);
  });
});
