import React, { useState } from "react";

function TestApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function testApiCall() {
    setLoading(true);
    try {
      // 使用 process.env 访问环境变量，而不是 import.meta.env
      const response = await fetch(`${process.env.REACT_APP_API_URL}/log`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>API 测试</h1>
      <button onClick={testApiCall} disabled={loading}>
        {loading ? "正在请求..." : "测试 API"}
      </button>
      {error && <p>错误: {error}</p>}
      {data && (
        <div>
          <h2>API 响应数据:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TestApi; 