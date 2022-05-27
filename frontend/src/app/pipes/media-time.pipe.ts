import { Pipe, PipeTransform } from '@angular/core';

type MediaTime = {
  hours: number,
  minutes: number,
  seconds: number
};

@Pipe({
  name: 'mediaTime'
})
export class MediaTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (Number.isNaN(value)) return '-:--';

    const time: MediaTime = {
      hours: Math.trunc(value / 3600),
      minutes: Math.trunc(value % 3600 / 60),
      seconds: Math.trunc(value % 60)
    };

    return this.formatTime(time);
  }

  private formatTime({ hours, minutes, seconds }: MediaTime): string {
    if (hours < 1) return `${minutes}:${this.format(seconds)}`;
    return `${hours}:${this.format(minutes)}:${this.format(seconds)}`;
  }

  private format(value: number): string { return (value < 10) ? `0${value}` : `${value}` }

}
