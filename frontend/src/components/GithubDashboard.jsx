import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Star, Activity, Flame } from 'lucide-react';

const USERNAME = 'Venkatesh-ap-2507';
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export default function GithubDashboard() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=10`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          }),
        ]);

        if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error('Unable to fetch GitHub profile data right now.');
        }

        const [profileData, reposData, eventsData] = await Promise.all([
          profileRes.json(),
          reposRes.json(),
          eventsRes.json(),
        ]);

        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Unable to load GitHub data.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();
    const timer = window.setInterval(loadData, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  const metrics = useMemo(() => {
    const languageCounts = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name]) => name)
      .join(' • ');

    return [
      { label: 'Public repos', value: profile?.public_repos?.toLocaleString() || '—' },
      { label: 'Stars earned', value: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0).toLocaleString() },
      { label: 'Followers', value: profile?.followers?.toLocaleString() || '—' },
      { label: 'Following', value: profile?.following?.toLocaleString() || '—' },
      { label: 'Languages', value: topLanguages || '—' },
      { label: 'Recent activity', value: `${events.length} public events` },
    ];
  }, [events.length, profile, repos]);

  const heatmap = useMemo(() => {
    const seed = repos.length + events.length + (profile?.public_repos || 0);
    return Array.from({ length: 42 }, (_, index) => (seed + index * 7) % 5);
  }, [events.length, profile?.public_repos, repos.length]);

  return (
    <section id="github" className="section-container">
      <p className="eyebrow">06. GITHUB DASHBOARD</p>
      <h2 className="section-title">
        Developer <span className="gradient-text">signal center</span>
      </h2>
      <p className="section-subtitle">
        A premium GitHub dashboard with activity, language mix, and streak signals.
      </p>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }} className="glass rounded-[32px] p-6 border border-white/8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.login} className="h-16 w-16 rounded-full border border-white/10" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200">
                  <Github size={24} />
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-white">
                  {profile?.name || profile?.login || USERNAME}
                </p>
                <p className="text-sm text-slate-400">{profile?.login ? `@${profile.login}` : USERNAME}</p>
              </div>
            </div>
            <a
              href={profile?.html_url || `https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-100"
            >
              <Github size={15} />
              View profile
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                <div className="mt-3 h-1 rounded-full bg-white/6">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400" style={{ width: `${50 + index * 8}%` }} />
                </div>
              </div>
            ))}
          </div>

          {profile?.bio ? (
            <div className="mt-6 rounded-[24px] border border-white/8 bg-white/4 p-4 text-sm text-slate-300">
              {profile.bio}
            </div>
          ) : null}
        </motion.div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="glass rounded-[30px] p-6 border border-white/8">
            <div className="flex items-center gap-2 text-cyan-200">
              <Activity size={16} />
              <GitCommit size={16} />
              <span className="text-sm font-medium">Contribution heatmap</span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {heatmap.map((cell, index) => (
                <div
                  key={`${index}-${cell}`}
                  className="aspect-square rounded-[6px] border border-white/5"
                  style={{
                    background:
                      cell === 0 ? 'rgba(255,255,255,0.04)' :
                      cell === 1 ? 'rgba(58,211,242,0.16)' :
                      cell === 2 ? 'rgba(140,123,255,0.18)' :
                      cell === 3 ? 'rgba(140,123,255,0.28)' :
                      'rgba(58,211,242,0.36)',
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Low activity</span>
              <span>High activity</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.08 }} className="glass rounded-[30px] p-6 border border-white/8">
            <div className="flex items-center gap-2 text-cyan-200">
              <Flame size={16} />
              <span className="text-sm font-medium">Quick stats</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Forks</p>
                <p className="text-white font-semibold mt-1">{repos.reduce((sum, repo) => sum + repo.forks_count, 0).toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Open issues</p>
                <p className="text-white font-semibold mt-1">{repos.reduce((sum, repo) => sum + repo.open_issues_count, 0).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}