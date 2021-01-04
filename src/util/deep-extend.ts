import { PartialDeep } from 'type-fest';


export function deepExtend<A, B extends PartialDeep<A>>(a: A, b: B) {
  const res: A = {} as any;

  Object.entries(a).forEach(([key, value]) => {
    const override = (b as any)[key];
    if (override) {
      if (typeof value === 'object') {
        (res as any)[key] = deepExtend(value, override);
      } else {
        (res as any)[key] = override;
      }
    } else {
      (res as any)[key] = value;
    }
  });

  return res;
}
