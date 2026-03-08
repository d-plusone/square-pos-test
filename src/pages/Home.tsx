import { useState } from "react";

const CURRENCY_CODE = "JPY";
const CALLBACK_URL = `${window.location.origin}/callback`;

export default function Home() {
  const [clientId, setClientId] = useState(
    import.meta.env.VITE_SQUARE_CLIENT_ID ?? "",
  );
  const [amount, setAmount] = useState("1000");
  const [notes, setNotes] = useState("");

  function handleLaunch() {
    if (!clientId.trim()) {
      alert("Client ID (Application ID) を入力してください");
      return;
    }
    const amountNum = parseInt(amount, 10);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("金額を正しく入力してください");
      return;
    }

    const data = {
      amount_money: {
        amount: amountNum,
        currency_code: CURRENCY_CODE,
      },
      callback_url: CALLBACK_URL,
      client_id: clientId.trim(),
      version: "1.3",
      notes: notes,
      options: {
        supported_tender_types: ["CASH"],
        skip_receipt: true,
        auto_return: true,
      },
    };

    const encoded = encodeURIComponent(JSON.stringify(data));
    const url = `square-commerce-v1://payment/create?data=${encoded}`;
    window.location.href = url;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⬛ Square POS テスター</h1>
      <p style={styles.subtitle}>現金決済テスト用</p>

      <div style={styles.card}>
        <label style={styles.label}>
          Client ID <span style={styles.required}>*</span>
          <span style={styles.hint}>（Square Application ID）</span>
        </label>
        <input
          style={styles.input}
          type="text"
          placeholder="sq0idp-xxxxxxxxxxxxxxxxxx"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />

        <label style={styles.label}>
          金額 <span style={styles.required}>*</span>
        </label>
        <input
          style={styles.input}
          type="number"
          min={1}
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label style={styles.label}>
          Notes <span style={styles.required}>*</span>
        </label>
        <textarea
          style={{ ...styles.input, height: 80, resize: "vertical" }}
          placeholder="ORDERS受注ID"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div style={styles.callbackInfo}>
          <span style={styles.callbackLabel}>Callback URL（固定）</span>
          <span style={styles.callbackValue}>{CALLBACK_URL}</span>
        </div>

        <div style={styles.tenderBadge}>
          <span>💵</span> 支払い方法: <strong>現金のみ</strong> (CASH)
        </div>

        <button style={styles.button} onClick={handleLaunch}>
          🚀 Square POSアプリを起動
        </button>
      </div>

      <div style={styles.info}>
        <p>
          <strong>送信JSON プレビュー:</strong>
        </p>
        <pre style={styles.pre}>
          {JSON.stringify(
            {
              amount_money: {
                amount: parseInt(amount, 10) || 0,
                currency_code: CURRENCY_CODE,
              },
              callback_url: CALLBACK_URL,
              client_id: clientId || "(未入力)",
              version: "1.3",
              notes: notes,
              options: {
                supported_tender_types: ["CASH"],
                skip_receipt: true,
                auto_return: true,
              },
            },
            null,
            2,
          )}
        </pre>
      </div>
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
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    color: "#888",
    marginBottom: 24,
    marginTop: 0,
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#ccc",
    marginTop: 12,
    marginBottom: 4,
  },
  required: {
    color: "#ff4d4d",
    marginLeft: 4,
  },
  hint: {
    fontWeight: 400,
    color: "#666",
    fontSize: 12,
    marginLeft: 6,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#0d0d0d",
    border: "1px solid #444",
    borderRadius: 8,
    color: "#f0f0f0",
    fontSize: 15,
    boxSizing: "border-box",
    outline: "none",
  },
  tenderBadge: {
    marginTop: 16,
    padding: "8px 12px",
    background: "#1e2a1e",
    border: "1px solid #2a4a2a",
    borderRadius: 8,
    fontSize: 14,
    color: "#7ec87e",
  },
  button: {
    marginTop: 20,
    padding: "14px 0",
    background: "#3d72e8",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    letterSpacing: "0.02em",
  },
  info: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    padding: "16px 20px",
  },
  pre: {
    fontSize: 12,
    color: "#7ec87e",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    margin: 0,
  },
  callbackInfo: {
    marginTop: 12,
    padding: "10px 12px",
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  callbackLabel: {
    fontSize: 11,
    color: "#666",
  },
  callbackValue: {
    fontSize: 13,
    color: "#888",
    wordBreak: "break-all" as const,
  },
};
