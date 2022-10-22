import { useEffect, useState } from "react";
import { Nav, Table, Image, Form, Card, Button } from "react-bootstrap";
import { BsLightbulbFill, BsLightbulb } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, getUserActions } from "./Store/GetUserSlice";
import { updateData } from "./Store/PostUserSlice";

export default function UserList() {
  // usestates for controlling the form feilds
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    // initial disptach for getting userList data from api and assign the payload to list
    dispatch(fetchUserList());
  }, [dispatch]);
  const userData = useSelector((state) => state.getUser);
  const updateInfo = useSelector((state) => state.postUser);

  /*userdata is of usersList  and updateInfo is of udpated status of user*/

  const { theme, userList } = userData;
  const { msg } = updateInfo;

  const background = theme ? "black" : "white";
  const fontColor = theme ? "white" : "black";

  const addUserForm = (e) => {
    //form for updation
    e.preventDefault();
    if (firstName && lastName) {
      dispatch(
        updateData({ first_name: firstName, last_name: lastName, email })
      );
    }
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <>
      <Nav className="d-flex justify-content-between align-items-center bg-primary p-1">
        <h1 className="text-white">UserList</h1>
        {/* theme changer */}
        {theme ? (
          <BsLightbulb
            className="icon"
            onClick={() => dispatch(getUserActions.changeTheme())}
          />
        ) : (
          <BsLightbulbFill
            className="icon"
            onClick={() => dispatch(getUserActions.changeTheme())}
          />
        )}
      </Nav>
      <div
        className="bgContainer d-flex flex-column flex-md-row"
        style={{ backgroundColor: background, color: fontColor }}
      >
        {/* table is for representing userList in ui */}
        <Table
          bordered
          hover
          style={{ color: fontColor }}
          className="table m-2"
        >
          <thead>
            <tr>
              <th className="text-center">Profiles</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((each) => (
              <tr key={each.id}>
                <td className="d-flex justify-content-center align-items-center">
                  <Image
                    src={each.avatar}
                    roundedCircle
                    style={{ height: "58px" }}
                  />
                </td>
                <td>{each.firstName}</td>
                <td>{each.lastName}</td>
                <td>
                  {each.firstName}
                  <br className="d-md-none" />
                  {each.lastName}
                  <br className="d-md-none" />
                  @gmail
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card
          className="p-2 m-3 form"
          style={{ backgroundColor: background, border: "1px solid gray" }}
        >
          {/* Form for updation of user into server with it will validate only if feilds are not empty */}

          <Form style={{ color: fontColor }} onSubmit={addUserForm}>
            <Form.Group className="p-1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="p-1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group className="p-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* msg is noting but status of updation with unqiue id we from api as response */}
            <p className="text-success">{msg}</p>
            <Button type="submit" className="mt-2 m-1">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
