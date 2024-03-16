import React, { useCallback, useEffect, useState } from 'react';

import { ContentContainer, Link, Stack, TP } from '@/src/components/atoms';
// import { ProductPhotosPreview } from '@/src/components/organisms/ProductPhotosPreview';
import styled from '@emotion/styled';

import SearchableDropdown from '@/src/layouts/SearchableDropdown';
import { usePush } from '@/src/lib/redirect';
import { useCart } from '@/src/state/cart';
import { useProduct } from '@/src/state/product';
import { Button, Form, Modal, Table } from "react-bootstrap";

interface Props {
  capacity: number;
  initEmails?: string[];
  removed?: boolean;
  owner?: string;
}

export const Invite: React.FC<Props> = ({ capacity, initEmails, removed, owner }) => {
  const { handleBuyNow } = useProduct();
  const [emails, setEmails] = useState<string[]>(initEmails || []);
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [deleteEmail, setDeleteEmail] = useState("");

  const getUsers = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token token=zAh1rEFPvFKB987pAO2cg2EKKl5yZCnm4qhOZZ1oclmDiF7qRzfLKs8ka3dpSJBy");


    fetch("https://zammad.eyecos.org/api/v1/users", {
      method: "GET",
      headers: myHeaders
    })
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    getUsers();
  }, [getUsers])

  return (
    <ContentContainer>
      <Wrapper column>
        <h1>Invite team members</h1>
        <div className="price-table-container">
          <section className="w-100">
            <div className='border-bottom border-secondary w-100 pb-4' style={{ minHeight: "200px" }}>
              {deleteEmail && <Modal show={deleteEmail.length > 0} onHide={() => setDeleteEmail("")}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this email {deleteEmail} from your family plan?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setDeleteEmail("")}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={async () => {
                    const requestOptions = {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        "owner": owner,
                        "invited": deleteEmail
                      }),
                    };

                    const res = await fetch("https://ngo.gutricious.store/remove", requestOptions);
                    const json = await res.json()
                    setDeleteEmail("");
                    console.log(json, "updateUsers")
                    setEmails(json);
                  }}>
                    Remove
                  </Button>
                </Modal.Footer>
              </Modal>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>#</th>
                    <th>Email Address</th>
                    <th style={{ width: "10%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{email} {email == owner ? "(Yourself)" : ""}</td>
                      <td><Button onClick={() => {
                        if (!removed) {
                          setEmails((l) => l.filter(e => e != email))
                        } else {
                          setDeleteEmail(email);
                        }
                      }} variant='danger'>Remove</Button></td>
                    </tr>
                  ))}
                  {Array.from(Array(capacity - emails.length).fill(0).keys()).map((index) => (
                    <tr key={emails.length + index}>
                      <td>{emails.length + index + 1}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <hr />
            <Form
              className="pt-3 "
              onSubmit={async (e) => {
                e.preventDefault();
                if (emails.length == capacity) {
                  handleBuyNow(emails);
                  return;
                }
                setEmails((emails) => [...emails, email]);
                setUsers((users) => users.filter(user => user.email != email));
                setEmail("");
              }}
            >
              {emails.length < capacity && <Form.Group className="mb-3" controlId="formBasicEmail">

                <SearchableDropdown
                  options={users}
                  label="email"
                  id="id"
                  selectedVal={email}
                  handleChange={(val: string) => setEmail(val)}
                />

                <Form.Text className="text-muted">
                  Enter your team member email address you want to add
                </Form.Text>
              </Form.Group>}
              {!removed && <Button type="submit" disabled={
                (emails.length != capacity && (!email || users.filter(
                  (user: any) => user["email"].toLowerCase() == email.toLowerCase()
                ).length == 0)) ? true : false
              } className="mt-0">
                {emails.length == capacity ? "Submit" : "Add"}
              </Button>}
            </Form>
          </section>
        </div>
      </Wrapper>
    </ContentContainer>
  )
}

const CategoryBlock = styled(Link)`
    width: fit-content;
`;

const ProductInfoStack = styled(Stack)`
    border-bottom: 2px solid ${({ theme }) => theme.gray(100)};
    padding-bottom: 7.5rem;
`;

const Wrapper = styled(Stack)`
    padding-top: 2rem;
    @media (min-width: ${p => p.theme.breakpoints.xl}) {
        padding: 3.5rem 0;
    }
`;

const MakeItQuick = styled(TP)`
    color: ${({ theme }) => theme.error};
`;

const StickyLeft = styled(Stack)`
    @media (min-width: 1024px) {
        position: sticky;
        top: 12rem;
    }
`;

const StockInfo = styled(Stack) <{ outOfStock?: boolean; comingSoon?: boolean }>`
    white-space: nowrap;
    color: ${p => (p.outOfStock ? p.theme.error : p.comingSoon ? p.theme.gray(800) : 'inherit')};
    width: max-content;
    @media (min-width: 1024px) {
        width: 100%;
    }
`;

const StyledStack = styled(Stack)`
    justify-content: center;
    align-items: center;
    @media (min-width: 1024px) {
        justify-content: flex-start;
        align-items: flex-start;
    }
`;

const Main = styled(Stack)`
    padding: 1.5rem 0;
    flex-direction: column;
    align-items: start;
    @media (min-width: 1024px) {
        flex-direction: row;
        padding: 4rem 0;
    }
    margin-bottom: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.gray(100)};
`;
