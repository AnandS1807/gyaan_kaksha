
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { useClassroom, Classroom } from '../contexts/ClassroomContext';
import Layout from '../components/Layout';
import AnnouncementCard from '../components/classroom/AnnouncementCard';
import AssignmentCard from '../components/classroom/AssignmentCard';
import MeetingCard from '../components/classroom/MeetingCard';

const ClassroomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getClassroomById, createAnnouncement, createAssignment, scheduleMeeting, startMeeting } = useClassroom();
  const { toast } = useToast();
  
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  // Form states
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDuration, setMeetingDuration] = useState(60);
  
  // Dialog states
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const currentClassroom = getClassroomById(id);
      setClassroom(currentClassroom || null);
      
      // Check if current user is the teacher of this classroom
      if (user && currentClassroom) {
        setIsTeacher(user.id === currentClassroom.teacherId);
      }
    }
  }, [id, getClassroomById, user]);

  // Handle announcement creation
  const handleCreateAnnouncement = async () => {
    if (!classroom || !announcementTitle || !announcementContent) return;
    
    try {
      await createAnnouncement(classroom.id, announcementTitle, announcementContent);
      toast({
        title: "Announcement created",
        description: "Your announcement has been shared with the class.",
      });
      setAnnouncementDialogOpen(false);
      setAnnouncementTitle('');
      setAnnouncementContent('');
      
      // Update classroom data
      const updatedClassroom = getClassroomById(id!);
      setClassroom(updatedClassroom || null);
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast({
        title: "Error",
        description: "Failed to create announcement.",
        variant: "destructive",
      });
    }
  };

  // Handle assignment creation
  const handleCreateAssignment = async () => {
    if (!classroom || !assignmentTitle || !assignmentDescription || !assignmentDueDate) return;
    
    try {
      await createAssignment(classroom.id, assignmentTitle, assignmentDescription, assignmentDueDate);
      toast({
        title: "Assignment created",
        description: "Your assignment has been added to the class.",
      });
      setAssignmentDialogOpen(false);
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      
      // Update classroom data
      const updatedClassroom = getClassroomById(id!);
      setClassroom(updatedClassroom || null);
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast({
        title: "Error",
        description: "Failed to create assignment.",
        variant: "destructive",
      });
    }
  };

  // Handle meeting scheduling
  const handleScheduleMeeting = async () => {
    if (!classroom || !meetingTitle || !meetingDate || !meetingTime) return;
    
    try {
      await scheduleMeeting(classroom.id, meetingTitle, meetingDate, meetingTime, meetingDuration);
      toast({
        title: "Class scheduled",
        description: "Your class has been scheduled successfully.",
      });
      setMeetingDialogOpen(false);
      setMeetingTitle('');
      setMeetingDate('');
      setMeetingTime('');
      setMeetingDuration(60);
      
      // Update classroom data
      const updatedClassroom = getClassroomById(id!);
      setClassroom(updatedClassroom || null);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast({
        title: "Error",
        description: "Failed to schedule class.",
        variant: "destructive",
      });
    }
  };

  // Handle start meeting
  const handleStartMeeting = async (meetingId: string) => {
    try {
      await startMeeting(meetingId);
      navigate(`/meeting/${meetingId}`);
    } catch (error) {
      console.error('Error starting meeting:', error);
      toast({
        title: "Error",
        description: "Failed to start the class.",
        variant: "destructive",
      });
    }
  };

  if (!classroom) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl">Classroom not found</h2>
            <Button 
              className="mt-4"
              onClick={() => navigate(user?.role === 'teacher' ? '/teacher' : '/student')}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(user?.role === 'teacher' ? '/teacher' : '/student')}
          className="mb-4"
        >
          &larr; Back to Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{classroom.name}</h1>
              <p className="text-neutral-dark">Teacher: {classroom.teacherName}</p>
            </div>
            {isTeacher && (
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Dialog open={announcementDialogOpen} onOpenChange={setAnnouncementDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-saffron text-saffron">
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>Share important information with your class</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="announcementTitle">Title</Label>
                        <Input
                          id="announcementTitle"
                          value={announcementTitle}
                          onChange={(e) => setAnnouncementTitle(e.target.value)}
                          placeholder="e.g., Important Update"
                          className="gyaan-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announcementContent">Content</Label>
                        <Textarea
                          id="announcementContent"
                          value={announcementContent}
                          onChange={(e) => setAnnouncementContent(e.target.value)}
                          placeholder="Write your announcement here"
                          className="gyaan-input min-h-32"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setAnnouncementDialogOpen(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAnnouncement} className="gyaan-btn-primary">
                        Post Announcement
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-purple text-purple">
                      New Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Assignment</DialogTitle>
                      <DialogDescription>Add a new assignment for students</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="assignmentTitle">Title</Label>
                        <Input
                          id="assignmentTitle"
                          value={assignmentTitle}
                          onChange={(e) => setAssignmentTitle(e.target.value)}
                          placeholder="e.g., Mathematics Homework"
                          className="gyaan-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignmentDescription">Description</Label>
                        <Textarea
                          id="assignmentDescription"
                          value={assignmentDescription}
                          onChange={(e) => setAssignmentDescription(e.target.value)}
                          placeholder="Describe the assignment"
                          className="gyaan-input min-h-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignmentDueDate">Due Date</Label>
                        <Input
                          id="assignmentDueDate"
                          type="date"
                          value={assignmentDueDate}
                          onChange={(e) => setAssignmentDueDate(e.target.value)}
                          className="gyaan-input"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setAssignmentDialogOpen(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAssignment} className="gyaan-btn-primary">
                        Create Assignment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={meetingDialogOpen} onOpenChange={setMeetingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gyaan-btn-primary">
                      Schedule Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule a Class</DialogTitle>
                      <DialogDescription>Set up a live teaching session</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="meetingTitle">Class Title</Label>
                        <Input
                          id="meetingTitle"
                          value={meetingTitle}
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          placeholder="e.g., Introduction to Algebra"
                          className="gyaan-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meetingDate">Date</Label>
                        <Input
                          id="meetingDate"
                          type="date"
                          value={meetingDate}
                          onChange={(e) => setMeetingDate(e.target.value)}
                          className="gyaan-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meetingTime">Time</Label>
                        <Input
                          id="meetingTime"
                          type="time"
                          value={meetingTime}
                          onChange={(e) => setMeetingTime(e.target.value)}
                          className="gyaan-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meetingDuration">Duration (minutes)</Label>
                        <Input
                          id="meetingDuration"
                          type="number"
                          min="15"
                          step="15"
                          value={meetingDuration}
                          onChange={(e) => setMeetingDuration(parseInt(e.target.value))}
                          className="gyaan-input"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setMeetingDialogOpen(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={handleScheduleMeeting} className="gyaan-btn-primary">
                        Schedule Class
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {classroom.description && (
            <div className="mt-4 p-4 bg-neutral-lightest rounded-md border border-neutral-light">
              <p className="text-neutral-dark">{classroom.description}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="bg-saffron-light text-saffron-dark px-3 py-1 rounded-md flex items-center">
              <span className="font-medium mr-2">Class Code:</span>
              <span>{classroom.code}</span>
            </div>
            <div className="bg-purple-light text-purple-dark px-3 py-1 rounded-md">
              <span className="font-medium mr-2">Students:</span>
              <span>{classroom.students.length}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Scheduled Classes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements" className="animate-fade-in">
            {classroom.announcements.length > 0 ? (
              <div className="space-y-4">
                {classroom.announcements.map((announcement) => (
                  <AnnouncementCard 
                    key={announcement.id} 
                    announcement={announcement}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-center text-neutral-dark">
                    No announcements have been posted yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="assignments" className="animate-fade-in">
            {classroom.assignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classroom.assignments.map((assignment) => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-center text-neutral-dark">
                    No assignments have been added yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="schedule" className="animate-fade-in">
            {classroom.scheduledMeetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classroom.scheduledMeetings.map((meeting) => (
                  <MeetingCard 
                    key={meeting.id} 
                    meeting={meeting}
                    onJoin={() => navigate(`/meeting/${meeting.id}`)}
                    onStart={isTeacher ? () => handleStartMeeting(meeting.id) : undefined}
                    isTeacher={isTeacher}
                    isStudent={!isTeacher}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-center text-neutral-dark">
                    No classes have been scheduled yet.
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

export default ClassroomDetails;
