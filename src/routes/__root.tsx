import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-script text-primary">404</h1>
        <h2 className="mt-4 text-xl font-serif">Page not found</h2>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Abdul Rahman & Noorjahan — Wedding Invitation" },
      { name: "description", content: "Join us in celebrating the wedding of Abdul Rahman & Noorjahan on June 1, 2026 at Shiraz Hall, Chennai." },
      { name: "theme-color", content: "#2a1f17" },
      { property: "og:title", content: "Abdul Rahman & Noorjahan — Wedding Invitation" },
      { property: "og:description", content: "Join us in celebrating the wedding of Abdul Rahman & Noorjahan on June 1, 2026 at Shiraz Hall, Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Abdul Rahman & Noorjahan — Wedding Invitation" },
      { name: "twitter:description", content: "Join us in celebrating the wedding of Abdul Rahman & Noorjahan on June 1, 2026 at Shiraz Hall, Chennai." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/252b2bd3-6da5-4a1b-ba3d-4b96a477a7ba/id-preview-177c7509--b80317d0-5878-4f23-a1c1-e901d867714d.lovable.app-1777596916540.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/252b2bd3-6da5-4a1b-ba3d-4b96a477a7ba/id-preview-177c7509--b80317d0-5878-4f23-a1c1-e901d867714d.lovable.app-1777596916540.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
