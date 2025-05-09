
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { useClassroom } from '../../contexts/ClassroomContext';
import Layout from '../../components/Layout';

const CreateClassroom = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createClassroom } = useClassroom();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLoading(true);
    
    try {
      const newClassroom = await createClassroom(name, description);
      toast({
        title: "Classroom created!",
        description: `Your new classroom "${name}" has been created. Your classroom code is: ${newClassroom.code}`,
      });
      navigate('/teacher');
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast({
        title: "Error",
        description: "An error occurred while creating the classroom.",
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
            onClick={() => navigate('/teacher')}
            className="mb-4"
          >
            &larr; Back to Dashboard
          </Button>

          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-t-lg">
              <CardTitle>Create a New Classroom</CardTitle>
              <CardDescription className="text-saffron-light">
                Design your virtual learning space
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Classroom Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Mathematics 101"
                    className="gyaan-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what students will learn in this classroom"
                    className="gyaan-input min-h-24"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="gyaan-btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Classroom'}
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

export default CreateClassroom;
