import { ITitleJSON } from 'models/typescript';
export const getBoardText = (titleJSON: string): ITitleJSON => JSON.parse(titleJSON);
