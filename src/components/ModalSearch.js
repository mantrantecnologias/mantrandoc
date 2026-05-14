import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const ModalSearch = ({ isOpen, onClose, searchText, results, onNavigate, onSearchChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Search className="text-red-700" size={24} />
              Pesquisar Documentação
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite sua busca aqui..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-lg focus:border-red-700 focus:ring-4 focus:ring-red-100 transition-all outline-none"
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-400">Nenhum resultado encontrado para sua busca.</p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={res.key || `${res.page}__${res.sectionId}`}
                className="group p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 cursor-pointer transition-all"
                onClick={() => onNavigate(res)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                    {res.sectionTitle}
                  </h4>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full uppercase">
                    {res.page}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {res.preview}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-gray-50 text-center">
          <button 
            onClick={onClose}
            className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Fechar Busca
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSearch;

