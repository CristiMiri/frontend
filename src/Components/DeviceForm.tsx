import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { Device } from "../models/device";
import { User } from "../models/user";
import { insertDevice, updateDevice } from "../Api/DeviceApi";

type Props = {
  Selectdevice: Device;
  action: string;
  show: boolean;
  handleCLose: () => void;
  users: User[];
};

const DeviceForm = ({
  Selectdevice,
  show,
  handleCLose,
  users,
  action,
}: Props) => {
  const [device, setDevice] = useState<Device>({
    id: 0,
    serialNumber: "",
    description: "",
    status: "",
    address: "",
    maxConsumption: 0,
    userId: 0,
  });

  return (
    <Modal show={show}>
      <ModalBody>
        <Form>
          <FormGroup>
            <Form.Label>Serial Number</Form.Label>
            <FormControl
              type="text"
              name="sericalNumber"
              defaultValue={Selectdevice.serialNumber}
              // defaultValue={Selectdevice.serialNumber}
              onChange={(e) => {
                setDevice({ ...device, serialNumber: e.target.value });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Description</Form.Label>
            <FormControl
              type="text"
              name="description"
              defaultValue={Selectdevice.description}
              onChange={(e) => {
                setDevice({ ...device, description: e.target.value });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Status</Form.Label>
            <FormSelect
              aria-label="Status"
              name="status"
              defaultValue={Selectdevice.status}
              //   value={formData.status || ""}
              onChange={(e) => {
                setDevice({ ...device, status: e.target.value });
              }}
            >
              <option value="">Select a status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <Form.Label>Address</Form.Label>
            <FormControl
              type="text"
              name="address"
              defaultValue={Selectdevice.address}
              //   value={formData.address || ""}
              onChange={(e) => {
                setDevice({ ...device, address: e.target.value });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Max Consumption</Form.Label>
            <FormControl
              type="number"
              name="maxConsupmtion"
              defaultValue={Selectdevice.maxConsumption}
              onChange={(e) => {
                setDevice({
                  ...device,
                  maxConsumption: parseFloat(e.target.value),
                });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>User ID</Form.Label>
            <FormSelect
              name="userId"
              defaultValue={Selectdevice.userId}
              onChange={(e) => {
                setDevice({ ...device, userId: parseInt(e.target.value) });
              }}
            >
              <option value={0}>Select a user</option>
              {users.map((user) => (
                <option value={user.id}>{user.username}</option>
              ))}
            </FormSelect>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleCLose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            if (action === "create") {
              insertDevice(device).then((data) => {
                console.log(data);
              });
            } else if (action === "update") {
              if (device.serialNumber === "") {
                device.serialNumber = Selectdevice.serialNumber;
              }
              if (device.description === "") {
                device.description = Selectdevice.description;
              }
              if (device.status === "") {
                device.status = Selectdevice.status;
              }
              if (device.address === "") {
                device.address = Selectdevice.address;
              }
              if (device.maxConsumption === 0) {
                device.maxConsumption = Selectdevice.maxConsumption;
              }
              if (device.userId === 0) {
                device.userId = Selectdevice.userId;
              }

              updateDevice(device).then((data) => {
                console.log(data);
              });
            }
            handleCLose();
            console.log(device);
          }}
        >
          Save changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeviceForm;
function getDeviceOwners() {
  throw new Error("Function not implemented.");
}
