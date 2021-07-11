import {useState} from 'react';
import {Form, Button, Spin, Select, Row, Col, Typography} from 'antd';
import {useFormik} from 'formik';
import axios from 'axios';
import css from './dependencyDetailsForm.module.css';

const {Title} = Typography;
const {Option} = Select;

const DependencyDetailsForm = ({serviceInfo, setServiceInfo, dependencyOptions, onSuccess}) => {
  const serviceId = serviceInfo._id;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: serviceInfo,
    onSubmit: (values) => onSave(values),
  });

  const onSave = async (values) => {
    try {
      setSubmitting(true);
      const {data} = await axios.put(`http://localhost:8080/service/${serviceId}`, values);
      setServiceInfo(values);
      setSubmitting(false);
      onSuccess();
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  if (error) {
    return null;
  }

  return (
    <div>
      <div className={css.spinnerContainer}>
        <Spin spinning={submitting} tip="Loading..." />
      </div>
      {!submitting && (
        <Form>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <Title level={5}>Dependencies</Title>
              <Select
                style={{width: '100%'}}
                name="dependency"
                mode="multiple"
                value={formik.values.dependency}
                placeholder="Please select dependencies"
                onChange={(newValues) => formik.setFieldValue('dependency', newValues)}>
                {dependencyOptions?.map(({_id, name}) => {
                  if (serviceId !== _id) {
                    return (
                      <Option value={_id} key={_id}>
                        {name}
                      </Option>
                    );
                  }
                })}
              </Select>
            </Col>
            <Col xs={24}>
              <Button type="primary" onClick={() => formik.handleSubmit(formik.values)}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default DependencyDetailsForm;
