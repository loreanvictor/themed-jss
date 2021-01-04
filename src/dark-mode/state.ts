/* istanbul ignore file */

import pipe from 'callbag-pipe';
import subscribe from 'callbag-subscribe';
import { state, State } from 'callbag-state';

// eslint-disable-next-line no-shadow
export enum DarkModeState {
  Dark, Light
}


export class DarkMode {
  readonly state: State<DarkModeState>;
  private _system: DarkModeState;

  private _query: MediaQueryList;
  private _qlistener: () => void;
  private _sub: () => void;

  constructor() {
    this._query = window.matchMedia('(prefers-color-scheme: dark)');

    this._system = this._query.matches ? DarkModeState.Dark : DarkModeState.Light;
    this.state = state(this._system);

    this._qlistener = () => {
      this._system = this._query.matches ? DarkModeState.Dark : DarkModeState.Light;
      this.state.set(this._system);
    };
    this._query.addListener(this._qlistener);

    if (localStorage.getItem('--dark-mode')) {
      this.state.set(localStorage.getItem('--dark-mode') === 'true' ? DarkModeState.Dark : DarkModeState.Light);
    }

    document.body.parentElement!.classList.add('--dark-mode-override');

    this._sub = pipe(
      this.state,
      subscribe(mode => {
        if (mode === DarkModeState.Dark) {
          document.body.parentElement!.classList.add('--dark');
        } else {
          document.body.parentElement!.classList.remove('--dark');
        }

        if (mode !== this._system) {
          localStorage.setItem('--dark-mode', (mode === DarkModeState.Light) ? 'false' : 'true');
        } else {
          localStorage.removeItem('--dark-mode');
        }
      })
    );
  }

  clear() {
    this._query.removeListener(this._qlistener);
    this._sub();
  }

  public get system() {
    return this._system;
  }

  public toggle() {
    this.state.set(this.state.get() === DarkModeState.Light ? DarkModeState.Dark : DarkModeState.Light);
  }

  /* --- static instance --- */

  private static __instance: DarkMode;

  public static get instance() {
    return this.__instance || (this.__instance = new DarkMode());
  }

  public static initialize() {
    this.__instance = this.__instance || new DarkMode();
  }

  public static toggle() {
    this.__instance.toggle();
  }

  public static state() {
    return this.__instance.state;
  }
}
