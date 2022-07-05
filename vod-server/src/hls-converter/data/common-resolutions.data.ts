import { IVideoRenditionInfo } from '../types';

// NOTE: bitRate is in bps (bits per sec.)
// EQ. by regression on higher bit-rates: bitRate = (3.125 * width - 1000) * 1000
export const COMMON_RESOLUTIONS: IVideoRenditionInfo[] = [
  { width: 3840, height: 2160, bitRate: 11_000_000, label: '2160p', codec: 'avc1', type: 'video' },
  { width: 2560, height: 1440, bitRate: 7_000_000, label: '1440p', codec: 'avc1', type: 'video' },
  { width: 1920, height: 1080, bitRate: 5_000_000, label: '1080p', codec: 'avc1', type: 'video' },
  { width: 1280, height: 720, bitRate: 3_000_000, label: '720p', codec: 'avc1', type: 'video' },
  { width: 854, height: 480, bitRate: 1_700_000, label: '480p', codec: 'avc1', type: 'video' },
  { width: 640, height: 360, bitRate: 1_000_000, label: '360p', codec: 'avc1', type: 'video' },
  { width: 426, height: 240, bitRate: 400_000, label: '240p', codec: 'avc1', type: 'video' }
];
