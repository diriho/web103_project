const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const failurePage = (req, res) => {
  const requestedRoute = escapeHtml(req.originalUrl);

  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 | Ballon d'Or Catalogue</title>
        <style>
          :root {
            --bg: #0b1120;
            --surface: #1e293b;
            --border: #334155;
            --gold: #fbbf24;
            --gold-soft: #fcd34d;
            --text: #f1f5f9;
            --text-muted: #94a3b8;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 2rem;
            background:
              radial-gradient(900px 460px at 80% 0%, rgba(251, 191, 36, 0.14), transparent 60%),
              radial-gradient(720px 420px at 5% 15%, rgba(59, 130, 246, 0.10), transparent 55%),
              var(--bg);
            color: var(--text);
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          main {
            width: min(680px, 100%);
            padding: 2rem;
            border: 1px solid var(--border);
            border-radius: 16px;
            background: rgba(30, 41, 59, 0.74);
            text-align: center;
          }

          p.status {
            color: var(--gold);
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          h1 {
            margin-top: 0.75rem;
            font-size: clamp(2rem, 7vw, 4rem);
            line-height: 1.05;
            background: linear-gradient(135deg, var(--gold-soft), var(--gold) 60%, #b45309);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
          }

          p.message {
            max-width: 48ch;
            margin: 1rem auto 1.75rem;
            color: var(--text-muted);
            font-size: 1.05rem;
            line-height: 1.7;
          }

          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0.8rem 1.25rem;
            border-radius: 10px;
            background: linear-gradient(135deg, var(--gold-soft), var(--gold));
            color: #1a1305;
            font-weight: 700;
            text-decoration: none;
          }

          a:hover {
            filter: brightness(1.08);
          }
        </style>
      </head>
      <body>
        <main>
          <p class="status">404 - Page not found</p>
          <h1>Out of play</h1>
          <p class="message">
            The route "${requestedRoute}" does not exist in the Ballon d'Or Catalogue.
            Return home to explore the winners list.
          </p>
          <a href="/">Back to catalogue</a>
        </main>
      </body>
    </html>
  `);
};

export default failurePage;
