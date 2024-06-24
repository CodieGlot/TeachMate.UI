import { useRef } from "react";

export function AdminDashboard() {

  const mainContentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type

  return (
    <body>
      <div ref={mainContentRef} className="ml-16 bg-gray-100 h-screen fixed w-full lg:w-4/5 transition-all duration-200 ease-in-out">
        {/* Search */}
        <div className="flex items-center w-full mt-2 p-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-search text-gray-200"></i>
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
              placeholder="Buscar..."
            />
          </div>
        </div>

        {/* Session */}
        <div className="grid grid-cols-2 gap-4 mt-2 p-4">


          {/* Content 1 */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">Autorizaciones Pendientes</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Foto</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nombre</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    <img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" />
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">Juan Pérez</td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">Administrador</td>
                </tr>
                {/* Añade más filas aquí como la anterior para cada autorización pendiente */}
              </tbody>
            </table>
          </div>

          {/* Content 2 */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">Transacciones</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nombre</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Fecha</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">Carlos Sánchez</td>
                  <td className="py-4 px-6 border-b border-grey-light">27/07/2023</td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">$1500</td>
                </tr>
                {/* Añade más filas aquí como la anterior para cada transacción */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body >
  );

}