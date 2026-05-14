import React, { useState } from "react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  FileText,
  Server,
  Layout,
  Lock,
  CheckCircle,
} from "lucide-react";

const Sidebar = ({ isLoggedIn, onSelect }) => {
  const [openSection, setOpenSection] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSection = (section) => {
    if (collapsed) return;
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubmenuClick = (section, submenu) => {
    if (collapsed) return;
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
    onSelect(submenu);
  };

  const navItems = [
    {
      id: 'mantranApiPrincipal',
      label: 'Mantran.API - Principal',
      icon: <Server size={18} />,
      subitems: [
        { id: 'mantran_api_gerar_token', label: 'Gerar Token' },
        { id: 'mantran_api_login', label: 'Arquitetura', private: true },
        { id: 'mantran_api_login_auth', label: 'Login', private: true },
        { id: 'mantran_api_empresa', label: 'Empresa', private: true },
        { id: 'mantran_api_filial', label: 'Filial', private: true },
      ]
    },
    {
      id: "sqlViews",
      label: "Mantran - SQL Views",
      icon: <Server size={18} />,
      subitems: [{ id: "section_buscar_dados_view", label: "Views" }],
    },
    {
      id: "leoMadeiras",
      label: "Web API Interfaces",
      icon: <Layout size={18} />,
      subitems: [
        { id: "section_consulta_pagina", label: "Consulta de NF e dados" },
        { id: "section_interfaces_saas", label: "Interfaces - SaaS" },
      ],
    },
    {
      id: "SignIn_SignOn",
      label: "Sign In Sign On",
      icon: <FileText size={18} />,
      subitems: [{ id: "section_tms_leo_web", label: "Integração SSO" }],
    },
    {
      id: "APINaderContacao",
      label: "Web API Cálculo de Frete",
      icon: <FileText size={18} />,
      subitems: [{ id: "section_api_nader_contacao", label: "Cotação" }],
    },
    {
      id: "APIDifaluxBaixaCTe",
      label: "Web API Conhecimento",
      icon: <FileText size={18} />,
      subitems: [{ id: "section_api_difalux_baixa_cte", label: "Baixa CTe" }],
    },
    {
      id: "LocalizeCargasRodoviario",
      label: "Web API",
      icon: <FileText size={18} />,
      subitems: [
        { id: "section_localize_cargas", label: "Localize Cargas Rodoviário" },
        { id: "section_mobile", label: "Web API Mobile" },
      ],
    },
  ];

  const servicesItems = [
    {
      id: "LeoMadeirasBaixarManifesto",
      label: "Mantran x RouteEasy",
      subitems: [{ id: "section_routeasy_manifesto", label: "RouteEasy" }],
    },
    {
      id: "leo_madeiras",
      label: "Leo Madeiras",
      subitems: [
        { id: "leo_nf", label: "Baixa_NF_Leo_Madeiras" },
        { id: "leo_auto", label: "Geracao_Automatica" },
      ],
    },
    {
      id: "shopee",
      label: "Shopee",
      subitems: [
        { id: "shopee_cte", label: "Shopee.Gerar_CTe" },
        { id: "shopee_multi", label: "CTe_MultiCTe" },
        { id: "shopee_envio", label: "Geracao Envio_Documentos" },
      ],
    },
    {
      id: "bandeirantes",
      label: "Bandeirantes",
      subitems: [
        {
          id: "bandeirantes_servico_mantran_vira_section",
          label: "Mantran.Servico Bandeirantes",
        },
      ],
    },
  ];

  const visibleSubitems = (subitems) =>
    subitems.filter((sub) => !sub.private || isLoggedIn);

  const renderNavList = (items, icon = null) =>
    items.map((item) => {
      const subs = visibleSubitems(item.subitems);
      if (subs.length === 0) return null;
      return (
        <li key={item.id}>
          <div
            onClick={() => toggleSection(item.id)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${openSection === item.id ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-3">
              {item.icon || icon}
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
            {openSection === item.id ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {openSection === item.id && (
            <ul className="mt-1 ml-9 space-y-1">
              {subs.map((sub) => (
                <li
                  key={sub.id}
                  onClick={() => handleSubmenuClick(item.id, sub.id)}
                  className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition-colors ${activeSubmenu === sub.id ? "bg-red-100 text-red-700 font-bold" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {sub.private
                    ? <Lock size={11} className="text-gray-400 shrink-0" />
                    : <CheckCircle size={11} className="text-green-500 shrink-0" />
                  }
                  {sub.label}
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto ${collapsed ? "w-20" : "w-72"}`}
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
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
              APIs
            </h2>
            <ul className="space-y-1">
              {renderNavList(navItems)}
            </ul>

            {isLoggedIn && (
              <div className="mt-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
                  Serviços
                </h2>
                <ul className="space-y-1">
                  {renderNavList(servicesItems, <Server size={18} />)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
