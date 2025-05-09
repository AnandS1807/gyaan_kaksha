
export type WhiteboardTool = 'pencil' | 'eraser' | 'rect' | 'circle' | 'line';
export type BackgroundType = 'blank' | 'grid' | 'lines' | 'dots' | 'graph';
export type Point = { x: number; y: number };

export interface WhiteboardProps {
  isTeacher: boolean;
}
