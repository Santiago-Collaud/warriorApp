"use client"
import { useNovedades } from "./hook/useNovedades";
import React, { useState } from 'react';
import { Novedades } from "@/interface/novedades";

const LabelNovedades = () => { 
  const { novedades, loading } = useNovedades();
  const [selectedNovedad, setSelectedNovedad] = useState<Novedades | null>(null);
  const [showModal, setShowModal] = useState(false);


  const handleOpenModal = (novedad: Novedades) => {
    setShowModal(true);
    setSelectedNovedad(novedad);
  }

  if (loading) {
    return <p className="text-center mt-4">Cargando novedades...</p>;
  }

  if(novedades.length === 0) {
    return <p className="text-center mt-4">A entrenar no hay nada nuevo</p>;
  }
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto m-5 bg-blue-50 p-4 rounded-lg shadow-lg">
      <h1 className="text-black">Novedades</h1>
      {novedades.map((novedad) => (
          <div
          key={novedad.id}
          className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row overflow-hidden"
        >
          {/* Imagen */}
          <div className="sm:w-[200px] w-full h-[150px] sm:h-auto flex-shrink-0">
            <img
              src={novedad.imagen_url}
              alt={novedad.titulo}
              className="w-full h-full object-cover"
            />
          </div>
          

          {/* Contenido */}
          <div className="p-4 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-bold text-black">{novedad.titulo}</h3>
              <p className="text-xs text-gray-600">
                {new Date(novedad.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal(novedad)}
              className="mt-2 text-blue-500 hover:text-blue-700 text-xs w-fit"
            >
              Ver más
            </button>
          </div>
        </div>
    ))}
    {/*pago modal*/}
      {showModal && selectedNovedad && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div
              className="modal-backdrop text-white flex justify-end cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              x
            </div>
            <h1 className="text-2xl font-bold mb-4 flex justify-center border-b-2 pb-2">
              {selectedNovedad.titulo}
            </h1>
            <h2 className="text-sm text-gray-600 mt-2 flex justify-end">
                {new Date(selectedNovedad.created_at).toLocaleDateString()}
              </h2> 

            {/* Imagen */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex justify-center sm:justify-start sm:w-1/2">
                  <img
                    src={selectedNovedad.imagen_url}
                    alt={selectedNovedad.titulo}
                    className="w-full h-auto max-w-xs sm:max-w-md rounded-lg border object-contain"
                  />
                </div>
                <div className="sm:w-1/2">
                  <h2 className="text-base sm:text-lg text-white">{selectedNovedad.descripcion}</h2>
                </div>
              </div>
            <div>
          </div>
        </div>
      </div>
      )}
</div>
  );
}

export default LabelNovedades;