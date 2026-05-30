import { Link, Outlet, NavLink } from "react-router-dom"

function MainLayout() {
    return (
        <div className="h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
            <header className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-700">

                {/* Esquerda: Logo e Navegação */}
                <div className="flex items-center gap-8">
                    {/* Logo simulado */}
                    <div className="flex items-center gap-2 text-xl font-bold text-white">
                        <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                        MyJobFlow
                    </div>

                    {/* Links de Navegação */}
                    <nav className="flex gap-6 text-sm font-medium text-slate-400">
                        {/* O link ativo geralmente tem cor diferente e uma bordinha embaixo */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white border-b-2 border-blue-500 pb-1"
                                    : "hover:text-white transition-colors pb-1"
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/configurations"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white border-b-2 border-blue-500 pb-1"
                                    : "hover:text-white transition-colors pb-1"
                            }
                        >
                            Configurações
                        </NavLink>
                    </nav>
                </div>

                {/* Direita: Botões e Perfil */}
                <div className="flex items-center gap-6">
                    <Link to="/new-job" className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-slate-600 rounded-md hover:bg-slate-700 transition-colors">
                        Adicionar Vaga
                    </Link>
                </div>

            </header>

            <main className="flex-1 overflow-hidden flex flex-col">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout