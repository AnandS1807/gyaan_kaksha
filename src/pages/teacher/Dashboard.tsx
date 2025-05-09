
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '../../contexts/AuthContext';
import { useClassroom } from '../../contexts/ClassroomContext';
import Layout from '../../components/Layout';
import ClassroomCard from '../../components/classroom/ClassroomCard';
import AnnouncementCard from '../../components/classroom/AnnouncementCard';
import AssignmentCard from '../../components/classroom/AssignmentCard';
import MeetingCard from '../../components/classroom/MeetingCard';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getClassroomsForUser } = useClassroom();
  const [classrooms, setClassrooms] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startNewMeeting = async () => {
    setIsLoading(true);
    // Simulate a brief loading delay
    setTimeout(() => {
      window.location.href = 'https://preview--meet-savvy-schedules-online.lovable.app/';
    }, 500);
  };

  useEffect(() => {
    const teacherClassrooms = getClassroomsForUser();
    setClassrooms(teacherClassrooms);
    
    const announcements = teacherClassrooms.flatMap(c => 
      c.announcements.map(a => ({ ...a, classroomName: c.name }))
    );
    setAllAnnouncements(announcements);
    
    const assignments = teacherClassrooms.flatMap(c => 
      c.assignments.map(a => ({ ...a, classroomName: c.name }))
    );
    setAllAssignments(assignments);
    
    const meetings = teacherClassrooms.flatMap(c => 
      c.scheduledMeetings.map(m => ({ ...m, classroomName: c.name }))
    );
    setAllMeetings(meetings);
  }, [getClassroomsForUser]);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="loader animate-spin mb-4">🌀</div>
            <p>Redirecting to meeting...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
              <p className="text-neutral-dark">Welcome back, {user?.name || 'Teacher'}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                onClick={() => navigate('/teacher/create')}
                className="gyaan-btn-primary"
              >
                Create New Classroom
              </Button>
              <Button 
                onClick={startNewMeeting}
                className="bg-purple hover:bg-purple-dark text-white"
              >
                Host New Meeting
              </Button>
            </div>
          </div>

          <Tabs defaultValue="classrooms" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="classrooms">My Classrooms</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="schedule">Scheduled Classes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classrooms" className="animate-fade-in">
              {classrooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classrooms.map((classroom) => (
                    <ClassroomCard 
                      key={classroom.id} 
                      classroom={classroom}
                      onClick={() => navigate(`/classroom/${classroom.id}`)}
                      isTeacher={true}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
                    <p className="text-center text-neutral-dark mb-4">
                      You haven't created any classrooms yet.
                    </p>
                    <Button onClick={() => navigate('/teacher/create')}>
                      Create a Classroom
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="announcements" className="animate-fade-in">
              {allAnnouncements.length > 0 ? (
                <div className="space-y-4">
                  {allAnnouncements.map((announcement) => (
                    <AnnouncementCard 
                      key={announcement.id} 
                      announcement={announcement}
                      classroomName={announcement.classroomName}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-center text-neutral-dark">
                      You haven't made any announcements yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="assignments" className="animate-fade-in">
              {allAssignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allAssignments.map((assignment) => (
                    <AssignmentCard 
                      key={assignment.id} 
                      assignment={assignment}
                      classroomName={assignment.classroomName}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-center text-neutral-dark">
                      You haven't created any assignments yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="schedule" className="animate-fade-in">
              {allMeetings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allMeetings.map((meeting) => (
                    <MeetingCard 
                      key={meeting.id} 
                      meeting={meeting}
                      classroomName={meeting.classroomName}
                      onJoin={() => navigate(`/meeting/${meeting.id}`)}
                      onStart={() => navigate(`/meeting/${meeting.id}`)}
                      isTeacher={true}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-center text-neutral-dark">
                      You haven't scheduled any classes yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Layout>
  );
};

export default TeacherDashboard;
