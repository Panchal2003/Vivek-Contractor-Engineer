export default function Workforce() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white px-6 py-20">

      <h1 className="text-4xl font-bold text-center mb-16">Our Workforce Strength</h1>

      <div className="grid md:grid-cols-3 gap-10 text-center">

        <div className="bg-white/10 p-8 rounded-xl">
          <i className="fa-solid fa-people-group text-5xl text-red-500"></i>
          <h3 className="mt-4 text-2xl font-bold">400–500 Workers</h3>
          <p className="text-gray-300 mt-2">Skilled & experienced field staff.</p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl">
          <i className="fa-solid fa-user-tie text-5xl text-blue-400"></i>
          <h3 className="mt-4 text-2xl font-bold">Site Engineers</h3>
          <p className="text-gray-300 mt-2">Professional supervision team.</p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl">
          <i className="fa-solid fa-hard-hat text-5xl text-yellow-400"></i>
          <h3 className="mt-4 text-2xl font-bold">Safety Standards</h3>
          <p className="text-gray-300 mt-2">Zero indiscipline record.</p>
        </div>

      </div>
    </div>
  );
}