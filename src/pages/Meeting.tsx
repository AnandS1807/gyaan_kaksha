
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { useClassroom, ScheduledMeeting } from '../contexts/ClassroomContext';
import Whiteboard from '../components/meeting/Whiteboard';

const Meeting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { classrooms, endMeeting } = useClassroom();
  const { toast } = useToast();

  const [meeting, setMeeting] = useState<ScheduledMeeting | null>(null);
  const [classroom, setClassroom] = useState<any | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    // Find meeting and classroom
    if (id) {
      for (const classroom of classrooms) {
        const foundMeeting = classroom.scheduledMeetings.find(m => m.id === id);
        if (foundMeeting) {
          setMeeting(foundMeeting);
          setClassroom(classroom);
          setIsTeacher(user?.id === classroom.teacherId);
          
          // If meeting is not active and user is teacher, activate it
          if (!foundMeeting.isActive && user?.id === classroom.teacherId) {
            // This would normally call startMeeting, but we don't want to trigger a re-render loop
          }
          break;
        }
      }
    }
  }, [id, classrooms, user]);

  const handleEndMeeting = async () => {
    if (!meeting) return;
    
    try {
      await endMeeting(meeting.id);
      toast({
        title: "Class ended",
        description: "The class has been ended successfully.",
      });
      navigate(`/classroom/${classroom.id}`);
    } catch (error) {
      console.error('Error ending meeting:', error);
      toast({
        title: "Error",
        description: "Failed to end the class.",
        variant: "destructive",
      });
    }
  };

  if (!meeting || !classroom) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-lightest">
        <div className="text-center">
          <h2 className="text-xl mb-4">Class not found</h2>
          <Button 
            onClick={() => navigate(user?.role === 'teacher' ? '/teacher' : '/student')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-lightest">
      {/* Meeting header */}
      <header className="bg-white shadow-sm border-b border-neutral-light p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{meeting.title}</h1>
            <p className="text-sm text-neutral">{classroom.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isTeacher ? (
              <Button 
                variant="destructive"
                onClick={handleEndMeeting}
              >
                End Class
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => navigate(`/classroom/${classroom.id}`)}
              >
                Leave Class
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Meeting content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Teacher video section */}
        <div className="lg:w-1/4 bg-neutral-darkest p-4 flex flex-col">
          <div className="bg-neutral-dark rounded-lg flex-1 flex items-center justify-center mb-4">
            {isTeacher ? (
              <div className="text-white text-center p-4">
                <p>Your camera is off</p>
                <Button variant="outline" className="mt-2">
                  Turn on camera
                </Button>
              </div>
            ) : (
              <div className="text-white text-center p-4">
                <p>Teacher's camera is off</p>
              </div>
            )}
          </div>
          
          <div className="bg-neutral-lightest rounded-lg p-4">
            <h3 className="font-medium mb-2">Participants ({classroom.students.length + 1})</h3>
            <div className="text-sm">
              <div className="flex items-center justify-between py-1">
                <span>{classroom.teacherName} (Teacher)</span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Host</span>
              </div>
              {/* We'd normally list students here, but we don't have their names */}
              <div className="text-neutral mt-2">{classroom.students.length} students</div>
            </div>
          </div>
        </div>

        {/* Whiteboard section */}
        <div className="lg:w-3/4 flex-1 overflow-hidden">
          <Whiteboard isTeacher={isTeacher} />
        </div>
      </div>
    </div>
  );
};

export default Meeting;
