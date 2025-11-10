import Image from "next/image";
import { getInstructorList } from "../../lib/intructorList";
import MenuBar from "../../menu/nav/page";

// Import instructor data or fetch dynamically
const INSTRUCTORS = getInstructorList();

export default async function InstructorDetails(props) {
  const params = await props.params;
  const { name } = params;

  // Decode URI components if necessary to match data
  const decodedName = decodeURIComponent(name);
  const instructor = INSTRUCTORS.find((ins) => ins.name === decodedName);

  if (!instructor) {
    return <div>Instructor not found.</div>;
  }

  const totalHours = instructor.totalMinutes
    ? Math.floor(instructor.totalMinutes / 60)
    : null;
  const totalMinutes = instructor.totalMinutes && instructor.totalMinutes % 60;

  return (
    <div>
      <MenuBar isLogOut={true}></MenuBar>
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
        <Image
          src={instructor.avatar}
          alt={instructor.name}
          width={176}
          height={176}
          className="rounded mb-4 h-86 w-69 object-cover"
        />
        <h1 className="text-2xl font-bold mb-2">{instructor.name}</h1>
        <p className="mb-2">Topics: {instructor.topics.join(", ")}</p>
        {instructor.sessionCount && (
          <p className="mb-2">Sessions taken: {instructor.sessionCount}</p>
        )}
        <p className="mb-2">
          {`Total duration: ${
            totalHours ? `${totalHours} hrs` : "New to coach connect"
          }  ${totalMinutes ? `${totalMinutes} mins` : ""} `}
        </p>
        {instructor.linkedinProfile && (
          <a
            href={instructor.linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            LinkedIn Profile
          </a>
        )}
        {instructor.portfolio && (
          <a
            href={instructor.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-blue-600 underline"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
}
