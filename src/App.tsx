
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ClassroomProvider } from "./contexts/ClassroomContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import ClassroomDetails from "./pages/ClassroomDetails";
import JoinClassroom from "./pages/student/JoinClassroom";
import CreateClassroom from "./pages/teacher/CreateClassroom";
import Meeting from "./pages/Meeting";
import Whiteboard from "./components/meeting/Whiteboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ClassroomProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
              <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/student/join" element={<ProtectedRoute><JoinClassroom /></ProtectedRoute>} />
              <Route path="/teacher/create" element={<ProtectedRoute><CreateClassroom /></ProtectedRoute>} />
              <Route path="/classroom/:id" element={<ProtectedRoute><ClassroomDetails /></ProtectedRoute>} />
              <Route path="/meeting/:id" element={<ProtectedRoute><Meeting /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ClassroomProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
