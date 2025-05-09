
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, User } from './AuthContext';

// Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classroomId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  classroomId: string;
}

export interface ScheduledMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  classroomId: string;
  isActive: boolean;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  code: string;
  teacherId: string;
  teacherName: string;
  students: string[]; // Array of student IDs
  assignments: Assignment[];
  announcements: Announcement[];
  scheduledMeetings: ScheduledMeeting[];
}

// Context type
interface ClassroomContextType {
  classrooms: Classroom[];
  loading: boolean;
  createClassroom: (name: string, description: string) => Promise<Classroom>;
  joinClassroom: (code: string) => Promise<boolean>;
  getClassroomById: (id: string) => Classroom | undefined;
  getClassroomsForUser: () => Classroom[];
  createAnnouncement: (classroomId: string, title: string, content: string) => Promise<void>;
  createAssignment: (classroomId: string, title: string, description: string, dueDate: string) => Promise<void>;
  scheduleMeeting: (classroomId: string, title: string, date: string, time: string, duration: number) => Promise<void>;
  startMeeting: (meetingId: string) => Promise<void>;
  endMeeting: (meetingId: string) => Promise<void>;
  getActiveClassroomMeeting: (classroomId: string) => ScheduledMeeting | undefined;
  getUserAssignments: () => Assignment[];
}

// Create context
const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

// Create provider
export const ClassroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  // Load classrooms from local storage
  useEffect(() => {
    const storedClassrooms = localStorage.getItem('gyaan-classrooms');
    if (storedClassrooms) {
      setClassrooms(JSON.parse(storedClassrooms));
    }
    setLoading(false);
  }, []);

  // Save classrooms to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('gyaan-classrooms', JSON.stringify(classrooms));
  }, [classrooms]);

  // Create a new classroom
  const createClassroom = async (name: string, description: string): Promise<Classroom> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can create classrooms');

    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newClassroom: Classroom = {
      id: Math.random().toString(36).substring(2, 10),
      name,
      description,
      code,
      teacherId: user.id,
      teacherName: user.name,
      students: [],
      assignments: [],
      announcements: [],
      scheduledMeetings: []
    };
    
    setClassrooms(prev => [...prev, newClassroom]);
    return newClassroom;
  };

  // Join a classroom using a code
  const joinClassroom = async (code: string): Promise<boolean> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'student') throw new Error('Only students can join classrooms');
    
    const classroom = classrooms.find(c => c.code === code);
    if (!classroom) return false;
    
    // Check if student is already in the classroom
    if (classroom.students.includes(user.id)) return true;
    
    // Add student to the classroom
    const updatedClassroom = {
      ...classroom,
      students: [...classroom.students, user.id]
    };
    
    setClassrooms(prev => prev.map(c => c.id === classroom.id ? updatedClassroom : c));
    return true;
  };

  // Get a classroom by ID
  const getClassroomById = (id: string): Classroom | undefined => {
    return classrooms.find(c => c.id === id);
  };

  // Get classrooms for the current user
  const getClassroomsForUser = (): Classroom[] => {
    if (!user) return [];
    
    if (user.role === 'teacher') {
      return classrooms.filter(c => c.teacherId === user.id);
    } else {
      return classrooms.filter(c => c.students.includes(user.id));
    }
  };

  // Create an announcement
  const createAnnouncement = async (classroomId: string, title: string, content: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can create announcements');
    
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) throw new Error('Classroom not found');
    if (classroom.teacherId !== user.id) throw new Error('You are not the teacher of this classroom');
    
    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      content,
      date: new Date().toISOString(),
      classroomId
    };
    
    const updatedClassroom = {
      ...classroom,
      announcements: [...classroom.announcements, newAnnouncement]
    };
    
    setClassrooms(prev => prev.map(c => c.id === classroomId ? updatedClassroom : c));
  };

  // Create an assignment
  const createAssignment = async (
    classroomId: string, 
    title: string, 
    description: string, 
    dueDate: string
  ): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can create assignments');
    
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) throw new Error('Classroom not found');
    if (classroom.teacherId !== user.id) throw new Error('You are not the teacher of this classroom');
    
    const newAssignment: Assignment = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      description,
      dueDate,
      classroomId
    };
    
    const updatedClassroom = {
      ...classroom,
      assignments: [...classroom.assignments, newAssignment]
    };
    
    setClassrooms(prev => prev.map(c => c.id === classroomId ? updatedClassroom : c));
  };

  // Schedule a meeting
  const scheduleMeeting = async (
    classroomId: string, 
    title: string, 
    date: string, 
    time: string, 
    duration: number
  ): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can schedule meetings');
    
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) throw new Error('Classroom not found');
    if (classroom.teacherId !== user.id) throw new Error('You are not the teacher of this classroom');
    
    const newMeeting: ScheduledMeeting = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      date,
      time,
      duration,
      classroomId,
      isActive: false
    };
    
    const updatedClassroom = {
      ...classroom,
      scheduledMeetings: [...classroom.scheduledMeetings, newMeeting]
    };
    
    setClassrooms(prev => prev.map(c => c.id === classroomId ? updatedClassroom : c));
  };

  // Start a meeting
  const startMeeting = async (meetingId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can start meetings');
    
    setClassrooms(prev => {
      return prev.map(classroom => {
        const meeting = classroom.scheduledMeetings.find(m => m.id === meetingId);
        if (!meeting) return classroom;
        
        // Update meeting to active
        const updatedMeetings = classroom.scheduledMeetings.map(m => 
          m.id === meetingId ? { ...m, isActive: true } : m
        );
        
        return { ...classroom, scheduledMeetings: updatedMeetings };
      });
    });
  };

  // End a meeting
  const endMeeting = async (meetingId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'teacher') throw new Error('Only teachers can end meetings');
    
    setClassrooms(prev => {
      return prev.map(classroom => {
        const meeting = classroom.scheduledMeetings.find(m => m.id === meetingId);
        if (!meeting) return classroom;
        
        // Update meeting to inactive
        const updatedMeetings = classroom.scheduledMeetings.map(m => 
          m.id === meetingId ? { ...m, isActive: false } : m
        );
        
        return { ...classroom, scheduledMeetings: updatedMeetings };
      });
    });
  };

  // Get active meeting for a classroom
  const getActiveClassroomMeeting = (classroomId: string): ScheduledMeeting | undefined => {
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) return undefined;
    
    return classroom.scheduledMeetings.find(meeting => meeting.isActive);
  };

  // Get all assignments for the current user (student)
  const getUserAssignments = (): Assignment[] => {
    if (!user) return [];
    if (user.role !== 'student') return [];
    
    const userClassrooms = classrooms.filter(c => c.students.includes(user.id));
    return userClassrooms.flatMap(c => c.assignments);
  };

  return (
    <ClassroomContext.Provider value={{
      classrooms,
      loading,
      createClassroom,
      joinClassroom,
      getClassroomById,
      getClassroomsForUser,
      createAnnouncement,
      createAssignment,
      scheduleMeeting,
      startMeeting,
      endMeeting,
      getActiveClassroomMeeting,
      getUserAssignments,
    }}>
      {children}
    </ClassroomContext.Provider>
  );
};

// Custom hook to use the classroom context
export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (context === undefined) {
    throw new Error('useClassroom must be used within a ClassroomProvider');
  }
  return context;
};
