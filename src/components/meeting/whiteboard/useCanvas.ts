import { useRef, useState, useEffect } from 'react';
import { BackgroundType, Point } from './types';

export const useCanvas = (background: BackgroundType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        // Get display size
        const rect = container.getBoundingClientRect();
        
        // Set CSS display size
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Set actual pixel size scaled for high DPI displays
        const scale = window.devicePixelRatio;
        canvas.width = Math.floor(rect.width * scale);
        canvas.height = Math.floor(rect.height * scale);
        
        // Scale the context to adjust for the device pixel ratio
        context.scale(scale, scale);
        
        // Fill with white background
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
        
        // Apply the selected background pattern
        applyBackground(background);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    setCtx(context);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const applyBackground = (type: BackgroundType) => {
    if (!ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const scale = window.devicePixelRatio;
    const width = canvas.width / scale;
    const height = canvas.height / scale;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 0.5;
    
    switch (type) {
      case 'grid':
        const gridSize = 20;
        ctx.beginPath();
        for (let x = 0; x <= width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
        break;
        
      case 'lines':
        const lineHeight = 30;
        ctx.beginPath();
        for (let y = lineHeight; y <= height; y += lineHeight) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
        break;
        
      case 'dots':
        const dotSpacing = 20;
        const dotSize = 1;
        ctx.fillStyle = '#E5E7EB';
        for (let x = dotSpacing; x <= width; x += dotSpacing) {
          for (let y = dotSpacing; y <= height; y += dotSpacing) {
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
        
      case 'graph':
        const graphSize = 20;
        
        ctx.beginPath();
        for (let x = 0; x <= width; x += graphSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += graphSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
        
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += graphSize * 5) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += graphSize * 5) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
        break;
      
      default:
        break;
    }
  };

  useEffect(() => {
    if (!ctx) return;
    applyBackground(background);
  }, [background, ctx]);

  return {
    canvasRef,
    ctx,
    isDrawing,
    setIsDrawing,
    lastPoint,
    setLastPoint,
    applyBackground
  };
};