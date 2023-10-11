import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Space } from 'antd';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'


function App() {
  return (
    <div>
      <StyleProvider
        hashPriority='high'
        transformers={[
          legacyLogicalPropertiesTransformer,
          {
            visit: (cssObj) => {
              console.log('cssObj', cssObj)
              return cssObj;
            }
          }
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block>
            Primary
          </Button>
          <Button block>Default</Button>
          <Button type="dashed" block>
            Dashed
          </Button>
          <Button disabled block>
            disabled
          </Button>
          <Button type="text" block>
            text
          </Button>
          <Button type="link" block>
            Link
          </Button>
        </Space>
      </StyleProvider>
    </div>
  )
}


createRoot(document.getElementById('root')).render(<App />)