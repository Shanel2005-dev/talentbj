import type { EtapeEscrow } from '../../types';

interface EscrowTimelineProps {
  etapes: EtapeEscrow[];
  compact?: boolean;
}


export default function EscrowTimeline({ etapes, compact = false }: EscrowTimelineProps) {
  const completedCount = etapes.filter(e => e.complete).length;
  const progressPct = (completedCount / (etapes.length - 1)) * 100;

  const nodeSize = compact ? 28 : 32;
  const trackTop = compact ? 14 : 16;

  return (
    <div className={compact ? 'py-1' : 'py-4'} style={{ overflow: 'hidden' }}>
      {/* Progress bar track */}
      <div className="relative" style={{ minWidth: 0 }}>
        {/* Base track */}
        <div
          className="absolute left-0 right-0 h-0.5"
          style={{ backgroundColor: '#E5E7EB', top: trackTop, marginLeft: nodeSize / 2, marginRight: nodeSize / 2 }}
        />
        {/* Active track */}
        <div
          className="absolute left-0 h-0.5 transition-all duration-700"
          style={{
            backgroundColor: '#1FAE7A',
            top: trackTop,
            marginLeft: nodeSize / 2,
            width: `calc(${Math.min(progressPct, 100)}% - ${nodeSize}px)`,
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {etapes.map((etape, index) => {
            const isComplete = etape.complete;
            const isCurrent = !isComplete && index === completedCount;

            return (
              <div key={etape.etape} className="flex flex-col items-center gap-1">
                {/* Node */}
                <div
                  className="rounded-full flex items-center justify-center font-bold transition-all duration-500 z-10"
                  style={{
                    width: nodeSize, height: nodeSize,
                    backgroundColor: isComplete ? '#1FAE7A' : isCurrent ? '#F5A623' : '#F7F3EC',
                    border: `2px solid ${isComplete ? '#1FAE7A' : isCurrent ? '#F5A623' : '#D1D5DB'}`,
                    color: isComplete || isCurrent ? '#fff' : '#9CA3AF',
                    boxShadow: isCurrent ? '0 0 0 3px rgba(245,166,35,0.2)' : 'none',
                  }}
                >
                  {isComplete ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7 L5.5 10 L11.5 4" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: compact ? 10 : 11 }}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Label */}
                {!compact && (
                  <div className="text-center max-w-[72px]">
                    <p
                      className="text-xs font-semibold leading-tight"
                      style={{ color: isComplete ? '#1FAE7A' : isCurrent ? '#F5A623' : '#9CA3AF' }}
                    >
                      {etape.label}
                    </p>
                    {etape.date && isComplete && (
                      <p className="text-xs mt-0.5" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono, monospace' }}>
                        {etape.date}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status summary */}
      {!compact && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: completedCount === etapes.length ? '#ECFDF5' : '#FFF8EC',
              color: completedCount === etapes.length ? '#1FAE7A' : '#F5A623',
            }}
          >
            {completedCount === etapes.length ? (
              <>
                <span className="w-2 h-2 rounded-full bg-validated-green inline-block" />
                Fonds libérés au freelance
              </>
            ) : completedCount === 0 ? (
              <>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#D1D5DB' }} />
                En attente de paiement escrow
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#F5A623' }} />
                Étape {completedCount}/{etapes.length - 1} — {etapes[completedCount - 1]?.label}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
