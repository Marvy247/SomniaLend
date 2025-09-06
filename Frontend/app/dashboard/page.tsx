"use client";

import React from 'react';
import DashboardScreen from '../components/DashboardScreen';
import AppLayout from '../components/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[var(--background)]">
        <DashboardScreen />
      </div>
    </AppLayout>
  );
}
