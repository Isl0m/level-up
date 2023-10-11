import { getEnrollments } from "@/lib/api/enrollment/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

export async function RecentEnrollments() {
  const enrollments = await getEnrollments();
  return (
    <div className="space-y-8">
      {enrollments.slice(0, 5).map((item) => (
        <div className="flex items-center" key={item.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={item.user.image || undefined}
              alt={item.user.name || undefined}
            />
            <AvatarFallback>{item.user.name?.[0] || undefined}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.user.name}</p>
            <p className="text-sm text-muted-foreground">{item.user.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +${Intl.NumberFormat().format(item.course.price || 0)}
          </div>
        </div>
      ))}
    </div>
  );
}
