import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Database, Link as LinkIcon, Cpu } from 'lucide-react';

function Success({ setCart }) {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  
  // TECHNICAL LOGS: These will cycle through during the 6-second wait
  const securityLogs = [
    "INITIALIZING SECURE HANDSHAKE...",
    "ENCRYPTING MANIFEST [AES-256-GCM]...",
    "GENERATING TRANSACTION HASH...",
    "BROADCASTING TO NEURAL-GRID NODES...",
    "WAITING FOR BLOCK CONFIRMATION...",
    "CONSENSUS REACHED: 12/12 NODES VALIDATED.",
    "EXECUTING SMART CONTRACT [MKT-PROT-01]...",
    "TRANSACTION FINALIZED ON LEDGER."
  ];

  useEffect(() => {
    if (typeof setCart === 'function') {
      setCart([]);
      localStorage.removeItem('neoCart');
    }

    // Cycle through technical logs every 700ms
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < securityLogs.length - 1 ? prev + 1 : prev));
    }, 1500);

    // Final confirmation after the sequence finishes
    const timer = setTimeout(() => {
      setIsConfirmed(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(logInterval);
    };
  }, [setCart]);

  return (
    <div className="success-page">
      <div className="success-container">
        {!isConfirmed ? (
          <div className="blockchain-verify-state">
            {/* CENTRAL ICON */}
            <div className="blockchain-icon-wrapper">
              <Database size={50} className="base-icon" />
              <div className="orbit-container">
                <LinkIcon size={20} className="orbiting-icon" />
              </div>
            </div>

            <h2 className="blockchain-title">BLOCKCHAIN VERIFICATION</h2>
            
            {/* THE FAKE HASH */}
            <div className="tx-hash-display">
              TXID: 0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 10)}
            </div>

            {/* THE TRANSACTION LOGS */}
            <div className="log-terminal">
              <p className="active-log">{securityLogs[logIndex]}</p>
              <div className="log-history">
                 {securityLogs.slice(0, logIndex).map((log, i) => (
                   <p key={i} className="past-log">✓ {log}</p>
                 ))}
              </div>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="confirmed-state animate-pop-in">
            <div className="tick-wrapper">
              <div className="tick-circle"></div>
              <Check size={60} className="draw-tick" />
            </div>
            <h1 className="success-title">SECURE.CONFIRMED</h1>
            <p className="success-msg">Your transaction is permanent on the ledger.</p>
            <button className="neo-btn-action" onClick={() => navigate('/')}>
              Return to Sector 01
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;