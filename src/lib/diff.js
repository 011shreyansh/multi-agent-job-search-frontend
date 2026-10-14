// Line-level diff (longest common subsequence).
// Returns [{ type: "same" | "add" | "del", text }]
export function diffLines(oldText = "", newText = "") {
    const a = oldText.split("\n");
    const b = newText.split("\n");
    const m = a.length;
    const n = b.length;

    const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            dp[i][j] =
                a[i] === b[j]
                    ? dp[i + 1][j + 1] + 1
                    : Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
    }

    const out = [];
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
        if (a[i] === b[j]) {
            out.push({ type: "same", text: b[j] });
            i++;
            j++;
        } else if (dp[i + 1][j] >= dp[i][j + 1]) {
            out.push({ type: "del", text: a[i++] });
        } else {
            out.push({ type: "add", text: b[j++] });
        }
    }
    while (i < m) out.push({ type: "del", text: a[i++] });
    while (j < n) out.push({ type: "add", text: b[j++] });
    return out;
}