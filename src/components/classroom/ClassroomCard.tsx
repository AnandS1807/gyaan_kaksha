
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Classroom } from '../../contexts/ClassroomContext';

interface ClassroomCardProps {
  classroom: Classroom;
  onClick?: () => void;
  isTeacher?: boolean;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ 
  classroom, 
  onClick,
  isTeacher = false
}) => {
  // Find active meeting if any
  const activeMeeting = classroom.scheduledMeetings.find(meeting => meeting.isActive);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="bg-gradient-to-r from-saffron to-saffron-dark h-3" />
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg font-semibold truncate">{classroom.name}</span>
        </CardTitle>
        <div className="text-sm text-neutral-dark">
          {isTeacher ? (
            <span>{classroom.students.length} students joined</span>
          ) : (
            <span>Teacher: {classroom.teacherName}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-neutral-dark text-sm line-clamp-2">
          {classroom.description || "No description available."}
        </p>
        
        {isTeacher && (
          <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-saffron-light text-saffron-dark">
            Code: {classroom.code}
          </div>
        )}
        
        {activeMeeting && (
          <div className="mt-4 bg-green-100 text-green-800 p-2 rounded-md text-sm flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Live class in progress!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          onClick={onClick} 
          variant="outline" 
          className="w-full border-saffron text-saffron hover:bg-saffron-light"
        >
          Enter Classroom
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassroomCard;
