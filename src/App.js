import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';

const API_URL = 'http://0.0.0.0:8000/images/';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Initial data fetch
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderImages = (type) => {
    return data
      .filter((item) => item.type.toLowerCase() === type.toLowerCase())
      .map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={item.url}
              alt={item.file_path}
              style={{ width: 200, height: 200, objectFit: 'cover' }}
            />
            <p style={{ marginTop: 10 }}>
              Created at: {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ));
  };

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Dogs</h2>
          {renderImages('dog')}
        </Col>
        <Col span={12}>
          <h2>Cats</h2>
          {renderImages('cat')}
        </Col>
      </Row>
    </div>
  );
};

export default App;