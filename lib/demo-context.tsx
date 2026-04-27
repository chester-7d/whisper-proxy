'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type DemoRole = 'customer' | 'secretary' | 'mechanic' | 'foreman'
export type DemoMechanic = 'dusty' | 'layton' | 'matt' | 'tyler'

interface DemoContextType {
  role: DemoRole
  setRole: (r: DemoRole) => void
  mechanic: DemoMechanic
  setMechanic: (m: DemoMechanic) => void
}

const DemoContext = createContext<DemoContextType>({
  role: 'customer',
  setRole: () => {},
  mechanic: 'dusty',
  setMechanic: () => {},
})

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole>('customer')
  const [mechanic, setMechanic] = useState<DemoMechanic>('dusty')
  return (
    <DemoContext.Provider value={{ role, setRole, mechanic, setMechanic }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  return useContext(DemoContext)
}
