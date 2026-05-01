import { Heart, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const RECIPIENT = "ANwedding2412@gmail.com";
// FormSubmit.co — free, no signup, sends form data directly to the email.
// First submission triggers a one-time activation email to the recipient.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`;

export function Wishes() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);
    if (data) setWishes(data as Wish[]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) {
      toast.error("Please enter your name and a wish");
      return;
    }
    setSending(true);
    try {
      // Save to database
      await supabase
        .from("wishes")
        .insert({ name: cleanName, message: cleanMessage });

      // Send email directly via FormSubmit (no redirect, no mail app)
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          subject: `Wedding Wish from ${cleanName}`,
          message: cleanMessage,
          _template: "table",
          _captcha: "false",
        }),
      });

      toast.success(`JazakAllah Khair! Your wishes have been sent 🤲`, {
        description: `May Allah bless you too, ${cleanName}!`,
      });
      setName("");
      setMessage("");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Could not send your wish. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-arabesque py-20 px-6">
      <Reveal className="mx-auto max-w-xl">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-full border border-primary/40 flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-script text-5xl mt-6 text-cream">Your Wishes</h2>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Bless the couple with your prayers
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.25em] text-primary/80">
            Send Your Wishes
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-primary">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={80}
              className="mt-2 w-full rounded-lg border border-primary/30 bg-card/40 px-4 py-3 text-cream placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-primary">
              Your Wishes &amp; Duas
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your blessings & wishes..."
              rows={4}
              maxLength={1000}
              className="mt-2 w-full rounded-lg border border-primary/30 bg-card/40 px-4 py-3 text-cream placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-lg py-3.5 font-medium text-primary-foreground uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 transition hover:brightness-110"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Send className="h-4 w-4" />
            {sending ? "Sending..." : "Send Wishes"}
          </button>
        </form>

        {wishes.length > 0 && (
          <div className="mt-12">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-primary mb-5">
              Recent Wishes
            </p>
            <div className="space-y-3">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="rounded-xl border border-primary/15 bg-card/40 p-5"
                >
                  <p className="font-serif italic text-cream">"{w.message}"</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-primary">
                    — {w.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
