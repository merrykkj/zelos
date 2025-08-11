'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelecao = (opcao) => {
    if (opcao === 'sair') {
      alert('Logout aqui!') // ou faça sua ação de logout
    } else {
      setActiveTab(opcao)
    }
    setIsOpen(false)
  }

  return (
    <>
      <hr className="bg-red-500 h-5" />
      <header className="bg-white shadow-md flex justify-between items-center px-8 h-[60px] text-[1.1rem] font-medium relative">
        <div className="text-[#800000] font-bold" aria-live="polite">
          Olá, <strong>Funcionário</strong>! Bem-vindo(a) ao sistema.
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer relative select-none"
          tabIndex={0}
          onClick={() => setIsOpen((prev) => !prev)}
          ref={dropdownRef}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') setIsOpen((prev) => !prev)
          }}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="Menu do usuário"
        >
          <div
            role="img"
            aria-label="Foto do funcionário"
            className="w-10 h-10 rounded-full bg-[url('https://i.pravatar.cc/150?img=5')] bg-cover bg-center shadow-md shadow-[#b30000]/60"
          ></div>
          <div className="font-semibold text-[#b30000]">Maria Silva</div>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50"
                role="menu"
              >
                <li
                  onClick={() => handleSelecao('info')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelecao('info')
                  }}
                >
                  Informações
                </li>
                <li
                  onClick={() => handleSelecao('sair')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelecao('sair')
                  }}
                >
                  Sair
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
