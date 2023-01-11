import * as SockJS from 'sockjs-client';
import { Observer, map } from 'rxjs';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { RxStomp } from '@stomp/rx-stomp';

import { AccountStateStorable } from '@/shared/config/store/account-store';

const DESTINATION_TRACKER = '/topic/tracker';
const DESTINATION_ACTIVITY = '/topic/activity';

export default class TrackerService {
  private rxStomp: RxStomp;

  constructor(
    private router: VueRouter,
    private store: Store<AccountStateStorable>,
  ) {
    this.stomp = new RxStomp();
    this.router.afterEach(() => this.sendActivity());

    this.store.watch(
      (_state, getters) => getters.authenticated,
      (value, oldValue) => {
        if (value === oldValue) return;
        if (value) {
          return this.connect();
        }
        return this.disconnect();
      }
    );
  }

  get stomp() {
    return this.rxStomp;
  }

  set stomp(rxStomp) {
    this.rxStomp = rxStomp;
    this.rxStomp.configure({
      debug: (msg: string): void => {
        console.log(new Date(), msg);
      },
    });
    this.rxStomp.connected$.subscribe(() => {
      this.sendActivity();
    });
  }

  private connect(): void {
    this.updateCredentials();
    return this.rxStomp.activate();
  }

  private disconnect(): Promise<void> {
    return this.rxStomp.deactivate();
  }

  private getAuthToken() {
    const authToken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    return JSON.parse(authToken);
  }

  private buildUrl(): string {
    // building absolute path so that websocket doesn't fail when deploying with a context path
    const loc = window.location;
    const baseHref = document.querySelector('base').getAttribute('href');
    const url = '//' + loc.host + baseHref + 'websocket/tracker';
    const authToken = this.getAuthToken();
    if (authToken) {
      return `${url}?access_token=${authToken}`;
    }
    return url;
  }

  private updateCredentials(): void {
    this.rxStomp.configure({
      webSocketFactory: () => {
        return new SockJS(this.buildUrl());
      },
    });
  }

  private sendActivity(): void {
    this.rxStomp.publish({
      destination: DESTINATION_ACTIVITY,
      body: JSON.stringify({page: this.router.currentRoute.fullPath}),
    });
  }

  public subscribe(observer) {
    return this.rxStomp
      .watch(DESTINATION_TRACKER)
      .pipe(map(imessage => JSON.parse(imessage.body)))
      .subscribe(observer);
  }
};
