export const BreakpointsMin = {
  phone: 0,
  tablet: 600,
  desktop: 840
};

export const Breakpoints = {
  phone: {
    selector: `(min-width: 0) and (max-width: ${BreakpointsMin.tablet - 1}px)`,
  },
  tablet: {
    selector: `(min-width: ${BreakpointsMin.tablet}px) and (max-width: ${BreakpointsMin.desktop - 1}px)`,
  },
  desktop: {
    selector: `(min-width: ${BreakpointsMin.desktop}px)`
  }
};
