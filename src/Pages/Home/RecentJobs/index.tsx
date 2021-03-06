import React from 'react';
import styles from './index.module.scss';
import PrimaryButton from '../../../Components/PrimaryButton';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Tag from '../../../Components/Tag';
import { Row, Col, Typography } from 'antd';
import {
  DollarCircleOutlined,
  CalendarOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;
const RecentJobs = () => {
  const { recentJobsData } = useSelector(
    (state: IRootState) => state.recentJobs,
  );
  return (
    <>
      <div className={styles.recent_jobs_Wrapper}>
        <div className={styles.recentJobCard}>
          {recentJobsData &&
            Object.values(recentJobsData).map((data: any, index) => {
              return (
                <Row
                  key={index}
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                  gutter={20}
                  justify="center"
                >
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <img
                      className={styles.recentJobImage}
                      src={data.logoDownloadUri}
                      alt=""
                    />
                  </Col>
                  <Col md={20} sm={24} xs={24}>
                    <div className={styles.infoContainer}>
                      <Title className={styles.title}>{data.nameOfJob}</Title>
                      <Tag />
                      <div className={styles.jobDetail}>
                        <div className={styles.detail1}>
                          <Paragraph className={styles.firstDetail}>
                            <i className="fal fa-briefcase"></i>
                            <span className={styles.span}>
                              {data.recruiterType}
                            </span>
                          </Paragraph>
                        </div>
                        <div className={styles.detail2}>
                          {' '}
                          <Paragraph className={styles.secondDetail}>
                            <i className="fal fa-map-marked-alt"></i>
                            <span className={styles.span}>{data.location}</span>
                          </Paragraph>
                        </div>
                        <div className={styles.detail3}>
                          {' '}
                          <Paragraph className={styles.secondDetail}>
                            <i className="fal fa-money-bill-wave"></i>
                            <span
                              className={styles.span}
                            >{`$${data.salaryLowerLimit}-$${data.salaryUpperLimit}`}</span>
                          </Paragraph>
                        </div>
                        <div className={styles.detail4}>
                          {' '}
                          <Paragraph className={styles.secondDetail}>
                            <i className="fal fa-money-bill-wave"></i>
                            <span
                              className={styles.span}
                            >{`$${data.rateLowerLimit}-$${data.rateUpperLimit}`}</span>
                          </Paragraph>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })}
        </div>{' '}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PrimaryButton name="Show More Jobs" />
      </div>
    </>
  );
};
export default RecentJobs;
