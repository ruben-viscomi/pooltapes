export class IBaseInfo {

  type: string;
  codec: string;
  streamIndex: number;
  bitRate: number; // NOTE: bits per sec. is ffprobe output.
  duration: number;

}
