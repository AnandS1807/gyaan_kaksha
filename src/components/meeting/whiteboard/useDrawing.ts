import { useCallback } from 'react';
import { Point, WhiteboardTool, BackgroundType } from './types';

interface UseDrawingProps {
  ctx: CanvasRenderingContext2D | null;
  tool: WhiteboardTool;
  color: string;
  lineWidth: number;
  isTeacher: boolean;
}

export const useDrawing = ({
  ctx,
  tool,
  color,
  lineWidth,
  isTeacher
}: UseDrawingProps) => {
  const getPoint = useCallback((e: React.PointerEvent): Point => {
    const canvas = ctx?.canvas;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX / window.devicePixelRatio,
      y: (e.clientY - rect.top) * scaleY / window.devicePixelRatio
    };
  }, [ctx]);

  const startDrawing = useCallback((
    e: React.PointerEvent,
    setIsDrawing: (value: boolean) => void,
    setLastPoint: (point: Point) => void,
    setCurrentShape: (shape: any) => void
  ) => {
    if (!ctx || !isTeacher) return;
    
    const point = getPoint(e);
    setLastPoint(point);
    setIsDrawing(true);
    
    // Configure drawing style
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Adjust line width based on pen pressure when available
    if (e.pointerType === 'pen' && e.pressure > 0) {
      ctx.lineWidth = lineWidth * e.pressure * 2;
    }
    
    if (tool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else if (['rect', 'circle', 'line'].includes(tool)) {
      setCurrentShape({ start: point });
    }
  }, [ctx, isTeacher, tool, color, lineWidth, getPoint]);

  const draw = useCallback((
    e: React.PointerEvent,
    isDrawing: boolean,
    lastPoint: Point,
    currentShape: any | null,
    setLastPoint: (point: Point) => void,
    applyBackground: (type: BackgroundType) => void,
    background: BackgroundType
  ) => {
    if (!ctx || !isDrawing || !isTeacher) return;
    
    const currentPoint = getPoint(e);
    
    // Adjust line width based on pen pressure when available
    if (e.pointerType === 'pen' && e.pressure > 0) {
      ctx.lineWidth = lineWidth * e.pressure * 2;
    }
    
    if (tool === 'pencil' || tool === 'eraser') {
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    } else if (['rect', 'circle', 'line'].includes(tool) && currentShape) {
      const { start } = currentShape;
      
      applyBackground(background);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      
      if (tool === 'rect') {
        ctx.rect(
          start.x,
          start.y,
          currentPoint.x - start.x,
          currentPoint.y - start.y
        );
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(currentPoint.x - start.x, 2) + Math.pow(currentPoint.y - start.y, 2)
        );
        ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      } else if (tool === 'line') {
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
      }
      
      ctx.stroke();
    }
    
    setLastPoint(currentPoint);
  }, [ctx, isTeacher, tool, color, lineWidth, getPoint]);

  const endDrawing = useCallback((
    setIsDrawing: (value: boolean) => void,
    setCurrentShape: (shape: any) => void
  ) => {
    if (!ctx || !isTeacher) return;
    ctx.closePath();
    setIsDrawing(false);
    setCurrentShape(null);
  }, [ctx, isTeacher]);

  const clearCanvas = useCallback((applyBackground: (type: BackgroundType) => void, background: BackgroundType) => {
    if (!ctx || !isTeacher || !ctx.canvas) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    applyBackground(background);
  }, [ctx, isTeacher]);

  return {
    startDrawing,
    draw,
    endDrawing,
    clearCanvas
  };
};