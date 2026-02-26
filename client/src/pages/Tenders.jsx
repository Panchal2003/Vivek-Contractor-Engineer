export default function Tenders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white px-6 py-20">

      <h1 className="text-4xl font-bold text-center mb-16">
        Government & Private Tenders
      </h1>

      <div className="max-w-4xl mx-auto bg-white/10 p-10 rounded-2xl border border-white/20">

        <p className="text-gray-300 text-lg">
          VCE Infra actively participates in Government and Private sector tenders 
          across India for:
        </p>

        <ul className="mt-6 space-y-4 text-gray-300">
          <li><i className="fa-solid fa-check text-red-500 mr-2"></i>Sewer Line Maintenance</li>
          <li><i className="fa-solid fa-check text-red-500 mr-2"></i>Water Treatment Plants</li>
          <li><i className="fa-solid fa-check text-red-500 mr-2"></i>Fire Line Installation</li>
          <li><i className="fa-solid fa-check text-red-500 mr-2"></i>Heavy Drilling & Excavation</li>
        </ul>

      </div>
    </div>
  );
}