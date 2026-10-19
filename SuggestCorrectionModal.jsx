import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, CheckCircle2 } from 'lucide-react';

export default function SuggestCorrectionModal() {
  const { suggestCorrectionModal, setSuggestCorrectionModal } = useApp();

  const [fieldToCorrect, setFieldToCorrect] = useState('Vaccination clinic days or hours');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!suggestCorrectionModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestCorrectionModal(null);
    }, 1800);
  };

  return (
    <dialog open style={{ display: 'block' }} aria-labelledby="correction-dialog-title">
      <div className="dialog-inner" style={{ maxWidth: '580px' }}>
        <div className="dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 id="correction-dialog-title" style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', margin: 0 }}>
              Suggest a Correction: {suggestCorrectionModal.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setSuggestCorrectionModal(null)}
            className="btn-outline"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            aria-label="Close correction modal"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="dialog-body" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <CheckCircle2 size={36} style={{ color: 'var(--color-primary)', margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)' }}>
              Thank you for helping families!
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Our clinical review and directory team will confirm with the clinic before updating the listing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Did you notice a changed phone number, updated baby clinic hours, or new accessibility features? Community suggestions help keep our directory accurate for all families.
              </p>

              <div>
                <label htmlFor="corr-topic" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                  What information needs updating?
                </label>
                <select
                  id="corr-topic"
                  value={fieldToCorrect}
                  onChange={(e) => setFieldToCorrect(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', backgroundColor: '#ffffff' }}
                >
                  <option value="Vaccination clinic days or hours">Vaccination clinic days or hours</option>
                  <option value="Phone number or address">Phone number or address</option>
                  <option value="Accessibility features (wheelchair, quiet rooms)">Accessibility features (wheelchair, quiet rooms)</option>
                  <option value="Doctors or staff changes">Doctors or staff changes</option>
                  <option value="Fee or NHS status">Fee or NHS status</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="corr-details" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                  Your correction notes:
                </label>
                <textarea
                  id="corr-details"
                  rows="3"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Baby clinic now starts at 9:30 AM instead of 9:00 AM on Tuesdays..."
                  required
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div className="dialog-footer">
              <button
                type="button"
                onClick={() => setSuggestCorrectionModal(null)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Submit Correction
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
