import { useState } from 'react';
import { motion } from 'motion/react';

interface Quote {
  text: string;
  author?: string;
  role?: string;
}

interface Props {
  quotes: Quote[];
}

const CARD_WIDTH = 50; // % of container
const PEEK = (100 - CARD_WIDTH) / 2; // % either side

export default function QuoteCarousel({ quotes }: Props) {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(((index % quotes.length) + quotes.length) % quotes.length);
  };

  // Offset so active card is centred
  const offset = -(current * CARD_WIDTH) + PEEK;

  return (
    <div style={{ margin: '3rem auto', maxWidth: 'var(--max-width)', paddingInline: '2rem' }}>

      {/* Outer clip with fade mask */}
      <div style={{
        overflow: 'hidden',
        paddingBlock: '0.5rem',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>

        {/* Sliding track */}
        <motion.div
          animate={{ x: `${offset}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: 'flex', gap: '1rem', willChange: 'transform' }}
        >
          {quotes.map((quote, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${CARD_WIDTH}%`,
                transition: 'opacity 0.3s ease',
                opacity: i === current ? 1 : 0.35,
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
                  textWrap: 'balance',
                  margin: 0,
                }}>
                  "{quote.text}"
                </p>
                {(quote.author || quote.role) && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}>
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
        </motion.div>
      </div>

      {/* Controls */}
      {quotes.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <ArrowButton direction="left" onClick={() => goTo(current - 1)} />
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Quote ${i + 1}`}
                style={{
                  width: i === current ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '100px',
                  background: i === current ? 'var(--color-off-black)' : 'var(--color-light-grey)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
          <ArrowButton direction="right" onClick={() => goTo(current + 1)} />
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
