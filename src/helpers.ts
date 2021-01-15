export function either(...selectors: string[]) {
  return selectors.join(', ');
}

export function combined(...selectors: string[]) {
  return selectors.join('');
}

export function not(...selectors: string[]) {
  return `:not(${combined(...selectors)})`;
}

export function also(...selectors: string[]) {
  return `&${combined(...selectors)}`;
}

export function ancestorIs(...selectors: string[]) {
  return `${combined(...selectors)} &`;
}

export function parentIs(...selectors: string[]) {
  return `${combined(...selectors)}>&`;
}

export function child(...selectors: string[]) {
  return `&>${combined(...selectors)}`;
}

export function descendant(...selectors: string[]) {
  return `& ${combined(...selectors)}`;
}

export function previousIs(...selectors: string[]) {
  return `${combined(...selectors)}+&`;
}

export function next(...selectors: string[]) {
  return `&+${combined(...selectors)}`;
}

export function precedingIs(...selectors: string[]) {
  return `${combined(...selectors)}~&`;
}

export function succeeding(...selectors: string[]) {
  return `&~${combined(...selectors)}`;
}
