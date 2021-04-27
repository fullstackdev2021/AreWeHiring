import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Form, Upload, Space } from 'antd';
import InputField from './../../../Components/InputField/index';
import styles from './index.module.scss';
import { Actions } from './actions';
import Button from './../../../Components/Button/index';
import TagsField from './../../../Components/InputFieldsWithTags/index';
import {
  UploadOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import Label from './../../../Components/Label/index';
import TextEditor from './../../../Components/TextEditor/index';
import Rules from './../../../Content/Rules.json';
const { Item, List } = Form;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

const Candidate = () => {
  let dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    dispatch(
      Actions.addCandidateProgress({
        data: values,
      }),
    );
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const { name, professionalTitle, location, resumeCategory } = Rules;
  return (
    <React.Fragment>
      <Form
        {...formItemLayout}
        form={form}
        name="addCandidate"
        onFinish={onFinish}
        scrollToFirstError
      >
        <main className={styles.candidateFieldWrapper}>
          {/*First Name Field */}
          <Item name="firstName" rules={name}>
            <InputField
              label="First Name"
              name="name"
              type="text"
              placeholder="Jonathan Palmeri"
            />
          </Item>
          {/*Last Name Field */}
          <Item name="lastName" rules={name}>
            <InputField
              label="Last Name"
              name="name"
              type="text"
              placeholder="Jonathan Palmeri"
            />
          </Item>
          {/*Middle Name Field */}
          <Item name="middleName">
            <InputField
              label="Middle Name"
              name="name"
              type="text"
              optional
              placeholder="Jonathan Palmeri"
            />
          </Item>
          {/* Email Field */}
          <Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <InputField
              label="Your Email"
              name="email"
              type="text"
              placeholder="Jon@RexRecruiting.com"
            />
          </Item>
          {/* Professional Title Field */}
          <Item name="professionalTitle" rules={professionalTitle}>
            <InputField
              label="Professional Title"
              name="professionalTitle"
              type="text"
              placeholder="Recruiter"
            />
          </Item>
          {/* Location Field */}
          <Item name="location" rules={location}>
            <InputField
              label="Location"
              name="location"
              type="text"
              placeholder="United States"
            />
          </Item>
          {/* Upload Image Button */}
          <Item
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button
                icon={<UploadOutlined />}
                placeholder="Maximum file size: 50 MB."
                label="Photo"
                optional
                name="Browse"
              />{' '}
            </Upload>
          </Item>
          {/* Video Field */}
          <Item name="video">
            <InputField
              label="Video"
              optional={true}
              type="text"
              name="video"
              placeholder="A link to a video about yourself"
            />
          </Item>
          {/* Tags Input Field */}
          <Item name="resumeCategory">
            <TagsField
              name="resumeCategory"
              placeholder="Enter Keyword"
              label="Resume category"
            />
          </Item>
          {/* Minimum rate Field */}
          <Item name="minimumRate">
            <InputField
              label="Minimum rate/h ($)"
              optional={true}
              type="text"
              name="rate"
              placeholder="75"
            />
          </Item>
          {/* Resume Content Fields */}
          <Item name="resumeContent">
            <TextEditor label="Resume Content" />
          </Item>
          {/* Skills Field */}
          <Item name="skills">
            <InputField
              label="Skills"
              optional={true}
              type="text"
              name="skills"
              placeholder="Comma separate a list of relevant skills"
            />
          </Item>
          <Divider className={styles.divider} />
          {/*Video Url Field*/}
          <List name="profileUrls">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button
                    icon={<PlusCircleOutlined />}
                    placeholder="Optionally provide links to any of your websites or social network profiles"
                    label="URL(s)"
                    optional
                    disabled={fields.length > 1}
                    onClick={() => add()}
                    name="Add URL"
                  />
                </Form.Item>{' '}
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} className={styles.space}>
                    <Form.Item
                      {...restField}
                      className={styles.formItem}
                      name={[name, 'url']}
                      fieldKey={[fieldKey, 'url']}
                    >
                      <InputField
                        type="text"
                        name="url"
                        placeholder="links to any of your websites"
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </List>
          <Divider className={styles.divider} />
          {/*Education Field*/}
          <List name="education">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    disabled={fields.length > 1}
                    icon={<PlusCircleOutlined />}
                    label="Education"
                    optional
                    name="Add Education"
                  />
                </Form.Item>{' '}
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} className={styles.space}>
                    <Form.Item
                      {...restField}
                      style={{ width: '100%' }}
                      name={[name, 'education']}
                      fieldKey={[fieldKey, 'education']}
                    >
                      <InputField
                        type="text"
                        name="education"
                        placeholder="Add Video Url if any"
                      />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </List>
          <Divider className={styles.divider} />
          {/*Experience Fields*/}
          <Label label="Experience" optional />
          <List name="experienceList">
            {(fields, { add, remove }) => (
              <>
                {' '}
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} className={styles.space}>
                    <div className={styles.experience}>
                      <Form.Item
                        {...restField}
                        style={{ width: '100%' }}
                        name={[name, 'employer']}
                        fieldKey={[fieldKey, 'employer']}
                      >
                        <InputField
                          label="Employer"
                          name="employer"
                          type="text"
                          placeholder="Rex Recruiting"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        style={{ width: '100%' }}
                        name={[name, 'jobTitle']}
                        fieldKey={[fieldKey, 'jobTitle']}
                      >
                        <InputField
                          label="Job Title"
                          name="jobtitle"
                          type="text"
                          placeholder="Job Title"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        style={{ width: '100%' }}
                        name={[name, 'startEndDate']}
                        fieldKey={[fieldKey, 'startEndDate']}
                      >
                        <InputField
                          label="Start/End date"
                          name="date"
                          type="text"
                          placeholder="2019 - Present"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        style={{ width: '100%' }}
                        name={[name, 'notes']}
                        fieldKey={[fieldKey, 'notes']}
                      >
                        <InputField
                          label="Notes"
                          name="notes"
                          optional
                          type="text"
                          placeholder="Jonathon founded Rex Recruiting to leverage his Insurance, Finance, Healthcare, and Manufacturing staf ng experience to grow, staff and innovate the
            technology companies that are reshaping these industries. (Fintech, Insurtech, Healthcare Technology, Robotics Process Automation, Compliance &
            26
            Cybersecurity)"
                          textarea
                        />
                      </Form.Item>
                    </div>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    icon={<PlusCircleOutlined />}
                    name="Add Experience"
                  />
                </Form.Item>
              </>
            )}
          </List>
          <Divider className={styles.divider} />
          {/* Upload Image Button */}
          <Item
            name="resumeFile"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button
                icon={<UploadOutlined />}
                placeholder="Optionally upload your resume for employers to view. Max. file size: 50 MB"
                label="Resume File"
                optional
                name="Browse"
              />
            </Upload>
          </Item>
        </main>
        <Button htmlType="submit" name="Save Changes" type />
      </Form>
    </React.Fragment>
  );
};

export default Candidate;
