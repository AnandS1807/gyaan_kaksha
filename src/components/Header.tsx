
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-light">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="h-10 w-10" />
          <span className="text-xl font-semibold text-saffron">Gyaan Kaksha</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="text-sm text-neutral-dark">
                <span>Welcome, </span>
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs ml-2 bg-saffron-light text-saffron-dark px-2 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate(user?.role === 'teacher' ? '/teacher' : '/student')}
                  className="text-neutral-dark hover:text-saffron hover:bg-saffron-light"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-neutral-dark hover:text-saffron hover:bg-saffron-light"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-neutral-dark hover:text-saffron hover:bg-saffron-light"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/register')}
                className="bg-saffron hover:bg-saffron-dark"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
