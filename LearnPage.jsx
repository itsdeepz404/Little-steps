import React, { useState } from 'react';
import { LEARN_ARTICLES } from '../data/articlesData';
import StandingDisclaimer from '../components/StandingDisclaimer';
import AudioReaderButton from '../components/AudioReaderButton';
import { BookOpen, Sparkles, Clock, ShieldCheck, Heart, Search } from 'lucide-react';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticleId, setActiveArticleId] = useState(LEARN_ARTICLES[0].id);

  const categories = ['all', 'Development', 'Vaccinations', 'Movement', 'Caregiver Wellbeing'];

  const filteredArticles = LEARN_ARTICLES.filter(art => 
    selectedCategory === 'all' || art.category === selectedCategory
  );

  const activeArticle = LEARN_ARTICLES.find(a => a.id === activeArticleId) || LEARN_ARTICLES[0];

  const fullTextToRead = `${activeArticle.title}. ${activeArticle.summary}. ` + 
    activeArticle.sections.map(s => `${s.heading}: ${s.body}`).join(' ');

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
          <BookOpen size={16} />
          <span>Clinically Reviewed Guidance & Articles</span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
          Calm Guidance for Everyday Parenting
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
          Short, friendly articles reviewed by paediatricians, health visitors and child physiotherapists. Written at a calm, supportive Grade 6–8 reading level with audio read-aloud.
        </p>
      </section>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className="btn-pill"
            style={{
              fontSize: '0.82rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500,
              textTransform: 'capitalize'
            }}
          >
            {cat === 'all' ? 'All Guidance' : cat}
          </button>
        ))}
      </div>

      {/* Articles Layout: Sidebar Index + Active Reader */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Left Column: Article List / Picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredArticles.map(article => {
            const isSelected = activeArticle.id === article.id;
            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setActiveArticleId(article.id)}
                className="card-calm"
                style={{
                  textAlign: 'left',
                  padding: '1.15rem',
                  borderLeft: isSelected ? '4px solid var(--color-primary)' : '1px solid var(--color-mint-border)',
                  backgroundColor: isSelected ? '#fafdfb' : '#ffffff',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem' }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {article.readingTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', color: 'var(--color-sage-deep)', fontWeight: 600, lineHeight: 1.35 }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                  {article.summary.slice(0, 110)}...
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--color-primary)', marginTop: '0.5rem' }}>
                  <span>✓ {article.author}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Full Active Article Content */}
        <article className="card-calm" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-mint-border)', paddingBottom: '1rem' }}>
            <div>
              <span className="badge-soft badge-neutral" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                {activeArticle.category} • {activeArticle.readingTime}
              </span>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--color-sage-deep)', fontWeight: 700, lineHeight: 1.3 }}>
                {activeArticle.title}
              </h2>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 500, marginTop: '0.25rem' }}>
                {activeArticle.subtitle}
              </div>
            </div>

            <AudioReaderButton 
              textToRead={fullTextToRead}
              label="Listen to article"
            />
          </div>

          {/* Clinician Review Badge */}
          <div style={{ backgroundColor: 'var(--color-mint-light)', border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>Reviewed by <strong>{activeArticle.author}</strong> on {activeArticle.reviewedDate}</span>
          </div>

          {/* Summary Box */}
          <div style={{ fontStyle: 'italic', color: 'var(--color-text-main)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5, borderLeft: '3px solid var(--color-primary)', paddingLeft: '1rem' }}>
            {activeArticle.summary}
          </div>

          {/* Article Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeArticle.sections.map((sec, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {sec.heading}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
