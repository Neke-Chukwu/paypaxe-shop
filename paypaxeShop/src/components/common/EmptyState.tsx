const EmptyState = ({ title, description, cta }: { title: string; description: string; cta?: React.ReactNode }) => (
  <div className="text-center py-16">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-muted-foreground mb-4">{description}</p>
    {cta}
  </div>
);

export default EmptyState;
