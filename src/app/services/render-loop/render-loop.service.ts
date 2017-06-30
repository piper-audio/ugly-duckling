/**
 * Created by lucast on 02/06/2017.
 */
import {Injectable, NgZone} from '@angular/core';
import {AudioPlayerService} from '../audio-player/audio-player.service';
import {Subscription} from 'rxjs/Subscription';
import {OnSeekHandler} from '../../playhead/PlayHeadHelpers';

export type TaskRemover = () => void;
type TaskId = number;

@Injectable()
export class RenderLoopService {
  private playingStateSubscription: Subscription;
  private seekedSubscription: Subscription;
  private tasks: Map<TaskId, OnSeekHandler>;
  private countingId: TaskId;

  constructor(private player: AudioPlayerService,
              private zone: NgZone) {
    this.countingId = 0;
    this.tasks = new Map();
    this.seekedSubscription = this.player.seeked$.subscribe(() => {
      if (!this.player.isPlaying()) {
        this.zone.runOutsideAngular(() => {
          this.runTasks();
        });
      }
    });
    this.playingStateSubscription = this.player.playingStateChange$.subscribe(
      isPlaying => {
        if (isPlaying) {
          this.animate();
        }
      });
  }

  addPlayingTask(task: OnSeekHandler): TaskRemover {
    const id = this.countingId++;
    this.tasks.set(id, task);
    return () => {
      this.tasks.delete(id);
    };
  }

  private animate(): void {
    this.zone.runOutsideAngular(() => {
      const animateNextFrame = () => {
        if (this.player.isPlaying()) {
          this.runTasks();
          requestAnimationFrame(animateNextFrame);
        }
      };
      requestAnimationFrame(animateNextFrame);
    });
  }

  private runTasks(): void {
    const currentTime = this.player.getCurrentTime();
    for (const task of this.tasks.values()) {
      task(currentTime);
    }
  }
}
