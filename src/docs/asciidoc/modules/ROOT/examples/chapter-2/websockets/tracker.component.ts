import { Component, Inject, Vue } from 'vue-property-decorator';
import { Subscription } from 'rxjs';

import TrackerService from './tracker.service';

@Component
export default class JhiTrackerComponent extends Vue {

  public activities: any[] = [];
  private subscription?: Subscription;

  @Inject('trackerService') private trackerService: () => TrackerService;

  public mounted(): void {
    this.init();
  }

  public destroyed(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  public init(): void {
    this.subscription = this.trackerService().subscribe(activity => {
      this.showActivity(activity);
    });
  }

  public showActivity(activity: any): void {
    let existingActivity = false;
    for (let index = 0; index < this.activities.length; index++) {
      if (this.activities[index].sessionId === activity.sessionId) {
        existingActivity = true;
        if (activity.page === 'logout') {
          this.activities.splice(index, 1);
        } else {
          this.activities.splice(index, 1);
          this.activities.push(activity);
        }
      }
    }
    if (!existingActivity && activity.page !== 'logout') {
      this.activities.push(activity);
    }
  }
}
