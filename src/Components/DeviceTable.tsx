import React from "react";
import { Button, Table } from "react-bootstrap";
import { Device, dummyDevices } from "../models/device";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import DeviceForm from "./DeviceForm";
import { getDeviceById, getDeviceUsers } from "../Api/DeviceApi";
import { log } from "console";
import { User } from "../models/user";
import { get } from "http";
type Props = {
  devices: Device[];
  handleDeleteDevice: (id: number) => void;
  handleOpenForm?: () => void;
};

const DeviceTable = ({ devices, handleDeleteDevice }: Props) => {
  const [show, setShow] = React.useState(false);
  const [action, setAction] = React.useState("create" || "update" || "delete");
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedDevice, setSelectedDevice] = React.useState<Device>({
    id: 0,
    serialNumber: "",
    description: "",
    status: "",
    address: "",
    maxConsumption: 0,
    userId: 0,
  });
  const handleCLose = () => {
    console.log(selectedDevice);
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          variant="success"
          className="mt-4 "
          onClick={() => {
            setAction("create");
            setSelectedDevice({} as Device);
            getDeviceUsers().then((data) => {
              setUsers(data);
            });
            setShow(true);
          }}
        >
          Create device
          <FontAwesomeIcon icon={faPlug} />
        </Button>
      </div>
      <DeviceForm
        users={users}
        show={show}
        handleCLose={handleCLose}
        Selectdevice={selectedDevice}
        action={action}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Description</th>
            <th>Status</th>
            <th>Address</th>
            <th>Max Consumption</th>
            <th>User ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.serialNumber}</td>
              <td>{device.description || "-"}</td>
              <td>{device.status || "-"}</td>
              <td>{device.address || "-"}</td>
              <td>{device.maxConsumption || "-"}</td>
              <td>{device.userId || "-"}</td>
              <td className="w-10">
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => handleDeleteDevice(device.id || 0)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setSelectedDevice(device);
                    getDeviceUsers().then((data) => {
                      setUsers(data);
                    });
                    setShow(true);
                    setAction("update");
                  }}
                >
                  <FontAwesomeIcon icon={faUserPen} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DeviceTable;
