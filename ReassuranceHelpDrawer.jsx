import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, X, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';
import AudioReaderButton from './AudioReaderButton';

export default function ReassuranceHelpDrawer() {
  const { reassuranceDrawerOpen, setReassuranceDrawerOpen, setCurrentPage, addQuestionToAsk, activeChild } = useApp();
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (reassuranceDrawerOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [reassuranceDrawerOpen]);

  if (!reassuranceDrawerOpen) return null;

  const guidanceText = `Every child grows on their own unique timeline. Milestones are broad windows, not deadlines or test scores. It is completely normal for a baby to excel in social smiling and babbling while taking their time with rolling, or vice versa.`;

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setReassuranceDrawerOpen(false)}
      aria-labelledby="reassurance-dialog-title"
      style={{ maxWidth: '640px' }}
    >
      <div className="dialog-inner">
        <div className="dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <h2 id="reassurance-dialog-title" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', margin: 0 }}>
              Something on your mind?
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AudioReaderButton textToRead={guidanceText} label="Listen" />
            <button
              type="button"
              onClick={() => setReassuranceDrawerOpen(false)}
              aria-label="Close help drawer"
              className="btn-outline"
              style={{ padding: '0.35rem', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="dialog-body">
          <div className="reassurance-box" style={{ marginTop: 0 }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-sage-deep)', lineHeight: '1.5' }}>
              First: take a deep, gentle breath. Wondering whether your little one is doing okay is an expression of how much you care.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
              <h4 style={{ color: 'var(--color-sage-deep)', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
                Every child develops at their own rhythm
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                Public milestone frameworks describe what a large group of children typically do across a wide age window. Some babies walk at 9 months; others walk at 15 months and both grow into active, healthy children. Little Steps never judges or scores your baby.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
              <h4 style={{ color: 'var(--color-sage-deep)', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
                Turn concerns into a calm conversation
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                If there is a skill you have questions about, you don’t need to worry alone. You can add it directly to your visit prep list and talk through it with your health visitor, nurse or GP.
              </p>
              <button
                type="button"
                onClick={() => {
                  addQuestionToAsk(`I have a question about ${activeChild?.nickname || 'my baby'}'s progress and would love some playful tips.`, 'General Development');
                  setReassuranceDrawerOpen(false);
                  setCurrentPage('visit-prep');
                }}
                className="btn-outline"
                style={{ marginTop: '0.75rem', fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
              >
                Add general question to Doctor Visit Prep →
              </button>
            </div>

            <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
              <h4 style={{ color: 'var(--color-sage-deep)', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
                Clinically reviewed guidance library
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                Read short, calm articles written by paediatricians on what to expect at each stage, playful tummy time ideas, and looking after your own wellbeing as a caregiver.
              </p>
              <button
                type="button"
                onClick={() => {
                  setReassuranceDrawerOpen(false);
                  setCurrentPage('learn');
                }}
                className="btn-outline"
                style={{ marginTop: '0.75rem', fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
              >
                Browse Articles & Guidance →
              </button>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => setReassuranceDrawerOpen(false)}
            className="btn-primary"
          >
            I feel ready to continue
          </button>
        </div>
      </div>
    </dialog>
  );
}
