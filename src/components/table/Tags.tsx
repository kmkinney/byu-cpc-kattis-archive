import { RouterOutputs } from "~/utils/api";

type Tag = RouterOutputs["problem"]["allProblems"][number]["tags"][number];
const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="bg-primary-foreground text-primary mb-2 mr-2 rounded-full px-2 py-1 text-xs"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};
export default Tags;
