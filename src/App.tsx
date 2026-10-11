/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SmartOrderScreen } from './components/SmartOrderScreen';
import { LiveVisitScreen } from './components/LiveVisitScreen';
import { CommonGroundScreen } from './components/CommonGroundScreen';
import { CommunityCirclesScreen } from './components/CommunityCirclesScreen';
import { BaristaCommandScreen } from './components/BaristaCommandScreen';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ArticleModal } from './components/ArticleModal';
import { WaveModal } from './components/WaveModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useCafe();

  return (
    <main className="w-full pt-20 bg-[#fcf9f4] min-h-[calc(100vh-80px)]">
      {activeTab === 'smart-order' && <SmartOrderScreen />}
      {activeTab === 'common-ground' && <CommonGroundScreen />}
      {activeTab === 'community-circles' && <CommunityCirclesScreen />}
      {activeTab === 'live-visit' && <LiveVisitScreen />}
      {activeTab === 'barista-command' && <BaristaCommandScreen />}

      {/* Global Interactive Modals & Overlays */}
      <ProfileModal />
      <SettingsModal />
      <CheckoutModal />
      <ArticleModal />
      <WaveModal />
      <ToastContainer />
    </main>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <div className="min-h-screen flex flex-col bg-[#fcf9f4] text-[#1c1c19] selection:bg-[#ffdbd0] selection:text-[#3a0a00]">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CafeProvider>
  );
}
