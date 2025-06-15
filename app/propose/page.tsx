import TokenProposalForm from '@/components/token-proposal-form'

export default function ProposePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <div className="container mx-auto max-w-xl py-10">
          <TokenProposalForm />
        </div>
      </main>
    </div>
  )
}
