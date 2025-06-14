import Step from "./step";

export interface StepData {
  title: string;
  subtitle?: string;
  message: string;
}

interface StepsProps {
  steps: StepData[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-12">
      {steps.map((step, idx) => (
        <Step
          key={idx}
          number={idx + 1}
          title={step.title}
          subtitle={step.subtitle}
          message={step.message}
        />
      ))}
    </div>
  );
}
export { Step };
