
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '../../contexts/ClassroomContext';

interface AnnouncementCardProps {
  announcement: Announcement;
  classroomName?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement,
  classroomName
}) => {
  // Format date
  const formattedDate = new Date(announcement.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Check if announcement is new (within last 24 hours)
  const isNew = new Date().getTime() - new Date(announcement.date).getTime() < 24 * 60 * 60 * 1000;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              {announcement.title}
              {isNew && (
                <Badge className="ml-2 bg-saffron text-white hover:bg-saffron">
                  New
                </Badge>
              )}
            </CardTitle>
            {classroomName && (
              <p className="text-xs text-neutral-dark mt-1">
                {classroomName}
              </p>
            )}
          </div>
          <span className="text-sm text-neutral">
            {formattedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-dark whitespace-pre-wrap">
          {announcement.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
