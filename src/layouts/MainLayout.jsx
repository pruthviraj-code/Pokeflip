import React from 'react'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-(--bg-main) text-(--text-primary)">
      {children}
    </div>
  );
}