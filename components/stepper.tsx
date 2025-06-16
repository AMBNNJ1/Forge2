import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="flex items-center justify-between gap-2">
      {steps.map((label, index) => {
        const done = index < currentStep;
        const active = index === currentStep;
        return (
          <li key={label} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${done ? 'bg-primary text-primary-foreground border-primary' : active ? 'text-primary border-primary' : 'text-muted-foreground border-border'}`}
            >
              {done ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] ${done ? 'bg-primary' : 'bg-border'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
