import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponentComponent implements OnInit{
  dateJPO!: moment.Moment;
  timeLeft!: number;
  monthsLeft !: string;
  daysLeft !: string;
  hoursLeft !: string;
  minutesLeft !: string;
  secondsLeft !: string;
  isDatePassed: boolean = false;
  diff!: any;
  h2Text!: string;

  ngOnInit(): void {
    this.dateJPO = moment('2024-02-03 09:30').utcOffset(1);
    this.updateLeftTime();

    setInterval(() =>{
      this.updateLeftTime();
    }, 1000);

  }

  updateLeftTime() {
    const now = moment().utcOffset(1);
    this.diff = this.dateJPO.diff(now);

    if (this.diff < 0) {
      this.isDatePassed = true;
      // this.timeLeft = 0;

      const diffDuration = moment.duration(-this.diff);
      this.timeLeft = Math.trunc(diffDuration.asDays() + 1);

      this.daysLeft = diffDuration.days() < 10 ? '0' + diffDuration.days().toString() : diffDuration.days().toString();
      this.hoursLeft = diffDuration.hours() < 10 ? '0' + diffDuration.hours().toString() : diffDuration.hours().toString();
      this.minutesLeft = diffDuration.minutes() < 10 ? '0' + diffDuration.minutes().toString() : diffDuration.minutes().toString();
      this.secondsLeft = diffDuration.seconds() < 10 ? '0' + diffDuration.seconds().toString() : diffDuration.seconds().toString();
      this.h2Text = 'La JPO est passée depuis :';
    } else {
      this.isDatePassed = false;
      const diffDuration = moment.duration(this.diff);

      this.daysLeft = diffDuration.days() < 10 ? '0' + diffDuration.days().toString() : diffDuration.days().toString();
      this.hoursLeft = diffDuration.hours() < 10 ? '0' + diffDuration.hours().toString() : diffDuration.hours().toString();
      this.minutesLeft = diffDuration.minutes() < 10 ? '0' + diffDuration.minutes().toString() : diffDuration.minutes().toString();
      this.secondsLeft = diffDuration.seconds() < 10 ? '0' + diffDuration.seconds().toString() : diffDuration.seconds().toString();

      this.timeLeft = Math.trunc(diffDuration.asDays() + 1);
      this.h2Text = 'Votre futur IUT ouvre ses portes dans :';
    }
  }
}

