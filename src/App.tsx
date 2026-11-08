
import { useState } from "react";
import {
  Gamepad2, Download, Settings, User, Puzzle,
  Newspaper, ChevronDown, Play, FolderOpen,
  Plus, Search, Monitor, Globe, Palette
} from "lucide-react";

type Tab = "Home" | "Versions" | "Mods" | "Settings" | "Account";

export default function App() {
  const [tab, setTab] = useState<Tab>("Home");
  const [version, setVersion] = useState("Release 1.21.4");
  const [ram, setRam] = useState(4);
  const [mods, setMods] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);

  const nav = [
    { name: "Home" as Tab, icon: Gamepad2 },
    { name: "Versions" as Tab, icon: Download },
    { name: "Mods" as Tab, icon: Puzzle },
    { name: "Settings" as Tab, icon: Settings },
    { name: "Account" as Tab, icon: User }
  ];

  function addMod() {
    const name = prompt("Enter mod name:");
    if (name?.trim()) setMods([...mods, name.trim()]);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <strong>TLauncher</strong>
            <small>WEB EDITION</small>
          </div>
        </div>

        <div className="nav-label">LAUNCHER</div>

        {nav.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`nav-item ${tab === item.name ? "active" : ""}`}
              onClick={() => setTab(item.name)}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}

        <div className="sidebar-bottom">
          <div className="online-status">
            <span className="status-dot" />
            Web launcher ready
          </div>
          <small>Version 1.0.0</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Launcher / </span>
            <strong>{tab}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button" onClick={() => setTab("Settings")}>
              <Settings size={18} />
            </button>
            <button className="profile-button" onClick={() => setTab("Account")}>
              <User size={18} /> Guest
            </button>
          </div>
        </header>

        {tab === "Home" && (
          <div className="content">
            <section className="hero">
              <div className="hero-overlay" />
              <div className="hero-content">
                <span className="tag">MINECRAFT WEB LAUNCHER</span>
                <h1>Your next<br />adventure awaits.</h1>
                <p>Choose your version and jump into your world.</p>

                <div className="launch-controls">
                  <label className="version-select">
                    <span>GAME VERSION</span>
                    <select value={version} onChange={e => setVersion(e.target.value)}>
                      <option>Release 1.21.4</option>
                      <option>Release 1.21.1</option>
                      <option>Release 1.20.4</option>
                      <option>Release 1.19.4</option>
                      <option>Release 1.18.2</option>
                    </select>
                  </label>

                  <button
                    className="play-button"
                    onClick={() => setPlaying(!playing)}
                  >
                    <Play size={20} fill="currentColor" />
                    {playing ? "STOP DEMO" : "PLAY"}
                  </button>
                </div>

                {playing && (
                  <div className="launch-message">
                    Browser demo started! Native Minecraft launching isn't
                    supported by this web interface.
                  </div>
                )}
              </div>
            </section>

            <div className="section-heading">
              <div>
                <h2>Quick access</h2>
                <p>Your launcher, your way.</p>
              </div>
            </div>

            <div className="quick-grid">
              <button className="quick-card" onClick={() => setTab("Versions")}>
                <div className="quick-icon purple"><Download /></div>
                <h3>Versions</h3>
                <p>Explore game versions</p>
                <span>Manage →</span>
              </button>

              <button className="quick-card" onClick={() => setTab("Mods")}>
                <div className="quick-icon green"><Puzzle /></div>
                <h3>Mod library</h3>
                <p>{mods.length} installed mods</p>
                <span>Browse →</span>
              </button>

              <button className="quick-card" onClick={() => setTab("Settings")}>
                <div className="quick-icon orange"><Settings /></div>
                <h3>Settings</h3>
                <p>Customize your launcher</p>
                <span>Configure →</span>
              </button>
            </div>
          </div>
        )}

        {tab === "Versions" && (
          <div className="page-content">
            <h1>Game versions</h1>
            <p>Choose a version for your launcher profile.</p>
            {["1.21.4", "1.21.1", "1.20.4", "1.19.4", "1.18.2"].map(v => (
              <div className="list-card" key={v}>
                <div className="version-icon"><Gamepad2 /></div>
                <div className="list-info">
                  <strong>Minecraft {v}</strong>
                  <small>Release version</small>
                </div>
                <button className="secondary-button" onClick={() => {
                  setVersion(`Release ${v}`);
                  setTab("Home");
                }}>
                  Select
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "Mods" && (
          <div className="page-content">
            <div className="page-header">
              <div>
                <h1>Mod library</h1>
                <p>Manage your local mod list.</p>
              </div>
              <button className="primary-button" onClick={addMod}>
                <Plus size={18} /> Add mod
              </button>
            </div>
            {mods.length === 0 && <div className="empty-state">
              <Puzzle size={36} />
              <h3>Your mod library is empty</h3>
              <p>Add mod names to start organizing your collection.</p>
            </div>}
            {mods.map((mod, i) => (
              <div className="list-card" key={`${mod}-${i}`}>
                <Puzzle />
                <div className="list-info"><strong>{mod}</strong><small>Custom mod entry</small></div>
                <button className="secondary-button" onClick={() => setMods(mods.filter((_, index) => index !== i))}>Remove</button>
              </div>
            ))}
          </div>
        )}

        {tab === "Settings" && (
          <div className="page-content">
            <h1>Settings</h1>
            <p>Customize your launcher experience.</p>

            <div className="settings-card">
              <div className="setting-row">
                <div><strong>Memory allocation</strong><p>RAM assigned to the browser demo</p></div>
                <strong>{ram} GB</strong>
              </div>
              <input type="range" min="1" max="16" value={ram} onChange={e => setRam(Number(e.target.value))} />
            </div>

            <div className="settings-card">
              <div className="setting-row">
                <div><strong>Launcher theme</strong><p>Interface appearance</p></div>
                <span>Dark</span>
              </div>
            </div>

            <div className="settings-card">
              <div className="setting-row">
                <div><strong>Game directory</strong><p>Browser storage simulation</p></div>
                <FolderOpen />
              </div>
            </div>
          </div>
        )}

        {tab === "Account" && (
          <div className="page-content">
            <h1>Account</h1>
            <p>Launcher profile</p>
            <div className="account-card">
              <div className="avatar"><User size={35}/></div>
              <h2>Guest Player</h2>
              <span className="guest-tag">OFFLINE DEMO</span>
              <p>Sign-in is not connected. This demo does not collect credentials.</p>
            </div>
          </div>
        )}

        <footer>
          <span>WebTLauncher • Independent browser project</span>
          <span>Not affiliated with Mojang or TLauncher.</span>
        </footer>
      </main>
    </div>
  );
}
