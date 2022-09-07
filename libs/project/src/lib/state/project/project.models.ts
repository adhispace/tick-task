import { BoardEntity } from '@tick-task/board';
/**
 * Interface for the 'Project' data
 */
export interface ProjectEntity {
  id: string; // Primary ID
  name: string;
  desc: string;
  boardList: BoardEntity[];
}
