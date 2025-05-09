
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '../../contexts/AuthContext';
import { useClassroom } from '../../contexts/ClassroomContext';
import Layout from '../../components/Layout';
import ClassroomCard from '../../components/classroom/ClassroomCard';
import AssignmentCard from '../../components/classroom/AssignmentCard';
import AnnouncementCard from '../../components/classroom/AnnouncementCard';
import MeetingCard from '../../components/classroom/MeetingCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getClassroomsForUser, getUserAssignments } = useClassroom();
  const [classrooms, setClassrooms] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    // Get user's classrooms
    const userClassrooms = getClassroomsForUser();
    setClassrooms(userClassrooms);
    
    // Get assignments
    const userAssignments = getUserAssignments();
    setAssignments(userAssignments);
    
    // Get announcements from all classrooms
    const allAnnouncements = userClassrooms.flatMap(c => 
      c.announcements.map(a => ({ ...a, classroomName: c.name }))
    );
    setAnnouncements(allAnnouncements);
    
    // Get upcoming meetings
    const allMeetings = userClassrooms.flatMap(c => 
      c.scheduledMeetings.map(m => ({ ...m, classroomName: c.name }))
    );
    setUpcomingMeetings(allMeetings);
  }, [getClassroomsForUser, getUserAssignments]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-neutral-dark">Welcome back, {user?.name || 'Student'}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/student/join')}
              className="gyaan-btn-primary"
            >
              Join New Classroom
            </Button>
          </div>
        </div>

        <Tabs defaultValue="classrooms" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="classrooms">My Classrooms</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classrooms" className="animate-fade-in">
            {classrooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map((classroom) => (
                  <ClassroomCard 
                    key={classroom.id} 
                    classroom={classroom}
                    onClick={() => navigate(`/classroom/${classroom.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
                  <p className="text-center text-neutral-dark mb-4">
                    You haven't joined any classrooms yet.
                  </p>
                  <Button onClick={() => navigate('/student/join')}>
                    Join a Classroom
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="assignments" className="animate-fade-in">
            {assignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments.map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                    classroomName={classrooms.find(c => c.id === assignment.classroomId)?.name || ''}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-center text-neutral-dark">
                    No assignments available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="announcements" className="animate-fade-in">
            {announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.map((announcement) => (
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
                    No announcements available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="schedule" className="animate-fade-in">
            {upcomingMeetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingMeetings.map((meeting) => (
                  <MeetingCard 
                    key={meeting.id} 
                    meeting={meeting}
                    classroomName={meeting.classroomName}
                    onJoin={() => navigate(`/meeting/${meeting.id}`)}
                    isStudent={true}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-center text-neutral-dark">
                    No upcoming classes scheduled.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
