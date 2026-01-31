import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Log = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [langFilter, setLangFilter] = useState("All Entries");

  useEffect(() => {
    try {
      const modules = import.meta.glob("/logs/*/index.md", {
        query: "?raw",
        import: "default",
        eager: true,
      });

      const loadedLogs = Object.keys(modules).map((path) => {
        const content = modules[path];
        const pathParts = path.split("/");
        const slug = pathParts[pathParts.length - 2];

        const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
        const metadata = {};
        if (fmMatch) {
          fmMatch[1].split("\n").forEach((line) => {
            const [key, ...val] = line.split(":");
            if (key && val.length > 0)
              metadata[key.trim()] = val.join(":").trim();
          });
        }

        return {
          slug,
          title: metadata.title || slug,
          date: metadata.date || "Unknown Date",
          lang: (metadata.lang || "en").toLowerCase(),
          tags: metadata.tags
            ? metadata.tags.split(",").map((t) => t.trim())
            : [],
          excerpt:
            content
              .replace(/^---\s*[\s\S]*?\s*---/, "")
              .trim()
              .slice(0, 150) + "...",
        };
      });

      setLogs(loadedLogs.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Vite glob import error:", error);
    }
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // 映射逻辑
      const matchesLang =
        langFilter === "All Entries" ||
        (langFilter === "仅中文" && log.lang === "zh") ||
        (langFilter === "English Only" && log.lang === "en");

      const matchesSearch =
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesLang && matchesSearch;
    });
  }, [logs, langFilter, searchQuery]);

  const handleSelect = (opt) => {
    setLangFilter(opt);
  };

  const options = ["All Entries", "仅中文", "English Only"];

  return (
    <main className="container">
      <header>
        <nav>
          <Link to="/">Home</Link>
          &nbsp;|&nbsp;Log &#9679; 日志
        </nav>
      </header>

      <section>
        {/* 搜索与筛选控制栏 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
          {/* 三态筛选按钮组 */}
          <div
            style={{
              display: "inline-flex",
              gap: "10px",
              alignItems: "center",
            }}>
            {options.map((opt) => {
              const isSelected = langFilter === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setLangFilter(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "transparent",
                    fontSize: "16px",
                    cursor: "pointer",
                    border: "none",
                    padding: "2px 0",
                    // 选中时文字变黑，未选中时为链接色
                    color: isSelected ? "var(--link)" : "#000000",
                    fontFamily: "inherit",
                  }}>
                  {/* 外圆圈容器 */}
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      flexShrink: 0, // 核心：防止被挤压变形
                      borderRadius: "50%",
                      border: `1px solid ${isSelected ? "var(--link)" : "#ccc"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}>
                    {/* 内部实心点 */}
                    {isSelected && (
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          flexShrink: 0, // 核心：防止变形
                          borderRadius: "50%",
                          background: "var(--link)",
                        }}
                      />
                    )}
                  </span>

                  <span style={{ lineHeight: "1" }}>{opt}</span>
                </button>
              );
            })}
          </div>

          <input
            type="text"
            aria-label="search area"
            placeholder="Search logs or tags..."
            style={{
              flex: 1,
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.slug} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "15px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}>
                    <Link
                      to={`/log/${log.slug}`}
                      className="log-title-link"
                      style={{
                        fontSize: "20px",
                        color: "var(--link)",
                        textDecoration: "none",
                      }}>
                      {log.title}
                    </Link>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#000000ff",
                      }}>
                      {log.date}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        textTransform: "uppercase",
                      }}>
                      {log.lang}
                    </span>
                    {log.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "14px",
                          background: "#f2f2f2ff",
                          padding: "1px 6px",
                          borderRadius: "3px",
                          color: "#575757ff",
                          border: "1px solid #eee",
                        }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div
            style={{ textAlign: "center", marginTop: "80px", color: "#999" }}>
            <p>No results found | 无结果</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Log;
