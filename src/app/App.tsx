import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "@shared/components/Header";
import Sidebar from "@shared/components/Sidebar";
import ModalSearch from "@shared/components/ModalSearch";
import { useAuth } from "@shared/hooks/useAuth";
import { paths } from "@shared/routes/paths";
import { documentationIndex, type SearchResult } from "@shared/data/searchIndex";
import LoginPage from "@app/pages/LoginPage";
import AppRoutes from "@app/router/AppRoutes";

function App() {
  const { isLoggedIn, isLoading, error, login } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const openSearchModal = () => setSearchOpen(true);
  const closeSearchModal = () => {
    setSearchOpen(false);
    setSearchText("");
    setSearchResults([]);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = text.toLowerCase();
    const results = documentationIndex
      .filter((item) => !item.private || isLoggedIn)
      .filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.page.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query),
      )
      .map((item) => ({
        key: `${item.path}__${item.hash ?? ""}`,
        path: item.path,
        hash: item.hash,
        page: item.page,
        label: item.label,
        preview: item.content.split(" ").slice(0, 12).join(" ") + "...",
      }));

    setSearchResults(results);
  };

  const handleNavigateFromSearch = (result: SearchResult) => {
    closeSearchModal();
    navigate(result.hash ? `${result.path}#${result.hash}` : result.path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onSearchClick={openSearchModal} isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path={paths.login} element={<LoginPage login={login} isLoading={isLoading} error={error} />} />
        <Route
          path="*"
          element={
            <div className="flex flex-1">
              <Sidebar isLoggedIn={isLoggedIn} />
              <main className="flex-1 overflow-y-auto">
                <AppRoutes />
              </main>
            </div>
          }
        />
      </Routes>

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
}

export default App;
