import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import "./AddIncomeModal.css"; // Custom CSS for consistent theming

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={() => {
        form.resetFields();
        handleIncomeCancel();
      }}
      footer={null}
      centered
      className="custom-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
        className="custom-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name of the transaction!" }]}
        >
          <Input placeholder="Enter transaction name" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input the income amount!" }]}
        >
          <Input type="number" placeholder="Enter amount" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select the income date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-datepicker" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select placeholder="Select a tag" className="custom-select">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="custom-button">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
