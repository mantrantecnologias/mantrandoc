import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, ChevronRight, FileText, Server, Layout, Lock, CheckCircle } from "lucide-react";
import { paths } from "@shared/routes/paths";

type NavLeaf = { kind: "leaf"; path: string; label: string; private?: boolean };
type NavNested = { kind: "nested"; path: string; label: string; private?: boolean; children: NavLeaf[] };
type NavGroup = { kind: "group"; key: string; label: string; items: NavLeaf[] };
type NavEntry = NavLeaf | NavNested | NavGroup;
type NavSection = { id: string; label: string; icon: ReactNode; entries: NavEntry[] };

const leaf = (path: string, label: string, opts?: { private?: boolean }): NavLeaf => ({
  kind: "leaf",
  path,
  label,
  private: opts?.private,
});

const navItems: NavSection[] = [
  {
    id: "mantranApiPrincipal",
    label: "Mantran.Applications - API",
    icon: <Server size={18} />,
    entries: [
      {
        kind: "group",
        key: "veiculo",
        label: "Veículo",
        items: [
          leaf(paths.mantranApi.veiculoCarroceria, "Carroceria"),
          leaf(paths.mantranApi.modeloVeiculo, "Modelo de Veículo"),
        ],
      },
      {
        kind: "group",
        key: "produto",
        label: "Produto",
        items: [leaf(paths.mantranApi.embalagem, "Embalagem"), leaf(paths.mantranApi.produto, "Produto")],
      },
      {
        kind: "group",
        key: "integracoes",
        label: "Integrações",
        items: [leaf(paths.mantranApi.rotaLivre, "Rota Livre")],
      },
      {
        kind: "nested",
        path: paths.mantranApi.corretora,
        label: "Corretora",
        children: [
          leaf(paths.mantranApi.seguradoraCliente, "Seguradora – Cliente (legado)"),
          leaf(paths.mantranApi.seguradoraGrupo, "Seguradora – Grupo (legado)"),
          leaf(paths.mantranApi.seguradoraPercurso, "Seguradora – Percurso (legado)"),
          leaf(paths.mantranApi.seguradoraProduto, "Seguradora – Produto (legado)"),
          leaf(paths.mantranApi.seguradoraUrbano, "Seguradora – Urbano (legado)"),
        ],
      },
      leaf(paths.mantranApi.arquitetura, "Arquitetura", { private: true }),
      leaf(paths.mantranApi.login, "Login", { private: true }),
      leaf(paths.mantranApi.empresa, "Empresa", { private: true }),
      leaf(paths.mantranApi.filial, "Filial", { private: true }),
    ],
  },
  {
    id: "sqlViews",
    label: "Mantran - SQL Views",
    icon: <Server size={18} />,
    entries: [leaf(paths.sqlViews, "Views")],
  },
  {
    id: "leoMadeiras",
    label: "Web API Interfaces",
    icon: <Layout size={18} />,
    entries: [leaf(paths.leoMadeirasApi, "Consulta de NF e dados"), leaf(paths.webApiInterfaces, "Interfaces - SaaS")],
  },
  {
    id: "SignIn_SignOn",
    label: "Sign In Sign On",
    icon: <FileText size={18} />,
    entries: [leaf(paths.signInSignOn, "Integração SSO")],
  },
  {
    id: "APINaderContacao",
    label: "Web API Cálculo de Frete",
    icon: <FileText size={18} />,
    entries: [leaf(paths.webApiCalculoFrete, "Cotação")],
  },
  {
    id: "APIDifaluxBaixaCTe",
    label: "Web API Conhecimento",
    icon: <FileText size={18} />,
    entries: [leaf(paths.webApiConhecimento, "Baixa CTe")],
  },
  {
    id: "LocalizeCargasRodoviario",
    label: "Web API",
    icon: <FileText size={18} />,
    entries: [
      leaf(paths.webApi.localizeCargas, "Localize Cargas Rodoviário"),
      leaf(paths.webApi.mobile, "Web API Mobile"),
    ],
  },
];

const servicesItems: NavSection[] = [
  {
    id: "LeoMadeirasBaixarManifesto",
    label: "Mantran x RouteEasy",
    icon: <Server size={18} />,
    entries: [leaf(paths.servicos.routeasy, "RouteEasy")],
  },
  {
    id: "leo_madeiras",
    label: "Leo Madeiras",
    icon: <Server size={18} />,
    entries: [
      leaf(paths.servicos.leoMadeiras.baixaNf, "Baixa_NF_Leo_Madeiras"),
      leaf(paths.servicos.leoMadeiras.geracaoAutomatica, "Geracao_Automatica"),
    ],
  },
  {
    id: "shopee",
    label: "Shopee",
    icon: <Server size={18} />,
    entries: [
      leaf(paths.servicos.shopee.gerarCte, "Shopee.Gerar_CTe"),
      leaf(paths.servicos.shopee.multiCte, "CTe_MultiCTe"),
      leaf(paths.servicos.shopee.envioDocumentos, "Geracao Envio_Documentos"),
    ],
  },
  {
    id: "bandeirantes",
    label: "Bandeirantes",
    icon: <Server size={18} />,
    entries: [leaf(paths.servicos.bandeirantes, "Mantran.Servico Bandeirantes")],
  },
];

type SidebarProps = {
  isLoggedIn: boolean;
};

function Sidebar({ isLoggedIn }: SidebarProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSection = (sectionId: string) => {
    if (collapsed) return;
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const goTo = (path: string) => {
    if (collapsed) return;
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const visibleLeaves = (leaves: NavLeaf[]) => leaves.filter((item) => !item.private || isLoggedIn);

  const renderLeaf = (item: NavLeaf) => (
    <li
      key={item.path}
      onClick={() => goTo(item.path)}
      className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition-colors ${
        isActive(item.path) ? "bg-red-100 text-red-700 font-bold" : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      {item.private ? (
        <Lock size={11} className="text-gray-400 shrink-0" />
      ) : (
        <CheckCircle size={11} className="text-green-500 shrink-0" />
      )}
      {item.label}
    </li>
  );

  const renderEntry = (entry: NavEntry) => {
    if (entry.kind === "group") {
      return (
        <li key={entry.key}>
          <div
            onClick={() => setOpenGroup(openGroup === entry.key ? null : entry.key)}
            className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition-colors font-semibold ${
              openGroup === entry.key ? "text-red-700" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {openGroup === entry.key ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
            {entry.label}
          </div>
          {openGroup === entry.key && <ul className="ml-4 space-y-1">{entry.items.map(renderLeaf)}</ul>}
        </li>
      );
    }

    if (entry.kind === "nested") {
      const visibleChildren = visibleLeaves(entry.children);
      return (
        <li key={entry.path}>
          <div
            onClick={() => goTo(entry.path)}
            className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition-colors ${
              isActive(entry.path) ? "bg-red-100 text-red-700 font-bold" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {entry.private ? (
              <Lock size={11} className="text-gray-400 shrink-0" />
            ) : (
              <CheckCircle size={11} className="text-green-500 shrink-0" />
            )}
            {entry.label}
          </div>
          {visibleChildren.length > 0 && <ul className="mt-1 ml-6 space-y-1">{visibleChildren.map(renderLeaf)}</ul>}
        </li>
      );
    }

    return renderLeaf(entry);
  };

  const renderNavList = (sections: NavSection[]) =>
    sections.map((section) => {
      const visibleEntries = section.entries.filter((entry) => {
        if (entry.kind === "group") return true;
        if (entry.kind === "nested") return true;
        return !entry.private || isLoggedIn;
      });
      if (visibleEntries.length === 0) return null;

      return (
        <li key={section.id}>
          <div
            onClick={() => toggleSection(section.id)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              openSection === section.id ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {section.icon}
              <span className="font-semibold text-sm">{section.label}</span>
            </div>
            {openSection === section.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {openSection === section.id && <ul className="mt-1 ml-9 space-y-1">{visibleEntries.map(renderEntry)}</ul>}
        </li>
      );
    });

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="p-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 mb-4"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>

        {!collapsed && (
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">APIs</h2>
            <ul className="space-y-1">{renderNavList(navItems)}</ul>

            {isLoggedIn && (
              <div className="mt-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">Serviços</h2>
                <ul className="space-y-1">{renderNavList(servicesItems)}</ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
