import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface StepProps {
  number: number;
  title: string;
  subtitle?: string;
  message: string;
  sender?: string;
  recipient?: string;
}

export default function Step({
  number,
  title,
  subtitle,
  message,
  sender = "Simon @ Plain",
  recipient = "to you",
}: StepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="bg-black text-white rounded-md px-3 py-1 text-sm font-medium shadow" data-testid="step-number">
        {number}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground max-w-md">{subtitle}</p>}
      <Card className="bg-muted/20 w-full max-w-md shadow-sm">
        <CardContent className="p-4 flex gap-3 items-start">
          <Avatar className="h-8 w-8">
            <AvatarFallback>P.</AvatarFallback>
          </Avatar>
          <div className="text-left flex-1 space-y-1">
            <div className="text-sm">
              <span className="font-medium text-foreground">{sender}</span>{" "}
              <span className="text-muted-foreground">{recipient}</span>
            </div>
            <p className="font-semibold text-foreground">{message}</p>
            <div className="h-3 w-full bg-muted rounded-md blur-sm" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
