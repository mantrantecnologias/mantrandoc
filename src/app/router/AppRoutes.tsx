import { Route, Routes } from "react-router-dom";
import { paths } from "@shared/routes/paths";
import HomePage from "@app/pages/HomePage";

import MantranApiGerarTokenPage from "@pages/mantranApi/MantranApiGerarTokenPage";
import MantranApiArquiteturaPage from "@pages/mantranApi/MantranApiArquiteturaPage";
import MantranApiLoginAuthPage from "@pages/mantranApi/MantranApiLoginAuthPage";
import MantranApiEmpresaPage from "@pages/mantranApi/MantranApiEmpresaPage";
import MantranApiFilialPage from "@pages/mantranApi/MantranApiFilialPage";
import MantranApiVeiculoCarroceriaPage from "@pages/mantranApi/MantranApiVeiculoCarroceriaPage";
import MantranApiModeloVeiculoPage from "@pages/mantranApi/MantranApiModeloVeiculoPage";
import MantranApiEmbalagemPage from "@pages/mantranApi/MantranApiEmbalagemPage";
import MantranApiProdutoPage from "@pages/mantranApi/MantranApiProdutoPage";
import MantranApiRotaLivrePage from "@pages/mantranApi/MantranApiRotaLivrePage";
import MantranApiDafitiPage from "@pages/mantranApi/MantranApiDafitiPage";
import MantranApiCorretoraPage from "@pages/mantranApi/seguradora/MantranApiCorretoraPage";

import SqlViewsPage from "@pages/sqlViews/SqlViewsPage";
import LeoMadeirasApiPage from "@pages/leoMadeirasApi/LeoMadeirasApiPage";
import WebApiInterfacesPage from "@pages/leoMadeirasApi/WebApiInterfacesPage";
import SignInSignOnPage from "@pages/signInSignOn/SignInSignOnPage";
import WebApiCalculoFretePage from "@pages/webApiCalculoFrete/WebApiCalculoFretePage";
import WebApiConhecimentoPage from "@pages/webApiConhecimento/WebApiConhecimentoPage";
import LocalizeCargasRodoviarioPage from "@pages/webApi/LocalizeCargasRodoviarioPage";
import WebApiMobilePage from "@pages/webApi/WebApiMobilePage";

import RouteasyPage from "@pages/servicos/routeasy/RouteasyPage";
import LeoMadeirasBaixaNfPage from "@pages/servicos/leoMadeiras/LeoMadeirasBaixaNfPage";
import LeoMadeirasGeracaoAutomaticaPage from "@pages/servicos/leoMadeiras/LeoMadeirasGeracaoAutomaticaPage";
import ShopeeGerarCtePage from "@pages/servicos/shopee/ShopeeGerarCtePage";
import ShopeeMultiCtePage from "@pages/servicos/shopee/ShopeeMultiCtePage";
import ShopeeEnvioDocumentosPage from "@pages/servicos/shopee/ShopeeEnvioDocumentosPage";
import BandeirantesPage from "@pages/servicos/bandeirantes/BandeirantesPage";

/** Rotas de conteúdo, renderizadas dentro do layout (Header + Sidebar). */
function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />

      <Route path={paths.mantranApi.gerarToken} element={<MantranApiGerarTokenPage />} />
      <Route path={paths.mantranApi.arquitetura} element={<MantranApiArquiteturaPage />} />
      <Route path={paths.mantranApi.login} element={<MantranApiLoginAuthPage />} />
      <Route path={paths.mantranApi.empresa} element={<MantranApiEmpresaPage />} />
      <Route path={paths.mantranApi.filial} element={<MantranApiFilialPage />} />
      <Route path={paths.mantranApi.veiculoCarroceria} element={<MantranApiVeiculoCarroceriaPage />} />
      <Route path={paths.mantranApi.modeloVeiculo} element={<MantranApiModeloVeiculoPage />} />
      <Route path={paths.mantranApi.embalagem} element={<MantranApiEmbalagemPage />} />
      <Route path={paths.mantranApi.produto} element={<MantranApiProdutoPage />} />
      <Route path={paths.mantranApi.rotaLivre} element={<MantranApiRotaLivrePage />} />
      <Route path={paths.mantranApi.dafiti} element={<MantranApiDafitiPage />} />
      <Route path={paths.mantranApi.corretora} element={<MantranApiCorretoraPage />} />

      <Route path={paths.sqlViews} element={<SqlViewsPage />} />
      <Route path={paths.leoMadeirasApi} element={<LeoMadeirasApiPage />} />
      <Route path={paths.webApiInterfaces} element={<WebApiInterfacesPage />} />
      <Route path={paths.signInSignOn} element={<SignInSignOnPage />} />
      <Route path={paths.webApiCalculoFrete} element={<WebApiCalculoFretePage />} />
      <Route path={paths.webApiConhecimento} element={<WebApiConhecimentoPage />} />
      <Route path={paths.webApi.localizeCargas} element={<LocalizeCargasRodoviarioPage />} />
      <Route path={paths.webApi.mobile} element={<WebApiMobilePage />} />

      <Route path={paths.servicos.routeasy} element={<RouteasyPage />} />
      <Route path={paths.servicos.leoMadeiras.baixaNf} element={<LeoMadeirasBaixaNfPage />} />
      <Route path={paths.servicos.leoMadeiras.geracaoAutomatica} element={<LeoMadeirasGeracaoAutomaticaPage />} />
      <Route path={paths.servicos.shopee.gerarCte} element={<ShopeeGerarCtePage />} />
      <Route path={paths.servicos.shopee.multiCte} element={<ShopeeMultiCtePage />} />
      <Route path={paths.servicos.shopee.envioDocumentos} element={<ShopeeEnvioDocumentosPage />} />
      <Route path={paths.servicos.bandeirantes} element={<BandeirantesPage />} />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRoutes;
