// test spring

import Spring from './spring'

test('spring', () => {
    const spring = new Spring(0)
    expect(spring).toBeInstanceOf(Spring)
})
