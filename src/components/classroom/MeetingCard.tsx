
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScheduledMeeting } from '../../contexts/ClassroomContext';

interface MeetingCardProps {
  meeting: ScheduledMeeting;
  classroomName?: string;
  onJoin?: () => void;
  onStart?: () => void;
  isTeacher?: boolean;
  isStudent?: boolean;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ 
  meeting,
  classroomName,
  onJoin,
  onStart,
  isTeacher = false,
  isStudent = false,
}) => {
  // Format meeting date and time
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`h-2 ${meeting.isActive ? 'bg-green-500' : 'bg-saffron'}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{meeting.title}</CardTitle>
          {meeting.isActive && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Live Now
            </Badge>
          )}
        </div>
        {classroomName && (
          <p className="text-xs text-neutral-dark">
            {classroomName}
          </p>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Date:</p>
            <p>{formatDate(meeting.date)}</p>
          </div>
          <div>
            <p className="font-medium">Time:</p>
            <p>{formatTime(meeting.time)}</p>
          </div>
          <div>
            <p className="font-medium">Duration:</p>
            <p>{meeting.duration} minutes</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {meeting.isActive ? (
          <Button 
            onClick={onJoin}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Join Live Class Now
          </Button>
        ) : isTeacher ? (
          <Button 
            onClick={onStart}
            className="w-full bg-saffron hover:bg-saffron-dark"
          >
            Start Class
          </Button>
        ) : (
          <Button 
            disabled
            className="w-full"
            variant="outline"
          >
            Waiting for Teacher
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MeetingCard;
