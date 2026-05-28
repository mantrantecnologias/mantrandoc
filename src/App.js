import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import ModalSearch from './components/ModalSearch';
import { Layout, Server } from 'lucide-react';

import MantranAPI_Login from './pages/MantranAPI_Principal/MantranAPI_Login';
import MantranAPI_Login_Auth from './pages/MantranAPI_Principal/MantranAPI_Login_Auth';
import MantranAPI_Empresa from './pages/MantranAPI_Principal/MantranAPI_Empresa';
import MantranAPI_GerarToken from './pages/MantranAPI_Principal/MantranAPI_GerarToken';
import MantranAPI_Filial from './pages/MantranAPI_Principal/MantranAPI_Filial';
import MantranAPI_VeiculoCarroceria from './pages/MantranAPI_Principal/MantranAPI_VeiculoCarroceria';
import MantranAPI_ModeloVeiculo from './pages/MantranAPI_Principal/MantranAPI_ModeloVeiculo';
import MantranAPI_Embalagem from './pages/MantranAPI_Principal/MantranAPI_Embalagem';
import MantranAPI_Produto from './pages/MantranAPI_Principal/MantranAPI_Produto';
import MantranAPI_RotaLivre from './pages/MantranAPI_Principal/MantranAPI_RotaLivre';
import MantranSQLViews from './pages/MantranSQLViews/MantranSQLViews';
import LeoMadeirasAPI from './pages/LeoMadeirasAPI/LeoMadeirasAPI';
import TMSLeoWeb from './pages/SignIn_SignOn/TMSLeoWeb';
import APINaderContacao from './pages/WebAPI.CalculoFrete/WebAPI.CalculoFreteNader';
import APIDifaluxBaixaCTE from './pages/WebAPI.Conhecimento/APIBaixaCTeDifalux';
import LeoMadeirasBaixarManifesto from './pages/Routeasy_Comprovei_Leo/LeoMadeiras_BaixarManifesto';
import LocalizeCargasRodoviario from './pages/LocalizeCargas_Rodoviario/LocalizeCargasRodoviario';
import WebAPIMobile from './pages/WebAPIMobile/WebAPIMobile';
import WebApiMantranInterfaces from './pages/LeoMadeirasAPI/InterfacesSaaS';

import BandeirantesServico from './pages/Servico/Bandeirantes/Bandeirantes_Servico_Mantran_Vira.js';
import LeoMadeirasServicoBaixaNf from './pages/Servico/LeoMadeiras/LeoMadeiras_Servico_BaixaNF.js';
import LeoMadeirasServicoGeracaoAutomatica from './pages/Servico/LeoMadeiras/LeoMadeiras_Servico_GeracaoAutomatica.js';
import ShopeeServicoGeracaoEnvioDocumentos from './pages/Servico/Shopee/Shopee_Servico_GeracaoEnvioDocumentos.js';
import ShopeeServicoGerarCTe from './pages/Servico/Shopee/Shopee_Servico_GerarCTe.js';
import ShopeeServicoMultiCTe from './pages/Servico/Shopee/Shopee_Servico_MultiCTe.js';



// ✅ ÍNDICE GERADO PARA A BUSCA NAS SECTIONS
import { documentationIndex } from "./data/searchIndex";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  const [selectedContent, setSelectedContent] = useState('');
  const [scrollToSection, setScrollToSection] = useState(null);

  // 🔍 CONTROLE DO MODAL
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const openSearchModal = () => setSearchOpen(true);
  const closeSearchModal = () => {
    setSearchOpen(false);
    setSearchText("");
    setSearchResults([]);
  };

  const handleLoginClick = () => {
    setShowLoginScreen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginScreen(false);
  };

  const handleSelect = (content, section = null) => {
    setSelectedContent(content);
    setScrollToSection(section);
  };

  // ================================================================
  // 🔍 FUNÇÃO DE BUSCA REAL — VARRE TODAS AS SECTIONS
  // ================================================================
  const handleSearchChange = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = text.toLowerCase();
    const results = [];

    documentationIndex.forEach((item) => {
      if (item.private && !isLoggedIn) return;

      const labelMatch = (item.label || "").toLowerCase().includes(query);
      const pageMatch = (item.page || "").toLowerCase().includes(query);
      const contentMatch = (item.content || "").toLowerCase().includes(query);

      if (labelMatch || pageMatch || contentMatch) {
        results.push({
          page: item.page,
          pageTitle: item.page,
          sectionId: item.id,
          id: item.id,
          key: `${item.page}__${item.id}`,
          sectionTitle: item.label,
          preview: item.content
            ? item.content.split(" ").slice(0, 12).join(" ") + "..."
            : item.label
        });
      }
    });

    setSearchResults(results);
  };

  // ================================================================
  // 🔍 AÇÃO AO CLICAR NO RESULTADO DO GRID
  // ================================================================
  const handleNavigateFromSearch = (result) => {
    setSearchOpen(false);
    setSearchText("");
    setSearchResults([]);
    setSelectedContent(result.page);
    setScrollToSection(result.id);
  };

  // ================================================================
  // RENDERIZAÇÃO DAS SUAS PÁGINAS
  // ================================================================
  const renderContent = () => {
    switch (selectedContent) {
      case 'Mantran.API - Principal':
        if (scrollToSection === 'mantran_api_gerar_token') return <MantranAPI_GerarToken scrollToSection={scrollToSection} />;
        if (scrollToSection === 'mantran_api_rota_livre') return <MantranAPI_RotaLivre scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_modelo_veiculo') return <MantranAPI_ModeloVeiculo scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_login_auth') return <MantranAPI_Login_Auth scrollToSection={scrollToSection} />;
        if (scrollToSection === 'mantran_api_empresa') return <MantranAPI_Empresa scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_filial') return <MantranAPI_Filial scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_veiculo_carroceria') return <MantranAPI_VeiculoCarroceria scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_carroceria') return <MantranAPI_VeiculoCarroceria scrollToSection={scrollToSection} />;
        if (scrollToSection === 'mantran_api_embalagem' || scrollToSection === 'embalagem_modelo' || scrollToSection === 'embalagem_buscar_lista' || scrollToSection === 'embalagem_incluir' || scrollToSection === 'embalagem_alterar' || scrollToSection === 'embalagem_excluir') return <MantranAPI_Embalagem scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        if (scrollToSection === 'mantran_api_produto' || scrollToSection === 'produto_modelo' || scrollToSection === 'produto_buscar_lista' || scrollToSection === 'produto_buscar' || scrollToSection === 'produto_incluir' || scrollToSection === 'produto_alterar' || scrollToSection === 'produto_excluir') return <MantranAPI_Produto scrollToSection={scrollToSection} onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')} />;
        return <MantranAPI_Login scrollToSection={scrollToSection} />;
      case 'Mantran - SQL Views':
        return <MantranSQLViews scrollToSection={scrollToSection} />;
      case 'Web API Interfaces':
        return <WebApiMantranInterfaces scrollToSection={scrollToSection} />;
      case 'Sign In Sign On':
        return <TMSLeoWeb scrollToSection={scrollToSection} />;
      case 'Web API Cálculo de Frete':
        return <APINaderContacao scrollToSection={scrollToSection} />;
      case 'Web API Conhecimento':
        return <APIDifaluxBaixaCTE scrollToSection={scrollToSection} />;
      case 'Mantran x RouteEasy':
        return <LeoMadeirasBaixarManifesto scrollToSection={scrollToSection} />;
      case 'Web API - Principal':
        return <LocalizeCargasRodoviario scrollToSection={scrollToSection} />;
      case 'WebAPIMobile':
        return <WebAPIMobile scrollToSection={scrollToSection} />;

      case 'Bandeirantes':
        return <BandeirantesServico scrollToSection={scrollToSection} />;
      case 'Leo Madeiras':
        if (scrollToSection === 'leo_nf') return <LeoMadeirasServicoBaixaNf scrollToSection={scrollToSection} />;
        if (scrollToSection === 'leo_auto') return <LeoMadeirasServicoGeracaoAutomatica scrollToSection={scrollToSection} />;
        return <LeoMadeirasServicoBaixaNf scrollToSection={scrollToSection} />;

      case 'Shopee':
        if (scrollToSection === 'shopee_cte') return <ShopeeServicoGerarCTe scrollToSection={scrollToSection} />;
        if (scrollToSection === 'shopee_multi') return <ShopeeServicoMultiCTe scrollToSection={scrollToSection} />;
        if (scrollToSection === 'shopee_envio') return <ShopeeServicoGeracaoEnvioDocumentos scrollToSection={scrollToSection} />;
        return <ShopeeServicoGerarCTe scrollToSection={scrollToSection} />;

      case 'Mantran.Leo_Madeiras.API':
        return <LeoMadeirasAPI scrollToSection={scrollToSection} />;

      default:
        return (
          <div className="flex flex-col items-center justify-center flex-1 p-12 text-center animate-fadeIn">
            <div className="max-w-3xl">
              <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                Bem-vindo à <span className="text-red-700">Central de Documentação</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Explore as guias na barra lateral para acessar informações detalhadas sobre nossas APIs e serviços técnicos.
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header
        doLogin={handleLoginClick}
        onSearchClick={openSearchModal}
        onSearchChange={handleSearchChange}
      />

      {showLoginScreen ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex flex-1">
          <Sidebar
            isLoggedIn={isLoggedIn}
            onSelect={(section) => {
              const sectionToPage = {
                'mantran_api_rota_livre': 'Mantran.API - Principal',
                'mantran_api_gerar_token': 'Mantran.API - Principal',
                'mantran_api_modelo_veiculo': 'Mantran.API - Principal',
                'modelo_veiculo_modelo': 'Mantran.API - Principal',
                'modelo_veiculo_buscar_lista': 'Mantran.API - Principal',
                'modelo_veiculo_incluir': 'Mantran.API - Principal',
                'modelo_veiculo_alterar': 'Mantran.API - Principal',
                'modelo_veiculo_excluir': 'Mantran.API - Principal',
                'mantran_api_login': 'Mantran.API - Principal',
                'mantran_api_login_auth': 'Mantran.API - Principal',
                'mantran_api_empresa': 'Mantran.API - Principal',
                'mantran_api_filial': 'Mantran.API - Principal',
                'mantran_api_veiculo_carroceria': 'Mantran.API - Principal',
                'mantran_api_carroceria': 'Mantran.API - Principal',
                'mantran_api_embalagem': 'Mantran.API - Principal',
                'embalagem_modelo': 'Mantran.API - Principal',
                'embalagem_buscar_lista': 'Mantran.API - Principal',
                'embalagem_incluir': 'Mantran.API - Principal',
                'embalagem_alterar': 'Mantran.API - Principal',
                'embalagem_excluir': 'Mantran.API - Principal',
                'mantran_api_produto': 'Mantran.API - Principal',
                'produto_modelo': 'Mantran.API - Principal',
                'produto_buscar_lista': 'Mantran.API - Principal',
                'produto_buscar': 'Mantran.API - Principal',
                'produto_incluir': 'Mantran.API - Principal',
                'produto_alterar': 'Mantran.API - Principal',
                'produto_excluir': 'Mantran.API - Principal',
                'section_buscar_dados_view': 'Mantran - SQL Views',
                'section_tms_leo_web': 'Sign In Sign On',
                'section_consulta_pagina': 'Mantran.Leo_Madeiras.API',
                'section_api_nader_contacao': 'Web API Cálculo de Frete',
                'section_api_difalux_baixa_cte': 'Web API Conhecimento',
                'section_routeasy_manifesto': 'Mantran x RouteEasy',
                'section_localize_cargas': 'Web API - Principal',
                'section_mobile': 'WebAPIMobile',
                'section_interfaces_saas': 'Web API Interfaces',
                'bandeirantes_servico_mantran_vira_section': 'Bandeirantes',
                'leo_nf': 'Leo Madeiras',
                'leo_auto': 'Leo Madeiras',
                'shopee_cte': 'Shopee',
                'shopee_multi': 'Shopee',
                'shopee_envio': 'Shopee'
              };

              if (sectionToPage[section]) {
                handleSelect(sectionToPage[section], section);
              } else {
                handleSelect(section);
              }
            }}
          />

          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      )}

      {/*MODAL DE PESQUISA */}
      <ModalSearch
        isOpen={searchOpen}
        onClose={closeSearchModal}
        searchText={searchText}
        results={searchResults}
        onNavigate={handleNavigateFromSearch}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default App;
