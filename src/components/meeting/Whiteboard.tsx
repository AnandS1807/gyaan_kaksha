// Replace your Whiteboard.tsx with this simplified version

import { useRef, useEffect, useState } from 'react';
import { WhiteboardProps, WhiteboardTool, BackgroundType } from './whiteboard/types';
import WhiteboardToolbar from './whiteboard/WhiteboardToolbar';

const Whiteboard: React.FC<WhiteboardProps> = ({ isTeacher }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<WhiteboardTool>('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [background, setBackground] = useState<BackgroundType>('blank');
  
  // Direct canvas implementation using imperative code
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isTeacher) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Important for touch and pen
    canvas.style.touchAction = 'none';
    
    // Drawing state
    let isDrawing = false;
    
    // Direct event handlers
    function startDrawing(e) {
      isDrawing = true;
      
      // Get coordinates
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set up drawing
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Handle pen pressure if available
      if (e.pressure > 0) {
        ctx.lineWidth = lineWidth * e.pressure * 2;
      }
    }
    
    function draw(e) {
      if (!isDrawing) return;
      
      // Get coordinates
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Draw line
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Handle pen pressure if available
      if (e.pressure > 0) {
        ctx.lineWidth = lineWidth * e.pressure * 2;
      }
    }
    
    function stopDrawing() {
      isDrawing = false;
      ctx.closePath();
    }
    
    // Add ALL possible event types to make sure it works
    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointerleave', stopDrawing);
    
    // Also add mouse events as fallback
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Add touch events as fallback
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startDrawing({
        clientX: touch.clientX,
        clientY: touch.clientY,
        pressure: 1
      });
    });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      draw({
        clientX: touch.clientX,
        clientY: touch.clientY,
        pressure: 1
      });
    });
    
    canvas.addEventListener('touchend', stopDrawing);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', startDrawing);
      canvas.removeEventListener('pointermove', draw);
      canvas.removeEventListener('pointerup', stopDrawing);
      canvas.removeEventListener('pointerleave', stopDrawing);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [color, lineWidth, isTeacher]);
  
  // Simple clear function
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full">
      {isTeacher && (
        <WhiteboardToolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          background={background}
          setBackground={setBackground}
          onClear={handleClearCanvas}
        />
      )}
      
      {!isTeacher && (
        <div className="bg-white border-b p-3">
          <p className="text-center text-neutral-dark">
            You are viewing the teacher's whiteboard
          </p>
        </div>
      )}
      
      <div className="flex-1 relative overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Whiteboard;