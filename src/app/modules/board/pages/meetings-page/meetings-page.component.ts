import { Component, OnInit } from '@angular/core';

import { intersection, union, without } from 'lodash';

import { TimelineObject } from 'src/app/shared/interfaces/timeline/timeline-object';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {

  timelineRuler = new Array(24).fill(null);

  timelineBarId: string = 'addingItemsList';
  addingDropListIdPrefix: string = 'addingDropListId_';

  allTimelines: TimelineObject[] = [
    {
      id: 0,
      data: [
        { id: 0, indexes: [4, 9], width: 0, startX: 0, endX: 0, totalHours: 6, status: 'busy' },
        { id: 1, indexes: [10, 17], width: 0, startX: 0, endX: 0, totalHours: 8, status: 'free' },
        { id: 2, indexes: [18, 21], width: 0, startX: 0, endX: 0, totalHours: 4, status: 'undesirable' },
      ]
    },
    {
      id: 1,
      data: [
        { id: 0, indexes: [1, 6], width: 0, startX: 0, endX: 0, totalHours: 6, status: 'busy' },
        { id: 1, indexes: [8, 15], width: 0, startX: 0, endX: 0, totalHours: 8, status: 'free' },
        { id: 2, indexes: [16, 19], width: 0, startX: 0, endX: 0, totalHours: 4, status: 'undesirable' },
      ]
    },
    {
      id: 2,
      data: [
        { id: 0, indexes: [2, 5], width: 0, startX: 0, endX: 0, totalHours: 6, status: 'busy' },
        { id: 1, indexes: [9, 13], width: 8, startX: 0, endX: 0, totalHours: 0, status: 'free' },
        { id: 2, indexes: [15, 20], width: 0, startX: 0, endX: 0, totalHours: 4, status: 'undesirable' },
      ]
    },
  ];

  bestMeetingHours: number[] = [];
  possibleMeetingHours: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setBestMeetingHours();
  }

  onChangedTimelineEvent($event: TimelineObject): void {
    this.allTimelines.forEach(line => {
      if (line.id === $event.id) line.data = $event.data;
    });

    this.setBestMeetingHours();
  }

  setBestMeetingHours(): void {
    let isAllUsersfree = true;
    this.allTimelines.forEach(line => {
      const hasFree = line.data.filter(cont => cont.status === 'free');

      if (!hasFree.length) {
        isAllUsersfree = false;
        return;
      }
    })

    const [
      freeHours, allFreeHours, busyHours, undesirableHours, notGivenHours
    ] = this.sortHoursInDifferentArrays();

    this.bestMeetingHours = this.calculateBestMeetingHours(
      freeHours, busyHours, undesirableHours, notGivenHours
    );

    this.possibleMeetingHours = this.calculatePossibleMeetingHours(
      freeHours, allFreeHours, busyHours, undesirableHours, notGivenHours, isAllUsersfree
    );
  }

  sortHoursInDifferentArrays(): Array<number[]> {
    let free: number[] = [],
      allFree: number[] = [];

    let busy: number[] = [],
      undesirable: number[] = [],
      notGiven: number[] = [];

    this.allTimelines.forEach(line => {
      let lineNotGivenHours: number[] = this.generateRange(0, 23);

      line.data.forEach(cont => {
        const hours = this.generateRange(cont.indexes[0], cont.indexes[1]);

        lineNotGivenHours = without(lineNotGivenHours, ...hours);

        switch (cont.status) {
          case 'free':
            allFree = union(allFree, hours);

            if (!free.length) {
              free = hours;
            } else {
              free = intersection(free, hours);
            }
            break;

          case 'busy':
            busy = union(busy, hours);
            break;

          case 'undesirable':
            undesirable = union(undesirable, hours);
            break;

          default:
            break;
        }
      })

      notGiven = union(notGiven, lineNotGivenHours);
    });

    return [free, allFree, busy, undesirable, notGiven];
  }

  calculateBestMeetingHours(
    free: number[], busy: number[], undesirable: number[], notGiven: number[]
  ): number[] {
    const hours = without(free, ...busy, ...undesirable, ...notGiven);

    return hours.length ? intersection(hours).sort((a, b) => a - b) : [];
  }

  calculatePossibleMeetingHours(
    free: number[],
    allFree: number[],
    busy: number[],
    undesirable: number[],
    notGiven: number[],
    isAllUsersfree: boolean
  ): number[] {
    let hours: number[] = [];

    if (!isAllUsersfree) hours = without(notGiven, ...busy);

    if (!hours.length) hours = without([...allFree, ...undesirable], ...free, ...busy, ...notGiven);
    if (!hours.length) hours = without([...allFree, ...undesirable], ...free, ...busy);
    if (!hours.length) hours = without([...allFree, ...undesirable, ...notGiven], ...free, ...busy);

    return hours.length ? intersection(hours).sort((a, b) => a - b) : [];
  }

  generateRange(start: number, end: number): number[] {
    if (start === end) return [start];
    return [start, ...this.generateRange(start + 1, end)];
  }

  getAddingDropListId(timelineId: number): string {
    return this.addingDropListIdPrefix + timelineId;
  }

  getAllAddingDropListIds(): string[] {
    return this.allTimelines.map(line => this.getAddingDropListId(line.id));
  }

}
