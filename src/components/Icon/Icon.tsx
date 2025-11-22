import * as FA from "react-icons/fa";

export default function Icon({ name }: { name: keyof typeof FA }) {
  const Component = FA[name];
  if (!Component) return <span>Icon not found</span>;

  return <Component size={24} />;
}
