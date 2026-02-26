export default function ProjectCard({ title, location }) {
  return (
    <div className="bg-blue-900 p-6 rounded-xl shadow-lg hover:shadow-red-500/30 transition">
      <i className="fa-solid fa-building text-3xl text-red-500"></i>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="text-gray-400">{location}</p>
    </div>
  );
}