import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Check, 
  Baby, 
  Building2, 
  History, 
  Lock, 
  Eye, 
  Edit3, 
  Heart,
  Plus
} from 'lucide-react';

export default function SharedCarePage() {
  const {
    caregiver,
    setCaregiver,
    sharedCaregivers,
    setSharedCaregivers,
    auditLog,
    childrenList,
    activeChild,
    providers,
    savedProviderIds,
    toggleSaveProvider,
    setOnboardingOpen,
    setOnboardingMode
  } = useApp();

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Grandparent');
  const [invitePermission, setInvitePermission] = useState('view-only'); // 'view-only' | 'edit'

  const savedClinics = providers.filter(p => savedProviderIds.includes(p.id));

  const handleInviteCaregiver = (e) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newCaregiver = {
      id: `cg-${Date.now()}`,
      name: inviteName.trim(),
      role: inviteRole,
      email: inviteEmail.trim(),
      permission: invitePermission,
      joinedDate: 'Just now'
    };

    setSharedCaregivers([...sharedCaregivers, newCaregiver]);
    setInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  return (
    <div className="animate-fade-in">
      {/* Page Title */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
              <Users size={16} />
              <span>Family Sharing & Collaborative Care</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
              Care Team for {activeChild?.nickname || 'Child'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
              Share schedules, vaccination history, and appointments with co-parents, grandparents, nannies, or foster carers with custom view-only or edit permissions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setInviteModalOpen(true)}
              className="btn-primary btn-pill"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', gap: '0.4rem' }}
            >
              <UserPlus size={16} />
              <span>Invite Family / Caregiver</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Primary Caregiver Profile & Shared Members */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        
        {/* Left Column: Shared Caregivers List */}
        <section className="card-calm" aria-labelledby="shared-caregivers-heading">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-mint-border)', paddingBottom: '0.75rem' }}>
            <h2 id="shared-caregivers-heading" style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
              Authorised Caregivers ({sharedCaregivers.length + 1})
            </h2>
            <span className="badge-soft badge-verified" style={{ fontSize: '0.75rem' }}>
              Role-Based Access
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Primary Caregiver (Current User) */}
            <div 
              style={{
                border: '1px solid var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem',
                backgroundColor: 'var(--color-mint-light)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.95rem' }}>
                    {caregiver.name} (You)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '0.15rem' }}>
                    {caregiver.relationship} • {caregiver.email}
                  </div>
                </div>
                <span className="badge-soft badge-completed" style={{ fontSize: '0.72rem' }}>
                  Account Owner (Full Access)
                </span>
              </div>
            </div>

            {/* Shared Caregivers (Grandparents, Co-parents, Nannies) */}
            {sharedCaregivers.map(cg => (
              <div 
                key={cg.id}
                style={{
                  border: '1px solid var(--color-mint-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.9rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.95rem' }}>
                      {cg.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                      {cg.role} • {cg.email}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: '0.2rem' }}>
                      Invited on {cg.joinedDate}
                    </div>
                  </div>

                  <span 
                    className={`badge-soft ${cg.permission === 'edit' ? 'badge-verified' : 'badge-neutral'}`}
                    style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    {cg.permission === 'edit' ? <Edit3 size={11} /> : <Eye size={11} />}
                    <span>{cg.permission === 'edit' ? 'Can Edit & Record' : 'View-Only Schedule'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-mint-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            🔒 <strong>Privacy note:</strong> Grandparents with view-only permissions can follow upcoming vaccination clinics and milestone ideas, but cannot modify records or view billing/contact details.
          </div>
        </section>

        {/* Right Column: Children Profiles & Audit Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Children Profiles on this account */}
          <section className="card-calm" aria-labelledby="children-profiles-heading">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Baby size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 id="children-profiles-heading" style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                  Children on this Account
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOnboardingMode('older-child');
                  setOnboardingOpen(true);
                }}
                className="btn-outline btn-pill"
                style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem', gap: '0.3rem' }}
              >
                <Plus size={13} />
                <span>Add child</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {childrenList.map(child => (
                <div 
                  key={child.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: activeChild.id === child.id ? 'var(--color-mint-light)' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-sage-deep)' }}>
                      {child.nickname} {activeChild.id === child.id && '(Active Profile)'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      DOB: {child.dateOfBirth} {child.bornEarly && `• Born ${child.weeksEarly}w early`}
                    </div>
                  </div>

                  <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem' }}>
                    Nickname protected
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Audit Log (Section 8 Security requirement) */}
          <section className="card-calm" aria-labelledby="audit-log-heading">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
              <History size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 id="audit-log-heading" style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                Care Sharing Audit Log
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {auditLog.map(log => (
                <div 
                  key={log.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.78rem',
                    backgroundColor: '#fafcfb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>{log.actor}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div style={{ color: 'var(--color-text-main)', marginTop: '0.2rem', fontWeight: 500 }}>
                    {log.action}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Invite Caregiver Modal */}
      {inviteModalOpen && (
        <dialog open style={{ display: 'block' }} aria-labelledby="invite-caregiver-modal-title">
          <div className="dialog-inner">
            <div className="dialog-header">
              <h3 id="invite-caregiver-modal-title" style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', margin: 0 }}>
                Invite Co-Caregiver to Little Steps
              </h3>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="btn-outline"
                style={{ padding: '0.35rem', borderRadius: '50%' }}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteCaregiver}>
              <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Caregivers you invite will receive a private invitation code. Health data is never linked to social media or advertising.
                </p>

                <div>
                  <label htmlFor="inv-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                    Caregiver Name:
                  </label>
                  <input
                    id="inv-name"
                    type="text"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. Grandma Nora, Jordan"
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                  />
                </div>

                <div>
                  <label htmlFor="inv-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                    Email or Mobile Number:
                  </label>
                  <input
                    id="inv-email"
                    type="text"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="e.g. relative@example.com or +44 7700..."
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label htmlFor="inv-role" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                      Relationship:
                    </label>
                    <select
                      id="inv-role"
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', backgroundColor: '#ffffff' }}
                    >
                      <option value="Grandparent">Grandparent</option>
                      <option value="Co-parent">Co-parent</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Foster Carer">Foster Carer</option>
                      <option value="Nanny / Au Pair">Nanny / Au Pair</option>
                      <option value="Other Family">Other Family</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inv-perm" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                      Access Permission:
                    </label>
                    <select
                      id="inv-perm"
                      value={invitePermission}
                      onChange={(e) => setInvitePermission(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', backgroundColor: '#ffffff' }}
                    >
                      <option value="view-only">View-Only (Schedule & clinic visits)</option>
                      <option value="edit">Edit Access (Can record vaccines & milestones)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
