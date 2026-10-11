import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  MenuItem,
  CartItem,
  Order,
  Patron,
  Happening,
  RoomTopic,
  UserProfile,
  PulseFeedback,
} from '../types';
import {
  initialUserProfile,
  menuItems,
  initialActiveOrder,
  initialBaristaQueue,
  patronsList,
  happeningsList,
  roomTopicsList,
  pulseFeedbacks,
  serendipitySparks,
  communityCirclesList,
  interestTagsList,
} from '../data/dummyData';
import { CommunityCircle, InterestTag } from '../types';

export type TabKey = 'smart-order' | 'common-ground' | 'community-circles' | 'live-visit' | 'barista-command';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'gemini';
}

interface CafeContextType {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  userProfile: UserProfile;
  updateUserProfile: (updater: Partial<UserProfile>) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isArticleOpen: boolean;
  setIsArticleOpen: (open: boolean) => void;
  isWaveOpen: boolean;
  setIsWaveOpen: (open: boolean) => void;
  waveTarget: string;
  setWaveTarget: (name: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, milk?: 'Oat' | 'Whole' | 'Almond' | 'None', sweetness?: '0%' | '50%' | '100%') => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  placeOrder: (notes?: string) => void;
  
  // Active Order & Live Brew
  activeOrder: Order;
  flavorFeedback: string | null;
  flavorFeedbackMessage: { title: string; desc: string } | null;
  submitFlavorFeedback: (key: 'perfect' | 'sweet' | 'temp' | 'punch') => void;
  dismissFlavorFeedback: () => void;
  tableServiceMessage: string | null;
  sendTableServiceRequest: (service: string) => void;
  
  // Audio Player
  isPlayingAudio: boolean;
  toggleAudio: () => void;
  
  // Barista Command
  baristaQueue: Order[];
  completeBaristaOrder: (orderId: string) => void;
  holdBaristaOrder: (orderId: string) => void;
  isRushMode: boolean;
  toggleRushMode: () => void;
  pulseList: PulseFeedback[];
  handlePulseAction: (id: string) => void;
  shiftMentorAcknowledged: boolean;
  acknowledgeShiftMentor: () => void;
  
  // Common Ground
  presenceBroadcast: boolean;
  togglePresenceBroadcast: () => void;
  sparkIndex: number;
  nextSpark: () => void;
  currentSpark: { title: string; desc: string };
  happenings: Happening[];
  toggleHappeningRsvp: (id: string) => void;
  roomTopics: RoomTopic[];
  addRoomTopic: (question: string) => void;
  toggleResonateTopic: (id: string) => void;
  patrons: Patron[];
  
  // Community Circles
  communityCircles: CommunityCircle[];
  interestTags: InterestTag[];
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  activeQrCircle: CommunityCircle | null;
  openCircleQrModal: (circle: CommunityCircle) => void;
  ephemeralHandle: string;
  regenerateEphemeralHandle: () => void;
  joinCircle: (circleId: string) => void;
  proposeAdHocCircle: (topic: string, location: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'gemini') => void;
  removeToast: (id: string) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('smart-order');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [isWaveOpen, setIsWaveOpen] = useState(false);
  const [waveTarget, setWaveTarget] = useState('Elena (Window Bar)');

  // Cart: initial bespoke cup pre-loaded
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-cortado',
      menuItem: menuItems[0],
      quantity: 1,
      milk: 'Oat',
      sweetness: '50%',
    },
  ]);

  // Active Order & Live Brew
  const [activeOrder, setActiveOrder] = useState<Order>(initialActiveOrder);
  const [flavorFeedback, setFlavorFeedback] = useState<string | null>(null);
  const [flavorFeedbackMessage, setFlavorFeedbackMessage] = useState<{ title: string; desc: string } | null>(null);
  const [tableServiceMessage, setTableServiceMessage] = useState<string | null>(null);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Barista Command Queue
  const [baristaQueue, setBaristaQueue] = useState<Order[]>(initialBaristaQueue);
  const [isRushMode, setIsRushMode] = useState(false);
  const [pulseList, setPulseList] = useState<PulseFeedback[]>(pulseFeedbacks);
  const [shiftMentorAcknowledged, setShiftMentorAcknowledged] = useState(false);

  // Common Ground
  const [presenceBroadcast, setPresenceBroadcast] = useState(true);
  const [sparkIndex, setSparkIndex] = useState(0);
  const [happenings, setHappenings] = useState<Happening[]>(happeningsList);
  const [roomTopics, setRoomTopics] = useState<RoomTopic[]>(roomTopicsList);
  const [patrons] = useState<Patron[]>(patronsList);

  // Community Circles
  const [communityCircles, setCommunityCircles] = useState<CommunityCircle[]>(communityCirclesList);
  const [interestTags, setInterestTags] = useState<InterestTag[]>(interestTagsList);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [activeQrCircle, setActiveQrCircle] = useState<CommunityCircle | null>(communityCirclesList[0]);
  const [ephemeralHandle, setEphemeralHandle] = useState('Amber Siphon #19');

  const handlesList = [
    'Amber Siphon #19',
    'Obsidian Pour #42',
    'Velvet Crema #07',
    'Ceramic Dripper #88',
    'Silver Tamper #31',
  ];

  const regenerateEphemeralHandle = () => {
    const nextHandle = handlesList[(Math.floor(Math.random() * handlesList.length))];
    setEphemeralHandle(nextHandle);
    showToast(`New 4-hr Zero-Knowledge Token generated: ${nextHandle}`, 'gemini');
  };

  const openCircleQrModal = (circle: CommunityCircle) => {
    setActiveQrCircle(circle);
    setIsQrModalOpen(true);
  };

  const joinCircle = (circleId: string) => {
    setCommunityCircles((prev) =>
      prev.map((c) => {
        if (c.id === circleId) {
          const nextJoined = !c.joined;
          showToast(
            nextJoined
              ? `Joined "${c.title}" with anonymous pass ${ephemeralHandle}`
              : `Left "${c.title}"`,
            'success'
          );
          return { ...c, joined: nextJoined };
        }
        return c;
      })
    );
  };

  const proposeAdHocCircle = (topic: string, location: string) => {
    if (!topic.trim()) return;
    const newCircle: CommunityCircle = {
      id: `adhoc-${Date.now()}`,
      title: topic.trim(),
      timeLabel: 'Right Now • 30m Beacon',
      timeIcon: 'wifi_tethering',
      spotsLabel: '1 of 4 Joined',
      spotsColor: '#97472e',
      location: location || 'Communal High Table 1',
      locationIcon: 'table_restaurant',
      host: ephemeralHandle,
      description: 'Ad-hoc patron coffee chat beacon. Dissolves automatically after 30 minutes.',
      tags: ['Ad-Hoc', '30m Chat', 'In-Café'],
      category: 'startups',
      joined: true,
      ephemeralPass: ephemeralHandle,
    };
    setCommunityCircles((prev) => [newCircle, ...prev]);
    showToast(`Ad-hoc circle "${topic}" beacon broadcasted across tables!`, 'gemini');
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'gemini' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserProfile = (updater: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updater }));
    showToast('Patron profile updated successfully', 'success');
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    milk: 'Oat' | 'Whole' | 'Almond' | 'None' = 'Oat',
    sweetness: '0%' | '50%' | '100%' = '50%'
  ) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id && c.milk === milk && c.sweetness === sweetness);
      if (existing) {
        return prev.map((c) => (c.id === existing.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          menuItem: item,
          quantity: 1,
          milk,
          sweetness,
        },
      ];
    });
    showToast(`Added ${item.name} to order selection`, 'gemini');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  const placeOrder = (notes?: string) => {
    if (cart.length === 0) return;
    const orderNum = `#${Math.floor(Math.random() * 80) + 43}`;
    const itemsSummary = cart.map((c) => `${c.quantity}x ${c.menuItem.name}`).join(' + ');

    const newActiveOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: orderNum,
      patronName: userProfile.name,
      location: userProfile.currentTable,
      channel: 'espresso',
      itemsSummary,
      details: notes || 'Single-Origin extraction • Calibrated to Patron profile',
      eta: '3 min 20 sec',
      status: 'brewing',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalPrice: cartTotal,
      milestones: [
        {
          step: 1,
          title: '1. Beans Ground',
          description: 'Single-Origin roast dosed on Mahlkönig EK43',
          status: 'completed',
          timeNote: 'Just now',
        },
        {
          step: 2,
          title: '2. Espresso Pulled',
          description: '9.0 bar pre-infusion extraction tuned to stone-fruit profile',
          status: 'in_progress',
          timeNote: 'Active extraction (~40s)',
          progressPercent: 45,
        },
        {
          step: 3,
          title: '3. Steaming Oat Milk & Infusing Spice',
          description: 'Micro-foaming Minor Figures oat milk to silky 62°C',
          status: 'pending',
          timeNote: 'Pending',
        },
        {
          step: 4,
          title: '4. Ready at Pick-up Counter',
          description: `Dispatched to ${userProfile.currentTable}`,
          status: 'pending',
          timeNote: 'Pending',
        },
      ],
    };

    // Add to active order & push to barista queue
    setActiveOrder(newActiveOrder);
    setBaristaQueue((prev) => [
      {
        id: `queue-${Date.now()}`,
        orderNumber: orderNum,
        patronName: userProfile.name,
        location: userProfile.currentTable,
        channel: 'espresso',
        itemsSummary,
        details: notes || 'Personal sensory dial-in applied',
        guestDelightProfile: `Patron loyalty Tier 3. Regular table ${userProfile.currentTable}. Prefers silky low-acidity milk texture.`,
        eta: '3 min max',
        status: 'brewing',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);

    clearCart();
    setIsCheckoutOpen(false);
    setActiveTab('live-visit');
    showToast(`Order ${orderNum} confirmed & queued at the bar!`, 'success');
  };

  // Flavor Tuner
  const submitFlavorFeedback = (key: 'perfect' | 'sweet' | 'temp' | 'punch') => {
    setFlavorFeedback(key);
    let title = '';
    let desc = '';
    if (key === 'perfect') {
      title = 'Flawless Extraction Confirmed';
      desc = 'Saved to your permanent profile: Double Ristretto Guji with standard honey infusion.';
    } else if (key === 'sweet') {
      title = 'Sweetness Tuning Dispatched';
      desc = 'Alex notified on bar tablet: Dialed honey syrup from 12g to 6g for future pours.';
    } else if (key === 'temp') {
      title = 'Temperature Preference Logged';
      desc = 'Alex notified: Micro-foam steam calibrated from 62°C to 68°C immediately.';
    } else if (key === 'punch') {
      title = 'Extraction Profile Dispatched';
      desc = 'Alex notified: Added an extra 2g ristretto floater to your upcoming pour.';
    }
    setFlavorFeedbackMessage({ title, desc });
    showToast(`Barista Alex updated: ${title}`, 'gemini');
  };

  const dismissFlavorFeedback = () => {
    setFlavorFeedbackMessage(null);
  };

  // Table Requests
  const sendTableServiceRequest = (service: string) => {
    setTableServiceMessage(`Dispatching "${service}" to ${userProfile.currentTable}...`);
    showToast(`Table request sent: ${service}`, 'info');
    setTimeout(() => {
      setTableServiceMessage(`✓ ${service} confirmed. Floor staff notified!`);
    }, 1000);
    setTimeout(() => {
      setTableServiceMessage(null);
    }, 4500);
  };

  // Ambient Audio Player using Web Audio API synthesis (gentle warm binaural chord with soft warmth)
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          oscillatorNodesRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // noop
            }
          });
          oscillatorNodesRef.current = [];
        }, 300);
      }
      setIsPlayingAudio(false);
      showToast('Ambient lofi soundtrack paused', 'info');
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;

        // Warm chord frequencies: F3 (174.6Hz), A3 (220Hz), C4 (261.6Hz), E4 (329.6Hz)
        const freqs = [174.6, 220.0, 261.63, 329.63];
        const oscs = freqs.map((f, i) => {
          const osc = ctx.createOscillator();
          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          osc.connect(gain);
          osc.start();
          return osc;
        });
        oscillatorNodesRef.current = oscs;

        setIsPlayingAudio(true);
        showToast('Playing: "Sunlit Guji Morning" (Binaural 60Hz ambient)', 'gemini');
      } catch (e) {
        console.warn('Audio synthesis not supported or permitted', e);
        setIsPlayingAudio(true);
        showToast('Playing: "Sunlit Guji Morning"', 'gemini');
      }
    }
  };

  // Barista Actions
  const completeBaristaOrder = (orderId: string) => {
    setBaristaQueue((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order marked completed & dispatched to guest table`, 'success');
  };

  const holdBaristaOrder = (orderId: string) => {
    setBaristaQueue((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, eta: 'Held for 1m (Guest delay)' } : o))
    );
    showToast(`Order put on 1m thermal hold`, 'info');
  };

  const toggleRushMode = () => {
    setIsRushMode((prev) => {
      const next = !prev;
      showToast(next ? 'Queue Rush Mode: ACTIVATED (Rapid dial-in)' : 'Queue Rush Mode: Normal pacing', 'info');
      return next;
    });
  };

  const handlePulseAction = (id: string) => {
    setPulseList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, applied: true, actionRequired: false } : item))
    );
    showToast('Acoustic adjustment applied across roastery nodes', 'success');
  };

  const acknowledgeShiftMentor = () => {
    setShiftMentorAcknowledged(true);
    showToast('Bar station acknowledged mentor recommendation', 'gemini');
  };

  // Common Ground
  const togglePresenceBroadcast = () => {
    setPresenceBroadcast((prev) => {
      const next = !prev;
      showToast(
        next ? 'Table presence is live at Table 14 & Communal Bar' : 'Presence paused. You are now private & incognito',
        'info'
      );
      return next;
    });
  };

  const nextSpark = () => {
    setSparkIndex((prev) => (prev + 1) % serendipitySparks.length);
  };

  const currentSpark = serendipitySparks[sparkIndex];

  const toggleHappeningRsvp = (id: string) => {
    setHappenings((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextRsvpd = !h.rsvpd;
          showToast(nextRsvpd ? `RSVP confirmed for ${h.title}!` : `Cancelled RSVP for ${h.title}`, 'success');
          return {
            ...h,
            rsvpd: nextRsvpd,
            actionLabel: nextRsvpd ? '✓ RSVP Confirmed' : h.id === 'happening-1' ? 'Join Cupping (4 Spots)' : 'RSVP Table Seat',
          };
        }
        return h;
      })
    );
  };

  const addRoomTopic = (question: string) => {
    if (!question.trim()) return;
    const newTopic: RoomTopic = {
      id: `topic-${Date.now()}`,
      author: userProfile.name,
      location: 'Table 14',
      timeAgo: 'Just now',
      question: question.trim(),
      resonantCount: 1,
      answerCount: 0,
      userResonated: true,
    };
    setRoomTopics((prev) => [newTopic, ...prev]);
    showToast('Spark broadcasted to in-café communal iPad & feeds!', 'gemini');
  };

  const toggleResonateTopic = (id: string) => {
    setRoomTopics((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const wasResonated = t.userResonated;
          return {
            ...t,
            userResonated: !wasResonated,
            resonantCount: wasResonated ? t.resonantCount - 1 : t.resonantCount + 1,
          };
        }
        return t;
      })
    );
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      oscillatorNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // noop
        }
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <CafeContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userProfile,
        updateUserProfile,
        isProfileOpen,
        setIsProfileOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isArticleOpen,
        setIsArticleOpen,
        isWaveOpen,
        setIsWaveOpen,
        waveTarget,
        setWaveTarget,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        placeOrder,
        activeOrder,
        flavorFeedback,
        flavorFeedbackMessage,
        submitFlavorFeedback,
        dismissFlavorFeedback,
        tableServiceMessage,
        sendTableServiceRequest,
        isPlayingAudio,
        toggleAudio,
        baristaQueue,
        completeBaristaOrder,
        holdBaristaOrder,
        isRushMode,
        toggleRushMode,
        pulseList,
        handlePulseAction,
        shiftMentorAcknowledged,
        acknowledgeShiftMentor,
        presenceBroadcast,
        togglePresenceBroadcast,
        sparkIndex,
        nextSpark,
        currentSpark,
        happenings,
        toggleHappeningRsvp,
        roomTopics,
        addRoomTopic,
        toggleResonateTopic,
        patrons,
        // Community Circles
        communityCircles,
        interestTags,
        isQrModalOpen,
        setIsQrModalOpen,
        activeQrCircle,
        openCircleQrModal,
        ephemeralHandle,
        regenerateEphemeralHandle,
        joinCircle,
        proposeAdHocCircle,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
