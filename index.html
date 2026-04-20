<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>AO ניהול תקציב!</title>
    
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        premium: {
                            gold: '#C19A6B',
                            dark: '#0f172a',
                            panel: 'rgba(255, 255, 255, 0.03)',
                            border: 'rgba(255, 255, 255, 0.08)',
                            text: '#f1f5f9',
                            muted: '#94a3b8'
                        }
                    }
                }
            }
        }
    </script>

    <style>
        /* פונט מודרני Inter ו-Inter Hebrew */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;900&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif;
            -webkit-tap-highlight-color: transparent;
            background-color: #0f172a; /* premium-dark */
            color: #f1f5f9; /* premium-text */
        }
        
        /* אנימציות פרימיום */
        @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
        }

        .animate-slide-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-background-pulse { animation: subtlePulse 5s ease-in-out infinite; }
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 2.5rem;
        }

        .premium-button {
            transition: all 0.2s ease-in-out;
        }
        .premium-button:active {
            transform: scale(0.96);
            opacity: 0.9;
        }

        /* כפתור כניסה עם גוגל מעוצב */
        .google-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            color: #0f172a;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            font-weight: 800;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.2s;
        }
        .google-btn:active {
            transform: scale(0.97);
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useMemo } = React;

        // ה-Firebase Config שלך - אין צורך לשנות אם אלו אותם נתונים
        const firebaseConfig = {
            apiKey: "AIzaSyBqpLOIbztpurGuUqpfaWZT71JcofKG2rc",
            authDomain: "riki-aharele-budget.firebaseapp.com",
            projectId: "riki-aharele-budget",
            storageBucket: "riki-aharele-budget.firebasestorage.app",
            messagingSenderId: "53506652532",
            appId: "1:53506652532:web:28b3e3fc28114b1feb9421"
        };

        // אתחול
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const auth = firebase.auth();
        const db = firebase.firestore();
        db.enablePersistence().catch(() => console.log("Offline mode active"));

        // הגדרת ספק גוגל
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        const Icon = ({ name, size = 24, className = "" }) => {
            useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [name]);
            return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
        };

        // קומפוננטת מסך כניסה
        const LoginScreen = ({ onSignIn }) => {
            return (
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
                    <div className="animate-slide-up space-y-12 w-full max-w-sm">
                        
                        {/* לוגו AO גדול בעיצוב יוקרתי */}
                        <div className="mx-auto w-40 h-40 rounded-full border-4 border-slate-800 p-1 bg-slate-900 shadow-2xl relative">
                            <img src="https://i.ibb.co/pB3Yp5jN/IMG-20260419-WA0041.jpg" alt="AO Logo" className="rounded-full w-full h-full object-cover" />
                            <div className="absolute inset-0 rounded-full bg-slate-950/20 blur-sm pointer-events-none"></div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-black text-white italic">AO ניהול תקציב!</h1>
                            <p className="text-slate-400 mt-3 font-bold">הדרך החכמה והיוקרתית לניהול הכסף שלכם.</p>
                        </div>

                        <button onClick={onSignIn} className="google-btn premium-button">
                            <img src="https://auth.firebase.google.com/v1/images/google_logo.svg" alt="Google G" className="w-5 h-5 mr-3" />
                            התחברות מהירה עם גוגל
                        </button>
                    </div>
                </div>
            );
        };

        const App = () => {
            const [user, setUser] = useState(null);
            const [loading, setLoading] = useState(true);
            const [incomes, setIncomes] = useState([]);
            const [expenses, setExpenses] = useState([]);
            const [fixedExpenses, setFixedExpenses] = useState([]);
            const [fixedIncomes, setFixedIncomes] = useState([]);
            const [view, setView] = useState('dashboard');
            const [isModalOpen, setIsModalOpen] = useState(false);
            const [modalType, setModalType] = useState('income');

            useEffect(() => {
                // בדיקת סטטוס חיבור
                const unsubscribe = auth.onAuthStateChanged((currentUser) => {
                    setUser(currentUser);
                    setLoading(false);
                });
                return () => unsubscribe();
            }, []);

            useEffect(() => {
                if (!user) return;
                
                // שינוי קריטי: הנתונים נשמרים תחת users/{userId} למען הפרדה מוחלטת
                const baseRef = db.collection('users').doc(user.uid);
                
                const unsub1 = baseRef.collection('incomes').onSnapshot(s => setIncomes(s.docs.map(d => ({id: d.id, ...d.data()}))));
                const unsub2 = baseRef.collection('expenses').onSnapshot(s => setExpenses(s.docs.map(d => ({id: d.id, ...d.data()}))));
                const unsub3 = baseRef.collection('fixed_settings').onSnapshot(s => setFixedExpenses(s.docs.map(d => ({id: d.id, ...d.data()}))));
                const unsub4 = baseRef.collection('fixed_incomes').onSnapshot(s => setFixedIncomes(s.docs.map(d => ({id: d.id, ...d.data()}))));
                return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
            }, [user]);

            // פונקציית כניסה עם גוגל
            const handleSignIn = async () => {
                try {
                    await auth.signInWithRedirect(googleProvider);
                } catch (error) {
                    console.error("Google login failed:", error);
                }
            };

            const cycleData = useMemo(() => {
                const now = new Date();
                let startDate = new Date(now.getFullYear(), now.getMonth(), 15);
                if (now.getDate() < 15) startDate.setMonth(startDate.getMonth() - 1);

                const curVarInc = incomes.filter(i => new Date(i.date) >= startDate);
                const curVarExp = expenses.filter(i => new Date(i.date) >= startDate);

                const totalInc = curVarInc.reduce((s, i) => s + Number(i.amount || 0), 0) + fixedIncomes.reduce((s, i) => s + Number(i.amount || 0), 0);
                const totalFixedExp = fixedExpenses.reduce((s, i) => s + Number(i.amount || 0), 0);
                const totalVarExp = curVarExp.reduce((s, i) => s + Number(i.amount || 0), 0);

                return { totalIncome: totalInc, totalFixedExp, totalVarExp, balance: totalInc - totalFixedExp - totalVarExp, filteredIncomes: curVarInc, filteredExpenses: curVarExp };
            }, [incomes, expenses, fixedExpenses, fixedIncomes]);

            const handleAddItem = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const col = modalType === 'income' ? 'incomes' : 'expenses';
                // שמירה תחת המשתמש
                await db.collection('users').doc(user.uid).collection(col).add({
                    amount: Number(formData.get('amount')),
                    description: formData.get('description'),
                    date: new Date().toISOString()
                });
                setIsModalOpen(false);
            };

            const handleAddFixed = async (e, type) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const col = type === 'income' ? 'fixed_incomes' : 'fixed_settings';
                // שמירה תחת המשתמש
                await db.collection('users').doc(user.uid).collection(col).add({
                    name: formData.get('name'),
                    amount: Number(formData.get('amount'))
                });
                e.target.reset();
            };

            const deleteItem = async (col, id) => {
                await db.collection('users').doc(user.uid).collection(col).doc(id).delete();
            };

            if (loading) return <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-700 font-bold"><div className="animate-spin mb-4"><Icon name="loader-2" /></div>טוען יוקרה...</div>;

            if (!user) return <LoginScreen onSignIn={handleSignIn} />;

            return (
                <div className="min-h-screen pb-32">
                    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-slate-900 rounded-full blur-[100px] animate-background-pulse"></div>
                    </div>

                    <header className="pt-12 pb-8 px-6 animate-slide-up">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                {/* לוגו AO בעיגול בראש המסך */}
                                <div className="w-12 h-12 rounded-full border-2 border-slate-700 p-0.5 bg-slate-800 shadow-lg">
                                    <img src="https://i.ibb.co/pB3Yp5jN/IMG-20260419-WA0041.jpg" alt="AO Logo" className="rounded-full w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-bold">AO ניהול תקציב!</p>
                                    <h1 className="text-3xl font-black text-white italic">שלום, {user.displayName ? user.displayName.split(' ')[0] : 'משתמש'}</h1>
                                </div>
                            </div>
                            <button onClick={() => auth.signOut()} className="text-slate-600 premium-button p-2 rounded-xl hover:bg-white/5"><Icon name="log-out" size={20}/></button>
                        </div>

                        <div className="glass-panel p-8 text-center shadow-2xl relative">
                            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-widest block mb-2">יתרה למחזור (מה-15 לחודש)</span>
                            <h2 className={`text-6xl font-black ${cycleData.balance >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                                ₪{cycleData.balance.toLocaleString()}
                            </h2>
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
                        </div>
                    </header>

                    <main className="px-6 space-y-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
                        {view === 'dashboard' ? (
                            <>
                                <section className="grid grid-cols-2 gap-4">
                                    <button onClick={() => { setModalType('income'); setIsModalOpen(true); }} className="flex flex-col items-center p-6 bg-slate-900 border border-slate-800 rounded-[2rem] active:scale-95 transition-all">
                                        <Icon name="plus-circle" className="text-emerald-400 mb-2" size={32} />
                                        <span className="text-slate-300 font-bold text-sm">הכנסה חדשה</span>
                                    </button>
                                    <button onClick={() => { setModalType('expense'); setIsModalOpen(true); }} className="flex flex-col items-center p-6 bg-slate-900 border border-slate-800 rounded-[2rem] active:scale-95 transition-all">
                                        <Icon name="minus-circle" className="text-rose-400 mb-2" size={32} />
                                        <span className="text-slate-300 font-bold text-sm">הוצאה חדשה</span>
                                    </button>
                                </section>

                                <section>
                                    <h3 className="font-black text-xl mb-4 px-2 italic text-slate-400">תנועות אחרונות</h3>
                                    <div className="space-y-3">
                                        {[...cycleData.filteredIncomes, ...cycleData.filteredExpenses].sort((a,b) => new Date(b.date) - new Date(a.date)).map(item => {
                                            const isInc = incomes.some(i => i.id === item.id);
                                            return (
                                                <div key={item.id} className="glass-panel p-4 rounded-3xl flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-2xl ${isInc ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                            <Icon name={isInc ? "trending-up" : "shopping-bag"} size={20} />
                                                        </div>
                                                        <div><p className="font-bold text-sm">{item.description}</p><p className="text-[10px] text-slate-600">{new Date(item.date).toLocaleDateString('he-IL')}</p></div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`font-black text-lg ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>{isInc ? '+' : '-'}₪{item.amount}</span>
                                                        <button onClick={() => deleteItem(isInc ? 'incomes' : 'expenses', item.id)} className="text-slate-800 hover:text-rose-500"><Icon name="trash-2" size={16} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <section className="space-y-10">
                                <div>
                                    <h3 className="font-black text-xl text-amber-400 mb-4 text-center italic">הכנסות קבועות</h3>
                                    <form onSubmit={(e) => handleAddFixed(e, 'income')} className="glass-panel p-6 rounded-[2rem] space-y-4">
                                        <input name="name" required className="w-full p-4 bg-slate-950 rounded-xl outline-none border border-slate-800 focus:border-amber-400 transition-all font-bold" placeholder="מקור (למשל: משכורת)" />
                                        <input name="amount" type="number" required className="w-full p-4 bg-slate-950 rounded-xl outline-none border border-slate-800 focus:border-amber-400 transition-all font-bold" placeholder="סכום קבוע" />
                                        <button type="submit" className="w-full bg-amber-400 text-slate-950 p-4 rounded-xl font-black active:scale-95 transition-all">הוסף הכנסה קבועה</button>
                                    </form>
                                    <div className="mt-4 space-y-2">{fixedIncomes.map(item => (
                                        <div key={item.id} className="glass-panel p-4 rounded-2xl flex justify-between items-center"><p className="font-bold text-amber-400">{item.name}</p><div className="flex items-center gap-4"><span className="font-black">₪{item.amount}</span><button onClick={() => deleteItem('fixed_incomes', item.id)} className="text-rose-500"><Icon name="trash-2" size={18}/></button></div></div>
                                    ))}</div>
                                </div>

                                <div>
                                    <h3 className="font-black text-xl text-rose-400 mb-4 text-center italic">הוצאות קבועות</h3>
                                    <form onSubmit={(e) => handleAddFixed(e, 'expense')} className="glass-panel p-6 rounded-[2rem] space-y-4">
                                        <input name="name" required className="w-full p-4 bg-slate-950 rounded-xl outline-none border border-slate-800 focus:border-rose-500 transition-all font-bold" placeholder="שם ההוצאה (למשל: שכירות)" />
                                        <input name="amount" type="number" required className="w-full p-4 bg-slate-950 rounded-xl outline-none border border-slate-800 focus:border-rose-500 transition-all font-bold" placeholder="סכום קבוע" />
                                        <button type="submit" className="w-full bg-rose-500 text-white p-4 rounded-xl font-black active:scale-95 transition-all">הוסף הוצאה קבועה</button>
                                    </form>
                                    <div className="mt-4 space-y-2">{fixedExpenses.map(item => (
                                        <div key={item.id} className="glass-panel p-4 rounded-2xl flex justify-between items-center"><p className="font-bold text-slate-400">{item.name}</p><div className="flex items-center gap-4"><span className="font-black">₪{item.amount}</span><button onClick={() => deleteItem('fixed_settings', item.id)} className="text-rose-500"><Icon name="trash-2" size={18}/></button></div></div>
                                    ))}</div>
                                </div>
                            </section>
                        )}
                    </main>

                    <nav className="fixed bottom-6 left-6 right-6 glass-panel p-5 flex justify-around rounded-[2.5rem] z-40 shadow-2xl">
                        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center ${view === 'dashboard' ? 'text-amber-400 scale-110' : 'text-slate-600'} transition-all`}><Icon name="layout-dashboard" /><span className="text-[10px] font-bold mt-1">ראשי</span></button>
                        <button onClick={() => setView('settings')} className={`flex flex-col items-center ${view === 'settings' ? 'text-amber-400 scale-110' : 'text-slate-600'} transition-all`}><Icon name="settings" /><span className="text-[10px] font-bold mt-1">הגדרות</span></button>
                    </nav>

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-end justify-center">
                            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                            <div className="relative w-full max-w-md bg-slate-900 rounded-t-[3rem] p-8 animate-slide-up border-t border-slate-800 shadow-2xl">
                                <h3 className="text-2xl font-black text-center mb-8 text-white">{modalType === 'income' ? 'הכנסה חדשה 💰' : 'הוצאה חדשה 💸'}</h3>
                                <form onSubmit={handleAddItem} className="space-y-6">
                                    <input name="amount" type="number" required autoFocus className="w-full text-5xl font-black text-center py-6 bg-slate-950 rounded-[2rem] outline-none border border-slate-800 focus:border-amber-400 transition-all text-amber-400 placeholder:text-slate-800" placeholder="0" />
                                    <input name="description" required className="w-full p-5 bg-slate-950 rounded-2xl outline-none border border-slate-800 focus:border-amber-400 transition-all font-bold text-slate-200" placeholder="עפור מה?" />
                                    <button type="submit" className={`w-full p-6 rounded-2xl font-black text-xl shadow-2xl premium-button ${modalType === 'income' ? 'bg-amber-400 text-slate-950' : 'bg-rose-500 text-white'}`}>אישור ושמירה</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>

