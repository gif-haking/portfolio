import { useState, useRef, useLayoutEffect } from 'react';


interface Quote {
  text: string;
  author?: string;
  role?: string;
}


interface Props {
  quotes: Quote[];
}


const CARD_WIDTH = 50;
const PEEK = (100 - CARD_WIDTH) / 2;
const CLONES = 2;


function xFor(idx: number) {
  return `translateX(${-(idx * CARD_WIDTH) + PEEK}%)`;
}


export default function QuoteCarousel({ quotes }: Props) {
  const extended = [...quotes.slice(-CLONES), ...quotes, ...quotes.slice(0, CLONES)];


  const [index, setIndex] = useState(CLONES);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIdx = useRef(CLONES);


  const applyTransform = (idx: number, instant: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = instant ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.transform = xFor(idx);
    if (instant) el.getBoundingClientRect(); // force reflow so 'none' takes effect
  };


  useLayoutEffect(() => {
    applyTransform(CLONES, true);
  }, []);


  const moveTo = (targetIdx: number) => {
    currentIdx.current = targetIdx;
    setIndex(targetIdx);
    applyTransform(targetIdx, false);
  };


  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    const i = currentIdx.current;
    let snap: number | null = null;
    if (i < CLONES) snap = i + quotes.length;
    else if (i >= CLONES + quotes.length) snap = i - quotes.length;
    if (snap !== null) {
      currentIdx.current = snap;
      applyTransform(snap, true);
      setIndex(snap);
    }
  };


  const realIndex = ((index - CLONES) % quotes.length + quotes.length) % quotes.length;


  const isActive = (i: number) => {
    if (i === index) return true;
    let equiv = index;
    if (index < CLONES) equiv = index + quotes.length;
    else if (index >= CLONES + quotes.length) equiv = index - quotes.length;
    return i === equiv;
  };


  return (
    <div style={{ margin: '3rem auto', maxWidth: 'var(--max-width)', paddingInline: '2rem' }}>


      <div style={{
        overflow: 'hidden',
        paddingBlock: '0.5rem',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{ display: 'flex', willChange: 'transform' }}
        >
          {extended.map((quote, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${CARD_WIDTH}%`,
                paddingInline: '0.5rem',
                opacity: isActive(i) ? 1 : 0.35,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)',
              }}>
                <p style={{
                  fontSize: 'var(--text-lg)',
                  lineHeight: 'var(--leading-snug)',
                  color: 'var(--color-off-black)',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  "{quote.text}"
                </p>
                {(quote.author || quote.role) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    {quote.author && (
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-off-black)', lineHeight: 'var(--leading-none)' }}>
                        {quote.author}
                      </span>
                    )}
                    {quote.role && (
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-grey)' }}>
                        {quote.role}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


      {quotes.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <ArrowButton direction="left" onClick={() => moveTo(currentIdx.current - 1)} />
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => moveTo(i + CLONES)}
                aria-label={`Quote ${i + 1}`}
                style={{
                  width: i === realIndex ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '100px',
                  background: i === realIndex ? 'var(--color-off-black)' : 'var(--color-light-grey)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
          <ArrowButton direction="right" onClick={() => moveTo(currentIdx.current + 1)} />
        </div>
      )}
    </div>
  );
}


function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid var(--color-border)',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-off-black)',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {direction === 'left'
          ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}





