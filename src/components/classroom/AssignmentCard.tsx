
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '../../contexts/ClassroomContext';

interface AssignmentCardProps {
  assignment: Assignment;
  classroomName?: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment,
  classroomName
}) => {
  // Calculate if assignment is due soon (within 2 days)
  const dueDate = new Date(assignment.dueDate);
  const now = new Date();
  const differenceInDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  const isOverdue = differenceInDays < 0;
  const isDueSoon = differenceInDays >= 0 && differenceInDays <= 2;
  
  // Format due date
  const formattedDueDate = new Date(assignment.dueDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`h-2 ${isOverdue ? 'bg-red-500' : isDueSoon ? 'bg-yellow-500' : 'bg-purple'}`} />
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{assignment.title}</CardTitle>
          <Badge 
            variant={isOverdue ? "destructive" : isDueSoon ? "outline" : "secondary"}
            className={isOverdue ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                    isDueSoon ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100" : 
                    "bg-purple-light text-purple-dark hover:bg-purple-light"}
          >
            {isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'Upcoming'}
          </Badge>
        </div>
        {classroomName && (
          <p className="text-xs text-neutral-dark mt-1">
            {classroomName}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-dark mb-4 line-clamp-3">
          {assignment.description}
        </p>
        <div className="flex items-center text-sm">
          <span className="font-medium">Due: </span>
          <span className={`ml-2 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-neutral-dark'}`}>
            {formattedDueDate}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
