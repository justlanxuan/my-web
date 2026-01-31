import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const LogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const modules = import.meta.glob("/logs/*/index.md", {
          query: "?raw",
          import: "default",
          eager: true,
        });

        const targetPath = Object.keys(modules).find((path) =>
          path.includes(`/${slug}/`),
        );

        if (targetPath) {
          const content = modules[targetPath];

          // 解析 Frontmatter
          const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
          const metadata = {};
          if (fmMatch) {
            fmMatch[1].split("\n").forEach((line) => {
              const [key, ...val] = line.split(":");
              if (key && val.length > 0)
                metadata[key.trim()] = val.join(":").trim();
            });
          }

          const body = content.replace(/^---\s*[\s\S]*?\s*---/, "").trim();

          setCurrentPost({
            title: metadata.title || slug,
            date: metadata.date || "Unknown Date",
            tags: metadata.tags
              ? metadata.tags.split(",").map((t) => t.trim())
              : [],
            content: body,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading markdown:", error);
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      navigate("/log", { state: { initialSearch: searchQuery } });
    }
  }, [searchQuery, navigate]);

  if (loading)
    return (
      <div className="container" style={{ padding: "50px" }}>
        Loading...
      </div>
    );
  if (!currentPost)
    return (
      <div className="container" style={{ padding: "50px" }}>
        Post not found.
      </div>
    );

  return (
    <main className="container">
      <header>
        <nav>
          <Link to="/">Home</Link>&nbsp;|&nbsp;
          <Link to="/log">Log &#9679; 日志</Link>
        </nav>
      </header>

      {/* 文章正文 */}
      <article>
        <header style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "15px",
            }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "600",
                margin: 0,
                color: "#1a1a1a",
              }}>
              {currentPost.title}
            </h1>
            <time
              style={{
                fontSize: "14px",
                color: "#999",
                fontFamily: "monospace",
              }}>
              {currentPost.date}
            </time>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {currentPost.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  color: "#666",
                  background: "#f0f0f0",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="markdown-body"
          style={{
            lineHeight: "1.7",
            fontSize: "16px",
            color: "#333",
            minHeight: "400px",
          }}>
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

export default LogDetail;
