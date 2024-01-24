export const BreakpointsMin = {
  extraSmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  extraLarge: 1200
};

export const Breakpoints = {
  extraSmall: {
    selector: `(min-width: 0) and (max-width: ${BreakpointsMin.small - 1}px)`,
  },
  small: {
    selector: `(min-width: ${BreakpointsMin.small}px) and (max-width: ${BreakpointsMin.medium - 1}px)`,
  },
  medium: {
    selector: `(min-width: ${BreakpointsMin.medium}px) and (max-width: ${BreakpointsMin.large - 1}px)`,
  },
  large: {
    selector: `(min-width: ${BreakpointsMin.large}px) and (max-width: ${BreakpointsMin.extraLarge - 1}px)`,
  },
  extraLarge: {
    selector: `(min-width: ${BreakpointsMin.extraLarge}px)`
  }
};
