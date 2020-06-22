import tcComponent from './tcComponent';

describe('tcComponent', () => {
  it('should define props and computed', () => {
    expect(Object.keys(tcComponent)).toEqual(['props', 'computed']);
  });

  it('should define props for modes, overrides and themes', () => {
    expect(Object.keys(tcComponent.props)).toEqual(['overrides', 'compact', 'dark']);
  });

  it('should define props with the right types', () => {
    expect(Object.values(tcComponent.props).map(({ type }) => type)).toEqual([
      Object,
      Boolean,
      Boolean,
    ]);
  });

  it('should define computed for mode and theme', () => {
    expect(Object.keys(tcComponent.computed)).toEqual(['mode', 'theme']);
  });

  it('should define mode as inheritable', () => {
    expect(
      tcComponent.computed.mode.bind({
        $parent: {
          mode: 'myMode',
        },
      })(),
    ).toBe('myMode');
  });

  it('should define theme as inheritable', () => {
    expect(
      tcComponent.computed.theme.bind({
        $parent: {
          theme: 'myTheme',
        },
      })(),
    ).toBe('myTheme');
  });
});
