import { Styles } from 'jss';

export type StyleFactory<ThemeType = any> = (theme: ThemeType) => Partial<Styles>;
