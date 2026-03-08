import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CallbackParams {
  status?: string;
  transaction_id?: string;
  error_code?: string;
  [key: string]: string | undefined;
}

function parseParams(search: string): CallbackParams {
  const urlParams = new URLSearchParams(search);
  const parsed: CallbackParams = {};
  urlParams.forEach((value, key) => {
    parsed[key] = value;
  });
  return parsed;
}

export default function Callback() {
  const navigate = useNavigate();
  const [rawQuery] = useState(() => window.location.search);
  const [params] = useState<CallbackParams>(() =>
    parseParams(window.location.search),
  );

  const isSuccess = params.status === "ok";
  const isError = params.status === "error";
  const hasData = Object.keys(params).length > 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⬛ Square POS コールバック</h1>

      {!hasData && (
        <div style={styles.emptyCard}>
          <p style={{ color: "#888" }}>パラメータがありません</p>
          <p style={{ color: "#555", fontSize: 13 }}>
            Square POS からのコールバックで自動的にパラメータが付与されます
          </p>
        </div>
      )}

      {hasData && (
        <>
          <div
            style={{
              ...styles.statusCard,
              borderColor: isSuccess ? "#2a4a2a" : isError ? "#4a2a2a" : "#333",
              background: isSuccess
                ? "#0d1f0d"
                : isError
                  ? "#1f0d0d"
                  : "#1a1a1a",
            }}
          >
            <div style={styles.statusRow}>
              <span style={styles.statusIcon}>
                {isSuccess ? "✅" : isError ? "❌" : "ℹ️"}
              </span>
              <div>
                <div style={styles.statusLabel}>ステータス</div>
                <div
                  style={{
                    ...styles.statusValue,
                    color: isSuccess
                      ? "#7ec87e"
                      : isError
                        ? "#e87e7e"
                        : "#e8c47e",
                  }}
                >
                  {params.status ?? "不明"}
                </div>
              </div>
            </div>

            {isSuccess && params.transaction_id && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Transaction ID</span>
                <span style={styles.detailValue}>{params.transaction_id}</span>
              </div>
            )}

            {isError && params.error_code && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Error Code</span>
                <span style={{ ...styles.detailValue, color: "#e87e7e" }}>
                  {params.error_code}
                </span>
              </div>
            )}
          </div>

          <div style={styles.allParamsCard}>
            <div style={styles.sectionTitle}>全パラメータ</div>
            {Object.entries(params).map(([key, value]) => (
              <div key={key} style={styles.paramRow}>
                <span style={styles.paramKey}>{key}</span>
                <span style={styles.paramValue}>{value}</span>
              </div>
            ))}
          </div>

          <div style={styles.rawCard}>
            <div style={styles.sectionTitle}>Raw Query String</div>
            <pre style={styles.pre}>{rawQuery || "(なし)"}</pre>
          </div>
        </>
      )}

      <button style={styles.backButton} onClick={() => navigate("/")}>
        ← テスト画面に戻る
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: "24px 16px",
    boxSizing: "border-box",
    maxWidth: 600,
    margin: "0 auto",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
  },
  emptyCard: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  statusCard: {
    border: "1px solid",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  statusIcon: {
    fontSize: 36,
  },
  statusLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 22,
    fontWeight: 700,
  },
  detailRow: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 8,
    borderTop: "1px solid #333",
  },
  detailLabel: {
    fontSize: 12,
    color: "#888",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f0f0f0",
    wordBreak: "break-all",
  },
  allParamsCard: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#888",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  paramRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: "1px solid #222",
    gap: 12,
  },
  paramKey: {
    fontSize: 13,
    color: "#aaa",
    fontWeight: 600,
    minWidth: 120,
  },
  paramValue: {
    fontSize: 13,
    color: "#f0f0f0",
    textAlign: "right",
    wordBreak: "break-all",
  },
  rawCard: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 24,
  },
  pre: {
    fontSize: 12,
    color: "#7ec87e",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    margin: 0,
  },
  backButton: {
    padding: "12px 0",
    background: "#222",
    color: "#ccc",
    border: "1px solid #444",
    borderRadius: 10,
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
  },
};
