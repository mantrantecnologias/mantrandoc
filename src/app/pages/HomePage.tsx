import { Layout, Server } from "lucide-react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-12 text-center animate-fadeIn">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
          Bem-vindo à <span className="text-red-700">Central de Documentação</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Explore as guias na barra lateral para acessar informações detalhadas sobre nossas APIs e serviços
          técnicos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <Layout className="w-12 h-12 text-red-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">APIs</h3>
            <p className="text-gray-500">Consulte endpoints, parâmetros e exemplos de integração de alto nível.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <Server className="w-12 h-12 text-red-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Serviços</h3>
            <p className="text-gray-500">Documentação técnica sobre serviços de retaguarda e integração de sistemas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
