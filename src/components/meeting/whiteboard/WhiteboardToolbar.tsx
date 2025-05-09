
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { WhiteboardTool, BackgroundType } from './types';

interface WhiteboardToolbarProps {
  tool: WhiteboardTool;
  setTool: (tool: WhiteboardTool) => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  background: BackgroundType;
  setBackground: (type: BackgroundType) => void;
  onClear: () => void;
}

const WhiteboardToolbar = ({
  tool,
  setTool,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  background,
  setBackground,
  onClear
}: WhiteboardToolbarProps) => {
  const colors = [
    '#000000', '#F97316', '#9B87F5', '#4F772D',
    '#EF4444', '#3B82F6', '#F59E0B',
  ];

  return (
    <div className="bg-white border-b flex flex-wrap items-center p-2 gap-2">
      <Tabs defaultValue="draw" className="w-auto">
        <TabsList>
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="shapes">Shapes</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>
        
        <TabsContent value="draw" className="flex items-center space-x-2 pt-2">
          <ToggleGroup type="single" value={tool} onValueChange={(val) => val && setTool(val as WhiteboardTool)}>
            <ToggleGroupItem value="pencil" aria-label="Pencil">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="eraser" aria-label="Eraser">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-sm">Size:</span>
            <Slider
              value={[lineWidth]}
              min={1}
              max={20}
              step={1}
              className="w-32"
              onValueChange={(vals) => setLineWidth(vals[0])}
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-8 h-8 p-0" style={{ backgroundColor: color }}>
                <span className="sr-only">Open color picker</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-2">
              <div className="grid grid-cols-7 gap-2">
                {colors.map((c) => (
                  <Button
                    key={c}
                    className="w-6 h-6 p-0 rounded-md"
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  >
                    <span className="sr-only">Select color {c}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </TabsContent>
        
        <TabsContent value="shapes" className="flex items-center space-x-2 pt-2">
          <ToggleGroup type="single" value={tool} onValueChange={(val) => val && setTool(val as WhiteboardTool)}>
            <ToggleGroupItem value="line" aria-label="Line">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="rect" aria-label="Rectangle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="circle" aria-label="Circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-sm">Size:</span>
            <Slider
              value={[lineWidth]}
              min={1}
              max={20}
              step={1}
              className="w-32"
              onValueChange={(vals) => setLineWidth(vals[0])}
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-8 h-8 p-0" style={{ backgroundColor: color }}>
                <span className="sr-only">Open color picker</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-2">
              <div className="grid grid-cols-7 gap-2">
                {colors.map((c) => (
                  <Button
                    key={c}
                    className="w-6 h-6 p-0 rounded-md"
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  >
                    <span className="sr-only">Select color {c}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </TabsContent>
        
        <TabsContent value="background" className="flex items-center space-x-2 pt-2">
          <ToggleGroup type="single" value={background} onValueChange={(val) => val && setBackground(val as BackgroundType)}>
            <ToggleGroupItem value="blank" aria-label="Blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="lines" aria-label="Lines">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M8 4v16"/><path d="M16 4v16"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="dots" aria-label="Dots">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="19" r="1"/></svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="graph" aria-label="Graph">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </TabsContent>
      </Tabs>
      
      <div className="ml-auto">
        <Button variant="outline" onClick={onClear}>
          Clear Canvas
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardToolbar;
