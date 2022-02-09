import { History } from 'history';
import { AppRoute } from 'common/enums/enums';

type Constructor = {
  history: History;
};

class Navigation {
  #history: History;

  constructor({ history }: Constructor) {
    this.#history = history;
  }

  public push(path: AppRoute | string): void {
    this.#history.push(path);
  }
}

export { Navigation };
