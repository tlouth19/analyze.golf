const title = "Analyze.Golf | Free Swing Analysis Tool | No App Download";
const description =
  "Analyze.Golf is a free browser-based golf swing analysis tool. No app download or file uploading necessary.";

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Swing Analysis, Golf Swing, Golf Swing Analysis, Free Golf Swing Analysis"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0788DE" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#0788DE"></meta>

      <meta name="og:url" content="https://analyze.golf" />
      <meta name="og:type" content="website" />
      <meta name="og:description" content={description} />
      <meta name="og:image" content="https://analyze.golf/og.jpg" />
      <meta name="og:image:type" content="image/jpg" />
      <meta name="og:site" content="@analyze.golf" />
      <meta name="og:creator" content="@analyze.golf" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@analyze.golf" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://analyze.golf/og.jpg" />
    </>
  );
}
