'use client'

import React, { createContext, useContext, useState } from 'react'

interface UiContextType {
  uiSignedIn: boolean
  setUiSignedIn: (value: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
}

const UiContext = createContext<UiContextType | undefined>(undefined)

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [uiSignedIn, setUiSignedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleUiSignedIn = () => {
    setUiSignedIn(current => !current)
  }
  const toggleMobileMenuOpen = () => {
    setMobileMenuOpen(current => !current)
  }

  const value = {
    uiSignedIn,
    setUiSignedIn,
    toggleUiSignedIn,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenuOpen,
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi() {
  const context = useContext(UiContext)
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider')
  }
  return context
}
