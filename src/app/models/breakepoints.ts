export const BreakpointsMin = {
  mobile: 0,
  desktop: 768
};

export const Breakpoints = {
  mobile: {
    selector: `(max-width: ${BreakpointsMin.desktop - 1}px)`,
  },
  desktop: {
    selector: `(min-width: ${BreakpointsMin.desktop}px)`
  }
};
