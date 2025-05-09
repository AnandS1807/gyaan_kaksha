
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { useClassroom } from '../../contexts/ClassroomContext';
import Layout from '../../components/Layout';

const JoinClassroom = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { joinClassroom } = useClassroom();
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setIsLoading(true);
    
    try {
      const success = await joinClassroom(code);
      if (success) {
        toast({
          title: "Success!",
          description: "You have successfully joined the classroom.",
        });
        navigate('/student');
      } else {
        toast({
          title: "Invalid code",
          description: "The classroom code is incorrect or doesn't exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error joining classroom:', error);
      toast({
        title: "Error",
        description: "An error occurred while joining the classroom.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/student')}
            className="mb-4"
          >
            &larr; Back to Dashboard
          </Button>

          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-t-lg">
              <CardTitle>Join a Classroom</CardTitle>
              <CardDescription className="text-saffron-light">
                Enter the classroom code provided by your teacher
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleJoin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Classroom Code</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code (e.g., AB123C)"
                    className="gyaan-input"
                    required
                  />
                  <p className="text-xs text-neutral">
                    Ask your teacher for the classroom code
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="gyaan-btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Joining...' : 'Join Classroom'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JoinClassroom;
