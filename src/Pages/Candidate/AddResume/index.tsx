import React from 'react'
import { Upload, message, Form, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
const Dragger = Upload.Dragger

export default function AddResume() {
    const props = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange(info: any) {
            const status = info.file.status;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div style={{ marginTop: 16, height: 180 }}>
            <h5>UPLOAD RESUME</h5>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Form layout="vertical" style={{ width: '60%', margin: '1rem' }}>
                    <Form.Item
                        label="Job Name">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Job Type">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Posting Date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        label="Expiry Date">
                        <Input type="date" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}