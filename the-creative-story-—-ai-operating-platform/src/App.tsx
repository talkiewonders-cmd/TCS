/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Header } from './components/Header';
import { CommandCenterView } from './components/CommandCenter/CommandCenterView';
import { CRMView } from './components/CRM/CRMView';
import { Client360View } from './components/Clients/Client360View';
import { ProjectControlView } from './components/Projects/ProjectControlView';
import { ShootManagerView } from './components/Shoots/ShootManagerView';
import { BookingCalendarView } from './components/Calendar/BookingCalendarView';
import { TeamProfilesView } from './components/Team/TeamProfilesView';
import { KPIEngineView } from './components/KPIEngine/KPIEngineView';
import { FinanceView } from './components/Finance/FinanceView';
import { AIIntelligenceView } from './components/AIIntelligence/AIIntelligenceView';
import { SpecificationHubView } from './components/SpecificationHub/SpecificationHubView';

const MainContent: React.FC = () => {
  const { activeScreen } = usePlatform();

  return (
    <main className="max-w-[1720px] mx-auto px-4 sm:px-6 pt-6">
      {activeScreen === 'command-center' && <CommandCenterView />}
      {activeScreen === 'crm' && <CRMView />}
      {activeScreen === 'clients' && <Client360View />}
      {activeScreen === 'projects' && <ProjectControlView />}
      {activeScreen === 'shoots' && <ShootManagerView />}
      {activeScreen === 'calendar' && <BookingCalendarView />}
      {activeScreen === 'team' && <TeamProfilesView />}
      {activeScreen === 'kpi' && <KPIEngineView />}
      {activeScreen === 'finance' && <FinanceView />}
      {activeScreen === 'ai' && <AIIntelligenceView />}
      {activeScreen === 'spec-hub' && <SpecificationHubView />}
    </main>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <div className="min-h-screen bg-[#0a0b0d] text-[#e1e7f0] font-sans antialiased selection:bg-[#e50914] selection:text-white">
        <Header />
        <MainContent />
      </div>
    </PlatformProvider>
  );
}
