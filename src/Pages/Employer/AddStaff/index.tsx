import React, { useEffect, useState } from 'react'
import {
    Form,
    notification,
    Typography,
    Descriptions,
    Avatar,
    Input,
    Pagination,
    Select
} from 'antd';
import Button from '../../../Components/Button';
import { Actions } from './actions';
import { FormItem } from '../../../Containers/FormItem/index';
import { getAllCompanies } from '../../../service/companies';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../reducers';


const { Title } = Typography;
interface ICompanies {
    id: string;
    name: string;
}


interface IFormValues {
    email: string;
    password: string,
    firstName: string,
    lastName: string,
    userRole: string,
    company: string
}
export default function AddStaff() {
    const [form] = Form.useForm();
    let dispatch = useDispatch();
    const [companies, setCompanies] = useState<[]>([]);
    const [companyIds, setCompanyIds] = useState<[]>([]);

    const {
        errorMessage,
        addStaffProgress,
        addStaffSuccess,
        addStaffFailure,
    } = useSelector((state: IRootState) => state.addStaff);
    const onFinish = (values: IFormValues) => {
        const index = companies.findIndex((company) => company === values.company)
        values.company = companyIds[index]

        dispatch(
            Actions.addStaffProgress({
                data: values,
            }),
        );
    };

    const openNotificationWithIcon = (
        type: 'success' | 'error',
        description: String | null,
    ) => {
        notification[type]({
            message: 'Notification Title',
            description: description,
        });
    };
    const onReset = () => {
        form.resetFields();
    };
    useEffect(() => {
        const response = getAllCompanies();
        response.then(data => {
            const companies: any = [];
            const ids: any = [];
            data?.data.map((company: ICompanies) => {
                companies.push(company.name);
                ids.push(company.id)
            });
            setCompanies(companies);
            setCompanyIds(ids);
        });
    }, []);

    useEffect(() => {
        if (addStaffSuccess) {
            onReset();
            openNotificationWithIcon('success', 'Member Added Successfully');
        } else if (addStaffFailure) {
            openNotificationWithIcon('error', errorMessage);
        }
    }, [addStaffSuccess, addStaffFailure, errorMessage]);
    return (
        <div>
            <Form
                style={{ paddingTop: '1rem' }}
                form={form}
                name="SearchCandidate"
                layout="vertical"
                onFinish={onFinish}
            >
                <Title ellipsis={false} level={4}>
                    Manage/Add Recruiters
                </Title>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                        {
                            type: 'email',
                            message: 'Invalid Email'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm-password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The two passwords that you entered do not match!',
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="User Role"
                    name="userRole"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}>
                    <Select>
                        <Select.Option value="EMPLOYERSTAFF">EMPLOYER STAFF</Select.Option>
                    </Select>
                </Form.Item>

                {FormItem({
                    name: 'company',
                    rules: [
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ],
                    label: 'Company',
                    placeholder: 'Select Company',
                    fieldType: 'dropDown',
                    options: companies,
                })}

                <div>
                    <Button
                        // loading={candidateSearchProgress}
                        htmlType="submit"
                        name="Add Member"
                        type
                    />
                    <Button htmlType="button" />
                </div>
            </Form>
        </div>
    )
}