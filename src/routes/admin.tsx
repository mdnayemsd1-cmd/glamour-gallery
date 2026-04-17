import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  addImages,
  clearImages,
  GALLERY_EVENT,
  getImages,
  removeImage,
} from "@/lib/gallery";

const AUTH_KEY = "sgf_admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin · SuperGirlfred" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin123") {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setErr("");
    } else {
      setErr("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setUser("");
    setPass("");
  };

  return (
    <div className="min-h-screen sgf-animated-bg">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8 gap-4">
          <Logo />
          <Link
            to="/"
            className="text-pink-200/80 text-sm hover:text-pink-100 underline underline-offset-4"
          >
            ← Site
          </Link>
        </div>

        {!authed ? (
          <form
            onSubmit={login}
            className="max-w-sm mx-auto rounded-2xl border border-pink-500/20 bg-black/60 backdrop-blur-md p-6 shadow-[0_10px_60px_-10px_rgba(236,72,153,0.5)]"
          >
            <h2 className="text-xl font-semibold text-pink-100 mb-4">Admin Login</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="u" className="text-pink-100/80">Username</Label>
                <Input
                  id="u"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="mt-1 bg-white/5 border-pink-500/30 text-white"
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="p" className="text-pink-100/80">Password</Label>
                <Input
                  id="p"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="mt-1 bg-white/5 border-pink-500/30 text-white"
                  autoComplete="current-password"
                />
              </div>
              {err && <p className="text-red-400 text-sm">{err}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
              >
                Sign in
              </Button>
            </div>
          </form>
        ) : (
          <Dashboard onLogout={logout} />
        )}
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [bulk, setBulk] = useState("");
  const [images, setImagesState] = useState<string[]>([]);

  useEffect(() => {
    setImagesState(getImages());
    const sync = () => setImagesState(getImages());
    window.addEventListener(GALLERY_EVENT, sync);
    return () => window.removeEventListener(GALLERY_EVENT, sync);
  }, []);

  const onAdd = () => {
    const urls = bulk
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (urls.length === 0) return;
    addImages(urls);
    setBulk("");
  };

  const onClear = () => {
    if (confirm("Delete ALL images?")) clearImages();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-pink-100">Dashboard</h2>
        <Button variant="outline" onClick={onLogout} className="border-pink-500/40 text-pink-100 bg-transparent hover:bg-pink-500/10">
          Logout
        </Button>
      </div>

      <div className="rounded-2xl border border-pink-500/20 bg-black/60 backdrop-blur-md p-5">
        <Label className="text-pink-100/80">Paste image URLs (one per line)</Label>
        <Textarea
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          rows={8}
          placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
          className="mt-2 bg-white/5 border-pink-500/30 text-white"
        />
        <div className="flex gap-3 mt-3 flex-wrap">
          <Button
            onClick={onAdd}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
          >
            Add All Images
          </Button>
          <Button
            variant="destructive"
            onClick={onClear}
            disabled={images.length === 0}
          >
            Clear All Images
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-pink-500/20 bg-black/60 backdrop-blur-md p-5">
        <h3 className="text-pink-100 font-semibold mb-3">
          Current images ({images.length})
        </h3>
        {images.length === 0 ? (
          <p className="text-pink-100/60 text-sm">No images yet.</p>
        ) : (
          <ul className="space-y-2">
            {images.map((src, i) => (
              <li
                key={`${src}-${i}`}
                className="flex items-center gap-3 rounded-lg bg-white/5 border border-pink-500/15 p-2"
              >
                <img
                  src={src}
                  alt=""
                  className="h-12 w-12 object-cover rounded-md flex-shrink-0"
                />
                <span className="flex-1 truncate text-xs text-pink-100/80">{src}</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeImage(i)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
