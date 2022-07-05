import { IAudioRenditionInfo } from '../types';

export const COMMON_AUDIO: IAudioRenditionInfo[] = [
  { channels: 6, sampleRate: 48_000, bitRate: 768_000, label: 'surround', type: 'audio' },
  { channels: 2, sampleRate: 48_000, bitRate: 256_000, label: 'stereo', type: 'audio' }
];
